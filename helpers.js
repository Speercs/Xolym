var Traveler = require('Traveler');
/* 
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this: 
 * var mod = require('helpers');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    
getFarTargets: function(creep) {
    if (Game.shard.name == 'shard3'){
        return require(Game.shard.name+'.cfg').getSectorTargets(creep.memory.sector);
    }
    if (Game.shard.name == 'shard2'){
        return require(Game.shard.name+'.cfg').getSectorTargets(creep.memory.sector);
    }
    if (Game.shard.name == 'shard0'){
        return require(Game.shard.name+'.cfg').getSectorTargets(creep.memory.sector);
    }
    return [];   
},


findHostiles: function(room) {
    let result = Game.rooms[room].find(FIND_HOSTILE_CREEPS, {
        filter:  (object) => {
            return this.ownerNotInWhiteList(object.owner.username);
        }
    })
    console.log('Finding hostiles in room', room, result.length);
    return result;
},



// getRoomMemory: function(){
//     return Memory;// Game.spawns['Spawn1']?Game.spawns['Spawn1'].room.memory:Memory;
// },    

// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
getRandomInt: function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
},


getAttachedToSource: function(creep, id, inner = false){
    if (!inner) {
        console.log('<span style="color:red">getAttachedToSource</span>', creep.memory.role,  creep, creep.room, id);
        Game.notify('getAttachedToSource '+ creep.memory.role+' '+creep.room+' '+id+' '+Game.time);
    }
    return _.filter(require('spawn').getGameCreeps(creep.memory.room), (c) => c.memory.targetId == id).length;
    
    // if (this.getRoomMemory().sources == undefined) {
    //     this.getRoomMemory().sources = {};
    //     this.getRoomMemory().sources[id] = 0
    // } else if (this.getRoomMemory().sources[id] == undefined) {
    //     this.getRoomMemory().sources[id] = 0
    // }
    // return this.getRoomMemory().sources[id];
},

attachToSource: function(creep, id) {
    creep.memory.targetId = id;
    // //var source = Game.getObjectById(id);
    // var workers = this.getAttachedToSource(creep, id, true);
    // //console.log(creep.name, ' try attached to', id, 'Всего ', workers);
    // this.getRoomMemory().sources[id] = workers +1;
    // creep.memory.targetId = id;
    // //console.log(creep.name, 'attached to', id, 'Всего ', this.getRoomMemory().sources[id]);
},

deAttachToSource: function(creep) {
    creep.memory.targetId = undefined;
    // var id = creep.memory.targetId;
    // if (id != undefined) {
    //     var workers = this.getAttachedToSource(creep, id, true);
    //     //console.log(creep.name, ' try deAttached to', id, 'Всего ', workers);
    //     this.getRoomMemory().sources[id] = workers - 1;
    //     if (this.getRoomMemory().sources[id] <= 0) {
    //         this.getRoomMemory().sources[id] = undefined;
    //     }
    //     creep.memory.targetId = undefined;
    //     //console.log(creep.name, 'deAttached to', id, 'Всего ', this.getRoomMemory().sources[id]);
    // }
},

updateAttachOfSource: function () {
    delete Memory.sources;
    return;
    //Memory.sources = {};
// 	for(var name in Game.creeps) {
//         var creep = Game.creeps[name];
// 		if (creep.memory.targetId) {
// 			this.attachToSource(creep, creep.memory.targetId);
// 		}		
// 	}
},

findSource: function (creep) {
    Game.notify('helpers.findSource DEPRECATED '+ creep.memory.role+' '+creep.room+' '+Game.time);
    var source = null;
    if (creep.memory.targetId != undefined) {
        source =  Game.getObjectById(creep.memory.targetId);
        if (source == null){
            this.deAttachToSource(creep);
        }
    } else {
        //find dropped resources
        var target = null;//creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
        
        //console.log(target, target.energy);
        var targets = [];//creep.room.find(FIND_DROPPED_RESOURCES);
        if (targets.length){
            targets.sort(function (a,b){return b.energy-a.energy;});
            target = targets[0];
        }
        //target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
        
        
        
        if(target && creep.memory.targetId == undefined && this.getAttachedToSource(creep, target.id) < 99) {
            //console.log('dropped', target);
            this.attachToSource(creep, target.id);
            //creep.memory.pick = true;
        } else {
            //find new target;
            var sources = [];//creep.room.find(FIND_SOURCES
            //, {filter: (structure) => {return (structure.id != '5873bdea11e3e4361b4d9fdf');}}
            //);
            var lenArr = [];
            for (var i=0; i<sources.length; i++){
                if (sources[i].id){
                    //var path = creep.room.findPath(creep.pos, sources[i].pos, {maxOps: 200});
                    var harvNum = this.getAttachedToSource(creep, sources[i].id);
                    lenArr.push({id: sources[i].id, koef:harvNum });
                }
            }
            
            
            var extractors = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {return (structure.structureType == STRUCTURE_EXTRACTOR);
                }
            });
            
            if (extractors.length && creep.ticksToLive > (['E81N55'].indexOf(creep.room.name)>=0?20:500)){
                var minerals = creep.room.find(FIND_MINERALS);
                if (minerals.length && minerals[0].mineralAmount){
                    var harvNum = this.getAttachedToSource(creep, minerals[0].id);
                    if (harvNum<2){
                        this.attachToSource(creep, minerals[0].id);    
                        console.log(creep.name, creep.ticksToLive, 'attached to mineral');
                        return minerals[0];//.id;
                    }
                }
            }
            

            lenArr.sort(function (a,b){return a.koef-b.koef;});
            
            // for (var i=0;i<lenArr.length;i++) {
            //  console.log(lenArr[i].id, lenArr[i].koef);
            // }
            
            if (lenArr.length){
                this.attachToSource(creep, lenArr[0].id);    
            } else {
                
            }
        }
    }
    return source;
},
buildClosestStructure: function(creep) {
    //var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (!creep.store[RESOURCE_ENERGY]) {
        return 0;
    }
    let constructions = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
    if (!constructions.length) {
        return 0;
    }
    
    var target = creep.pos.findClosestByRange(constructions
        , {range: 3, filter: (structure) => {return structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_SPAWN /*|| structure.structureType == STRUCTURE_EXTENSION*/;}}
        );
        
    if (!target) {
        target = creep.pos.findClosestByRange(constructions
        , {range: 3, filter: (structure) => {return structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_OBSERVER || structure.structureType == STRUCTURE_EXTRACTOR ;}}
        );
    }
    if (0 || !target) {
        target = creep.pos.findClosestByRange(constructions
            , {range: 3, filter: (structure) => {return true
           && (structure.structureType != STRUCTURE_CONTAINER || creep.memory.role == 'settler' || structure.room.name == 'E83N55_' || (creep.room.memory.labContainerPos && structure.pos.isEqualTo(new RoomPosition(creep.room.memory.labContainerPos.x, creep.room.memory.labContainerPos.y, creep.room.memory.labContainerPos.roomName))))
            //&& structure.structureType != STRUCTURE_SPAWN
            && structure.structureType != STRUCTURE_LINK
            //&& structure.id != '59d201d15d2ce549a0d2ff39'
            ;}}
            );
    }
    if(target) {
        this.deAttachToSource(creep);
        let res = creep.build(target);
        if (res == OK && target.structureType == STRUCTURE_RAMPART) {
            creep.room.memory.nextRepairTime = undefined;
        } else if (res == ERR_NOT_IN_RANGE) {
            if (creep.pos.inRangeTo(target, 4)){
                creep.moveTo(target, {reusePath: 0, range: 3, visualizePathStyle: {stroke: '#ffffff'}});    
            } else {
                this.smartMove(creep, target, 1, 3);   
            }
        }
    }
    
    return target;
},
transferEnergyToStorage: function(creep){
    if ((creep.room.storage && creep.room.storage.my) || (creep.memory.storageId && Game.getObjectById(creep.memory.storageId))){
        
        if (creep.memory.role == 'supertransporter' && creep.store[RESOURCE_ENERGY] && (creep.memory.superLink == undefined || creep.memory.superLink)) {
            //console.log(creep.name, creep.room.name, 'finding link'); 
            //find link
            let radius = 8;
            if (creep.room.name == 'E87N56'){
                radius = 18;
            }
            var linksNear = creep.pos.findInRange(FIND_STRUCTURES, radius, {
                filter: (structure) => {return structure.structureType == STRUCTURE_LINK //&& structure.energy<structure.energyCapacity 
                && structure.id != '5913780535fb8d51b1ba7e00'
                && structure.id != '5974a294db470b1f3c9a61ef'
                && structure.id != '598b00a91fb86d109344e95e'
                && structure.id != '5e0b1944e4b7830e55a23330'
                && structure.id != '5e202e3039e9a3db43376b50'
                && structure.id != '5e3e6148ac61b8f692e1d56d'
                && structure.id != '5f3a300d40ab9a3bc1eaf41e'
                && structure.id != '5ebec6723892af2ac62e4471'
                && structure.id != '5f696dd0ebd650ea3105912c'
                && structure.id != '5fb36067198c4a76fd19931b'
                && structure.id != '5fd03700724e73dfd0db63f6'
                && structure.id != '60729df105be242e648e1988'
                && structure.id != '6395b05f4a771e5026d11587'
                
                
                
                //&& structure.id != '5dee43308beb79804f043d35'
                
                ;}   
            });
            var links = creep.pos.findInRange(linksNear, radius, {
                filter: (structure) => {return structure.store.getFreeCapacity(RESOURCE_ENERGY)
                ;}   
            });
            
            if (linksNear.length) {
                creep.memory.superLink = 1;
            }
            
            if (links.length){
                creep.memory.superLink = 1;
                let targetLink = creep.pos.findClosestByRange(links);
                let res = creep.transfer(targetLink, RESOURCE_ENERGY);
                if (res == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetLink, {range:1, visualizePathStyle: {stroke: '#ffffff'}});
                    delete(creep.memory._trav);
                // } else if (res == OK && !targetLink.cooldown && creep.room.storage && creep.room.memory.storageLink) {
                    // let storageLink = Game.getObjectById(creep.room.memory.storageLink);
                    // if (storageLink){
                    //     targetLink.transferEnergy(storageLink);    
                    // }
                } else if (res == OK && targetLink.store[RESOURCE_ENERGY] + creep.store[RESOURCE_ENERGY] > 1) {
                    this.addLinkQueue(creep.room, targetLink);
                }
            } else {
                if (!creep.memory.superLink || creep.memory.superLink>38){
                    creep.memory.superLink = 0;
                } else {
                    let linkWithMinCooldown = _.min(linksNear, link => link.cooldown);
                    creep.say(linkWithMinCooldown.cooldown,1); 
                    if (creep.pos.isNearTo(linkWithMinCooldown)) {
                        creep.memory.sleep = Game.time + linkWithMinCooldown.cooldown;
                        creep.memory.superLink += linkWithMinCooldown.cooldown;
                    } else {
                        creep.moveTo(linkWithMinCooldown, {range:1, visualizePathStyle: {stroke: '#ffffff'}});    
                        delete(creep.memory._trav);
                        creep.memory.superLink++
                    }
                }
            }
        } else {
            creep.memory.superLink = 0;
        }
        if (creep.memory.superLink == 0) {
            let storage = (creep.room.storage && creep.room.storage.my)?creep.room.storage:(creep.memory.storageId?Game.getObjectById(creep.memory.storageId):null);
            if (!storage) {
                creep.say('nostorage');
                return;
            }
            //let storage = creep.room.storage;
            if (creep.room.terminal && !creep.store[RESOURCE_ENERGY] && creep.room.terminal.store.getFreeCapacity()){
                storage = creep.room.terminal;
            }
            if (creep.room.terminal && storage.store.getFreeCapacity()<5000 && creep.room.terminal.store.getFreeCapacity()>=5000) {
                storage = creep.room.terminal;
                creep.say('toTerm');
            }
            
            if (creep.pos.isNearTo(storage)) {
                // transfer all resources
                for(const resourceType in creep.carry) {
                    const res = creep.transfer(storage, resourceType);
                    if (res == ERR_FULL){
                        creep.drop(resourceType);
                    }
                }
            } else {
                let range = 3;
                if (creep.room.name == 'E43N38') {
                    range = 6;
                }
                if (creep.pos.getRangeTo(storage) <= range){
                    creep.moveTo(storage, {range:1, reusePath: 0, visualizePathStyle: {stroke: '#ffffff'}});        
                } else {
                    this.smartMove(creep, storage, 1, 1);
                    this.createMoveOrder(creep, storage, {range:range});
                    
                }
            }
        }
    
    } else if (creep.memory.room != undefined && creep.room.name != creep.memory.room){
        creep.memory.superLink = undefined;
        if (creep.memory.room == 'E87N56' && Game.shard.name == 'shard0'){
            this.smartMove(creep, Game.flags['Flag48']);    
            //this.createMoveOrder(creep, Game.flags['Flag48'], {room:1});
        } else if (creep.memory.room == 'E86N53'  && Game.shard.name == 'shard0' && creep.memory.sector != 19){
            this.smartMove(creep, Game.flags['Flag68']);    
            //this.createMoveOrder(creep, Game.flags['Flag68'], {room:1});
        } else if (creep.memory.room == 'E85N57'  && Game.shard.name == 'shard0' && creep.memory.sector != 31 && creep.memory.sector != 32 && creep.memory.sector != 30){
            this.smartMove(creep, Game.flags['Flag79']);  
            //this.createMoveOrder(creep, Game.flags['Flag79'], {room:1});
        } else if (creep.memory.room == 'E46N31' && Game.shard.name == 'shard3'){
            this.smartMove(creep, Game.flags['Flag11']);  
            this.createMoveOrder(creep, Game.flags['Flag11'], {room:1});
        } else {
            let storage = Game.rooms[creep.memory.room]?Game.rooms[creep.memory.room].storage:null;
            // if (storage && storage.store.getFreeCapacity()<5000) {
            //     let terminal = Game.rooms[creep.memory.room]?Game.rooms[creep.memory.room].terminal:null;
            //     if (terminal && terminal.store.getFreeCapacity() > 5000) {
            //         storage = terminal;
            //         creep.say('toTerm');
            //     }
            // }
            if (storage) {
                this.smartMove(creep, storage, 1, 3);
                if (creep.memory.role == 'supertransporter') {
                    this.createMoveOrder(creep, storage, {room:1}, 3);
                }
            } else {
                if (creep.memory.role == 'settler'){
                    creep.say('nodeal');
                } else {
                    this.smartMove(creep, new RoomPosition(25, 20, creep.memory.room), 1, 6);        
                    console.log(creep.name, '=================================================Moving to fixed position ERROR!!',  creep.memory.room);
                }
                
                
            }
        }
    } else {
        creep.memory.superLink = undefined;
        creep.say('no storage');
        return false;
    }
    return true;
    
    
    
    
    
    // var targets = creep.room.find(FIND_STRUCTURES, {
    //     filter: (structure) => {
    //         return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] < 1900000); //structure.storeCapacity)
    //     }
    // });
    // if (targets.length) {
    //     this.deAttachToSource(creep);
    //     // transfer all resources
    //     for(var resourceType in creep.carry) {
    //     	var res = creep.transfer(targets[0], resourceType);
    //     	if (res == ERR_NOT_IN_RANGE) {
    //     	    creep.moveTo(targets[0], {ignoreCreeps: false, visualizePathStyle: {stroke: '#ffffff'}});
    //     	    if (resourceType == RESOURCE_ENERGY){
    //         	    var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    //                     filter: (structure) => {
    //                         return (structure.structureType == STRUCTURE_EXTENSION
    //                                 || structure.structureType == STRUCTURE_TOWER
    //                                 || structure.structureType == STRUCTURE_SPAWN
    //                             ) && (structure.energy < structure.energyCapacity);
    //                     }
    //                 });
    //                 if (target) {
    //                     creep.transfer(target, RESOURCE_ENERGY);
    //                 }
    //     	    }
    //     	} else if ( res == ERR_FULL) {
    //             creep.drop(resourceType);
    //     	}
    //     }
    // } 
    // else {
    //     if (creep.room.name == 'E82N55' || creep.room.name == 'E83N56' || creep.room.name == 'E81N56' || creep.room.name == 'E80N56' ){
    //         creep.moveTo(Game.flags['Flag10'].pos, {ignoreCreeps: false});
    //     } else if (creep.room.name == 'E83N55'){
    //         var res = creep.moveTo(Game.flags['Flag14'].pos);
    //     } else if (creep.room.name == 'E82N58' || creep.room.name == 'E81N57' || creep.room.name == 'E80N58'){
    //         var res = creep.moveTo(Game.flags['Flag20'].pos);
    //     // } else if (creep.room.name == 'E79N53' ){
    //     //     var res = creep.moveTo(Game.flags['Flag28'].pos);
    //     } else if (creep.memory.room != undefined ){
    //         creep.moveTo(new RoomPosition(25, 20, creep.memory.room));
    //     } else if (creep.room.name != 'E83N54'){
    //         var res = creep.moveTo(Game.flags['Flag1'].pos);
    //     }
    // }
    // return targets.length;
},

