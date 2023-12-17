var helpers = require('helpers');
var roleInter = {
    
    deliveryInfo: {
        'shard0': {
            'E79N59': [
                {
                    destShard: 'shard2',
                    destRoom: 'E42N28',
                    flag: 'inter_tos2s2',
                    resources: [
                        // {res: RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, amount:1800},
                    //  {res: RESOURCE_GHODIUM, amount:400},
                    //  {res: RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, amount:800},
                    //  {res: RESOURCE_CATALYZED_GHODIUM_ALKALIDE, amount:400},
                    // {res: RESOURCE_CATALYZED_UTRIUM_ACID, amount: 100},
                    // {res: RESOURCE_PURIFIER, amount: 500},
                    // {res: RESOURCE_LEMERGIUM_BAR, amount: 5000}],
                    //resources: [{res: RESOURCE_LEMERGIUM_BAR, amount: 5000},],
                    {res: RESOURCE_ALLOY, amount: 2000},
                    {res: RESOURCE_TUBE, amount: 2000},
                    {res: RESOURCE_FIXTURES, amount: 2000},
                    {res: RESOURCE_FRAME, amount: 2000},
                    {res: RESOURCE_HYDRAULICS, amount: 2000},
                    {res: RESOURCE_CONCENTRATE, amount: 2000},
                    {res: RESOURCE_EXTRACT, amount: 2000},
                    {res: RESOURCE_SPIRIT, amount: 2000},
                    {res: RESOURCE_EMANATION, amount: 2000},
                    {res: RESOURCE_LIQUID, amount: 2000},
                    {res: RESOURCE_CRYSTAL, amount: 2000},
                    {res: RESOURCE_CONDENSATE, amount: 2000},
                    {res: RESOURCE_COMPOSITE, amount: 2000},
                    {res: RESOURCE_GHODIUM_ACID, amount: 2000},
                    {res: RESOURCE_GHODIUM, amount: 2000, minStock: 8000},
                    // {res: RESOURCE_UTRIUM_BAR, amount: 2000},
                    // {res: RESOURCE_UTRIUM, amount: 2000},
                    // {res: RESOURCE_CATALYZED_KEANIUM_ACID, amount: 1000},
                    {res: RESOURCE_REDUCTANT, amount: 500},
                    {res: RESOURCE_OXIDANT, amount: 5000},
                    {res: RESOURCE_KEANIUM_BAR, amount: 5000},
                    {res: RESOURCE_PURIFIER, amount: 500},
                    {res: RESOURCE_GHODIUM_MELT, amount: 100},
                    {res: RESOURCE_LEMERGIUM_BAR, amount: 500},
                    // {res: RESOURCE_CATALYZED_LEMERGIUM_ACID, amount: 400},
                    {res: RESOURCE_ENERGY, amount: 5000},
                    ],
                    interval: 350, //750, //750,
                    minLive: 400,
                    //body: [CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,],
                },
                // {
                //     destShard: 'shard3',
                //     destRoom: 'E42N31',
                //     flag: 'inter',
                //     resources: [
                //         {res: RESOURCE_MACHINE, amount: 1},
                //         // {res: RESOURCE_ESSENCE, amount: 1},
                //         {res: RESOURCE_LEMERGIUM_HYDRIDE, amount: 5},
                //     // {res: RESOURCE_CATALYZED_UTRIUM_ACID, amount: 800},
                //     // {res: RESOURCE_CATALYZED_ZYNTHIUM_ACID, amount: 200},
                //     // {res: RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, amount: 200},
                //     // {res: RESOURCE_CATALYZED_GHODIUM_ALKALIDE, amount: 200},
                //     {res: RESOURCE_ENERGY, amount: 5000},],
                //     interval: 55000,
                //     minLive: 400,
                //     //body: [CARRY, MOVE],
                //     body: [CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,],
                // },
                
            ]
        },
        'shard2': {
            //Memory.rooms.E42N28.boostLab = {time:Game.time+1000, boosts:[RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE]}
            //boostRoom('E42N28', [RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE], 1000)
            'E42N28': [
                // { //Memory.rooms.E42N28.delivery_shard0_E79N59_time = 1;
                //     destShard: 'shard0',
                //     destRoom: 'E79N59',
                //     flag: 'inter_tos0s0',
                //     resources: [
                //         // {res: RESOURCE_ESSENCE, amount: 200},
                //         //  {res: RESOURCE_MACHINE, amount: 300},
                //          {res: RESOURCE_DEVICE, amount: 600},
                //         {res: RESOURCE_ENERGY, amount: 5000},],
                //     interval: 250000000,
                //     minLive: 25000,
                //     body: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,],
                //     // body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,
                //     // CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                //     // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                //     // CARRY,CARRY,CARRY,CARRY,
                //     // HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                //     // MOVE,
                //     // HEAL,
                //     // ],
                //     // boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE],
                // },
                 { //Memory.rooms.E42N28.delivery_shard3_E42N31_time = 1; 
                 //Memory.creeps.intx49139400.resources[0].amount = 300
                    destShard: 'shard3',
                    destRoom: 'E42N31',
                    flag: 'inter',
                    resources: [
                        {res: RESOURCE_DEVICE, amount: 1}, 
                        //  {res: RESOURCE_DEVICE, amount: 600}, 
                        // {res: RESOURCE_CATALYZED_GHODIUM_ACID, amount: 5000},
                        /* {res: RESOURCE_CATALYZED_LEMERGIUM_ACID, amount: 50},*/ 
                        {res: RESOURCE_ENERGY, amount: 5000},],
                    interval: 300,//1500,
                    minLive: 400,
                    body: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,],
                    // body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,
                    // CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                    // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    // CARRY,CARRY,CARRY,CARRY,
                    // HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                    // MOVE,
                    // HEAL,
                    // ],
                    // boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE],
                    // body: [CARRY, MOVE],
                },

            ],
            // 'E41N39': [
            //     {
            //         destShard: 'shard1',
            //         destRoom: 'E41N38',
            //         flag: 'inter_tos1s1',
            //         resources: [
            //             //  {res: RESOURCE_MACHINE, amount: 1000}, 
            //             // {res: RESOURCE_CATALYZED_KEANIUM_ALKALIDE, amount: 283},
            //             // {res: RESOURCE_CATALYZED_UTRIUM_ACID, amount: 283},
            //             // {res: RESOURCE_CATALYZED_LEMERGIUM_ACID, amount: 28003},
            //             // {res: RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, amount: 600},
            //             // {res: RESOURCE_CATALYZED_KEANIUM_ACID, amount: 5000},
            //             {res: RESOURCE_ENERGY, amount: 5000},],
            //         interval: 10000000,
            //         minLive: 5400, 
            //         //body: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,],
            //         body: [CARRY, MOVE],
            //     },
            // ],
            'E41N39': [ //Memory.rooms.E41N39.delivery_shard1_E41N38_time = 1;
            //Game.rooms.E42N28.terminal.send(RESOURCE_DEVICE, 600, 'E41N39');
            //Memory.creeps.intx50354620.resources[0] = {res:RESOURCE_DEVICE, amount:400, c:1};
            //Memory.creeps.intx50354620.priorityByStock = undefined;
                {
                    destShard: 'shard1',
                    destRoom: 'E41N38',
                    flag: 'inter_tos1s1',
                    conditionsAnd: [
                        {res: RESOURCE_ZYNTHIUM, amount: 500000},
                        {res: RESOURCE_LEMERGIUM,amount: 500000},
                        {res: RESOURCE_OXYGEN,   amount: 500000},
                        {res: RESOURCE_HYDROGEN, amount: 500000},
                        {res: RESOURCE_CATALYST, amount: 500000},
                        {res: RESOURCE_KEANIUM,  amount: 500000},
                        {res: RESOURCE_UTRIUM,   amount: 500000},
                    ],
                    remoteResourceAmount: [
                        {res: RESOURCE_ZYNTHIUM, amount: 9000, maxLocalAmount: 500000},
                        {res: RESOURCE_LEMERGIUM,amount: 9000, maxLocalAmount: 500000},
                        {res: RESOURCE_OXYGEN,   amount: 9000, maxLocalAmount: 500000},
                        {res: RESOURCE_HYDROGEN, amount: 9000, maxLocalAmount: 500000},
                        {res: RESOURCE_CATALYST, amount: 9000, maxLocalAmount: 500000},
                        {res: RESOURCE_KEANIUM,  amount: 9000, maxLocalAmount: 500000},
                        {res: RESOURCE_UTRIUM,   amount: 9000, maxLocalAmount: 500000},
                    ],
                    priorityByStock: [RESOURCE_ZYNTHIUM, RESOURCE_LEMERGIUM, RESOURCE_OXYGEN, RESOURCE_HYDROGEN, RESOURCE_CATALYST, RESOURCE_KEANIUM,RESOURCE_UTRIUM],
                    resources: [
                        //{res: RESOURCE_OPS, amount: 100}, 
                        {res: RESOURCE_ENERGY, amount: 1}, 
                    ],
                    empty: 1,
                    interval: 200,//100, //150
                    minLive: 500, 
                    boosts: [],//RESOURCE_CATALYZED_KEANIUM_ACID],
                }, 
            ],
            'E41N19': [
                {
                    destShard: 'shard3',
                    destRoom: 'E39N21',
                    flag: 'inter_tos3s3',
                    conditionsAnd: [
                        {res: RESOURCE_UTRIUM, amount: 1200000},
                        {res: RESOURCE_HYDROGEN, amount: 600000},
                        {res: RESOURCE_CATALYST, amount: 600000},
                    ],
                    remoteResourceAmount: [
                        {res: RESOURCE_UTRIUM, amount: 9000, maxLocalAmount: 1200000},
                        {res: RESOURCE_HYDROGEN, amount: 9000, maxLocalAmount: 600000},
                        {res: RESOURCE_CATALYST, amount: 9000, maxLocalAmount: 600000},
                    ],
                    priorityByStock: [RESOURCE_UTRIUM, RESOURCE_HYDROGEN,RESOURCE_CATALYST],
                    resources: [
                        {res: RESOURCE_ENERGY, amount: 300},
                    ],
                    empty: 1,
                    interval: 200,
                    minLive: 310, 
                    // body: [CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,MOVE,],
                    // boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID],
                },
            ],
        },
        'shard1': {
            'E41N38': [
                {
                    destShard: 'shard2',
                    destRoom: 'E41N39',
                    flag: 'inter_tos2froms1',
                    resources: [
                        // {res: RESOURCE_CATALYZED_LEMERGIUM_ACID, amount: 2000, minStock: 3000 },
                        // {res: RESOURCE_CATALYZED_GHODIUM_ACID, amount: 1600, minStock: 30000},
                        // {res: RESOURCE_ENERGY, amount: 5000},],
                        {res: RESOURCE_ZYNTHIUM, amount: 8000, minStock: 5000},
                        {res: RESOURCE_LEMERGIUM, amount: 8000, minStock: 5000},
                        {res: RESOURCE_OXYGEN, amount: 8000, minStock: 5000},
                        {res: RESOURCE_HYDROGEN, amount: 8000, minStock: 5000},
                        {res: RESOURCE_CATALYST, amount: 8000, minStock: 5000},
                        {res: RESOURCE_KEANIUM, amount: 8000, minStock: 5000},
                        {res: RESOURCE_UTRIUM, amount: 8000, minStock: 5000},
                        {res: RESOURCE_ENERGY, amount: 1},
                        ],
                    interval: -1,
                    minLive: 260,
                },
            ],
        },
        'shard3': {
            'E42N31': [
                {
                    destShard: 'shard2',
                    destRoom: 'E42N28',
                    flag: 'inter_tos2s2',
                    resources: [
                        {res: RESOURCE_CONDENSATE, amount: 5000, minStock: 1},
                        // {res: RESOURCE_GHODIUM_OXIDE, amount: 100},
                        // {res: RESOURCE_ZYNTHIUM_HYDRIDE, amount: 100},
                        // {res: RESOURCE_UTRIUM_HYDRIDE, amount: 100},
                        // {res: RESOURCE_LEMERGIUM_OXIDE, amount: 50},
                        // {res: RESOURCE_UTRIUM_BAR, amount: 2000},
                        // {res: RESOURCE_LEMERGIUM_BAR, amount: 2000},
                        // {res: RESOURCE_CATALYZED_KEANIUM_ALKALIDE, amount: 2000},
                        {res: RESOURCE_ENERGY, amount: 5000},
                    ],
                    interval: -1,
                    minLive: 999400,
                },
                {
                    destShard: 'shard0',
                    destRoom: 'E79N59',
                    flag: 'interBack',
                    resources: [{res: RESOURCE_ESSENCE, amount: 1},
                        //{res: RESOURCE_CONDENSATE, amount: 5000},
                        {res: RESOURCE_ENERGY, amount: 5000},],
                    interval: -1,
                    minLive: 400,
                    body: [CARRY,CARRY,CARRY,CARRY, MOVE,MOVE,MOVE,MOVE,],
                },

            ],
        'E39N21': [
                {
                    destShard: 'shard2',
                    destRoom: 'E41N19',
                    flag: 'inter_tos2fs3',
                    resources: [
                        {res: RESOURCE_UTRIUM, amount: 8000, minStock: 3000},
                        {res: RESOURCE_HYDROGEN, amount: 8000, minStock: 3000},
                        {res: RESOURCE_CATALYST, amount: 8000, minStock: 3000},
                        {res: RESOURCE_ENERGY, amount: 1},
                    ],
                    interval: -1,
                    minLive: 160,
                },
            ],
        },
    },
    body: [CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,],
    
    //body: [CARRY, MOVE],
    shardNameSufix: {
        shard0: 'a',
        shard1: 'i',
        shard2: 'x',
        shard3: 'z',
    },
    
    action: function() {
        if (1 && !(Game.time%10)) {
            let deliveryInfoList = this.deliveryInfo[Game.shard.name];
            if (deliveryInfoList) {
                for (let roomName in deliveryInfoList) {
                    for (let deliveryInfo of deliveryInfoList[roomName]) {
                        //let deliveryInfo = deliveryInfoList[roomName][task];
                        const room = Game.rooms[roomName];
                        if (deliveryInfo && room && deliveryInfo.interval>0) {
                            const field = 'delivery_'+ deliveryInfo.destShard+'_'+deliveryInfo.destRoom+'_time';
                            if (!room.memory[field] || Game.time > room.memory[field]) {
                                //find free spawn
                                const spawns = room.find(FIND_MY_STRUCTURES, {
                                    filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning;}
                                });
                                let freeSpawn = spawns.length ? spawns[0] : null;
                                if (freeSpawn && room.memory.spawnBusyTick != Game.time) {
                                    let resources = [];
                                    deliveryInfo.resources.forEach(resInfo => {
                                        if (resInfo.minStock == undefined || !Memory.stock || !Memory.stock[resInfo.res] || Memory.stock[resInfo.res] > resInfo.minStock) {
                                            resources.push({res: resInfo.res, amount: resInfo.amount, c:1});
                                        }
                                    });

                                    let conditionOK = false;
                                    if (deliveryInfo.conditionsOr && Memory.stock) {
                                        for (let conditionInfo of deliveryInfo.conditionsOr) {
                                            if (Memory.stock[conditionInfo.res] >= conditionInfo.amount) {
                                                conditionOK = true;
                                            }
                                        } 
                                    }
                                    if (deliveryInfo.conditionsAnd && Memory.stock) {
                                        conditionOK = true;
                                        for (let conditionInfo of deliveryInfo.conditionsAnd) {
                                            if (Memory.stock[conditionInfo.res] < conditionInfo.amount) {
                                                conditionOK = false;
                                            }
                                        } 
                                        //console.log(roomName, 'conditionOK', conditionOK);
                                    }
                                    let spawnInterval = deliveryInfo.interval;
                                    let isBoostEnable = true;
                                    
                                    const STOP_SPAWN_TICKS = 3000;
                                    const TICKRATE = 4.19;
                                    
                                    if (!conditionOK && deliveryInfo.remoteResourceAmount && Memory.stock) {
                                        const data = JSON.parse(InterShardMemory.getRemote(deliveryInfo.destShard) || "{}");
                                        if (data && data.stock) {
                                            conditionOK = true;
                                            let isStockHalfFull = true;
                                            for (let conditionInfo of deliveryInfo.remoteResourceAmount) {
                                                let maxLocalAmount = conditionInfo.maxLocalAmount?conditionInfo.maxLocalAmount:9000000;
                                                if (data.stock[conditionInfo.res] >= conditionInfo.amount && _.get(Memory, 'stock['+conditionInfo.res+']', 0) < maxLocalAmount) {
                                                    conditionOK = false;
                                                    if (_.get(Memory, 'stock['+conditionInfo.res+']', 0) < maxLocalAmount/2) {
                                                        isStockHalfFull = false;
                                                    }
                                                }
                                            }
                                            if (isStockHalfFull) {
                                                spawnInterval = deliveryInfo.interval * 2;
                                                isBoostEnable = false;
                                            }
                                        }
                                        if (data && data.inter_attacked) {
                                            const stopTime =  Math.round(STOP_SPAWN_TICKS*TICKRATE);
                                            if ((Date.now() - data.inter_attacked) < 1000*stopTime) {
                                                conditionOK = true; //stop spawn
                                                Game.notify('intershard spawn stopped to '+deliveryInfo.destShard+'  '+Math.round((Date.now() - data.inter_attacked)/1000)+' / '+stopTime+' second');
                                                console.log('intershard spawn stopped to '+deliveryInfo.destShard+'  '+Math.round((Date.now() - data.inter_attacked)/1000)+' / '+stopTime+' second');
                                            }
                                        }
                                    }
                                    
                                    if (Memory.inter_attacked && Memory.inter_attacked[room.name] && (Game.time - Memory.inter_attacked[room.name]) < STOP_SPAWN_TICKS) {
                                        conditionOK = true; //stop spawn
                                        Game.notify('intershard spawn stopped to '+deliveryInfo.destShard+'  '+Game.time - Memory.inter_attacked[room.name]+' / '+STOP_SPAWN_TICKS+' ticks');
                                        console.log('intershard spawn stopped to '+deliveryInfo.destShard+'  '+Game.time - Memory.inter_attacked[room.name]+' / '+STOP_SPAWN_TICKS+' ticks');
                                        
                                    }
                                    
                                    if (!conditionOK && (resources.length > 1 || deliveryInfo.empty)) {
                                        
                                        let priorityByStock = undefined;
                                        if (deliveryInfo.priorityByStock) {
                                            priorityByStock = _.sortBy(deliveryInfo.priorityByStock.slice(), res=>Memory.stock[res]);//.reverse();
                                        }
                                        
                                        let res =  freeSpawn.spawnCreep(deliveryInfo.body?deliveryInfo.body:this.body, 'int'+this.shardNameSufix[Game.shard.name]+Game.time, 
                                        {memory: {role: 'intershard', flag: deliveryInfo.flag, resources: resources, destShard: deliveryInfo.destShard, destRoom: deliveryInfo.destRoom, 
                                        boosts: (isBoostEnable && deliveryInfo.boosts)?deliveryInfo.boosts.slice():[], 
                                        homeRoom: roomName, homeShard: Game.shard.name, priorityByStock:priorityByStock }});  
                                        if (res == OK) {
                                            room.memory[field] = Game.time + spawnInterval;
                                            room.memory.spawnBusyTick = Game.time;
                                        }
                                    } else {
                                        //Game.notify('Intershard from '+Game.shard.name+' '+room.name+' out of resource or condition');
                                        room.memory[field] = Game.time + spawnInterval;
                                    }
                                }
                            } 
                        }
                    }
                }
            }
        }
        
        if (!(Game.time%300)) {
            this.recycleMemory();
        }
        
    },
    
    restoreMemory: function(creep) {
        const checkShard = {
        'shard0': ['shard1'],
        'shard1': ['shard0','shard2',],
        'shard2': ['shard1','shard3',],
        'shard3': ['shard2'],
        }
        if (creep.memory.role) {
            return 0;
        }
        
        if (!checkShard[Game.shard.name]) {
            return 0;
        }
        
        let creepMemory = {};
        for (shard of checkShard[Game.shard.name]) {
            const data = JSON.parse(InterShardMemory.getRemote(shard) || "{}");
            //console.log(shard, creep.name, JSON.stringify(data));
            if (data.creeps && data.creeps[creep.name] && data.creeps[creep.name].timeIndex){
                if (!creepMemory.timeIndex || creepMemory.timeIndex < data.creeps[creep.name].timeIndex) {
                    creepMemory = data.creeps[creep.name];
                }
            }
        }
        if (!_.isEmpty(creepMemory)) {
            creep.memory = creepMemory;
            creep.memory.timeIndex++;
            return 1;
        }
        return 0;
    },
    saveMemory: function(creep, forced = 0) {
        if (!creep.memory.role) {
            return;
        }
        if (creep.memory.timeIndex && creep.memory.timeIndex == creep.memory.timeIndexSaved && !forced) {
            return;
        }
        
        let data = JSON.parse(InterShardMemory.getLocal() || "{}");
        if (!data.creeps) {
            data.creeps = {};
            InterShardMemory.setLocal(JSON.stringify(data));
        }
        //console.log(JSON.stringify(data));
        
        if (!creep.memory.timeIndex) {
            creep.memory.timeIndex = 1;
        }
        if (!data.creeps[creep.name] || data.creeps[creep.name].timeIndex < creep.memory.timeIndex || forced) {
            data.creeps[creep.name] = creep.memory;
            data.creeps[creep.name]._move = undefined;
            data.creeps[creep.name].time = Game.time;
            try {
                InterShardMemory.setLocal(JSON.stringify(data));
            } catch (e) {
                Game.notify('Intershard memory exceed');
            }
            
            creep.memory.timeIndexSaved = creep.memory.timeIndex;
        }
        
        
        
    },
    //require('role.inter').recycleMemory();
    recycleMemory: function(){
        let data = JSON.parse(InterShardMemory.getLocal() || "{}");
        let before = InterShardMemory.getLocal().length;
        let after = before;
        if (data.creeps) {
            for (creep in data.creeps) {
                if (!data.creeps[creep].time || data.creeps[creep].time < Game.time - 4000) {
                    data.creeps[creep] = undefined;
                }
            }
            let dataString = JSON.stringify(data);
            if (dataString.length > 80000) {
                Game.notify('Intershard memory exceed on '+Game.shard.name+' Size: '+dataString.length);
            }
            InterShardMemory.setLocal(dataString);
            after = dataString.length;
        }
        console.log('Intershard recycle memory ', Game.shard.name, before, '->', after);
    },
    
    checkAttacked: function(creep) {
        if (creep.hits === creep.hitsMax) return;
        if (creep.memory.lastHits && creep.hits >= creep.memory.lastHits) return;
        creep.memory.lastHits = creep.hits;
        console.log('Intershard creep attacked in room', helpers.getRoomLink(creep.room.name));
         // Find all hostile actions against your creeps and structures
        let eventLog = creep.room.getEventLog();
        let attackEvents = _.filter(eventLog, {event: EVENT_ATTACK});
        attackEvents.some(event => {
            let target = Game.getObjectById(event.data.targetId);
            if(target && target.my && event.data.attackType != EVENT_ATTACK_TYPE_HIT_BACK) {
                let enemy = Game.getObjectById(event.objectId);
                let user = 'Unknown';
                if (enemy && enemy.owner) {
                    user = enemy.owner.username;
                }
                if (user == 'Screeps') {
                    return;
                }
                
                if (0 || user == 'somygame') {
                    Game.notify('Intershard creep attacked in room '+creep.room.name+' by '+user);
                    console.log('Intershard creep attacked in room', helpers.getRoomLink(creep.room.name), 'by user', user , 'Stop spawn');
                    
                    if (Game.shard.name != creep.memory.homeShard){
                       let data = JSON.parse(InterShardMemory.getLocal() || "{}");
                       data.inter_attacked = Date.now();        
                       InterShardMemory.setLocal(JSON.stringify(data));
                   } else {
                       if (!Memory.inter_attacked) Memory.inter_attacked = {};
                       Memory.inter_attacked[creep.memory.homeRoom] = Game.time;
                   }
                   
                   if (!creep.memory.inter_attacked) {
                       creep.room.find(FIND_MY_CREEPS).forEach(creep => creep.say('😫', 1));
                   }
                   creep.memory.inter_attacked = 1;
                   return true;    
                } else {
                    console.log('Intershard creep attacked in room', helpers.getRoomLink(creep.room.name), 'by user', user );
                }
            }
        });
        
        
        
        
        
    },
    
    run: function(creep) {
        if (creep.spawning) {
            return;
        }
        if (creep.memory.boosts && creep.memory.boosts.length) {
            return;
        }
        this.checkAttacked(creep);
        
        this.saveMemory(creep);
        //creep.say(creep.memory.timeIndex+creep.memory.role);
        
        let flag = Game.flags[creep.memory.flag];
        if (!flag) {
            creep.say('noflag');
            Game.notify('inter no flag '+ creep.memory.flag + ' in shard '+Game.shard.name);
            return;
        }
        let resources = creep.memory.resources;
        if (!resources) {
            return;
        }
        if (creep.getActiveBodyparts(HEAL)) {
            creep.heal(creep);
        }
        
        if (!creep.memory.loaded && creep.room.terminal && creep.room.terminal.my && creep.room.storage) {
            let resourceArr;
            if (creep.memory.priorityByStock) {
                resourceArr = creep.memory.priorityByStock.slice();
                resourceArr.push(RESOURCE_ENERGY);
                // resourceArr.push(RESOURCE_OPS);
                // resourceArr.push(RESOURCE_MACHINE);
            } else {
                resourceArr = resources.map(r=>r.res);
            }
            
            let loaded = true;
            for (let res of resourceArr) {
                let resInfo = _.find(resources, {res:res});
                if (!resInfo) continue;
                if (creep.store[resInfo.res]) {
                    continue;
                }
                let target = creep.room.terminal;
                if (!target.store[resInfo.res] || creep.room.storage.store[resInfo.res] > target.store[resInfo.res]) {
                    target = creep.room.storage;
                }
                if (!target.store[resInfo.res]) {
                    continue;
                }
                if (creep.pos.isNearTo(target)) {
                    creep.withdraw(target, resInfo.res, Math.min(resInfo.amount, creep.store.getFreeCapacity(), target.store[resInfo.res]) );    
                } else {
                    helpers.smartMove(creep, target);
                }
                loaded = false;
                break;
            }
            if (loaded || !creep.store.getFreeCapacity()) {
                creep.memory.loaded = 1;
                if (creep.store[RESOURCE_MACHINE]) {
                    creep.memory.warningMove = 1;
                }
                this.saveMemory(creep, 1);
            }

        } else {
            if (Game.shard.name == creep.memory.destShard && creep.room.name == creep.memory.destRoom) {
                if (creep.store.getUsedCapacity()) {
                    let target = creep.room.terminal;
                    if (target.store.getFreeCapacity() < 10000 && creep.room.storage && creep.room.storage.store.getFreeCapacity() > 10000) {
                        target = creep.room.storage;
                    }
                    if (target && creep.pos.isNearTo(target)) {
                        creep.memory.isNearTarget = undefined;
                        for (let res in creep.store){
                            if (creep.transfer(target, res) == ERR_FULL) {
                                if (creep.store[RESOURCE_ENERGY]) {
                                    creep.drop(RESOURCE_ENERGY);
                                }
                                freeSpace(creep.room.name);
                                break;
                            }
                        }
                    } else {
                        if (creep.pos.getRangeTo(target) < 4 || creep.memory.isNearTarget) {
                            creep.memory.isNearTarget = 1;
                            creep.moveTo(target, {range:1});
                        } else {
                            helpers.smartMove(creep, target);        
                        }
                    }
                } else {
                    if (this.deliveryInfo[Game.shard.name] && this.deliveryInfo[Game.shard.name][creep.room.name]) {
                        let deliveryInfo =  _.find(this.deliveryInfo[Game.shard.name][creep.room.name], {'destShard': creep.memory.homeShard, 'destRoom': creep.memory.homeRoom});
                        if (deliveryInfo && creep.ticksToLive > deliveryInfo.minLive && !creep.memory.inter_attacked) {
                            let resources = [];
                            deliveryInfo.resources.forEach(resInfo => {
                                if (resInfo.minStock == undefined || !Memory.stock || !Memory.stock[resInfo.res] || Memory.stock[resInfo.res] > resInfo.minStock) {
                                    resources.push({res: resInfo.res, amount: resInfo.amount, c:1});
                                }
                            });
                            creep.memory.resources = resources; //deliveryInfo.resources;
                            creep.memory.flag = deliveryInfo.flag;
                            creep.memory.destShard = deliveryInfo.destShard;
                            creep.memory.destRoom = deliveryInfo.destRoom;
                            creep.memory.homeShard = Game.shard.name;
                            creep.memory.homeRoom = creep.room.name;
                            creep.memory.loaded = 0;
                            this.saveMemory(creep, 1);
                        } else {
                            helpers.recycleCreep(creep);
                        }
                    } else {
                        helpers.recycleCreep(creep);
                    }
                }
            } else {
                if (creep.pos.isNearTo(flag)) {
                    creep.move(creep.pos.getDirectionTo(flag));
                } else {
                    helpers.smartMove(creep, flag);        
                }
                
            }
            
            
        }
        
    }
};

module.exports = roleInter; 