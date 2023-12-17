var helpers = require('helpers');
var rolePuller = {
    getBody: function(pairType, bodyType) {
        if (pairType == 'one') {
            return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];
            return [MOVE,MOVE,MOVE,];
        } else {
            //return [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE];
            return [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK];
            return [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,];
            return [WORK,WORK,WORK,];
        }
    },
    getBoosts: function(pairType, bodyType) {
        return [];
    },
    
    //Memory.puller['E30N20'] = {room:'E26N22',  time: Game.time, count: 1};
    
    spawnHelpers: function (room, myRoom, freeSpawn) {
        if (Memory.puller ) { //&& freeSpawn
            for (helpRoom in Memory.puller) {
                const pullerTask = Memory.puller[helpRoom];
                if (pullerTask) {
                    let duration = pullerTask.duration?pullerTask.duration:999999999;
                    if (Game.time > pullerTask.time && Game.time < pullerTask.time + duration) {
                        if (pullerTask.room == room.name) {
                            let soonDie = pullerTask.soonDie?pullerTask.soonDie:100;
                            
                            if (!pullerTask.groups) {
                                pullerTask.groups = [];
                            }
                            
                            let countLive = 0;
                            for (group of pullerTask.groups){
                                if (group.live === 0) {
                                    continue;
                                }
                                const one = Game.creeps[group.one];
                                const two = Game.creeps[group.two];
                                if (!group.one || !group.two) {
                                    group.live = 1;
                                    group.spawn = 1;
                                    countLive++;
                                } else if ((one && (one.ticksToLive> soonDie || one.spawning) && two && !two.memory.inPosition && (two.ticksToLive> soonDie || two.spawning)) 
                                 || (two && two.memory.inPosition && (two.ticksToLive> soonDie || two.spawning))) {
                                    group.live = 1;
                                    group.spawn = undefined;
                                    countLive++;
                                } else {
                                    group.live = 0;
                                    group.spawn = undefined;
                                }
                            }
                            
                            if (countLive < pullerTask.count){
                                _.times(pullerTask.count-countLive, () => { pullerTask.groups.push({live:1, spawn:1})});
                            }
                            
                            for (group of pullerTask.groups){
                                if (!group.spawn || !freeSpawn) {
                                    continue;
                                }
                                ['one','two'].forEach(type => {
                                    if (freeSpawn && !group[type]) {
                                        let boosts = this.getBoosts(type, pullerTask.boosted?'pairBusted':'pair');
                                        let body = this.getBody(type, pullerTask.boosted?'pairBusted':'pair');
                                        if (pullerTask.body) {
                                            body = pullerTask.body[type];
                                        }
                                        if (pullerTask.boosts) {
                                            boosts = pullerTask.boosts[type];
                                        }
                                        const name = 'pull'+room.name+'_'+Game.time;
                                        const result = freeSpawn.spawnCreep(body, name, {memory: {role: 'pull', type: type, room: room.name, boosts: boosts, group: helpRoom}});
                                        if (result == OK){
                                            freeSpawn = null;   
                                            group[type] = name;
                                        } else {
                                            freeSpawn = null;
                                        }
                                    }
                                });
                            }
                            
                        }    
                    }
                }
            }

        }
        return freeSpawn;
    },
    
    runGroups: function() {
        if (!Memory.puller) return;
        
        for (let group in Memory.puller) {
            const startCpuRunGroups = Game.cpu.getUsed();
            if (Memory.puller[group].groups) {
                for (creeps of Memory.puller[group].groups) {
                    if (!creeps.die && !creeps.spawn) {
                        this.runGroup(Memory.puller[group], group, creeps);     
                    }
                }
                
                if (!(Game.time%100)) {
                    Memory.puller[group].groups = _.filter(Memory.puller[group].groups, (group) => !group.die);
                }
                
            }
            
            const elapsedRunGroups = Game.cpu.getUsed() - startCpuRunGroups;
            if (1) console.log('PullerRunGroups '+group+' '+ elapsedRunGroups.toFixed(2));
        }
        
    },
    positionInBorder: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 1 || pos.x >48 || pos.y < 1 || pos.y > 48);
    },
    
    run: function(creep) {
        let target = this.getTarget(creep.room.name);
        if (target) {
            if (creep.pos.isNearTo(target)) {
                creep.dismantle(target);
            } else {
                console.log('dismantler far to target in room', helpers.getRoomLink(creep.room.name));
                Game.notify('dismantler far to target in room'+creep.room.name);
                //creep.suicide();
                
            }
        }
        
    },
    positionInBorder: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 1 || pos.x >48 || pos.y < 1 || pos.y > 48);
    },
    
    getTarget: function(roomName) {
        let room = Game.rooms[roomName];
        if (!room) {
            return undefined;
        }
        if (roomName == 'E30N30') {
            let target = Game.getObjectById('5fb54d9a0ae8e3000780d91f');
            if (!target) {
                target = Game.getObjectById('5fb54d9a0ae8e3000780d929');
            }
            if (!target) {
                target = Game.getObjectById('5fb54d9a0ae8e3000780d933');
            }
            if (!target) {
                target = Game.getObjectById('5fb54d9a0ae8e3000780d93d');
            }

            return target;
        }
        
    },

    runGroup: function(group, groupName, creeps) {
        let creep = Game.creeps[creeps.one];
        let two = Game.creeps[creeps.two];
        if (!creep && !two) {
            creeps.die = 1;
        }
        
        if (!two || two.spawning) {
            return;
        }
        if (two.memory.inPosition ){
            this.run(two);
        }
        if (!creep) {
            return;
        }
        
        let flagName = 'flagPuller'+groupName;
        let flag = Game.flags[flagName];
        
        if (!flag) {
            flag = new RoomPosition(25,25, creep.memory.group);
            try {
                flag.createFlag(flagName);
                
            } catch (e) {}
            //return;
        }
        
        
        if (!flag) {
            creep.say('noflag');
            //return;
        }
        
        if (flag && flag.room && flag.room.name == creep.room.name) {
            let object = this.getTarget(creep.room.name);
            if (object) {
                try {
                    flag.setPosition(object.pos);
                } catch (e) {}
            }
        }
        
        creep.memory.pullId = two.id;
        
        if (creep.memory.pullId) {
            let pullCreep = Game.getObjectById(creep.memory.pullId);
            let target = flag;
            if (group.needBoost && !creeps.boosted) {
                let mineral = group.needBoost;
                let lab = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                  filter: function (object) {return object.structureType == STRUCTURE_LAB && object.mineralType == mineral && object.mineralAmount>=1500;}
                });
                if (!lab) {
                    lab = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                      filter: function (object) {return object.structureType == STRUCTURE_LAB && object.mineralType == mineral && object.mineralAmount>=30;}
                    });
                }
                if (lab) {
                    target = lab;
                } else {
                    creeps.boosted = 1;
                }
            }
            
            if (pullCreep && target) {
                if (pullCreep.pos.isNearTo(target)){
                    if (group.needBoost && !creeps.boosted) {
                        creeps.boosted = 1;
                        if (target) {
                            target.boostCreep(pullCreep);
                        }
                    } else {
                        pullCreep.memory.pullerId = undefined;
                        pullCreep.memory.inPosition = 1;
                        creep.memory.pullId = undefined;
                        creep.memory.role = undefined;
                    }
                } else {
                    let res = creep.pull(pullCreep);
                    if (this.positionInBorder(creep) && !this.positionInBorder(pullCreep)) {
                        pullCreep.move(creep)
                        creep.moveTo(pullCreep);
                        creep.memory._trav = undefined;
                    } else if (res == ERR_NOT_IN_RANGE && !this.positionInBorder(creep.pos)) {
                        // helpers.smartMove(creep, pullCreep);
                        pullCreep.move(creep)
                        creep.moveTo(pullCreep);
                        creep.memory._trav = undefined;
                        creep.say('nir');
                        pullCreep.say('nir');
                    } else {
                        pullCreep.say(pullCreep.move(creep));
                        //creep.moveTo(target);
                        if (creep.pos.isNearTo(target)){
                            creep.move(creep.pos.getDirectionTo(pullCreep))    
                        } else {
                            helpers.smartMove(creep, target);    
                        }
                        
                    }     
                }
                
                
                
            } else {
                // creep.memory.pullId = undefined;
                // creep.suicide();
                //return to home
            }
        }
    
    
        
        
        
    },
    
};

module.exports = rolePuller;