transferEnergyToClosestStructure: function(creep) {
    
    if (creep.memory.sleepRefill) {
        if (Game.time < creep.memory.sleepRefill) {
            return 0;
        } else {
            delete creep.memory.sleepRefill;
        }
    }
        
    
    
    let target = null;
    let autoTarget = false;
    let autoTicks = 5;
    if (Game.cpu.bucket < 1000) {
        autoTicks = 10;
    } else if (Game.cpu.bucket < 3000) {
        autoTicks = 8;
    } 
    
    
    
    if (creep.memory.transferTargetId && creep.memory.transferTargetIdTime) {
        if (Game.time <= creep.memory.transferTargetIdTime + autoTicks) {
            let structure = Game.getObjectById(creep.memory.transferTargetId);
            if (structure && structure.store.getFreeCapacity(RESOURCE_ENERGY)) {
                target = structure;
                autoTarget = true;
                //creep.say('autoT'+ (creep.memory.transferTargetIdTime + autoTicks - Game.time));
            }
        }
        if (!target) {
            delete (creep.memory.transferTargetId);
            delete (creep.memory.transferTargetIdTime);
        }
    }
    
    if (!target) {
        target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return ((structure.energy < structure.energyCapacity*0.6 && structure.structureType == STRUCTURE_TOWER)
                    || (structure.energy < structure.energyCapacity*0.5 && structure.structureType == STRUCTURE_LAB)
                    );
        }});
    }
        
    if(!target || (creep.memory.role == 'helper' && !autoTarget)  || (creep.room.energyAvailable< 0.2* creep.room.energyCapacityAvailable && !autoTarget)){
        target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_EXTENSION && creep.memory.role && creep.memory.role !== 'superharvester' && (creep.memory.role !== 'settler' || (!creep.room.storage && !creep.memory.storageId))
                        || structure.structureType == STRUCTURE_TOWER
                        || (structure.structureType == STRUCTURE_SPAWN && (!Memory.spawns || !Memory.spawns[structure.name] || Memory.spawns[structure.name].skip == undefined)  && creep.memory.role && (creep.memory.role !== 'settler' || (!creep.room.storage && !creep.memory.storageId)) && creep.memory.role !== 'superharvester' ) 
                        || (structure.structureType == STRUCTURE_LAB && creep.memory.role && creep.memory.role !== 'superharvester' && creep.memory.role !== 'helper')
                    )
                    &&
                    ((structure.energy < structure.energyCapacity*0.7 && structure.structureType == STRUCTURE_TOWER)
                    ||
                    ((structure.energy < structure.energyCapacity && structure.structureType != STRUCTURE_TOWER)))
                    || (Game.shard.name == 'shard2' && creep.room.name == "E43N38" && structure.structureType == STRUCTURE_TERMINAL && (structure.store[RESOURCE_ENERGY] < 2000 || !structure.store[RESOURCE_ENERGY]) && creep.room.storage.store[RESOURCE_ENERGY] > 100000 && structure.store.getFreeCapacity() && creep.memory.role != 'helper')
                    || (Game.shard.name == 'shard2' && creep.room.name != "E43N38"     && structure.structureType == STRUCTURE_TERMINAL && (structure.store[RESOURCE_ENERGY] <  50000 || !structure.store[RESOURCE_ENERGY]) && creep.room.storage.store[RESOURCE_ENERGY] > 100000 && structure.store.getFreeCapacity() && creep.memory.role != 'helper' && creep.room.energyAvailable>0.7*creep.room.energyCapacityAvailable)
                    || (Game.shard.name == 'shard3'      && structure.structureType == STRUCTURE_TERMINAL && (structure.store[RESOURCE_ENERGY] <  50000 || !structure.store[RESOURCE_ENERGY]) && creep.room.storage.store[RESOURCE_ENERGY] > 100000 && structure.store.getFreeCapacity() && creep.memory.role != 'helper' && creep.room.energyAvailable>0.7*creep.room.energyCapacityAvailable)
                    || (Game.shard.name == 'shard1'      && structure.structureType == STRUCTURE_TERMINAL && (structure.store[RESOURCE_ENERGY] <  50000 || !structure.store[RESOURCE_ENERGY]) && creep.room.storage.store[RESOURCE_ENERGY] > 100000 && structure.store.getFreeCapacity() && creep.memory.role != 'helper' && creep.room.energyAvailable>0.7*creep.room.energyCapacityAvailable)
                    || (Game.shard.name == 'shard0'      && structure.structureType == STRUCTURE_TERMINAL && (structure.store[RESOURCE_ENERGY] <  50000 || !structure.store[RESOURCE_ENERGY]) && creep.room.storage.store[RESOURCE_ENERGY] > 100000 && structure.store.getFreeCapacity() && creep.memory.role != 'helper' && creep.room.energyAvailable>0.7*creep.room.energyCapacityAvailable)
                    // || (Game.shard.name == 'shardSeason' && structure.structureType == STRUCTURE_TERMINAL && (structure.store[RESOURCE_ENERGY] <  50000 || !structure.store[RESOURCE_ENERGY]) && creep.room.storage.store[RESOURCE_ENERGY] > 100000 && structure.store.getFreeCapacity() && creep.memory.role != 'helper' && creep.room.energyAvailable>0.7*creep.room.energyCapacityAvailable)
                    || (structure.structureType == STRUCTURE_POWER_SPAWN && structure.energy < 3700 && creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] >250000 && creep.room.energyAvailable>0.5*creep.room.energyCapacityAvailable)
                    || (Game.shard.name == 'shard0' /*&& creep.room.name == "E49N37"*/ && structure.structureType == STRUCTURE_NUKER && structure.energy < structure.energyCapacity && creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 250000 && creep.room.energyAvailable>0.8*creep.room.energyCapacityAvailable)
                    || (Game.shard.name == 'shard1' /*&& creep.room.name == "E49N37"*/ && structure.structureType == STRUCTURE_NUKER && structure.energy < structure.energyCapacity && creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 250000 && creep.room.energyAvailable>0.8*creep.room.energyCapacityAvailable)
                    || (Game.shard.name == 'shard2' /*&& creep.room.name == "E49N37"*/ && structure.structureType == STRUCTURE_NUKER && structure.energy < structure.energyCapacity && creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 250000 && creep.room.energyAvailable>0.8*creep.room.energyCapacityAvailable)
                    || (Game.shard.name == 'shard3' /*&& creep.room.name == "E49N37"*/ && structure.structureType == STRUCTURE_NUKER && structure.energy < structure.energyCapacity && creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 250000 && creep.room.energyAvailable>0.8*creep.room.energyCapacityAvailable)
                    // || (Game.shard.name == 'shard2' && creep.room.name == "E47N36" && structure.structureType == STRUCTURE_NUKER && structure.energy < structure.energyCapacity && creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 300000 && creep.room.energyAvailable>0.8*creep.room.energyCapacityAvailable)
                    );
            }
        });
    }
    
    if (target) {
        this.deAttachToSource(creep);
        if (!creep.memory.transferTargetId || creep.memory.transferTargetId != target.id) {
            creep.memory.transferTargetId = target.id;
            creep.memory.transferTargetIdTime = Game.time;    
        }        
        
        if (creep.pos.isNearTo(target)){
            let res = creep.transfer(target, RESOURCE_ENERGY);
            if (res == OK) {
                delete (creep.memory.transferTargetId);
                delete (creep.memory.transferTargetIdTime);
            } else if (res == ERR_FULL) {
                delete (creep.memory.transferTargetId);
                delete (creep.memory.transferTargetIdTime);
            }     
        } else {
            creep.moveTo(target, {range: 1, visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    
    if (!target) {
        creep.memory.sleepRefill = Game.time + autoTicks;
    }
    
    return target && creep.store[RESOURCE_ENERGY];
},
upgradeController: function(creep){
    //try upgradeController
    this.deAttachToSource(creep);
    var res = creep.upgradeController(creep.room.controller);
    if(res == ERR_NOT_IN_RANGE) {
        if (creep.pos.inRangeTo(creep.room.controller, 5)){
            creep.moveTo(creep.room.controller, {range: 3, reusePath: 0, visualizePathStyle: {stroke: '#ffffff'}});    
            //creep.say('rr');
        } else {
            this.smartMove(creep, creep.room.controller, 1, 3);   
        }
        
    } else { //Memory.rooms.E55N37.upgradeRange = 2
        if (creep.room.memory.upgradeRange && creep.memory.role == 'settler' && !creep.pos.inRangeTo(creep.room.controller, creep.room.memory.upgradeRange)) {
            creep.moveTo(creep.room.controller, {range: creep.room.memory.upgradeRange, reusePath: 0, visualizePathStyle: {stroke: '#ffffff'}});    
        }
    }
    if (res == ERR_INVALID_TARGET || res == ERR_NOT_OWNER) {
        return 0;
    }
    return 1;
},

recycleCreep: function(creep){
    if (!creep.getActiveBodyparts(MOVE)) {
        creep.suicide();
    }
    var spawn = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN);
                }
            });
    if (creep.room.controller && creep.room.controller.my && spawn){
        if (!creep.getActiveBodyparts(MOVE)) {
            if (creep.pos.isNearTo(spawn)) {
                spawn.recycleCreep(creep);
            } else {
                creep.suicide();
            }
            return;
        }
        
        let flag = Game.flags['FlagRecycle'+creep.room.name];
        if (flag) {
            if (creep.pos.isEqualTo(flag)) {
                spawn.recycleCreep(creep);    
            } else if (creep.pos.isNearTo(flag) && creep.pos.isNearTo(spawn)) {
                const flagOnStruct  = flag.pos.lookFor(LOOK_STRUCTURES);
                if (flagOnStruct.length) {
                    let structObstacle = false;
                    flagOnStruct.forEach((struct) => {
                        if (struct.structureType != STRUCTURE_ROAD && struct.structureType != STRUCTURE_RAMPART && struct.structureType != STRUCTURE_CONTAINER) {
                            structObstacle = true;
                        }
                    })
                    if (structObstacle) {
                        creep.say(spawn.recycleCreep(creep));            
                    } else {
                        creep.move(creep.pos.getDirectionTo(flag));
                        //this.smartMove(creep, flag, 0, 0);        
                    }
                } else {
                    creep.move(creep.pos.getDirectionTo(flag));
                    //this.smartMove(creep, flag, 0, 0);
                }
            } else  {
                if (creep.pos.isNearTo(flag)) {
                    creep.move(creep.pos.getDirectionTo(flag));
                } else {
                    this.smartMove(creep, flag);    
                }
            }
        } else {
            var res = spawn.recycleCreep(creep);
            if (res == ERR_NOT_IN_RANGE){
                try {
                    spawn.pos.createFlag('FlagRecycle'+creep.room.name);
                } catch (e) {}
                this.smartMove(creep, spawn);
            }
        }
    } else {
        //move to home
        if (creep.memory.room){
            let homeRoom = Game.rooms[creep.memory.room];
            if (homeRoom && homeRoom.storage){
                this.smartMove(creep, homeRoom.storage, 1, 1);    
            } else {
                this.smartMove(creep, new RoomPosition(27, 41, creep.memory.room), 0, 1);    
                console.log(creep.name, 'Moving to fixed position ERROR!!');
            }
        } else if (!creep.memory.waitToRecycle) {
            creep.memory.waitToRecycle =1 ;
        } else {
            console.log(creep.name, 'error: not find home to recycling');
            if (creep.name.startsWith('wall')) {
                creep.suicide();
                return;
            }
            if (creep.name.startsWith('mB')) return;
            Game.notify('Illegal intershard moving detected '+creep.room.name+' '+creep.name);
            if (!creep.memory.tryFindHome) {
                creep.memory.tryFindHome = 1;
                creep.memory.room = require('observer').findClosestRoomByPath(creep.room.name);    
            }
        }
    }
},

