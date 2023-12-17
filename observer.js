var helpers = require('helpers');
var Traveler = require('Traveler');

//Memory.observerManager.startTime = Game.time;

module.exports = {
    playersNotify: ['liaohuo'],
    // hello somygame! How are you?
    playersBlackList: ['lolaner','Shibdib','Mitsuyoshi','Hi_Melnikov','liaohuo','Jason_2070','tinnvec','Allorrian','DefaultO','Phi','FigTree','blue123','Aerics','explicit','Morningtea_','whisky_jb','Ankleton','ykrop142','somygame','songyiayng'],
    
    getRoomNameFromDeltaCoord: function(dx, dy, roomName) {
        if (dx == undefined || dy == undefined || !roomName) {
            return;
        }
        const worldSize = Game.map.getWorldSize()/2-2;
        if(roomName == 'sim') return;
        let [name,h,wx,v,wy] = roomName.match(/^([WE])([0-9]+)([NS])([0-9]+)$/);
		if(h == 'W') wx = ~wx;
		if(v == 'N') wy = ~wy;		
		let roomPosX = Number(wx);
		let roomPosY = Number(wy);
		
		roomPosX += dx;
		roomPosY += dy;
		
		let [x,y] = [roomPosX, roomPosY]
		let result = "";
		result += (x < 0 ? "W" + String(~x) : "E" + String(x));
		result += (y < 0 ? "N" + String(~y) : "S" + String(y));
		return result;
        
    },
    closestPathCache: {},
    findClosestRoomByPath: function(targetRoomName, toX = 24, toY = 24, range = 25, withPathLength = false) { // withPathLength return {roomName: roomName, length:path.length}
        //return null; 
        if (this.closestPathCache[targetRoomName] !== undefined && !withPathLength) {
            return this.closestPathCache[targetRoomName];
        } 
        console.log('findClosestRoomByPath', targetRoomName, toX, toY, range);
        
        let myRoomsSorted = _.filter(Game.rooms, room => room.controller && room.controller.my && room.controller.level == 8).map(room => room.name);
        //let myRoomsSorted = _.sort(roomList, myRoomName => Game.map.getRoomLinearDistance(targetRoomName, myRoomName));
        myRoomsSorted.sort(function (a,b){return Game.map.getRoomLinearDistance(targetRoomName, a) - Game.map.getRoomLinearDistance(targetRoomName, b);});
        console.log(myRoomsSorted);

        let allPaths = [];
        let targetPos = new RoomPosition(toX,toY,targetRoomName);
        let maxRooms = 10;
        for (roomName of myRoomsSorted) {
            let room = Game.rooms[roomName];
            if (!room || !room.storage) continue;
            //console.log(room.name);
            
            if (maxRooms-- < 0) {
                break;
            }
            
            let ret = Traveler.Traveler.findTravelPath(room.storage, targetPos, {ignoreRoads: true, range: range});
            if (ret.incomplete) {
                console.log(room.name, 'incomplete', range);
                continue;
            }
            let path = Traveler.Traveler.serializePath(targetPos, ret.path);
            allPaths.push({roomName: roomName, /*path: path,*/ length: path.length});
            console.log(roomName, path.length);
            
            
        }
        if (allPaths.length) {
            if (withPathLength) {
                return _.min(allPaths, 'length');
            } 
            this.closestPathCache[targetRoomName] = _.min(allPaths, 'length').roomName;    
        } else {
            this.closestPathCache[targetRoomName] = null;
        }
        // let debugtxt = 'debugtxt ';
        // for (roomName of myRoomsSorted) {
        //     debugtxt += roomName+'('+ Game.map.getRoomLinearDistance(roomName, targetRoomName)+'),';
        // }
        // Game.notify('findClosestRoomByPath ' + targetRoomName + ' -> ' + this.closestPathCache[targetRoomName] + ' allPaths '+ JSON.stringify(allPaths)+"<br>\n"+debugtxt);
        return this.closestPathCache[targetRoomName];
    },
    
    signCreepRun: function() {
        //Memory.signers = {};
        //Memory.signers['E51N29'] = {pos:{x:42,y:37,roomName:'E51N29'}};
        if (!Memory.signers) {
            return;
        }    
        for (let roomName in Memory.signers) {
            let signerInfo = Memory.signers[roomName];
            let creep = Game.creeps['signer'+roomName];
            if ((signerInfo.time && Game.time > signerInfo.time+2000) || (creep && creep.memory.incomplete)) {
                delete Memory.signers[roomName];
                if (creep) {
                    creep.suicide();
                }
                if (!Memory.signerBlackList) {
                    Memory.signerBlackList = [];
                }
                if (!Memory.signerBlackList.includes(roomName)) {
                    Memory.signerBlackList.push(roomName);
                }
                continue;
            }
            if (!creep) {
                
                let spawnRoomName = this.findClosestRoomByPath(roomName);
                if (!spawnRoomName) {
                    let roomList = _.filter(Game.rooms, room => room.controller && room.controller.my && room.controller.level == 8 && room.name !=='E83N58').map(room => room.name);
                    spawnRoomName = _.min(roomList, myRoomName => Game.map.getRoomLinearDistance(roomName, myRoomName));
                }
                
                const spawns = Game.rooms[spawnRoomName].find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning;}
                });
                if (spawns.length && Game.rooms[spawnRoomName].memory.spawnBusyTick != Game.time){
                    let body = [MOVE];
                    spawns[0].spawnCreep(body, 'signer'+roomName, {memory: {room: spawnRoomName, role: 'signer', target: roomName, boosts:[]}});    
                }
            } else if (!creep.spawning) {
                if (helpers.sleep(creep)) return;  
                console.log('signer',helpers.getRoomLink(creep.room.name), creep.pos);
                Game.map.visual.text("signer️",creep.pos, { fontSize:10});
                let pos = new RoomPosition(signerInfo.pos.x, signerInfo.pos.y, roomName);
                if (!creep.pos.isNearTo(pos)){
                    helpers.smartMove(creep, pos);
                    // if (!creep.memory.timeToPos) {
                    //     creep.memory.timeToPos = 1;
                    // } else {
                    //     creep.memory.timeToPos++;
                    // }
                } else {
                    if (creep.signController(creep.room.controller, 'Restricted Area!') == OK) {
                        creep.suicide();
                        delete Memory.signers[roomName];
                    }
                }
            }
        }
    },
    
    invasionRoom: function(room) { //deprecated
        if (!room) return;
        let nearRoomName = this.findClosestRoomByPath(room.name);
        if (!nearRoomName) {
            let roomList = _.filter(Game.rooms, room => room.controller && room.controller.my && room.controller.level == 8 && room.name !=='E83N58').map(room => room.name);
            nearRoomName = _.min(roomList, myRoomName => Game.map.getRoomLinearDistance(room.name, myRoomName));
        }
        if (!Memory.massRangers[room.name] && nearRoomName && Game.cpu.bucket>5000 && !room.controller.safeMode) {
            if (Game.cpu.bucket<5000) {
                Game.notify('No bucket to attack '+room.name+' from '+nearRoomName);
            } else {
                if (room.controller.level < 2) {
                    Memory.massRangers[room.name] = {room:nearRoomName, count: 1, time:Game.time + 2000, boosted: 0, body: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,], boosts: []};        
                    Game.notify('Send tiny MassRanger to '+room.name);
                } else if (room.controller.level < 5) {
                    this.invasionBoostedOneTower(nearRoomName, room.name);
                }
            }
        }
    },
    invasionBoostedOneTower: function(homeRoom, roomName) {
        if (Memory.massRangers[roomName]) {
            console.log('invasionBoostedOneTower Already created');
            return;
        }
        let boosts = [/*RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,*/ RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
        let baseRoom = Game.rooms[homeRoom];
        if (baseRoom && baseRoom.memory && !baseRoom.memory.boostLab && !baseRoom.memory.boostLabManual && !helpers.checkLabsBoosts(homeRoom, boosts)) {
            baseRoom.memory.boostLab = {boosts:boosts, time:Game.time +500+300};    
        }

        let boosted = 1;
        let count = 1;
        let body = [TOUGH,TOUGH,
        RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        HEAL,HEAL,HEAL,HEAL,
        MOVE,]; //b('2t18r23m4h1m')
        boosts = [RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
        
        Memory.massRangers[roomName] = {room:homeRoom, count: count, startTime: Game.time + 100, time:Game.time + 400, invasion: 1, boosted: boosted, body: body, boosts: boosts};
        Game.notify('Send boosted [OneTower] MassRanger to '+roomName+' from '+homeRoom);
        console.log('invasionBoostedOneTower Created!');
    },
    
    invasionBoostedTwoTower: function(homeRoom, roomName) { 
        if (Memory.massRangers[roomName]) {
            console.log('invasionBoostedTwoTower Already created'); 
            return;
        }
        let boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
        let baseRoom = Game.rooms[homeRoom];
        if (baseRoom && baseRoom.memory && !baseRoom.memory.boostLab && !baseRoom.memory.boostLabManual && !helpers.checkLabsBoosts(homeRoom, boosts)) {
            baseRoom.memory.boostLab = {boosts:boosts, time:Game.time +500+300};    
        }

        let boosted = 1;
        let count = 2;
        // let body = [TOUGH,TOUGH,TOUGH,TOUGH,
        // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        // RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
        // HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]; //TOUGH*4,MOVE*24,RANGED_ATTACK*12,HEAL*8
        let body = [TOUGH,TOUGH,TOUGH,TOUGH,
        RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,]; //TOUGH*4,MOVE*10,RANGED_ATTACK*27,HEAL*9
        boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
        
        Memory.massRangers[roomName] = {room:homeRoom, count: count, startTime: Game.time + 100, time:Game.time + 400, invasion: 1, boosted: boosted, body: body, boosts: boosts};
        Game.notify('Send boosted [TwoTower] MassRanger to '+roomName+' from '+homeRoom);
        console.log('invasionBoostedTwoTower Created!');
    },
    
    invasionBoostedThreeTower: function(homeRoom, roomName) {
        if (Memory.massRangers[roomName]) {
            console.log('invasionBoostedThreeTower Already created');
            return;
        }
        let boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
        let baseRoom = Game.rooms[homeRoom];
        if (baseRoom && baseRoom.memory && !baseRoom.memory.boostLab && !baseRoom.memory.boostLabManual && !helpers.checkLabsBoosts(homeRoom, boosts)) {
            baseRoom.memory.boostLab = {boosts:boosts, time:Game.time +500+300};    
        }

        let boosted = 1;
        let count = 2;
        let body = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, 
        RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
        MOVE,]; //TOUGH*6,MOVE*10,RANGED_ATTACK*22,HEAL*12
        boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
        
        Memory.massRangers[roomName] = {room:homeRoom, count: count, startTime: Game.time + 100, time:Game.time + 400, invasion: 1, boosted: boosted, body: body, boosts: boosts};
        Game.notify('Send boosted [ThreeTower] MassRanger to '+roomName+' from '+homeRoom);
        console.log('invasionBoostedThreeTower Created!');
    },
    
    isPortalRoom: function(roomName) {
        let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
        let fMod = parsed[1] % 10;
        let sMod = parsed[2] % 10;
        let isPR = (fMod === 0 && sMod === 0) || (fMod === 5 && sMod === 5);
        return isPR;
    },

    
    lookRoom: function(roomName, status = 'normal') {
        let room = Game.rooms[roomName];
        if (!room) {
            return;
        }
        if (room.memory.lookTime) {
            //console.log(helpers.getRoomLink(room.name), 'looked', Game.time - room.memory.lookTime, 'ticks ago.')
        }
        room.memory.lookTime = Game.time;

        if (Memory.mapVisual) Game.map.visual.circle(new RoomPosition(25,25,room.name),{fill: '#ffff00', stroke: '#0000ff'});
        
        if (room.memory.avoid == 3 && (!room.controller || room.controller.level < 3 || room.controller.my)) {
            room.memory.avoid = undefined;
        }
        
        if (room.memory.avoid === undefined && room.controller && room.controller.level>=3 && !room.controller.my) {
            room.memory.avoid = 3;
        }
        
        let isRoomStatusNormal = status == 'normal';
        if (!isRoomStatusNormal && room.memory.enemyRoom) {
            room.memory.enemyRoom = undefined;
        }
        if (!isRoomStatusNormal) return;

        if (room.find(FIND_NUKES).length) {
            if (room.controller && !room.controller.level) {
                if (room.name == 'E57N6') { 
                    
                } else {
                    Game.notify('DANGER!!!!!!!! NUKE found in room SET ON Defend Room Mode'+room.name);    
                    Memory.attackController[room.name] = 'claim';
                }
            } else {
                Game.notify('NUKE found in room '+room.name);
            }
        }
        
        if (1) { //update portals
            if (room.memory.ps) {
                delete room.memory.ps;
            }
            if (this.isPortalRoom(roomName)) {
                let portals = room.find(FIND_STRUCTURES).filter(s=>s.structureType == STRUCTURE_PORTAL);
                if (portals.length) {
                    room.memory.ps = packCoordList(portals.map(s=>s.pos));
                    console.log('new room portal update', room.name);
                }
            }
        }

        if (room.memory.enemyRoom === undefined && room.controller && room.controller.level>=1 && !room.controller.my) {
            room.memory.enemyRoom = room.controller.level;
            if (this.xolymArea[Game.shard.name] && this.xolymArea[Game.shard.name].includes(room.name)) {
                this.scanNotify('Found new base in Xolym Area room '+room.name+ ' Player '+ room.controller.owner.username+ ' Level '+ room.controller.level);
                //this.invasionRoom(room);
                this.invasion(room.name);
            } else if (this.playersBlackList.includes(room.controller.owner.username)) {
                this.scanNotify('Found new base player in EnemyList in room '+room.name+ ' Player '+ room.controller.owner.username+ ' Level '+ room.controller.level);
                //this.invasionRoom(room);
                this.invasion(room.name);
            } else {
                this.scanNotify('Found new base in room '+room.name+ ' Player '+ room.controller.owner.username+ ' Level '+ room.controller.level);    
            }
            if (this.playersNotify.includes(room.controller.owner.username)) {
                Game.notify('playersNotify new base in room '+room.name+ ' Player '+ room.controller.owner.username+ ' Level '+ room.controller.level +' SET ON Defend Room Mode in room');
            }
            
        }
        if (room.memory.enemyRoom && room.controller && room.controller.level>=1 && !room.controller.my && room.controller.level < room.memory.enemyRoom) {
            this.scanNotify('Enemy base lost RCL in room '+room.name+ ' Player '+ room.controller.owner.username+ ' Level '+ room.controller.level+' <- '+room.memory.enemyRoom);
            room.memory.enemyRoom = room.controller.level;
        }
        if (room.memory.enemyRoom && room.controller && room.controller.level>=1 && !room.controller.my && room.controller.level > room.memory.enemyRoom) {
            this.scanNotify('Enemy base increase RCL in room '+room.name+ ' Player '+ room.controller.owner.username+ ' Level '+ room.controller.level+' <- '+room.memory.enemyRoom);
            room.memory.enemyRoom = room.controller.level;
        }
        
        if (room.memory.enemyRoom && (!room.controller || !room.controller.level || room.controller.my)) {
            this.scanNotify('Lost base in room '+room.name + 'Last RCL ' + room.memory.enemyRoom);
            room.memory.enemyRoom = undefined;
        }
        
        if (room.controller && !room.controller.level && (!room.controller.reservation || room.controller.reservation.username == 'Invader') && (!room.controller.sign || room.controller.sign.username != 'Xolym') 
            && this.xolymArea[Game.shard.name] && this.xolymArea[Game.shard.name].includes(room.name) && !(Memory.signerBlackList && Memory.signerBlackList.includes(roomName)) ) 
        {
            if (!Memory.signers) {
                Memory.signers = {};
            }
            if (!Memory.signers[room.name] && Object.keys(Memory.signers).length < 20) {
                Memory.signers[room.name] = {pos:{x:room.controller.pos.x, y:room.controller.pos.y}, time:Game.time};
                //this.scanNotify('Send singner to room '+room.name);
            }
        }
        
        require('role.skMineral').findSkMineral(room);
        require('role.roomBlocker').lookRoom(room);
        
        //scoreHelpers.roomCheckEnemy(room);
        //scoreHelpers.roomCheckScoreOther(room);
        
        
        
    },
    
    freeMemory: function() {
        for (let roomName in Memory.rooms) {
            if (Memory.rooms[roomName]) {
                delete Memory.rooms[roomName].observed;
                delete Memory.rooms[roomName].lookTime;
                delete Memory.rooms[roomName].observeRoomInfo;
            }
            
            if (_.isEmpty(Memory.rooms[roomName])) {
                Memory.rooms[roomName] = undefined;
                delete Memory.rooms[roomName];
            }
        }
    },
    
    observeEnable: function() {
        return _.get(Memory, 'observerManager.observeEnable', 0);
    },
    tickReset: function() {
        if (Game.shard.name == 'shard1') {
            return;
        }
        this.signCreepRun();
        this.invasionControllerTick();
        if (0 && Game.shard.name == 'shard2') {
            let rooms = [];
            for (let dx = 0; dx<9; dx ++) {
                for (let dy = 0; dy<9; dy ++) {
                    if (dx == 9 || dy == 9) {
                        continue;
                    }
                    rooms.push(this.getRoomNameFromDeltaCoord(dx, dy, 'E1S21'));
                }
            }
            let log = '[';
            rooms.forEach(roomName => {
                log += "'"+roomName+"',"
                // let pos = new RoomPosition(25, 35, roomName);
                // Game.map.visual.text('xolym', pos, {color: '#00FF00', fontSize: 12}); 
            });
            console.log(log);
        
        }
        if (0 && Game.shard.name == 'shard2') { 
            console.log(this.findClosestRoomByPath('E53N38'));
        }
        
        if (!Memory.observerManager) {
            Memory.observerManager = {
                observeEnable: 0,
                startTime: Game.time,
            };
        }

        if (!Memory.observerManager.observeEnable) {
            this.manualScanTasks();
        }

        if (Memory.observerManager.observeEnable) {
            let allReady = true;
            for (let roomName in Memory.observerManager.rooms) {
                if (!Memory.observerManager.rooms[roomName]) {
                    allReady = false;    
                }
            }
            let timePass = Game.time - Memory.observerManager.startTime;
            if (allReady || Game.cpu.bucket < 3000 || timePass > 5000) {
                Memory.observerManager.observeEnable = 0;
                let text = 'Scan world map ended. Bucket is '+ Game.cpu.bucket+ ' Ticks passed '+ timePass;
                if (Game.cpu.bucket < 3000) {
                    text += ' Process terminated!! Bucket too low!';
                }
                if (timePass > 5000) {
                    text += ' Process terminated!! Too long ticks';
                }
                this.scanNotify(text, true);
                Memory.observerManager.startTime = Game.time + 5000;
                //clear memory!!
                this.freeMemory();
                
            }
        } 
        
        
        let bucketToStart = 9000;
        
        if (!Memory.observerManager.observeEnable && Game.time > Memory.observerManager.startTime + 5000) {
            bucketToStart = 8000;
        }
        if (!Memory.observerManager.observeEnable && Game.time > Memory.observerManager.startTime + 10000) {
            bucketToStart = 7000;
        }
        if (!Memory.observerManager.observeEnable && Game.time > Memory.observerManager.startTime + 15000) {
            bucketToStart = 6000;
        }
        if (!Memory.observerManager.observeEnable && Game.time > Memory.observerManager.startTime + 20000) {
            Game.notify('Too small bucket to start Scan world');
            Memory.observerManager.startTime += 25000;
        }
        
        if (!Memory.observerManager.observeEnable && Game.time > Memory.observerManager.startTime && Game.cpu.bucket > 9000) {
            Memory.observerManager.observeEnable = 1;
            Memory.observerManager.startTime = Game.time;
            Memory.observerManager.rooms = {};
            let text = 'Scan world map start! Bucket is '+ Game.cpu.bucket;
            this.scanLine = 0;
            this.scanNotify(text);
            //Game.notify(text);
            console.log(text);
        }
    },
    
    scanLine: 0,
    scanNotify: function(text, notify = false) {
        console.log(text);
        Memory.observerManager.text = (Memory.observerManager.text || '') + text +"<br>\n"
        this.scanLine++;
        if (notify) {
            if (this.scanLine>2){
                Game.notify(Memory.observerManager.text);
            }
            Memory.observerManager.text = '';
            this.scanLine = 0;
        }
    },
    
    observeRoom: function(room) {
        if (Game.cpu.bucket < 3000) {
            return;
        }
        if (!Memory.observerManager || !Memory.observerManager.observeEnable || !Memory.observerManager.rooms) {
            return;
        }
        const dRange = 10;
        
        if (room.memory.observer == undefined){
            let observers = room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_OBSERVER }});
            if (observers.length) {
                room.memory.observer = observers[0].id;
            } else {
                room.memory.observer = 0;
            }
        }
        if (!room.memory.observer) {
            if (!(Game.time%5000)) {
                room.memory.observer = undefined;
            }
            return;
        }
        
        if (Memory.observerManager.rooms[room.name]) {
            //console.log(room.name, 'World observing complete');
            return;
        }
        
        if (!room.memory.observeRoomInfo) {
            room.memory.observeRoomInfo = {dx:-dRange,dy:-dRange};
            Memory.observerManager.rooms[room.name] = 0;
        }
        
        if (room.memory.observeRoomInfo.observedRoom) {
            let status = Game.map.getRoomStatus(room.memory.observeRoomInfo.observedRoom)?Game.map.getRoomStatus(room.memory.observeRoomInfo.observedRoom).status:undefined;
            this.lookRoom(room.memory.observeRoomInfo.observedRoom, status);
            room.memory.observeRoomInfo.observedRoom = undefined;
        }
        
        //let myRoomStatus = Game.map.getRoomStatus(room.name)?Game.map.getRoomStatus(room.name).status:'error';
        let maxIteration = 1;
        let maxIterationGlobal = 10;
        do {
            let prevDx = room.memory.observeRoomInfo.dx;
            let prevDy = room.memory.observeRoomInfo.dy;
            room.memory.observeRoomInfo.dx++;
            if (room.memory.observeRoomInfo.dx > dRange) {
                room.memory.observeRoomInfo.dx = -dRange;
                room.memory.observeRoomInfo.dy++;
                if (room.memory.observeRoomInfo.dy > dRange) {
                    room.memory.observeRoomInfo.dy = -dRange;
                    Memory.observerManager.rooms[room.name] = 1;
                }
            }

            let roomToObserve = this.getRoomNameFromDeltaCoord(room.memory.observeRoomInfo.dx, room.memory.observeRoomInfo.dy, room.name);
            let logStatus = '';
            let status = Game.map.getRoomStatus(roomToObserve)?Game.map.getRoomStatus(roomToObserve).status:undefined;
            if (roomToObserve && status && status !== 'closed') {
                let lastLookTime = Memory.rooms[roomToObserve]?Memory.rooms[roomToObserve].lookTime:undefined;
                let observedTime = Memory.rooms[roomToObserve]?Memory.rooms[roomToObserve].observed:undefined;
                if (lastLookTime && Game.time < lastLookTime + 1000) {
                    logStatus = 'LOOKED '+ (Game.time - lastLookTime) + ' ticks' ;
                    maxIteration++;
                } else if (observedTime && Game.time == observedTime) {
                    logStatus = 'OBSERVED';
                    maxIteration++;
                } else {
                    let observedRoom = Game.rooms[roomToObserve];
                    if (observedRoom) {
                        this.lookRoom(roomToObserve, status);
                        logStatus = 'VISION';
                        maxIteration = 0;
                    } else {
                        maxIteration = 0;
                        if (Game.cpu.bucket < 3500) {
                            logStatus = 'NOBUCKET';
                            room.memory.observeRoomInfo.dx = prevDx;
                            room.memory.observeRoomInfo.dy = prevDy;
                        } else if (room.memory.observerUsed == Game.time) {
                            logStatus = 'BUSY';
                            room.memory.observeRoomInfo.dx = prevDx;
                            room.memory.observeRoomInfo.dy = prevDy;
                        } else {
                            let observer = Game.getObjectById(room.memory.observer);
                            if (!observer) {
                                room.memory.observer = undefined;
                                return;
                            }
                            let res = observer.observeRoom(roomToObserve);
                            if (res == OK) {
                                room.memory.observeRoomInfo.observedRoom = roomToObserve;
                                if (!Memory.rooms[roomToObserve]) {
                                    Memory.rooms[roomToObserve] = {};
                                }
                                Memory.rooms[roomToObserve].observed = Game.time;
                                logStatus = 'OK';
                            } else {
                                logStatus = 'FAIL';
                                room.memory.observeRoomInfo.dx = prevDx;
                                room.memory.observeRoomInfo.dy = prevDy;
                            }
                        }
                    }
                }
            } else {
                logStatus = 'CLOSED';
                if (Memory.rooms[roomToObserve]) {
                    delete Memory.rooms[roomToObserve];
                }
                maxIteration++;
            }
            //console.log(room.name, 'dx', room.memory.observeRoomInfo.dx, 'dy', room.memory.observeRoomInfo.dy, '=', roomToObserve, status, logStatus);
            
        } while (maxIteration-- > 0 && maxIterationGlobal-- > 0);
        
        
        

        
    },
    
    xolymArea: {
        'shard0': [
            'E71N59','E71N58','E71N57','E71N56','E71N55','E71N54','E71N53','E71N52','E71N51','E72N59','E72N58','E72N57','E72N56','E72N55','E72N54','E72N53','E72N52','E72N51','E73N59','E73N58','E73N57','E73N56','E73N55','E73N54','E73N53','E73N52','E73N51','E74N59','E74N58','E74N57','E74N56','E74N55','E74N54','E74N53','E74N52','E74N51','E75N59','E75N58','E75N57','E75N56','E75N55','E75N54','E75N53','E75N52','E75N51','E76N59','E76N58','E76N57','E76N56','E76N55','E76N54','E76N53','E76N52','E76N51','E77N59','E77N58','E77N57','E77N56','E77N55','E77N54','E77N53','E77N52','E77N51','E78N59','E78N58','E78N57','E78N56','E78N55','E78N54','E78N53','E78N52','E78N51','E79N59','E79N58','E79N57','E79N56','E79N55','E79N54','E79N53','E79N52','E79N51',
            'E81N59','E81N58','E81N57','E81N56','E81N55','E81N54','E81N53','E81N52','E81N51','E82N59','E82N58','E82N57','E82N56','E82N55','E82N54','E82N53','E82N52','E82N51','E83N59','E83N58','E83N57','E83N56','E83N55','E83N54','E83N53','E83N52','E83N51','E84N59','E84N58','E84N57','E84N56','E84N55','E84N54','E84N53','E84N52','E84N51','E85N59','E85N58','E85N57','E85N56','E85N55','E85N54','E85N53','E85N52','E85N51','E86N59','E86N58','E86N57','E86N56','E86N55','E86N54','E86N53','E86N52','E86N51','E87N59','E87N58','E87N57','E87N56','E87N55','E87N54','E87N53','E87N52','E87N51','E88N59','E88N58','E88N57','E88N56','E88N55','E88N54','E88N53','E88N52','E88N51','E89N59','E89N58','E89N57','E89N56','E89N55','E89N54','E89N53','E89N52','E89N51',
            'E51N49','E51N48','E51N47','E51N46','E51N45','E51N44','E51N43','E51N42','E51N41','E52N49','E52N48','E52N47','E52N46','E52N45','E52N44','E52N43','E52N42','E52N41','E53N49','E53N48','E53N47','E53N46','E53N45','E53N44','E53N43','E53N42','E53N41','E54N49','E54N48','E54N47','E54N46','E54N45','E54N44','E54N43','E54N42','E54N41','E55N49','E55N48','E55N47','E55N46','E55N45','E55N44','E55N43','E55N42','E55N41','E56N49','E56N48','E56N47','E56N46','E56N45','E56N44','E56N43','E56N42','E56N41','E57N49','E57N48','E57N47','E57N46','E57N45','E57N44','E57N43','E57N42','E57N41','E58N49','E58N48','E58N47','E58N46','E58N45','E58N44','E58N43','E58N42','E58N41','E59N49','E59N48','E59N47','E59N46','E59N45','E59N44','E59N43','E59N42','E59N41',
            ],
        'shard2': [
            'E41N39','E41N38','E41N37','E41N36','E41N35','E41N34','E41N33','E41N32','E41N31','E41N29','E41N28','E41N27','E41N26','E41N25','E41N24','E41N23','E41N22','E41N21','E42N39','E42N38','E42N37','E42N36','E42N35','E42N34','E42N33','E42N32','E42N31','E42N29','E42N28','E42N27','E42N26','E42N25','E42N24','E42N23','E42N22','E42N21','E43N39','E43N38','E43N37','E43N36','E43N35','E43N34','E43N33','E43N32','E43N31','E43N29','E43N28','E43N27','E43N26','E43N25','E43N24','E43N23','E43N22','E43N21','E44N39','E44N38','E44N37','E44N36','E44N35','E44N34','E44N33','E44N32','E44N31','E44N29','E44N28','E44N27','E44N26','E44N25','E44N24','E44N23','E44N22','E44N21','E45N39','E45N38','E45N37','E45N36','E45N35','E45N34','E45N33','E45N32','E45N31','E45N29','E45N28','E45N27','E45N26','E45N25','E45N24','E45N23','E45N22','E45N21','E46N39','E46N38','E46N37','E46N36','E46N35','E46N34','E46N33','E46N32','E46N31','E46N29','E46N28','E46N27','E46N26','E46N25','E46N24','E46N23','E46N22','E46N21','E47N39','E47N38','E47N37','E47N36','E47N35','E47N34','E47N33','E47N32','E47N31','E47N29','E47N28','E47N27','E47N26','E47N25','E47N24','E47N23','E47N22','E47N21','E48N39','E48N38','E48N37','E48N36','E48N35','E48N34','E48N33','E48N32','E48N31','E48N29','E48N28','E48N27','E48N26','E48N25','E48N24','E48N23','E48N22','E48N21','E49N39','E49N38','E49N37','E49N36','E49N35','E49N34','E49N33','E49N32','E49N31','E49N29','E49N28','E49N27','E49N26','E49N25','E49N24','E49N23','E49N22','E49N21',
            'E51N39','E51N38','E51N37','E51N36','E51N35','E51N34','E51N33','E51N32','E51N31','E51N29','E51N28','E51N27','E51N26','E51N25','E51N24','E51N23','E51N22','E51N21','E52N39','E52N38','E52N37','E52N36','E52N35','E52N34','E52N33','E52N32','E52N31','E52N29','E52N28','E52N27','E52N26','E52N25','E52N24','E52N23','E52N22','E52N21','E53N39','E53N38','E53N37','E53N36','E53N35','E53N34','E53N33','E53N32','E53N31','E53N29','E53N28','E53N27','E53N26','E53N25','E53N24','E53N23','E53N22','E53N21','E54N39','E54N38','E54N37','E54N36','E54N35','E54N34','E54N33','E54N32','E54N31','E54N29','E54N28','E54N27','E54N26','E54N25','E54N24','E54N23','E54N22','E54N21','E55N39','E55N38','E55N37','E55N36','E55N35','E55N34','E55N33','E55N32','E55N31','E55N29','E55N28','E55N27','E55N26','E55N25','E55N24','E55N23','E55N22','E55N21','E56N39','E56N38','E56N37','E56N36','E56N35','E56N34','E56N33','E56N32','E56N31','E56N29','E56N28','E56N27','E56N26','E56N25','E56N24','E56N23','E56N22','E56N21','E57N39','E57N38','E57N37','E57N36','E57N35','E57N34','E57N33','E57N32','E57N31','E57N29','E57N28','E57N27','E57N26','E57N25','E57N24','E57N23','E57N22','E57N21','E58N39','E58N38','E58N37','E58N36','E58N35','E58N34','E58N33','E58N32','E58N31','E58N29','E58N28','E58N27','E58N26','E58N25','E58N24','E58N23','E58N22','E58N21','E59N39','E59N38','E59N37','E59N36','E59N35','E59N34','E59N33','E59N32','E59N31','E59N29','E59N28','E59N27','E59N26','E59N25','E59N24','E59N23','E59N22','E59N21',
            'E41N19',
            ],
    },
    
    
    // manualScanArea: {
    //     'shard2': {
    //         observerId: '6167e81680324922a21090fc',
    //         powerCreepName: 'OpF1_2',
    //         findResources: [RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_ENERGY, RESOURCE_CATALYST, RESOURCE_UTRIUM, RESOURCE_GHODIUM_ACID],
    //         roomList: ['E1S21','E1S22','E1S23','E1S24','E1S25','E1S26','E1S27','E1S28','E1S29','E2S21','E2S22','E2S23','E2S24','E2S25','E2S26','E2S27','E2S28','E2S29','E3S21','E3S22','E3S23','E3S24','E3S25','E3S26','E3S27','E3S28','E3S29','E4S21','E4S22','E4S23','E4S24','E4S25','E4S26','E4S27','E4S28','E4S29','E5S21','E5S22','E5S23','E5S24','E5S25','E5S26','E5S27','E5S28','E5S29','E6S21','E6S22','E6S23','E6S24','E6S25','E6S26','E6S27','E6S28','E6S29','E7S21','E7S22','E7S23','E7S24','E7S25','E7S26','E7S27','E7S28','E7S29','E8S21','E8S22','E8S23','E8S24','E8S25','E8S26','E8S27','E8S28','E8S29','E9S21','E9S22','E9S23','E9S24','E9S25','E9S26','E9S27','E9S28','E9S29',],
    //     },
    // },
    
    manualScanArea: {
        'shard2_': {
            observerId: '6167e81680324922a21090fc',
            powerCreepName: 'OpF1_2',
            findResources: [],//[RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_ENERGY, RESOURCE_CATALYST, RESOURCE_UTRIUM, RESOURCE_GHODIUM_ACID],
            tasks: {
                //'Taki' : ['E1S21','E1S22','E1S23','E1S24','E1S25','E1S26','E1S27','E1S28','E1S29','E2S21','E2S22','E2S23','E2S24','E2S25','E2S26','E2S27','E2S28','E2S29','E3S21','E3S22','E3S23','E3S24','E3S25','E3S26','E3S27','E3S28','E3S29','E4S21','E4S22','E4S23','E4S24','E4S25','E4S26','E4S27','E4S28','E4S29','E5S21','E5S22','E5S23','E5S24','E5S25','E5S26','E5S27','E5S28','E5S29','E6S21','E6S22','E6S23','E6S24','E6S25','E6S26','E6S27','E6S28','E6S29','E7S21','E7S22','E7S23','E7S24','E7S25','E7S26','E7S27','E7S28','E7S29','E8S21','E8S22','E8S23','E8S24','E8S25','E8S26','E8S27','E8S28','E8S29','E9S21','E9S22','E9S23','E9S24','E9S25','E9S26','E9S27','E9S28','E9S29',],
                'liaohuo': ['E29S9'],
            }
        },
        'shardSeason': {
            observerId: '62078fd8f7116d6ceef5d481',
            powerCreepName: 'SF4',
            findResources: [RESOURCE_SILICON,RESOURCE_BIOMASS,RESOURCE_METAL,RESOURCE_MIST, RESOURCE_WIRE, RESOURCE_ALLOY, RESOURCE_CONDENSATE, RESOURCE_CELL, RESOURCE_OXYGEN, RESOURCE_OXIDANT, RESOURCE_HYDROGEN,
            RESOURCE_REDUCTANT, RESOURCE_CATALYST, RESOURCE_PURIFIER, 
            RESOURCE_COMPOSITE, RESOURCE_CRYSTAL, RESOURCE_LIQUID, RESOURCE_GHODIUM_MELT,
            RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID], 
            calcScore: 1, 
            tasks: {
                'Tigga': ["W13S6", "W5N8", "E3N6", "W3S4", "W2N1", "E6N3", "E14N13", "E14N3", "E15N7", "W15N3"],
                'Geir1983': ["E2S25", "W3S25", "E7S26", "E17S14", "E17S22", "E11S21", "E13S25", "E23S26", "E24S21", "E29S25"],
                'asdpof': ["E14S2", "E19N8", "E22N1", "E25S11", "E26N9", "E27N6", "E27N2", "E29N9", "E29S8"],
                'Sneaky_Polar_Bear': ["W5N27", "E4N27", "W3N25", "W2N22", "E1N29", "E1N23", "E5N23", "W9N24"],
                'Saruss': ['W24N17','W21N25','W25N19','W24N13','W28N15','W28N6','W27N4'],
                'Modus': ["W19N18", "W18N21", "W17N15", "W16N13", "W21N15", "W13N16", "W12N12", "W9N16"],
                // 'Earwig': ["E1N11","W1N13","W3N12","E5N11","W9N11","W7N12"],
                // 'Silten': ["W7S23","W6S29","W8S25","W9S28","W8S23"],
                 'Mirroar': ["W5N21", "W5N18", "W12N23", "W9N18", "W18N25", "W5N17", "W15N29"],
                // 'Eiskalt': ["W21S15","E4S12","W4S13","W2S13","W12S18","W22S7","E8S8","E8S14"],
                // 'psy372': ["E2N18","E3N16","W1N17","E7N12","E8N18","E17N12","E11N11","E7N17"],
                'Mitsuyoshi': ["W19S19","W19S28","W23S25","W23S28","W27S17","W13S21","W29S21","W28S29"],
                'Hi_Melnikov': ["W24N27", "W22N21", "W21N28", "W28N29", "W27N25", "W29N23", "W14N19", "W16N27"],
                'Trepidimous': ["E18S9","E19S3","E19S7","E15S1","E19S1","E21S11","E11S3","E24S9"],
                'slowmotionghost': ["W16S22","E1S13","E2S16","W3S18","E9S17","W8S18","W13S25","W16S28"], 
            }
            
        }
    },
    
    manualScanTasks: function() {
        if (!this.manualScanArea || !this.manualScanArea[Game.shard.name] || !this.manualScanArea[Game.shard.name].tasks) return;
        if (!Memory.manualScan) {
            Memory.manualScan = {};
        }
        if (!Memory.manualScan.nextTickScan || Game.time > Memory.manualScan.nextTickScan) {
            if (!Memory.manualScan.curentTasks) {
                Memory.manualScan.curentTasks = Object.keys(this.manualScanArea[Game.shard.name].tasks);
            }
            if (!Memory.manualScan.curentTasks.length) {
                //completed!!!
                const nextScanTicks = 20;
                console.log('Manual scaning complete. Shedule at '+nextScanTicks+' ticks.');
                Memory.manualScan.nextTickScan = Game.time + nextScanTicks;
                delete Memory.manualScan.curentTasks;
                delete Memory.manualScan.resources;
                return;
            }
            let task = Memory.manualScan.curentTasks[0];
            if (!Memory.manualScan.roomList && Game.cpu.bucket < 1000) {
                console.log('Manual scaning wait bucket');
                return;
            }
            
            const manualScanInfo = this.manualScanArea[Game.shard.name];
            if (!Memory.manualScan.roomList) {
                Memory.manualScan.roomList = manualScanInfo.tasks[task].slice(0);
                Memory.manualScan.resources = {};
            }
            if (!Memory.manualScan.roomList.length) {
                delete Memory.manualScan.roomList;
                if (Memory.manualScan.resources) {
                    if (!Memory.manualScan.history) {
                        Memory.manualScan.history = {};
                    }
                    if (!Memory.manualScan.history[task]) {
                        Memory.manualScan.history[task] = {};
                    }
                    Memory.manualScan.history[task][Game.time] = {};
                    if (!_.isEmpty(Memory.manualScan.resources)) {
                        Object.assign(Memory.manualScan.history[task][Game.time], Memory.manualScan.resources);
                        Game.notify('Manual scaning task complete. Task: ' + task + ' Resources: '+JSON.stringify(Memory.manualScan.resources));
                    } else {
                        delete Memory.manualScan.history[task][Game.time];    
                    }
                    Memory.manualScan.curentTasks.shift();
                }
                return;
            }
            const obs = Game.getObjectById(manualScanInfo.observerId);
            if (!obs) {
                console.log('manualScan no observer for scan');
                return;
            }
            if (!obs.effects || !obs.effects.length) {
                const creep = Game.powerCreeps[manualScanInfo.powerCreepName];
                if (!creep) {
                    console.log('manualScan no power creep for observer boost');
                    return;
                }
                creep.memory.operateObserver = obs.id;
                return;
            }
            const room = Game.rooms[Memory.manualScan.roomList[0]];
            if (room) {
                console.log('Looking far room', room.name);
                let structures = room.find(FIND_STRUCTURES, {filter: struct => [STRUCTURE_STORAGE, STRUCTURE_TERMINAL, STRUCTURE_LAB, STRUCTURE_CONTAINER].includes(struct.structureType)});
                manualScanInfo.findResources.forEach(resource => {
                    let amount = 0;
                    structures.forEach(struct => amount += (struct.store?struct.store[resource]:0));
                    Memory.manualScan.resources[resource] = (Memory.manualScan.resources[resource] || 0) + amount;
                });
                if (1 && room.name == 'E29S9') { 
                    let founds = room.find(FIND_HOSTILE_CREEPS, {filter: i => (i.getActiveBodyparts(WORK) > 35 && i.getActiveBodyparts(MOVE) == 10) || i.getActiveBodyparts(CLAIM) || i.getActiveBodyparts(WORK) == 10 });
                    if (founds.length>1) {
                        Game.notify(room.name+' observer find EXPANSION creep LIAOHUO SET ON Defend Room Mode in room');
                        console.log('<span style="color:red">liaohuo dettected EXPANSION!!!</span>');
                    }
                }
                
                if (0 && room.name == 'E29S9') { 
                    let founds = room.find(FIND_HOSTILE_CREEPS, {filter: i => i.getActiveBodyparts(RANGED_ATTACK) > 10 || i.getActiveBodyparts(ATTACK) > 10 || i.getActiveBodyparts(HEAL) > 10});
                    if (founds.length>1) {
                        if (0 && Memory.massRangers['E40N30'] && Memory.massRangers['E40N30'].count < 3) {
                            Game.notify(room.name+' observer find attack creep liaohuo SET ON Defend Room Mode in room');
                            try {
                                // Memory.massRangers['E40N30'].count = 3;Memory.massRangers['E39N30'].count = 3;Memory.massRangers['E40N29'].count = 3;Memory.pairs['E40N30'].count = 1;Memory.pairs['E40N29'].count = 1;
                                //Memory.massRangers['E40N30'].count = 2;Memory.massRangers['E39N30'].count = 2;Memory.massRangers['E40N29'].count = 1;Memory.pairs['E40N30'].count = 1;Memory.pairs['E40N29'].count = 0;
                                console.log('<span style="color:red">liaohuo dettected ATTACK!!!</span>');
                            } catch (e) {}
                        }
                    }
                }
                if (0 && room.name == 'E8S28') {
                    let founds = room.find(FIND_CREEPS, {filter: i => i.getActiveBodyparts(WORK) > 10});
                    if (founds.length>10) {
                        Game.notify(room.name+' GCL BOOST Active!!!')
                    }
                }
                if (0 && manualScanInfo.calcScore && COMMODITY_SCORE) { //season only
                    let task = Memory.manualScan.curentTasks[0];
                    if (room.controller && room.controller.level && room.controller.owner.username != task) {
                        Game.notify('room not owned task user '+task+' '+room.name);
                    }
                    
                    let structures = room.find(FIND_STRUCTURES, {filter: struct => [STRUCTURE_STORAGE, STRUCTURE_TERMINAL, STRUCTURE_LAB, STRUCTURE_CONTAINER, STRUCTURE_FACTORY].includes(struct.structureType)});
                    let globalStock = {};
                    structures.forEach(struct => {
                        globalStock = _.assign(globalStock, struct.store, _.add);
                    });
                    
                    let score = 0;
                    let pureScore = 0;
                    let score5l = 0;
                    let score4l = 0;
                    let score3l = 0;
                    let score2l = 0;
                    let score1l = 0;
                    for (let res in globalStock) {
                        score +=  COMMODITY_SCORE[res]?COMMODITY_SCORE[res]*globalStock[res]:0;
                        if (![RESOURCE_KEANIUM_BAR,RESOURCE_LEMERGIUM_BAR, RESOURCE_UTRIUM_BAR, RESOURCE_ZYNTHIUM_BAR,RESOURCE_REDUCTANT, RESOURCE_OXIDANT, RESOURCE_PURIFIER,RESOURCE_GHODIUM_MELT, ].includes(res)) {
                            pureScore +=  COMMODITY_SCORE[res]?COMMODITY_SCORE[res]*globalStock[res]:0;    
                        }
                        if ([RESOURCE_TUBE, RESOURCE_PHLEGM, RESOURCE_SWITCH, RESOURCE_CONCENTRATE].includes(res)) {
                            score1l +=  COMMODITY_SCORE[res]?COMMODITY_SCORE[res]*globalStock[res]:0;    
                        }
                        if ([RESOURCE_FIXTURES, RESOURCE_TISSUE, RESOURCE_TRANSISTOR, RESOURCE_EXTRACT].includes(res)) {
                            score2l +=  COMMODITY_SCORE[res]?COMMODITY_SCORE[res]*globalStock[res]:0;    
                        }
                        if ([RESOURCE_SPIRIT, RESOURCE_MICROCHIP, RESOURCE_MUSCLE, RESOURCE_FRAME].includes(res)) {
                            score3l +=  COMMODITY_SCORE[res]?COMMODITY_SCORE[res]*globalStock[res]:0;    
                        }
                        if ([RESOURCE_HYDRAULICS, RESOURCE_ORGANOID, RESOURCE_CIRCUIT, RESOURCE_EMANATION].includes(res)) {
                            score4l +=  COMMODITY_SCORE[res]?COMMODITY_SCORE[res]*globalStock[res]:0;    
                        }
                        if ([RESOURCE_MACHINE, RESOURCE_ORGANISM, RESOURCE_DEVICE, RESOURCE_ESSENCE].includes(res)) {
                            score5l +=  COMMODITY_SCORE[res]?COMMODITY_SCORE[res]*globalStock[res]:0;    
                        }
                    }                    
                    Memory.manualScan.resources.score = (Memory.manualScan.resources.score || 0) + score;
                    Memory.manualScan.resources.pureScore = (Memory.manualScan.resources.pureScore || 0) + pureScore;
                    Memory.manualScan.resources.score1l = (Memory.manualScan.resources.score1l || 0) + score1l;
                    Memory.manualScan.resources.score2l = (Memory.manualScan.resources.score2l || 0) + score2l;
                    Memory.manualScan.resources.score3l = (Memory.manualScan.resources.score3l || 0) + score3l;
                    Memory.manualScan.resources.score4l = (Memory.manualScan.resources.score4l || 0) + score4l;
                    Memory.manualScan.resources.score5l = (Memory.manualScan.resources.score5l || 0) + score5l;
                }
            
                
                Memory.manualScan.roomList.shift();
            } else {
                console.log('Error!!! Looking far room', Memory.manualScan.roomList[0]);
            }
            if (Memory.manualScan.roomList.length) {
                if (obs.room.memory.observerUsed == Game.time) {
                    console.log('Manual scaning observer BUSY', Memory.manualScan.roomList[0]);
                } else {
                    obs.observeRoom(Memory.manualScan.roomList[0]);
                    console.log('Manual scaning far room', Memory.manualScan.roomList[0]);
                }
            }
        }
    },
    
    manualScan: function() {
        if (!this.manualScanArea || !this.manualScanArea[Game.shard.name] || !this.manualScanArea[Game.shard.name].roomList || !this.manualScanArea[Game.shard.name].roomList.length) return;
        if (!Memory.manualScan) {
            Memory.manualScan = {};
        }
        if (!Memory.manualScan.nextTickScan || Game.time > Memory.manualScan.nextTickScan) {
            if (!Memory.manualScan.roomList && Game.cpu.bucket < 9500) {
                console.log('Manual scaning wait bucket');
                return;
            }
            
            const manualScanInfo = this.manualScanArea[Game.shard.name];
            if (!Memory.manualScan.roomList) {
                Memory.manualScan.roomList = manualScanInfo.roomList.slice(0);
                Memory.manualScan.resources = {};
            }
            if (!Memory.manualScan.roomList.length) {
                console.log('Manual scaning complete. Shedule at 3000 ticks.');
                delete Memory.manualScan.roomList;
                Memory.manualScan.nextTickScan = Game.time + 3000;
                if (Memory.manualScan.resources) {
                    if (!Memory.manualScan.history) {
                        Memory.manualScan.history = {};
                    }
                    Memory.manualScan.history[Game.time] = {};
                    Object.assign(Memory.manualScan.history[Game.time], Memory.manualScan.resources);
                    Game.notify('Manual scaning complete. Resources: '+JSON.stringify(Memory.manualScan.resources));
                }
                return;
            }
            const obs = Game.getObjectById(manualScanInfo.observerId);
            if (!obs) {
                console.log('manualScan no observer for scan');
                return;
            }
            if (!obs.effects || !obs.effects.length) {
                const creep = Game.powerCreeps[manualScanInfo.powerCreepName];
                if (!creep) {
                    console.log('manualScan no power creep for observer boost');
                    return;
                }
                creep.memory.operateObserver = obs.id;
                return;
            }
            const room = Game.rooms[Memory.manualScan.roomList[0]];
            if (room) {
                console.log('Looking far room', room.name);
                let structures = room.find(FIND_STRUCTURES, {filter: struct => [STRUCTURE_STORAGE, STRUCTURE_TERMINAL, STRUCTURE_LAB, STRUCTURE_CONTAINER].includes(struct.structureType)});
                manualScanInfo.findResources.forEach(resource => {
                    let amount = 0;
                    structures.forEach(struct => amount += (struct.store?struct.store[resource]:0));
                    Memory.manualScan.resources[resource] = (Memory.manualScan.resources[resource] || 0) + amount;
                });
                if (room.name == 'E8S28') {
                    let founds = room.find(FIND_CREEPS, {filter: i => i.getActiveBodyparts(WORK) > 10});
                    if (founds.length>10) {
                        Game.notify(room.name+' GCL BOOST Active!!!')
                    }
                }
                Memory.manualScan.roomList.shift();
            } else {
                console.log('Error!!! Looking far room', Memory.manualScan.roomList[0]);
            }
            if (Memory.manualScan.roomList.length) {
                if (obs.room.memory.observerUsed == Game.time) {
                    console.log('Manual scaning observer BUSY', Memory.manualScan.roomList[0]);
                } else {
                    obs.observeRoom(Memory.manualScan.roomList[0]);
                    console.log('Manual scaning far room', Memory.manualScan.roomList[0]);
                }
            }
        }
    },
    
    invasion: function(roomName, toX=24, toY=24, range=25) { //
        if (!Memory.invasion) {
            Memory.invasion = {};
        }
        if (!Memory.invasion[roomName] || Memory.invasion[roomName].closed) {
            Memory.invasion[roomName] = {startTime: Game.time};
        }
        console.log('invasion',roomName, toX, toY, range );
        
        let invasionInfo = Memory.invasion[roomName];
        if (!invasionInfo.spawnRoom) {
            let spawnRoomInfo = this.findClosestRoomByPath(roomName, toX, toY, range, true);
            if (!spawnRoomInfo) {
                delete Memory.invasion[roomName];
                console.log('no spawn room found. Invasion cancel');
                return;    
            }
            invasionInfo.spawnRoom = spawnRoomInfo.roomName;
            invasionInfo.pathLength = spawnRoomInfo.length;
        }
        
        console.log('invasion room '+roomName+' created');
    },
    
    invasionControllerTick: function() {
        if (!Memory.invasion) return;
        for (let roomName in Memory.invasion) {
            let invasionInfo = Memory.invasion[roomName];
            if (invasionInfo.closed) continue;
            let spawnRoomName = invasionInfo.spawnRoom;
            if (!invasionInfo.nextUpdateTime || Game.time > invasionInfo.nextUpdateTime) {
                if (!invasionInfo.roomUpdatedTime || Game.time > invasionInfo.roomUpdatedTime + 300) { //update every 300 ticks
                    let room = Game.rooms[roomName];
                    if (!room) {
                        if (!Memory.rooms[spawnRoomName]) return;
                        if (Memory.rooms[spawnRoomName].observerUsed == Game.time) {
                            console.log('invasion',roomName,'observer busy')
                        } else {
                            let observer = Game.getObjectById(Memory.rooms[spawnRoomName].observer);
                            if (!observer) {
                                console.log('invasion',roomName,'no observer')
                                let obsRoom = Game.rooms[spawnRoomName];
                                if (obsRoom) {
                                    let observers = obsRoom.find(FIND_MY_STRUCTURES).filter(s=>s.structureType == STRUCTURE_OBSERVER);
                                    if (observers.length) {
                                        Memory.rooms[spawnRoomName].observer = observers[0].id;
                                    }
                                }
                                
                                continue;
                            }
                            let res = observer.observeRoom(roomName);
                            if (res != OK) {
                                console.log('invasion',roomName,'observer error', res);
                            }
                            continue;
                        }    
                    } else {
                        if (!room.controller) {
                            console.log('invasion',roomName,'no controller');
                            continue; //need cancel invade wrong room
                        }
                        invasionInfo.roomUpdatedTime = Game.time;
                        invasionInfo.roomInfo = {
                            time: Game.time,
                            level: room.controller.level,
                            owner: room.controller.owner ? room.controller.owner.username : 'unknown',
                            safeMode: room.controller.safeMode,
                            towers: room.find(FIND_HOSTILE_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}}).length,
                            spawns: room.find(FIND_HOSTILE_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}}).length,
                            creeps: room.find(FIND_HOSTILE_CREEPS).length,
                            defenders: room.find(FIND_HOSTILE_CREEPS, {filter: creep => [ATTACK, RANGED_ATTACK, HEAL].some(part => creep.getActiveBodyparts(part))}).length,
                            progress: (room.controller.progress || 1)/room.controller.progressTotal,
                        }
                        
                    }
                    continue;
                }
                
                let roomInfo = invasionInfo.roomInfo;
                let mrTeam = Memory.massRangers[roomName];
                if (!roomInfo.level || roomInfo.owner == 'Xolym' || (0 && !roomInfo.spawns && !roomInfo.towers && !roomInfo.defenders && !roomInfo.creeps)) {
                    if (mrTeam) {
                        delete Memory.massRangers[roomName];
                    }
                    Game.notify('invasion '+roomName+' closed by destroy or unclaim');
                    invasionInfo.closed = 1;
                    continue;
                }
                
                
                if (mrTeam) { 
                    if (roomInfo.safeMode && roomInfo.safeMode> 1700) {
                        delete Memory.massRangers[roomName];
                        invasionInfo.nextUpdateTime = Game.time + roomInfo.safeMode - invasionInfo.pathLength - 150 - 100 - 50;
                        continue;
                    }
                    if (mrTeam.towers && mrTeam.towers < roomInfo.towers) {
                        delete Memory.massRangers[roomName];
                        continue;
                    }
                    if (!mrTeam.towers && roomInfo.towers) {
                        delete Memory.massRangers[roomName];
                        continue;
                    }
                    if (roomInfo.spawns && mrTeam.invasionTime && Game.time > mrTeam.invasionTime+3000 && !invasionInfo.escalateInvasion) {
                        delete Memory.massRangers[roomName];
                        invasionInfo.escalateInvasion = 1;
                        continue;
                    }
                    if (roomInfo.spawns && mrTeam.invasionTime && Game.time > mrTeam.invasionTime+3000 && invasionInfo.escalateInvasion) {
                        delete Memory.massRangers[roomName];
                        Game.notify('invasion '+roomName+' closed by time');
                        invasionInfo.closed = 1;
                        continue;
                    }
                }
                
                if (!mrTeam) {
                    if (roomInfo.safeMode && roomInfo.safeMode> invasionInfo.pathLength + 150 + 100 + 50) {
                        invasionInfo.nextUpdateTime = Game.time + roomInfo.safeMode - invasionInfo.pathLength - 150 - 100 - 50;
                        continue;
                    }
                    let level = roomInfo.level;
                    if (level == 2 && roomInfo.progress > 0.3) {
                        level++;
                    } else if (roomInfo.progress > 0.9) {
                        level++;
                    }
                    let towers = CONTROLLER_STRUCTURES[STRUCTURE_TOWER][level];
                    if (invasionInfo.escalateInvasion) {
                        towers++;
                    }
                    
                    if (!towers && !roomInfo.defenders) {
                        Memory.massRangers[roomName] = {room:spawnRoomName, count: 1, time:Game.time + 10000, };        
                    } else if (!towers && roomInfo.defenders) {
                        Memory.massRangers[roomName] = {room:spawnRoomName, count: 2, time:Game.time + 10000, };        
                    } else if (towers == 1 && !roomInfo.defenders) {
                        this.invasionBoostedOneTower(spawnRoomName, roomName);
                    } else if (towers == 1 && roomInfo.defenders) {
                        this.invasionBoostedThreeTower(spawnRoomName, roomName);
                    } else if (towers == 2) {
                        this.invasionBoostedTwoTower(spawnRoomName, roomName);
                    } else if (towers == 3) {
                        this.invasionBoostedThreeTower(spawnRoomName, roomName);
                    } else if (towers == 4) {
                        this.invasionBoostedThreeTower(spawnRoomName, roomName);
                    } else {
                        Game.notify('invasion '+roomName+' closed by too many towers '+ towers);
                        invasionInfo.closed = 1;
                        continue;
                    }
                    
                    let mrTeam = Memory.massRangers[roomName];
                    if (!mrTeam) {
                        Game.notify('invasion '+roomName+' closed by NOT created MR group');
                        invasionInfo.closed = 1;
                        continue;
                    }
                    
                    mrTeam.invasionTime = Game.time;
                    mrTeam.towers = towers;
                    mrTeam.defenders = roomInfo.defenders;
                    
                    if (invasionInfo.escalateInvasion) {
                        mrTeam.count++;
                    }
                    
                    invasionInfo.mrTeamCreated = {
                        time: Game.time, 
                        towers: towers,
                        count: mrTeam.count,
                        defenders: roomInfo.defenders,
                    }
                    
                    invasionInfo.nextUpdateTime = Game.time + 100;
                }
                
                
            }
        }
        
        
    },
    

};

StructureObserver.prototype._observeRoom = StructureObserver.prototype.observeRoom;

StructureObserver.prototype.observeRoom = function (roomName) {
    let result = this._observeRoom(roomName);
    if (result == OK) {
        this.room.memory.observerUsed = Game.time;
        //console.log('Observing room'+roomName);
    }
    return result;
}

// Game.map.visual.prototype._text = Game.map.visual.prototype.text;
// Game.map.visual.prototype.text = function(text, pos, [style]) {
//     if (Memory.mapVisual) {
//         this._text(text, pos, style);
//     }
// };
