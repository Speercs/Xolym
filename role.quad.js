var helpers = require('helpers');
var Traveler = require('Traveler');
var roleQuad = {
    
    spawnHelpers: function (room, myRoom, freeSpawn) {
        const startCpuQuadHelper = Game.cpu.getUsed();
        if (Memory.quads && 1) {
            for (helpRoom in Memory.quads) {
                const quadTask = Memory.quads[helpRoom];
                if (quadTask && quadTask.count) {
                    if (!quadTask.currentIndex) {
                        quadTask.currentIndex = 1;
                    }
                    //quad('E55N26', 5, 9000);
                    //flags('FlagQuad', 'remove');
                    //Game.rooms.E49N22.memory.boostLab = {boosts:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE,], time:Game.time +500+30000};    
                    //Memory.quads['E48N20'] = {room:'E49N22', time:Game.time, duration: 3000000, count:1}
                    //Memory.pairs['E49N47'] = {room:'E52N46',  time: Game.time, duration: 30000, count: 1, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};                
                    let duration = quadTask.duration?quadTask.duration:999999999;
                    if (Game.time > quadTask.time && Game.time < quadTask.time + duration) {
                        if (quadTask.room == room.name) {
                            let soonDie = quadTask.soonDie?quadTask.soonDie:250;
                            
                            if (!Memory.quadGroups) {
                                Memory.quadGroups = {};
                            }
                            
                            let countLive = 0;
                            for (groupName in Memory.quadGroups){
                                if (!groupName.startsWith(helpRoom)) {
                                    continue;
                                }
                                let groupInfo = Memory.quadGroups[groupName];
                                if (groupInfo.live === 0) {
                                    continue;
                                }
                                let creeps = groupInfo.creeps;
                                let creepsLive = 0;
                                
                                for (let index =0; index<creeps.length; index++) {
                                    let creepInfo = creeps[index];
                                    if (!creepInfo.name) {
                                        creepsLive = 4;
                                        break;
                                    }
                                    let creep = Game.creeps[creepInfo.name];
                                    if (creep && (creep.ticksToLive > soonDie || creep.spawning)) {
                                        creepsLive++
                                    }
                                }
                                
                                if (creepsLive >= 3) {
                                    countLive++;
                                } else {
                                    groupInfo.live = 0;
                                }
                            }
                            
                            if (quadTask.stronghold && Game.rooms[helpRoom] && !(Game.time%30)) {
                                if (Game.rooms[helpRoom].find(FIND_RUINS).filter(ruin=>ruin.structure && ruin.structure.structureType == STRUCTURE_INVADER_CORE).length) {
                                    Game.notify('Quad: Stronghold destroyed in room '+helpRoom);
                                    quadTask.count = 0;
                                    if (Memory[quadTask.room] && Memory[quadTask.room].boostLab && Memory[quadTask.room].boostLab.quad) {
                                        Memory[quadTask.room].boostLab.time = Game.time + 150;
                                        Memory[quadTask.room].boostLab.quad = 0;
                                    }
                                }
                            }
                            
                            if (countLive < quadTask.count){
                                let groupName = helpRoom+'_'+quadTask.currentIndex;
                                let flagAttackName = 'FlagQuadAttack'+helpRoom;
                                let flagEscapeName = 'FlagQuadEscape'+helpRoom;
                                let flagFormationName = 'FlagQuadFormation'+helpRoom;
                                let flagWaitName = 'Flag'+room.name+'wait';
                                
                                if (!Game.flags[flagWaitName]) {
                                    try {
                                        (new RoomPosition(25,25, room.name)).createFlag(flagWaitName, COLOR_CYAN);    
                                    } catch (e) {}
                                    
                                }
                                
                                if (!Game.flags[flagAttackName] || !Game.flags[flagEscapeName] || !Game.flags[flagFormationName]) {
                                    if (room.memory.observer == undefined){
                                        let observers = room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_OBSERVER }});
                                        if (observers.length) {
                                            room.memory.observer = observers[0].id;
                                        } else {
                                            room.memory.observer = 0;
                                        }
                                    }
                                    if (!room.memory.observer) {
                                        console.log('No observer in room '+room.name+' for creating quad flags');
                                        Game.notify('No observer in room '+room.name+' for creating quad flags');
                                        continue;
                                    }
                                    let obs = Game.getObjectById(room.memory.observer);
                                    
                                    if (!Game.flags[flagAttackName]) {
                                        if (obs) obs.observeRoom(helpRoom);
                                        let helpRoomObject = Game.rooms[helpRoom];
                                        if (helpRoomObject) {
                                            if (quadTask.stronghold == undefined) {
                                                quadTask.stronghold = helpRoomObject.find(FIND_STRUCTURES).filter(s=>s.structureType == STRUCTURE_INVADER_CORE && s.level > 1).length;
                                            }
                                            
                                            let pos = new RoomPosition(24,25, helpRoom);
                                            pos.createFlag(flagAttackName, COLOR_RED);
                                            
                                            let ret = Traveler.Traveler.findTravelPath(room.storage, pos, {ignoreRoads: true, range: 24});
                                            if (ret.incomplete) {
                                                Game.notify('Quad: error creating formation Flag');
                                                console.log(room.name, 'Quad: error creating formation Flag');
                                                pos = new RoomPosition(25,25, helpRoom);
                                                pos.createFlag(flagEscapeName, COLOR_BLUE);
                                                pos = new RoomPosition(26,25, helpRoom);
                                                pos.createFlag(flagFormationName, COLOR_PURPLE);
                                                quadTask.formationNearPos = 0;
                                            } else {
                                                let formationNearPos = ret.path.reverse().find(pos=>pos.roomName != helpRoom);
                                                if (formationNearPos) {
                                                    quadTask.formationNearPos = {x:formationNearPos.x, y:formationNearPos.y, roomName:formationNearPos.roomName};
                                                } else {
                                                    quadTask.formationNearPos = 0;
                                                }
                                            }
                                        }
                                    } else if (quadTask.formationNearPos === 0) {
                                        Game.notify('Quad: error creating formation Flag');
                                        console.log(room.name, 'Quad: error creating formation Flag');
                                    } else if (quadTask.formationNearPos) {
                                        let formationRoomName = quadTask.formationNearPos.roomName;
                                        if (obs) obs.observeRoom(formationRoomName);
                                        let formationRoom = Game.rooms[formationRoomName];
                                        if (formationRoom) {
                                            let pos = new RoomPosition(quadTask.formationNearPos.x, quadTask.formationNearPos.y, formationRoomName);
                                            let formationPos = require('manualScripts').findQuadFormation(pos);
                                            if (formationPos) {
                                                formationPos.createFlag(flagFormationName, COLOR_PURPLE);
                                                let escapePos = new RoomPosition(formationPos.x+1, formationPos.y, formationRoomName);
                                                escapePos.createFlag(flagEscapeName, COLOR_BLUE);
                                            } else {
                                                quadTask.formationNearPos = 0;
                                            }
                                        }
                                    } 
                                    
                                    if (!Game.flags[flagAttackName] || !Game.flags[flagEscapeName] || !Game.flags[flagFormationName]) {
                                        continue;
                                    }
                                }
                                if (!quadTask.spawnTime) {
                                    //console.log('Quad spawn off!!'); continue; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                    let boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
                                    let baseRoom = Game.rooms[quadTask.room];
                                    if (baseRoom) { // && !baseRoom.memory.boostLab && !baseRoom.memory.boostLabManual && !helpers.checkLabsBoosts(homeRoom, boosts)) {
                                        if (baseRoom.memory.boostLabManual) {
                                            Game.notify('Quad: boostLabManual');
                                        } else if (baseRoom.memory.boostLab && !baseRoom.memory.boostLab.quad) {
                                            // Game.notify('Quad: boostLab already set. try off');
                                            // baseRoom.memory.boostLab.time = 1; 
                                            Game.notify('Quad: boostLab already set. continue');
                                            quadTask.spawnTime = Game.time + 300;    
                                        } else {
                                            baseRoom.memory.boostLab = {boosts:boosts, time:Game.time +300000, filler: 1, spawn: 1, quad: 1};
                                            quadTask.spawnTime = Game.time + 300;    
                                        }
                                    }
                                }
                                
                                if (!quadTask.spawnTime) {
                                    if (Game.time > quadTask.time + 5000) {
                                        Game.notify('Quad: no 5000 ticks spawn in room '+ quadTask.room + ' Deactivated!!');
                                        quadTask.count = 0;
                                    }
                                    continue;
                                } else if (Game.time < quadTask.spawnTime) {
                                    console.log('quad in room '+quadTask.room+' wait spawn time '+(quadTask.spawnTime - Game.time));
                                    continue;
                                }
                                
                                //Memory.quads['E57N23'] = {room:'E58N22',  time: Game.time, duration: 10000000, count: 1, };
                                quadTask.currentIndex++;
                                let groupInfo = {
                                    pos: {x: 0, y: 0, roomName: ''},
                                    homeRoom: room.name,
                                    waitFlag: flagWaitName,
                                    formationFlag: flagFormationName,
                                    attackFlag: flagAttackName,
                                    escapeFlag: flagEscapeName,
                                    moveCloseRange: 1, //1 2 3 если один то масс атака
                                    safeDistance: 3, // если 4 то будет пляска.. если 3 то нет.  //Memory.quadGroups.groupSN4.safeDistance
                                    manualPositions: [],
                                    creeps: [
                                        // {
                                        //     body: [MOVE],
                                        //     boosts: [],
                                        // },
                                        // {
                                        //     body: [MOVE],
                                        //     boosts: [],
                                        // },
                                        // {
                                        //     body: [MOVE],
                                        //     boosts: [],
                                        // },
                                        // {
                                        //     body: [MOVE],
                                        //     boosts: [],
                                        // },
                                        { //TOUGH*4,MOVE*10,RANGED_ATTACK*26,HEAL*10
                                          body: [
                                              RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                              MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                              TOUGH,TOUGH,TOUGH,TOUGH,
                                              HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                                              MOVE,
                                              ],
                                          boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                                        },
                                        { //TOUGH*4,MOVE*10,RANGED_ATTACK*26,HEAL*10
                                          body: [
                                              RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                              MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                              TOUGH,TOUGH,TOUGH,TOUGH,
                                              HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                                              MOVE,
                                              ],
                                          boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                                        },
                                        { //TOUGH*4,MOVE*10,RANGED_ATTACK*6,HEAL*30
                                          body: [
                                            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                            TOUGH,TOUGH,TOUGH,TOUGH,
                                            HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,
                                            ],
                                          boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                                        },
                                        { //TOUGH*4,MOVE*10,RANGED_ATTACK*6,HEAL*30
                                          body: [
                                            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                            TOUGH,TOUGH,TOUGH,TOUGH,
                                            HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,
                                            ],
                                          boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                                        },

                                        // { //MOVE*10,RANGED_ATTACK*34,HEAL*6
                                        //   body: [
                                        //   RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                        //   MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        //   HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],
                                        //   boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                                        // },
                                        // { //MOVE*10,RANGED_ATTACK*34,HEAL*6
                                        //   body: [
                                        //   RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                        //   MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        //   HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],
                                        //   boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                                        // },
                                        // { //MOVE*10,RANGED_ATTACK*5,HEAL*35
                                        //     body:[
                                        //     RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                        //     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        //     HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                                        //     MOVE,],
                                        //     boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                                        // },
                                        // { //MOVE*10,RANGED_ATTACK*5,HEAL*35
                                        //     body:[
                                        //     RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                                        //     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        //     HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                                        //     MOVE,],
                                        //     boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                                        // },
                                    ],
                                };
                                let groupInfoMelee = {
                                    pos: {x: 0, y: 0, roomName: ''},
                                    homeRoom: room.name,
                                    waitFlag: flagWaitName,
                                    formationFlag: flagFormationName,
                                    attackFlag: flagAttackName,
                                    escapeFlag: flagEscapeName,
                                    moveCloseRange: 1, //1 2 3 если один то масс атака
                                    safeDistance: 3, // если 4 то будет пляска.. если 3 то нет.  //Memory.quadGroups.groupSN4.safeDistance
                                    manualPositions: [],
                                    melee: 1,
                                    creeps: [
                                        
                                        {
                                          body: b('5t1r24a9m10t1m'),
                                          boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                                        },
                                        {
                                          body: b('5t15r9m5t15h1m'),
                                          boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE,RESOURCE_CATALYZED_KEANIUM_ALKALIDE ],
                                        },
                                        {
                                          body: b('10t9m30h1m'),
                                          boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE ],
                                        },
                                        {
                                          body: b('10t9m30h1m'),
                                          boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE ],
                                        },
                                    ],
                                };
                                
                                if (quadTask.melee) {
                                    Memory.quadGroups[groupName] = groupInfoMelee;
                                } else {
                                    Memory.quadGroups[groupName] = groupInfo;
                                }
                            }
                        }    
                    }
                }
            }

        }
        const elapsedQuadHelper = Game.cpu.getUsed() - startCpuQuadHelper;
        if (elapsedQuadHelper>0.1) {
            console.log('QuadCpuHelper '+ elapsedQuadHelper.toFixed(2)+' ');    
        }
        return freeSpawn;
    },
    
    
    init: function() {
        if (!Memory.quadGroups) {
            Memory.quadGroups = {};
        }

        if (Game.shard.name == 'shardSeason') {
             if (0 && !Memory.quadGroups.groupQ_1) { 
                Memory.quadGroups.groupQ_1 = {  //Memory.quadGroups.groupQ_1.needChangePosition = 11  //Memory.quadGroups.groupQ_1.creeps[0].name = 'mrE83N54_39879422';Game.creeps.mrE83N54_39879422.memory.role = 'quad'
                    pos: {x: 43, y: 22, roomName: 'E27N21'},
                    homeRoom: 'E26N22',
                    waitFlag: 'FlagE27N21wait',
                    formationFlag: 'flagQuadgroupQFormation1',
                    maxRange: 10,
                    attackFlag: 'flagQuadgroupQAttack1',
                    escapeFlag: 'flagQuadgroupQEscape1',
                    moveCloseRange: 1, //1 2 3 если один то масс атака
                    safeDistance: 2, // если 4 то будет пляска.. если 3 то нет.
                    //manualPositions: ['quadSh3Pos1',],// 'quadSh3Pos2', 'quadSh3Pos3',],
                    creeps: [
                        { 
                            name: 'mrE26N22_784509',
                        },
                        {
                            name: 'mrE26N22_784508',
                        },
                        { 
                            name: 'mrE26N22_784658',
                        },
                        { 
                            name: 'mrE26N22_784659',
                        },
                        
                    ],
                    
                };
            } 
        }
            
        
    },
    
    spawn: function (room, myRoom, freeSpawn) {
        if (Memory.quadGroups && freeSpawn) {
            for (group in Memory.quadGroups) {
                const groupInfo = Memory.quadGroups[group];
                if (groupInfo && groupInfo.creeps) {
                    if (groupInfo.homeRoom == room.name) {
                        for (creepInfo of groupInfo.creeps) {
                            if (!creepInfo.name && freeSpawn) {
                                let name = 'q'+group+Game.time;
                                const result = freeSpawn.spawnCreep(creepInfo.body, name, {memory: {role: 'quad', type: creepInfo.type, room: room.name, boosts: creepInfo.boosts.slice(), group: group}});
                                if (result == OK){
                                    creepInfo.name = name;
                                    freeSpawn = null;   
                                } else {
                                    freeSpawn = null;
                                }
                            }
                        }
                    }   
                }
            }
        }
        return freeSpawn;
    },
    
    runGroups: function() {
        
        if (!(Game.time%1000)) {
            for (let roomName in Memory.rooms) {
                if (Memory.rooms[roomName] && Memory.rooms[roomName].quadCostMatrix && ((Memory.rooms[roomName].quadCostMatrixTime && Game.time > Memory.rooms[roomName].quadCostMatrixTime + 2000) || !Memory.rooms[roomName].quadCostMatrixTime) ) {
                    Memory.rooms[roomName].quadCostMatrix = undefined;
                    Memory.rooms[roomName].quadCostMatrixTime = undefined;
                    Memory.rooms[roomName].quadCostMatrixStructCount = undefined;
                }
                if (Memory.rooms[roomName].targetEnemyQuadStruct) {
                    delete Memory.rooms[roomName].targetEnemyQuadStruct;
                }
            }
        }
        
        if (!(Game.time%1000)) {
            for (let roomName in this.quadMatrix) {
                if (this.quadMatrix[roomName] && ((this.quadMatrix[roomName].quadCostMatrixTime && Game.time > this.quadMatrix.quadCostMatrixTime + 2000) || !this.quadMatrix[roomName].quadCostMatrixTime)) {
                    delete this.quadMatrix[roomName];
                }
            }
            
            for (let roomName in this.targetEnemyQuadStruct) {
                if (_.isEmpty(this.targetEnemyQuadStruct[roomName])) {
                    delete this.targetEnemyQuadStruct[roomName];
                } else {
                    for (let groupName in this.targetEnemyQuadStruct[roomName]) {
                        if (Game.time > this.targetEnemyQuadStruct[roomName][groupName].time) {
                            delete this.targetEnemyQuadStruct[roomName][groupName];
                        }
                    }
                }
            }
            
        }
        
        //return;
        if (!Memory.quadGroups) return;
        
        
        for (let group in Memory.quadGroups) {
            const startCpuRunGroups = Game.cpu.getUsed();
            this.runGroup(Memory.quadGroups[group], group);
            const elapsedRunGroups = Game.cpu.getUsed() - startCpuRunGroups;
            if (1 && elapsedRunGroups >= 0.1) console.log('QuadRunGroups '+group+' '+ elapsedRunGroups.toFixed(2));
        }

    },
    posMatrix: { //2x2
        [TOP]: [[0,0],[1,0],[0,1],[1,1]], 
        [RIGHT]: [[1,0],[1,1],[0,0],[0,1]],
        [LEFT]: [[0,1],[0,0],[1,1],[1,0]], 
        [BOTTOM]: [[0,1],[1,1],[0,0],[1,0]], 
    },
    getDeltaPos: function(index, direction = TOP) {
        if (this.posMatrix[direction]) {
            return this.posMatrix[direction][index];    
        }
        return this.posMatrix[TOP][index];
    },
    getRange: function(pos, target) {
        let range = 100;
        if (this.positionInBorder(pos)) {
            return pos.getRangeTo(target);
        }
        this.posMatrix[TOP].forEach(dPos => {
            let checkPos = new RoomPosition(pos.x+dPos[0], pos.y+dPos[1], pos.roomName);
            range = Math.min(range, checkPos.getRangeTo(target));
        });    
        return range;
    },
    
    setQuadCost: function(costs, x, y, val, border = 0, valBorder) {
        if (!valBorder) valBorder = val;
        for (let dx= -1-border;dx<=0+border;dx++){
            for (let dy=-1-border;dy<=0+border;dy++){
                let setVal = (dx < -1 || dx > 0 || dy < -1 || dy > 0) ? valBorder : val;
                if (costs.get(x+dx, y+dy) < setVal) {
                    costs.set(x+dx, y+dy, setVal);    
                }
            }
        }
    },
    setOneCost: function(costs, x, y, val, border = 0) {
        for (let dx= -border;dx<=border;dx++){
            for (let dy=-border;dy<=border;dy++){    
                costs.set(x+dx, y+dy, val);
            }
        }
    },

    quadMatrix: {},
    getCostMatrix: function(roomName){
        let room = Game.rooms[roomName];
        if (!room) return;
        let costs = null;
        if (!roleQuad.quadMatrix[roomName]) {
            roleQuad.quadMatrix[roomName] = {};
        }
        roleQuad.quadMatrix[roomName].quadCostMatrixTime = Game.time;
        
        if (1 && !(Game.time%2) && roleQuad.quadMatrix[roomName].quadCostMatrix && roleQuad.quadMatrix[roomName].quadCostMatrixStructCount && room.find(FIND_STRUCTURES).length != roleQuad.quadMatrix[roomName].quadCostMatrixStructCount) {
            delete roleQuad.quadMatrix[roomName].quadCostMatrix;
        }
        
        if (1 && roleQuad.quadMatrix[roomName].quadCostMatrix) {
            costs = roleQuad.quadMatrix[roomName].quadCostMatrix.clone();//PathFinder.CostMatrix.deserialize(room.memory.quadCostMatrix)
        } else {
            console.log('cost matrix renew in room '+roomName+' !!!!!!!!!!!!!!!!!!!!!!');
            costs = new PathFinder.CostMatrix;
            
            const terrain = new Room.Terrain(roomName);

            const roomStructures = room.find(FIND_STRUCTURES);
            roomStructures.forEach(function(struct) {
                if (struct.structureType === STRUCTURE_ROAD) {
                    costs.set(struct.pos.x, struct.pos.y, 1);
                }
            });
            
            for (let x = 1; x<50; x++) {
                for (let y = 1; y<50; y++) {    
                    let place = terrain.get(x,y);
                    if (place == TERRAIN_MASK_SWAMP) {
                        roleQuad.setQuadCost(costs, x, y, 25);
                    }
                }
            }

            roomStructures.forEach(function(struct) {
                if (struct.structureType !== STRUCTURE_ROAD && struct.structureType !== STRUCTURE_CONTAINER && (struct.structureType !== STRUCTURE_RAMPART || !struct.my)) { 
                    roleQuad.setQuadCost(costs, struct.pos.x, struct.pos.y, 255);
                }
            });

            for (let x = 1; x<50; x++) {
                for (let y = 1; y<50; y++) {    
                    let place = terrain.get(x,y);
                    if (place == TERRAIN_MASK_WALL) {
                        roleQuad.setQuadCost(costs, x, y, 255);
                    }
                }
            }
            
            roleQuad.quadMatrix[roomName].quadCostMatrix = costs.clone(); //room.memory.quadCostMatrix = costs.serialize();
            roleQuad.quadMatrix[roomName].quadCostMatrixStructCount = roomStructures.length;
        }
        
        
        // Avoid my creeps in the room
        if (1 || !roleQuad.ignoreCreeps) {
            let groupCreepsIds = roleQuad.groupCreeps.map(creep=>creep.id);
            room.find(FIND_MY_CREEPS)
                .filter(creep => !groupCreepsIds.includes(creep.id))
                .forEach(creep =>  roleQuad.setQuadCost(costs, creep.pos.x, creep.pos.y, 255, 1, 50));
        }
        
        // Avoid enemy creeps in the room
        if (!roleQuad.ignoreCreeps) {
            room.find(FIND_HOSTILE_CREEPS).forEach(function(creep) { 
                if (creep.getActiveBodyparts(RANGED_ATTACK) && roleQuad.retreat){
                    roleQuad.setQuadCost(costs, creep.pos.x, creep.pos.y, 50, 2);
                } else if (creep.getActiveBodyparts(ATTACK) && roleQuad.retreat){
                    roleQuad.setQuadCost(costs, creep.pos.x, creep.pos.y, 50, 1);
                } else {
                    roleQuad.setQuadCost(costs, creep.pos.x, creep.pos.y, 50);
                }
            });
        }
        
        if (roleQuad.retreat) {
            const roomStructures = room.find(FIND_STRUCTURES);
            roomStructures.forEach(function(struct) {
                if (struct.structureType == STRUCTURE_TOWER && !struct.my) {
                    roleQuad.setQuadCost(costs, struct.pos.x, struct.pos.y, 25, 2);
                }
            });
        }

        //Memory.quadVisual = Game.time + 3000;
        if (0 || (Memory.quadVisual && Game.time < Memory.quadVisual)) {
            for (let x = 0; x<50; x++) {
                for (let y = 0; y<50; y++) {    
                    let place = costs.get(x,y);
                    if (place == 255) {
                        room.visual.circle(x, y, {radius: 0.15})
                    } else if (place >= 50) {
                        room.visual.circle(x, y, {radius: 0.08})
                    } else if (place >= 25) {
                        room.visual.circle(x, y, {radius: 0.04})
                    }
                }
            }
        }
        
        return costs;
        
    },
    ignoreCreeps: true,
    retreat: false,
    groupCreeps : [],
    getDirection: function(pos, target, range, ignoreCreeps = true, retreat = false, oneRoom = false) {
        if (target.pos) {
            target = target.pos;
        }
        let goal =  { pos: target, range: range };
        //let costMatrixFunc = this.getCostMatrix;
        this.ignoreCreeps = ignoreCreeps;
        this.retreat = retreat;
        let ret = PathFinder.search(
            pos, goal,
            {
              // We need to set the defaults costs higher so that we
              // can set the road cost lower in `roomCallback`
              //plainCost: 2,
              //swampCost: 10,
              maxRooms: oneRoom?1:16,
              roomCallback: this.getCostMatrix,
            }
        );
        
        if (0 || (Memory.quadVisual && Game.time < Memory.quadVisual)) {
            let lastPosition = pos;
            for (let position of ret.path) {
                if (position.roomName === lastPosition.roomName) {
                    new RoomVisual(position.roomName).line(position, lastPosition, { color: '#ccc', lineStyle: "dashed" });
                }
                lastPosition = position;
            }
        }
        
        
        return pos.getDirectionTo(ret.path[0]);
        
    },
    
    setDirectionToTarget: function(group, groupPos, target) {
        if (this.positionInBorder(groupPos)) {
            return 0;
        }
        //check direction;
        let targetPos = target.pos?target.pos:target;
        let dx = targetPos.x - groupPos.x;
        let dy = targetPos.y - groupPos.y;
        let absDx = Math.abs(dx);
        let absDy = Math.abs(dy);
        
        let newDirection = -1;
        if ((dx == -1 && dy == -1) || /*(dx == 0 && dy == -1) ||*/ (dx == 1 && dy == -1)) {
             newDirection = LEFT;    
        } else if (dx == 2 && dy == 2) {
             newDirection = RIGHT;    
        } else if (dx == -1 && dy == 2) {
             newDirection = BOTTOM;    
        } else if (dx == 2 && dy == -1) {
             newDirection = TOP;    
        } else if ((dx == -3 && dy == 3) || (dx == 1 && dy == 2) || (dx == -1 && dy == 2)) {
             newDirection = BOTTOM;    
        } else if (dx == -1 && dy == 1) {
            newDirection = LEFT;    
        } else if (dx == 3 && dy == 4) {
            newDirection = BOTTOM;    
        } else if (dx == -2 && dy == 1) {
            newDirection = LEFT;    
        } else if (dx == -2 && dy == 2) {
            newDirection = LEFT;    
        } else if  (absDx > absDy + 1) {
            //right or left
            if (dx>0) {
                newDirection = RIGHT;    
            } else {
                newDirection = LEFT;    
            }
        } else if  (absDy > absDx +1) {
            //TOP or BOTTOM
            if (dy>0) {
                newDirection = BOTTOM;    
            } else {
                newDirection = TOP;    
            }
        }
        console.log('Direction', dx, dy, absDx, absDy, 'newDir', newDirection);
        if (group.newDirection) {
            newDirection = group.newDirection;
            group.newDirection = undefined;
        }
        if (newDirection !== -1 && group.direction != newDirection) {
            //check fatigue
            for (let index =0; index<group.creeps.length; index++) {
                let creep = Game.creeps[group.creeps[index].name];
                if (creep && creep.fatigue) {
                    return 0;
                }
            }
            //rotate
            group.direction = newDirection;
            for (let index =0; index<group.creeps.length; index++) {
                let creep = Game.creeps[group.creeps[index].name];
                if (creep) {
                    let creepPos = new RoomPosition(groupPos.x + this.getDeltaPos(index, group.direction)[0], groupPos.y + this.getDeltaPos(index, group.direction)[1], groupPos.roomName);
                    if (!creep.pos.isEqualTo(creepPos)) {
                        if (creep.pos.isNearTo(creepPos) || creep.room.name !== creepPos.roomName) {
                            creep.move(creep.pos.getDirectionTo(creepPos));    
                         } else {
                             creep.moveTo(creepPos);
                         }
                        //creep.say('rot');
                    }
                }
            }
            return 1;
        }
        return 0;
    },
    
    changePosition: function(pos, direction) {
        switch (direction) {
            case TOP:
            case TOP_RIGHT:
            case TOP_LEFT:
                if (pos.y > 1) {
                    pos.y--;    
                } else {
                    pos.y = 49;
                    pos.roomName = Game.map.describeExits(pos.roomName)[TOP];
                }
                break;
                
            case BOTTOM:
            case BOTTOM_LEFT:
            case BOTTOM_RIGHT:
                if (pos.y<48) {
                    pos.y++;    
                } else {
                    pos.y = 0;
                    pos.roomName = Game.map.describeExits(pos.roomName)[BOTTOM];
                }
                break;
        }
        switch (direction) {
            case TOP_RIGHT:
            case RIGHT:
            case BOTTOM_RIGHT:
                if (pos.x<48) {
                    pos.x++;    
                } else {
                    pos.x = 0;
                    pos.roomName = Game.map.describeExits(pos.roomName)[RIGHT];
                }
                
                break;
            case LEFT:
            case TOP_LEFT:
            case BOTTOM_LEFT:
                if (pos.x > 1) {
                    pos.x--;    
                } else {
                    pos.x = 49;
                    pos.roomName = Game.map.describeExits(pos.roomName)[LEFT];
                }
                break;
        }
        return pos;
    },
    // move: function(creep, target, range) {
    //     let goal =  { pos: target.pos, range: range };
    //     let ret = PathFinder.search(
    //         creep.pos, goal,
    //         {
    //           // We need to set the defaults costs higher so that we
    //           // can set the road cost lower in `roomCallback`
    //           plainCost: 2,
    //           swampCost: 10,
    //           roomCallback: this.getCostMatrix,
    //         }
    //     );
        
    //     let pos = ret.path[0];
    //     creep.move(creep.pos.getDirectionTo(pos));
    // },
    checkSwampOnPos: function(groupPos) {
        let isSwampDetected = false;
        for (let dx = 0;dx<=1;dx++){
            for (let dy = 0;dy<=1;dy++){
                let pos = new RoomPosition(groupPos.x+dx, groupPos.y+dy, groupPos.roomName);
                let found = pos.lookFor(LOOK_TERRAIN);
                if (found.length && found[0] == 'swamp') {
                    let isRoad = pos.lookFor(LOOK_STRUCTURES).some(s=>s.structureType == STRUCTURE_ROAD);
                    if (!isRoad) {
                        isSwampDetected = true;    
                    }
                }
            }
        }
        return isSwampDetected;
    },
    
    moveGroup: function(group, creeps,  groupPos, target, range, ignoreCreep = true, retreat = false, oneRoom = false, noSwamp = false) {
            let fatigue = false;
            creeps.forEach(
                (creep)=> {
                    if (creep && creep.fatigue) {
                        creep.say('f');
                        fatigue = true;
                    }
                }
            );    
            if (fatigue) {
                return ERR_TIRED;
            }
            let direction = null;
            if (group.move) {
                direction = group.move;
                group.move = undefined;
            } else {
                direction = this.getDirection(groupPos, target, 1, ignoreCreep, retreat, oneRoom);
            }
            group.lastPos = group.pos;
            //console.log('1 groupPos', JSON.stringify(groupPos), direction);
            groupPos = this.changePosition(groupPos, direction);
            
            
            if (noSwamp) { //checkSwamp
                if (this.checkSwampOnPos(groupPos)) {
                    group.pos = group.lastPos;
                    creeps.forEach(creep=> creep && creep.say('swamp'));
                    return; 
                }
            }
            
            //console.log('2 groupPos', JSON.stringify(groupPos));
            group.pos = {x: groupPos.x, y: groupPos.y, roomName: groupPos.roomName};
            //console.log(direction);
            creeps.forEach(
                (creep)=> {
                    if (creep) {
                        creep.move(direction);
                        //console.log(creep.name, direction, JSON.stringify(creep.pos), JSON.stringify(group.pos));
                    }
                }
            );    
    },
    positionInBorder: function(pos){
        if (!pos) return false;
        return (pos.x < 1 || pos.x >=48 || pos.y < 1 || pos.y >= 48);
    },
    runGroup: function(group, groupName) {
        if (!group) return;
        if (!group.groupped) {
            
            let flag = Game.flags[group.waitFlag];
            if (!flag) {
                flag = Game.flags['Flag'+group.homeRoom+'wait'];    
            }
            if (!flag) {
                flag = new RoomPosition(24,24,group.homeRoom);
            } else {
                flag = flag.pos;
            }
            
            let formationFlag = Game.flags[group.formationFlag];
            if (formationFlag) {
                if (!group.ready) {
                    //just wait on flag w/o formation
                    let allReady = true;
                    for (let index =0; index<group.creeps.length; index++) {
                        let creepInfo = group.creeps[index];
                        let creep = Game.creeps[creepInfo.name];
                        if (creep && creep.memory.role != 'quad') {
                            creep.memory.role = 'quad';
                        }
                        
                        if (!creep || creep.spawning) {
                            allReady = false;
                            continue;
                        } else if (creep.memory.ready) {
                            continue;
                        } else if (creep.memory.boosts && creep.memory.boosts.length) {
                            allReady = false;
                            continue;
                        } else {
                            allReady = false;
                            if (!creep.pos.inRangeTo(flag, 3)){
                                helpers.smartMove(creep, flag, 0)    
                            } else {
                                if (!creep.pos.inRangeTo(flag, 1)) {
                                    creep.moveTo(flag, {reusePath: 0, visualizePathStyle: {stroke: '#ffaa00'}})    
                                } else {
                                    creep.memory.ready = 1;
                                }
                            }
                        }
                        
                    }
                    if (allReady) {
                        group.ready = 1;
                    }
                    return;
                } else {
                    flag = formationFlag.pos;
                }
            }
            
            let allGroupped = true;
            for (let index =0; index<group.creeps.length; index++) {
                let creepInfo = group.creeps[index];
                let creep = Game.creeps[creepInfo.name];
                if (creepInfo.name && !creep) {
                    continue;
                }
                if (!creep || creep.spawning) {
                    allGroupped = false;
                    continue;
                } else if (creep.memory.groupped) {
                    continue;
                } else {
                    allGroupped = false;
                    if (!creep.pos.inRangeTo(flag, 5)){
                        if (creep.memory.boosts && creep.memory.boosts.length) {
                            continue;
                        }
                        helpers.smartMove(creep, flag, 0)    
                    } else {
                        let creepPos =  new RoomPosition(flag.x + this.getDeltaPos(index)[0], flag.y + this.getDeltaPos(index)[1], flag.roomName);
                        if (!creep.pos.isEqualTo(creepPos)) {
                            creep.moveTo(creepPos, {reusePath: 0, visualizePathStyle: {stroke: '#ffaa00'}})    
                        } else {
                            creep.memory.groupped = 1;
                        }
                    }
                }
                if (creep && formationFlag) {
                    this.creepAttack(creep, group);
                }
            }
            if (allGroupped) {
                group.groupped = 1;
                group.pos = {x: flag.x, y: flag.y, roomName: flag.roomName};
            }
            return;
        }
        if (group.creeps.length == 4 && group.creeps[0].name && group.creeps[1].name && group.creeps[2].name && group.creeps[3].name && !(Game.time%10)) {
            let creep0 = Game.creeps[group.creeps[0].name];
            let creep1 = Game.creeps[group.creeps[1].name];
            let creep2 = Game.creeps[group.creeps[2].name];
            let creep3 = Game.creeps[group.creeps[3].name];
            
            if (!creep0 && creep2) {
                group.creeps[0].name = creep2.name;
                group.creeps[2].name = 'deleted0';
            }
            if (!creep1 && creep3) {
                group.creeps[1].name = creep3.name;
                group.creeps[3].name = 'deleted1';
            }
            
        }
        
        let creeps = [];
        for (let index =0; index<group.creeps.length; index++) {
            let creepInfo = group.creeps[index];
            let creep = Game.creeps[creepInfo.name];
            if (creep && creep.memory.role != 'quad') {
                //creep.memory.role = 'quad';
            }
            if (creep && !creep.memory.nwa) {
                creep.notifyWhenAttacked(false);
                creep.memory.nwa = 1;
            }
            
            if (creep && creep.memory.role == 'quad') {
                creeps[index] = creep;
                //creep.say('gr');
                //creep.memory.role = undefined;
                
            }
        }
        if (!creeps.length) {
            return;
        }
        this.groupCreeps = creeps;
        
        let target = Game.flags[group.attackFlag];
        if (!target){
            target = Game.flags['flagQuad'+groupName+'Attack'];    
        }
        if (!target) {
            if (creeps[0]) {
                creeps[0].say('noflag');
            }
            return;
        }
        if (!group.pos || !group.pos.roomName) {
            group.groupped = 0;
            return;
        }
        
        let groupPos = new RoomPosition(group.pos.x, group.pos.y, group.pos.roomName);
        let groupRoom = Game.rooms[group.pos.roomName];
        if (!group.direction) {
            group.direction = TOP;
        }
        if (1 && groupRoom) {
            groupRoom.visual.circle(groupPos, {radius: 0.45, opacity: 0.3});
            let textDirection = {
                [TOP]: 'Top',
                [LEFT]: 'Left',
                [RIGHT]: 'Right',
                [BOTTOM]: 'Bottom',
            };
            
            groupRoom.visual.text( textDirection[group.direction] ,groupPos.x - 0.6, groupPos.y -0.6, {size: 0.4, align: 'left', opacity: 0.8, color: '#00DD00'});
            groupRoom.visual.text( groupName ,groupPos.x + 0.6, groupPos.y + 0.6, {size: 0.3, align: 'right', opacity: 0.8, color: '#00DD00'});
        }
        
        
        
        
        let inPosition = true;
        if (0 || !this.positionInBorder(groupPos)) {
            //check creep in pos
            for (let index =0; index<group.creeps.length; index++) {
                let creep = Game.creeps[group.creeps[index].name];
                if (creep) {
                    let creepPos = new RoomPosition(groupPos.x + this.getDeltaPos(index, group.direction)[0], groupPos.y + this.getDeltaPos(index, group.direction)[1], groupPos.roomName);
                    
                    if (!creep.pos.isEqualTo(creepPos)) {
                        //console.log(JSON.stringify(creepPos), JSON.stringify(creep.pos));
                        inPosition = false;
                        creep.memory.groupped = 0;
                    } else {
                        creep.memory.groupped = 1;
                    }
                }
            }
        }
        
        if (0 && this.positionInBorder(groupPos)) {
            console.log('move wo creeps');
            this.moveGroup(group, [], groupPos, target, 1, false);
            group.lastPos = group.pos;
        } 
        let groupMoved = false;
        if (!inPosition) {
            //return; //!!!!!!!!!!!!!!!!!!!!!!!!!!!
            if (!this.positionInBorder(group.lastPos)) {
                group.pos = group.lastPos;    
            }
            for (let index =0; index<group.creeps.length; index++) {
                let creep = Game.creeps[group.creeps[index].name];
                if (creep) {
                    let creepPos = new RoomPosition(groupPos.x + this.getDeltaPos(index, group.direction)[0], groupPos.y + this.getDeltaPos(index, group.direction)[1], groupPos.roomName);
                    if (!creep.pos.isEqualTo(creepPos)) {
                        if (creep.pos.isNearTo(creepPos) || creep.room.name !== creepPos.roomName) {
                            creep.move(creep.pos.getDirectionTo(creepPos));    
                            console.log(creep.name, creep.pos.getDirectionTo(creepPos));
                         } else {
                             creep.moveTo(creepPos);
                         }
                        
                        creep.say('b');
                    }
                }
            }
            groupMoved = true;
            //return; //!!!!!!!!!!!!!!!!!!!!!!!!!!!
            
        } else {
            // if (!groupPos.isNearTo(target)) {
            //     console.log(1, JSON.stringify(group.pos), JSON.stringify(group.lastPos));
            //     this.moveGroup(group, creeps, groupPos, target, 1, false);
            //     console.log(2, JSON.stringify(group.pos), JSON.stringify(group.lastPos));
            // }
        }
        
        
        // try {
        //     if (group.melee && creeps.length == 4) {
        //         creeps[2]
        //     }

        // } catch (e) {}
        
        //try {
            let sourceKeeper = 'Source Keeper';
            let escapePosition = Game.rooms[group.homeRoom].storage;
            let flagEscape = Game.flags[group.escapeFlag];// 'flagQuad'+groupName+'Escape'];
            if (!flagEscape) {
                flagEscape = Game.flags['flagQuadEscape'+groupName];
            }
            if (flagEscape) {
                escapePosition = flagEscape;
            }
            
            //let groupRoom = Game.rooms[groupPos.roomName];
            
            if (!groupRoom || groupPos.roomName != target.pos.roomName) {
                let minHpFactor = 1;
                creeps.forEach(creep => {
                    if (creep.hits/creep.hitsMax < minHpFactor) {
                        minHpFactor = creep.hits/creep.hitsMax;
                    }
                });
                
                if (!groupMoved) {
                    console.log('mv');
                    if (minHpFactor > 0.95 && !group.retreat) {
                        this.moveGroup(group, creeps, groupPos, target, 1, false);
                    } else {
                        this.moveGroup(group, creeps, groupPos, escapePosition, 1, false);
                    }
                }
                if (group.retreat && group.retreat>0) {
                    group.retreat--;
                }
                
                
                for (let creep of creeps) {
                    if (!creep) {
                        continue;
                    }
                    this.creepAttack(creep, group);
                } //for creeps

                
                // creeps.forEach(creep => 
                // {
                //     //this.creepAttack(creep, group); //mb this?
                    
                //     if (creep.hits<creep.hitsMax*0.99){
                //         creep.heal(creep);    
                //     } else {
                //         let targetHeal = null;
                //         let targetHeals = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
                //             filter: function (object) {
                //                 return object.hits < object.hitsMax && object.name != creep.name /*&& (object.getActiveBodyparts(ATTACK) || object.getActiveBodyparts(RANGED_ATTACK) || object.getActiveBodyparts(HEAL) )*/;
                //             }
                //         });
                //         if (targetHeals.length) {
                //             targetHeals.sort(function (a,b){return a.hits-b.hits;});   
                //             targetHeal = targetHeals[0];
                //         }
                //         if (targetHeal) {
                //             creep.heal(targetHeal);
                //         }
                        
                //     }

                    
                    
                //     let targetCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                //         filter: function (object) {
                //             return helpers.ownerNotInWhiteList(object.owner.username)
                //             //&& object.owner.username != sourceKeeper
                //             ;
                //         }
                //     });
                //     if (targetCreep && creep.pos.inRangeTo(targetCreep, 3)) {
                //         creep.rangedAttack(targetCreep);    
                //     }
                // });
            } else {
                let targetCreep = groupPos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                        //&& !(object.room.name == 'E86N54' && object.pos.x == 37 && object.pos.y == 10 )
                        && object.id != '5f60b32f9504c794ecdff015'
                        && object.owner.username != sourceKeeper;
                    }
                });
                let dangerCreeps = groupPos.findInRange(FIND_HOSTILE_CREEPS, 4, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                        && object.owner.username != sourceKeeper
                        && ((_.filter(object.body, {type: RANGED_ATTACK}).length>=25) || (_.filter(object.body, {type: ATTACK}).length>=25))
                        //&& object.getActiveBodyparts(ATTACK)>= 1
                        ;
                    }
                });
                let targetMeleeCreep = groupPos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                        && object.owner.username != sourceKeeper
                        && (
                            (_.filter(object.body, {type: ATTACK}).length>=1 && _.find(object.body, {boost: RESOURCE_CATALYZED_UTRIUM_ACID}))
                            || (_.filter(object.body, {type: ATTACK}).length>=1 && _.find(object.body, {boost: RESOURCE_UTRIUM_ACID}))
                            || (_.filter(object.body, {type: RANGED_ATTACK}).length>=25 && _.find(object.body, {boost: RESOURCE_KEANIUM_ALKALIDE}))
                            || (_.filter(object.body, {type: RANGED_ATTACK}).length>=1 && _.find(object.body, {boost: RESOURCE_CATALYZED_KEANIUM_ALKALIDE}))
                            || _.filter(object.body, {type: RANGED_ATTACK}).length>=30
                            )
                        //&& object.getActiveBodyparts(ATTACK)>= 1
                        ;
                    }
                });
                let targetStructure = groupPos.findClosestByRange (FIND_HOSTILE_STRUCTURES, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                            //&& object.owner.username != 'kamyl'
    
                            && object.structureType != STRUCTURE_ROAD
                            && object.structureType != STRUCTURE_CONTAINER
                            && object.structureType != STRUCTURE_CONTROLLER
                            //&& object.structureType != STRUCTURE_WALL
                            && object.structureType != STRUCTURE_RAMPART //!!!!!!!!!!!!!!!!!!!!!!!!!!
                            && object.structureType != STRUCTURE_KEEPER_LAIR
                            && object.structureType != STRUCTURE_POWER_BANK
                            && !(object.structureType == STRUCTURE_INVADER_CORE && object.effects && object.effects.length && object.effects[0].effect == EFFECT_INVULNERABILITY)
                            //&& !(object.structureType == STRUCTURE_INVADER_CORE && object.level == 0)
                            //&& !(object.owner.username == 'Invader' && object.structureType == STRUCTURE_TOWER)
                            && object.id != '5fb0e65065ae13eee9838673'
                            && object.id != '5fb0e670b5ab08c41c6d4ccd'
                            && object.id != '5fb2df35ac315cb4b508d7be'
                            && object.id != '5fb2df35ac315c08ba08d7b7'
                             && object.id != '5fb0e6433754744f38365b0a'
                            // && object.id != '5f7995902d56f323db221ee0'
                            // && object.id != '5f7995902d56f33e0a221ec6'
                            
                            
                            // && object.id != '5f4394f472bf36e12d0d641c'
                            // && object.id != '5f4394fae6564f06fb6045ac'
                            // && object.id != '5f1a8bcf3c694f33a5d52702'
                            
                            ;
                    }
                });
                
                let targetWallStructure = groupPos.findClosestByRange (FIND_STRUCTURES, {
                    filter:  (object)  => object.structureType == STRUCTURE_WALL
                });
        
                if (0 && groupRoom && (!groupRoom.controller || !groupRoom.controller.my) && targetWallStructure) {
                    let rangeToStruct = targetStructure?groupPos.getRangeTo(targetStructure):55;
                    let rangeToWall = groupPos.getRangeTo(targetWallStructure);
                    if (rangeToWall < rangeToStruct) {
                        targetStructure = targetWallStructure;
                    }
                }

                
                
                
                if (1 && groupRoom &&  groupRoom.name == 'E37N8' /*&& groupName == 'E56N26_2'*/) {
                    console.log(groupRoom.name,'^^^^^^^^^^^^^^^^^^^');
                    let struct = targetStructure;
                    targetStructure = Game.getObjectById('6108c7e26ebaa4f5be89d2b3'); //5c378a55c94b6e284b63cf5e
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('6108c7e26ebaa4f5be89d2b3');    
                    }
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('6108c7e6e0b499d75c6df2b2');    
                    }
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('61056da9addd5ea4c8b3db45');    
                    }
                    // if (!targetStructure) {
                    //     targetStructure = Game.getObjectById('5c4b64264b081f12feb88bcc');    
                    // }
                    // if (!targetStructure) {
                    //     targetStructure = Game.getObjectById('5c6f232a1c49f966fad8bba3');    
                    // }
                    if (!targetStructure) {
                        targetStructure = struct;
                    } else {
                        targetCreep = null;
                    }
                }
                
                 if (1 && groupRoom &&  groupRoom.name == 'E45N7_' /*&& groupName == 'E56N26_2'*/) {

                    let struct = targetStructure;
                    targetStructure = Game.getObjectById('6184f4bb59e9516c469281d5');
                    //Memory.quadGroups.E45N7_1.safeDistance = 3;
                    // if (!targetStructure) {
                    //     targetStructure = Game.getObjectById('');    
                    // }
                    // if (!targetStructure) {
                    //     targetStructure = Game.getObjectById('605ed419a52eb242e120885a');    
                    // }
                    // if (!targetStructure) {
                    //     targetStructure = Game.getObjectById('605ed43a03e89ce6bbbce725');    
                    // }
                    // if (!targetStructure) {
                    //     targetStructure = Game.getObjectById('5f930c26280d0ae86d5e30cc');    
                    // }
                    // if (!targetStructure) {
                    //     targetStructure = Game.getObjectById('5f92fa353f34fb7f4718de0a');    
                    // }
                    if (!targetStructure) {
                        targetStructure = struct;
                    } else {
                        targetCreep = null;
                    }
                }
                
                 if (1 && groupRoom &&  groupRoom.name == 'E57N36' && groupName.startsWith('E56N36') ) {

                    let struct = targetStructure;
                    targetStructure = Game.getObjectById('5e564bf0f53d62d0eebbdf61');
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('5e478635ece26aea1876d2da');    
                    }
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('5e47868e0f3d7319c9c75c2e');    
                    }
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('5e4fe4a7807bf77cf0dcb229');    
                    }
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('5e47868e0f3d7319c9c75c2e');    
                    }
                    if (!targetStructure) {
                        targetStructure = struct;
                    } else {
                        targetCreep = null;
                    }
                }
                 if (1 && groupRoom &&  groupRoom.name == 'E57N36' && groupName.startsWith('E56N34') ) {

                    let struct = targetStructure;
                    targetStructure = Game.getObjectById('5e690e1a5508b1804464a3f8'); 
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('5e47c35f78ce7e9362bf2c0c');    
                    }
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('5e4787bc27574e533f8d22dc');    
                    }
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('5e47bbd199e40e7d1140d355');    
                    }
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('5e4fe4a7807bf77cf0dcb229');    
                    }
                    if (!targetStructure) {
                        targetStructure = struct;
                    } else {
                        targetCreep = null;
                    }
                }
                 if (1 && groupRoom &&  groupRoom.name == 'E57N34' && groupName.startsWith('E56N34') ) {

                    let struct = targetStructure;
                    targetStructure = Game.getObjectById('5cd7164f7e29fb5db4e2b22a');
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('5cd715800e1a27298d2f92a2');    
                    }
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('5cf2b01e8c14995da1e39491');    
                    }
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('5cf2a52f7167e53bbf91e94a');    
                    }
                    if (!targetStructure) {
                        targetStructure = struct;
                    } else {
                        targetCreep = null;
                    }
                }

                if (0 && groupRoom &&  groupRoom.name == 'E44N42' && groupName == 'groupSN5') {

                    let struct = targetStructure;
                    targetStructure = Game.getObjectById('5fb0e6943754744b16365b28');
                    if (!targetStructure) {
                        targetStructure = Game.getObjectById('5fb0d93482d9bead0c630579');    
                    }
                    // if (!targetStructure) {
                    //     targetStructure = Game.getObjectById('5fb0da93ac315ce95a08175c');    
                    // }
                    // if (!targetStructure) {
                    //     targetStructure = Game.getObjectById('5fb127f1bcca45cdd5d2f86f');    
                    // }
                    if (!targetStructure) {
                        targetStructure = struct;
                    } else {
                        targetCreep = null;
                    }
                }
                
                if (creeps && groupRoom && groupRoom.controller && groupRoom.controller.level && !groupRoom.controller.my) {
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    let creep = creeps.find(el => el);
                    if (creep) {
                        let struct = targetStructure;
                        //targetStructure = require('role.massRanger').getEnemyStruct(creep);
                        targetStructure = this.getEnemyStruct(creep);
                        if (!targetStructure) {
                            targetStructure = struct;
                        } else {
                            creep.say('aT_inv');
                            targetCreep = null;
                        }
                    }
                }
                let core;
                if (creeps && groupRoom && groupRoom.find(FIND_STRUCTURES).filter(s=>s.structureType == STRUCTURE_INVADER_CORE && s.level > 2).length) {
                    //core = groupRoom.find(FIND_STRUCTURES).filter(s=>s.structureType == STRUCTURE_INVADER_CORE && s.level > 2)[0];
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    let creep = creeps.find(el => el);
                    if (creep) {
                        let struct = targetStructure;
                        //targetStructure = require('role.massRanger').getEnemyStruct(creep);
                        targetStructure = this.getEnemyStruct(creep);
                        if (!targetStructure) {
                            targetStructure = struct;
                        } else {
                            creep.say('aT_cor');
                            targetCreep = null;
                        }
                    }
                }
                
                
                //console.log(targetStructure.id);
                

                let groupTarget = null;
                
                if (targetCreep && targetStructure) {
                    if (this.getRange(groupPos,targetCreep) < this.getRange(groupPos,targetStructure)) {
                        groupTarget = targetCreep;
                    } else {
                        groupTarget = targetStructure;
                    }
                } else if (targetCreep) {
                    groupTarget = targetCreep;
                } else if (targetStructure) {
                    groupTarget = targetStructure;
                }
                
                
                
                if (groupTarget) {
                    console.log(groupTarget.id);
                    
                    let manualTarget = null;//Game.getObjectById('6161e4145fbca14484ce1bf7');
                    if (0 && core) {
                        manualTarget = Game.getObjectById(core);
                    }
                    groupTarget = manualTarget?manualTarget:groupTarget;
                    group.mainTargetId = groupTarget.id;
                    let rangeToTarget = this.getRange(groupPos, groupTarget);
                    let rangeToTargetCreep = 4;
                    if (targetCreep) {
                        rangeToTargetCreep = this.getRange(groupPos, targetCreep);
                    }
                    let rangeToTargetMeleeCreep = 4;
                    if (targetMeleeCreep) {
                        rangeToTargetMeleeCreep = this.getRange(groupPos, targetMeleeCreep);
                        console.log('meleecreep', targetMeleeCreep.id, rangeToTargetMeleeCreep);
                    }
                    rangeToTargetCreep = rangeToTargetMeleeCreep;
                    //rangeToTargetCreep = 4;
                    
                    let minHpFactor = 1;
                    creeps.forEach(creep => {
                        if (creep.hits/creep.hitsMax < minHpFactor) {
                            minHpFactor = creep.hits/creep.hitsMax;
                        }
                    });
                    let rangeToFlagAttack = this.getRange(groupPos, target);
                    console.log('rangeToFlagAttack',rangeToFlagAttack);
                    
                    //minHpFactor = 0.1;
                    if (!groupMoved) {
                        if (minHpFactor >= 0.95 && group.moveToManualPosition && group.manualPosition) { //move to new manual position
                            let flag = Game.flags[group.manualPosition];
                            if (!flag) {
                                group.moveToManualPosition = undefined;
                                //group.manualPosition = undefined;
                            } else {
                                let rangeToNewPosition = this.getRange(groupPos, flag);
                                if (rangeToNewPosition > 1){
                                    this.moveGroup(group, creeps, groupPos, flag, 1, false, true); //retreat true
                                    flag.room.visual.circle(flag.pos.x, flag.pos.y, {radius: .45, fill: "transparent", stroke: 'orange', strokeWidth: .15, opacity: 0.3});
                                } else {
                                    group.moveToManualPosition = undefined;    
                                }
                            }
                        } else if (minHpFactor >= 0.85 && group.needChangePosition && group.needChangePosition > 2 && group.manualPositions && group.manualPositions.length>1 && !group.moveToManualPosition) { //find new manual position
                            group.needChangePosition = 0;
                            let clonePos = Object.assign([], group.manualPositions);
                            let indexPos = group.manualPositions.indexOf(group.manualPosition);
                            if (indexPos >= 0) {
                                clonePos.splice(indexPos,1);    
                            }
                            group.manualPosition = _.sample(clonePos);
                            group.moveToManualPosition = 1;
                        } else if (group.rangeToFlagAttack && rangeToFlagAttack > group.rangeToFlagAttack) { //!!!!!!!!!!!!!!!!!!!!!! RANGE TO FLAG
                            this.moveGroup(group, creeps, groupPos, target, 1, false);
                        } else if (rangeToFlagAttack > 60) { //!!!!!!!!!!!!!!!!!!!!!! RANGE TO FLAG
                            this.moveGroup(group, creeps, groupPos, target, 1, false);
                        } else if (minHpFactor >= 0.95) {
                            let moveCloseRange = group.moveCloseRange!==undefined?group.moveCloseRange:2; //1 2 3 если один то масс атака
                            let safeDistance = group.safeDistance!==undefined?group.safeDistance:4; // если 4 то будет пляска.. если 3 то нет.
                            
                            
                            //creeps[0].say(moveCloseRange+' '+safeDistance);
                            // if (
                            //     (group.lastRangeToTargetCreep || dangerCreeps.length >= 3) 
                            //     && (group.lastRangeToTargetCreep == rangeToTargetCreep || dangerCreeps.length >= 3) 
                            //     && (rangeToTargetCreep == safeDistance || dangerCreeps.length >= 3) 
                            //     && (safeDistance == 3 || safeDistance == 4 || safeDistance == 2)) {
                            //     safeDistance--;
                            //     creeps[3]?creeps[3].say(rangeToTarget+' '+rangeToTargetCreep+' '+rangeToTargetMeleeCreep+' '+dangerCreeps.length):null;
                            //     if (!group.needChangePosition) {
                            //         group.needChangePosition = 1;
                            //     } else {
                            //         group.needChangePosition++; //!!!!!!!!!!!!!!!!!! 
                            //     }
                            // }
                            
                            if (1 && dangerCreeps.length >= 3) {
                                moveCloseRange = Math.max(2, moveCloseRange);
                                safeDistance = Math.max(3, safeDistance);
                            }

                            if (group.lastRangeToTargetCreep && group.lastRangeToTargetCreep == rangeToTargetCreep && !group.stepForward && safeDistance >= 2) {
                                safeDistance--;
                                group.stepForward = 1;
                            } else {
                                group.stepForward = 0;
                            }
                            
                            creeps[3]?creeps[3].say(rangeToTarget+' '+rangeToTargetCreep+' '+rangeToTargetMeleeCreep+' '+dangerCreeps.length):null;
                            
                            const strongholdsRuin = groupRoom.find(FIND_RUINS, {filter: function(ruin) {return ruin.structure && ruin.structure.structureType == STRUCTURE_INVADER_CORE && Game.time - ruin.destroyTime < 5000;}});
                            if (strongholdsRuin.length) {
                                moveCloseRange = 0;
                                safeDistance = 0;
                            }
                            
                            
                            if (group.move) {
                                creeps[3]?creeps[3].say('move'+group.move):null;
                                this.moveGroup(group, creeps, groupPos, groupPos, 1, false, false, true);
                                group.lastRangeToTargetCreep = undefined;
                            } else if (rangeToTarget>moveCloseRange && rangeToTargetCreep>safeDistance) { //идем смело
                                if (!this.setDirectionToTarget(group, groupPos, groupTarget)) { //мы далеко - можно развернуться к цели
                                    let noSwamp = rangeToTargetCreep<=4 && safeDistance > 1;
                                    this.moveGroup(group, creeps, groupPos, groupTarget, 1, false, false, true, noSwamp);
                                    group.moveSlowly = (safeDistance>1)?1:0; 
                                    creeps[1]?creeps[1].say('f1'):null;
                                }
                                group.lastRangeToTargetCreep = undefined;
                            } else if (rangeToTarget>moveCloseRange && rangeToTargetCreep>safeDistance && !group.moveSlowly) { //2 3  //если в прошлый раз шли смело.. то один ход не будем приближаться. Может приблизятся к нам.
                                if (!(Game.time%1) && !this.setDirectionToTarget(group, groupPos, groupTarget)) { 
                                    let noSwamp = rangeToTargetCreep<=4 && safeDistance > 1;
                                    this.moveGroup(group, creeps, groupPos, groupTarget, 1, false, false, true, noSwamp);
                                    creeps[1]?creeps[1].say('f2'):null;
                                }
                                group.lastRangeToTargetCreep = undefined;
                                
                            } else if (rangeToTarget < moveCloseRange && rangeToTargetCreep<4) {
                                this.moveGroup(group, creeps, groupPos, escapePosition, 1, false, true); //retreat true
                                creeps[1]?creeps[1].say('b3 '+rangeToTarget+moveCloseRange):null;
                                group.retreat = 4;
                                group.lastRangeToTargetCreep = undefined;
                            } else if (rangeToTargetCreep < safeDistance) { 
                                this.moveGroup(group, creeps, groupPos, escapePosition, 1, false, true); //retreat true
                                creeps[1]?creeps[1].say('b4'):null;
                                group.retreat = 4;
                                group.lastRangeToTargetCreep = undefined;
                            } else {
                                this.setDirectionToTarget(group, groupPos, groupTarget);    
                                creeps[1]?creeps[1].say('r5'):null;
                                group.moveSlowly = undefined; 
                                group.lastRangeToTargetCreep = rangeToTargetCreep;
                            }
                            
                        } else {
                            if (escapePosition){
                                this.moveGroup(group, creeps, groupPos, escapePosition, 1, false, true); //retreat true
                                //creep.moveTo(escapePosition, {reusePath: 0, range: 1});        
                            }
                        }                    
                    }
                    
                    
                    for (let creep of creeps) {
                        if (!creep) {
                            continue;
                        }
                        this.creepAttack(creep, group, groupTarget, core);
                    } //for creeps
                    
                   
                } else { //if target group
                    if (!groupMoved && !groupPos.isNearTo(target)) {
                        if ((Game.time%5) || !this.setDirectionToTarget(group, groupPos, target)){
                            this.moveGroup(group, creeps, groupPos, target, 1, false, false, true);
                        }
                    }
                    
                    for (let creep of creeps) {
                        if (!creep) {
                            continue;
                        }
                        this.creepAttack(creep, group);
                    } //
                    
                
                }
                
            }
        // } catch (e){
        //     console.log('Error',e, e.lineNumber);
        // }
    },
    sourceKeeper: 'Source Keeper_',
    creepAttack: function(creep, group, groupTarget = undefined, coreTarget = undefined) {
        let sourceKeeper = this.sourceKeeper;
        
        let targetCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function (object) {
                return helpers.ownerNotInWhiteList(object.owner.username)
                && !object.spawning
                //&& !(object.room.name == 'E86N54' && object.pos.x == 37 && object.pos.y == 10 )
                && object.owner.username != sourceKeeper;
            }
        });
        let targetMeleeCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function (object) {
                return helpers.ownerNotInWhiteList(object.owner.username)
                && object.owner.username != sourceKeeper
                && !object.spawning
                && _.filter(object.body, {type: ATTACK}).length>=1
                //&& object.getActiveBodyparts(ATTACK)>= 1
                ;
            }
        });
        let targetStructure = creep.pos.findClosestByRange (FIND_HOSTILE_STRUCTURES, {
            filter: function (object) {
                return helpers.ownerNotInWhiteList(object.owner.username)
                    && object.structureType != STRUCTURE_ROAD
                    && object.structureType != STRUCTURE_CONTAINER
                    && object.structureType != STRUCTURE_CONTROLLER
                    //&& object.structureType != STRUCTURE_WALL
                    //&& object.structureType != STRUCTURE_RAMPART //!!!!!!!!!!!!!!!!!!!!!!!!!!
                    && object.structureType != STRUCTURE_KEEPER_LAIR
                    && object.structureType != STRUCTURE_POWER_BANK
                    && !(object.structureType == STRUCTURE_INVADER_CORE && object.effects && object.effects.length && object.effects[0].effect == EFFECT_INVULNERABILITY)
                    //&& !(object.structureType == STRUCTURE_INVADER_CORE && object.level == 0)
                    //&& !(object.owner.username == 'Invader' && object.structureType == STRUCTURE_TOWER)
                    && object.id != '611c64fa97bf466d545b4c3e'
                    && object.id != '613873860f4e260be82dcd8c'
                    && object.id != '6138eadfe05c6cb6df80aa53'
                    && object.id != '6139df8f5225d701e7bbfe2f'
                    // && object.id != '5e811d4f44099ab4cad5fbe7'
                    
                    ;
            }
        });
        
        
        let targetWallStructure = creep.pos.findClosestByRange (FIND_STRUCTURES, {
            filter:  (object)  => object.structureType == STRUCTURE_WALL
        });
        //targetWallStructure = null;

        if ((!creep.room.controller || !creep.room.controller.my) && targetWallStructure) {
            
            let rangeToStruct = targetStructure?creep.pos.getRangeTo(targetStructure):55;
            let rangeToWall = creep.pos.getRangeTo(targetWallStructure);
            if (rangeToWall < rangeToStruct) {
                targetStructure = targetWallStructure;
            }
        }
        
        
        
        let enemyWoRamp = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {
            filter: function (object) {
                let onRamp = false;
                object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                    if (lookObject.structureType == STRUCTURE_RAMPART) {
                        onRamp = true;
                    }
                });
                return helpers.ownerNotInWhiteList(object.owner.username) && !onRamp;
            }
        });
        
        let rampInRange = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 3, {
            filter:  (object)  => object.structureType == STRUCTURE_RAMPART
        });
        
        
        let targetHeal = null;
        let targetHeals = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
            filter: function (object) {
                return object.hits < object.hitsMax && object.name != creep.name /*&& (object.getActiveBodyparts(ATTACK) || object.getActiveBodyparts(RANGED_ATTACK) || object.getActiveBodyparts(HEAL) )*/;
            }
        });
        if (targetHeals.length) {
            targetHeals.sort(function (a,b){return a.hits-b.hits;});   
            targetHeal = targetHeals[0];
            //targetHeal = creep.pos.findClosestByRange(targetHeals);
        } 
        // else { //!! no range heal
        //     targetHeals = creep.pos.findInRange(FIND_MY_CREEPS, 3, {
        //         filter: function (object) {
        //             return object.hits < object.hitsMax && object.name != creep.name /*&& (object.getActiveBodyparts(ATTACK) || object.getActiveBodyparts(RANGED_ATTACK) || object.getActiveBodyparts(HEAL) )*/;
        //         }
        //     });
        //     if (targetHeals.length) {
        //         targetHeal = creep.pos.findClosestByRange(targetHeals);
        //     }
        // }
        if (targetHeal) {
            creep.memory.targetHealId = targetHeal.id;
        } else if (creep.memory.targetHealId) {
            targetHeal = Game.getObjectById(creep.memory.targetHealId);
            if (!targetHeal || !creep.pos.isNearTo(targetHeal)) {
                targetHeal = null;
            }
        } 
        
        
        let target = null;
        
        if (targetCreep && targetStructure) {
            if (creep.pos.getRangeTo(targetCreep) < creep.pos.getRangeTo(targetStructure)) {
                target = targetCreep;
            } else {
                target = targetStructure;
            }
        } else if (targetCreep) {
            target = targetCreep;
        } else if (targetStructure) {
            target = targetStructure;
        }
        
        if (target || targetHeal) {
            let rangeToTarget = creep.pos.getRangeTo(target);
            let rangeToTargetCreep = 4;
            if (targetCreep) {
                rangeToTargetCreep = creep.pos.getRangeTo(targetCreep);
            }
            let rangeToTargetMeleeCreep = 4;
            if (targetMeleeCreep) {
                rangeToTargetMeleeCreep = creep.pos.getRangeTo(targetMeleeCreep);
            }
            rangeToTargetCreep = rangeToTargetMeleeCreep;
            //rangeToTargetCreep = 4;
            
            let rangedAtacked = false;
            let meleeAtacked = false;
            let manualTarget = groupTarget;//Game.getObjectById('610ff12ff825ca34cda1284c');//  group.mainTargetId?Game.getObjectById(group.mainTargetId):null;
            if (coreTarget && creep.pos.inRangeTo(coreTarget,3)) {
                manualTarget = coreTarget;
            }
            

            let enemyDamage = 0;
            enemyWoRamp.forEach(function(obj) {
                const rng = creep.pos.getRangeTo(obj);
                if (rng == 1) enemyDamage += 10;
                if (rng == 2) enemyDamage += 4;
                if (rng == 3) enemyDamage += 1;
            })
            let rampDamage = 0;
            rampInRange.forEach(function(obj) {
                const rng = creep.pos.getRangeTo(obj);
                if (rng == 1) rampDamage += 10;
                if (rng == 2) rampDamage += 4;
                if (rng == 3) rampDamage += 1;
            })
            
            
        

            if (creep.pos.isNearTo(target)){
                let res = creep.attack(target);
                if (res == OK) {
                    meleeAtacked = true;
                    creep.say('a');
                } else if (creep.getActiveBodyparts(WORK)) {
                    creep.dismantle(target);
                    meleeAtacked = true;
                    creep.say('d');
                }
            }
            
            
            if (enemyWoRamp.length > 1 && enemyDamage > 10) {
                creep.rangedMassAttack();
                rangedAtacked = true;
            } else if (enemyWoRamp.length) {
                creep.rangedAttack(enemyWoRamp[0]);    
                rangedAtacked = true;
            } else if (manualTarget && creep.pos.inRangeTo(manualTarget,3)){
                if (1 && creep.pos.inRangeTo(manualTarget,2) && !(manualTarget.structureType && [STRUCTURE_WALL].includes(manualTarget.structureType))){
                    creep.rangedMassAttack();    
                } else {
                    creep.rangedAttack(manualTarget);        
                }
                rangedAtacked = true;
            } else {
                //creep.say(rangeToTarget);
                if (rangeToTarget <= 3 && creep.getActiveBodyparts(RANGED_ATTACK) == 1) {
                    creep.rangedMassAttack();
                    rangedAtacked = true;
                } else if (rangeToTarget <= 1 && !(target.structureType && target.structureType == STRUCTURE_WALL)) { //check to wall
                    creep.rangedMassAttack();
                    rangedAtacked = true;
                } else if (rangeToTarget <= 3) {
                    if (rampInRange.length && rampDamage > 10) {
                        creep.rangedMassAttack();
                        rangedAtacked = true;
                        //creep.say(rampDamage);
                    } else {
                        creep.rangedAttack(target);    
                        rangedAtacked = true;
                    }
                }
            }
            
            if (creep.hits >= creep.hitsMax*0.98) {
                if (targetHeal) {
                    if (creep.pos.getRangeTo(targetHeal) > 1) {
                        if (!rangedAtacked) {
                            creep.rangedHeal(targetHeal);    
                        } else if (!meleeAtacked){
                            
                            creep.heal(creep);        
                        }
                    } else if (!meleeAtacked) {
                        //creep.say('th');
                        creep.heal(targetHeal);
                    }
                } else if (!meleeAtacked) {
                    creep.heal(creep);
                }
            } else if (!meleeAtacked) {
                creep.heal(creep);
            }
        } else {//if target creep
            let healed = false;
            if (creep.hits < creep.hitsMax*0.99 && creep.getActiveBodyparts(HEAL)) {
                creep.heal(creep);
                //creep.say('h');
                healed = true;
            }
        }        
    },
    
    targetEnemyQuadStruct : {},
    //require('role.quad').getEnemyStruct(Game.creeps.qE57N23_444147035);
    getEnemyStruct: function(creep) {
        let pos = creep.pos;
        let room = creep.room;
        
        if (!this.targetEnemyQuadStruct[creep.room.name]) {
            this.targetEnemyQuadStruct[creep.room.name] = {};
        }
    
        if (1 && this.targetEnemyQuadStruct[creep.room.name][creep.memory.group]) {
            let targetEnemyQuadStruct = this.targetEnemyQuadStruct[creep.room.name][creep.memory.group];
            if (Game.time < targetEnemyQuadStruct.time + 10 && !targetEnemyQuadStruct.id) {
                return;
            }
            let targetObj = Game.getObjectById(targetEnemyQuadStruct.id);
            if (Game.time < targetEnemyQuadStruct.time + 10 && targetObj) {
                return targetObj;
            } else {
                delete this.targetEnemyQuadStruct[creep.room.name][creep.memory.group]
            }
        }
        
        let goalStructures = _.filter(room.find(FIND_STRUCTURES), struct => [STRUCTURE_SPAWN, STRUCTURE_INVADER_CORE].includes(struct.structureType));
        if (!goalStructures.length) {
            goalStructures = _.filter(room.find(FIND_STRUCTURES), struct => [STRUCTURE_TOWER].includes(struct.structureType));
        }
        if (!goalStructures.length) {
            goalStructures = _.filter(room.find(FIND_STRUCTURES), struct => [STRUCTURE_TERMINAL, STRUCTURE_STORAGE].includes(struct.structureType));
        }
        if (!goalStructures.length) {
            goalStructures = _.filter(room.find(FIND_STRUCTURES), struct => [STRUCTURE_EXTENSION, STRUCTURE_LINK, STRUCTURE_FACTORY, STRUCTURE_LAB].includes(struct.structureType));
        }

        let goals;
        if (goalStructures.length) {
            goals = _.map(goalStructures, struct => { return {pos: struct.pos?struct.pos:struct, range: 0 };});
        } else if (!goalStructures.length && room.controller) {
            goalStructures = [room.controller];
            goals = _.map(goalStructures, struct => { return {pos: struct.pos?struct.pos:struct, range: 1 };});
        } else {
            return;
        }
        
        //console.log('goals', JSON.stringify(goals));
        
        let ret = PathFinder.search(pos, goals, {
            plainCost: 2,
            swampCost: 50,
            maxRooms: 1,
            
            roomCallback: function(roomName) {
                let room = Game.rooms[roomName];
                if (!room) return;
                let costs = new PathFinder.CostMatrix;
                
                let allStructures = room.find(FIND_STRUCTURES);
                let allWallRampStructures = _.filter(allStructures, struct => [STRUCTURE_RAMPART, STRUCTURE_WALL].includes(struct.structureType));
                let allRoads = _.filter(allStructures, struct => [STRUCTURE_ROAD, ].includes(struct.structureType));
                
                allRoads.forEach(road=>costs.set(road.pos.x, road.pos.y, 1));
                
                if (allWallRampStructures.length) {
                    let maxHP = _.max(allWallRampStructures, 'hits').hits;
                    //console.log(maxHP);
                    maxHP = Math.max(1, maxHP);
                    const terrain = new Room.Terrain(roomName);                  

                    allWallRampStructures.forEach(struct => {
                        let val = Math.floor(struct.hits / maxHP * 0xfe);
                        val = Math.max(1, Math.min(val, 0xfe));
                        costs.set(struct.pos.x, struct.pos.y, val);
                        room.visual.text(val, struct.pos.x, struct.pos.y, {font: 0.3});
                        // let place;
                        // place = terrain.get(struct.pos.x-1, struct.pos.y-1);
                        // if (place !== TERRAIN_MASK_WALL){
                        //     costs.set(struct.pos.x-1, struct.pos.y-1, val);
                        //     room.visual.text(val, struct.pos.x-1, struct.pos.y-1, {font: 0.3});
                        // }
                        // place = terrain.get(struct.pos.x-1, struct.pos.y);
                        // if (place !== TERRAIN_MASK_WALL){
                        //     costs.set(struct.pos.x-1, struct.pos.y, val);
                        //     room.visual.text(val, struct.pos.x-1, struct.pos.y, {font: 0.3});
                        // }
                        // place = terrain.get(struct.pos.x, struct.pos.y-1);
                        // if (place !== TERRAIN_MASK_WALL){
                        //     costs.set(struct.pos.x, struct.pos.y-1, val);
                        //     room.visual.text(val, struct.pos.x, struct.pos.y-1, {font: 0.3});
                        // }
                        
                    });    
                    for (let x = 1; x<50; x++) {
                        for (let y = 1; y<50; y++) {    
                            let place = terrain.get(x,y);
                            if (place == TERRAIN_MASK_WALL) {
                                roleQuad.setQuadCost(costs, x, y, 255);
                                // costs.set(x, y, 255);
                                // costs.set(x-1, y-1, 255);
                                // costs.set(x-1, y, 255);
                                // costs.set(x, y-1, 255);
                            }
                        }
                    }
                    try {
                        room.find(FIND_MY_CREEPS, {filter: c=>c.memory.group != creep.memory.group}).forEach(c=> {
                            if (c.memory.role == 'quad') {
                                roleQuad.setQuadCost(costs, c.pos.x, c.pos.y, 255, 0);    
                            } else {
                                roleQuad.setQuadCost(costs, c.pos.x, c.pos.y, 255, 0);    
                            }
                            
                            
                            // costs.set(c.pos.x, c.pos.y, 255);
                            // costs.set(c.pos.x-1, c.pos.y-1, 255);
                            // costs.set(c.pos.x-1, c.pos.y+1, 255);
                            // costs.set(c.pos.x+1, c.pos.y-1, 255);
                            // costs.set(c.pos.x+1, c.pos.y+1, 255);
                            
                            // costs.set(c.pos.x, c.pos.y+2, 255);
                            // costs.set(c.pos.x, c.pos.y-2, 255);
                            // costs.set(c.pos.x, c.pos.y+3, 255);
                            // costs.set(c.pos.x, c.pos.y-3, 255);
                            // costs.set(c.pos.x+2, c.pos.y, 255);
                            // costs.set(c.pos.x-2, c.pos.y, 255);
                        });
                    } catch (e) {
                        console.log('quad error try catch');
                    }
                    
                    
                    // roomStructures.forEach(function(struct) {
                    //     if (struct.structureType !== STRUCTURE_ROAD && struct.structureType !== STRUCTURE_CONTAINER && (struct.structureType !== STRUCTURE_RAMPART || !struct.my)) { 
                    //         costs.set(struct.pos.x, struct.pos.y, 255);
                    //         costs.set(struct.pos.x-1, struct.pos.y-1, 255);
                    //         costs.set(struct.pos.x-1, struct.pos.y, 255);
                    //         costs.set(struct.pos.x, struct.pos.y-1, 255);
                    //     }
                    // });
                    
                    //Memory.quadTargetVisual = Game.time + 300;
                    if (0 || (Memory.quadTargetVisual && Game.time < Memory.quadTargetVisual)) {
                        for (let x = 0; x<50; x++) {
                            for (let y = 0; y<50; y++) {    
                                let place = costs.get(x,y);
                                if (place == 255) {
                                    room.visual.circle(x, y, {radius: 0.15})
                                } else if (place >= 50) {
                                    room.visual.circle(x, y, {radius: 0.08})
                                } else if (place >= 25) {
                                    room.visual.circle(x, y, {radius: 0.04})
                                }
                            }
                        }
                    }

                    
                    
                }
                return costs;
            },
        });
        if (!ret.incomplete && ret.path.length) {
            console.log('ddddddddd',ret.path.length, JSON.stringify(ret));
            ret.path.forEach(pos => room.visual.circle(pos));
            let target = null;
            ret.path.some(pos => {
                let result = false
                result = pos.lookFor(LOOK_STRUCTURES).some(struct => {
                    if (![STRUCTURE_CONTAINER, STRUCTURE_ROAD].includes(struct.structureType)) {
                        console.log('fffffff',struct);
                        target = struct;
                        return true;
                    }
                });
                if (!result) {
                    let newpos = new RoomPosition(pos.x - 1, pos.y - 1, pos.roomName);
                    result = newpos.lookFor(LOOK_STRUCTURES).some(struct => {
                        if (![STRUCTURE_CONTAINER, STRUCTURE_ROAD].includes(struct.structureType)) {
                            console.log('fffffff1',struct);
                            target = struct;
                            return true;
                        }
                    });
                }
                if (!result) {
                    let newpos = new RoomPosition(pos.x - 1, pos.y, pos.roomName);
                    result = newpos.lookFor(LOOK_STRUCTURES).some(struct => {
                        if (![STRUCTURE_CONTAINER, STRUCTURE_ROAD].includes(struct.structureType)) {
                            console.log('fffffff2',struct);
                            target = struct;
                            return true;
                        }
                    });
                }
                if (!result) {
                    let newpos = new RoomPosition(pos.x, pos.y - 1, pos.roomName);
                    result = newpos.lookFor(LOOK_STRUCTURES).some(struct => {
                        if (![STRUCTURE_CONTAINER, STRUCTURE_ROAD].includes(struct.structureType)) {
                            console.log('fffffff3',struct);
                            target = struct;
                            return true;
                        }
                    });
                }
                return result;
            });
            console.log(room.name, target);
            if (target) {
                this.targetEnemyQuadStruct[creep.room.name][creep.memory.group] = {
                  id: target.id,
                  time: Game.time,
                }
                return target;
            } else {
                if (goalStructures.length) {
                    let target = creep.pos.findClosestByRange(goalStructures);
                    if (room.controller && target && target.id == room.controller.id) {
                        this.targetEnemyQuadStruct[creep.room.name][creep.memory.group] = {
                          id: 0,
                          time: Game.time,
                        }
                        return;
                    } else {
                        this.targetEnemyQuadStruct[creep.room.name][creep.memory.group] = {
                          id: target.id,
                          time: Game.time,
                        }
                        return target;
                    }
                }
            }
        }
    },
};

module.exports = roleQuad;