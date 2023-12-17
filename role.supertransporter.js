var helpers = require('helpers');

var roleSuperTransporter = {
    getBody: function (spawn, sector = null) {
        if (!Game.spawns[spawn] || !Game.spawns[spawn].room) return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
        let cap = Game.spawns[spawn].room.energyCapacityAvailable;    
        
        if (Game.shard.name == 'shard3') {
            // if (sector == 5 && cap >= 1250) return [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; //MOVE*8,WORK*1,CARRY*15
            // if (sector == 12 && cap >= 1250) return [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; //MOVE*8,WORK*1,CARRY*15
            // if ([2,3,6,7,8,10,11].indexOf(sector) >= 0 && cap>=2450) return [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];//MOVE*16,WORK*1,CARRY*31
            if (sector == 5 && cap >= 1050)  return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; //MOVE*7,WORK*0,CARRY*14
            if (sector == 12 && cap >= 1050) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; //MOVE*7,WORK*0,CARRY*14
            if ([2,3,6,7,8,10,11,13].indexOf(sector) >= 0 && cap>=2400) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];//MOVE*16,CARRY*32 
        }
        if (Game.shard.name == 'shard2') {
            if (0 && [84,85,86,87,88].includes(sector) && Game.time < 32294311 +2500) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*16,WORK*16,CARRY*16
            // if ([5,12,14,17,18,19,20,26,/*27,*/31,33,51,59,65,74,96].indexOf(sector) >= 0 && cap >= 1250) return [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; //MOVE*8,WORK*1,CARRY*15
            // if ([6,15,16,21,24,25,28,32,40,41,43,44,47,48,53,55,56,54,62,83,87,88,89,91,92,97,100,101,102,103,104,105,106].indexOf(sector) >= 0 && cap>=2450) return [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];//MOVE*16,WORK*1,CARRY*31
            if ([59,74].indexOf(sector) >= 0 && cap >= 1050) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; //MOVE*7,WORK*0,CARRY*14
            //if (([6,15,16,21,24,25,28,32,40,41,43,44,47,48,53,55,56,54,62,83,87,88,89,91,92,97,100,101,102,103,104,105,106,107,108].indexOf(sector) >= 0 || sector > 108) && cap>=2250) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];//MOVE*15,CARRY*30 
            if (([1,3,5,9,12,15,16,17,19,21,22,23,25,28,31,33,35,37,39,42,44,45,48,49,51,54,56,57,54,61,65,67,69,72,75,77,79,81,83,84,87,90,92,93,95,96,98,100,101,102,103,104,105,106,107,108].indexOf(sector) >= 0 || sector > 108) && cap>=2400) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];//MOVE*16,CARRY*32 
        }
        
        if (Game.shard.name == 'shard0') {
            if (sector == 14) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            if ([3,6,7,10,11,33,21,29,28,43,38,42].includes(sector) && cap>=2400) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];//MOVE*16,CARRY*32 
            if (sector >= 44 && cap>=2400)                                        return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];//MOVE*16,CARRY*32 
        }
        
        if (cap >= 1650) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*11,CARRY*22
        if (cap >= 1250) return [WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];
        if (cap >= 800) return [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,];
        if (cap >= 550) return [MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY,CARRY];
        if (cap >= 300) return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];

    }, 

    run: function(creep) {
        if (helpers.sleep(creep)) return;   
        
        if (helpers.runMoveOrder(creep)) {
            if (0 && creep.store[RESOURCE_ENERGY] && creep.getActiveBodyparts(WORK)) {
                this.repairRoad(creep);
            }
            return;  
        } 
        
        if (0 && creep.room.name == 'E55N38' && creep.store[RESOURCE_ENERGY] && creep.getActiveBodyparts(WORK) == 1) {
            
            let roadWorkers = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
                filter: function (object) {
                    return object.memory.role == 'supertransporter' && object.getActiveBodyparts(WORK)>1;
                }
            });
            if (roadWorkers.length) {
                creep.say('!');
                creep.transfer(roadWorkers[0], RESOURCE_ENERGY );
            }

        }
        
        
        var total = creep.store.getUsedCapacity();// _.sum(creep.carry);
        //console.log(creep.name, creep.carryCapacity, total);
	    if((creep.store.getFreeCapacity() && total >0 && creep.memory.targetId != undefined) || ( total == 0 && creep.store.getCapacity())) {
            if (creep.memory.targetId == undefined) {
                
                if (creep.ticksToLive <= 120 && creep.getActiveBodyparts(WORK) <= 1){
                    //console.log(creep.name, creep.room.name, 'too old and going to recycle');
                    creep.suicide();// save cpu
                    helpers.recycleCreep(creep);
                    if (creep.room.name == creep.memory.room) {
                        creep.memory.role = undefined;
                    }
                } else {
                    if (1 || Game.shard.name == 'shard2') {
                        let farTargets = helpers.getFarTargets(creep);
                        if (!farTargets.length) {
                            creep.memory.sleep = Game.time + 20;
                        } else if (farTargets.length == 1) {
                            helpers.attachToSource(creep, farTargets[0].id);
                            creep.memory.targetRadius = farTargets[0].r;
                        } else {
                            //console.log('getGameCreeps supertransporter');
                            let superTransporters = [];
                            if (farTargets.length > 2) {
                                superTransporters = _.filter(require('spawn').getGameCreeps(creep.memory.room, 'supertransporter'), (c) => c.memory.role == 'supertransporter' && c.memory.sector == creep.memory.sector && c.memory.targetId);    
                            }
                            let farTargetInfo = [];
                            farTargets.forEach(target => {
                                let amount = 0;
                                let source = Game.getObjectById(target.id);
                                if (source && source.pos && Game.rooms[source.pos.roomName]) {
                                    let room = Game.rooms[source.pos.roomName];
                                    source.pos.findInRange(FIND_STRUCTURES, 1, {
                                        filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER;}   
                                    }).forEach(container => {
                                        amount += container.store[RESOURCE_ENERGY];
                                        let dropped = container.pos.lookFor(LOOK_ENERGY);
                                        if (dropped.length) {
                                            amount += dropped[0].amount;
                                        }
                                        room.visual.text(amount, container.pos.x , container.pos.y, {align: 'left', opacity: 0.8});
                                    });
                                }
                                _.filter(superTransporters, (c) => c.memory.targetId == target.id).forEach(sCreep => {
                                    let stransporter = Game.getObjectById(sCreep.id);
                                    if (stransporter) {
                                        amount -= stransporter.store.getCapacity();    
                                    }
                                })

                                farTargetInfo.push({id:target.id, flag:target.flag, amount:amount, radius: target.r});
                            });
                            
                            let targetInfo = _.max(farTargetInfo, target=>target.amount);
                            helpers.attachToSource(creep, targetInfo.id);
                            creep.memory.targetRadius = targetInfo.radius;
                            creep.say(targetInfo.amount, 1);
                        }
                    } else { //deprecated
                        //find new target;
                        var superTransporters = _.filter(require('spawn').getGameCreeps(), (creep) => creep.memory.role == 'supertransporter');
                        var sourceUse = [];
                        var farTargets = _.shuffle(helpers.getFarTargets(creep));
                        farTargets.forEach(target => sourceUse[target.id]=target.koef);
                        superTransporters.forEach(superTransporter => {
                            var id = superTransporter.memory.targetId;
                            if (id != undefined && _.findWhere(farTargets, {id: id}) ){
                                if (sourceUse[id] == undefined){
                                    sourceUse[id] = 1;   
                                } else {
                                    sourceUse[id]++;
                                }
                            }
                        });
                        var targets = [];
                        for (var key in sourceUse) {
                            targets.push({id: key, num: sourceUse[key]})
                        }
                        
                        if (targets.length){
                            targets = _.shuffle(targets);
                            targets.sort(function (a,b){return a.num-b.num;});  
                            helpers.attachToSource(creep, targets[0].id);
                            //console.log('superTransporter', creep.name, creep.room.name, 'attached to', targets[0].id);
                        }                        
                    }
                }
            }
                    
	        if (creep.memory.targetId != undefined) {
                var source = Game.getObjectById(creep.memory.targetId);
                if (!source && creep.room.name == creep.memory.room) { //(!source && creep.room.name == creep.memory.room) ||  (source && source.room.name != creep.room.name)){
                    //find flag
                    var flag = _.findWhere(helpers.getFarTargets(creep), {id: creep.memory.targetId});
                    if (flag){
                        if (1 && Game.flags[flag.flag] && Game.getObjectById(creep.memory.targetId) && Game.getObjectById(creep.memory.targetId).pos.isEqualTo(Game.flags[flag.flag])) {
                            console.log('flag WARNING in room', helpers.getRoomLink(Game.flags[flag.flag].pos.roomName));
                        } 
                        
                        
                        let target = Game.flags[flag.flag]?Game.flags[flag.flag].pos:undefined;
                        if (!target && Game.getObjectById(creep.memory.targetId)) {
                            try {
                                Game.getObjectById(creep.memory.targetId).pos.createFlag(flag.flag);
                            } catch (e) {}
                        }
                        helpers.smartMove(creep, target);
                        helpers.createMoveOrder(creep, source, {range: 2, room: true});
                    } else if (!source){
                        
                        creep.say('no source');
                        helpers.deAttachToSource(creep);
                    }

                } else {
                    if (!source){
                        source = creep;
                    }
                    var range = creep.pos.getRangeTo(source);
                    if (range <=50) {
                        creep.say('d'+range);    
                    } else {
                        
                    }
                    
                    var res = 0;
                    var dropFinded = false;
                    let searchRange = creep.memory.targetRadius?creep.memory.targetRadius:7;
                    let searchDroppedRange = 4;
                    if (Game.shard.name == 'shard2' && creep.memory.sector == 51) {
                        searchDroppedRange = 3;
                    }
                    if(range <= searchRange) {
                        creep.say('d'+range+'_f');
                        var targets = creep.pos.findInRange(FIND_DROPPED_RESOURCES, searchDroppedRange, {
                                filter: (i) => (i.amount>50 && i.id != '5e81c37e5fceef3d4c0c2e0d') 
                            });
                        if(targets.length > 0) {
                            creep.say('Dropped');
                            dropFinded = true;
                            let pickupTarget = creep.pos.findClosestByPath(targets);
                            if (creep.pos.isNearTo(pickupTarget)){
                                creep.pickup(pickupTarget);
                            } else {
                                //res = creep.moveTo(pickupTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
                                helpers.smartMove(creep, pickupTarget);
                                helpers.deAttachToSource(creep);
                                if (pickupTarget) {
                                    helpers.attachToSource(creep, pickupTarget.id);    
                                }
                            }
                        }  else {
                            targets = creep.pos.findInRange(FIND_TOMBSTONES, 4, {
                                filter: (i) => (i.store[RESOURCE_ENERGY])
                            });
                            
                            if (!targets.length) {
                                //find containers
                                targets = creep.pos.findInRange(FIND_STRUCTURES, 4, {
                                    filter: (i) => (
                                        (((i.structureType == STRUCTURE_CONTAINER ) && i.store[RESOURCE_ENERGY] > 100 && i.pos.getRangeTo(source) < 4)
                                        || (i.store && i.store[RESOURCE_ENERGY] >= 200 && i.pos.getRangeTo(source) < 8)
                                        )
                                        && ['5da9669667b14b785b2ee77e','5da6eba43fd06acabd170e41','5da6ed188515454a0a016422','5da6e92af24cab20c03aafee','5da6e26b307cf87f985d1fd0','5da96a23195f85db5928bd33',
                                         '5da5c0fa32bd1bef95a673b7_','5da97c30d3ca2c4920e73d64_','5da6e5bb3fd06a4ec1170b92','5da6e5a2ba03e7a6dbe5a4a6','5da6e7bfa0ff6e3be5d1aecd',
                                         '5da6e9e5caa464014ff26a47','5da963ea83ecf8a34b095876','5da99f3637a1c845f517a2c4','5da9641c67b14b7d9b2ee683', '5da9673dffde6a79448f027c', '5da97d747c64451bb8e28acd',
                                         '605de75d7d9c77f8ea707b1a', '605de75d7d9c77a05b707b17', '605de75d7d9c77ce7f707b1d',
                                         ].indexOf(i.id) == -1
                                         && i.structureType != STRUCTURE_TOWER
                                        )
                                        
                                });
                                // if (Game.shard.name == 'shard2' && creep.memory.sector == 22) {
                                //     targets = [Game.getObjectById('5ec17ecff60d1753f3aa2b7b'), ];
                                //     // if (!targets[0].store.getUsedCapacity) {
                                //     //     targets = [Game.getObjectById('5ec17ecff60d17e715aa29b5'), ];    
                                //     // }
                                //     // if (!targets[0].store.getUsedCapacity) {
                                //     //     targets = [Game.getObjectById('5ec17ecff60d17b77caa2a19'), ];    
                                //     // }
                                // }
                                if (targets.length){    
                                    creep.say('Container');
                                } else {
                                    creep.say('nothing');
                                }
                            } else {
                                creep.say('Tombstone');
                            }
                            if (targets.length){
                                
                                
                                dropFinded = true;
                                let target = creep.pos.findClosestByPath(targets);
                                if (target && target.store){
                                    // let res = creep.withdraw(target, RESOURCE_ENERGY);
                                    // if (res != OK) {
                                        for(const resourceType in target.store) {
                                            var res2 = creep.withdraw(target, resourceType);
                                        }
                                    // }
                                    //creep.say(res2);
                                    if (res2 != OK) {//ERR_NOT_IN_RANGE) {
                                        res = creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                                        helpers.deAttachToSource(creep);
                                        helpers.attachToSource(creep, target.id);
                                    } 
                                }
                                
                            }
                            
                            
                            
                        }
                        
                        
                        
                        
                        if (!dropFinded && range <= 2){
                            // creep.say('waiting');
                            // helpers.deAttachToSource(creep);  
                            
                            let farTargets = helpers.getFarTargets(creep);
                            if (farTargets && farTargets.length < 33) {
                                if (creep.store.getFreeCapacity()>=100 && creep.ticksToLive > 120) {
                                    let waitTargets = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                                        filter: (i) => (i.structureType == STRUCTURE_CONTAINER)
                                    });
                                    if (waitTargets.length) {
                                        creep.say('w');
                                        if (Game.shard.name == 'shard2' && creep.room.name == 'E58N23' && creep.pos.isEqualTo(20,35)){
                                            creep.move(LEFT);
                                        }
                                        if (Game.shard.name == 'shard2' && creep.room.name == 'E59N25' && creep.pos.isEqualTo(22,25)){
                                            creep.move(LEFT);
                                        }
                                        if (Game.shard.name == 'shard2' && creep.room.name == 'E44N28' && creep.pos.isEqualTo(41,31)){
                                            creep.move(RIGHT);
                                        }
                                        if (Game.shard.name == 'shard2' && creep.room.name == 'E41N24' && creep.pos.isEqualTo(15,11)){
                                            creep.move(BOTTOM);
                                        }
                                        if (Game.shard.name == 'shard2' && creep.room.name == 'E48N36' && (creep.pos.isEqualTo(21,29) || creep.pos.isEqualTo(22,29))){
                                            creep.move(RIGHT);
                                        }
                                        if (Game.shard.name == 'shard2' && creep.room.name == 'E46N36' && (creep.pos.isEqualTo(37,12) || creep.pos.isEqualTo(36,12))){
                                            creep.move(LEFT);
                                        }
                                        if (Game.shard.name == 'shard2' && creep.room.name == 'E46N36' && creep.pos.isEqualTo(38,33)){
                                            creep.move(BOTTOM);
                                        }
                                        if (Game.shard.name == 'shard2' && creep.room.name == 'E46N35' && creep.pos.isEqualTo(44,6)){
                                            creep.move(RIGHT);
                                        }
                                        if (Game.shard.name == 'shard2' && creep.room.name == 'E42N27' && creep.pos.isEqualTo(42,7)){
                                            creep.move(TOP_LEFT);
                                        }
                                        if (Game.shard.name == 'shard2' && creep.room.name == 'E48N22' && creep.pos.isEqualTo(40,33)){
                                            creep.move(TOP);
                                        }
                                        creep.memory.sleep = Game.time + 5;
                                        
                                    } else {
                                        creep.say('now3');
                                        helpers.deAttachToSource(creep);        
                                    }
                                } else {
                                    creep.say('now1');
                                    helpers.deAttachToSource(creep);        
                                }
                            } else {
                                creep.say('now2');
                                helpers.deAttachToSource(creep);    
                            }
                            //creep.moveTo(new RoomPosition(25, 25, creep.memory.room));
                        } else if (creep.memory.sector == 3 && (creep.pos.x == 11 || creep.pos.x == 10) && creep.pos.y == 17 && creep.room.name == 'E84N54'){
                            creep.move(LEFT);
                        } else if ((creep.pos.x == 12 || creep.pos.x == 12) && creep.pos.y == 44 && creep.room.name == 'E84N54'){
                            creep.move(LEFT);
                        }
                    }
                    if (!dropFinded && range > 2) {
                        if (source.id == '5873be6b11e3e4361b4dad9a'){
                            res = creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, ignoreCreeps: true});
                        } else if (source.id == '5873be0011e3e4361b4da222' && range < 20){
                            res = creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}, ignoreCreeps: true});
                        } else {
                            //res = creep.moveTo(source, {reusePath: 15, visualizePathStyle: {stroke: '#ff00ff'}});    
                            res = helpers.smartMove(creep, source, 1, 1);
                            helpers.createMoveOrder(creep, source, {range: 2}); //searchRange});
                        }
                        //console.log(creep.name, range);
                        
                    }
                    
                    
                    if (res != 0 || source == null) {
                        //find flag
                        var flag = _.findWhere(helpers.getFarTargets(creep), {id: creep.memory.targetId});
                        if (flag){
                            helpers.smartMove(creep, Game.flags[flag.flag]);
                            //console.log('Moving to flag',flag,  creep.name,  res, result);
                            creep.say('Flag');
                        } else {
                            creep.say('NoFlag'+res);
                            //helpers.deAttachToSource(creep);
                        }
                    }
                }
            }
        }
        else {
            //creep.say('else');
            helpers.deAttachToSource(creep);
            
            if (creep.room.name == creep.memory.room || !(creep.getActiveBodyparts(WORK) && creep.store[RESOURCE_ENERGY] && helpers.buildClosestStructure(creep))){
                
                helpers.transferEnergyToStorage(creep)
            }
            
            // if (creep.room.controller && creep.room.controller.my){
            //     //console.log(creep.name, creep.room.name);
            //     helpers.transferEnergyToStorage(creep);
            // } else 
            // if (creep.memory.sector == 3){
            //     if (!helpers.transferEnergyToStorage(creep)){
            //         //creep.drop(RESOURCES_ALL);
            //         if( creep.room.name == 'E83N54'){
            //           creep.drop(RESOURCE_ENERGY);  
            //           console.log(creep.name, 'drop');
            //         }
            //     }
            // } else if (creep.memory.sector == 4){
            //     if (!helpers.buildClosestStructure(creep)){
            //         //console.log(creep.name, creep.memory.role);
            //         helpers.transferEnergyToStorage(creep)
            //     }
            // } else if (creep.memory.sector == 5){
            //     if (!helpers.buildClosestStructure(creep)){
            //         //console.log(creep.name, creep.memory.role);
            //         helpers.transferEnergyToStorage(creep)
            //     }
            // } else if (!helpers.buildClosestStructure(creep)){
            //     helpers.transferEnergyToStorage(creep)
            // }
        
            this.repairRoad(creep);
        }
	},
	repairRoad: function(creep) {
	    //repair road
        if (1 && (!creep.room.controller || !creep.room.controller.my) && Game.cpu.bucket>00 && creep.store[RESOURCE_ENERGY] && creep.getActiveBodyparts(WORK)){
            let minHpRoad = _.min(
                    creep.pos.findInRange(FIND_STRUCTURES, 3, {
                        filter: function(object) {
                            return object.structureType == STRUCTURE_ROAD && object.hits <= object.hitsMax*0.9;
                        }
                    }), 
                    obj => obj.hits
                );
            if (minHpRoad) {
                creep.repair(minHpRoad);
            }    
            
            
            // const startCpuRepair = Game.cpu.getUsed();
            // var roads = creep.pos.findInRange(FIND_STRUCTURES, 3, {
            //     filter: function(object) {
            //         return object.structureType == STRUCTURE_ROAD && object.hits <= object.hitsMax*0.9;
            //     }
            // });
            // const elapsedRepair2 = Game.cpu.getUsed() - startCpuRepair;
            // if (Game.cpu.bucket > 00){
            //     roads.sort(function (a,b){return a.hits-b.hits;});
            // }
            // const elapsedRepair3 = Game.cpu.getUsed() - startCpuRepair;
            // if (roads.length){
            //     let res = creep.repair(roads[0]);
            //     //console.log('Repair road', res, roads[0].hits, roads[0].hitsMax);
            //     const elapsedRepair = Game.cpu.getUsed() - startCpuRepair;
            //     //console.log (creep.name, 'repair road cost cpu', elapsedRepair2.toFixed(2), elapsedRepair3.toFixed(2), elapsedRepair.toFixed(2));
            // } else {
            //     const elapsedRepair = Game.cpu.getUsed() - startCpuRepair;
            //     //console.log (creep.name, 'find road cost cpu', elapsedRepair2.toFixed(2), elapsedRepair3.toFixed(2), elapsedRepair.toFixed(2));
            // }
            // var look = creep.pos.look();
            // look.forEach(function(lookObject) {
            //     if (lookObject.type == LOOK_STRUCTURES && lookObject.structure.hits<=lookObject.structure.hitsMax*0.8 ){
            //         var res = creep.repair(lookObject.structure);
            //         // console.log('Repair road', res, lookObject.structure.hits, lookObject.structure.hitsMax);
            //     }
            // });
        }
	},
};

module.exports = roleSuperTransporter;