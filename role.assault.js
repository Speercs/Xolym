var helpers = require('helpers');
var roleAssault = {
    getBody: function (spawn, role='assault', gameCreeps) {
        if (role == 'defender'){
            return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*25,RANGED_ATTACK*25
        }
        if (role == 'dismantler'){
            //return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK]; //MOVE*17,WORK*33
            return [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];  //MOVE*25,WORK*25
        }
        if (role == 'transporter' || role == 'transporter2') {
            return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];//MOVE*15,CARRY*16
        }
        if (role == 'healer'){
            //return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL];//MOVE*10,HEAL*10
            // return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            // HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]; //TOUGH*5,MOVE*13,HEAL*32
            
            // return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            // HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,];//MOVE*25,ATTACK*25
            
            return [
            TOUGH,TOUGH,TOUGH,TOUGH, //4
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, //16 + 1
            HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL,
            HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL,
            HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, //29
            MOVE];//
    
        }
        // return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        // ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE];//MOVE*25,ATTACK*25
    
        return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK];   //TOUGH*11,MOVE*13,ATTACK*26 
        
        // return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, // 11  TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
        // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        // ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,  ];//TOUGH*11,MOVE*17,ATTACK*22
    
    
    
        // var melee = _.filter(gameCreeps, (creep) => creep.getActiveBodyparts(ATTACK)         && (creep.memory.assault == 1 || creep.memory.type == 'assault') && (creep.ticksToLive > 100 || creep.spawning));
        // var ranger = _.filter(gameCreeps, (creep) => creep.getActiveBodyparts(RANGED_ATTACK) && (creep.memory.assault == 1 || creep.memory.type == 'assault') && (creep.ticksToLive > 100 || creep.spawning));
        // var healers = _.filter(gameCreeps, (creep) => creep.getActiveBodyparts(HEAL)         && (creep.memory.assault == 1 || creep.memory.type == 'assault') && (creep.ticksToLive > 100 || creep.spawning));
        // if (melee.length*2 > healers.length) {
        //     //return [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL];
        //     //return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]; // TOUGH*5,MOVE*25,HEAL*20
        //     return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE]; //TOUGH*11,MOVE*25,HEAL*14
        // } else {
        //     //return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE];
        //     return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE];// TOUGH*5,MOVE*25,ATTACK*20
        // }
    },
    run: function(creep) {
        let isMelee = creep.getActiveBodyparts(ATTACK) || creep.getActiveBodyparts(WORK);
        let isHeal = creep.getActiveBodyparts(HEAL);
        let isRanged = creep.getActiveBodyparts(RANGED_ATTACK);
        let isTransporter = creep.getActiveBodyparts(CARRY);
        let creepRole = 'MELEE';
        if (isHeal && !isRanged && !isMelee) {
            creepRole = 'HEAL';
        } else if (isRanged) {
            creepRole = 'RANGED';
        }
        
        
        if (isTransporter) {
            var total = _.sum(creep.carry);    
            if (creep.memory.home == undefined) {
                creep.memory.home = creep.pos.roomName;
            }
            
            let flagTransporter = Game.flags['FlagAssaultGet']; 
            if (creep.memory.subtype == 'transporter2') {
                flagTransporter = Game.flags['FlagAssaultGet2']; 
            }
            
            if (!total && creep.ticksToLive < 300 && creep.room.name == creep.memory.home){
                creep.memory.role = undefined;
            }
            
            if (!flagTransporter && !total) {
                creep.say('waiting');
                //waiting flag
            } else if ((!flagTransporter && total) || (total >= creep.carryCapacity) || (total && creep.room.name == creep.memory.home) ) {
                //return to base
                if (creep.memory.home != creep.room.name) {
                    var pos = new RoomPosition(38, 43, creep.memory.home);
                    let res = helpers.smartMove(creep, pos, 0);
                    //console.log(creep.name, res);
                } else {
                    let terminal = creep.room.terminal;
                    if (terminal && terminal.store.getFreeCapacity()< 30000) {
                        terminal = creep.room.storage;
                    }
                    if (terminal) {
                        // transfer all resources
                        let err;
                        for(const resourceType in creep.carry) {
                            err = creep.transfer(terminal, resourceType);
                        }
                        
                        if (err == ERR_NOT_IN_RANGE) {
                            helpers.smartMove(creep, terminal,0);
                        } 
                        // else {
                        //     creep.memory.role = undefined;
                        // }
                    }
                }
                
            } else if (flagTransporter) {
                if (creep.ticksToLive < 100 && creep.room.name == creep.memory.home) {
                     creep.memory.role = undefined;
                }
                
                if (creep.pos.getRangeTo(flagTransporter.pos) > 1){
                    helpers.smartMove(creep, flagTransporter, 0);
                } else {
                    creep.say('My treasures!!!');
                    //looking for treasures
                    let chest = null;
                    var found = creep.room.lookForAt(LOOK_STRUCTURES, flagTransporter);
                    found.forEach(function (lookObject) {
                        if (lookObject.store && lookObject.store.getUsedCapacity() >0 ) {
                            chest = lookObject;
                        }
                    });
                    if (!chest) {
                        found = creep.room.lookForAt(LOOK_TOMBSTONES, flagTransporter);
                        found.forEach(function (lookObject) {
                            if (lookObject.store && lookObject.store.getUsedCapacity() >0 ) {
                                chest = lookObject;
                            }
                        });
                    }
                    if (!chest) {
                        found = creep.room.lookForAt(LOOK_RUINS, flagTransporter);
                        found.forEach(function (lookObject) {
                            if (lookObject.store && lookObject.store.getUsedCapacity() >0 ) {
                                chest = lookObject;
                            }
                        });
                    }
                    creep.say(chest?'yes':'no');
                    if (chest){
                        let err = creep.withdraw(chest, RESOURCE_HYDROGEN);
                        //let err = creep.withdraw(chest, RESOURCE_CATALYST);
                        if (err !== OK) {
                            for(const resourceType in chest.store) {
                                err = creep.withdraw(chest, resourceType);
                                console.log('!!!!!!!!!!!!!!!!!', chest, resourceType, err);
                            }
                        }
                    }
                }
            }
            return;
        }
        
        
        
        flagAttack = Game.flags['FlagAssault'];
        if (flagAttack == undefined){
            var flagpos = new RoomPosition(46, 12, 'E83N54');
            flagpos.createFlag('FlagAssault');    
            flagAttack = Game.flags['FlagAssault'];
        } 
        
        let target = flagAttack;
        let targetRange = creep.pos.getRangeTo(target);
        
        if (0 && creep.name == 'ChaseDominic'){
            creep.say('123');
            creep.heal(creep);
            return;
        }
        
        
        if (isMelee || isRanged){
            
            let enemy = null;
            
             
            var found = creep.room.lookForAt(LOOK_STRUCTURES, flagAttack);
            found.forEach(function (lookObject) {
                if (lookObject.structureType != STRUCTURE_ROAD 
                && lookObject.structureType != STRUCTURE_KEEPER_LAIR 
                && lookObject.structureType != STRUCTURE_CONTAINER 
                && lookObject.structureType != STRUCTURE_STORAGE 
                && lookObject.structureType != STRUCTURE_TERMINAL 
                && !lookObject.my) {
                    enemy = lookObject;
                }
            });
        
            
            if (!enemy){
                enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                    }
                });
            }
            if (enemy) {
                let enemyRange = creep.pos.getRangeTo(enemy);
                if (isMelee && enemyRange == 1) {
                    if (creep.getActiveBodyparts(ATTACK)){
                        creep.attack(enemy);    
                    }
                    if (creep.getActiveBodyparts(WORK)){
                        creep.dismantle(enemy);
                    }
                    
                }
                if (isRanged && enemyRange <=3) {
                    creep.rangedAttack(enemy);
                }
                
            }
            
            
            
            //findHeal
            const solo = true;
            let healAlly = null;
            if (solo) {
                healAlly = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function (object) {
                        return object.getActiveBodyparts(HEAL) && object.memory.type == 'assault'  && object.name != creep.name;
                    }
                });
                if (!healAlly) {
                    healAlly = creep; // on for solo!!!!!!
                }
            } else {
                let healAllys = creep.pos.findInRange(FIND_MY_CREEPS, 3,  {
                    filter: function (object) {
                        return object.getActiveBodyparts(HEAL) && object.memory.type == 'assault'  && object.name != creep.name;
                    }
                });
                if (healAllys.length >= 2) {
                    let range1 = creep.pos.getRangeTo(healAllys[0]);
                    let range2 = creep.pos.getRangeTo(healAllys[1]);
                    if (range2 == 1 && range1<4) {
                        healAlly = healAllys[1];
                    }
    
                    if (range1 == 1 && range2<4) {
                        healAlly = healAllys[0];
                    }

                } else {
                    creep.say(healAllys.length);
                    // if (healAllys.length == 1 && creep.pos.getRangeTo(healAllys[0] == 1) {
                    //     healAlly = healAllys[0];
                    // }
                }
            }
            
             
            
            
            
            if (healAlly) {
                let healRange = creep.pos.getRangeTo(healAlly);
                if (healRange <= 1 && !healAlly.fatigue) {
                    if (isMelee){
                        if (targetRange>1){
                            creep.moveTo(target, {reusePath: 1});
                        } else {
                            creep.attack(target);
                        }
                    }
                    if (isRanged){
                        if (targetRange>3){
                            creep.moveTo(target, {reusePath: 1});
                        } else {
                            creep.rangedAttack(target);
                        }
                    }
                } else if (healRange > 2) {
                    //creep.move(creep.pos.getDirectionTo(healAlly));   
                    creep.moveTo(healAlly, {reusePath: 1});
                } else {
                    if (isRanged) {
                        creep.moveTo(healAlly, {reusePath: 1});    
                    }
                    
                    if (creep.pos.x >= 48 || creep.pos.x <= 1 || creep.pos.y <= 1 || creep.pos.y >= 48 ){
                        //nowait
                        creep.say('nowait');
                        creep.moveTo(target, {reusePath: 1});
                    }
                    creep.say('w');
                    //waiting heal
                }    
            }
        } else if (creepRole == 'HEAL') {
            let atackerAlly = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function (object) {
                    return !object.getActiveBodyparts(HEAL) && !object.getActiveBodyparts(RANGED_ATTACK) && !object.getActiveBodyparts(CARRY) && object.memory.type == 'assault'  && object.name != creep.name;
                }
            });
            if (!atackerAlly) {
                atackerAlly = creep;
            }
            
            
            if (atackerAlly) {
                let atackerRange = creep.pos.getRangeTo(atackerAlly);
                
                if (atackerRange == 0) {
                        //move to flag
                        creep.moveTo(target, {reusePath: 1});
                } else if (atackerRange == 1) {
                    if (targetRange>2){
                        creep.say('i');
                        creep.moveTo(atackerAlly, {reusePath: 1, ignoreCreeps: true});   
                    }
                } else if (atackerRange > 2) {
                    creep.say('b2');
                    creep.moveTo(atackerAlly, {reusePath: 1, ignoreCreeps: true});   
                } else {
                    creep.say('b3');
                    creep.moveTo(atackerAlly, {reusePath: 1});   
                    //creep.move(creep.pos.getDirectionTo(atackerAlly));   
                }
            }
            
            let woundedAlly = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function (object) {
                    return object.hits < object.hitsMax && object.name != creep.name && object.memory.type == 'assault';
                }
            });
            let meWound = creep.hitsMax - creep.hits;
            if (!woundedAlly && !meWound) {
                woundedOtherAlly = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function (object) {
                        return object.hits < object.hitsMax && object.name != creep.name ;
                    }
                }); 
                if (woundedOtherAlly && creep.pos.inRangeTo(woundedOtherAlly, 3)) {
                    woundedAlly = woundedOtherAlly;
                }
            }
            if ((!woundedAlly || !creep.pos.inRangeTo(woundedAlly, 3)) && atackerAlly) {
                woundedAlly = atackerAlly;
            }
            if (!woundedAlly) {
                woundedAlly = creep;
            }
            
            
            let allyWound = woundedAlly.hitsMax - woundedAlly.hits;
            
            //creep.say(allyWound+' '+meWound);
            //creep.say(woundedAlly.name)
            if (meWound > allyWound) {
                woundedAlly = creep;
            }
            
            if (woundedAlly) {
                let rangeToWounded = creep.pos.getRangeTo(woundedAlly);
                if (rangeToWounded <= 1) {
                    creep.heal(woundedAlly);
                } else if (rangeToWounded <=3) {
                    creep.rangedHeal(woundedAlly);
                }
            }
        }
        
        
    }
};

module.exports = roleAssault;