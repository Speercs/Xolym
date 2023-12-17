var helpers = require('helpers');

module.exports = {
    getBody: function(room) {
        let cap = room.energyCapacityAvailable;
        if (cap >= 2400) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];//MOVE*16,CARRY*32 carry 1.60K
        if (cap >= 2100) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; //MOVE*14,CARRY*28 carry 1400
        if (cap >= 1950) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];//MOVE*13,CARRY*26 carry	1.300K
        if (cap >= 1800) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*12,CARRY*24
        if (cap >= 1350) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; // sum	1.350K MOVE*9,CARRY*18 carry	900.000
        if (cap >= 1200) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
        if (cap >= 600) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,];
        return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
    },
    
    run: function(creep) {
        //console.log('filler in room', helpers.getRoomLink(creep.room.name), creep.ticksToLive, Math.round(creep.room.energyAvailable/creep.room.energyCapacityAvailable*100)+'%');
        if (helpers.sleep(creep)) return;
        if (helpers.runMoveOrder(creep)) return;
        if (creep.store[RESOURCE_ENERGY]< (creep.ticksToLive<20?1:100)) {
            delete(creep.memory.targetId);
            if (creep.ticksToLive<20) {
                creep.memory.role = undefined;
                return;
            }
            let target = creep.room.storage;
            if (target && target.store && !target.store[RESOURCE_ENERGY]) {
                target = creep.room.terminal;
            }
            if (!target) {
                creep.memory.sleep = Game.time + 20;
                return true;
            }
            if (creep.pos.isNearTo(target)) {
                creep.withdraw(target, RESOURCE_ENERGY);
            } else if (0 && creep.pos.inRangeTo(target, 2)) {
                creep.moveTo(target, {range:1, visualizePathStyle: {stroke: '#ffaa00'} });
                delete(creep.memory._trav);
            } else if (creep.pos.inRangeTo(target, 3)) {
                helpers.smartMove(creep, target);
                delete(creep.memory._move);
            } else {
                helpers.smartMove(creep, target);
                delete(creep.memory._move);
                helpers.createMoveOrder(creep, target, {range: 1});
            }
        } else {
            // let res = helpers.transferEnergyToClosestStructure(creep);
            // if (!res) {a
            //     creep.memory.sleep = Game.time+10;
            // }
            // return;
            
            let target = Game.getObjectById(creep.memory.targetId);
            if (!target || !target.store.getFreeCapacity(RESOURCE_ENERGY)) {
                target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    //range: 1,
                    filter: (structure) => {
                        return ([STRUCTURE_EXTENSION, STRUCTURE_SPAWN].includes(structure.structureType) && structure.store.getFreeCapacity(RESOURCE_ENERGY));
                    }
                });
                if (target) {
                    creep.memory.targetId = target.id;
                } else {
                    if (creep.room.memory.timeSavingEnable) {
                         target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                            filter: (structure) => {
                                return ([STRUCTURE_TOWER, STRUCTURE_LAB].includes(structure.structureType) && structure.store.getFreeCapacity(RESOURCE_ENERGY)> 300);
                            }
                        });
                        if (target) {
                            creep.memory.targetId = target.id;
                            // creep.say('tower');
                        } else {
                             target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                                filter: (structure) => {
                                    return ([STRUCTURE_NUKER].includes(structure.structureType) && structure.store.getFreeCapacity(RESOURCE_ENERGY));
                                }
                            });
                            if (target) {
                                creep.memory.targetId = target.id;
                            }
                        }       
                    }
                }
                
            }
            if (target) {
                if (creep.pos.isNearTo(target)) {
                    let res = creep.transfer(target, RESOURCE_ENERGY);
                    if (res == OK && target.structureType == STRUCTURE_TOWER) {
                        creep.memory.targetId = undefined;
                    }
                } else if (creep.pos.inRangeTo(target,2)) {
                    creep.moveTo(target, {range:1, visualizePathStyle: {stroke: '#ffaa00'} });    
                    delete(creep.memory._trav);
                } else {
                    helpers.smartMove(creep, target);
                    delete(creep.memory._move);
                    helpers.createMoveOrder(creep, target, {range: 1});
                }
            } else {
                if (creep.ticksToLive < 40) {
                    let target = creep.room.storage;
                    if (!target || creep.pos.isNearTo(target)) {
                        creep.transfer(target, RESOURCE_ENERGY);
                        creep.memory.role = undefined;
                    } else {
                        helpers.smartMove(creep, target);
                        delete(creep.memory._move);
                        helpers.createMoveOrder(creep, target, {range: 1});
                    }
                } else {
                    creep.memory.sleep = Game.time+10;  
                    return true;
                }
            }
            
            
            
        }
        
    },

};