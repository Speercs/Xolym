var roleMassRanger = require('role.massRanger');
var roleGclBooster = require('role.gclBooster');



var shardCfg = { 
    myRooms: [
        /* 0 */{roomName: 'E58N22', sector: [1,3,5],            massRanger_team: 0,atack_sector: 1,  lab:2,  factory: 2,  creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 1 */{roomName: 'E55N21', sector: [8,9,11],           massRanger_team: 0,atack_sector: 2,  lab:7,  factory: 1,  creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 2 */{roomName: 'E59N24', sector: [12,14],            massRanger_team: 0,atack_sector: 3,  lab:6,  factory: 6,  creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 3 */{roomName: 'E58N27', sector: [17,19],            massRanger_team: 0,atack_sector: 4,  lab:17, factory: 3,  creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 4 */{roomName: 'E55N27', sector: [23,26,27,42,],     massRanger_team: 0,atack_sector: 5,  lab:8,  factory: 4,  creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 0},keepers: [0,1]},
        /* 5 */{roomName: 'E42N28', sector: [22,29,30],         massRanger_team: 0,atack_sector: 6,  lab:9,  factory: 7,  creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 6 */{roomName: 'E46N31', sector: [31,33],            massRanger_team: 0,atack_sector: 7,  lab:10, factory: 8,  creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 7 */{roomName: 'E57N29', sector: [35,37],            massRanger_team: 0,atack_sector: 8,  lab:11, factory: 5,  creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 8 */{roomName: 'E45N29', sector: [39],               massRanger_team: 0,atack_sector: 10, lab:12, factory: 9,  creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 9 */{roomName: 'E41N23', sector: [45,48],            massRanger_team: 0,atack_sector: 9,  lab:13, factory: 14, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 10*/{roomName: 'E47N36', sector: [49,51,54,],        massRanger_team: 0,atack_sector: 11, lab:14, factory: 10, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: [3,4]},
        /* 11*/{roomName: 'E55N31', sector: [57,59,60],         massRanger_team: 0,atack_sector: 12, lab:15, factory: 11, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 12*/{roomName: 'E52N32', sector: [61,64],            massRanger_team: 0,atack_sector: 13, lab:16, factory: 12, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 13*/{roomName: 'E49N22', sector: [65,67],            massRanger_team: 0,atack_sector: 14, lab:18, factory: 13, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 0},keepers: []},
        /* 14*/{roomName: 'E47N39', sector: [69,72],            massRanger_team: 0,atack_sector: 15, lab:19, factory: 15, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 0},keepers: []},
        /* 15*/{roomName: 'E44N38', sector: [74,75,77],         massRanger_team: 0,atack_sector: 16, lab:20, factory: 16, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 0, deliver:3},keepers: []},
        /* 16*/{roomName: 'E49N37', sector: [79,81],            massRanger_team: 0,atack_sector: 17, lab:21, factory: 25, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 17*/{roomName: 'E41N39', sector: [83],               massRanger_team: 0,atack_sector: 18, lab:22, factory: 24, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 18*/{roomName: 'E53N25', sector: [84,87,92,95],      massRanger_team: 0,atack_sector: 0,  lab:23, factory: 26, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, dropper: 1},keepers: [5]},
        /* 19*/{roomName: 'E55N23', sector: [90,93],            massRanger_team: 0,atack_sector: 0,  lab:24, factory: 32, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: [6,7]},
        /* 20*/{roomName: 'E57N35', sector: [96,98,102],        massRanger_team: 0,atack_sector: 19, lab:25, factory: 17, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 21*/{roomName: 'E55N39', sector: [100,101],          massRanger_team: 0,atack_sector: 20, lab:26, factory: 34, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 0},keepers: []},
        /* 22*/{roomName: 'E59N35', sector: [103],              massRanger_team: 0,atack_sector: 21, lab:27, factory: 18, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 23*/{roomName: 'E52N29', sector: [104,105],          massRanger_team: 0,atack_sector: 23, lab:28, factory: 33, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 24*/{roomName: 'E55N37', sector: [106],              massRanger_team: 0,atack_sector: 24, lab:29, factory: 19, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 25*/{roomName: 'E43N21', sector: [107,112],          massRanger_team: 0,atack_sector: 27, lab:30, factory: 22, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 26*/{roomName: 'E43N25', sector: [108],              massRanger_team: 0,atack_sector: 25, lab:31, factory: 20, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 27*/{roomName: 'E57N25', sector: [109,110],          massRanger_team: 0,atack_sector: 0,  lab:32, factory: 21, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler:0},keepers: [8,9]},
        /* 28*/{roomName: 'E57N33', sector: [111],              massRanger_team: 0,atack_sector: 26, lab:33, factory: 23, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 29*/{roomName: 'E45N22', sector: [113,114,115],      massRanger_team: 0,atack_sector: 28, lab:34, factory: 38, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 0},keepers: []},
        /* 30*/{roomName: 'E53N21', sector: [116],              massRanger_team: 0,atack_sector: 29, lab:35, factory: 27, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 31*/{roomName: 'E41N19', sector: [117,119],          massRanger_team: 0,atack_sector: 30, lab:36, factory: 29, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler:1},keepers: []},
        /* 32*/{roomName: 'E45N11', sector: [118],              massRanger_team: 0,atack_sector: 31, lab:37, factory: 40, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler:0},keepers: []},
        /* 33*/{roomName: 'E36N9',  sector: [120,121],          massRanger_team: 0,atack_sector: 32, lab:38, factory: 30, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler:0},keepers: []},
        /* 34*/{roomName: 'E43N38', sector: [], /* GCL!! */     massRanger_team: 0,atack_sector: 0,  lab:39, factory: 0,  creeps: {suplier: 1, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 1, gclCrane: 1, gclUpgrader: roleGclBooster.getGclUpgraderCount('E43N38'), gclClaimer: 0},keepers: []},
        /* 35*/{roomName: 'E41N5',  sector: [122,123,124],      massRanger_team: 0,atack_sector: 33, lab:40, factory: 28, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler:0},keepers: []},
        /* 36*/{roomName: 'E38N19', sector: [127,128],          massRanger_team: 0,atack_sector: 35, lab:41, factory: 37, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 37*/{roomName: 'E33N9',  sector: [125,126],          massRanger_team: 0,atack_sector: 34, lab:42, factory: 42, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1},keepers: []},
        /* 38*/{roomName: 'E59N41', sector: [129],              massRanger_team: 0,atack_sector: 36, lab:43, factory: 39, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 0},keepers: []},
        /* 39*/{roomName: 'E46N19', sector: [],                 massRanger_team: 0,atack_sector: 0,  lab:44, factory: 43, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 0},keepers: []},
        /* 40*/{roomName: 'E57N44', sector: [130],              massRanger_team: 0,atack_sector: 37, lab:45, factory: 31, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 0},keepers: [10]},
        /* 41*/{roomName: 'E57N47', sector: [],                 massRanger_team: 0,atack_sector: 0,  lab:46, factory: 0,  creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 0},keepers: []},
        /* 42*/{roomName: 'E59N53', sector: [131,132],          massRanger_team: 0,atack_sector: 38, lab:47, factory: 41, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 1},keepers: []},
        /* 43*/{roomName: 'E47S1',  sector: [],                 massRanger_team: 0,atack_sector: 0,  lab:48, factory: 36, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 0},keepers: []}, 
        /* 44*/{roomName: 'E44S8',  sector: [133],              massRanger_team: 0,atack_sector: 39, lab:49, factory: 35, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, filler: 0},keepers: []}, 
        /* 45*/{roomName: 'E47S4',  sector: [],                 massRanger_team: 0,atack_sector: 0,  lab:50,  factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 2, harvester: 0},keepers: []},
        // /* 99*/{roomName: 'E52N32', sector: [], massRanger_team: 0,atack_sector: 0, lab:0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, upgrader2: 0,harvester: 1},keepers: []}, 
    ], 
    skRooms: [
        {id: 0, roomName: 'E55N26', sector: 23, creeps: {keeper: 1}, rooms: ['E55N26']},
        {id: 1, roomName: 'E54N26', sector: 42, creeps: {keeper: 1}, rooms: ['E54N26','E55N26']}, 
        {id: 2, roomName: 'E56N26', sector: 22, creeps: {keeper: 1}, rooms: []}, // err
        {id: 3, roomName: 'E46N36', sector: 51, creeps: {keeper: 1}, rooms: ['E46N36']},
        {id: 4, roomName: 'E46N35', sector: 54, creeps: {keeper: 1}, rooms: ['E46N36','E46N35']},
        {id: 5, roomName: 'E54N25', sector: 84, creeps: {keeper: 1}, rooms: ['E54N25']},
        {id: 6, roomName: 'E55N24', sector: 90, creeps: {keeper: 1}, rooms: ['E55N24']},
        {id: 7, roomName: 'E54N24', sector: 93, creeps: {keeper: 1}, rooms: ['E54N24']},
        {id: 8, roomName: 'E56N25', sector: 110, creeps: {keeper: 1},rooms: ['E56N25']},
        {id: 9, roomName: 'E56N24', sector: 109, creeps: {keeper: 1},rooms: ['E56N25','E56N24']},
        {id: 10,roomName: 'E56N44', sector: 130, creeps: {keeper: 1},rooms: ['E56N44',]},
    ], 
    labConfig: [
        {id: 0,  labs: [], reaction: []},
        {id: 1,  labs: [], reaction: []},
        {id: 2,  labs: [], reaction: []},
        {id: 3,  labs: [], reaction: []},
        {id: 4,  labs: [], reaction: []},
        {id: 5,  labs: [], reaction: []},
        {id: 6,  labs: [], reaction: []},
        {id: 7,  labs: [], reaction: []},
        {id: 8,  labs: [], reaction: []},
        {id: 9,  labs: [], reaction: []},
        {id: 10,  labs: [], reaction: []},
        {id: 11,  labs: [], reaction: []},
        {id: 12,  labs: [], reaction: []},
        {id: 13,  labs: [], reaction: []},
        {id: 14,  labs: [], reaction: []},
        {id: 15,  labs: [], reaction: []},
        {id: 16,  labs: [], reaction: []},
        {id: 17,  labs: [], reaction: []},
        {id: 18,  labs: [], reaction: []},
        {id: 19,  labs: [], reaction: []},
        {id: 20,  labs: [], reaction: []},
        {id: 21,  labs: [], reaction: []},
        {id: 22,  labs: [], reaction: []},
        {id: 23,  labs: [], reaction: []},
        {id: 24,  labs: [], reaction: []},
        {id: 25,  labs: [], reaction: []},
        {id: 26,  labs: [], reaction: []},
        {id: 27,  labs: [], reaction: []},
        {id: 28,  labs: [], reaction: []},
        {id: 29,  labs: [], reaction: []},
        {id: 30,  labs: [], reaction: []},
        {id: 31,  labs: [], reaction: []},
        {id: 32,  labs: [], reaction: []},
        {id: 33,  labs: [], reaction: []},
        {id: 34,  labs: [], reaction: []},
        {id: 35,  labs: [], reaction: []},
        {id: 36,  labs: [], reaction: []},
        {id: 37,  labs: [], reaction: []},
        {id: 38,  labs: [], reaction: []},
/*gcl*/ {id: 39, manual: 1, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,], reaction: []},
        {id: 40,  labs: [], reaction: []},
        {id: 41,  labs: [], reaction: []},
        {id: 42,  labs: [], reaction: []},
        {id: 43,  labs: [], reaction: []},
        {id: 44,  labs: [], reaction: []},
        {id: 45,  labs: [], reaction: []},
        {id: 46,  labs: [], reaction: []},
        {id: 47,  labs: [], reaction: []},
        {id: 48,  labs: [], reaction: []},
        {id: 49,  labs: [], reaction: []},
        {id: 50,  labs: [], reaction: []},
        //{id: 50, manual:1, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID], reaction: []},
        //{id: 49, manual: 1, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ACID, RESOURCE_CATALYZED_ZYNTHIUM_ACID], reaction: []},
        //  {id: 99, manual:1, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID], reaction: []},
    ],
    factoryConfig: [
        {id: 0, endProduct: [], produce:[]},
        {id: 1, level: 2, endProduct: [RESOURCE_TRANSISTOR,RESOURCE_KEANIUM_BAR,RESOURCE_CRYSTAL,RESOURCE_FIXTURES,RESOURCE_EXTRACT], produce:[
            {product: RESOURCE_CRYSTAL, needAmount: 300,},
            {product: RESOURCE_TRANSISTOR, needAmount: 14,},
            {product: RESOURCE_FIXTURES, needAmount: 10,},
            {product: RESOURCE_EXTRACT, needAmount: 10,},
            {product: RESOURCE_KEANIUM_BAR, needAmount: 1000,},
            {product: RESOURCE_KEANIUM_BAR, needAmount: 500000, conditions: [{resource: RESOURCE_KEANIUM, amount: 160000}],},
            {product: RESOURCE_LEMERGIUM_BAR, needAmount: 1000},
        ]},
        {id: 2, level: 5, endProduct: [RESOURCE_DEVICE,RESOURCE_MACHINE,RESOURCE_ESSENCE], produce:[
            {product: RESOURCE_DEVICE,needAmount: 100000,},
            {product: RESOURCE_MACHINE,needAmount: 100000,},
            {product: RESOURCE_ESSENCE,needAmount: 100000,},
        ]},
        {id: 3, level: 3, endProduct: [RESOURCE_MICROCHIP, RESOURCE_OXIDANT,RESOURCE_FRAME,RESOURCE_SPIRIT,RESOURCE_LIQUID], produce:[
            {product: RESOURCE_MICROCHIP, needAmount: 8,},
            {product: RESOURCE_FRAME, needAmount: 10,},
            {product: RESOURCE_SPIRIT, needAmount: 10,},
            {product: RESOURCE_LIQUID, needAmount: 3000,},
            {product: RESOURCE_PURIFIER, needAmount: 50},
            {product: RESOURCE_OXIDANT, needAmount: 100000, conditions: [{resource: RESOURCE_OXYGEN, amount: 160000}],},
        ]},
        {id: 4, level: 4, endProduct: [RESOURCE_CIRCUIT, RESOURCE_KEANIUM_BAR,RESOURCE_REDUCTANT,RESOURCE_OXIDANT,RESOURCE_HYDRAULICS,RESOURCE_EMANATION], produce:[
            {product: RESOURCE_CIRCUIT, needAmount: 3,},
            {product: RESOURCE_HYDRAULICS, needAmount: 3},
            {product: RESOURCE_EMANATION, needAmount: 2},
            {product: RESOURCE_OXIDANT, needAmount: 200},
            {product: RESOURCE_KEANIUM_BAR, needAmount: 300000, conditions: [{resource: RESOURCE_KEANIUM, amount: 140000}],},
            {product: RESOURCE_REDUCTANT, needAmount: 300000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 140000}],},
            {product: RESOURCE_OXIDANT, needAmount: 300000, conditions: [{resource: RESOURCE_OXYGEN, amount: 140000}],},
        ]},
        {id: 5, endProduct: [RESOURCE_UTRIUM_BAR, RESOURCE_OXIDANT,RESOURCE_ALLOY,RESOURCE_WIRE], produce:[
            {product: RESOURCE_UTRIUM_BAR, needAmount: 5000,},
            {product: RESOURCE_ALLOY, needAmount: 500000,},
            {product: RESOURCE_ZYNTHIUM_BAR, needAmount: 40,},
            {product: RESOURCE_WIRE, needAmount: 500000,},
            {product: RESOURCE_OXIDANT, needAmount: 2000},
            {product: RESOURCE_OXIDANT, needAmount: 100000, conditions: [{resource: RESOURCE_OXYGEN, amount: 160000}],},
        ]},
        {id: 6, level: 1, endProduct: [RESOURCE_SWITCH, RESOURCE_COMPOSITE, RESOURCE_ZYNTHIUM_BAR,RESOURCE_TUBE,RESOURCE_CONCENTRATE], produce:[
            {product: RESOURCE_SWITCH, needAmount: 20,},
            {product: RESOURCE_TUBE, needAmount: 40,},
            {product: RESOURCE_CONCENTRATE, needAmount: 40,},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
            {product: RESOURCE_COMPOSITE, needAmount: 1500},
            {product: RESOURCE_OXIDANT, needAmount: 200,},
            {product: RESOURCE_ZYNTHIUM_BAR, needAmount: 500000, conditions: [{resource: RESOURCE_ZYNTHIUM, amount: 160000}],},
        ]},
        {id: 7, level: 5, endProduct: [RESOURCE_DEVICE, RESOURCE_REDUCTANT,RESOURCE_LEMERGIUM, RESOURCE_KEANIUM,RESOURCE_MACHINE,RESOURCE_ESSENCE], produce:[
            {product: RESOURCE_DEVICE, needAmount: 100000,},
            {product: RESOURCE_MACHINE,needAmount: 100000,},
            {product: RESOURCE_ESSENCE,needAmount: 100000,},
            {product: RESOURCE_REDUCTANT, needAmount: 10000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 40000}],},
            {product: RESOURCE_LEMERGIUM, needAmount: 30000, conditions: [{resource: RESOURCE_LEMERGIUM_BAR, amount: 30000}],},
            {product: RESOURCE_KEANIUM, needAmount: 6000,},
        ]},
        {id: 8, level: 3, endProduct: [RESOURCE_MICROCHIP,  RESOURCE_REDUCTANT, RESOURCE_FRAME,RESOURCE_SPIRIT,RESOURCE_LIQUID], produce:[
            {product: RESOURCE_MICROCHIP, needAmount: 8,},
            {product: RESOURCE_FRAME, needAmount: 10,},
            {product: RESOURCE_SPIRIT, needAmount: 10,},
            {product: RESOURCE_LIQUID, needAmount: 3000,},
            {product: RESOURCE_PURIFIER, needAmount: 50},
            {product: RESOURCE_REDUCTANT, needAmount: 100000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 140000}],},
        ]},
        {id: 9, level: 0, endProduct: [RESOURCE_WIRE,], produce:[
            {product: RESOURCE_WIRE, needAmount: 500000,},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
        ]},
        {id:10, endProduct: [RESOURCE_OXIDANT,RESOURCE_GHODIUM_MELT], produce:[
            {product: RESOURCE_OXIDANT, needAmount: 10000},
            {product: RESOURCE_OXIDANT, needAmount: 100000, conditions: [{resource: RESOURCE_OXYGEN, amount: 140000}],},
            {product: RESOURCE_GHODIUM_MELT, needAmount: 5000,},
        ]},
        {id:11, endProduct: [RESOURCE_ZYNTHIUM_BAR,RESOURCE_OXIDANT,RESOURCE_ALLOY], produce:[
            {product: RESOURCE_ZYNTHIUM_BAR, needAmount: 10000,},
            {product: RESOURCE_OXIDANT, needAmount: 10000},
            {product: RESOURCE_ALLOY, needAmount: 500000,},
            {product: RESOURCE_ZYNTHIUM_BAR, needAmount: 500000, conditions: [{resource: RESOURCE_ZYNTHIUM, amount: 150000}],},
        ]},
        {id:12, endProduct: [RESOURCE_REDUCTANT], produce:[
            {product: RESOURCE_REDUCTANT, needAmount: 20000},
            {product: RESOURCE_REDUCTANT, needAmount: 100000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 140000}],},
        ]},
        {id:13, level: 1, endProduct: [RESOURCE_OXIDANT, RESOURCE_SWITCH, RESOURCE_COMPOSITE,RESOURCE_TUBE,RESOURCE_CONCENTRATE], produce:[
            {product: RESOURCE_COMPOSITE, needAmount: 1500},
            {product: RESOURCE_SWITCH, needAmount: 20,},
            {product: RESOURCE_TUBE, needAmount: 40,},
            {product: RESOURCE_CONCENTRATE, needAmount: 40,},
            {product: RESOURCE_OXIDANT, needAmount: 6000},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
            {product: RESOURCE_OXIDANT, needAmount: 100000, conditions: [{resource: RESOURCE_OXYGEN, amount: 140000}],},
        ]},
        {id:14, level: 4, endProduct: [RESOURCE_LEMERGIUM_BAR,RESOURCE_KEANIUM_BAR,RESOURCE_CIRCUIT,RESOURCE_HYDRAULICS,RESOURCE_EMANATION], produce:[
            {product: RESOURCE_CIRCUIT, needAmount: 3,},
            {product: RESOURCE_HYDRAULICS, needAmount: 3},
            {product: RESOURCE_EMANATION, needAmount: 2},
            {product: RESOURCE_KEANIUM_BAR, needAmount: 10000},
            {product: RESOURCE_LEMERGIUM_BAR, needAmount: 10000},
            {product: RESOURCE_LEMERGIUM_BAR, needAmount: 500000, conditions: [{resource: RESOURCE_LEMERGIUM, amount: 150000}],},
        ]},
        {id:15, level: 2, endProduct: [RESOURCE_TRANSISTOR,RESOURCE_CRYSTAL,RESOURCE_FIXTURES,RESOURCE_EXTRACT], produce:[
            {product: RESOURCE_TRANSISTOR, needAmount: 14,},
            {product: RESOURCE_FIXTURES, needAmount: 10,},
            {product: RESOURCE_EXTRACT, needAmount: 10,},
            {product: RESOURCE_CRYSTAL, needAmount: 300,},
        ]},
        {id:16, level: 4, endProduct: [RESOURCE_CIRCUIT,RESOURCE_HYDRAULICS,RESOURCE_EMANATION], produce:[
            {product: RESOURCE_CIRCUIT, needAmount: 3,},
            {product: RESOURCE_HYDRAULICS, needAmount: 3},
            {product: RESOURCE_EMANATION, needAmount: 2},
            {product: RESOURCE_OXIDANT, needAmount: 200},
        ]},
        {id:17, level: 3, endProduct: [RESOURCE_MICROCHIP, RESOURCE_REDUCTANT,RESOURCE_FRAME,RESOURCE_SPIRIT,RESOURCE_LIQUID], produce:[
            {product: RESOURCE_MICROCHIP, needAmount: 8,},
            {product: RESOURCE_FRAME, needAmount: 10,},
            {product: RESOURCE_SPIRIT, needAmount: 10,},
            {product: RESOURCE_LIQUID, needAmount: 3000,},
            {product: RESOURCE_PURIFIER, needAmount: 50},
            {product: RESOURCE_REDUCTANT, needAmount: 100000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 160000}],},
        ]}, 
        {id:18, level: 2, endProduct: [RESOURCE_TRANSISTOR,RESOURCE_CRYSTAL,RESOURCE_FIXTURES,RESOURCE_EXTRACT], produce:[
            {product: RESOURCE_TRANSISTOR, needAmount: 14,},
            {product: RESOURCE_FIXTURES, needAmount: 10,},
            {product: RESOURCE_EXTRACT, needAmount: 10,},
            {product: RESOURCE_CRYSTAL, needAmount: 300,},
        ]},
        {id:19, level: 2, endProduct: [RESOURCE_TRANSISTOR,RESOURCE_CRYSTAL,RESOURCE_FIXTURES,RESOURCE_EXTRACT], produce:[
            {product: RESOURCE_TRANSISTOR, needAmount: 14,},
            {product: RESOURCE_FIXTURES, needAmount: 10,},
            {product: RESOURCE_EXTRACT, needAmount: 10,},
            {product: RESOURCE_CRYSTAL, needAmount: 300,},
        ]},
        {id:20, level: 1, endProduct: [RESOURCE_OXIDANT, RESOURCE_SWITCH, RESOURCE_COMPOSITE,RESOURCE_TUBE,RESOURCE_CONCENTRATE], produce:[
            {product: RESOURCE_COMPOSITE, needAmount: 1500},
            {product: RESOURCE_SWITCH, needAmount: 20,},
            {product: RESOURCE_TUBE, needAmount: 40,},
            {product: RESOURCE_CONCENTRATE, needAmount: 40,},
            {product: RESOURCE_OXIDANT, needAmount: 6000},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
            {product: RESOURCE_REDUCTANT, needAmount: 100000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 160000}],},
        ]},
        {id:21, level: 1, endProduct: [RESOURCE_OXIDANT, RESOURCE_SWITCH, RESOURCE_COMPOSITE,RESOURCE_TUBE,RESOURCE_CONCENTRATE,RESOURCE_REDUCTANT], produce:[
            {product: RESOURCE_COMPOSITE, needAmount: 1500},
            {product: RESOURCE_SWITCH, needAmount: 20,},
            {product: RESOURCE_TUBE, needAmount: 40,},
            {product: RESOURCE_CONCENTRATE, needAmount: 40,},
            {product: RESOURCE_OXIDANT, needAmount: 6000},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
            {product: RESOURCE_REDUCTANT, needAmount: 100000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 160000}],},
        ]},
        {id:22, endProduct: [RESOURCE_REDUCTANT,RESOURCE_ALLOY, RESOURCE_CONDENSATE], produce:[
            {product: RESOURCE_REDUCTANT, needAmount: 20000},
            {product: RESOURCE_ALLOY, needAmount: 500000,},
            {product: RESOURCE_ZYNTHIUM_BAR, needAmount: 40,},
            {product: RESOURCE_CONDENSATE, needAmount: 500000,},
            {product: RESOURCE_KEANIUM_BAR, needAmount: 40,},
            {product: RESOURCE_REDUCTANT, needAmount: 100000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 140000}],},
        ]},
        {id:23, endProduct: [RESOURCE_PURIFIER,RESOURCE_KEANIUM_BAR,RESOURCE_LEMERGIUM_BAR,RESOURCE_ALLOY,RESOURCE_WIRE], produce:[
            {product: RESOURCE_PURIFIER,needAmount: 5000},
            {product: RESOURCE_LEMERGIUM_BAR, needAmount: 10000},
            {product: RESOURCE_ALLOY, needAmount: 500000,},
            {product: RESOURCE_ZYNTHIUM_BAR, needAmount: 40,},
            {product: RESOURCE_WIRE, needAmount: 500000,},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
            {product: RESOURCE_KEANIUM_BAR, needAmount: 100000, conditions: [{resource: RESOURCE_KEANIUM, amount: 140000}],},
        ]},
        {id:24, level: 4, endProduct: [RESOURCE_LEMERGIUM_BAR,RESOURCE_CIRCUIT,RESOURCE_HYDRAULICS,RESOURCE_EMANATION], produce:[
            {product: RESOURCE_CIRCUIT, needAmount: 3,},
            {product: RESOURCE_HYDRAULICS, needAmount: 3},
            {product: RESOURCE_EMANATION, needAmount: 2},
            {product: RESOURCE_LEMERGIUM_BAR, needAmount: 500000, conditions: [{resource: RESOURCE_LEMERGIUM, amount: 150000}],},
        ]},
        {id:25, level: 1, endProduct: [RESOURCE_REDUCTANT, RESOURCE_SWITCH, RESOURCE_COMPOSITE,RESOURCE_TUBE,RESOURCE_CONCENTRATE], produce:[
            {product: RESOURCE_COMPOSITE, needAmount: 1500},
            {product: RESOURCE_SWITCH, needAmount: 20,},
            {product: RESOURCE_TUBE, needAmount: 40,},
            {product: RESOURCE_CONCENTRATE, needAmount: 40,},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
            {product: RESOURCE_REDUCTANT, needAmount: 100000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 140000}],},
        ]},
        {id:26, level: 1, endProduct: [RESOURCE_OXIDANT, RESOURCE_SWITCH, RESOURCE_COMPOSITE,RESOURCE_TUBE,RESOURCE_CONCENTRATE], produce:[
            {product: RESOURCE_COMPOSITE, needAmount: 1500},
            {product: RESOURCE_SWITCH, needAmount: 20,},
            {product: RESOURCE_TUBE, needAmount: 40,},
            {product: RESOURCE_CONCENTRATE, needAmount: 40,},
            {product: RESOURCE_OXIDANT, needAmount: 6000},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
            {product: RESOURCE_OXIDANT, needAmount: 100000, conditions: [{resource: RESOURCE_OXYGEN, amount: 140000}],},
        ]},
        {id:27, level: 0, endProduct: [RESOURCE_WIRE,RESOURCE_ALLOY], produce:[
            {product: RESOURCE_ALLOY, needAmount: 500000,},
            {product: RESOURCE_ZYNTHIUM_BAR, needAmount: 40,},
            {product: RESOURCE_WIRE, needAmount: 500000,},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
        ]},
        {id:28, level: 2, endProduct: [RESOURCE_TRANSISTOR,RESOURCE_CRYSTAL,RESOURCE_FIXTURES,RESOURCE_EXTRACT,RESOURCE_OXIDANT,RESOURCE_REDUCTANT,], produce:[
            {product: RESOURCE_TRANSISTOR, needAmount: 14,},
            {product: RESOURCE_FIXTURES, needAmount: 10,},
            {product: RESOURCE_EXTRACT, needAmount: 10,},
            {product: RESOURCE_CRYSTAL, needAmount: 300,},
            {product: RESOURCE_OXIDANT, needAmount: 500000, conditions: [{resource: RESOURCE_OXYGEN, amount: 80000}],},
            {product: RESOURCE_REDUCTANT, needAmount: 500000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 80000}],},
        ]},

        {id:29, level: 2, endProduct: [RESOURCE_TRANSISTOR,RESOURCE_CRYSTAL,RESOURCE_FIXTURES,RESOURCE_EXTRACT,RESOURCE_KEANIUM_BAR], produce:[
            {product: RESOURCE_TRANSISTOR, needAmount: 14,},
            {product: RESOURCE_FIXTURES, needAmount: 10,},
            {product: RESOURCE_EXTRACT, needAmount: 10,},
            {product: RESOURCE_CRYSTAL, needAmount: 300,},
            {product: RESOURCE_KEANIUM_BAR, needAmount: 500000, conditions: [{resource: RESOURCE_KEANIUM, amount: 80000}],},
        ]},
        {id:30, level: 3, endProduct: [RESOURCE_MICROCHIP, RESOURCE_OXIDANT,RESOURCE_FRAME,RESOURCE_SPIRIT,RESOURCE_LIQUID], produce:[
            {product: RESOURCE_MICROCHIP, needAmount: 8,},
            {product: RESOURCE_FRAME, needAmount: 10,},
            {product: RESOURCE_SPIRIT, needAmount: 10,},
            {product: RESOURCE_LIQUID, needAmount: 3000,},
            {product: RESOURCE_PURIFIER, needAmount: 50},
            {product: RESOURCE_OXIDANT, needAmount: 100000, conditions: [{resource: RESOURCE_OXYGEN, amount: 80000}],},
        ]}, 
        {id: 31, level: 5, endProduct: [RESOURCE_DEVICE,RESOURCE_MACHINE,RESOURCE_ESSENCE], produce:[
            {product: RESOURCE_DEVICE,needAmount: 100000,},
            {product: RESOURCE_MACHINE,needAmount: 100000,},
            {product: RESOURCE_ESSENCE,needAmount: 100000,},
        ]},
        {id: 32, level: 1, endProduct: [RESOURCE_SWITCH, RESOURCE_COMPOSITE,RESOURCE_TUBE,RESOURCE_CONCENTRATE], produce:[
            {product: RESOURCE_SWITCH, needAmount: 20,},
            {product: RESOURCE_TUBE, needAmount: 40,},
            {product: RESOURCE_CONCENTRATE, needAmount: 40,},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
            {product: RESOURCE_COMPOSITE, needAmount: 1500},
            {product: RESOURCE_OXIDANT, needAmount: 200,},
        ]},
        {id: 33, level: 1, endProduct: [RESOURCE_SWITCH, RESOURCE_COMPOSITE,RESOURCE_TUBE,RESOURCE_CONCENTRATE], produce:[
            {product: RESOURCE_SWITCH, needAmount: 20,},
            {product: RESOURCE_TUBE, needAmount: 40,},
            {product: RESOURCE_CONCENTRATE, needAmount: 40,},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
            {product: RESOURCE_COMPOSITE, needAmount: 1500},
            {product: RESOURCE_OXIDANT, needAmount: 200,},
        ]},
        {id: 34, level: 3, endProduct: [RESOURCE_MICROCHIP,RESOURCE_FRAME,RESOURCE_SPIRIT,RESOURCE_LIQUID], produce:[ 
            {product: RESOURCE_MICROCHIP, needAmount: 8,},
            {product: RESOURCE_FRAME, needAmount: 10,},
            {product: RESOURCE_SPIRIT, needAmount: 10,},
            {product: RESOURCE_LIQUID, needAmount: 3000,},
            {product: RESOURCE_PURIFIER, needAmount: 50},
        ]},
        {id: 35, level: 5, endProduct: [RESOURCE_DEVICE,RESOURCE_MACHINE,RESOURCE_ESSENCE], produce:[
            {product: RESOURCE_DEVICE,needAmount: 100000,},
            {product: RESOURCE_MACHINE,needAmount: 100000,},
            {product: RESOURCE_ESSENCE,needAmount: 100000,},
        ]},
        {id: 36, level: 4, endProduct: [RESOURCE_CIRCUIT,RESOURCE_HYDRAULICS,RESOURCE_EMANATION], produce:[
            {product: RESOURCE_CIRCUIT, needAmount: 3,},
            {product: RESOURCE_HYDRAULICS, needAmount: 3},
            {product: RESOURCE_EMANATION, needAmount: 2},
        ]},
        {id: 37, level: 3, endProduct: [RESOURCE_MICROCHIP,RESOURCE_FRAME,RESOURCE_SPIRIT,RESOURCE_LIQUID], produce:[ 
            {product: RESOURCE_MICROCHIP, needAmount: 8,},
            {product: RESOURCE_FRAME, needAmount: 10,},
            {product: RESOURCE_SPIRIT, needAmount: 10,},
            {product: RESOURCE_LIQUID, needAmount: 3000,},
            {product: RESOURCE_PURIFIER, needAmount: 50},
        ]},
        {id:38, level: 2, endProduct: [RESOURCE_TRANSISTOR,RESOURCE_CRYSTAL,RESOURCE_FIXTURES,RESOURCE_EXTRACT], produce:[
            {product: RESOURCE_TRANSISTOR, needAmount: 14,},
            {product: RESOURCE_FIXTURES, needAmount: 10,},
            {product: RESOURCE_EXTRACT, needAmount: 10,},
            {product: RESOURCE_CRYSTAL, needAmount: 300,},
        ]},
        {id: 39, level: 1, endProduct: [RESOURCE_SWITCH, RESOURCE_COMPOSITE,RESOURCE_TUBE,RESOURCE_CONCENTRATE], produce:[
            {product: RESOURCE_SWITCH, needAmount: 20,},
            {product: RESOURCE_TUBE, needAmount: 40,},
            {product: RESOURCE_CONCENTRATE, needAmount: 40,},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
            {product: RESOURCE_COMPOSITE, needAmount: 1500},
            {product: RESOURCE_OXIDANT, needAmount: 200,},
        ]},
        {id: 40, level: 1, endProduct: [RESOURCE_SWITCH, RESOURCE_COMPOSITE,RESOURCE_TUBE,RESOURCE_CONCENTRATE], produce:[
            {product: RESOURCE_SWITCH, needAmount: 20,},
            {product: RESOURCE_TUBE, needAmount: 40,},
            {product: RESOURCE_CONCENTRATE, needAmount: 40,},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
            {product: RESOURCE_COMPOSITE, needAmount: 1500},
            {product: RESOURCE_OXIDANT, needAmount: 200,},
        ]},
        {id:41, level: 2, endProduct: [RESOURCE_TRANSISTOR,RESOURCE_CRYSTAL,RESOURCE_FIXTURES,RESOURCE_EXTRACT], produce:[
            {product: RESOURCE_TRANSISTOR, needAmount: 14,},
            {product: RESOURCE_FIXTURES, needAmount: 10,},
            {product: RESOURCE_EXTRACT, needAmount: 10,},
            {product: RESOURCE_CRYSTAL, needAmount: 300,},
        ]},
        {id: 42, level: 3, endProduct: [RESOURCE_MICROCHIP,RESOURCE_FRAME,RESOURCE_SPIRIT,RESOURCE_LIQUID], produce:[ 
            {product: RESOURCE_MICROCHIP, needAmount: 8,},
            {product: RESOURCE_FRAME, needAmount: 10,},
            {product: RESOURCE_SPIRIT, needAmount: 10,},
            {product: RESOURCE_LIQUID, needAmount: 3000,},
            {product: RESOURCE_PURIFIER, needAmount: 50},
        ]},
        {id:43, level: 0, endProduct: [RESOURCE_WIRE,RESOURCE_ALLOY], produce:[
            {product: RESOURCE_ALLOY, needAmount: 500000,},
            {product: RESOURCE_ZYNTHIUM_BAR, needAmount: 40,},
            {product: RESOURCE_WIRE, needAmount: 500000,},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 40,},
        ]},


    ],
    sectorAttackers: [
        {id: 0, creeps: {}, qwadrant: -1},
        {id: 1, creeps: {atacker:0, hunter:1}, place: {room: "E58N22", posx: 28, posy: 21, flag: 'FlagAttack1'}, qwadrant: 0},
        {id: 2, creeps: {atacker:0, hunter:1}, place: {room: "E55N21", posx: 35, posy: 22, flag: 'FlagAttack2'}, qwadrant: 0},
        {id: 3, creeps: {atacker:0, hunter:1}, place: {room: "E59N26", posx: 32, posy: 47, flag: 'FlagAttack3'}, qwadrant: 0},
        {id: 4, creeps: {atacker:0, hunter:1}, place: {room: "E57N27", posx: 46, posy: 15, flag: 'FlagAttack4'}, qwadrant: 0},
        {id: 5, creeps: {atacker:0, hunter:3}, place: {room: "E55N25", posx: 29, posy: 11, flag: 'FlagAttack5'}, qwadrant: 0},
        {id: 6, creeps: {atacker:0, hunter:1}, place: {room: "E42N28", posx: 45, posy: 34, flag: 'FlagAttack6'}, qwadrant: 2},
        {id: 7, creeps: {atacker:0, hunter:1}, place: {room: "E46N31", posx: 24, posy: 25, flag: 'FlagAttack7'}, qwadrant: 1},
        {id: 8, creeps: {atacker:0, hunter:1}, place: {room: "E57N29", posx: 27, posy: 32, flag: 'FlagAttack8'}, qwadrant: 0},
        {id: 9, creeps: {atacker:0, hunter:1}, place: {room: "E41N23", posx: 33, posy: 3,  flag: 'FlagAttack9'}, qwadrant: 2},
        // {id: 9, creeps: {atacker:0, hunter:2}, place: {room: "E41N26", posx: 9, posy: 31,  flag: 'FlagAttack9'}, qwadrant: 4},
        {id:10, creeps: {atacker:0, hunter:1}, place: {room: "E44N29", posx: 42, posy: 35, flag: 'FlagAttack10'},qwadrant: 2},
        {id:11, creeps: {atacker:0, hunter:2}, place: {room: "E46N36", posx: 40, posy: 39, flag: 'FlagAttack11'},qwadrant: 1},
        {id:12, creeps: {atacker:0, hunter:1}, place: {room: "E55N31", posx: 2,  posy: 26, flag: 'FlagAttack12'},qwadrant: 3}, 
        {id:13, creeps: {atacker:1, hunter:0}, place: {room: "E52N32", posx: 46, posy: 14, flag: 'FlagAttack13'},qwadrant: 3},
        {id:14, creeps: {atacker:1, hunter:0}, place: {room: "E49N22", posx: 17, posy: 22, flag: 'FlagAttack14'},qwadrant: 2},
        {id:15, creeps: {atacker:1, hunter:0}, place: {room: "E47N39", posx: 30, posy: 27, flag: 'FlagAttack15'},qwadrant: 1},
        {id:16, creeps: {atacker:1, hunter:0}, place: {room: "E44N38", posx: 6,  posy: 41, flag: 'FlagAttack16'},qwadrant: 1},
        {id:17, creeps: {atacker:0, hunter:1}, place: {room: "E48N37", posx: 46, posy: 30, flag: 'FlagAttack17'},qwadrant: 1},
        {id:18, creeps: {atacker:1, hunter:0}, place: {room: "E41N39", posx: 38, posy: 25, flag: 'FlagAttack18'},qwadrant: 1},
        {id:19, creeps: {atacker:1, hunter:0}, place: {room: "E57N35", posx: 19, posy: 8,  flag: 'FlagAttack19'},qwadrant: 3}, 
        {id:20, creeps: {atacker:1, hunter:0}, place: {room: "E55N39", posx: 12, posy: 40, flag: 'FlagAttack20'},qwadrant: 3}, 
        {id:21, creeps: {atacker:1, hunter:0}, place: {room: "E59N35", posx: 15, posy: 45, flag: 'FlagAttack21'},qwadrant: 3},
        {id:22, creeps: {atacker:0, hunter:3}, place: {room: "E55N25", posx: 29, posy: 11, flag: 'FlagAttack22'}, qwadrant: 0, disabled: 1},
        {id:23, creeps: {atacker:1, hunter:0}, place: {room: "E52N29", posx: 37, posy: 36, flag: 'FlagAttack23'}, qwadrant: 0, }, 
        {id:24, creeps: {atacker:0, hunter:1}, place: {room: "E55N37", posx: 30, posy: 40, flag: 'FlagAttack24'},qwadrant: 3}, 
        {id:25, creeps: {atacker:1, hunter:0}, place: {room: "E43N25", posx: 2,  posy: 18, flag: 'FlagAttack25'},qwadrant: 2}, 
        {id:26, creeps: {atacker:1, hunter:0}, place: {room: "E57N32", posx: 43, posy: 8,  flag: 'FlagAttack26'},qwadrant: 3}, 
        {id:27, creeps: {atacker:1, hunter:0}, place: {room: "E43N21", posx: 3,  posy: 26, flag: 'FlagAttack27'},qwadrant: 2}, 
        {id:28, creeps: {atacker:1, hunter:0}, place: {room: "E45N22", posx: 26, posy: 36, flag: 'FlagAttack28'},qwadrant: 2},
        {id:29, creeps: {atacker:1, hunter:0}, place: {room: "E53N21", posx: 23, posy: 4,  flag: 'FlagAttack29'},qwadrant: 0},
        {id:30, creeps: {atacker:0, hunter:1}, place: {room: "E41N19", posx: 43, posy: 27, flag: 'FlagAttack30'},qwadrant: 4},
        {id:31, creeps: {atacker:0, hunter:1}, place: {room: "E45N11", posx: 42, posy: 14, flag: 'FlagAttack31'},qwadrant: 4},
        {id:32, creeps: {atacker:1, hunter:0}, place: {room: "E36N9",  posx: 27, posy: 27, flag: 'FlagAttack32'},qwadrant: 5},
        {id:33, creeps: {atacker:0, hunter:1}, place: {room: "E41N5",  posx: 38, posy: 44, flag: 'FlagAttack33'},qwadrant: 6},
        {id:34, creeps: {atacker:1, hunter:0}, place: {room: "E33N9",  posx: 17, posy: 38, flag: 'FlagAttack34'},qwadrant: 5},
        {id:35, creeps: {atacker:1, hunter:0}, place: {room: "E38N19", posx: 30, posy: 6,  flag: 'FlagAttack35'},qwadrant: 7},
        {id:36, creeps: {atacker:1, hunter:0}, place: {room: "E59N41", posx: 24, posy: 4,  flag: 'FlagAttack36'},qwadrant: 8},
        {id:37, creeps: {atacker:0, hunter:1}, place: {room: "E57N44", posx: 2,  posy: 8,  flag: 'FlagAttack37'},qwadrant: 8},
        {id:38, creeps: {atacker:1, hunter:0}, place: {room: "E59N53", posx: 32, posy: 20, flag: 'FlagAttack38'},qwadrant: 9},
        {id:39, creeps: {atacker:1, hunter:0}, place: {room: "E44S8",  posx: 44, posy: 32, flag: 'FlagAttack39'},qwadrant: 10},
    ],
    sectorCreeps: [
        {id: 0, creeps: {}}, 
        {id: 1, creeps: {miner: 3, supertransporter: 2}},
        {id: 2, creeps: {miner: 0, supertransporter: 0}},
        {id: 3, creeps: {miner: 2, supertransporter: 1}},
        {id: 4, creeps: {miner: 0, supertransporter: 0}},
        {id: 5, creeps: {miner: 2, supertransporter: 1}},
        {id: 6, creeps: {miner: 0, supertransporter: 0}},
        {id: 7, creeps: {miner: 0, supertransporter: 0}},
        {id: 8, creeps: {miner: 1, supertransporter: 1}},
        {id: 9, creeps: {miner: 2, supertransporter: 1}},
        {id:10, creeps: {miner: 0, supertransporter: 0}},
        {id:11, creeps: {miner: 1, supertransporter: 1}},
        {id:12, creeps: {miner: 4, supertransporter: 3}},
        {id:13, creeps: {miner: 0, supertransporter: 0}},
        {id:14, creeps: {miner: 1, supertransporter: 1}},
        {id:15, creeps: {miner: 0, supertransporter: 0}},
        {id:16, creeps: {miner: 0, supertransporter: 0}},
        {id:17, creeps: {miner: 2, supertransporter: 1}},
        {id:18, creeps: {miner: 0, supertransporter: 0}},
        {id:19, creeps: {miner: 3, supertransporter: 2}},
        {id:20, creeps: {miner: 0, supertransporter: 0}},
        {id:21, creeps: {miner: 0, supertransporter: 0}},
        {id:22, creeps: {miner: 2, supertransporter: 1}},
        {id:23, creeps: {miner: 3, supertransporter: 3, superharvester: 0}, rooms: ['E55N26']}, //!
        {id:24, creeps: {miner: 0, supertransporter: 0}},
        {id:25, creeps: {miner: 0, supertransporter: 0}},
        {id:26, creeps: {miner: 1, supertransporter: 1}},
        {id:27, creeps: {miner: 1, supertransporter: 1}},
        {id:28, creeps: {miner: 0, supertransporter: 0}},
        {id:29, creeps: {miner: 1, supertransporter: 1}},
        {id:30, creeps: {miner: 1, supertransporter: 1}},
        {id:31, creeps: {miner: 2, supertransporter: 1}}, 
        {id:32, creeps: {miner: 0, supertransporter: 0}}, 
        {id:33, creeps: {miner: 2, supertransporter: 1}},
        {id:34, creeps: {miner: 0, supertransporter: 0}},
        {id:35, creeps: {miner: 2, supertransporter: 1}},
        {id:36, creeps: {miner: 0, supertransporter: 0}},
        {id:37, creeps: {miner: 2, supertransporter: 1}},
        {id:38, creeps: {miner: 0, supertransporter: 0}},
        {id:39, creeps: {miner: 3, supertransporter: 2}},
        {id:40, creeps: {miner: 0, supertransporter: 0}},
        {id:41, creeps: {miner: 0, supertransporter: 0}},
        {id:42, creeps: {miner: 3, supertransporter: 3, superharvester: 0}, rooms: ['E55N26','E54N26']}, //!
        {id:43, creeps: {miner: 0, supertransporter: 0}},
        {id:44, creeps: {miner: 0, supertransporter: 0}},
        {id:45, creeps: {miner: 3, supertransporter: 2}},
        {id:46, creeps: {miner: 0, supertransporter: 0}},
        {id:47, creeps: {miner: 0, supertransporter: 0}},
        {id:48, creeps: {miner: 1, supertransporter: 1}},
        {id:49, creeps: {miner: 2, supertransporter: 1}, rooms: ['E48N36',]},
        {id:50, creeps: {miner: 0, supertransporter: 0}},
        {id:51, creeps: {miner: 3, supertransporter: 2, superharvester: 0}, rooms: ['E46N36']}, //!
        {id:52, creeps: {miner: 0, supertransporter: 0}},
        {id:53, creeps: {miner: 0, supertransporter: 0}},
        {id:54, creeps: {miner: 3, supertransporter: 4, superharvester: 0}, rooms: ['E46N36','E46N35']},
        {id:55, creeps: {miner: 0, supertransporter: 0}},
        {id:56, creeps: {miner: 0, supertransporter: 0}},
        {id:57, creeps: {miner: 2, supertransporter: 1}},
        {id:58, creeps: {miner: 0, supertransporter: 0}},
        {id:59, creeps: {miner: 1, supertransporter: 1}},
        {id:60, creeps: {miner: 1, supertransporter: 1}},
        {id:61, creeps: {miner: 3, supertransporter: 2}},
        {id:62, creeps: {miner: 0, supertransporter: 0}},
        {id:63, creeps: {miner: 0, supertransporter: 0}},
        {id:64, creeps: {miner: 1, supertransporter: 1}},
        {id:65, creeps: {miner: 2, supertransporter: 1}},
        {id:66, creeps: {miner: 0, supertransporter: 0}},
        {id:67, creeps: {miner: 2, supertransporter: 1}},
        {id:68, creeps: {miner: 0, supertransporter: 0}},
        {id:69, creeps: {miner: 3, supertransporter: 2}},
        {id:70, creeps: {miner: 0, supertransporter: 0}},
        {id:71, creeps: {miner: 0, supertransporter: 0}},
        {id:72, creeps: {miner: 2, supertransporter: 1}},
        {id:73, creeps: {miner: 0, supertransporter: 0}},
        {id:74, creeps: {miner: 1, supertransporter: 1}},
        {id:75, creeps: {miner: 2, supertransporter: 1}},
        {id:76, creeps: {miner: 0, supertransporter: 0}},
        {id:77, creeps: {miner: 2, supertransporter: 1}},
        {id:78, creeps: {miner: 0, supertransporter: 0}},
        {id:79, creeps: {miner: 2, supertransporter: 1}},
        {id:80, creeps: {miner: 0, supertransporter: 0}},
        {id:81, creeps: {miner: 2, supertransporter: 1}},
        {id:82, creeps: {miner: 0, supertransporter: 0}},
        {id:83, creeps: {miner: 2, supertransporter: 1}}, 
        {id:84, creeps: {miner: 3, supertransporter: 3, superharvester: 0}, rooms: ['E54N25']}, //!
        {id:85, creeps: {miner: 0, supertransporter: 0}}, 
        {id:86, creeps: {miner: 0, supertransporter: 0}}, 
        {id:87, creeps: {miner: 3, supertransporter: 4, superharvester: 0}, rooms: ['E54N25','E55N25']},
        {id:88, creeps: {miner: 0, supertransporter: 0}},
        {id:89, creeps: {miner: 0, supertransporter: 0}},
        {id:90, creeps: {miner: 2, supertransporter: 2}, rooms: ['E55N24',]},
        {id:91, creeps: {miner: 0, supertransporter: 0}},
        {id:92, creeps: {miner: 1, supertransporter: 1}, rooms: ['E54N25','E55N25','E55N24']},
        {id:93, creeps: {miner: 2, supertransporter: 2}, rooms: ['E54N23','E54N24',]},
        {id:94, creeps: {miner: 0, supertransporter: 0}},
        {id:95, creeps: {miner: 1, supertransporter: 1}, rooms: ['E54N25','E54N24']},
        {id:96, creeps: {miner: 2, supertransporter: 1}},
        {id:97, creeps: {miner: 0, supertransporter: 0}},
        {id:98, creeps: {miner: 2, supertransporter: 1}},
        {id:99, creeps: {miner: 0, supertransporter: 0}},
        {id:100, creeps: {miner: 2, supertransporter: 1}},
        {id:101, creeps: {miner: 3, supertransporter: 2}},
        {id:102, creeps: {miner: 2, supertransporter: 1}},
        {id:103, creeps: {miner: 4, supertransporter: 2}},
        {id:104, creeps: {miner: 2, supertransporter: 1}},
        {id:105, creeps: {miner: 2, supertransporter: 1}},
        {id:106, creeps: {miner: 2, supertransporter: 1}},
        {id:107, creeps: {miner: 2, supertransporter: 1}},
        {id:108, creeps: {miner: 5, supertransporter: 4}},
        {id:109, creeps: {miner: 4, supertransporter: 4, superharvester: 0}, rooms:['E56N24','E56N25']}, //!
        {id:110, creeps: {miner: 0, supertransporter: 0, superharvester: 0}, rooms:['E56N25']}, //!
        {id:111, creeps: {miner: 5, supertransporter: 4}},
        {id:112, creeps: {miner: 3, supertransporter: 2}},
        {id:113, creeps: {miner: 2, supertransporter: 1}},
        {id:114, creeps: {miner: 2, supertransporter: 1}},
        {id:115, creeps: {miner: 3, supertransporter: 2}},
        {id:116, creeps: {miner: 5, supertransporter: 4}},
        {id:117, creeps: {miner: 3, supertransporter: 2}},
        {id:118, creeps: {miner: 3, supertransporter: 2}},
        {id:119, creeps: {miner: 2, supertransporter: 1}},
        {id:120, creeps: {miner: 3, supertransporter: 3}},
        {id:121, creeps: {miner: 1, supertransporter: 1}},
        {id:122, creeps: {miner: 2, supertransporter: 1}},
        {id:123, creeps: {miner: 2, supertransporter: 1}},
        {id:124, creeps: {miner: 2, supertransporter: 1}},
        {id:125, creeps: {miner: 2, supertransporter: 1}},
        {id:126, creeps: {miner: 2, supertransporter: 1}},
        {id:127, creeps: {miner: 2, supertransporter: 1}},
        {id:128, creeps: {miner: 2, supertransporter: 1}}, 
        {id:129, creeps: {miner: 6, supertransporter: 4}}, 
        {id:130, creeps: {miner: 3, supertransporter: 3}, rooms: ['E56N44',]},
        {id:131, creeps: {miner: 2, supertransporter: 1}, rooms: ['E59N52',]},
        {id:132, creeps: {miner: 2, supertransporter: 1}, rooms: ['E59N54',]},
        {id:133, creeps: {miner: 4, supertransporter: 3}, rooms: ['E45S8','E45S9','E46S8']},
        
    ],
    depositHarvesting: {
        'E55N27': { depositRooms: [
            'E53N20','E54N20','E55N20','E56N20','E57N20','E58N20','E59N20','E60N20','E60N21','E60N22','E60N23','E60N24','E60N25','E60N26','E60N27','E60N28','E60N29',
            'E60N30','E59N30','E58N30','E57N30','E56N30','E55N30','E54N30','E53N30','E52N30','E51N30','E50N30','E50N29','E50N28','E50N27',
        ], roomToHarvestDeposits: ['E58N22','E55N21','E59N24','E58N27','E57N29','E55N31','E52N32','E52N29'],},
        'E45N29': { depositRooms: [
            'E49N30','E48N30','E47N30','E46N30','E45N30','E44N30','E43N30','E42N30','E41N30','E40N30',
            'E40N29','E40N28','E40N27','E40N26','E40N25','E40N24','E40N23','E40N22','E40N21',
            'E40N20','E41N20','E42N20','E43N20','E44N20','E45N20','E46N20','E47N20','E48N20',
            'E49N20','E50N20','E51N20','E50N21','E50N21','E50N22','E50N23','E50N24',
        ], roomToHarvestDeposits: ['E45N29','E46N31','E42N28','E41N23','E49N22','E43N21','E45N22'],},
        'E44N38': { depositRooms: [
            'E40N37','E40N38','E40N39','E40N40','E41N40','E42N40','E43N40','E44N40',
            'E45N40','E46N40','E47N40','E48N40','E49N40','E50N40','E50N39','E50N38','E50N37','E50N36','E50N35','E50N34', 
        ], roomToHarvestDeposits: ['E47N39','E41N39','E49N37'],},
        'E57N35': { depositRooms: [
            'E51N40','E52N40','E53N40','E54N40','E55N40','E56N40','E57N40','E58N40','E59N40','E60N40','E60N39','E60N41','E60N42','E60N43',
            'E60N38','E60N37','E60N36','E60N35','E60N34','E60N33','E60N32',
        ], roomToHarvestDeposits: ['E55N39','E59N35','E59N41'],}, 
        'E41N19': { depositRooms: [
            'E41N20','E40N20','E40N19','E40N18','E40N17','E40N16',
            'E42N10','E43N10','E44N10','E45N10','E46N10','E47N10','E48N10','E49N10',
            'E39N20','E38N20','E37N20','E36N20',
        ], roomToHarvestDeposits: ['E41N19','E45N11','E38N19'],}, 
        'E36N9': { depositRooms: [
            'E30N10','E31N10','E32N10','E33N10','E34N10','E35N10','E36N10','E37N10','E38N10','E39N10',
        ], roomToHarvestDeposits: ['E36N9','E33N9'],}, 
        'E41N5': { depositRooms: [
            'E40N2','E40N3','E40N4','E40N5','E40N6','E40N7','E40N8',
        ], roomToHarvestDeposits: ['E41N5'],},
        'E59N53': { depositRooms: [
            'E60N55','E60N54','E60N53','E60N52','E60N51','E60N50','E59N50','E58N50',
        ], roomToHarvestDeposits: ['E59N53'],},
        'E47S1': { depositRooms: [
            'E43S0','E44S0','E45S0','E46S0','E47S0','E48S0','E49S0','E50S0',
            'E43N0','E44N0','E45N0','E46N0','E47N0','E48N0','E49N0','E50N0',
            'E41S10','E42S10','E43S10','E44S10','E45S10','E46S10','E47S10','E48S10'
        ], roomToHarvestDeposits: ['E47S1','E44S8'],},

    },
    powerHarvesting: {
        'E58N22': {sector: 0, powerRooms: ['E56N20', 'E57N20', 'E58N20', 'E59N20', 'E60N20','E60N21','E60N22', ]},
        'E59N24': {sector: 1, powerRooms: ['E60N22','E60N23','E60N24','E60N25','E60N26', ]},
        'E55N21': {sector: 2, powerRooms: ['E52N20','E53N20','E54N20','E55N20','E56N20','E57N20',]},
        'E57N29': {sector: 3, powerRooms: ['E54N30','E55N30','E56N30','E57N30','E58N30','E59N30','E60N30','E60N31',]},
        'E58N27': {sector: 4, powerRooms: ['E60N26','E60N27','E60N28','E60N29',]},
        'E46N31': {sector: 5, powerRooms: ['E49N30','E48N30','E47N30','E46N30','E45N30','E44N30',]},
        'E42N28': {sector: 6, powerRooms: ['E43N30','E42N30','E41N30','E40N30','E40N29','E40N28','E40N27','E40N26',]},
        'E41N23': {sector: 7, powerRooms: ['E40N25','E40N24','E40N23','E40N22','E40N21', ]},
        'E52N32': {sector: 8, powerRooms: ['E50N29','E50N30','E51N30','E52N30','E53N30',]},
        'E55N31': {sector: 9, powerRooms: ['E53N30','E54N30','E55N30','E56N30','E57N30','E58N30',]},
        'E49N22': {sector:10, powerRooms: ['E49N20','E50N20','E51N20','E50N21','E50N22',]},
        'E47N39': {sector:11, powerRooms: ['E46N40','E47N40','E48N40',]},
        'E49N37': {sector:12, powerRooms: ['E50N39','E50N38','E50N37','E50N36','E50N35',]},
        'E41N39': {sector:13, powerRooms: ['E40N39','E40N38',]},
        'E55N39': {sector:14, powerRooms: ['E51N40','E52N40','E53N40','E54N40','E55N40','E56N40',]},
        'E59N35': {sector:15, powerRooms: ['E60N38','E60N37','E60N36','E60N35','E60N34','E60N33','E60N32',]},
        'E52N29': {sector:16, powerRooms: ['E50N27','E50N28','E50N29','E50N30','E51N30','E52N30','E53N30','E54N30',]},
        'E43N21': {sector:17, powerRooms: ['E40N20','E41N20','E42N20','E43N20','E44N20','E45N20','E46N20','E47N20','E48N20',]},
        'E41N19': {sector:18, powerRooms: ['E41N20','E40N20','E40N19','E40N18','E40N17','E40N16',]},
        'E45N11': {sector:19, powerRooms: ['E42N10','E43N10','E44N10','E45N10','E46N10','E47N10','E48N10','E49N10',]},
        'E36N9':  {sector:20, powerRooms: ['E34N10','E35N10','E36N10','E37N10','E38N10','E39N10',]},
        'E41N5':  {sector:21, powerRooms: ['E40N2','E40N3','E40N4','E40N5','E40N6','E40N7','E40N8',]},
        'E33N9':  {sector:22, powerRooms: ['E31N10','E32N10','E33N10','E34N10','E35N10',]},
        'E59N53': {sector:23, powerRooms: ['E60N55','E60N54','E60N53','E60N52','E60N51','E60N50','E59N50','E58N50',]},
        'E47S1':  {sector:24, powerRooms: ['E43S0','E44S0','E45S0','E46S0','E47S0','E48S0','E49S0','E50S0','E43N0','E44N0','E45N0','E46N0','E47N0','E48N0','E49N0','E50N0',]},
        'E47N39': {sector:25, powerRooms: ['E44N40','E45N40','E46N40','E47N40','E48N40','E49N40','E50N40',]},
        'E41N39': {sector:26, powerRooms: ['E40N37','E40N38','E40N39','E40N40','E38N40','E38N40','E39N40','E40N40','E41N40','E42N40','E43N40','E40N41',]},
    },
    teamAssaults: [
        {id: 0, creeps: {dismantler: 0, assault:0, defender:0, healer: 0, transporter: 0, transporter2: 0 }, place: {room: "E58N22", posx: 45, posy: 42}},
        {id: 1, creeps: {dismantler: 0, assault:0, defender:0, healer: 0, transporter: 0, transporter2: 0 }, place: {room: "E58N22", posx: 45, posy: 42}},
    ],
    teamMassRangers: {
        0: {id: 0, creeps: {}, },
        1: {id: 1, creeps: {massRanger: roleMassRanger.getRangerCount(1)}, },
        // 2: {id: 2, creeps: {massRanger: roleMassRanger.getRangerCount(2)}, },
        // 3: {id: 3, creeps: {massRanger: roleMassRanger.getRangerCount(3)}, },
        // 4: {id: 4, creeps: {massRanger: roleMassRanger.getRangerCount(4)}, },
    },
    strongholdCheck: {
        'E55N27': {
            rooms: ['E54N26','E55N26','E56N26','E54N25','E55N25','E56N25','E54N24','E55N24','E56N24','E56N24',],
            atackerRoom: 'E57N25',
            qwadrant: 0,
        },
        'E42N28': {
            rooms: ['E44N26','E45N26','E46N26','E44N25','E45N25','E46N25','E44N24','E45N24','E46N24',],
            atackerRoom: 'E42N28',
            qwadrant: 2,
        },
        'E47N36': {
            rooms: ['E44N36','E45N36','E46N36','E44N34','E45N34','E46N34','E44N35','E45N35','E46N35',],
            atackerRoom: 'E47N36',
            qwadrant: 1,
        },
        'E52N32': {
            rooms: ['E54N34','E55N34','E56N34','E54N35','E55N35','E56N35','E54N36','E55N36','E56N36',],
            atackerRoom: 'E52N32',
            qwadrant: 3,
        },
        'E45N11': {
            rooms: ['E44N16','E45N16','E46N16','E44N15','E45N15','E46N15','E44N14','E45N14','E46N14',],
            atackerRoom: 'E45N11',
            qwadrant: 4,
        },
        'E36N9': {
            rooms: ['E34N6','E35N6','E36N6','E34N5','E35N5','E36N5','E34N4','E35N4','E36N4',],
            atackerRoom: '',
            qwadrant: 5,
        },
        'E41N5': {
            rooms: ['E44N6','E45N6','E46N6','E44N5','E45N5','E46N5','E44N4','E45N4','E46N4',],
            atackerRoom: 'E41N5',
            qwadrant: 6,
        },
        'E38N19': {
            rooms: ['E34N16','E35N16','E36N16','E34N15','E35N15','E36N15','E34N14','E35N14','E36N14',],
            atackerRoom: '',
            qwadrant: 7,
        },
        'E57N44': {
            rooms: ['E54N44','E55N44','E56N44','E54N45','E55N45','E56N45','E54N46','E55N46','E56N46',],
            atackerRoom: 'E57N44',
            qwadrant: 8,
        },
        'E59N53': {
            rooms: ['E54N54','E55N54','E56N54','E54N55','E55N55','E56N55','E54N56','E55N56','E56N56',],
            atackerRoom: '',
            qwadrant: 9,
        },
        'E44S8': {
            rooms: ['E44S6','E45S6','E46S6','E44S5','E45S5','E46S5','E44S4','E45S4','E46S4',],
            atackerRoom: 'E44S8',
            qwadrant: 10,
        },
    },
    manageResources: {
        'E57N29': {[RESOURCE_UTRIUM]: {conditionsOr: [{res: RESOURCE_UTRIUM, amount: 10000}, {res: RESOURCE_UTRIUM_BAR, amount: 1000}], maxPrice: 40.101, buyAmount: 30000}},
        'E52N32': {[RESOURCE_HYDROGEN]: { conditionsOr: [{res: RESOURCE_HYDROGEN, amount: 200000}, ], maxPrice: 85.101, buyAmount: 30000}},
        'E58N27': {[RESOURCE_LEMERGIUM]: {conditionsOr: [{res: RESOURCE_LEMERGIUM, amount: 200000}], maxPrice: 61.101, buyAmount: 30000}},
        'E47N36': {[RESOURCE_GHODIUM_OXIDE]: {conditionsOr: [{res: RESOURCE_GHODIUM_OXIDE, amount: 10000}, {res: RESOURCE_GHODIUM, amount: 10000}, ], maxPrice: 3.101, buyAmount: 15000},},
        'E45N29': {[RESOURCE_CATALYST]: {conditionsOr: [{res: RESOURCE_CATALYST, amount: 400000}, ], maxPrice: 43.901, buyAmount: 10000},}, 
        'E46N31': {[RESOURCE_GHODIUM]: {conditionsOr: [{res: RESOURCE_GHODIUM, amount: 15000}, ], maxPrice: 20.999, buyAmount: 5000},}, 
        'E55N27': {[RESOURCE_POWER]: {conditionsOr: [{res: RESOURCE_POWER, amount: 900000}], maxPrice: 355.950, buyAmount: 20000},},  //42.950 
        'E49N22': {[RESOURCE_UTRIUM]: {conditionsOr: [{res: RESOURCE_UTRIUM, amount: 200000}, ], maxPrice: 45.101, buyAmount: 30000},},
        'E55N21': {[RESOURCE_OXYGEN]: {conditionsOr: [{res: RESOURCE_OXYGEN, amount: 200000}, ], maxPrice: 75.101, buyAmount: 30000},},
        'E55N31': {[RESOURCE_ZYNTHIUM]: {conditionsOr: [{res: RESOURCE_ZYNTHIUM, amount: 200000}], maxPrice: 95.150, buyAmount: 30000},},
        'E42N28': {
            [RESOURCE_OPS]: {conditionsOr: [{res: RESOURCE_OPS, amount: 20000}], maxPrice: 20.250, buyAmount: 10000},
            [RESOURCE_KEANIUM_HYDRIDE]: {conditionsOr: [{res: RESOURCE_KEANIUM_HYDRIDE, amount: 10000}], maxPrice: 5.250, buyAmount: 5000},
        },
        'E41N39': {[RESOURCE_CATALYZED_GHODIUM_ACID]: {conditionsOr: [{res: RESOURCE_CATALYZED_GHODIUM_ACID, amount: 3600000}], maxPrice: 70.250, buyAmount: 30000},}, 
        'E41N23': {[RESOURCE_KEANIUM]: {conditionsOr: [{res: RESOURCE_KEANIUM, amount: 200000}], maxPrice: 45.150, buyAmount: 30000},},
        'E59N35': {[RESOURCE_CATALYZED_LEMERGIUM_ACID]: {conditionsOr: [{res: RESOURCE_CATALYZED_LEMERGIUM_ACID, amount: 20000}], maxPrice: 42.250, buyAmount: 15000},},
        'E43N21': {[RESOURCE_HYDROGEN]: { conditionsOr: [{res: RESOURCE_HYDROGEN, amount: 20000}, ], maxPrice: 85.101, buyAmount: 30000}}, 
        'E43N25': {[RESOURCE_CATALYZED_KEANIUM_ACID]: {conditionsOr: [{res: RESOURCE_CATALYZED_KEANIUM_ACID, amount: 30000}], maxPrice: 140.250, buyAmount: 6000},},
        'E43N38': {[RESOURCE_CATALYZED_GHODIUM_ACID]: {conditionsOr: [{res: RESOURCE_CATALYZED_GHODIUM_ACID, amount: 30000}], maxPrice: 150.250, buyAmount: 10000},},
        'E41N19': {[RESOURCE_ZYNTHIUM_KEANITE]: {conditionsOr: [{res: RESOURCE_ZYNTHIUM_KEANITE, amount: 40000}], maxPrice: 18.150, buyAmount: 30000},},
        
        'E43N21': {
            [RESOURCE_METAL]: {conditionsOr: [{res: RESOURCE_METAL, amount: 40000}], maxPrice: 98.150, buyAmount: 30000},
            [RESOURCE_MIST]: {conditionsOr: [{res: RESOURCE_MIST, amount: 40000}], maxPrice: 120.150, buyAmount: 30000},
        },
        'E45N29': {[RESOURCE_SILICON]: {conditionsOr: [{res: RESOURCE_SILICON, amount: 40000}], maxPrice: 98.150, buyAmount: 30000},},
        
        
        
    },

    clone: function(object) {
        return require('fastest-json-copy').copy(object);
    },

    getCfg: function () {
        
        // return [this.clone(this.myRooms), this.clone(this.skRooms), this.clone(this.labConfig), this.clone(this.factoryConfig), this.clone(this.sectorAttackers), this.clone(this.sectorCreeps), this.clone(this.depositHarvesting), 
        //     this.clone(this.powerHarvesting), this.clone(this.teamAssaults), this.clone(this.teamMassRangers), this.clone(this.strongholdCheck), this.clone(this.manageResources),];

        return [this.clone(this.myRooms), this.clone(this.skRooms), this.labConfig, this.factoryConfig, this.clone(this.sectorAttackers), this.sectorCreeps, this.depositHarvesting, 
            this.powerHarvesting, this.teamAssaults, this.teamMassRangers, this.strongholdCheck, this.manageResources,];


    },
    
    sectorTargets: [
        {id: 0, targets: [],},
        {id: 1, targets: [
            {flag:'Flag1', id: '59f1a6ea82100e1594f40cac', koef: 0},
            {flag:'Flag1', id: '59f1a6ea82100e1594f40cad', koef: 0},
            {flag:'Flag5', id: '59f1a6fb82100e1594f40e3c', koef: 0},
        ],},     
        {id: 2, targets: [
            {flag:'Flag1', id: '59f1a6ea82100e1594f40cad', koef: 0},
        ],},     
        {id: 3, targets: [
            {flag:'Flag3', id: '59f1a6fb82100e1594f40e3a', koef: 0},
            {flag:'Flag3', id: '59f1a6fb82100e1594f40e38', koef: 0},
        ],},     
        {id: 4, targets: [
            {flag:'Flag3', id: '59f1a6fb82100e1594f40e38', koef: 0},
        ],},     
        {id: 5, targets: [
            {flag:'Flag4', id: '59f1a6ea82100e1594f40ca5', koef: 0},
            {flag:'Flag4', id: '59f1a6ea82100e1594f40ca3', koef: 0},
        ],},     
        {id: 6, targets: [
            {flag:'Flag4', id: '59f1a6ea82100e1594f40ca3', koef: 0},
        ],},     
        {id: 7, targets: [
            {flag:'Flag5', id: '59f1a6fb82100e1594f40e3c', koef: 0},
        ],},     
        {id: 8, targets: [
            {flag:'Flag8', id: '59f1a6a082100e1594f404ad', koef: 0},
        ],},     
        {id: 9, targets: [
            {flag:'Flag9', id: '59f1a6c582100e1594f40914', koef: 0},
            {flag:'Flag11', id: '59f1a6c582100e1594f40911', koef: 0},
        ],},     
        {id: 10, targets: [
            {flag:'Flag11', id: '59f1a6c582100e1594f40911', koef: 0},
        ],},     
        {id: 11, targets: [
            {flag:'Flag12', id: '59f1a6b482100e1594f406e5', koef: 0},
        ],},     
        {id: 12, targets: [
            {flag:'Flag13', id: '59f1a6fa82100e1594f40e2f', koef: 0},
            {flag:'Flag13', id: '59f1a6fa82100e1594f40e2e', koef: 0},
            {flag:'Flag15', id: '59f1a6fa82100e1594f40e2b', koef: 0},
            {flag:'Flag15', id: '59f1a6fa82100e1594f40e2a', koef: 0, r: 5},
        ],},     
        {id: 13, targets: [
            {flag:'Flag13', id: '59f1a6fa82100e1594f40e2e', koef: 0},
        ],},     
        {id: 14, targets: [
            {flag:'Flag14', id: '59f1a6ea82100e1594f40ca1', koef: 0},
        ],},     
        {id: 15, targets: [
            {flag:'Flag15', id: '59f1a6fa82100e1594f40e2b', koef: 0},
        ],},     
        {id: 16, targets: [
            {flag:'Flag15', id: '59f1a6fa82100e1594f40e2a', koef: 0, r: 5},
        ],},     
        {id: 17, targets: [
            {flag:'Flag18', id: '59f1a6fa82100e1594f40e25', koef: 0},
            {flag:'Flag18', id: '59f1a6fa82100e1594f40e26', koef: 0},
        ],},     
        {id: 18, targets: [
            {flag:'Flag18', id: '59f1a6fa82100e1594f40e26', koef: 0},
        ],},     
        {id: 19, targets: [
            {flag:'Flag19', id: '59f1a6d482100e1594f40b12', koef: 0},
            {flag:'Flag20', id: '59f1a6d482100e1594f40b0f', koef: 0},
            {flag:'Flag20', id: '59f1a6d482100e1594f40b0e', koef: 0},
        ],},     
        {id: 20, targets: [
            {flag:'Flag20', id: '59f1a6d482100e1594f40b0f', koef: 0},
        ],},     
        {id: 21, targets: [
            {flag:'Flag20', id: '59f1a6d482100e1594f40b0e', koef: 0},
        ],},     
        {id: 22, targets: [
            {flag:'Flag24', id: '59f1a5e282100e1594f3f26e', koef: 0},
            {flag:'Flag24', id: '59f1a5e282100e1594f3f26d', koef: 0},
        ],},     
        {id: 23, targets: [
            {flag:'Flag25', id: '59f1a6b382100e1594f406cc', koef: 0, r: 8}, //SK
            {flag:'Flag26', id: '59f1a6b382100e1594f406ce', koef: 0}, //SK
            {flag:'Flag27', id: '59f1a6b382100e1594f406d0', koef: 0}, //SK
        ],},     
        {id: 24, targets: [
            {flag:'Flag26', id: '59f1a6b382100e1594f406ce', koef: 0}, //SK merge 23
        ],},     
        {id: 25, targets: [
            {flag:'Flag27', id: '59f1a6b382100e1594f406d0', koef: 0}, //SK merge 23
        ],},     
        {id: 26, targets: [
            {flag:'Flag29', id: '59f1a6c482100e1594f408f0', koef: 0}, 
        ],},     
        {id: 27, targets: [
            {flag:'Flag30', id: '59f1a6c482100e1594f408ee', koef: 0}, 
        ],},
        {id: 28, targets: [
            {flag:'Flag24', id: '59f1a5e282100e1594f3f26d', koef: 0},
        ],},     
        {id: 29, targets: [
            {flag:'Flag31', id: '59f1a5d282100e1594f3f0e8', koef: 0},
        ],},     
        {id: 30, targets: [
            {flag:'Flag32', id: '59f1a5d282100e1594f3f0e6', koef: 0},
        ],},     
        {id: 31, targets: [
            {flag:'Flag34', id: '59f1a62782100e1594f3faa3', koef: 0},
            {flag:'Flag34', id: '59f1a62782100e1594f3faa5', koef: 0},
        ],},     
        {id: 32, targets: [
            {flag:'Flag35', id: '59f1a62782100e1594f3faa5', koef: 0},
        ],},     
        {id: 33, targets: [
            {flag:'Flag36', id: '59f1a60882100e1594f3f65f', koef: 0},
            {flag:'Flag36', id: '59f1a60882100e1594f3f65e', koef: 0},
        ],},     
        {id: 34, targets: [
            {flag:'Flag37', id: '59f1a60882100e1594f3f65e', koef: 0},
        ],},     
        {id: 35, targets: [
            {flag:'Flag39', id: '59f1a6e882100e1594f40c8f', koef: 0},
            {flag:'Flag40', id: '59f1a6e882100e1594f40c91', koef: 0},
        ],},     
        {id: 36, targets: [
            {flag:'Flag40', id: '59f1a6e882100e1594f40c91', koef: 0},
        ],},     
        {id: 37, targets: [
            {flag:'Flag41', id: '59f1a6c482100e1594f408e8', koef: 0},
            {flag:'Flag41', id: '59f1a6c482100e1594f408e9', koef: 0},
        ],},     
        {id: 38, targets: [
            {flag:'Flag41', id: '59f1a6c482100e1594f408e9', koef: 0},
        ],},     
        {id: 39, targets: [
            {flag:'Flag43', id: '59f1a5f682100e1594f3f41f', koef: 0},
            {flag:'Flag44', id: '59f1a5f682100e1594f3f422', koef: 0},
            {flag:'Flag44', id: '59f1a5f682100e1594f3f423', koef: 0, r: 2},
        ],},     
        {id: 40, targets: [
            {flag:'Flag44', id: '59f1a5f682100e1594f3f422', koef: 0},
        ],},     
        {id: 41, targets: [
            {flag:'Flag44', id: '59f1a5f682100e1594f3f423', koef: 0, r: 2},
        ],},     
        {id: 42, targets: [
            {flag:'Flag45', id: '59f1a6a082100e1594f4048c', koef: 0}, //SK
            {flag:'Flag46', id: '59f1a6a082100e1594f4048d', koef: 0}, //SK
            {flag:'Flag47', id: '59f1a6a082100e1594f40491', koef: 0}, //SK
        ],},     
        {id: 43, targets: [
            {flag:'Flag46', id: '59f1a6a082100e1594f4048d', koef: 0}, //SK merge 42
        ],},     
        {id: 44, targets: [
            {flag:'Flag47', id: '59f1a6a082100e1594f40491', koef: 0}, //SK merge 42
        ],},     
        {id: 45, targets: [
            {flag:'Flag50', id: '59f1a5c182100e1594f3ef61', koef: 0}, 
            {flag:'Flag50', id: '59f1a5c182100e1594f3ef5f', koef: 0}, 
            {flag:'Flag51', id: '59f1a5c182100e1594f3ef5d', koef: 0}, 
        ],},     
        {id: 46, targets: [
            {flag:'Flag50', id: '59f1a5c182100e1594f3ef5f', koef: 0}, 
        ],},     
        {id: 47, targets: [
            {flag:'Flag51', id: '59f1a5c182100e1594f3ef5d', koef: 0}, 
        ],},     
        {id: 48, targets: [
            {flag:'Flag52', id: '59f1a5c182100e1594f3ef68', koef: 0}, 
        ],},     
        {id: 49, targets: [
            {flag:'Flag55', id: '59f1a63b82100e1594f3fc19', koef: 0}, 
            {flag:'Flag55', id: '59f1a63b82100e1594f3fc18', koef: 0, r: 2}, 
        ],},     
        {id: 50, targets: [
            {flag:'Flag55', id: '59f1a63b82100e1594f3fc18', koef: 0, r: 2}, //merge 49
        ],},     
        {id: 51, targets: [
            {flag:'Flag56', id: '59f1a61882100e1594f3f86d', koef: 0, r: 8}, //SK
            {flag:'Flag57', id: '59f1a61882100e1594f3f86a', koef: 0}, //SK
            {flag:'Flag58', id: '59f1a61882100e1594f3f86e', koef: 0}, //SK
        ],},     
        {id: 52, targets: [
            {flag:'Flag57', id: '59f1a61882100e1594f3f86a', koef: 0}, //SK merge 51
        ],},     
        {id: 53, targets: [
            {flag:'Flag58', id: '59f1a61882100e1594f3f86e', koef: 0}, //SK merge 51
        ],},     
        {id: 54, targets: [
            {flag:'Flag60', id: '59f1a61882100e1594f3f871', koef: 0}, //SK
            {flag:'Flag61', id: '59f1a61882100e1594f3f878', koef: 0}, //SK
            {flag:'Flag62', id: '59f1a61882100e1594f3f877', koef: 0}, //SK
        ],},     
        {id: 55, targets: [
            {flag:'Flag61', id: '59f1a61882100e1594f3f878', koef: 0}, //SK merge 54
        ],},     
        {id: 56, targets: [
            {flag:'Flag62', id: '59f1a61882100e1594f3f877', koef: 0}, //SK merge 54
        ],},     
        {id: 57, targets: [
            {flag:'Flag64', id: '59f1a6c482100e1594f408e2', koef: 0}, 
            {flag:'Flag64', id: '59f1a6c482100e1594f408e4', koef: 0}, 
        ],},     
        {id: 58, targets: [
            {flag:'Flag64', id: '59f1a6c482100e1594f408e4', koef: 0}, 
        ],},     
        {id: 59, targets: [
            {flag:'Flag65', id: '59f1a69f82100e1594f4047f', koef: 0}, 
        ],},     
        {id: 60, targets: [
            {flag:'Flag66', id: '59f1a69f82100e1594f4047b', koef: 0}, 
        ],},     
        {id: 61, targets: [
            {flag:'Flag68', id: '59f1a68f82100e1594f402bf', koef: 0}, 
            {flag:'Flag68', id: '59f1a68f82100e1594f402bd', koef: 0}, 
            {flag:'Flag69', id: '59f1a68f82100e1594f402c2', koef: 0}, 
        ],},     
        {id: 62, targets: [
            {flag:'Flag68', id: '59f1a68f82100e1594f402bd', koef: 0}, 
        ],},     
        {id: 63, targets: [
            {flag:'Flag69', id: '59f1a68f82100e1594f402c2', koef: 0}, 
        ],},     
        {id: 64, targets: [
            {flag:'Flag70', id: '59f1a67f82100e1594f4013f', koef: 0}, 
        ],},     
        {id: 65, targets: [
            {flag:'Flag73', id: '59f1a63d82100e1594f3fc4c', koef: 0}, 
            {flag:'Flag73', id: '59f1a63d82100e1594f3fc4a', koef: 0}, 
        ],},     
        {id: 66, targets: [
            {flag:'Flag73', id: '59f1a63d82100e1594f3fc4a', koef: 0}, 
        ],},     
        {id: 67, targets: [
            {flag:'Flag74', id: '59f1a64e82100e1594f3fdd2', koef: 0}, 
            {flag:'Flag74', id: '59f1a64e82100e1594f3fdd0', koef: 0},
        ],},     
        {id: 68, targets: [
            {flag:'Flag74', id: '59f1a64e82100e1594f3fdd0', koef: 0}, 
        ],},     
        {id: 69, targets: [
            {flag:'Flag77', id: '59f1a63b82100e1594f3fc11', koef: 0}, 
            {flag:'Flag77', id: '59f1a63b82100e1594f3fc13', koef: 0}, 
            {flag:'Flag78', id: '59f1a62682100e1594f3fa8d', koef: 0},
        ],},     
        {id: 70, targets: [
            {flag:'Flag77', id: '59f1a63b82100e1594f3fc13', koef: 0}, 
        ],},     
        {id: 71, targets: [
            {flag:'Flag78', id: '59f1a62682100e1594f3fa8d', koef: 0}, 
        ],},    
        {id: 72, targets: [
            {flag:'Flag79', id: '59f1a61782100e1594f3f85e', koef: 0}, 
            {flag:'Flag79', id: '59f1a61782100e1594f3f85f', koef: 0}, 
        ],},    
        {id: 73, targets: [
            {flag:'Flag79', id: '59f1a61782100e1594f3f85f', koef: 0}, 
        ],},    
        {id: 74, targets: [
            {flag:'Flag81', id: '59f1a5f282100e1594f3f3f4', koef: 0}, 
        ],},    
        {id: 75, targets: [
            {flag:'Flag82', id: '59f1a5e082100e1594f3f24f', koef: 0}, 
            {flag:'Flag82', id: '59f1a5e082100e1594f3f251', koef: 0}, 
        ],},    
        {id: 76, targets: [
            {flag:'Flag82', id: '59f1a5e082100e1594f3f251', koef: 0}, 
        ],},    
        {id: 77, targets: [
            {flag:'Flag84', id: '59f1a60782100e1594f3f638', koef: 0}, 
            {flag:'Flag84', id: '59f1a60782100e1594f3f639', koef: 0}, 
        ],},    
        {id: 78, targets: [
            {flag:'Flag84', id: '59f1a60782100e1594f3f639', koef: 0}, 
        ],},   
        {id: 79, targets: [
            {flag:'Flag6', id: '59f1a64c82100e1594f3fd9e', koef: 0},  
            {flag:'Flag6', id: '59f1a64c82100e1594f3fd9f', koef: 0},  
        ],},  
        {id: 80, targets: [
            {flag:'Flag6', id: '59f1a64c82100e1594f3fd9f', koef: 0},  
        ],},  
        {id: 81, targets: [
            {flag:'Flag7', id: '59f1a64c82100e1594f3fda6', koef: 0},  
            {flag:'Flag7', id: '59f1a64c82100e1594f3fda7', koef: 0},  
        ],},  
        {id: 82, targets: [
            {flag:'Flag7', id: '59f1a64c82100e1594f3fda7', koef: 0},  
        ],},  
        {id: 83, targets: [
            {flag:'Flag16', id: '59f1a5d082100e1594f3f0be', koef: 0},  
            {flag:'Flag16', id: '59f1a5d082100e1594f3f0bf', koef: 0},  
        ],},  
        {id: 84, targets: [
            {flag:'Flag22', id: '59f1a6a082100e1594f40499', koef: 0},  
            {flag:'Flag23', id: '59f1a6a082100e1594f4049a', koef: 0},  
            {flag:'Flag33', id: '59f1a6a082100e1594f40494', koef: 0},
        ],},  
        {id: 85, targets: [
            {flag:'Flag23', id: '59f1a6a082100e1594f4049a', koef: 0},  //merge 84
        ],},  
        {id: 86, targets: [
            {flag:'Flag33', id: '59f1a6a082100e1594f40494', koef: 0},  //merge 84
        ],},  
        {id: 87, targets: [
            {flag:'Flag38', id: '59f1a6b482100e1594f406d6', koef: 0},  
            {flag:'Flag38', id: '59f1a6b482100e1594f406d3', koef: 0},  
            {flag:'Flag38', id: '59f1a6b482100e1594f406d5', koef: 0},
        ],},  
        {id: 88, targets: [
            {flag:'Flag38', id: '59f1a6b482100e1594f406d3', koef: 0}, //merge 87  
        ],},  
        {id: 89, targets: [
            {flag:'Flag38', id: '59f1a6b482100e1594f406d5', koef: 0}, //merge 87 
        ],},  
        {id: 90, targets: [
            {flag:'Flag49', id: '59f1a6b482100e1594f406de', koef: 0},  
            {flag:'Flag53', id: '59f1a6b482100e1594f406dd', koef: 0},  
        ],},  
        {id: 91, targets: [
            {flag:'Flag53', id: '59f1a6b482100e1594f406dd', koef: 0},  //merge 90 
        ],},  
        {id: 92, targets: [
            {flag:'Flag54', id: '59f1a6b482100e1594f406d8', koef: 0},  
        ],},  
        {id: 93, targets: [
            {flag:'Flag63', id: '59f1a6a082100e1594f404a4', koef: 0},  
            {flag:'Flag67', id: '59f1a6a082100e1594f404a2', koef: 0},  
        ],},  
        {id: 94, targets: [
            {flag:'Flag67', id: '59f1a6a082100e1594f404a2', koef: 0},  //merge 93 
        ],},  
        {id: 95, targets: [
            {flag:'Flag71', id: '59f1a6a082100e1594f4049e', koef: 0},  
        ],},  
        {id: 96, targets: [
            {flag:'Flag75', id: '59f1a6d382100e1594f40af4', koef: 0},  
            {flag:'Flag76', id: '59f1a6d382100e1594f40af2', koef: 0},  
        ],},  
        {id: 97, targets: [
            {flag:'Flag76', id: '59f1a6d382100e1594f40af2', koef: 0},  
        ],},  
        {id: 98, targets: [
            {flag:'Flag80', id: '59f1a6d482100e1594f40afb', koef: 0},  
            {flag:'Flag80', id: '59f1a6d482100e1594f40afa', koef: 0},  
        ],},  
        {id: 99, targets: [
            {flag:'Flag80', id: '59f1a6d482100e1594f40afa', koef: 0},  
        ],},  
        {id: 100, targets: [
            {flag:'Flag85', id: '59f1a6b282100e1594f40696', koef: 0},  
            {flag:'Flag85', id: '59f1a6b282100e1594f40695', koef: 0},
        ],},  
        {id: 101, targets: [
            {flag:'Flag86', id: '59f1a69e82100e1594f40453', koef: 0},
            {flag:'Flag87', id: '59f1a69e82100e1594f40455', koef: 0},
            {flag:'Flag87', id: '59f1a69e82100e1594f40457', koef: 0},
        ],},  
        {id: 102, targets: [
            {flag:'Flag88', id: '59f1a6e782100e1594f40c7c', koef: 0},  
            {flag:'Flag88', id: '59f1a6e782100e1594f40c7e', koef: 0},
        ],},  
        {id: 103, targets: [
            {flag:'Flag90', id: '59f1a6f982100e1594f40e10', koef: 0},  
            {flag:'Flag90', id: '59f1a6f982100e1594f40e12', koef: 0},
            {flag:'Flag91', id: '59f1a6e782100e1594f40c80', koef: 0},  
            {flag:'Flag91', id: '59f1a6e782100e1594f40c81', koef: 0},  
        ],},  
        {id: 104, targets: [
            {flag:'Flag93', id: '59f1a68f82100e1594f402ca', koef: 0},  
            {flag:'Flag93', id: '59f1a68f82100e1594f402c8', koef: 0},
        ],}, 
        {id: 105, targets: [
            {flag:'Flag94', id: '59f1a67f82100e1594f40146', koef: 0},  
            {flag:'Flag94', id: '59f1a67f82100e1594f40148', koef: 0},
        ],}, 
        {id: 106, targets: [
            {flag:'Flag96', id: '59f1a6c382100e1594f408bf', koef: 0},  
            {flag:'Flag96', id: '59f1a6c382100e1594f408be', koef: 0},
        ],}, 
        {id: 107, targets: [
            {flag:'Flag98', id: '59f1a5f882100e1594f3f44b', koef: 0},  
            {flag:'Flag98', id: '59f1a5f882100e1594f3f44d', koef: 0},
        ],}, 
        {id: 108, targets: [
            {flag:'Flag102', id: '59f1a5d282100e1594f3f0ef', koef: 0},  
            {flag:'Flag103', id: '59f1a5d282100e1594f3f0f1', koef: 0},
            {flag:'Flag103', id: '59f1a5d282100e1594f3f0f3', koef: 0},
            {flag:'Flag104', id: '59f1a5d282100e1594f3f0ec', koef: 0},
            {flag:'Flag104', id: '59f1a5d282100e1594f3f0ea', koef: 0},
        ],}, 
        {id: 109, targets: [
            {flag:'Flag105', id: '59f1a6c582100e1594f40901', koef: 0},  
            {flag:'Flag106', id: '59f1a6c582100e1594f40904', koef: 0},
            {flag:'Flag107', id: '59f1a6c582100e1594f40908', koef: 0},
            {flag:'Flag108', id: '59f1a6c582100e1594f4090b', koef: 0},
        ],}, 
        {id: 110, targets: [
        ],}, 
        {id: 111, targets: [
            {flag:'Flag111', id: '59f1a6d482100e1594f40b03', koef: 0},  
            {flag:'Flag111', id: '59f1a6d482100e1594f40b04', koef: 0},
            {flag:'Flag112', id: '59f1a6e882100e1594f40c87', koef: 0},
            {flag:'Flag113', id: '59f1a6e882100e1594f40c8a', koef: 0},
            {flag:'Flag113', id: '59f1a6e882100e1594f40c8c', koef: 0},
        ],}, 
        {id: 112, targets: [
            {flag:'Flag116', id: '59f1a5d382100e1594f3f0fd', koef: 0},  
            {flag:'Flag117', id: '59f1a5d282100e1594f3f0fa', koef: 0},
            {flag:'Flag117', id: '59f1a5d282100e1594f3f0f8', koef: 0},
        ],}, 
        {id: 113, targets: [
            {flag:'Flag118', id: '59f1a5f782100e1594f3f449', koef: 0},
            {flag:'Flag118', id: '59f1a5f782100e1594f3f448', koef: 0},
        ],}, 
        {id: 114, targets: [
            {flag:'Flag119', id: '59f1a61982100e1594f3f8b6', koef: 0},
            {flag:'Flag119', id: '59f1a61982100e1594f3f8b8', koef: 0},
        ],}, 
        {id: 115, targets: [
            {flag:'Flag120', id: '59f1a61982100e1594f3f8bc', koef: 0},
            {flag:'Flag120', id: '59f1a61982100e1594f3f8bb', koef: 0},
            {flag:'Flag121', id: '59f1a60982100e1594f3f68c', koef: 0},
        ],}, 
        {id: 116, targets: [
            {flag:'Flag122', id: '59f1a6a082100e1594f404aa', koef: 0},
            {flag:'Flag123', id: '59f1a69082100e1594f402e1', koef: 0},
            {flag:'Flag124', id: '59f1a68082100e1594f4015b', koef: 0},
            {flag:'Flag125', id: '59f1a68082100e1594f40159', koef: 0},
            {flag:'Flag125', id: '59f1a68082100e1594f40157', koef: 0},
        ],},
        {id: 117, targets: [
            {flag:'Flag126', id: '59f1a5d382100e1594f3f100', koef: 0},
            {flag:'Flag127', id: '59f1a5e382100e1594f3f28b', koef: 0},
            {flag:'Flag128', id: '59f1a5d382100e1594f3f103', koef: 0},
        ],},
        {id: 118, targets: [
            {flag:'Flag131', id: '59f1a61b82100e1594f3f8eb', koef: 0},
            {flag:'Flag132', id: '59f1a61b82100e1594f3f8e9', koef: 0},
            {flag:'Flag132', id: '59f1a61b82100e1594f3f8e8', koef: 0},
        ],},
        {id: 119, targets: [
            {flag:'Flag129', id: '59f1a5c282100e1594f3ef74', koef: 0},
            {flag:'Flag129', id: '59f1a5c282100e1594f3ef75', koef: 0},
        ],},
        {id: 120, targets: [
            {flag:'Flag130', id: '59f1a58582100e1594f3ea7d', koef: 0},
            {flag:'Flag133', id: '59f1a59682100e1594f3ec06', koef: 0},
            {flag:'Flag133', id: '59f1a59682100e1594f3ec04', koef: 0},
        ],},
        {id: 121, targets: [
            {flag:'Flag134', id: '59f1a56082100e1594f3e650', koef: 0},
        ],},
        {id: 122, targets: [
            {flag:'Flag135', id: '59f1a5d482100e1594f3f12e', koef: 0},
            {flag:'Flag135', id: '59f1a5d482100e1594f3f130', koef: 0},
        ],},
        {id: 123, targets: [
            {flag:'Flag136', id: '59f1a5c482100e1594f3ef9d', koef: 0},
            {flag:'Flag136', id: '59f1a5c482100e1594f3ef9c', koef: 0},
        ],},
        {id: 124, targets: [
            {flag:'Flag137', id: '59f1a5c482100e1594f3efa4', koef: 0},
            {flag:'Flag137', id: '59f1a5c482100e1594f3efa6', koef: 0},
        ],},
        {id: 125, targets: [
            {flag:'Flag138', id: '59f1a53582100e1594f3e23e', koef: 0},
            {flag:'Flag138', id: '59f1a53582100e1594f3e23f', koef: 0},
        ],},
        {id: 126, targets: [
            {flag:'Flag139', id: '59f1a52582100e1594f3e0b4', koef: 0},
            {flag:'Flag139', id: '59f1a52582100e1594f3e0b3', koef: 0},
        ],},
        {id: 127, targets: [
            {flag:'Flag14',  id: '59f1a58482100e1594f3ea5c', koef: 0},
            {flag:'Flag140', id: '59f1a58482100e1594f3ea5d', koef: 0},
        ],},
        {id: 128, targets: [
            {flag:'Flag141', id: '59f1a5a582100e1594f3ed76', koef: 0},
            {flag:'Flag141', id: '59f1a5a582100e1594f3ed74', koef: 0},
        ],},
         {id: 129, targets: [
            {flag:'Flag143', id: '59f1a6f882100e1594f40df8', koef: 0},
            {flag:'Flag143', id: '59f1a6f882100e1594f40df7', koef: 0},
            {flag:'Flag144', id: '59f1a6e682100e1594f40c69', koef: 0},
            {flag:'Flag144', id: '59f1a6e682100e1594f40c6a', koef: 0},
            {flag:'Flag145', id: '59f1a6e682100e1594f40c66', koef: 0},
            {flag:'Flag145', id: '59f1a6e682100e1594f40c65', koef: 0},
        ],},
        {id: 130, targets: [
            {flag:'Flag146', id: '59f1a6c282100e1594f408a7', koef: 0},
            {flag:'Flag147', id: '59f1a6c282100e1594f408a6', koef: 0},
            {flag:'Flag148', id: '59f1a6c282100e1594f408a2', koef: 0},
        ],},
        {id: 131, targets: [
            {flag:'Flag149', id: '59f1a6f782100e1594f40dd6', koef: 0},
            {flag:'Flag149', id: '59f1a6f782100e1594f40dd5', koef: 0},
        ],},
        {id: 132, targets: [
            {flag:'Flag150', id: '59f1a6f782100e1594f40dcf', koef: 0},
            {flag:'Flag150', id: '59f1a6f782100e1594f40dcd', koef: 0},
        ],},
        {id: 133, targets: [
            {flag:'Flag151', id: '59f1a60d82100e1594f3f711', koef: 0},
            {flag:'Flag152', id: '59f1a60d82100e1594f3f713', koef: 0},
            {flag:'Flag153', id: '59f1a61d82100e1594f3f94a', koef: 0},
            {flag:'Flag153', id: '59f1a61d82100e1594f3f949', koef: 0},
        ],},
    ],
    getSectorTargets: function(sectorId) {
       if (sectorId == undefined || !this.sectorTargets[sectorId] || this.sectorTargets[sectorId].id != sectorId) {
           Game.notify('getSectorTargets error '+sectorId);
           return [];
       }
       return this.sectorTargets[sectorId].targets;
    },
    
    changeCfgForStronghold: function (stRoom, myRooms, sectorAttackers) {
        let changing = true;
        if (stRoom == 'E55N26'){
            // myRooms[4].sector =  [/*23,*/26,27,/*42,*/];//[/*23,24,25,*/26,27,/*42,43,44*/];
            // myRooms[4].keepers = [/*0,1*/];
            sectorAttackers[5] = {id: 5, creeps: {atacker:1}, place: {room: "E55N27", posx: 33, posy: 27, flag: 'FlagAttack5'}};
            sectorAttackers[22].disabled = 0;
            //myRooms[18].atack_sector = 22;
            myRooms[19].atack_sector = 22;
        // } else if (stRoom == 'E54N26'){
        //     myRooms[4].sector =  [23,26,27,/*42,*/];// [23,24,25,26,27,/*42,43,44*/];
        //     myRooms[4].keepers = [0,/*1*/];
        } else if (stRoom == 'E46N36'){
            // myRooms[10].sector =  [49,/*51,54*/,]; //[49,50,/*51,52,53,54,55,56*/];
            // myRooms[10].keepers = [/*3,4*/];
            sectorAttackers[11] = {id: 11, creeps: {atacker:1}, place: {room: "E47N36", posx: 41, posy: 18, flag: 'FlagAttack11'}};
        // } else if (stRoom == 'E46N35'){
        //     myRooms[10].sector =  [49,51,/*54*/,]; //[49,50,51,52,/*53,54,55,56*/]; //53 bugg
        //     myRooms[10].keepers = [3,/*4*/];
        // } else if (stRoom == 'E55N24'){
        //     myRooms[19].sector =  [/*90,*/93,]; 
        //     myRooms[19].keepers = [/*6,*/7];
        //     myRooms[18].sector =  [84,87,/* 92*/, 95];
        // } else if (stRoom == 'E54N24'){
        //     myRooms[19].sector =  [90,/*93,*/]; 
        //     myRooms[19].keepers = [6,/*7*/];
        //     myRooms[18].sector =  [84,87,92,/*95*/];
        // } else if (stRoom == 'E54N25'){
        //     myRooms[18].sector =  [/*84,87,92,95*/];
        //     myRooms[18].keepers = [/*5*/];
        } else if (stRoom == 'E56N44'){
            sectorAttackers[37].creeps.hunter = 0;
            sectorAttackers[37].disabled = 1;  //  = {id:37, creeps: {atacker:0, hunter:0}, place: {room: "E57N44", posx: 2,  posy: 8,  flag: 'FlagAttack37'},qwadrant: 8},
            if (Memory.rooms.E57N44) Memory.rooms.E57N44.noSpawnSKMineral = Game.time + 100;
        } else {
            changing = false;
        }
        if (changing) {
            return [myRooms, sectorAttackers];
        } else {
            return false;
        }
        
    },
    getBorders: {
        'E58N22': [
            [28,31], //storage
            [30,30], //terminal
            [31,35], //spawn
            [29,34],[27,34], //towers
            [27,42],[28,42],[29,42],
            [39,33],[39,34],[39,35],[39,36],[39,37],[39,38],[39,39],[39,40],[39,41],
            [19,31],[19,32],[19,33],[19,34],[19,35],[19,36],[19,37],[19,38],
            //[25,28],[26,28],[27,28],[28,28],[29,28],[30,28],[31,28], //tmp
            [22,26],[22,25],[22,24],[23,24],[24,24],[25,24],[26,24],[27,24],[28,24],[29,24],[30,24],[31,24],[32,24],[33,24],[34,24],[34,25],[34,26],
        ],
        'E55N21': [
            [27,12],[26,17],[28,17],[25,18],[29,13],[24,17],[27,18],[20,9],[21,9],[19,14],[19,13],[19,12],[19,18],[19,11],[19,17],[19,10],[19,16],[19,9],
            [19,15],[19,19],[19,20],[19,21],[19,22],[20,23],[19,23],[25,23],[21,23],[24,23],[23,23],[22,23],[28,23],[27,23],[26,23],[29,23],[30,23],[31,23],
            [32,23],[33,23],[34,23],[35,23],[36,21],[36,22],[36,23],[36,19],[36,20],[36,18],[36,17],[36,16],[36,15],[36,14],[36,13],[27,7],[28,7],[29,7],[26,7],
            [31,7],[30,7],[32,7],[33,7],[34,7],[35,7],[36,7],[36,8],[36,9],
        ],
        'E59N24': [
            [32,25],[37,21],[39,21],[40,20],[35,23],[47,18],[47,17],[42,22],[42,23],[42,24],[43,22],[44,22],[45,22],[46,22],[47,20],[47,21],[47,22],[47,19],[48,17],
            [44,12],[43,12],[42,12],[41,12],[45,12],[46,12],[34,27],[33,27],[32,27],[31,27],[30,27],[29,27],[28,27],[27,27],[26,27],[25,24],[25,25],[25,26],[25,23],
            [25,27],[25,22],[25,21],[25,20],[47,12],
        ],
        'E58N27': [
            [31,22],[34,22],[33,24],[35,21],[33,21],[32,28],[31,28],[30,28],[37,28],[36,28],[35,28],[38,28],[33,28],[34,28],[29,28],[26,26],[39,28],[26,25],[26,24],
            [40,28],[26,23],[26,22],[26,21],[26,20],[26,19],[27,19],[38,15],[39,15],[40,15],[41,15],[42,15],[43,17],[43,18],[43,19],[43,16],[43,20],[43,15],[43,21],[43,22],
            [43,23],[43,24],[43,25],[43,26],[41,28],[42,28],[43,27],[43,28],
        ],
        'E55N27': [
            [40,42],[35,40],[38,37],[39,41],[31,44],[35,38],[30,40],[30,41],[30,42],[30,43],[30,44],[36,31],[35,31],[34,31],[37,31],[33,31],[38,31],[32,31],[40,31],[39,31],
            [41,31],[42,31],[43,31],[44,31],[45,31],[46,31],[47,33],[47,32],[47,31],[47,35],[47,34],[47,36],[47,37],[47,38],[47,39],[47,40],[47,41],[47,42],[47,43],[47,44],
            [30,37],[30,38],[30,39],[30,31],[30,32],[31,31],[30,33],[30,34],[30,35],[30,36],
        ],
        'E42N28': [
            [10,37],[14,39],[14,38],[14,36],[12,37],[20,40],[20,39],[20,38],[20,37],[20,44],[20,45],[20,46],[20,47],[20,48],[9,47],[8,47],[7,45],[7,44],[7,43],[7,47],[7,46],
            [20,34],[20,33],[20,32],[20,31],[18,29],[17,29],[16,29],[15,29],[14,29],[13,29],[12,29],[11,29],[10,29],[15,40],[15,37],[5,39],[5,40]
        ],  
        'E46N31': [
            [35,19],[35,22],[38,20],[34,18],[37,22],[28,21],[28,22],[28,20],[29,24],[29,23],[32,28],[31,28],[30,28],[33,28],[35,28],[34,28],[29,25],[29,26],[29,27],[36,28],
            [37,27],[37,28],[41,26],[42,26],[43,26],[43,25],[43,24],[43,23],[43,22],[43,21],[43,20],[43,19],[43,18],[43,17],[43,16],[40,10],[40,11],[40,12],[40,9],[40,8],
            [39,8],[38,8],[37,8],[36,8],[35,8],[34,8],[33,8],[32,8],[32,10],[32,9],[28,18],[28,17],[28,16],[28,19],
        ],
        'E57N29': [
            [36,40],[35,41],[41,35],[34,42],[38,38],[34,40],[33,41],[38,35],[37,35],[34,35],[35,35],[36,35],[33,35],[32,35],[31,35],[30,35],[29,35],[28,35],[27,35],[26,35],
            [25,35],[43,36],[43,37],[25,36],[43,34],[25,37],[43,35],[38,47],[37,47],[38,48],[36,47],[35,47],[34,47],[33,47],[32,47],[31,47],[30,47],[29,47],[28,47],[27,47],[26,47],[25,47],
        ],
        'E45N29': [
            [23,42],[24,39],[26,37],[25,36],[25,43],[24,33],[23,33],[25,33],[26,33],[27,33],[28,33],[29,33],[30,33],[31,33],[32,33],[34,43],[34,42],[34,41],[34,40],[34,44],[34,45],[34,46],
            [34,47],[27,38],[28,37],[27,36],[26,35],
        ],
        'E41N23': [
            [38,18],[42,20],[40,19],[43,21],[42,17],
            [39,14],[40,14],[41,14],[38,14],[37,14],[36,17],[36,16],[36,15],[36,14],[36,19],[36,18],[36,20],[36,21],[36,22],[36,24],[36,25],[36,26],[36,27],[36,28],[36,29],[36,30],[37,31],[36,31],[38,31],[39,31],[40,31],[41,31],[42,31],[45,31],[44,31],[43,31],[47,18],[47,17],[46,14],[47,14],[47,15],[47,16],[48,18],[39,17],[42,22],

        ],
        'E47N36': [
            [6,23],[9,26],[6,26],[10,25],[7,24],[12,31],[11,31],[10,31],[9,31],[8,31],[13,31],[17,27],[17,28],[17,29],[18,24],[18,25],[18,26],[18,27],[18,23],[18,22],[18,21],[18,19],[18,20],[18,18],[18,17],[16,17],[17,17],[13,17],[14,17],[15,17],[12,17],[11,17],[9,17],[10,17],[5,17],[6,17],[7,17],[8,17],[4,17],[3,17],[2,20],[2,19],[2,18],[2,22],[2,21],[2,23],[2,25],[2,24],[2,27],[2,26],[4,28],[3,28],[2,28],[2,17],[17,30],[17,31],[16,31],[8,23],[9,24],[9,22],[8,21],
        ],
        'E55N31': [
            [18,32],[18,37],[16,33],[19,37],[14,35],[17,36],[17,31],[19,31],[16,28],[17,28],[18,28],[19,28],[15,37],[16,37],[17,38],[9,39],[10,39],[25,33],[9,38],[25,32],[9,37],[25,31],[9,36],[25,36],[9,35],[10,35],[25,30],[10,40],[23,29],[22,29],[10,41],[24,29],[10,42],[20,28],[10,43],[10,44],[24,37],[25,37],[24,38],[10,34],[24,39],[24,40],[24,41],[24,42],[24,43],[22,44],[23,44],[24,44],[25,29],
        ],
        'E52N32': [
            [19,42],[17,45],[19,44],[20,41],[21,42],[20,43],[19,39],[19,40],[18,41],[20,38],[18,43],[17,47],[18,47],[19,47],[20,47],[21,47],[14,45],[14,46],[16,47],[14,47],[15,47],[22,47],[23,47],[24,47],[27,43],[27,44],[27,42],[27,41],[27,40],[27,38],[27,39],[27,37],[27,36],[21,33],[22,33],[23,33],[24,33],[25,33],[18,33],[19,33],[20,33],[17,33],[16,33],[15,33],[12,40],[12,39],[12,41],[12,42],[26,33],[27,35],
        ],
        'E49N22': [
            [16,17],[13,17],[15,15],[14,18],[17,13],[19,11],[20,10],[10,22],[9,22],[11,22],[13,22],[12,22],[14,22],[15,22],[16,22],[17,22],[18,22],[20,22],[19,22],[21,22],[22,22],[24,19],[24,20],[24,18],[24,17],[24,16],[24,15],[24,14],[24,12],[24,13],[24,11],[24,10],[21,8],[20,8],[22,8],[19,8],[7,18],[23,9],[22,21],[23,21],[23,20],[18,17],[17,16],[15,18],[18,15],[19,14],[12,16],[13,14],[12,13],[15,13],[7,19],[7,20],[8,20],[8,21],[9,21],[22,9],[23,10],
        ],   
        'E47N39': [
            [40,27],[41,28],[42,25],[41,29],[44,27],[42,29],[42,20],[41,20],[43,20],[44,20],[45,20],[46,20],[47,20],[36,27],[36,26],[36,30],[36,28],[36,29],[36,31],[36,33],[36,34],[36,35],[39,37],[38,37],[40,37],[41,37],[42,37],[43,37],[44,37],[46,37],[45,37],[47,37],[36,32],[37,36],[38,36],[37,35],[47,31],[47,30],[48,31],[47,29],[47,28],[47,27],[47,25],[47,26],[47,23],[47,24],[48,23],
        ],
        'E44N38': [
            [13,42],[9,43],[12,41],[14,41],[11,44],[11,40],[13,40],[7,47],[6,47],[8,47],[9,47],[10,47],[11,47],[12,47],[13,47],[14,47],[15,47],[16,47],[17,47],[18,47],[20,45],[20,44],[20,43],[20,42],[20,41],[20,39],[20,40],[20,38],[20,37],[20,36],[18,33],[20,35],[17,33],[14,33],[13,33],[12,33],[11,33],[9,33],[10,33],[8,33],[7,33],[6,33],[19,34],[19,35],[18,34],[19,45],[19,46],[18,46],
        ],
        'E49N37': [
            [34,15],[34,18],[38,14],[34,19],[36,13],[42,13],[42,14],[42,12],[42,11],[36,23],[35,23],[34,23],[33,23],[26,27],[25,27],[27,27],[22,25],[22,26],[22,27],[28,27],[29,27],[30,27],[21,24],[21,23],[21,22],[21,21],[22,13],[22,12],[22,11],[22,15],[22,14],[22,16],[31,2],[32,2],[31,1],[33,2],[34,2],
        ],
        'E41N39': [
            [37,20],[37,21],[37,22],[38,22],[13,24],[13,24],[13,25],[13,26],[13,27],[13,28],[13,29],
        ],
        'E53N25': [
            [8,10],[12,15],[10,11],[11,16],[9,13],[15,15],[15,14],[15,16],[15,17],[15,18],[15,19],[14,4],[14,5],[12,21],[14,3],[11,21],[11,2],[10,2],[9,2],[8,2],[7,2],[6,2],[5,22],[4,22],[6,14],[8,7],
        ],
        'E55N23': [
            [16,18],[19,19],[16,16],[20,20],[14,17],[11,15],[11,16],[11,17],[11,18],[11,19],[11,20],[11,14],[11,21],[11,22],[11,13],[11,12],[11,11],[12,10],[24,23],[11,10],[23,23],[14,10],[13,10],[25,23],[26,19],[26,20],[26,21],[26,23],[26,22],[26,18],[23,9],[22,9],[26,17],[21,9],[24,9],[25,9],[26,16],[26,15],[18,24],[17,24],[16,24],[15,24],[14,24],
        ],
        'E57N35': [
            [26,5],[24,7],[28,6],[24,9],[26,7],[24,11],[27,4],[28,2],[27,2],[26,2],[30,2],[29,2],[25,2],[22,6],[22,7],[22,8],[24,2],[23,2],[22,2],[22,3],[22,4],[22,5],[22,9],[22,10],[22,11],[22,12],[22,13],[22,14],[31,2],[23,15],[24,15],[33,2],[25,15],[32,2],[27,15],[28,15],[35,2],[34,2],[29,15],[36,2],[30,15],[26,15],[37,2],[31,15],[32,15],[38,9],[38,8],[33,15],[38,7],[38,6],[34,15],[35,15],[38,11],[38,10],[38,12],[38,13],[38,14],[38,5],[38,4],[38,3],[38,2],[22,15],
        ],
        'E55N39': [
            [19,7],[19,4],[24,8],[16,4],[22,8],[21,2],[19,2],[20,2],[17,2],[16,2],[15,2],[18,2],[19,16],[18,16],[17,16],[22,16],[21,16],[20,16],[24,16],[23,16],[26,16],[25,16],[16,16],[7,8],[7,9],[7,10],[7,7],[7,5],[7,6],[7,11],[7,12],[7,13],[7,14],[30,2],[29,2],[32,2],[31,2],[33,2],[19,9],[18,8],
        ],
        'E59N35': [
            [35,9],[26,13],[32,9],[27,14],[30,7],[31,2],[30,2],[29,2],[34,2],[32,2],[33,2],[31,16],[31,17],[31,18],[30,18],[29,18],[23,17],[23,15],[23,16],[23,14],[23,18],[47,7],[48,7],[47,6],[47,5],[47,4],[47,3],[44,2],[43,2],[42,2],[41,2],[40,2],[37,9],[28,15],
        ],
        'E52N29': [
            [10,23],[7,27],[11,27],[12,23],[11,25],[9,26],[8,28],[6,28],[6,29],[4,20],[4,21],[4,22],[4,23],[4,24],[4,19],[4,25],[4,18],[9,17],[8,17],[7,17],[6,17],[5,17],[10,17],[4,17],[16,21],[16,20],[17,26],[17,25],[17,24],[16,34],[15,34],[14,34],[7,22],[13,22],[8,21],
        ],
        'E55N37': [
            [18,25],[19,17],[17,22],[21,17],[19,21],[15,17],[16,24],[20,16],[21,16],[22,16],[23,16],[24,16],[25,16],[26,16],[27,17],[27,16],[25,27],[25,28],[25,29],[22,30],[21,30],[20,30],[25,30],[24,30],[25,26],[23,30],[19,30],[10,15],[18,30],[9,15],[17,30],[8,15],[16,30],[13,29],[13,28],[13,27],[14,30],[13,30],[15,30],[19,26],[17,26],[21,26],[21,23],
        ],
        'E43N21': [
            [9,31],[12,26],[12,30],[13,22],[8,31],[10,22],[8,30],[10,21],[10,20],[18,16],[17,16],[16,16],[15,16],[19,16],[26,28],[25,28],[13,28],
        ],
        'E43N25': [
            [25,41],[19,41],[23,41],[20,40],[21,43],[26,40],[28,40],[24,36],[23,36],[31,38],[30,38],[32,38],[35,48],[35,47],[35,46],[35,45],[35,44],[22,36],[21,36],[20,36],[19,36],[16,41],[16,40],[16,39],[16,45],[16,44],[16,42],[16,43],[16,38],[16,46],[16,47],[16,48],[33,39],[33,38],[34,40],[34,39],[35,43],[35,42],[35,41],[35,40],
        ],
        'E57N25': [
            [21,18],[17,20],[20,16],[16,19],[18,18],[19,20],[18,21],[25,21],[25,22],[25,23],[25,19],[25,20],[24,16],[23,15],[22,14],[23,14],[24,15],[21,13],[22,13],[25,16],[25,17],[25,18],[21,12],[21,11],[15,12],[14,12],[13,12],[12,12],[25,24],[25,25],[25,26],[25,27],[21,28],[20,28],[19,28],[18,28],[17,28],[16,28],[15,28],[14,28],[13,28],
        ],
        'E57N33': [
            [35,22],[38,18],[34,18],[37,17],[36,20],[33,22],[36,16],[37,25],[38,25],[36,25],[35,25],[34,25],[32,25],[33,25],[31,24],[39,25],[45,25],[44,25],[43,25],[46,25],[31,23],[32,24],[46,24],[47,24],[46,15],[46,14],[46,16],[46,13],[46,17],[46,19],[46,18],[46,20],[47,20],[40,11],[39,11],[41,11],[38,11],[42,11],[32,12],[33,12],
        ],
        'E45N22': [
            [5,40],[4,41],[7,42],[6,37],[9,40],[6,39],[7,36],[7,47],[8,47],[9,47],[10,47],[6,47],[11,47],[2,36],[1,36],[2,35],[2,33],[2,32],[2,34],[2,31],[14,37],[14,36],[14,35],[14,34],[14,38],[3,31],[3,30],[6,30],[4,30],[8,30],[7,30],[9,30],[10,30],[11,30],[13,30],[12,30],[5,30],[14,32],[13,31],[14,31],[12,46],[12,45],[11,46],
        ],
        'E53N21': [
            [35,33],[34,30],[38,28],[34,33],[36,30],[35,31],[34,34],[30,40],[31,40],[32,40],[29,40],[35,24],[34,24],[40,25],[33,24],[41,25],[42,25],[22,34],[21,34],[23,33],[22,33],[24,32],[23,32],[24,39],[24,31],[23,39],[30,26],[30,27],[22,39],
        ],
        'E41N19': [
            [10,38],[12,43],[13,44],[12,40],[9,47],[8,47],[7,47],[6,47],[5,47],[7,38],[4,47],[3,47],[10,47],[11,47],[12,47],[10,42],[6,38],[2,41],[2,40],[2,39],[2,38],[3,38],[4,38],[5,38],[12,34],[13,34],[14,34],[15,34],[18,37],[18,36],[21,40],[21,41],[21,42],[21,43],[21,44],[21,45],[21,46],[21,47],
        ],
        'E45N11': [
            [32,7],[33,10],[28,13],[27,13],[26,13],[25,13],[24,13],[23,12],[23,11],[23,10],[23,9],[23,8],[23,7],[24,7],[26,4],[26,3],[26,2],[27,2],[28,2],[29,2],[30,2],[31,2],[41,10],[42,10],[42,9],[42,8],[42,3],[42,2],[41,2],[40,2],[39,2],[38,2],[37,2],[36,2],[35,2],[34,2],[33,2],[32,2],[32,9],
        ],
        'E36N9': [
            [12,36],[9,37],[14,37],[10,36],[16,36],[5,42],[5,41],[6,33],[5,40],[7,33],[5,39],[8,33],[5,38],[9,33],[10,33],[13,33],[14,33],[15,33],[16,33],[17,33],[18,34],[18,33],[19,34],[19,35],[20,38],[20,41],[20,37],[20,40],[20,35],[20,39],[20,36],[20,42],[20,43],[20,44],
        ],
        'E41N5': [
            [14,37],[13,35],[15,34],[16,35],[20,43],[20,41],[16,33],[15,33],[14,33],[13,33],[12,33],[17,33],[11,33],[18,33],[19,39],[19,38],[19,37],[19,36],[19,35],[19,34],[19,33],[19,40],[19,41],[20,42],[20,44],[17,45],[18,45],[19,45],[20,45],[10,35],[10,34],[10,33],
        ],
        'E38N19': [
            [26,14],[27,13],[26,12],[25,9],[24,9],[27,9],[22,9],[13,14],[13,15],[13,19],[12,15],[12,16],[12,17],[12,18],[13,20],[12,19],[14,21],[13,21],[15,22],[14,22],
        ],
        'E33N9': [[45,20],[45,19],[44,21],[45,21],[42,22],[43,22],[44,22],[32,24],[32,23],[32,25],[31,23],[32,26],[30,23],[30,22],[30,21],[29,21],[29,20],[29,19],[29,18],[29,17],[28,15],[28,14],[28,13],[28,12],[28,11],],
        'E59N41': [[23,41],[23,40],[23,39],[23,38],[23,37],[23,42],[26,43],[27,43],[28,43],[29,43],[30,43],[31,43],[32,43],[33,43],[34,43],[35,43],[36,43],[39,40],[39,39],[39,38],[39,37],[39,36],[40,34],[40,33],[40,32],[40,31],[40,30],[35,28],[36,28],[37,28],[38,28],[39,28],[40,28],[34,28],[33,28],[32,28],[31,28],[27,26],[22,26],[22,27],[21,27],[21,28],[20,28],[20,29],[19,29],[19,30],[19,31],[19,32],],
        'E46N19': [[44,18],[43,19],[42,20],[43,20],[36,21],[37,21],[38,21],[39,21],[40,21],[41,21],[42,21],[35,20],[35,21],[34,19],[34,20],[33,18],[33,19],[32,17],[32,18],[31,12],[31,13],[31,14],[31,15],[31,16],[31,17],[31,11],[44,19],[45,17],[45,18],[46,17],],
        'E57N44': [[10,11],[10,12],[10,13],],
        'E57N47': [[5,32],[18,34],[17,34],[16,34],[15,34],[22,27],[22,28],[22,29],[11,17],[12,17],[13,17],[14,17],[5,32],[4,32],[3,25],[3,26],[3,27],[3,28],[3,29],[3,30],[3,31],[3,32],],
        'E59N53': [[44,41],[43,32],[44,38],[44,36],[44,35],[44,34],[44,37],[44,33],[43,33],[44,39],[44,40],[44,42],[44,43],[44,44],[44,45],[43,46],[42,46],[41,46],[40,46],[39,46],[33,46],[32,46],[31,46],[30,46],[28,45],[28,44],[28,43],[28,42],[28,40],[28,39],[28,38],[32,35],[32,34],[28,37],[33,34],[29,37],[31,36],[29,36],[31,35],[30,36],[33,33],[34,33],[34,32],[35,32],[37,31],[35,31],[36,31],[38,31],[39,31],[40,31],[41,31],[42,31],[43,31],],
        'E47S1': [[31,34],[32,34],[33,34],[34,34],[35,34],[36,34],[22,37],[22,36],[22,35],[22,38],[22,39],[39,39],[39,40],[39,41],[39,42],[39,43],[39,44],[39,45],],
        'E44S8': [[19,7],[19,8],[19,9],[18,14],[18,15],[20,17],[21,17],[22,17],[24,4],[25,4],[26,4],[27,4],[28,4],[29,4],[30,4],[31,4],[32,4],[33,4],[34,4],[35,4],[36,21],[37,21],[38,21],[39,21],],
        'E47S4': [[27,25],[28,25],[29,25],[30,25],[31,25],[32,25],[33,25],[23,26],[22,26],[21,26],[20,26],[20,24],[20,23],[20,25],[18,18],[18,17],[18,16],[21,13],[22,13],[23,13],[24,13],[25,13],[26,13],],
    }, 
    
    
    getObstacles: {
        'E58N22': [
            {x:26, y:43},{x:27, y:43},{x:28, y:43},{x:29, y:43},{x:30, y:43},
            {x:40, y:32},{x:40, y:33},{x:40, y:34},{x:40, y:35},{x:40, y:36},{x:40, y:37},{x:40, y:38},{x:40, y:39},{x:40, y:40},{x:40, y:41},{x:40, y:42},
            {x:18, y:30},{x:18, y:31},{x:18, y:32},{x:18, y:33},{x:18, y:34},{x:18, y:35},{x:18, y:36},{x:18, y:37},{x:18, y:38},{x:18, y:39},
            //{x:24, y:27},{x:25, y:27},{x:26, y:27},{x:27, y:27},{x:28, y:27},{x:29, y:27},{x:30, y:27},{x:31, y:27},{x:32, y:27}, //tmp
            {x:21, y:26},{x:21, y:25},{x:21, y:24},{x:35, y:26},{x:35, y:25},{x:35, y:24},
            {x:21, y:23},{x:22, y:23},{x:23, y:23},{x:24, y:23},{x:25, y:23},{x:26, y:23},{x:27, y:23},{x:28, y:23},{x:29, y:23},{x:30, y:23},{x:31, y:23},{x:32, y:23},{x:33, y:23},{x:34, y:23},{x:35, y:23},
            ],
        'E55N21': [
            {x:25, y:6},{x:26, y:6},{x:27, y:6},{x:28, y:6},{x:29, y:6},{x:30, y:6},{x:31, y:6},{x:32, y:6},{x:33, y:6},{x:34, y:6},{x:35, y:6},{x:36, y:6},{x:37, y:6},
            {x:37, y:7},{x:37, y:8},{x:37, y:9},{x:37, y:10},
            {x:36, y:12},{x:37, y:12},{x:37, y:13},
            {x:37, y:14},{x:37, y:15},{x:37, y:16},{x:37, y:17},{x:37, y:18},{x:37, y:19},{x:37, y:20},{x:37, y:21},{x:37, y:22},{x:37, y:23},
            {x:37, y:24},{x:36, y:24},{x:35, y:24},{x:34, y:24},{x:33, y:24},{x:32, y:24},{x:31, y:24},{x:30, y:24},
            {x:29, y:24},{x:28, y:24},{x:27, y:24},{x:26, y:24},{x:25, y:24},{x:24, y:24},{x:23, y:24},{x:22, y:24},{x:21, y:24},{x:20, y:24},{x:19, y:24},
            {x:18, y:24},{x:18, y:23},{x:18, y:22},{x:18, y:21},{x:18, y:20},{x:18, y:19},{x:18, y:18},{x:18, y:17},{x:18, y:16},{x:18, y:15},{x:18, y:14},{x:18, y:13},{x:18, y:12},{x:18, y:11},{x:18, y:10},{x:18, y:9},{x:18, y:8},
            {x:19, y:8},{x:20, y:8},{x:21, y:8},
            ],
        'E59N24': [
            {x:41, y:11},{x:42, y:11},{x:43, y:11},{x:44, y:11},{x:45, y:11},{x:46, y:11},{x:47, y:11},
            {x:43, y:25},{x:43, y:24},{x:43, y:23},{x:44, y:23},{x:45, y:23},{x:46, y:23},{x:47, y:23},{x:48, y:23},
            {x:48, y:22},{x:48, y:21},{x:48, y:20},{x:48, y:19},{x:48, y:18},
            {x:24, y:20},{x:24, y:21},{x:24, y:22},{x:24, y:23},{x:24, y:24},{x:24, y:25},{x:24, y:26},{x:24, y:27},{x:24, y:28},
            {x:25, y:28},{x:26, y:28},{x:27, y:28},{x:28, y:28},{x:29, y:28},{x:30, y:28},{x:31, y:28},{x:32, y:28},{x:33, y:28},
            ],
        'E58N27': [
            {x:29, y:29},{x:30, y:29},{x:31, y:29},{x:32, y:29},{x:33, y:29},{x:34, y:29},{x:35, y:29},{x:36, y:29},{x:37, y:29},{x:38, y:29},{x:39, y:29},{x:40, y:29},{x:41, y:29},{x:42, y:29},{x:43, y:29},{x:44, y:29},
            {x:44, y:28},{x:44, y:27},{x:44, y:26},{x:44, y:25},{x:44, y:24},{x:44, y:23},{x:44, y:22},{x:44, y:21},{x:44, y:20},{x:44, y:19},{x:44, y:18},{x:44, y:17},{x:44, y:16},{x:44, y:15},{x:44, y:14},
            {x:43, y:14},{x:42, y:14},{x:41, y:14},{x:40, y:14},{x:39, y:14},{x:38, y:14},
            {x:26, y:18},{x:25, y:18},{x:25, y:19},{x:25, y:20},{x:25, y:21},{x:25, y:22},{x:25, y:23},{x:25, y:24},{x:25, y:25},{x:25, y:26},{x:25, y:27},
            ],
        'E55N27': [
            {x:30,y:45},{x:29,y:45},{x:29,y:44},{x:29,y:43},{x:29,y:42},{x:29,y:41},{x:29,y:40},
            {x:29,y:39},{x:29,y:38},{x:29,y:37},{x:29,y:36},{x:29,y:35},{x:29,y:34},{x:29,y:33},{x:29,y:32},{x:29,y:31},{x:29,y:30},
            {x:30,y:30},{x:31,y:30},{x:32,y:30},{x:33,y:30},{x:34,y:30},{x:35,y:30},{x:36,y:30},{x:37,y:30},{x:38,y:30},{x:39,y:30},{x:40,y:30},
            {x:41,y:30},{x:42,y:30},{x:43,y:30},{x:44,y:30},{x:45,y:30},{x:46,y:30},{x:47,y:30},{x:48,y:30},
            {x:48,y:31},{x:48,y:32},{x:48,y:33},{x:48,y:34},{x:48,y:35},{x:48,y:36},{x:48,y:37},{x:48,y:38},{x:48,y:39},{x:48,y:40},{x:48,y:41},{x:48,y:42},{x:48,y:43},{x:48,y:44},
            ],
        'E42N28': [
            {x:21,y:48},{x:21,y:47},{x:21,y:46},{x:21,y:45},{x:21,y:44},{x:21,y:43},
            {x:21,y:39},{x:21,y:38},{x:21,y:37},{x:21,y:36},{x:21,y:35},{x:21,y:34},{x:21,y:33},{x:21,y:32},{x:21,y:31},
            {x:9,y:28},{x:10,y:28},{x:11,y:28},{x:12,y:28},{x:13,y:28},{x:14,y:28},{x:15,y:28},{x:16,y:28},{x:17,y:28},
            {x:8,y:48},{x:7,y:48},{x:6,y:48},
            //{x:5,y:48},{x:4,y:48},{x:3,y:48}, //tmp
            {x:6,y:47},{x:6,y:46},{x:6,y:45},{x:6,y:44},{x:6,y:43},{x:6,y:42},
            ],
        'E46N31': [
            {x:27,y:15},{x:27,y:16},{x:27,y:17},{x:27,y:18},{x:27,y:19},{x:27,y:20},{x:27,y:21},{x:27,y:22},{x:27,y:23},
            {x:28,y:23},{x:28,y:24},{x:28,y:25},{x:28,y:26},{x:28,y:27},
            {x:31,y:29},{x:32,y:29},{x:33,y:29},{x:34,y:29},{x:35,y:29},{x:36,y:29},{x:37,y:29},{x:38,y:29},{x:38,y:28},
            {x:40,y:27},{x:41,y:27},{x:42,y:27},{x:43,y:27},{x:44,y:27},
            {x:44,y:26},{x:44,y:25},{x:44,y:24},{x:44,y:23},{x:44,y:22},{x:44,y:21},{x:44,y:20},{x:44,y:19},{x:44,y:18},
            {x:44,y:17},{x:44,y:16},{x:44,y:15},
            {x:41,y:12},{x:41,y:11},{x:41,y:10},{x:41,y:9},{x:41,y:8},{x:41,y:7},
            {x:40,y:7},{x:39,y:7},{x:38,y:7},{x:37,y:7},{x:36,y:7},{x:35,y:7},{x:34,y:7},{x:33,y:7},
            {x:31,y:8},{x:31,y:9},{x:31,y:10},
            ],
        'E57N29': [
            {x:24,y:36},{x:24,y:35},
            {x:24,y:34},{x:25,y:34},{x:26,y:34},{x:27,y:34},{x:28,y:34},{x:29,y:34},{x:30,y:34},{x:31,y:34},{x:32,y:34},{x:33,y:34},{x:34,y:34},{x:35,y:34},{x:36,y:34},{x:37,y:34},
            {x:44,y:34},{x:44,y:35},{x:44,y:36},
            {x:25,y:48},{x:26,y:48},{x:27,y:48},{x:28,y:48},{x:29,y:48},{x:30,y:48},{x:31,y:48},{x:32,y:48},{x:33,y:48},{x:34,y:48},{x:35,y:48},{x:36,y:48},{x:37,y:48},
            ],
         'E45N29': [
            {x:23,y:32},{x:24,y:32},{x:25,y:32},{x:26,y:32},{x:27,y:32},{x:28,y:32},{x:29,y:32},{x:30,y:32},{x:31,y:32},{x:32,y:32},
            {x:35,y:39},{x:35,y:40},{x:35,y:41},{x:35,y:42},{x:35,y:43},{x:35,y:44},{x:35,y:45},{x:35,y:46},
            ],
        'E41N23': [
            {x:46,y:32},{x:45,y:32},{x:44,y:32},{x:43,y:32},{x:42,y:32},{x:41,y:32},{x:40,y:32},{x:39,y:32},{x:38,y:32},{x:37,y:32},{x:36,y:32},
            {x:35,y:32},{x:35,y:31},{x:35,y:30},{x:35,y:29},{x:35,y:28},{x:35,y:27},{x:35,y:26},{x:35,y:25},{x:35,y:24},
            //{x:35,y:23}, //!!!!!!!!!!
            {x:35,y:22},{x:35,y:21},{x:35,y:20},
            {x:35,y:19},{x:35,y:18},{x:35,y:17},{x:35,y:16},{x:35,y:15},{x:35,y:14},{x:35,y:13},
            {x:36,y:13},{x:37,y:13},{x:38,y:13},{x:39,y:13},{x:40,y:13},
            {x:47,y:13},{x:48,y:13},{x:48,y:14},{x:48,y:15},{x:48,y:16},{x:48,y:17},
            {x:34,y:24},{x:34,y:23},{x:34,y:22},
            ],
        'E47N36': [
            {x:1,y:29},{x:2,y:29},{x:3,y:29},
            {x:1,y:28},{x:1,y:27},{x:1,y:26},{x:1,y:25},{x:1,y:24},{x:1,y:23},{x:1,y:22},{x:1,y:21},{x:1,y:20},{x:1,y:19},{x:1,y:18},{x:1,y:17},{x:1,y:16},
            {x:2,y:16},{x:3,y:16},{x:4,y:16},{x:5,y:16},{x:6,y:16},{x:7,y:16},{x:8,y:16},{x:9,y:16},{x:10,y:16},{x:11,y:16},{x:12,y:16},{x:13,y:16},{x:14,y:16},{x:15,y:16},{x:16,y:16},{x:17,y:16},{x:18,y:16},{x:19,y:16},
            {x:19,y:17},{x:19,y:18},{x:19,y:19},{x:19,y:20},{x:19,y:21},{x:19,y:22},{x:19,y:23},{x:19,y:24},{x:19,y:25},{x:19,y:26},
            {x:18,y:28},{x:18,y:29},{x:18,y:30},{x:18,y:31},{x:18,y:32},
            {x:17,y:32},{x:7,y:32},{x:8,y:32},{x:9,y:32},{x:10,y:32},{x:11,y:32},{x:12,y:32},
            ],
        'E55N31': [
            {x:9,y:45},{x:9,y:44},{x:9,y:43},{x:9,y:42},{x:9,y:41},{x:9,y:40},{x:8,y:40},{x:8,y:39},{x:8,y:38},{x:8,y:37},{x:8,y:36},{x:8,y:35},{x:8,y:34},{x:9,y:34},{x:9,y:33},
            {x:16,y:27},{x:17,y:27},{x:18,y:27},{x:19,y:27},{x:20,y:27},
            {x:23,y:28},{x:24,y:28},{x:25,y:28},{x:26,y:28},{x:26,y:29},{x:26,y:30},{x:26,y:31},{x:26,y:32},{x:26,y:33},{x:26,y:37},{x:26,y:38},
            {x:25,y:38},{x:25,y:39},{x:25,y:40},{x:25,y:41},{x:25,y:42},{x:25,y:43},{x:25,y:44},{x:25,y:45},{x:24,y:45},{x:23,y:45},
            ],
        'E52N32': [
            {x:23,y:48},{x:22,y:48},{x:21,y:48},{x:20,y:48},{x:19,y:48},{x:18,y:48},{x:17,y:48},{x:16,y:48},{x:15,y:48},{x:14,y:48},{x:13,y:48},
            {x:13,y:47},{x:13,y:46},
            {x:11,y:43},{x:11,y:42},{x:11,y:41},{x:11,y:40},
            {x:15,y:32},{x:16,y:32},{x:17,y:32},{x:18,y:32},{x:19,y:32},{x:20,y:32},{x:21,y:32},{x:22,y:32},{x:23,y:32},{x:24,y:32},{x:25,y:32},{x:26,y:32},
            {x:28,y:35},{x:28,y:36},{x:28,y:37},{x:28,y:38},{x:28,y:39},{x:28,y:40},{x:28,y:41},{x:28,y:42},{x:28,y:43},{x:28,y:44},
            ],
        'E49N22': [{"x":6,"y":19},{"x":6,"y":20},{"x":6,"y":21},{"x":7,"y":21},{"x":7,"y":22},{"x":8,"y":22},{"x":8,"y":23},{"x":9,"y":23},{"x":10,"y":23},{"x":11,"y":23},{"x":12,"y":23},{"x":13,"y":23},{"x":14,"y":23},{"x":15,"y":23},{"x":16,"y":23},{"x":17,"y":23},{"x":18,"y":23},{"x":19,"y":23},{"x":20,"y":23},{"x":21,"y":23},{"x":22,"y":23},{"x":23,"y":23},{"x":23,"y":22},{"x":24,"y":22},{"x":24,"y":21},{"x":25,"y":21},{"x":25,"y":20},{"x":25,"y":19},{"x":25,"y":18},{"x":25,"y":17},{"x":25,"y":16},{"x":25,"y":15},{"x":25,"y":14},{"x":25,"y":13},{"x":25,"y":12},{"x":25,"y":11},{"x":25,"y":10},{"x":25,"y":9},{"x":24,"y":9},{"x":24,"y":8},{"x":23,"y":8},{"x":23,"y":7},{"x":22,"y":7},{"x":21,"y":7},{"x":20,"y":7},{"x":19,"y":7},{"x":18,"y":7}],
        'E47N39': [{"x":47,"y":38},{"x":46,"y":38},{"x":45,"y":38},{"x":44,"y":38},{"x":43,"y":38},{"x":42,"y":38},{"x":41,"y":38},{"x":40,"y":38},{"x":39,"y":38},{"x":38,"y":38},{"x":37,"y":38},{"x":37,"y":37},{"x":36,"y":37},{"x":36,"y":36},{"x":35,"y":36},{"x":35,"y":35},{"x":35,"y":34},{"x":35,"y":33},{"x":35,"y":32},{"x":35,"y":31},{"x":35,"y":30},{"x":35,"y":29},{"x":35,"y":28},{"x":35,"y":27},{"x":35,"y":26},{"x":35,"y":25},{"x":36,"y":25},{"x":41,"y":19},{"x":42,"y":19},{"x":43,"y":19},{"x":44,"y":19},{"x":45,"y":19},{"x":46,"y":19},{"x":47,"y":19},{"x":48,"y":19},{"x":48,"y":24},{"x":48,"y":25},{"x":48,"y":26},{"x":48,"y":27},{"x":48,"y":28},{"x":48,"y":29},{"x":48,"y":30}],
        'E44N38': [{"x":6,"y":32},{"x":7,"y":32},{"x":8,"y":32},{"x":9,"y":32},{"x":10,"y":32},{"x":11,"y":32},{"x":12,"y":32},{"x":13,"y":32},{"x":14,"y":32},{"x":17,"y":32},{"x":18,"y":32},{"x":19,"y":32},{"x":19,"y":33},{"x":20,"y":33},{"x":20,"y":34},{"x":21,"y":34},{"x":21,"y":35},{"x":21,"y":36},{"x":21,"y":37},{"x":21,"y":38},{"x":21,"y":39},{"x":21,"y":40},{"x":21,"y":41},{"x":21,"y":42},{"x":21,"y":43},{"x":21,"y":44},{"x":21,"y":45},{"x":21,"y":46},{"x":20,"y":46},{"x":20,"y":47},{"x":19,"y":47},{"x":19,"y":48},{"x":18,"y":48},{"x":17,"y":48},{"x":16,"y":48},{"x":15,"y":48},{"x":14,"y":48},{"x":13,"y":48},{"x":12,"y":48},{"x":11,"y":48},{"x":10,"y":48},{"x":9,"y":48},{"x":8,"y":48},{"x":7,"y":48},{"x":6,"y":48}],
        'E49N37': [{"x":32,"y":1},{"x":33,"y":1},{"x":34,"y":1},{"x":35,"y":1},{"x":43,"y":10},{"x":43,"y":11},{"x":43,"y":12},{"x":43,"y":13},{"x":43,"y":14},{"x":43,"y":15},{"x":37,"y":24},{"x":36,"y":24},{"x":35,"y":24},{"x":34,"y":24},{"x":33,"y":24},{"x":32,"y":24},{"x":31,"y":28},{"x":30,"y":28},{"x":29,"y":28},{"x":28,"y":28},{"x":27,"y":28},{"x":26,"y":28},{"x":25,"y":28},{"x":21,"y":28},{"x":21,"y":27},{"x":21,"y":26},{"x":20,"y":24},{"x":20,"y":23},{"x":20,"y":22},{"x":20,"y":21},{"x":20,"y":20},{"x":21,"y":17},{"x":21,"y":16},{"x":21,"y":15},{"x":21,"y":13},{"x":21,"y":12},{"x":21,"y":11},{"x":21,"y":10}],
        'E41N39': [{"x":12,"y":24},{"x":12,"y":25},{"x":12,"y":26},{"x":12,"y":27},{"x":12,"y":28},{"x":39,"y":21},{"x":38,"y":21},{"x":38,"y":20}],
        'E55N23': [{"x":14,"y":25},{"x":15,"y":25},{"x":16,"y":25},{"x":17,"y":25},{"x":18,"y":25},{"x":24,"y":24},{"x":25,"y":24},{"x":26,"y":24},{"x":27,"y":24},{"x":27,"y":23},{"x":27,"y":22},{"x":27,"y":21},{"x":27,"y":20},{"x":27,"y":19},{"x":27,"y":18},{"x":27,"y":17},{"x":27,"y":16},{"x":26,"y":8},{"x":25,"y":8},{"x":24,"y":8},{"x":23,"y":8},{"x":22,"y":8},{"x":13,"y":9},{"x":12,"y":9},{"x":11,"y":9},{"x":10,"y":9},{"x":10,"y":10},{"x":10,"y":11},{"x":10,"y":12},{"x":10,"y":13},{"x":10,"y":14},{"x":10,"y":15},{"x":10,"y":16},{"x":10,"y":17},{"x":10,"y":18},{"x":10,"y":19},{"x":10,"y":20},{"x":10,"y":21},{"x":10,"y":22},{"x":10,"y":23}],
        'E53N25': [{"x":4,"y":23},{"x":5,"y":23},{"x":11,"y":22},{"x":12,"y":22},{"x":16,"y":20},{"x":16,"y":19},{"x":16,"y":18},{"x":16,"y":17},{"x":16,"y":16},{"x":16,"y":15},{"x":15,"y":6},{"x":15,"y":5},{"x":15,"y":4},{"x":15,"y":3},{"x":15,"y":2},{"x":10,"y":1},{"x":9,"y":1},{"x":8,"y":1},{"x":7,"y":1}],
        'E57N35': [{"x":21,"y":1},{"x":22,"y":1},{"x":23,"y":1},{"x":24,"y":1},{"x":25,"y":1},{"x":26,"y":1},{"x":27,"y":1},{"x":28,"y":1},{"x":29,"y":1},{"x":30,"y":1},{"x":31,"y":1},{"x":32,"y":1},{"x":33,"y":1},{"x":34,"y":1},{"x":35,"y":1},{"x":36,"y":1},{"x":37,"y":1},{"x":38,"y":1},{"x":39,"y":1},{"x":39,"y":2},{"x":39,"y":3},{"x":39,"y":4},{"x":39,"y":5},{"x":39,"y":6},{"x":39,"y":7},{"x":39,"y":8},{"x":39,"y":9},{"x":39,"y":10},{"x":39,"y":11},{"x":39,"y":12},{"x":39,"y":13},{"x":39,"y":14},{"x":39,"y":15},{"x":35,"y":16},{"x":34,"y":16},{"x":33,"y":16},{"x":32,"y":16},{"x":31,"y":16},{"x":30,"y":16},{"x":29,"y":16},{"x":28,"y":16},{"x":27,"y":16},{"x":26,"y":16},{"x":25,"y":16},{"x":24,"y":16},{"x":23,"y":16},{"x":22,"y":16},{"x":21,"y":16},{"x":21,"y":15},{"x":21,"y":14},{"x":21,"y":13},{"x":21,"y":12},{"x":21,"y":11},{"x":21,"y":10},{"x":21,"y":9},{"x":21,"y":8},{"x":21,"y":7},{"x":21,"y":6},{"x":21,"y":5},{"x":21,"y":4},{"x":21,"y":3},{"x":21,"y":2}],
        'E55N39': [{"x":16,"y":1},{"x":17,"y":1},{"x":18,"y":1},{"x":19,"y":1},{"x":20,"y":1},{"x":21,"y":1},{"x":22,"y":1},{"x":30,"y":1},{"x":31,"y":1},{"x":32,"y":1},{"x":33,"y":1},{"x":34,"y":1},{"x":34,"y":2},{"x":6,"y":5},{"x":6,"y":6},{"x":6,"y":7},{"x":6,"y":8},{"x":6,"y":9},{"x":6,"y":10},{"x":6,"y":11},{"x":6,"y":12},{"x":6,"y":13},{"x":16,"y":17},{"x":17,"y":17},{"x":18,"y":17},{"x":19,"y":17},{"x":20,"y":17},{"x":21,"y":17},{"x":22,"y":17},{"x":23,"y":17},{"x":24,"y":17},{"x":25,"y":17},{"x":26,"y":17},{"x":27,"y":17}],
        'E59N35': [{"x":30,"y":1},{"x":31,"y":1},{"x":32,"y":1},{"x":33,"y":1},{"x":34,"y":1},{"x":35,"y":1},{"x":39,"y":1},{"x":40,"y":1},{"x":41,"y":1},{"x":42,"y":1},{"x":43,"y":1},{"x":48,"y":6},{"x":48,"y":5},{"x":48,"y":4},{"x":48,"y":3},{"x":48,"y":2},{"x":22,"y":14},{"x":22,"y":15},{"x":22,"y":16},{"x":22,"y":17},{"x":22,"y":18},{"x":22,"y":19},{"x":32,"y":16},{"x":32,"y":17},{"x":32,"y":18},{"x":32,"y":19},{"x":31,"y":19},{"x":30,"y":19}],
        'E52N29': [{"x":17,"y":35},{"x":16,"y":35},{"x":15,"y":35},{"x":14,"y":35},{"x":13,"y":35},{"x":5,"y":30},{"x":5,"y":29},{"x":3,"y":26},{"x":3,"y":25},{"x":3,"y":24},{"x":3,"y":23},{"x":3,"y":22},{"x":3,"y":21},{"x":3,"y":20},{"x":3,"y":19},{"x":3,"y":18},{"x":3,"y":17},{"x":3,"y":16},{"x":4,"y":16},{"x":5,"y":16},{"x":6,"y":16},{"x":7,"y":16},{"x":8,"y":16},{"x":9,"y":16},{"x":10,"y":16},{"x":11,"y":16},{"x":17,"y":19},{"x":17,"y":20},{"x":17,"y":21},{"x":18,"y":25},{"x":18,"y":24},{"x":18,"y":23}],
        'E55N37': [{"x":12,"y":28},{"x":12,"y":29},{"x":12,"y":30},{"x":12,"y":31},{"x":13,"y":31},{"x":14,"y":31},{"x":15,"y":31},{"x":16,"y":31},{"x":17,"y":31},{"x":18,"y":31},{"x":19,"y":31},{"x":20,"y":31},{"x":21,"y":31},{"x":22,"y":31},{"x":23,"y":31},{"x":24,"y":31},{"x":25,"y":31},{"x":26,"y":31},{"x":26,"y":30},{"x":26,"y":29},{"x":26,"y":28},{"x":26,"y":27},{"x":26,"y":26},{"x":26,"y":25},{"x":28,"y":16},{"x":28,"y":15},{"x":27,"y":15},{"x":26,"y":15},{"x":25,"y":15},{"x":24,"y":15},{"x":23,"y":15},{"x":22,"y":15},{"x":21,"y":15},{"x":9,"y":14},{"x":8,"y":14},{"x":7,"y":14}],
        'E43N21': [{"x":26,"y":29},{"x":27,"y":29},{"x":7,"y":31},{"x":7,"y":30},{"x":9,"y":21},{"x":9,"y":20},{"x":9,"y":19},{"x":14,"y":15},{"x":15,"y":15},{"x":16,"y":15},{"x":17,"y":15},{"x":18,"y":15},{"x":19,"y":15}],
        'E43N25': [{"x":15,"y":48},{"x":15,"y":47},{"x":15,"y":46},{"x":15,"y":45},{"x":15,"y":44},{"x":15,"y":43},{"x":15,"y":42},{"x":15,"y":41},{"x":15,"y":40},{"x":15,"y":39},{"x":15,"y":38},{"x":15,"y":37},{"x":19,"y":35},{"x":20,"y":35},{"x":21,"y":35},{"x":22,"y":35},{"x":23,"y":35},{"x":24,"y":35},{"x":25,"y":35},{"x":30,"y":37},{"x":31,"y":37},{"x":32,"y":37},{"x":33,"y":37},{"x":34,"y":37},{"x":34,"y":38},{"x":35,"y":38},{"x":35,"y":39},{"x":36,"y":39},{"x":36,"y":40},{"x":36,"y":41},{"x":36,"y":42},{"x":36,"y":43},{"x":36,"y":44},{"x":36,"y":45},{"x":36,"y":46},{"x":36,"y":47},{"x":36,"y":48}],
        'E57N25': [{"x":12,"y":29},{"x":13,"y":29},{"x":14,"y":29},{"x":15,"y":29},{"x":16,"y":29},{"x":17,"y":29},{"x":18,"y":29},{"x":19,"y":29},{"x":20,"y":29},{"x":21,"y":29},{"x":26,"y":27},{"x":26,"y":26},{"x":26,"y":25},{"x":26,"y":24},{"x":26,"y":23},{"x":26,"y":22},{"x":26,"y":21},{"x":26,"y":20},{"x":26,"y":19},{"x":26,"y":16},{"x":26,"y":15},{"x":25,"y":15},{"x":25,"y":14},{"x":24,"y":14},{"x":24,"y":13},{"x":23,"y":13},{"x":23,"y":12},{"x":22,"y":12},{"x":22,"y":11},{"x":22,"y":10},{"x":21,"y":10},{"x":20,"y":10},{"x":14,"y":11},{"x":13,"y":11},{"x":12,"y":11},{"x":11,"y":11}],
        'E57N33': [{"x":30,"y":24},{"x":30,"y":25},{"x":31,"y":25},{"x":31,"y":26},{"x":32,"y":26},{"x":33,"y":26},{"x":34,"y":26},{"x":35,"y":26},{"x":36,"y":26},{"x":37,"y":26},{"x":38,"y":26},{"x":44,"y":26},{"x":45,"y":26},{"x":46,"y":26},{"x":47,"y":26},{"x":47,"y":25},{"x":48,"y":25},{"x":48,"y":19},{"x":47,"y":19},{"x":47,"y":18},{"x":47,"y":17},{"x":47,"y":16},{"x":47,"y":15},{"x":47,"y":14},{"x":47,"y":13},{"x":47,"y":12},{"x":43,"y":10},{"x":42,"y":10},{"x":41,"y":10},{"x":40,"y":10},{"x":39,"y":10},{"x":38,"y":10},{"x":37,"y":10},{"x":33,"y":11},{"x":32,"y":11},{"x":31,"y":11}],
        'E45N22': [{"x":7,"y":48},{"x":8,"y":48},{"x":9,"y":48},{"x":10,"y":48},{"x":11,"y":48},{"x":12,"y":48},{"x":12,"y":47},{"x":13,"y":47},{"x":13,"y":46},{"x":13,"y":45},{"x":15,"y":39},{"x":15,"y":38},{"x":15,"y":37},{"x":15,"y":36},{"x":15,"y":35},{"x":15,"y":31},{"x":15,"y":30},{"x":14,"y":30},{"x":14,"y":29},{"x":13,"y":29},{"x":12,"y":29},{"x":11,"y":29},{"x":10,"y":29},{"x":9,"y":29},{"x":8,"y":29},{"x":7,"y":29},{"x":6,"y":29},{"x":5,"y":29},{"x":4,"y":29},{"x":3,"y":29},{"x":2,"y":29},{"x":2,"y":30},{"x":1,"y":30},{"x":1,"y":31},{"x":1,"y":32},{"x":1,"y":33},{"x":1,"y":34},{"x":1,"y":35}],
        'E53N21': [{"x":30,"y":41},{"x":31,"y":41},{"x":32,"y":41},{"x":33,"y":41},{"x":24,"y":40},{"x":23,"y":40},{"x":22,"y":40},{"x":20,"y":33},{"x":21,"y":33},{"x":21,"y":32},{"x":22,"y":32},{"x":22,"y":31},{"x":23,"y":31},{"x":23,"y":30},{"x":29,"y":26},{"x":29,"y":25},{"x":33,"y":23},{"x":34,"y":23},{"x":35,"y":23},{"x":36,"y":23},{"x":40,"y":24},{"x":41,"y":24},{"x":42,"y":24}],
        'E41N19': [{"x":2,"y":48},{"x":3,"y":48},{"x":4,"y":48},{"x":5,"y":48},{"x":6,"y":48},{"x":7,"y":48},{"x":8,"y":48},{"x":9,"y":48},{"x":10,"y":48},{"x":11,"y":48},{"x":22,"y":48},{"x":22,"y":47},{"x":22,"y":46},{"x":22,"y":45},{"x":22,"y":44},{"x":22,"y":43},{"x":22,"y":42},{"x":22,"y":41},{"x":22,"y":40},{"x":22,"y":39},{"x":19,"y":36},{"x":19,"y":35},{"x":16,"y":33},{"x":15,"y":33},{"x":14,"y":33},{"x":13,"y":33},{"x":12,"y":33},{"x":6,"y":37},{"x":5,"y":37},{"x":4,"y":37},{"x":3,"y":37},{"x":2,"y":37},{"x":1,"y":37},{"x":1,"y":38},{"x":1,"y":39},{"x":1,"y":40}],
        'E45N11': [{"x":24,"y":14},{"x":25,"y":14},{"x":26,"y":14},{"x":27,"y":14},{"x":22,"y":11},{"x":22,"y":10},{"x":22,"y":9},{"x":22,"y":8},{"x":22,"y":7},{"x":22,"y":6},{"x":23,"y":6},{"x":25,"y":3},{"x":25,"y":2},{"x":25,"y":1},{"x":26,"y":1},{"x":27,"y":1},{"x":28,"y":1},{"x":29,"y":1},{"x":30,"y":1},{"x":31,"y":1},{"x":32,"y":1},{"x":33,"y":1},{"x":34,"y":1},{"x":35,"y":1},{"x":36,"y":1},{"x":37,"y":1},{"x":38,"y":1},{"x":39,"y":1},{"x":40,"y":1},{"x":41,"y":1},{"x":42,"y":1},{"x":43,"y":1},{"x":43,"y":2},{"x":43,"y":9},{"x":43,"y":10},{"x":43,"y":11},{"x":42,"y":11}],
        'E36N9':  [{"x":4,"y":41},{"x":4,"y":40},{"x":4,"y":39},{"x":4,"y":38},{"x":5,"y":32},{"x":6,"y":32},{"x":7,"y":32},{"x":8,"y":32},{"x":9,"y":32},{"x":14,"y":32},{"x":15,"y":32},{"x":16,"y":32},{"x":17,"y":32},{"x":18,"y":32},{"x":19,"y":32},{"x":19,"y":33},{"x":20,"y":33},{"x":20,"y":34},{"x":21,"y":34},{"x":21,"y":35},{"x":21,"y":36},{"x":21,"y":37},{"x":21,"y":38},{"x":21,"y":39},{"x":21,"y":40},{"x":21,"y":41},{"x":21,"y":42},{"x":21,"y":43},{"x":21,"y":44}],
        'E41N5':  [{"x":17,"y":46},{"x":18,"y":46},{"x":19,"y":46},{"x":20,"y":46},{"x":21,"y":46},{"x":21,"y":45},{"x":21,"y":44},{"x":21,"y":43},{"x":21,"y":40},{"x":20,"y":40},{"x":20,"y":39},{"x":20,"y":38},{"x":20,"y":37},{"x":20,"y":36},{"x":20,"y":35},{"x":20,"y":34},{"x":20,"y":33},{"x":20,"y":32},{"x":19,"y":32},{"x":18,"y":32},{"x":17,"y":32},{"x":16,"y":32},{"x":15,"y":32},{"x":14,"y":32},{"x":13,"y":32},{"x":12,"y":32},{"x":11,"y":32},{"x":10,"y":32},{"x":9,"y":32},{"x":9,"y":33},{"x":9,"y":34},{"x":9,"y":35}],
        'E38N19': [{"x":23,"y":8},{"x":24,"y":8},{"x":25,"y":8},{"x":26,"y":8},{"x":27,"y":8},{"x":28,"y":8},{"x":12,"y":13},{"x":12,"y":14},{"x":11,"y":14},{"x":11,"y":15},{"x":11,"y":16},{"x":11,"y":17},{"x":11,"y":18},{"x":11,"y":19},{"x":11,"y":20},{"x":12,"y":20},{"x":12,"y":21},{"x":12,"y":22},{"x":13,"y":22},{"x":13,"y":23},{"x":14,"y":23}],
        'E33N9':  [{x:27, y:14},{x:27, y:13},{x:27, y:12},{x:28, y:18},{x:28, y:19},{x:28, y:20},{x:28, y:21},{x:28, y:22},{x:29, y:22},{x:43, y:23},{x:44, y:23},{x:45, y:23},{x:45, y:22},{x:46, y:22},{x:46, y:21},{x:46, y:20},{x:30, y:24},{x:31, y:24},{x:31, y:26},{x:31, y:25},{x:29, y:24},{x:29, y:23},],
        'E59N41': [{x:27, y:25},{x:28, y:25},{x:31, y:27},{x:32, y:27},{x:33, y:27},{x:34, y:27},{x:35, y:27},{x:36, y:27},{x:37, y:27},{x:38, y:27},{x:39, y:27},{x:20, y:27},{x:21, y:26},{x:21, y:25},{x:20, y:26},{x:19, y:27},{x:19, y:28},{x:18, y:29},{x:22, y:38},{x:22, y:39},{x:22, y:40},{x:22, y:41},{x:22, y:42},{x:22, y:43},{x:26, y:44},{x:27, y:44},{x:28, y:44},{x:29, y:44},{x:30, y:44},{x:31, y:44},{x:32, y:44},{x:33, y:44},{x:34, y:44},{x:35, y:44},{x:36, y:44},{x:37, y:44},{x:40, y:41},{x:40, y:40},{x:40, y:39},{x:40, y:38},{x:40, y:37},{x:40, y:36},{x:40, y:35},{x:41, y:35},{x:41, y:34},{x:41, y:33},{x:41, y:32},{x:41, y:31},{x:25, y:44},{x:18, y:33},{x:18, y:32},{x:18, y:31},{x:18, y:30},{x:18, y:28},],
        'E46N19': [{x:30, y:10},{x:30, y:11},{x:30, y:12},{x:30, y:15},{x:30, y:14},{x:30, y:13},{x:30, y:16},{x:30, y:17},{x:30, y:18},{x:31, y:18},{x:32, y:19},{x:32, y:20},{x:33, y:20},{x:34, y:21},{x:35, y:22},{x:36, y:22},{x:37, y:22},{x:38, y:22},{x:39, y:22},{x:40, y:22},{x:41, y:22},{x:42, y:22},{x:43, y:22},{x:43, y:21},{x:44, y:21},{x:44, y:20},{x:45, y:20},{x:45, y:19},{x:46, y:19},{x:46, y:18},{x:47, y:18},{x:34, y:22},{x:33, y:21},{x:31, y:19},],
        'E57N44': [{x:9, y:13},{x:9, y:12},{x:9, y:11},],
        'E57N47': [{x:11, y:16},{x:12, y:16},{x:23, y:27},{x:23, y:28},{x:23, y:29},{x:19, y:35},{x:18, y:35},{x:17, y:35},{x:16, y:35},{x:15, y:35},{x:3, y:33},{x:4, y:33},{x:13, y:16},{x:10, y:16},{x:2, y:31},{x:2, y:30},{x:2, y:29},{x:2, y:28},{x:2, y:27},{x:2, y:26},{x:2, y:25},],
        'E59N53': [{x:28, y:36},{x:29, y:35},{x:30, y:35},{x:31, y:34},{x:32, y:33},{x:33, y:32},{x:32, y:32},{x:34, y:31},{x:35, y:30},{x:36, y:30},{x:37, y:30},{x:38, y:30},{x:39, y:30},{x:40, y:30},{x:41, y:30},{x:42, y:30},{x:43, y:30},{x:44, y:30},{x:44, y:31},{x:44, y:32},{x:45, y:32},{x:45, y:33},{x:45, y:34},{x:45, y:35},{x:45, y:36},{x:45, y:37},{x:45, y:38},{x:45, y:39},{x:45, y:40},{x:45, y:41},{x:45, y:42},{x:45, y:43},{x:45, y:44},{x:34, y:30},{x:33, y:31},{x:31, y:33},{x:30, y:34},{x:28, y:35},{x:27, y:36},{x:27, y:39},{x:27, y:38},{x:27, y:37},{x:27, y:45},{x:27, y:44},{x:27, y:43},{x:31, y:47},{x:32, y:47},{x:33, y:47},{x:38, y:47},{x:39, y:47},{x:40, y:47},{x:41, y:47},{x:42, y:47},],
        'E47S1':  [{x:40, y:38},{x:40, y:39},{x:40, y:40},{x:40, y:41},{x:40, y:42},{x:40, y:43},{x:40, y:44},{x:40, y:45},{x:31, y:33},{x:32, y:33},{x:33, y:33},{x:34, y:33},{x:35, y:33},{x:36, y:33},{x:30, y:33},{x:21, y:34},{x:21, y:35},{x:21, y:38},{x:21, y:37},{x:21, y:36},],
        'E44S8':  [{x:18, y:9},{x:18, y:8},{x:18, y:7},{x:18, y:6},{x:24, y:3},{x:25, y:3},{x:26, y:3},{x:27, y:3},{x:28, y:3},{x:29, y:3},{x:30, y:3},{x:31, y:3},{x:32, y:3},{x:33, y:3},{x:34, y:3},{x:35, y:3},{x:17, y:15},{x:17, y:14},{x:38, y:22},{x:37, y:22},{x:39, y:22},{x:40, y:22},{x:20, y:18},{x:21, y:18},{x:22, y:18},],
        'E47S4':  [{x:22, y:12},{x:23, y:12},{x:24, y:12},{x:25, y:12},{x:26, y:12},{x:21, y:27},{x:22, y:27},{x:23, y:27},{x:28, y:26},{x:29, y:26},{x:30, y:26},{x:31, y:26},{x:32, y:26},{x:33, y:26},{x:34, y:26},{x:19, y:24},{x:19, y:25},{x:19, y:26},{x:17, y:17},{x:17, y:18},{x:17, y:19},],

    },
    
    

};

module.exports = shardCfg;

