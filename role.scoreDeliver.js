var helpers = require('helpers');

var roleScoreDeliver = {
    getBody: function(room) {
        //return [CARRY, MOVE];
        
        if (!room) return [];
        let cap = room.energyCapacityAvailable;
        if (cap >= 2500) return [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,]
        if (cap >= 1200) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]
        if (cap >= 800) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];
        // if (cap >= 500) return [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,];
        if (cap >= 300) return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
        ///return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*25,CARRY*25
    },
    
    spawn: function (room, myRoom, freeSpawn) {
        if (room.memory.scoreDeliver){
            let creepLive = _.filter(require('spawn').getGameCreeps(), (creep) => creep.memory.role == 'scoreDeliver' && creep.memory.room == room.name && (creep.ticksToLive > 160+72 || creep.spawning));
            let deliverCount = room.memory.scoreDeliver;
            let maxTTL = room.memory.scoreDeliverMaxTTL?room.memory.scoreDeliverMaxTTL:180;
            if (room.energyAvailable< room.energyCapacityAvailable*0.8) {
                deliverCount = 0;
            }
            if (!room.terminal || !room.storage || (!room.terminal.store[RESOURCE_SCORE] && !room.storage.store[RESOURCE_SCORE]) ) {
                deliverCount = 0;
            }
            if (Memory.war) {
                deliverCount = 0;
                Game.notify('score deliver OFF');
            }
            let boosts = [];
            console.log('Deliver count ', deliverCount, '/', creepLive.length);
            if (freeSpawn && creepLive.length < deliverCount) {
                const result = freeSpawn.spawnCreep(this.getBody(room), 'scoreD_'+room.name+'_'+Game.time, {memory: {role: 'scoreDeliver', boosts: boosts, room: room.name, maxTTL: maxTTL}});
                if (result == OK){
                    freeSpawn = null;   
                }
            }
        }
        return freeSpawn;
    },
    
    tickReset: function(){
        
        if (Memory.sectorClosed) {
            let isClosedSectors = 0;
            for (let roomName in Memory.sectorClosed) {
                if (Game.time<Memory.sectorClosed[roomName]) {
                    isClosedSectors = 1;
                }
            }
            if (!Memory.war && isClosedSectors) {
                //Memory.war = 1;
            }
            if (Memory.war && !isClosedSectors) {
                //Memory.war = 0;
            }
        }
      

        
    },
    
    //Memory.rooms.E26N22.scoreCollectorPos = packPos(new RoomPosition(22,34,'E30N20'));
    
 
    
    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.spawning) {
            Game.map.visual.text("✈︎",creep.pos, {color: '#00FF00', fontSize: 8});     
        } 
        
        if (creep.hits < creep.hitsMax*0.5 && !Memory.war) {
            Memory.war = 1;
            Game.notify('score deliver OFF. creep damaged in room '+creep.room.name);
        }

      
        //console.log('score deliver', helpers.getRoomLink(creep.room.name));
        
        if (!creep.memory.delverTarget) {
            creep.memory.delverTarget = Memory.rooms[creep.memory.room].scoreCollectorPos;
            if (!creep.memory.delverTarget || !unpackPos(creep.memory.delverTarget)) {
                creep.say('noDtar');
                console.log('No deliver target in room', helpers.getRoomLink(creep.room.name));
                return;
            }
        }
        
        if (['E20N30_','E20N29_'].includes(creep.room.name) && Game.cpu.bucket > 1000) {
            creep.memory.warningMove = 1;
            creep.memory.warningMoveTime = Game.time;
        } else {
            if (creep.memory.warningMove && (!creep.memory.warningMoveTime || Game.time>creep.memory.warningMoveTime+10)) {
                creep.memory.warningMove = undefined;
                if (Game.cpu.bucket > 5000) {
                    creep.memory._trav = undefined;    
                }
            }
        }
        
        if (!creep.store.getUsedCapacity()) {
            let homeRoom = Game.rooms[creep.memory.room];
            if (!homeRoom) return;
            let target = homeRoom.storage;
            if (!target || !target.store[RESOURCE_SCORE] && homeRoom.terminal) {
                target = homeRoom.terminal;
            }
            if (!target || !target.store[RESOURCE_SCORE]) {
                console.log('no score for deliver in room', helpers.getRoomLink(homeRoom.name));
                creep.say('noSc');
                helpers.recycleCreep(creep);
                return;
            }
            if (creep.pos.isNearTo(target)) {
                if (Memory.war) {
                    creep.memory.role = undefined;    
                    return;
                }
                let maxTTL = creep.memory.maxTTL?creep.memory.maxTTL:180;
                if (creep.ticksToLive < maxTTL) {
                    creep.memory.role = undefined;
                } else {
                    creep.withdraw(target, RESOURCE_SCORE);    
                }
            } else {
                helpers.smartMove(creep, target);
            }
        } else {
            let target = unpackPos(creep.memory.delverTarget);    
            if (!target) return;
            if (creep.pos.isNearTo(target)) {
                let collectors = creep.pos.findInRange(FIND_SCORE_COLLECTORS, 1);
                if (collectors.length) {
                    creep.transfer(collectors[0], RESOURCE_SCORE);    
                }
            } else {
                helpers.smartMove(creep, target);
            }
        }
        
        
        
        
        
        
        
      
        
	},

};

module.exports = roleScoreDeliver;