var helpers = require('helpers');

var roleSkMineral = {
    //Memory.skMineral = {'E57N25':{'59f1c268a5165f24b259ad5c':{x:13, y:44, mineralRoom:'E56N26', amount:32300, time:Game.time}}}
    //Memory.skMineral['E55N37'] = {'59f1c268a5165f24b259ad0e':{x:38, y:45, mineralRoom:'E55N36', amount:35000, time:Game.time}}
    //_.set(Memory, 'skMineral.E57N35.59f1c268a5165f24b259ad58', {x:40, y:14, mineralRoom:'E56N35', amount:31500, time:Game.time})
    //_.set(Memory, 'skMineral.E57N35.59f1c268a5165f24b259ad5a', {x:45, y:14, mineralRoom:'E56N34', freeSides: 2, amount:35000, time:Game.time})
    //_.set(Memory, 'skMineral.E41N5.59f1c268a5165f24b259ac4c', {x:16, y:12, mineralRoom:'E45N4', freeSides: 7, amount:35000, time:Game.time, mineralType: RESOURCE_CATALYST})
    //_.set(Memory, 'skMineral.E43N25.59f1c268a5165f24b259ac4c', {x:35, y:44, mineralRoom:'E45N25', freeSides: 3, amount:70000, time:Game.time, mineralType: RESOURCE_UTRIUM, noAtackers: 1})
    //_.set(Memory, 'skMineral.E57N35.59f1c268a5165f24b259ad10', {x:17, y:37, mineralRoom:'E55N35', freeSides: 4, amount:35000, time:Game.time, mineralType: RESOURCE_UTRIUM, noAtackers: 1, closed:1})
    //Memory.skMineral['E57N44']['59f1c268a5165f24b259acc0'] = {x:12, y:34, mineralRoom:'E54N46', freeSides: 2, amount:36140, time:Game.time, mineralType: 'H',closed:1, timeToTarget: 335}
    //['E54N26','E55N26','E56N26','E54N25','E55N25','E56N25','E54N24','E55N24','E56N24',].forEach(r=>require('observer').lookRoom(r)); //need vision

    HARVESTER_WORK: 21,
    TRANSPORTER_CARRY: 1250,
    getBody: function(type, spawn) {
        if (type == 'transporter') {
            return [
                CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,
                CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,
            ];
        } else if (type == 'harvester') {
            if (0) {
                return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY];
            }
            return [
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            ]; //MOVE*21,WORK*21,CARRY*8;
        } else if (type == 'puller') {
            return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        } else if (type == 'atacker') {
            return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL];
        }

        console.log('skMineral get body error');
        return [MOVE];
    },

    spawn: function(room, myRoom, freeSpawn) {
        if (Memory.skMineral && Memory.skMineral[room.name] && freeSpawn){
            for (let mineralId in Memory.skMineral[room.name]) {
                let mineralInfo = Memory.skMineral[room.name][mineralId];
                if (mineralInfo.closed) continue;
                let timeToTarget = mineralInfo.timeToTarget?mineralInfo.timeToTarget:250;
                if (timeToTarget>700) {
                    mineralInfo.closed = 2;
                    delete mineralInfo.countTypes;
                    delete mineralInfo.creepTypes;
                    Game.notify('skMineral '+room.name+' '+mineralId+' too high timeToTarget '+ timeToTarget);
                }
                if (Memory.rooms[mineralInfo.mineralRoom] && Memory.rooms[mineralInfo.mineralRoom].avoid > 1) {
                    Game.notify('skMineral '+room.name+' '+mineralId+' stronghold detected ');
                    mineralInfo.closed = 1;
                    delete mineralInfo.countTypes;
                    delete mineralInfo.creepTypes;
                }
                if (room.memory.noSpawnSKMineral) {
                    if (Game.time < room.memory.noSpawnSKMineral) {
                        Game.notify('skMineral '+room.name+' '+mineralId+' noSpawnSKMineral ');
                        mineralInfo.closed = 1;
                        delete mineralInfo.countTypes;
                        delete mineralInfo.creepTypes;
                    } else {
                        delete room.memory.noSpawnSKMineral;
                    }
                }
                
                if (Game.time > mineralInfo.time + 3000) {
                    mineralInfo.closed = mineralInfo.amount?2:1;
                    delete mineralInfo.countTypes;
                    delete mineralInfo.creepTypes;
                    Game.notify('skMineral '+room.name+' '+mineralId+' no harvest in 3000 ticks');
                }
                if (!mineralInfo.closed && mineralInfo.amount) {
                    if (!mineralInfo.countTypes) {
                        mineralInfo.countTypes = {atacker: 0,harvester: 0,transporter: 0,}
                    }
                    let freeSides = mineralInfo.freeSides ? mineralInfo.freeSides : 1;
                    if (room.controller.level < 8) {
                        freeSides = Math.min(freeSides, 2);
                    }
                    if (room.storage && room.storage.store[RESOURCE_ENERGY] < 100000) {
                        freeSides = Math.min(freeSides, 2);
                    }
                    let creepTypes = {
                        atacker: (mineralInfo.noAtackers || this.isCenterSK(mineralInfo.mineralRoom))?0:1,
                        transporter: 0,
                        harvester: 1,

                    }

                    let needHarvester = Math.floor(mineralInfo.amount / ((1500-timeToTarget)/5*this.HARVESTER_WORK)*2);
                    needHarvester = Math.max(needHarvester, 1);
                    needHarvester = Math.min(needHarvester, freeSides, 4);
                    creepTypes.harvester = Game.cpu.bucket > 7500?needHarvester:1;

                    let soonDie = timeToTarget+150;
                    let creepsHarvesterLive = require('spawn').getGameCreeps(room.name, 'skMineral').reduce((a, creep) => a + (creep.memory.type == 'harvester' && creep.memory.targetId == mineralId && !creep.memory.soonDie && (creep.ticksToLive > soonDie || creep.spawning)?1:0), 0);
                    mineralInfo.countTypes.creepsHarvesterLive = creepsHarvesterLive;

                    const k = this.HARVESTER_WORK*2/5/this.TRANSPORTER_CARRY; //21 work parts, 1250 carry transporter
                    let needTransporters = k*timeToTarget*Math.min(creepsHarvesterLive, needHarvester);
                    creepTypes.transporter = needTransporters>1 ? Math.floor(needTransporters) : Math.ceil(needTransporters);

                    mineralInfo.creepTypes = {tick: Game.time, needHarvester: needHarvester, creepsHarvesterLive: creepsHarvesterLive, needTransporter: creepTypes.transporter, needTransportersFloat: needTransporters, k: k*timeToTarget}; //debug
                    Object.assign(mineralInfo.creepTypes, creepTypes);

                    for (let type in creepTypes) {
                        if (creepTypes[type]) {
                            if (type != 'atacker' && creepTypes.atacker && !mineralInfo.countTypes.atacker) {
                                continue; //wait atacker
                            }
                            let path = 'skMineral_'+mineralId+'_'+type;
                            let needSpawn = require('spawn').creepLiveCustomCheck(room.name, path, creepTypes[type],
                                creep => creep.memory.room == room.name && creep.memory.role == 'skMineral' && creep.memory.type == type && creep.memory.targetId == mineralId && !creep.memory.soonDie && (creep.ticksToLive > soonDie || creep.spawning),
                                'skMineral'
                            );
                            if (type != 'harvester') {
                                mineralInfo.countTypes[type] = require('spawn').creepLiveCustomCount(path);
                            }
                            if (freeSpawn && needSpawn) {
                                let boosts = undefined;
                                const result = freeSpawn.spawnCreep( this.getBody(type, freeSpawn), 'sm'+room.name+Game.time, {memory: {role: 'skMineral', type: type, room: room.name, boosts: boosts, targetId: mineralId,}});

                                if (result == OK){
                                    mineralInfo.countTypes[type] ++;
                                    freeSpawn = null;
                                    return freeSpawn;
                                }
                            }
                        }
                    }
                }

            }
        }
        return freeSpawn;
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

    run: function(creep) {
        if (helpers.sleep(creep)) {
            if (creep.hits < creep.hitsMax) {
            } else {
                return;    
            } 
        }
        if (helpers.runMoveOrder(creep)) return;
        if (Memory.mapVisual) Game.map.visual.text("sM️",creep.pos, { fontSize:10});
        if (creep.memory.targetId && creep.memory.room && Memory.skMineral && Memory.skMineral[creep.memory.room] && Memory.skMineral[creep.memory.room][creep.memory.targetId]) {
            let mineralInfo = Memory.skMineral[creep.memory.room][creep.memory.targetId];
            let timeToTarget = mineralInfo.timeToTarget?mineralInfo.timeToTarget:250;

            creep.memory.warningMove = 1;

            if (creep.memory.type == 'transporter') {
                if (creep.ticksToLive == 1 && creep.store.getUsedCapacity()) {
                    Game.notify('SKmineral transporter die no empty in room '+ creep.room.name + ' at tick '+ Game.time);
                }
                if (creep.room.name == creep.memory.room && creep.store.getUsedCapacity()) {
                    helpers.transferEnergyToStorage(creep);
                } else if (creep.ticksToLive > (timeToTarget*1.2) && creep.store.getFreeCapacity() && !mineralInfo.closed) {

                    let mineralPos = new RoomPosition(mineralInfo.x, mineralInfo.y, mineralInfo.mineralRoom);
                    if (0 && creep.room.name == mineralInfo.mineralRoom && creep.pos.getRangeTo(mineralPos) == 6 && !this.positionInNearBorder(creep)) {
                        creep.moveTo(mineralPos, {range:2});
                        creep.memory._trav = undefined;
                        creep.memory.noSwap = 1;
                        creep.say('nb');
                    } else if (creep.room.name == mineralInfo.mineralRoom && (creep.pos.inRangeTo(mineralPos, 5) && !this.positionInNearBorder(creep) || creep.pos.inRangeTo(mineralPos, 2))) {
                        //check other transporter
                        let transporters = mineralPos.findInRange(FIND_MY_CREEPS, 5, {
                            filter: function (object) {
                                return object.memory.role == 'skMineral' && object.memory.type == 'transporter' && object.id != creep.id && object.store && object.store.getUsedCapacity() > creep.store.getUsedCapacity();
                            }
                        });
                        if (transporters.length) {
                            creep.say('ww');
                            creep.memory.sleep = Game.time+50;
                            creep.memory.noSwap = 1;
                        } else {
                            creep.memory.noSwap = undefined;
                            //find harvester
                            let harvesters = mineralPos.findInRange(FIND_MY_CREEPS, 1, {
                                filter: function (object) {
                                    return object.memory.role == 'skMineral' && object.memory.type == 'harvester' && object.store && (object.store.getUsedCapacity() > object.getActiveBodyparts(WORK) || (!mineralInfo.amount && object.store.getUsedCapacity() > 1));
                                }
                            });
                            if (harvesters.length) {
                                //let harvester = creep.pos.findClosestByPath(harvesters);
                                let harvester = _.min(harvesters, harv => harv.store.getFreeCapacity());
                                if (creep.pos.isNearTo(harvester)){
                                    creep.say('near');
                                    for(const resourceType in harvester.store) {
                                        creep.say(harvester.transfer(creep, resourceType));
                                    }
                                    harvester.memory.noReturn = 1;
                                } else {
                                    if (creep.pos.getRangeTo(harvester)>2) {
                                        helpers.smartMove(creep, harvester);
                                        helpers.createMoveOrder(creep, harvester);
                                    } else {
                                        creep.moveTo(harvester, {range:1});    
                                    }
                                    creep.say('nh');
                                }
                            } else {
                                let tombs = mineralPos.findInRange(FIND_TOMBSTONES, 1, {
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
                                    let dropped = mineralPos.findInRange(FIND_DROPPED_RESOURCES, 1, {filter: dropped => dropped.resourceType != RESOURCE_ENERGY});
                                    if (dropped.length) {
                                        if (creep.pos.isNearTo(dropped[0])){
                                            creep.say('near');
                                            creep.say(creep.pickup(dropped[0]));
                                        } else {
                                            creep.moveTo(dropped[0], {range:1});
                                        }
                                    } else {
                                        if (creep.pos.isNearTo(mineralPos)){
                                            helpers.transferEnergyToStorage(creep);
                                        } else {
                                            if (mineralInfo.amount == 0) {
                                                mineralInfo.closed = 1;
                                                delete mineralInfo.countTypes;
                                                delete mineralInfo.creepTypes;
                                            } else {
                                                creep.say('w'); // !!todo sleep
                                                creep.memory.sleep = Game.time+10;

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    // } else if (creep.room.name == mineralInfo.mineralRoom && creep.pos.inRangeTo(mineralPos, 5) && this.positionInNearBorder(creep)) {
                        //creep.moveTo(mineralPos, {range:2})
                    } else {
                        helpers.smartMove(creep, mineralPos, 1, 1);
                        helpers.createMoveOrder(creep, mineralPos, {range: 3});
                    }
                } else {
                    helpers.transferEnergyToStorage(creep);
                    if (!creep.store.getUsedCapacity()) {
                        creep.memory.role = undefined;
                    }
                }



            } else if (creep.memory.type == 'harvester') {
                if (creep.store.getFreeCapacity() ) {
                    if (!creep.spawning && creep.memory.startTimeToTarget == undefined){
                        creep.memory.startTimeToTarget = Game.time;
                    }

                    if (creep.room.name == mineralInfo.mineralRoom) {
                        let mineral = Game.getObjectById(creep.memory.targetId);
                        // if (!mineral) {
                        //     let minerals = creep.room.find(FIND_MINERALS);
                        //     if (minerals.length) {
                        //         mineral = minerals[0];
                        //         mineralInfo.id = mineral.id;
                        //     }
                        // }
                        if (mineral) {
                            let mineralPos = mineral.pos;

                            if (!creep.memory.defenderId || !Game.getObjectById(creep.memory.defenderId)) {
                                creep.say('noDef');
                                creep.memory.defenderId = undefined;
                                let lair = null;
                                if (!creep.memory.lair) {
                                    let lair = mineralPos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter:{structureType:STRUCTURE_KEEPER_LAIR}})
                                    if (lair) {
                                        creep.memory.lair = lair.id
                                    }
                                }
                                if (!lair && creep.memory.lair) {
                                    lair = Game.getObjectById(creep.memory.lair)
                                }
                                if (lair) {
                                    let defenders = lair.pos.findInRange(FIND_MY_CREEPS, 6, {filter: obj=>obj.memory.type == 'atacker' && obj.getActiveBodyparts(ATTACK)});
                                    if (defenders.length) {
                                        creep.memory.defenderId = defenders[0].id
                                    } else {
                                        if ((lair && lair.ticksToSpawn < 12) || mineralPos.findInRange(FIND_HOSTILE_CREEPS, 7).filter(object=> !(object.owner.username == 'Invader' && object.name.startsWith('defender'))).length) {
                                            if (creep.pos.inRangeTo(lair, 8)) {
                                                helpers.smartMove(creep, Game.rooms[creep.memory.room].storage);
                                            } else {

                                            }
                                            return;
                                        }
                                    }
                                }
                            }



                            if (creep.pos.inRangeTo(mineral, 3)) {
                                if (creep.memory.timeToTarget == undefined && creep.memory.startTimeToTarget) {
                                    creep.memory.timeToTarget = Game.time - creep.memory.startTimeToTarget + 20;
                                    if (!mineralInfo.timeToTarget) {
                                        mineralInfo.timeToTarget = creep.memory.timeToTarget;
                                    } else {
                                        mineralInfo.timeToTarget = Math.round((mineralInfo.timeToTarget+creep.memory.timeToTarget)/2);
                                    }
                                }
                            }

                            if (creep.pos.isNearTo(mineral)){
                                if (creep.store.getFreeCapacity()>=creep.getActiveBodyparts(WORK)) {
                                    const res = creep.harvest(mineral);
                                    if (res == OK) {
                                        mineralInfo.amount = mineral.mineralAmount;
                                        mineralInfo.time = Game.time;
                                        creep.memory.sleep = Game.time + 5;
                                    } else if (res == ERR_NOT_ENOUGH_RESOURCES) {
                                        mineralInfo.amount = 0;
                                        mineralInfo.time = Game.time;
                                        mineralInfo.regenTime = Game.time + mineral.ticksToRegeneration;
                                        creep.memory.sleep = Game.time + 1500;
                                    }
                                } else {

                                }
                            } else if (creep.pos.inRangeTo(mineral, 3)) {
                                creep.moveTo(mineral, {maxRooms:1, range:1});
                            } else {
                                helpers.smartMove(creep, mineral);
                            }
                        } else {
                            Game.notify('No mineral for skMineral mining in room '+creep.room.name+' '+creep.memory.targetId);
                        }
                    } else {
                        if (creep.getActiveBodyparts(MOVE)){
                            let mineralPos = new RoomPosition(mineralInfo.x, mineralInfo.y, mineralInfo.mineralRoom);
                            helpers.smartMove(creep, mineralPos);
                        }
                    }
                }
            } else if (creep.memory.type == 'atacker') {
                let mineralPos = new RoomPosition(mineralInfo.x, mineralInfo.y, mineralInfo.mineralRoom);
                if (creep.room.name == mineralInfo.mineralRoom) {
                    let targets = mineralPos.findInRange(FIND_HOSTILE_CREEPS, 7).filter(object=> !(object.owner.username == 'Invader' && object.name.startsWith('defender')));
                    if (targets.length) {
                        let target = targets[0];
                        if (targets.length > 1) {
                            target = creep.pos.findClosestByPath(targets);
                        }
                        if (creep.pos.isNearTo(target)) {
                            if (creep.hits < creep.hitsMax && creep.hits <= 1500 && target.getActiveBodyparts(ATTACK) && !target.getActiveBodyparts(RANGED_ATTACK)) {
                                creep.move(creep.pos.getDirectionTo(target));
                                creep.heal(creep);
                            } else {
                                let res = creep.attack(target);
                                creep.move(creep.pos.getDirectionTo(target));
                                if (res != OK) {
                                    creep.heal(creep);
                                }
                            }
                            
                        } else {
                            creep.moveTo(target, {reusePath:0, range:1, maxRooms:1, visualizePathStyle: {stroke: '#ffffff'}});
                            if (creep.hits < creep.hitsMax || creep.pos.inRangeTo(target, 3)) {
                                creep.heal(creep);
                            }
                        }
                    } else {
                        let lair = null;
                        if (!creep.memory.lair) {
                            let lair = mineralPos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter:{structureType:STRUCTURE_KEEPER_LAIR}})
                            if (lair) {
                                creep.memory.lair = lair.id
                            }
                        }
                        if (!lair && creep.memory.lair) {
                            lair = Game.getObjectById(creep.memory.lair)
                        }
                        if (creep.hits < creep.hitsMax) {
                            creep.heal(creep);
                            if (lair && !creep.pos.isNearTo(lair)) {
                                creep.moveTo(lair, {reusePath:5, range:1, maxRooms:1});
                            }
                        } else {
                            let helpCreeps = mineralPos.findInRange(FIND_MY_CREEPS, 8, {filter: obj => obj.hits < obj.hitsMax});
                            let helpCreep = creep.pos.findClosestByRange(helpCreeps);
                            if (helpCreep) {
                                creep.moveTo(helpCreep, {reusePath:0, range:1, maxRooms:1});
                                creep.heal(helpCreep);
                            } else {
                                if (lair) {
                                    if (creep.pos.isNearTo(lair)) {
                                        if (lair.ticksToSpawn > 2) {
                                            creep.say(lair.ticksToSpawn);
                                            creep.memory.sleep = Game.time + Math.min(50, lair.ticksToSpawn-1);
                                        }
                                    } else {
                                        creep.moveTo(lair, {reusePath:5, range:1, maxRooms:1});
                                    }
                                    if (creep.hits < creep.hitsMax) {
                                        creep.heal(creep);
                                    }
                                }
                            }
                        }
                    }

                } else {
                    helpers.smartMove(creep, mineralPos);
                    if (creep.hits < creep.hitsMax) {
                        creep.heal(creep);
                    }
                }

            }
        }
    },
    isSK: function(roomName) {
        let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
        let fMod = parsed[1] % 10;
        let sMod = parsed[2] % 10;
        let isSK = //!(fMod === 5 && sMod === 5) &&
            ((fMod >= 4) && (fMod <= 6)) &&
            ((sMod >= 4) && (sMod <= 6));
        return isSK;
    },
    isCenterSK: function(roomName) {
        let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
        let fMod = parsed[1] % 10;
        let sMod = parsed[2] % 10;
        let isSK = (fMod === 5 && sMod === 5)
        return isSK;
    },

    findInObject: function (obj, name) {
        for (var k in obj) { // Loop through all properties of the object.
            if(k == name){ // If the property is the one you're looking for.
                return obj[k]; // Return it.
            }else if (typeof obj[k] == "object"){ // Else, if the object at [key] is a object,
                var t = this.findInObject(obj[k], name); // Loop through it.
                if(t){ // If the recursive function did return something.
                    return t; // Return it to the higher recursion iteration, or to the first function call.
                }
            }
        }
    },

    //Game.getObjectById('6078b78d9e39c3019a5490f2').observeRoom('E56N36');require('role.skMineral').findSkMineral(Game.rooms.E56N36);

    findSkMineral: function(room) {
        if (!room) return 'no room';
        if (!this.isSK(room.name)) return 'no SK room';
        if (!this.skMineralRooms[Game.shard.name]) return 'no shard allowed';
        if (!this.skMineralRooms[Game.shard.name].includes(room.name)) return 'no room in config';
        //if (!(require('observer').xolymArea[Game.shard.name] || []).includes(room.name)) return 'No Xolym area';

        if (room.memory.skMineralChecked) return 'already checked'; //!!!!!!!!!!!!!!!!!!!!
        room.memory.skMineralChecked = 2;

        let minerals = room.find(FIND_MINERALS);
        if (minerals.length) {
            let mineral = minerals[0];

            if (0 && this.findInObject(Memory.skMineral, mineral.id)) { //!!!!!!tmp
                room.memory.skMineralChecked = 1;
                let mineralInfo = this.findInObject(Memory.skMineral, mineral.id);
                if (!mineralInfo.mineralType) {
                    mineralInfo.mineralType = mineral.mineralType;
                    return 'mineralType update';
                }

                return 'already added';
            }
            //check free sides
            let freeSides = 0;
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (!dx && !dy) { continue;}
                    let pos = new RoomPosition(mineral.pos.x + dx, mineral.pos.y + dy, room.name);
                    let found = pos.lookFor(LOOK_TERRAIN);
                    if (found.length && found[0] != 'wall'){
                        freeSides++;
                    }
                }
            }

            //let spawnRoom = require('observer').findClosestRoomByPath(room.name, mineral.pos.x, mineral.pos.y);
            let spawnRoomInfo = require('observer').findClosestRoomByPath(room.name, mineral.pos.x, mineral.pos.y, 24, true);
            if (!spawnRoomInfo) return 'No spawn room found';
            let spawnRoom = spawnRoomInfo.roomName;
            let pathLength = spawnRoomInfo.length;

            _.set(Memory, 'skMineral.'+spawnRoom+'.'+mineral.id, {x:mineral.pos.x, y:mineral.pos.y, mineralRoom:room.name,
                freeSides: freeSides,
                amount: mineral.mineralAmount,
                mineralType: mineral.mineralType,
                timeToTarget:pathLength,
                time:Game.time,
                regenTime: mineral.ticksToRegeneration ? Game.time+mineral.ticksToRegeneration : undefined,
                closed: 1});
            room.memory.skMineralChecked = 1;
            return 'added';

        } else {
            return 'no mineral in room';
        }

    },

    tickReset: function() {
        if (!(Game.time%500)) {
            this.enableSKharvest();
        }
        this.mapVisual();
    },

    skHarvestInfo: function() {
        let harvestCount = 0;
        let spawnRooms = [];
        let harvestRooms = [];
        let details = [];
        for(let roomName in Memory.skMineral) {
            for( let mineralId in Memory.skMineral[roomName]) {
                let mineralInfo = Memory.skMineral[roomName][mineralId];
                if (mineralInfo.amount && !mineralInfo.closed) {
                    harvestCount++;
                    spawnRooms.push(roomName);
                    harvestRooms.push(mineralInfo.mineralRoom);
                    details.push(mineralInfo);
                }
            }
        }
        return [harvestCount, spawnRooms, harvestRooms, details];

    },
    skStockInfo: function() {
        let details = [];
        for(let roomName in Memory.skMineral) {
            for(let mineralId in Memory.skMineral[roomName]) {
                let mineralInfo = Memory.skMineral[roomName][mineralId];
                if ((mineralInfo.amount || (mineralInfo.regenTime && Game.time > mineralInfo.regenTime)) && mineralInfo.closed && mineralInfo.closed == 1) {
                    let info = require('fastest-json-copy').copy(mineralInfo);
                    info.mineralId = mineralId;
                    info.spawnRoom = roomName;
                    details.push(info);
                }
            }
        }
        return details;

    },

    //require('role.skMineral').enableSKharvest(3, RESOURCE_OXYGEN);
    enableSKharvest: function(harvestCountNeed = 6, needMineralType = 0, id = undefined) {
        if (!Memory.skMineral) return;
        let [harvestCount, spawnRooms, harvestRooms, details] = this.skHarvestInfo();
        console.log('skMineral harvest count', harvestCount, harvestRooms, spawnRooms);
        if (harvestCount >= harvestCountNeed) return;
        let mineralInfoList = [];
        for(let roomName in Memory.skMineral) {
            for( let mineralId in Memory.skMineral[roomName]) {
                let mineralInfo = Memory.skMineral[roomName][mineralId];
                if (mineralInfo.closed == 2) continue;
                if (mineralInfo.amount && !mineralInfo.closed) continue;
                if (spawnRooms.includes(roomName)) continue;
                if (Memory.rooms[roomName] && Memory.rooms[roomName].noSpawnSKMineral && Game.time < Memory.rooms[roomName].noSpawnSKMineral) continue;
                if (harvestRooms.includes(mineralInfo.mineralRoom)) continue;
                if (mineralInfo.regenTime && Game.time < mineralInfo.regenTime) continue;
                if (Memory.rooms[mineralInfo.mineralRoom] && Memory.rooms[mineralInfo.mineralRoom].avoid > 1) continue;
                if (needMineralType && !mineralInfo.mineralType) continue;
                if (needMineralType && mineralInfo.mineralType != needMineralType) continue;
                if (!id && _.get(Memory, 'stock.'+mineralInfo.mineralType, 0) > 900000) continue;
                if (id && mineralId != id) continue;

                if (mineralInfo.regenTime && Game.time >= mineralInfo.regenTime) {
                    delete mineralInfo.regenTime;
                    mineralInfo.amount = 100000;
                }
                mineralInfoList.push(mineralInfo);
            }
        }
        if (!mineralInfoList.length) return 'enableSKharvest not found';
        let debugText = '';
        mineralInfoList.forEach(info => {
            debugText += info.mineralRoom+' '+info.mineralType+' '+_.get(Memory, 'stock['+info.mineralType+']', 0)+' '+info.timeToTarget+'<br>\n';
        })

        let minResource = _.min(mineralInfoList, info => _.get(Memory, 'stock['+info.mineralType+']', 0)).mineralType;
        console.log('minResource',minResource, _.get(Memory, 'stock['+minResource+']', 0));
        mineralInfoList = mineralInfoList.filter(info => info.mineralType == minResource);
        console.log('mineralInfoList', JSON.stringify(mineralInfoList));
        let mineralInfo = _.min(mineralInfoList, 'timeToTarget' , 0);
        if (mineralInfo) {
            //return 'minResminPath' + JSON.stringify(mineralInfo)+'<br>\n'+debugText; //!!!!!!!!!!!!!!!!!!!!!!!!!!!
            delete mineralInfo.closed;
            mineralInfo.time = Game.time;
            let message = 'Enable skMineral harvesting '+(mineralInfo.mineralType?mineralInfo.mineralType:'unknown mineral') +' in room '+mineralInfo.mineralRoom+' spawnRoom '+'??'+ '<br>'+debugText;
            console.log(message);
            //Game.notify(message);
            return message;
        }
        return 'enableSKharvest impossible return';

    },

    mapVisual: function() {
        if (!Memory.skMineral) return;
        if (!Memory.mapVisual) return;
        for (let spawnRoom in Memory.skMineral) {
            for (let id in Memory.skMineral[spawnRoom]) {
                let mineralInfo = Memory.skMineral[spawnRoom][id];
                let pos = new RoomPosition(mineralInfo.x, mineralInfo.y, mineralInfo.mineralRoom);
                let text = mineralInfo.mineralType;
                if (mineralInfo.amount) {
                    text+=' '+mineralInfo.amount;
                }
                if (mineralInfo.regenTime && Game.time < mineralInfo.regenTime) {
                    text+=' regen '+ Math.round((mineralInfo.regenTime-Game.time)/1000)+'k';
                } else if (mineralInfo.closed) {
                    text += ' closed';
                }

                if (mineralInfo.closed == 2) {
                    text+= ' ERR';
                }
                Game.map.visual.text(text,pos, {align: 'left', fontSize:10});

                let endPos = new RoomPosition(24,24,spawnRoom);
                Game.map.visual.line(pos, endPos,{color: '#00ff00', lineStyle: 'dashed', width:1.3});
            }

        }

    },

    skMineralRooms: {
        'shard2': [
            'E54N34','E55N34','E56N34','E54N35','E55N35','E56N35','E54N36','E55N36','E56N36', //qw3
            'E44N36','E45N36',/*'E46N36',*/'E44N34','E45N34','E46N34','E44N35','E45N35','E46N35',
            'E44N26','E45N26','E46N26','E44N25','E45N25','E46N25','E44N24','E45N24','E46N24',
            'E44N6','E45N6','E46N6','E44N5','E45N5','E46N5','E44N4','E45N4','E46N4',
            'E54N44','E55N44','E56N44','E54N45','E55N45','E56N45','E54N46','E55N46','E56N46', 
            'E54N26','E55N26','E56N26','E54N25','E55N25','E56N25','E54N24','E55N24','E56N24',
        ],
    },

};

module.exports = roleSkMineral;