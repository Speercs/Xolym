var helpers = require('helpers');

var roleOperator = {
    spawn: function(operatorName) {
        if (!(Game.time%10)){
            console.log('try spawn operator '+operatorName);
            if (Game.shard.name == 'shard0') {
                Game.powerCreeps['OpF5'].spawn(Game.getObjectById('6100ea55850d84db85f6e6ec'));
                // Game.powerCreeps['OpF3'].spawn(Game.getObjectById('5dc69ac698ed6d6be27e0052'));
            }
            if (Game.shard.name == 'shard2') {
                Game.powerCreeps['S2opF1'].spawn(Game.getObjectById('5e8ebbde41bcf0be0492ea9c'));
                Game.powerCreeps['S2_opF1'].spawn(Game.getObjectById('5ea803bf08acf84e63d0a875'));
                Game.powerCreeps['S2_opF2'].spawn(Game.getObjectById('5e9d6a13b95630162e8b1596'));
                Game.powerCreeps['S2_opF3'].spawn(Game.getObjectById('5eb8674383178b06676d5762'));
                Game.powerCreeps['S2_opF4'].spawn(Game.getObjectById('5ecf6be327283b23eded0554'));
                Game.powerCreeps['S2_opF2_2'].spawn(Game.getObjectById('5fa05a8e01172244bec1eb53'));
                Game.powerCreeps['S2_opF1_2'].spawn(Game.getObjectById('5f87512c9d78f19e0d052cb5'));
                Game.powerCreeps['S2_opF3_2'].spawn(Game.getObjectById('5eeda7158f805dac1a2ac1b5'));
                Game.powerCreeps['S2_opF4_2'].spawn(Game.getObjectById('5fb8c48c87073b23b84648c7'));
                Game.powerCreeps['S2_opF5'].spawn(Game.getObjectById('5ed8d51536b8ab03de7d39b0')); //5ed8d51536b8ab03de7d39b0
                Game.powerCreeps['S2_opF3_3'].spawn(Game.getObjectById('6078c399ed2663d8b8e838b7'));
                Game.powerCreeps['S2_opF4_3'].spawn(Game.getObjectById('5f34146214f8055964a27ff6'));
                Game.powerCreeps['OpF2'].spawn(Game.getObjectById('60a707be6673c842d8c80265'));
                Game.powerCreeps['OpF2_2'].spawn(Game.getObjectById('610f74758e7e56295a1d6bfd'));
                Game.powerCreeps['OpF1'].spawn(Game.getObjectById('6167879a9505cfc590bf2e79'));
                Game.powerCreeps['OpF1_2'].spawn(Game.getObjectById('6167df3ca86ae7501ec8c04e'));
                Game.powerCreeps['OpF4'].spawn(Game.getObjectById('600ae35758409e1b11eb4acb'));
                Game.powerCreeps['S2_opF1_3'].spawn(Game.getObjectById('5ffa71f6221bc605873e576a'));
                Game.powerCreeps['S2_opF1_4'].spawn(Game.getObjectById('6070090d2eceb966670c65a7'));
                Game.powerCreeps['S2_opS1'].spawn(Game.getObjectById('6187cd0d119d56adf411ce29'));
                Game.powerCreeps['OpF3'].spawn(Game.getObjectById('61a9d8f288cb4c2f5ba882bf'));
                Game.powerCreeps['OpF2_3'].spawn(Game.getObjectById('61c17cb46eda9d41518465c8'));
                Game.powerCreeps['S2_opF1_5'].spawn(Game.getObjectById('6183c50912d5338108fb060e'));
                Game.powerCreeps['S2_opF5_3'].spawn(Game.getObjectById('6353ccf469124f5842fdd9fb'));
                Game.powerCreeps['S2_opF1_6'].spawn(Game.getObjectById('607085bd636d5ab064766360'));
                Game.powerCreeps['S2_opF1_7'].spawn(Game.getObjectById('60fede91b4111318152b6ea2')); 
                Game.powerCreeps['S2_opF3_4'].spawn(Game.getObjectById('6087dc9d59d54daa8d24cf73')); 
                Game.powerCreeps['OpS2'].spawn(Game.getObjectById('63d1bd15fbce1536cfec1078')); 
                Game.powerCreeps['S2_opF4_4'].spawn(Game.getObjectById('63cdbf4aaf1e694bef404b21'));
                Game.powerCreeps['S2_opF3_5'].spawn(Game.getObjectById('6292f0fcfed0e3f850f40240'));
                Game.powerCreeps['S2_opF2_3'].spawn(Game.getObjectById('6174d38897bf4657327a1b31'));
                Game.powerCreeps['S2_opF1_8'].spawn(Game.getObjectById('632cb8d34f291c297128ecdf'));
                Game.powerCreeps['S2_opF2_4'].spawn(Game.getObjectById('6372b0e617523a194beba082'));
                Game.powerCreeps['S2_opF3_6'].spawn(Game.getObjectById('6325bae8aa0e5450021abcc0'));
            }
            if (Game.shard.name == 'shard3') {
                Game.powerCreeps['S3_opF1_1'].spawn(Game.getObjectById('5e2e1e84b54f188e29081cd5'));
            }  
            if (Game.shard.name == 'shard1') {
                Game.powerCreeps['S1_OpS1'].spawn(Game.getObjectById('6175043956e7067584f363c6'));
            }  
            
            
        }
    },
    
    /** @param {PowerCreep} operator **/
    run: function(operator) {
        let opRes = -100;
        if (!operator.memory.role) {
            operator.memory.role = 'operator';
        }
        if (!operator.memory.room && operator.room) {
            operator.memory.room = operator.room.name;
        }
        
        if (operator && operator.room) {
            let room = operator.room;
            if (operator.powers[PWR_GENERATE_OPS] && !operator.powers[PWR_GENERATE_OPS].cooldown) {
                operator.usePower(PWR_GENERATE_OPS);    
            }
            
            let storage = operator.room.storage;
            if (storage && storage.id == '5fb3043bcdc7cc96028f10c1' && Game.rooms['E43N38'] && Game.rooms['E43N38'].storage && storage && Game.rooms['E43N38'].controller.level>=4) {
                storage = Game.rooms['E43N38'].storage;
            }

            
            
            let flag = 'Flag'+operator.name;
            if (!Game.flags[flag]) {
                operator.pos.createFlag(flag);
            }
            if (1 && operator && operator.name == 'OpS2' && Game.flags[flag] && operator.room.name != Game.flags[flag].pos.roomName) {
                operator.memory.warningMove = 1;
                helpers.smartMove(operator, Game.flags[flag],1,0);
                return;
            }

            
            //operator.say(operator.suicide());return;
            if (0) {
                operator.say('emptyOps');
                operator.moveTo(operator.room.terminal);
                operator.transfer(operator.room.terminal, RESOURCE_OPS, operator.store[RESOURCE_OPS]);
            } else  if (operator.memory.sources === undefined) {
                let sources = operator.room.find(FIND_SOURCES);
                if (sources.length == 2) {
                    operator.memory.sources = [sources[0].id, sources[1].id];
                }
            } else if (operator.memory.spawns === undefined) {
                let spawns = operator.room.find(FIND_MY_SPAWNS);
                if (spawns.length == 3) {
                    operator.memory.spawns = [spawns[0].id, spawns[1].id, spawns[2].id];
                }
            } else if (operator.memory.powerSpawn === undefined) {
                let powerSpawns = operator.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {return structure.structureType == STRUCTURE_POWER_SPAWN;}
                });
                if (powerSpawns.length) {
                    operator.memory.powerSpawn = powerSpawns[0].id;
                } else {
                    Game.notify('Operator '+operator.name+' not find PowerSpawn in room '+operator.room.name);
                    //operator.moveTo(Game.flags[flag]); 
                    helpers.smartMove(operator, Game.flags[flag], 1, 0);
                }
            } else if (operator.room.controller && !operator.room.controller.isPowerEnabled && operator.room.controller.level >= 4) {
                operator.say('contr');
                //helpers.smartMove(operator, operator.room.controller);
                //operator.moveTo(operator.room.controller, {range: 1});
                helpers.smartMove(operator, operator.room.controller);
                operator.enableRoom(operator.room.controller);
            } else if (operator.ticksToLive<400 && operator.memory.powerSpawn) {
                operator.say('renew');
                const pSpawn = Game.getObjectById(operator.memory.powerSpawn)
                if (pSpawn) {
                    //operator.moveTo(pSpawn);
                    helpers.smartMove(operator, pSpawn);
                    operator.renew(pSpawn);
                } else {
                    operator.memory.powerSpawn = undefined;
                }
            } else if ((!operator.store[RESOURCE_OPS] || operator.store[RESOURCE_OPS]<300) && operator.room.terminal && operator.room.terminal.store[RESOURCE_OPS]>=1 && operator.store.getFreeCapacity() ) {
                //operator.moveTo(operator.room.terminal);
                helpers.smartMove(operator, operator.room.terminal);
                let res = operator.withdraw(operator.room.terminal, RESOURCE_OPS, Math.min(200, operator.store.getFreeCapacity(), operator.room.terminal.store[RESOURCE_OPS]) );
                operator.say('getOpsT'+operator.store.getFreeCapacity()+res);
            } else if ((!operator.store[RESOURCE_OPS] || operator.store[RESOURCE_OPS]<300) && operator.room.storage && operator.room.storage.store[RESOURCE_OPS]>=300 && operator.store.getFreeCapacity()) {
                //operator.moveTo(operator.room.storage);
                helpers.smartMove(operator, operator.room.storage);
                let res = operator.withdraw(operator.room.storage, RESOURCE_OPS, Math.min(300, operator.store.getFreeCapacity()) );
                operator.say('getOpsS'+res);
            } else if (operator.store[RESOURCE_OPS] && operator.store[RESOURCE_OPS]>=1500 && operator.room.storage && operator.room.storage.store.getFreeCapacity() >= 1000) {
                operator.say('transferOps');
                //operator.moveTo(operator.room.storage);
                helpers.smartMove(operator, operator.room.storage);
                operator.transfer(operator.room.storage, RESOURCE_OPS, 1000);
            } else if (operator.powers[PWR_GENERATE_OPS] && operator.store[RESOURCE_OPS] && operator.store.getFreeCapacity()<50 && operator.room.storage && operator.room.storage.store.getFreeCapacity() >= 50 ) {
                operator.say('transferOps');
                //operator.moveTo(operator.room.storage);
                helpers.smartMove(operator, operator.room.storage);
                operator.transfer(operator.room.storage, RESOURCE_OPS, 50);
            } else if (operator.powers[PWR_OPERATE_STORAGE] && storage && (storage.store.getUsedCapacity() > 940000 || storage.id == '61aa197e21473b1b42d45f67' )
                    //&& operator.store[RESOURCE_OPS]>=100 
                    && (!storage.effects || !storage.effects.length || (storage.effects[0].effect == PWR_OPERATE_STORAGE &&  storage.effects[0].ticksRemaining < 30))
                    && operator.room.controller && operator.room.controller.isPowerEnabled
                    ) {
                if (operator.store[RESOURCE_OPS]>=100 ) {
                    operator.say('STORAGE');
                    helpers.smartMove(operator, storage, 1, 3);
                    //operator.moveTo(storage);
                    opRes = operator.usePower(PWR_OPERATE_STORAGE, storage);     
                } else {
                    operator.say('wOps');
                    if (operator.room.memory.needResource.indexOf(RESOURCE_OPS) == -1) {
                        operator.room.memory.needResource.push(RESOURCE_OPS);
                    }
                }
            } else if (operator.room.memory.factoryNeedPower && operator.store[RESOURCE_OPS]>=100 && operator.room.memory.factory) {
                operator.say(operator.room.name +operator.room.memory.factoryNeedPower);
                let factory = Game.getObjectById(operator.room.memory.factory);
                if (!factory.effects || !factory.effects.length) {
                    helpers.smartMove(operator, factory, 1, 3);
                    //operator.moveTo(factory);
                    
                    opRes = operator.usePower(PWR_OPERATE_FACTORY, factory);
                    operator.say('FACT'+opRes);
                } else {
                    operator.say('Fdeleted'+operator.room.memory.factoryNeedPower);
                    operator.room.memory.factoryNeedPower = 0;//undefined;
                }

            } else if (1 && Game.time<34966967 +6000 && ['E55N27',].indexOf(operator.room.name) >= 0 && operator.powers[PWR_OPERATE_SPAWN] && (!operator.powers[PWR_OPERATE_SPAWN].cooldown || operator.powers[PWR_OPERATE_SPAWN].cooldown < 10 ) && operator.memory.spawns && operator.memory.spawns.length  
                    //&& (!Game.getObjectById(operator.memory.spawns[0]).effects || !Game.getObjectById(operator.memory.spawns[0]).effects.length)
                    && operator.store[RESOURCE_OPS]>=200) {
                let spawnDeal = false;
                for (spawnId of operator.memory.spawns) {
                    let spawn = Game.getObjectById(spawnId);
                    if (spawn){
                        if (!spawn.effects || !spawn.effects.length || (spawn.effects[0].effect == PWR_OPERATE_SPAWN && spawn.effects[0].ticksRemaining < 10)) {
                            if (!operator.pos.inRangeTo(spawn,2)){
                                helpers.smartMove(operator, spawn, 1, 3);
                            }
                            opRes = operator.usePower(PWR_OPERATE_SPAWN, spawn);
                            operator.say('spawn'+opRes);
                            spawnDeal = true;
                            break;
                        }
                    }
                }
                if (!spawnDeal) {
                    if (operator.pos.isEqualTo(Game.flags[flag])){
                    } else {
                        operator.say('wait spawn');
                        helpers.smartMove(operator, Game.flags[flag],1,0);
                        //operator.moveTo(Game.flags[flag]);                
                    }
                }                        
            } else if ((Game.shard.name == 'shard2') && operator.powers[PWR_OPERATE_EXTENSION] && !operator.powers[PWR_OPERATE_EXTENSION].cooldown && operator.store[RESOURCE_OPS]>=100 && operator.room.energyAvailable < operator.room.energyCapacityAvailable * 0.5) {
                operator.say('EXTENSION');
                storage = operator.room.storage;
                if (storage.store[RESOURCE_ENERGY] < 100000 && operator.room.terminal && operator.room.terminal.store[RESOURCE_ENERGY]> 50000) {
                    storage = operator.room.terminal;    
                } 
                if (operator.room.terminal && operator.room.terminal.store[RESOURCE_ENERGY]> 60000) {
                    storage = operator.room.terminal;    
                } 
                helpers.smartMove(operator, storage,1,3);
                opRes = operator.usePower(PWR_OPERATE_EXTENSION, storage);
            } else if ((Game.shard.name == 'shard1') && operator.powers[PWR_OPERATE_EXTENSION] && !operator.powers[PWR_OPERATE_EXTENSION].cooldown && operator.store[RESOURCE_OPS]>=100 && Game.cpu.bucket < 8000 && operator.room.energyAvailable < operator.room.energyCapacityAvailable * 0.8) {
                operator.say('EXTENSION');
                storage = operator.room.storage;
                if (storage.store[RESOURCE_ENERGY] < 100000 && operator.room.terminal && operator.room.terminal.store[RESOURCE_ENERGY]> 50000) {
                    storage = operator.room.terminal;    
                } 
                if (operator.room.terminal && operator.room.terminal.store[RESOURCE_ENERGY]> 60000) {
                    storage = operator.room.terminal;    
                } 
                helpers.smartMove(operator, storage,1,3);
                opRes = operator.usePower(PWR_OPERATE_EXTENSION, storage);
            } else if (0 && Game.shard.name == 'shard2' && operator.room.name == 'E47S1' && operator.powers[PWR_OPERATE_EXTENSION] && !operator.powers[PWR_OPERATE_EXTENSION].cooldown && operator.store[RESOURCE_OPS]>=100 && operator.room.energyAvailable < operator.room.energyCapacityAvailable * 1.0) {
                operator.say('EXT FULL');
                storage = operator.room.storage;
                if (storage.store[RESOURCE_ENERGY] < 100000 && operator.room.terminal && operator.room.terminal.store[RESOURCE_ENERGY]> 50000) {
                    storage = operator.room.terminal;    
                } 
                if (operator.room.terminal && operator.room.terminal.store[RESOURCE_ENERGY]> 60000) {
                    storage = operator.room.terminal;    
                } 
                helpers.smartMove(operator, storage,1,3);
                opRes = operator.usePower(PWR_OPERATE_EXTENSION, storage);
            } else if (room.memory.boostLab && room.memory.boostLab.spawn && Game.time < room.memory.boostLab.time && operator.powers[PWR_OPERATE_EXTENSION] && !operator.powers[PWR_OPERATE_EXTENSION].cooldown && operator.store[RESOURCE_OPS]>=100 && operator.room.energyAvailable < operator.room.energyCapacityAvailable * 1.0) {
                operator.say('EXT FULL');
                storage = operator.room.storage;
                if (storage.store[RESOURCE_ENERGY] < 100000 && operator.room.terminal && operator.room.terminal.store[RESOURCE_ENERGY]> 50000) {
                    storage = operator.room.terminal;    
                } 
                if (operator.room.terminal && operator.room.terminal.store[RESOURCE_ENERGY]> 60000) {
                    storage = operator.room.terminal;    
                } 
                helpers.smartMove(operator, storage,1,3);
                opRes = operator.usePower(PWR_OPERATE_EXTENSION, storage);
            } else if (Game.shard.name == 'shard0' && operator.room.name == 'E79N59' && operator.powers[PWR_OPERATE_EXTENSION] && !operator.powers[PWR_OPERATE_EXTENSION].cooldown && operator.store[RESOURCE_OPS]>=100 && operator.room.energyAvailable < operator.room.energyCapacityAvailable * 0.7) {
                operator.say('EXTENSION');
                helpers.smartMove(operator, storage,1,3);
                opRes = operator.usePower(PWR_OPERATE_EXTENSION, storage);
            } else if (room.memory.boostLab && room.memory.boostLab.spawn && Game.time < room.memory.boostLab.time && operator.powers[PWR_OPERATE_SPAWN] && (!operator.powers[PWR_OPERATE_SPAWN].cooldown || operator.powers[PWR_OPERATE_SPAWN].cooldown < 10 ) && operator.memory.spawns && operator.memory.spawns.length && operator.store[RESOURCE_OPS]>=200) {
                    let spawnDeal = false;
                    for (spawnId of operator.memory.spawns) {
                        let spawn = Game.getObjectById(spawnId);
                        if (spawn){
                            if (!spawn.effects || !spawn.effects.length || (spawn.effects[0].effect == PWR_OPERATE_SPAWN && spawn.effects[0].ticksRemaining < 10)) {
                                if (!operator.pos.inRangeTo(spawn,2)){
                                    helpers.smartMove(operator, spawn, 1, 3);    
                                }
                                opRes = operator.usePower(PWR_OPERATE_SPAWN, spawn);
                                operator.say('spawn'+opRes);
                                spawnDeal = true;
                                break;
                            }
                        }
                    }
                    if (!spawnDeal) {
                        if (operator.pos.isEqualTo(Game.flags[flag])){
                        } else {
                            operator.say('wait spawn');
                            helpers.smartMove(operator, Game.flags[flag],1,0);
                            //operator.moveTo(Game.flags[flag]);                
                        }
                    }     
                } else if (1 && Game.shard.name=='shard2' && Game.time<49401770 +3000000 && ['E44S8_','E36N9','E45N11','E41N19','E41N39'].indexOf(operator.room.name) >= 0 && operator.powers[PWR_OPERATE_SPAWN] && (!operator.powers[PWR_OPERATE_SPAWN].cooldown || operator.powers[PWR_OPERATE_SPAWN].cooldown < 10 ) && operator.memory.spawns && operator.memory.spawns.length  
                        //&& (!Game.getObjectById(operator.memory.spawns[0]).effects || !Game.getObjectById(operator.memory.spawns[0]).effects.length)
                        && operator.store[RESOURCE_OPS]>=200) {
                    let spawnDeal = false;
                    for (spawnId of operator.memory.spawns) {
                        let spawn = Game.getObjectById(spawnId);
                        if (spawn){
                            if (!spawn.effects || !spawn.effects.length || (spawn.effects[0].effect == PWR_OPERATE_SPAWN && spawn.effects[0].ticksRemaining < 10)) {
                                if (!operator.pos.inRangeTo(spawn,2)){
                                    helpers.smartMove(operator, spawn, 1, 3);    
                                }
                                opRes = operator.usePower(PWR_OPERATE_SPAWN, spawn);
                                operator.say('spawn'+opRes);
                                spawnDeal = true;
                                break;
                            }
                        }
                    }
                    if (!spawnDeal) {
                        if (operator.pos.isEqualTo(Game.flags[flag])){
                        } else {
                            operator.say('wait spawn');
                            helpers.smartMove(operator, Game.flags[flag],1,0);
                            //operator.moveTo(Game.flags[flag]);                
                        }
                    }     
                } else if (operator.powers[PWR_REGEN_SOURCE] && (!operator.powers[PWR_REGEN_SOURCE].cooldown || operator.powers[PWR_REGEN_SOURCE].cooldown < 20) && operator.memory.sources && operator.memory.sources.length && !operator.room.memory.defCountEnemy) {
                operator.say('try source');
                let sourceDeal = false;
                for (let sourceId of operator.memory.sources) {
                    let source = Game.getObjectById(sourceId);
                    if (source){
                        if (!source.effects || !source.effects.length || (source.effects[0].effect == PWR_REGEN_SOURCE && source.effects[0].ticksRemaining < 20)) {
                            if (!operator.pos.inRangeTo(source,3)){
                                helpers.smartMove(operator, source,1,3);
                                operator.say('SOURCE');
                            } else {
                                opRes = operator.usePower(PWR_REGEN_SOURCE, source);
                                operator.say('SOURCE'+opRes);
                                if (opRes == OK) {
                                    operator.room.memory.regenSourceTime = Game.time;
                                }
                            }
                            sourceDeal = true;
                            break;
                        }
                    }
                }
                if (!sourceDeal) {
                    if (operator.pos.isEqualTo(Game.flags[flag])){
                    } else {
                        operator.say('wait src');
                        operator.moveTo(Game.flags[flag], {ignoreRoads: true});                
                    }
                }
            
            } else {
                if (operator.powers[PWR_OPERATE_OBSERVER] && !operator.powers[PWR_OPERATE_OBSERVER].cooldown && operator.memory.operateObserver && operator.store[RESOURCE_OPS]>=10) {
                    let obs = Game.getObjectById(operator.memory.operateObserver);
                    helpers.smartMove(operator, obs,0,3);
                    operator.usePower(PWR_OPERATE_OBSERVER, obs);
                    delete operator.memory.operateObserver;
                    operator.say('opObs');
                    return;
                }
                
                let flagRest = Game.flags[flag];
                if (flagRest) {
                    if (!operator.pos.isEqualTo(flagRest)){
                        operator.say('rest!');
                        if (operator.pos.isNearTo(flagRest)){    
                            operator.move(operator.pos.getDirectionTo(flagRest));
                        } else {
                            helpers.smartMove(operator, flagRest);    
                        }
                        //operator.moveTo(, {ignoreRoads: true});
                    } else {
                        operator.memory._trav = undefined;
                    }
                } else {
                    Game.notify('Operator '+operator.name+' not find rest flag in room '+operator.room.name);
                }
                
            }
            // if (opRes != OK) {
            //     opRes = operator.usePower(PWR_GENERATE_OPS)
            // }
        }
        
	}
};

module.exports = roleOperator;