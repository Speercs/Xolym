var helpers = require('helpers');
var tsr = require('timeSavingRoom');
var Traveler = require('Traveler');
module.exports = {
    namePrefix: 'tsr_m_',
    role : 'tsr',
    creepsInfo: {
        containerBuilder: {
            prefix: 'cb',
            // needEnergy: 3200,
            // body: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,MOVE,],
            // needEnergy: 2750,
            // body: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,],
            needEnergy: 2900, //MOVE*16,WORK*10,CARRY*22
            body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
        },
        puller: {
            prefix: 'pul',
            needEnergy: 2500,
            body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
        },
        minaralHarvester: {
            prefix: 'hv',
            needEnergy: 5000,
            body: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
        },
        minaralTransporter: {
            prefix: 'tr',
            needEnergy: 1950, //MOVE*13,CARRY*26 carry	1.95K
            body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,],
        },
    },
    mineralBorder: {
      'shard0': 125000,  
      'shard1': 9000,
      'shard2': 25000000,
      'shard3': 60000, //9000,
    },
    
    _init: function(room) {
        if (!room.memory.tsrMineral) {
            room.memory.tsrMineral = {};
        }
        if (!room.memory.tsrMineral.containerPos) {
            let mineral = room.find(FIND_MINERALS)[0];
            if (mineral && room.storage) {
                let ret = Traveler.Traveler.findTravelPath(room.storage, mineral.pos, {ignoreRoads: true, range: 1});
                if (!ret.incomplete && ret.path.length) {
                    let pos = ret.path.pop();
                    if (pos.isNearTo(mineral)) {
                        room.memory.tsrMineral.containerPos = {x:pos.x, y:pos.y, roomName: pos.roomName};
                    }
                }
            }
            if (!room.memory.tsrMineral.containerPos) {
                Game.notify('tsrMineral not find mineral container pos in room '+room.name);
                return;
            }
        } 
        if (room.memory.tsrMineral.mineralTime == undefined || (room.memory.tsrMineral.mineralTime && Game.time > room.memory.tsrMineral.mineralTime)) {
            room.memory.tsrMineral.mineral = 0;
            room.memory.tsrMineral.mineralTime = 0;
            let extractors = room.find(FIND_MY_STRUCTURES).filter(s=>s.structureType == STRUCTURE_EXTRACTOR);
            if (extractors.length && Memory.stock){
                let mineral = room.find(FIND_MINERALS)[0];
                if (mineral){
                    if (mineral.mineralAmount) {
                        if ((Memory.stock[mineral.mineralType] || 0) < this.mineralBorder[Game.shard.name]) {
                            console.log(room.name, 'mineral mine begin');
                            room.memory.tsrMineral.mineral = 1;        
                            room.memory.tsrMineral.startTime = Game.time;
                            if (!Game.getObjectById(room.memory.tsrMineral.containerId)) {
                                delete room.memory.tsrMineral.containerId;
                            }
                        } else {
                            room.memory.tsrMineral.mineralTime = Game.time + 5000;
                        }
                    } else {
                        room.memory.tsrMineral.mineralTime = Game.time + mineral.ticksToRegeneration;
                    }
                }
            } else {
                room.memory.tsrMineral.mineralTime = Game.time + 5000;
                //Game.notify('no extractor in room '+room.name)
            }
        }        
        
    },
    
    runProcess: function(room) {
        if (room.controller && room.controller.level < 7) return;
        if (room.memory.stopGclUprade === 0) return;
        this._init(room);
        if (!room.memory.tsrMineral || !room.memory.tsrMineral.containerPos) return;
        if (!room.memory.tsrMineral.mineral) return;
        
        if (room.memory.tsrMineral.startTime && Game.time > room.memory.tsrMineral.startTime+15000) {
            Game.notify('tsrMineral in room '+room.name+' time too long')
        }
        
        if (!room.memory.tsrMineral.containerId) {
            let pos = new RoomPosition(room.memory.tsrMineral.containerPos.x, room.memory.tsrMineral.containerPos.y, room.memory.tsrMineral.containerPos.roomName);
            let container = pos.lookFor(LOOK_STRUCTURES).find(s => s.structureType == STRUCTURE_CONTAINER);
            if (container) {
                room.memory.tsrMineral.containerId = container.id;
                delete room.memory.tsrMineral.containerCsId;
            } else if (!room.memory.tsrMineral.containerCsId) {
                let cs = pos.lookFor(LOOK_CONSTRUCTION_SITES).find(cs => cs.structureType == STRUCTURE_CONTAINER);
                if (cs) {
                    room.memory.tsrMineral.containerCsId = cs.id;
                } else {
                    pos.createConstructionSite(STRUCTURE_CONTAINER);    
                }
            } else if (!Game.getObjectById(room.memory.tsrMineral.containerCsId)) {
                delete room.memory.tsrMineral.containerCsId;
                Game.notify('tsr mineral delete room.memory.tsrMineral.containerCsId in room '+room.name+' tick ' + Game.time);
            }
        } else {
            // if (!Game.getObjectById(room.memory.tsrMineral.containerId)) {
            //     delete room.memory.tsrMineral.containerId;
            // }
        }
        let spawnRole = {
            containerBuilder: 0,
            puller: 0,
            minaralHarvester: 0, 
            minaralTransporter: 0
        };
        let isClosed = room.memory.tsrMineral.closed;
        if (room.memory.tsrMineral.containerCsId && !isClosed) {
            spawnRole.containerBuilder = 1;
        }
        if (room.memory.tsrMineral.containerId && !isClosed) {
            spawnRole.minaralHarvester = 1;
        }
        if (room.memory.tsrMineral.containerId && room.memory.tsrMineral.pullId && !isClosed) {
            spawnRole.puller = 1;
        }
        if (room.memory.tsrMineral.containerId && Game.time > room.memory.tsrMineral.spawnTransporterEnable + 200 && !isClosed) {
            spawnRole.minaralTransporter = 1;
        }
        
        //console.log(room.name, JSON.stringify(spawnRole));
        let isAnyCreep = false;
        for (let role in spawnRole) {
            let name = this.namePrefix+this.creepsInfo[role].prefix +room.name;
            let creep = Game.creeps[name];
            if (!creep) {
                if (!spawnRole[role]) continue;
                if (room.memory.tsr_attaked) continue;
                if (room.memory.defendRoomMode) continue;
                if (room.energyAvailable < this.creepsInfo[role].needEnergy) continue;
                let spawn = tsr.getSpawn(room);
                if (!spawn) continue;
                let res = spawn.spawnCreep(this.creepsInfo[role].body, name, {memory: {room: room.name, role: this.role}});
                if (res == OK) {
                    room.memory.spawnBusyTick = Game.time;
                    //tsr.energyBalance(room, -this.creepsInfo[role].needEnergy);
                }
            } else {
                isAnyCreep = true;
                if (helpers.sleep(creep)) continue;
                if (role == 'puller') {
                    this.pullerRun(creep);
                } else {
                    try {
                        eval('this.'+role+'Run(creep)');
                    } catch (e) {
                        console.log('trsMineral run role '+role+' fail' + JSON.stringify(e));
                    }
                }
            }
        }
        if (isClosed && !isAnyCreep) {
            room.memory.tsrMineral.mineral = 0;
            room.memory.tsrMineral.mineralTime = undefined;
            delete room.memory.tsrMineral.closed;
            delete room.memory.tsrMineral.startTime;
            delete room.memory.tsrMineral.spawnTransporterEnable;
        }
        
    },
    
    containerBuilderRun: function(creep) {
        if (creep.spawning) return;
        let tsrMineral = Memory.rooms[creep.memory.room].tsrMineral;
        if (!creep.store[RESOURCE_ENERGY]){
            let storage = creep.room.storage;
            if (storage && storage.store[RESOURCE_ENERGY] > 5000){
                if (creep.pos.isNearTo(storage)) {
                    let res = creep.withdraw(storage, RESOURCE_ENERGY); 
                    if (res == OK) {
                        //this.energyBalance(room, -(creep.store.getCapacity() - creep.store.getUsedCapacity()));
                    }
                } else {
                    helpers.smartMove(creep, storage);    
                }
            } else {
                if (creep.room.name != creep.memory.room && Game.rooms[creep.memory.room] && Game.rooms[creep.memory.room].storage) {
                    helpers.smartMove(creep, Game.rooms[creep.memory.room].storage)
                } else {
                    creep.memory.sleep = Game.time + 31;    
                }
            } 
        } else {
            let target = Game.getObjectById(tsrMineral.containerCsId);
            if (target) {
                if (creep.pos.inRangeTo(target, 3)) {
                    creep.build(target);
                } else {
                    helpers.smartMove(creep, target, 0, 3);
                }
            } else {
                if (tsrMineral.containerId) {
                    //creep.suicide();
                    helpers.recycleCreep(creep);
                } else {
                    creep.memory.sleep = Game.time + 10;
                }
            }
        }
    },
    positionInBorder: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 1 || pos.x >48 || pos.y < 1 || pos.y > 48);
    },
    pullerRun: function(creep) {
        let tsrMineral = Memory.rooms[creep.memory.room].tsrMineral;
        if (!tsrMineral.spawnTransporterEnable) {
            tsrMineral.spawnTransporterEnable = Game.time;    
        }
        if (creep.spawning) return;
        if (!creep.memory.pullId) {
            creep.memory.pullId = tsrMineral.pullId;
        }
        if (!creep.memory.pullId) {
            creep.say('completed');
            helpers.recycleCreep(creep);
            return;
        }
        let pullCreep = Game.getObjectById(creep.memory.pullId);
        if (!pullCreep) {
            creep.memory.pullId = undefined;
            return;
        }
        if (!tsrMineral.pullId) {
            return;
        }
        
        let target = new RoomPosition(tsrMineral.containerPos.x, tsrMineral.containerPos.y, tsrMineral.containerPos.roomName);
        if (pullCreep && target) {
            if (pullCreep.pos.isEqualTo(target)){
                creep.say('completed');    
                creep.memory.pullId = undefined;
                delete tsrMineral.pullId;
                pullCreep.memory.inPosition = 1;
                return;
            } else {
                let res = creep.pull(pullCreep);
                if (this.positionInBorder(creep) && !this.positionInBorder(pullCreep)) {
                    pullCreep.move(creep)
                    creep.moveTo(pullCreep);
                    creep.memory._trav = undefined;
                } else if (res == ERR_NOT_IN_RANGE && !this.positionInBorder(creep.pos)) {
                    // helpers.smartMove(creep, pullCreep);
                    pullCreep.move(creep)
                    creep.moveTo(pullCreep);
                    creep.memory._trav = undefined;
                    creep.say('nir');
                    pullCreep.say('nir');
                } else {
                    pullCreep.say(pullCreep.move(creep));
                    //creep.moveTo(target);
                    if (creep.pos.isEqualTo(target)) {
                        creep.move(creep.pos.getDirectionTo(pullCreep));
                        pullCreep.move(creep);
                    } else if (creep.pos.isNearTo(target)){
                        creep.move(creep.pos.getDirectionTo(target));
                        pullCreep.move(creep);
                    } else {
                        helpers.smartMove(creep, target);    
                    }
                    
                }     
            }
            
            
            
        }
        // if (!creep.pos.isNearTo(pullCreep)) {
        //     helpers.smartMove(creep, pullCreep);
        // } else {
        //     let target = new RoomPosition(creep.room.memory.tsrMineral.containerPos.x, creep.room.memory.tsrMineral.containerPos.y, creep.room.memory.tsrMineral.containerPos.roomName);
        //     if (this.positionInBorder(creep) && !this.positionInBorder(pullCreep)) {
        //         creep.moveTo(pullCreep);
        //         creep.memory._trav = undefined;
        //     } else if (creep.pos.isEqualTo(target)) {
        //         creep.moveTo(creep.room.storage);
        //     } else if (!creep.pos.isNearTo(target)) {
        //         if (creep.pos.getRangeTo(target) == 2) {
        //             creep.moveTo(target); //avoid transporter
        //         } else {
        //             helpers.smartMove(creep, target);
        //         }
        //     } else {
        //         if (pullCreep.pos.isEqualTo(target)) {
        //             creep.say('completed');    
        //             creep.memory.pullId = undefined;
        //             delete creep.room.memory.tsrMineral.pullId;
        //             pullCreep.memory.inPosition = 1;
        //             return;
        //         } 
        //         creep.move(creep.pos.getDirectionTo(target));
        //     }
        //     creep.pull(pullCreep);
        //     pullCreep.move(creep);
        // }
    },
    
    minaralHarvesterRun: function(creep) {
        let tsrMineral = Memory.rooms[creep.memory.room].tsrMineral;
        if (creep.memory.inPosition == undefined) {
            creep.say('1');
            tsrMineral.pullId = creep.id;
            creep.memory.inPosition = 0;
        }
        if (!creep.memory.inPosition && !(Game.time%10)) { //??
            tsrMineral.pullId = creep.id;
            return;
        }
        
        if (creep.spawning) return;
        if (!creep.memory.inPosition) return;
        creep.say('2');
        let mineral = Game.getObjectById(creep.memory.targetId);
        if (!mineral) {
            mineral = creep.room.find(FIND_MINERALS)[0];
            creep.memory.targetId = mineral?mineral.id:0;
        }
        if (!mineral) return;
        let container = Game.getObjectById(tsrMineral.containerId);
        if (!container) {
            delete tsrMineral.containerId;
            creep.suicide();
            return;
        }
        if (container && !container.store.getFreeCapacity()) {
            creep.memory.sleep = Game.time + 30;
            Game.notify('tsrMineral container full in room '+creep.room.name);
            return;
        }
        let res = creep.harvest(mineral);
        if (res == OK) {
            creep.memory.sleep = Game.time + 5;
        } else if (res == ERR_NOT_IN_RANGE) {
            creep.memory.inPosition = 0;
        } else if (res == ERR_NOT_ENOUGH_RESOURCES) {
            tsrMineral.closed = 1;
            creep.suicide();
        }
    },
    
    minaralTransporterRun: function(creep) {
        creep.say('1');
        let tsrMineral = Memory.rooms[creep.memory.room].tsrMineral;
        if (!tsrMineral.containerId) return;
        if (!creep.memory.taskMode) {
            creep.memory.taskMode = 'free';
        }
        if (creep.memory.taskMode == 'free') {
            if (creep.store.getUsedCapacity()) {
                let room = Game.rooms[creep.memory.room];
                let target = room.terminal;
                if (!target || target.store.getFreeCapacity() < 5000) {
                    target = room.storage;
                }
                if (!target || target.store.getFreeCapacity() < 5000) {
                    target = null;
                }
                if (target) {
                    if (creep.pos.isNearTo(target)) {
                        for(const resourceType in creep.store) {
                            creep.transfer(target, resourceType);
                            break;
                        }    
                    } else {
                        helpers.smartMove(creep, target);
                    }
                } else {
                    delete creep.memory.taskMode;
                    return;
                }
            } else {
                if (creep.ticksToLive < 90) {
                    helpers.recycleCreep(creep);
                    return;
                }
                creep.memory.taskMode = 'load';
            }
        } 
        if (creep.memory.taskMode == 'load') {
            let target = Game.getObjectById(tsrMineral.containerId);
            if (target && creep.store.getFreeCapacity() && target.store.getUsedCapacity() && target.store.getUsedCapacity() > target.store[RESOURCE_ENERGY]) {
                let waitPos = target;
                if (Game.shard.name == 'shard2' && creep.memory.room == 'E41N19') waitPos = new RoomPosition(46,24,creep.memory.room);
                if (Game.shard.name == 'shard2' && creep.memory.room == 'E52N29') waitPos = new RoomPosition(48,25,creep.memory.room);
                if (Game.shard.name == 'shard2' && creep.memory.room == 'E41N23') waitPos = new RoomPosition(48,13,creep.memory.room); 
                if (Game.shard.name == 'shard3' && creep.memory.room == 'E42N31') waitPos = new RoomPosition(1,18,creep.memory.room); 
                
                if (target.store.getUsedCapacity() < creep.store.getFreeCapacity() && !tsrMineral.closed && creep.ticksToLive > 90) {
                    //waiting
                    if (creep.pos.isNearTo(waitPos)) {
                        creep.memory.sleep = Game.time + 30;
                        creep.say('w');
                        return;
                    } else {
                        helpers.smartMove(creep, waitPos);
                    }
                } else {
                    if (creep.pos.isNearTo(target)) {
                        for(const resourceType in target.store) {
                            creep.withdraw(target, resourceType);
                            break;
                        }    
                    } else {
                        helpers.smartMove(creep, target);
                    }
                }
                
            } else {
                if (creep.store.getUsedCapacity()) {
                    creep.memory.taskMode = 'free';    
                } else {
                    if (tsrMineral.closed) {
                        helpers.recycleCreep(creep);
                        creep.say('completed');
                    }
                    //delete creep.memory.taskMode;
                    //Game.notify('TSR mineral transporter  LOST TARGET in room '+creep.room.name+' at tick '+Game.time);
                    return;
                }
            }
        }
        return 1;        
    },
    
};