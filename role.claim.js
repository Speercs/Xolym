var helpers = require('helpers');
var roleClaim = {
    getBody: function (spawn) {
        if (!Game.spawns[spawn] || !Game.spawns[spawn].room) return [];
        let room = Game.spawns[spawn].room;
        let cap = room.energyCapacityAvailable;
        let result = [];
        for (let parts = Math.min(8, Math.floor(cap/650));parts>0;parts--){
            result.push(CLAIM);result.push(MOVE);
        }
        return result;
    },
    //Memory.claimRoomTasks['E52N32']['E52N34'] = {x: 16, y: 44, reserved: 0, time: Game.time};    
    spawn: function (room, myRoom, freeSpawn) {
        //check all sector claimer
        if (Memory.claimRoomTasks && Memory.claimRoomTasks[room.name] && freeSpawn){
            for (let claimRoom in Memory.claimRoomTasks[room.name]) {
                let claimInfo = Memory.claimRoomTasks[room.name][claimRoom];
                let reserved = (claimInfo.reserved - (Game.time-claimInfo.time));
                if ( reserved < 300) {
                    // let creepLive = _.filter(require('spawn').getGameCreeps(room.name), (creep) => creep.memory.role == 'claim' && creep.memory.targetRoomName == claimRoom && (creep.ticksToLive > 10 || creep.spawning));
                    // let needSpawn = creepLive.length <= 0;
                    
                    if (freeSpawn && freeSpawn.room && freeSpawn.room.memory.defendRoomMode) {
                        continue;
                    }
                    
                    let needSpawn = require('spawn').creepLiveCustomCheck(room.name, room.name+'_claim_'+claimRoom, 1,
                        creep => creep.memory.role == 'claim' && creep.memory.targetRoomName == claimRoom && (creep.ticksToLive > 10 || creep.spawning),
                        'claim'
                    );
                    if (freeSpawn && needSpawn) {
                        let body = this.getBody(freeSpawn.name);
                        if (claimInfo.claimRoom ) {body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,];}
                        const result = freeSpawn.spawnCreep(body, 'Claim_'+claimRoom+'_'+Game.time, {memory: {role: 'claim', room: room.name, targetRoomName: claimRoom, x:claimInfo.x, y:claimInfo.y, claimRoom: claimInfo.claimRoom, warningMove: claimInfo.warningMove}});
                        if (result == OK){
                            freeSpawn = null;   
                        } 
                    }
                } 
            }
        }
        return freeSpawn;
    },

    run: function(creep) {
        //Game.map.visual.text("claim️",creep.pos, { fontSize:10})
        if (creep.room.name != creep.memory.targetRoomName) {
            helpers.smartMove(creep, new RoomPosition(creep.memory.x, creep.memory.y, creep.memory.targetRoomName), 1, 1)
        } else {
            if (creep.pos.isNearTo(creep.room.controller.pos)){
                let res = -1;
                if (Game.shard.name == 'shard2' && !creep.memory.safeCheck) {
                    if (creep.room.controller && (!creep.room.controller.safeModeCooldown || creep.room.controller.safeModeCooldown < 4000)) {
                        if (!creep.room.controller.level) {
                            res = creep.claimController(creep.room.controller);
                            if (res == OK) return;
                        } else if (creep.room.controller.level == 1 && creep.room.controller.my) {
                            creep.room.controller.unclaim();
                            return;
                        }
                    }
                    creep.memory.safeCheck = 1;
                }
                
                if (creep.memory.claimRoom){
                    creep.signController(creep.room.controller, "Xolym area" );
                    if (creep.ticksToLive < 10000) {
                        res = creep.claimController(creep.room.controller);    
                    } else {
                        res = creep.reserveController(creep.room.controller);        
                    }
                } else {
                    res = creep.reserveController(creep.room.controller); 
                }
                creep.say(res);
                if (res == ERR_INVALID_TARGET && !creep.room.controller.my) {
                    creep.say(res);
                    res = creep.attackController(creep.room.controller);
                }
                
                if (res == OK && !(Game.time%100) && Memory.claimRoomTasks && Memory.claimRoomTasks[creep.memory.room] && Memory.claimRoomTasks[creep.memory.room][creep.room.name]){
                    Memory.claimRoomTasks[creep.memory.room][creep.room.name].reserved = creep.room.controller.reservation && creep.room.controller.reservation.username == 'Xolym'?creep.room.controller.reservation.ticksToEnd:0;
                    Memory.claimRoomTasks[creep.memory.room][creep.room.name].time = Game.time;
                }
                if (res == OK && !(Game.time%60)){
                    creep.signController(creep.room.controller, "Xolym area" );
                }
                if (res == OK) {
                    if (Game.shard.name == 'shard2' && creep.room.name == 'E58N42' && creep.pos.isEqualTo(23,21)) creep.move(TOP_LEFT);
                }
            } else {
                let res = helpers.smartMove(creep, creep.room.controller, 1, 1);
                //console.log('claimer going to controller ',helpers.getRoomLink(creep.room.name));
            }
        }
    }
};

module.exports = roleClaim; 