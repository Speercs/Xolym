var roleHarvester = require('role.harvester');
//var roleHarvester2 = require('role.harvester2');
var roleUpgrader = require('role.upgrader');
var roleAtacker = require('role.atacker');
var roleAssault = require('role.assault');
//var roleBuilder = require('role.builder');
var roleClaim = require('role.claim');
var roleSuperHarvester = require('role.superharvester');
var roleSuplier = require('role.suplier');
var roleMiner = require('role.miner');
var roleTransporter = require('role.transporter');
var roleSuperTransporter = require('role.supertransporter');
var roleWallBuilder = require('role.wallbuilder');
var roleOperator = require('role.operator');
var roleDeposit = require('role.deposit');
var roleCollector = require('role.collector');
var roleHWDefenders =  require('role.hwDefenders');
var roleQuad =  require('role.quad');
var roleRoomDefender =  require('role.roomDefender');
var roleDeliver = require('role.deliver');
var roleInter = require('role.inter');
var roleGclBooster = require('role.gclBooster');
var roleMassRanger = require('role.massRanger');
var roleHunter = require('role.hunter');
var roleSettler = require('role.settler');

var helpers = require('helpers');

const SPAWN_QUEUED = -20;

var spawnHelper = {
    gameCreeps: null,
    gameCreepsTime: null,
    gameCreepsByRoom: {},
    gameCreepsByRoomByRole: {},
    gameCreepsByRole: {},
    groupRoleList: [],//'atacker', 'hunter', 'massRanger'],
    skipRoleList: ['tsr','wall','manualBuilder','intershard'],
    gameCreepsCount: 0,
    gameCreepsCall: 0,
    gameCreepsByRoomCall: 0,
    gameCreepsByRoomByRoleCall: 0,
    gameCreepsByRoleCall: 0,
    getGameCreeps2: function(roomName = undefined, creepRole = undefined) {
        require('profiler').start('getGameCreeps');
        if (Game.time == this.gameCreepsTime) {
        } else {
            const gameCreepsCpu = Game.cpu.getUsed();
            this.gameCreepsByRoom = _.groupBy(Game.creeps, c=>c.memory.room);
            this.gameCreepsTime = Game.time;
            //console.log('<span style="color:red">getGameCreepsCpu 2!!</span>', (Game.cpu.getUsed() - gameCreepsCpu).toFixed(4));
        }
        
        if (0) { //group by room and role
            if (this.gameCreepsByRoom[roomName] && !this.gameCreepsByRoomByRole[roomName] && this.gameCreepsByRoom[roomName].length > 12) {
                this.gameCreepsByRoomByRole[roomName] = _.groupBy(this.gameCreepsByRoom[roomName], c=>c.memory.role);
            }
            require('profiler').end('getGameCreeps');
            if (this.gameCreepsByRoomByRole[roomName]) {
                return this.gameCreepsByRoomByRole[roomName][creepRole]?this.gameCreepsByRoomByRole[roomName][creepRole]:[];
            } else {
                return this.gameCreepsByRoom[roomName]?this.gameCreepsByRoom[roomName]:[];
            }
        } else {
            require('profiler').end('getGameCreeps');
            return this.gameCreepsByRoom[roomName]?this.gameCreepsByRoom[roomName]:[];
        }
    },
    
    getGameCreeps: function(roomName = undefined, creepRole = undefined) {
        if (roomName && creepRole) {
            this.gameCreepsByRoomByRoleCall++;
        } else if (roomName && !creepRole){
            this.gameCreepsByRoomCall++;
        } else if (!roomName && creepRole){
            this.gameCreepsByRoleCall++;
        } else {
            this.gameCreepsCall++;
        }
        
        if (1 || Game.shard.name == 'shard2') {
            return this.getGameCreeps2(roomName, creepRole);
        }
        
        //deprecated!!!!
        require('profiler').start('getGameCreeps');
        if (Game.time == this.gameCreepsTime) {
            //return this.gameCreeps; //return bottom
        } else {
            const gameCreepsCpu = Game.cpu.getUsed();
            //create creeps array for count
            this.gameCreeps = [];
            this.gameCreepsByRoom = {};
            this.gameCreepsByRoomByRole = {};
            this.gameCreepsByRole = {};
            this.gameCreepsCount = 0;
            for(var name in Game.creeps) {
                this.gameCreepsCount++;
                const creep = Game.creeps[name];
                if (this.skipRoleList.includes(creep.memory.role)) continue;
                // const newCreep = creep;
                const newCreep = {
                    id: creep.id,
                    memory: creep.memory,
                    ticksToLive: creep.ticksToLive,
                    spawning: creep.spawning,
                    //ticksToSpawn: creep.body.length * 3,
                }

                //this.gameCreeps.push(newCreep);
                if (newCreep.memory.room) {
                    if (!this.gameCreepsByRoom[newCreep.memory.room]) {
                        this.gameCreepsByRoom[newCreep.memory.room] = [];
                    }
                    this.gameCreepsByRoom[newCreep.memory.room].push(newCreep);

                    if (newCreep.memory.role) {
                        if (!this.gameCreepsByRoomByRole[newCreep.memory.room]){
                            this.gameCreepsByRoomByRole[newCreep.memory.room] = {};
                        }
                        if (!this.gameCreepsByRoomByRole[newCreep.memory.room][newCreep.memory.role]) {
                            this.gameCreepsByRoomByRole[newCreep.memory.room][newCreep.memory.role] = [];
                        }
                        this.gameCreepsByRoomByRole[newCreep.memory.room][newCreep.memory.role].push(newCreep);
                    }
                }

                if (newCreep.memory.role && this.groupRoleList.includes(newCreep.memory.role)) {
                    if (!this.gameCreepsByRole[newCreep.memory.role]) {
                        this.gameCreepsByRole[newCreep.memory.role] = [];
                    }
                    this.gameCreepsByRole[newCreep.memory.role].push(newCreep);
                }




            }
            //Object.keys(this.gameCreepsByRoom).forEach(r=>console.log(helpers.getRoomLink(r),this.gameCreepsByRoom[r].length,'creeps'));
            //Object.keys(this.gameCreepsByRoomByRole).forEach(roomName => Object.keys(this.gameCreepsByRoomByRole[roomName]).forEach(role=>console.log(helpers.getRoomLink(roomName),role, this.gameCreepsByRoomByRole[roomName][role].length,'creeps')));
            //Object.keys(this.gameCreepsByRole).forEach(r=>console.log(r,this.gameCreepsByRole[r].length,'creeps'));
            this.gameCreepsTime = Game.time;

            if (1 && Game.shard.name == 'shard2') {
                console.log('<span style="color:red">getGameCreepsCpu</span>', this.gameCreepsCount, (Game.cpu.getUsed() - gameCreepsCpu).toFixed(4));
                //console.log(JSON.stringify(this.gameCreepsByRoomByRole));
            }
        }
        require('profiler').end('getGameCreeps');
        if (roomName) {
            if (creepRole) {
                return this.gameCreepsByRoomByRole[roomName] && this.gameCreepsByRoomByRole[roomName][creepRole] ? this.gameCreepsByRoomByRole[roomName][creepRole] : [];
            }
            return this.gameCreepsByRoom[roomName] ? this.gameCreepsByRoom[roomName] : [];
        } else if (creepRole) {
            if (this.gameCreepsByRole[creepRole]) {
                return this.gameCreepsByRole[creepRole];
            } else if (this.groupRoleList.includes(creepRole)) {
                return [];
            } else {
                Game.notify('gameCreepsByRole not found role '+creepRole);
                return Object.values(Game.creeps);//this.gameCreeps;
            }
        }
        Game.notify('getGameCreeps with no params found!!!!!');
        return Object.values(Game.creeps);//this.gameCreeps;
    },

    getGameCreepsLength: function() {
        // if (!(Game.time == this.gameCreepsTime)) {
        //     console.log('getGameCreepsLength with no cache!!!!');
        // }
        return Game.time == this.gameCreepsTime && this.gameCreepsCount ? this.gameCreepsCount : Object.keys(Game.creeps).length;
        
    },
    lastGameCreepsTime: 0,
    freeMemory: function() {
        if (0 && Game.shard.name == 'shard2' && Game.time === this.gameCreepsTime) {
            let dticks = Game.time - this.lastGameCreepsTime;
            this.lastGameCreepsTime = Game.time;
            console.log('<span style="color:red">getGameCreepsCpu</span>', this.gameCreepsCount, 'dticks',dticks, 'calls: (all, room, role, roomRole)', this.gameCreepsCall, this.gameCreepsByRoomCall, this.gameCreepsByRoleCall, this.gameCreepsByRoomByRoleCall);
            //console.log(JSON.stringify(Object.keys(this.gameCreepsByRole)));
        }
        this.gameCreeps = null;
        this.gameCreepsTime = null;
        this.gameCreepsByRoom = {};
        this.gameCreepsByRoomByRole = {};
        this.gameCreepsCall = 0;
        this.gameCreepsByRoomCall = 0;
        this.gameCreepsByRoomByRoleCall = 0;
        this.gameCreepsByRoleCall = 0;
        this.gameCreepsCount = 0;
    },



    getRoleConfig: function (role, spawn, sector = null) {
        if (role == 'harvester') return roleHarvester.getBody(spawn.name);
        if (role == 'suplier') return roleSuplier.getBody(spawn.name);
        if (role == 'transporter') return roleTransporter.getBody(spawn.name);
        if (role == 'dropper') return roleSuplier.getBody(spawn.name);
        if (role == 'miner') return roleMiner.getBody(spawn.name, sector);
        if (role == 'supertransporter') return roleSuperTransporter.getBody(spawn.name, sector);
        if (role == 'claim') return roleClaim.getBody(spawn.name);
        if (role == 'upgrader') return roleUpgrader.getBody(spawn.name);
        if (role == 'upgrader2') return roleUpgrader.getBody(spawn.name);
        if (role == 'wallbuilder') return roleWallBuilder.getBody(spawn.name);
        if (role == 'superharvester') return roleSuperHarvester.getBody(spawn.name);
        if (role == 'keeper') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL];
        if (role == 'helper') return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
        if (role == 'harvester2') return [MOVE,MOVE,WORK,CARRY,CARRY];
        if (role == 'deposit') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*21,WORK*21,CARRY*8;
        // if (role == 'roomDef') return roleRoomDefender.getBody.melee;
        // if (role == 'roomDefRanged') return roleRoomDefender.getBody.ranged;
        if (role == 'roomDef') return roleRoomDefender.getBody(spawn.name, 'melee');
        if (role == 'roomDefRanged') return roleRoomDefender.getBody(spawn.name, 'ranged');
        //if (role == 'deliver') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*17,CARRY*33
        if (role == 'gclCrane') return roleGclBooster.getGclCraneBody(spawn.room.name);
        if (role == 'gclUpgrader') return roleGclBooster.getGclUpgraderBody(spawn.room.name);
        if (role == 'gclClaimer') return roleGclBooster.getGclClaimerBody;
        if (role == 'settler') return roleSettler.getBody(spawn.room.name);
        if (role == 'man') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*17,CARRY*33

        let roleCreep;
        try {
            roleCreep = require('role.'+role);
        } catch (e) {
            roleCreep = null;
        }
        if (roleCreep) {
            return roleCreep.getBody(spawn.room);
        }
        console.log(role, 'not exist role');
        return [MOVE];
    },

    spawnRoomCreep: function (room, myRoom, freeSpawn) {

        if (room.controller.level == 8) {
            let fillGood = room.energyAvailable/room.energyCapacityAvailable > 0.5;
            room.memory.energyAvaiable = Math.min(Math.max((room.memory.energyAvaiable || 0) + (fillGood?-5:1), 0), 200);
            if (room.memory.energyAvaiable > 150 && !myRoom.creeps['filler']) {
                //console.log('Room',helpers.getRoomLink(room.name), 'extension energy LOW!!');
                myRoom.creeps['filler'] = 1;
            }
        }
        if (room.memory.boostLab && room.memory.boostLab.filler && Game.time < room.memory.boostLab.time) {
            if (!myRoom.creeps['filler'] || myRoom.creeps['filler'] < room.memory.boostLab.filler) {
                myRoom.creeps['filler'] = room.memory.boostLab.filler;
            }
        }
        

        if (1 || Game.shard.name == 'shard3' || Game.shard.name == 'shard2') {
            require('profiler').start('roadRepairerCheck');
            myRoom.creeps['roadRepairer'] = require('role.roadRepairer').getCount(room);
            require('profiler').end('roadRepairerCheck');
        }


        // if (1 && Game.shard.name == 'shardSeason' && Game.time < 172105 +2500 && room.name == 'E13N18') {
        //     myRoom.creeps = {};
        //     myRoom.creeps['roomDef'] = 1;
        //     myRoom.creeps['roomDefRanged'] = 2;
        // }
        
        if (1 || Game.shard.name == 'shard2') {
            myRoom.creeps['harvester'] = 0;
        }

        //check all room creeps
        if (freeSpawn) {
            for(let creepRole in myRoom.creeps) {
                if (freeSpawn && myRoom.creeps[creepRole]) {

                    if (creepRole == 'upgrader' && myRoom.creeps[creepRole] > 2 && (room.controller.level == 8 || ( room.storage && room.storage.store[RESOURCE_ENERGY] < 125000))) {
                        myRoom.creeps[creepRole] = 2;
                    }
                    if (creepRole == 'upgrader' && myRoom.creeps[creepRole] > 1 && (room.controller.level == 8 || ( room.storage && room.storage.store[RESOURCE_ENERGY] < 75000))) {
                        myRoom.creeps[creepRole] = 1;
                    }
                    if (creepRole == 'upgrader2' && room.controller.level == 8) {
                        myRoom.creeps[creepRole] = 0;
                    }

                    if (Game.shard.name == 'shard2' && room.name == 'E43N38' && creepRole == 'wallbuilder'
                        && (room.controller.level < 7 || room.controller.level == 8 || (room.controller.level == 7 && room.controller.progressTotal-room.controller.progress < 1500000))) {
                        myRoom.creeps[creepRole] = 0;
                    }
                    if (Game.shard.name == 'shard2' && room.name == 'E43N38' && creepRole == 'harvester' && myRoom.creeps[creepRole]
                        && (room.controller.level < 7 || room.controller.level == 8 || (room.controller.level == 7 && room.controller.progressTotal-room.controller.progress < 1500000))) {
                        myRoom.creeps[creepRole] = 0;
                    }
                    if (['shard0','shard1','shard2','shard3'].includes(Game.shard.name) && creepRole == 'wallbuilder') {
                        myRoom.creeps[creepRole] = roleWallBuilder.getCount(room, myRoom.creeps[creepRole]);
                    }

                    if (Game.shard.name == 'shard1' && room.name == 'E41N38' && creepRole == 'deliver'){
                        const deliverRoom = Game.rooms['E41N39'];
                        if (deliverRoom && deliverRoom.controller && deliverRoom.controller.level >= 6 && deliverRoom.terminal) {
                            myRoom.creeps[creepRole] = 0;
                        }
                        if (deliverRoom && deliverRoom.storage && deliverRoom.storage.store[RESOURCE_ENERGY] >= 500000) {
                            myRoom.creeps[creepRole] = 0;
                        }
                        if (deliverRoom && deliverRoom.storage && deliverRoom.storage.store[RESOURCE_ENERGY] < 75000 && !myRoom.creeps[creepRole]) {
                            myRoom.creeps[creepRole] = 2;
                        }

                    }
                    if (Game.shard.name == 'shard2' && room.name == 'E44N38' && creepRole == 'deliver'){
                        const deliverRoom = Game.rooms['E43N38'];
                        if (deliverRoom && deliverRoom.controller && deliverRoom.controller.level >= 6 && deliverRoom.terminal) {
                            myRoom.creeps[creepRole] = 0;
                        }
                        if (deliverRoom && deliverRoom.storage && deliverRoom.controller.level < 6 && deliverRoom.storage.store[RESOURCE_ENERGY] >= 1800000) {
                            myRoom.creeps[creepRole] = 0;
                        }
                        // if (deliverRoom && deliverRoom.storage && deliverRoom.controller.level < 6 && deliverRoom.storage.store[RESOURCE_ENERGY] < 1500000 && !myRoom.creeps[creepRole]) {
                        //     myRoom.creeps[creepRole] = 2;
                        // }
                        if (myRoom.creeps[creepRole]) {
                            console.log('deliver !!!!!!!!!!!!!!!!!!!', myRoom.creeps[creepRole]);
                        }

                    }


                    if (!myRoom.creeps[creepRole]) {
                        continue;
                    }

                    //let creepLive = _.filter(this.getGameCreeps(), (creep) =>            creep.memory.room == myRoom.roomName && creep.memory.role == creepRole && creep.memory.sector == undefined && !creep.memory.soonDie && (creep.ticksToLive > 50 || creep.spawning));
                    // let creepLiveLength = this.getGameCreeps(room.name).reduce((a, creep) => a + (creep.memory.room == myRoom.roomName && creep.memory.role == creepRole && creep.memory.sector == undefined && !creep.memory.soonDie && (creep.spawning || creep.ticksToLive > 70)?1:0), 0);
                    // let needSpawn = creepLiveLength < myRoom.creeps[creepRole];

                    //let needSpawn = this.creepLiveCheck(room.name, creepRole, undefined, 70, undefined, myRoom.creeps[creepRole]);
                    let needSpawn = this.creepLiveCustomCheck(room.name, room.name+'_'+creepRole, myRoom.creeps[creepRole],
                        creep => creep.memory.room == room.name && creep.memory.role == creepRole && creep.memory.sector == undefined && !creep.memory.soonDie && (creep.spawning || creep.ticksToLive > 70),
                        creepRole
                    );
                    // if (needSpawn != check) {
                    //     console.log(room.name, needSpawn, check, '!++!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                    // }

                    if(freeSpawn && needSpawn) {
                        let boosts = [];
                        let farsector = undefined;
                        let type = undefined;
                        if (Game.shard.name == 'shard3') {
                            if (creepRole == 'upgrader' && room.controller.level == 8){
                                let boostAmount = _.get(Memory, 'stock.XGH2O',0);
                                if (boostAmount > ((new Date()) >= (new Date('2023-12-01')) ? 30000 : 5100000)) {
                                    boosts = [RESOURCE_CATALYZED_GHODIUM_ACID];
                                } else if (boostAmount > 10000) {
                                    this.checkUnboostAvaiable(room);
                                    if (room.memory.unboostAvaiable) {
                                        boosts = [RESOURCE_CATALYZED_GHODIUM_ACID];
                                    }
                                }
                                //boosts = [RESOURCE_CATALYZED_GHODIUM_ACID];
                            }
                            if (creepRole == 'upgrader' && room.controller.level < 8){
                                boosts = [RESOURCE_CATALYZED_GHODIUM_ACID];
                            }
                            if (creepRole == 'wallbuilder'){
                                boosts = [RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_CATALYZED_LEMERGIUM_ACID];
                            }

                        }

                        if (Game.shard.name == 'shard2') {
                            if (creepRole == 'wallbuilder'){
                                boosts = [RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_CATALYZED_LEMERGIUM_ACID];
                            }

                            if (creepRole == 'upgrader' && room.controller.level < 8){
                                boosts = [RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_GHODIUM_ACID];
                            }
                            if (creepRole == 'upgrader2' && room.controller.level < 8){
                                boosts = [RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_GHODIUM_ACID];
                            }
                            if (creepRole == 'upgrader' && room.controller.level == 8) {
                                let boostAmount = _.get(Memory, 'stock.XGH2O',0);
                                if (boostAmount > ((new Date()) >= (new Date('2023-12-01')) ? 50000 : 5100000)) {
                                    boosts = [RESOURCE_CATALYZED_GHODIUM_ACID];
                                } else if (boostAmount > 50000) {
                                    this.checkUnboostAvaiable(room);
                                    if (room.memory.unboostAvaiable) {
                                        boosts = [RESOURCE_CATALYZED_GHODIUM_ACID];
                                    }
                                }
                            }

                        }
                        if (Game.shard.name == 'shard1') {
                            if (creepRole == 'wallbuilder'){
                                boosts = [RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_CATALYZED_LEMERGIUM_ACID];
                            }
                            if (creepRole == 'upgrader' && room.controller.level < 8){
                                boosts = [RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_GHODIUM_ACID];
                            }
                            if (creepRole == 'upgrader' && room.controller.level == 8 && _.get(Memory, 'stock.XGH2O',0) > 5000){
                                boosts = [RESOURCE_CATALYZED_GHODIUM_ACID];
                            }
                        }

                        if (Game.shard.name == 'shard0') {
                            if (creepRole == 'upgrader' && room.controller.level == 8 && _.get(Memory, 'stock.XGH2O',0) > 20000){
                                boosts = [RESOURCE_CATALYZED_GHODIUM_ACID];
                            }
                            if (creepRole == 'wallbuilder' && room.controller.level < 9){
                                boosts = [RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_CATALYZED_LEMERGIUM_ACID];
                            }
                            if (creepRole == 'upgrader' && room.controller.level < 8){
                                boosts = [RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_GHODIUM_ACID];
                            }
                        }

                        if (creepRole == 'deliver') {
                            boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID];
                        }

                        if (creepRole == 'roomDefRanged') {
                            boosts = [RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
                        }
                        if (creepRole == 'roomDef') {
                            boosts = [RESOURCE_CATALYZED_UTRIUM_ACID];
                        }
                        if (creepRole == 'settler') {
                            let boostsInfo = roleSettler.getBoosts(myRoom.roomName);
                            boosts = boostsInfo.boost;
                            type = boostsInfo.type;
                        }

                        let creepName = 'x'+myRoom.roomName+Game.time;
                        if (creepRole == 'suplier') {
                            creepName = 'xSup'+myRoom.roomName+Game.time;
                        }
                        const result = freeSpawn.spawnCreep( this.getRoleConfig(creepRole, freeSpawn), creepName, {memory: {role: creepRole, room: myRoom.roomName, boosts: boosts, farsector: farsector, type: type}});

                        if (result == OK){
                            freeSpawn = null;
                        } else if (creepRole == 'suplier' && freeSpawn) {
                            //let creepLive = _.filter(this.getGameCreeps(), (creep) =>            creep.memory.room == myRoom.roomName && creep.memory.role == 'helper'  && creep.memory.sector == undefined && (creep.ticksToLive > 50 || creep.spawning));
                            let creepLiveLength = this.getGameCreeps(room.name, 'helper').reduce((a, creep) => a + (creep.memory.room == myRoom.roomName && creep.memory.role == 'helper'  && creep.memory.sector == undefined && (creep.ticksToLive > 18 || creep.spawning)?1:0), 0);
                            if (!creepLiveLength) {
                                freeSpawn.spawnCreep( this.getRoleConfig('helper', freeSpawn), creepName, {memory: {role: 'helper', room: myRoom.roomName}});
                            }
                            freeSpawn = null; //no spawn if suplier not exist!
                        }
                    }

                }
            }
        }
        return freeSpawn;
    },

    // spawnAssaults: function (room, myRoom, freeSpawn, teamAssaults){ //deprecated
    //     return freeSpawn;
    // },

    spawnKeepers: function (room, myRoom, freeSpawn, skRooms) {
        if (myRoom.keepers && freeSpawn){
            for(let sectorIndex in myRoom.keepers) {
                let sector = myRoom.keepers[sectorIndex];
                for(let creepSectorRole in skRooms[sector].creeps) {
                    if (skRooms[sector].creeps[creepSectorRole]) {
                        // let creepLiveLength = this.getGameCreeps(room.name).reduce((a, creep) => a + (creep.memory.role == 'atacker' && creep.memory.type == creepSectorRole && creep.memory.keeperSector == sector && (creep.ticksToLive > 330 || creep.spawning)?1:0), 0);
                        // let needSpawn = creepLiveLength < skRooms[sector].creeps[creepSectorRole];
                        let needSpawn = this.creepLiveCustomCheck(room.name, creepSectorRole+' '+sector, skRooms[sector].creeps[creepSectorRole],
                            creep => creep.memory.role == 'atacker' && creep.memory.type == creepSectorRole && creep.memory.keeperSector == sector && (creep.ticksToLive > 330 || creep.spawning),
                            'atacker'
                        );
                        if (freeSpawn && needSpawn){
                            const result = freeSpawn.spawnCreep( this.getRoleConfig(creepSectorRole, freeSpawn), 'sk'+room.name+'_'+Game.time, {memory: {role: 'atacker', type: creepSectorRole, room: myRoom.roomName, keeperSector:sector, keepRoom: skRooms[sector].roomName}});
                            if (result == OK){
                                freeSpawn = null;
                            } else {
                                freeSpawn = null;
                            }
                        }
                    }
                }
            }
        }
        return freeSpawn;
    },

    spawnPowerHarvester: function (room, myRoom, freeSpawn, powerHarvesting) {
        //check power harvester
        if (freeSpawn) {
            let flagPower = 'FlagPower'+(powerHarvesting[room.name]?(powerHarvesting[room.name].sector?powerHarvesting[room.name].sector:''):'');
            if (1 && powerHarvesting[room.name] && room.memory.powerRoomIndex == -1 && Game.flags[flagPower] && room.memory.power && room.memory.power.id && room.memory.power.room && room.memory.power.power && room.memory.droppedPowerId == undefined) {
                // let creepLive =       _.filter(this.getGameCreeps(room.name, 'atacker'), (creep) => creep.memory.role == 'atacker' && (creep.memory.type == 'power') && creep.memory.sector == powerHarvesting[room.name].sector && (creep.ticksToLive > 550 || creep.spawning || creep.memory.lastSpawn));
                // let creepLastSpawn =  _.filter(this.getGameCreeps(room.name, 'atacker'), (creep) => creep.memory.role == 'atacker' && (creep.memory.type == 'power') && creep.memory.sector == powerHarvesting[room.name].sector &&  creep.memory.lastSpawn);
                // let creepAtacker =    _.filter(creepLive, (creep) => !creep.memory.atackerId );
                // let creepAtackerNew = _.filter(creepLive, (creep) => !creep.memory.atackerId && (creep.ticksToLive > 1000 || creep.spawning));
                let creepLive =       this.getGameCreeps(room.name, 'atacker').filter((creep) => creep.memory.role == 'atacker' && (creep.memory.type == 'power') && creep.memory.sector == powerHarvesting[room.name].sector && (creep.ticksToLive > 550 || creep.spawning || creep.memory.lastSpawn));
                let creepLastSpawn =  this.getGameCreeps(room.name, 'atacker').filter((creep) => creep.memory.role == 'atacker' && (creep.memory.type == 'power') && creep.memory.sector == powerHarvesting[room.name].sector &&  creep.memory.lastSpawn);
                let creepAtacker =    creepLive.filter((creep) => !creep.memory.atackerId );
                let creepAtackerNew = creepLive.filter((creep) => !creep.memory.atackerId && (creep.ticksToLive > 1000 || creep.spawning));

                let bank = Game.getObjectById(room.memory.power.id);
                if (freeSpawn && creepLive.length < 3 && !creepLastSpawn.length) {
                    let body = null;
                    let atackerId = 0;
                    if (!creepAtacker.length) {
                        body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]; //MOVE*16,ATTACK*32
                    } else if (creepAtackerNew.length){
                        body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]; //MOVE*10,HEAL*20
                        atackerId = creepAtackerNew[0].id;
                    }
                    if (body){
                        const result = freeSpawn.spawnCreep(body, 'ph_'+room.name+'_'+Game.time, {memory: {role: 'atacker', type: 'power', sector: powerHarvesting[room.name].sector, powerId: room.memory.power.id, powerRoom: room.memory.power.room, room: room.name, atackerId: atackerId}});
                        if (result == OK){
                            freeSpawn = null;
                        }
                    }
                } else if (freeSpawn && (creepLive.length >= 3 || creepLastSpawn.length) && bank && bank.hits<400000) {
                    // let creepLive = _.filter(this.getGameCreeps(room.name, 'atacker'), (creep) => creep.memory.role == 'atacker' && creep.memory.type == 'powertransporter' && creep.memory.sector == powerHarvesting[room.name].sector);
                    let creepLive = this.getGameCreeps(room.name, 'atacker').filter((creep) => creep.memory.role == 'atacker' && creep.memory.type == 'powertransporter' && creep.memory.sector == powerHarvesting[room.name].sector);
                    if (freeSpawn && creepLive.length <  room.memory.power.power/1600) {
                        let body =
                            [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                                CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,]; //MOVE*16,CARRY*32
                        const result = freeSpawn.spawnCreep( body, 'pt_'+room.name+'_'+Game.time, {memory: {role: 'atacker', type: 'powertransporter', sector: powerHarvesting[room.name].sector, powerId: room.memory.power.id, powerRoom: room.memory.power.room, room: room.name}});
                        if (result == OK){
                            freeSpawn = null;
                        }
                    }
                }
            }
        }
        return freeSpawn;
    },

    spawnAtackers: function(room, myRoom, freeSpawn, sectorAttackers) {
        if (freeSpawn) {
            for(let creepAtackerRole in sectorAttackers[myRoom.atack_sector].creeps) {
                if (sectorAttackers[myRoom.atack_sector].creeps[creepAtackerRole]) {
                    //let creepLive = _.filter(this.getGameCreeps(), (creep) =>            creep.memory.role == creepAtackerRole && creep.memory.sector == myRoom.atack_sector && creep.memory.type == undefined && (creep.ticksToLive > 100 || creep.spawning));
                    // let creepLiveLength = this.getGameCreeps().reduce((a, creep) => a + (creep.memory.role == creepAtackerRole && creep.memory.sector == myRoom.atack_sector && creep.memory.type == undefined && (creep.ticksToLive > 100 || creep.spawning)?1:0), 0);
                    // let needSpawn = creepLiveLength < sectorAttackers[myRoom.atack_sector].creeps[creepAtackerRole];

                    let needSpawn = this.creepLiveCustomCheck(room.name, creepAtackerRole+'_'+myRoom.atack_sector+'_notype', sectorAttackers[myRoom.atack_sector].creeps[creepAtackerRole],
                        creep => creep.memory.role == creepAtackerRole && creep.memory.sector == myRoom.atack_sector && creep.memory.type == undefined && (creep.ticksToLive > 100 || creep.spawning),
                        creepAtackerRole
                    );

                    if (freeSpawn && needSpawn){
                        let body = [];
                        let namePrefix = 'a_';
                        if (creepAtackerRole == 'hunter') {
                            body = roleHunter.getBody(room.name);
                            namePrefix += 'ht';
                        } else {
                            body = roleAtacker.getBody(freeSpawn.name, myRoom.atack_sector);//this.getGameCreeps(undefined, creepAtackerRole));
                        }
                        const result = freeSpawn.spawnCreep( body, namePrefix+room.name+'_'+Game.time, {memory: {role: creepAtackerRole, room: myRoom.roomName, sector:myRoom.atack_sector}});
                        if (result == OK){
                            freeSpawn = null;
                        }
                    }
                }
            }
        }
        return freeSpawn;
    },

    spawnSectorsCreep: function(room, myRoom, freeSpawn, sectorCreeps) {
        if (freeSpawn) {
            //check all sector creeps
            for(let sectorIndex in myRoom.sector) {
                let sector = myRoom.sector[sectorIndex];
                for(let creepSectorRole in sectorCreeps[sector].creeps) {
                    if (creepSectorRole == 'claim') {
                        continue;
                    }
                    if (freeSpawn && sectorCreeps[sector].creeps[creepSectorRole]) {
                        // let creepLiveLength = this.getGameCreeps(room.name).reduce((a, creep) => a + (creep.memory.role == creepSectorRole && creep.memory.sector == sector && !creep.memory.soonDie && (creep.ticksToLive > 50 || creep.spawning)?1:0), 0);
                        // let needSpawn = creepLiveLength < sectorCreeps[sector].creeps[creepSectorRole];
                        // let needSpawn = this.creepLiveCheck(room.name, creepSectorRole, sector, 50, undefined, sectorCreeps[sector].creeps[creepSectorRole]);
                        let needSpawn = this.creepLiveCustomCheck(room.name, room.name+'_'+creepSectorRole+'_'+sector,sectorCreeps[sector].creeps[creepSectorRole],
                            creep => (creep.memory.role == creepSectorRole && creep.memory.sector == sector && !creep.memory.soonDie && (creep.ticksToLive > 50 || creep.spawning)),
                            creepSectorRole
                        );
                        if (freeSpawn && needSpawn){
                            const result = freeSpawn.spawnCreep( this.getRoleConfig(creepSectorRole, freeSpawn, sector), 's_'+room.name+'_'+Game.time, {memory: {role: creepSectorRole, room: myRoom.roomName, sector:sector}});
                            if (result == OK){
                                freeSpawn = null;
                            }
                        }
                    }
                }
            }
        }
        return freeSpawn;
    },

    spawnPriority: 0, //0 - spawn now
    spawnCreep: function (spawn, body, name, options) {
        if (!this.spawnPriority) {
            return spawn._spawnCreep(body, name, options);
        }
        name = name.replace('_'+Game.time, '');
        this.addSpawnQueue(spawn.room, {body:body, name:name, options:options});
        return SPAWN_QUEUED;
    },
    spawnData: {},
    spawnQueueEmpty: function(room) {
        return !this.spawnData[room.name] || !this.spawnData[room.name].spawnQueue.length;
    },
    addSpawnQueue: function(room, spawnInfo) {
        if (!this.spawnData[room.name]) {
            this.spawnData[room.name] = {spawnQueue: [], spawnNeedEnergy: 0, spawnNeedEnergyPriority: 0};
        } else {
            this.spawnData[room.name].spawnNeedEnergy = 0;
            this.spawnData[room.name].spawnNeedEnergyPriority = 0;
        }
        let needEnergy = spawnInfo.body.reduce((a,body)=>a+=BODYPART_COST[body], 0);
        this.spawnData[room.name].spawnQueue.push(require('fastest-json-copy').copy({time: Game.time, spawnInfo: spawnInfo, priority: this.spawnPriority, needEnergy:needEnergy}));
    },
    spawnFromQueue: function(room) {
        if (this.spawnQueueEmpty(room)) {
            return ERR_NOT_FOUND;
        }
        this.spawnQueueVisual(room);
        if (this.spawnData[room.name].spawnNeedEnergy > room.energyAvailable) {
            return ERR_NOT_ENOUGH_ENERGY;
        }

        let spawns = room.find(FIND_MY_STRUCTURES, {filter: struct => struct.structureType == STRUCTURE_SPAWN && !struct.spawning});
        if (!spawns.length) {
            return ERR_BUSY;
        }

        let priority = this.spawnData[room.name].spawnQueue[0].priority;
        let pos = 0;
        this.spawnData[room.name].spawnQueue.forEach((val, index) => {
            if (val.priority < priority) {
                priority = val.priority;
                pos = index;
            }
        });
        if (this.spawnData[room.name].spawnQueue[pos].needEnergy > room.energyAvailable) {
            this.spawnData[room.name].spawnNeedEnergy = this.spawnData[room.name].spawnQueue[pos].needEnergy;
            this.spawnData[room.name].spawnNeedEnergyPriority = priority;
            return ERR_NOT_ENOUGH_ENERGY;
        }
        let spawnIndex = 0;
        let spawnInfo = this.spawnData[room.name].spawnQueue[pos].spawnInfo;
        let res = spawns[spawnIndex]._spawnCreep(spawnInfo.body, spawnInfo.name+'_'+Game.time+'_'+spawnIndex, spawnInfo.options);
        if (res == OK) {
            this.spawnData[room.name].spawnQueue.splice(pos, 1);
            this.spawnData[room.name].spawnNeedEnergy = 0;
            this.spawnData[room.name].spawnNeedEnergyPriority = 0;
            room.memory.spawnBusyTick = Game.time;
        }
        return res;
    },

    spawnQueueVisual: function(room) {
        let text = 'Spawn Queue '+room.energyAvailable;
        let line = 20;
        room.visual.text(text ,0 + 0.1, (line++)+0.1, {align: 'left', opacity: 0.8, color: '#00DD00'})
        if (!this.spawnQueueEmpty(room)) {
            this.spawnData[room.name].spawnQueue.forEach((info,i) => {
                let role = _.get(info,'spawnInfo.options.memory.role', 'unknown');
                let priority = _.get(info,'priority', '-');
                let energy = _.get(info,'needEnergy', '-');
                text = i+' '+role+' '+priority+' '+energy;
                room.visual.text(text ,0 + 0.1, (line++)+0.1, {align: 'left', opacity: 0.8, color: '#00DD00'});
            })
        }

    },


    creepLiveData: {},
    creepLiveCheck: function(roomName, role, sector, ticksToLive, type, count) { //return need spawn
        if (!count) return false; //no spawn
        let memPath = roomName +'.'+role+(type?type:'')+'.'+(sector?sector:'local');
        let creepsLiveIds = _.get(this.creepLiveData, memPath, null);
        const checkFunction = (creep) => creep.memory.room == roomName && creep.memory.role == role && creep.memory.sector == sector && creep.memory.type == type && !creep.memory.soonDie && (creep.spawning || creep.ticksToLive > ticksToLive);
        if (creepsLiveIds && creepsLiveIds.length) {
            let creepLive = [];
            creepsLiveIds.some(id => {
                let creep = Game.getObjectById(id);
                if (creep && checkFunction(creep)) {
                    creepLive.push(creep);
                } else {
                    return true; //break
                }
            });
            if (creepsLiveIds.length == creepLive.length  && creepLive.length >= count) { // _.filter(creepLive, checkFunction).length >= count) {
                //console.log(helpers.getRoomLink(roomName), role, sector, ticksToLive, 'CACHE CHECK', count);
                return false;
            }
            _.set(this.creepLiveData, memPath, undefined);
        }
        let creepsLive = _.filter(this.getGameCreeps(roomName), checkFunction);
        if (creepsLive.length < count) {
            //console.log(helpers.getRoomLink(roomName), role, sector, ticksToLive, '<span style="color:red">NO CACHE CHECK TRUE</span>', count);
            return true;
        }
        creepsLiveIds = creepsLive.map(creep => creep.id);
        _.set(this.creepLiveData, memPath, creepsLiveIds);
        //console.log(helpers.getRoomLink(roomName), role, sector, ticksToLive, '<span style="color:cyan">NO CACHE CHECK FALSE</span>', count);
        return false;
    },
    countCreep: function(creeps, expireFunc) {
        return creeps.reduce((a, creep) => a + (expireFunc(creep)?1:0), 0);
    },

    creepLiveCustomData: {},
    creepLiveCustomCheck: function(roomName, path, count, expireFunc, creepRole = undefined) {
        if (!count) return false; //no spawn
        if (0 && Game.shard.name == 'shard2') { //no cahce!!!!!!!!!!!!!!!!!!!!!!!!! 
            return this.countCreep(this.getGameCreeps(roomName, creepRole), expireFunc) < count;
            // return _.filter(this.getGameCreeps(roomName, creepRole), expireFunc).length < count;
        }
        
        
        let creepsLiveIds = this.creepLiveCustomData[path];
        if (creepsLiveIds && creepsLiveIds.length && creepsLiveIds.length >= count) {
            let isCacheBroken = creepsLiveIds.some(id => {
                let creep = Game.getObjectById(id);
                if (!creep || !expireFunc(creep)) {
                    return true; //break
                }
            });
            if (!isCacheBroken) {
                //console.log(helpers.getRoomLink(roomName), path, 'CACHE CHECK', count);
                return false; //no spawn
            }
        }
        //let creepsLive = _.filter(this.getGameCreeps(roomName, creepRole), expireFunc);
        let creepsLive = this.getGameCreeps(roomName, creepRole).filter(expireFunc);
        if (creepsLive.length < count) {
            //console.log(helpers.getRoomLink(roomName), path, '<span style="color:red">NO CACHE CHECK TRUE</span>', count, creepsLive.length);
            this.creepLiveCustomData[path] = undefined;
            return true; //need spawn
        }
        this.creepLiveCustomData[path] = creepsLive.map(creep => creep.id);
        //console.log(helpers.getRoomLink(roomName), path, '<span style="color:cyan">NO CACHE CHECK FALSE</span>', count, creepsLive.length);
        return false; //no spawn
    },
    creepLiveCustomCount: function(path) {
        return this.creepLiveCustomData[path]?this.creepLiveCustomData[path].length:0
    },
    
    
    checkUnboostAvaiable: function(room) {
        if (room.memory.unboostAvaiable == undefined || Game.time > room.memory.unboostAvaiableTime + 300) {
            room.memory.unboostAvaiable = 0;
            room.memory.unboostAvaiableTime = Game.time;
            const labContainerCoord = _.get(Memory, 'labs.rooms.'+room.name+'.labContainerPos', 0);
            const labsIndexArray = _.get(Memory, 'labs.rooms.'+room.name+'.labSet.in', []);
            if (labContainerCoord && labsIndexArray.length) {
                const labContainerPos = new RoomPosition(labContainerCoord.x, labContainerCoord.y, labContainerCoord.roomName);
                //const containerPresent =  _.filter(labContainerPos.lookFor(LOOK_STRUCTURES), {structureType: STRUCTURE_CONTAINER}).length;
                const containerPresent =  labContainerPos.lookFor(LOOK_STRUCTURES).some(s=>s.structureType ==  STRUCTURE_CONTAINER);
                const labs = room.find(FIND_STRUCTURES).filter(s=>s.structureType == STRUCTURE_LAB);
                // const freeLabs = _.filter(labs, (lab,index) =>  labsIndexArray.includes(index) && (!lab.cooldown || lab.cooldown < 1500));
                const freeLabs = labs.filter((lab,index) =>  labsIndexArray.includes(index) && (!lab.cooldown || lab.cooldown < 1500));
                let freeLabsCount = freeLabs.length;
                let zeroLab = 0;
                if (labsIndexArray.includes(zeroLab)) zeroLab++;
                if (labsIndexArray.includes(zeroLab)) zeroLab++;
                if (labs.length>zeroLab && !labs[zeroLab].cooldown && labs[zeroLab].pos.isNearTo(labContainerPos)) {
                    freeLabsCount++;
                }
                const alreadyBoostedUpgrader = room.find(FIND_MY_CREEPS, {filter: c=>(c.memory.role == 'upgrader' || c.name.startsWith('tsr_up_')) && _.some(c.body, {boost: RESOURCE_CATALYZED_GHODIUM_ACID})}).length;
                if ((freeLabsCount - (alreadyBoostedUpgrader?1:0)) >= 1 && containerPresent) {
                    room.memory.unboostAvaiable = 1;
                }
            }
        }
        return room.memory.unboostAvaiable;
    },

};
module.exports = spawnHelper;

if (0 && Game.shard.name == 'shard3') {
    StructureSpawn.prototype._spawnCreep = StructureSpawn.prototype.spawnCreep;

    StructureSpawn.prototype.spawnCreep = function (body, name, options) {
        return spawnHelper.spawnCreep(this, body, name, options);
        // let result = this._spawnCreep(body, name, options);
        // return result;
    }
}