// isHighway: function(roomName) {
//     const roomNamePos = roomName.split(/(\d+)/);
//     return roomNamePos.length >= 4 && (roomNamePos[1].slice(-1) === '0' || roomNamePos[3].slice(-1) === '0');
// },

isHighway: function(roomName) {
        let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
        if (parsed && parsed.length>=3) {
            return (parsed[1] % 10 === 0) || (parsed[2] % 10 === 0);
        }
        return 0;
    },
isCrossRoad: function(roomName) {
    let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
    if (parsed && parsed.length>=3) {
        return (parsed[1] % 10 === 0) && (parsed[2] % 10 === 0);
    }
    return 0;
},

creepCheckEnemy: function(creep, sectorAttackers = [], myRooms){
    if (this.isHighway(creep.room.name)) return 0;
    if (creep.room.controller && creep.room.controller.my && creep.room.controller.level >= 3) return 0;
    
    var targets = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (object) => {
            return this.ownerNotInWhiteList(object.owner.username)
            && object.owner.username != 'Source Keeper' 
            //&& object.owner.username != 'Darking' 
            && object.owner.username != 'Montblanc'
            && object.owner.username != 'Kasami'
            && object.owner.username != 'lolaner'
            && !(object.owner.username == 'Invader' && object.name.startsWith('defender'))
            && (object.getActiveBodyparts(ATTACK) || object.getActiveBodyparts(RANGED_ATTACK) || object.getActiveBodyparts(HEAL) //|| object.getActiveBodyparts(CARRY) >= 10
            );}
    });
    if (!targets.length /*&& !(Game.time%100)*/) {
         targets = creep.room.find(FIND_HOSTILE_STRUCTURES).filter(s=>s.structureType == STRUCTURE_INVADER_CORE && s.level == 0);
    } else {
        if (0 && creep.memory.sector && targets[0].owner.username == 'Genovese' && (!Memory.sectorClosed || !Memory.sectorClosed[creep.memory.sector] || Game.time > Memory.sectorClosed[creep.memory.sector])) {
            if (targets[0].getActiveBodyparts(ATTACK) > 10 || targets[0].getActiveBodyparts(RANGED_ATTACK) > 10 || targets[0].getActiveBodyparts(HEAL) > 6) {
                if (!Memory.sectorClosed) {
                    Memory.sectorClosed = {};
                }
                Memory.sectorClosed[creep.memory.sector] = Game.time + 3000;
                if (Memory.claimRoomTasks[creep.memory.room][creep.room.name]) {
                    Memory.claimRoomTasks[creep.memory.room][creep.room.name] = undefined;
                }
                sectorCreepLive = _.filter(require('spawn').getGameCreeps(), (creepLive) => ['miner', 'supertransporter'].includes(creepLive.memory.role) && creepLive.memory.sector == creep.memory.sector && (creep.ticksToLive > 50 || creep.spawning));
                sectorCreepLive.forEach((creep) => {
                    let creepObj = Game.creeps[creep.name];
                    if (creepObj) {
                        if (creepObj.memory.role == 'miner') {
                            creepObj.drop(RESOURCE_ENERGY);
                        }
                        creepObj.memory.role = undefined;
                    }
                } );
                return targets.length;
            }
        }
    }
    
    if (targets.length){
        let sectorInfo = sectorAttackers[_.result(_.find(myRooms, {roomName: creep.memory.room}), 'atack_sector', 0)];
        if (sectorInfo && sectorInfo.place && sectorInfo.place.flag && !sectorInfo.disabled) {
            //console.log(creep.room.name, sectorInfo.place.room, sectorInfo.place.flag);
            Game.flags[sectorInfo.place.flag].setPosition(targets[0].pos);    
        } else {
            let sectors = [];
            sectorAttackers.forEach(sectorInfo => {
                if (sectorInfo.place != undefined && !sectorInfo.disabled){
                    sectors.push({distance: Game.map.getRoomLinearDistance(creep.room.name, sectorInfo.place.room), place: sectorInfo.place});
                }
            });
            if (sectors.length){
                sectors.sort(function (a,b){return a.distance-b.distance;});
                if (sectors[0].distance < 8 && Game.flags[sectors[0].place.flag]){
                    Game.flags[sectors[0].place.flag].setPosition(targets[0].pos);     
                }
            }    
        }
        
        var username = targets[0].owner.username;
        if (username != 'Invader' && !targets[0].structureType && ( targets[0].getActiveBodyparts(ATTACK) || targets[0].getActiveBodyparts(RANGED_ATTACK) || targets[0].getActiveBodyparts(HEAL) || targets[0].getActiveBodyparts(WORK))){
            if (username == 'Kasami') {
                
            } else {
                Game.notify(`User ${username} spotted_ in room ${creep.room} ${targets.length} creeps`);        
            }
            
        }
        console.log(creep.name, ' Look enemy in room ', this.getRoomLink(creep.room.name));
    }
    return targets.length;
},


processDepositHarvest: function(roomName, roomToFind, roomToHarvestDeposits) {
    
    

    if (!Memory.depositUsed) {
        Memory.depositUsed = {};
    }
    let depositRooms = roomToFind;
    const room = Game.rooms[roomName];
    if (!room){
        return;    
    }
    
    if (room.memory.depositRoomIndex == -1 && Game.time>room.memory.depositNextTickProcess){
         room.memory.depositRoomIndex = undefined;
     }
    
    
    if (room.memory.depositRoomIndex == undefined) {
        room.memory.depositRoomIndex = 0;
        room.memory.depositRoomObserved = undefined;
    }
    
    if (room.memory.observer == undefined){
        let observers = room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_OBSERVER }});
        if (observers.length) {
            room.memory.observer = observers[0].id;
        } else {
            room.memory.observer = 0;
        }
    }
    
    if (room.memory.depositRoomObserved >=0) {
        const targetRoom = Game.rooms[depositRooms[room.memory.depositRoomObserved]];
        if (targetRoom){
            if (Memory.mapVisual) Game.map.visual.circle(new RoomPosition(25,25,targetRoom.name),{fill: '0000ff', stroke: '#0000ff'});
            //console.log(room.name,'Searching deposit in room', targetRoom.name);
            const deposits = targetRoom.find(FIND_DEPOSITS, {
                filter: (d) => d.lastCooldown<100 && !Memory.depositUsed[d.id]
            })
            if (deposits.length) {
                console.log('Deposits!!!!!!!!!'+ targetRoom.name+ ' len '+deposits.length);
                const depositRoom = deposits[0].room.name;
                Memory.depositUsed[deposits[0].id] = depositRoom;
                
                //check free sides
                let freeSides = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {    
                        if (!dx && !dy) { continue;}
                        let pos = new RoomPosition(deposits[0].pos.x + dx, deposits[0].pos.y + dy, deposits[0].room.name);
                        let found = pos.lookFor(LOOK_TERRAIN);
                        if (found.length && found[0] != 'wall'){
                            freeSides++;
                        }
                    }
                }
                
                //find closest room;
                let roomBases = [];
                roomToHarvestDeposits.forEach(roomBase => {
                    roomBases.push({distance: Game.map.getRoomLinearDistance(depositRoom, roomBase), roomBase: roomBase});
                });
                if (roomBases.length){
                    roomBases.sort(function (a,b){return a.distance-b.distance;});
                    // Game.notify('Deposit found in room '+ depositRoom +' time to decay '+deposits[0].ticksToDecay+ ' lastCooldown ' + deposits[0].lastCooldown + ' baseRoom '+roomBases[0].roomBase);
                    if (Memory.depositWork == undefined){
                        Memory.depositWork = {};
                    }
                    if (Memory.depositWork[roomBases[0].roomBase] == undefined) {
                        Memory.depositWork[roomBases[0].roomBase] = {};
                    }
                    let baseRoomName = roomBases[0].roomBase;
                    Memory.depositWork[baseRoomName][deposits[0].id] = 
                        {baseRoom: baseRoomName, depositRoom: deposits[0].room.name, id: deposits[0].id, lastCooldown: deposits[0].lastCooldown, x: deposits[0].pos.x, y: deposits[0].pos.y, freeSides: freeSides, depositType: deposits[0].depositType};
                    let depoRoomName = deposits[0].room.name;
                    
                    require('role.deposit').defendDeposit(depoRoomName, baseRoomName, Memory.depositWork[baseRoomName][deposits[0].id]);
                }
            }
            
        } else {
            console.log('error finding deposits');
        } 
    }
    
    
    room.memory.depositRoomObserved = undefined;
    if (room.memory.depositRoomIndex >= 0 && room.memory.observer && (room.memory.depositNextTickProcess == undefined || Game.time>room.memory.depositNextTickProcess)){
        let observer = Game.getObjectById(room.memory.observer);
        if (observer) {
            if (observer.observeRoom(depositRooms[room.memory.depositRoomIndex]) == OK) {
                //console.log(room.name,'Observing room for deposits ', depositRooms[room.memory.depositRoomIndex]);
                room.memory.depositRoomObserved = room.memory.depositRoomIndex;
                room.memory.depositRoomIndex++;
                if (room.memory.depositRoomIndex > depositRooms.length-1) {
                    room.memory.depositRoomIndex = 0;
                    room.memory.depositNextTickProcess = Game.time+10;
                }
            }
        }
    } else {
        //console.log(room.name,'Next deposit room check in',room.memory.depositNextTickProcess-Game.time);
    }
    
},

