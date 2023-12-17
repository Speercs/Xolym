var helpers = require('helpers');

var roleHarvester = {
    
    getBody: function (spawn) {
        if (!Game.spawns[spawn] || !Game.spawns[spawn].room) return [WORK,CARRY,CARRY,MOVE,MOVE];
        let room = Game.spawns[spawn].room;
        var cap = room.energyCapacityAvailable;
        // if (room.storage && room.storage.store[RESOURCE_ENERGY]<400000){
        //     cap = 1350;
        // }
        
        if (cap >= 2700)return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*14,WORK*12,CARRY*16
        if (cap >= 2250)return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*11,WORK*12,CARRY*10
        if (cap >= 1350)return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*7,WORK*6,CARRY*8
        if (cap >= 1000)return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
        if (cap >= 950) return [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
        if (cap >= 900) return [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
        if (cap >= 850) return [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
        if (cap >= 800) return [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY];//same 750
        if (cap >= 750) return [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY];
        if (cap >= 700) return [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        if (cap >= 650) return [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        if (cap >= 600) return [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        if (cap >= 550) return [MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY,CARRY];
        if (cap >= 500) return [MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY];
        if (cap >= 450) return [MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY];
        if (cap >= 400) return [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        if (cap >= 350) return [WORK,CARRY,CARRY,CARRY,MOVE,MOVE];
        if (cap >= 300) return [WORK,CARRY,CARRY,MOVE,MOVE];
        return [];
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.ticksToLive == 2 && creep.store.getUsedCapacity()){
            Game.notify('harvester no empty die '+creep.room.name+' '+creep.name);
        }
        
        if (helpers.sleep(creep)) return;
        
        if (helpers.runMoveOrder(creep)) return;
        
        if (creep.ticksToLive > 1000 && !creep.memory.startTimeToTarget) {
            creep.memory.startTimeToTarget = Game.time;
        }
        
        if (creep.memory.targetId) {
            if (creep.store.getFreeCapacity()>=creep.getActiveBodyparts(WORK)){
                let mineral = Game.getObjectById(creep.memory.targetId);
                if (!mineral) {
                    creep.say('broken!');
                    creep.memory.targetId = undefined;
                    return;
                }
                if (creep.pos.isNearTo(mineral)){
                    if (!creep.memory.timeToTarget) {
                        creep.memory.timeToTarget = creep.memory.startTimeToTarget?(Game.time - creep.memory.startTimeToTarget + 15):150;
                    }
                    let timeToTerminal = creep.memory.timeToTerminal ? creep.memory.timeToTerminal : (creep.memory.timeToTarget ? 2 * creep.memory.timeToTarget : 300);
                    
                    if (creep.ticksToLive < timeToTerminal+30) {
                        creep.say('no time');
                        creep.memory.targetId = undefined;
                    }
                    
                    
                    let res = creep.harvest(mineral);
                    creep.say(res);
                    if (res == OK || res == ERR_TIRED) {
                        if (!(Game.time%1) /*&& !creep.memory.soonDie*/){
                            let timeToTarget = creep.memory.timeToTarget ? creep.memory.timeToTarget : 150;
                            let timeToTerminal = creep.memory.timeToTerminal ? creep.memory.timeToTerminal : 2 * timeToTarget;
                            let extractors = creep.room.find(FIND_MY_STRUCTURES, {
                                filter: (structure) => {return (structure.structureType == STRUCTURE_EXTRACTOR);}
                            });
                            let cooldown = 6;
                            if (extractors.length) {
                                cooldown = extractors[0].cooldown;
                            }
                            creep.say(cooldown);
                            let timeToFull = (Math.floor(creep.store.getFreeCapacity()/creep.getActiveBodyparts(WORK))-1)*6+cooldown;
                            if (creep.ticksToLive < timeToFull+timeToTerminal+timeToTarget) {
                                let timeToSpawn = creep.body.length*3;
                                let timeToNoTickToLive = creep.ticksToLive - timeToTerminal - 30;
                                creep.say('lM'+timeToNoTickToLive);
                                if (timeToTarget + timeToSpawn - 15 > Math.min(timeToNoTickToLive, timeToFull)) {
                                    creep.say('sDie'+(timeToTarget + timeToSpawn));
                                    creep.memory.soonDie = 1;
                                }
                            } else {
                                //creep.say('tF'+timeToFull);
                            }
                            if (cooldown && cooldown < 6) {
                                creep.memory.sleep = Game.time + cooldown;
                            }
                            if (res == OK) {
                                creep.memory.sleep = Game.time + 6;
                            }
                            
                        }
            	        if (creep.pos.isEqualTo(new RoomPosition(10, 39, 'E83N55'))){
            	            creep.move(LEFT);
            	        }
            	        if (creep.pos.isEqualTo(new RoomPosition(9, 39, 'E83N55'))){
            	            creep.move(LEFT);
            	        }
            	        if (creep.pos.isEqualTo(new RoomPosition(8, 39, 'E83N55'))){
            	            creep.move(BOTTOM);
            	        }

                        //wait
                    } else {
                        creep.say('error'+res);
                        creep.memory.targetId = undefined;
                        creep.memory.startTimeToTerminal = Game.time;
                        creep.memory.timeToTerminal = undefined;
                    }
                } else {
                    if (creep.pos.getRangeTo(mineral) > 2) {
                        helpers.smartMove(creep, mineral, 1, 1);   
                        helpers.createMoveOrder(creep, mineral, {range: 2});
                    } else {
                        creep.moveTo(mineral);
                    }
                    
                }
            } else {
                creep.say('full');
                creep.memory.targetId = undefined;
                if (creep.hits == creep.hitsMax){
                    creep.memory.startTimeToTerminal = Game.time;
                    creep.memory.timeToTerminal = undefined;
                }
            }
        } else {
            if (!creep.store.getUsedCapacity()) {
                let timeToTarget = creep.memory.timeToTarget ? creep.memory.timeToTarget : 150;
                let timeToTerminal = creep.memory.timeToTerminal ? creep.memory.timeToTerminal : 2 * timeToTarget;
                
                if (creep.ticksToLive < timeToTarget + timeToTerminal) {
                    creep.memory.role = undefined;
                    creep.say('too old');
                    return;
                }
                var extractors = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {return (structure.structureType == STRUCTURE_EXTRACTOR);}
                });
                if (!extractors.length) {
                    creep.say('no extractor!');
                    return;
                }
                let minerals = creep.room.find(FIND_MINERALS);
                if (minerals.length && minerals[0].mineralAmount){
                    creep.memory.targetId = minerals[0].id;
                    creep.memory.timeToTarget = undefined;
                    creep.memory.startTimeToTarget = Game.time;
                } else {
                    creep.say('no mineral');
                    creep.room.memory.mineralHarvest = 0;
                    creep.memory.role = undefined;
                    return 1;
                }
                
                
            } else {
                let terminal = Game.rooms[creep.memory.room].terminal;
                if (terminal.store.getFreeCapacity() < 35000) {
                    terminal = Game.rooms[creep.memory.room].storage;
                }
                if (creep.pos.isNearTo(terminal)) {
                    for (let res in creep.store){
                        let ret = creep.transfer(terminal, res);
                        if (ret == OK && !creep.memory.timeToTerminal) {
                            creep.memory.timeToTerminal = creep.memory.startTimeToTerminal ? (Game.time - creep.memory.startTimeToTerminal + 15) : 150;
                        }
                    }
                } else {
                    helpers.smartMove(creep, terminal, 1, 1); 
                }
            }
        }
            
	}
};

module.exports = roleHarvester;