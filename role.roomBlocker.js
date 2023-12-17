var helpers = require('helpers');

module.exports = {
    
    //Memory.roomBlocker['E51N46'] = 1; 
    myUserName: 'Xolym',
    process: function() {
        if (!Memory.roomBlockerInfo) Memory.roomBlockerInfo = {time:Game.time};
        
        if (Game.time < Memory.roomBlockerInfo.time) return;
        if (Memory.roomBlockerInfo.task && (!Memory.roomBlocker[Memory.roomBlockerInfo.task] || Memory.roomBlocker[Memory.roomBlockerInfo.task].done || Memory.roomBlocker[Memory.roomBlockerInfo.task].closed)) {
            Memory.roomBlockerInfo.task = undefined;
        }
        
        for (let targetRoom in Memory.roomBlocker) {
            if (Memory.roomBlockerInfo.task && targetRoom != Memory.roomBlockerInfo.task) continue;
            
            let roomInfo = Memory.roomBlocker[targetRoom];
            if (roomInfo.done) continue;
            if (!(roomInfo instanceof Object)) {
                if (roomInfo > 0) {
                    Memory.roomBlocker[targetRoom] = Object.assign({}, {count:roomInfo});
                } else {
                    continue;
                }
                roomInfo = Memory.roomBlocker[targetRoom];
            }
            if (!roomInfo.time) {
                roomInfo.time = Game.time;
            }
            if (!roomInfo.count) continue;
            if (roomInfo.closed) {
                if (Game.time > roomInfo.time + 150000) {
                    delete Memory.roomBlocker[targetRoom];    
                }
                continue;
            }
            Memory.roomBlockerInfo.task = targetRoom;
            
            if (roomInfo.noSpawn && Game.time > roomInfo.time + 3000000) {
                delete Memory.roomBlocker[targetRoom];
                break;
            }
            
            if (roomInfo.room == undefined) {
                let spawnRoomInfo = require('observer').findClosestRoomByPath(targetRoom, 26, 26, 25, true);
                if (!spawnRoomInfo) {
                    roomInfo.room = 0;
                    roomInfo.time = Game.time;
                } else {
                    roomInfo.room = spawnRoomInfo.roomName;
                    roomInfo.pathLength = spawnRoomInfo.length;
                }
            }
            if (!roomInfo.room) {
                if (Game.time > roomInfo.time + 10) { //wait 10 ticks for next task
                    roomInfo.closed = 1;
                    roomInfo.noSpawnRoomFound = 1;
                    Game.notify('roomBlocker spawnRoom for task '+targetRoom+' not found or Path too long' );
                } 
                break;
            }
            if (!roomInfo.pos || (!roomInfo.claimerSpawned && (!roomInfo.looktime || Game.time > roomInfo.looktime + 100))) {
                let room = Game.rooms[targetRoom];
                if (!room) {
                    if (!Memory.rooms[roomInfo.room]) continue;
                    if (Memory.rooms[roomInfo.room].observerUsed == Game.time) {
                        console.log('roomBlocker',roomInfo.room,'observer busy')
                    } else {
                        let observer = Game.getObjectById(Memory.rooms[roomInfo.room].observer);
                        if (!observer) {
                            console.log('roomBlocker',roomInfo.room,'no observer');
                            let room = Game.rooms[roomInfo.room];
                            if (room) {
                                let obss = room.find(FIND_MY_STRUCTURES).filter(s=>s.structureType == STRUCTURE_OBSERVER);
                                if (obss.length) {
                                    Memory.rooms[roomInfo.room].observer = obss[0].id;
                                }
                            }
                            
                        } else {
                            let res = observer.observeRoom(targetRoom);
                            if (res != OK) {
                                console.log('roomBlocker',roomInfo.room,'observer error', res);
                                if (res == ERR_NOT_IN_RANGE) {
                                    roomInfo.closed = 1;
                                    roomInfo.noObserverRange = 1;
                                    Game.notify('roomBlocker closed noObserverRange to room '+targetRoom);
                                }
                            }
                        }
                    }   
                    break;
                } else {
                    if (!room.controller || (!room.controller.my && room.controller.level) || room.controller.level > 2) {
                        delete Memory.roomBlocker[targetRoom];
                        break;
                    }
                    roomInfo.looktime = Game.time;
                    
                    if (!roomInfo.pos) {
                        roomInfo.pos = {x:room.controller.pos.x, y:room.controller.pos.y, roomName:targetRoom};
                    }
                    
                    //check invader core
                    let iCores = room.find(FIND_HOSTILE_STRUCTURES).filter(s=>s.structureType == STRUCTURE_INVADER_CORE && s.level === 0);
                    if (iCores.length) {
                        roomInfo.invaderCore = 1;
                        if (Memory.massRangers && !Memory.massRangers[targetRoom] && defendRoom) {
                            defendRoom(targetRoom, roomInfo.room, 'melee', 1, 500);
                        }
                    }
                }
            }
            
            this.claimerRun('xblck_cl'+targetRoom, roomInfo, targetRoom);
            this.builderRun('xblck_bl'+targetRoom, roomInfo, targetRoom);
            break;
        }
        
        if (!Memory.roomBlockerInfo.task) {
            //console.log('No task for roomBlocker');
            Memory.roomBlockerInfo.time = Game.time + 50;
        } else {
            if (!(Game.time%20)) console.log('roomBlocker task '+ helpers.getRoomLink(Memory.roomBlockerInfo.task) + ' running');
        }
        
        
    },
    
    builderRun: function(name, roomInfo, targetRoom) {
        let room = Game.rooms[targetRoom];
        if (!room || !room.controller || !room.controller.my) return;
        let spawnTry = false;
        for (let i=0;i<roomInfo.count;i++) {
            let creepName = name+'_'+i;
            let creep = Game.creeps[creepName];
            if (!creep) {
                if (roomInfo.noSpawn) continue;
                let room = Game.rooms[targetRoom];
                let homeRoom = Game.rooms[roomInfo.room];
                if (!homeRoom || homeRoom.memory.spawnBusyTick == Game.time || spawnTry) continue;
                spawnTry = true;
                const spawns = homeRoom.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning;}
                });
                if (1 && spawns.length){
                    let body = [CLAIM,MOVE];
                    let boosts = [];
                    body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
                    if (roomInfo.body) body = roomInfo.body;
                    if (roomInfo.boosts) boosts = roomInfo.boosts;
                    let res = spawns[0].spawnCreep(body.slice(), creepName, {memory: {room: homeRoom.name, boosts: boosts.slice(), role: 'manualBuilder'}});
                    if (res == OK) {
                        homeRoom.memory.spawnBusyTick = Game.time;
                    }
                }
            } else {
                if (creep.spawning) continue;
                if (roomInfo.warningMove) {
                    creep.memory.warningMove = 1; 
                }
                
                if (!(Game.time%10) && creep.room.name == targetRoom && creep.room.controller && creep.room.controller.my && creep.room.controller.level == 2 
                    && creep.room.find(FIND_HOSTILE_CREEPS).filter(c=>c.getActiveBodyparts(ATTACK) || c.getActiveBodyparts(RANGED_ATTACK)).length) {
                    creep.room.controller.activateSafeMode();        
                }
                
                if (roomInfo.portal && !creep.room.memory.portalGone && creep.room.name == roomInfo.portal.resetRoom) {
                    creep.memory.portalGone = 1;
                }
                if (roomInfo.portal && !creep.memory.portalGone) {
                    let targetPos = new RoomPosition(roomInfo.portal.x, roomInfo.portal.y, roomInfo.portal.roomName);
                    helpers.smartMove(creep, targetPos, 0, 0);
                    return;
                } 

                
                if (creep.memory.harvestId) {
                    let obj = Game.getObjectById(creep.memory.harvestId);
                    if (creep.store.getFreeCapacity() && obj) {
                        if (creep.pos.isNearTo(obj)) {
                            let res = creep.harvest(obj);
                            if (res == ERR_INVALID_TARGET) {
                                creep.dismantle(obj); 
                                if (!(Game.time%50)) creep.memory.harvestId = undefined;
                            } else if (res == ERR_NOT_ENOUGH_RESOURCES && creep.store.getUsedCapacity()) {
                                creep.memory.harvestId = undefined;
                            }
                        } else {
                            helpers.smartMove(creep, obj);
                        }
                        
                        continue;
                    } else {
                        creep.memory.harvestId = undefined;
                    }
                }
                
                if (!creep.store[RESOURCE_ENERGY]) { 
                    if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY]) {
                        helpers.smartMove(creep, creep.room.storage);
                        creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                    } else if (creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY]) {
                        helpers.smartMove(creep, creep.room.terminal);
                        creep.withdraw(creep.room.terminal, RESOURCE_ENERGY);
                    } else if (0) {
                        let source = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES).filter(s=>s.structureType == STRUCTURE_RAMPART));
                        if (source) {
                            creep.memory.harvestId = source.id;
                        }
                    } else {
                        let source = creep.pos.findClosestByRange(creep.room.find(FIND_SOURCES_ACTIVE));//.filter(s=>s.id != '5bbcaf3f9099fc012e63a5f0'));
                        if (source) {
                            creep.memory.harvestId = source.id;
                        } 
                    }
                } else {
                    let target = roomInfo.pos;
                    if (target) {
                        let pos = new RoomPosition(target.x, target.y, target.roomName);
                        if (creep.room.name != target.roomName) {
                            helpers.smartMove(creep, pos);
                        } else {
                            if (creep.room.controller && creep.room.controller.my && creep.room.controller.owner.username == this.myUserName && creep.room.controller.level == 1) {
                                if (creep.pos.getRangeTo(creep.room.controller) <= 3) {
                                    creep.upgradeController(creep.room.controller);    
                                } else {
                                    helpers.smartMove(creep, creep.room.controller,0,3);    
                                }
                            } else if ((creep.room.controller && creep.room.controller.my && creep.room.controller.owner.username == this.myUserName && creep.room.controller.level > 1) ) {
                                if (!creep.room.memory.wallCreated) {
                                    if (creep.pos.isNearTo(creep.room.controller)) {
                                        helpers.recycleCreep(creep);
                                    } else {
                                        for (let dx=-1;dx<2;dx++) {
                                            for (let dy=-1;dy<2;dy++) {
                                                if (!dx && !dy) continue;
                                                let pos = new RoomPosition(creep.room.controller.pos.x+dx, creep.room.controller.pos.y+dy, creep.room.name);
                                                pos.createConstructionSite(STRUCTURE_WALL);
                                            }
                                        }
                                        creep.room.memory.wallCreated = 1; 
                                    }
                                    continue;
                                } 
                                if (creep.room.memory.wallCreated == 2) {
                                    for (let dx=-2;dx<3;dx++) {
                                        for (let dy=-2;dy<3;dy++) {
                                            if (!dx && !dy) continue;
                                            let pos = new RoomPosition(creep.room.controller.pos.x+dx, creep.room.controller.pos.y+dy, creep.room.name);
                                            pos.createConstructionSite(STRUCTURE_WALL);
                                        }
                                    }
                                    creep.room.memory.wallCreated = 3; 
                                    continue;
                                } 
                                let target = Game.getObjectById(creep.memory.targetId);
                                let maxHP = 100000;
                                if (creep.room.name == 'E49S7') {
                                    maxHP = 500000;
                                }
                                if (creep.room.memory.wallCreated == 3) {
                                    maxHP = 20000;
                                }
                                if (creep.room.name == 'E49S11') {
                                    maxHP = 500000;
                                }
                                if (creep.room.name == 'E49S13') {
                                    maxHP = 500000;
                                }
                                if (creep.room.name == 'E49S7') {
                                    maxHP = 500000;
                                }
                                
                                if (!target || creep.pos.inRangeTo(target, 3)) {
                                    if (target && target.hits) {
                                        let res = creep.repair(target);
                                        if (res == OK && Game.time%10 && target.hits < maxHP) {
                                            continue;
                                        }
                                    } else if (target) {
                                        creep.build(target);
                                    }
                                    let newTarget = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {range:3, filter: (structure) => {return structure.id !== creep.memory.targetId;}});
                                    if (newTarget) {
                                        creep.memory.targetId = newTarget.id;
                                        //creep.moveTo(newTarget);
                                    } else {
                                        
                                        let walls = creep.room.find(FIND_STRUCTURES).filter(s=>s.structureType == STRUCTURE_WALL && s.hits < s.hitsMax && s.hits < maxHP);
                                        let wall = _.min(walls, 'hits');
                                        if (wall && wall.hits) {
                                           creep.memory.targetId = wall.id;
                                        } else {
                                            creep.say('d');
                                            if (creep.room.memory.wallCreated < 2) {
                                                if (creep.pos.getRangeTo(creep.room.controller)>2) {
                                                    creep.room.memory.wallCreated = 2;         
                                                } else {
                                                    helpers.recycleCreep(creep); //move to home 1 step
                                                    creep.memory.targetId = undefined;
                                                }
                                            } else if (creep.room.memory.wallCreated == 3) {
                                                creep.say('done');
                                                let room = creep.room;
                                                room.find(FIND_MY_CONSTRUCTION_SITES).forEach(c=>c.remove());
                                                if (room.controller && room.controller.level <=2 && room.controller.my) {
                                                    delete room.memory.wallCreated;
                                                    roomInfo.closed = 1;
                                                    roomInfo.done = 1;
                                                    room.controller.unclaim();
                                                    creep.suicide();
                                                }
                                            }
                                            
                                        }
                                    }
                                } else if (target) {
                                     helpers.smartMove(creep, target,0,3);
                                }
                            } else {
                                helpers.smartMove(creep, creep.room.controller);
                            }
                        }
                    }
                }
            }
            
        }
    
    },
    
    claimerRun: function(name, roomInfo, targetRoom) {
        let creep = Game.creeps[name];
        if (!creep) {
            if (roomInfo.noSpawn || roomInfo.closed) return;
            let room = Game.rooms[targetRoom];
            if (room && room.controller && room.controller.my) {
                return;
            }
            if (roomInfo.claimerSpawned) {
                roomInfo.closed = 1;
                roomInfo.claimerDie = 1;
                Game.notify('roomBlocker no path to '+targetRoom+' task closed')
                return;
            }
            let homeRoom = Game.rooms[roomInfo.room];
            if (!homeRoom || homeRoom.memory.spawnBusyTick == Game.time) return;
            const spawns = homeRoom.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning;}
            });
            if (1 && spawns.length){
                let body = [CLAIM,MOVE];
                if (roomInfo.invaderCore) {
                    body = [CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE,CLAIM,MOVE,];
                }
                let res = spawns[0].spawnCreep(body.slice(), name, {memory: {room: homeRoom.name, role: 'manualBuilder'}});
                if (res == OK) {
                    homeRoom.memory.spawnBusyTick = Game.time;
                    roomInfo.claimerSpawned = 1;
                }
            }
        } else {
            if (creep.spawning) return;
            if (roomInfo.warningMove) {
                creep.memory.warningMove = 1; 
            }
            // creep.memory.ensurePath = 1;
            
            let target = roomInfo.pos;
            if (!target) {
            } else {
                if (creep.room.name == target.roomName && creep.room.controller && creep.room.controller.level == 1 && creep.room.controller.my) {
                    if (!creep.memory.d && !roomInfo.noDestroy) { //kil all buildings
                        creep.memory.d = 1;
                        let room = creep.room; 
                        if (room && room.controller && room.controller.my) {
                            room.find(FIND_STRUCTURES).forEach(struct => {struct.destroy();})
                            room.find(FIND_HOSTILE_CONSTRUCTION_SITES).forEach(cs=>cs.remove());
                        }
                    } else {
                        roomInfo.claimerSpawned = 1;
                        creep.suicide();
                    }
                } else {
                    let pos = new RoomPosition(target.x, target.y, target.roomName);
                    if (creep.pos.isNearTo(pos)) {
                        let res = creep.claimController(creep.room.controller);
                        creep.say(res);
                        if (res == OK) {
                            creep.signController(creep.room.controller, 'blocked');
                        } else if (res == ERR_GCL_NOT_ENOUGH) {
                            Game.notify('Room blocker Your Global Control Level is not enough in room'+creep.room.name);
                        } else if (res == ERR_INVALID_TARGET && creep.room.controller && !creep.room.controller.level){
                            creep.attackController(creep.room.controller);
                            roomInfo.claimerSpawned = 0;
                        } else {
                            creep.attackController(creep.room.controller)
                            roomInfo.claimerSpawned = 0;
                        }
                    } else {
                        helpers.smartMove(creep, pos);
                    }
                }
            }
        }
    },
    //require('role.roomBlocker').lookRoom(Game.rooms['E53N42'])
    
    lookRoom: function(room) {
        if (!['shard0'].includes(Game.shard.name)) return;
        if (!room.controller) return;
        if (Memory.roomBlocker[room.name] !== undefined) return;
        let xolymArea = require('observer').xolymArea;
        if (xolymArea[Game.shard.name] && xolymArea[Game.shard.name].includes(room.name)) return;
        if (room.controller.level) return;
        if (room.controller.reservation && room.controller.reservation.ticksToEnd && room.controller.reservation.username != 'Invader') return;
        if (room.find(FIND_SOURCES).length < 2) return;
        
        //check free sides
        let freeSides = 0;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {    
                if (!dx && !dy) { continue;}
                let pos = new RoomPosition(room.controller.pos.x+dx, room.controller.pos.y+dy, room.name);
                let found = pos.lookFor(LOOK_TERRAIN);
                if (found.length && found[0] != 'wall'){
                    let walls = pos.lookFor(LOOK_STRUCTURES);
                    if (walls.length) {
                        if (walls.some(s=>[STRUCTURE_WALL, STRUCTURE_RAMPART].includes(s.structureType))) {
                        } else {
                            freeSides++;    
                        }
                    } else {
                        freeSides++;
                    }
                }
            }
        }
        if (freeSides) {
            if (!Memory.roomBlocker) Memory.roomBlocker = {};
            Memory.roomBlocker[room.name] = 1;
        }
    },
    
    mapVisual: function() {
        if (Memory.roomBlocker && Memory.roomBlockerInfo) {
            for (let roomName in Memory.roomBlocker) {
                let pos = new RoomPosition(25, 15, roomName);
                if (Memory.roomBlockerInfo.task && roomName == Memory.roomBlockerInfo.task) {
                    Game.map.visual.text('block curr', pos, {color: '#00FF00', fontSize: 12});             
                } else if (Memory.roomBlocker[roomName].done) {
                    Game.map.visual.text('block done', pos, {color: '#FFFF00', fontSize: 10});             
                } else {
                    if (Memory.roomBlocker[roomName].closed) {
                        Game.map.visual.text('block err', pos, {color: '#FFFF00', fontSize: 10});             
                    } else {
                        Game.map.visual.text('block plan', pos, {color: '#FFFF00', fontSize: 10});             
                    }
                }
            }
        }      
    },
    
    run: function(creep) {
    },
    
    

};