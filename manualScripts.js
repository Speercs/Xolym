var helpers = require('helpers');

module.exports = {
    
    //boostRoom('E36N9',[RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID, ], 40000)
    // Memory.pairs['E47S1'] = {room:'E41N5',  time: Game.time+300, duration: 30000, count: 1, soonDie: 800, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};
    //Memory.pairs['E47S1'] = {room:'E41N5',  time: Game.time, duration: 60000, count: 1, soonDie: 800, boosted: 1};
    runMbr: function(mbrInfo) {
        if (mbrInfo.shard && Game.shard.name != mbrInfo.shard) return;
        const spawnRoom = mbrInfo.spawnRoom; 
        const flagName = mbrInfo.flagName;
        const noSpawn = mbrInfo.noSpawn;
        let spawnEnable = !Game.flags[flagName] || !Game.flags[flagName].room || !Game.flags[flagName].room.controller || Game.flags[flagName].room.controller.level < 9;//!!!!!!!!!!8
        const roomClaimed = Game.flags[flagName] && Game.flags[flagName].room && Game.flags[flagName].room.controller && Game.flags[flagName].room.controller.my;
        //spawnEnable = false;//!!!!!!!!!!!!
        let terminalEnable = spawnEnable && Game.flags[flagName] && Game.flags[flagName].room && !!Game.flags[flagName].room.terminal && !!Game.flags[flagName].room.terminal.my;// && Game.flags[flagName].room.controller.level >= 6;
        let roomNeedReclaim = Game.flags[flagName] && Game.flags[flagName].room && Game.flags[flagName].room.controller 
        && (Game.flags[flagName].room.controller.level >= 8 || (Game.flags[flagName].room.controller.level == 7 && (Game.flags[flagName].room.controller.progressTotal - Game.flags[flagName].room.controller.progress) < 50000));
        
        if (!(Game.time%50)) console.log(mbrInfo.flagName, 'spawnEnable',spawnEnable,'teminalEnable ', terminalEnable, 'roomNeedReclaim', roomNeedReclaim);
        
        
        for (let creepName of mbrInfo.creeps) {
            let creep = Game.creeps[creepName];
            if (1 && Game.shard.name == 'shard3' && creep && !creep.memory.role) {
                creep.memory.role = 'manualBuilder';
                creep.memory.room = 'E39N21';// spawnRoom;!!
            //     creep.moveTo(new RoomPosition(18,22,'E40N30'));
            //     continue;
            }
            
            
            if (1 && !creep /*&& Game.shard.name == 'shard2'*/ && !noSpawn.includes(creepName) && spawnEnable) {
                let room = Game.rooms[spawnRoom];
                if (!room) continue;
                const spawns = Game.rooms[spawnRoom].find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning;}
                });
                if (1 && spawns.length && Game.rooms[spawnRoom].memory.spawnBusyTick != Game.time){
                    //console.log('!!!!!!!!!!!!!!!!!!!');
                    //spawns[0].spawnCreep([CLAIM, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, WORK,WORK,WORK,WORK,WORK, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,], creepName, {memory: {room: spawnRoom, role: 'manualBuilder', boosts:[]}});    
                    //spawns[0].spawnCreep([CLAIM,CARRY,MOVE,MOVE,MOVE,MOVE,], creepName, {memory: {room: spawnRoom, role: 'manualBuilder', boosts:[]}});  
                    let body = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];
                    let boosts = [];
                    let offRoad = undefined;
                    if (creepName.startsWith('reCl')) {
                        body = [MOVE,CLAIM];
                        if (!roomNeedReclaim) continue;
                    }
                    if (creepName.startsWith('mCl')) {
                        if (roomClaimed) continue;
                        
                        body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM];
                        if (['FlagMbr12_',].includes(flagName)) { 
                            body = [CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,];
                        }
                        offRoad = 1;
                        // let cap = room.energyCapacityAvailable;
                        // let result = [];
                        // for (let parts = Math.min(8, Math.floor(cap/650));parts>0;parts--){
                        //     result.push(CLAIM);result.push(MOVE);
                        // }
                        // body = result;
                        // offRoad = 0;
                        
                    }
                    if (creepName.startsWith('mbR') || creepName.startsWith('mBr')) {
                        body = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];    
                        boosts = [RESOURCE_CATALYZED_GHODIUM_ACID];
                        
                        if (['FlagMbr12_','FlagMbr11','FlagMbr','FlagGcl'].includes(flagName)) { 
                            body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,MOVE,];
                            boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ACID]; 
                            if (terminalEnable || flagName == 'FlagGcl') {
                                body = [CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];    
                                boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ACID]; 
                            }
                            if (terminalEnable && ['FlagMbr11',].includes(flagName)) { 
                                boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_GHODIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ACID]; 
                            }
                        }
                        
                        if (flagName == 'FlagGcl') { 
                            //body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*17,WORK*27,CARRY*6
                            body = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; //MOVE*6,WORK*38,CARRY*6
                            boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ACID];
                            //boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID]; 
                        }
                        if (flagName == 'FlagS1Gcl') { 
                            body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*6,WORK*34,CARRY*10
                            boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ACID]; 
                            if (terminalEnable) {
                                body = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; //MOVE*6,WORK*38,CARRY*6
                                boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ACID]; 
                                //boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID]; 
                            }
                            // body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY];
                            // boosts = []; 
                            // body = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];    
                            // boosts = [RESOURCE_CATALYZED_GHODIUM_ACID];
                            body = [WORK,CARRY,CARRY,MOVE,MOVE,MOVE];    
                            boosts = [];
                        }

                        if (Game.shard.name == 'shard2' && ['FlagMbr8','FlagMbr7','FlagMbr6','FlagMbr5','FlagMbr15'].includes(flagName)) {
                            boosts = [];
                        }
                        if (['FlagMbr3',].includes(flagName) && Game.shard.name == 'shard3') { 
                            boosts = [];
                        }


                        
                        if (flagName == 'FlagMbr2_') { 
                            body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
                            boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ACID, ];    
                        }
                        
                        if (1 && flagName == 'FlagMbr4_') {
                            body = [WORK, CARRY, MOVE, MOVE];
                        }
                        
                    }
                    if (creepName.startsWith('mLr')) {
                        body = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];    
                        boosts = [RESOURCE_CATALYZED_LEMERGIUM_ACID];
                        if (['FlagMbr12_','FlagMbr11','FlagMbr','FlagGcl','FlagMbr5'].includes(flagName)) { 
                            body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,MOVE,];
                            boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ACID];    
                        }
                    }
                    if (creepName.startsWith('mRr')) {
                        body =  [/*RANGED_ATTACK,*/HEAL,HEAL,HEAL,HEAL,
                            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                            HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                            HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,];
                        if (terminalEnable) {
                            continue;
                        }
                    }
                    
                    if (creepName.startsWith('dfR')) {
                        body =  [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                            HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,];
                        if (1 && flagName == 'FlagMbr4') {
                            body = [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,];
                        }

                    }
                    
                     if (creepName.startsWith('mTr')) {
                        body =  [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];
                        boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID]; 
                    }
                    
                    if (creepName.startsWith('mCh')) {
                        body = [MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
                        boosts = [];
                    }
                        
                    if (!room.memory.mbrSpawn) {
                        room.memory.mbrSpawn = {};
                    }
                    let soonDie = 2000;
                    if (creepName.startsWith('mRr')) {
                        soonDie = 600;
                    }
                    soonDie = 1; //no intershard!!!!
                    
                    if (1 && flagName == 'FlagMbr12') {
                        soonDie = 1200;
                        if (creepName.startsWith('mCl')) {
                            soonDie = 600;
                        }
                        if (creepName.startsWith('mRr')) {
                            soonDie = 300;
                        }
                    }
                    
                    
                    if (!room.memory.mbrSpawn[creepName] || Game.time > room.memory.mbrSpawn[creepName]+soonDie) {
                        let res = spawns[0].spawnCreep(body,creepName, {memory: {room: spawnRoom, role: 'manualBuilder', boosts:boosts, offRoad:offRoad}});    
                        if (res == OK) {
                            if (soonDie > 1) {
                                room.memory.mbrSpawn[creepName] = Game.time;
                            }
                            room.memory.spawnBusyTick = Game.time;
                        }
                    }
                    //body = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, CARRY, CLAIM];
                    //
                    
                }
            } else if (creep) {
                if (creep.memory.boosts) continue;
                
                if (Game.shard.name == 'shard2' && creep.store.getFreeCapacity() && !creep.store[RESOURCE_ENERGY] && creep.room.name == creep.memory.room && creep.room.storage && !terminalEnable) {
                    creep.moveTo(creep.room.storage);
                    creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                    continue;
                }
                
                // if (['E79N59', 'E79N60', 'E80N59','E80N60'].includes(creep.room.name)) {
                //     helpers.smartMove(creep, Game.flags['inter'], 0, 0);
                //     continue;
                // }
                // if (['E44N16','E44N14',].includes(creep.room.name)) {
                //     if (!creep.memory.warningMove) {
                //         creep.memory._trav = undefined;
                //         creep.memory.warningMove = 1;    
                //     }
                // } else {
                //     if (creep.memory.warningMove) {
                //         creep.memory._trav = undefined;
                //         creep.memory.warningMove = 0;    
                //     }
                    
                // }
                
                // if (['E43N17', 'E44N17', 'E44N16','E43N16','E43N18','E42N18','E41N18','E41N19'].includes(creep.room.name)) {
                //      helpers.smartMove(creep, Game.flags['Flag129'], 0, 1);
                //      continue;
                //  }
                // if (['E44N14', 'E44N15', 'E43N15',].includes(creep.room.name)) {
                //      helpers.smartMove(creep, Game.flags['Flag130'], 0, 1);
                //      continue;
                //  }
                
                if (Game.shard.name == 'shard2' && ['E40N40'].includes(creep.room.name)) {
                    let enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: c=>c.owner.username == 'zhanglin233' && (c.getActiveBodyparts(WORK) || c.getActiveBodyparts(CARRY))});
                    if (enemy) {
                        creep.moveTo(enemy);
                        creep.rangedAttack(enemy);
                        creep.memory._trav = undefined; 
                        continue;
                    }
                } 
                if (Game.shard.name == 'shard2' && ['E40N40', 'E41N40','E40N39', 'E41N39',].includes(creep.room.name)) {
                    // creep.memory.role = 'manualBuilder';
                    // creep.memory.room = spawnRoom;
                    helpers.smartMove(creep, (new RoomPosition(19,11,'E40N40')), 0, 0);
                    continue;
                }
                 if (Game.shard.name == 'shard2' && ['E41N19', 'E40N19','E40N20', ].includes(creep.room.name)) {
                    // creep.memory.role = 'manualBuilder';
                    // creep.memory.room = spawnRoom;
                    helpers.smartMove(creep, (new RoomPosition(30,14,'E40N20')), 0, 0);
                    continue;
                }
                
               
                
                if (creep.name.startsWith('mRr')) {
                     let flag = Game.flags[flagName];
                     if (creep.pos.isEqualTo(flag)) {
                         let spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
                         if (spawn) {
                             helpers.smartMove(creep, spawn);    
                             spawn.recycleCreep(creep);
                         } else {
                           creep.suicide();  
                         }
                     } else if (creep.pos.isNearTo(flag)) {
                         creep.moveTo(flag);
                     } else {
                         helpers.smartMove(creep, flag);  
                         if (creep.hits < creep.hitsMax) creep.heal(creep);
                         if (Memory.mapVisual) Game.map.visual.text("energy",creep.pos, { fontSize:10});
                     }
                     continue;
                }
                if (creep.name.startsWith('dfR') && creep.name != 'dfRD1') {
                     let flag = Game.flags[flagName];
                     if (creep.room.name == flag.pos.roomName) {
                         let enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                         if (enemy) {
                             creep.moveTo(enemy);
                             creep.rangedAttack(enemy);
                             creep.heal(creep);
                         } else {
                            let heals = creep.pos.findClosestByRange(FIND_MY_CREEPS, {filter: c=>c.hits < c.hitsMax});
                            if (heals) {
                             creep.moveTo(heals);
                             creep.heal(heals);
                            } else {
                                if (creep.pos.inRangeTo(flag,4)) {
                                    creep.say('zZ');
                                }  else {
                                    helpers.smartMove(creep, flag);        
                                }
                            }
                             
                         }
                     } else {
                         helpers.smartMove(creep, flag);        
                     }
                     continue;
                }
                if (1 && creep.name.startsWith('mTr') && creep.room.terminal) {// && creep.room.terminal.store.getFreeCapacity()> 60000) { 
                    if (!creep.store.getFreeCapacity() && !creep.pos.isNearTo(creep.room.terminal)) {
                        creep.moveTo(creep.room.terminal, {range:1});
                        continue;
                    } else if (creep.store.getUsedCapacity() && creep.pos.isNearTo(creep.room.terminal)) {
                        for (let res in creep.store){
                            creep.transfer(creep.room.terminal, res);
                            break;
                        }  
                        continue;
                    } else {
                        let obj = Game.getObjectById('5ade4c46687bce3c315d6dd7');
                        if (obj && obj.store && obj.store.getUsedCapacity()) {
                            creep.moveTo(obj, {range:1});
                            for (let res in obj.store){
                                // if (res != RESOURCE_ENERGY) {
                                    creep.withdraw(obj, res);
                                    break;
                                // }
                            }  
                        } else if (obj && obj.amount){
                            creep.moveTo(obj, {range:1});
                            creep.pickup(obj);
                        }
                        continue;
                    }
                    creep.say('zZ');
                    continue;
                    
                }
                if (1 && creep.name.startsWith('mCh')) { 
                    let flag = Game.flags[flagName];
                    if (creep.room.name == flag.pos.roomName) {
                        if (creep.memory.storageLinkPos == undefined && creep.room.storage && creep.room.terminal) {
                            let room = creep.room;
                            let storagePos = room.storage.pos;
                            let freeSides = 0;
                            let storageLinkPos = null;
                            for (let dx = -1; dx <= 1; dx++) {
                                for (let dy = -1; dy <= 1; dy++) {    
                                    if (!dx && !dy) { continue;}
                                    let pos = new RoomPosition(storagePos.x + dx, storagePos.y + dy, room.name);
                                    if (pos.isNearTo(room.storage) && pos.isNearTo(room.terminal)) {
                                        let allow = true;
                                        pos.lookFor(LOOK_STRUCTURES).forEach(structure => {
                                            if (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) {
                                                
                                            } else if (structure.structureType == STRUCTURE_RAMPART && structure.my) {
                                                
                                            } else {
                                                allow = false;
                                            }
                                        });
                                        if (allow) {
                                            storageLinkPos = pos;
                                        }
                                    }
                                }
                            }
                            if (storageLinkPos) {
                                creep.memory.storageLinkPos = {x:storageLinkPos.x, y:storageLinkPos.y, r:storageLinkPos.roomName};
                            } else {
                                creep.memory.storageLinkPos
                            }
                        }
                        if (1 && creep.memory.storageLinkPos) {
                            let pos = new RoomPosition(creep.memory.storageLinkPos.x, creep.memory.storageLinkPos.y, creep.memory.storageLinkPos.r);
                            if (pos) {
                                if (creep.pos.isEqualTo(pos)) {
                                    if (creep.store.getUsedCapacity()) {
                                        creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                                    } else {
                                        if (creep.room.storage.store.getFreeCapacity()> 50000 && creep.room.terminal.store[RESOURCE_ENERGY] > 60000) {
                                            creep.withdraw(creep.room.terminal, RESOURCE_ENERGY);
                                        } else {
                                            creep.say('zZ');
                                        }
                                    }
                                } else if (creep.pos.isNearTo(pos)) {
                                    creep.say('near');
                                    let founds = pos.lookFor(LOOK_CREEPS);
                                    if (founds.length) {
                                        founds[0].move(founds[0].pos.getDirectionTo(creep));
                                        creep.move(creep.pos.getDirectionTo(founds[0]));
                                    } else {
                                        creep.move(creep.pos.getDirectionTo(pos));
                                    }
                                } else {
                                    helpers.smartMove(creep, pos, 0, 0);       
                                }
                            }
                        } else {
                            creep.say('noSP');
                        }
                     } else {
                         helpers.smartMove(creep, flag);        
                     }
                     continue;
                    
                }
                
                if (creep.name.startsWith('mCl')) {
                     let flag = Game.flags[flagName];
                     if (creep.room.name == flag.pos.roomName) {
                         helpers.smartMove(creep, creep.room.controller);        
                         let res = creep.claimController(creep.room.controller);
                         if (1 && creep.room.controller && creep.room.controller.my && creep.room.controller.level == 1 && Game.shard.name == 'shard3' && creep.room.name == 'E42N21') {
                             creep.room.find(FIND_STRUCTURES).forEach(obj=>obj.destroy());
                            //  creep.room.find(FIND_STRUCTURES).forEach(struct => {
                            //     if (struct.store && struct.store[RESOURCE_ENERGY]>=400) {
                            //     } else {
                            //         if (struct.structureType == STRUCTURE_ROAD) {
                            //             if (struct.pos.isEqualTo(23,21)) {
                            //             } else if (struct.pos.isEqualTo(10,26)) {
                            //             } else if (struct.pos.isEqualTo(11,26)) {
                            //             } else if (struct.pos.isEqualTo(31,17)) {
                            //             } else if (struct.pos.isEqualTo(32,16)) {
                            //             } else if (struct.pos.isEqualTo(36,13)) {
                            //             } else if (struct.pos.isEqualTo(36,12)) {
                            //             } else if (struct.pos.isEqualTo(36,11)) {
                                            
                            //             } else {
                            //                 struct.destroy();        
                            //             }
                            //         } else {
                            //             struct.destroy();        
                            //         }
                                    
                            //     }
                            // });
                             
                         }
                         if (res == ERR_INVALID_TARGET && !creep.room.controller.my) {
                             creep.attackController(creep.room.controller);
                         }
                     } else {
                         creep.memory.offRoad = 0;
                         creep.memory.allowSK = 0;
                         creep.memory.ignoreRoads = 1;
                         if (creep.memory._trav && creep.memory._trav.path){
                            console.log('Claim manual ticks storage '+ (creep.ticksToLive - creep.memory._trav.path.length));
                         }
                         
                         helpers.smartMove(creep, flag);        
                     }
                     continue;
                }
                if (creep.name.startsWith('reCl')) {
                     let flag = Game.flags[flagName];
                     if (creep.room.name == flag.pos.roomName) {
                         helpers.smartMove(creep, creep.room.controller);        
                         if (creep.pos.isNearTo(creep.room.controller)) {
                             if (creep.room.controller.level == 8) {
                                 creep.room.controller.unclaim()
                                 creep.say('try unclaim')
                             } else if (creep.room.controller.level == 0) {
                                 creep.claimController(creep.room.controller);
                             } else {
                                 creep.say('zZ')
                             }
                         }
                         let res = creep.claimController(creep.room.controller);
                     } else {
                         helpers.smartMove(creep, flag);        
                     }
                     continue;
                }
                
                
                //creep.memory.warningMove = 1;
                let lastUpgradeIs = false;
                if (creep.store[RESOURCE_ENERGY] <= creep.getActiveBodyparts(WORK) && creep.memory.lastUpgradeTime == Game.time - 1) {
                    lastUpgradeIs = true;
                }
                if (!creep.store[RESOURCE_ENERGY] || lastUpgradeIs || (creep.store.getFreeCapacity() && creep.memory.harvest) ) { 
                    if (0 && _.some(creep.body, {boost: RESOURCE_CATALYZED_GHODIUM_ACID}) && creep.room.controller.level == 6 && !creep.room.terminal && creep.room.find(FIND_MY_CONSTRUCTION_SITES).length) { 
                        continue; //no get energy for upgrader while terminal builded
                    }
                    if (lastUpgradeIs) {
                        creep.upgradeController(creep.room.controller);
                        creep.say('lU');
                    }
                    
                    
                    let target = null;
                    creep.memory.repairId = undefined;
                    // if (!target && creep.room.name == creep.memory.room) {
                    //     target = creep.room.storage;
                    // } 
                    let myCreeps = creep.room.find(FIND_MY_CREEPS, {filter: c=>c.memory.role == 'manualBuilder' && c.getActiveBodyparts(WORK)});
                    //if (1 && _.some(creep.body, {boost: RESOURCE_CATALYZED_GHODIUM_ACID}) && myCreeps.length >= 3 && creep.store.getCapacity()>= 300) {
                    if (1 && creep.store.getCapacity()>= 300 && !creep.memory.harvest && !creep.name.startsWith('mLr')) {
                        let nearCreeps = creep.pos.findInRange(myCreeps, 1, {filter: c=>c.store[RESOURCE_ENERGY]> 100 && !c.memory.harvest});
                        let creepFrom = null;
                        let flag = Game.flags[flagName];
                        let rangeFrom = creep.pos.getRangeTo(flag);
                        if (rangeFrom>1) {
                            nearCreeps.forEach(c=>{
                                let range = c.pos.getRangeTo(flag);
                                if (range < rangeFrom) {
                                    rangeFrom = range;
                                    creepFrom = c;
                                }
                            });
                            
                            if (creepFrom) {
                                let amount = creepFrom.store[RESOURCE_ENERGY] - 2*creepFrom.getActiveBodyparts(WORK);
                                if (creepFrom.pos.getRangeTo(creep.room.controller)>3) {
                                    amount = creepFrom.store[RESOURCE_ENERGY];
                                }
                                amount = Math.min(amount, creep.store.getFreeCapacity());
                                let res = creepFrom.transfer(creep, RESOURCE_ENERGY, amount);
                                creep.memory.harvest = undefined;
                                creep.say(res+'get'+amount);
                                continue;
                            }
                        }
                    }
                    
                    if (0 && creep.room.name == 'E43N38') {
                        target = Game.getObjectById('61aa6b67815b472fa6c29ddd');
                        if (!target || target.store[RESOURCE_ENERGY] < 300) {
                            target = null;
                        }
                    }
                    
                    
                    if (!target && !creep.memory.harvest) {
                        let flag = Game.flags[flagName];
                        target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: obj => obj.resourceType == RESOURCE_ENERGY && obj.amount > 20 && obj.pos.inRangeTo(flag, 10)});
                        if (target) {
                            helpers.smartMove(creep, target);
                            creep.pickup(target);
                            continue;
                        }
                    }
                    if (!target && !creep.memory.harvest) {
                        if (!target && !creep.memory.harvest) {
                            target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: obj => obj.store && obj.store[RESOURCE_ENERGY]>=100 && [STRUCTURE_TOWER].includes(obj.structureType)});
                        }
                        if (!target && !creep.memory.harvest) {
                            target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: obj => obj.store && obj.store[RESOURCE_ENERGY]>=100 && [STRUCTURE_EXTENSION, STRUCTURE_LINK, STRUCTURE_SPAWN].includes(obj.structureType)});
                        }
                        if (!target && !creep.memory.harvest) {
                            target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: obj => obj.store && obj.store[RESOURCE_ENERGY]>=100 && [STRUCTURE_LAB, STRUCTURE_STORAGE, STRUCTURE_TERMINAL, STRUCTURE_FACTORY].includes(obj.structureType)});
                        }
                        if (target) {
                            creep.room.find(FIND_HOSTILE_STRUCTURES).forEach(struct => {
                                if (struct.store && struct.store[RESOURCE_ENERGY]<100 && struct.structureType == STRUCTURE_LAB && struct.mineralType && struct.store[struct.mineralType] > 100) {
                                    
                                } else if (struct.store && struct.store[RESOURCE_ENERGY]<100 && struct.store.getUsedCapacity() < 100) {
                                    struct.destroy(); 
                                }
                            });
                        }
                    }
                    
                    if (!target && !creep.memory.harvest && !terminalEnable) {
                        target = creep.pos.findClosestByRange(FIND_TOMBSTONES, {filter: obj => obj.store && obj.store[RESOURCE_ENERGY]>=100});
                    }
                    if (!target && !creep.memory.harvest && !terminalEnable) {
                        target = creep.pos.findClosestByRange(FIND_RUINS, {filter: obj => obj.store && obj.store[RESOURCE_ENERGY]>=100});
                    }
                    
                    if (creep.room.name == 'E43N38' && creep.pos.getRangeTo(target) > 10) {
                        target = null;
                    }
                    if (creep.room.name == 'E38N8' && creep.pos.getRangeTo(target) > 7) {
                        target = null;
                    }
                    let maxEnergyInStorage = 10000;
                    if (creep.room.name == 'E41N39') {
                        maxEnergyInStorage = 1000;
                    }

                    if (!target && !creep.memory.harvest && creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > ((creep.room.controller.level < 7 && !creep.room.terminal && _.some(creep.body, {boost: RESOURCE_CATALYZED_LEMERGIUM_ACID}))?maxEnergyInStorage:(3*maxEnergyInStorage))) {
                        creep.say('stor');
                        target = creep.room.storage;
                        if ((creep.room.name == 'E43N38' || creep.room.name == 'E41N39') && creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] > 10000) {
                            let targets = [creep.room.storage, creep.room.terminal];
                            target = creep.pos.findClosestByRange(targets);
                        }
                    }
                    if (!target && !creep.memory.harvest && creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] > 10000) {
                        target = creep.room.terminal;
                    }
                    
                    if (!target && !creep.memory.harvest && creepName.startsWith('mLr') && Game.getObjectById('5ec7bf9459ebf245fdfcd296') && creep.room.name == 'E42N29') {
                        target = Game.getObjectById('5ec7bf9459ebf245fdfcd296');
                    }
                    
                    if (!target && !creep.memory.harvest) {
                        target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: obj => obj.resourceType == RESOURCE_ENERGY && obj.amount > 100});
                        if (target) {
                            helpers.smartMove(creep, target);
                            creep.pickup(target);
                            continue;
                        }
                    }
                    
                    
                    if (!target) {
                        if (creep.memory.harvest) {
                            target = Game.getObjectById(creep.memory.harvest);
                            if (!target || !target.energy) {
                                target = null;
                                creep.memory.harvest = undefined;
                                continue;
                            }
                        }
                        if (!target) {
                            let sourceSpaces = {
                                '59f1a6f782100e1594f40dd3' : 1,
                                '59f1a6f782100e1594f40dd1' : 1,
                                '5983003eb097071b4adc3f78' : 0,
                                '5bbcaf6d9099fc012e63a97a' : 0,
                                '5bbcaf6d9099fc012e63a97c' : 5,
                                '59f1a61a82100e1594f3f8bf' : 1,
                                '59f1a53582100e1594f3e23c' : 1,
                                '5bbcaf409099fc012e63a610' : 1,
                                '5bbcafdd9099fc012e63b4da' : 0,
                                '59f1a6d282100e1594f40ad7' : 1,
                                '5bbcaf3f9099fc012e63a5f0' : 1,
                                
                            }
                            
                            target = creep.pos.findClosestByRange(FIND_SOURCES, {filter: source => 
                                source.energy && 
                                creep.room.find(FIND_MY_CREEPS, {filter: mycreep => mycreep.memory.harvest == source.id}).length < (sourceSpaces[source.id]!=undefined?sourceSpaces[source.id]:4)
                            });    
                        }
                        
                        if (!target) {
                            creep.say('zZ');
                            continue;
                        }
                        if (creep.pos.isNearTo(target)) {
                            let res = creep.harvest(target);
                            if (res == OK) {
                                creep.memory.harvest = target.id;
                            }
                        } else {
                            creep.memory.harvest = target.id;
                            if (creep.pos.inRangeTo(target, 2)) {
                                creep.moveTo(target);
                            } else {
                                helpers.smartMove(creep, target);    
                            }
                            
                        }
                        continue;
                    }
                    
                    
                    if (target) {
                        if (creep.pos.inRangeTo(target, 3)) {
                            creep.moveTo(target, {range:1})
                        } else {
                            helpers.smartMove(creep, target);    
                        }
                        
                        creep.withdraw(target, RESOURCE_ENERGY);
                    } else {
                        //helpers.smartMove(creep, Game.rooms[creep.memory.room].storage);
                        let flag = Game.flags[flagName];
                        helpers.smartMove(creep, flag);    
                    }
                } else {
                    creep.memory.harvest = undefined;
                    let flag = Game.flags[flagName];
                    if (flag) { 
                        if (!flag.room || creep.room.name != flag.room.name) {
                            helpers.smartMove(creep, flag);
                        } else {
                            if (creep.room.controller && creep.room.controller.my && creep.room.controller.owner.username == 'Xolym' && creep.room.controller.level && creep.room.controller.level < 9) {
                                let towers = creep.room.find(FIND_MY_STRUCTURES, {filter: obj => obj.structureType == STRUCTURE_TOWER && obj.store.getFreeCapacity(RESOURCE_ENERGY)>500});
                                let tower = null;
                                if (towers.length) {
                                    tower = towers[0];
                                }
                                if (tower && tower.store.getFreeCapacity(RESOURCE_ENERGY)) {
                                    creep.moveTo(tower, {range:1});
                                    creep.transfer(tower, RESOURCE_ENERGY);
                                    continue;
                                } 
                                
                                if (1 && creep.room.controller.level > 1 && (creep.name.startsWith('mLr') || !creep.room.controller.ticksToDowngrade || creep.room.controller.ticksToDowngrade > CONTROLLER_DOWNGRADE[creep.room.controller.level]/1.8 + 4000)) { //build
                                    let target = null;
                                    if (_.some(creep.body, {boost: RESOURCE_CATALYZED_GHODIUM_ACID}) || creep.name.startsWith('mBr')) { 
                                        target  = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, {filter: cc => [STRUCTURE_TOWER, STRUCTURE_SPAWN, STRUCTURE_TERMINAL, /*STRUCTURE_ROAD*/].includes(cc.structureType)});
                                    } else if (creep.name.startsWith('mLr')) {
                                        target  = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, {filter: cc => [STRUCTURE_SPAWN, STRUCTURE_TOWER].includes(cc.structureType)});
                                        if (!target) {
                                            target  = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, {filter: cc => [STRUCTURE_TERMINAL, ].includes(cc.structureType)});
                                        }
                                        if (!target) {
                                            target  = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, {filter: cc => [STRUCTURE_STORAGE, ].includes(cc.structureType)});
                                        }
                                        if (!target) {
                                            target  = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, {filter: cc => [STRUCTURE_LINK, STRUCTURE_ROAD].includes(cc.structureType)});
                                        }
                                        if (!target) {
                                            target  = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, {filter: cc => [STRUCTURE_EXTENSION, ].includes(cc.structureType)});
                                        }
                                        if (!target) {
                                            target  = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES, {filter: cc => [STRUCTURE_CONTAINER ].includes(cc.structureType)});
                                        }
                                        if (!target) {
                                            target  = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
                                        }
                                    }
                                    if (target) {
                                        if (creep.pos.inRangeTo(target, 3)) {
                                            creep.build(target);
                                            if (!(Game.time%5) && creep.room.name == 'E42N29') {
                                                let pos = new RoomPosition(13,20,'E42N29');
                                                if (creep.pos.isEqualTo(pos)) {
                                                    creep.say('🤝');
                                                    let moveArr = [TOP, LEFT, RIGHT, BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT];
                                                    moveArr = _.shuffle(moveArr);
                                                    creep.move(moveArr[0]);
                                                    creep.memory._trav = undefined;
                                                }
                                            }

                                        } else if (creep.pos.inRangeTo(target, 5)) {
                                            creep.moveTo(target, {range:3});
                                        } else {
                                            helpers.smartMove(creep, target,1,3);            
                                        }
                                        continue;
                                    }
                                }
                                if (1 && !creep.memory.repairId && creep.name.startsWith('mLr') /*_.some(creep.body, {boost:RESOURCE_CATALYZED_LEMERGIUM_ACID})*/ ) { //repair
                                    let hitsMax = 30000;
                                    if (creep.room.controller.level >= 4) {
                                        hitsMax = 1000000;
                                    }
                                    if (creep.room.controller.level >= 5) {
                                        hitsMax = 1500000;
                                    }
                                    let target;
                                    if (creep.room.name != 'E38N9') { //only ramparts
                                        target = _.min(creep.room.find(FIND_MY_STRUCTURES, {filter: obj=> [STRUCTURE_RAMPART, ].includes(obj.structureType) && obj.hits < obj.hitsMax}), 'hits');
                                    } else {
                                        target = _.min(creep.room.find(FIND_STRUCTURES, {filter: obj=> [STRUCTURE_RAMPART, STRUCTURE_WALL].includes(obj.structureType) && obj.hits < obj.hitsMax}), 'hits');
                                    }
                                    if (target) {
                                        creep.memory.repairId = target.id;
                                    }
                                }
                                if (creep.memory.repairId) {
                                    let target = Game.getObjectById(creep.memory.repairId);
                                    if (!target || target.hits >= target.hitsMax) {
                                        creep.memory.repairId = undefined;
                                        creep.say('zZ');
                                    } else {
                                        if (!(Game.time%10)) {
                                            let minRamps = creep.room.find(FIND_MY_STRUCTURES, {filter: obj=> [STRUCTURE_RAMPART, STRUCTURE_WALL].includes(obj.structureType) && obj.hits < 10000});
                                            if (minRamps.length){
                                                creep.memory.repairId = creep.pos.findClosestByRange(minRamps).id;
                                            }
                                        }
                                        
                                        helpers.smartMove(creep, target,1,3); 
                                        creep.repair(target);
                                        if (!(Game.time%500)) {
                                            creep.memory.repairId = undefined;
                                        }
                                        if (!(Game.time%5)) {
                                            if (creep.pos.isEqualTo(flag)) {
                                                creep.say('🤝');
                                                let moveArr = [TOP, LEFT, RIGHT, BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT];
                                                moveArr = _.shuffle(moveArr);
                                                creep.move(moveArr[0]);
                                                creep.memory._trav = undefined;
                                            }
                                        }
                                        if (!(Game.time%5) && creep.room.name == 'E42N29') {
                                            let pos = new RoomPosition(13,20,'E42N29');
                                            if (creep.pos.isEqualTo(pos)) {
                                                creep.say('🤝');
                                                let moveArr = [TOP, LEFT, RIGHT, BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT];
                                                moveArr = _.shuffle(moveArr);
                                                creep.move(moveArr[0]);
                                                creep.memory._trav = undefined;
                                            }
                                        }
                                        
                                        
                                    }
                                    continue;
                                }
                                
                                if (1) { //upgrade
                                    if (creep.room.name == 'E38N19' && creep.pos.isEqualTo(26,18)) {
                                        creep.move(!(Game.time%2)?RIGHT:LEFT);
                                    }
                                
                                    if (0 && creep.room.controller.level == 8 && creep.room.name != 'E41N39') {
                                        if (creep.room.name != 'E43N38' && creep.room.name != 'E41N39') {
                                            helpers.recycleCreep(creep);
                                        }
                                    } else if (creep.pos.inRangeTo(creep.room.controller,3)) {
                                        if (0 && creep.room.controller.level == 6 && !creep.room.terminal && creep.room.find(FIND_CONSTRUCTION_SITES, {filter: cs=>cs.structureType == STRUCTURE_TERMINAL}).length) {
                                            creep.say('wT');
                                            if (creep.room.storage) {
                                                creep.moveTo(creep.room.storage);
                                                creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                                            }
                                        } else {
                                            creep.upgradeController(creep.room.controller);    
                                            creep.memory.lastUpgradeTime = Game.time;
                                        }
                                        
                                        if (!creep.pos.inRangeTo(creep.room.controller,3)) {
                                            creep.moveTo(creep.room.controller, {range:3, reusePath:2, ignoreRoads: true})
                                        }
                                        if (!creep.pos.inRangeTo(creep.room.controller,2) && !(Game.time%10)) {
                                            creep.moveTo(creep.room.controller, {range:2, reusePath:0, ignoreRoads: true, ignoreCreeps: true})
                                        }
                                        if (creep.room.name == 'E41N39' && !creep.pos.inRangeTo(creep.room.controller,1) && !(Game.time%36)) {
                                            creep.moveTo(creep.room.controller, {range:1, reusePath:0, ignoreRoads: true, ignoreCreeps: true})
                                        }
                                        if (creep.room.name == 'E38N19' && !creep.pos.inRangeTo(creep.room.controller,1) && !(Game.time%3)) {
                                            creep.moveTo(creep.room.controller, {range:1, reusePath:0, ignoreRoads: true, ignoreCreeps: true})
                                        }
                                        if (creep.room.name == 'E47S1' && !creep.pos.inRangeTo(creep.room.controller,1) && !(Game.time%4)) {
                                            creep.moveTo(creep.room.controller, {range:1, reusePath:0, ignoreRoads: true, ignoreCreeps: true})
                                        }
                                        if (!(Game.time%5) && creep.room.name == 'E42N29') {
                                            let pos = new RoomPosition(13,20,'E42N29');
                                            if (creep.pos.isEqualTo(pos)) {
                                                creep.say('🤝');
                                                let moveArr = [TOP, LEFT, RIGHT, BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT];
                                                moveArr = _.shuffle(moveArr);
                                                creep.move(moveArr[0]);
                                                creep.memory._trav = undefined;
                                            }
                                        }

                                    } else if (creep.room.name == 'E56N41') {
                                        helpers.smartMove(creep, creep.room.controller,1,3);    
                                    } else if (creep.room.name == 'E53N42') {
                                        helpers.smartMove(creep, creep.room.controller,1,3);    
                                    } else if (creep.room.name == 'E46N19') {
                                        creep.moveTo(creep.room.controller, {range:3, ignoreRoads: false,reusePath:1,})
                                    } else if (creep.pos.inRangeTo(creep.room.controller,4)) {
                                        creep.moveTo(creep.room.controller, {range:2, ignoreRoads: true,reusePath:1,})
                                    } else {
                                        helpers.smartMove(creep, creep.room.controller,1,3);    
                                    }
                                }
                            } else {
                                helpers.smartMove(creep, creep.room.controller,1,4);    
                            }
                        }
                        
                    }
                }
            }
            
        }
        
    },
    run: function () {
        
        this.runP();
        
        
        if (1 && (Game.shard.name == 'shard2'  || Game.shard.name == 'shard1' || Game.shard.name == 'shard3') ) {
            let mbrInfos = {
                // 'E43N38': { //GCL TEMPLE!!!!!!!!!!!!!!!
                //     shard: 'shard2',
                //     spawnRoom: 'E44N38',
                //     flagName: 'FlagGcl',
                //     creeps: [
                //         'mBrE1','mBrE2','mBrE3','mBrE4','mBrE5','mBrE6','mBrE7','mBrE8',
                //             //   'mBrE1','mBrE2','mBrE3','mBrE4','mBrE5','mBrE6','mBrE7',//'mBrE8','mBrE9','mBrE10','mBrE11','mBrE12',
                //             //  'mRrE1','mRrE2','mRrE3',//'mRrE4','mRrE5','mRrE6','mRrE7','mRrE8','mRrE9','mRrE10','mRrE11','mRrE12','mRrE13','mRrE14','mRrE15','mRrE16','mRrE17','mRrE18','mRrE19','mRrE20',
                //             //  'mLrE1',//'mLrE2','mLrE3',
                //             //'dfRE1','dfRE2','dfRE3',
                //             // 'mClE1',
                //             ],
                //     noSpawn: [ 
                //         'mBrE1','mBrE2','mBrE3','mBrE4','mBrE5','mBrE6','mBrE7','mBrE8',
                //      //   'mBrE1','mBrE2','mBrE3','mBrE4',
                //      //    'mBrE5','mBrE6','mBrE7','mBrE8',
                //         ],
                //     // towers: [{"x":9,"y":37},{"x":10,"y":36},],
                //     // terminal: {"x":16,"y":36},
                // },
                
                  
                  'E38N9': { //!!!!!!!!!!!!!!!!!!!!!!
                    shard: 'shard2',
                    spawnRoom: 'E36N9',
                    flagName: 'FlagMbr12',
                    creeps: [
                            //'mBrQ1','mBrQ2','mBrQ3','mBrQ4','mBrQ5','mBrQ6',
                             'mLrQ1','mLrQ2',
                             //'mRrQ1','mRrQ2','mRrQ3','mRrQ4','mRrQ5','mRrQ6','mRrQ7','mRrQ8','mRrQ9','mRrQ10','mRrQ11','mRrQ12',//'mRrQ13','mRrQ14','mRrQ15',
                            // 'dfRQ1', 
                            'mClQ1',  
                            ],
                    noSpawn: [
                        'mLrQ1','mLrQ2',
                        'mClQ1',  
                            
                        ],
                    // spawns: [{"x":22,"y":8},],
                    // towers: [{"x":22,"y":14},{"x":21,"y":15},],
                    // terminal: {"x":25,"y":10},  
                },
                // 'E47S4': {
                //     shard: 'shard2',
                //     spawnRoom: 'E47S1',
                //     flagName: 'FlagMbr14',
                //     creeps: [
                //             'mBrY1','mBrY2',
                //             'mLrY1','mLrY2',
                //             // 'mRrY1',
                //             //'dfRY1', 
                //             // 'mClY1',
                //             ],
                //     noSpawn: [ 
                //         'mBrY1','mBrY2','mLrY1','mLrY2',
                //         ],
                //     //towers: [{"x":24,"y":19},],
                // },
                'E38N8': {
                    shard: 'shard2',
                    spawnRoom: 'E36N9',
                    flagName: 'FlagMbr15',
                    creeps: [
                            'mBrK1','mBrK2',
                            //'mLrK1','mLrK2',
                            // 'mRrK1',
                            //'dfRK1', 
                             'mClK1',
                            ],
                    noSpawn: [ 
                        'mBrK2',
                        ],
                    towers: [{"x":9,"y":31},{"x":10,"y":30},{"x":8,"y":32},],
                },
                // 'E57N47': {
                //     shard: 'shard2',
                //     spawnRoom: 'E59N41',
                //     flagName: 'FlagMbr13',
                //     creeps: [
                //              'mBrW1','mBrW2',
                //               'mLrW1','mLrW2',
                //             //  'mRrW1',
                //             // 'dfRW1', 
                //             //'mClW1',  
                //             ],
                //     noSpawn: [
                //          'mBrW1','mBrW2','mLrW1','mLrW2',
                //         ],
                //      towers: [{"x":14,"y":28},{"x":15,"y":29},],
                // },

                //   'E33N9': {
                //     shard: 'shard2',
                //     spawnRoom: 'E36N9',
                //     flagName: 'FlagMbr11',
                //     creeps: [
                //             'mBrA1','mBrA2','mBrA3','mBrA4','mBrA5',
                //             'mLrA1','mLrA2',
                //             'mRrA1','mRrA2','mRrA3','mRrA4','mRrA5',
                //             //'dfRA1', 
                //             //'mClA1',  
                //             ],
                //     noSpawn: [
                //             'mBrA1','mBrA2','mBrA3','mBrA4','mBrA5',
                //             'mLrA1','mLrA2',
                //             'mRrA1','mRrA2','mRrA3','mRrA4','mRrA5',
                //         ],
                //     towers: [{"x":34,"y":20},{"x":35,"y":19},{"x":32,"y":18},],
                //     // terminal: {"x":38,"y":16}, 
                // },
                
                
                'E41N39': {
                    shard: 'shard1',
                    spawnRoom: 'E41N38',
                    flagName: 'FlagS1Gcl',
                    creeps: [
                       
                            'mBrS1',//'mBrS2','mBrS3','mBrS4','mBrS5','mBrS6','mBrS7',//'mBrS8','mBrS9','mBrS10','mBrS11','mBrS12',
                            //'mLrS1',
                            //'mChS1',
                            'mClS1',
                            //'reClS1',
                            ],
                    noSpawn: [
                           
                        ],
                    // towers: [{"x":9,"y":37},{"x":10,"y":36},],
                    // terminal: {"x":40,"y":26},
                    // storage: {x:38,y:28},
                },
                
                
               
                // 'E38N19': {
                //     shard: 'shard2',
                //     spawnRoom: 'E41N19',
                //     flagName: 'FlagMbr',
                //     creeps: [
                //               'mBrH1','mBrH2','mBrH3','mBrH4','mBrH5','mBrH6','mBrH7',//'mBrH8','mBrH9','mBrH10','mBrH11','mBrH12','mBrH13','mBrH14','mBrH15',
                //             // 'mRrH1','mRrH2','mRrH3',//'mRrH4','mRrH5','mRrH6','mRrH7','mRrH8','mRrH9','mRrH10','mRrH11','mRrH12','mRrH13',//'mRrH14','mRrH15',
                //             // 'mLrH1','mLrH2','mLrH3',
                //             //'dfRH1','dfRH2','dfRH3',
                //             //'mClH1',
                //             //'mTrH1',
                //             ],
                //     noSpawn: [
                //             'mBrH1','mBrH2','mBrH3','mBrH4','mBrH5','mBrH6','mBrH7',//'mBrH8','mBrH9','mBrH10','mBrH11','mBrH12','mBrH13','mBrH14','mBrH15',
                //         ],
                //     towers: [{"x":27,"y":13},{"x":26,"y":12},],
                //     storage: {x:26,y:17},
                //     terminal: {"x":24,"y":15},
                // },
                // 'E42N29': {
                //     spawnRoom: 'E42N28',
                //     flagName: 'FlagMbr5',
                //     creeps: [
                //               'mBrJ1',
                //               'mLrJ1','mLrJ2',
                //               //'mRrJ1','mRrJ2','mRrJ3','mRrJ4','mRrJ5','mRrJ6','mRrJ7','mRrJ8','mRrJ9',
                //               'mClJ1',
                //             ],
                //     noSpawn: [
                //         'mLrJ1','mLrJ2',
                //         ],
                //     towers: [{"x":25,"y":19},],
                // }, 
                //   'E41N29': {
                //     spawnRoom: 'E42N28',
                //     flagName: 'FlagMbr10',
                //     creeps: [
                //             'mBrD1',//'mBrD2','mBrD3','mBrD4','mBrD5','mBrD6',
                //             'mLrD1',
                //             // 'mRrD1','mRrD2','mRrD3','mRrD4','mRrD5','mRrD6',
                //             // 'dfRD1','dfRD2',
                //             'mClD1',
                //             ],
                //     noSpawn: [
                //         'mLrD1',
                //         ],
                //     towers: [{"x":18,"y":29},],
                // },
               
                // 'E41N38': {
                //     spawnRoom: 'E41N39',
                //     flagName: 'FlagMbr2',
                //     creeps: [
                //             'mBr1','mBr2','mBr3','mBr4','mBr5','mBr6','mBr7','mBr8','mBr9','mBr10','mBr11','mBr12','mBr13','mBr14',
                //             'mRr1','mRr2','mRr3','mRr4','mRr5','mRr6','mRr7','mRr8','mRr9','mRr10','mRr11','mRr12',//'mRr13','mRr14','mRr15',
                //             'mLr1','mLr2','mLr3','mLr4','mLr5','mLr6','mLr7','mLr8',
                //             'dfR1','dfR2',
                //             'mCl1',
                //             ],
                //     noSpawn: [
                //             'mBr1','mBr2','mBr3','mBr4','mBr5','mBr6','mBr7','mBr8','mBr9','mBr10','mBr11','mBr12','mBr13','mBr14',
                //             'mRr1','mRr2','mRr3','mRr4','mRr5','mRr6','mRr7','mRr8','mRr9','mRr10','mRr11','mRr12',//'mRr13','mRr14','mRr15',
                //             'mLr1','mLr2','mLr3','mLr4','mLr5','mLr6','mLr7','mLr8',
                //             'dfR1','dfR2',
                //             'mCl1',
                //     ],
                // },
               
                // 'E51N8': {
                //     shard: 'shard2',
                //     spawnRoom: 'E45N11',
                //     flagName: 'FlagMbr3',
                //     creeps: [
                //             'mBrG1',
                //             'mLrG1',
                //             // 'mRrG1',
                //             // 'dfRG1', 
                //             'mClG1',
                //             ],
                //     noSpawn: [
                //             'mBrG1',
                //             'mLrG1',
                //         'mClG1',
                //         ],
                //     towers: [{"x":20,"y":17},],
                // },
                
                
                
                
                // 'E39N26': {
                //     shard: 'shard3',
                //     spawnRoom: 'E39N28',
                //     flagName: 'FlagMbr2',
                //     creeps: [
                //             'mBrK1','mBrK2',
                //             'mLrK1',
                //             // 'mRrK1',
                //             // 'dfRK1', 
                //             //'mClK1',
                //             ],
                //     noSpawn: [
                //       'mBrK1','mBrK2','mLrK1',
                //         ],
                //     towers: [],
                // },
                //  'E39N31': {
                //     shard: 'shard3',
                //     spawnRoom: 'E42N31',
                //     flagName: 'FlagMbr3',
                //     creeps: [
                //             'mBrJ1','mBrJ2',
                //             'mLrJ1',
                //             // 'mRrJ1',
                //             // 'dfRJ1', 
                //             //'mClJ1',
                //             ],
                //     noSpawn: [
                //             'mBrJ1','mBrJ2',
                //         ],
                //     //towers: [{"x":9,"y":13},],
                // },
                //  'E42N29': {
                //     shard: 'shard3',
                //     spawnRoom: 'E42N31',
                //     flagName: 'FlagMbr4',
                //     creeps: [
                //             'mBrW1','mBrW2',
                //             'mLrW1',
                //             // 'mRrW1',
                //             //'dfRW1', 
                //             //'mClW1',
                //             ],
                //     noSpawn: [
                //         'mBrW1','mBrW2','mLrW1',
                //         ],
                //     towers: [{"x":19,"y":23},],
                // },
                
                //tmp
                //  
                // 'E59N53': {
                //     shard: 'shard2',
                //     spawnRoom: 'E57N47',
                //     flagName: 'FlagMbr5',
                //     creeps: [
                //             'mBrT1','mBrT2','mBrT3',
                //             'mLrT1',
                //             'mRrT1','mRrT2','mRrT3',
                //             //'dfRT1', 
                //             //'mClT1',
                //             ],
                //     noSpawn: [
                //             'mBrT1','mBrT2','mBrT3',
                //             'mLrT1',
                //             'mRrT1','mRrT2','mRrT3',
                //         ],
                //     towers: [{"x":31,"y":40},{"x":30,"y":39},],
                // },
                 'E53N42': {
                    shard: 'shard2',
                    spawnRoom: 'E55N39',
                    flagName: 'FlagMbr6',
                    creeps: [
                            'mBrM1',//'mBrM2',
                            //'mLrM1',
                            // 'mRrM1',
                            //'dfRM1', 
                            //'mClM1',
                            ],
                    noSpawn: [
                        ],
                    towers: [{"x":33,"y":13},],
                },
                 'E55N41': {
                    shard: 'shard2',
                    spawnRoom: 'E55N39',
                    flagName: 'FlagMbr7',
                    creeps: [
                            'mBrN1',//'mBrN2',
                            //'mLrN1',
                            // 'mRrN1',
                            //'dfRN1', 
                            //'mClN1',
                            ],
                    noSpawn: [
                        ],
                    towers: [{"x":34,"y":30},],
                },
                  'E57N42': {
                    shard: 'shard2',
                    spawnRoom: 'E55N39',
                    flagName: 'FlagMbr8',
                    creeps: [
                            'mBrB1',//'mBrB2',
                            //'mLrB1',
                            // 'mRrB1',
                            //'dfRB1', 
                            //'mClB1',
                            ],
                    noSpawn: [
                        //'mBrB1',
                        ],
                    towers: [{"x":16,"y":23},],
                },
                
                //endtmp
                //  'E46N19': {
                //     shard: 'shard2',
                //     spawnRoom: 'E45N22',
                //     flagName: 'FlagMbr10',
                //     creeps: [
                //             'mBrZ1','mBrZ2','mBrZ3',
                //             'mLrZ1',
                //             // 'mRrZ1',
                //             //'dfRZ1', 
                //             //'mClZ1', 
                //             ],
                //     noSpawn: [
                //         'mBrZ1','mBrZ2','mBrZ3',
                //         ],
                //     towers: [{"x":35,"y":11},{"x":36,"y":10},],
                // },
               
            }
            
            for (let mbrRoom in mbrInfos) {
                if (mbrInfos[mbrRoom].shard && Game.shard.name != mbrInfos[mbrRoom].shard) {
                    continue;
                }
                this.runMbr(mbrInfos[mbrRoom]);
                let room = Game.rooms[mbrRoom];

                if (room && mbrInfos[mbrRoom].spawns && mbrInfos[mbrRoom].spawns.length && room.controller.level == 1) {
                    let pos = new RoomPosition(mbrInfos[mbrRoom].spawns[0].x, mbrInfos[mbrRoom].spawns[0].y, mbrRoom);
                    let res = pos.createConstructionSite(STRUCTURE_SPAWN, 'Spawn1_'+mbrRoom);
                }
                if (room && mbrInfos[mbrRoom].towers && mbrInfos[mbrRoom].towers.length && room.controller.level == 3) {
                    let pos = new RoomPosition(mbrInfos[mbrRoom].towers[0].x, mbrInfos[mbrRoom].towers[0].y, mbrRoom);
                    let res = pos.createConstructionSite(STRUCTURE_TOWER);
                    //console.log('createTower', mbrRoom, pos, res);
                }
                if (room && mbrInfos[mbrRoom].towers && mbrInfos[mbrRoom].towers.length>1 && room.controller.level == 5) {
                    let pos = new RoomPosition(mbrInfos[mbrRoom].towers[1].x, mbrInfos[mbrRoom].towers[1].y, mbrRoom);
                    pos.createConstructionSite(STRUCTURE_TOWER);
                }
                if (room && mbrInfos[mbrRoom].storage && room.controller.level == 4 && !room.storage) {
                    let pos = new RoomPosition(mbrInfos[mbrRoom].storage.x, mbrInfos[mbrRoom].storage.y, mbrRoom);
                    pos.createConstructionSite(STRUCTURE_STORAGE);
                }
                if (room && mbrInfos[mbrRoom].terminal && room.controller.level == 6 && !room.terminal) {
                    let pos = new RoomPosition(mbrInfos[mbrRoom].terminal.x, mbrInfos[mbrRoom].terminal.y, mbrRoom);
                    pos.createConstructionSite(STRUCTURE_TERMINAL);
                }
                if (room && room.controller && room.controller.my && room.controller.level >=3 && room.controller.level <= 8 && room.name == 'E33N9') {
                    //require('timeSavingRoom').towerHealRepair(room);
                    let enemys = room.find(FIND_HOSTILE_CREEPS);
                    if (enemys.length) {
                        let towers = room.find(FIND_MY_STRUCTURES, {filter: struct => struct.structureType == STRUCTURE_TOWER});
                        if (towers.length) {
                            let target = towers[0].pos.findClosestByRange(enemys);
                            if (towers[0].pos.getRangeTo(target) < 20 || Memory.rooms.E33N9.maxradiusDefendMode > 15) {
                                towers.forEach(tower => tower.attack(target))
                            }
                            if (towers[0].pos.getRangeTo(target) > 18) {
                                Memory.rooms.E33N9.maxradiusDefendMode = 11;
                            }
                            if (towers[0].pos.getRangeTo(target) < 10) {
                                Memory.rooms.E33N9.maxradiusDefendMode = 100;
                            }
                            //console.log('E33N9 range '.towers[0].pos.getRangeTo(target));
                        }
                    } else {
                        Memory.rooms.E33N9.maxradiusDefendMode = 11;
                    }
                } else if (room && room.controller && room.controller.my && room.controller.level >=3 && room.controller.level <= 8) {
                    let enemys = room.find(FIND_HOSTILE_CREEPS);
                    if (enemys.length) {
                        if (0 && room.controller.safeMode) {
                            
                        } else if (room.name == 'E38N8') {
                            enemys = enemys.filter(e=>e.pos.x >= 6 && e.pos.y < 46);
                            if (enemys.length) {
                                room.find(FIND_MY_STRUCTURES, {filter: struct => struct.structureType == STRUCTURE_TOWER}).forEach(tower => tower.attack(enemys[0]));    
                            }
                        } else {
                            room.find(FIND_MY_STRUCTURES, {filter: struct => struct.structureType == STRUCTURE_TOWER}).forEach(tower => tower.attack(enemys[0]));        
                        }
                        
                    } else {
                        let helps = room.find(FIND_MY_CREEPS).filter(c=>c.hits < c.hitsMax);
                        let target = _.max(helps, c=>c.hitsMax - c.hits);
                        if (target) {
                            room.find(FIND_MY_STRUCTURES, {filter: struct => struct.structureType == STRUCTURE_TOWER}).forEach(tower => tower.heal(target));    
                        } 
                        if (room.name == 'E47S4') { 
                            require('timeSavingRoom').towerHealRepair(room);    
                        }
                    }
                }
                if (room && room.controller && room.controller.my && room.controller.level > 1 && room.controller.level <= 8) {
                    if (room.controller.pos.findInRange(FIND_HOSTILE_CREEPS, 3 , {filter: c=>c.getActiveBodyparts(CLAIM) && c.owner.username != 'Invader' }).length) {
                        room.controller.activateSafeMode();
                    }
                }
                if (room) {
                    let amount = 0;
                    let flag = Game.flags[mbrInfos[mbrRoom].flagName];
                    if (flag && flag.room) {
                        flag.pos.lookFor(LOOK_TOMBSTONES).forEach(tomb=>amount += tomb.store[RESOURCE_ENERGY]);
                        flag.pos.lookFor(LOOK_RESOURCES).forEach(dropped=>amount += (dropped.resourceType == RESOURCE_ENERGY?dropped.amount:0));
                    }
                    if (amount) {
                        flag.room.visual.text(amount, flag.pos.x, flag.pos.y+1);    
                    }
                    
                }
            }
        }
        
     

        
    
       
        
        
        if (1 && Game.shard.name == 'shard2' && Game.time<46041510 +820) {
            const spawnRoom = 'E44S8';  
            for (let creepName of ['manualBuilder1',]) {
                let creep = Game.creeps[creepName];
                if (!creep) {
                    const spawns = Game.rooms[spawnRoom].find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning;}
                    });
                    if (1 && spawns.length && Game.rooms[spawnRoom].memory.spawnBusyTick != Game.time){
                        console.log('!!!!!!!!!!!!!!!!!!!');
                         //spawns[0].spawnCreep([CLAIM, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, WORK,WORK,WORK,WORK,WORK, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,], creepName, {memory: {room: spawnRoom, role: 'manualBuilder', boosts:[]}});    
                         let body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
                         spawns[0].spawnCreep(body, creepName, {memory: {room: spawnRoom, role: 'manualBuilder', boosts:[]}});
                        //spawns[0].spawnCreep([CLAIM,CARRY,MOVE,MOVE,MOVE,MOVE,], creepName, {memory: {room: spawnRoom, role: 'manualBuilder', boosts:[]}});    
                    }
                } else {
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
                    //creep.memory.warningMove = 1;
                    if (!creep.store[RESOURCE_ENERGY]) { 
                        if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY]) {
                            helpers.smartMove(creep, creep.room.storage);
                            creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                        } else if (creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY]) {
                            helpers.smartMove(creep, creep.room.terminal);
                            creep.withdraw(creep.room.terminal, RESOURCE_ENERGY);
                        } else if (creep.room.name == 'E39N31_') {
                            let source = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES).filter(s=>s.structureType == STRUCTURE_RAMPART));
                            if (source) {
                                creep.memory.harvestId = source.id;
                            }
                        } else {
                            let source = creep.pos.findClosestByRange(creep.room.find(FIND_SOURCES_ACTIVE).filter(s=>s.id != '5bbcaf3f9099fc012e63a5f0'));
                            if (source) {
                                creep.memory.harvestId = source.id;
                            } else if (creep.room.name == 'E39N31_') {
                                let source = creep.pos.findClosestByRange(creep.room.find(FIND_STRUCTURES).filter(s=>s.structureType == STRUCTURE_RAMPART));
                                if (source) {
                                    creep.memory.harvestId = source.id;
                                }
                            }
                            //helpers.smartMove(creep, Game.rooms[creep.memory.room].storage);    
                        }
                    } else {
                        let flag = Game.flags.FlagManual;
                        if (flag) { 
                            if (!flag.room || creep.room.name != flag.room.name) {
                                helpers.smartMove(creep, flag);
                            } else {
                                if (creep.room.controller && creep.room.controller.my && creep.room.controller.owner.username == 'Xolym' && creep.room.name == 'E39N31' && creep.room.controller.level == 2 && creep.room.controller.ticksToDowngrade < 10000) {
                                    helpers.smartMove(creep, creep.room.controller,0,2);
                                    creep.upgradeController(creep.room.controller);
                                    creep.say('ucUp');
                                } else if (creep.room.controller && creep.room.controller.my && creep.room.controller.owner.username == 'Xolym' && creep.room.controller.level == 1) {
                                    helpers.smartMove(creep, creep.room.controller,0,2);
                                    creep.upgradeController(creep.room.controller);
                                    creep.say('uc');
                                    
                                    if (0 && Game.shard.name == 'shard3' && creep.room.name == 'E38N28') { 
                                        //kil all all buildings
                                        let room = creep.room;
                                        if (room && room.controller && room.controller.my) {
                                                room.find(FIND_STRUCTURES).forEach(struct => {
                                                    // if (struct.store && struct.store[RESOURCE_ENERGY]>10000) {
                                                        
                                                    // } else {
                                                        struct.destroy();    
                                                    // }
                                                    
                                                    // if (struct.store && struct.store[RESOURCE_ENERGY]>50000) {
                                                        
                                                    // } else {
                                                    //     struct.destroy();    
                                                    // }
                                                    
                                                    // if (struct.structureType == STRUCTURE_WALL) {
                                                    //     struct.destroy();
                                                    // } 
                                            })
                                        }
                                    }
                                    
                                    
                                } else if ((creep.room.controller && creep.room.controller.my && creep.room.controller.owner.username == 'Xolym' && creep.room.controller.level > 1) || creep.room.name == 'E39N31_') {
                                    if (creep.room.name == 'E47N19' && !creep.memory.wallCreated) {
                                        for (let dx=-1;dx<2;dx++) {
                                            for (let dy=-1;dy<2;dy++) {
                                                if (!dx && !dy) continue;
                                                let pos = new RoomPosition(creep.room.controller.pos.x+dx, creep.room.controller.pos.y+dy, creep.room.name);
                                                pos.createConstructionSite(STRUCTURE_WALL);
                                            }
                                        }
                                        creep.memory.wallCreated = 1; 
                                    } 
                                    
                                    let target = Game.getObjectById(creep.memory.targetId);
                                    if (!target || creep.pos.inRangeTo(target, 3)) {
                                        if (target) {
                                            creep.build(target);
                                        }
                                        let newTarget = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {filter: (structure) => {return structure.id !== creep.memory.targetId;}});
                                        if (newTarget) {
                                            creep.memory.targetId = newTarget.id;
                                            creep.moveTo(newTarget);
                                        } else {
                                            creep.say('no task');    
                                            helpers.smartMove(creep, flag);            
                                        }
                                    } else if (target) {
                                         helpers.smartMove(creep, target);
                                    }
                                    // if (!helpers.buildClosestStructure(creep)) {
                                    //     creep.say('no task');
                                    // }
                                //} else if (creep.room.name == 'E39N31') {                                    
                                } else {
                                    helpers.smartMove(creep, creep.room.controller);
                                    if (creep.pos.isNearTo(creep.room.controller)) {
                                        let res = creep.claimController(creep.room.controller);
                                        creep.signController(creep.room.controller, 'reserved');//!!!!!!!!!!!!!!!!!!!!
                                        creep.say('ready'+res);
                                        if (res == -7) {
                                            res = creep.attackController(creep.room.controller);
                                            creep.say('atk'+res);
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                }
                
            }
            
        }
        
        
        
        try {
            if (0 && Game.shard.name == 'shard2') {
              
                    [/*'test','asdsad','asdsde','csdsfaq','vsvere',*/'awdwve','wedadw','aafwesd','ewaeawd'].forEach(name =>{
                        //let name = 'test';
                        let creep = Game.creeps[name];
                        let spawnRoom = 'E47N39';
                        if (!creep) {
                            const spawns = Game.rooms[spawnRoom].find(FIND_MY_STRUCTURES, {
                                filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning;}
                            });
                            if (spawns.length){
                                let body = [MOVE, ];
                                if (Game.cpu.bucket > 4000) {
                                    //spawns[0].spawnCreep(body, name, {memory: {room: spawnRoom, role: 'test', boosts:[]}});         
                                }
                            }
                        } else if (!creep.spawning) {
                            creep.memory.warningMove = 1;
                            creep.heal(creep);
                            let pos = Game.flags.t_move.pos;
                            if (!creep.pos.isEqualTo(pos)){
                                if (creep.memory.role == 'test') {
                                    helpers.smartMove(creep, pos, 1, 0);    
                                }
                                let enemys = creep.room.find(FIND_HOSTILE_CREEPS, {
                                    filter:  (object) =>
                                        helpers.ownerNotInWhiteList(object.owner.username)
                                        && object.owner.username !== 'Source Keeper'
                                        && (object.getActiveBodyparts(ATTACK)>= 1 || object.getActiveBodyparts(RANGED_ATTACK)>= 1)
                                });
                                let rangeToEnemy = creep.pos.getRangeTo(creep.pos.findClosestByRange(enemys));
                                //creep.say(rangeToEnemy);
                                if (rangeToEnemy<=4) {
                                    //creep.say('😲',1);
                                } else if (rangeToEnemy<=15) {
                                    //creep.say('😦');
                                } else if (rangeToEnemy<=50) {
                                    //creep.say('🙄');
                                }
                            } else {
                                creep.memory.role = undefined;
                            }
                        }
                    })
              
          }
          
            if (Game.shard.name == 'shard2') {
                if (!this.walls) {
                this.walls = [
                    //   {name: 'wall64', pos: {roomName: 'E41N12', x:14, y:25}, spawnRoom: 'E36N9'},  
                    //   {name: 'wall65', pos: {roomName: 'E51N53', x:32, y:28}, spawnRoom: 'E57N47'},  
                    //   {name: 'wall66', pos: {roomName: 'E39N29', x:11, y:25}, spawnRoom: 'E42N28'},  
              

                ];
                }
                for (let creepInfo of this.walls) {
                    this.runWall(creepInfo);
                }
            }      
            
            if (Game.shard.name == 'shard3') {
                if (!this.walls) {
                    this.walls = [
                        //   {name: 'wall63', pos: {roomName: 'E39N23', x:11, y:10}, spawnRoom: 'E39N21'},  
                        //   {name: 'wall64', pos: {roomName: 'E36N21', x:30, y:31}, spawnRoom: 'E39N21'},  
                    ];
                }
                for (let creepInfo of this.walls) {
                    this.runWall(creepInfo);
                }
            }       
            
            if (1 && Game.shard.name == 'shard0') {
                if (!this.walls0) {
                this.walls0 = [
                    //   {name: 'wall64', pos: {roomName: 'E45N39', x:30, y:23}, spawnRoom: 'E52N41'},  
                    //   {name: 'wall65', pos: {roomName: 'E42N42', x:34, y:32}, spawnRoom: 'E52N41'},  
                    //   {name: 'wall66', pos: {roomName: 'E46N49', x:27, y:25}, spawnRoom: 'E54N49'},  
                    //   {name: 'wall67', pos: {roomName: 'E47N48', x:20, y:32}, spawnRoom: 'E52N46'},  
                    //   {name: 'wall68', pos: {roomName: 'E42N49', x:19, y:23}, spawnRoom: 'E54N49'},  
                    //   {name: 'wall69', pos: {roomName: 'E45N39', x:32, y:28}, spawnRoom: 'E52N41'},  
                    //   {name: 'wall70', pos: {roomName: 'E41N37', x:8,  y:18}, spawnRoom: 'E52N41'},  
                    //   {name: 'wall71', pos: {roomName: 'E47N29', x:17, y:8 }, spawnRoom: 'E52N41'}, 
              

                ];
                }
                for (let creepInfo of this.walls0) {
                    this.runWall(creepInfo);
                }
            }   
              
            
            
    
    
            
    
            
          
    
            if (0 && Game.shard.name == 'shard2') {
                //Memory.massRangers['E58N31'] = {room:'E57N29', count: 1, time:Game.time + 500, };
                
                
                Memory.massRangers['E39N16'] = {room:'E41N23', count: 1, time:Game.time + 20000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], boosts: []};
                Memory.massRangers['E38N15'] = {room:'E41N23', count: 1, time:Game.time + 20000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], boosts: []};
                Memory.massRangers['E37N13'] = {room:'E41N23', count: 1, time:Game.time + 20000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], boosts: []};
                Memory.massRangers['E41N13'] = {room:'E41N23', count: 1, time:Game.time + 20000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], boosts: []};
                Memory.massRangers['E53N42'] = {room:'E55N39', count: 2, time:Game.time + 20000, boosted: 0, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE]};
                
                
                //Memory.massRangers['E45N41'] = {room:'E44N38', count: 1, time:Game.time + 40000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: []};
                
                
                //                                                  [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,MOVE,];
                Memory.massRangers['E41N13'] = {room:'E41N23', count: 1, time:Game.time + 20000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], boosts: []};
                //Memory.massRangers['E57N32'] = {room:'E55N31', count: 1, time:Game.time + 20000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,   MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,], boosts: []};
                
                
                
                Memory.rooms.E39N15 = {};Memory.rooms.E39N15.avoid = 1;
                Memory.rooms.E37N19 = {};Memory.rooms.E37N19.avoid = 1;
                Memory.rooms.E38N18 = {};Memory.rooms.E38N18.avoid = 1;
                //Memory.massRangers['E57N31'] = undefined;Memory.massRangers['E58N32'] = undefined;Memory.massRangers['E58N33'] = undefined;
                
                //Memory.massRangers['E45N38'] = {room:'E47N39', count: 1, time:Game.time + 20000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK, MOVE,MOVE, HEAL, MOVE], boosts: []};
                //Memory.massRangers['E45N38'] = {room:'E47N39', count: 1, time:Game.time + 2000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,MOVE,], boosts: []};
                //Game.creeps.prE47N39_29046009.move(BOTTOM_RIGHT);Game.creeps.prE47N39_29046015.move(Game.creeps.prE47N39_29046015.pos.getDirectionTo(Game.creeps.prE47N39_29046009))
            }
            
            
            if (0) {
            let claimTasks = {
                'dkcl1': {
                    roomName: 'E42N29', dTime: 170, nextTask: {
                      'E39N31': {x:12, y:20, roomName:'E43N29'},
                      //'E42N29': {x:31, y:17, roomName:'E43N29'},
                      'E43N29': {x:31, y:32, roomName:'E44N29'},
                      'E43N29': {x:31, y:32, roomName:'E44N29'},
                      //'E44N29': {x:44, y:16, roomName:'E45N29'},
                    },
                },
                'dkcl2': {
                    roomName: 'E38N31', dTime: 50, nextTask: {
                      'E39N31': {x:27, y:37, roomName:'E38N31'},
                      'E38N31': {x:27, y:40, roomName:'E39N32'},
                    },
                },
                'dkcl3': {
                    roomName: 'E37N31', dTime: 130, nextTask: {
                      'E39N31': {x:38, y:43, roomName:'E37N31'},
                      //'E37N31': {x:31, y:12, roomName:'E39N33'},
                      'E37N31': {x:24, y:22, roomName:'E38N33'},
                    },
                },
                'dkcl4': {
                    roomName: 'E45N28', dTime: 130, nextTask: {
                      'E39N31': {x:43, y:20, roomName:'E45N28'},
                    },
                },
            }
            for (let name in claimTasks) {
                let claimInfo = claimTasks[name];
                let homeRoom = Game.rooms.E39N31;
                let room = Game.rooms[claimInfo.roomName];
                let creep = Game.creeps[name];
                if (creep || !room || room.controller.level == 0 || (room.controller.level == 1 && room.controller.ticksToDowngrade < claimInfo.dTime)) {
                    if (!creep) {
                        const spawns = homeRoom.find(FIND_MY_STRUCTURES, {
                            filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning;}
                        });
                        if (spawns.length){
                            let body = [CLAIM,MOVE];
                            spawns[0].spawnCreep(body, name, {memory: {room: homeRoom.name, role: 'manual_claim'}});    
                        }
                    } else {
                        let target = creep.memory.target;
                        if (!target) {
                            creep.memory.target = claimInfo.nextTask[creep.room.name];
                        } else {
                            let pos = new RoomPosition(target.x, target.y, target.roomName);
                            if (creep.pos.isNearTo(pos)) {
                                let res = creep.claimController(creep.room.controller);
                                if (res == OK) {
                                    if (claimInfo.nextTask[creep.room.name]) {
                                        creep.memory.target = claimInfo.nextTask[creep.room.name];    
                                    } else {
                                        creep.suicide();
                                    }
                                }
                            } else {
                                helpers.smartMove(creep, pos);
                            }
                        }
                    }
                } 
            }
            
        }
        
    
      }catch(e) {
          console.log('err', JSON.stringify(e));
      }
      
      if (0 && Game.shard.name == 'shard0') {  
            let homeRoomName =  'E52N46';          
            let claimTasks = {
                'xlcla1': {
                    roomName: 'E51N46', dTime: 200, nextTask: {
                      [homeRoomName]: {x:18, y:34, roomName:'E51N46'},
                    //   'E42N22': {x:11, y:44, roomName:'E45N22'},
                    //   'E44N38': {x:8, y:16, roomName:'E41N38'},
                    },
                },
                // 'xlcla2': {
                //     roomName: 'E47N19', dTime: 550, nextTask: {
                //       [homeRoomName]: {x:9, y:7, roomName:'E47N19'},
                //     //   'E42N22': {x:11, y:44, roomName:'E45N22'},
                //     //   'E44N38': {x:8, y:16, roomName:'E41N38'},
                //     },
                // },
                // 'xlcla3': {
                //     roomName: 'E47N19', dTime: 550, nextTask: {
                //       [homeRoomName]: {x:9, y:7, roomName:'E47N19'},
                //     //   'E42N22': {x:11, y:44, roomName:'E45N22'},
                //     //   'E44N38': {x:8, y:16, roomName:'E41N38'},
                //     },
                // },
            }
            for (let name in claimTasks) {
                let claimInfo = claimTasks[name];
                let homeRoom = Game.rooms[homeRoomName];
                let room = Game.rooms[claimInfo.roomName];
                let creep = Game.creeps[name];
                if (creep /*|| !room*/  || (room && room.controller.level > 0 && !room.controller.my && (!room.controller.upgradeBlocked || room.controller.upgradeBlocked < claimInfo.dTime))) {
                    if (!creep) {
                        const spawns = homeRoom.find(FIND_MY_STRUCTURES, {
                            filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning;}
                        });
                        if (1 && spawns.length && homeRoom.memory.spawnBusyTick != Game.time){
                            let body = [CLAIM,MOVE];
                            let boosts = undefined;
                            body = [CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,];
                            //body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM]
                            // body = [TOUGH, TOUGH, TOUGH, TOUGH, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL,MOVE, MOVE,MOVE, MOVE,MOVE, MOVE,MOVE, MOVE,MOVE, MOVE,MOVE, MOVE,MOVE, MOVE,CLAIM ];
                            // boosts = [RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE];
                            spawns[0].spawnCreep(body, name, {memory: {room: homeRoom.name, boosts: boosts, role: 'manual_claim'}});    
                        }
                    } else {
                        if (creep.memory.skip == 3) {
                            if (creep.room.controller && creep.room.controller.my && creep.room.controller.level == 1) {
                                if (0) {
                                    creep.room.find(FIND_STRUCTURES).forEach(obj=>obj.destroy());
                                }
                                creep.memory.skip = 1;
                                // creep.suicide();
                                // creep.memory.role = undefined;
                            }
                        }
                        if (creep.memory.skip == 2) {
                            if (creep.room.controller.level == 0) {
                                let res = creep.claimController(creep.room.controller);
                                if (res == OK) {
                                    creep.signController(creep.room.controller, 'reserved');
                                    creep.memory.skip = 3;        
                                    continue;
                                }
                            }
                            creep.memory.skip = 1;
                            // creep.suicide();
                            // creep.memory.role = undefined;
                        }
                        if (creep.memory.skip) {
                            continue;
                        }
                        if (creep.memory.boosts && creep.memory.boosts.length) {
                            continue;
                        }
                        if (1 && creep && creep.pos && Game.flags.flagPairAttackE45N40 && !(Game.time%2)) {
                            try {
                                //Game.flags.flagPairAttackE45N40.setPosition(creep.pos);
                            } catch (e) {}
                        }
                        
                        if (creep.getActiveBodyparts(HEAL)) {
                            creep.heal(creep);    
                        }
                        
                        creep.memory.warningMove = 1; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        // creep.memory.ensurePath = 1;
                        let target = creep.memory.target;
                        if (!target) {
                            creep.memory.target = claimInfo.nextTask[creep.room.name];
                        } else {
                            let pos = new RoomPosition(target.x, target.y, target.roomName);
                            if (creep.pos.isNearTo(pos)) {
                                let res = null;
                                if (0) { // && creep.room.name != 'E42N22') { //alone
                                    if (creep.getActiveBodyparts(HEAL)) {
                                        creep.cancelOrder('heal');    
                                    }
                                    res = creep.attackController(creep.room.controller);    
                                } else {
                                    let cnt = creep.room.controller.pos.findInRange(FIND_MY_CREEPS, 1, {filter: c=>c.getActiveBodyparts(CLAIM)}).length;
                                    let noLifecnt = creep.room.controller.pos.findInRange(FIND_MY_CREEPS, 1, {filter: c=>c.getActiveBodyparts(CLAIM) && c.ticksToLive < 10}).length;
                                    creep.say(cnt+' '+noLifecnt);
                                    if (cnt >= 3 || noLifecnt) {
                                        if (creep.getActiveBodyparts(HEAL)) {
                                            creep.cancelOrder('heal');    
                                        }
                                        res = creep.attackController(creep.room.controller);        
                                    }
                                }
                                //let res = creep.claimController(creep.room.controller);
                                
                                if (res == OK) {
                                    //creep.signController(creep.room.controller, '');
                                    if (claimInfo.nextTask[creep.room.name]) {
                                        creep.memory.target = claimInfo.nextTask[creep.room.name];    
                                    } else {
                                       //creep.suicide();
                                       creep.memory.skip = 2;
                                       //creep.memory.role = undefined;
                                       //helpers.recycleCreep(creep);
                                    }
                                } else {
                                    //creep.claimController(creep.room.controller);
                                }
                            } else {
                                helpers.smartMove(creep, pos);
                            }
                        }
                    }
                } 
            }
            
        }
        
        
        if (0 && Game.shard.name == 'shard2') { 
            let checkRoom = 'E43N14';
            let baseRoom = 'E41N23';
            let ticks = 300;
            
            let pointTime = 36109816    + 2384;
            console.log('pointTime', pointTime - Game.time);
            
            
            if (0 && Game.time == pointTime-400) { //!!!!!!!!!!!!!!!OFF
            
                //let boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE,RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_ZYNTHIUM_ACID];
                let boosts = [RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
                let room = Game.rooms[baseRoom];
                if (room && room.memory && !room.memory.boostLab) {
                    room.memory.boostLab = {boosts:boosts, time:Game.time + ticks+500+300};    
                }

            }
            
            if (1 && Game.time == pointTime-250) {
                
                // Memory.pairs['E52N19'] = {room:'E55N21',  time: Game.time, duration: 300, count: 1, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};
                

                
                
                let boosted = 1;
                let count = 3;
                let body = [TOUGH,TOUGH,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                HEAL,HEAL,HEAL,HEAL,
                MOVE,];
                let boosts = [RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
                
                Memory.massRangers[checkRoom] = {room:baseRoom, count: count, time:Game.time + ticks, boosted: boosted, body: body, boosts: boosts};
                
    
                
                
                let bodyOne = [TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,];
                let bodyTwo = [TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,];
                let boostOne = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID];
                let boostTwo = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
                
                //Memory.pairs[checkRoom] = {room:baseRoom,  time: Game.time, duration: ticks, count: 1, body: {one:bodyOne, two:bodyTwo}, boosts: {one:boostOne, two:boostTwo}};
                
                //Memory.pairs['E55N27'] = {room:'E55N27',  time: Game.time, count: 1, body: {one:[MOVE], two:[TOUGH, MOVE]}, boosts: {one:[], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE]}};
                //Memory.pairs['E53N33'] = {room:'E52N32',  time: Game.time, count: 1,duration:200, body: {one:[MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,], two:[MOVE]}, boosts: {one:[], two:[]}};
                //Memory.pairs['E53N33'] = {room:'E52N32',  time: Game.time, count: 1,duration:200, body: {one:[MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,], two:[MOVE]}, boosts: {one:[], two:[]}};
                
                //2 towers
                // let bodyOne = [TOUGH,TOUGH,TOUGH,TOUGH,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE];
                // let bodyTwo = [TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,]
                // let boostOne = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID];
                // let boostTwo = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
                // Memory.pairs[checkRoom] = {room:baseRoom,  time: Game.time, duration: ticks, count: 1, body: {one:bodyOne, two:bodyTwo}, boosts: {one:boostOne, two:boostTwo}};
                
                
                // let bodyOne = [TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE];
                // let bodyTwo = [TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,];
                // let boostOne = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID];
                // let boostTwo = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
                
                
                // let bodyOne =  [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                // ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                // ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                // MOVE,
                // ];
                
                // let bodyTwo = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                // RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                // HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                // MOVE,];
                // let boostOne = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID];
                // let boostTwo = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
                
                //  Memory.pairs[checkRoom] = {room:baseRoom,  time: Game.time, duration: ticks, count: 1, body: {one:bodyOne, two:bodyTwo}, boosts: {one:boostOne, two:boostTwo}};
                
            }
            if (0 && Game.time == pointTime-50) {
                checkRoom = 'E32N44';
                let bodyOne = [TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,];
                let bodyTwo = [TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,];
                let boostOne = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID];
                let boostTwo = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
                
                Memory.pairs[checkRoom] = {room:baseRoom,  time: Game.time, duration: ticks, count: 1, body: {one:bodyOne, two:bodyTwo}, boosts: {one:boostOne, two:boostTwo}};                
            }
            
            
            
            
        } 
        
        if (0 && Game.shard.name == 'shard2' && !Memory.pairs['E45N40']) { 
                
                //Memory.pairs['E32N44'] = {room:'E47N39',  time: Game.time, duration: 300, count: 1, body: {one:[TOUGH,TOUGH,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,],two:[TOUGH,TOUGH,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,]}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};


                let bodyOne = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,];
                //TOUGH*10,MOVE*10,HEAL*30
                let bodyTwo = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                MOVE,];
                let boostOne = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, ];
                let boostTwo = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, ];
                
                Memory.pairs['E45N40'] = {room:'E44N38',  time: Game.time, duration: 30000, count: 1, body: {one:bodyOne, two:bodyTwo}, boosts: {one:boostOne, two:boostTwo}};          

                //
            
                
            }
        
        if (0 && Game.shard.name == 'shard2' && !Memory.pairs['E45N41']) { 
            Memory.pairs['E45N41'] = {room:'E47N39',  time: Game.time, duration: 300, count: 1, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,]}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};                
        }
        
        if (0 && Game.shard.name == 'shard2' && !Memory.pairs['E44N41']) { 
                
                
                //TOUGH*14,MOVE*10,RANGED_ATTACK*26
                let bodyOne = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];
                
                //TOUGH*10,MOVE*10,HEAL*30
                let bodyTwo = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                MOVE,];
                let boostOne = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, ];
                let boostTwo = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, ];

            Memory.pairs['E44N41'] = {room:'E47N39',  time: Game.time, duration: 300, count: 1, body: {one:bodyOne, two:bodyTwo}, boosts: {one:boostOne, two:boostTwo}};          
            
        }
        
        
        
        if (0) {
            for (flagName in Game.flags) {
                if ((''+flagName).startsWith('')) {
                    console.log(flagName, Game.flags[flagName].pos.roomName);
                    //Game.flags[flagName].remove();
                }
            }
            
            
        }
        
        
        
        //Memory.massRangers['E37N37'] = {room:'E44N38', count: 1, time:Game.time + 300, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};
        
        
    if (0) {
        //TOUGH*10,MOVE*10,WORK*30
        let bodyOne = [
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            TOUGH,TOUGH,TOUGH,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            ];
        
        //TOUGH*10,MOVE*10,RANGED_ATTACK*10,HEAL*20
        let bodyTwo = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
        RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
        TOUGH,TOUGH,TOUGH,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
        MOVE,
        ];
        let boostOne = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID];
        let boostTwo = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, ];

        Memory.pairs['E44N38'] = {room:'E44N38',  time: Game.time, duration: 300, count: 1, body: {one:bodyOne, two:bodyTwo}, boosts: {one:boostOne, two:boostTwo}};          
        //Memory.pairs['E35N42'] = {room:'E44N38',  time: Game.time, duration: 300, count: 1, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,]}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID], two: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, ]}};
    }        
    

    if (0 && Game.shard.name == 'shard2') {
        Object.keys(Game.constructionSites).forEach(ccId => {
            let obj = Game.getObjectById(ccId);
            if (obj && obj.pos && obj.pos.roomName == 'E52N21') {
                obj.remove();
            }

            // if (obj && obj.structureType == STRUCTURE_ROAD) {
            //     obj.remove();
            // }
        })
    }
    if (0 && Game.shard.name == 'shard2') { //find all room constructionSites
        let roomsCS = {};
        Object.keys(Game.constructionSites).forEach(ccId => {
            let obj = Game.getObjectById(ccId);
            if (obj && obj.pos) {
                roomsCS[obj.pos.roomName] = roomsCS[obj.pos.roomName]?(roomsCS[obj.pos.roomName]+1):1;
            }
        })
        console.log(JSON.stringify(roomsCS));
    }
    
    
    if (0 && Game.shard.name == 'shard3' && (!((Game.time+0)%100) || !((Game.time+1)%100) || !((Game.time+2)%100) )) {
        let obs = Game.getObjectById('5e50cd6cb201e47b886c124e');
        if (obs) {
            ['E39N33', 'E39N31'].forEach(roomName => {
                let room = Game.rooms[roomName];
                if (!room) {
                    obs.observeRoom(roomName);
                } else {
                    let hostiles = room.find(FIND_HOSTILE_CREEPS, {
                        filter: function (object) {
                            return object.owner.username != 'Invader'
                            && object.owner.username != 'Darking'
                            && object.body.length > 1;
                        }
                    });
                    console.log('see room', roomName, hostiles.length);
                    if (hostiles.length) {
                        Game.notify(`SET ON Defend Room Mode in room DARKING ${roomName}`, 0);
                    }
                }
            })
        }
    }
    
    if (0 && Game.shard.name == 'shard2' && (!((Game.time+0)%10) || !((Game.time+1)%10) )) {
        let obs = Game.getObjectById('61a9f15edfb988415fea771e');
        if (obs) {
            ['E28N11',].forEach(roomName => {
                let room = Game.rooms[roomName];
                if (!room) {
                    obs.observeRoom(roomName);
                } else {
                    let hostiles = room.find(FIND_HOSTILE_CREEPS).filter(c=>c.getActiveBodyparts(TOUGH) > 5)
                    console.log('see room', roomName, hostiles.length);
                    if (hostiles.length) {
                        console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
                        Memory.pairs.E37N10.count = 3;// Memory.pairs.E37N10.count = 0
                        Memory.massRangers.E37N10.count = 5;//Memory.massRangers.E37N10.count = 0
                    }
                }
            })
        }
    }
    
    if (0 && Game.shard.name == 'shard2') {
        const startCpu = Game.cpu.getUsed();
        let findMode = FIND_CREEPS;//FIND_HOSTILE_CREEPS;
                
        let room = Game.rooms.E58N22;
        let hostiles = room.find(findMode);
        let towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        
        // Gadjung  11:44 PM rate my spaghetti:  
        sortedHostiles = hostiles
        .map((hostile) => {
            let hostilePotentialRecovery = hostile.pos.findInRange(findMode, 1)
            .map((c) => {
                return _.filter(c.body, {type: HEAL})
                    .map((b) => {
                        switch (b.boost) {
                            case RESOURCE_LEMERGIUM_OXIDE:
                                return 2 * HEAL_POWER
                            case RESOURCE_LEMERGIUM_ALKALIDE:
                                return 3 * HEAL_POWER
                            case RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE:
                                return 4 * HEAL_POWER
                            default:
                                return HEAL_POWER;
                        }
                    }).reduce((h1, h2) => { return h1 + h2 }, 0)
            }).reduce((th1, th2) => { return th1 + th2 }, 0)
        return { creep: hostile, potentialRecovery: hostilePotentialRecovery }
        })
        .map((hostile) => {
            let dmgByTowers = towers.map((t) => { return t.pos.getRangeTo(hostile.creep) })
                .map((dist) => { return this.calcTowerDmgAtRange(dist) }).reduce((d1, d2) => { return d1 + d2 }, 0)
            return { hostile: hostile.creep, potentialRecovery: hostile.potentialRecovery, potentialTowerDmg: dmgByTowers }
        })
        .map((hostile) => {
            let actualDmg = 0;
            let towerDmg = hostile.potentialTowerDmg;
            let damageReduction = hostile.hostile.body.forEach((b) => {
                if (towerDmg > 0) {
                    let k = 1;
                    if (b.type == TOUGH) {
                        switch (b.boost) {
                            case RESOURCE_GHODIUM_OXIDE:
                                k = 0.7;
                                break;
                            case RESOURCE_GHODIUM_ALKALIDE:
                                k = 0.5;
                                break;
                            case RESOURCE_CATALYZED_GHODIUM_ALKALIDE:
                                k = 0.3;
                                break;
                            default:
                                k = 1;
                        }
                    }
                    
                    towerDmg -= (b.hits / k);
                    if (towerDmg >= 0) {
                        actualDmg += b.hits;    
                    } else {
                        towerDmg += (b.hits / k);
                        let newHits = b.hits - towerDmg * k;
                        actualDmg += (b.hits - newHits);
                        towerDmg -= (b.hits / k);
                    }
                }
            });
            if (towerDmg>0) {
                actualDmg += towerDmg;
            }
            return { hostile: hostile.hostile, potentialRecovery: hostile.potentialRecovery, potentialTowerDmg: hostile.potentialTowerDmg, actualTowerDmg:  actualDmg, hitsLeft: hostile.hostile.hits - actualDmg +  hostile.potentialRecovery};
        })
        .sort((h1, h2) => {
            return h1.hitsLeft - h2.hitsLeft;
        })
        .sort((h1, h2) => {
            return (h2.actualTowerDmg - h2.potentialRecovery) - (h1.actualTowerDmg - h1.potentialRecovery)
        });
        
        room.memory.sortedHostiles = undefined;
        
        
        const elapsed = Game.cpu.getUsed() - startCpu;
        console.log(' twrpotCpu '+ elapsed.toFixed(2));
        
        sortedHostiles.forEach(hostileInfo => {
            let creep = hostileInfo.hostile;
            if (creep) {
                room.visual.text(hostileInfo.potentialTowerDmg+' '+hostileInfo.potentialRecovery+' '+hostileInfo.actualTowerDmg+' '+hostileInfo.hitsLeft,  creep.pos);
            }
        });
        
        if (sortedHostiles.length) {
            room.visual.circle(sortedHostiles[0].hostile.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
        }

        
    }
    
    if (0 && Game.shard.name == 'shard2') {
        //Memory.massRangers['E47N19'] = {room:'E45N22', count: 3, time:Game.time + 20000, boosted: 0, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};
        // Memory.massRangers['E53N29'] = {room:'E55N31', count: 2, soonDie: 350, time:Game.time + 2000000, };
        // Memory.massRangers['E52N28'] = {room:'E52N32', count: 1, soonDie: 350, time:Game.time + 2000000, };
        // Memory.massRangers['E54N25'] = {room:'E55N27', count: 1, soonDie: 350, time:Game.time + 2000000, body: [TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};      
        // Memory.massRangers['E56N24'] = {room:'E55N27', count: 1, soonDie: 350, time:Game.time + 2000000, body: [TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};
        //Memory.massRangers['E56N34'] = {room:'E52N32', count: 1, soonDie: 350, time:Game.time + 2000000, body: [TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};      
        // Memory.pairs['E54N25'] = {room:'E55N27',  time: Game.time, duration: 3000000, count: 1, soonDie: 300, body: {one:[
        //Memory.pairs['E51N29'] = {room:'E52N32',  time: Game.time, duration: 3000000, count: 1, soonDie: 300, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};                
        
        //Memory.pairs['E51N29'] = {room:'E52N32',  time: Game.time, duration: 3000000, count: 1, soonDie: 300, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};                
        
        
        //Memory.pairs['E38N28'] = {room:'E42N31',  time: Game.time, duration: 300, count: 1, soonDie: 300, body: {one:[TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE], two: [TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],}, boosts: {one:[RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, ], two:[RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, ]}};                
        //Memory.massRangers['E41N25'] = {room:'E42N31', count: 1, time:Game.time + 300, boosted: 0, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE]};
    }
    
    if (0 && Game.shard.name == 'shard2') {
        // Game.getObjectById('5f87576d5865c515641acb9f').launchNuke(new RoomPosition(29,37, 'E53N25'));
        // Game.getObjectById('5f1228e04765a7ffdef4205c').launchNuke(new RoomPosition(29,37, 'E53N25'));
        // Game.getObjectById('5eedc971ea0c2e9f78fa70d7').launchNuke(new RoomPosition(29,37, 'E53N25'));
        
        // Game.getObjectById('5e9ea121e437cf90e960d34a').launchNuke(new RoomPosition(33,36, 'E57N24'));
        // Game.getObjectById('5e90188b0c2915d04464c99a').launchNuke(new RoomPosition(33,36, 'E57N24'));
        // Game.getObjectById('5ea86cb159f633bf923ae243').launchNuke(new RoomPosition(33,36, 'E57N24'));
        // Game.getObjectById('5eb985565210c08c12b79b57').launchNuke(new RoomPosition(33,36, 'E57N24'));
        // Game.getObjectById('5ecf8e99dad0f91639b6c55b').launchNuke(new RoomPosition(33,36, 'E57N24'));
        // Game.getObjectById('5f01bdb34df074f7966b3240').launchNuke(new RoomPosition(33,36, 'E57N24')); //use
        
        // Game.getObjectById('5f5772758b8a65a3e194fbdb').launchNuke(new RoomPosition(23,14, 'E52N29')); //no
        // Game.getObjectById('5f6f2b8da0bf6026e50c883b').launchNuke(new RoomPosition(23,14, 'E52N29')); //no 
        // Game.getObjectById('5ed8e02831b78efe372c8d04').launchNuke(new RoomPosition(23,14, 'E52N29'));
        // Game.getObjectById('5f426f7cd6bb4c0cb6cd127a').launchNuke(new RoomPosition(23,14, 'E52N29'));
        // Game.getObjectById('5fb8ce23fc1f0d5b2eeee5bf').launchNuke(new RoomPosition(23,14, 'E52N29'));
        // Game.getObjectById('5fa0692582df2ba53eeae7f2').launchNuke(new RoomPosition(23,14, 'E52N29'));
        
        // Memory.quadGroups.E54N25_3.safeDistance = 2
        //Memory.pairs['E57N34'] = {room:'E55N31',  time: Game.time, duration: 300000, count: 1, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};                
        //Memory.pairs['E53N26'] = {room:'E55N27',  time: Game.time, duration: 300000, count: 1, body: {one:[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,], two:[RANGED_ATTACK,MOVE,MOVE,HEAL],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID], two:[]}};                        
        //Memory.pairs.E53N26.groups[1] = {live:1, spawn:0, one:'prE55N27_32014058', two: 'prE55N27_32014060'}
        //Memory.pairs['E57N24'].body = {one:[TOUGH,TOUGH,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,], two:[TOUGH,TOUGH,RANGED_ATTACK,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],};
        //Memory.pairs['E57N24'].body = {one:[TOUGH,TOUGH,TOUGH,TOUGH,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE],};
        
        //Memory.massRangers['E37N19'] = {room:'E41N23', count: 1, soonDie: 350, time:Game.time + 2000000, body: [TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};      
        //Memory.massRangers['E55N37'] = {room:'E57N35', count: 1, soonDie: 350, time:Game.time + 2000000, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};
        
        //Memory.pairs['E36N9'] = {room:'E41N19',  time: Game.time, duration: 60000, count: 1, soonDie: 650, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,],two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE]}};                
        //Memory.pairs['E41N5'] = {room:'E36N9',  time: Game.time, duration: 20000, count: 2, soonDie: 650, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,],two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};
        
        //intershard
        // Memory.massRangers['E51N39'] = {room:'E47N39', count: 1, soonDie: 350, time:Game.time + 20000, inter:1, portal:{x:33, y:14, roomName:'E50N40', resetShard:'shard3'}, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};
        //Memory.massRangers['E40N40'] = {room:'E41N39', count: 1, soonDie: 350, time:Game.time + 200000, inter:1, portal:{x:19, y:11, roomName:'E40N40', resetShard:'shard1'}, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};
        //Memory.massRangers['E47N7'] = {room:'E45N11', count: 1, soonDie: 350, time:Game.time + 200000, inter:1, portal:{x:26, y:5, roomName:'E50N10', resetShard:'shard3'}, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], boosts: []};
        //Memory.massRangers['E39N21'] = {room:'E41N19', count: 1, soonDie: 350, time:Game.time + 20000, inter:1, portal:{x:30, y:14, roomName:'E40N20', resetShard:'shard3'}, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};
        //Memory.massRangers['E39N23'] = {room:'E41N19', count: 1, soonDie: 50, time:Game.time + 60000, inter:1, portal:{x:30, y:14, roomName:'E40N20', resetShard:'shard3'}, };
        //Memory.massRangers['E37N24'] = {room:'E41N19', count: 1, soonDie: 400, time:Game.time + 60000, inter:1, portal:{x:30, y:14, roomName:'E40N20', resetShard:'shard3'}, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};
        //Memory.pairs['E37N24'] = {room:'E41N19',  time: Game.time, duration: 60000, count: 2, soonDie: 650, inter:1, portal:{x:30, y:14, roomName:'E40N20', resetShard:'shard3'}, body: {one:[MOVE,],two:[MOVE,HEAL,],}, };
        
        // Memory.pairs['E37N24'] = {room:'E41N23',  time: Game.time, duration: 60000, count: 0, soonDie: 650, inter:1, portal:{x:30, y:14, roomName:'E40N20', resetShard:'shard3'}, }; 
        // Memory.pairs['E37N24'].body = {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],};
        // Memory.pairs['E37N24'].boosts = {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID],two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};
        // Memory.pairs['E37N24'].count = 1;
        //Memory.pairs['E37N24'].body = {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],};
        
        // Memory.pairs['E37N24'].body = {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],};
         
        
        
    }
    
    if (1 && Game.shard.name == 'shard2' && Game.time < 50015530  + 60000 && Memory.rooms.E42N12) {
        Memory.rooms.E42N12.avoid = 0;
    }
    
    
    if (0 && Game.shard.name == 'shard2') {
        let healer = Game.getObjectById('605f575e7d4a7904a6fdd8ae');
        let target = Game.creeps.prE55N27_32005214;
        if (healer && target && target.hits == target.hitsMax) {
            if (healer.pos.getRangeTo(target)<4) {
                healer.move(BOTTOM_LEFT)    
            }
        }
    }
    
     if (0 && Game.shard.name == 'shard2') {
        let healer = Game.getObjectById('6067e3b0f149cdd8bcfa3957');
        let target = Game.creeps.prE55N31_32152206;
        if (healer && target && target.hits == target.hitsMax) {
            if (healer.pos.getRangeTo(target)<2) {
                healer.move(RIGHT)    
            }
        }
    }
    
    try {
        // Game.creeps.mrE41N23_35587784.move(RIGHT);
        // Game.creeps.mrE41N23_35587918.move(RIGHT);
        
        // Game.creeps.ph_E47N39_35459196.move(LEFT);
        // Game.creeps.mrE47N39_35458716.move(LEFT);
        // Game.creeps.mrE47N39_35458804.move(LEFT);
        
        // Game.creeps.prE55N31_32156250.rangedMassAttack();
        // Game.creeps.prE55N31_32156860.rangedMassAttack();
        
        // Game.creeps.mrE52N32_32060786.moveTo(Game.getObjectById('60628c9b3141a422cf39c99c'));
        // Game.creeps.mrE52N32_32060786.rangedAttack(Game.getObjectById('60628c9b3141a422cf39c99c'));
    } catch (e) {}
    
    
    if (0 && Game.shard.name == 'shard2') {
        for (let roomName in Memory.rooms) {
            if (_.isEmpty(Memory.rooms[roomName])) {
                Memory.rooms[roomName] = undefined;
            }
            
        }
        
    }
    
    
    //Game.getObjectById('6078b78d9e39c3019a5490f2').observeRoom('E54N36'); 
    //Game.rooms.E55N39.find(FIND_HOSTILE_CONSTRUCTION_SITES).forEach(c => c.remove())
    
    
    if (0) {
        //{"room":"E54N49","count":1,"startTime":51703131,"time":51703431,"invasion":1,"boosted":1,"body":["tough","tough","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","ranged_attack","move","move","move","move","move","move","move","move","move","move","move","move","move","move","move","move","move","move","move","move","move","move","move","heal","heal","heal","heal","move"],"boosts":["XGHO2","XLHO2","XKHO2"],"portal":{"x":46,"y":5,"roomName":"E40N50","resetRoom":"E40N60"}}
        Game.rooms.E41N23.memory.boostLab = {boosts:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE,], time:Game.time +500+30000};    
        Memory.massRangers['E53N21'] = {room:'E41N23', count: 1, soonDie: 150, time:Game.time + 500, body: [TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,], boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};
        Memory.massRangers['E39N24'] = {room:'E41N23', count: 1, time:Game.time + 300, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], boosts: []};
        Memory.massRangers['W55S5'] = {room:'E41N23', count: 1, time:Game.time + 200000, portal:{x:7, y:9, roomName:'E45N15',resetRoom:'W55S5'}, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], boosts: []};
        Memory.massRangers['E44N13'] = {room:'E41N23', count: 3, soonDie: 750, time:Game.time + 500000, body: [TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};
        Memory.pairs['E45N15'] = {room:'E41N23',  time: Game.time, duration: 300000, count: 1, boosted: 1, };                
        Memory.massRangers['E40N30'] = {room:'E79N59', count: 1, soonDie: 350, time:Game.time + 20000, inter:1, portal:{x:26, y:25, roomName:'E80N60', resetShard:'shard1'}, body: [MOVE,HEAL]};
        
        Memory.massRangers['E51N46'] = {room:'E52N46', count: 1, soonDie: 350, time:Game.time + 200, body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK]};
        
    }
    
    if (0) {
        let room = Game.rooms.E41N19;
        if (room) {
            let roomList = _.filter(Game.rooms, room => room.controller && room.controller.my && room.controller.level == 8).map(room => room.name);
            let nearRoomName = _.min(roomList, roomName => Game.map.getRoomLinearDistance('E53N21', roomName));
            console.log(roomList);
            console.log(nearRoomName);
        }
    }
    
     if (0 && Game.shard.name == 'shard2') {
         require('observer').invasionBoostedOneTower('E41N23', 'E33N24');
         require('observer').invasionBoostedTwoTower('E41N23', 'E33N24');
         require('observer').invasionBoostedThreeTower('E41N23', 'E36N9');
         //
     }
     
      if (0 && Game.shard.name == 'shard2') {
          let creep = Game.creeps.mrE45N11_38773045;
          if (creep && Game.time < 38773231 +60) {
              creep.cancelOrder('move');
              creep.memory._trav = undefined;
          }
      }
      
      if (0 && Game.shard.name == 'shard3') {
          ['mrE41N19_43654920', 'mrE41N19_43654404','mrE41N19_43654240','mrE41N19_43655040'].forEach(creep => {if (Game.creeps[creep]) Game.creeps[creep].cancelOrder('move')});
      }
    


     if (0) {
         let room = Game.rooms.E55N37;
         if (room) {
             
             let target = _.min(room.find(FIND_STRUCTURES, {
                        filter: structure => [STRUCTURE_WALL, STRUCTURE_RAMPART].includes(structure.structureType) 
                            && !_.find(Game.creeps, creep => creep.memory.targetId == structure.id)
                    }), 'hits');
            
            console.log('!!!!!!!!!!',target);
                    
             //creep.memory.targetId = target.id;    
             
             
         }
         
     }
     
     if (0) {//&& Game.shard.name == 'shard0') {
         console.log('find intx50354550');
         let creep = Game.creeps.intx50354550;
         if (creep) {
             Game.notify('intx50354550 detected '+creep.room.name);
             let terminal = Game.getObjectById('60f9a082c88f0f82b5041d78');
             if (terminal) {
                if (creep.pos.isNearTo(terminal)) {
                    creep.transfer(terminal, RESOURCE_DEVICE);
                } else {
                    creep.moveTo(terminal);    
                }
             }
         }
     }
     
    //  if (1 && Game.creeps.intz36628360) {
    //      let creep = Game.creeps.intz36628360;
    //      if (!creep.memory.notified) {
    //         Game.notify('intz36628360 detected in room '+creep.room.name+ ' tick ' + Game.time);    
    //         creep.memory.notified = 1;
    //      }
    //  }
    
    
    if (0 && Game.shard.name == 'shard2') { 
        let nukeTime = 50036866; // Game.time + Game.rooms.E36N9.find(FIND_NUKES)[0].timeToLand
        let roomName = 'E36N9';
        let saveRoomName = 'E35N9';
        let pos;
        if (Game.time> nukeTime - 50 && Game.time < nukeTime) {
            pos = new RoomPosition(24, 24, saveRoomName);
        } else if (Game.time> nukeTime && Game.time < nukeTime+50) {
            pos = new RoomPosition(24, 24, roomName);
        }
        if (pos) {
            [roomName, saveRoomName].forEach(roomName => {
                let room = Game.rooms[roomName];
                if (room) {
                    room.find(FIND_MY_CREEPS).forEach(c=> {
                        c.cancelOrder('move');
                        c.moveTo(pos, {range: 8, ignoreCreeps: true});
                        if (c.fatigue && c.store.getUsedCapacity()) {
                            // drop all resources
                            for(const resourceType in c.store) {
                                c.drop(resourceType);
                            }
                        }
                    });
                    room.find(FIND_MY_POWER_CREEPS).forEach(c=> {
                        c.cancelOrder('move');
                        c.moveTo(pos, {range: 8, ignoreCreeps: true})
                    });
                }
            })
        }
        console.log(roomName, 'nuke landing in ', nukeTime - Game.time, 'ticks');
    }
     

     if (0 && Game.shard.name == 'shard2') { //visual roads
         let creep = Game.getObjectById('6355411cf9569e6219b3ba30');
         if (creep) {
             creep.memory.offRoad = 1;
            //  creep.moveTo(new RoomPosition(41,4, 'E36N9'), {visualizePathStyle: {stroke: '#ffffff'}});
            //  creep.moveTo(new RoomPosition(43,31, 'E37N9'), {visualizePathStyle: {stroke: '#ffffff'}});
             let p = Memory.production;
             if (p) {
                 Memory.production = 0;
             }
             helpers.smartMove(creep, new RoomPosition(9,38, 'E56N44'));
            //  helpers.smartMove(creep, new RoomPosition(38,35, 'E33N8'));
            //  helpers.smartMove(creep, new RoomPosition(41,36, 'E32N9'));
            //  helpers.smartMove(creep, new RoomPosition(6,28, 'E32N9'));
             if (p) {
                 Memory.production = p;
             }

             creep.memory._trav = undefined;
             
             creep.cancelOrder('move');
         }
     }
     
     if (0 && Game.shard.name == 'shard2') { 
         let creep = Game.creeps.dep_E33N9_46238612;
         let target = Game.getObjectById('63dee2f609166a3f4729c691'); 
         if (creep && target) {
             creep.cancelOrder('move');
             creep.rangedMassAttack();
             creep.heal(creep);
             creep.moveTo(target, {range: 1, reusePath: 0});
         }
     }
     
      if (0 && Game.shard.name == 'shard2') { 
          Memory.rooms.E45S3.avoid = 0;
      }
     
  
    //  if (1 && Game.shard.name == 'shard2') { 
         
    //      Game.rooms.E41N5.find(FIND_MY_CREEPS).filter(c=>c.memory.role == 'undefined').forEach(c=>{
    //          c.cancelOrder('move');
    //          helpers.recycleCreep(c);
    //          //c.say(c.moveTo(Game.flags['FlagE41N5wait'], {range:2}));
              
    //      });
    //  }
      
     if (0 && Game.shard.name == 'shard2' && Game.flags['FlagTest1']) {
         let obs = Game.getObjectById('6187bf2003c047fd64befefb');
         let targetRoom = 'E41N11';
         obs.observeRoom(targetRoom);
         let pos = Game.flags['FlagTest1'].pos;
         let room = Game.rooms[targetRoom];
         if (room) {
             let goalStructures = _.filter(room.find(FIND_STRUCTURES), struct => [STRUCTURE_SPAWN].includes(struct.structureType));
             let goals = _.map(goalStructures, struct => { return {pos: struct.pos, range: 1 };});
             console.log(JSON.stringify(goals));
             
             if (1) {
             let ret = PathFinder.search(
                pos, goals,
                {
                  // We need to set the defaults costs higher so that we
                  // can set the road cost lower in `roomCallback`
                  plainCost: 2,
                  swampCost: 10,
                  maxRooms: 1,
            
                  roomCallback: function(roomName) {
                    let room = Game.rooms[roomName];
                    if (!room) return;
                    let costs = new PathFinder.CostMatrix;
                    
                    let allStructures = room.find(FIND_STRUCTURES);
                    let allWallRampStructures = _.filter(allStructures, struct => [STRUCTURE_RAMPART, STRUCTURE_WALL].includes(struct.structureType));
                    let allRoads = _.filter(allStructures, struct => [STRUCTURE_ROAD, ].includes(struct.structureType));
                    
                    allRoads.forEach(road=>costs.set(road.pos.x, road.pos.y, 1));
                    
                    if (allWallRampStructures.length) {
                        let maxHP = _.max(allWallRampStructures, 'hits').hits;
                        //console.log(maxHP);
                        maxHP = Math.max(1, maxHP);
                        
                        allWallRampStructures.forEach(struct => {
                            let val = Math.floor(struct.hits / maxHP * 0xfe);
                            val = Math.max(1, Math.min(val, 0xfe));
                            costs.set(struct.pos.x, struct.pos.y, val);
                            room.visual.text(val, struct.pos.x, struct.pos.y, {font: 0.3});
                        });    
                    }
                    return costs;
                  },
                }
              );
              if (!ret.incomplete && ret.path.length) {
                  console.log(ret.path.length);
                  ret.path.forEach(pos => room.visual.circle(pos));
                  let target = null;
                  ret.path.some(pos => {
                      return pos.lookFor(LOOK_STRUCTURES).some(struct => {
                          if (![STRUCTURE_CONTAINER, STRUCTURE_ROAD].includes(struct.structureType)) {
                              target = struct;
                              return true;
                          }
                      });
                  });
                  console.log(target);
                  
              }
             }
                 
         }
     }
     
 
        
    },
    
    //require('manualScripts').floodFillBorder('E42N31')
    floodFillBorder: function(roomName) {
        let room = Game.rooms[roomName];
        if (!room) return;
        let costs = new PathFinder.CostMatrix;
        room.find(FIND_EXIT).forEach(pos => costs.set(pos.x, pos.y, 255));
        const terrain = new Room.Terrain(room.name);
        let posList = [];
        let isChanged;
        let pass = 1;
        do {
            isChanged = false;
            for (let x = 0 ; x < 50; x++) {
                for (let y = 0; y < 50; y++) {
                    let value = costs.get(x,y);
                    if (value ==255) {
                        for ( let dx = -1; dx < 2; dx++) {
                            for ( let dy = -1; dy < 2; dy++) {    
                                if ((!dx && !dy) || x+dx < 0 || x+dx > 49 || y+dy < 0 || y+dy > 49 || costs.get(x+dx, y+dy) == 255) continue;
                                if (terrain.get(x+dx,y+dy) !== TERRAIN_MASK_WALL){                            
                                    let pos = new RoomPosition(x+dx, y+dy, room.name);
                                    let isRamps = pos.lookFor(LOOK_STRUCTURES).some(struct => [STRUCTURE_WALL, STRUCTURE_RAMPART].includes(struct.structureType));
                                    if (!isRamps) {
                                        costs.set(x+dx, y+dy, 255);
                                        posList.push(pos);
                                        isChanged = true;
                                    } 
                                }
                            }
                        }
                    }
                }
            }
            console.log('Pass', pass, posList.length);
        } while (isChanged && pass++ < 100);
        
        // posList.forEach(pos => room.visual.circle(pos));
        
        posList = posList.filter(chekedPos => {
            let isRampNear = false;
            for ( let dx = -1; dx < 2; dx++) {
                for ( let dy = -1; dy < 2; dy++) {    
                    if (!dx && !dy) continue;
                    if (chekedPos.x+dx < 0 || chekedPos.x+dx > 49 || chekedPos.y+dy < 0 || chekedPos.y+dy > 49) continue;
                    let pos = new RoomPosition(chekedPos.x+dx, chekedPos.y+dy, room.name);
                    let isRamps = pos.lookFor(LOOK_STRUCTURES).some(struct => [STRUCTURE_RAMPART].includes(struct.structureType));
                    if (isRamps) {
                        isRampNear = true;
                    }
                }
            }
            return isRampNear;
        });
        
        console.log('filter', posList.length);
        posList.forEach(pos => room.visual.circle(pos));
    },
    
    //require('manualScripts').ffBorderRoomName('E42N31');
    ffBorderRoomName: function(roomName) {
        let room = Game.rooms[roomName];
        if (!room) return;
        const costs = new PathFinder.CostMatrix;
        const terrain = new Room.Terrain(room.name);
        const posList = [];
        room.find(FIND_EXIT).forEach(pos => this.ffBorder(pos.x, pos.y, room, costs, terrain, posList));
        posList.forEach(pos => room.visual.circle(pos));
        console.log('result length',posList.length);
    },
    
    //require('manualScripts').ffBorderRoom(Game.rooms.E42N31);