processPowerHarvest: function(roomName, sector = 0, roomToFind = []) {
    if (!Memory.PowerBankUsed) {
        Memory.PowerBankUsed = {};
    }
    if (!Memory.depositUsed) {
        Memory.depositUsed = {};
    }
    let powerRooms = roomToFind;
    let flagName = 'FlagPower'+(sector?sector:'');
    const room = Game.rooms[roomName];
    if (!room){
        return;    
    }
    
    this.checkPowerRoomNeedHelp(room.name);
    
    if (room.memory.powerRoomIndex == -1 && Game.time>room.memory.powerNextTickProcess){
         room.memory.powerRoomIndex = undefined;
     }
    
    
    if (room.memory.powerRoomIndex == undefined) {
        room.memory.powerRoomIndex = 0;
        room.memory.powerRoomObserved = undefined;
    }
    
    if (room.memory.observer == undefined){
        let observers = room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_OBSERVER }});
        if (observers.length) {
            room.memory.observer = observers[0].id;
        } else {
            room.memory.observer = 0;
        }
    }
    
    if (room.memory.powerRoomObserved >=0) {
        const targetRoom = Game.rooms[powerRooms[room.memory.powerRoomObserved]];
        if (targetRoom){
            if (Memory.mapVisual) Game.map.visual.circle(new RoomPosition(25,25,targetRoom.name),{fill: 'ffff00', stroke: '#ff0000'});
            //Game.map.visual.circle(new RoomPosition(25,25,targetRoom.name));
            //console.log(room.name,'Searching powerBank in room', targetRoom.name, flagName);
            const powerBanks = targetRoom.find(FIND_STRUCTURES, {filter: function(structure) {return structure.structureType == STRUCTURE_POWER_BANK && structure.power > 2400 && (structure.ticksToDecay > 3600) ;}})
            if (powerBanks.length && Game.cpu.bucket > 2000 && !Memory.PowerBankUsed[powerBanks[0].id]){
                let res = powerBanks[0].pos.createFlag(flagName)
                if (res == ERR_NAME_EXISTS){
                    var res2 = Game.flags[flagName].setPosition(powerBanks[0].pos);     
                }
                console.log('flag return',res, res2);
                
                room.memory.powerRoomIndex = -1;
                room.memory.powerNextTickProcess = Game.time+4500; 
                room.memory.droppedPowerId = undefined; 
                room.memory.power = {id: powerBanks[0].id, room:powerBanks[0].room.name, power:powerBanks[0].power, pos: {x: powerBanks[0].pos.x, y: powerBanks[0].pos.y, roomName: powerBanks[0].pos.roomName}}; 
                Memory.PowerBankUsed[powerBanks[0].id] = Game.time;
                
                
                console.log('PowerBank found in room', powerBanks[0].room.name);
                //Game.notify('PowerBank found in room '+ powerBanks[0].room.name+' with power '+powerBanks[0].power+' time to decay '+powerBanks[0].ticksToDecay+' '+res+' '+res2);
            }
            
            // const deposits = targetRoom.find(FIND_DEPOSITS, {
            //     filter: (d) => /*!d.lastCooldown &&*/ !Memory.depositUsed[d.id]
            // })
            // console.log('Deposits!!!!!!!!!'+ targetRoom.name+ ' len '+deposits.length);
            // if (deposits.length) {
            //     const depositRoom = deposits[0].room.name;
            //     Memory.depositUsed[deposits[0].id] = depositRoom;
                
            //     let roomToHarvestDeposits = ['E81N54', 'E81N58', 'E79N52', 'E79N54', 'E85N57', 'E87N56', 'E81N53']; 
            //     //find closest room;
            //     roomBases = [];
            //     roomToHarvestDeposits.forEach(roomBase => {
            //         roomBases.push({distance: Game.map.getRoomLinearDistance(depositRoom, roomBase), roomBase: roomBase});
            //     });
            //     if (roomBases.length){
            //         roomBases.sort(function (a,b){return a.distance-b.distance;});
            //         Game.notify('Deposit found in room '+ depositRoom +' time to decay '+deposits[0].ticksToDecay+ ' baseRoom '+roomBases[0].roomBase);
            //         if (Memory.depositWork == undefined){
            //             Memory.depositWork = {};
            //         }
            //         if (Memory.depositWork[roomBases[0].roomBase] == undefined) {
            //             Memory.depositWork[roomBases[0].roomBase] = {};
            //         }
            //         Memory.depositWork[roomBases[0].roomBase][deposits[0].id] = {baseRoom: roomBases[0].roomBase, depositRoom: deposits[0].room.name, id: deposits[0].id, lastCooldown: 0, x: deposits[0].pos.x, y: deposits[0].pos.y };
            //     }
            // }
            
        } else {
            console.log('error finding powerbank');
        } 
    }
    
    
    room.memory.powerRoomObserved = undefined;
    if (room.memory.powerRoomIndex >= 0 && room.memory.observer && (room.memory.powerNextTickProcess == undefined || Game.time>room.memory.powerNextTickProcess)){
        let observer = Game.getObjectById(room.memory.observer);
        if (observer) {
            if (observer.observeRoom(powerRooms[room.memory.powerRoomIndex]) == OK) {
                //console.log(room.name,'Observing room for powers', powerRooms[room.memory.powerRoomIndex]);
                room.memory.powerRoomObserved = room.memory.powerRoomIndex;
                room.memory.powerRoomIndex++;
                if (room.memory.powerRoomIndex > powerRooms.length-1) {
                    room.memory.powerRoomIndex = 0;
                    room.memory.powerNextTickProcess = Game.time+10;
                }
            }
        }
    } else if (room.memory.powerNextTickProcess && Game.time <= room.memory.powerNextTickProcess) {
        let observer = Game.getObjectById(room.memory.observer);    
        let res = -99;
        let powerRoom = '';
        if (observer && room.memory.power && room.memory.power.room){
            powerRoom = Game.rooms[room.memory.power.room];
            if (!powerRoom) {
                res = observer.observeRoom(room.memory.power.room);        
            }
            //console.log(room.name,'looking power',room.memory.powerNextTickProcess-Game.time, res, powerRoom);
        }
        //console.log(room.name,'Next power room check in',room.memory.powerNextTickProcess-Game.time, res, powerRoom);

    }
    
},

