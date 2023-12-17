var helpers = require('helpers');

var roleUpgrader = {
    getBody: function (spawn) {
        if (!Game.spawns[spawn] || !Game.spawns[spawn].room) return [MOVE, WORK, CARRY];
        var cap = Game.spawns[spawn].room.energyCapacityAvailable;
        
        if (Game.spawns[spawn].room.controller.level == 8 && Game.spawns[spawn].room.storage && (Game.spawns[spawn].room.storage.store[RESOURCE_ENERGY] < 50000)) {
            Game.notify('Extra small energy in storage (lt 50k) in room ' + Game.spawns[spawn].room.name+' at tick '+Game.time);
        }

        if (Game.spawns[spawn].room.controller.level == 8 && Game.spawns[spawn].room.storage && (Game.spawns[spawn].room.storage.store[RESOURCE_ENERGY] < 100000 /*|| Game.spawns[spawn].room.storage.store.getFreeCapacity > 100000*/)) {
            // return [MOVE,WORK,CARRY];    
            Game.notify('Too small energy in storage (lt 100k) in room ' + Game.spawns[spawn].room.name+' at tick '+Game.time);
            if (!Memory.roomNeedEnergy) {
                Memory.roomNeedEnergy = {};
            }
            Memory.roomNeedEnergy[Game.spawns[spawn].room.name] = 1;
        } else if (Game.spawns[spawn].room.controller.level == 8 && Game.spawns[spawn].room.storage && (Game.spawns[spawn].room.storage.store[RESOURCE_ENERGY] < 175000 /*|| Game.spawns[spawn].room.storage.store.getFreeCapacity > 100000*/)) {
            // return [MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; // MOVE*3,WORK*10,CARRY*2
            //Game.notify('Too small energy in storage (lt 175k) in room ' + Game.spawns[spawn].room.name);
        }
        if (Game.spawns[spawn].room.controller.level == 8) {
            return [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY];// MOVE*4,WORK*15,CARRY*2
        }
        
        if (Game.spawns[spawn].room.controller.level == 8 && cap >= 1800) return [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY];// MOVE*4,WORK*15,CARRY*2
        if (cap >= 4400) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*10,WORK*38,CARRY*2
        if (cap >= 2600) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY];//MOVE*6,WORK*22,CARRY*2
        if (cap >= 2300) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; //MOVE*6,WORK*19,CARRY*2
        if (cap >= 1800) return [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY];// MOVE*4,WORK*15,CARRY*2
        if (cap >= 1250) return [MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]; // MOVE*3,WORK*10,CARRY*2
        //if (cap >= 300) return [MOVE,MOVE,WORK,CARRY,CARRY];
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        
        //if (creep.ticksToLive < 50) console.log('upgrader ticksToLive ', creep.ticksToLive, helpers.getRoomLink(creep.room.name));
        // creep.memory.unBoost = {pos:labContainerCoord, labId: freeLabs[0].id};
        if (creep.memory.unBoost && !creep.store.getUsedCapacity()) {
            let pos = new RoomPosition(creep.memory.unBoost.pos.x, creep.memory.unBoost.pos.y, creep.memory.unBoost.pos.roomName);
            if (creep.pos.isEqualTo(pos)){
                let lab = Game.getObjectById(creep.memory.unBoost.labId);
                //if (!lab || lab.cooldown || lab.unboostCreep(creep) == OK)
                
                if (lab) {
                    if (!lab.cooldown) {
                        lab.unboostCreep(creep)    
                    } else if (lab.cooldown < creep.ticksToLive) {
                        creep.say('w'+lab.cooldown,1);
                        return;
                    } else {
                        Game.notify('lab unboost error in room '+creep.room.name+' tick '+Game.time);
                    }
                }
                creep.memory.unBoost = 0;
                creep.memory.role = undefined;
            } else {
                helpers.smartMove(creep, pos, 0, 0);
            }
            return;
        }
        if (creep.ticksToLive < creep.body.length*3+50 && !creep.memory.soonDie) {
            creep.memory.soonDie = 1;
        }
        
        // if (creep.id == '5e5133741db3d77178f70b53' && creep.store[RESOURCE_ENERGY]) {
        //     //creep.upgradeController(creep.room.controller);
        //     return;
        // }
        
        // if (creep.getActiveBodyparts(WORK) == 1){
        //     creep.memory.role = undefined;
        // }
        let storage = creep.room.storage;
        let minInStorage = 5000;
        if (creep.room.name == 'E77N55') {
            storage = Game.getObjectById('5e1facee6207c4c47aa80e90');
            minInStorage = 0;
        }
        // if (creep.room.name == 'E55N37') {
        //     storage = Game.getObjectById('61066c246ebaa408378902e1');
        //     minInStorage = 0;
        // }
        
        if (creep.room.memory.remoteLinkUpgrade || (creep.memory.role == 'upgrader2' && creep.room.memory.remoteLinkUpgrade2)) {
            if (creep.memory.remoteLinkId == undefined) {
                let storageContainer = creep.room.controller.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_LINK
                                       //&& i.id != '6072186026dc9c29912ec581'
                    });
                if (!storageContainer) {
                    storageContainer = creep.room.controller.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (i) => i.structureType == STRUCTURE_CONTAINER
                                         // && i.id != '6072186026dc9c29912ec581'
                        });
                }    
                if (storageContainer && creep.room.controller.pos.inRangeTo(storageContainer, 5)) {
                    creep.memory.remoteLinkId = storageContainer.id;
                    if (storageContainer.structureType == STRUCTURE_LINK) {
                        creep.room.memory.remoteLinkUpgradeId = storageContainer.id;
                    }
                } else {
                    creep.memory.remoteLinkId = 0
                }
            }
            if (creep.memory.remoteLinkId) {
                storage = Game.getObjectById(creep.memory.remoteLinkId);
                minInStorage = 0;
                if (!storage) {
                    creep.memory.remoteLinkId = undefined;
                } else {
                    //creep.say('link');
                }
            }
        }
        

        if (creep.memory.room != creep.room.name){
            var pos = new RoomPosition(10, 25, creep.memory.room);
            creep.moveTo(pos, {reusePath: 15, visualizePathStyle: {stroke: '#ffaa00'}});
        }
        else if (creep.carry.energy == 0){
            var target = storage;
            if (target && target.store[RESOURCE_ENERGY]>minInStorage && creep.ticksToLive>6 && creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);    
            }
        } else {
            if (creep.room.name == 'E89N54' && creep.pos.x == 40 && creep.pos.y == 33 ){
                creep.move(TOP);
            }
            if (creep.room.name == 'E87N56' && creep.pos.x == 29 && creep.pos.y == 11 ){
                creep.move(RIGHT);
            }
            if (creep.room.name == 'E87N56' && creep.pos.x == 30 && creep.pos.y == 10 ){
                creep.move(BOTTOM_RIGHT);
            }
            if (creep.room.name == 'E87N56' && creep.pos.x == 30 && creep.pos.y == 11 ){
                     creep.move(RIGHT);
            }
            if (creep.room.name == 'E81N53' && creep.pos.x == 30 && creep.pos.y == 14 ){
                creep.move(BOTTOM);
            }
            if (creep.room.name == 'E85N57' && creep.pos.isEqualTo(38, 13) ){
                creep.move(RIGHT);
                return;
            }
            if (creep.room.name == 'E85N57' && creep.pos.isEqualTo(40, 13) ){
                creep.move(BOTTOM);
                return;
            }
            if (creep.room.name == 'E85N57' && creep.pos.isEqualTo(39, 15) ){
                creep.move(LEFT);
                return;
            }
            if (creep.room.name == 'E79N52' && creep.pos.isEqualTo(32, 43) ){
                creep.move(RIGHT);
                return;
            }
            if (creep.room.name == 'E79N52' && creep.pos.isEqualTo(32, 43) ){
                creep.move(RIGHT);
                return;
            }
            if (creep.room.name == 'E79N54' && creep.pos.isEqualTo(24, 31) ){
                creep.move(TOP);
                return;
            }
            
            if (creep.room.name == 'E42N31' && creep.pos.isEqualTo(19, 31) ){
                creep.move(TOP);
            }
            if (creep.room.name == 'E42N31' && creep.pos.isEqualTo(19, 32) ){
                creep.move(TOP);
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E58N22' && creep.pos.isEqualTo(27, 31) ){
                creep.move(BOTTOM);
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E55N21' && creep.pos.isEqualTo(28, 11) ){
                creep.move(LEFT);
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E59N24' && creep.pos.isEqualTo(37, 20) ){
                creep.move(LEFT);
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E59N24' && creep.pos.isEqualTo(38, 20) ){
                creep.move(LEFT);
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E59N24' && creep.pos.isEqualTo(35, 20) ){
                creep.move(RIGHT);
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E58N27' && creep.pos.isEqualTo(31, 21) ){
                    creep.move(LEFT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E58N27' && creep.pos.isEqualTo(32, 21) ){
                    creep.move(LEFT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E55N27' && creep.pos.isEqualTo(34, 41) ){
                creep.move(RIGHT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E55N27' && creep.pos.isEqualTo(36, 41) ){
                creep.move(LEFT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E42N28' && creep.pos.isEqualTo(9, 37) ){
                if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E57N29' && (creep.pos.isEqualTo(37, 37) || creep.pos.isEqualTo(38, 37))){
                creep.move(RIGHT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E55N31' && creep.pos.isEqualTo(16, 32) ){
                    creep.move(LEFT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E55N31' && creep.pos.isEqualTo(17, 32) ){
                    creep.move(LEFT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E47N39' && creep.pos.isEqualTo(41, 25) ){
                if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E44N38' && creep.pos.isEqualTo(8, 43) ){
                if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E49N37' && creep.pos.isEqualTo(39, 14) ){
                if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E41N39' && creep.pos.isEqualTo(27, 19) ){
                if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
            
            if (Game.shard.name == 'shard2' && creep.room.name == 'E52N29' && creep.pos.isEqualTo(11, 28) ){
                if (!(Game.time%2)) {
                    creep.move(RIGHT);    
                } else {
                    creep.move(LEFT);    
                }
            }
            if (Game.shard.name == 'shard0' && creep.room.name == 'E79N59' && creep.pos.isEqualTo(41, 28) ){
                if (!(Game.time%2)) {
                    creep.move(RIGHT);    
                } else {
                    creep.move(LEFT);    
                }
            }
            if (Game.shard.name == 'shard0' && creep.room.name == 'E79N59' && creep.pos.isEqualTo(39, 28) ){
                creep.move(RIGHT);
            }

            if (Game.shard.name == 'shard2' && creep.room.name == 'E49N22' && creep.pos.isEqualTo(14, 15) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E49N22' && creep.pos.isEqualTo(14, 14) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E52N32' && creep.pos.isEqualTo(16, 45) ){
                creep.move(TOP);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E47N36' && (creep.pos.isEqualTo(6, 27) || creep.pos.isEqualTo(7, 27)) ){
                    creep.move(LEFT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E41N23' && (creep.pos.isEqualTo(40, 20) || creep.pos.isEqualTo(41, 20)) ){
                    creep.move(LEFT);    
            }
            // if (Game.shard.name == 'shard2' && creep.room.name == 'E41N23' && creep.pos.isEqualTo(38, 20) ){
            //     creep.move(RIGHT);    
            // }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E46N31' && (creep.pos.isEqualTo(34, 21) || creep.pos.isEqualTo(34, 22)) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E45N29' && creep.pos.isEqualTo(22, 41) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard0' && creep.room.name == 'E87N58' && creep.pos.isEqualTo(24, 25) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E53N25' && creep.pos.isEqualTo(10, 10) ){
                creep.move(RIGHT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E53N25' && creep.pos.isEqualTo(11, 10) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E53N25' && creep.pos.isEqualTo(11, 11) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E55N23' && creep.pos.isEqualTo(17, 14) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E55N23' && creep.pos.isEqualTo(17, 16) ){
               if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E57N35' && (creep.pos.isEqualTo(29, 6) || creep.pos.isEqualTo(29, 5)) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E57N35' && (creep.pos.isEqualTo(29, 8)) ){
                creep.move(TOP);    
            }
            if (Game.shard.name == 'shard3' && creep.room.name == 'E45N28' && creep.pos.isEqualTo(41, 17) ){
               if (!(Game.time%2)) {
                    creep.move(RIGHT);    
                } else {
                    creep.move(LEFT);    
                }
            }
            if (Game.shard.name == 'shard3' && creep.room.name == 'E39N28' && creep.pos.isEqualTo(39,7) ){
                creep.move(LEFT);    
            }
            if (Game.shard.name == 'shard3' && creep.room.name == 'E39N28' && creep.pos.isEqualTo(37,6) ){
                creep.move(BOTTOM_RIGHT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E43N21' && creep.pos.isEqualTo(11,30) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E43N21' && creep.pos.isEqualTo(11,31) ){
                creep.move(RIGHT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E43N21' && creep.pos.isEqualTo(13,30) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard0' && creep.room.name == 'E59N46' && creep.pos.isEqualTo(8,22) ){
                creep.move(RIGHT);    
            }
            if (Game.shard.name == 'shard0' && creep.room.name == 'E59N46' && creep.pos.isEqualTo(9,22) ){ 
                creep.move(RIGHT);    
            }
            if (Game.shard.name == 'shard0' && creep.room.name == 'E59N46' && creep.pos.isEqualTo(11,22) ){
                creep.move(LEFT);    
            }
            if (Game.shard.name == 'shard0' && creep.room.name == 'E54N49' && creep.pos.isEqualTo(33,8) ){
                creep.move(TOP);    
            }
            if (Game.shard.name == 'shard0' && creep.room.name == 'E54N49' && creep.pos.isEqualTo(33,7) ){
                creep.move(TOP);    
            }
            if (Game.shard.name == 'shard0' && creep.room.name == 'E54N49' && creep.pos.isEqualTo(32,6) ){
                creep.move(RIGHT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E43N25' && creep.pos.isEqualTo(23,40) ){
                 if (!(Game.time%2)) {
                    creep.move(RIGHT);    
                } else {
                    creep.move(LEFT);    
                }
            }
            if (Game.shard.name == 'shard0' && creep.room.name == 'E52N41' && creep.pos.isEqualTo(19,27) ){
                 if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
            if (Game.shard.name == 'shard1' && creep.room.name == 'E41N38' && (creep.pos.isEqualTo(17,15) || creep.pos.isEqualTo(17,14)) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E45N22' && creep.pos.isEqualTo(8,44) ){
                creep.move(TOP);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E45N22' && creep.pos.isEqualTo(8,42) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E41N19' && creep.pos.isEqualTo(9,42) ){
                 if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E41N19' && creep.pos.isEqualTo(9,40) ){
                creep.move(BOTTOM);    
            }
             if (Game.shard.name == 'shard2' && creep.room.name == 'E45N11' && creep.pos.isEqualTo(34,9) ){
                 if (!(Game.time%2)) {
                    creep.move(RIGHT);    
                } else {
                    creep.move(LEFT);    
                }
            }
             if (Game.shard.name == 'shard2' && creep.room.name == 'E57N25' && (creep.pos.isEqualTo(18,15) || creep.pos.isEqualTo(19,15) )){
                    creep.move(RIGHT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E36N9' && creep.pos.isEqualTo(14,38) ){
                 if (!(Game.time%2)) {
                    creep.move(RIGHT);    
                } else {
                    creep.move(LEFT);    
                }
            }
             if (Game.shard.name == 'shard2' && creep.room.name == 'E41N5' && (creep.pos.isEqualTo(12,36) || creep.pos.isEqualTo(12,35) )){
                    creep.move(TOP);    
            }
             if (Game.shard.name == 'shard2' && creep.room.name == 'E41N5' && (creep.pos.isEqualTo(13,36) )){
                    creep.move(LEFT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E38N19' && creep.pos.isEqualTo(27,18) ){
                creep.move(LEFT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E59N41' && creep.pos.isEqualTo(28,38) ){
                    creep.move(RIGHT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E59N41' && creep.pos.isEqualTo(27,38) ){
                    creep.move(RIGHT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E46N19' && creep.pos.isEqualTo(41,13) ){
                    creep.move(TOP);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E46N19' && creep.pos.isEqualTo(41,12) ){
                    creep.move(TOP);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E57N47' && creep.pos.isEqualTo(13,28) ){
                 if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E57N44' && creep.pos.isEqualTo(20,9) ){
                 if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E47S1' && creep.pos.isEqualTo(33,39) ){
                 if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E47S1' && creep.pos.isEqualTo(33,41) ){
                creep.move(TOP);
            }
             if (Game.shard.name == 'shard2' && creep.room.name == 'E44S8' && creep.pos.isEqualTo(22,11) ){
                 if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
             if (Game.shard.name == 'shard2' && creep.room.name == 'E47S4' && (creep.pos.isEqualTo(26,18) || creep.pos.isEqualTo(27,18)) ){
                    creep.move(LEFT);    
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E33N9' && (creep.pos.isEqualTo(41,18) || creep.pos.isEqualTo(41,17)) ){
                    creep.move(TOP);    
            }
             if (Game.shard.name == 'shard2' && creep.room.name == 'E59N53' && creep.pos.isEqualTo(35,39) ){
                 if (!(Game.time%2)) {
                    creep.move(TOP);    
                } else {
                    creep.move(BOTTOM);    
                }
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E59N53' && creep.pos.isEqualTo(35,37) ){
                creep.move(BOTTOM);    
            }
            if (Game.shard.name == 'shard0' && creep.room.name == 'E71N56' && creep.pos.isEqualTo(41,34) ){
                creep.move(LEFT);    
            }

            if (1 || creep.room.name !== 'E83N55_' || !helpers.buildClosestStructure(creep)){ 
                helpers.upgradeController(creep);
                if (creep.ticksToLive>6 && creep.store[RESOURCE_ENERGY] < 2*creep.getActiveBodyparts(WORK) && storage && creep.pos.isNearTo(storage) && storage.store[RESOURCE_ENERGY]>minInStorage && !creep.memory.unBoost){
                    creep.withdraw(storage, RESOURCE_ENERGY)    
                }
                
            }
            
            if (creep.ticksToLive<40 && creep.memory.unBoost == undefined) {
                creep.memory.unBoost = 0;
                const creepBoosted = _.filter(creep.body, 'boost').length;
                const labContainerCoord = _.get(Memory, 'labs.rooms.'+creep.room.name+'.labContainerPos', 0);
                const labsIndexArray = _.get(Memory, 'labs.rooms.'+creep.room.name+'.labSet.in', []);
                if (creepBoosted && labContainerCoord && labsIndexArray.length) {
                    const labContainerPos = new RoomPosition(labContainerCoord.x, labContainerCoord.y, labContainerCoord.roomName);
                    const container = labContainerPos.lookFor(LOOK_STRUCTURES).find(s=>s.structureType ==  STRUCTURE_CONTAINER);
                    if (container && container.store.getFreeCapacity() < 400) {
                        checkLabContainer();    
                    }
                    //const containerPresent =  labContainerPos.lookFor(LOOK_STRUCTURES).some(s=>s.structureType ==  STRUCTURE_CONTAINER);
                    const containerPresent =  !!container;
                    const labs = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_LAB }});
                    let freeLabs = _.filter(labs, (lab,index) =>  labsIndexArray.includes(index) && !lab.cooldown && lab.pos.isNearTo(labContainerPos));
                    let zeroLab = 0;
                    if (labsIndexArray.includes(zeroLab)) zeroLab++;
                    if (labsIndexArray.includes(zeroLab)) zeroLab++;
                    if (!freeLabs.length && labs.length>zeroLab && !labs[zeroLab].cooldown && labs[zeroLab].pos.isNearTo(labContainerPos)) {
                        freeLabs = [labs[zeroLab]];
                    }
                    if (freeLabs.length && containerPresent) {
                        creep.memory.unBoost = {pos:labContainerCoord, labId: freeLabs[0].id};
                    }
                }
            }
            
        }
	}
};

module.exports = roleUpgrader;