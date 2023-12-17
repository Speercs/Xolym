var helpers = require('helpers');

//timeSavingEnable(roomName)

module.exports = {
    namePrefix: 'tsr_',
    role : 'tsr',
    creepsInfo: {
        suplier: {
            prefix: 'su_',
            needEnergy: 1950, //MOVE*13,CARRY*26 carry	1.95K
            body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,],
        },
        helper: {
            prefix: 'he_',
            needEnergy: 300, 
            body: [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],
        },
        miner: {
            prefix: 'mi_',
            needEnergy: 1400,
            body: [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,WORK,MOVE,]
        },
        minerBoosted: {
            prefix: 'mi_',
            needEnergy: 2200,
            body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,CARRY,WORK], //MOVE*8,WORK*16,CARRY*4
        },
        linkManager: {
            prefix: 'lm_',
            needEnergy: 850,
            body: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY],
        },
         linkManagerBoosted: {
            prefix: 'lm_',
            needEnergy: 2500, // MOVE*1,CARRY*49
            //body: [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY],
            body: b('1m49c'),
        },
        upgrader: {
            prefix: 'up_',
            needEnergy: 1800, // MOVE*4,WORK*15,CARRY*2
            body: [MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,CARRY,WORK,],
            soonDie: 78,
        },
        wallBuilder: {
            prefix: 'wb',
            needEnergy: 3200,
            body: [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,MOVE,],
        },
        mineralHarvester: {
            prefix: 'hv',
            needEnergy: 3050, //MOVE*16,WORK*13,CARRY*19
            body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,MOVE,],
        },
    },
    maxBucketLabStop: 5000,
    maxBucketLabStopShard: {
        'shard1': 1000,
        'shard2': 1000,
    },
    maxBucketStop: 4000,
    maxBucketUpgraderStop: 1000,
    maxBucketUpgraderStopShard: {
        'shard1': 1,
    },
    maxBucketHarvesterSpawn: 8000,
    mrShardOff: ['shard3_','shard1'],
    mineralShardOff: ['shard3','shard1'],
    init: function(room) {
        // delete room.memory.tsrInfo;

        if (!room.memory.tsrInfo) {
            room.memory.tsrInfo = {};
        }
        
        if (!room.memory.tsrInfo.tsrInfoUpdate || Game.time > room.memory.tsrInfo.tsrInfoUpdate) {
            room.memory.tsrInfo.tsrInfoUpdate = Game.time + 1000 + Math.floor(Math.random() * 101);
            
            //room.memory.tsrInfo.minBorderRampHp = require('role.wallbuilder').getRoomRampartsHP(room);
            
            let targets = room.find(FIND_STRUCTURES, {filter: object => object.structureType == STRUCTURE_WALL || (object.structureType == STRUCTURE_RAMPART && object.my)});
            if(targets.length) {
                room.memory.tsrInfo.minRampHp = _.min(targets, 'hits').hits;
            } else {
                room.memory.tsrInfo.minRampHp = undefined;
            }
            
            room.memory.tsrInfo.wallBuilder = 0;
            if (room.memory.tsrInfo.minRampHp &&        room.memory.tsrInfo.minRampHp < 10000000 && Game.cpu.bucket > 5000 && room.storage && room.terminal && room.storage.store[RESOURCE_ENERGY] > 25000) {
                room.memory.tsrInfo.wallBuilder = 1;
            } else if (room.memory.tsrInfo.minRampHp && room.memory.tsrInfo.minRampHp < 1000000  && Game.cpu.bucket > 5000 && room.storage && room.terminal && room.storage.store[RESOURCE_ENERGY] > 15000) {
                room.memory.tsrInfo.wallBuilder = 1;
            } else if (room.find(FIND_MY_CONSTRUCTION_SITES).length                              && Game.cpu.bucket > 5000 && room.storage && room.terminal && room.storage.store[RESOURCE_ENERGY] > 15000) {
                room.memory.tsrInfo.wallBuilder = 1;
            } 
            
        }
        
        if (room.memory.tsrInfo.mineralTime == undefined || (room.memory.tsrInfo.mineralTime && Game.time > room.memory.tsrInfo.mineralTime)) {
            room.memory.tsrInfo.mineral = 0;
            room.memory.tsrInfo.mineralTime = 0;
            let extractors = room.find(FIND_MY_STRUCTURES).filter(s=>s.structureType == STRUCTURE_EXTRACTOR);
            if (extractors.length){
                let minerals = room.find(FIND_MINERALS);
                if (minerals.length){
                    if (minerals[0].mineralAmount) {
                        if (this.mineralShardOff.includes(Game.shard.name) && Memory.stock) {
                            if (Memory.stock[minerals[0].mineralType] < 7000) {
                                room.memory.tsrInfo.mineral = 1;        
                            } else {
                                room.memory.tsrInfo.mineralTime = Game.time + 5000;                
                            }
                        } else {
                            room.memory.tsrInfo.mineral = 1;    
                        }
                    } else {
                        room.memory.tsrInfo.mineralTime = Game.time + minerals[0].ticksToRegeneration;
                    }
                }
            } else {
                room.memory.tsrInfo.mineralTime = Game.time + 5000;
                //Game.notify('no extractor in room '+room.name)
            }
        }

        
        
    },
    
    manageRoom: function(room) {
        if (!room || !room.controller || !room.controller.my || room.controller.level < 7 ) return;
        const startCpu = Game.cpu.getUsed();
        
        this.init(room);
        this.suplierRun(room);
        this.minerRun(room, 0);
        this.minerRun(room, 1);
        this.linkManagerRoom(room);
        this.mrSpawn(room);
        this.upgraderRun(room);
        
        this.wallBuilderRun(room, room.memory.tsrInfo.wallBuilder);
        //this.mineralHarvesterRun(room, 0); //need check mineral aviable deprecated
        require('tsrMineral').runProcess(room);
        
        require('tsrDropper').dropperRun(room);
        
        if (!this.defendRoom(room)) {
            this.towerHealRepair(room);    
        }
        if (!(Game.time%300)){
            helpers.checkNuke(room.name);
        }
        
        this.manageTerminal(room);
        this.manageLabs(room);
        if (Game.shard.name == 'shard1') {
            require('market').sellResources(room);
        }
        require('terminal').tsrCustomCheck(room);
        
        this.profileCpu(room, Game.cpu.getUsed() - startCpu);
    },
    
    mrSpawn: function(room) {
        if (this.mrShardOff.includes(Game.shard.name)) return; //shard3 off mr spawn
        if (Game.time%10) return;
        if (Memory.massRangers && Object.values(Memory.massRangers).some(mr=>mr && mr.room == room.name && mr.count) ) {
            let freeSpawn = this.getSpawn(room);
            if (freeSpawn) {
                freeSpawn = require('role.massRanger').spawnHelpers(room, undefined, freeSpawn);
                if (!freeSpawn) {
                    room.memory.spawnBusyTick = Game.time;
                }
            }
        }
    },
    
    manageTerminal: function(room) {
        if (!room.memory.tsrInfo.manageTerminalTime || Game.time > room.memory.tsrInfo.manageTerminalTime) {
            //console.log('manageTerminal', room.name);
            let res = require('terminal').runTerminalQueue(room);
            if (res) {
                room.memory.tsrInfo.manageTerminalTime = Game.time + res;
            }
        }
    },
    
    energyBalance: function(room, delta) {
        // room.memory.tsrEnergyBalance = 0;
        // room.memory.tsrEnergyBalanceLog = [];
        // return;
        room.memory.tsrEnergyBalance = (room.memory.tsrEnergyBalance || 0) + delta;
        
        delete room.memory.tsrEnergyBalanceLog;
        return;
        //log
        if (!room.memory.tsrEnergyBalanceLog) room.memory.tsrEnergyBalanceLog = [];
        room.memory.tsrEnergyBalanceLog.push(''+Game.time+' delta '+delta+', balance '+room.memory.tsrEnergyBalance);
        if (room.memory.tsrEnergyBalanceLog.length > 50) {
            room.memory.tsrEnergyBalanceLog.shift();
        }
    },
    
    defendRoom: function(room) {
        let enemys = room.find(FIND_HOSTILE_CREEPS);
        if (enemys.length) {
            room.memory.tsr_attaked  = (room.memory.tsr_attaked || 0) + 1;
            if (room.memory.tsr_attaked > 60) {
                enemys = enemys.filter(e=>room.storage.pos.inRangeTo(e, 15));
            }
            if (room.memory.tsr_attaked > 160) {
                Game.notify(`SET ON Defend Room Mode in room ${room.name}`, 0); 
            }
            let towers = room.find(FIND_MY_STRUCTURES, {filter: struct => struct.structureType == STRUCTURE_TOWER});
            if (towers.length) {
                let target = towers[0].pos.findClosestByRange(enemys);
                if (room.memory.tsr_attaked && room.memory.tsr_attaked > 80 && towers[0].pos.getRangeTo(target)>29) {
                    towers = [];
                }
                towers.forEach(tower => {
                    if (tower.attack(target) == OK) {
                        this.energyBalance(room, -TOWER_ENERGY_COST);
                    }
                }); 
            }
            
            return 1;
        } else if (room.memory.tsr_attaked) {
            delete room.memory.tsr_attaked;
        }
    },
    towerHealRepair: function(room) {
        require('profiler').start('towerHealRepair');
        var targets = room.find(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        if(targets.length > 0) {
            room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}}).forEach(tower => {
                if (tower.heal(targets[0]) == OK) {
                    this.energyBalance(room, -TOWER_ENERGY_COST);
                }
            });
        } else {
            if (!room.memory.nextRepairTime || Game.time > room.memory.nextRepairTime) {
                let targets = room.find(FIND_STRUCTURES, {
                    filter: object => ([STRUCTURE_ROAD, STRUCTURE_RAMPART, STRUCTURE_WALL].includes(object.structureType) || (object.structureType == STRUCTURE_CONTAINER && room.memory.labContainerPos && object.pos.x == room.memory.labContainerPos.x && object.pos.y == room.memory.labContainerPos.y))
                        && object.hits < object.hitsMax
                        && ((object.hits<2000 && object.structureType == STRUCTURE_ROAD) || (object.hits<20000 && object.structureType != STRUCTURE_ROAD))
                });
                if(targets.length > 0) {
                    let target = _.min(targets, 'hits');
                    room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}}).forEach(tower => {
                        if (tower.energy>500 && tower.repair(target) == OK){
                            this.energyBalance(room, -TOWER_ENERGY_COST);
                        }
                    });
                } else {
                    room.memory.nextRepairTime = Game.time+200+Math.ceil(Math.random()*100);
                }
            }
        }
        require('profiler').end('towerHealRepair');
    },
    
    getSpawn: function(room) {
        //!todo sleep if all spawn busy
        if (room.memory.spawnBusyTick == Game.time) return;
        const spawns = room.find(FIND_MY_STRUCTURES).filter(structure => structure.structureType == STRUCTURE_SPAWN && !structure.spawning)
        if (spawns.length){
            return spawns[0];
        }
    },
    
    suplierRun: function(room) {
        if (!(Game.time%50) && !Memory.roomNeedEnergy[room.name] && room.terminal && room.storage && room.terminal.store[RESOURCE_ENERGY] < 60000 && room.storage.store[RESOURCE_ENERGY] < 75000) {
            Memory.roomNeedEnergy[room.name]  = 1;
        }

        let name = this.namePrefix+this.creepsInfo.suplier.prefix +room.name;
        let creep = Game.creeps[name];
        if (!creep) {
            if (room.energyAvailable < 300) return;
            let spawn = this.getSpawn(room);
            if (!spawn) return;
            if (room.energyAvailable >= this.creepsInfo.suplier.needEnergy) {
                let res = spawn.spawnCreep(this.creepsInfo.suplier.body, name, {memory: {room: room.name, role: this.role}});    
                if (res == OK) {
                    room.memory.spawnBusyTick = Game.time;
                    this.energyBalance(room, -this.creepsInfo.suplier.needEnergy);
                }
            } else if (room.energyAvailable >= this.creepsInfo.helper.needEnergy) {
                let res = spawn.spawnCreep(this.creepsInfo.helper.body, name, {memory: {room: room.name, role: this.role, helper: 1}});    
                if (res == OK) {
                    room.memory.spawnBusyTick = Game.time;
                    this.energyBalance(room, -this.creepsInfo.helper.needEnergy);
                }
            }
        } else {
            if (creep.spawning) return;
            if (creep.memory.helper && !creep.store.getUsedCapacity() && room.energyAvailable >= this.creepsInfo.suplier.needEnergy) {
                room.memory.spawnBusyTick = Game.time; //no spawn at this tick!!
                creep.suicide();
                return;
            }
            if (creep.memory.labDeal) {
                creep.say('lab');
                if (!this.labServeRun(creep)) return;
            }
            if (this.taskGetRun(creep)) {
                creep.say('tGet');
                return;
            }
                
            if (require('role.filler').run(creep)) {//no default task
                creep.say('lab?');
                this.labServeRun(creep);
                this.labContainerCheck(creep);
            }
        }
    },
    
    manageLabs: function(room) {
        if (room.memory.resetLab) return;
        let labInfo = _.get(Memory, 'labs.rooms.'+room.name+'.labConfig', false);
        if (!labInfo) return;
        if (labInfo.time < 60 && Game.cpu.bucket < (this.maxBucketLabStopShard[Game.shard.name]?this.maxBucketLabStopShard[Game.shard.name]:this.maxBucketLabStop)) return;
        if (!(Game.time%labInfo.time)) {
            let labs = room.find(FIND_STRUCTURES, {
               filter: { structureType: STRUCTURE_LAB }
            });
            if (labs.length == 10){
                if (room.memory.boostLab && room.memory.boostLab.time > Game.time) {
                    let skip = room.memory.boostLab.boosts.length;
                                        
                    labInfo.reaction.some(trio => {
                        if (trio[0] >= skip && trio[1] >= skip && trio[2] >= skip) {
                            let res = labs[trio[0]].runReaction(labs[trio[1]], labs[trio[2]]);
                            //console.log(room.name, trio, res, labs[trio[0]].id, labs[trio[1]].id, labs[trio[2]].id );
                            if (res == ERR_INVALID_ARGS) {
                                room.memory.resetLab = 1;
                            }
                            //return res !== OK;
                        }
                    })
                } else {
                    labInfo.reaction.some(trio => {
                        let res = labs[trio[0]].runReaction(labs[trio[1]], labs[trio[2]]);
                        // if (Game.shard.name  == 'shard2') {
                        //     console.log(room.name, trio, res, labs[trio[0]].id, labs[trio[1]].id, labs[trio[2]].id );    
                        // }
                        if (res == ERR_INVALID_ARGS) {
                            room.memory.resetLab = 1;
                        }
                        //return res !== OK;
                    })
                }
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
                    for(const resourceType in target.store) {
                        creep.withdraw(target, resourceType);
                        break;
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
                    return;
                }
            }
        }
        return 1;
    },
    
    labContainerCheck: function(creep) {
        if (creep.memory.taskGet) return;
        let container;
        if (creep.memory.labContainerId == undefined) {
            creep.memory.labContainerId == 0;
            const labContainerCoord = _.get(Memory, 'labs.rooms.'+creep.room.name+'.labContainerPos', 0);
            if (labContainerCoord) {
                const labContainerPos = new RoomPosition(labContainerCoord.x, labContainerCoord.y, creep.room.name);//labContainerCoord.roomName    
                const containers =  _.filter(labContainerPos.lookFor(LOOK_STRUCTURES), {structureType: STRUCTURE_CONTAINER});
                if (containers.length) {
                    container = containers[0];
                    creep.memory.labContainerId = container.id;
                }
            }
        }
        if (!container && creep.memory.labContainerId) {
            container = Game.getObjectById(creep.memory.labContainerId);
        }
        if (container && container.store.getUsedCapacity() >= 1000) {
            creep.memory.taskGet = container.id;
        }
    },
    
    labServeRun: function(creep) {
        if (creep.memory.labServe === undefined) {
            let labInfo = _.get(Memory, 'labs.rooms.'+creep.room.name+'.labConfig.labs', false);
            if (!labInfo) {
                console.log('try updateLabConfig in room', creep.room.name);
                require('lab').updateLabConfig(creep.room);
                require('lab').updateLabTask(creep.room);
            }
            creep.memory.labServe = 1;
        }
        if (creep.memory.labServe) {
            let labInfo = _.get(Memory, 'labs.rooms.'+creep.room.name+'.labConfig.labs', []);
            if (!labInfo) {
                creep.memory.labServe = 0;
            } else if (creep.room.memory.boostLab && Game.time < creep.room.memory.boostLab.time && creep.room.memory.boostLab.boosts) {
                labInfo = creep.room.memory.boostLab.boosts.concat(labInfo.slice(creep.room.memory.boostLab.boosts.length));
                //console.log(creep.room.name, labInfo);
            }
            //console.log(creep.room.name, labInfo);
            delete creep.room.memory.hibernate_lab;
            if (!require('role.suplier').labDeal(creep, labInfo)) {
                creep.memory.sleep = undefined;
                creep.memory.labDeal = 1;
                return;
            } else {
                creep.memory.labDeal = undefined;
            }
        }
        return true;
    },
    
    minerRun: function(room, num) {
        let name = this.namePrefix+this.creepsInfo.miner.prefix+room.name+'_'+num;
        let creep = Game.creeps[name];
        if (!creep) {
            let role = (room.memory.regenSourceTime > Game.time - 5000) ? 'minerBoosted' : 'miner';
            if (room.energyAvailable < this.creepsInfo[role].needEnergy) return;
            if (room.memory.tsr_attaked) return;
            let spawn = this.getSpawn(room);
            if (!spawn) return;
            let res = spawn.spawnCreep(this.creepsInfo[role].body, name, {memory: {room: room.name, role: this.role}});    
            if (res == OK) {
                room.memory.spawnBusyTick = Game.time;
                this.energyBalance(room, -this.creepsInfo[role].needEnergy);
            }
        } else {
            if (creep.spawning) return;
            if (helpers.sleep(creep)) return;
            if (creep.memory.targetId == undefined) {
                let sources = room.find(FIND_SOURCES);
                if (sources.length >= (num +1)) {
                    creep.memory.targetId = sources[num].id;
                    let containers = sources[num].pos.findInRange(FIND_STRUCTURES, 1, {filter: struct => struct.structureType == STRUCTURE_CONTAINER});
                    let containerPos;
                    if (containers.length) {
                        containerPos = containers[0].pos; 
                        creep.memory.targetPos = {x:containers[0].pos.x,y:containers[0].pos.y,roomName: room.name};
                        creep.memory.containerId = containers[0].id;
                    } else {
                        Game.notify('no container for miner in room '+ room.name);
                        
                        let cc = sources[num].pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1, {filter: cs => cs.structureType == STRUCTURE_CONTAINER});
                        if (cc.length) {
                            containerPos = cc[0].pos;
                            creep.memory.buildId = cc[0].id;
                            creep.memory.targetPos = {x:cc[0].pos.x,y:cc[0].pos.y,roomName: room.name};
                        } else {
                            creep.memory.targetId = 0;
                        }
                    }
                    if (containerPos) {
                        let links = containerPos.findInRange(FIND_STRUCTURES, 1, {filter: struct => struct.structureType == STRUCTURE_LINK});
                        if (links.length) {
                            creep.memory.linkId = links[0].id;
                        } else {
                            Game.notify('no link for miner in room '+ room.name);
                            creep.memory.targetId = 0;
                        }
                    } else {
                        Game.notify('no ??? for miner in room '+ room.name);
                        creep.memory.targetId = 0;
                    }
                    

                } else {
                    Game.notify('no source for miner in room '+ room.name);
                    creep.memory.targetId = 0;
                }
            }
            if (!creep.memory.targetId) return; 
            if (!creep.memory.inPosition) {
                let pos = new RoomPosition(creep.memory.targetPos.x, creep.memory.targetPos.y, room.name);
                if (creep.pos.isEqualTo(pos)) {
                    creep.memory.inPosition = 1;
                } else {
                    helpers.smartMove(creep, pos, 0, 0);  
                    return;
                }
            }
            let source = Game.getObjectById(creep.memory.targetId);
            if (!source) return;
            let container = Game.getObjectById(creep.memory.containerId);
            if (!container && !creep.memory.buildId) return;
            if (container && !creep.memory.repairId && container.hits < 0.5*container.hitsMax) {
                creep.memory.repairId = container.id;
            }
            let link = Game.getObjectById(creep.memory.linkId);
            if (!link) return;
            if (link.store.getFreeCapacity(RESOURCE_ENERGY) < 25 && !link.cooldown && room.memory.linkTransfer != Game.time) {
                let destLink = Game.getObjectById(room.memory.storageLink);
                if (destLink && !destLink.store.getUsedCapacity(RESOURCE_ENERGY)) {
                    if (link.transferEnergy(destLink) == OK) {
                        room.memory.linkTransfer = Game.time;
                    }
                }
            }
            
            if (!source.energy && source.ticksToRegeneration) {
                if (container && container.store[RESOURCE_ENERGY]) {
                    creep.withdraw(container, RESOURCE_ENERGY)
                } else {
                    if (creep.ticksToLive <= source.ticksToRegeneration) {
                        creep.suicide();
                    } else {
                        if (room.memory.regenSourceTime > Game.time - 5000) {
                            if (source.ticksToRegeneration > 90) { 
                                creep.memory.sleep = Game.time + source.ticksToRegeneration-60;
                            } else if (source.ticksToRegeneration > 25) {
                                creep.memory.sleep = Game.time + source.ticksToRegeneration-20;
                            } else if (source.ticksToRegeneration > 7) {
                                creep.memory.sleep = Game.time + source.ticksToRegeneration-5;
                            } else {
                                creep.memory.sleep = Game.time + source.ticksToRegeneration;            
                            }
                            creep.say('s'+(creep.memory.sleep - Game.time), 1);
                        } else {
                            creep.memory.sleep = Game.time + source.ticksToRegeneration;        
                        }
                    }
                    
                    return;
                }
            }
            if (creep.store.getFreeCapacity() < creep.getActiveBodyparts(WORK) * HARVEST_POWER) {
                if (creep.memory.buildId) {
                    let obj = Game.getObjectById(creep.memory.buildId);
                    if (obj) {
                        creep.build(obj);    
                    } else {
                        creep.memory.buildId = undefined;
                        creep.memory.targetId = undefined;
                        return;
                    }
                } else if (creep.memory.repairId) {
                    let obj = Game.getObjectById(creep.memory.repairId);
                    if (!obj || obj.hits>=0.99*obj.hitsMax) {
                        creep.memory.repairId = undefined;
                    } else {
                        creep.repair(obj);
                    }
                } else {
                    creep.transfer(link, RESOURCE_ENERGY);
                }
            }
            
            if (creep.store.getFreeCapacity()) {// >= creep.getActiveBodyparts(WORK) * HARVEST_POWER) {
                let res = creep.harvest(source);
                //creep.say(res);
                if (res == ERR_NOT_IN_RANGE) {
                    creep.memory.inPosition = 0;
                    return;
                // } else if (res == ERR_NOT_ENOUGH_RESOURCES && source.ticksToRegeneration)  {
                //     if (container && container.store[RESOURCE_ENERGY]) {
                //         creep.withdraw(container, RESOURCE_ENERGY)
                //     } else {
                //         creep.memory.sleep = Game.time + source.ticksToRegeneration;    
                //     }
                } else if (res == OK) {
                    
                }
            }
        }
    },
    
    linkManagerRoom: function(room) {
        if (!room.storage || !room.terminal) return;
        let role = 'linkManager';
        if (Game.shard.name == 'shard1' && room.name == 'E41N38') {
            role = 'linkManagerBoosted';
        }
        let name = this.namePrefix+this.creepsInfo[role].prefix+room.name;
        let creep = Game.creeps[name];
        if (!creep) {
            if (room.energyAvailable < this.creepsInfo[role].needEnergy) return;
            let spawn = this.getSpawn(room);
            if (!spawn) return;
            let res = spawn.spawnCreep(this.creepsInfo[role].body, name, {memory: {room: room.name, role: this.role}});    
            if (res == OK) {
                room.memory.spawnBusyTick = Game.time;
                this.energyBalance(room, -this.creepsInfo[role].needEnergy);
            }
        } else {
            if (creep.spawning) return;
            
            if (!creep.memory.inPosition) {
                if (!room.memory.storageLinkPos) {
                    Game.notify('no storageLinkPos for linkManager in room '+ room.name);
                    require('role.roomDefender').findStorageLinkPos(creep.room);
                    return;
                }
                let pos = new RoomPosition(room.memory.storageLinkPos.x, room.memory.storageLinkPos.y, room.name);
                if (creep.pos.isEqualTo(pos)) {
                    creep.memory.inPosition = 1;
                } else {
                    helpers.smartMove(creep, pos, 0, 0);
                    return;
                }
            } else {
                
                if (!((Game.time+1)%10)) creep.say('cpuAvg');
                if (!((Game.time+0)%10)) creep.say(creep.room.memory.tsrInfo.cpuAvg2.toFixed(2));
                
                // if (!((Game.time+2)%10)) creep.say('energy');
                // if (!((Game.time+1)%10)) creep.say('balance');
                // if (!((Game.time+0)%10)) creep.say(creep.room.memory.tsrEnergyBalance, 1);
            }
            
            if (creep.memory.recyclePickup == undefined && creep.memory.inPosition) {
                let flag = Game.flags['FlagRecycle'+room.name];
                creep.memory.recyclePickup = (flag && creep.pos.isNearTo(flag)) ? 1 : 0;
            }

            
            //transfer to terminal needed res
            if (1 && creep.room.memory.transferToTerminal) {
                if (creep.room.storage.store.getFreeCapacity()>2000 && creep.room.terminal.store.getFreeCapacity()>10000) {
                    creep.say('toTerm');
                    let resource = creep.room.memory.transferToTerminal.resource;
                    let amount = creep.room.memory.transferToTerminal.amount;
                    if (creep.store[resource]) {
                        if (creep.pos.isNearTo(creep.room.terminal)) {
                            creep.transfer(creep.room.terminal, resource);
                        } else {
                            creep.memory.inPosition = undefined;
                        }
                    } else {
                        if (creep.pos.isNearTo(creep.room.storage)) {
                            if (creep.store.getUsedCapacity()) {
                                for(const resourceType in creep.store) {
                                    creep.transfer(creep.room.storage, resourceType);
                                }    
                            } else {
                                let res = creep.withdraw(creep.room.storage, resource);
                                if (res == ERR_NOT_ENOUGH_RESOURCES) {
                                    creep.room.memory.transferToTerminal = undefined;
                                }
                            }
                        } else {
                            creep.memory.inPosition = undefined;
                        }
                    }
                    if (creep.room.terminal.store[resource] >= amount) {
                        creep.room.memory.transferToTerminal = undefined;
                    }
                    return;
                } else {
                    let res = freeSpace(creep.room.name);
                    Game.notify('Need free space to transfer resources to terminal in room '+creep.room.name+' free space result '+res);
                }
            }
            
            if (creep.store.getUsedCapacity()) {
                let target = room.storage;
                if (!target.store.getFreeCapacity()) {
                    target = room.terminal;
                }
                if (room.terminal && room.terminal.store[RESOURCE_ENERGY]< 50000 && room.terminal.store.getFreeCapacity() && !creep.memory.backTransfer) {
                    target = room.terminal;
                }
                if (!target.store.getFreeCapacity()) {
                    target = null;
                }
                for (let resource in creep.store) {
                    if (target) {
                        let res = creep.transfer(target, resource);
                        if (res == ERR_NOT_IN_RANGE) {
                            creep.memory.inPosition = undefined;
                        }
                        
                    } else {
                        creep.drop(resource);
                    }
                    break;
                }
            } else {
                let link = Game.getObjectById(room.memory.storageLink);
                let res;
                if (link && link.store[RESOURCE_ENERGY]) {
                    res = creep.withdraw(link, RESOURCE_ENERGY);
                    if (res == OK) {
                        this.energyBalance(room, link.store[RESOURCE_ENERGY]);
                    }
                } else if (room.storage && room.terminal && room.terminal.store[RESOURCE_ENERGY]>60000 && room.storage.store.getFreeCapacity()> 5000) {
                    res = creep.withdraw(creep.room.terminal, RESOURCE_ENERGY);
                } else if (room.storage && room.terminal && room.terminal.store[RESOURCE_ENERGY]<50000 && room.terminal.store.getFreeCapacity()> 5000 && room.storage.store[RESOURCE_ENERGY]>100000 && !creep.memory.backTransfer) {
                    res = creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                } else {
                    if (creep.memory.recyclePickup && creep.memory.recyclePickup < Game.time) {
                        let flag = Game.flags['FlagRecycle'+room.name];
                        if (flag && creep.pos.isNearTo(flag)) {
                            creep.say('fR',1);
                            let founds = flag.pos.lookFor(LOOK_TOMBSTONES).filter(t=>t.store.getUsedCapacity());
                            if (founds.length) {
                                for(const resourceType in founds[0].store) {
                                    res = creep.withdraw(founds[0], resourceType);
                                    break;
                                }  
                                if (res == ERR_NOT_IN_RANGE) {
                                    creep.memory.recyclePickup = 0;
                                }
                                return;
                            } else {
                                creep.memory.recyclePickup = Game.time + 20;
                            }
                        } else {
                            creep.memory.recyclePickup = 0;
                        }
                    }
                    
                    if (1) { //auto transfer to storage 
                        if (this.autoTransferToStorage(creep)) return
                    }
                }
                if (res == ERR_NOT_IN_RANGE) {
                    creep.memory.inPosition = undefined;
                }
            }
        } 
        
    },
    
    autoTransferToStorage: function(creep) {
        let doTransfer = false;
        if ( !(Game.time%20) && !creep.memory.backTransfer /*&& Game.cpu.bucket > this.maxBucketStop*/ && creep.pos.isNearTo(creep.room.storage) && creep.pos.isNearTo(creep.room.terminal)) {
            if (creep.room.terminal.store.getFreeCapacity() < 150000 && creep.room.storage.store.getFreeCapacity()>100000){
                doTransfer = true;
            } else if (creep.room.terminal.store.getFreeCapacity() < 25000 && creep.room.storage.store.getFreeCapacity()>15000){ //test
                doTransfer = true;
            } else if (creep.room.terminal.store.getFreeCapacity() < 5000 && creep.room.storage.store.getFreeCapacity()>20000){
                doTransfer = true;
            } else if (creep.room.terminal.store.getFreeCapacity() < 500 && creep.room.storage.store.getFreeCapacity()>6000){
                doTransfer = true;
            }
        }
        
        if (doTransfer){
            let resource = 0;
            for(const resourceType in creep.room.terminal.store) {
                if ([RESOURCE_ENERGY, RESOURCE_CONDENSATE].indexOf(resourceType) >= 0) {
                    continue;
                }
                if (creep.room.terminal.store[resourceType] > 18000) {
                    creep.memory.backTransfer = {resource: resourceType, amount:  creep.room.storage.store[resourceType] + Math.max(5000,  creep.room.terminal.store[resourceType] - 13000)};
                    //console.log('transferToStorage in room', helpers.getRoomLink(creep.room.name), resourceType);
                    break;
                }
            }
        }
        
        if (1 && creep.memory.backTransfer && creep.room.storage.store.getFreeCapacity()>6000) {
            if (creep.memory.backTransfer) {creep.say('backTrans');}
            let resource = creep.memory.backTransfer.resource;
            let amount = creep.memory.backTransfer.amount;
            
            if((creep.store.getFreeCapacity() || creep.store.getUsedCapacity() == creep.store[RESOURCE_ENERGY]) && creep.room.terminal.store[resource]) {
                if (creep.store[RESOURCE_ENERGY]){
                    creep.transfer(creep.room.storage, RESOURCE_ENERGY);    
                } else {
                    creep.withdraw(creep.room.terminal, resource);
                }
                //creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else if (creep.store.getUsedCapacity()){
                for(const resourceType in creep.store) {
                    creep.transfer(creep.room.storage, resourceType);
                }
                //creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            if (!creep.room.terminal.store[resource] || creep.room.storage.store[resource] >= amount) {
                creep.memory.backTransfer = undefined;
            }
            return true;
        }        
    },
    
    upgraderRun: function(room) {
        let name1 = this.namePrefix+this.creepsInfo.upgrader.prefix+room.name;
        let name2 = name1+'_';
        let creep1 = Game.creeps[name1];
        let creep2 = Game.creeps[name2];
        let spawnEnable = true;
        if (Game.cpu.bucket < (this.maxBucketUpgraderStopShard[Game.shard.name] ? this.maxBucketUpgraderStopShard[Game.shard.name] : this.maxBucketUpgraderStop)) {
            spawnEnable = false;
        }            
        if (room.storage && room.storage.store[RESOURCE_ENERGY] < 20000) {
            spawnEnable = false;
        }

        if (!creep1 && !creep2) {
            this.upgraderRunSignle(room, creep1, name1, spawnEnable);
            return
        }
        
        if (creep1) {
            this.upgraderRunSignle(room, creep1, name1);
            if (!creep1.spawning && creep1.ticksToLive < this.creepsInfo.upgrader.soonDie) {
                this.upgraderRunSignle(room, creep2, name2, spawnEnable);    
                return;
            }
        }
        if (creep2) {
            this.upgraderRunSignle(room, creep2, name2);
            if (!creep2.spawning && creep2.ticksToLive < this.creepsInfo.upgrader.soonDie) {
                this.upgraderRunSignle(room, creep1, name1, spawnEnable);    
            }
        }
    },
    
    // Memory.rooms.E47N29.upgraderPos = {x:34, y:38};
    upgraderRunSignle: function(room, creep, name, spawnEnable = false) {
        if (!creep) {
            if (!spawnEnable) return;
            if (room.energyAvailable < this.creepsInfo.upgrader.needEnergy) return;
            let spawn = this.getSpawn(room);
            if (!spawn) return;
            let boosts = [];
            if (room.storage && room.storage.store[RESOURCE_ENERGY] < 10000) {
                //no boost
            } else {
                let boostAmount = _.get(Memory, 'stock.XGH2O',0);
                if (boostAmount > ((new Date()) >= (new Date('2022-08-01')) ? 30000 : 5100000)) {
                    boosts = [RESOURCE_CATALYZED_GHODIUM_ACID];
                } else if (boostAmount > 10000) {
                    require('spawn').checkUnboostAvaiable(room);
                    if (room.memory.unboostAvaiable) {
                        boosts = [RESOURCE_CATALYZED_GHODIUM_ACID];
                    }
                }
            }                
            let res = spawn.spawnCreep(this.creepsInfo.upgrader.body, name, {memory: {room: room.name, role: this.role, boosts: boosts.length?boosts.slice():undefined, boosted: boosts.length?1:undefined}});    
            if (res == OK) {
                room.memory.spawnBusyTick = Game.time;
                this.energyBalance(room, -this.creepsInfo.upgrader.needEnergy);
            }
        } else {
            if (creep.spawning) return;
            if (Game.cpu.bucket < (this.maxBucketUpgraderStopShard[Game.shard.name] ? this.maxBucketUpgraderStopShard[Game.shard.name] : this.maxBucketUpgraderStop) && !creep.memory.boosted) return;
            if (creep.memory.boosts) return this.boostCreep(creep);
            
            if (creep.memory.unBoost && !creep.store.getUsedCapacity()) {
                let pos = new RoomPosition(creep.memory.unBoost.pos.x, creep.memory.unBoost.pos.y, creep.memory.unBoost.pos.roomName);
                if (creep.pos.isEqualTo(pos)){
                    let lab = Game.getObjectById(creep.memory.unBoost.labId);
                    if (lab) {
                        if (!lab.cooldown) {
                            lab.unboostCreep(creep)    
                        } else if (lab.cooldown < creep.ticksToLive) {
                            creep.say('w'+lab.cooldown,1);
                            return;
                        } else {
                            Game.notify('lab TSR unboost error in room '+creep.room.name+' tick '+Game.time);
                        }
                    }
                    creep.memory.unBoost = 0;
                    creep.memory.role = undefined;
                    creep.suicide();
                } else {
                    helpers.smartMove(creep, pos, 0, 0);
                }
                return;
            }
            
            if (!(Game.time%50) && creep.memory.inPosition == 2 && creep.room.memory.upgraderPos) {
                delete creep.memory.inPosition;
            }
            if (!creep.memory.inPosition) {
                if (creep.room.memory.upgraderPos) {
                    let pos = new RoomPosition(creep.room.memory.upgraderPos.x, creep.room.memory.upgraderPos.y, creep.room.name);
                    if (creep.pos.isEqualTo(pos)) {
                        creep.memory.inPosition = 2;    
                    } else {
                        if (creep.pos.isNearTo(pos)) {
                            creep.say(creep.pos.getDirectionTo(pos));
                            creep.move(creep.pos.getDirectionTo(pos));
                            return;
                        } else {
                            //creep.moveTo(pos);    
                            helpers.smartMove(creep, pos);
                            return;
                        }
                    }
                } else {
                    creep.memory.inPosition = 1;
                }
            }
            
            //helpers.upgradeController(creep)
            //creep.say();
            let storage = creep.room.storage;
            let minInStorage = 5000;
            if (creep.store[RESOURCE_ENERGY] == 0){
                var target = storage;
                if (target && target.store[RESOURCE_ENERGY]>5000 && creep.ticksToLive>6 && creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);    
                }
            } else {
                if (creep.ticksToLive < 2) {
                    if (creep.transfer(storage, RESOURCE_ENERGY) == OK) {
                        this.energyBalance(room, creep.store[RESOURCE_ENERGY]);//?? check it
                    }
                }
                if (1){ 
                    helpers.upgradeController(creep);
                    if (creep.ticksToLive>6 && creep.store[RESOURCE_ENERGY] < 2*creep.getActiveBodyparts(WORK) && storage && creep.pos.isNearTo(storage) && storage.store[RESOURCE_ENERGY]>minInStorage && !creep.memory.unBoost){
                        let res = creep.withdraw(storage, RESOURCE_ENERGY);    
                        if (res == OK) {
                            this.energyBalance(room, -(creep.store.getCapacity() - creep.store.getUsedCapacity()));
                        }
                    }
                }
                if (creep.ticksToLive<40 && creep.memory.unBoost == undefined) {
                    creep.memory.unBoost = 0;
                    const creepBoosted = _.filter(creep.body, 'boost').length;
                    const labContainerCoord = _.get(Memory, 'labs.rooms.'+creep.room.name+'.labContainerPos', 0);
                    const labsIndexArray = _.get(Memory, 'labs.rooms.'+creep.room.name+'.labSet.in', []);
                    if (creepBoosted && labContainerCoord && labsIndexArray.length) {
                        const labContainerPos = new RoomPosition(labContainerCoord.x, labContainerCoord.y, labContainerCoord.roomName);
                        const containerPresent =  labContainerPos.lookFor(LOOK_STRUCTURES).some(s=>s.structureType ==  STRUCTURE_CONTAINER);
                        const labs = creep.room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_LAB }});
                        let freeLabs = _.filter(labs, (lab,index) =>  labsIndexArray.includes(index) && !lab.cooldown && lab.pos.isNearTo(labContainerPos));
                        let zeroLab = 0;
                        if (labsIndexArray.includes(zeroLab)) zeroLab++;
                        if (labsIndexArray.includes(zeroLab)) zeroLab++;
                        if (!freeLabs.length && labs.length>zeroLab && !labs[zeroLab].cooldown && labs[zeroLab].pos.isNearTo(labContainerPos)) {
                            freeLabs = [labs[zeroLab]];
                        }
                        if (freeLabs.length && containerPresent) {
                            creep.memory.unBoost = {pos:labContainerCoord, labId: freeLabs[0].id};
                        }
                    }
                }
                
            }
        }
    },
    
    wallBuilderRun: function(room, spawnEnable = false) {
        if (Game.cpu.bucket < this.maxBucketStop) return;
        let name = this.namePrefix+this.creepsInfo.wallBuilder.prefix+room.name;
        let creep = Game.creeps[name];
        if (!creep) {
            if (!spawnEnable) return;
            if (room.energyAvailable < this.creepsInfo.wallBuilder.needEnergy) return;
            let spawn = this.getSpawn(room);
            if (!spawn) return;
            let res = spawn.spawnCreep(this.creepsInfo.wallBuilder.body, name, {memory: {room: room.name, role: this.role}});    
            if (res == OK) {
                room.memory.spawnBusyTick = Game.time;
                this.energyBalance(room, -this.creepsInfo.wallBuilder.needEnergy);
            }
        } else {
            if (creep.spawning) return;
            if (helpers.sleep(creep)) return;
            
            if (creep.ticksToLive < 20 && creep.room.storage) {
                if (creep.store[RESOURCE_ENERGY]) {
                    if (creep.pos.isNearTo(creep.room.storage)) {
                        if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == OK) {
                            this.energyBalance(room, creep.store[RESOURCE_ENERGY]);
                        }
                    } else {
                        helpers.smartMove(creep, creep.room.storage);    
                    }
                } else {
                    creep.suicide();
                }
                return;
            }

            let target = null;
            if (!creep.store[RESOURCE_ENERGY]){
                let storage = creep.room.storage;
                if (storage && storage.store[RESOURCE_ENERGY] > 5000){
                    if (creep.pos.isNearTo(storage)) {
                        let res = creep.withdraw(storage, RESOURCE_ENERGY); 
                        if (res == OK) {
                            this.energyBalance(room, -(creep.store.getCapacity() - creep.store.getUsedCapacity()));
                            creep.memory.targetId = undefined;
                        }
                    } else {
                        helpers.smartMove(creep, storage);    
                    }
                } else {
                    if (creep.room.name != creep.memory.room && Game.rooms[creep.memory.room] && Game.rooms[creep.memory.room].storage) {
                        helpers.smartMove(creep, Game.rooms[creep.memory.room].storage)
                    } else {
                    creep.memory.sleep = Game.time + 31;    
                    }
                } 
            } else {
                //!helpers.buildClosestStructure(creep)){ !!!!todo build
                
                let target;
                if (creep.memory.targetId == undefined)  {
                    
                    if (creep.memory.buildId) {
                        target = Game.getObjectById(creep.memory.buildId);
                        if (!target) {
                            creep.memory.buildId = undefined;
                        }
                    }
                    if (creep.memory.buildId == undefined) {
                        let cSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
                        if (cSites.length) {
                            target = creep.pos.findClosestByRange(cSites);
                            creep.memory.buildId = target.id;
                        }
                    }
                    if (target) {
                        if (creep.pos.inRangeTo(target, 3)) {
                            creep.build(target);
                        } else {
                            helpers.smartMove(creep, target, 0, 3);
                        }
                        return;
                    }
                    
                    let targets = creep.room.find(FIND_STRUCTURES, {
                        filter: object => object.structureType == STRUCTURE_WALL || (object.structureType == STRUCTURE_RAMPART && object.my)
                    });
                    targets = _.filter(targets, target => target.hits<target.hitsMax-50000);
                    //targets.sort((a,b) => require('role.wallbuilder').getStructureHit(a) - require('role.wallbuilder').getStructureHit(b));
                    
                    if(targets.length) {
                        target = _.min(targets, target => require('role.wallbuilder').getStructureHit(target));
                        //target = _.min(targets, 'hits');
                        creep.memory.targetId = target.id;
                    } else {
                       Game.notify('wallbuilldier not found ramps in room '+creep.room.name);
                       if (creep.room.name != creep.memory.room) {
                            helpers.recycleCreep(creep)
                       } else {
                            creep.memory.sleep = Game.time + 30;    
                       }
                    } 
                } else {
                    target = Game.getObjectById(creep.memory.targetId);
                    if (!target || target.hits == target.hitsMax){
                        creep.memory.targetId = undefined;
                    }
                }
                if (target){
                    if (creep.pos.inRangeTo(target, 3)) {
                        creep.repair(target);
                    } else {
                        helpers.smartMove(creep, target, 0, 3);
                    }
                }
            }
        } 
    },
    
    profileCpu: function(room, elapsed) {
        let tsrInfo = room.memory.tsrInfo;
        tsrInfo.cpu =  (tsrInfo.cpu || 0) + elapsed;
        tsrInfo.ticks = (tsrInfo.ticks || 0) + 1;
        tsrInfo.cpuAvg = (tsrInfo.cpu / tsrInfo.ticks).toFixed(3);
        
        if (!tsrInfo.cpuList) {
            tsrInfo.cpuList = [];
        }
        const division = 10;
        const divisionCount = 10;
        
        if (!tsrInfo.cpuListCount || tsrInfo.cpuListCount >= division) {
            tsrInfo.cpuList.push(elapsed);
            tsrInfo.cpuListCount = 1;
            if (tsrInfo.cpuList.length > divisionCount) {
                tsrInfo.cpuList.shift();
            }
        } else {
            tsrInfo.cpuList[tsrInfo.cpuList.length - 1] += elapsed;
            tsrInfo.cpuListCount++;
        }
        
        let cpuAmount = 0;
        let cpuCount = 0;
        tsrInfo.cpuList.forEach(cpu => {
            cpuAmount += cpu;
            cpuCount += division;
        });
        if (cpuCount) {
            cpuCount -= division;
            cpuCount += tsrInfo.cpuListCount;
            tsrInfo.cpuAvg2 = cpuAmount / cpuCount;
        }
        
        

    },
    
    boostCreep: function(creep) {
        if (!creep.spawning && creep.memory.boosts){
            if (creep.memory.boosts.length) {
                if (!creep.memory.copyBoosts) {
                    creep.memory.copyBoosts = creep.memory.boosts.slice();
                }
                let lab;
                if (creep.memory.boostLabId == undefined) {
                    let mineral = creep.memory.boosts[0];
                    lab = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                      filter: function (object) {return object.structureType == STRUCTURE_LAB && object.mineralType == mineral && object.mineralAmount>=450 && object.store[RESOURCE_ENERGY]>600;}
                    });
                    if (lab) {
                        creep.memory.boostLabId = lab.id    
                    }
                } else {
                    lab = Game.getObjectById(creep.memory.boostLabId);
                }
                if (lab) {
                    if(creep.pos.isNearTo(lab)) {
                        creep.memory.boostLabId = undefined;
                        let res = lab.boostCreep(creep);
                        if (res == OK) {
                            creep.memory.boosts.shift();
                            if (!creep.memory.boosts.length){
                                delete creep.memory.boosts;
                                delete creep.memory.boostLabId;
                            }
                        }
                        
                    } else {
                        helpers.smartMove(creep, lab);
                    }
                } else {
                    creep.memory.boostLabId = undefined;
                    creep.memory.boosts.shift();
                    if (!creep.memory.boosts.length){
                        delete creep.memory.boosts;
                        delete creep.memory.boostLabId;
                    }
                }                
            } else {
                delete creep.memory.boosts;
            }
        }        
    },
    
    mineralHarvesterRun: function(room, num) {
        //if (this.mineralShardOff.includes(Game.shard.name)) return; //shard3 off mr spawn
        if (Game.cpu.bucket < this.maxBucketStop) return;
        if (!room.memory.tsrInfo.mineral) return;
        let name = this.namePrefix+this.creepsInfo.mineralHarvester.prefix+room.name+'_'+num;
        let creep = Game.creeps[name];
        if (!creep) {
            if (Game.cpu.bucket < this.maxBucketHarvesterSpawn) return;
            if (room.energyAvailable < this.creepsInfo.mineralHarvester.needEnergy) return;
            if (room.memory.tsr_attaked) return;
            let spawn = this.getSpawn(room);
            if (!spawn) return;
            let res = spawn.spawnCreep(this.creepsInfo.mineralHarvester.body, name, {memory: {room: room.name, role: this.role}});    
            if (res == OK) {
                room.memory.spawnBusyTick = Game.time;
                this.energyBalance(room, -this.creepsInfo.mineralHarvester.needEnergy);
            }
        } else {
            if (creep.spawning) return;
            console.log(room.name, 'mineralHarvesterRun!!!!');
            let res = require('role.harvester').run(creep);
            if (res) {
                room.memory.tsrInfo.mineral = 0;
                room.memory.tsrInfo.mineralTime = undefined;
            }
        }
    },

};