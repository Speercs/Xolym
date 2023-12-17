var helpers = require('helpers');

var roleMiner = {
    getBody: function (spawn, sector = null) {
        if (!Game.spawns[spawn] || !Game.spawns[spawn].room) return [MOVE,WORK,WORK,CARRY]; 
        var cap = Game.spawns[spawn].room.energyCapacityAvailable;
        let room = Game.spawns[spawn].room;
        let level = room.controller.level;
        if (Game.shard.name == 'shard3'){
            if (Game.spawns[spawn].room.name == "E42N31" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
        }
        if (Game.shard.name == 'shard2'){
            // if (Game.spawns[spawn].room.name == "E58N22" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            // if (Game.spawns[spawn].room.name == "E55N27" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            // if (Game.spawns[spawn].room.name == "E44N38" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            // if (Game.spawns[spawn].room.name == "E42N28" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            // if (Game.spawns[spawn].room.name == "E41N23" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            // if (Game.spawns[spawn].room.name == "E41N39" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            // if (Game.spawns[spawn].room.name == "E45N11" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            // if (Game.spawns[spawn].room.name == "E36N9" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            
            
            if (room.memory.regenSourceTime > Game.time - 5000 && sector == undefined) {
                return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,CARRY,WORK]; //MOVE*8,WORK*16,CARRY*4
            }

            if (['E58N22','E55N27','E44N38','E42N28','E41N23','E41N39','E45N11','E36N9','E57N44','E44S8','E47S1'].includes(Game.spawns[spawn].room.name) && sector == undefined) { //deprecated!!!!!!!
                return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,CARRY,WORK]; //MOVE*8,WORK*16,CARRY*3
                //return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            }

            
            if ([23,24,25,42,43,44,51,52,53,54,55,56,84,85,86,87,88,89,90,91,92,93,94,95,109,130].indexOf(sector) !== -1 && cap >= 1250)  { //SK
                if (cap >= 1800) return [MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,];//MOVE*7,WORK*14,CARRY*1
                // if (cap >= 1400) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK];//MOVE*9,WORK*9,CARRY*1
                // return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE]; //MOVE*8,WORK*8,CARRY*1    
            }    
            //if (sector && cap >= 1800 && level > 5) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,CARRY,WORK]; //MOVE*7,WORK*14,CARRY*1
            if (sector && cap >= 1550 && level > 5) return [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,CARRY,WORK,]; //MOVE*6,WORK*12,CARRY*1
            if (cap >= 1700 && level > 5) return           [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,CARRY,WORK,]; //MOVE*6,WORK*12,CARRY*4
        }
        
        if (Game.shard.name == 'shard0'){
            // if (Game.spawns[spawn].room.name == "E83N58" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK]; //MOVE*5,WORK*14,CARRY*1
            if (['E87N56','E83N54','E79N59',].includes(Game.spawns[spawn].room.name) && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            // if (Game.spawns[spawn].room.name == "E87N56" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            // if (Game.spawns[spawn].room.name == "E83N54" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            // if (Game.spawns[spawn].room.name == "E79N59" && sector == undefined) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*7,WORK*14,CARRY*2
            
            
            //if (Game.spawns[spawn].room.name == "E83N54" && cap >= 1250) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE]; //MOVE*8,WORK*8,CARRY*1
            if ([3, 14, 17, 21, 23, 24, 25, 26, 27, 28, 29, 38, 42].indexOf(sector) !== -1 && cap >= 1250)  {
                if (cap >= 1800) return [MOVE,MOVE,MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,];//MOVE*7,WORK*14,CARRY*1
                if (cap >= 1400) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK];//MOVE*9,WORK*9,CARRY*1
                return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE]; //MOVE*8,WORK*8,CARRY*1    
            }    

        }
        if (sector && cap >= 1300 && level > 5) return [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY];
        if (cap >= 1400 && level > 5) return           [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY];
        if (sector && cap >= 1050 && level > 5) return [MOVE,MOVE,MOVE,MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK];
        if (cap >= 1150 && level > 5) return           [MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY];
        //if (cap >= 900 && level > 5) return [CARRY,CARRY,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY];
        if (cap >= 800) return [MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY];
        if (cap >= 700) return [MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY];
        if (cap >= 550) return [MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY];
        if (cap >= 450) return [MOVE,MOVE,WORK,WORK,WORK,CARRY];
        if (cap >= 300) return [MOVE,WORK,WORK,CARRY];
    },
    
    skRooms: ['E84N54','E84N55','E86N54','E85N54','E84N56','E86N56','E85N56','E86N55','E76N54', 'E76N55','E55N26','E54N26','E56N26','E46N36','E46N35','E54N25','E55N24','E54N24','E56N25','E56N24','E56N44'],
        
    /** @param {Creep} creep **/
    run: function(creep) {
        if (helpers.sleep(creep)) return;
        
        if (!creep.memory.startTimeToTarget && creep.ticksToLive > 1000 && creep.memory.targetId) {
            creep.memory.startTimeToTarget = Game.time;
        }

        if (helpers.runMoveOrder(creep)) {
            if (!(Game.time%10) && !creep.getActiveBodyparts(MOVE)) {
                creep.suicide();
            }
            return;
        }
        
        // creep.memory.containerId = undefined;
        // creep.memory.linkId = undefined;
        
        
        //Memory.claimRoomTasks = {};
        if (!Memory.claimRoomTasks) {
            Memory.claimRoomTasks = {};
        }
        let reservedTick = 0;
        if (!(Game.time%15) && creep.room.name != creep.memory.room && creep.room.controller && !creep.room.controller.my && !(Memory.claimRoomTasks[creep.memory.room] && Memory.claimRoomTasks[creep.memory.room][creep.room.name])
            && (!creep.room.controller.reservation || creep.room.controller.reservation.username != 'Xolym' || (reservedTick = creep.room.controller.reservation.ticksToEnd)<5000)
            && ['E83N55'].indexOf(creep.room.name) == -1
            && creep.memory.targetId
            ) {
            let source =  Game.getObjectById(creep.memory.targetId);
            if (source && source.room && source.room.name == creep.room.name) {
                if (!Memory.claimRoomTasks[creep.memory.room]){
                    Memory.claimRoomTasks[creep.memory.room] = {};
                }
                let controllerPos = creep.room.controller.pos;
                Memory.claimRoomTasks[creep.memory.room][creep.room.name] = {x: controllerPos.x, y: controllerPos.y, reserved: reservedTick, time: Game.time};    
            }
        }
        
        
        // if (creep.hits < creep.hitsMax*0.8) {
        //     creep.memory.soonDie = 1;
        // }
        if (creep.hits < creep.hitsMax && (creep.getActiveBodyparts(WORK) < 5 || !creep.getActiveBodyparts(MOVE))) {
            creep.memory.soonDie = 1;
        }
            
        
        
        var total = creep.store.getUsedCapacity();// _.sum(creep.carry);
        if (creep.memory.targetId && creep.memory.targetId.id) {
            delete creep.memory.targetId;
        }
        
        if (creep.memory.targetId == undefined){
            
            // var sourcesInRoom;

            // if (creep.memory.sector){
            //     sourcesInRoom = helpers.getFarTargets(creep);
            // } else {
            //     sourcesInRoom = creep.room.find(FIND_SOURCES);
            // }
            // var sources = [];
            // sourcesInRoom.forEach(source => sources.push(source.id));
            
            // //find free target
            // // var miners = _.filter(Game.creeps,                      (creep) => creep.memory.role == 'miner' && !creep.memory.soonDie);
            // var miners =    _.filter(require('spawn').getGameCreeps(), (creep) => creep.memory.role == 'miner' && !creep.memory.soonDie);
            // var sourceUse = [];
            // miners.forEach(miner => {
            //     if (miner.memory.targetId != undefined && _.findWhere(sourcesInRoom, {id: miner.memory.targetId}) ){
            //         sourceUse.push(miner.memory.targetId);    
            //     }
            // });
            
            // //sourceUse.forEach(source => console.log(source));
            
            // var targets = _.difference(sources, sourceUse);
            // if (targets.length){
            //     helpers.attachToSource(creep, targets[0]);
            // } 
            
            
            let sources = creep.memory.sector ? helpers.getFarTargets(creep) : creep.room.find(FIND_SOURCES);
            let targets = _.filter(sources, source => !_.filter(require('spawn').getGameCreeps(creep.memory.room, 'miner'), creep => creep.memory.role == 'miner' && creep.memory.targetId == source.id && !creep.memory.soonDie).length);
            if (targets.length){
                creep.memory.targetId = targets[0].id;
            } else {
                creep.memory.sleep = Game.time+10;
            }
            
        
        }
        
        if (creep.memory.targetId != undefined) {
            var source =  Game.getObjectById(creep.memory.targetId);
            if (source == null){
                    //find flag
                    var flag = _.findWhere(helpers.getFarTargets(creep), {id: creep.memory.targetId});
                    if (flag && Game.flags[flag.flag]){
                        helpers.smartMove(creep, Game.flags[flag.flag].pos);
                        helpers.createMoveOrder(creep, Game.flags[flag.flag].pos, {room:1});
                        //creep.moveTo(Game.flags[flag.flag].pos);
                        //console.log('Moving to flag',flag,  creep.name,  res, result);
                    }
                //helpers.deAttachToSource(creep);
            } else {
                if (!creep.memory.lair && source && roleMiner.skRooms.indexOf(creep.room.name) >= 0) {
                    var lairs = source.pos.findInRange(FIND_HOSTILE_STRUCTURES, 6, {
                                filter: (structure) => {return structure.structureType == STRUCTURE_KEEPER_LAIR;}   
                    });
                    if (lairs.length){
                        creep.memory.lair = lairs[0].id;
                    }
                }
                
                
                if (creep.hits < creep.hitsMax && creep.getActiveBodyparts(HEAL)){
                    creep.heal(creep);
                    //console.log(creep.name, 'healing');
                }
                
                var retreat = false;
                if (roleMiner.skRooms.indexOf(creep.room.name) >= 0 && creep.memory.lair){
                    var lair = Game.getObjectById(creep.memory.lair);
                    let keepers = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 7, {
                                filter: (i) => {return i.owner.username == 'Source Keeper'}   
                            });
                    if ((lair && (lair.ticksToSpawn<15 || lair.ticksToSpawn>295 || !lair.ticksToSpawn)) ||
                        keepers.length
                    ){
                        creep.say('ret'+keepers.length);
                         //find flag
                        var flag = _.findWhere(helpers.getFarTargets(creep), {id: creep.memory.targetId});
                        if (flag){
                            creep.drop(RESOURCE_ENERGY);
                            let retreatTarget = Game.flags[flag.flag]?Game.flags[flag.flag].pos:undefined;
                            if (!retreatTarget) {
                                try {
                                    creep.pos.createFlag(flag.flag);
                                } catch (e) {}
                            } else {
                                let target = Game.flags[flag.flag].pos;
                                if (creep.pos.isNearTo(target)) {
                                    creep.move(creep.pos.getDirectionTo(target));
                                } else {
                                    helpers.smartMove(creep, target);
                                }
                            }
                            retreat = true;
                            creep.memory.inPosition = undefined;
                            //console.log('Moving to flag',flag,  creep.name,  res, result);
                        }
                    }
                }
            
                if (!retreat){
                    var harvestResult =-1;
                    //creep.say(source.id);
                    if (0  && source.id == '5dae66dba8ae60632303e542') {
                        let harvestResult = creep.dismantle(source);
                        if (harvestResult == ERR_NOT_IN_RANGE) {
                            helpers.smartMove(creep, source, 1, 1);
                        }
                    } else {
                        if (creep.pos.inRangeTo(source, 2)) { // creep.pos.isNearTo(source)){
                            if (!creep.memory.timeToTarget){
                                creep.memory.timeToTarget = creep.memory.startTimeToTarget?(Game.time - creep.memory.startTimeToTarget + 15):60;
                                creep.memory.startTimeToTarget = undefined;
                            }
                            if (!(Game.time%1)){
                                let timeToSpawn = creep.body.length*3;
                                if (creep.memory.timeToTarget + timeToSpawn - 10 > creep.ticksToLive) {
                                    //creep.say('soonDie');
                                    creep.memory.soonDie = 1;
                                }
                            }
                        }
                        harvestResult = creep.harvest(source);    
                    }
                    if(harvestResult == ERR_NOT_IN_RANGE || harvestResult == ERR_NOT_ENOUGH_RESOURCES) {
                        if (!creep.memory.oldChange && creep.pos.getRangeTo(source) == 2) {
                            let oldMiners = source.pos.findInRange(FIND_MY_CREEPS, 1, {
                                filter: (object) => {
                                    //console.log(creep.room.name, object.name, object.memory.targetId, source.id, object.id, creep.id, object.ticksToLive, creep.ticksToLive);
                                    return object.memory.targetId == source.id && object.id != creep.id && object.ticksToLive<creep.ticksToLive && object.getActiveBodyparts(WORK) <= creep.getActiveBodyparts(WORK)
                                }
                            });
                            creep.memory.oldChange = 1;
                            if (oldMiners.length) {
                                //console.log('miner suicide', helpers.getRoomLink(oldMiners[0].room.name));
                                oldMiners[0].suicide();
                                return;
                            }
                            
                        }
                        if (creep.memory.oldChange && !creep.memory.lair && creep.memory.buggMove > 10 && !creep.pos.isNearTo(source.pos)) {
                            console.log('miner bugg move', "<a href='/a/#!/room/"+Game.shard.name+"/"+creep.room.name+"'>"+creep.room.name+"</a>", creep.pos.getRangeTo(source));
                        }


                        if (harvestResult == ERR_NOT_IN_RANGE){
                            if (source.id == '5873be0011e3e4361b4da222' && Game.flags['Flag26']){
                                creep.moveTo(Game.flags['Flag26'].pos, {visualizePathStyle: {stroke: '#ffaa00'}});
                            } else {
                                creep.say('move');
                                if (creep.memory.containerId && Game.getObjectById(creep.memory.containerId)) {
                                    helpers.smartMove(creep, Game.getObjectById(creep.memory.containerId), 1, 0);
                                    creep.say('move!@');
                                } else {
                                    helpers.smartMove(creep, source, 1, 1);
                                    helpers.createMoveOrder(creep, source);
                                    if (creep.memory.oldChange && !creep.memory.lair && !creep.fatigue) {
                                        creep.memory.buggMove = (creep.memory.buggMove?creep.memory.buggMove:1)+1;
                                    }
                                }
                            }
                        }
                        
                        if (harvestResult == ERR_NOT_ENOUGH_RESOURCES){
                            if (!creep.pos.isNearTo(source.pos)){
                                creep.say('move2');
                                helpers.smartMove(creep, source, 1, 1);
                                if (creep.memory.oldChange && !creep.memory.lair && !creep.fatigue) {
                                    creep.memory.buggMove = (creep.memory.buggMove?creep.memory.buggMove:1)+1;
                                }
                            }
                            
                            //console.log(creep.name, 'ERR_NOT_ENOUGH_RESOURCES', creep.room.name);
                            let found = creep.pos.lookFor(LOOK_ENERGY);
                            let withdrawed = false;
                            if (found.length){
                                creep.pickup(found[0]);
                            } else if (creep.memory.containerId && total<creep.carryCapacity) {
                                var container = Game.getObjectById(creep.memory.containerId);
                                if (container && _.sum(container.store)) {
                                    creep.withdraw(container, RESOURCE_ENERGY);
                                    withdrawed = true;
                                }
                            }
                            if (container && creep.carry[RESOURCE_ENERGY] && container.hits < container.hitsMax*0.8 && container.store.getFreeCapacity()>1700) {
                                creep.repair(container);
                            } else if (creep.memory.linkId && creep.carry[RESOURCE_ENERGY]) {
                                var link = Game.getObjectById(creep.memory.linkId);
                                if (link) {
                                    let res = creep.transfer(link, RESOURCE_ENERGY);
                                    if (res == OK && creep.store[RESOURCE_ENERGY]+link.store[RESOURCE_ENERGY] > 700) {
                                        helpers.addLinkQueue(creep.room, link);
                                    }
                                }
                            } else if (!withdrawed){
                                //creep.say('mbsleep');
                                if (creep.pos.isNearTo(source) && !source.energy && source.ticksToRegeneration > 3) {
                                    if (roleMiner.skRooms.indexOf(creep.room.name) >= 0 && creep.memory.lair) {
                                        const lair = Game.getObjectById(creep.memory.lair);
                                        if (lair && lair.ticksToSpawn > 20) {
                                            creep.memory.sleep = Game.time + Math.min(source.ticksToRegeneration, lair.ticksToSpawn-16);    
                                        }
                                    } else if (creep.getActiveBodyparts(WORK)>=14 && !creep.memory.sector) { //!!!!!!!!!!!totdo check power effect on source
                                        if (source.ticksToRegeneration > 20) {
                                            creep.memory.sleep = Game.time + Math.min(source.ticksToRegeneration-20, 10);    
                                        }
                                    } else {
                                        creep.say(source.ticksToRegeneration);    
                                        creep.memory.sleep = Game.time + source.ticksToRegeneration;
                                    }
                                }
                            }
                        }
                    } else {
                        if (harvestResult == OK && roleMiner.skRooms.indexOf(creep.room.name) >= 0 && creep.memory.lair == undefined){
                            var lairs = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 6, {
                                filter: (structure) => {return structure.structureType == STRUCTURE_KEEPER_LAIR;}   
                            });
                            if (lairs.length){
                                creep.memory.lair = lairs[0].id;
                            }
                        }
                        if (harvestResult == OK && creep.memory.containerId && !creep.memory.inPosition) {
                            let container = Game.getObjectById(creep.memory.containerId);
                            if (container) {
                                //console.log('miner check position', helpers.getRoomLink(container.pos.roomName));
                                if (creep.pos.isEqualTo(container)){
                                    creep.memory.inPosition = 1;
                                    creep.memory._trav = undefined;
                                    creep.memory._move = undefined;
                                } else {
                                    helpers.smartMove(creep, container, 1, 0);
                                    //console.log('miner moving to container pos in room', helpers.getRoomLink(container.pos.roomName));
                                }
                            }
                        }
                        
                        if (total>0){
                            if (creep.memory.containerId == 0) {
                                creep.memory.containerId = undefined;
                            }
                            
                            if (creep.memory.containerId == undefined || creep.memory.linkId == undefined){
                                //find to build
                                //console.log('miner', creep.name, 'find to build');
                                var containers = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 2, {
                                    filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK;}   
                                });
                                if (containers.length){
                                    //console.log(creep.name, containers[0]);
                                    if (creep.carry.energy>35){
                                        creep.build(containers[0]);    
                                    }
                                } else {
                                    //find container
                                    //console.log('miner', creep.name, 'find container');
                                    let containers = null;
                                    if (source) {
                                        containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                                            filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER && !['6362134b4f783a11255db58f','5dfd2fb939e9a320062509fc','60a4def970c4d4ce7e7b7165','6183ba19d459c66f821b0969',].includes(structure.id);}   
                                        });
                                    } 
                                    // else {
                                    //     containers = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                                    //         filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER && structure.id !== '5dfd2fb939e9a320062509fc';}   
                                    //     });
                                    // }
                                    if (containers.length){
                                        creep.memory.containerId = containers[0].id;
                                        //console.log(creep.name);
                                    } else {
                                        //creep.memory.containerId = 0;
                                        //if (['E41N31_'].indexOf(creep.room.name) == -1) {
                                        creep.pos.createConstructionSite(STRUCTURE_CONTAINER);    
                                        //}
                                    }
                                    
                                    //find link
                                    //console.log('miner', creep.name, 'find link');
                                    var links = creep.pos.findInRange(FIND_MY_STRUCTURES, 3, {
                                        filter: (structure) => {return structure.structureType == STRUCTURE_LINK 
                                        && structure.id != '59134a097d4719b011ab4167' 
                                        && structure.id != '5941306f03f27eb6321b2129' 
                                        && structure.id != '59cf78058fe1af6c1e93d198'
                                        && structure.id != '5e2fdb9d4348bdce4f43f8ec'
                                        && structure.id != '5eef2096a275dbd84fb5725e'
                                        && structure.id != '5eefb1edd25115191dfc1be9'
                                        && structure.id != '5f3a300d40ab9a3bc1eaf41e'
                                        && structure.id != '60729df105be242e648e1988'
                                        //&& structure.id != creep.room.memory.storageLink
                                        && structure.id != _.get(Memory, 'rooms['+creep.room.name+'].storageLink')
                                        
                                        ;}   
                                    });
                                    if (links.length){
                                        creep.memory.linkId = links[0].id;
                                        //console.log(creep.name, 'find link');
                                    } else {
                                        creep.memory.linkId = 0;
                                    } 
                                }
                            }
                            
                            if (creep.memory.linkId == 0 && creep.memory.containerId == 0){
                                if (creep.carry.energy > 30){
                                    // drop all resources
                                    for(const resourceType in creep.carry) {
                                        creep.drop(resourceType);
                                    }
                                }
                            } 
                            
                            var linkHarvest = false;
                            if (creep.memory.linkId && creep.store.getFreeCapacity() < creep.getActiveBodyparts(WORK)*HARVEST_POWER){
                                var link = Game.getObjectById(creep.memory.linkId);
                                if (link && link.energy < link.energyCapacity) {
                                    linkHarvest = true;
                                    let res = creep.transfer(link, RESOURCE_ENERGY);
                                    if (res == OK && creep.store[RESOURCE_ENERGY]+link.store[RESOURCE_ENERGY] > 700) {
                                        helpers.addLinkQueue(creep.room, link);
                                    } else if (res == ERR_NOT_IN_RANGE){
                                        creep.moveTo(link);
                                    } else if (res == ERR_FULL) {
                                        linkHarvest = false;
                                    }
                                } 
                                // else if (link) {
                                //     var storageLink = null;
                                //     if (creep.memory.storageLinkId != undefined) {
                                //         storageLink = Game.getObjectById(creep.memory.storageLinkId);
                                //     } else {
                                //         //find storage link
                                //         //console.log('miner', creep.name, 'find storage link');
                                //         var storagelinks = creep.room.storage.pos.findInRange(FIND_STRUCTURES, 2, {
                                //             filter: (structure) => {return structure.structureType == STRUCTURE_LINK;}   
                                //         });
                                //         if (storagelinks.length){
                                //             creep.memory.storageLinkId = storagelinks[0].id;
                                //             storageLink = storagelinks[0];
                                //         }
                                //     }
                                    
                                //     if (storageLink){
                                //       //  link.transferEnergy(storageLink);    //22012020
                                //     }
                                // }
                            } 
                            
                            if (!linkHarvest && creep.memory.containerId && creep.store.getFreeCapacity() < creep.getActiveBodyparts(WORK)*HARVEST_POWER){
                                var container = Game.getObjectById(creep.memory.containerId);
                                if (!container) {
                                    creep.memory.containerId = undefined;
                                }
                                if (0 && source && container) { //!creep.memory.containerRange && 
                                    if (source.pos.isNearTo(container)) {
                                        if (creep.pos.isEqualTo(container) || !creep.getActiveBodyparts(MOVE)) {
                                            creep.memory.containerRange = 1;
                                        } else {
                                            creep.memory.containerRange = undefined;
                                            creep.moveTo(container);
                                            if (!creep.memory.cmoveCount) {
                                                creep.memory.cmoveCount = 1;
                                            } else {
                                                creep.memory.cmoveCount++;
                                            }
                                            if (creep.memory.cmoveCount > 1) {
                                                console.log('miner moving to container pos in room', helpers.getRoomLink(container.pos.roomName), creep.memory.cmoveCount);        
                                            }
                                            
                                            creep.say('m');
                                        }
                                        
                                    } else {
                                        creep.memory.containerRange = 2;
                                        //console.log('container range 2 to source in room', helpers.getRoomLink(container.pos.roomName));
                                    }
                                }
                                
                                if (creep.memory.containerRange == 2 && creep.memory.containerId) {
                                    creep.memory.containerId = undefined;
                                }
                                
                                if (creep.memory.targetId == '5873be8311e3e4361b4db0d2' && creep.room.storage && creep.pos.isNearTo(creep.room.storage)) {
                                    container = creep.room.storage;
                                }
                                if (container && container.hits<0.5*container.hitsMax) {
                                    creep.repair(container);
                                    creep.say('rep');
                                } else if (0 && container && creep.memory.containerRange !== 1 && _.sum(container.store)<container.storeCapacity) {
                                    if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                                        creep.moveTo(container);
                                    } else {
                                        creep.say('tr');
                                        console.log('miner transfer in room', helpers.getRoomLink(container.pos.roomName));        
                                    }
                                } else {
                                    //creep.drop(RESOURCE_ENERGY);
                                    // drop all resources
                                    // for(const resourceType in creep.carry) {
                                    //     creep.drop(resourceType);
                                    // }
                                }
                            } 
                            

                            
                            
                            
                        }
                    }    
                }
            //console.log('Miner', creep.name, result);
            }
        }
	}
};

module.exports = roleMiner;