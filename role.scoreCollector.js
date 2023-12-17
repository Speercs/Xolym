var helpers = require('helpers');
var Traveler = require('Traveler');


var roleScoreCollector = {
    getBody: function(room) {
        if (!room) return [];
        let cap = room.energyCapacityAvailable;
        if (cap >= 2000 && room.controller && room.controller.level >= 7) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];
        if (cap >= 1200) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]
        if (cap >= 800) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];
        //if (cap >= 550) return [MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY,CARRY];
        if (cap >= 500) return [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,];
        if (cap >= 300) return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
        ///return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*25,CARRY*25
    },
    
    spawn: function (room, myRoom, freeSpawn) {
        //return freeSpawn; 
        
        if (!Memory.scores || !Memory.scoreToRoom || room.controller.level < 6 || !room.storage) {
            return freeSpawn;
        }
        
        if (!(Game.time%10)) {
            //check need to spawn scorecollector in this room
            room.memory.scoreCollector = undefined;
            for (let scoreId in Memory.scores) {
                if (Memory.scoreToRoom[scoreId] == room.name && Memory.scores[scoreId].time> Game.time+500 && Memory.scores[scoreId].room != room.name && !Memory.scores[scoreId].disable && Memory.scores[scoreId].pathLength <= 450) {
                    room.memory.scoreCollector = 1;
                    if (room.controller.level == 8) {
                        if (!room.memory.scoreCollector || room.memory.scoreCollector < 4) {
                            room.memory.scoreCollector = 4;     
                        }
                        if (Memory.scores[scoreId].amount > 6000) {
                            room.memory.scoreCollector = 6;
                        }
                    }
                    if (room.controller.level == 7) {
                        room.memory.scoreCollector = 2;    
                    }
                    break;
                } else if (room.controller.level == 8 && Memory.scores[scoreId] && Memory.scores[scoreId].amount > 4000 && Memory.scores[scoreId].roomPaths && Memory.scores[scoreId].roomPaths[room.name] < 450 && Memory.scores[scoreId].time> Game.time+500 && Memory.scores[scoreId].room != room.name && !Memory.scores[scoreId].disable) {
                    if (!room.memory.scoreCollector || room.memory.scoreCollector < 3) {
                        room.memory.scoreCollector = 3;
                    }
                }
            }
        }
        if (Memory.war) {
           //room.memory.scoreCollector = undefined;    
        }
        
        if (room.memory.defendRoomMode) {
            room.memory.scoreCollector = undefined;    
        }
        
 

        //check all sector score collector
        if (room.memory.scoreCollector){
            let creepLive = _.filter(require('spawn').getGameCreeps(), (creep) => creep.memory.role == 'scoreCollector' && creep.memory.room == room.name && (creep.ticksToLive > 400 || creep.spawning));
            collectorCount = room.memory.scoreCollector;
            if (room.energyAvailable< room.energyCapacityAvailable*0.8) {
                collectorCount = 0;
            }
            let boosts = [];
            if (freeSpawn && creepLive.length < collectorCount) {
                const result = freeSpawn.spawnCreep(this.getBody(room), 'scoreC_'+room.name+'_'+Game.time, {memory: {role: 'scoreCollector', boosts: boosts, room: room.name, }});
                if (result == OK){
                    freeSpawn = null;   
                }
            }
        }
        return freeSpawn;
    },
    
    roomsToScanScore: [
                'E18N17','E19N17','E20N17','E27N17','E28N17','E29N17',
                'E13N18','E14N18',/*'E15N18',*/'E16N18','E17N18','E18N18','E19N18','E20N18', 'E27N18','E28N18','E29N18',
                'E11N19','E12N19','E13N19','E14N19','E15N19','E16N19','E17N19','E18N19','E19N19','E20N19','E23N19','E24N19','E27N19','E28N19','E29N19',
                'E12N20','E13N20','E14N20','E15N20','E16N20','E17N20','E18N20','E19N20','E20N20','E21N20','E22N20','E23N20','E24N20','E25N20','E26N20','E27N20','E28N20','E29N20','E30N20',
                'E13N21','E14N21','E15N21','E16N21','E17N21','E18N21','E19N21','E19N21','E20N21','E21N21','E22N21','E23N21','E24N21','E25N21','E26N21','E27N21','E28N21','E29N21','E30N21',
                'E14N22','E15N22','E16N22','E17N22','E18N22','E19N22','E20N22','E21N22','E22N22','E23N22','E24N22','E25N22','E26N22','E27N22','E28N22','E29N22','E30N22',
                'E14N23','E15N23','E16N23','E17N23','E18N23','E19N23','E20N23','E21N23','E22N23','E23N23','E24N23','E25N23','E26N23','E27N23','E28N23','E29N23','E30N23',
                'E14N24','E15N24','E16N24','E17N24','E18N24','E19N24','E20N24','E21N24','E22N24','E23N24','E24N24','E25N24','E26N24','E27N24','E28N24','E29N24','E30N24',
                'E13N25','E14N25','E15N25','E16N25','E17N25','E19N25','E20N25','E21N25','E22N25','E23N25','E24N25','E25N25','E26N25','E27N25','E28N25','E29N25','E30N25',
                'E14N26','E15N26','E16N26','E18N26','E19N26','E20N26','E21N26','E22N26','E23N26','E24N26','E25N26','E26N26','E27N26','E28N26','E29N26','E30N26',
                'E14N27','E15N27','E18N27','E19N27','E20N27','E21N27','E22N27','E23N27','E24N27','E25N27','E26N27','E27N27','E28N27','E29N27','E30N27',
            /*'E19N28','E20N28','E21N28',*/'E22N28','E23N28','E24N28','E25N28','E26N28','E27N28','E28N28','E29N28','E30N28',
            /*'E19N29','E20N29','E21N29','E22N29','E23N29',*/'E24N29','E25N29','E26N29','E27N29','E28N29','E29N29','E30N29',
            /*'E19N30','E20N30','E21N30','E22N30','E23N30',*/'E24N30','E25N30','E26N30','E27N30','E28N30','E29N30','E30N30',
            
                 
            ],
    
    tickReset: function(){
        if (!Memory.scores || !Memory.scoreToRoom) {
            return;
        }
        
        if (!(Game.time%10)) {
            for (let scoreId in Memory.scores) {
                if (Memory.scores[scoreId].time < Game.time || !Memory.scores[scoreId].pathLength) {
                    Memory.scores[scoreId] = undefined;
                    Memory.scoreToRoom[scoreId] = undefined;
                }
            }
        }
        
        if (1) {
            for (let scoreId in Memory.scores) {
                let scoreInfo = Memory.scores[scoreId];
                if (scoreInfo) {
                    let pos = unpackPos(scoreInfo.pos)
                    if (pos) {
                        Game.map.visual.text("💥"+scoreInfo.amount + (scoreInfo.disable?'(d)':'')+' ('+(scoreInfo.time-Game.time)+')', pos, {align: 'left',color: '#FFFFFF', fontSize: 6});      
                        Game.map.visual.text(scoreInfo.pathLength, pos, {align: 'right',color: '#e6db74', fontSize: 5});     
                    }
                    
                    let homePos = new RoomPosition(25,25,scoreInfo.homeRoom);
                    if (pos && homePos) {
                        Game.map.visual.line(pos, homePos, {color: '#ff0000', lineStyle: 'dashed'});    
                    }
                }
                
            }
            
        }
        if (1 && Game.shard.name == 'shardSeason') {
            let collector = Game.getObjectById('5fb54d9a0ae8e3000780d8ce');
            if (collector) {
                Game.map.visual.text(collector.store.getFreeCapacity(RESOURCE_SCORE), collector.pos, {align: 'left',color: '#FFFFFF', fontSize: 10});     
            }
        }
        if (1 && Game.shard.name == 'shardSeason') {
            let collector = Game.getObjectById('5fb54d9a0ae8e3000780d322');
            if (collector) {
                Game.map.visual.text(collector.store.getFreeCapacity(RESOURCE_SCORE), collector.pos, {align: 'left',color: '#FFFFFF', fontSize: 10});     
            }
        }
        if (1 && Game.shard.name == 'shardSeason') {
            let collector = Game.getObjectById('5fb54d9a0ae8e3000780d947');
            if (collector) {
                Game.map.visual.text(collector.store.getFreeCapacity(RESOURCE_SCORE), collector.pos, {align: 'left',color: '#FFFFFF', fontSize: 10});     
            }
        }
        if (1 && Game.shard.name == 'shardSeason') {
            let collector = Game.getObjectById('5fb54d9a0ae8e3000780d39b');
            if (collector) {
                Game.map.visual.text(collector.store.getFreeCapacity(RESOURCE_SCORE), collector.pos, {align: 'left',color: '#FFFFFF', fontSize: 10});     
            }
        }
        if (1 && Game.shard.name == 'shardSeason') {
            let pos = new RoomPosition(5, 5, 'E26N22');
            Game.map.visual.text(_.get(Memory, 'stock.score'), pos, {color: '#FFFFFF', fontSize: 8});     
        }
        if (1 && Game.shard.name == 'shardSeason') {
            let pos = new RoomPosition(25, 25, 'E25N31');
            Game.map.visual.text(Game.cpu.bucket, pos, {color: '#FFFFFF', fontSize: 12});     
        } 

        
        if (1) {
            for (let roomName of Object.keys(Memory.rooms)) {
                if (Memory.rooms[roomName] && Memory.rooms[roomName].avoid) {
                    let pos = new RoomPosition(25, 25, roomName);
                    Game.map.visual.text('avoid', pos, {color: '#FFFFFF', fontSize: 12});             
                }
                
                if (Memory.rooms[roomName] && Memory.rooms[roomName].enemyVisuals) {
                    Memory.rooms[roomName].enemyVisuals.forEach((visual) => {
                        Game.map.visual.text(visual.text, unpackPos(visual.pos), visual.options || {});                 
                    });
                }
                if (Memory.rooms[roomName] && Memory.rooms[roomName].scoreVisuals) {
                    Memory.rooms[roomName].scoreVisuals.forEach((visual) => {
                        Game.map.visual.text(visual.text, unpackPos(visual.pos), visual.options || {});                 
                    });
                }
                
                if (1 && this.roomsToScanScore.includes(roomName)) {
                    let pos = new RoomPosition(5,5,roomName);
                    Game.map.visual.text('s', pos, {color: '#FFFF00', fontSize: 5});             
                }

            }
        }
        
        if (1) {
            const roomsToScan = this.roomsToScanScore;
            
            const spawnRoomToScan = [
                'E22N19', 'E26N19', 'E17N16', 'E28N15','E13N23',
            ];
            
            const observer = Game.getObjectById('5fdc9fbb73d1bfff5daca0e2');
            // if (Memory.scoreScanIndex == undefined || Memory.scoreScanIndex > roomsToScan.length-1) {
            //     Memory.scoreScanIndex = 0;
            // }
            if (Memory.scoreScanRoom ) {
                let room = Game.rooms[Memory.scoreScanRoom];
                if (room) {
                    console.log('scaning room', helpers.getRoomLink(room.name));
                    Game.map.visual.circle(new RoomPosition(25,25,room.name));
                    if (roomsToScan.includes(room.name)) {
                        this.roomCheckScore(room);    
                    }
                    if (spawnRoomToScan.includes(room.name)) {
                        this.roomCheckEnemySpawn(room);
                    }
                    
                }
            }
            
            if (observer) {
                if (!(Game.time%6) && (!Memory.stopEnemySpawnCheck || Game.time >= Memory.stopEnemySpawnCheck)) {
                    //check enemy spawn
                    if (Memory.spawnScanIndex == undefined || Memory.spawnScanIndex > spawnRoomToScan.length-1) {
                        Memory.spawnScanIndex = 0;
                    }
                    let roomName = spawnRoomToScan[Memory.spawnScanIndex ++];
                    let res = observer.observeRoom(roomName);
                    if (res == OK) {
                        Memory.scoreScanRoom = roomName;
                    } else {
                        Memory.scoreScanRoom = undefined;
                    }
                } else {
                    let maxIteration = 10;
                    
                    do {
                        if (Memory.scoreScanIndex == undefined || Memory.scoreScanIndex > roomsToScan.length-1) {
                            Memory.scoreScanIndex = 0;
                        }
                        let roomName = roomsToScan[Memory.scoreScanIndex++];
                        let room = Game.rooms[roomName];
                        
                        if (room) {
                            //already vision
                            Game.map.visual.circle(new RoomPosition(25,25,room.name),{fill: '0000ff', stroke: '#0000ff'});
                            this.roomCheckScore(room);
                            Memory.scoreScanRoom = undefined;
                        } else {
                            let res = observer.observeRoom(roomName);
                            maxIteration = 0;
                            if (res == OK) {
                                Memory.scoreScanRoom = roomName;
                            } else {
                                Memory.scoreScanRoom = undefined;
                            }
                        }
                    } while (maxIteration-- > 0);
                }
            }
        }
        
        if (0) {
            let res = this.findStorageForTarget(Game.getObjectById('5fd50d6766707d16cf295688'));
            console.log(JSON.stringify(_.min(res,'length')));
        }

        
    },
    roomCheckEnemySpawn: function(room) {
        if (Memory.stopEnemySpawnCheck && Game.time < Memory.stopEnemySpawnCheck) {
            return;
        }
        Memory.stopEnemySpawnCheck = undefined;
        
        console.log('check spawn', helpers.getRoomLink(room.name));    
        this.roomCheckEnemy(room);
        let spawns = room.find(FIND_HOSTILE_SPAWNS);
        let enemyVisuals = [];
        if (spawns.length) {
            spawns.forEach((spawn) => { 
               if (spawn && spawn.spawning && !Memory.stopEnemySpawnCheck && (spawn.spawning.name.includes('squadmember') || spawn.spawning.name.includes('at__tacker') || spawn.spawning.name.includes('exter____nalcarrier32423423resdfsdf')  )) {
                   Game.notify('Alert!!! Spawn enemy detected '+spawn.spawning.name+' in room '+room.name, 0);
                   console.log('Alert!!! Spawn enemy detected '+spawn.spawning.name+' in room '+room.name);
                   enemyVisuals.push({text:'📢', pos:packPos(spawn.pos), options:  { fontSize:14}  });
                   Memory.stopEnemySpawnCheck = Game.time + 100;
               } 
            });
        }
        room.memory.enemyVisuals = enemyVisuals.length?enemyVisuals:undefined;
        //squadmember-E26N19-514589
        //attacker-E26N19-518409
        
    },
    
    creepCheckScore: function(creep){
        return this.roomCheckScore(creep.room, creep.memory.room);
    },
    
    findStorageForTarget: function(target) {
        const myRooms = ['E26N22', 'E23N22', 'E22N23', 'E16N19', 'E23N25','E28N28','E17N23','E28N26','E18N25'];
        if (!target || !target.pos) {
            return undefined;
        }
        let myRoomsSorted = myRooms;
        myRoomsSorted.sort(function (a,b){return Game.map.getRoomLinearDistance(target.pos.roomName, a) - Game.map.getRoomLinearDistance(target.pos.roomName, b);});
        
        let allPaths = [];
        for (roomName of myRoomsSorted) {
            let room = Game.rooms[roomName];
            if (!room || !room.storage) continue;
            let ret = Traveler.Traveler.findTravelPath(target, room.storage, {ignoreRoads: true});
            if (ret.incomplete) {
                continue;
            }
            let path = Traveler.Traveler.serializePath(target.pos, ret.path);
            allPaths.push({roomName: roomName, /*path: path,*/ length: path.length});
        }
        return allPaths;
    },
    
    roomCheckEnemy: function(room) {
        let enemyVisuals = [];
        let enemys = room.find(FIND_HOSTILE_CREEPS);
        if (enemys.length) {
            enemys.forEach((creep) => {
                if (creep.owner.username == 'Source Keeper' ) {
                
                } else if (creep.owner.username == 'Invader' ) {
                    Game.map.visual.text("🚩️",creep.pos, { fontSize:6});
                    enemyVisuals.push({text:'🚩', pos:packPos(creep.pos), options:  { fontSize:6}  });
                } else if (creep.getActiveBodyparts(ATTACK)>1 || creep.getActiveBodyparts(RANGED_ATTACK)>1 || creep.getActiveBodyparts(HEAL)>1 ) {
                    if (creep.getActiveBodyparts(ATTACK)>10 || creep.getActiveBodyparts(RANGED_ATTACK)>10 || creep.getActiveBodyparts(HEAL)>10 ) {
                        Game.map.visual.text("🔱️",creep.pos, { fontSize:16});      
                        enemyVisuals.push({text:'🔱', pos:packPos(creep.pos), options:  { fontSize:16}  });
                        if (!Memory.disableCreepNotify || Game.time > Memory.disableCreepNotify) {
                            if (creep.owner.username == 'SystemParadox' && creep.getActiveBodyparts(RANGED_ATTACK) == 16) {
                            } else if (creep.owner.username == 'Genovese' && creep.getActiveBodyparts(ATTACK) == 15 && creep.getActiveBodyparts(HEAL) == 5 ) {
                            //} else if () {
                            //} else if () {
                            //} else if () {
                            //} else if () {
                                
                            } else {
                                //Game.notify('Strong enemy detected in room '+creep.room.name+' user '+creep.owner.username, 0);
                                console.log('Strong enemy detected in room '+creep.room.name+' user '+creep.owner.username);
                                Memory.disableCreepNotify = Game.time + 100;
                            }
                            
                            
                        }
                    } else {
                        Game.map.visual.text("☠️️",creep.pos, { fontSize:12});      
                        enemyVisuals.push({text:'☠️', pos:packPos(creep.pos), options:  { fontSize:12}  });
                    }
                    
                }
                
                
            });
        }
        
        room.memory.enemyVisuals = enemyVisuals.length?enemyVisuals:undefined;
    },
    roomCheckScoreOther: function(room) {
        if (this.roomsToScanScore.includes(room.name)) {
            room.memory.scoreVisuals = undefined;
            return this.roomCheckScore(room);
        }
        
        let scoreVisuals = [];
        let scoreContainers = room.find(FIND_SCORE_CONTAINERS);
        if (scoreContainers.length) {
            scoreContainers.forEach((score) => {
                if (Memory.scores[score.id]) {
                
                } else {
                    //Game.map.visual.text("☀︎"+score.store[RESOURCE_SCORE], score.pos, { fontSize:6});
                    scoreVisuals.push({text:'☀︎'+score.store[RESOURCE_SCORE], pos:packPos(score.pos), options:  { fontSize:6}  });
                }
                
                
            });
        }
        room.memory.scoreVisuals = scoreVisuals.length?scoreVisuals:undefined;
    },
    
    isSkRoom: function(roomName) {
        let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
        let fMod = parsed[1] % 10;
        let sMod = parsed[2] % 10;
        let isSK = !(fMod === 5 && sMod === 5) &&
            ((fMod >= 4) && (fMod <= 6)) &&
            ((sMod >= 4) && (sMod <= 6));
        return isSK;
    },
    
    roomCheckStrongHolds: function(room) {
        if (!this.isSkRoom(room.name)) {
            return 0;
        }
        const invaderCores = room.find(FIND_HOSTILE_STRUCTURES, {filter: {structureType: STRUCTURE_INVADER_CORE}});
        if (invaderCores.length) {
            const target = invaderCores[0];
            if (target.level > 0) {
                if (target.effects.length && target.effects[0].effect == EFFECT_COLLAPSE_TIMER && target.effects[0].ticksRemaining > 1) {
                    room.memory.avoid = 1;
                    return 1;
                }
                
                if (target.effects.length && target.effects[0].effect == EFFECT_INVULNERABILITY && target.effects[0].ticksRemaining < 1000) {
                    room.memory.avoid = 1;
                    return 1;
                }
            }
        }
        if (room.memory.avoid) {
            room.memory.avoid = undefined;    
        }
        return 0;
    },
    
    roomCheckScore: function(room, homeRoomName = undefined){
        
        this.roomCheckEnemy(room);
        if (this.roomCheckStrongHolds(room)) {
            return;
        }
    
        //console.log('find FIND_SCORE_CONTAINERS');
        let scoreContainers = room.find(FIND_SCORE_CONTAINERS);
        let roomDisabled = (room.controller && room.controller.level && !room.controller.my)?1:undefined;
        if (scoreContainers.length) {
            console.log('found', scoreContainers.length, 'score in room', helpers.getRoomLink(room.name));
            if (!Memory.scores) {
                Memory.scores = {};
            }
            if (!Memory.scoreToRoom) {
                Memory.scoreToRoom = {};
            }
            
            let savedContainersIds = _.filter(Object.keys(Memory.scores), (scoreId) => Memory.scores[scoreId] && Memory.scores[scoreId].room == room.name);    
            console.log(room.name, savedContainersIds);
            
            for (let scoreContainer of scoreContainers) {
                if (!Memory.scores[scoreContainer.id]) {

                    let allPaths = this.findStorageForTarget(scoreContainer);
                    let AllPathInfo = {};
                    allPaths.forEach((pathInfo) => {AllPathInfo[pathInfo.roomName] = pathInfo.length});
                    let minPathInfo = _.min(allPaths, 'length');
                    if (!minPathInfo || !minPathInfo.roomName) {
                        console.log('Error to find homeRoom for container',scoreContainer.id,' in room', helpers.getRoomLink(room.name));
                        continue;    
                    }
                    
                    try {
                        Memory.scores[scoreContainer.id] = {id:scoreContainer.id, pos:packPos(scoreContainer.pos), room: scoreContainer.pos.roomName, homeRoom: minPathInfo.roomName,  
                        amount: scoreContainer.store.getUsedCapacity(), ticks: scoreContainer.ticksToDecay, time: Game.time+scoreContainer.ticksToDecay, pathLength: minPathInfo.length, disable: roomDisabled,
                        roomPaths: AllPathInfo,
                        };
                        Memory.scoreToRoom[scoreContainer.id] = minPathInfo.roomName;
                    } catch (e) {
                        console.log('score Error'+JSON.stringify(e));
                    }
                    
                } else {
                    //update
                    Memory.scores[scoreContainer.id].amount = scoreContainer.store.getUsedCapacity();
                    savedContainersIds.splice(savedContainersIds.indexOf(scoreContainer.id), 1)
                }    
            }
            
            if (savedContainersIds.length) {
                savedContainersIds.forEach((scoreId) => {
                    Memory.scores[scoreId].disable = 1;
                    // Memory.scores[scoreId] = undefined;
                    // Memory.scoreToRoom[scoreId] = undefined;
                });
            }
        } else {
            //console.log('check score in room', helpers.getRoomLink(room.name));
        }
        
    },

    
    /** @param {Creep} creep **/
    run: function(creep) {
        if (!Memory.scores || !Memory.scoreToRoom) {
            return;
        }
        // if (creep.memory.targetId == '60105e0e6d08c73ba8053712') {
        //     creep.memory.targetId = undefined;
        // }
        
        //console.log('score collector', helpers.getRoomLink(creep.room.name));
        if (!creep.spawning) {
            Game.map.visual.text("🐿️",creep.pos, {align: 'left',color: '#0000FF', fontSize:6});     
            if (creep.store.getUsedCapacity()) {
                Game.map.visual.text("🌰",creep.pos, {align: 'right', color: '#0000FF', fontSize:4});         
            }
            
        } 
        creep.memory.warningMove = 1;

        
        if (creep.memory.targetId == undefined && !creep.store.getUsedCapacity()) {
            if (creep.ticksToLive < 500) {
                creep.memory.role = undefined;
                return;
            }
            let tasks = _.filter(Object.values(Memory.scores), (task) => task && Memory.scoreToRoom[task.id] == creep.memory.room && task.time>Game.time+300 && !task.disable && task.pathLength <=250 && task.amount > 100);    
            let task = _.min(tasks, 'pathLength');
            if (!tasks.length) {
                tasks = _.filter(Object.values(Memory.scores), (task) => task && Memory.scoreToRoom[task.id] == creep.memory.room && task.time>Game.time+300 && !task.disable && task.pathLength <=250 && task.amount > 0);    
                task = _.min(tasks, 'pathLength');
            }
            if (!tasks.length) {
                tasks = _.filter(Object.values(Memory.scores), (task) => task && Memory.scores[task.id].roomPaths && Memory.scores[task.id].roomPaths[creep.memory.room] <= 250  && task.time>Game.time+500 && !task.disable && task.amount > 500);    
                task = _.min(tasks, 'roomPaths.'+creep.memory.room);
            }
            if (!tasks.length && creep.ticksToLive > 900) {
                tasks = _.filter(Object.values(Memory.scores), (task) => task && Memory.scores[task.id].roomPaths && Memory.scores[task.id].roomPaths[creep.memory.room] <= 500  && task.time>Game.time+500 && !task.disable && task.amount > 500);    
                task = _.min(tasks, 'roomPaths.'+creep.memory.room);
            }
            if (!tasks.length) {
                creep.say('notarget');
                if (creep.ticksToLive< 800) {
                    helpers.recycleCreep(creep);
                    return;
                } else {
                    if (creep.room.storage && creep.room.storage.my && creep.pos.inRangeTo(creep.room.storage, 6)) {
                        let allyCreepsNear = creep.pos.findInRange(FIND_MY_CREEPS, 1);
                        if (allyCreepsNear.length>1){
                            creep.say('🤝');
                            let moveArr = [TOP, LEFT, RIGHT, BOTTOM, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT];
                            moveArr = _.shuffle(moveArr);
                            creep.move(moveArr[0]);
                        }
                    } else {
                        helpers.transferEnergyToStorage(creep);    
                    }
                    
                    
                }
            }
            //tasks = _.sortBy(tasks, (task) => Game.map.getRoomLinearDistance(task.homeRoom, task.room));
            
            
            creep.memory.targetId = task.id;
            creep.memory.targetPos = task.pos;
        }
        
        if (creep.memory.targetId && creep.memory.targetPos && creep.store.getCapacity() > 50) {
            let target = Game.getObjectById(creep.memory.targetId);
            
            
            let targetPos = unpackPos(creep.memory.targetPos);
            if ((Game.rooms[targetPos.roomName] || creep.room.name == targetPos.roomName)  && !target) {
                creep.say('clear');
                Memory.scores[creep.memory.targetId] = undefined;
                Memory.scoreToRoom[creep.memory.targetId] = undefined;
                creep.memory.targetId = undefined;
                creep.memory.targetPos = undefined;
                
            } else if (!creep.pos.isNearTo(targetPos)) {
                helpers.smartMove(creep, targetPos);
            } else if (creep.store.getFreeCapacity() && target) {
                for (let res in target.store){
                    let ret = creep.withdraw(target, res);
                    if (ret == ERR_NOT_OWNER) {
                        Memory.scores[creep.memory.targetId].disable = 1;
                    }
                    break;
                };
            } else if (target && Memory.scores[target.id]) {
                Memory.scores[target.id].amount = target.store.getUsedCapacity();
                creep.memory.targetId = undefined;
                creep.memory.targetPos = undefined;
            } else {
                creep.memory.targetId = undefined;
                creep.memory.targetPos = undefined;
            }
        } else {
            helpers.transferEnergyToStorage(creep);
        }
        
	},

};

module.exports = roleScoreCollector;