warningMove: function(creep, target, caching = 1, radius = 1) {
    const detectEnemyRange = 20;
    let enemys = creep.room.find(FIND_HOSTILE_CREEPS, {
        filter:  (object) =>
            this.ownerNotInWhiteList(object.owner.username)
            && (object.getActiveBodyparts(ATTACK)>= 1 || object.getActiveBodyparts(RANGED_ATTACK)>= 1)
            && !(object.owner.username == 'Invader' && object.name.startsWith('defender'))
    });
    //creep.say(enemys.length);
    let enemyHash = '';
    let rangeToEnemy = null;
    let freshMatrix = false;
    if (creep.memory.freshMatrix) {
        freshMatrix = true;
        creep.memory.freshMatrix = undefined;
    }
    if (enemys.length) {
        rangeToEnemy = creep.pos.getRangeTo(creep.pos.findClosestByRange(enemys));
        enemyHash =  enemys.reduce((a, enemy) => {return ''+a+enemy.pos.x+enemy.pos.y}, '');
        //console.log(enemyHash);
        if (rangeToEnemy < detectEnemyRange) {
            if (global.matrix && global.matrix[creep.room.name] && global.matrix[creep.room.name].hash == enemyHash && creep.memory.enemyHash == enemyHash && rangeToEnemy > 3) {
                //enemy no move. going without repath
                rangeToEnemy = detectEnemyRange;
                //console.log('enemy no move!!!!!!!!!!');
            }
        }
    }
    if (!enemys.length ||  rangeToEnemy>= detectEnemyRange){
        let ret = creep.travelTo(target, {range: radius, ignoreRoads: true, allowSK: true, useFindRoute: creep.memory.noFindRoute?false:undefined, freshMatrix: freshMatrix, // allowHostile: true, maxOps: 100000, ensurePath: true, returnData: obj, useFindRoute: false,//Memory.retTest,
            roomCallback: (roomName, matrix) => {
                if (global.matrix && global.matrix[roomName] && global.matrix[roomName].costs) {
                    global.matrix[roomName].time = Game.time;
                    //console.log(roomName, 'cached');
                    return global.matrix[roomName].costs;
                } else {
                    //console.log(roomName, 'NOT chached');
                    return matrix;
                }
            }
        });
        if (ret == ERR_INVALID_ARGS) {
            creep.memory.noFindRoute = 1;
            creep.memory.freshMatrix = 1;
        }
        return ret;
    } else {
        creep.say(enemys.length+' '+creep.pos.getRangeTo(creep.pos.findClosestByRange(enemys)));
        //creep.memory._trav = undefined;
        creep.memory.enemyHash = enemyHash;
        let ret = creep.travelTo(target, {range: radius, ignoreRoads: true, allowSK: true, repath: 1, useFindRoute: creep.memory.noFindRoute?false:undefined, freshMatrix: freshMatrix,
            roomCallback: (roomName, matrix) => {
                //console.log(roomName, 'call');
                if(roomName == creep.room.name) {
                    if (global.matrix && global.matrix[roomName] && global.matrix[roomName].time == Game.time) {
                        return global.matrix[roomName].costs;
                    }
                    
                    let matrixChanged = false;
                    const terrain = new Room.Terrain(roomName);
                    const roomStructures = creep.room.find(FIND_STRUCTURES);
                    let enemys = creep.room.find(FIND_HOSTILE_CREEPS, {
                        filter:  (object) =>
                            this.ownerNotInWhiteList(object.owner.username)
                            && (object.getActiveBodyparts(ATTACK)>= 1 || object.getActiveBodyparts(RANGED_ATTACK)>= 1)
                            && !(object.owner.username == 'Invader' && object.name.startsWith('defender'))
                    });
                    enemys.forEach(function(enemyCreep) {
                        let sd = enemyCreep.getActiveBodyparts(RANGED_ATTACK)?8:(enemyCreep.getActiveBodyparts(ATTACK)?4:0);
                        let melee = false;
                        if (sd == 4) {
                            melee = true;
                        }
                        if (enemyCreep.owner.username == 'Source Keeper') {
                            sd = 3;
                        }
                        if (sd){
                            for (dx= -sd;dx<=sd;dx++){
                                for (dy=-sd;dy<=sd;dy++){
                                    const x = enemyCreep.pos.x+dx;
                                    const y = enemyCreep.pos.y+dy;
                                    let place = terrain.get(x,y);
                                    if (place !== TERRAIN_MASK_WALL){
                                        let structures = _.filter(roomStructures, (struct) => struct.pos && struct.pos.isEqualTo(x,y));
                                        let weight = 50;
                                        let visualRadius = 0.05;
                                        if (melee && Math.abs(dx) <= 2 && Math.abs(dy) <= 2) {
                                            weight = 100;
                                            visualRadius = 0.20;
                                        }
                                        if (!structures.length || (structures.length == 1 && structures[0].structureType == STRUCTURE_ROAD )) {
                                            if (place == TERRAIN_MASK_SWAMP) {
                                                matrix.set(x, y, weight+100);
                                                if (!Memory.production) creep.room.visual.circle(x, y, {radius: visualRadius+0.1});
                                            } else {
                                                matrix.set(x, y, weight);
                                                if (!Memory.production) creep.room.visual.circle(x, y, {radius: visualRadius});
                                            }
                                            matrixChanged = true;
                                        }
                                    }
                                }
                            }
                        }
                    });
                    if (matrixChanged) {
                        if (!global.matrix) {global.matrix = {};}
                        
                        global.matrix[roomName] = {time:Game.time, costs: matrix.clone(), hash: enemyHash}; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        
                        //console.log(roomName, 'SAVE chache');
                        return matrix;
                    } else {
                        //console.log(roomName, 'NOT chached2');
                        return matrix;
                        return true;
                    }
                } else {
                    if (global.matrix && global.matrix[roomName] && global.matrix[roomName].costs) {
                        global.matrix[roomName].time = Game.time;
                        //console.log(roomName, 'chached');
                        return global.matrix[roomName].costs;
                    } else {
                        //console.log(roomName, 'NOT chached');
                        return matrix;
                    }
                }
                
            },
        }); 
        if (ret == ERR_INVALID_ARGS) {
            creep.memory.noFindRoute = 1;
            creep.memory.freshMatrix = 1;
        }
    }
    return;
    // let enemys = creep.room.find(FIND_HOSTILE_CREEPS, {
    //     filter:  (object) =>
    //         this.ownerNotInWhiteList(object.owner.username)
    //         && (object.getActiveBodyparts(ATTACK)>= 1 || object.getActiveBodyparts(RANGED_ATTACK)>= 1)
    // });
    // creep.say(enemys.length);
    // if (creep.memory.forceWarningMoveCount) {
    //     creep.memory.forceWarningMoveCount--;
    // }
    // if (!enemys.length && !creep.memory.forceWarningMoveCount){
    //     creep.memory.warningMove = undefined;
    //     return this.smartMove(creep, pos, caching, radius);
    // } else {
    //     let enemy = creep.pos.findClosestByRange(enemys);
    //     let closestEnemyRange = creep.pos.getRangeTo(enemy);
    //     creep.say(enemys.length+' '+closestEnemyRange);
    //     if (1 || creep.memory.forceWarningMoveCount || closestEnemyRange <= 10){
    //         creep.memory._trav = undefined;
    //         if (!creep.memory.forceWarningMoveCount) {
    //             creep.memory.forceWarningMoveCount = 5;    
    //         }
    //         return creep.moveTo(pos, {reusePath: 0, range: radius, visualizePathStyle: { stroke: '#ff0000'},
    //             costCallback: function(roomName, costMatrix) {
    //                 if(roomName == creep.room.name) {
    //                     const terrain = new Room.Terrain(roomName);
    //                     const roomStructures = creep.room.find(FIND_STRUCTURES);
    //                     enemys.forEach(function(enemyCreep) {
    //                         let sd = 4;//enemyCreep.getActiveBodyparts(ATTACK)?2:(enemyCreep.getActiveBodyparts(RANGED_ATTACK)?1:0);
    //                         if (sd){
    //                             for (dx= -sd;dx<=sd;dx++){
    //                                 for (dy=-sd;dy<=sd;dy++){
    //                                     const x = enemyCreep.pos.x+dx;
    //                                     const y = enemyCreep.pos.y+dy;
    //                                     let place = terrain.get(x,y);
    //                                     if (place !== TERRAIN_MASK_WALL){
    //                                         let structures = _.filter(roomStructures, (struct) => struct.pos && struct.pos.isEqualTo(x,y));
    //                                         if (!structures.length || (structures.length == 1 && structures[0].structureType == STRUCTURE_ROAD )) {
    //                                             costMatrix.set(x, y, 50);
    //                                             creep.room.visual.circle(x, y, {radius: 0.15});
    //                                         }
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     });
    //                 }
    //             },
    //         });
    //     } else {
    //         creep.memory.warningMove = undefined;
    //         return this.smartMove(creep, pos, caching, radius);    
    //     }
    // }
},


isPortalRoom: function(roomName) {
        let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
        let fMod = parsed[1] % 10;
        let sMod = parsed[2] % 10;
        let isPR = (fMod === 0 && sMod === 0) || (fMod === 5 && sMod === 5);
        return isPR;
},

isCrossRoad: function(roomName) {
        let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
        let fMod = parsed[1] % 10;
        let sMod = parsed[2] % 10;
        let isCR = (fMod === 0 && sMod === 0);
        return isCR;
},

smartMove: function(creep, target, caching = 1, radius = 1, options = {}) { 
    
    if (0 && creep.room.memory.ps == undefined) { //avoid portal this.isPortalRoom(creep.room.name) && 
        let ps = packCoordList(creep.room.find(FIND_STRUCTURES).filter(s=>s.structureType == STRUCTURE_PORTAL).map(s=>s.pos));
        creep.room.memory.ps = ps
        if (ps) {
            creep.memory._trav = undefined;
        }
        console.log('new room portal update', this.getRoomLink(creep.room.name));
    }
    
    if (1 && creep.memory.warningMove) {
        
        return this.warningMove(creep, target, caching, radius);
    }
    
    if (options.range == undefined) {
        options.range =  radius;
    }
    
    if (creep.memory.role == 'hwd') {
        options.freshMatrix = true;
    }
    if (['pair', 'massRanger', 'puller','scoreCollector','pull','scoreDeliver','roadRepairer','intershard','hwd','hunter'].includes(creep.memory.role) || creep.memory.ignoreRoads) {
        options.ignoreRoads = true;
    }
    if (['pair', 'massRanger','settler','quad','manual_claim','collector','claim','hwd'].includes(creep.memory.role) || creep.memory.allowSK) {
        options.allowSK = true;
    }
    if (creep.name.startsWith('wall')) {
        options.allowSK = true;
    }
    if (['pull','hwd'].includes(creep.memory.role) || creep.memory.freshMatrix) {
        options.freshMatrix = true;
    }
    if (['signer'].includes(creep.memory.role) || creep.memory.ensure || creep.memory.ensurePath) {
        options.ensurePath = true;
    }
    if (creep.memory.offRoad) {
        options.offRoad = true;
    }
    
    if (Game.shard.name == 'shard3' && creep.memory.role == 'manualBuilder') {
        options.preferHighway = true;
    }
    if (creep.memory.preferHighway) {
        options.preferHighway = true;
    }
    if (creep.memory.ignoreCreeps != undefined && !creep.memory.ignoreCreeps && options.ignoreCreeps === undefined) {
        options.ignoreCreeps = false;
    }
    
    
    return creep.travelTo(target, options);    
},

