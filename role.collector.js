var helpers = require('helpers');

var roleCollector = {
    
    //Memory.collectWork.E55N31[Game.time] = {x: 26, y:27, roomName:'E54N32'};
    //Memory.collectWork.E55N31[Game.time] = {x: 26, y:27, roomName:'E54N32', noTakeResource:'no'};
    //Memory.collectWork.E41N5[Game.time] = {x: 22, y:17, roomName:'E39N1',  noWarningMove: 1, boosted: 1, range: 1};
    
    //Memory.collectWork.E55N23 = {};Memory.collectWork.E55N23[Game.time] = {x: 15, y:35, roomName:'E55N24'};
    //Memory.collectWork.E36N9 = {};Memory.collectWork.E36N9[Game.time+1000] = {x: 24, y:24, roomName:'E40N11', count: 5, range: 50};
    
    getBody: function(room) {
        if (room.energyAvailable >=2500) {
            return [
                CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,
                CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,
            // CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            ];
        }
        //return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*25,CARRY*25
        if (room.energyAvailable >=2250) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*23,CARRY*23
        
        //[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,];//MOVE*17,CARRY*33
    },
    
    spawn: function (room, myRoom, freeSpawn) {
        //check all sector collector
        if (Memory.collectWork && Memory.collectWork[room.name]){
            for (let taskId in Memory.collectWork[room.name]) {
                if (Game.time < taskId) continue;
                let collectInfo = Memory.collectWork[room.name][taskId];
                let emptyResource = collectInfo.emptyResource?1:0;
                if (!emptyResource) {
                    let timeToTarget = collectInfo.timeToTarget?(collectInfo.timeToTarget+150):300;
                    //console.log('try collector spawn!!!!!!!!!!!!!!!!!');
                    let collectorCount =  collectInfo.count?collectInfo.count:1;
                    if (Game.cpu.bucket< 4000) {
                        collectorCount = 1;
                    }
                    if (room.energyAvailable< room.energyCapacityAvailable*0.6) {
                        collectorCount = 1;
                    }
                    let boosts = [];//[RESOURCE_CATALYZED_KEANIUM_ACID];
                    let body = this.getBody(room);
                    if (room.name == 'E41N5' && collectInfo.boosted) {
                        body = [TOUGH,TOUGH,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL];
                        boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID];
                    }
                    if (Game.shard.name == 'shard2' && room.name == 'E59N53') {
                        body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,]; //MOVE*16,CARRY*32
                    }
                    // let creepLive = _.filter(require('spawn').getGameCreeps(room.name), (creep) => creep.memory.role == 'collector' && creep.memory.taskId == taskId && (creep.ticksToLive > timeToTarget || creep.spawning));
                    // let needSpawn = creepLive.length < collectorCount;
                    
                    let needSpawn = require('spawn').creepLiveCustomCheck(room.name, room.name+'_collector_'+taskId, collectorCount,
                        creep => creep.memory.role == 'collector' && creep.memory.taskId == taskId && (creep.ticksToLive > timeToTarget || creep.spawning),
                        'collector'
                    );
                    if (freeSpawn && needSpawn) {
                        const result = freeSpawn.spawnCreep(body, 'Collector_'+room.name+'_'+Game.time, {memory: {role: 'collector', boosts: boosts, room: room.name, taskId: taskId, warningMove: collectInfo.noWarningMove?0:1}});
                        if (result == OK){
                            freeSpawn = null;   
                        }
                    }
                } else if (taskId <  Game.time - 4000) {
                    delete Memory.collectWork[room.name][taskId];
                }
            }
        }
        return freeSpawn;
    },
    
    
    /** @param {Creep} creep **/
    run: function(creep) {
        //creep.memory.warningMove = 1;
        
        if (creep.getActiveBodyparts(HEAL)) {
            creep.heal(creep);
        }
        if (creep.memory.taskId && creep.memory.room && Memory.collectWork && Memory.collectWork[creep.memory.room] && Memory.collectWork[creep.memory.room][creep.memory.taskId]) {
            const collectInfo = Memory.collectWork[creep.memory.room][creep.memory.taskId];
            let timeToTarget = collectInfo.timeToTarget?collectInfo.timeToTarget:250;
            let noTakeResource = collectInfo.noTakeResource?collectInfo.noTakeResource:RESOURCE_ENERGY;
            
            
            if (creep.memory.unload && !creep.store.getUsedCapacity()){
                creep.memory.unload = undefined;
            }
            
            if (creep.ticksToLive > (timeToTarget*1.2) && !collectInfo.emptyResource
            && creep.hits > creep.hitsMax*0.6
            && ((creep.room.name == collectInfo.roomName && creep.store.getFreeCapacity()) || (creep.room.name != collectInfo.roomName && !creep.store.getUsedCapacity()))
            && !creep.memory.unload
            ) {
                if (!creep.spawning && creep.memory.startTimeToTarget == undefined){
                    creep.memory.startTimeToTarget = Game.time;
                }
                
                const targetPos = new RoomPosition(collectInfo.x, collectInfo.y, collectInfo.roomName);
                if (creep.room.name == collectInfo.roomName || creep.memory.targetId) {       //&& creep.store.getFreeCapacity() >= creep.getActiveBodyparts(WORK)
                    
                    const range = collectInfo.range !== undefined?collectInfo.range:4;
                    
                    if (targetPos) {
                        if (creep.memory.targetId) {
                            const target = Game.getObjectById(creep.memory.targetId);
                            if (!target) {
                                creep.memory.targetId = undefined;
                            } else if (!target.store.getUsedCapacity() || target.store.getUsedCapacity(noTakeResource)  == target.store.getUsedCapacity()) {
                                creep.memory.targetId = undefined;
                            } else {
                                helpers.smartMove(creep, target);
                                let err = creep.withdraw(target,  RESOURCE_CATALYZED_GHODIUM_ACID);// RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE);
                                if (err !== OK) {
                                    for(const resourceType in target.store) {
                                        if (resourceType !== noTakeResource) {
                                            let res = creep.withdraw(target, resourceType);    
                                            if (res == OK && creep.room.name == 'E39N1') creep.say('🛒', 1);
                                            //break;
                                        }
                                    }
                                } else {
                                    if (creep.room.name == 'E39N1') creep.say('😲', 1);
                                }
                            }
                        } else if (creep.pos.inRangeTo(targetPos, range+2)){
                            if (creep.memory.timeToTarget == undefined && creep.memory.startTimeToTarget) {
                                creep.memory.timeToTarget = Game.time - creep.memory.startTimeToTarget + 20;
                                if (!collectInfo.timeToTarget) {
                                    collectInfo.timeToTarget = creep.memory.timeToTarget;    
                                } else {
                                    collectInfo.timeToTarget = Math.round((collectInfo.timeToTarget+creep.memory.timeToTarget)/2);
                                }
                                
                            }
                            
                            
                            let containersWoRamp = targetPos.findInRange(FIND_RUINS, range, {
                                filter: function (object) {
                                    let onRamp = false;
                                    object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                                        if (lookObject.structureType == STRUCTURE_RAMPART) {
                                            onRamp = true;
                                        }
                                    });
                                    return object.store && object.store.getUsedCapacity() && object.store.getUsedCapacity() > object.store.getUsedCapacity(noTakeResource) && !onRamp;
                                }
                            });
                            if (containersWoRamp.length) {
                                creep.say('ruin');
                            }
                            if (!containersWoRamp.length){
                                containersWoRamp = targetPos.findInRange(FIND_STRUCTURES, range, {
                                    filter: function (object) {
                                        let onRamp = false;
                                        object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                                            if (lookObject.structureType == STRUCTURE_RAMPART) {
                                                onRamp = true;
                                            }
                                        });
                                        return object.store 
                                        && ((object.store.getUsedCapacity() && object.store.getUsedCapacity() > object.store.getUsedCapacity(noTakeResource) )
                                        || (object.structureType == STRUCTURE_LAB && object.store[object.mineralType]))
                                        && !onRamp;
                                    }
                                });
                                if (containersWoRamp.length) {
                                    creep.say('container');
                                }
                            }
                            
                            if (containersWoRamp.length) {
                                const target = containersWoRamp[0];
                                creep.memory.targetId = target.id;
                                helpers.smartMove(creep, target);
                                // let err = creep.withdraw(target, RESOURCE_CATALYZED_GHODIUM_ACID);
                                // if (err !== OK) {
                                //     for(const resourceType in target.store) {
                                //         if (resourceType !== RESOURCE_ENERGY) {
                                //             creep.withdraw(target, resourceType);    
                                //         }
                                //     }
                                // }
                                
                            } else {
                                let tombs = targetPos.findInRange(FIND_TOMBSTONES, range, {
                                    filter: function (object) {
                                        let onRamp = false;
                                        object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                                            if (lookObject.structureType == STRUCTURE_RAMPART) {
                                                onRamp = true;
                                            }
                                        });
                                        return object.store 
                                        && ((object.store.getUsedCapacity() && object.store.getUsedCapacity() > object.store.getUsedCapacity(noTakeResource) ))
                                        && !onRamp;
                                    }
                                });
                                if (tombs.length) {
                                    creep.say('tombs');
                                    const target = tombs[0];
                                    creep.memory.targetId = target.id;
                                    helpers.smartMove(creep, target);
                                    
                                } else {
                                    creep.say('no');
                                    collectInfo.emptyResource = 1;
                                }
                                
                            }

                            

                        } else {
                            helpers.smartMove(creep, targetPos);
                        }
                    }
                } else {
                    helpers.smartMove(creep, targetPos);
                }
            } else { //return to base
                creep.memory.unload = 1;
                creep.memory.targetId = undefined;
                helpers.transferEnergyToStorage(creep);
                
                if (!creep.store.getUsedCapacity() && creep.room.name == creep.memory.room && collectInfo.emptyResource) {
                    creep.say('ready to die');
                    creep.memory.role = undefined; 
                    if (creep.ticksToLive > 1400) {
                        Game.notify('collector recycle after spawn (empty task) '+creep.room.name+' Time to target '+timeToTarget);
                        collectInfo.emptyResource = 1;
                    }
                }
                
            }
            
            if (!creep.store.getUsedCapacity() && (creep.room.name == creep.memory.room || (creep.room.storage && creep.room.storage.my)) && creep.ticksToLive<(2*timeToTarget+100)) {
                creep.memory.role = undefined; 
                if (creep.ticksToLive > 1400) {
                    Game.notify('collector recycle after spawn (too long way) '+creep.room.name+' Time to target '+timeToTarget);
                    collectInfo.emptyResource = 1;
                }
            }
        } else { //return to base
            creep.say('rb'+helpers.transferEnergyToStorage(creep));
        }
        
        if (!creep.memory.recalcPathRoom || creep.room.name != creep.memory.recalcPathRoom) {
            if (!creep.memory.recalcPathRoomChecked || creep.room.name != creep.memory.recalcPathRoomChecked) {
                let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(creep.room.name);
                let fMod = parsed[1] % 10;
                let sMod = parsed[2] % 10;
                let isSKcenter = (fMod === 5 && sMod === 5);
                if (isSKcenter && creep.memory._trav) {
                    creep.memory._trav = undefined;
                    creep.memory.recalcPathRoom = creep.room.name;
                    creep.say('SKc_check1');
                } else {
                    creep.memory.recalcPathRoomChecked = creep.room.name;
                    creep.say('SKc_check0');
                }
                
            }
        }
        
        
	},