ffBorderRoom: function(room) {
    const [costs, terrain, posList] = [new PathFinder.CostMatrix, new Room.Terrain(room.name), []];
    room.find(FIND_EXIT).forEach(pos => this.ffBorderPos(pos.x, pos.y, room, costs, terrain, posList));
    posList.forEach(pos => room.visual.circle(pos));
    return posList;
},

ffBorderPos: function(x,y, room, costs, terrain, posList) {
    if (x<0 || x>49 || y<0 || y>49 || costs.get(x,y) == 255 || terrain.get(x,y) == TERRAIN_MASK_WALL) return;
    let pos = new RoomPosition(x, y, room.name);
    if (!pos.lookFor(LOOK_STRUCTURES).some(struct => [STRUCTURE_RAMPART].includes(struct.structureType))) {
        costs.set(x, y, 255);
        let isNearRamps = false;
        [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].forEach(d => isNearRamps = isNearRamps || this.ffBorderPos(x+d[0], y+d[1], room, costs, terrain, posList));
        //_.flatten(_.range(-1,2).map(d => _.range(-1,2).map(v => [d, v]))).filter(pair => pair[0] || pair[1]).forEach(d => isNearRamps = isNearRamps || this.ffBorderPos(x+d[0], y+d[1], room, costs, terrain, posList));
        if (isNearRamps) posList.push(pos);
    } else {
        return true;
    }
},