processStrongholdCheck: function(roomName, strongholdCheckInfo) {
    //console.log('dddddddddddddddddddddddddddddddddddddddddd',roomName);
    const room = Game.rooms[roomName];
    if (!room){
        return;    
    }
    if (!room.memory.strongholdInfo) {
        room.memory.strongholdInfo = {};
    }
    
    if (room.memory.strongholdRoomIndex == -1 && Game.time>room.memory.strongholdNextTickProcess){
         room.memory.strongholdRoomIndex = undefined;
     }
    
    
    if (room.memory.strongholdRoomIndex == undefined) {
        room.memory.strongholdRoomIndex = 0;
        room.memory.strongholdRoomObserved = undefined;
    }
    
    if (room.memory.observer == undefined){
        let observers = room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_OBSERVER }});
        if (observers.length) {
            room.memory.observer = observers[0].id;
        } else {
            room.memory.observer = 0;
        }
    }
    if (room.memory.strongholdRoomObserved === undefined && room.memory.strongholdNextTickProcess && room.memory.strongholdNextTickProcess > Game.time) {
        //console.log(room.name, 'Stronghold_ check in ', room.memory.strongholdNextTickProcess - Game.time, 'tick');
        return;
    } else {
        //console.log('room.memory.strongholdRoomObserved', room.memory.strongholdRoomObserved,room.memory.strongholdNextTickProcess,room.memory.strongholdNextTickProcess - Game.time, 'tick');
    }
    
    const strongholdRooms = strongholdCheckInfo.rooms;
    if (room.memory.strongholdInfo.state) {
        room.memory.strongholdRoomObserved = undefined;
        const targetRoom = Game.rooms[room.memory.strongholdInfo.room];
        if (targetRoom) {
            if (Memory.mapVisual) Game.map.visual.circle(new RoomPosition(25,25,targetRoom.name));
            const stronghold = Game.getObjectById(room.memory.strongholdInfo.id);
            if (stronghold) {
                 if (room.memory.strongholdInfo.state == 'coming' &&  stronghold.effects.length && stronghold.effects[0].effect == EFFECT_COLLAPSE_TIMER) {
                     room.memory.strongholdInfo.state = 'exist';
                     room.memory.strongholdInfo.pointTime = Game.time + stronghold.effects[0].ticksRemaining;
                     Game.notify('Stronghold change state '+Game.shard.name+ ' '+ JSON.stringify(room.memory.strongholdInfo));
                 }
                 
                 if (room.memory.strongholdInfo.state == 'exist') {
                     room.memory.strongholdNextTickProcess = Game.time + (room.memory.strongholdInfo.level == 5 ? 1000 : 100);
                 } else if (room.memory.strongholdInfo.state == 'coming') {
                     room.memory.strongholdNextTickProcess = room.memory.strongholdInfo.pointTime;
                 } else if (room.memory.strongholdInfo.state == 'destroyed') {
                     room.memory.strongholdNextTickProcess = room.memory.strongholdInfo.pointTime;
                 }
            } else {
                //look position
                const pos = new RoomPosition(room.memory.strongholdInfo.pos.x, room.memory.strongholdInfo.pos.y, room.memory.strongholdInfo.pos.roomName);
                const found = pos.lookFor(LOOK_RUINS);
                let destroyed = false;
                if(found.length) {
                    found.forEach(function(ruin) {
                        if (ruin.structure && ruin.structure.structureType == STRUCTURE_INVADER_CORE) {
                            destroyed = true;
                            room.memory.strongholdInfo.id = ruin.id;
                        }
                    });
                }
                if (destroyed) {
                    room.memory.strongholdInfo.state = 'destroyed';
                    Game.notify('Stronghold destroyed '+Game.shard.name+ ' '+ JSON.stringify(room.memory.strongholdInfo));
                } else {
                    Game.notify('Stronghold disappeared '+Game.shard.name+ ' '+ JSON.stringify(room.memory.strongholdInfo));
                    if (Memory.rooms[room.memory.strongholdInfo.room] && Memory.rooms[room.memory.strongholdInfo.room].avoid > 1) {
                        delete Memory.rooms[room.memory.strongholdInfo.room].avoid;
                    }
                    room.memory.strongholdInfo = {};
                }
            }
            
        } else {
            let observer = Game.getObjectById(room.memory.observer);
            if (observer) {
                observer.observeRoom(room.memory.strongholdInfo.room);
            }
        }
    } else {
        if (room.memory.strongholdRoomObserved >=0) {
            const targetRoom = Game.rooms[strongholdRooms[room.memory.strongholdRoomObserved]];
            if (targetRoom){
                if (targetRoom.memory.avoid == 2) {
                    targetRoom.memory.avoid = undefined;
                }
                
                if (Memory.mapVisual) Game.map.visual.circle(new RoomPosition(25,25,targetRoom.name));
                console.log(room.name,'Searching stronghold in room', targetRoom.name);
                const strongholds = targetRoom.find(FIND_HOSTILE_STRUCTURES, {filter: function(structure) {return structure.structureType == STRUCTURE_INVADER_CORE && structure.level > 0;}});
                if (strongholds.length) {
                    const stronghold = strongholds[0];
                    room.memory.strongholdInfo.id = stronghold.id;
                    room.memory.strongholdInfo.level = stronghold.level;
                    room.memory.strongholdInfo.room = targetRoom.name;
                    room.memory.strongholdInfo.pos = {x: stronghold.pos.x, y: stronghold.pos.y, roomName: stronghold.pos.roomName}; 
                    if (stronghold.effects.length && stronghold.effects[0].effect == EFFECT_COLLAPSE_TIMER) {
                        room.memory.strongholdInfo.state = 'exist';
                        room.memory.strongholdInfo.pointTime = Game.time + 100; //stronghold.effects[0].ticksRemaining;
                        room.memory.strongholdNextTickProcess = room.memory.strongholdInfo.pointTime;
                        room.memory.strongholdRoomIndex = 0;
                    }
                    if (stronghold.effects.length && stronghold.effects[0].effect == EFFECT_INVULNERABILITY) {
                        room.memory.strongholdInfo.state = 'coming';
                        room.memory.strongholdInfo.pointTime = Game.time + stronghold.effects[0].ticksRemaining;
                        room.memory.strongholdNextTickProcess = room.memory.strongholdInfo.pointTime;
                        room.memory.strongholdRoomIndex = 0;
                    }
                } else {
                    const strongholdsRuin = targetRoom.find(FIND_RUINS, {filter: function(ruin) {return ruin.structure && ruin.structure.structureType == STRUCTURE_INVADER_CORE;}});
                    if (strongholdsRuin.length) {
                        const strongholdRuin = strongholdsRuin[0];
                        room.memory.strongholdInfo.state = 'destroyed';
                        room.memory.strongholdInfo.id = strongholdRuin.id;
                        room.memory.strongholdInfo.level = undefined;
                        room.memory.strongholdInfo.room = targetRoom.name;
                        room.memory.strongholdInfo.pos = {x: strongholdRuin.pos.x, y: strongholdRuin.pos.y, roomName: strongholdRuin.pos.roomName}; 
                        room.memory.strongholdInfo.pointTime = Game.time + strongholdRuin.ticksToDecay;
                        room.memory.strongholdNextTickProcess = room.memory.strongholdInfo.pointTime;
                    }
                }
                if (room.memory.strongholdInfo.state) {
                    Game.notify('Stronghold found '+Game.shard.name+ ' '+ JSON.stringify(room.memory.strongholdInfo));
                    return;
                }
            }
        }
                    
        room.memory.strongholdRoomObserved = undefined;
        if (room.memory.strongholdRoomIndex >= 0 && room.memory.observer && (room.memory.strongholdNextTickProcess == undefined || Game.time>room.memory.strongholdNextTickProcess)){
            let observer = Game.getObjectById(room.memory.observer);
            if (observer) {
                if (observer.observeRoom(strongholdRooms[room.memory.strongholdRoomIndex]) == OK) {
                    console.log(room.name,'Observing room for stronghold', strongholdRooms[room.memory.strongholdRoomIndex]);
                    room.memory.strongholdRoomObserved = room.memory.strongholdRoomIndex;
                    room.memory.strongholdRoomIndex++;
                    if (room.memory.strongholdRoomIndex > strongholdRooms.length-1) {
                        room.memory.strongholdRoomIndex = 0;
                        room.memory.strongholdNextTickProcess = Game.time+350;
                    }
                }
            }
        }         
    }
    
    
}, 

strongholdStateProcess: function(strongholdCheck, myRooms, sectorAttackers, sectorCreeps, skRooms) {
    for (let roomName in strongholdCheck ) {
        const room = Game.rooms[roomName];
        if (room && room.memory.strongholdInfo) {
            if (room.memory.strongholdInfo.state == 'destroyed' && (room.memory.strongholdInfo.pointTime - Game.time) > 600 ) {
                for (let sector of sectorAttackers) {
                    if (sector.qwadrant != undefined && sector.qwadrant === strongholdCheck[roomName].qwadrant) {
                        sector.creeps = {};
                         //console.log('disable atackers', JSON.stringify(sector));
                    } else {
                         //console.log('enable atackers', JSON.stringify(sector));
                    }
                }
            }
            if (room.memory.strongholdInfo.state != 'destroyed' && room.memory.strongholdInfo.level <= 3 && room.memory.strongholdInfo.atackedRes != 100) {
                //doing atack
                if (room.memory.strongholdInfo.createAtackAttempts == undefined) {
                    room.memory.strongholdInfo.createAtackAttempts = 0;
                }
                room.memory.strongholdInfo.createAtackAttempts ++;
                if (room.memory.strongholdInfo.createAtackAttempts < 130) {
                    let atakerRoom = strongholdCheck[roomName].atackerRoom;
                    if (atakerRoom) {
                        room.memory.strongholdInfo.atackedRes = require('role.hwDefenders').createSquad(atakerRoom, room.memory.strongholdInfo.room);
                    } else {
                        room.memory.strongholdInfo.createAtackAttempts = 158;
                        room.memory.strongholdInfo.atackedRes = 'no attack room';
                    }
                } else {
                    if (room.memory.strongholdInfo.createAtackAttempts < 160) {
                        Game.notify('cannot create atack order to Stronghold ' + roomName + ' ' + room.memory.strongholdInfo.room + 'ret ' + room.memory.strongholdInfo.atackedRes);    
                    }
                }
            }
            
            if (room.memory.strongholdInfo.state != 'destroyed' && room.memory.strongholdInfo.level == 4 && room.memory.strongholdInfo.atackedRes != 100) {
                room.memory.strongholdInfo.atackedRes = 100;
                Game.notify('need manual atack on Stronghold lvl 4 in room ' + room.memory.strongholdInfo.room);
            }
            
            
            if (room.memory.strongholdInfo.level >= 4 && (room.memory.strongholdInfo.state == 'exist' || (room.memory.strongholdInfo.state == 'coming') && (room.memory.strongholdInfo.pointTime - Game.time) < 1800)) {
                const stRoom = room.memory.strongholdInfo.room;
                if (!Memory.rooms[stRoom]) {
                    Memory.rooms[stRoom] = {};
                }
                if (!Memory.rooms[stRoom].avoid) {
                    Memory.rooms[stRoom].avoid = 2;
                }
                
                
                if (!this.disabedStrongholdsSectors) {
                    this.disabedStrongholdsSectors = {};
                }
                
                if (this.disabedStrongholdsSectors[stRoom] == undefined) {
                    let disableSectors = _.filter(sectorCreeps, sector=>sector.rooms && sector.rooms.includes(stRoom)).map(sector => sector.id);
                    let roomsChangeSectors = [];
                    if (disableSectors.length) {
                        console.log(stRoom,'disable sectors:', disableSectors);
                        roomsChangeSectors = myRooms.filter(roomInfo => roomInfo.sector && disableSectors.some(sectorId=> roomInfo.sector.includes(sectorId))).map(roomInfo=>roomInfo.roomName);
                        console.log(stRoom,'rooms changed:', roomsChangeSectors);
                        
                    }
                    let disableSkKeepers = _.filter(skRooms, sector=>sector.rooms && sector.rooms.includes(stRoom)).map(sector => sector.id);
                    let roomsChangeSkKeepers = [];
                    if (disableSkKeepers.length) {
                        console.log(stRoom,'disable SkKeepers:', disableSkKeepers);
                        roomsChangeSkKeepers = myRooms.filter(roomInfo => roomInfo.keepers && disableSkKeepers.some(sectorId=> roomInfo.keepers.includes(sectorId))).map(roomInfo=>roomInfo.roomName);
                        console.log(stRoom,'rooms changed:', roomsChangeSkKeepers);
                    }
                    let roomsChange = [];
                    _.union(roomsChangeSectors, roomsChangeSkKeepers).forEach(roomName => {
                        let index = _.findIndex(myRooms, {roomName:roomName});
                        let obj = {
                            index: index,
                            roomName: roomName,
                            sector: _.filter(myRooms[index].sector, sector => !disableSectors.includes(sector)),
                            keepers: _.filter(myRooms[index].keepers, sector => !disableSkKeepers.includes(sector)),
                        }
                        roomsChange.push(obj);
                    })
                    
                    if (roomsChange.length) {
                        this.disabedStrongholdsSectors[stRoom] = roomsChange;
                    } else {
                        this.disabedStrongholdsSectors[stRoom] = 0;
                    }
                }
                
                if (this.disabedStrongholdsSectors[stRoom]) {
                    //console.log(JSON.stringify(this.disabedStrongholdsSectors[stRoom]));
                    this.disabedStrongholdsSectors[stRoom].forEach(replaceInfo =>{
                        if (myRooms[replaceInfo.index].roomName == replaceInfo.roomName){
                            myRooms[replaceInfo.index].sector = replaceInfo.sector.slice(0);
                            myRooms[replaceInfo.index].keepers = replaceInfo.keepers.slice(0);
                            //console.log(JSON.stringify(myRooms[replaceInfo.index]));
                            if (!(Game.time%20)) {
                                console.log('changing SK sector '+ room.memory.strongholdInfo.room+ ' base room '+ replaceInfo.roomName);
                            }
                        }
                    })
                }
                
                
                
                let changing = true;
                if (['shard0','shard2'].includes(Game.shard.name)) {
                    let changeInfo = require(Game.shard.name+'.cfg').changeCfgForStronghold(stRoom, myRooms, sectorAttackers);
                    if (changeInfo) {
                        [myRooms, sectorAttackers] = changeInfo;
                    } else {
                        changing = false;    
                    }
                } else {
                    changing = false;
                }
                
                if (changing) {
                    if (!(Game.time%20)) console.log('changing SK sector MANUAL '+ room.memory.strongholdInfo.room);
                }
            }                
        }
    }
},
    


checkPowerRoomNeedHelp: function(baseRoom) {
    const homeRoom = Game.rooms[baseRoom];
    if (!homeRoom || !homeRoom.memory.power || !homeRoom.memory.power.room) {
        return;
    }
    this.checkHighWayRoomNeedHelp(baseRoom, homeRoom.memory.power.room);
},

