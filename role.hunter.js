var helpers = require('helpers');
var roleHunter = {
    getBody: function(roomName) {
        let room = Game.rooms[roomName];
        if (!room) return;
        let cap = room.energyCapacityAvailable;
        //return [RANGED_ATTACK, HEAL, MOVE, MOVE];    
        if (1 && cap >= 4440) { // && (room.name == 'E23N22' || room.name == 'E16N19' ))
            return [
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                HEAL,HEAL,HEAL,HEAL,HEAL,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                HEAL
            ];
        }
        if (cap >= 3260) { //MOVE*19,ATTACK*12,RANGED_ATTACK*4,HEAL*3
            return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            HEAL,HEAL,HEAL];
        }
        
        if (cap >= 2300) return [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL];
        return [RANGED_ATTACK, HEAL, MOVE, MOVE];    
    },
    getBoosts: function(roomName) {
            return [];
    },

    run: function(creep) {
        let sourceKeeper = 'Source Keeper';
        if (Memory.mapVisual) Game.map.visual.text("Hunter️",creep.pos, { fontSize:10});
        const escapeHpKoeff = 0.8;
        
        let flagName = 'FlagAttack'+(creep.memory.sector?creep.memory.sector:'');
        let flag = Game.flags[flagName];
        if (!flag) {
            creep.say('noFlag');
            try {
                creep.pos.createFlag(flagName);
            } catch (e) {}
            return;
        }
        let escapePosition = Game.rooms[creep.memory.room].storage;
        
        if (!flag.room || creep.room.name != flag.room.name) {
            if (creep.hits >= creep.hitsMax*escapeHpKoeff) {
                helpers.smartMove(creep, flag, 0, 1);
            } else {
                creep.moveTo(escapePosition, {reusePath: 0, range: 1}); //!!! cpu expesive!!!!!!
            }
            if (creep.hits < creep.hitsMax) {
                creep.heal(creep);
            }
            let targetCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function (object) {
                    return object.owner.username != 'Darking'
                    //&& object.owner.username != sourceKeeper
                    ;
                }
            });
            if (targetCreep && creep.pos.inRangeTo(targetCreep, 3)) {
                creep.rangedAttack(targetCreep);    
            }
            if (targetCreep && creep.pos.isNearTo(targetCreep)) {
                creep.attack(targetCreep);    
            }
        } else {
            let targetCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function (object) {
                    return object.owner.username != 'Darking'
                    && object.owner.username != sourceKeeper;
                }
            });
            if (!targetCreep) {
                let targetCreeps = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {
                    filter: function (object) {
                        return object.owner.username != 'Darking';
                    }
                });
                if (targetCreeps.length) {
                    targetCreep = creep.pos.findClosestByRange(targetCreeps);
                }
            }
            
            let targetMeleeCreep = null;
            if (targetCreep) {
                targetMeleeCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: function (object) {
                        return object.owner.username != 'Darking'
                        && object.owner.username != sourceKeeper
                        && object.getActiveBodyparts(ATTACK)>= 10;
                    }
                });
            }
            let targetStructure = creep.pos.findClosestByRange (FIND_HOSTILE_STRUCTURES, {
                filter: function (object) {
                    return object.owner.username != 'Darking'
                    
                        && object.owner.username != 'sivooo'
                        //&& object.owner.username != 'shukari'
                        

                        && object.structureType != STRUCTURE_ROAD
                        && object.structureType != STRUCTURE_CONTAINER
                        && object.structureType != STRUCTURE_CONTROLLER
                        && object.structureType != STRUCTURE_WALL
                        //&& object.structureType != STRUCTURE_RAMPART
                        && object.structureType != STRUCTURE_KEEPER_LAIR
                        && object.structureType != STRUCTURE_POWER_BANK
                        && !(object.structureType == STRUCTURE_INVADER_CORE && object.effects && object.effects.length && object.effects[0].effect == EFFECT_INVULNERABILITY)
                        //&& !(object.structureType == STRUCTURE_INVADER_CORE && object.level == 0)
                        //&& !(object.owner.username == 'Invader' && object.structureType == STRUCTURE_TOWER)
                        //&& object.id != '5e963e5174868b51212c5379'
                        //&& object.id != '5e963e5174868b78dc2c5367'
                        && object.id != '5e963e5174868b711b2c537b'
                        && object.id != '60d14e6cc779dc09ef3365d0'
                        // && object.id != '5e811d4f44099a37b5d5fbf2'
                        // && object.id != '5e811d4f44099ab4cad5fbe7'
                        
                        ;
                }
            });
            
            let enemyWoRamp = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {
                filter: function (object) {
                    let onRamp = false;
                    object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                        if (lookObject.structureType == STRUCTURE_RAMPART) {
                            onRamp = true;
                        }
                    });
                    return object.owner.username != 'Darking' && !onRamp;
                }
            });
            
            
            
            let targetHeal = null;
            let targetHeals = creep.pos.findInRange(FIND_MY_CREEPS, 3, {
                filter: function (object) {
                    return object.hits < object.hitsMax && object.name != creep.name && (object.getActiveBodyparts(ATTACK) || object.getActiveBodyparts(RANGED_ATTACK) || object.getActiveBodyparts(HEAL) );
                }
            });
            if (targetHeals.length) {
                targetHeal = creep.pos.findClosestByRange(targetHeals);
            }
            
            let target = null;
            
            if (targetCreep && targetStructure) {
                if (creep.pos.getRangeTo(targetCreep) < creep.pos.getRangeTo(targetStructure)) {
                    target = targetCreep;
                } else {
                    target = targetStructure;
                }
            } else if (targetCreep) {
                target = targetCreep;
            } else if (targetStructure) {
                target = targetStructure;
            }
            
            if (target) {
                let rangeToTarget = creep.pos.getRangeTo(target);
                let rangeToTargetCreep = 4;
                if (targetCreep) {
                    rangeToTargetCreep = creep.pos.getRangeTo(targetCreep);
                }
                let rangeToTargetMeleeCreep = 4;
                if (targetMeleeCreep) {
                    rangeToTargetMeleeCreep = creep.pos.getRangeTo(targetMeleeCreep);
                }
                rangeToTargetCreep = rangeToTargetMeleeCreep;
                //rangeToTargetCreep = 4;
                
                let rangedAtacked = false;
                let meleeAtacked = false;
                let manualTarget = Game.getObjectById('5eb27fcab16dcc2ecc82dbff');
                
                let enemyDamage = 0;
                enemyWoRamp.forEach(function(obj) {
                    const rng = creep.pos.getRangeTo(obj);
                    if (rng == 1) enemyDamage += 10;
                    if (rng == 2) enemyDamage += 4;
                    if (rng == 3) enemyDamage += 1;
                })
                
            
                
                
                if (enemyWoRamp.length > 1 && enemyDamage > 10) {
                    creep.rangedMassAttack();
                    rangedAtacked = true;
                } else if (enemyWoRamp.length) {
                    creep.rangedAttack(enemyWoRamp[0]);    
                    rangedAtacked = true;
                } else if (manualTarget && creep.pos.inRangeTo(manualTarget,3)){
                    if (creep.pos.inRangeTo(manualTarget,1)){
                        creep.rangedMassAttack();    
                    } else {
                        creep.rangedAttack(manualTarget);        
                    }
                    rangedAtacked = true;
                } else {
                    if (rangeToTarget <= 1 && !(target.structureType && target.structureType == STRUCTURE_WALL)) { //check to wall
                        creep.rangedMassAttack();
                        rangedAtacked = true;
                    } else if (rangeToTarget <= 3) {
                        creep.rangedAttack(target);    
                        rangedAtacked = true;
                    }
                }
                
                if (creep.hits < creep.hitsMax) {
                    creep.say(creep.hits/creep.hitsMax);    
                }

                if (creep.pos.isNearTo(target) && creep.getActiveBodyparts(ATTACK)) {
                    let res = creep.attack(target);
                    if (res == OK) {
                        meleeAtacked = true;
                    }
                    creep.say('a'+res, 0);
                }
                
                if (creep.hits >= creep.hitsMax*escapeHpKoeff) {
                    //creep.say(rangeToTarget+' '+rangeToTargetCreep+' '+rangeToTargetMeleeCreep);
                    const moveCloseRange = 0;
                    if (rangeToTarget>moveCloseRange /*&& rangeToTargetCreep>3*/) { //2
                        creep.moveTo(target, {reusePath: 0, range: 0, ignoreRoads: false});    
                    } else if (rangeToTarget <= moveCloseRange && rangeToTargetCreep<4) {
                        creep.moveTo(escapePosition, {reusePath: 0, range: 1});
                    } else if (rangeToTargetCreep<3) {
                        creep.moveTo(escapePosition, {reusePath: 0, range: 1});
                    }
                    
                } else {
                    if (escapePosition){
                        creep.moveTo(escapePosition, {reusePath: 0, range: 1});        
                    }
                }

                if (creep.hits == creep.hitsMax) {
                    if (targetHeal) {
                        if (creep.pos.getRangeTo(targetHeal) > 1) {
                            if (!rangedAtacked) {
                                creep.rangedHeal(targetHeal);    
                            } else if (!meleeAtacked) {
                                creep.heal(creep);        
                            }
                        } else if (!meleeAtacked) {
                            creep.heal(targetHeal);        
                        }
                    } else {
                        if (!meleeAtacked) {
                            creep.heal(creep);        
                        }
                    }
                } else {
                    if (!meleeAtacked) {
                        creep.heal(creep);        
                    }
                }
            } else {
                let healed = false;
                if (creep.hits < creep.hitsMax) {
                    creep.heal(creep);
                    healed = true;
                }
                let helping = false;
                if (!(creep.room.controller && creep.room.controller.my)) {
                    let healTarget = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                        filter: function (object) {
                            return object.hits < object.hitsMax && object.name != creep.name && object.memory.role == 'miner';
                        }
                    });
                    if (healTarget && !healed) {
                        helping = true;
                        if (!creep.pos.isNearTo(healTarget)) {
                            helpers.smartMove(creep, healTarget, 0);    
                        }
                        if (creep.pos.isNearTo(healTarget)) {
                            creep.heal(healTarget);
                        } else if (creep.pos.inRangeTo(healTarget, 3)) {
                            creep.rangedHeal(healTarget);
                        }
                    }
                }                
                
                
                if (!helping && !creep.pos.inRangeTo(flag, 1)) {
                    helpers.smartMove(creep, flag, 0, 1);    
                }
                
            }
        }
    },
    
};

module.exports = roleHunter;