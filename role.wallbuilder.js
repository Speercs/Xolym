var helpers = require('helpers');

var roleWallBuilder = {
    
    getBody: function (spawn) {
        if (!Game.spawns[spawn]) return [MOVE,CARRY,WORK,WORK];
        const room = Game.spawns[spawn].room;
        if (!room) return [MOVE,CARRY,WORK,WORK];
        let cap = room.energyCapacityAvailable;
        if (Game.shard.name == 'shard3'){
            if (cap >= 3200) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*16,WORK*16,CARRY*16
            if (cap >= 2300) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*12,WORK*10,CARRY*14 2.30K
        }
        if (Game.shard.name == 'shard0'){
            // if (Game.spawns[spawn].room.name == 'E81N58') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*16,WORK*16,CARRY*16
            //if (Game.spawns[spawn].room.name == 'E86N53' && cap >= 3200) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*16,WORK*16,CARRY*16
            // if (Game.spawns[spawn].room.name == 'E79N59') {
            //     if (cap >= 3200) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*16,WORK*16,CARRY*16
            //     if (cap >= 2300) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*12,WORK*10,CARRY*14 2.30K
            // }
            if (cap >= 3200) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*16,WORK*16,CARRY*16
            if (cap >= 2300) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*12,WORK*10,CARRY*14 2.30K
        }
        if (Game.shard.name == 'shard2'){
            // if (room.memory.rampartsHP > 100000000) {
            //     cap = Math.min(1650, cap);
            // } else if (room.memory.rampartsHP > 60000000) {
            //     cap = Math.min(2300, cap);
            // }
            if (cap >= 3200) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*16,WORK*16,CARRY*16
            if (cap >= 2300) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*12,WORK*10,CARRY*14 2.30K
        }
         if (Game.shard.name == 'shard1'){
            // if (room.memory.rampartsHP > 100000000) {
            //     cap = Math.min(1650, cap);
            // } else if (room.memory.rampartsHP > 60000000) {
            //     cap = Math.min(2300, cap);
            // }
            if (cap >= 3200) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*16,WORK*16,CARRY*16
            if (cap >= 2300) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*12,WORK*10,CARRY*14 2.30K
        }
        
        //if (Game.spawns[spawn].room.name == 'E55N27') return [MOVE,CARRY,WORK,WORK];
        if (cap >= 1650) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //1650 
        return [MOVE,CARRY,WORK,WORK];
    },
    
    getCount: function(room, count) {
        if (room.controller.level < 8 || !room.memory.rampartsHP || !count || room.memory.defendRoomMode) {
            return count;
        }
        if (!(Game.time%100) && room.memory.wallbuilderInfo && room.memory.wallbuilderInfo.pause && room.find(FIND_MY_CONSTRUCTION_SITES).length) {
            delete room.memory.wallbuilderInfo;
        }
        
        if (!room.memory.wallbuilderInfo) {
            room.memory.wallbuilderInfo = {
                count: count,
                time: Game.time+1000,
                pause: 0,
            }
        }
        if (Game.time > room.memory.wallbuilderInfo.time) {
            if (!room.memory.wallbuilderInfo.pause) {
                // do pause
                let dtime = 0;
                if (room.memory.rampartsHP > 150000000) {
                    dtime = 6000 + Math.floor(Math.random() * 1000);
                } else if (room.memory.rampartsHP > 60000000) {
                    dtime = 3000 + Math.floor(Math.random() * 500);
                }
                room.memory.wallbuilderInfo = {
                    count: 0,
                    time: Game.time+dtime,
                    pause: 1,
                };
            } else {
                // do pause
                room.memory.wallbuilderInfo = {
                    count: count,
                    time: Game.time+1000,
                    pause: 0,
                };
            }
        }
        
        
        return room.memory.wallbuilderInfo.count;
        
    },

    
    getBorders: function (roomName) { // [x,y,множитель хп структуры => меньше 1, больше хп.]
        const shardCfg = require(Game.shard.name+'.cfg');
        if (shardCfg && shardCfg.getBorders && shardCfg.getBorders[roomName]){
            return shardCfg.getBorders[roomName];
        }
        return false;
    },
    getStructureHit: function(structure) {
        let k = 1;
        let borders = this.getBorders(structure.pos.roomName);
        if (borders) {
            //[[2,4],[2,5]].some((i) => i.length == 2 && i[0] == 2 && i[1] == 5)
            let result = borders.find(item => item[0] == structure.pos.x && item[1] == structure.pos.y);    
            if (result) {
                k = result[2]?result[2]:0.1;
            }
        
        }
        return structure.hits * k
    },

    getRoomRampartsHP: function(room) {
        let borders = this.getBorders(room.name);
        let result;
        if (borders) {
            //find pos rampart with default hp factor
            let checkRampartsPos = null;
            for (pos of borders) {
                if (pos[2] == undefined) {
                    let structs = room.find(FIND_STRUCTURES, {
                        filter: object => (object.structureType == STRUCTURE_WALL || (object.structureType == STRUCTURE_RAMPART && object.my)) && object.pos.x == pos[0] && object.pos.y == pos[1]
                    });
                    if (structs.length) {
                        result = structs[0].hits;
                        console.log('rampartsHP', room.name, Math.round(room.memory.rampartsHP/1000000)+'M');
                    }
                    break;
                }
            }
        }
        return result;
    },
    
    /** @param {Creep} creep **/
    run: function(creep) {

        if (1 && !(Game.time%1000)) {
            creep.room.memory.rampartsHP = this.getRoomRampartsHP(creep.room);
        }
        
        
        if (0 && creep.room.name == 'E52N46'){
            const ramps = creep.room.find(FIND_MY_STRUCTURES, {filter: structure => structure.structureType == STRUCTURE_RAMPART});
            let textOut = '';
            ramps.forEach(ramp => textOut += '['+ramp.pos.x+','+ramp.pos.y+'],');
            console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', textOut);
        }
        
        
        var target = null;
        
        if (creep.room.storage && creep.memory.targetId == creep.room.storage.id) {
            creep.memory.targetId = undefined;
        }

        
        if (creep.ticksToLive <= 20){
            //console.log(creep.name, creep.room.name, creep.memory.role, 'too old and going to recycle');
            helpers.recycleCreep(creep);
        } else if (creep.room.name != creep.memory.room){
                helpers.smartMove(creep, Game.rooms[creep.memory.room].storage, 0, 1);
        } else if (!creep.store[RESOURCE_ENERGY]){
            target = creep.room.storage;
            //creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            if (target && target.my && target.store[RESOURCE_ENERGY] && target.store[RESOURCE_ENERGY] > 5000){
                helpers.smartMove(creep, target, 0, 1);
                creep.withdraw(target, RESOURCE_ENERGY);
            } else if (!creep.memory.harvest) {
                let sources = creep.room.find(FIND_SOURCES_ACTIVE);
                sources = _.shuffle(sources);
                if (sources.length) {
                    creep.memory.harvest     = sources[0].id;
                }
                if (creep.room.name == 'E52N41') {
                    //helpers.attachToSource(creep, '5bbcaf6d9099fc012e63a977');
                    creep.memory.harvest = '579faa010700be0674d30401';
                }
            }
            
            helpers.deAttachToSource(creep);
        } else {
            if (creep.memory.targetId != undefined)  {
                target =  Game.getObjectById(creep.memory.targetId);
                if (target == null){
                    helpers.deAttachToSource(creep);
                }
            } else if (!helpers.buildClosestStructure(creep)){
                //console.log(creep.name, creep.memory.role, 'find wall');
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.structureType == STRUCTURE_WALL || (object.structureType == STRUCTURE_RAMPART && object.my)
                });
                //targets.sort((a,b) => a.hits - b.hits);
                targets = _.filter(targets, target => target.hits<target.hitsMax-50000);
                if (creep.room.memory.ignoreRamps) {
                    targets = _.filter(targets, target => creep.room.memory.ignoreRamps.indexOf(target.id) < 0);
                }
                targets.sort((a,b) => roleWallBuilder.getStructureHit(a) - roleWallBuilder.getStructureHit(b));
                
                if(targets.length > 0) {
                    target = targets[0];
                    helpers.attachToSource(creep, target.id);
                } else {
                    try {
                        creep.room.find(FIND_MY_STRUCTURES, {filter: (obj)=> [STRUCTURE_SPAWN, STRUCTURE_STORAGE, STRUCTURE_TERMINAL, STRUCTURE_TOWER].indexOf(obj.structureType) >= 0}).forEach((obj) => obj.pos.createConstructionSite(STRUCTURE_RAMPART));
                    } catch (e) {}
                    
                }
            }
            if (target && target.hits == target.hitsMax) {
                helpers.deAttachToSource(creep);
            }
            
            if (target){
                let res = creep.repair(target);
                if ( res == ERR_NOT_IN_RANGE || creep.pos.getRangeTo(target)>3) {
                    //creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});    
                    if (!creep.room.memory.defendRoomMode) {
                        helpers.smartMove(creep, target, 0, 3);
                        //creep.say('sss');
                        if (creep.room.memory.ignoreRamps) {
                            creep.room.memory.ignoreRamps = undefined;
                        }
                    } else {
                        let ret = require('role.roomDefender').move(creep, target, 3);
                        if (ret && ret.incomplete) {
                            if (!creep.room.memory.ignoreRamps) {
                                creep.room.memory.ignoreRamps = [];
                            }
                            if (creep.room.memory.ignoreRamps.indexOf(target.id) < 0) {
                                creep.room.memory.ignoreRamps.push(target.id);
                            }
                            helpers.deAttachToSource(creep);
                        }
                    }
                    
                }
                if (res == OK) {
                    creep.memory._trav = undefined;
                }

                if (0 && res == OK && ([].indexOf(creep.room.name) !== -1 || Game.shard.name == 'shard0' || Game.shard.name == 'shard2' || Game.shard.name == 'shard3' ) && !creep.room.memory.defendRoomMode){
                    let allyCreepsNear = creep.pos.findInRange(FIND_MY_CREEPS, 1);
                    if (allyCreepsNear.length>1){
                        creep.say('🤝');
                        let moveArr = [TOP, LEFT, RIGHT, BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT];
                        moveArr = _.shuffle(moveArr);
                        creep.move(moveArr[0]);
                        creep.memory._trav = undefined;
                    }
                }
                
                // if ((new RoomPosition(26,16,'E87N56')).isEqualTo(creep.pos)){
                //     creep.move(LEFT);
                // }
                // if ((new RoomPosition(26,16,'E87N56')).isEqualTo(creep.pos)){
                //     creep.move(LEFT);
                // }
                // if ((new RoomPosition(22,44,'E89N54')).isEqualTo(creep.pos)){
                //     creep.move(LEFT);
                // }
                // if ((new RoomPosition(21,44,'E89N54')).isEqualTo(creep.pos)){
                //     creep.move(BOTTOM_LEFT);
                // }
                // if ((new RoomPosition(20,45,'E89N54')).isEqualTo(creep.pos)){
                //     creep.move(LEFT);
                // }
                // if ((new RoomPosition(6,38,'E89N54')).isEqualTo(creep.pos)){
                //     creep.move(TOP);
                // }
                // if ((new RoomPosition(28,22,'E83N55')).isEqualTo(creep.pos) && creep.pos.inRangeTo(target, 3)){
                //     creep.move(BOTTOM_RIGHT);
                // }
                // if ((new RoomPosition(2,20,'E77N54')).isEqualTo(creep.pos)){
                //     creep.move(TOP_RIGHT);
                // }
                // if ((new RoomPosition(2,19,'E77N54')).isEqualTo(creep.pos)){
                //     creep.move(TOP_RIGHT);
                // }

                
            }
        }
        
        if (creep.memory.harvest) {
            creep.say('harv');
            creep.cancelOrder('move');
            target = Game.getObjectById(creep.memory.harvest);
            if (target && creep.store.getFreeCapacity()){
                let res = helpers.smartMove(creep, target, 0, 1);
                creep.say('harv'+res);
                if (creep.pos.isNearTo(target)){
                    let res = creep.harvest(target);
                    if (res == ERR_NOT_ENOUGH_RESOURCES) {
                        //helpers.deAttachToSource(creep);
                        creep.memory.harvest = 0;
                    }
                } else if (res == ERR_INVALID_ARGS) {
                    creep.memory.harvest = undefined;
                }
            } else {
                //helpers.deAttachToSource(creep);
                creep.memory.harvest = 0;
            }
        }

	}
};

module.exports = roleWallBuilder;