checkHighWayRoomNeedHelp: function(baseRoom, checkRoom) {
    if (!Memory.massRangers) {
        Memory.massRangers = {};
    }
    if (Memory.massRangers[checkRoom]) return;
    const room = Game.rooms[checkRoom];
    if (!room) return;
    
    //console.log('checkHighWayRoomNeedHelp', room.name);
    
    // Find all hostile actions against your creeps and structures
    let eventLog = room.getEventLog();
    let attackEvents = _.filter(eventLog, {event: EVENT_ATTACK});
    attackEvents.forEach(event => {
        let target = Game.getObjectById(event.data.targetId);
        if(target && target.my && event.data.attackType != EVENT_ATTACK_TYPE_HIT_BACK) {
            let enemy = Game.getObjectById(event.objectId);
            let user = 'Unknown';
            if (enemy && enemy.owner) {
                user = enemy.owner.username;
            }
            if (user == 'Screeps') {
                return;
            }
            
            //!!todo check body boost
            let boosted = 0;
            let count = 2;
            let body = null;
            let boosts = null;
            let labBoosts = null;
            let ticks = 1800;
            let escalate = 1;
            let nwa = 1;
            if (user == 'wjx123xxx') {
                boosted = 1;
                count = 1;
                body = [  //25 23 2
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                HEAL,HEAL];
                boosts = [RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
                ticks = 1000;
                escalate = 0;
            }
            if (user == 'wtfrank') {
                count = 3;
            }
            if (user == 'slowmotionghost' || ['E30N10','E31N10','E32N10','E33N10','E34N10','E35N10','E36N10','E37N10','E38N10','E39N10',].includes(room.name)) {
                boosted = 1;
                count = 2;
                escalate = 0;
                ticks = 1000;
            }
            if (user == 'SBense' || [].includes(room.name)) {
                boosted = 1;
                count = 2;
                escalate = 0;
                ticks = 4500;
                body = [
                    TOUGH,TOUGH,TOUGH,TOUGH,
                    RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                    ];
                //labBoosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,RESOURCE_CATALYZED_GHODIUM_ALKALIDE,RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE];//, , RESOURCE_CATALYZED_UTRIUM_ACID];
                boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE,RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE];
                Game.notify('Attension! SBense attacked. Need configure escalate. '+room.name);
            }
            
            
            if (user == 'asdpof' || ['E50N40','E50N41',].includes(room.name)) {
                boosted = 1;
                count = 1;
                escalate = 0;
                ticks = 1000;
            }

            if (user == '6g3y' || ['E41S10','E42S10','E43S10','E44S10','E45S10','E46S10','E47S10','E48S10'].includes(room.name)) {
                boosted = 1;
                count = 2;
                escalate = 0;
                ticks = 4500;
            }
            
            if (user == 'Ruto' || [].includes(room.name)) {
                boosted = 1;
                count = 4;
                escalate = 0;
                ticks = 4500;
            }
            
            
            console.log('PALUNDRAAAAAAAAAAAAAAAAAAAA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',room.name, JSON.stringify(event));
            Game.notify('creep atacked by '+user+' in highway room '+checkRoom+' '+ JSON.stringify(event));
            
            if (!labBoosts && boosts) {
                labBoosts = boosts.slice();
            }
            
            if (boosted) {
                let room = Game.rooms[baseRoom];
                if (room && room.memory) {
                    if (labBoosts) {
                        if (!this.checkLabsBoosts(room.name, labBoosts)) {
                            room.memory.boostLab = {boosts:labBoosts, time:Game.time + ticks+300};        
                        }
                    } else {
                        let defaultBoosts = [RESOURCE_CATALYZED_GHODIUM_ALKALIDE,RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE];
                        if (!this.checkLabsBoosts(room.name, defaultBoosts)) {
                            room.memory.boostLab = {boosts: defaultBoosts, time:Game.time + ticks+300};    
                        }
                    }
                }
            }
            Memory.massRangers[checkRoom] = {room:baseRoom, count: count, time:Game.time + ticks, boosted: boosted, body: body, boosts: boosts, escalate: escalate, nwa: nwa};
            room.find(FIND_MY_CREEPS).forEach(creep => creep.say('😫', 1));
            return;
            //Game.rooms.E42N31.memory.boostLab = {boosts: [RESOURCE_CATALYZED_KEANIUM_ALKALIDE], time: Game.time+300};Memory.massRangers['E42N31'] = {room:'E42N31', count: 1, time:Game.time + 300, boosted: 1, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, MOVE, RANGED_ATTACK,], boosts: [RESOURCE_CATALYZED_KEANIUM_ALKALIDE]};
            // Memory.massRangers['E57N31'] = {room:'E55N31', count: 1, time:Game.time + 20000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], boosts: []};
            // Memory.massRangers['E58N32'] = {room:'E55N31', count: 1, time:Game.time + 20000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], boosts: []};
            // Memory.massRangers['E58N33'] = {room:'E55N31', count: 1, time:Game.time + 20000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], boosts: []};
            // Memory.rooms.E57N32 = {};Memory.rooms.E57N32.avoid = 1;
            
        }
    });
},

checkNuke: function(roomName) {
    const room = Game.rooms[roomName];
    if (!room) return;
    const nukes = room.find(FIND_NUKES);
    if (nukes.length) {
        Game.notify('Nuclear launch detected in room '+ roomName);
    }
},
                        
ownerNotInWhiteList: function(owner){
    const whiteList = ['Darking_','avp2501','TANEdos','claptan'];
    let success = true;
    whiteList.forEach(user=>{
        if (owner == user) {
            success = false;
        }
    });
    return success;
},

sleep: function(creep) {
    if (creep.memory.sleep) {
        if (Game.time < creep.memory.sleep) {
            if (!(Game.time%5) && !Memory.production){
                creep.say('zZ');//+(creep.memory.sleep-Game.time));    
            }
            if (creep.memory.role == 'supertransporter') {
                creep.say('s'+(creep.memory.sleep-Game.time));
            }
            return 1;
        } else {
            creep.memory.sleep = undefined;
        }
    }
    return 0;
},

dataRecycler: function(){
    
    
    if (!(Game.time%20)){ 
        require('profiler').start('updateAttachOfSource');
        this.updateAttachOfSource();
        require('profiler').end('updateAttachOfSource');
    }
    
    if (!(Game.time%20)){ 
        require('profiler').start('clearingCreepMem');
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                //console.log('Clearing non-existing creep memory:', name);
            }
        }
        require('profiler').end('clearingCreepMem');
    }

    
    if (!(Game.time%2000) && Memory.paths){ //once in 2000 tick path recycler
        const beforeCount = _.size(Memory.paths);
        let count = 0;
        for(let hash in Memory.paths) {
            const pathInfo = JSON.parse(Memory.paths[hash]);
            
            if (!pathInfo.t || pathInfo.t < Game.time - 2500){
                delete Memory.paths[hash];
                count++;
            }
        }
        console.log('Paths clearing from '+beforeCount+' to '+_.size(Memory.paths)+' del count '+count);
        let pathBorder = 0.6;
        while (_.size(Memory.paths) > 800) {
            const beforeCount = _.size(Memory.paths);
            let count = 0;
            for(let hash in Memory.paths) {
                const pathInfo = JSON.parse(Memory.paths[hash]);
                if (!pathInfo.c || pathInfo.c < pathBorder){
                    delete Memory.paths[hash];
                    count++;
                }
            }
            console.log('Paths clearing from '+beforeCount+' to '+_.size(Memory.paths)+' del count '+count+' border '+pathBorder);
            pathBorder += 0.1;
        }
        
        //Game.notify('Paths clearing from '+beforeCount+' to '+_.size(Memory.paths)+' del count '+count);
    }
    if (0 && !(Game.time%2000) && global.paths){ //once in 2000 tick path recycler
        const beforeCount = _.size(global.paths);
        let count = 0;
        for(let hash in global.paths) {
            const pathInfo = JSON.parse(global.paths[hash]);
            if (!pathInfo.t || pathInfo.t < Game.time - 5000){
                delete global.paths[hash];
                count++;
            }
        }

        //Game.notify('Paths clearing from '+beforeCount+' to '+_.size(Memory.paths)+' del count '+count);
    }

    if (1 && !(Game.time%100) && global.matrix){ //once in 2000 tick matrix recycler
        for(let roomName in global.matrix) {
            const matrixInfo = global.matrix[roomName];
            if (!matrixInfo.time || matrixInfo.time < Game.time - 200){
                delete global.matrix[roomName];
            }
        }
    }



    // for(let hash in Memory.paths) {    
    //     if (Memory.paths[hash].cpuUsed > 2) {
    //         console.log(hash, Memory.paths[hash].cpuUsed, Memory.paths[hash].used);
    //     }
    //     if (!Memory.paths[hash].path) {
    //         console.log(hash, Memory.paths[hash].cpuUsed, 'No Path!!');
    //     }
    // }
    
    
    

    if (!(Game.time%50000) && Memory.paths){ //once in 5000 tick clear path
        Memory.paths = {};  //clear all paths
        global.paths = {};
        //Game.notify('All Paths cleared');
    }
    
    
    if (0) {
        //all clear
        Memory.bucketHistory = [];
        Memory.paths = {};  //clear all paths
        Memory.marketHistory = [];
    }
    
    if (1 && Memory.highWayDefenders && !(Game.time%2000)) {
        for (let hwRoom in Memory.highWayDefenders) {
            for (let hwGroup in Memory.highWayDefenders[hwRoom]) {
                let hwGroupInfo = Memory.highWayDefenders[hwRoom][hwGroup];
                if (hwGroupInfo.spawnTime < Game.time - 35000 ) {
                    console.log('need delete', hwRoom, hwGroup, Game.time-hwGroupInfo.spawnTime);
                    delete Memory.highWayDefenders[hwRoom][hwGroup];
                }
            }
        }
    }
    if (1 && Memory.depositWork && !(Game.time%2000)) { 
        for (let dpRoom in Memory.depositWork) {
            for (let dp in Memory.depositWork[dpRoom]) {
                let dpInfo = Memory.depositWork[dpRoom][dp];
                if (dpInfo.closed && dpInfo.lastCooldown < 100 && !dpInfo.closedTime) {
                    dpInfo.closedTime = Game.time;
                }
                if (dpInfo.closedTime && dpInfo.closed && Game.time > (dpInfo.closedTime + DEPOSIT_DECAY_TIME + 2000)) {
                    delete Memory.depositWork[dpRoom][dp];
                    delete Memory.depositUsed[dp];
                }
                if (!dpInfo.closedTime && (!dpInfo.time || dpInfo.time < Game.time - 4000)) {
                    console.log('need delete deposit', dpRoom, dp, Game.time-dpInfo.time, Game.getObjectById(dp));
                    if (!Game.getObjectById(dp)){
                        delete Memory.depositWork[dpRoom][dp];
                        delete Memory.depositUsed[dp];
                    }
                }
            }
        }
    }
    
    if (1 && Memory.PowerBankUsed && !(Game.time%2000)) {
        for (let id in Memory.PowerBankUsed) {
            if (Game.time > Memory.PowerBankUsed[id]+5000) {
                delete Memory.PowerBankUsed[id]
            }
        }
    }
    
    if (1 && Memory.targetTasks && !(Game.time%2000)) {
        for (let taskName in Memory.targetTasks) {
            let taskInfo = Memory.targetTasks[taskName];
            if (!taskInfo.startTime || taskInfo.startTime < Game.time - 35000) {
                console.log('need delete task', taskName, Game.time - taskInfo.startTime);
                delete Memory.targetTasks[taskName];
            }
        }
    }

    if (Memory.pathCashingStat == undefined || !(Game.time%20)){
        Memory.pathCashingStat = {};
    }
    
    if (!Memory.production && Memory.pathCashingStat[Game.time] == undefined) {
        Memory.pathCashingStat[Game.time] = {cache: 0, nocache: 0, nc: '', search: 0, count: 0,};
    }
    
    if (1 && Memory.quadGroups && !(Game.time%200)) {
        for (groupName in Memory.quadGroups){
            let groupInfo = Memory.quadGroups[groupName];
            let creeps = groupInfo.creeps;
            let creepsLive = 0;
            
            for (let index =0; index<creeps.length; index++) {
                let creepInfo = creeps[index];
                if (!creepInfo.name) {
                    creepsLive = 4;
                    break;
                }
                let creep = Game.creeps[creepInfo.name];
                if (creep) {
                    creepsLive++
                }
            }
            
            if (creeps.length == 4 && creepsLive == 0) {
                console.log(groupName, 'must be deleted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                delete Memory.quadGroups[groupName];
                break;
            } 
        }
    }
    
    
},
getRoomLink: function(roomName) {
    let path = Game.shard.name == 'shardSeason'?'season':'a';
    return "<a href='/"+path+"/#!/room/"+Game.shard.name+"/"+roomName+"'>"+roomName+"</a>";
},