// 	warningMove: function(creep, pos) {
// 	    let enemys = creep.room.find(FIND_HOSTILE_CREEPS, {
//                 filter: function (object) {
//                     return helpers.ownerNotInWhiteList(object.owner.username)
//                     && (object.getActiveBodyparts(ATTACK)>= 1 || object.getActiveBodyparts(RANGED_ATTACK)>= 1)
//                     ;
//                 }
//             });
//             creep.say(enemys.length);
// 	    if (!enemys.length){
// 	        helpers.smartMove(creep, pos);
// 	    } else {
// 	        let enemy = creep.pos.findClosestByRange(enemys);
// 	        if (0 || creep.pos.inRangeTo(enemy, 10)){
// 	            creep.say(enemys.length+' '+creep.pos.getRangeTo(enemy));
// 	            creep.memory._trav = undefined;
//                 creep.moveTo(pos, {reusePath: 0, range: 1,
//                     costCallback: function(roomName, costMatrix) {
//                         if(roomName == creep.room.name) {
//                             enemys.forEach(function(enemyCreep) {
//                                 let sd = 3;//enemyCreep.getActiveBodyparts(ATTACK)?2:(enemyCreep.getActiveBodyparts(RANGED_ATTACK)?1:0);
//                                 if (sd){
//                                     for (dx= -sd;dx<=sd;dx++){
//                                         for (dy=-sd;dy<=sd;dy++){    
//                                             costMatrix.set(enemyCreep.pos.x+dx, enemyCreep.pos.y+dy, 50);
//                                             creep.room.visual.circle(enemyCreep.pos.x+dx, enemyCreep.pos.y+dy, {radius: 0.15})
//                                         }
//                                     }
//                                 }
//                             });
//                         }
//                     },
//                 });
// 	        } else {
// 	            helpers.smartMove(creep, pos);    
// 	        }
// 	    }
//     },
};

module.exports = roleCollector;