//require('manualScripts').findQuadFormation(new RoomPosition(0,20,'E50S10'));
findQuadFormation: function(pos) {
    let room = Game.rooms[pos.roomName];
    if (!room) return;
    const [terrain, data] = [new Room.Terrain(room.name), {}];
    this.findQuadFormationPos(pos.x, pos.y, room, terrain, data, 1);
    Object.values(data).filter(data => data.isGoodPlace).forEach(pos => room.visual.text(pos.n, pos.pos));
    let result = _.min(Object.values(data).filter(data => data.isGoodPlace), 'n');
    if (result) {
        let resultPos = result.pos;
        room.visual.circle(pos, {radius:1, fill:'red'});
        room.visual.circle(resultPos, {radius:1, fill:'blue'});
        return resultPos;
    }
},

findQuadFormationPos: function(x,y,room,terrain, data, n) {
    if (x<0 || x>49 || y<0 || y>49 || terrain.get(x,y) == TERRAIN_MASK_WALL || n > 30) return;
    if (data[x+'_'+y]) {
        if (n < data[x+'_'+y].n) {
            data[x+'_'+y].n = n;
            [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].forEach(d => this.findQuadFormationPos(x+d[0], y+d[1], room, terrain, data, n+1));
        }
        return;
    }
    let isGoodPlace = true;
    for ( let dx = 0; dx <= 2; dx++) {
        for ( let dy = 0; dy <= 2; dy++) {
            if (x+dx<1 || x+dx>48 || y+dy<1 || y+dy>48 || terrain.get(x+dx, y+dy) == TERRAIN_MASK_WALL
                || (new RoomPosition(x+dx, y+dy, room.name)).lookFor(LOOK_STRUCTURES).some(struct => OBSTACLE_OBJECT_TYPES.includes(struct.structureType))
            ) {
                isGoodPlace = false;
            }
        }
    }
    data[x+'_'+y] = {pos: new RoomPosition(x, y, room.name), n:n, isGoodPlace: isGoodPlace};
    [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].forEach(d => this.findQuadFormationPos(x+d[0], y+d[1], room, terrain, data, n+1));
},
    
    calcTowerDmgAtRange: function(distance) {
        // TOWER_POWER_ATTACK: 600,
        // TOWER_OPTIMAL_RANGE: 5,
        // TOWER_FALLOFF_RANGE: 20,
        // TOWER_FALLOFF: 0.75,
        
        let towerRangeImpactFactor = 1;
        if(distance <= TOWER_OPTIMAL_RANGE) {
            towerRangeImpactFactor = 1;
        } else if (distance >= TOWER_FALLOFF_RANGE) {
            towerRangeImpactFactor = 1 - TOWER_FALLOFF
        } else {
            let towerFalloffPerTile = TOWER_FALLOFF / (TOWER_FALLOFF_RANGE - TOWER_OPTIMAL_RANGE)
            towerRangeImpactFactor =  1 - (distance - TOWER_OPTIMAL_RANGE) * towerFalloffPerTile
        }
        
        return TOWER_POWER_ATTACK * towerRangeImpactFactor;
    },
    
    runMan: function(creep) {
        //return;
        creep.say('man');
        if (creep.room.name == 'E79N59') {
            let pos = new RoomPosition(41,26,'E79N59');
            if (creep.pos.isEqualTo(pos)) {
                if(creep.store[RESOURCE_ALLOY]) {
                    creep.transfer(creep.room.terminal, RESOURCE_ALLOY);
                    return;
                }
                if (creep.room.terminal.store[RESOURCE_ALLOY]<5000 && creep.room.storage.store[RESOURCE_ALLOY]) {
                    creep.withdraw(creep.room.storage, RESOURCE_ALLOY);
                    return;
                }
                
                if (creep.store.getUsedCapacity()){
                    for (let resource in creep.store) {
                        creep.transfer(creep.room.storage, resource);
                        break;
                    }
                } else {
                    for (let resource in creep.room.terminal.store) {
                        if (resource == RESOURCE_ENERGY && creep.room.terminal.store[resource] < 100000) continue;
                        if (creep.room.terminal.store[resource] < 13000) continue;
                        creep.withdraw(creep.room.terminal, resource);
                        break;
                    }
                }
            } else {
                creep.moveTo(pos);    
            } 
        } else {
            //return;
            //if (Game.rooms.E79N59.terminal.store.getFreeCapacity() < 50000) return;
           
            if (creep.room.name == 'E77N55' && Game.rooms.E59N46.terminal.store.getFreeCapacity() > 15000 && !creep.room.terminal.cooldown) {
                creep.room.terminal.send(RESOURCE_ENERGY, 15000, 'E59N46');
            // } else if (creep.room.name == 'E83N54' && Game.rooms.E71N56.terminal.store.getFreeCapacity() > 50000 && !creep.room.terminal.cooldown) {
            //     creep.room.terminal.send(RESOURCE_ENERGY, 10000, 'E71N56');
            // } else if (creep.room.name == 'E83N54' && Game.rooms.E52N46.terminal.store.getFreeCapacity() > 50000 && !creep.room.terminal.cooldown) {
            //     creep.room.terminal.send(RESOURCE_ENERGY, 10000, 'E52N46');
            // } else if (creep.room.name == 'E83N54' && Game.rooms.E54N49.terminal.store.getFreeCapacity() > 50000 && !creep.room.terminal.cooldown) {
            //     creep.room.terminal.send(RESOURCE_ENERGY, 10000, 'E54N49');
            }
            if (creep.room.terminal.store.getFreeCapacity() < 5000) return;
            if (creep.store.getUsedCapacity()){
                creep.moveTo(creep.room.terminal, {range:1});
                for (let resource in creep.store) {
                    creep.transfer(creep.room.terminal, resource);
                    break;
                }
            } else { 
                //creep.say(creep.room.storage.store.getUsedCapacity());
                creep.moveTo(creep.room.storage, {range:1});
                for (let resource in creep.room.storage.store) {
                    if ((resource == RESOURCE_ENERGY && creep.room.storage.store[resource] < 1000) || (resource == RESOURCE_ENERGY && creep.room.storage.store.getUsedCapacity() > creep.room.storage.store[RESOURCE_ENERGY])) continue;
                    //if (creep.room.terminal.store[resource] < 5000) continue;
                    creep.withdraw(creep.room.storage, resource);
                    break;
                }
            }
            
        }
        
    }, 
    
    runWall: function(creepInfo) {
        if (Game.cpu.bucket < 700) return;
        let creep = Game.creeps[creepInfo.name];
        if (!creep) {
            const spawns = Game.rooms[creepInfo.spawnRoom].find(FIND_MY_STRUCTURES, {
                filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning;}
            });
            if (spawns.length && Game.rooms[creepInfo.spawnRoom].memory.spawnBusyTick != Game.time){
                let body = [MOVE];
                if (creepInfo.name == 'wall1' || creepInfo.name == 'wall1_' || creepInfo.name == 'wall7' || creepInfo.name == 'wall10') {
                    body = [MOVE, RANGED_ATTACK];
                }
                if (creepInfo.name == 'wall45' ) {
                    body = [MOVE, ATTACK];
                }
                // if (creepInfo.name == 'wall12' || creepInfo.name == 'wall13' || creepInfo.name == 'wall14' ) {
                //     body = [MOVE, RANGED_ATTACK];
                // }
                let res = spawns[0].spawnCreep(body, creepInfo.name, {memory: {room: creepInfo.spawnRoom, role: 'wall', boosts:[]}});
                if (res == OK) {
                    Game.rooms[creepInfo.spawnRoom].memory.spawnBusyTick = Game.time;
                }
            }
        } else if (!creep.spawning) {
            //creep.suicide();continue;
            
            if (creep.name == 'wall40' || creep.name == 'wall35'  || creep.name == 'wall56') {
                creep.memory.warningMove = 1;
            }                        
            if ((1 || creep.name == 'wall53' || creep.name == 'wall61') && !creep.memory.nwa) {
                creep.notifyWhenAttacked(false);
                creep.memory.nwa = 1;
            }                        
            //creep.memory.warningMove = undefined; 
            
            
            if (creep.memory.inPlace && !(Game.time%creep.memory.inPlace)) {
                let cSite = creep.pos.findClosestByRange(FIND_HOSTILE_CONSTRUCTION_SITES, {filter: cs => cs.progress && ![STRUCTURE_EXTRACTOR].includes(cs.structureType) });
                if (cSite) {
                   creepInfo.pos.x = cSite.pos.x; 
                   creepInfo.pos.y = cSite.pos.y;
                   creepInfo.pos.roomName = cSite.pos.roomName;
                   creep.memory.inPlace = 0;
                   if (creep.pos.isEqualTo(cSite.pos)) {
                       creep.move(_.shuffle([TOP, LEFT, RIGHT, BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT])[0]);
                   }
                   //creep.say(cSite.id);
                } else {
                   creep.memory.inPlace = 100; 
                }
            }
            let pos = new RoomPosition(creepInfo.pos.x, creepInfo.pos.y, creepInfo.pos.roomName);    
            
            if (!creep.pos.isEqualTo(pos)){
                helpers.smartMove(creep, pos, 1, 0);
                if (!creep.memory.timeToPos) {
                    creep.memory.timeToPos = 1;
                } else {
                    creep.memory.timeToPos++;
                }
            } else if (creep.getActiveBodyparts(ATTACK)) {
                let enemy = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1);
                if (enemy.length) {
                    creep.attack(enemy[0]);
                }
                if (creep.room.name == 'E41N19') {
                    creep.attack(Game.getObjectById('61368756486f261c51164bb1'));
                }
             } else if (creep.getActiveBodyparts(RANGED_ATTACK)) {
                let enemy = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
                if (enemy.length) {
                    creep.rangedAttack(enemy[0]);
                }
            } else if (creep.room.name == 'E57N32_') {
                let sayInfo = ['room', 'reserved'];
                creep.say(sayInfo[Game.time%sayInfo.length], creep.room.name == 'E57N32');
                creep.signController(creep.room.controller, 'reserved');
            } else {
                creep.memory.inPlace = 10;
            }
            
            if (creep.room.name == 'E49N2') {
                creep.memory.warningMove = 1;
            }
        }        
    },
    
    runP: function() { 
       
       
        
    },

    
    
};

