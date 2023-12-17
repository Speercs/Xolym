var helpers = require('helpers');

var roleSettler = {
    getBody: function(roomName) {
        let room = Game.rooms[roomName];
        if (!room) {
            return [WORK, CARRY, MOVE, MOVE];        
        }
        let cap = room.energyCapacityAvailable;
        
        if (cap >= 3350)return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];//MOVE*17,WORK*17,CARRY*16
        if (cap >= 2700)return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*14,WORK*12,CARRY*16
        if (cap >= 2150)return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*11,WORK*10,CARRY*12
        if (cap >= 1800)return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*10,WORK*7,CARRY*12
        //if (cap >= 1350)return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*7,WORK*6,CARRY*8
        if (cap >= 1300)return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]; //MOVE*7,WORK*7,CARRY*5
        // if (cap >= 1000)return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
        // if (cap >= 950) return [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
        // if (cap >= 900) return [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
        // if (cap >= 850) return [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
        if (cap >= 800) return [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,];
        // if (cap >= 750) return [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY];
        // if (cap >= 700) return [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
        // if (cap >= 650) return [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        // if (cap >= 600) return [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        //if (cap >= 550) return [MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY,CARRY];
        if (cap >= 550) return [MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY];
        if (cap >= 500) return [MOVE,MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY];
        if (cap >= 450) return [MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY];
        if (cap >= 400) return [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        //if (cap >= 350) return [WORK,CARRY,CARRY,CARRY,MOVE,MOVE];
        if (cap >= 300) return [WORK,CARRY,CARRY,MOVE,MOVE];
        //if (cap >= 300) return [WORK,WORK,CARRY,MOVE];

        // return [
        // WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        // CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
        // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        // ];
        
    },
    getBoosts: function(roomName) {
        const farTarget = this.getFarTarget(roomName);
        if (farTarget && Memory.rooms[farTarget] && Memory.rooms[farTarget].boostBuilder) {
            return {type: 'builder', boost: [RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_LEMERGIUM_HYDRIDE]};
        }
        return {type: 'upgrader', boost: [RESOURCE_CATALYZED_GHODIUM_ACID]};
        // return [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_KEANIUM_ACID];
        // return [RESOURCE_CATALYZED_GHODIUM_ACID];    
        
    },
    creepLevelInfoSelfSettlers: {
        0: {settler:0, massRangers:0, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
        1: {settler:6, massRangers:0, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
        2: {settler:5, massRangers:1, creeps: {suplier: 1, miner: 2, transporter: 4, upgrader: 0, wallbuilder: 0, harvester: 0,}},
        3: {settler:4, massRangers:0, creeps: {suplier: 1, miner: 2, transporter: 4, upgrader: 0, wallbuilder: 1, harvester: 0,}}, 
        4: {settler:1, massRangers:3, creeps: {suplier: 1, miner: 2, transporter: 2, upgrader: 3, wallbuilder: 1, harvester: 0,}},
        5: {settler:0, massRangers:0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 3, wallbuilder: 1, harvester: 0,}},
        6: {settler:0, massRangers:0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 3, wallbuilder: 1, harvester: 1,}},
        7: {settler:0, massRangers:0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 3, wallbuilder: 2, harvester: 1,}},
        8: {settler:0, massRangers:0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 3, wallbuilder: 2, harvester: 1,}}, 
    },
    
    // creepLevelInfoSelfSettlers: {
    //     0: {settler:0, massRangers:0, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
    //     1: {settler:0, massRangers:0, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
    //     2: {settler:0, massRangers:0, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
    //     3: {settler:0, massRangers:0, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
    //     4: {settler:0, massRangers:0, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
    //     5: {settler:0, massRangers:0, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
    //     6: {settler:0, massRangers:0, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
    //     7: {settler:0, massRangers:0, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
    //     8: {settler:0, massRangers:0, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
    // },
    
    creepLevelInfo: {
        0: {settler:3, massRangers:1, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
        1: {settler:3, massRangers:5, creeps: {suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
        2: {settler:4, massRangers:6, creeps: {suplier: 1, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0,}},
        3: {settler:4, massRangers:6, creeps: {suplier: 1, miner: 2, transporter: 4, upgrader: 0, wallbuilder: 1, harvester: 0,}},
        4: {settler:4, massRangers:6, creeps: {suplier: 1, miner: 2, transporter: 2, upgrader: 1, wallbuilder: 1, harvester: 0,}},
        5: {settler:4, massRangers:6, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 3, wallbuilder: 1, harvester: 0,}},
        6: {settler:4, massRangers:6, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 3, wallbuilder: 1, harvester: 1,}},
        7: {settler:0, massRangers:0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 3, wallbuilder: 2, harvester: 1,}},
        8: {settler:0, massRangers:0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 3, wallbuilder: 2, harvester: 1,}}, 
    },
    
  
    
    roomInfo: {
        'shard3': { 
            
            
        },
        'shard2': { 
            
            'E53N21_': {  
                flag: 'Flag115',
                spawnSettlerRoom: 'E55N21',
                spawnRangerRooms: ['E55N21','E49N22'],
                soonDie: 350,
                // clearRoom: 1,
                // clearNoEnergyRoom: 1,
                // warningMove: 1,
                sources: [
                      {id:'59f1a69182100e1594f402e5', flag: 'Flag114', oneSide: 1},
                      {id:'59f1a69182100e1594f402e3', flag: 'Flag114', oneSide: 0},
                ],
                manTargets: [
                    // '5aff9d6e597c1d6ad800ca5f',
                ],
                buildOrders: {
                     0: {
                        // "container":{"pos":[{"x":36,"y":35},{"x":37,"y":28},{"x":16,"y":19}]},
                        // "road":{"pos":[{"x":39,"y":28},{"x":38,"y":29},{"x":38,"y":27},{"x":37,"y":28},{"x":36,"y":28},{"x":35,"y":27},{"x":34,"y":26},{"x":38,"y":30},{"x":37,"y":31},{"x":36,"y":31},{"x":35,"y":30},{"x":35,"y":29},{"x":34,"y":29},{"x":33,"y":28},{"x":34,"y":31},{"x":34,"y":32},{"x":35,"y":32},{"x":36,"y":33},{"x":36,"y":34},{"x":35,"y":35},{"x":34,"y":36},{"x":33,"y":35},{"x":32,"y":34},{"x":33,"y":33},{"x":37,"y":32},{"x":32,"y":27},{"x":31,"y":26},{"x":30,"y":26},{"x":29,"y":25},{"x":28,"y":24},{"x":27,"y":23},{"x":26,"y":22},{"x":26,"y":21},{"x":26,"y":20},{"x":26,"y":19},{"x":26,"y":18},{"x":26,"y":17},{"x":25,"y":16},{"x":24,"y":15},{"x":23,"y":14},{"x":22,"y":13},{"x":17,"y":18},{"x":18,"y":17},{"x":19,"y":16},{"x":20,"y":15},{"x":21,"y":14},{"x":29,"y":33},{"x":30,"y":34},{"x":31,"y":35},{"x":33,"y":37},{"x":32,"y":38},{"x":31,"y":37},{"x":30,"y":36},{"x":29,"y":37}]},
                      },
                     5: { 
                          "road":{"pos":[{"x":39,"y":28},{"x":38,"y":29},{"x":38,"y":27},{"x":37,"y":28},{"x":36,"y":28},{"x":35,"y":27},{"x":34,"y":26},{"x":38,"y":30},{"x":37,"y":31},{"x":36,"y":31},{"x":35,"y":30},{"x":35,"y":29},{"x":34,"y":29},{"x":33,"y":28},{"x":34,"y":31},{"x":34,"y":32},{"x":35,"y":32},{"x":36,"y":33},{"x":36,"y":34},{"x":35,"y":35},{"x":34,"y":36},{"x":33,"y":35},{"x":32,"y":34},{"x":33,"y":33},{"x":37,"y":32},{"x":32,"y":27},{"x":31,"y":26},{"x":30,"y":26},{"x":29,"y":25},{"x":28,"y":24},{"x":27,"y":23},{"x":26,"y":22},{"x":26,"y":21},{"x":26,"y":20},{"x":26,"y":19},{"x":26,"y":18},{"x":26,"y":17},{"x":25,"y":16},{"x":24,"y":15},{"x":23,"y":14},{"x":22,"y":13},{"x":17,"y":18},{"x":18,"y":17},{"x":19,"y":16},{"x":20,"y":15},{"x":21,"y":14},{"x":29,"y":33},{"x":30,"y":34},{"x":31,"y":35},{"x":33,"y":37},{"x":32,"y":38},{"x":31,"y":37},{"x":30,"y":36},{"x":29,"y":37},{"x":28,"y":38},{"x":29,"y":39},{"x":31,"y":39},{"x":27,"y":37},{"x":28,"y":36},{"x":27,"y":35},{"x":28,"y":34},{"x":26,"y":34},{"x":25,"y":33},{"x":25,"y":35},{"x":24,"y":36},{"x":23,"y":35},{"x":23,"y":37},{"x":25,"y":37},{"x":26,"y":38},{"x":32,"y":26},{"x":33,"y":25},{"x":37,"y":27},{"x":37,"y":26},{"x":36,"y":25}]},
                     },
                },
                rampartsHpLevelInfo: {
                    4: 250000,
                    5: 1000000,
                    6: 3000000,
                },
                info:{"name":"E53N21","world":"mmo","shard":"shard2","rcl":8,"buildings":{
                    "spawn":{"pos":[{"x":34,"y":30},{"x":35,"y":31},{"x":36,"y":32}]},
                    "tower":{"pos":[{"x":35,"y":33},{"x":34,"y":33},{"x":34,"y":34},{"x":31,"y":28},{"x":32,"y":28},{"x":32,"y":29}]},
                    "link":{"pos":[{"x":36,"y":29},{"x":15,"y":20},{"x":35,"y":34}]},
                    "storage":{"pos":[{"x":38,"y":28}]},
                    "terminal":{"pos":[{"x":36,"y":30}]},
                    "extension":{"pos":[{"x":33,"y":29},{"x":33,"y":31},{"x":32,"y":32},{"x":32,"y":33},{"x":31,"y":33},{"x":33,"y":34},{"x":32,"y":35},{"x":31,"y":36},{"x":32,"y":36},{"x":33,"y":36},{"x":31,"y":34},{"x":30,"y":33},{"x":30,"y":35},{"x":29,"y":36},{"x":29,"y":35},{"x":29,"y":34},{"x":30,"y":37},{"x":29,"y":38},{"x":30,"y":38},{"x":31,"y":38},{"x":33,"y":38},{"x":34,"y":37},{"x":35,"y":36},{"x":32,"y":37},{"x":37,"y":34},{"x":34,"y":35},{"x":38,"y":32},{"x":28,"y":35},{"x":28,"y":33},{"x":27,"y":34},{"x":26,"y":33},{"x":26,"y":35},{"x":27,"y":36},{"x":26,"y":36},{"x":26,"y":37},{"x":28,"y":37},{"x":28,"y":39},{"x":27,"y":38},{"x":33,"y":30},{"x":27,"y":33},{"x":32,"y":39},{"x":25,"y":34},{"x":24,"y":33},{"x":24,"y":34},{"x":24,"y":35},{"x":25,"y":36},{"x":24,"y":37},{"x":25,"y":32},{"x":33,"y":32},{"x":38,"y":31},{"x":37,"y":33},{"x":30,"y":39},{"x":23,"y":34},{"x":23,"y":38},{"x":23,"y":36},{"x":31,"y":27},{"x":22,"y":36},{"x":22,"y":35},{"x":22,"y":37},{"x":24,"y":38}]},
                    "lab":{"pos":[{"x":36,"y":27},{"x":36,"y":26},{"x":35,"y":26},{"x":35,"y":28},{"x":34,"y":28},{"x":34,"y":27},{"x":33,"y":27},{"x":33,"y":26},{"x":34,"y":25},{"x":35,"y":25}]},
                    "extractor":{"pos":[{"x":30,"y":20}]},
                    "factory":{"pos":[{"x":37,"y":30}]},
                    "observer":{"pos":[{"x":42,"y":25}]},
                    "powerSpawn":{"pos":[{"x":39,"y":30}]},
                    "nuker":{"pos":[{"x":40,"y":27}]},
                    "rampart":{"pos":[{"x":31,"y":40},{"x":30,"y":40},{"x":29,"y":40},{"x":32,"y":40},{"x":34,"y":24},{"x":35,"y":24},{"x":33,"y":24},{"x":40,"y":25},{"x":41,"y":25},{"x":42,"y":25},{"x":21,"y":34},{"x":22,"y":34},{"x":22,"y":33},{"x":23,"y":33},{"x":23,"y":32},{"x":24,"y":32},{"x":24,"y":31},{"x":24,"y":39},{"x":23,"y":39},{"x":22,"y":39},{"x":30,"y":26},{"x":30,"y":27}]},
                    
                    
                }}
            },
            

            
            
            
        },
        
        
        'shard0': {
            
            
            
            
            
        },
        'XOLYM-COMP': {
            'W7N3': {
                flag: 'Flag1',
                spawnSettlerRoom: 'W7N3',
                //spawnRangerRooms: ['E55N31'],
                soonDie: 10,
                sources: [
                  {id:'9263077296e02bb', flag: 'Flag1', oneSide: 1},
                  {id:'c12d077296e6ac9', flag: 'Flag1'},
                  ],
                manTargets: [
                    //'b68640b502bc10c', 
                    ],
                buildOrders: {
                    2: {
                      [STRUCTURE_EXTENSION]: {pos: [{"x":43,"y":7},{"x":43,"y":8},{"x":42,"y":8},{"x":41,"y":9},{"x":40,"y":10},]},
                      [STRUCTURE_CONTAINER]: {pos: [{"x":37,"y":7},{"x":41,"y":4},{"x":34,"y":15},]},
                      [STRUCTURE_ROAD]: {pos: [{"x":34,"y":13},{"x":35,"y":12},{"x":36,"y":11},{"x":37,"y":10},{"x":38,"y":9},{"x":39,"y":8},{"x":40,"y":7},{"x":41,"y":6},{"x":42,"y":5},]},
                      },
                    3: {
                      [STRUCTURE_TOWER]: {pos: [{"x":38,"y":11}]},
                      [STRUCTURE_EXTENSION]: {pos: [{"x":31,"y":10},{"x":31,"y":9},{"x":32,"y":9},{"x":33,"y":8},{"x":33,"y":7},]},
                      },
                  4: {
                        [STRUCTURE_STORAGE]: {pos: [{"x":33,"y":17}]},  
                  },
                },
                rampartsHpLevelInfo: {
                    4: 150000,
                    // 5: 1000000,
                    // 6: 3000000,
                },
            }, 
            
        },
        //add Room in shard.cfg and fill this structure
    },
    

    
    rampartsHpLevelInfo: {
        4: 250000,
        5: 1000000,
        6: 3000000,
    }, 
    
    getFarTarget: function(roomName) {
        if (Memory.rooms[roomName]  && Memory.rooms[roomName].settler) {
            return Memory.rooms[roomName].settler.farTarget;
        }
        return '';
    },
    getSettlersCount: function(roomName) {
        if (Memory.rooms && Memory.rooms[roomName]  && Memory.rooms[roomName].settler) {
            let settlersCount = Memory.rooms[roomName].settler.count;
            if (!(Game.time%50) && !settlersCount) {
                delete Memory.rooms[roomName].settler;
            }
            //console.log('getSettlersCount',roomName, settlersCount);
            return settlersCount;
        }
        return 0;
    },
    settleRoom: function(roomName) {
        let homeRoomName = _.get(this.roomInfo, '['+Game.shard.name+']['+roomName+'].spawnSettlerRoom');
        if (homeRoomName) {
            let warningMove = _.get(this.roomInfo, '['+Game.shard.name+']['+roomName+'].warningMove', 0);
            console.log('claimRoomTasks['+homeRoomName+']['+roomName+']');
            _.set(Memory, 'claimRoomTasks['+homeRoomName+']['+roomName+']', {x: 25 , y:25, reserved: 0, time: Game.time, claimRoom: 1, warningMove: warningMove})
            //Memory.claimRoomTasks[homeRoomName][roomName] = {x: 25 , y:25, reserved: 0, time: Game.time, claimRoom: 1};
            
            if (!Memory.rooms[homeRoomName].settleLabBoosted || Game.time + 100000 > Memory.rooms[homeRoomName].settleLabBoosted) {
                let boosts = [RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_LEMERGIUM_ACID];
                if (_.get(Memory, 'rooms['+homeRoomName+'].labsInfo', []).filter(x => boosts.includes(x)).length != boosts.length){
                    if (Memory.rooms[homeRoomName].boostLab) {
                        Game.notify('Settlers boost Lab incomplete. Boosted Already in room '+homeRoomName + ' ' +JSON.stringify(Memory.rooms[homeRoomName].boostLab));
                    } else {
                        Memory.rooms[homeRoomName].boostLab = {boosts: boosts, time:Game.time + 100000, settler: 1};    
                    }
                }
                Memory.rooms[homeRoomName].settleLabBoosted = Game.time; 
            }
        }
    },
    clone: function(object) {
        return require('fastest-json-copy').copy(object);
    },
    roomManage: function(roomName, roomInfo, teamMassRangers) {
        if (!Memory.rooms) return;
        
        ///* 12*/{roomName: 'E52N32', sector: [61,62,63,64], massRanger_team: 0,atack_sector: 13, assault_team: 0, lab:16, factory: 12, creeps: {suplier: 1, miner: 2, transporter: 1, dropper: 0, upgrader: 1, wallbuilder: 2, harvester: 1,settler: roleSettler.getSettlersCount('E52N32')},keepers: []},  
        //2: {id: 2, creeps: {massRanger: roleMassRanger.getRangerCount(2)}, },
        
        if (roomInfo) {
            let settlersCount = this.getSettlersCount(roomName);
            if (settlersCount) {
                if (!roomInfo.creeps) {roomInfo.creeps = {};}
                roomInfo.creeps.settler = this.getSettlersCount(roomName);    
            }
            if (!(Game.time%100) && !roomInfo.creeps.settler && Memory.rooms[roomName] && Memory.rooms[roomName].boostLab && Memory.rooms[roomName].boostLab.settler) {
                Memory.rooms[roomName].boostLab.time = Game.time;
            }
            //console.log(JSON.stringify(roomInfo));
            
            if (Memory.rooms[roomName] && Memory.rooms[roomName].settlerRanger) {
                const groupName = 'Settler'+Memory.rooms[roomName].settlerRanger.farTarget;
                teamMassRangers[groupName] = {id: groupName, creeps: {massRanger: Memory.rooms[roomName].settlerRanger.count}, warningMove: Memory.rooms[roomName].settlerRanger.warningMove};
                roomInfo.massRanger_team = groupName;
                if (!(Game.time%50) && !Memory.rooms[roomName].settlerRanger.count) {
                    delete Memory.rooms[roomName].settlerRanger;
                }
                //console.log(/*helpers.getRoomLink(roomName),*/ roomName, 'change massRangers group to settlers', groupName, JSON.stringify(teamMassRangers));
            }
            
        }
        
        
        let visual = 0;
        let tickToConstruct = 10;
        if (Game.cpu.bucket > 9500) {
            visual = 1;
            let tickToConstruct = 5;
        }
        
        if ((!visual && Game.time%tickToConstruct)){
            //return;
        }
        
        if (!this.roomInfo[Game.shard.name] || !this.roomInfo[Game.shard.name][roomName]) {
            return;
        }
        const room = Game.rooms[roomName];
        if (!room) {
            return;
        }
        let buildings = _.get(this.roomInfo[Game.shard.name][roomName], 'info.buildings');
        if (room.controller.level >= 8 && room.memory.buildingsCompleted && !buildings) {
            return;
        }
        if (room.controller.level >= 8 && room.memory.buildingsRawCompleted && buildings) {
            return;
        }
        
        
        if (1) {
            let settlerInfo = this.roomInfo[Game.shard.name][roomName];
            const level = room.controller.level;
            const levelInfo = this.clone(settlerInfo.spawnSettlerRoom == roomName?this.creepLevelInfoSelfSettlers[level]:this.creepLevelInfo[level]);
            if (level<8) {
                if (level == 2) {
                    let containers = room.find(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_CONTAINER
                    });
                    if (containers.length < 3) {
                        levelInfo.creeps = this.clone(settlerInfo.spawnSettlerRoom == roomName?this.creepLevelInfoSelfSettlers[level-1].creeps:this.creepLevelInfo[level-1].creeps);
                    }
                }
                if (level == 5) {
                    if (room.memory.remoteLinkUpgrade) {
                        levelInfo.creeps = this.clone(settlerInfo.spawnSettlerRoom == roomName?this.creepLevelInfoSelfSettlers[level].creeps:this.creepLevelInfo[level].creeps);
                        levelInfo.creeps.transporter += 2;
                    }
                    // if (room.energyCapacityAvailable < 1800) {
                    //     levelInfo.creeps = this.clone(settlerInfo.spawnSettlerRoom == roomName?this.creepLevelInfoSelfSettlers[level-1].creeps:this.creepLevelInfo[level-1].creeps);
                    // }
                }
                if (level == 6) {
                    if (room.terminal) {
                        levelInfo.settler = levelInfo.settler?1:0;
                        levelInfo.massRangers = 0;
                        Memory.helpRoomTerminal = room.name;
                        if (!(Game.time%100)) {room.terminal.pos.createConstructionSite(STRUCTURE_RAMPART);}
                        if (room.memory.remoteLinkUpgrade) {
                            levelInfo.creeps = this.clone(settlerInfo.spawnSettlerRoom == roomName?this.creepLevelInfoSelfSettlers[level].creeps:this.creepLevelInfo[level].creeps);
                            levelInfo.creeps.dropper = 1;
                        }
                    } else {
                        levelInfo.creeps.upgrader = settlerInfo.spawnSettlerRoom == roomName?levelInfo.creeps.upgrader:0;
                    }
                } else if (level == 4){
                    if (!(room.storage && room.storage.my)) {
                        levelInfo.creeps = this.clone(settlerInfo.spawnSettlerRoom == roomName?this.creepLevelInfoSelfSettlers[level-1].creeps:this.creepLevelInfo[level-1].creeps);
                    } else {
                        if (!(Game.time%100)) {room.storage.pos.createConstructionSite(STRUCTURE_RAMPART);}
                        if (room.energyCapacityAvailable <  1300) {
                            levelInfo.settler = 2;
                            levelInfo.creeps = this.clone(settlerInfo.spawnSettlerRoom == roomName?this.creepLevelInfoSelfSettlers[level].creeps:this.creepLevelInfo[level].creeps);
                            levelInfo.creeps.wallbuilder = 0;
                        } else {
                            levelInfo.creeps = this.clone(settlerInfo.spawnSettlerRoom == roomName?this.creepLevelInfoSelfSettlers[level].creeps:this.creepLevelInfo[level].creeps);
                            //levelInfo.creeps.transporter = 1;
                        }
                    }
                    
                }
                if (level == 7) {
                    if (room.memory.remoteLinkUpgrade) {
                        levelInfo.creeps = this.clone(settlerInfo.spawnSettlerRoom == roomName?this.creepLevelInfoSelfSettlers[level].creeps:this.creepLevelInfo[level].creeps);
                        levelInfo.creeps.upgrader = 2;
                    }
                }
                
                roomInfo.creeps = levelInfo.creeps;
                roomInfo.creeps.settler = this.getSettlersCount(roomName);
                console.log(helpers.getRoomLink(roomName), 'roomManage',room.controller.level,'lvl',Math.round(room.controller.progress/room.controller.progressTotal*100)+'%', JSON.stringify(levelInfo.creeps), room.memory.boostBuilder?'boostBuilder':'boostUpgrader');
                
                if (!(Game.time%250)) {
                    room.find(FIND_MY_STRUCTURES, {filter: (obj) => obj.structureType == STRUCTURE_TOWER || obj.structureType == STRUCTURE_SPAWN}).forEach((obj)=>obj.pos.createConstructionSite(STRUCTURE_RAMPART));
                }
                
                if (!(Game.time%100)) {
                    //calc min ramparts
                    let minHpRampart = _.min(
                        room.find(FIND_MY_STRUCTURES, {
                            filter: (obj)=>obj.structureType == STRUCTURE_RAMPART
                        }), 
                        obj => obj.hits
                    );
                    if (minHpRampart) {
                        room.memory.minRampartHp = minHpRampart.hits;
                    }
                }
                
            } else {
                console.log(helpers.getRoomLink(roomName), 'roomManage');
                if (Memory.helpRoomTerminal == room.name) {
                    Memory.helpRoomTerminal = undefined;
                }
            }
            
            
            
            if (settlerInfo.spawnSettlerRoom && Memory.rooms[settlerInfo.spawnSettlerRoom]) {
                Memory.rooms[settlerInfo.spawnSettlerRoom].settler = {count: levelInfo.settler, farTarget: roomName};
                if ((level == 1 || room.name == 'E22N23__') && !room.memory.settlerInit) {
                    if (_.get(Memory, 'claimRoomTasks['+settlerInfo.spawnSettlerRoom+']['+roomName+']')) {
                        Memory.claimRoomTasks[settlerInfo.spawnSettlerRoom][roomName] = undefined;    
                        delete Memory.claimRoomTasks[settlerInfo.spawnSettlerRoom][roomName];
                    }
                    let spawnCoord = _.get(this.roomInfo[Game.shard.name][roomName], 'info.buildings.spawn.pos');
                    if (spawnCoord) {
                        let spawnPos = new RoomPosition(spawnCoord[0].x, spawnCoord[0].y, roomName);
                        if (spawnPos) {
                            spawnPos.createConstructionSite(STRUCTURE_SPAWN, 'Spawn1_'+roomName);
                            spawnPos.createFlag('flagMassRangeAttack'+'Settler'+roomName);
                            spawnPos.createFlag('flagMassRangeEscape'+'Settler'+roomName);
                        }
                    }
                    
                    if (1 && settlerInfo.clearRoom) {
                        //kil all all buildings
                        if (room && room.controller && room.controller.my && room.controller.progress <= 1) {
                            room.find(FIND_STRUCTURES).forEach(struct => {
                                struct.destroy();
                            });
                        }
                    }
                    if (1 && settlerInfo.clearNoEnergyRoom) {
                        //kil all all buildings
                        if (room && room.controller && room.controller.my && room.controller.progress <= 1) {
                            room.find(FIND_STRUCTURES).forEach(struct => {
                                if (struct.store && struct.store[RESOURCE_ENERGY] >= 200) {
                                    
                                } else {
                                    struct.destroy();    
                                }
                            });
                        }
                    }
                    room.memory.boostBuilder = 1;
                     
                    if (Game.flags['flagMassRangeAttack'+'Settler'+roomName] && Game.flags['flagMassRangeEscape'+'Settler'+roomName] ) {
                         room.memory.settlerInit = 1;
                    }
                     
                     
                }
            }
            if (settlerInfo.spawnRangerRooms && settlerInfo.spawnRangerRooms.length) {
                for (rangerRoom of settlerInfo.spawnRangerRooms) {
                    if (Memory.rooms[rangerRoom]) {
                        Memory.rooms[rangerRoom].settlerRanger = {count: levelInfo.massRangers, farTarget: roomName, warningMove: settlerInfo.warningMove};
                        //console.log(JSON.stringify(Memory.rooms[rangerRoom].settlerRanger));
                    }
                }
            }

            
        }
        
       
        
        require('profiler').start('settlerBuildings');    
        if (buildings) {
            if (visual) {
                for (struct in buildings) {    
                    if (struct == STRUCTURE_RAMPART || struct == STRUCTURE_ROAD) {
                        continue;
                    }
                    //console.log(struct);
                    let index = 0;
                    let color = 'green';
                    for (let coord of buildings[struct].pos) {
                        const pos = new RoomPosition(coord.x, coord.y, room.name);
                        room.visual.circle(pos.x, pos.y, {radius: 0.12, fill: 'tranparent', stroke: color});
                        // room.visual.text(index, pos.x, pos.y+0.15, {color: color, font: 0.4});
                        // room.visual.text(struct, pos.x, pos.y+0.30, {color: color, font: 0.2});
                    }
                }
            }
            
            if (!(Game.time%tickToConstruct)) {
                let allCompleted = true;
                const level = room.controller.level;
                let maxConstruction = level==1?100:2;
                let constructions = room.find(FIND_CONSTRUCTION_SITES);
                for (struct in buildings) {
                    
                    if (struct == STRUCTURE_RAMPART && !(level == 7 && room.controller.progress > room.controller.progressTotal*0.15)){
                        continue
                    }
                    if (struct == STRUCTURE_ROAD && level != 1) {
                        continue;
                    }
                    if (struct == STRUCTURE_CONTAINER && level != 4) {
                        continue;
                    }
                    let buildAllow = false;
                    let levelCap = false;
                    if (constructions.length<maxConstruction) {
                        buildAllow = true;
                    }
                    if (struct !== STRUCTURE_EXTENSION) {
                        //continue;
                        //buildAllow = false;
                    }
                    let allowedCount = CONTROLLER_STRUCTURES[struct][room.controller.level];
                    let alreadyBuild = room.find(FIND_MY_STRUCTURES, {
                        filter: { structureType: struct }
                    });
                    let color = 'green';
                    let constructionsStruct = _.filter(constructions, (constr) => constr.structureType == struct);
                    
                    if (alreadyBuild.length + constructionsStruct.length >= allowedCount ) {
                        buildAllow = false;
                        levelCap = true;
                    }
                    if (!allowedCount) {
                        buildAllow = false;
                        levelCap = true;
                    }
                    //console.log(struct, allowedCount, alreadyBuild.length, constructions.length, buildAllow?'build':'nobuild');  
                    let positions = buildings[struct].pos;
                    let index = 0;
                    let alreadyBuilded = 0;
                    
                    for (let coord of positions) {
                        if (index++ >= allowedCount){
                            color = 'red';
                        }
    
                        let already = coord.already;
                        let pos;
                        if (!already && (buildAllow || coord.already == undefined || !(Game.time%(tickToConstruct*10)))) {
                            if (!already && coord.noAlready != room.controller.level) {
                                pos = new RoomPosition(coord.x, coord.y, room.name);
                                pos.look().forEach(function(lookObject) {
                                    if(lookObject.type == LOOK_CONSTRUCTION_SITES) {
                                        already = true;
                                    }
                                    if(lookObject.type == LOOK_STRUCTURES && lookObject.structure.structureType == struct) {
                                        already = true;
                                    }
                                });
                                if (already) {
                                    coord.already = 1;
                                } else {
                                    coord.already = 0;
                                }
                                if (!already && levelCap) {
                                    coord.noAlready = room.controller.level;
                                }
                            } else {
                                if (visual) {
                                    pos = new RoomPosition(coord.x, coord.y, room.name);
                                    room.visual.text('cache', pos.x, pos.y+0.44, {color: color, font: 0.25});
                                }
                            }
                        } else {
                            if (visual) {
                                pos = new RoomPosition(coord.x, coord.y, room.name);
                                room.visual.text('skip'+(already?'1':'0'), pos.x, pos.y+0.44, {color: color, font: 0.25});
                            }
                        }
                        if (already) {
                            alreadyBuilded++
                        }
    
                        if (buildAllow && !already) {
                            if (!pos) {
                                pos = new RoomPosition(coord.x, coord.y, room.name);    
                            }
                            console.log('try create construction', JSON.stringify(pos),struct);
                            if (struct ==  STRUCTURE_SPAWN) {
                                pos.createConstructionSite(struct, 'Spawn'+(alreadyBuild.length+1)+'_'+room.name);
                            } else {
                                pos.createConstructionSite(struct);    
                            }
                            if (visual) {
                                room.visual.circle(pos.x, pos.y, {radius: 0.21,});
                            }
                            require('profiler').end('settlerBuildings');  
                            return;
    
                        } else if (!already) {
                            //console.log('need create construction',struct, alreadyBuild.length , constructionsStruct.length , allowedCount, JSON.stringify(pos));
                        }
                        
    
                        if (visual && pos) {
                            if (!already) {
                                room.visual.circle(pos.x, pos.y, {radius: 0.21,});
                                room.visual.text(index, pos.x, pos.y+0.15, {color: color, font: 0.4});
                                room.visual.text(struct, pos.x, pos.y+0.30, {color: color, font: 0.2});
                            } else if (pos) {
                                room.visual.circle(pos.x, pos.y, {radius: 0.12,fill: 'red'});
                                room.visual.text(index, pos.x, pos.y+0.15, {color: color, font: 0.4});
                            }
                        }                    
                        
                    }
                    if (alreadyBuilded == Math.min(positions.length, allowedCount)) {
                        //console.log(struct, 'completed', alreadyBuilded, positions.length, allowedCount)
                    } else {
                        //console.log(struct, 'NOOOOO completed', alreadyBuilded, positions.length, allowedCount)
                        allCompleted = false;
                    }
                }
                
                //console.log(helpers.getRoomLink(roomName), 'allCompleted', allCompleted);
                if (room.memory.boostBuilder) {
                    if (!constructions.length && allCompleted) {
                        room.memory.boostBuilder = undefined;
                    }
                } else {
                    if (constructions.length || !allCompleted) {
                        room.memory.boostBuilder = 1;
                    }
                }
                
                if (room.controller.level == 8 && allCompleted) {
                    console.log('buildings completed');
                    room.memory.buildingsRawCompleted = 1;
                }
                
            }
        }
        require('profiler').end('settlerBuildings');    
        
        require('profiler').start('settlerBuildOrders');
        if (this.roomInfo[Game.shard.name][roomName].buildOrders && !room.memory.buildingsCompleted) {
            if (this.roomInfo[Game.shard.name][roomName].buildOrdersCompletedLevel != room.controller.level) {
                let completed = true;
                // let visual = 1;
                
                for (let level = 0; level<=8; level++) {
                    const constructOrder = this.roomInfo[Game.shard.name][roomName].buildOrders[level];
                    
                    for (let structure in constructOrder) {
                        
                        if (constructOrder && constructOrder[structure] && constructOrder[structure].pos && constructOrder[structure].pos.length) {
                            // console.log('ddd!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', level, constructOrder[structure].pos.length);  
                            for (const position of constructOrder[structure].pos) {
                                const pos = new RoomPosition(position.x, position.y, roomName);
                                if (pos && visual && level >= 0 /*room.controller.level*/) {
                                    // room.visual.circle(pos.x, pos.y, {radius: 0.21,});
                                    room.visual.text(level, pos.x, pos.y+0.15, {color: 'green', font: 0.4});
                                }
                                
                                if (1 && !(Game.time%tickToConstruct) && pos && level <= room.controller.level) {
                                    let allready = position.allready;
                                    if (!allready) {
                                        pos.look().forEach(function(lookObject) {
                                            if(lookObject.type == LOOK_CONSTRUCTION_SITES) {
                                                allready = true;
                                            }
                                            if(lookObject.type == LOOK_STRUCTURES && lookObject.structure.structureType == structure) {
                                                allready = true;
                                            }
                                        });
                                        if (allready) {
                                            position.allready = 1;
                                        } else {
                                            completed = false;
                                            let constuctions = room.find(FIND_CONSTRUCTION_SITES);
                                            let maxCS = structure == STRUCTURE_ROAD?60:2;
                                            if (constuctions.length < maxCS) {
                                                console.log('try create constructionB', JSON.stringify(pos),structure);
                                                if (structure ==  STRUCTURE_SPAWN) { 
                                                    pos.createConstructionSite(structure, constructOrder[structure].name);
                                                } else {
                                                    pos.createConstructionSite(structure);    
                                                }
                                                require('profiler').end('settlerBuildOrders'); 
                                                return;
                                            }
                                        }
                                    } else {
                                        if (visual) {
                                            room.visual.text('  cached', pos.x, pos.y+0.15, {color: 'green', font: 0.2});    
                                        }
                                    }
                                }
                            }
                        }
                        
                    }
                                
                }
                // console.log('!d11!!!!!!!!!!!!!!!!!!!!!!!!!!!!',this.roomInfo[Game.shard.name][roomName].buildOrdersCompletedLevel)
                if (completed && !(Game.time%tickToConstruct)) {
                    this.roomInfo[Game.shard.name][roomName].buildOrdersCompletedLevel = room.controller.level;
                }
                
                if (!(Game.time%tickToConstruct) && room.controller.level == 8 && completed) {
                    console.log('room completed');
                    room.memory.buildingsCompleted = 1;
                }
            }
        }
        require('profiler').end('settlerBuildOrders');
        
        
        
    },
    
    positionInBorder: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 1 || pos.x >48 || pos.y < 1 || pos.y > 48);
    },
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        Game.map.visual.text("settler️",creep.pos, { fontSize:6});
        if (helpers.sleep(creep)) return;
        
        //Memory.claimRoomTasks['E46N31']['E47N36'] = {x: 47 , y:37, reserved: 0, time: Game.time, claimRoom: 1};
        //Memory.claimRoomTasks['E46N31']['E47N36'] = undefined;
        // //Memory.claimRoomTasks['E42N28']['E41N24'] = {x: 25 , y:9, reserved: 0, time: Game.time, claimRoom: 1};
        // Memory.claimRoomTasks['E42N28']['E41N24'] = undefined;
        
        if (!creep.memory.farTarget) {
            creep.memory.farTarget = this.getFarTarget(creep.memory.room);
        }
        if (creep.memory.farTarget && Memory.rooms[creep.memory.farTarget] && !Memory.rooms[creep.memory.farTarget].boostBuilder && creep.memory.boosts && creep.memory.boosts.length && creep.memory.boosts.indexOf(RESOURCE_LEMERGIUM_HYDRIDE) >= 0 ) {
            creep.memory.boosts.splice(creep.memory.boosts.indexOf(RESOURCE_LEMERGIUM_HYDRIDE), 1);
        }
        
        
        
        const roomInfo = this.roomInfo[Game.shard.name][creep.memory.farTarget];
        if (!roomInfo){
            Game.notify('settler no roomInfo');
            return;
        }
        if (roomInfo.warningMove && !creep.memory.inPlace) {
            creep.memory.warningMove = 1;
        }
        
        if (roomInfo.soonDie && !creep.memory.soonDie && creep.ticksToLive < roomInfo.soonDie) {
            creep.memory.soonDie = 1;
        }
        
        if (!creep.memory.inPlace) {
            if (creep.store.getCapacity() > 2000 && creep.store.getFreeCapacity() && creep.room.name == creep.memory.room) {
                if (creep.pos.isNearTo(creep.room.storage)){
                    creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
                } else {
                    helpers.smartMove(creep, creep.room.storage);
                }
            } else {
                const flag = Game.flags[roomInfo.flag];
                if (!flag) {
                    if (roomInfo.flag == 'Flag1') {
                        creep.pos.createFlag(roomInfo.flag);
                    }
                    Game.notify('settler no flag');
                    return;
                }
                if (creep.room.name == flag.pos.roomName && !this.positionInBorder(creep)) {
                    creep.memory.inPlace = 1;
                    creep.memory.warningMove = undefined;
                } else {
                    helpers.smartMove(creep, flag);
                }
            }
            
            return;
        }
        
        if (!creep.store[RESOURCE_ENERGY] && creep.store.getFreeCapacity() && !creep.memory.targetId) {
            let found = false;
            creep.memory.repairId = undefined;
            if (!creep.room.storage && creep.room.controller && creep.room.controller.my && creep.room.controller.level <= 4) {
                if (!creep.memory.storageId || !Game.getObjectById(creep.memory.storageId)) {
                    let containers = creep.room.controller.pos.findInRange(FIND_STRUCTURES, 5, { filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.id != '6072186026dc9c29912ec581'});
                    if (containers.length) {
                        creep.memory.storageId = creep.room.controller.pos.findClosestByRange(containers).id;
                    }
                } else {
                    let storage = Game.getObjectById(creep.memory.storageId);
                    if (storage.store[RESOURCE_ENERGY]>=50) {
                        helpers.attachToSource(creep, storage.id);
                        creep.say('scontainer');
                        found = true;
                    }
                }
            }
            if (!found){
                let targets = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 10, {
                    filter: (i) => (i.resourceType == RESOURCE_ENERGY && i.amount > 170)
                });    
                if (targets.length){
                    found = true;
                    helpers.attachToSource(creep, targets[0].id);
                    creep.say('droppedR');
                } 
            }
            if (!found) {
                targets = creep.room.find(FIND_TOMBSTONES, {
                    filter: (i) => i.store[RESOURCE_ENERGY] > 110
                });
                if (targets.length){
                    found = true;
                    helpers.attachToSource(creep, targets[0].id);
                } 
            }
            if (!found) {
                let target = creep.pos.findClosestByPath(FIND_RUINS, {
                    filter: (i) => i.store[RESOURCE_ENERGY] > 110
                });
                if (target){
                    found = true; 
                    helpers.attachToSource(creep, target.id);
                } 
            }
            if (!found){
                let targets = creep.room.find(FIND_DROPPED_RESOURCES, {
                    filter: (i) => (i.resourceType == RESOURCE_ENERGY && i.amount > 170)
                });    
                if (targets.length){
                    found = true;
                    helpers.attachToSource(creep, targets[0].id);
                    creep.say('dropped');
                } 
            }
            if (!found && creep.room.storage && creep.room.storage.my && creep.room.storage.store[RESOURCE_ENERGY] > 6000) {
                found = true;
                helpers.attachToSource(creep, creep.room.storage.id); 
            }
            if (!found && roomInfo.manTargets.length) {
                for (const manTarget of roomInfo.manTargets) {
                    const obj = Game.getObjectById(manTarget);
                    if (!obj || !obj.store || !obj.store[RESOURCE_ENERGY] || obj.store[RESOURCE_ENERGY] < 60 /*6000*/) {
                        continue;
                    } else {
                        found = true;
                        helpers.attachToSource(creep, obj.id); 
                        break;
                    }
                }
            }
            if (!found){
                //find new target;
                var lenArr = [];
                farTargets = _.shuffle(roomInfo.sources);
                for (var i=0; i<farTargets.length; i++){
                    var harvNum = helpers.getAttachedToSource(creep, farTargets[i].id);
                    if (farTargets[i].oneSide && harvNum >= farTargets[i].oneSide) {
                        harvNum = 100000;
                    }
                    lenArr.push({id: farTargets[i].id,  harvNum: harvNum});
                }
                lenArr.sort((a,b) => a.harvNum - b.harvNum);
                if (lenArr.length){
                    var sourceArr = [];
                    lenArr.forEach((a) => {if (a.harvNum == lenArr[0].harvNum){sourceArr.push(Game.getObjectById(a.id));}});

                    var source = creep.pos.findClosestByRange(sourceArr);
                    if (source){
                        helpers.attachToSource(creep, source.id);    
                    } else {
                        console.log('settler error',lenArr[0].id);
                        helpers.attachToSource(creep, lenArr[0].id);
                    }
                }  
            }
        
        }
        
        if (creep.memory.targetId) {
            var source = Game.getObjectById(creep.memory.targetId);
            if (source && source.structureType == STRUCTURE_SPAWN){
                console.log(creep.name);
                let result = source.renewCreep(creep);
                creep.transfer(source, RESOURCE_ENERGY);
                if (result == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                } 
                if (result == ERR_FULL || result == ERR_NOT_ENOUGH_ENERGY || source.store[RESOURCE_ENERGY]<52){
                    helpers.deAttachToSource(creep);
                    source.memory.skip = undefined;
                    console.log(creep.name, 'back from renew');
                }
                if (creep.pos.isEqualTo(new RoomPosition(13,36, 'E42N28'))){
                    creep.move(BOTTOM);
                }
            } else if (source && source.store && source.store[RESOURCE_ENERGY]){
                helpers.smartMove(creep, source);
                if (creep.pos.isNearTo(source)) {
                    const res = creep.withdraw(source, RESOURCE_ENERGY);
                    helpers.deAttachToSource(creep);
                    if (res == ERR_INVALID_TARGET) {
                        creep.say('inv');
                        if (!creep.memory.invalidIds){
                            creep.memory.invalidIds = [];    
                        } 
                        if (creep.memory.invalidIds && creep.memory.invalidIds.indexOf('source.id') == -1){
                            creep.memory.invalidIds.push(source.id);
                        }
                    }
                }
            } else if (source && source.store && !source.store[RESOURCE_ENERGY]){
                helpers.deAttachToSource(creep);
                creep.say('dt');
            } else if (!source){
                creep.say('no see');
                //find flag
                let sourceInfo = _.findWhere(roomInfo.sources, {id: creep.memory.targetId});
                if (sourceInfo){
                    let target = Game.flags[sourceInfo.flag];
                    if (target) {
                        helpers.smartMove(creep, target);    
                    } else {
                        Game.notify('settler no flag 4');
                        return;
                    }
                } else {
                    helpers.deAttachToSource(creep);     
                }
            } else {
                if (source.resourceType && source.resourceType == RESOURCE_ENERGY) {
                    creep.say('dropped');    
                    helpers.smartMove(creep, source, 1, 1);
                    creep.pickup(source);
                } else {
                    creep.say('hv');
                    var result = creep.harvest(source);
                    if (result == ERR_INVALID_TARGET) {
                        helpers.smartMove(creep, Game.flags[roomInfo.flag], 1, 1);
                    }
                    if (result == ERR_NOT_ENOUGH_RESOURCES && creep.carry[RESOURCE_ENERGY]) {
                        helpers.deAttachToSource(creep);
                    } else if (result == ERR_NOT_ENOUGH_RESOURCES ) {
                        if (!creep.pos.isNearTo(source)){
                            let res = helpers.smartMove(creep, source, 1, 1);    
                        }
                    }
                    var res;
                    if (result == ERR_NOT_IN_RANGE) {
                        res = helpers.smartMove(creep, source, 1, 1);
                        if (!(Game.time%20) || Game.time < creep.memory.sleep+40) {
                            creep.memory.sleep = undefined;
                            helpers.deAttachToSource(creep);    
                        }
                    }
                    if (res == ERR_INVALID_TARGET) {
                        //find flag
                        var flag = _.findWhere(roomInfo.sources, {id: creep.memory.targetId});
                        if (flag){
                            flag = flag.flag;
                            var target = Game.flags[flag].pos;
                            helpers.smartMove(creep, target);
                        }
                    }    
                }
                
                
            }
        }
        
        if (creep.memory.targetId && !creep.store.getFreeCapacity()) {
            helpers.deAttachToSource(creep);
        }
        if (!creep.memory.targetId && creep.store[RESOURCE_ENERGY]) {
            if (creep.room.name != creep.memory.farTarget && !helpers.buildClosestStructure(creep)) {
                const flag = Game.flags[roomInfo.flag];
                if (!flag) {
                    Game.notify('settler no flag 2');
                    return;
                }
                if (creep.room.name !== flag.pos.roomName) {
                    helpers.smartMove(creep, flag);
                    return;
                }
            }
            
            //find spawn
            var spawns = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN;}// && !structure.spawning && structure.energy>200;}
            });
            if (0 && creep.ticksToLive<600 && spawns.length && spawns[0].store[RESOURCE_ENERGY] > 10 && !helpers.getAttachedToSource(creep, spawns[0].id) ){
                creep.say('111'+spawns.length);
                helpers.attachToSource(creep, spawns[0].id);
                spawns[0].memory.skip = 1;
                creep.drop(RESOURCE_ENERGY, 1);
                creep.say('renew');
            } else {
                
                if (!helpers.transferEnergyToClosestStructure(creep)){
                    if (creep.memory.repairId) {
                        let target = Game.getObjectById(creep.memory.repairId);
                        if (target) {
                            if (target.hits == target.hitsMax) {
                                creep.memory.repairId = undefined;
                            }
                            if (creep.pos.inRangeTo(target, 3)) {
                                creep.repair(target);
                            } else {
                                helpers.smartMove(creep, target, 1, 3);
                            }
                            return;
                        }
                    }

                    if ((creep.room.controller && creep.room.controller.my && (creep.room.controller.level < 2 || creep.room.controller.ticksToDowngrade < 1000)) || 0 || !helpers.buildClosestStructure(creep)){
                        if (['E46N31_',].indexOf(creep.room.name) >= 0 || !creep.room.storage || creep.room.storage.store[RESOURCE_ENERGY]> 5000 || creep.store.getCapacity()>500 || !helpers.transferEnergyToStorage(creep)){
                            
                            rampartsHpLevelInfo = roomInfo.rampartsHpLevelInfo?roomInfo.rampartsHpLevelInfo:this.rampartsHpLevelInfo;
                            if ((!creep.memory.type || creep.memory.type == 'builder') && creep.room.memory.minRampartHp && rampartsHpLevelInfo && rampartsHpLevelInfo[creep.room.controller.level] &&  creep.room.memory.minRampartHp < rampartsHpLevelInfo[creep.room.controller.level]) {
                                if (!creep.memory.repairId) {
                                    let minHpRampart = _.min(
                                        creep.room.find(FIND_MY_STRUCTURES, {
                                            filter: (obj)=>obj.structureType == STRUCTURE_RAMPART
                                        }), 
                                        obj => obj.hits
                                    );
                                    if (minHpRampart) {
                                        creep.memory.repairId = minHpRampart.id;
                                    }
                                }
                                if (creep.memory.repairId) {
                                    let target = Game.getObjectById(creep.memory.repairId);
                                    if (target) {
                                        if (creep.pos.inRangeTo(target, 3)) {
                                            creep.repair(target);
                                        } else {
                                            helpers.smartMove(creep, target, 1, 3);
                                        }
                                    }
                                }
                                
                            } else {
                                if (!helpers.upgradeController(creep)) {
                                    creep.say('noc');
                                    if (creep.store.getUsedCapacity()) {
                                        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (object) => object.structureType == STRUCTURE_CONTAINER && object.store && object.store.getFreeCapacity()>=creep.store.getUsedCapacity()});
                                        if (container) {
                                            if (creep.pos.isNearTo(container)) {
                                                for (res in creep.store) {
                                                    creep.transfer(container, res);
                                                    break;
                                                }
                                                
                                            } else {
                                                helpers.smartMove(creep, container);
                                            }
                                        }
                                    }
                                }
                                if (Game.shard.name == 'shard2' && creep.room.name == 'E45N29' && creep.pos.isEqualTo(22, 42) ){
                                    creep.move(BOTTOM);    
                                }
                                if (Game.shard.name == 'shard2' && creep.room.name == 'E45N29' && creep.pos.isEqualTo(22, 41) ){
                                    creep.move(BOTTOM);    
                                }
                                if (Game.shard.name == 'shard2' && creep.room.name == 'E57N35' && creep.pos.isEqualTo(29, 6) ){
                                    creep.move(BOTTOM_RIGHT);    
                                }
                                if (Game.shard.name == 'shardSeason' && creep.room.name == 'E26N22' && creep.pos.isEqualTo(27, 31) ){
                                    creep.move(LEFT);    
                                }
                                if (0 && Game.shard.name == 'shardSeason' && creep.room.name == 'E26N22' && creep.pos.isEqualTo(26, 31) ){
                                    if (!(Game.time%2)) {
                                        creep.move(TOP_LEFT);    
                                    } else {
                                        creep.move(RIGHT);    
                                    }
                                    
                                }
                                if (Game.shard.name == 'shardSeason' && creep.room.name == 'E26N22' && creep.pos.isEqualTo(21, 34) ){
                                    creep.move(TOP);    
                                }
                                if (Game.shard.name == 'shardSeason' && creep.room.name == 'E26N22' && creep.pos.isEqualTo(21, 34) ){
                                    creep.move(TOP);    
                                }
                                if (Game.shard.name == 'shardSeason' && creep.room.name == 'E26N22' && creep.pos.isEqualTo(27, 32) ){
                                    creep.move(TOP_LEFT);    
                                }
                                if (Game.shard.name == 'shardSeason' && creep.room.name == 'E26N22' && creep.pos.isEqualTo(26, 32) ){
                                    if (!(Game.time%2)) {
                                        creep.move(LEFT);    
                                    } else {
                                        creep.move(TOP);    
                                    }
                                }
                                
                                if (Game.shard.name == 'shardSeason' && creep.room.name == 'E26N22' && creep.pos.isEqualTo(27, 33) ){
                                    if (!(Game.time%2)) {
                                        creep.move(TOP_LEFT);    
                                    } else {
                                        creep.move(BOTTOM);    
                                    }
                                }

                                if (Game.shard.name == 'shardSeason' && creep.room.name == 'E23N25' && creep.pos.isEqualTo(23, 35) ){
                                    creep.move(LEFT);    
                                }
                                if (Game.shard.name == 'shardSeason' && creep.room.name == 'E23N25' && creep.pos.isEqualTo(22, 35) ){
                                    creep.move(LEFT);
                                }
                                if (Game.shard.name == 'shardSeason' && creep.room.name == 'E23N25' && creep.pos.isEqualTo(21, 35) ){
                                    creep.move(BOTTOM_LEFT);
                                }
                                if (Game.shard.name == 'shardSeason' && creep.room.name == 'E23N25' && creep.pos.isEqualTo(20, 36) ){
                                    creep.move(BOTTOM);
                                }
                                if (Game.shard.name == 'shardSeason' && creep.room.name == 'E23N25' && creep.pos.isEqualTo(20, 37) ){
                                    creep.move(TOP_RIGHT);
                                }
                                if (Game.shard.name == 'shardSeason' && creep.room.name == 'E28N26' && creep.pos.isEqualTo(15, 19) ){
                                    creep.move(TOP_LEFT);
                                }
                                // if (Game.shard.name == 'shardSeason' && creep.room.name == 'E23N25' && creep.pos.isEqualTo(45, 15) ){
                                //     creep.move(TOP);
                                // }
                                // if (Game.shard.name == 'shardSeason' && creep.room.name == 'E23N25' && creep.pos.isEqualTo(45, 14) ){
                                //     creep.move(LEFT);
                                // }
                                // if (Game.shard.name == 'shardSeason' && creep.room.name == 'E23N25' && creep.pos.isEqualTo(44, 14) ){
                                //     creep.move(LEFT);
                                // }
                                // if (Game.shard.name == 'shardSeason' && creep.room.name == 'E23N25' && creep.pos.isEqualTo(43, 14) ){
                                //     creep.move(BOTTOM);
                                // }
                                if (Game.shard.name == 'shard2' && creep.room.name == 'E41N39' && creep.pos.isEqualTo(27, 18) ){
                                    creep.move(BOTTOM_RIGHT);
                                }
                                if (Game.shard.name == 'shard2' && creep.room.name == 'E41N39' && creep.pos.isEqualTo(28, 18) ){
                                    creep.move(BOTTOM);
                                }
                                if (Game.shard.name == 'shard2' && creep.room.name == 'E41N39' && creep.pos.isEqualTo(27, 19) ){
                                    creep.move(RIGHT);
                                }
                                // if (Game.shard.name == 'shard2' && creep.room.name == 'E41N39' && creep.pos.isEqualTo(29, 19) ){
                                //     creep.move(TOP);
                                // }
                                
                            }
                            
                        }
                    }
                }
            }
        }
        //repair road
        if (creep.carry.energy>20){
            var look = creep.pos.look();
            look.forEach(function(lookObject) {
                if (lookObject.type == LOOK_STRUCTURES && lookObject.structure.hits<lookObject.structure.hitsMax && lookObject.structure.hits<4000){
                    var res = creep.repair(lookObject.structure);
                    creep.say('repair');
                    // console.log('Repair road', res, lookObject.structure.hits, lookObject.structure.hitsMax);
                }
            });
        }
        // if (creep.name == 'xE26N2218380') {
            
        // } else {
        //     creep.moveTo(Game.flags['Flag1']);    
        // }
        
	}
};

module.exports = roleSettler;