var roleMassRanger = require('role.massRanger'); 

var shardCfg = {
    myRooms: [
        /* 0 */{roomName: 'E42N31', sector: [1,2,/* 3 */], atack_sector: 1, massRanger_team: 0, assault_team: 1, lab:1, factory: 1, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, superharvester: 0},keepers: []},
        /* 1 */{roomName: 'E46N31', sector: [6,/* 12 */], atack_sector: 2, massRanger_team: 0, assault_team: 0, lab:2, factory: 2, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, superharvester: 0},keepers: []},
        /* 2 */{roomName: 'E45N28', sector: [/*13*/], atack_sector: 3, massRanger_team: 0, assault_team: 0, lab:3, factory: 3, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, superharvester: 0},keepers: []},
        /* 3 */{roomName: 'E39N28', sector: [], atack_sector: 0, massRanger_team: 0, assault_team: 0, lab:4, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 0, filler: 0},keepers: []},
        /* 4 */{roomName: 'E42N29', sector: [], atack_sector: 0, massRanger_team: 0, assault_team: 0, lab:0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 0, filler: 0},keepers: []},
        /* 5 */{roomName: 'E47N29', sector: [], atack_sector: 0, massRanger_team: 0, assault_team: 0, lab:0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 0, filler: 0},keepers: []},
        /* 6 */{roomName: 'E39N26', sector: [], atack_sector: 0, massRanger_team: 0, assault_team: 0, lab:0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 0, filler: 0},keepers: []},
        /* 7 */{roomName: 'E39N21', sector: [], atack_sector: 0, massRanger_team: 0, assault_team: 0, lab:0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 0, filler: 0},keepers: []},
        /* 8 */{roomName: 'E48N33', sector: [], atack_sector: 0, massRanger_team: 0, assault_team: 0, lab:0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 0, filler: 0},keepers: []},
        /* 9 */{roomName: 'E39N31', sector: [], atack_sector: 0, massRanger_team: 0, assault_team: 0, lab:0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 0, filler: 0},keepers: []},
    ], //timeSavingEnable('E48N33')
    
    
    skRooms: [],
    labConfig: [
        {id: 0, labs: [], reaction: []},
        {id: 1, labs: [], reaction: []},
        {id: 2, labs: [], reaction: []},
        {id: 3, labs: [], reaction: []},
        {id: 4, labs: [], reaction: []},
        // {id: 1, labs: ['endProduct',RESOURCE_ZYNTHIUM_KEANITE,RESOURCE_UTRIUM_LEMERGITE,RESOURCE_UTRIUM,RESOURCE_UTRIUM_LEMERGITE,RESOURCE_ZYNTHIUM,RESOURCE_KEANIUM,RESOURCE_LEMERGIUM,RESOURCE_ZYNTHIUM_KEANITE,'endProduct'], reaction: [[4,7,3],[2,7,3],[1,5,6],[8,5,6],[0,1,2],[9,4,8]]},//ghodium
        // {id: 2, labs: [RESOURCE_HYDROXIDE,RESOURCE_CATALYST,RESOURCE_HYDROGEN,RESOURCE_GHODIUM,RESOURCE_GHODIUM_OXIDE,/*'endProduct'*/RESOURCE_LEMERGIUM_HYDRIDE,'endProduct',RESOURCE_OXYGEN,'endProduct',RESOURCE_GHODIUM_ALKALIDE], reaction: [[4,3,7],[0,7,2],[9,4,0],[8,1,9],/*[5,1,9],*/[6,1,9]]}, //XGHO2
        // {id: 3,conditions: [{resource: RESOURCE_LEMERGIUM_HYDRIDE, amount: 50000}], labs: ['endProduct',RESOURCE_LEMERGIUM,'endProduct','endProduct','endProduct',RESOURCE_CATALYZED_LEMERGIUM_ACID,'endProduct',RESOURCE_HYDROGEN,'endProduct',RESOURCE_CATALYZED_GHODIUM_ACID],reaction: [[0,1,7],[2,1,7],[3,1,7],[4,1,7],[6,1,7],[8,1,7],]},
        // /* * */{id: 4, labs: [RESOURCE_HYDROXIDE,RESOURCE_CATALYST,RESOURCE_HYDROGEN,RESOURCE_KEANIUM,RESOURCE_KEANIUM_OXIDE,/*'endProduct'*/RESOURCE_CATALYZED_GHODIUM_ACID,'endProduct',RESOURCE_OXYGEN,'endProduct',RESOURCE_KEANIUM_ALKALIDE], reaction: [[4,3,7],[0,7,2],[9,4,0],[8,1,9],/*[5,1,9],*/[6,1,9]]}, //XKHO2
        // {id: 5, labs: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_LEMERGIUM_HYDRIDE], reaction: []},
        // {id: 6, labs: ['endProduct',RESOURCE_GHODIUM_OXIDE,'endProduct',RESOURCE_GHODIUM_OXIDE,RESOURCE_GHODIUM_OXIDE,RESOURCE_LEMERGIUM_HYDRIDE,RESOURCE_GHODIUM_OXIDE,RESOURCE_GHODIUM_OXIDE,RESOURCE_GHODIUM_OXIDE,RESOURCE_GHODIUM_OXIDE],
        //     reaction: [[-1,0,2,],[-3,0,2,],[-4,0,2,],[-6,0,2,],[-7,0,2,],[-8,0,2,],[-9,0,2,],]},
        // {id: 7, labs: [RESOURCE_HYDROXIDE,RESOURCE_CATALYST,RESOURCE_GHODIUM_HYDRIDE,RESOURCE_GHODIUM,RESOURCE_OXYGEN,RESOURCE_LEMERGIUM_HYDRIDE,'endFullProduct',RESOURCE_HYDROGEN,'endProduct',RESOURCE_GHODIUM_ACID], reaction: [[2,3,7],[0,7,4],[9,2,0],[8,9,1],[6,9,1]]},
        // {id: 8, labs: [RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_LEMERGIUM_HYDRIDE], reaction: []},
        // {id: 9, labs: [RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_LEMERGIUM_HYDRIDE], reaction: []},
        {id: 99, labs: [RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ALKALIDE], reaction: []},
    ],
    factoryConfig: [
        {id: 0, factoryId:'', endProduct: [], produce:[]},
        {id: 1, endProduct: [RESOURCE_KEANIUM_BAR, RESOURCE_CONDENSATE,], produce:[
            {product: RESOURCE_CONDENSATE, ingridients: [{resource: RESOURCE_ENERGY, amount: 40}, {resource: RESOURCE_KEANIUM_BAR, amount: 20, external: 1}, {resource: RESOURCE_MIST, amount: 100, external: 1}], needAmount: 100000},
            {product: RESOURCE_KEANIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_KEANIUM, amount: 500, external: 1}], needAmount: 1000},
            {product: RESOURCE_KEANIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_KEANIUM, amount: 500, external: 1}], needAmount: 150000, conditions: [{resource: RESOURCE_KEANIUM, amount: 10000}],},
        ]},
        {id: 2, factoryId: '5e50de1f03592765820c46e1',  endProduct: [RESOURCE_LEMERGIUM_BAR, ], produce:[
            {product: RESOURCE_LEMERGIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_LEMERGIUM, amount: 500, external: 1}], needAmount: 300000, conditions: [{resource: RESOURCE_LEMERGIUM, amount: 130000}],},
        ]},
        {id:3, endProduct: [RESOURCE_OXIDANT], produce:[
            {product: RESOURCE_OXIDANT, needAmount: 400000, conditions: [{resource: RESOURCE_OXYGEN, amount: 40000}],},
        ]},
    ],
    sectorAttackers: [
        {id: 0, creeps: {}},
        {id: 1, creeps: {atacker:0, hunter:1}, place: {room: "E42N31", posx: 24, posy: 19, flag: 'FlagAttack1'}, qwadrant: 0},
        {id: 2, creeps: {atacker:0, hunter:1}, place: {room: "E46N32", posx: 22, posy: 43,  flag: 'FlagAttack2'}, qwadrant: 0},
        {id: 3, creeps: {atacker:0, hunter:0}, place: {room: "E46N28", posx: 6, posy: 17,  flag: 'FlagAttack3'}, qwadrant: 1},
    ],
    sectorCreeps: [
        {id: 0, creeps: {}},
        {id: 1, creeps: {miner: 2, supertransporter: 1}},
        {id: 2, creeps: {miner: 3, supertransporter: 1}},
        {id: 3, creeps: {miner: 2, supertransporter: 1}},
        {id: 4, creeps: {miner: 0, supertransporter: 0}},//del
        {id: 5, creeps: {miner: 0, supertransporter: 0}},//del
        {id: 6, creeps: {miner: 6, supertransporter: 4, test: 0}}, //Game.rooms.E46N31.find(FIND_MY_CREEPS, {filter: c=>{if (c.memory.role == 'test'){c.say('t');c.suicide()}}})
        {id: 7, creeps: {miner: 0, supertransporter: 0}},//del
        {id: 8, creeps: {miner: 0, supertransporter: 0}},//del
        {id: 9, creeps: {miner: 0, supertransporter: 0}},
        {id: 10, creeps: {miner: 0, supertransporter: 0}},//del
        {id: 11, creeps: {miner: 0, supertransporter: 0}},//del
        {id: 12, creeps: {miner: 1, supertransporter: 1}},
        {id: 13, creeps: {miner: 4, supertransporter: 3}},
    ],
    depositHarvesting: {
        // 'E45N28': { depositRooms: [
        //     'E40N30','E41N30','E42N30','E43N30','E44N30','E45N30','E46N30','E47N30','E48N30','E40N31', 'E40N32', 'E40N33','E39N30','E40N29','E40N28','E40N27','E40N26',
        // ], roomToHarvestDeposits: ['E42N31','E46N31','E39N28'],},
    },
    powerHarvesting: {
        // 'E42N31': {sector: 0, powerRooms: ['E40N30','E41N30','E42N30','E43N30','E44N30','E45N30', 'E40N31', 'E40N32', 'E40N33',/*'E39N30',*/]},
        // 'E39N28': {sector: 1, powerRooms: ['E40N30','E40N29','E40N28','E40N27','E40N26',]}, 
        // 'E46N31': {sector: 2, powerRooms: ['E44N30','E45N30','E46N30','E47N30','E48N30',]}, 
    },
    teamAssaults: [
        // {id: 0, creeps: {assault:0, defender:0, healer: 0, transporter: 0, transporter2: 0 }, place: {room: "E83N54", posx: 26, posy: 10}},
        // {id: 1, creeps: {assault:0, defender:0, healer: 0, transporter: 0, transporter2: 0 }, place: {room: "E83N54", posx: 26, posy: 10}},
    ],
    teamMassRangers: {
        0: {id: 0, creeps: {}, },
        // 1: {id: 1, creeps: {massRanger: roleMassRanger.getRangerCount(1)}, },
    },
    strongholdCheck: {
        // 'E46N31': {
        //     rooms: ['E46N34','E45N34','E44N34','E46N35','E45N35','E44N35','E46N36','E45N36','E44N36',],
        //     atackerRoom: 'E46N31',
        //     qwadrant: 0,
        // },
        // 'E45N28': {
        //     rooms: ['E46N24','E45N24','E44N24','E46N25','E45N25','E44N25','E46N26','E45N26','E44N26',],
        //     atackerRoom: 'E45N28',
        //     qwadrant: 1,
        // },
    },
    manageResources: {
        'E42N31': {
            [RESOURCE_OPS]:      {conditionsOr: [{res: RESOURCE_OPS,      amount: 5000}],    maxPrice: 10.250, buyAmount: 3000},
            [RESOURCE_CATALYST]: {conditionsOr: [{res: RESOURCE_CATALYST, amount: 30000}, ], maxPrice: 135.501, buyAmount: 5000},
            [RESOURCE_OXYGEN]:   {conditionsOr: [{res: RESOURCE_OXYGEN,   amount: 15000}, ], maxPrice: 55.501, buyAmount: 5000},
            [RESOURCE_KEANIUM]:  {conditionsOr: [{res: RESOURCE_KEANIUM,  amount: 15000}, ], maxPrice: 31.501, buyAmount: 5000},
            [RESOURCE_HYDROGEN]: {conditionsOr: [{res: RESOURCE_HYDROGEN, amount: 15000},],  maxPrice: 110.450,buyAmount: 10000},
            [RESOURCE_POWER]:    {conditionsOr: [{res: RESOURCE_POWER,    amount: 7000}],    maxPrice: 400.950, buyAmount: 8000}, 
            [RESOURCE_UTRIUM]:   {conditionsOr: [{res: RESOURCE_UTRIUM,   amount: 15000}, ], maxPrice: 38.501, buyAmount: 5000},
            [RESOURCE_LEMERGIUM]:{conditionsOr: [{res: RESOURCE_LEMERGIUM,amount: 10000}, ], maxPrice: 68.501, buyAmount: 5000},
            [RESOURCE_ZYNTHIUM]: {conditionsOr: [{res: RESOURCE_ZYNTHIUM, amount: 15000}, ], maxPrice: 102.501, buyAmount: 5000},
            // [RESOURCE_CATALYZED_GHODIUM_ACID]: {conditionsOr: [{res: RESOURCE_CATALYZED_GHODIUM_ACID, amount: 300000}, ], maxPrice: 75.501, buyAmount: 10000},
        },
        'E39N21': {
            [RESOURCE_UTRIUM]: {conditionsOr: [{res: RESOURCE_UTRIUM, amount: 170000}, ], maxPrice: 52.501, buyAmount: 30000},
            [RESOURCE_HYDROGEN]: {conditionsOr: [{res: RESOURCE_HYDROGEN, amount: 170000},],  maxPrice: 110.450, buyAmount: 30000},
            [RESOURCE_CATALYST]: {conditionsOr: [{res: RESOURCE_CATALYST, amount: 170000}, ], maxPrice: 135.501, buyAmount: 30000},
        },

    },
    
   
    clone: function(object) {
        return require('fastest-json-copy').copy(object);
    },




    getCfg: function () {
        
        
        //E42N31
        //Game.rooms.E42N31.memory.resetLab = 1;    
        // this.labConfig[4].reaction = [];
        // this.labConfig[4].labs = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ACID];

        
        if (0){
            let helpRooms = ['E39N28',];
            for (const helpRoomName of helpRooms) {
                let helpRoom = Game.rooms[helpRoomName];//'E55N31'];E52N32 E49N22
                if (1 && helpRoom && helpRoom.terminal && helpRoom.storage && helpRoom.storage.store[RESOURCE_ENERGY] < 300000 && helpRoom.terminal.store[RESOURCE_ENERGY] < 60000) {
                    //send energy to target room
                    const targetRoom = helpRoom.name;
                    for(const myRoom of this.myRooms) {
                        const room = Game.rooms[myRoom.roomName];
                        if (room && room.terminal && !room.terminal.cooldown && room.terminal.store[RESOURCE_ENERGY]>40000 && room.storage && room.storage.store[RESOURCE_ENERGY]>200000 && room.name != targetRoom && room.name !='E44N38_' && !helpRooms.includes(room.name)){
                            room.terminal.send(RESOURCE_ENERGY, 15000, targetRoom);
                            if (global.VERBOSE_CPU) console.log('send energy',15000, targetRoom);
                        }
                    }
                }
            }
        }
        
        // if (!Memory.observerSwitch || Game.time>Memory.observerSwitch) {
        //     if (!Memory.observerMode || Memory.observerMode == 'power') {
        //         Memory.observerMode = 'deposit';
        //     } else {
        //         Memory.observerMode = 'power';
        //     }
        //     Memory.observerSwitch = Game.time + 30;
        // }

        // if (!Memory.observerMode || Memory.observerMode == 'power') {
        //     var powerHarvesting = this.powerHarvesting;
        //     var depositHarvesting = {};
        // } else {
        //     var powerHarvesting = {};
        //     var depositHarvesting = this.depositHarvesting;
        // }
        var powerHarvesting = this.powerHarvesting;
        var depositHarvesting = this.depositHarvesting;
        
        
        return [this.clone(this.myRooms), this.clone(this.skRooms), this.clone(this.labConfig), this.clone(this.factoryConfig), this.clone(this.sectorAttackers), this.clone(this.sectorCreeps), this.clone(depositHarvesting), 
            this.clone(powerHarvesting), this.clone(this.teamAssaults), this.clone(this.teamMassRangers), this.clone(this.strongholdCheck), this.clone(this.manageResources),];

        // return [this.myRooms, this.skRooms, this.labConfig, this.factoryConfig, this.sectorAttackers, this.sectorCreeps, depositHarvesting, powerHarvesting, this.teamAssaults,
        //     this.teamMassRangers, this.strongholdCheck, this.manageResources,];
    },
    
    sectorTargets: [
        {id: 0, targets: [],},
        {id: 1, targets: [
            {flag:'Flag2', id: '5bbcaf819099fc012e63aafb', r: 2},
            {flag:'Flag1', id: '5bbcaf819099fc012e63aafd', r: 2},
        ],},     
        {id: 2, targets: [
            {flag:'Flag3', id: '5bbcaf5c9099fc012e63a7f1', r: 2},
            {flag:'Flag3', id: '5bbcaf5c9099fc012e63a7f2', r: 2},
            {flag:'Flag6', id: '5bbcaf5c9099fc012e63a7ee', r: 2},
        ],},     
        {id: 3, targets: [
            {flag:'Flag4', id: '5bbcaf6d9099fc012e63a972', r: 2},
            {flag:'Flag5', id: '5bbcaf819099fc012e63aaf8', r: 2},
        ],},     
        {id: 4, targets: [
            {flag:'Flag6', id: '5bbcaf5c9099fc012e63a7ee', r: 2},
        ],},     
        {id: 5, targets: [
            {flag:'Flag1', id: '5bbcaf819099fc012e63aafd', r: 2},
        ],},     
        {id: 6, targets: [
            {flag:'Flag8', id: '5bbcafba9099fc012e63b12d', r: 2},
            {flag:'Flag8', id: '5bbcafba9099fc012e63b12c', r: 2},
            {flag:'Flag9', id: '5bbcafa39099fc012e63aefc', r: 2},
            {flag:'Flag10', id: '5bbcafa39099fc012e63aefb', r: 2},
            {flag:'Flag12', id: '5bbcafcc9099fc012e63b354', r: 2},
            {flag:'Flag13', id: '5bbcafcc9099fc012e63b352', r: 2},
        ],},     
        {id: 7, targets: [
            {flag:'Flag9', id: '5bbcafa39099fc012e63aefc', r: 2},
        ],},     
        {id: 8, targets: [
            {flag:'Flag10', id: '5bbcafa39099fc012e63aefb', r: 2},
        ],},     
        {id: 9, targets: [
            {flag:'Flag9', id: '5bbcafa39099fc012e63aefc', r: 2},
            {flag:'Flag10', id: '5bbcafa39099fc012e63aefb', r: 2},
        ],},     
        {id: 10, targets: [
            {flag:'Flag12', id: '5bbcafcc9099fc012e63b354', r: 2},
        ],},     
        {id: 11, targets: [
            {flag:'Flag13', id: '5bbcafcc9099fc012e63b352', r: 2},
        ],},     
        {id: 12, targets: [
            {flag:'Flag14', id: '5bbcafcc9099fc012e63b356', r: 2},
        ],},     
        {id: 13, targets: [
            {flag:'Flag15', id: '5bbcafbb9099fc012e63b139', r: 2},
            {flag:'Flag15', id: '5bbcafbb9099fc012e63b13a', r: 2},
            {flag:'Flag16', id: '5bbcafbb9099fc012e63b136', r: 2},
            {flag:'Flag16', id: '5bbcafbb9099fc012e63b134', r: 2},
        ],},     
    ],
    getSectorTargets: function(sectorId) {
       if (!this.sectorTargets[sectorId] || this.sectorTargets[sectorId].id != sectorId) {
           Game.notify('getSectorTargets error '+sectorId);
           return [];
       }
       return this.sectorTargets[sectorId].targets;
    },
    
    //getRoomBorders('E39N26')
    
    getBorders: { //for wallbuilder
       'E42N31': [
            [20,31, 0.1], //storage
            [21,29, 0.1], //terminal
            [28,35],[28,36],
            [25,37],[24,37],[23,37],[22,37],[21,37],[20,37],[19,37],[18,37],[17,37],
            [17,36],
            [15,34],[15,33],[15,32],[15,31],
            [17,24],[17,23],[17,22],[17,21],[17,20],
            [18,20],[19,20],[20,20],[21,20],[22,20],[23,20],[24,20],[25,20],[26,20],[27,20],[28,20],[29,20],[30,20],[31,20],
            [31,22],[31,23],[31,24],[31,25],[31,26],[31,27],
            ],
        'E46N31': [
            [15,5, 0.1], //storage
            [17,6, 0.1], //terminal
            [20,8], //spawn
            [21,6],[21,5],[22,5],[23,6],[23,7],[22,7], //turrets
            [8,1],[8,2],[9,2],[10,2],[11,2],[12,2],[13,2],[14,2],[15,2],[16,2],[17,2],[18,2],[19,2],[20,2],[21,2],[22,2],
            [27,6],[27,7],[27,8],[27,9],[27,10],[27,11],[27,12],[27,13],[27,14],[27,15],[27,16],[27,17],[27,18],
            //[9,21],[10,21],//tmp sourceminer
        ],
        'E45N28': [
            [44,17],[41,13],[37,14],[39,14],[41,16],[47,19],[47,18],[47,17],[47,15],[47,14],[47,13],[47,16],[44,22],[45,22],[46,22],[38,22],[42,22],[39,22],[43,22],[40,22],[37,22],[47,22],[41,22],[35,22],[36,22],[33,17],[33,18],[33,19],[33,15],[33,16],[33,20],[33,14],[33,21],[33,22],[34,22],[33,13],[33,11],[33,12],[38,8],[37,8],[36,8],[35,8],[34,8],[39,8],[33,8],[33,9],[33,10],[42,8],[41,8],[40,8],
        ],
        'E39N28': [
            [37,5],[42,6],[39,6],[43,7],[42,8],[43,10],[44,10],[45,10],[46,10],[47,7],[47,8],[47,9],[47,10],[48,7],[30,11],[29,11],[28,11],[39,11],[38,11],
        ],
        'E42N29': [
            [14,16],[14,15],[14,14],[15,14],[16,14],[17,14],[18,14],[19,14],[20,14],[21,14],[22,14],[23,14],[23,15],[23,17],[24,15],[24,16],[24,17],[23,18],[23,19],[23,20],[23,21],[23,22],[23,23],[23,24],[23,25],[22,25],[22,26],[22,27],[22,28],[21,28],[21,29],[20,29],[19,29],[19,23],[19,30],[18,30],[18,31],[18,25],[17,31],[16,31],[15,31],[16,25],[14,31],[14,30],[13,30],[12,30],[15,24],[17,24],[11,30],[11,29],[10,29],[9,29],[9,28],[9,27],[9,26],[9,25],[9,24],[9,23],[14,23],[9,22],[16,22],[18,20],[18,21],[18,23],[19,22],[20,22],
        ], 
        'E39N26': [[32,24],[32,25],[32,26],[32,27],[32,28],[32,23],[32,22],[32,21],[40,13],[41,13],[42,13],[43,13],[44,13],[45,13],[46,13],],
        'E47N29': [[32,34],[32,33],[33,33],[34,33],[31,35],[31,34],[36,32],[37,32],[38,32],[39,32],[40,31],[41,31],[42,31],[43,31],[43,32],[43,33],[44,33],[45,33],[45,34],[46,34],[30,40],[30,41],[30,42],[30,43],[30,44],[30,45],[30,46],[31,46],[31,47],[32,47],[33,47],],
        'E39N21': [[2,33],[2,33],[2,34],[2,27],[2,25],[2,23],[13,34],[2,29],[2,31],[2,32],[2,31],[2,30],[2,29],[2,28],[2,27],[2,26],[2,25],[2,24],[2,23],[2,34],[2,35],[4,36],[3,36],[2,36],[11,35],[12,35],[13,35],[13,34],[18,26],[18,25],[18,24],[18,23],[18,22],[18,21],[18,20],[18,19],[18,18],],
        'E48N33': [[5,30],[5,29],[5,28],[5,27],[5,26],[5,25],[5,24],[19,29],[20,29],[21,29],[22,29],[23,29],[24,29],[25,29],[26,29],[27,29],],
        'E39N31': [[5,21],[8,6],[14,18],[14,19],[14,17],[15,17],[16,13],[16,14],[16,15],[16,16],[16,17],[16,12],[6,21],[5,21],[4,21],[3,21],[2,19],[2,20],[2,21],[13,9],[13,8],[13,7],[12,7],[7,6],[8,6],[9,6],[10,6],[12,6],[6,6],[5,6],[4,7],[4,6],[3,7],[2,7],],


    },
    
    getObstacles: {
        'E42N31': [{x:29, y:35}, {x:29, y:36},
            {x:16, y:37},{x:16, y:38},{x:17, y:38},{x:18, y:38},{x:19, y:38},{x:20, y:38},{x:21, y:38},{x:22, y:38},{x:23, y:38},{x:24, y:38},
            {x:14, y:34},{x:14, y:33},{x:14, y:32},{x:14, y:31},{x:14, y:30},
            {x:16, y:24},{x:16, y:23},{x:16, y:22},{x:16, y:21},{x:16, y:20},{x:16, y:19},
            {x:17, y:19},{x:18, y:19},{x:19, y:19},{x:20, y:19},{x:21, y:19},{x:22, y:19},{x:23, y:19},{x:24, y:19},{x:25, y:19},{x:26, y:19},{x:27, y:19},{x:28, y:19},{x:29, y:19},{x:30, y:19},{x:31, y:19},
            {x:32, y:23},{x:32, y:24},{x:32, y:25},{x:32, y:26},{x:32, y:27},{x:32, y:28},
            ],
            
        'E46N31': [{x:9, y:1}, {x:10, y:1}, {x:11, y:1}, {x:12, y:1}, {x:13, y:1}, {x:14, y:1}, {x:15, y:1}, {x:16, y:1},
            {x:17, y:1}, {x:18, y:1}, {x:19, y:1}, {x:20, y:1}, {x:21, y:1}, {x:22, y:1},
            {x:28, y:5},{x:28, y:6},{x:28, y:7},{x:28, y:8},{x:28, y:9},{x:28, y:10},{x:28, y:11},{x:28, y:12},{x:28, y:13},{x:28, y:14},{x:28, y:15},{x:28, y:16},{x:28, y:17},
            {x:28, y:18},{x:28, y:19},
            ],
        'E45N28': [{"x":47,"y":23},{"x":46,"y":23},{"x":45,"y":23},{"x":44,"y":23},{"x":43,"y":23},{"x":42,"y":23},{"x":41,"y":23},{"x":40,"y":23},{"x":39,"y":23},{"x":38,"y":23},{"x":37,"y":23},{"x":36,"y":23},{"x":34,"y":23},{"x":33,"y":23},{"x":32,"y":23},{"x":32,"y":22},{"x":32,"y":21},{"x":32,"y":20},{"x":32,"y":19},{"x":32,"y":18},{"x":32,"y":17},{"x":32,"y":16},{"x":32,"y":15},{"x":32,"y":14},{"x":32,"y":13},{"x":32,"y":12},{"x":32,"y":11},{"x":32,"y":10},{"x":32,"y":9},{"x":32,"y":8},{"x":32,"y":7},{"x":33,"y":7},{"x":34,"y":7},{"x":35,"y":7},{"x":36,"y":7},{"x":37,"y":7},{"x":38,"y":7},{"x":39,"y":7},{"x":40,"y":7},{"x":41,"y":7},{"x":48,"y":18},{"x":48,"y":17},{"x":48,"y":16},{"x":48,"y":15},{"x":48,"y":14}],
        'E39N28': [{"x":28,"y":12},{"x":29,"y":12},{"x":30,"y":12},{"x":31,"y":12},{"x":42,"y":11},{"x":43,"y":11},{"x":44,"y":11},{"x":45,"y":11},{"x":46,"y":11},{"x":47,"y":11},{"x":48,"y":11},{"x":48,"y":10},{"x":48,"y":9},{"x":48,"y":8}],
        'E42N29': [{"x":13,"y":16},{"x":13,"y":15},{"x":13,"y":14},{"x":13,"y":13},{"x":15,"y":13},{"x":16,"y":13},{"x":17,"y":13},{"x":18,"y":13},{"x":19,"y":13},{"x":20,"y":13},{"x":21,"y":13},{"x":22,"y":13},{"x":23,"y":13},{"x":24,"y":13},{"x":14,"y":13},{"x":24,"y":14},{"x":25,"y":14},{"x":25,"y":15},{"x":25,"y":16},{"x":25,"y":17},{"x":25,"y":18},{"x":24,"y":18},{"x":24,"y":20},{"x":24,"y":22},{"x":24,"y":23},{"x":24,"y":24},{"x":24,"y":25},{"x":24,"y":26},{"x":23,"y":26},{"x":23,"y":27},{"x":23,"y":28},{"x":23,"y":29},{"x":22,"y":29},{"x":22,"y":30},{"x":21,"y":30},{"x":20,"y":30},{"x":20,"y":31},{"x":19,"y":31},{"x":19,"y":32},{"x":18,"y":32},{"x":17,"y":32},{"x":16,"y":32},{"x":15,"y":32},{"x":14,"y":32},{"x":13,"y":32},{"x":13,"y":31},{"x":12,"y":31},{"x":11,"y":31},{"x":10,"y":31},{"x":10,"y":30},{"x":9,"y":30},{"x":8,"y":30},{"x":8,"y":29},{"x":8,"y":28},{"x":8,"y":27},{"x":8,"y":26},{"x":8,"y":25},{"x":8,"y":24},{"x":8,"y":23},{"x":8,"y":22},{"x":24,"y":21},{"x":24,"y":19}],
        'E39N26': [{x:31, y:20},{x:31, y:21},{x:31, y:27},{x:31, y:26},{x:31, y:25},{x:31, y:24},{x:31, y:23},{x:31, y:22},{x:40, y:12},{x:41, y:12},{x:42, y:12},{x:43, y:12},{x:44, y:12},{x:45, y:12},],
        'E47N29': [{x:31, y:33},{x:30, y:34},{x:30, y:33},{x:32, y:32},{x:33, y:32},{x:36, y:31},{x:35, y:31},{x:37, y:31},{x:41, y:30},{x:42, y:30},{x:43, y:30},{x:44, y:30},{x:44, y:31},{x:44, y:32},{x:45, y:32},{x:46, y:32},{x:46, y:33},{x:47, y:33},{x:47, y:34},{x:38, y:31},{x:31, y:32},{x:29, y:39},{x:29, y:45},{x:29, y:46},{x:29, y:47},{x:30, y:47},{x:31, y:48},{x:32, y:48},{x:30, y:48},{x:29, y:44},{x:29, y:43},{x:29, y:42},{x:29, y:41},{x:29, y:40},],
        'E39N21': [{x:2, y:37},{x:3, y:37},{x:4, y:37},{x:11, y:36},{x:12, y:36},{x:13, y:36},{x:14, y:36},{x:14, y:35},{x:19, y:24},{x:19, y:25},{x:19, y:26},{x:19, y:23},{x:19, y:22},{x:19, y:21},{x:19, y:20},{x:19, y:19},{x:19, y:18},{x:19, y:17},{x:1, y:37},{x:1, y:36},{x:1, y:35},{x:1, y:34},{x:1, y:33},{x:1, y:32},{x:1, y:31},{x:1, y:30},{x:1, y:29},{x:1, y:28},{x:1, y:27},{x:1, y:26},{x:1, y:25},{x:1, y:24},],
        'E48N33': [{x:28, y:30},{x:27, y:30},{x:26, y:30},{x:25, y:30},{x:24, y:30},{x:23, y:30},{x:22, y:30},{x:21, y:30},{x:20, y:30},{x:19, y:30},{x:4, y:31},{x:4, y:30},{x:4, y:29},{x:4, y:28},{x:4, y:27},{x:4, y:26},{x:4, y:25},],
        'E39N31': [{x:1, y:7},{x:2, y:6},{x:3, y:6},{x:4, y:5},{x:3, y:5},{x:5, y:5},{x:6, y:5},{x:7, y:5},{x:8, y:5},{x:9, y:5},{x:13, y:5},{x:13, y:6},{x:14, y:6},{x:14, y:7},{x:14, y:8},{x:14, y:9},{x:16, y:11},{x:17, y:11},{x:17, y:12},{x:17, y:13},{x:17, y:14},{x:17, y:15},{x:17, y:16},{x:17, y:17},{x:17, y:18},{x:16, y:18},{x:15, y:18},{x:15, y:19},{x:15, y:20},{x:7, y:22},{x:6, y:22},{x:5, y:22},{x:4, y:22},{x:3, y:22},{x:1, y:22},{x:1, y:20},{x:1, y:21},{x:2, y:22},{x:14, y:20},{x:1, y:6},],

    },

};

module.exports = shardCfg;

        