reportResources_deprecated: function(myRooms) {
    let globalStock = {};
    globalStock.credits =  Math.round(Game.market.credits);
    globalStock.gcl =  Math.round(Game.gcl.progress);
    globalStock.gpl =  Math.round(Game.gpl.progress);
    globalStock.bucket =  Math.round(Game.cpu.bucket);
    globalStock.pixel =  Math.round(Game.resources[PIXEL]);
    globalStock.time =  Game.time;
    let stockReport = "";
    for(const myRoom of myRooms) {
        const room = Game.rooms[myRoom.roomName];
        if (!room) continue;
        let factory = Game.getObjectById(room.memory.factory);
        globalStock = _.assign(globalStock, _.get(room, 'storage.store'), _.add);
        globalStock = _.assign(globalStock, _.get(room, 'terminal.store'), _.add);
        if (factory) {
            globalStock = _.assign(globalStock, _.get(factory, 'store'), _.add);    
        }
        if (room.memory.factory) {
            let factory = Game.getObjectById(room.memory.factory);
            if (factory && (factory.level || factory.id == '5db206a78c320953d8d26a0d')) {
                stockReport += room.name+':';
                if (room.storage) {
                    stockReport += ' s('+_.sum(room.storage.store)+'/ ';//+room.storage.storeCapacity+') ';
                }
                if (room.terminal) {
                    stockReport += ' t('+_.sum(room.terminal.store)+'/ ';//+room.terminal.storeCapacity+') ';
                }
                stockReport += ' f'+(factory.level?factory.level:'')+'('+(factory.cooldown?'work)':(room.memory.factoryDone?'done)':'stay)')); 
                if (room.memory.factoryNeedPower) {
                    stockReport += ' NoPwr!';     
                }
                if (room.memory.factoryNeed && Object.keys(room.memory.factoryNeed).length) {
                    stockReport += ' nFR:' + Object.keys(room.memory.factoryNeed).join(', '); 
                }
                if (room.memory.needResource && room.memory.needResource.length) {
                    stockReport += ' nR:'+ room.memory.needResource.join(', ');
                }
            }
        }

        stockReport += "<br/>";

    }
    //globalStock = _.mapValues(_.invert(_.invert(globalStock)),parseInt);

    globalStock = _.reduceRight(_.invert(_.invert(globalStock)), function(current, val, key){
        current[key] = parseInt(val);
        return current;
    },{});

    //_.pick(globalStock, _.keys(globalStock).sort());
    
    const factoryRes = [RESOURCE_METAL, RESOURCE_ALLOY, RESOURCE_TUBE, RESOURCE_FIXTURES, RESOURCE_FRAME, RESOURCE_HYDRAULICS, RESOURCE_MACHINE, RESOURCE_COMPOSITE, RESOURCE_LIQUID,
    RESOURCE_CONDENSATE, RESOURCE_CONCENTRATE, RESOURCE_EXTRACT, RESOURCE_SPIRIT, RESOURCE_EMANATION, RESOURCE_ESSENCE];

    let textOut = Game.time+"<br/>";
    let factoryOut = 'Factory Res:'+"<br/>";
    for (const resource in globalStock) {
        const lastValue = _.get(Memory, "stock."+resource, globalStock[resource]);
        const textLine = resource+': '+globalStock[resource]+(globalStock[resource]-lastValue?'('+(globalStock[resource]-lastValue)+')':'')+  "<br/>";
        textOut += textLine;
        if (factoryRes.indexOf(resource) !== -1) {
            factoryOut += textLine;
        }
    }
    Memory.stock = globalStock;
    console.log(textOut+stockReport);
    if (Game.shard.name == 'shard0' && !(Game.time%5000)) {
        Game.notify(textOut, 0);
        Game.notify(factoryOut, 0);
        Game.notify(stockReport, 0);
    }
},
reportResources: function(myRooms) {
    let globalStock = {};
    globalStock.credits =  Math.round(Game.market.credits);
    globalStock.gcl =  Math.round(Game.gcl.progress);
    globalStock.gpl =  Math.round(Game.gpl.progress);
    globalStock.bucket =  Math.round(Game.cpu.bucket);
    globalStock.pixel =  Math.round(Game.resources[PIXEL]);
    globalStock.time =  Game.time;
    for(const myRoom of myRooms) {
        const room = Game.rooms[myRoom.roomName];
        if (!room) continue;
        let factory = Game.getObjectById(room.memory.factory);
        globalStock = _.assign(globalStock, _.get(room, 'storage.store'), _.add);
        globalStock = _.assign(globalStock, _.get(room, 'terminal.store'), _.add);
        if (factory) {
            globalStock = _.assign(globalStock, _.get(factory, 'store'), _.add);    
        }
    }
    
    Memory.stock = globalStock;
    
    if (['shard0','shard1','shard3',].includes(Game.shard.name)){
        let data = JSON.parse(InterShardMemory.getLocal() || "{}");
        data.stock = globalStock;        
        InterShardMemory.setLocal(JSON.stringify(data));
    }

    // let textOut = Game.time+"<br/>";
    // for (const resource in globalStock) {
    //     const lastValue = _.get(Memory, "stock."+resource, globalStock[resource]);
    //     const textLine = resource+': '+globalStock[resource]+(globalStock[resource]-lastValue?'('+(globalStock[resource]-lastValue)+')':'')+  "<br/>";
    //     textOut += textLine;
    // }
    //console.log(textOut);
},

spawnTracking:function(room,visualFlag = true) { //by SneakyPolarBear 
        if(!Memory.spawnTracking){Memory.spawnTracking = {};}
        let yOffset = 2;
        let spawners = room.find(FIND_MY_SPAWNS);
        for(let i = 0;i<spawners.length;i++)
        {
            if(!Memory.spawnTracking[spawners[i].id]){Memory.spawnTracking[spawners[i].id] = [];}
            let log = Memory.spawnTracking[spawners[i].id];
            //remove old logs
            if(log.length>0 && Game.time - log[0].tick >1500)
            {
                log.shift();
            }
            if(spawners[i].spawning && spawners[i].spawning.needTime - 1 === spawners[i].spawning.remainingTime)
            {
                let spawnLog = {};
                let creep = Game.creeps[spawners[i].spawning.name];
                spawnLog.name = creep?creep.memory.role+(creep.memory.type?'_'+creep.memory.type:''):spawners[i].spawning.name;
                spawnLog.duration = spawners[i].spawning.needTime;
                spawnLog.tick = Game.time;
                Memory.spawnTracking[spawners[i].id].push(spawnLog);
            }
            //visuals
            if(visualFlag)
            {
                let colors = ['red','blue','green'];
                let colorIndex = 0;
                let totalUtilization = 0;
                for(let i = 0;i<log.length;i++)
                {
                    totalUtilization+=log[i].duration/9;
                    let xOffset = Math.round(49 - (Game.time - log[i].tick)/9);
                    let xWidth = Math.round(log[i].duration / 9);
                    room.visual.rect(xOffset,49-yOffset,xWidth,1,{fill:colors[colorIndex++]});
                    room.visual.text(log[i].name,xOffset+Math.round(xWidth/2),49-yOffset-colorIndex*0.4+1,{font:1});
                    if(colorIndex>=colors.length){colorIndex = 0;}
                    if(xOffset+xWidth>50){break;}
                }
                room.visual.text(Math.round(totalUtilization),spawners[i].pos.x,spawners[i].pos.y,{font:0.35,color:'black'});
            }
            yOffset+=2;
        }
},
positionInBorder: function(target){
    let pos = target.pos?target.pos:target;
    return (pos.x < 1 || pos.x >48 || pos.y < 1 || pos.y > 48);
},

createMoveOrder: function (creep, target, conditions = false, range = 1) {
    if (!target) {
        return;
    }
   
    let pos = target.pos?target.pos:target;

    if (conditions === false) {
        conditions = {
            range: 2,
            room: undefined,
            enemy: undefined
        }
    }
    if (!conditions.range) {
        conditions.range = 2;
    }
    if (!conditions.enemy && creep.memory.warningMove) {
        conditions.enemy = 1;
    }
    
    creep.memory.moveOrder = {
        //t: Game.shard.name == 'shard0'?'':packPos(pos),
        p: {x:pos.x, y:pos.y, r:pos.roomName},
        c: conditions,
        r: range == 1?undefined:range,
    }
    //creep.say('cmOrder');
},

runMoveOrder: function(creep) {
    if (!creep.memory.moveOrder) {
        return false;
    }
    if (creep.memory.moveOrder.c.enemy && creep.room.find(FIND_HOSTILE_CREEPS).length) {
        creep.memory.moveOrder = undefined;
        return false;
    }
    let target = new RoomPosition(creep.memory.moveOrder.p.x, creep.memory.moveOrder.p.y, creep.memory.moveOrder.p.r);
    // target = unpackPos(creep.memory.moveOrder.t);
    let inRoomPosition = creep.room.name == target.roomName;
    if (creep.memory.moveOrder.c.room && inRoomPosition) {
        creep.memory.moveOrder = undefined;
        return false;
    }
    if (inRoomPosition) {
        let range = creep.pos.getRangeTo(target);
        if (range <= creep.memory.moveOrder.c.range) {
            creep.memory.moveOrder = undefined;
            return false;
        }
        if (!Memory.production) creep.say('auto'+(range - creep.memory.moveOrder.c.range));
    } else {
        if (!Memory.production) creep.say('autoR');
    }
    this.smartMove(creep, target, 1, creep.memory.moveOrder.r?creep.memory.moveOrder.r:1);
    if (creep.memory._move) {
        delete creep.memory._move;
    }
    if (!(Game.time%10) && ['miner', 'supertransporter'].includes(creep.memory.role) && creep.room.name != creep.memory.room) {
        require('profiler').start('roadRepairerCheck');    
        require('role.roadRepairer').checkRoom(creep);
        require('profiler').end('roadRepairerCheck');    
    }
    return true;
},

checkLabsBoosts: function(roomName, boosts) {
    //return _.get(Memory, 'rooms['+roomName+'].labsInfo', []).filter(x => boosts.includes(x)).length == boosts.length;
    let roomLabs = _.get(Memory, 'rooms['+roomName+'].labsInfo', []);
    if (Memory.rooms[roomName].boostLab && Game.time < Memory.rooms[roomName].boostLab.time) {
        roomLabs = Memory.rooms[roomName].boostLab.boosts.concat(roomLabs.slice(Memory.rooms[roomName].boostLab.boosts.length));
    }
    console.log('checkLabsBoosts', roomLabs.filter(x => boosts.includes(x)));
    return roomLabs.filter(x => boosts.includes(x)).length == boosts.length;
},

addLinkQueue: function(room, link) {
    if (!Memory.roomLinks) {
        Memory.roomLinks = {};
    }
    if (!Memory.roomLinks[room.name]) {
        Memory.roomLinks[room.name] = {};
    }
    let linksQueue = Memory.roomLinks[room.name];
    if (!linksQueue[link.id]) {
        linksQueue[link.id] = Game.time+link.cooldown;
    }
},
processLinks: function(room) {
    if (!Memory.roomLinks || !Memory.roomLinks[room.name]) {
        return;
    }
    let linksQueue = Memory.roomLinks[room.name];
    if (!(Game.time%500)) {
        this.updateLinksQueue(room);
    }
    for (let linkId in linksQueue) {
        if (Game.time > linksQueue[linkId]) {
            let storageLink = Game.getObjectById(room.memory.storageLink);
            if (storageLink && !storageLink.store[RESOURCE_ENERGY]) {
                let link = Game.getObjectById(linkId);
                if (link) {
                    if (link.cooldown) {
                        linksQueue[linkId] = Game.time + link.cooldown;
                    } else {
                         let res = link.transferEnergy(storageLink);
                        //  if (res == OK) {
                             delete linksQueue[linkId];
                             break;
                        //  } 
                    }
                } else {
                    delete linksQueue[linkId];
                    break;
                }
            }
        }
    }
},
updateLinksQueue: function(room) {
    let links = room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_LINK }});
    links = _.filter(links, (structure) => structure.id != room.memory.storageLink && !structure.cooldown && structure.store[RESOURCE_ENERGY] >= 800 && structure.id != room.memory.remoteLinkUpgradeId);
    links.forEach(link => this.addLinkQueue(room, link));
},
            
         
 
};
