var helpers = require('helpers');
module.exports = {
    getBody: function(room) {
        return [
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            WORK,WORK,WORK,WORK,WORK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        ];
        // return [WORK, CARRY, MOVE, MOVE];
    },
    
    getCount: function(room) {
        let roomInfo = room.memory.roadRepairInfo;
        if (!roomInfo) return 0;
        if (!roomInfo.time || Game.time > roomInfo.time + 250) {
            roomInfo.count = 0;
            roomInfo.time = Game.time;
            let needEnergy = 0;
            Object.values(roomInfo.rooms).forEach(targetRoom => needEnergy += targetRoom.repairEnergyNeed);
            if (needEnergy>4000) {
                roomInfo.count = 1;
            }
            if (needEnergy>400000) {
                roomInfo.count = 2;
            }
        } else {
            return roomInfo.count;
        }
    }, 
    
    mapVisual: function() {
        this.visualRooms();
    },
    
    visualRooms: function() { //manual on 100ticks
        Object.keys(Game.rooms).forEach(roomName=>{
            let room = Game.rooms[roomName];
            if (room && room.controller && room.controller.my && room.memory.roadRepairInfo && room.memory.roadRepairInfo.rooms && Object.keys(room.memory.roadRepairInfo.rooms).length) {
                let startPos = new RoomPosition(24,24,room.name);
                Object.keys(room.memory.roadRepairInfo.rooms).forEach(roomName => {
                    let endPos = new RoomPosition(24, 24, roomName);
                    Game.map.visual.line(startPos, endPos); //{color: '#ff0000', lineStyle: 'dashed'}
                })
            }
        });
    },
    
    checkIntersectionRoom: function() { //manual
        let rooms = [];
        let roomsInfo = {};
        Object.keys(Game.rooms).forEach(roomName=>{
            let room = Game.rooms[roomName];
            if (room && room.controller && room.controller.my && room.memory.roadRepairInfo) {
                rooms.push(room.name)
                roomsInfo[room.name] = Object.keys(room.memory.roadRepairInfo.rooms);
            }
        });
        let byRoomsInfo = {};
        for (let roomName in roomsInfo) {
            roomsInfo[roomName].forEach(sectorRoomName => {
                if (byRoomsInfo[sectorRoomName]) {
                    byRoomsInfo[sectorRoomName].push(roomName);
                } else {
                    byRoomsInfo[sectorRoomName] = [roomName];
                }
            })
        }
        let textOut = '';
        for (let roomName in byRoomsInfo) {
            if (byRoomsInfo[roomName].length > 1) {
                textOut += helpers.getRoomLink(roomName)+':'+byRoomsInfo[roomName].join(', ')+'\r';
            }
        }
        
        return textOut;
        
        
    },
    
    checkRoom: function(creep) {
        if (!creep.memory.room) return;
        const homeRoomMemory = Memory.rooms[creep.memory.room];
        
        if (!homeRoomMemory.roadRepairInfo) {
            homeRoomMemory.roadRepairInfo = {rooms: {}};
        }
        if (!homeRoomMemory.roadRepairInfo.rooms[creep.room.name]) {
            homeRoomMemory.roadRepairInfo.rooms[creep.room.name] = {};
        }
        const roomInfo = homeRoomMemory.roadRepairInfo.rooms[creep.room.name];
        if (!roomInfo.time || roomInfo.time < Game.time) {
            if (homeRoomMemory.avoid > 1) {
                roomInfo.repairEnergyNeed = 0;
            } else {
                let repairEnergyNeed = 0;
                creep.room.find(FIND_STRUCTURES, {
                    filter: function(object) {
                        return object.structureType == STRUCTURE_ROAD && object.hits <= object.hitsMax-5*REPAIR_POWER;
                    }
                }).forEach(road => repairEnergyNeed += (road.hitsMax-road.hits)*REPAIR_COST + (road.hits/road.hitsMax < 0.4?5000:0) );
                creep.room.find(FIND_MY_CONSTRUCTION_SITES).forEach(c => repairEnergyNeed += (c.progressTotal - c.progress) / BUILD_POWER * 1000);
                roomInfo.repairEnergyNeed = Math.round(repairEnergyNeed);
            }
            roomInfo.time = Game.time + 500;
            
        }
    },
    
    run: function(creep) {
        if (helpers.sleep(creep)) return;
        if (Memory.mapVisual) Game.map.visual.text("RR️",creep.pos, { fontSize:10});
        if (helpers.runMoveOrder(creep)) return;
        
        if (!creep.store[RESOURCE_ENERGY]) {
            creep.memory.targetId = undefined;
            if (creep.room.name == creep.memory.room) {
                if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 10000) {
                    if (creep.pos.isNearTo(creep.room.storage)) {
                        creep.withdraw(creep.room.storage, RESOURCE_ENERGY)
                    } else {
                        helpers.smartMove(creep, creep.room.storage);
                        helpers.createMoveOrder(creep, creep.room.storage, {range: 2});
                    }
                } else {
                    creep.memory.sleep = Game.time+20;
                }
            } else {
                //find container;
                let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(obj) {
                        return obj.structureType == STRUCTURE_CONTAINER && obj.store[RESOURCE_ENERGY] >= 300 && obj.id != '63b95315094904da8f275de9'; //gcl cont
                    } 
                });
                if (target && creep.store.getFreeCapacity() && creep.hits == creep.hitsMax) {
                    if (creep.pos.isNearTo(target)) {
                         creep.withdraw(target, RESOURCE_ENERGY);
                         
                    } else {
                        helpers.smartMove(creep, target);
                        helpers.createMoveOrder(creep, target, {range: 1});
                    }
                } else {
                    target = Game.rooms[creep.memory.room] ? Game.rooms[creep.memory.room].storage: null;
                    if (target) {
                        helpers.smartMove(creep, target);
                        helpers.createMoveOrder(creep, target, {range: 3});
                    } else {
                        creep.memory.sleep = Game.time+20;
                    }
                }
            }
        } else {
            if (creep.memory.targetRooms == undefined) {
                let repairRooms = _.get(Memory, 'rooms.'+creep.memory.room+'.roadRepairInfo.rooms', {});
                creep.memory.targetRooms = Object.keys(repairRooms);
            }
            creep.memory.targetRooms = _.filter(creep.memory.targetRooms, targetRoom => !(Memory.rooms[targetRoom] && Memory.rooms[targetRoom].avoid>1));
            if (!creep.memory.targetRooms.length) {
                creep.memory.role = undefined;
                if (creep.ticksToLive>1400) {
                    Game.notify('RoadReapirer recycled after spawn in room '+creep.room.name);
                }
            } else {
                let targetRoom = creep.memory.targetRooms[0];
                if (creep.room.name != targetRoom) {
                    const pos = new RoomPosition(24, 24, targetRoom);
                    helpers.smartMove(creep, pos, 0, 24);
                    helpers.createMoveOrder(creep, pos, {room: true});
                } else {
                    let target = null;
                    if (creep.memory.targetId == undefined) {
                        target = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
                        if (!target) {
                            let roadsFind = FIND_STRUCTURES;
                            if (creep.room.memory.excludeRoads) {
                                roadsFind = creep.room.find(FIND_STRUCTURES, {filter: obj => {
                                    if (obj.structureType != STRUCTURE_ROAD) {
                                        return false;
                                    }
                                    let exclude = false;
                                    creep.room.memory.excludeRoads.forEach(pos => {
                                        if (obj.pos.x == pos.x && obj.pos.y == pos.y) {
                                            exclude = true;
                                        }
                                    })
                                    return  !exclude;
                                }})
                            }
                            
                            
                            target = creep.pos.findClosestByRange(roadsFind, {
                                filter: function(object) {
                                    return object.structureType == STRUCTURE_ROAD && object.hits <= object.hitsMax-creep.getActiveBodyparts(WORK)*REPAIR_POWER;
                                }
                            });
                        }
                        if (target) {
                            creep.memory.targetId = target.id;    
                        } else {
                            try {
                                Memory.rooms[creep.memory.room].roadRepairInfo.rooms[creep.room.name].repairEnergyNeed = 0;
                                Memory.rooms[creep.memory.room].roadRepairInfo.rooms[creep.room.name].time = Game.time + 2500;
                                Memory.rooms[creep.memory.room].roadRepairInfo.count = 0;
                                Memory.rooms[creep.memory.room].roadRepairInfo.time = Game.time;
                                
                            } catch (e) {
                                Game.notify('RR error#657 Memory path not exist. Room '+ creep.room.name);
                            }
                            // _.set(Memory, 'rooms.'+creep.memory.room+'.roadRepairInfo.rooms.'+creep.room.name+'.repairEnergyNeed', 0);
                            // _.set(Memory, 'rooms.'+creep.memory.room+'.roadRepairInfo.rooms.'+creep.room.name+'.time', Game.time + 2500);
                            creep.memory.targetRooms.shift();
                            return;
                        }
                    } else {
                        target = Game.getObjectById(creep.memory.targetId);
                    }
                    if (!target) {
                        creep.memory.targetId = undefined;
                    } else {
                        if (creep.room.name == 'E43N17' && Game.getObjectById('61844989f80f54a0640d775a')) {
                            creep.moveTo(Game.getObjectById('61844989f80f54a0640d775a'));
                            creep.dismantle(Game.getObjectById('61844989f80f54a0640d775a'));
                            return;
                        }
                        if (!target.progressTotal && target.hits>=target.hitsMax-creep.getActiveBodyparts(WORK)*REPAIR_POWER) {
                            creep.memory.targetId = undefined;    
                        }
                        if (helpers.positionInBorder(creep.pos) && creep.pos.isNearTo(target)) {
                            // helpers.smartMove(creep, target, 0, 0);
                            creep.moveTo(target, {range:0, reusePath: 2});
                            creep.memory._trav = undefined;
                        } else if (helpers.positionInBorder(creep.pos) && creep.pos.inRangeTo(target, 3)) {
                            creep.moveTo(target, {range:1, reusePath: 2});
                            creep.memory._trav = undefined;
                        } else if (creep.pos.inRangeTo(target,3) && !helpers.positionInBorder(creep.pos)) {
                            if (target.progressTotal) {
                                creep.build(target);
                            } else {
                                creep.repair(target);    
                            }
                        } else if (creep.pos.inRangeTo(target,4)) {
                            creep.moveTo(target, {range:3, reusePath: 2});
                            creep.memory._trav = undefined;
                        } else {
                            helpers.smartMove(creep, target, 0, 1); 
                            helpers.createMoveOrder(creep, target, {range: 3});
                        }
                    }
                    
                    
                }
            }
            
        }
        
    },

};