var helpers = require('helpers');

//reset Safe Mod Cooldown in roomList
module.exports = {
    myName: 'Xolym',
    minSMCTime: 10000, 
    tasks: {
        'shard2': {
            'E42N28': ['E43N29','E42N29','E41N29','E41N28','E41N27'],
            'E43N25': ['E43N26','E41N26'],
            'E41N23': ['E42N23','E43N23','E43N22'],
            'E43N21': ['E41N21','E39N21'],
            'E38N19': ['E38N18',],
            'E57N47': ['E57N48',],
        },
    },
    
    process: function() {
        if (!this.tasks[Game.shard.name]) return;
        if (!Memory.smcInfo) Memory.smcInfo = {taskTime:{},roomsTime:{}, contrPos:{}};
        for (let homeRoom in this.tasks[Game.shard.name]) {
            if (Memory.smcInfo.taskTime[homeRoom] && Game.time < Memory.smcInfo.taskTime[homeRoom]) continue;
            let roomList = this.tasks[Game.shard.name][homeRoom];
            if (Memory.smcInfo.taskTime[homeRoom] === undefined || Memory.smcInfo.taskTime[homeRoom]) { //check doTask
                let doTask = roomList.some(roomName => !Memory.smcInfo.roomsTime[roomName] || Memory.smcInfo.roomsTime[roomName] - Game.time < this.minSMCTime);
                console.log('smcReset roomList', homeRoom, roomList, doTask);
                if (!doTask) {
                    let minTimeRoom = _.min(roomList, roomName => Memory.smcInfo.roomsTime[roomName] - Game.time);
                    if (minTimeRoom) {
                        Memory.smcInfo.taskTime[homeRoom] = Memory.smcInfo.roomsTime[minTimeRoom] - this.minSMCTime - 1;
                        console.log('smcReset roomList', homeRoom, roomList, doTask, Memory.smcInfo.taskTime[homeRoom]);
                        continue;
                    } else {
                        Game.notify('smcReset error1');
                    }
                } else {
                    Memory.smcInfo.taskTime[homeRoom] = 0;
                }
            }
            
            if (Memory.smcInfo.taskTime[homeRoom] === 0) { //task running
                this.runCreep(homeRoom, roomList);
            }
        }
        
    },
    
    runCreep: function(homeRoomName, roomList) {
        let creepName = 'xsmc_cl'+homeRoomName
        let creep = Game.creeps[creepName];
        if (!creep) {
            let homeRoom = Game.rooms[homeRoomName];
            if (!homeRoom || homeRoom.memory.spawnBusyTick == Game.time) return;
            const spawns = homeRoom.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning;}
            });
            if (1 && spawns.length){
                let body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM];
                let res = spawns[0].spawnCreep(body.slice(), creepName, {memory: {room: homeRoom.name, role: 'manualBuilder', roomList: roomList.slice().reverse(), ignoreRoads: 1, offRoad: 1}});
                if (res == OK) {
                    homeRoom.memory.spawnBusyTick = Game.time;
                }
            }
        } else {
            if (creep.spawning) return;
            if (creep.ticksToLive == 1) {
                Game.notify('smcReset no ticksToLive for tasks: '+creep.memory.targetRoom + ' '+JSON.stringify(creep.memory.roomList));
            }
            if (creep.hits < creep.hitsMax) {
                creep.memory.warningMove = 1;
                creep.memory._trav = undefined;
                creep.memory.offRoad = undefined;
                creep.memory.ignoreRoads = undefined;
                Game.notify('smcReset attacked in room ' + creep.room.name);
                
            }
            // creep.memory.warningMove = 1; 
            // creep.memory.ensurePath = 1;

            if (!creep.memory.targetRoom) {
                creep.memory.targetRoom = creep.memory.roomList.pop();
                creep.memory.incomplete = undefined;
            }
            if (!creep.memory.targetRoom) {
                Memory.smcInfo.taskTime[creep.memory.room] = Game.time+1500;
                creep.suicide();
                return;
            }
            let targetRoom = creep.memory.targetRoom;
            if (!Memory.smcInfo.contrPos[targetRoom]) {
                if (creep.room.name == targetRoom) {
                    if (creep.room.controller) {
                        Memory.smcInfo.contrPos[targetRoom] = {x:creep.room.controller.pos.x, y:creep.room.controller.pos.y};
                    } else {
                        Game.notify('smcReset task to room w/o controller');
                        creep.memory.targetRoom = undefined;
                        return;
                    }
                } else {
                    let pos = new RoomPosition(24,24,targetRoom);
                    helpers.smartMove(creep, pos, 0,24);
                    return;
                }
            }
            
            if (Memory.smcInfo.contrPos[targetRoom]) {
                let pos = new RoomPosition(Memory.smcInfo.contrPos[targetRoom].x, Memory.smcInfo.contrPos[targetRoom].y, targetRoom);
                if (!creep.pos.isNearTo(pos)) {
                    if (creep.room.name == targetRoom && creep.memory.roomChecked != targetRoom) {
                        creep.memory.roomChecked = targetRoom;
                        creep.say('c',1);
                        if (creep.room.controller.reservation) {
                            if (creep.room.controller.reservation.username == 'Invader' ) {
                                let core = creep.room.find(FIND_HOSTILE_STRUCTURES).filter(s=>s.structureType == STRUCTURE_INVADER_CORE)[0];
                                if (core) {
                                    if (core.effects && core.effects.length && core.effects[0].effect == EFFECT_COLLAPSE_TIMER) {
                                        Memory.smcInfo.roomsTime[targetRoom] = Game.time + core.effects[0].ticksRemaining + CONTROLLER_RESERVE_MAX + this.minSMCTime;
                                        Game.notify('smcReset Invader core found in room '+targetRoom+' skip interval ' + (Memory.smcInfo.roomsTime[targetRoom] - Game.time));
                                    }
                                } else {
                                    Memory.smcInfo.roomsTime[targetRoom] = Game.time + creep.room.controller.reservation + this.minSMCTime;
                                    Game.notify('smcReset Invader reservation found in room '+targetRoom+' skip interval '+(Memory.smcInfo.roomsTime[targetRoom] - Game.time));
                                }
                                creep.memory.targetRoom = undefined;
                                return;
                            } else if (creep.room.controller.reservation.username == this.myName ) {
                                creep.memory.targetRoom = undefined;
                                Memory.smcInfo.roomsTime[targetRoom] = Game.time + this.minSMCTime + 5000;
                                Game.notify('smcReset my reservation found in room '+targetRoom);
                                return;
                            } else {
                                Game.notify('smcReset enemy reservation in room '+creep.room.name);
                                Memory.smcInfo.roomsTime[targetRoom] = Game.time + creep.room.controller.reservation + this.minSMCTime;
                                creep.memory.targetRoom = undefined;
                                return;
                            }
                        }
                    }
                    helpers.smartMove(creep, pos);
                    if (creep.memory.incomplete) {
                        Game.notify('smcReset incomplete path to room '+targetRoom);
                        Memory.smcInfo.roomsTime[targetRoom] = Game.time + this.minSMCTime + 5000;
                        creep.memory.targetRoom = undefined;
                    }
                } else {
                    if (creep.room.controller && creep.room.controller.safeModeCooldown && creep.room.controller.safeModeCooldown > SAFE_MODE_COOLDOWN - 20) {
                        Memory.smcInfo.roomsTime[targetRoom] = Game.time + creep.room.controller.safeModeCooldown;
                        creep.memory.targetRoom = undefined;
                    } else if (creep.room.controller && !creep.room.controller.level && !creep.room.controller.my) {
                        if (creep.room.controller.safeModeCooldown > this.minSMCTime*1.5) {
                            Game.notify('smcReset safeModeCooldown already set in room '+creep.room.name+' '+Game.time);
                        }
                        let res = creep.claimController(creep.room.controller);
                        if (res == OK) {
                            if (!creep.room.controller.sign || creep.room.controller.sign.username != this.myName) {
                                creep.signController(creep.room.controller, 'restricted area');    
                            }
                        } else if (res == ERR_GCL_NOT_ENOUGH) {
                            Game.notify('smcReset Your Global Control Level is not enough in room'+creep.room.name);
                        } else if (res == ERR_INVALID_TARGET && creep.room.controller && !creep.room.controller.level){
                            creep.attackController(creep.room.controller);
                            //maybe invader core
                        } else {
                            //creep.attackController(creep.room.controller)
                        }
                    } else if (creep.room.controller && creep.room.controller.level == 1 && creep.room.controller.my && creep.room.memory.d == 1) {
                        creep.room.memory.d = undefined;
                        creep.room.find(FIND_STRUCTURES).forEach(s=>s.destroy());
                    } else if (creep.room.controller && creep.room.controller.level == 1 && creep.room.controller.my) {
                        creep.room.controller.unclaim();
                    } else {
                        Game.notify('smcReset something wrong with controoler in room '+targetRoom);
                    }
                }
            }
        }
        
    },
};