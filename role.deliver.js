var helpers = require('helpers');
var roleDeliver = {
    
    getBody: function(room) {
        if (Game.shard.name == 'shard1') {
            if (room.energyAvailable >=2500) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*25,CARRY*25            
            return;
        }
        
        return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
        // if (room.energyAvailable >=2500) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*25,CARRY*25
        // if (room.energyAvailable >=2250) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*23,CARRY*23
        
        //[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,];//MOVE*17,CARRY*33
    },
    
    
    run: function(creep) {
        creep.say('deliver');
        let deliveryRoomName = 'E43N38';
        let deliveryFlagName = 'FlagGcl';
        if (Game.shard.name == 'shard1') {
            deliveryRoomName = 'E41N39';
            deliveryFlagName = 'FlagS1Gcl';
        }
        
        if (!creep.store.getUsedCapacity()) {
            if (creep.ticksToLive < 70) {
                creep.memory.role = undefined;
                return;
            }
            if (creep.room.name == creep.memory.room){
                let storage = creep.room.storage;
                if (creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY]>60000) {
                    storage = creep.room.terminal;
                }
                helpers.smartMove(creep, storage);
                if (creep.pos.isNearTo(storage)) {
                    if (storage.store[RESOURCE_ENERGY] > 20000) {
                        creep.withdraw(storage, RESOURCE_ENERGY);
                    } else {
                        creep.say('noE');
                    }
                }
            } else {
                const homeRoom = Game.rooms[creep.memory.room];        
                helpers.smartMove(creep, homeRoom.storage);
            }
        } else {
            let deliveryRoom = Game.rooms[deliveryRoomName];
            if (deliveryRoom) {
                let deliveryStorage = deliveryRoom.storage;
                if (deliveryStorage && deliveryStorage.room && deliveryStorage.room.controller.level >= 4){
                    if (creep.pos.isNearTo(deliveryStorage)) {
                        creep.transfer(deliveryStorage, RESOURCE_ENERGY)
                    } else {
                        helpers.smartMove(creep, deliveryStorage);
                    }
                } else if (Game.flags[deliveryFlagName]){
                    let pos = Game.flags[deliveryFlagName].pos;
                    if (creep.pos.isEqualTo(pos)) {
                        if (creep.pos.lookFor(LOOK_RESOURCES).length) {
                            creep.say('seeE');   
                        } else {
                            creep.drop(RESOURCE_ENERGY);
                        }
                    } else if (creep.pos.isNearTo(pos)) {
                        creep.moveTo(pos);
                    } else {
                        helpers.smartMove(creep, pos);
                    }
                }
            }
        }
    }
};

module.exports = roleDeliver; 