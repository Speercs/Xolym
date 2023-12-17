var helpers = require('helpers');

var roleDeposit = {
    //_.set(Memory, 'depositWork.E13N18.62021a9db8a636ef37e54e47',{baseRoom:'E13N18',id:'62021a9db8a636ef37e54e47',depositRoom:'E9N20',lastCooldown:14, x:28, y:32, freeSides: 2, maxCooldown:80});
    
    MAX_COOLDOWN: 100,
    tickReset: function() {
        if (Memory.depositWork){
            for (let roomName in Memory.depositWork) {
                for (let depositId in Memory.depositWork[roomName]) {
                    let depositInfo = Memory.depositWork[roomName][depositId];
                    if (depositInfo.closed){
                        continue;
                    }
                    if (depositInfo.lastCooldown != undefined) {
                        let res = helpers.checkHighWayRoomNeedHelp(depositInfo.baseRoom, depositInfo.depositRoom);
                        if (res) {
                            console.log('!!!!!!!!!!!!!'+depositInfo.id+' '+roomName+' '+res); 
                            depositInfo.attacked = Game.time;
                        }
                    }
                }
            }
        }
    },

        
    spawn: function (room, myRoom, freeSpawn) {
        //check all sector deposit
        if (Memory.depositWork && Memory.depositWork[room.name] && freeSpawn){
            for (let depositId in Memory.depositWork[room.name]) {
                let depositInfo = Memory.depositWork[room.name][depositId];
                let maxCooldown = depositInfo.maxCooldown?depositInfo.maxCooldown:this.MAX_COOLDOWN;
                let timeToTarget = depositInfo.timeToTarget?(depositInfo.timeToTarget):150;
                if (depositInfo.closed){
                    continue;
                }
                if (depositInfo.attacked && Game.time < depositInfo.attacked + 250) {
                    continue;
                }
                if (depositInfo.lastCooldown != undefined && depositInfo.lastCooldown >= maxCooldown) {
                    
                    //let creepLive = _.filter(require('spawn').getGameCreeps(), (creep) =>            creep.memory.role == 'deposit' && creep.memory.type == 'superharvester' && creep.memory.targetId == depositId && (creep.ticksToLive > 0 || creep.spawning));
                    let creepLiveLength = require('spawn').getGameCreeps(room.name, 'deposit').reduce((a, creep) => a + (creep.memory.role == 'deposit' && creep.memory.type == 'superharvester' && creep.memory.targetId == depositId && (creep.ticksToLive > 0 || creep.spawning)?1:0), 0);
                    
                    //console.log('deposit filter for spawn!!!!!!!!',creepLive.length, creepLiveLength);
                    if (!creepLiveLength) {
                        depositInfo.closed = 1;
                        continue;
                    }
                    
                    //Memory.depositWork[room.name][depositId] = undefined; //clear manual!!!!!!!!!!!!!
                }
                if (depositInfo.lastCooldown != undefined) {// && depositInfo.lastCooldown < maxCooldown) {
                    // helpers.checkHighWayRoomNeedHelp(depositInfo.baseRoom, depositInfo.depositRoom);
                    //  console.log('+++++++++++++++++'+depositInfo.id+' '+room.name); 
                    let freeSides = depositInfo.freeSides ? depositInfo.freeSides : 1;
                    
                    if (room.storage && room.storage.store[RESOURCE_ENERGY] < 90000) {
                        freeSides = Math.min(freeSides, 2);
                    } 
                    
                    // if (depositInfo.depositType && depositInfo.depositType == RESOURCE_MIST && freeSides > 2) {
                    //     depositInfo.maxCooldown = 110;
                    // }
                    // if (depositInfo.depositType && _.get(Memory, 'stock.'+depositInfo.depositType, 0) > 50000) {
                    //     depositInfo.maxCooldown = 100; 
                    // }
                    
                    let depositTypes = {'placer': 0, 'harvester': freeSides > 1 ? (depositInfo.lastCooldown < 40 ? 1 : 0) : 0, 'transporter': 0, 'puller': 0, 'superharvester': 0};
                    if (freeSides == 1 && depositInfo.lastCooldown < 40 && !depositInfo.placer && Game.shard.name == 'shard3') {
                        depositTypes['placer'] = 1;
                    }
                    if (Game.cpu.bucket< 4000 || Memory.deltaBucketPowerSave) {
                        depositTypes['harvester'] = 0;//depositTypes['harvester']?1:0;
                    }
                    if (1) { 
                        //depositTypes['superharvester'] = freeSides > 1 ? (depositInfo.lastCooldown < 40 ? freeSides - 1 : freeSides)  : 1;
                        depositTypes['superharvester'] = freeSides > 2 ? (depositInfo.lastCooldown < 40 ? freeSides - 1 : freeSides)  : freeSides;
                        depositTypes['puller'] = 0;
                    }
                    if (room.energyAvailable < room.energyCapacityAvailable*0.8) {
                        depositTypes['harvester'] = depositTypes['harvester']?1:0;
                        depositTypes['superharvester'] = depositTypes['superharvester']?1:0;
                    }

                    // if ((freeSides > 1 || depositInfo.lastCooldown < 40) && Game.cpu.bucket > 4000) {
                    //     depositTypes['transporter'] = 1;
                    // }
                    if (depositInfo.lastCooldown >= maxCooldown) {
                        depositTypes['harvester'] = 0;
                        depositTypes['superharvester'] = 0;
                    }
                    depositTypes['transporter'] = 1;
                    // if (freeSides > 2 && depositInfo.lastCooldown < 40 && room.energyAvailable< room.energyCapacityAvailable*0.8) {
                    //     depositTypes['transporter']++;
                    // }
                    if (depositInfo.lastCooldown < 2) {
                    } else if (depositInfo.lastCooldown < 20 && room.energyAvailable > room.energyCapacityAvailable*0.5) {
                        depositTypes['transporter']++;
                    } else if (depositInfo.lastCooldown < 70 && room.energyAvailable > room.energyCapacityAvailable*0.5 && freeSides>=4) {
                        depositTypes['transporter']++;
                    }
                     
                    for (let type in depositTypes){
                        let count = depositTypes[type];
                        if (count) {
                            type = type=='harvester'?undefined:type;
                            let spawnAllowed = true;
                            let kSoonDie = 1;
                            if (type == 'transporter') {
                                kSoonDie = 1.8;
                            }
                            //let creepLive = _.filter(require('spawn').getGameCreeps(), (creep) =>            creep.memory.role == 'deposit' && creep.memory.type == type && creep.memory.targetId == depositId && (creep.ticksToLive > timeToTarget - 20 + roleDeposit.getBody(type, freeSpawn).length * CREEP_SPAWN_TIME || creep.spawning));
                            let creepLiveLength = require('spawn').getGameCreeps(room.name, 'deposit').reduce((a, creep) => a + (creep.memory.role == 'deposit' && creep.memory.type == type && creep.memory.targetId == depositId && (creep.ticksToLive > timeToTarget * kSoonDie - 20 + roleDeposit.getBody(type, freeSpawn).length * roleDeposit.creepSpawnTime(freeSpawn) || creep.spawning)?1:0), 0);
                            //console.log('deposit filter for spawn!!!!!!!!',creepLive.length, creepLiveLength);

                            if (!type) {
                                //let otherCreepLive = _.filter(require('spawn').getGameCreeps(), (creep) =>            creep.memory.role == 'deposit' && creep.memory.type == 'superharvester' && creep.memory.targetId == depositId && (creep.ticksToLive > timeToTarget - 20 + roleDeposit.getBody(type, freeSpawn).length * CREEP_SPAWN_TIME || creep.spawning));
                                let otherCreepLiveLength = require('spawn').getGameCreeps(room.name, 'deposit').reduce((a, creep) => a + (creep.memory.role == 'deposit' && creep.memory.type == 'superharvester' && creep.memory.targetId == depositId && (creep.ticksToLive > timeToTarget - 20 + roleDeposit.getBody(type, freeSpawn).length * roleDeposit.creepSpawnTime(freeSpawn) || creep.spawning)?1:0), 0);
                                spawnAllowed = creepLiveLength + otherCreepLiveLength < freeSides;
                                //console.log('deposit filter for spawn!!!!!!!!',otherCreepLive.length, otherCreepLiveLength);
                            } else if (type == 'superharvester') {
                                //let otherCreepLive = _.filter(require('spawn').getGameCreeps(), (creep) =>            creep.memory.role == 'deposit' && creep.memory.type == undefined && creep.memory.targetId == depositId && (creep.ticksToLive > timeToTarget - 20 + roleDeposit.getBody(type, freeSpawn).length * CREEP_SPAWN_TIME || creep.spawning));
                                let otherCreepLiveLength = require('spawn').getGameCreeps(room.name, 'deposit').reduce((a, creep) => a + (creep.memory.role == 'deposit' && creep.memory.type == undefined && creep.memory.targetId == depositId && (creep.ticksToLive > timeToTarget - 20 + roleDeposit.getBody(type, freeSpawn).length * roleDeposit.creepSpawnTime(freeSpawn) || creep.spawning)?1:0), 0);
                                spawnAllowed = creepLiveLength + otherCreepLiveLength < freeSides;
                                //console.log('deposit filter for spawn!!!!!!!!',otherCreepLive.length, otherCreepLiveLength);
                            }
                            if (freeSpawn && creepLiveLength < count && spawnAllowed) {
                                let puller = null;
                                if (type == 'superharvester') {
                                    //only 1 superharvester spawn in moment
                                    //let creepSpawn = _.filter(require('spawn').getGameCreeps(), (creep) =>            creep.memory.role == 'deposit' && creep.memory.type == type && creep.memory.targetId == depositId && creep.spawning);
                                    let creepSpawnLength = require('spawn').getGameCreeps(room.name, 'deposit').reduce((a, creep) => a + (creep.memory.role == 'deposit' && creep.memory.type == type && creep.memory.targetId == depositId && creep.spawning?1:0), 0);
                                    if (creepSpawnLength) {
                                        continue;
                                    }
                                    //check puller
                                    let pullerCreepLive = _.filter(require('spawn').getGameCreeps(room.name, 'deposit'), (creep) =>            creep.memory.role == 'deposit' && creep.memory.type == 'puller' && !creep.memory.busy && creep.memory.pullId == undefined && creep.memory.targetId == depositId && (creep.ticksToLive > timeToTarget*2 || creep.spawning));
                                    if (!pullerCreepLive.length) {
                                        type = 'puller';
                                    } else {
                                        puller = pullerCreepLive[0];
                                    }
                                }
                                let name = 'dep_'+room.name+'_'+Game.time;
                                if (type == 'puller') {
                                    name = 'dep_p'+room.name+'_'+Game.time;    
                                }
                                const result = freeSpawn.spawnCreep(roleDeposit.getBody(type, freeSpawn), name, {memory: {role: 'deposit', type:type, room: room.name, targetId: depositId, ensurePath: depositInfo.ensurePath}});
                                if (result == OK){
                                    freeSpawn = null; 
                                    if (puller && Game.getObjectById(puller.id)) {
                                        Game.getObjectById(puller.id).memory.busy = 1;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    //Memory.depositWork[room.name][depositId] = undefined; //delete 
                }
            }
        }
        return freeSpawn;
    },
    
    creepSpawnTime: function(spawn) {
        if (spawn && spawn.effects && spawn.effects[0] && spawn.effects[0].power == PWR_OPERATE_SPAWN) {
            //let result = CREEP_SPAWN_TIME * POWER_INFO[PWR_OPERATE_SPAWN].effect[spawn.effects[0].level-1];
            //return isNaN(result)?CREEP_SPAWN_TIME:result;
            return  CREEP_SPAWN_TIME * POWER_INFO[PWR_OPERATE_SPAWN].effect[spawn.effects[0].level-1];
        } else {
            return  CREEP_SPAWN_TIME;
        }
    },

    
    getBody: function(type, spawn) {
        if (!type) {
            return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*21,WORK*21,CARRY*8;
        } else if (type == 'transporter') {
            return [
                CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,
                CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,
            // CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            ];
        } else if (type == 'placer') {
            return [MOVE];
        } else if (type == 'superharvester') {
            return [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
        } else if (type == 'puller') {
            return [ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
            //return [MOVE  ,MOVE  ,MOVE  ,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        }
        
        console.log('deposit get body error');
        return [MOVE];
    },

    positionInBorder: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 1 || pos.x >48 || pos.y < 1 || pos.y > 48);
    },
    positionInNearBorder: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 2 || pos.x >47 || pos.y < 2 || pos.y > 47);
    },
    positionInNearBorder2: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 3 || pos.x >46 || pos.y < 3 || pos.y > 46);
    },
    /** @param {Creep} creep **/
    run: function(creep) {
        if (helpers.sleep(creep)) return; 
        if (helpers.runMoveOrder(creep)) return;
        if (Memory.mapVisual) Game.map.visual.text("D️",creep.pos, { fontSize:10});
        if (creep.memory.targetId && creep.memory.room && Memory.depositWork && Memory.depositWork[creep.memory.room] && Memory.depositWork[creep.memory.room][creep.memory.targetId]) {
            const depositInfo = Memory.depositWork[creep.memory.room][creep.memory.targetId];
            
            if (depositInfo.ensurePath && !creep.memory.ensurePath) {
                creep.memory.ensurePath = 1;
            }
            
            let timeToTarget = depositInfo.timeToTarget?depositInfo.timeToTarget:250;
            let maxCooldown = depositInfo.maxCooldown?depositInfo.maxCooldown:this.MAX_COOLDOWN;
            
            if (creep.memory.highwayWall && depositInfo) {
                if (!depositInfo.closed) {
                    Game.notify('Detect deposit in novice or respawn area '+ JSON.stringify(depositInfo));
                    depositInfo.closed = 1;
                }
                creep.memory.role = undefined;
                Object.values(Game.creeps).forEach(c=>{
                    if (c.memory.targetId == creep.memory.targetId){
                        Game.notify('recycle depost creep '+c.memory.type+' TTL '+c.ticksToLive + ' in room ' + c.room.name+ ' tick ' + Game.time);
                        c.memory.role = undefined;
                    }
                });
                return; 
            }
            // if (depositInfo.closed) {
            //     Game.notify('recycle depost creep '+creep.memory.type+' TTL '+creep.ticksToLive + ' in room ' + creep.room.name+ ' tick ' + Game.time);
            //     creep.memory.role = undefined;
            //     return;
            // }
            
            if (creep.memory.type == 'puller'){
                if (creep.memory.pullId == undefined) {
                    if (creep.room.name == creep.memory.room && creep.room.storage && creep.pos.inRangeTo(creep.room.storage, 15)) {
                        let pullCreeps = creep.room.find(FIND_MY_CREEPS, {
                            filter: (object) => object.memory.role == 'deposit' && object.memory.type == 'superharvester' && object.memory.pullerId == undefined && object.memory.targetId == creep.memory.targetId
                        });
                        if (pullCreeps.length) {
                            pullCreeps[0].memory.pullerId = creep.id;
                            creep.memory.pullId = pullCreeps[0].id;
                        }
                    } else {
                        creep.memory.role = undefined;
                        let homeRoom = Game.rooms[creep.memory.room];
                        if (homeRoom && homeRoom.storage) {
                            helpers.smartMove(creep, homeRoom.storage);
                        }
                    }
                    
                } else if (creep.memory.pullId) {
                    let pullCreep = Game.getObjectById(creep.memory.pullId);
                    let target = new RoomPosition(depositInfo.x, depositInfo.y, depositInfo.depositRoom);
                    if (Game.shard.name == 'shard2' && target.roomName == 'E45S10') {
                        creep.memory.ensurePath = 1;
                    }
                    if (Game.shard.name == 'shard0' && target.roomName == 'E50N43') {
                        creep.memory.ensurePath = 1;
                    }

                    if (pullCreep && target) {
                        if (pullCreep.pos.isNearTo(target)){
                            pullCreep.memory.pullerId = undefined;
                            pullCreep.memory.inPosition = 1;
                            creep.memory.pullId = undefined;
                            creep.memory.role = undefined;
                            creep.memory.ignoreCreeps = undefined;
                        } else {
                            if (creep.memory.errorMove) {
                                creep.say(creep.memory.errorMove, 1);
                            }
                            let res = creep.pull(pullCreep);
                            if (this.positionInBorder(creep) && !this.positionInBorder(pullCreep)) {
                                pullCreep.move(creep)
                                creep.moveTo(pullCreep);
                                creep.memory._trav = undefined;
                            } else if (0 && res == ERR_NOT_IN_RANGE && this.positionInNearBorder(creep.pos) && this.positionInBorder(pullCreep) && creep.memory.justWait != (Game.time-1)) {
                                creep.memory.justWait = Game.time;
                                Game.notify('Deposit puller just wait '+creep.room.name+' tick '+Game.time);
                                creep.say('jW');
                            } else if (res == ERR_NOT_IN_RANGE && !this.positionInBorder(creep.pos)) {
                                //helpers.smartMove(creep, pullCreep);
                                pullCreep.move(creep)
                                creep.moveTo(pullCreep);
                                creep.memory._trav = undefined;
                                creep.say('nir');
                                pullCreep.say('nir');
                                creep.memory.errorMove = (creep.memory.errorMove || 0) + 1;
                                creep.memory.errorMove = creep.memory.errorMove >= 50 ? 50 : creep.memory.errorMove;
                                if (creep.room.name == depositInfo.depositRoom) {
                                    creep.memory.ignoreCreeps = 0;    
                                    creep.say('nir', 1);
                                }
                                

                            } else {
                                pullCreep.say(pullCreep.move(creep));
                                //creep.moveTo(target);
                                if (creep.pos.isNearTo(target)){
                                    creep.move(creep.pos.getDirectionTo(pullCreep))    
                                } else {
                                    if ((creep.getActiveBodyparts(ATTACK) && creep.pos.inRangeTo(target, 4)) || creep.memory.nearTarget) {
                                        creep.memory.nearTarget = 1;
                                        //console.log(helpers.getRoomLink(creep.room.name), 'deposit puller in near deposit!!!');
                                        let freeLocalPos = null;
                                        let busyLocalPos = null;
                                        let enemyCreep = null;
                                        let minLiveEnemyCreep = 1500;
                                        let minLiveMyCreep = 1500;
                                        let minLiveMyCreepPos = null;
                                        for (let dx = -1; dx <= 1; dx++) {
                                            for (let dy = -1; dy <= 1; dy++) {    
                                                if (!dx && !dy) { continue;}
                                                let pos = new RoomPosition(target.x + dx, target.y + dy, target.roomName);
                                                let terrain = pos.lookFor(LOOK_TERRAIN)[0];
                                                let targetCreep = pos.lookFor(LOOK_CREEPS)[0];
                                                if (terrain != 'wall' && !targetCreep) {
                                                    freeLocalPos = pos;
                                                } else if (terrain != 'wall' && targetCreep && !targetCreep.my) {
                                                    if (targetCreep.ticksToLive < minLiveEnemyCreep) {
                                                        minLiveEnemyCreep = targetCreep.ticksToLive;
                                                        busyLocalPos = pos;
                                                        enemyCreep = targetCreep;
                                                    }
                                                } else if (terrain != 'wall' && targetCreep && targetCreep.my && targetCreep.getActiveBodyparts(WORK)) {
                                                    if (targetCreep.ticksToLive < minLiveMyCreep) {
                                                        minLiveMyCreep = targetCreep.ticksToLive;
                                                        minLiveMyCreepPos = targetCreep.pos;
                                                    }
                                                }
                                            }
                                        }
                                        //Object.entries(Memory.rooms).filter(a=>a[1].dCompetitor).map(s=>[s[0],s[1].dCompetitor])
                                        if (enemyCreep) {
                                            creep.room.memory.dCompetitor = Game.time;
                                        }
                                        if (freeLocalPos) {
                                            creep.say('freeP');
                                            //helpers.smartMove(creep, freeLocalPos, 0, 0, {ignoreCreeps: false});
                                            creep.moveTo(freeLocalPos);
                                        } else if (busyLocalPos && enemyCreep && (minLiveMyCreep > 100 || creep.memory.atacking) ) {
                                            creep.say('attack');
                                            if (creep.pos.isNearTo(busyLocalPos)) {
                                                creep.attack(enemyCreep);
                                                creep.move(creep.pos.getDirectionTo(enemyCreep)); 
                                                creep.memory.atacking = 1;
                                            } else {
                                                helpers.smartMove(creep, busyLocalPos, 0, 1, {ignoreCreeps: false});
                                            }
                                        } else if (minLiveMyCreep < 1500) {
                                            creep.say('waitPos' + minLiveMyCreep);
                                            if (creep.pos.isNearTo(minLiveMyCreepPos)) {
                                                if (minLiveMyCreep <=1) {
                                                    let res = creep.move(creep.pos.getDirectionTo(minLiveMyCreepPos)); 
                                                    creep.say(''+minLiveMyCreep+'m'+res, 1);
                                                } else {
                                                    creep.say('w'+minLiveMyCreep, 1);
                                                    creep.memory.sleep = Game.time + minLiveMyCreep-1;    
                                                }
                                            } else {
                                                helpers.smartMove(creep, minLiveMyCreepPos, 0, 1, {ignoreCreeps: false});
                                            }
                                        }
                                    } else if (creep.memory.errorMove && creep.memory.errorMove > 10) {
                                        creep.moveTo(target);
                                    } else {
                                        helpers.smartMove(creep, target);    
                                        creep.memory._move = undefined;
                                    }
                                    creep.memory.errorMove = (creep.memory.errorMove || 0) - 1;
                                    creep.memory.errorMove = creep.memory.errorMove >= 0 ? creep.memory.errorMove: undefined;

                                }
                            }     
                        }
                        
                        
                        
                    } else {
                        creep.memory.pullId = undefined;
                        creep.suicide();
                        //return to home
                    }
                }
            
            } else if (creep.memory.type == 'transporter') {
                // if (depositInfo.closed && !creep.store.getUsedCapacity()) {
                //     creep.memory.role = undefined;
                //     return;
                // }
                
                //console.log('transporer', helpers.getRoomLink(creep.room.name));
                if (creep.room.name == creep.memory.room && creep.store.getUsedCapacity()) {
                    helpers.transferEnergyToStorage(creep);
                } else if (creep.ticksToLive > (timeToTarget*1.2) && creep.store.getFreeCapacity() && !depositInfo.closed) {
                    //creep.say('c'+depositInfo.closed?1:0);
                    let depositPos = new RoomPosition(depositInfo.x, depositInfo.y, depositInfo.depositRoom);
                    
                    if (Game.shard.name == 'shard2' && depositPos.roomName == 'E45S10') {
                        creep.memory.ensurePath = 1;
                    }
                    
                    if (creep.room.name == depositInfo.depositRoom && creep.pos.getRangeTo(depositPos) == 4 && !this.positionInNearBorder2(creep)) {
                        creep.moveTo(depositPos, {range:1});
                        creep.memory._trav = undefined;
                        creep.memory.noSwap = 1;
                        creep.say('nb');
                    } else if (creep.room.name == depositInfo.depositRoom && creep.pos.inRangeTo(depositPos, 3) && !this.positionInNearBorder2(creep)) {
                        //check other transporter
                        let transporters = depositPos.findInRange(FIND_MY_CREEPS, 5, {
                            filter: function (object) {
                                return object.memory.role == 'deposit' && object.memory.type == 'transporter' && object.id != creep.id && object.store && object.store.getUsedCapacity() > creep.store.getUsedCapacity();
                            }
                        });
                        if (transporters.length) {
                            creep.say('ww'); 
                            creep.memory.sleep = Game.time+50;
                            creep.memory.noSwap = 1;
                        } else {
                            creep.memory.noSwap = undefined;
                            //find harvester
                            let harvesters = depositPos.findInRange(FIND_MY_CREEPS, 1, {
                                filter: function (object) {
                                    return object.memory.role == 'deposit' && (object.memory.type == undefined || object.memory.type == 'superharvester') && object.store && object.store.getUsedCapacity() >= 1;
                                }
                            });
                            if (harvesters.length) {
                                let harvester = creep.pos.findClosestByPath(harvesters);
                                if (creep.pos.isNearTo(harvester)){
                                    creep.say('near');
                                    for(const resourceType in harvester.store) {
                                        creep.say(harvester.transfer(creep, resourceType));
                                    }
                                    harvester.memory.noReturn = 1;//Game.time+(depositInfo.timeToTarget*2)+50;
                                } else {
                                    creep.moveTo(harvester, {range:1});
                                    creep.say('nh');
                                }
                            } else {
                                let tombs = depositPos.findInRange(FIND_TOMBSTONES, 3, {
                                    filter: function (object) {
                                        return object.store && object.store.getUsedCapacity() && object.store.getUsedCapacity() > object.store[RESOURCE_ENERGY];
                                    }
                                });
                                if (tombs.length) {
                                    if (creep.pos.isNearTo(tombs[0])){
                                        creep.say('near');
                                        for(const resourceType in tombs[0].store) {
                                            if (resourceType == RESOURCE_ENERGY) continue;
                                            creep.say(creep.withdraw(tombs[0], resourceType));
                                        }
                                    } else {
                                        creep.moveTo(tombs[0], {range:1});
                                    }
                                } else {
                                    let dropped = depositPos.findInRange(FIND_DROPPED_RESOURCES, 3, {filter: dropped => dropped.resourceType != RESOURCE_ENERGY});
                                    if (dropped.length) {
                                        if (creep.pos.isNearTo(dropped[0])){
                                            creep.say('near');
                                            creep.say(creep.pickup(dropped[0]));
                                        } else {
                                            creep.moveTo(dropped[0], {range:1});
                                        }
                                    } else {
                                        if (creep.pos.isNearTo(depositPos)){
                                            helpers.transferEnergyToStorage(creep);
                                        } else {
                                            creep.say('w'); // !!todo sleep
                                            creep.memory.sleep = Game.time+10;
                                        }
                                    }
                                }       
                            }
                        }
                    } else {
                        if (creep.pos.inRangeTo(depositPos, 5)) {
                            creep.moveTo(depositPos, {range:2});
                            creep.memory._trav = undefined;
                            creep.say('tw');
                        } else {
                            helpers.smartMove(creep, depositPos, 1, 1);    
                        }
                        
                    }
                } else {
                    helpers.transferEnergyToStorage(creep);
                    if (!creep.store.getUsedCapacity()) {
                        creep.say((timeToTarget*1.2) - creep.ticksToLive, 1);
                        creep.memory.role = undefined;
                    }
                }
            } else if (creep.memory.type == 'placer') {
                //creep.suicide();
                console.log('placer', helpers.getRoomLink(creep.room.name));
                if (creep.room.name == depositInfo.depositRoom) {
                    const deposit = Game.getObjectById(depositInfo.id);
                    if (deposit){
                        let freeSidePos = null;
                        if (creep.memory.freeSidePos) {
                            freeSidePos = new RoomPosition(creep.memory.freeSidePos.x, creep.memory.freeSidePos.y, creep.memory.freeSidePos.roomName);
                        } else {
                            //check free sides
                            let freeSides = 0;
                            for (let dx = -1; dx <= 1; dx++) {
                                for (let dy = -1; dy <= 1; dy++) {    
                                    if (!dx && !dy) { continue;}
                                    let pos = new RoomPosition(deposit.pos.x + dx, deposit.pos.y + dy, deposit.room.name);
                                    let found = pos.lookFor(LOOK_TERRAIN);
                                    if (found.length && found[0] != 'wall'){
                                        freeSidePos = pos;
                                        freeSides++;
                                    }
                                }
                            }
                            if (freeSidePos) {
                                creep.memory.freeSidePos = {x: freeSidePos.x, y:freeSidePos.y, roomName:freeSidePos.roomName};
                            }
                        }
                        //console.log('placer', JSON.stringify(freeSidePos));
                        
                        if (creep.pos.getRangeTo(freeSidePos) == 1) {
                            creep.say('inplace');
                            const found = freeSidePos.lookFor(LOOK_CREEPS);
                            if (found.length) {
                                if (!found[0].my) {
                                    Game.notify('deposit placer find enemy creep on free pos '+creep.room.name);
                                    creep.move(creep.pos.getDirectionTo(found[0]));
                                }
                                if (found[0].my && found[0].memory && found[0].memory.role == 'deposit' && found[0].memory.type == 'placer') {
                                    if (found[0].ticksToLive > creep.ticksToLive) {
                                        creep.suicide();
                                    } else {
                                        found[0].suicide();
                                    }
                                    creep.say('p');
                                } else {
                                    creep.say('t');
                                    depositInfo.placer = 1;
                                    //creep.suicide();
                                }
                                
                                //creep.move(creep.pos.getDirectionTo(found[0]));
                            } else {
                                creep.say('free');
                                creep.move(creep.pos.getDirectionTo(freeSidePos));
                            }
                        } else if (creep.pos.isEqualTo(freeSidePos)) {
                            let myCreeps = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
                                filter: function (object) {
                                    return object.memory.role == 'deposit' && object.memory.type != 'transporter' && deposit.pos.getRangeTo(object) == 2 && (object.store && !object.store.getUsedCapacity());
                                }
                            });
                            if (myCreeps.length) {
                                creep.say('f');
                                //creep.move(creep.pos.getDirectionTo(myCreeps[0]));
                                creep.suicide();
                            } else {
                                creep.say('w');
                            }
                        } else {
                            helpers.smartMove(creep, deposit);
                        }
                        
                    }
                } else {
                    helpers.smartMove(creep, (new RoomPosition(depositInfo.x, depositInfo.y, depositInfo.depositRoom)));
                }
            } else if (creep.memory.type == undefined || creep.memory.type == 'superharvester' ) {
                if ((creep.ticksToLive > (timeToTarget*2) && creep.store.getFreeCapacity() >= creep.getActiveBodyparts(WORK)) || (creep.memory.noReturn && depositInfo.lastCooldown < maxCooldown) || creep.memory.type == 'superharvester') {
                    if (creep.memory.type == undefined && !creep.spawning && creep.memory.startTimeToTarget == undefined){
                        creep.memory.startTimeToTarget = Game.time;
                    }
                    if (creep.memory.type == 'superharvester' && !creep.spawning && creep.memory.startTimeToTarget == undefined && creep.memory.pullerId){
                        creep.memory.startTimeToTarget = Game.time;
                    }
                    if (creep.room.name == depositInfo.depositRoom) {       //&& creep.store.getFreeCapacity() >= creep.getActiveBodyparts(WORK)
                        /** @var {Deposit} deposit **/
                        const deposit = Game.getObjectById(depositInfo.id);
                        
                        if (deposit) {
                            if (!depositInfo.depositType) {
                                depositInfo.depositType = deposit.depositType;
                            }
                            
                            if (creep.pos.inRangeTo(deposit, 3)) {
                                if (creep.memory.timeToTarget == undefined && creep.memory.startTimeToTarget) {
                                    creep.memory.timeToTarget = Game.time - creep.memory.startTimeToTarget + 20;
                                    if (!depositInfo.timeToTarget) {
                                        depositInfo.timeToTarget = creep.memory.timeToTarget;    
                                    } else {
                                        depositInfo.timeToTarget = Math.round((depositInfo.timeToTarget+creep.memory.timeToTarget)/2);
                                    }
                                }
                            }
                            
                            if (creep.pos.isNearTo(deposit.pos)){
                                if (!deposit.cooldown && creep.store.getFreeCapacity()) {
                                    const res = creep.harvest(deposit);
                                    if (res == OK) {
                                        depositInfo.lastCooldown = deposit.lastCooldown;
                                        depositInfo.time = Game.time;
                                        creep.memory.sleep = Game.time + deposit.lastCooldown - 2
                                    }
                                } else {
                                    //creep.say(deposit.cooldown);
                                }
                            } else {
                                if (creep.getActiveBodyparts(MOVE)){
                                    helpers.smartMove(creep, deposit);    
                                }
                                
                            }
                        }
                    } else {
                        if (creep.getActiveBodyparts(MOVE)){
                            helpers.smartMove(creep, (new RoomPosition(depositInfo.x, depositInfo.y, depositInfo.depositRoom)));
                        }
                    }
                } else { //return to base
                    if (creep.getActiveBodyparts(MOVE)){
                        creep.say(helpers.transferEnergyToStorage(creep));
                    }
                }
                
            }
            
            
            if (!creep.store.getUsedCapacity() && (creep.room.name == creep.memory.room || (creep.room.storage && creep.room.storage.my)) && creep.ticksToLive<(2*timeToTarget+50)) {
                creep.memory.role = undefined; 
                if (creep.ticksToLive > 1400) {
                    Game.notify('deposit recycle after spawn '+creep.room.name+' Time to target '+timeToTarget);
                    if (depositInfo) {
                        depositInfo.closed = 1;
                    }
                }
            }
        } else { //return to base
            creep.say(helpers.transferEnergyToStorage(creep));
        }
	},
	
	defendDeposit: function(depoRoomName, baseRoomName, depositInfo) {
	    if (Game.shard.name == 'shardSeason' && ['E30N11','E30N12','E30N13','E30N14','E30N15','E30N16',].includes(depoRoomName)) {
            let baseRoom = Game.rooms[baseRoomName];
            let boosts = [RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE];
            if (baseRoom && baseRoom.memory && !baseRoom.memory.boostLab && !baseRoom.memory.boostLabManual && !helpers.checkLabsBoosts(baseRoomName, boosts)) {
                baseRoom.memory.boostLab = {boosts:boosts, time:Game.time +12000};    
            }
            Memory.massRangers[depoRoomName] = {room:baseRoomName, count: 1, time:Game.time + 12000, boosted: 1, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL], boosts: [RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE], escalate: 1};
            Game.notify('send mr boosted to defend deposit '+depoRoomName);
        }
        if (Game.shard.name == 'shardSeason' && ['E10N19','E10N20','E11N20','E9N20','E10N21'].includes(depoRoomName)) {
            Memory.massRangers[depoRoomName] = {room:baseRoomName, count: 2, time:Game.time + 12000, boosted: 0, escalate: 1};
            Game.notify('send mr normal to defend deposit '+depoRoomName); 
        }
        if (Game.shard.name == 'shardSeason' && ['E10N18','E10N17',].includes(depoRoomName)) {
            Memory.massRangers[depoRoomName] = {room:baseRoomName, count: 1, time:Game.time + 12000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], escalate: 1};
            Game.notify('send mr tiny to defend deposit '+depoRoomName); 
        }
        if (Game.shard.name == 'shardSeason' && ['E14N30','E15N30','E16N30','E17N30','E18N30',].includes(depoRoomName)) {
            Memory.massRangers[depoRoomName] = {room:baseRoomName, count: 1, time:Game.time + 12000, boosted: 0, body: [ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,ATTACK, ATTACK,MOVE,], escalate: 1};
            Game.notify('send mr tinymelee to defend deposit '+depoRoomName); 
        }
        if (0 && Game.shard.name == 'shard2' && ['E40N2','E40N3','E40N4','E40N5','E40N6','E40N7','E40N8',].includes(depoRoomName)) {
            Memory.massRangers[depoRoomName] = {room:baseRoomName, count: 1, time:Game.time + 8000, boosted: 0, escalate: 1};
            Game.notify('send mr normal to defend deposit '+depoRoomName); 
        }
        if (0 && Game.shard.name == 'shard0' && ['E50N40','E50N41',].includes(depoRoomName)) {
            let baseRoom = Game.rooms[baseRoomName];
            let boosts = [RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE];
            if (baseRoom && baseRoom.memory && !baseRoom.memory.boostLab && !baseRoom.memory.boostLabManual && !helpers.checkLabsBoosts(baseRoomName, boosts)) {
                baseRoom.memory.boostLab = {boosts:boosts, time:Game.time +12000};    
            }
            Memory.massRangers[depoRoomName] = {room:baseRoomName, count: 1, time:Game.time + 12000, boosted: 1, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL], boosts: [RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE], escalate: 1};
            Game.notify('send mr boosted to defend deposit '+depoRoomName);
        }
        
        if (Game.shard.name == 'shard2' && ['E41S10','E42S10','E43S10','E44S10','E45S10','E46S10','E47S10','E48S10'].includes(depoRoomName)) {
            let freeSides = depositInfo.freeSides;
            depositInfo.freeSides = Math.max(1, Math.floor(depositInfo.freeSides/2));
            Game.notify('deposit half side '+depoRoomName+' '+freeSides+' -> '+ depositInfo.freeSides);
        }
        
        
	},
};

module.exports = roleDeposit;