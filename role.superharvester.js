var helpers = require('helpers');


//var farTargets = [{flag:'Flag3', sourceId: '5873be0011e3e4361b4da236'}];

//Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'superharvester'});

var roleSuperHarvester = {
    
    getBody: function (spawn){
        return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];//MOVE*17,WORK*17,CARRY*16
        if (!Game.spawns[spawn] || !Game.spawns[spawn].room) return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
        let cap = Game.spawns[spawn].room.energyCapacityAvailable;    
        //if(['E79N52', 'E81N58', 'E81N54', 'E87N56', 'E85N57'].indexOf(Game.spawns[spawn].room.name) !== -1) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*21,WORK*21,CARRY*8
        
        if (Game.spawns[spawn].room.name == 'E79N54') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];//MOVE*17,WORK*17,CARRY*16
        if (Game.spawns[spawn].room.name == 'E42N31') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];//MOVE*17,WORK*17,CARRY*16
        if (Game.spawns[spawn].room.name == 'E58N22') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];//MOVE*17,WORK*17,CARRY*16
        if (Game.spawns[spawn].room.name == 'E59N24') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];//MOVE*17,WORK*17,CARRY*16
        if (Game.spawns[spawn].room.name == 'E58N27') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];//MOVE*17,WORK*17,CARRY*16
        //gclupgrader if (Game.spawns[spawn].room.name == 'E83N54') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*9,WORK*36,CARRY*5
        //if (Game.spawns[spawn].room.name == 'E83N54') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*15,WORK*30,CARRY*5
        //if (Game.spawns[spawn].room.name == 'E81N54') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];//MOVE*17,WORK*17,CARRY*16
        //if (Game.spawns[spawn].room.name == 'E83N54' && cap >= 2000) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*16,WORK*8,CARRY*8
        
        if (['E77N55','E47N36','E55N27','E53N25','E55N23'].indexOf(Game.spawns[spawn].room.name) >= 0) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];//MOVE*17,WORK*17,CARRY*16
        return [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; //MOVE*11,WORK*6,CARRY*16
    },

    
    


    run: function(creep) {
        
 
var farTargets = [
   
    {flag:'Flag73', id: '5873be8311e3e4361b4db0d1', koef: 0}, 
    {flag:'Flag73', id: '5873be8311e3e4361b4db0d2', koef: 0}, 
    
    
    
];
    const WorkRoom = 'E42N28';

        if (creep.memory.farsector == 'E89N51'){
            
            farTargets = [
        {flag:'Flag110', id: '5873beb411e3e4361b4db565', koef: 0}, 

            ];
            
            //Memory.claimRoomTasks['E89N54']['E89N51'] = {x: 38 , y:27, reserved: 0, time: Game.time};
        }



        if (creep.memory.farsector == WorkRoom){
            
            farTargets = [
        {flag:'Flag23', id: '59f1a5d182100e1594f3f0e2', koef: 0}, 
        {flag:'Flag23', id: '59f1a5d182100e1594f3f0e4', koef: 0}, 
            ];
            
        // if (Game.shard.name == 'shard2') {
             //Memory.claimRoomTasks['E59N24']['E58N27'] = undefined;// {x: 30 , y:18, reserved: 0, time: Game.time};     
        // }
        
        }
        
        
        
        if (creep.memory.farsector == 'E81N55'){
            
            farTargets = [
                {flag:'Flag90', id: '5873bdeb11e3e4361b4d9feb', koef: 0}, 
                {flag:'Flag90', id: '5873bdeb11e3e4361b4d9fea', koef: 0}, 
            ];
            
            //Memory.claimRoomTasks['E81N54']['E81N55'] = {x: 35 , y:28, reserved: 0, time: Game.time};
        }
        
        if (creep.memory.farsector == 'E42N31'){
            
            farTargets = [
                {flag:'inter', id: '5bbcaf6d9099fc012e63a977', koef: 0}, 
                {flag:'inter', id: '5bbcaf6d9099fc012e63a976', koef: 0}, 
            ];
            
        }

        if (creep.memory.farsector == 'E58N22'){
            
            farTargets = [
                {flag:'inter_tos2_2', id: '59f1a6ea82100e1594f40ca8', koef: 0}, 
                //{flag:'inter_tos2_2', id: '59f1a6ea82100e1594f40ca9', koef: 0}, 
            ];
            
        }

        
        if (creep.memory.farsector == 'E46N31'){
            
            farTargets = [
            {flag:'Flag7', id: '5bbcafbb9099fc012e63b130', koef: 0}, 
            //{flag:'Flag7', id: '5bbcafbb9099fc012e63b131', koef: 0}, 
            ];
        }
        if (creep.memory.farsector == 'E46N31_'){
            
            farTargets = [
            //{flag:'Flag7', id: '5bbcafbb9099fc012e63b130', koef: 0}, 
            {flag:'Flag7', id: '5bbcafbb9099fc012e63b131', koef: 0}, 
            ];
        }
        //Memory.claimRoomTasks['E42N31']['E46N31'] = {x: 11 , y:6, reserved: 0, time: Game.time};

        if (Game.shard.name == 'shard2') {
            if (creep.memory.sector == 23){
                farTargets = [
                {flag:'Flag28', id: '59f1c268a5165f24b259ad14', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 42){
                farTargets = [
                {flag:'Flag48', id: '59f1c268a5165f24b259accc', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 51){
                farTargets = [
                {flag:'Flag59', id: '59f1c268a5165f24b259ac7e', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 84){
                farTargets = [
                {flag:'Flag42', id: '59f1c268a5165f24b259acce', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 109){
                farTargets = [
                {flag:'Flag109', id: '59f1c268a5165f24b259ad60', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 110){
                farTargets = [
                {flag:'Flag110', id: '59f1c268a5165f24b259ad5e', koef: 0}, //mineral
                ];
            }
        }


        if (Game.shard.name == 'shard0') {
            if (creep.memory.sector == undefined && (creep.room.name == 'E83N54' || creep.room.name == 'E83N55')){
                farTargets = [
                {flag:'Flag18', id: '5e58b55ec1918e2c0c933224', koef: 0}, 
                ];
            }
            
            
            if (creep.memory.sector == 3){
                farTargets = [
                //{flag:'Flag19', id: '5873c198ade6694c56c57d48', koef: 0}, //mineral
                {flag:'Flag78', id: '5873c199ade6694c56c57db2', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 14){
                farTargets = [
                {flag:'Flag19', id: '5873c198ade6694c56c57d48', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 17){
                farTargets = [
                {flag:'Flag25', id: '5873c199ade6694c56c57db2', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 24){
                farTargets = [
                {flag:'Flag55', id: '5873c199ade6694c56c57db4', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 26){
                farTargets = [
                {flag:'Flag60', id: '5873c199ade6694c56c57e1c', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 27){
                farTargets = [
                {flag:'Flag95', id: '5873c199ade6694c56c57db0', koef: 0}, //sk E85N56
                ];
            }
            if (creep.memory.sector == 28){
                farTargets = [
                {flag:'Flag96', id: '5873c199ade6694c56c57e1e', koef: 0}, //sk E86N55
                ];
            }
            if (creep.memory.sector == 42){
                farTargets = [
                {flag:'Flag108', id: '5836bb2341230b6b7a5b9b97', koef: 0}, //sk E76N55
                ];
            }
            
            if (creep.memory.sector == 7){
                
                farTargets = [
                {flag:'FlagS7', id: '5df3522f1c5cf82a9b1e86c4', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 15){
                
                farTargets = [
                {flag:'FlagS15', id: '5dfbca9ce98b514b5712395e', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 4){
                
                farTargets = [
                {flag:'FlagS4', id: '5def59feedb7674aabd1be9a', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 22){
                
                farTargets = [
                // {flag:'FlagS22', id: '5de348f84fd6e36d61e2c896', koef: 0}, //mineral
                {flag:'FlagS22_2', id: '5de63b99cdcb684b7542ff1d', koef: 0}, //mineral
                ];
            }
            if (creep.memory.sector == 32){
                
                farTargets = [
                 {flag:'FlagS32', id: '5dfbca9ce98b514b5712395e', koef: 0}, //mineral
                ];
            }
        }

        var SKRooms = ['E84N54','E85N55','E85N54','E86N56','E85N56','E86N55','E76N55','E55N26','E54N26','E56N26','E46N36','E46N35','E54N25','E56N25','E56N24'];
        
        var total = _.sum(creep.carry);
        if ([3,7,14,15,4,22,23,24,26,27,28,42,51,54,84].indexOf(creep.memory.sector) !== -1 || creep.memory.sector){
            creep.say(creep.ticksToLive);
            if (total && creep.memory.targetId != undefined && creep.ticksToLive<250){
                helpers.deAttachToSource(creep);
            }
            if (!total && creep.ticksToLive<550){
                creep.memory.role = undefined;
            }
        }
        
        
        if (creep.room.name == 'E83N55' && creep.pos.isEqualTo(27, 21) && creep.ticksToLive < 1500) {
            const spawn = Game.getObjectById('5e58e39b93b362117e781b71');
            if (spawn && !spawn.spawning && !spawn.memory.renew){
                spawn.renewCreep(creep);
            }
        }
        if (creep.room.name == 'E83N55' && creep.pos.isNearTo(Game.getObjectById('5e58b55ec1918e2c0c933224'))) {
            creep.memory.role = 'gclUpgrader';
            creep.memory.room = 'E83N55';
        }
        
        
        if (creep.room.name == 'E83N55' && creep.memory.targetId) {
            creep.memory.targetId = undefined;
        }
        if (creep.room.name == 'E55N27' && creep.memory.targetId == '59f1a6b382100e1594f406c8') {
            creep.memory.targetId = undefined;
            creep.say('reset');
        }
        
        
        
        let harvestPower = HARVEST_POWER;
        if (!creep.store[RESOURCE_ENERGY] && creep.store.getUsedCapacity()) {
            harvestPower = HARVEST_MINERAL_POWER;    
        }

	    if((creep.store.getFreeCapacity() > creep.getActiveBodyparts(WORK)*harvestPower && total >0 && creep.memory.targetId != undefined) || ( total == 0)
	    || (creep.room.name == 'E83N55' && creep.store[RESOURCE_ENERGY] < 2 * creep.getActiveBodyparts(WORK))
	    ) {
            if (creep.memory.targetId == undefined) {
                if (SKRooms.indexOf(creep.room.name) >= 0 && creep.ticksToLive <= 600){
                    helpers.recycleCreep(creep);
                } else if (creep.memory.targetId == undefined) {
                    let dropped = Game.getObjectById('5ec3710f1c717753c4774611');
                    //if (!dropped) dropped = Game.getObjectById('5e9db37fe757b72484db95ab');
                    // if (!dropped) dropped = Game.getObjectById('5e9db1a5658680270f0e158d');
                    let storage77 = Game.getObjectById('5ebe5897cea826461d533ac8_');
                    
                    if (creep.room.name == WorkRoom && dropped) {
                        helpers.smartMove(creep, dropped);
                        if (creep.pos.isNearTo(dropped)){
                            creep.pickup(dropped);
                        }
                    } else {
                        let targets = creep.room.find(FIND_TOMBSTONES, {
                            filter: (i) => i.store[RESOURCE_ENERGY] > 10
                        });
                        if (0 && creep.room.name == WorkRoom && targets.length){
                            helpers.attachToSource(creep, targets[0].id);
                        } else if (creep.room.name == WorkRoom && creep.memory.farsector != 'E46N31_' && storage77 && storage77.store[RESOURCE_ENERGY]>=4000){
                            let storage = storage77;
                            helpers.smartMove(creep, storage);
                            if (creep.pos.isNearTo(storage.pos)){
                                creep.withdraw(storage, RESOURCE_ENERGY);
                            }
                            if (creep.room.name == WorkRoom) {
                                creep.upgradeController(creep.room.controller);
                            }
                            
                        } else {
                            let targets = creep.room.find(FIND_TOMBSTONES, {
                                filter: (i) => i.store[RESOURCE_ENERGY] > 100
                            });
                            if (creep.room.name == WorkRoom && targets.length){
                                helpers.attachToSource(creep, targets[0].id);
                            } else {
                                //find new target;
                                if (farTargets.length == 1) {
                                    creep.memory.targetId = farTargets[0].id;     
                                } else {
                                    var lenArr = [];
                                    farTargets = _.shuffle(farTargets);
                                    for (var i=0; i<farTargets.length; i++){
                                        var harvNum = helpers.getAttachedToSource(creep, farTargets[i].id);
                                        if (farTargets[i].id == '59f1a6b482100e1594f406e9' && harvNum) {
                                            harvNum = 100000;
                                        }
                                        lenArr.push({id: farTargets[i].id,  harvNum: harvNum+farTargets[i].koef});
                                        //console.log('far',farTargets[i].id, harvNum+farTargets[i].koef, harvNum );
                                    }
                                    lenArr.sort((a,b) => a.harvNum - b.harvNum);
                                    // for (var i=0;i<lenArr.length;i++) {
                                    //   console.log('farRes',lenArr[i].id, lenArr[i].harvNum);
                                    // }
                                    if (lenArr.length){
                                        var sourceArr = [];
                                        lenArr.forEach((a) => {if (a.harvNum == lenArr[0].harvNum){sourceArr.push(Game.getObjectById(a.id));}});
                                        for (var i=0;i<sourceArr.length;i++) {
                                            console.log('sourceArr',sourceArr[i]);
                                        }
                
                                        var source = creep.pos.findClosestByRange(sourceArr);
                                        if (source){
                                            helpers.attachToSource(creep, source.id);    
                                        } else {
                                            console.log('error');
                                            helpers.attachToSource(creep, lenArr[0].id);
                                        }
                                        
                                        //helpers.attachToSource(creep, lenArr[0].id);
                                        console.log(creep.name, 'attached to ', creep.memory.targetId);
                                    }   
                                }
                            }
                            
                             
                        }
                    }
                }
            }
	        if (creep.memory.targetId != undefined) {
                var source = Game.getObjectById(creep.memory.targetId);
                
                if (source && source.lastCooldown && source.lastCooldown>30 && creep.ticksToLive < 300) {
                    helpers.deAttachToSource(creep);
                }
                
                var retreat = false;
                if (SKRooms.indexOf(creep.room.name) >= 0 && creep.memory.lair){
                    var lair = Game.getObjectById(creep.memory.lair);
                    if (lair && (lair.ticksToSpawn<11 || lair.ticksToSpawn>293 || !lair.ticksToSpawn)){
                         //find flag
                        var flag = _.findWhere(farTargets, {id: creep.memory.targetId});
                        if (flag){
                            //creep.drop(RESOURCE_ENERGY);
                            if (!Game.flags[flag.flag]) {
                                creep.pos.createFlag(flag.flag);
                            } else {
                                creep.moveTo(Game.flags[flag.flag].pos, {visualizePathStyle: {stroke: '#ffaa00'}});    
                            }
                            
                            
                            retreat = true;
                            //console.log('Moving to flag',flag,  creep.name,  res, result);
                        }
                    }
                }
            
                if (!retreat){
                    if (source && source.structureType == STRUCTURE_SPAWN){
                        console.log(creep.name);
                        let result = source.renewCreep(creep);
                        creep.transfer(source, RESOURCE_ENERGY);
                        if (result == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                        } 
                        if (result == ERR_FULL || result == ERR_NOT_ENOUGH_ENERGY || source.store[RESOURCE_ENERGY]<52){
                            helpers.deAttachToSource(creep);
                            source.memory.skip = undefined;
                            console.log(creep.name, 'back from renew');
                        }
                        if (creep.pos.isEqualTo(new RoomPosition(13,36, 'E42N28'))){
                            creep.move(BOTTOM);
                        }
                        if (creep.pos.isEqualTo(new RoomPosition(14,35, 'E42N28'))){
                            creep.move(RIGHT);
                        }
                        
                    } else if (source && source.store && source.store[RESOURCE_ENERGY]){
                        helpers.smartMove(creep, source);
                        if (creep.pos.isNearTo(source)) {
                            creep.withdraw(source, RESOURCE_ENERGY);
                            helpers.deAttachToSource(creep);
                        }
                    } else if (source && source.store && !source.store[RESOURCE_ENERGY]){
                        helpers.deAttachToSource(creep);
                    } else if (!source){
                        helpers.deAttachToSource(creep);
                    } else {
                        
                        
                        var result = creep.harvest(source);
                        //creep.say(result);
                        if (result == ERR_INVALID_TARGET) {
                           // creep.say(result);    
                            
                            helpers.smartMove(creep, Game.flags[farTargets[0].flag], 1, 1);
                        }
                        
                        if (source && source.id == '5873be8311e3e4361b4db0d2' && creep.pos.isEqualTo(new RoomPosition(26,24, 'E87N58'))){
                            creep.say('bottom');
                            creep.move(BOTTOM);return;
                        }
                        if (creep.pos.isEqualTo(new RoomPosition(16,3, 'E55N26'))){
                            creep.move(BOTTOM);
                        }
                        if (creep.pos.isEqualTo(new RoomPosition(17,4, 'E55N26'))){
                            creep.move(LEFT);
                        }
                        
                        
                        if (result == OK && SKRooms.indexOf(creep.room.name) >= 0 && creep.memory.lair == undefined){
                            var lairs = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 6, {
                                filter: (structure) => {return structure.structureType == STRUCTURE_KEEPER_LAIR;}   
                            });
                            if (lairs.length){
                                creep.memory.lair = lairs[0].id;
                            }
                        }
                        
                        let linkHarv = Game.getObjectById('5e0b959f625f3a3db9b56707')
                        if (creep.room.name == 'E77N54' && result == OK  && linkHarv && creep.pos.isNearTo(linkHarv.pos) && creep.ticksToLive > 600){
                            creep.room.memory.storageLink = '5e0b1944e4b7830e55a23330';
                            creep.transfer(linkHarv, RESOURCE_ENERGY);
                        }
                        
                        if (result == ERR_NOT_ENOUGH_RESOURCES && creep.carry[RESOURCE_ENERGY]) {
                            helpers.deAttachToSource(creep);
                        } else if (result == ERR_NOT_ENOUGH_RESOURCES ) {
                            let res = helpers.smartMove(creep, source, 1, 2);
                            // creep.say(res);
                            // creep.moveTo(source);
                            //helpers.deAttachToSource(creep);
                        }
                        var res;
                        if (source && source.id == '5873be1d11e3e4361b4da46f'){
                            if (!Game.time%10){
                                res = creep.moveTo(source, {ignoreCreeps: Game.time%10, reusePath: false, visualizePathStyle: {stroke: '#00ff00'}});    
                            } else {
                                res = creep.moveTo(source, {ignoreCreeps: Game.time%10, visualizePathStyle: {stroke: '#ff0000'}});        
                            }
                            
                        } else if (result == ERR_NOT_IN_RANGE) {
                            //res = creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});  
                            res = helpers.smartMove(creep, source, 1, 1);
                        }
                        
                        //console.log('Moving to far room(2)', creep.name,  res, result);
                        if (res == ERR_INVALID_TARGET) {
                            //find flag
                            var flag = _.findWhere(farTargets, {id: creep.memory.targetId});
                            if (flag){
                                flag = flag.flag;
                                var target = Game.flags[flag].pos;
                                //creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                                helpers.smartMove(creep, target);
                                //console.log('Moving to flag',flag,  creep.name,  res, result);
                            }
                        }
                        // if (creep.carry.energy>0){
                        //     creep.drop(RESOURCE_ENERGY);
                        // }
                        
                    }
                }
                
            }
        }
        else {
            if (creep.memory.room == 'E42N31' && creep.ticksToLive < 250) {
                creep.memory.soonDie = 1;
            }
            
            helpers.deAttachToSource(creep);
            if (0 && creep.memory.sector == 3 && !helpers.buildClosestStructure(creep) && creep.room.name != "E83N54" ) {
                creep.moveTo(Game.flags['Flag14'].pos, {visualizePathStyle: {stroke: '#ffaa00'}});
                helpers.smartMove(creep, Game.flags['Flag14'].pos);
                console.log(creep.name, 'moving to flag14');
            } else if ( (creep.memory.farsector == 'E46N31' || creep.memory.farsector == 'E46N31_')  && creep.room.name != "E46N31" ) {
                creep.say('123123123');
                //creep.moveTo(Game.flags['Flag73'].pos, {visualizePathStyle: {stroke: '#ffaa00'}});
                //helpers.smartMove(creep, Game.flags['Flag7'].pos, 0);
                //console.log(creep.name, 'moving to flag62');
            } else if ( creep.memory.sector == undefined && creep.room.name != "E87N58" && creep.memory.farsector == undefined /*&& !helpers.buildClosestStructure(creep) */ ) {
                //creep.moveTo(Game.flags['Flag73'].pos, {visualizePathStyle: {stroke: '#ffaa00'}});
                helpers.smartMove(creep, Game.flags['Flag73'].pos, 0);
                //console.log(creep.name, 'moving to flag62');
            } else {
                //find spawn
                var spawns = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN;}// && !structure.spawning && structure.energy>200;}
                });
                if (1 && creep.memory.sector == undefined && creep.ticksToLive<600 && spawns.length && spawns[0].store[RESOURCE_ENERGY] > 10 && !helpers.getAttachedToSource(creep, spawns[0].id) ){
                    creep.say('111'+spawns.length);
                    helpers.attachToSource(creep, spawns[0].id);
                    spawns[0].memory.skip = 1;
                    creep.drop(RESOURCE_ENERGY, 1);
                    creep.say('renew');
                } else {
                    //console.log(creep.name, 0);
                    if (['E83N55', 'E55N21', 'E59N24','E55N27_'].indexOf(creep.room.name) >= 0  || !helpers.transferEnergyToClosestStructure(creep)){
                        //console.log(creep.name, 1);
                    if (creep.memory.farsector == 'E42N28_' || !helpers.buildClosestStructure(creep)){
                        //console.log(creep.name, 2);
                        if (creep.room.name == 'E87N58' && creep.room.controller.ticksToDowngrade < 198000){
                            helpers.upgradeController(creep);
                        } else if (creep.room.name == 'E87N58' && creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] < 50000 && creep.room.terminal.store.getFreeCapacity()>2000){
                            creep.moveTo(creep.room.terminal);
                            creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                        } else if (['E87N58_', 'E77N55_' , 'E81N55_', 'E42N31_','E46N31','E83N55', 'E89N51', 'E58N22_', 'E55N21', 'E59N24','E58N27','E55N27_','E42N28'].indexOf(creep.room.name) >= 0  
                        || !helpers.transferEnergyToStorage(creep)
                            // || !creep.room.storage || creep.room.storage.store[RESOURCE_ENERGY] >= 4000
                            // || (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] < 4000 && !helpers.transferEnergyToStorage(creep))
                            ){
                            //creep.say('upgrade');
                            //console.log(creep.name, 3);
                            helpers.upgradeController(creep);
                            if (creep.memory.farsector == 'E46N31_') {
                                //creep.say ('dddd');
                                creep.cancelOrder('move');
                                creep.moveTo(Game.flags['Flag7']);
                            }

                        }
                    }
                    }
                }
            }


            //repair road
            if (creep.carry.energy>20){
                var look = creep.pos.look();
                look.forEach(function(lookObject) {
                    if (lookObject.type == LOOK_STRUCTURES && lookObject.structure.hits<lookObject.structure.hitsMax && lookObject.structure.hits<4000){
                        var res = creep.repair(lookObject.structure);
                        creep.say('repair');
                        // console.log('Repair road', res, lookObject.structure.hits, lookObject.structure.hitsMax);
                    }
                });
            }
        }
	}
};

module.exports = roleSuperHarvester;