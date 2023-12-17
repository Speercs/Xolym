var helpers = require('helpers');
var tsr = require('timeSavingRoom');
module.exports = {
    namePrefix: 'st4_',
    role : 'manualBuilder',
    creepsInfo: {
        melee: {
            prefix: 's4m_',
            body: b('19t21a10m'),
            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID],
        },
        heal: {
            prefix: 's4h_',
            body: b('1t9m39h1m'), 
            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE],
        },
        range: {
            prefix: 's4r_',
            body: b('12t28r10m'),
            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE],
        },
        healr: {
            prefix: 's4hr_',
            body: b('1t6m25h1m'), 
            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE],
        },
        dismantler: {
            prefix: 's4d_',
            body: b('25w25m'), 
            boosts: [],
        },
        
    },
    
    //Memory.st4level['E55N24'] = {};
    tickReset: function() {
        if (!Memory.st4level) return;
        for (let stGroup in Memory.st4level) {
            let stInfo = Memory.st4level[stGroup];
            if (!stInfo || stInfo.closed) continue;
            if (!stInfo.targetRoom) stInfo.targetRoom = stGroup;
            if (stInfo.room == undefined) {
                let spawnRoomInfo = require('observer').findClosestRoomByPath(stGroup, 26, 26, 25, true);
                console.log(JSON.stringify(spawnRoomInfo));
                if (!spawnRoomInfo) {
                    stInfo.room = 0;
                } else {
                    stInfo.room = spawnRoomInfo.roomName;
                    stInfo.pathLength = spawnRoomInfo.length;
                }
            }
            if (!stInfo.room) {
                stInfo.closed = 1
                continue;
            }
            
            let homeRoom = Game.rooms[stInfo.room];
            if (!homeRoom)  {
                stInfo.closed = 1
                continue;
            }
            
            
            this.runGroupRanged(stInfo, homeRoom);
            
            if (stInfo.completed) {
                this.runGroupDismantlers(stInfo, homeRoom);
            }
            
            
            
            
        }
        
    },
    runGroupDismantlers: function(stInfo, room) {
        if (!room.storage || !room.terminal) return;
        let count = 6;
        const role = 'dismantler';
        let creepLive = false;
        for (let i = 0; i<count;i++) {
            let name = this.namePrefix+this.creepsInfo[role].prefix+room.name+'_'+i;
            let creep = Game.creeps[name];
            if (!creep && !stInfo.cleared) {
                if (!this.creepsInfo[role].needEnergy) {
                    this.creepsInfo[role].needEnergy =  spawnCost(this.creepsInfo[role].body);
                }
                if (room.energyAvailable < this.creepsInfo[role].needEnergy) return;
                let spawn = tsr.getSpawn(room);
                if (!spawn) return;
                let res = spawn.spawnCreep(this.creepsInfo[role].body, name, {memory: {room: room.name, role: this.role, type: role, boosts: this.creepsInfo[role].boosts.slice()}});    
                if (res == OK) {
                    room.memory.spawnBusyTick = Game.time;
                    //this.energyBalance(room, -this.creepsInfo.linkManager.needEnergy);
                }
            }
            if (!creep) continue;
            if (creep.spawning) continue;
            creepLive = true;
            let corePos = new RoomPosition(15,35,stInfo.targetRoom);
            
            if (creep.memory.incomplete) {
                creep.memory.targetId = undefined;
                creep.memory.incomplete = undefined;
            }
            
            let targetId = creep.memory.targetId;
            if (creep.room.name != stInfo.targetRoom) {
                helpers.smartMove(creep, corePos, 0, 3);
            } else {
                let target;
                if (!targetId) {
                    creep.say('findT');
                    let containers = creep.room.find(FIND_STRUCTURES).filter(s=>s.structureType == STRUCTURE_CONTAINER && !s.store.getUsedCapacity() && s.pos.inRangeTo(corePos, 2));
                    if (containers.length) {
                        target = creep.pos.findClosestByPath(containers, {range:1});
                    } else {
                        let ramps = creep.room.find(FIND_HOSTILE_STRUCTURES).filter(s=>s.structureType == STRUCTURE_RAMPART);
                        let containerRamps = ramps.filter(s=> s.pos.lookFor(LOOK_STRUCTURES).some(c=>c.structureType == STRUCTURE_CONTAINER));
                        if (containerRamps.length) {
                            target = creep.pos.findClosestByPath(containerRamps, {range:1});
                        } else if (!stInfo.cleared){
                            stInfo.cleared = 1;
                            if (!Memory.collectWork[room.name]) {
                                Memory.collectWork[room.name] = {};
                            }
                            Memory.collectWork[room.name][Game.time] = {x:corePos.x, y:corePos.y, roomName:stInfo.targetRoom};
                        }
                        if (!target) {
                            target = creep.pos.findClosestByPath(ramps, {range:1});    
                        }
                    }
                    if (target) {
                        creep.memory.targetId = target.id;
                        targetId = target.id;
                    } else {
                        stInfo.cleared = 1;
                    }
                } else {
                    target = Game.getObjectById(targetId);    
                }
                
                if (!target) {
                    creep.memory.targetId = undefined;
                    continue;
                } else {
                    if (!creep.memory.near && creep.pos.getRangeTo(target) < 6) {
                        creep.memory.near = 1;
                        creep.memory._trav = undefined;
                    }
                    if (creep.pos.isNearTo(target)) {
                        creep.say(creep.dismantle(target))
                    } else {
                        if (creep.memory.near) {
                            let ret = creep.moveTo(target, {range:1});
                            if (ret == ERR_NO_PATH) {
                                creep.memory.targetId = undefined;
                            }
                        } else {
                            helpers.smartMove(creep, target);            
                        }
                    }
                }
            }
            
        }
        
        if (!creepLive && stInfo.cleared) {
            stInfo.closed = 1;
        }
    },
    
    runGroup: function(stInfo, room) {
        if (!room.storage || !room.terminal) return;
        if (stInfo.groupNum == undefined) stInfo.groupNum = 0;

        if (!stInfo.isSpawned) {
            ['melee','heal'].forEach(role => {
                let name = this.namePrefix+this.creepsInfo[role].prefix+room.name+'_'+stInfo.groupNum;
                let creep = Game.creeps[name];
                if (!creep) {
                    if (!this.creepsInfo[role].needEnergy) {
                        this.creepsInfo[role].needEnergy =  spawnCost(this.creepsInfo[role].body);
                    }
                    if (room.energyAvailable < this.creepsInfo[role].needEnergy) return;
                    let spawn = tsr.getSpawn(room);
                    if (!spawn) return;
                    let res = spawn.spawnCreep(this.creepsInfo[role].body, name, {memory: {room: room.name, role: this.role, type: role, boosts: this.creepsInfo[role].boosts.slice()}});    
                    if (res == OK) {
                        room.memory.spawnBusyTick = Game.time;
                        //this.energyBalance(room, -this.creepsInfo.linkManager.needEnergy);
                    }
                }
            });
        }
        let creep  = Game.creeps[this.namePrefix+this.creepsInfo['melee'].prefix+room.name+'_'+stInfo.groupNum];
        let creep2 = Game.creeps[this.namePrefix+this.creepsInfo['heal'].prefix+room.name+'_'+stInfo.groupNum];
        if (!creep || !creep2) {
            if (creep) creep.suicide();
            if (creep2) creep2.suicide();
            if (stInfo.isSpawned) {
                stInfo.groupNum++;
                stInfo.isSpawned = 0;
                stInfo.closed = 1;//!!!!!!!!!!!!
            }
            return;
        }
        if (creep.spawning || creep2.spawning) return;
        if (!stInfo.isSpawned) {
            stInfo.isSpawned = 1;
        }
        
        
        
        let isReady = true;
        [creep, creep2].forEach(creep => {
            if (creep.memory.boosts && creep.memory.boosts.length) {
               isReady = false;
            }
        })

        if (!isReady) {
            let flagWait = Game.flags['Flag'+room.name+'wait'];
            if (flagWait) {
                [creep, creep2].forEach(creep => {
                    if (!(creep.memory.boosts && creep.memory.boosts.length)) {
                       helpers.smartMove(creep, flagWait);
                    }
                })
            }
            return;
        }
        
        let target = Game.flags['FlagSt4'+stInfo.targetRoom];
        if (!target) return;
        
        this.pairHeal(creep, creep2);
        
        if (creep.room.name != target.pos.roomName) {
            if (!creep.pos.isNearTo(target)) {
                this.pairMove(creep, creep2, target);
            }
        }
        
        let targetInfo = {
            d: {dx: -1, dy: 1},
            0: {x:13, y:37},
            1: {x:14, y:37},
            2: {x:13, y:36},
            3: {x:14, y:36},
            4: {x:15, y:37},
            5: {x:13, y:35},
            6: {x:14, y:35},
            7: {x:15, y:36},
            8: {x:15, y:35},
        }
        if (stInfo.stage == undefined) stInfo.stage = 0;
        
        if (creep.memory.complete > 10) {
            stInfo.stage ++;
            creep.memory.complete = undefined;
            creep.memory.completeMove = 1;
        }
        
        if (!targetInfo[stInfo.stage]) {
            creep.say('all');
            stInfo.closed = 1;//!!!!!!!!!!!!
            return;
        }

        
        let posTarget = new RoomPosition(targetInfo[stInfo.stage].x + 0 * targetInfo.d.dx ,targetInfo[stInfo.stage].y + 0 * targetInfo.d.dy, stInfo.targetRoom);
        let posAttack = new RoomPosition(targetInfo[stInfo.stage].x + 1 * targetInfo.d.dx ,targetInfo[stInfo.stage].y + 1 * targetInfo.d.dy, stInfo.targetRoom);
        let posMiddle = new RoomPosition(targetInfo[stInfo.stage].x + 2 * targetInfo.d.dx ,targetInfo[stInfo.stage].y + 2 * targetInfo.d.dy, stInfo.targetRoom);
        let posEscape = new RoomPosition(targetInfo[stInfo.stage].x + 3 * targetInfo.d.dx ,targetInfo[stInfo.stage].y + 3 * targetInfo.d.dy, stInfo.targetRoom);
        
        
        // let posTarget = new RoomPosition(13,37,'E55N24');
        // let posAttack = new RoomPosition(12,38,'E55N24');
        // let posMiddle = new RoomPosition(11,39,'E55N24');
        // let posEscape = new RoomPosition(10,40,'E55N24');

        
        if (creep.memory.completeMove) {
            if (creep.pos.isEqualTo(posAttack) && creep2.pos.isEqualTo(posMiddle)) {
                creep.memory.completeMove = undefined;    
            } else {
                creep.move(creep.pos.getDirectionTo(posAttack));
                creep2.move(creep2.pos.getDirectionTo(posMiddle));
            }
            return;
        }
       
        if (creep.hits == creep.hitsMax && creep2.hits > creep2.hitsMax*0.9) {
            if (!creep.memory.inPosition && !creep.pos.isNearTo(posEscape)) {
                this.pairMove(creep, creep2, posEscape);
                creep.say('toEf');
            } else {
                creep.memory.inPosition = 1;
                if (creep.pos.isEqualTo(posAttack)) {
                    let targets = posTarget.lookFor(LOOK_STRUCTURES).filter(s=>![STRUCTURE_ROAD, STRUCTURE_CONTAINER].includes(s.structureType));
                    if (!targets.length) {
                        targets = posTarget.lookFor(LOOK_CREEPS).filter(c=>!c.my);
                    }
                    if (targets.length) {
                        if (targets[0].getActiveBodyparts && targets[0].getActiveBodyparts(ATTACK)) {
                            //no attack 
                        } else {
                            creep.attack(targets[0])    
                        }
                    } else {
                        creep.memory.complete = (creep.memory.complete || 0) + 1;
                        creep.say('complete'+creep.memory.complete);
                    }
                } else if (creep.pos.isNearTo(posAttack)) {
                    this.pairMove(creep, creep2, posAttack, 0);
                    creep.say('toA0');
                } else if (creep.pos.isNearTo(posMiddle)) {
                    this.pairMove(creep, creep2, posMiddle, 0);
                    creep.say('toM0');
                } else if (creep.pos.isNearTo(posEscape)) {
                    this.pairMove(creep, creep2, posEscape, 0);
                    creep.say('toE0');
                } else {
                    this.pairMove(creep, creep2, posEscape);
                    creep.say('toE');
                }
            }
        } else {
            if (creep.memory.inPosition) {
                this.pairMove(creep2, creep, posEscape, 0);
                creep.say('flee');
            } else {
                this.pairMove(creep, creep2, posEscape);
                creep.say('toEfH');
            }
        }
    },
    
    runGroupRanged: function(stInfo, room) {
        if (!room.storage || !room.terminal) return;
        if (stInfo.groupNum == undefined) stInfo.groupNum = 0;

        if (!stInfo.isSpawned) {
            ['range','healr'].forEach(role => {
                let name = this.namePrefix+this.creepsInfo[role].prefix+room.name+'_'+stInfo.groupNum;
                let creep = Game.creeps[name];
                if (!creep && !stInfo.completed) {
                    if (!this.creepsInfo[role].needEnergy) {
                        this.creepsInfo[role].needEnergy =  spawnCost(this.creepsInfo[role].body);
                    }
                    if (room.energyAvailable < this.creepsInfo[role].needEnergy) return;
                    let spawn = tsr.getSpawn(room);
                    if (!spawn) return;
                    let res = spawn.spawnCreep(this.creepsInfo[role].body, name, {memory: {room: room.name, role: this.role, type: role, boosts: this.creepsInfo[role].boosts.slice()}});    
                    if (res == OK) {
                        room.memory.spawnBusyTick = Game.time;
                        //this.energyBalance(room, -this.creepsInfo.linkManager.needEnergy);
                    }
                }
            });
        }
        let creep  = Game.creeps[this.namePrefix+this.creepsInfo['range'].prefix+room.name+'_'+stInfo.groupNum];
        let creep2 = Game.creeps[this.namePrefix+this.creepsInfo['healr'].prefix+room.name+'_'+stInfo.groupNum];
        if (!creep || !creep2) {
            if (creep) creep.suicide();
            if (creep2) creep2.suicide();
            if (stInfo.isSpawned) {
                stInfo.groupNum++;
                stInfo.isSpawned = 0;
                if (stInfo.groupNum >= 2 && !stInfo.completed) {
                    stInfo.closed = 1;//!!!!!!!!!!!!
                }
            }
            return;
        }
        if (creep.spawning || creep2.spawning) return;
        if (!stInfo.isSpawned) {
            stInfo.isSpawned = 1;
        }
        
        
        
        let isReady = true;
        [creep, creep2].forEach(creep => {
            if (creep.memory.boosts && creep.memory.boosts.length) {
               isReady = false;
            }
        })

        if (!isReady) {
            let flagWait = Game.flags['Flag'+room.name+'wait'];
            if (flagWait) {
                [creep, creep2].forEach(creep => {
                    if (!(creep.memory.boosts && creep.memory.boosts.length)) {
                       helpers.smartMove(creep, flagWait);
                    }
                })
            }
            return;
        }
        
        let target = Game.flags['FlagSt4'+stInfo.targetRoom];
        if (!target) return;
        
        this.pairHeal(creep, creep2);
        
        if (creep.room.name != target.pos.roomName) {
            if (!creep.pos.isNearTo(target)) {
                this.pairMove(creep, creep2, target);
            }
        }
        
        let targetInfo = {
            d: {dx: -1, dy: 1},
            0: {x:13, y:37},
            1: {x:14, y:36, coreId:'6437fcf7c4f73d0e863ce22f'},
            2: {x:14, y:36},
        }
        if (stInfo.stage == undefined) stInfo.stage = 0;
        
        if (creep.memory.complete > 3) {
            stInfo.stage ++;
            creep.memory.complete = undefined;
            creep.memory.completeMove = 1;
        }
        
        if (!targetInfo[stInfo.stage]) {
            creep.say('all');
            stInfo.completed = 1;
            return;
        }

        
        let posTarget = new RoomPosition(targetInfo[stInfo.stage].x + 0 * targetInfo.d.dx ,targetInfo[stInfo.stage].y + 0 * targetInfo.d.dy, stInfo.targetRoom);
        let posAttack = new RoomPosition(targetInfo[stInfo.stage].x + 1 * targetInfo.d.dx ,targetInfo[stInfo.stage].y + 1 * targetInfo.d.dy, stInfo.targetRoom);
        let posMiddle = new RoomPosition(targetInfo[stInfo.stage].x + 2 * targetInfo.d.dx ,targetInfo[stInfo.stage].y + 2 * targetInfo.d.dy, stInfo.targetRoom);
        let posEscape = new RoomPosition(targetInfo[stInfo.stage].x + 3 * targetInfo.d.dx ,targetInfo[stInfo.stage].y + 3 * targetInfo.d.dy, stInfo.targetRoom);
        
        
        
        if (creep.memory.completeMove) {
            if (creep.pos.isEqualTo(posMiddle) && creep2.pos.isEqualTo(posEscape)) {
                creep.memory.completeMove = undefined;    
            } else {
                creep.move(creep.pos.getDirectionTo(posMiddle));
                creep2.move(creep2.pos.getDirectionTo(posEscape));
            }
            return;
        }
       
        if (creep.hits == creep.hitsMax && creep2.hits > creep2.hitsMax*0.9) {
            if (!creep.memory.inPosition && !creep.pos.isNearTo(posEscape)) {
                this.pairMove(creep, creep2, posEscape);
                creep.say('toEf');
            } else {
                creep.memory.inPosition = 1;
                if (creep.pos.isEqualTo(posMiddle)) {
                    if (targetInfo[stInfo.stage].coreId) {
                        let core = Game.getObjectById(targetInfo[stInfo.stage].coreId);
                        if (core) {
                            creep.rangedAttack(core)
                        } else {
                            creep.memory.complete = (creep.memory.complete || 0) + 1;
                            creep.say('complete'+creep.memory.complete); 
                            stInfo.completed = 1;
                        }
                    } else {
                        let targets = posTarget.lookFor(LOOK_STRUCTURES).filter(s=>![STRUCTURE_ROAD, STRUCTURE_CONTAINER].includes(s.structureType));
                        if (!targets.length) {
                            targets = posTarget.lookFor(LOOK_CREEPS).filter(c=>!c.my);
                        }
                        if (targets.length) {
                            creep.rangedAttack(targets[0]);    
                        } else {
                            creep.memory.complete = (creep.memory.complete || 0) + 1;
                            creep.say('complete'+creep.memory.complete);
                        }
                    }
                } else if (creep.pos.isNearTo(posMiddle)) {
                    this.pairMove(creep, creep2, posMiddle, 0);
                    creep.say('toM0');
                } else if (creep.pos.isNearTo(posEscape)) {
                    this.pairMove(creep, creep2, posEscape, 0);
                    creep.say('toE0');
                } else {
                    this.pairMove(creep, creep2, posEscape);
                    creep.say('toE');
                }
            }
        } else {
            if (creep.memory.inPosition) {
                this.pairMove(creep2, creep, posEscape, 0);
                creep.say('flee');
            } else {
                this.pairMove(creep, creep2, posEscape);
                creep.say('toEfH');
            }
        }
    },
    
    pairMove: function(creep, creep2, target, range = 1) {
        
        if (this.positionInBorder(creep)) {
            helpers.smartMove(creep, target);
            helpers.smartMove(creep2, target);
        } else if (creep2.pos.isNearTo(creep) && !creep2.fatigue) {
            if (creep.hits == creep.hitsMax) {
                helpers.smartMove(creep, target, 0, range);
                creep2.move(creep2.pos.getDirectionTo(creep));
            }
        } else {
            helpers.smartMove(creep2, creep);
            if (creep.pos.getRangeTo(creep2)>3) {
                helpers.smartMove(creep, creep2);    
            } else {
                creep.say('w');    
            }
            
        }
    },
    
    pairHeal: function(creep, creep2) {
        if (!creep2.pos.isNearTo(creep)) {
            if (creep2.hits < creep2.hitsMax) {
                creep2.heal(creep2);    
            } else {
                if (creep.pos.inRangeTo(creep2, 3)) {
                    creep2.rangedHeal(creep);
                } else {
                    creep2.heal(creep2);    
                }
            }
        } else if (creep.hits == creep.hitsMax && creep2.hits < creep2.hitsMax*0.7) {
            creep2.heal(creep2);
        } else {
            creep2.heal(creep);
        }
    },
    
    positionInBorder: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 1 || pos.x >48 || pos.y < 1 || pos.y > 48);
    },
  
    
};