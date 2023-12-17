var helpers = require('helpers');
var tsr = require('timeSavingRoom');
module.exports = {
    namePrefix: 'tsr_',
    role : 'tsr',
    creepsInfo: {
        dropper: {
            prefix: 'dr_',
            needEnergy: 1200, // MOVE*8,CARRY*16 1.20K
            body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
        },
    },
    dropperRun: function(room) {
        if (!room.storage || !room.terminal) return;
        if (!room.memory.tsrInfo) room.memory.tsrInfo = {};
        if (!room.memory.tsrInfo.dropInfo) room.memory.tsrInfo.dropInfo = {};
        let dropInfo = room.memory.tsrInfo.dropInfo;
        if (dropInfo.time && Game.time < dropInfo.time) {
            return;    
        }
        let name = this.namePrefix+this.creepsInfo.dropper.prefix+room.name;
        let creep = Game.creeps[name];
        if (dropInfo.spawn === undefined) {
            if (Game.cpu.bucket < 4000 && !creep) {
                dropInfo.time = Game.time + 100;
                return;
            }
            if (room.memory.defCountEnemy) {
                dropInfo.time = Game.time + 10;
                return;
            }
            let flag = Game.flags['FlagRecycle'+room.name];
            let founds;
            if (flag) {
                founds = room.find(FIND_TOMBSTONES).filter(t=>!t.pos.isEqualTo(flag.pos) && t.store.getUsedCapacity() && (t.store.getUsedCapacity() - t.store[RESOURCE_ENERGY] > 100) && t.ticksToDecay > 130); 
            } else {
                founds = room.find(FIND_TOMBSTONES).filter(t=>!t.creep.my && t.store.getUsedCapacity() && t.store.getUsedCapacity() > t.store[RESOURCE_ENERGY] && t.ticksToDecay > 130);
            }
            if (founds.length) {
                dropInfo.spawn = founds[0].id;
                dropInfo.time = 0;
            } else if (!creep) {
                dropInfo.time = Game.time + 30;
                return;
            } else {
                dropInfo.spawn = 0;
                if (creep) creep.memory.recycle = 1;
            }
        }
        if (dropInfo.spawn === 0 && !creep) { //after recycle
            dropInfo.time = Game.time + 30;
            dropInfo.spawn = undefined;
            return;
        }
        //console.log('tsr dropper', helpers.getRoomLink(room.name), '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        if (!creep) {
            if (!dropInfo.spawn) return;
            
            if (room.energyAvailable < this.creepsInfo.dropper.needEnergy) return;
            let spawn = tsr.getSpawn(room);
            if (!spawn) return;
            let res = spawn.spawnCreep(this.creepsInfo.dropper.body, name, {memory: {room: room.name, role: this.role, targetId: dropInfo.spawn}});    
            if (res == OK) {
                room.memory.spawnBusyTick = Game.time;
                //this.energyBalance(room, -this.creepsInfo.linkManager.needEnergy);
            }
        } else {
            if (creep.spawning) return;
            if (this.taskGetRun(creep)) return;
            if (dropInfo.spawn && Game.getObjectById(dropInfo.spawn) && Game.getObjectById(dropInfo.spawn).store.getUsedCapacity()) {
                creep.memory.taskGet = dropInfo.spawn;
                dropInfo.spawn = 0;
                creep.memory.recycle = undefined;
                //Game.notify('TST DROPPER run in room '+room.name+' at tick '+Game.time);
            } else if (!creep.memory.recycle) {
                dropInfo.spawn = undefined;
            } else {
                helpers.recycleCreep(creep);
            }
        }
    },
    
    taskGetRun: function(creep) {
        if (!creep.memory.taskGet) return;
        if (!creep.memory.taskMode) {
            creep.memory.taskMode = 'free';
        }
        if (creep.memory.taskMode == 'free') {
            if (creep.store.getUsedCapacity()) {
                let target = creep.room.terminal;
                if (!target || target.store.getFreeCapacity() < 5000) {
                    target = creep.room.storage;
                }
                if (!target || target.store.getFreeCapacity() < 5000) {
                    target = null;
                }
                if (target) {
                    if (creep.pos.isNearTo(target)) {
                        for(const resourceType in creep.store) {
                            creep.transfer(target, resourceType);
                            break;
                        }    
                    } else {
                        helpers.smartMove(creep, target);
                    }
                } else {
                    delete creep.memory.taskGet;
                    delete creep.memory.taskMode;
                    return;
                }
            } else {
                creep.memory.taskMode = 'load';
            }
        } 
        if (creep.memory.taskMode == 'load') {
            let target = Game.getObjectById(creep.memory.taskGet);
            if (target && creep.store.getFreeCapacity() && target.store.getUsedCapacity()) {
                if (creep.pos.isNearTo(target)) {
                    if (target.store.getUsedCapacity()>target.store[RESOURCE_ENERGY]) {
                        for(const resourceType in target.store) {
                            if (resourceType == RESOURCE_ENERGY) continue;
                            creep.withdraw(target, resourceType);
                            break;
                        }    
                    } else {
                        creep.withdraw(target, RESOURCE_ENERGY);
                    }
                } else {
                    helpers.smartMove(creep, target);
                }
            } else {
                if (creep.store.getUsedCapacity()) {
                    creep.memory.taskMode = 'free';    
                } else {
                    delete creep.memory.taskGet;
                    delete creep.memory.taskMode;
                    //Game.notify('TST DROPPER LOST TARGET in room '+creep.room.name+' at tick '+Game.time);
                    return;
                }
            }
        }
        return 1;
    },
    
};