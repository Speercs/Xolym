var helpers = require('helpers');

module.exports = {
    
    //Memory.attackController['E51N46'] = 1;
    //Memory.attackController['E51N46'] = 'clear';
    //Memory.attackController['E51N46'] = {room:'E52N32', count: 1, body:[CLAIM,MOVE],boosts:[], warningMove:0, dtime:300, destroyStructures: 0};
    //Memory.attackController['E51N46'].noSpawn = 1;
    //Memory.attackController['E51N46'] = {count: 1, body:[CLAIM,MOVE],forceSpawn:1,warningMove:0,};
    //Memory.attackController['W45S23'] = {room:'E44S8', count: 1, warningMove:1, portal:{x:17, y:40, roomName:'E45S5',resetRoom:'W45S25'}, dtime: 400};
    process: function() {
        for (let targetRoom in Memory.attackController) {
            let roomInfo = Memory.attackController[targetRoom];
            if (!(roomInfo instanceof Object)) {
                if (roomInfo == 'claim') {
                    Memory.attackController[targetRoom] = Object.assign({}, {count:1,body:[CLAIM,MOVE], forceSpawn: 1, noLook: 1});
                } else if (roomInfo == 'clear') {
                    Memory.attackController[targetRoom] = Object.assign({}, {count:1,body:[CLAIM,MOVE], destroyStructures: 1, forceSpawn: 1, unclaim: 1, noLook: 1});
                } else if (roomInfo > 0) {
                    Memory.attackController[targetRoom] = Object.assign({}, {count:roomInfo});
                } else {
                    continue;
                }
                roomInfo = Memory.attackController[targetRoom];
            }
            if (!roomInfo.time) {
                roomInfo.time = Game.time;
            }
            if (!roomInfo.count) continue;
            
            if (roomInfo.noSpawn && Game.time > roomInfo.time + 30000) {
                delete Memory.attackController[targetRoom];
                continue;
            }
            
            if (roomInfo.room == undefined) {
                let spawnRoomInfo = require('observer').findClosestRoomByPath(targetRoom, 26, 26, 25, true);
                console.log(JSON.stringify(spawnRoomInfo));
                if (!spawnRoomInfo) {
                    roomInfo.room = 0;
                } else {
                    roomInfo.room = spawnRoomInfo.roomName;
                    roomInfo.pathLength = spawnRoomInfo.length;
                }
            }
            if (!roomInfo.room) {
                if (Game.time > roomInfo.time + 500) {
                    delete Memory.attackController[targetRoom];
                } else {
                    console.log('attackController spawnRoom for task '+targetRoom+' not found.' );
                }
                continue;
            }
            
            if (!roomInfo.pos) {
                let room = Game.rooms[targetRoom];
                if (!room) {
                    if (!Memory.rooms[roomInfo.room]) continue;
                    if (Memory.rooms[roomInfo.room].observerUsed == Game.time) {
                        console.log('attackController',roomInfo.room,'observer busy')
                    } else {
                        let observer = Game.getObjectById(Memory.rooms[roomInfo.room].observer);
                        if (!observer) {
                            console.log('attackController',roomInfo.room,'no observer');
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
                                console.log('attackController',roomInfo.room,'observer error', res);
                            }
                        }
                    }   
                    continue;
                } else {
                    if (room.controller && !room.controller.level && roomInfo.noLook) {
                        
                    } else if (!room.controller || !room.controller.level || room.controller.my) {
                        delete Memory.attackController[targetRoom];
                        continue;
                    }
                    roomInfo.pos = {x:room.controller.pos.x, y:room.controller.pos.y, roomName:targetRoom};
                    //check free places
                }
            }
            
            
            
            let spawnTry = false;
            for (let i=0;i<roomInfo.count;i++) {
                let name = 'xcla_'+targetRoom+'_'+i;
                //console.log(name,'!!!!!!!!!!!!');
                let creep = Game.creeps[name];
                if (!creep) {
                    if (roomInfo.noSpawn) continue;
                    let room = Game.rooms[targetRoom];
                    let dtime = roomInfo.dtime?roomInfo.dtime:((roomInfo.pathLength?roomInfo.pathLength:150)*1.25 + (roomInfo.body?roomInfo.body.length*3:108) + (roomInfo.count-1) * 130 + 75);
                    roomInfo.dtimeC = dtime;
                    dtime = Math.min(dtime, 620);
                    //console.log(name, creep, spawnTry, dtime);
                    if (room && room.controller && !room.controller.my && room.controller.safeMode) {
                        continue;
                    }
                    if (roomInfo.forceSpawn) {
                        //spawn enable
                    } else if (room && room.controller.level > 0 && !room.controller.my && (!room.controller.upgradeBlocked || room.controller.upgradeBlocked < dtime)) {
                        //spawn enable
                    } else {
                        continue;
                    }
                    let homeRoom = Game.rooms[roomInfo.room];
                    if (!homeRoom || homeRoom.memory.spawnBusyTick == Game.time || spawnTry) continue;
                    spawnTry = true;
                    const spawns = homeRoom.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning;}
                    });
                    if (1 && spawns.length){
                        let body = [CLAIM,MOVE];
                        let boosts = [];
                        body = [CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,];
                        //body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM]
                        // body = [TOUGH, TOUGH, TOUGH, TOUGH, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL,MOVE, MOVE,MOVE, MOVE,MOVE, MOVE,MOVE, MOVE,MOVE, MOVE,MOVE, MOVE,MOVE, MOVE,CLAIM ];
                        // boosts = [RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE];
                        if (roomInfo.body) body = roomInfo.body;
                        if (roomInfo.boosts) boosts = roomInfo.boosts;
                        let res = spawns[0].spawnCreep(body.slice(), name, {memory: {room: homeRoom.name, boosts: boosts.slice(), role: 'manual_claim'}});
                        if (res == OK) {
                            homeRoom.memory.spawnBusyTick = Game.time;
                        }
                    }
                } else {
                    if (creep.spawning) continue;

                    if (creep.memory.skip == 4) {
                        if (creep.room.controller && creep.room.controller.my && creep.room.controller.level == 1) {
                            creep.room.controller.unclaim();
                            roomInfo.count = 0;
                            creep.suicide();
                            continue;
                        }
                    }

                    if (creep.memory.skip == 3) {
                        if (creep.room.controller && creep.room.controller.my && creep.room.controller.level == 1) {
                            creep.room.find(FIND_HOSTILE_CONSTRUCTION_SITES).forEach(c=>c.remove());
                            if (roomInfo.destroyStructures) {
                                creep.room.find(FIND_STRUCTURES).forEach(obj=>obj.destroy());
                            }
                            if (roomInfo.unclaim) {
                                creep.memory.skip = 4;
                            } else {
                                creep.memory.skip = 1;    
                                creep.signController(creep.room.controller, '');
                                // if (!Memory.roomBlocker) Memory.roomBlocker = {};
                                // Memory.roomBlocker[creep.room.name] = 1;
                            }
                        }
                    }
                    if (creep.memory.skip == 2) {
                        if (creep.room.controller.level == 0) {
                            let res = creep.claimController(creep.room.controller);
                            if (res == OK) {
                                creep.signController(creep.room.controller, ''); 
                                creep.memory.skip = 3;
                                continue;
                            }
                        }
                        creep.memory.skip = 1;
                    }
                    if (creep.memory.skip) {
                        if (roomInfo.pathLength + 25 <250 && Game.cpu.bucket > 3000) {
                            helpers.recycleCreep(creep);
                        }
                        continue;
                    }
                    if (creep.memory.boosts && creep.memory.boosts.length) {
                        continue;
                    }
                    if (creep.getActiveBodyparts(HEAL)) {
                        creep.heal(creep);    
                    }
                    if (creep.hitsMax>=3600 && creep.hits < 1000 && !roomInfo.noSpawn) {
                        Game.notify('attackController '+targetRoom+' spawn closed. Creep was Damaged');
                        //roomInfo.noSpawn = 1;
                    }

                    if (roomInfo.warningMove || roomInfo.warningMove == undefined) {
                        creep.memory.warningMove = 1; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    
                    }
                    // creep.memory.ensurePath = 1;

                    if (roomInfo.portal && !creep.room.memory.portalGone && creep.room.name == roomInfo.portal.resetRoom) {
                        creep.memory.portalGone = 1;
                    }
                    if (roomInfo.portal && !creep.memory.portalGone) {
                        let targetPos = new RoomPosition(roomInfo.portal.x, roomInfo.portal.y, roomInfo.portal.roomName);
                        helpers.smartMove(creep, targetPos, 0, 0);
                        return;
                    } 
                    

                    let target = roomInfo.pos;
                    if (!target) {
                        
                    } else {
                        let pos = new RoomPosition(target.x, target.y, target.roomName);
                        if (creep.pos.isNearTo(pos)) {
                            let res = null;
                            if (roomInfo.count == 1) { // alone
                                if (creep.getActiveBodyparts(HEAL)) {
                                    creep.cancelOrder('heal');    
                                }
                                res = creep.attackController(creep.room.controller);    
                            } else {
                                let cnt = creep.room.controller.pos.findInRange(FIND_MY_CREEPS, 1, {filter: c=>c.getActiveBodyparts(CLAIM)}).length;
                                let noLifecnt = creep.room.controller.pos.findInRange(FIND_MY_CREEPS, 1, {filter: c=>c.getActiveBodyparts(CLAIM) && c.ticksToLive < 4}).length;
                                let enemys = creep.room.controller.pos.findInRange(FIND_HOSTILE_CREEPS, 4, {filter: c=>c.getActiveBodyparts(ATTACK) || c.getActiveBodyparts(RANGED_ATTACK)}).length;
                                creep.say(cnt+' '+noLifecnt);
                                if (cnt >= roomInfo.count || noLifecnt || enemys) { 
                                    if (creep.getActiveBodyparts(HEAL)) {
                                        creep.cancelOrder('heal');    
                                    }
                                    res = creep.attackController(creep.room.controller);        
                                }
                            }
                            //let res = creep.claimController(creep.room.controller);
                            creep.say(res);
                            if (res == OK) {
                                //creep.signController(creep.room.controller, '');
                                // if (claimInfo.nextTask[creep.room.name]) {
                                //     creep.memory.target = claimInfo.nextTask[creep.room.name];    
                                // } else {
                                   //creep.suicide();
                                   creep.memory.skip = 2;
                                   //creep.memory.role = undefined;
                                   //helpers.recycleCreep(creep);
                                // }
                            } else if (res == ERR_INVALID_TARGET && creep.room.controller && !creep.room.controller.level){
                                creep.memory.skip = 2;
                                //creep.claimController(creep.room.controller);
                            }
                        } else {
                            helpers.smartMove(creep, pos);
                        }
                    }
                    
                }
                
            }
        }
        
        
        
    },
    
    run: function(creep) {
    },
    
    

};