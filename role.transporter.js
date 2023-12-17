var helpers = require('helpers');


 
var roleTransporter = {
    
    getBody: function (spawn) {
        if (!Game.spawns[spawn] || !Game.spawns[spawn].room) return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
        let cap = Game.spawns[spawn].room.energyCapacityAvailable;
        if (Game.shard.name == 'shard2') {
            //if (Game.spawns[spawn].room.name == "E58N27") return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
        }
        if (cap >= 1350) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // sum	1.350K MOVE*9,CARRY*18 carry	900.000
        if (cap >= 1200) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
        if (cap >= 1000) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*7,CARRY*13
        if (cap >= 600) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,];
        if (cap >= 450) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,];
        if (cap >= 300) return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
    },
    
    
    run: function(creep, factoryEndProduct = []) {
        if (helpers.sleep(creep)) return;   
         
        
        // if (creep.memory.sleep) {
        //     if (Game.time < creep.memory.sleep) {
        //         creep.say('zZ');
        //         return;
        //     } else {
        //         creep.memory.sleep = undefined;
        //     }
        // }
        
        if (creep.memory.role == 'dropper') {
            return this.dropperRun(creep);
        }

        
        if (creep.room.memory.defendRoomMode && !(Game.time%4)) {
           // creep.say('🛡️', 1);
        }

        if (!creep.room.storage || !creep.room.storage.my){
            if (creep.memory.storageId == undefined && creep.room.controller){
                creep.say('f');
                let storageContainer = creep.room.controller.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_CONTAINER
                                       && i.id != '6072186026dc9c29912ec581'
                                       && i.id != '61643fc6ff5d64f3cce81f83'
                    });
                if (storageContainer && creep.room.controller.pos.inRangeTo(storageContainer, 5)) {
                    creep.memory.storageId = storageContainer.id;
                } else {
                    creep.memory.storageId = 0
                }
            } else if (creep.memory.storageId == 0 && !(Game.time%20)) {
                creep.memory.storageId = undefined;
            }
    
        }
        
        let storageLink = null;
        if (creep.memory.storageLinkId === undefined) {
            //find storage link
            if (creep.room.storage){
                var storagelinks = creep.room.storage.pos.findInRange(FIND_STRUCTURES, 2, {
                    filter: (structure) => {return structure.structureType == STRUCTURE_LINK;}
                });
                if (storagelinks.length){
                    creep.memory.storageLinkId = storagelinks[0].id;
                    storageLink = storagelinks[0];
                } else {
                    creep.memory.storageLinkId = null;
                }
            }
        }
        //Memory.rooms.E47S1.remoteLinkUpgrade2 = 1;Memory.rooms.E47S1.remoteLinkUpgradeId = '63cc49a31babfe54b164cc38';
        if (1 && creep.memory.targetId == undefined && creep.room.storage && (creep.room.memory.remoteLinkUpgrade || creep.room.memory.remoteLinkUpgrade2) && creep.room.memory.remoteLinkUpgradeId && creep.memory.role !== 'dropper') {
            if (!storageLink && creep.memory.storageLinkId) {
                storageLink = Game.getObjectById(creep.memory.storageLinkId);    
            }
            let remoteLink = Game.getObjectById(creep.room.memory.remoteLinkUpgradeId);
            let minLinkEnergy = creep.room.controller && creep.room.controller.level == 8 ? 50 : 250;
            if (storageLink && (!storageLink.cooldown || storageLink.cooldown < 3) && remoteLink && remoteLink.store[RESOURCE_ENERGY] < minLinkEnergy) {
                if (storageLink.store[RESOURCE_ENERGY]) {
                    if (!storageLink.cooldown) {
                        storageLink.transferEnergy(remoteLink);    
                        creep.say('Ltransfer');
                        storageLink.store[RESOURCE_ENERGY] = 0; //for twork this tick
                    } else {
                        creep.say('Lcooldown');
                        return;
                    }
                    
                    
                } else {
                    if (creep.store[RESOURCE_ENERGY]) {
                        helpers.smartMove(creep, storageLink);
                        creep.transfer(storageLink, RESOURCE_ENERGY)
                        creep.say('toL');
                        return;
                    } else if (creep.store.getUsedCapacity()) {
                        helpers.smartMove(creep, creep.room.storage);
                        for (resource in creep.store) {
                            creep.transfer(creep.room.storage, resource);
                            break;
                        }
                        creep.say('toEmpty');
                        return;
                    } else {
                        let target = creep.room.storage;
                        if (creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] > 60000){
                            target = creep.room.terminal;
                        }
                        helpers.smartMove(creep, target);
                        creep.withdraw(target, RESOURCE_ENERGY, 800);
                        creep.say('getEner');
                        return;
                    }
                }
                
            }
            
        }
        
        if (creep.room.memory.storageLinkPos && !creep.memory.targetId && creep.memory.role !== 'dropper') {
            if (!storageLink) {
                storageLink = Game.getObjectById(creep.memory.storageLinkId);
            }
            require('profiler').start('storageTerminalWork');
            if ( !(storageLink && storageLink.store[RESOURCE_ENERGY]) && !require('role.suplier').storageTerminalWork(creep) ) {
                require('profiler').end('storageTerminalWork');
                let storageLinkPos = new RoomPosition(creep.room.memory.storageLinkPos.x, creep.room.memory.storageLinkPos.y, creep.room.memory.storageLinkPos.r);
                if (!creep.pos.isEqualTo(storageLinkPos)) {
                    helpers.smartMove(creep, storageLinkPos, 0, 0);
                    creep.say('M');
                } else {
                    creep.say('T_work');
                }
                return;
            }
            require('profiler').end('storageTerminalWork');
            
            require('profiler').start('factoryDeal');
            if (creep.room.memory.factoryNearLinkPos && !require('role.suplier').factoryDeal(creep, factoryEndProduct)) {
                require('profiler').end('factoryDeal');
                let storageLinkPos = new RoomPosition(creep.room.memory.storageLinkPos.x, creep.room.memory.storageLinkPos.y, creep.room.memory.storageLinkPos.r);
                if (!creep.pos.isEqualTo(storageLinkPos)) {
                    helpers.smartMove(creep, storageLinkPos, 0, 0);
                    creep.say('M');
                } else {
                    creep.say('F_work');
                }
                return;
            }
            require('profiler').end('factoryDeal');

        }
        
        


        var total = creep.store.getUsedCapacity();
        var linkTarget = false;
        if (total == 0 && creep.memory.targetId == undefined){
            if (!storageLink && creep.memory.storageLinkId) {
                storageLink = Game.getObjectById(creep.memory.storageLinkId);    
            }
            
            if (creep.memory.role == 'dropper') {
                storageLink = null;
                creep.memory.storageLinkId = null;
                creep.memory.waitForLink = 10000;
            }
            
            if (storageLink && storageLink.store[RESOURCE_ENERGY]){
                let res = creep.withdraw(storageLink, RESOURCE_ENERGY);
                if (res == ERR_NOT_IN_RANGE) {
                    if (creep.room.memory.storageLinkPos) {
                        let storageLinkPos = new RoomPosition(creep.room.memory.storageLinkPos.x, creep.room.memory.storageLinkPos.y, creep.room.memory.storageLinkPos.r);
                        creep.say('toLP');
                        if (creep.pos.isNearTo(storageLinkPos)) {
                            creep.move(creep.pos.getDirectionTo(storageLinkPos));
                        } else {
                            helpers.smartMove(creep, storageLinkPos);    
                        }
                    } else {
                        //creep.moveTo(storageLink, {visualizePathStyle: {stroke: '#ffaa00'}});
                        helpers.smartMove(creep, storageLink);
                    }
                    
                }
                linkTarget = true;
                creep.memory.waitForLink = 0;
            }
        }

        if (linkTarget){

        } else if((creep.store.getFreeCapacity() && creep.store.getUsedCapacity() && creep.memory.targetId) || ( total == 0)) {
            if (creep.memory.waitForLink == undefined) {
                creep.memory.waitForLink = 0;
            }
            creep.memory.waitForLink++;
            //if (Game.time< 34532744+1000) {creep.memory.waitForLink = 100;creep.say('Taking all');}
            let farSearch = 1 || ['E83N54_','E79N54', 'E85N57','E81N54','E82N56', 'E77N54_', 'E81N55', 'E87N58', 'E42N31', 'E46N31', 'E77N55', 'E83N55', 'E58N22', 'E55N21','E59N24','E58N27',/*'E55N27','E42N28',*/'E57N29','E45N29','E86N53','E87N56_','E85N57','E47N36','E55N31','E52N32'].indexOf(creep.memory.room) >= 0;
            //creep.say(creep.memory.waitForLink+((farSearch || creep.memory.waitForLink> 18)?'f':'s'));
            let waitForLinkLimit = 7;
            if (1 || ['E42N31', 'E46N31', 'E58N22','E83N54','E55N21','E59N24','E58N27','E55N27','E42N28','E57N29','E45N29','E86N53','E87N56_','E85N57','E47N36','E55N31','E52N32','E47N39','E44N38','E57N35','E55N39','E53N25'].indexOf(creep.room.name) >= 0){
                waitForLinkLimit = 2;
            }
            if (['E87N56','E55N27','E42N28','E57N35','E83N54','E55N39','E53N25'].includes(creep.room.name)) {
                farSearch = 0;
            }
            
            if (creep.room.memory.storageLinkPos) {
                farSearch = 0;
                waitForLinkLimit = 2;
            }
            if (['E58N22',].includes(creep.room.name) || creep.memory.role == 'dropper') {
                farSearch = 1;
            }
            
            
            if (creep.memory.waitForLink > waitForLinkLimit) {
                //creep.say('find');
                var target = this.findDropped(creep, (farSearch || creep.memory.waitForLink> 18) ?0:12);
    	        if (target) {
    	            var result = creep.pickup(target);
    	            if (result == OK) {
    	                if (total+target.amount<creep.carryCapacity*0.8){
    	                    //find container near
                            var containers = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                                               i.store[RESOURCE_ENERGY] > 0
                                               && i.id != '5e58b55ec1918e2c0c933224'
                                               && i.id != '5ff30ee49f13e07d3703a070'
                                               
                            });
                            if (containers.length){
                                helpers.deAttachToSource(creep);
                                helpers.attachToSource(creep, containers[0].id);
                                //console.log(creep.name, 'pickup', total, total+target.amount, creep.carryCapacity*0.8, 'attached near container');
                            }

    	                }

    	            } else if(result == ERR_NOT_IN_RANGE) {
                        helpers.smartMove(creep, target, 0, 1);
                    } else if (result == ERR_INVALID_TARGET) {
                        var result2 = -100;
                        if (target.store && target.store[RESOURCE_ENERGY]< target.store.getUsedCapacity()){
                            for (let res in target.store){
                                if (res != RESOURCE_ENERGY) {
                                    result2 = creep.withdraw(target, res);
                                    break;
                                }
                            }  
                        } else {
                            result2 = creep.withdraw(target, RESOURCE_ENERGY);    
                        }
                        
                        if(result2 == ERR_NOT_IN_RANGE) {
                            helpers.smartMove(creep, target, target.structureType?1:0, 1);
                            //console.log('withdraw target',target.structureType?1:0, JSON.stringify(target));
                        } else if (result2 == OK && (!creep.store.getFreeCapacity() || (target.store && !target.store.getUsedCapacity() ))) {
                            creep.say('empty');    
                            helpers.deAttachToSource(creep);
                        } else if (result2 == OK) {
                            creep.say('no empty');
                        } else {
                            creep.say('done');    
                            helpers.deAttachToSource(creep);
                           // console.log('!error geting energy');
                        }
                    }
    	        } else {
    	            if (creep.memory.waitForLink && !(Game.time%60)) {
                        creep.say('???');
                        let containersWithBoosts = creep.room.find(FIND_STRUCTURES, {
                            filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                                           i.store[RESOURCE_CATALYZED_GHODIUM_ACID] && i.store.getUsedCapacity() >= Math.min(850, creep.store.getCapacity()) 
                        });
                        if (containersWithBoosts.length) {
                            helpers.deAttachToSource(creep);
                            helpers.attachToSource(creep, containersWithBoosts[0].id);
                            creep.say('!!!', 1);
                            return;
                        }
                    }
    	            //console.log(creep.name, creep.room.name, 'transporter no traget');
    	            if (storageLink) {
    	                if (creep.room.memory.storageLinkPos) {
                            let storageLinkPos = new RoomPosition(creep.room.memory.storageLinkPos.x, creep.room.memory.storageLinkPos.y, creep.room.memory.storageLinkPos.r);
                            helpers.smartMove(creep, storageLinkPos, 0, 0);
                        } else {
                            helpers.smartMove(creep, storageLink);
                        }
    	                //helpers.smartMove(creep, storageLink, 0, 1);
    	                //creep.moveTo(storageLink,{visualizePathStyle: {stroke: '#ffaa00'}});
    	            } else {
                        if (creep.room.name == 'E87N56'){
                            creep.say('w');
                            const fl = Game.flags['Flag101'];
                            if (fl && !creep.pos.isEqualTo(fl.pos)) {
                                helpers.smartMove(creep, fl, 0, 0);
                            } else if (fl) {
                                creep.memory.sleep = Game.time+30;
                            }
                        }
                        // if (creep.room.name == 'E87N58'){
                        //     //creep.say('w');
                        //     creep.moveTo(Game.flags['FlagE87N58Tr']);
                        // }
    	            }
    	        }
            } else {
                if (creep.memory.waitForLink && !(Game.time%60)) {
                    creep.say('???');
                    let containersWithBoosts = creep.room.find(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                                       i.store[RESOURCE_CATALYZED_GHODIUM_ACID] && i.store.getUsedCapacity() >= Math.min(850, creep.store.getCapacity()) 
                    });
                    if (containersWithBoosts.length) {
                        helpers.deAttachToSource(creep);
                        helpers.attachToSource(creep, containersWithBoosts[0].id);
                        creep.say('!!!', 1);
                    }
                }
            }


        } else {
            helpers.deAttachToSource(creep);
            if (1 || creep.room.energyAvailable>0.1*creep.room.energyCapacityAvailable || !helpers.transferEnergyToClosestStructure(creep)) {
                if (!helpers.transferEnergyToStorage(creep)){
                    // if (!helpers.buildClosestStructure(creep)){
                    //     helpers.upgradeController(creep);
                    // }

                }
            }
        } 
        
        // if (creep.memory.targetId == undefined && creep.room.name == 'E86N53' && creep.pos.x == 41 && creep.pos.y == 16){
        //     creep.move(RIGHT);
        // }
        // if (creep.memory.targetId == undefined && creep.room.name == 'E83N58' && creep.pos.x == 35 && creep.pos.y == 29){
        //     creep.move(LEFT);
        // }
        // if (creep.memory.targetId == undefined && creep.room.name == 'E81N58' && creep.pos.x == 33 && creep.pos.y == 28){
        //     creep.move(RIGHT);
        // }
        // if (creep.memory.targetId == undefined && creep.room.name == 'E77N54' && creep.pos.x == 5 && creep.pos.y == 22){
        //     creep.move(TOP);
        // }
        // if (Game.shard.name == 'shard3' && creep.memory.targetId == undefined && creep.room.name == 'E46N31' && creep.pos.x == 16 && creep.pos.y == 6){
        //     creep.move(LEFT);
        // }
        // if (creep.memory.targetId == undefined && creep.room.name == 'E83N55' && creep.pos.x == 24 && creep.pos.y == 22 && !creep.store.getUsedCapacity()){
        //     creep.move(RIGHT);
        // }
        // if (creep.memory.targetId == undefined && creep.room.name == 'E58N22' && creep.pos.x == 28 && creep.pos.y == 32){
        //     creep.move(RIGHT);
        // }
        // if (creep.memory.targetId == undefined && creep.room.name == 'E55N21' && creep.pos.x == 28 && creep.pos.y == 11){
        //     creep.move(BOTTOM);
        // }
        // if (creep.memory.targetId == undefined && creep.room.name == 'E47N36' && creep.pos.x == 7 && creep.pos.y == 27){
        //     creep.move(TOP);
        // }
        // if (creep.memory.targetId == undefined && creep.room.name == 'E47N36' && creep.pos.x == 8 && creep.pos.y == 26){
        //     creep.move(LEFT);
        // }
        // if (creep.memory.targetId == undefined && creep.room.name == 'E57N29' && creep.pos.x == 36 && creep.pos.y == 37){
        //     creep.move(RIGHT);
        // }
        // if (creep.memory.targetId == undefined && creep.room.name == 'E55N27' && creep.pos.x == 34 && creep.pos.y == 41){
        //     creep.move(TOP);
        // }
        // if (creep.memory.targetId == undefined && creep.room.name == 'E52N32' && creep.pos.x == 19 && creep.pos.y == 45){
        //     creep.move(BOTTOM_LEFT);
        // }
        // if (Game.shard.name == 'shardSeason' && creep.memory.targetId == undefined && creep.room.name == 'E26N22' && creep.pos.x == 30 && creep.pos.y == 33){
        //     creep.move(LEFT);
        // }
        // if (Game.shard.name == 'shardSeason' && creep.memory.targetId == undefined && creep.room.name == 'E26N22' && creep.pos.x == 29 && creep.pos.y == 31){
        //     creep.move(BOTTOM);
        // }
        // if (Game.shard.name == 'shardSeason' && creep.memory.targetId == undefined && creep.room.name == 'E26N22' && creep.pos.x == 29 && creep.pos.y == 32){
        //     creep.move(BOTTOM);
        // }
        // if (Game.shard.name == 'shardSeason' && creep.memory.targetId == undefined && !creep.store.getUsedCapacity() && creep.room.name == 'E23N22' && creep.pos.x == 17 && creep.pos.y == 39){
        //     creep.move(RIGHT);
        // }
        // if (Game.shard.name == 'shardSeason' && creep.memory.targetId == undefined && creep.room.name == 'E16N19' && creep.pos.x == 43 && creep.pos.y == 18){
        //     creep.move(LEFT);
        // }
        // // if (Game.shard.name == 'shard2' && creep.memory.targetId == undefined && creep.room.name == 'E45N29' && creep.pos.x == 23 && creep.pos.y == 41){
        // //     creep.move(RIGHT);
        // // }
        // // if (Game.shard.name == 'shard2' && creep.memory.targetId == undefined && creep.room.name == 'E45N29' && creep.pos.x == 23 && creep.pos.y == 41){
        // //     creep.move(TOP);
        // // }
        // // if (Game.shard.name == 'shard2' && creep.memory.targetId == undefined && creep.room.name == 'E57N29' && creep.pos.x == 37 && creep.pos.y == 37){
        // //     creep.move(BOTTOM);
        // // }
        // // if (creep.memory.targetId == undefined && creep.room.name == 'E87N58' && creep.pos.x == 25 && creep.pos.y == 25){
        // //     creep.move(LEFT);
        // // }
        // if (Game.shard.name == 'shard2' && creep.memory.targetId == undefined && creep.room.name == 'E57N35' && ((creep.pos.x == 29 && creep.pos.y == 7) || (creep.pos.x == 28 && creep.pos.y == 7))){
        //     creep.move(LEFT);
        // }

	},
	
	dropperRun: function(creep) {
	    if (helpers.runMoveOrder(creep)) return;  
	    if (creep.memory.targetId == undefined && !creep.store.getUsedCapacity()) {
	        let target = this.findDropped(creep);
	        if (target) {
	            helpers.attachToSource(creep, target.id);
	            creep.memory.targetId = target.id;
	        } else {
	            creep.memory.sleep = Game.time + 15;
	            return;
	        }
	    }
	    if (creep.memory.targetId && !creep.store.getFreeCapacity()) {
	        helpers.deAttachToSource(creep);
	    }
	    if (creep.memory.targetId && creep.store.getFreeCapacity()) {
	        let target = Game.getObjectById(creep.memory.targetId);
	        if (target) {
	            if (creep.pos.isNearTo(target)) {
	                let res = creep.pickup(target);
	                creep.say(res);
	                if (res == OK) {
	                    helpers.deAttachToSource(creep);
	                    return;
	                } else if (res == ERR_INVALID_TARGET) {
                        let result2 = -100;
                        if (target.store && target.store[RESOURCE_ENERGY]< target.store.getUsedCapacity()){
                            for (let res in target.store){
                                if (res != RESOURCE_ENERGY) {
                                    result2 = creep.withdraw(target, res);
                                    break;
                                }
                            }  
                        } else {
                            result2 = creep.withdraw(target, RESOURCE_ENERGY);    
                        }
                        creep.say(result2);
                        if (result2 == OK) {
    	                    return;
                        } else {
    	                    helpers.deAttachToSource(creep);
    	                    return;
                        }
	                } else {
	                    helpers.deAttachToSource(creep);
	                    return;
	                }
	            } else {
	                creep.say('moving');
	                helpers.smartMove(creep, target);
                    helpers.createMoveOrder(creep, target, {range: 1});
	            }
	        } else {
	            creep.memory.targetId = undefined;
	            return;
	        }
	    } else if (!creep.memory.targetId && creep.store.getUsedCapacity()) {
            if (!helpers.transferEnergyToStorage(creep)){
            }
	    }
	},
	
	findDropped: function (creep, range = 0) {
    
        if (creep.room.memory.defendRoomMode && creep.room.name != 'E16N19_') {
            range = 5;
        }
        if (!range) {
            range = 15;
        }
        if (creep.memory.role == 'dropper') {
            range = 0;
        }
        
        var source = null;
        if (creep.memory.targetId == undefined)  {
            //find dropped resources
            var target = null;//creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            //console.log(target, target.energy);
            var targets = null;
            if (!creep.room.storage) {
                targets = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: (i) => (i.resourceType == RESOURCE_ENERGY && i.amount > 170)
                });    
            } else if (!range) {
                targets = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: (i) => (i.resourceType == RESOURCE_ENERGY && i.amount > 170) || (i.resourceType != RESOURCE_ENERGY && i.amount > 50)
                });    
            } else {
                targets = creep.pos.findInRange(FIND_DROPPED_RESOURCES, range, {
                    filter: (i) => (i.resourceType == RESOURCE_ENERGY && i.amount > 170) || (i.resourceType != RESOURCE_ENERGY && i.amount > 50)
                });
            }
            if (targets.length){
                targets.sort(function (a,b){return b.amount-a.amount;});
                target = targets[0];
                creep.say('drop!!');
                if (this.getAttachedToSource(creep, target.id) >= 1) {
                    target = null;
                    creep.say('dropBusy');
                }
                // if (target && target.resourceType == RESOURCE_SCORE) {
                //     target = null;
                // }
            }  
            if (!target) {
                let containersWithEnergy = [];
                if (!range) {
                    //find containers
                    containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                                       //i.store[RESOURCE_ENERGY] > Math.min(850, creep.store.getCapacity()) 
                                       i.store.getUsedCapacity() > Math.min(850, creep.store.getCapacity()) 
                                       && i.id != '5ff30ee49f13e07d3703a070'
                                       && i.id != '61aa6b67815b472fa6c29ddd'
                                       && i.id != creep.memory.storageId
                    });
                    //containersWithEnergy.sort(function (a,b){return b.store[RESOURCE_ENERGY]-a.store[RESOURCE_ENERGY];});
                    containersWithEnergy.sort(function (a,b){return b.store.getUsedCapacity()-a.store.getUsedCapacity();});
                }
                //creep.say('cont '+containersWithEnergy.length);
                if (containersWithEnergy.length){
                    target = containersWithEnergy[0];
                    if (this.getAttachedToSource(creep, target.id) >= 1 && containersWithEnergy.length>1) {
                        target = containersWithEnergy[1];
                    }
                } else {
                    if (!range) {
                        targets = creep.room.find(FIND_TOMBSTONES, {
                            filter: (i) => i.store.getUsedCapacity() >= 100
                        });    
                        //creep.say('ft'+targets.length);
                    } else {
                        targets = creep.pos.findInRange(FIND_TOMBSTONES, range, {
                            filter: (i) => i.store.getUsedCapacity() >= 100
                        });    
                    }
                    if (!targets.length) {
                        targets = creep.pos.findInRange(FIND_TOMBSTONES, 5, {
                            filter: (i) => i.store.getUsedCapacity() >= 40
                        });    
                    }

                    if (targets.length){
                        target = targets[0];
                        creep.say('tomb!!');
                    } else if (Game.shard.name == 'shardSeason') {
                        targets = creep.room.find(FIND_SCORE_CONTAINERS);
                        if (targets.length && creep.room.storage) {
                            target = targets[0];
                            creep.say('score!!');
                        }
                        
                    }
                }
                
                
                // else if (creep.room.name != 'E83N58'){
                //     console.log('get nuke',creep.name, creep.room.name);
                //     let nikeWithEnergy = creep.room.find(FIND_MY_STRUCTURES, {
                //         filter: (i) => i.structureType == STRUCTURE_NUKER &&
                //                       i.energy
                //     });
                //     if (nikeWithEnergy.length){
                //         target = nikeWithEnergy[0];
                //     }
    
                // }
    
            }
    
    
            if(target && creep.memory.targetId == undefined && this.getAttachedToSource(creep, target.id) < 1) {
                //console.log('Transporter look for dropped', target);
                helpers.attachToSource(creep, target.id);
            }
        }
        if (creep.memory.targetId != undefined)  {
            source =  Game.getObjectById(creep.memory.targetId);
            if (source == null){
                helpers.deAttachToSource(creep);
            }
        }
        return source;
    },
    getAttachedToSource: function(creep, targetId) {
        // let count1 = helpers.getAttachedToSource(creep, targetId);
        let count2 = _.filter(require('spawn').getGameCreeps(creep.memory.room, creep.memory.role), (c) => c.memory.targetId == targetId).length;
        // Game.notify('getAttachedToSourceTranspoirter '+ creep.memory.role+' '+creep.room+' '+targetId+' '+Game.time+' result1 '+count1+' result2 ' + count2);
        return count2;
    },
};

module.exports = roleTransporter;
