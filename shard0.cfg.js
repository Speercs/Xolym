var roleMassRanger = require('role.massRanger');
var roleGclBooster = require('role.gclBooster');

var shardCfg = {
    myRooms: [
        /*0*/{roomName: 'E79N52', sector: [7],      atack_sector: 0, lab:24, factory: 6, creeps: {suplier: 1, miner: 2, transporter: 1, filler: 0, upgrader: 1, wallbuilder: 1 , harvester: 3}},
        /*1*/{roomName: 'E79N54', sector: [6,10,11],atack_sector: 1, lab:25, factory: 1, creeps: {suplier: 1, miner: 2, transporter: 1, filler: 0, upgrader: 1, wallbuilder: 1 , harvester: 4}},
        /*2*/{roomName: 'E77N54', sector: [38,42],  atack_sector: 2, lab:26, factory:14, creeps: {suplier: 1, miner: 2, transporter: 1, filler: 0, upgrader: 1, wallbuilder: 1 , harvester: 1,},keepers: [9,10]},
        /*3*/{roomName: 'E79N59', sector: [43],     atack_sector: 3, lab:18, factory:17, creeps: {suplier: 1, miner: 2, transporter: 1, filler: 0, upgrader: 1, wallbuilder: 1 , harvester: 2,},keepers: []},
        /*4*/{roomName: 'E59N46', sector: [44,45],  atack_sector: 4, lab:19, factory:18, creeps: {suplier: 1, miner: 2, transporter: 1, filler: 0, upgrader: 1, wallbuilder: 1 , harvester: 1,},keepers: []},
        /*5*/{roomName: 'E54N49', sector: [46,47],  atack_sector: 5, lab:20, factory:19, creeps: {suplier: 1, miner: 2, transporter: 1, filler: 0, upgrader: 1, wallbuilder: 1 , harvester: 1,filler: 1,},keepers: []},
        /*6*/{roomName: 'E52N46', sector: [48,49],  atack_sector: 6, lab:21, factory:20, creeps: {suplier: 1, miner: 2, transporter: 1, filler: 0, upgrader: 1, wallbuilder: 1 , harvester: 1,filler: 1},keepers: []},
        /*7*/{roomName: 'E71N56', sector: [50,51],  atack_sector: 7, lab:22, factory:22, creeps: {suplier: 1, miner: 2, transporter: 1, filler: 0, upgrader: 1, wallbuilder: 1 , harvester: 1,},keepers: []},
        /*8*/{roomName: 'E52N41', sector: [52],     atack_sector: 8, lab:23, factory:21, creeps: {suplier: 1, miner: 2, transporter: 1, filler: 0, upgrader: 1, wallbuilder: 1 , harvester: 1,filler: 1,},keepers: []},
        
        /* 99*///{roomName: '', sector: [],     atack_sector: 0, lab:0, factory:0, creeps: {suplier: 1, miner: 2, transporter: 1, filler: 0, upgrader: 1, wallbuilder: 1 , harvester: 1,},keepers: []},

        // /* 0 */{roomName: 'E83N58', sector: [/*18*/], atack_sector: 1, assault_team: 1, lab: 0, factory: 0, creeps: {suplier: 1, man:1 ,miner: 2, transporter: 1, upgrader: 1, wallbuilder: 0, harvester: 3}},
        // /* 2 */{roomName: 'E81N53', sector: [1], atack_sector: 4, assault_team: 1, lab: 0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, superharvester: 0, upgrader: 1, wallbuilder: 1, harvester: 2}},
        // /* 3 */{roomName: 'E81N54', sector: [4], atack_sector: 1, assault_team: 1, lab: 0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, superharvester: 0, upgrader: 1, wallbuilder: 1, harvester: 2}},
        // /* 4 */{roomName: 'E82N56', sector: [2,9,12,/*13*/], atack_sector: 2, assault_team: 1, lab: 0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 1, harvester: 1, superharvester: 0}, keepers: [2]},
        // /* 5 */{roomName: 'E83N54', sector: [14,17,21,], atack_sector: 0, massRanger_team: 1, assault_team: 0, lab: 0, factory: 0, creeps: {suplier: 1, man:1 ,miner: 2, transporter: 1, upgrader: 1, wallbuilder: 0, harvester: 0, superharvester: 0, deliver: 0}, keeper: 0, keepers: [0,2]}, 
        // /* 6 */{roomName: 'E81N58', sector: [5,15,/*16*/], atack_sector: 2, assault_team: 1, lab: 0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, man:1 ,upgrader: 1, wallbuilder: 0, harvester: 0}},
        // /* 8 */{roomName: 'E86N53', sector: [23,24,25,/*19*/], atack_sector: 0, massRanger_team: 0, assault_team: 1, lab: 0, factory: 0, creeps: {suplier: 1, miner: 2,man:1 , transporter: 1, upgrader: 1, wallbuilder: 0 , harvester: 0, superharvester: 0, dropper: 0},keepers: [3,4]},
        // /* 9 */{roomName: 'E87N56', sector: [22,26,28], atack_sector: 0, massRanger_team: 0, assault_team: 1, lab: 0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, man:1 ,upgrader: 1, wallbuilder: 0 , harvester: 0, superharvester: 0, dropper: 1},keepers: [5,6,7]},
        // /* 10*/{roomName: 'E85N57', sector: [27,/*29,30,*/3,31,32], atack_sector: 0, massRanger_team: 0, assault_team: 1, lab:0, factory: 0,  creeps: {suplier: 1, miner: 1,man:1 , transporter: 1, upgrader: 1, wallbuilder: 0 , harvester: 0, superharvester: 0},keepers: [/*8*/]},
        // /* 11*/{roomName: 'E87N58', sector: [39,40,41], atack_sector: 5, assault_team: 1, lab: 0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, man:1 ,wallbuilder: 0 , harvester: 0, superharvester: 0},keepers: []},
        // /* 12*/{roomName: 'E89N54', sector: [33,34,35,36], atack_sector: 6, assault_team: 1, lab: 0, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, man:1 ,wallbuilder: 0, harvester: 0, superharvester: 0},keepers: []},
        // /* 15*/{roomName: 'E83N55', sector: [], atack_sector: 1, assault_team: 1, lab:0, creeps: {suplier: 1, miner: 0, transporter: 1, upgrader: 0, wallbuilder: 0, harvester: 0, man:1 ,superharvester: 0, gclCrane: 0, gclUpgrader: roleGclBooster.getGclUpgraderCount('E83N55'), gclClaimer: 0},keepers: []},

    ],
    skRooms: [
        {id: 0, roomName: 'E84N54', sector: 14, creeps: {keeper: 1}},
        {id: 1, roomName: 'E85N55', sector: 3, creeps: {}},
        {id: 2, roomName: 'E84N55', sector: 0, creeps: {keeper: 1}},
        {id: 3, roomName: 'E86N54', sector: 23, creeps: {keeper: 1}},
        {id: 4, roomName: 'E85N54', sector: 24, creeps: {keeper: 1}},
        {id: 5, roomName: 'E86N56', sector: 26, creeps: {keeper: 1}},
        {id: 6, roomName: 'E85N56', sector: 27, creeps: {keeper: 1}},
        {id: 7, roomName: 'E86N55', sector: 28, creeps: {keeper: 1}},
        {id: 8, roomName: 'E84N56', sector: 29, creeps: {keeper: 1}},
        {id: 9, roomName: 'E76N54', sector: 38, creeps: {keeper: 1}, rooms: ['E76N54']},
        {id:10, roomName: 'E76N55', sector: 42, creeps: {keeper: 1}, rooms: ['E76N54','E76N55']},
    ],
    labConfig: [
        {id: 0, manual: 1, labs: [], reaction: []},
        {id: 1, labs: [RESOURCE_UTRIUM, RESOURCE_UTRIUM_HYDRIDE, RESOURCE_HYDROGEN, RESOURCE_HYDROXIDE, RESOURCE_OXYGEN, 'endFullProduct', RESOURCE_UTRIUM_ACID, RESOURCE_CATALYST, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE], reaction: [[1, 0, 2],[3,2,4], [6, 1, 3], [5,6,7]]},
        {id: 2, labs: [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID, 5, RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ACID, 8,RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE], reaction: []},
        {id: 3, conditions: [{resource: RESOURCE_LEMERGIUM_ACID, amount: 10000}], labs: ['endProduct',RESOURCE_LEMERGIUM_HYDRIDE,'endProduct','endProduct','endProduct','endProduct','endProduct','endProduct','endProduct',RESOURCE_HYDROXIDE], reaction: [[0,1,9],[2,1,9],[3,1,9],[4,1,9],[5,1,9],[6,1,9],[7,1,9],[8,1,9],,]},
        {id: 4, conditions: [{resource: RESOURCE_GHODIUM, amount: 100000}], labs: [RESOURCE_UTRIUM, RESOURCE_LEMERGIUM, RESOURCE_UTRIUM_LEMERGITE, RESOURCE_UTRIUM_LEMERGITE, 'endProduct','endProduct', RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_ZYNTHIUM, RESOURCE_KEANIUM], reaction: [[2, 0, 1],[3, 0, 1],[7,9,8],[6,9,8],[4,3,6],[5,2,7]]},
        {id: 5, labs: [RESOURCE_GHODIUM_ALKALIDE,'endProduct',RESOURCE_GHODIUM,RESOURCE_HYDROGEN,RESOURCE_HYDROXIDE,RESOURCE_OXYGEN,'endProduct','endProduct',RESOURCE_CATALYST,RESOURCE_GHODIUM_OXIDE],reaction: [[4,3,5],[9,2,5],[0,4,9],[6,0,8],[7,0,8],[1,0,8],]},
        {id: 6, labs: [RESOURCE_ZYNTHIUM,'endProduct',RESOURCE_OXYGEN,RESOURCE_ZYNTHIUM_OXIDE,RESOURCE_ZYNTHIUM_ALKALIDE,RESOURCE_HYDROGEN,'endProduct',RESOURCE_HYDROXIDE, RESOURCE_CATALYST,'endProduct'], reaction: [[7,5,2],[3,2,0],[4,3,7],[9,8,4],[6,8,4],[1,4,8]]},
        {id: 7, labs: [RESOURCE_KEANIUM, RESOURCE_OXYGEN,RESOURCE_KEANIUM_OXIDE,'endProduct',RESOURCE_CATALYST,'endProduct','endProduct',RESOURCE_KEANIUM_ALKALIDE,RESOURCE_HYDROXIDE,RESOURCE_HYDROGEN],reaction: [[2,0,1],[8,1,9], [7,2,8],[3,4,7],[5,4,7],[6,4,7],]},
        {id: 8, labs: [RESOURCE_HYDROXIDE, RESOURCE_HYDROGEN, RESOURCE_GHODIUM_HYDRIDE,RESOURCE_OXYGEN,'endFullProduct',RESOURCE_GHODIUM_ACID,'endFullProduct',RESOURCE_CATALYST,'endFullProduct', RESOURCE_GHODIUM], reaction: [[2,1,9],[0,1,3],[5,0,2],[6,7,5],[8,7,5],[4,7,5]]},
        {id: 9, labs: [RESOURCE_OXYGEN, RESOURCE_HYDROGEN, RESOURCE_HYDROXIDE, RESOURCE_CATALYST, RESOURCE_GHODIUM_HYDRIDE, RESOURCE_GHODIUM, 'endProduct', 'endProduct', RESOURCE_GHODIUM_ACID, 'endProduct'], reaction: [[4,5,1],[2,0,1],[8,4,2],[6,3,8],[7,3,8],[9,3,8]]},
        {id: 10, labs: ['endProduct','endProduct','endProduct',RESOURCE_LEMERGIUM_ACID,RESOURCE_CATALYST,'endProduct','endProduct','endProduct','endProduct','endProduct'], reaction: [[0,3,4],[2,3,4],[5,3,4],[6,3,4],[7,3,4],[8,3,4],[9,3,4],]},
        {id: 11, labs: [RESOURCE_HYDROGEN,  RESOURCE_HYDROXIDE, RESOURCE_LEMERGIUM, RESOURCE_OXYGEN, RESOURCE_LEMERGIUM_ALKALIDE, RESOURCE_LEMERGIUM_OXIDE, 'endProduct', RESOURCE_CATALYST, 'endProduct', 'endProduct'],reaction: [[1,3,0], [5,3,2], [4,5,1], [6,7,4], [9,7,4], [8,7,4]]},
        {id: 12, conditions: [{resource: RESOURCE_LEMERGIUM_HYDRIDE, amount: 100000}],labs: ['endProduct',RESOURCE_CATALYZED_KEANIUM_ACID,RESOURCE_HYDROGEN,'endProduct',RESOURCE_LEMERGIUM,'endProduct','endProduct','endProduct','endProduct','endProduct'], reaction: [[7,4,2],[8,4,2],[9,4,2],[6,4,2],[5,4,2],[0,4,2],[3,4,2],]},
        {id: 13, labs: [RESOURCE_CATALYZED_GHODIUM_ALKALIDE,RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ACID], reaction: []},
        {id: 14, labs: [RESOURCE_KEANIUM_HYDRIDE,RESOURCE_KEANIUM,RESOURCE_HYDROGEN,'endProduct',RESOURCE_KEANIUM_ACID,RESOURCE_CATALYST,RESOURCE_HYDROXIDE,RESOURCE_OXYGEN,'endProduct','endProduct'], reaction: [[0,1,2],[6,2,7],[4,0,6],[3,4,5],[8,4,5],[9,4,5]]},
        {id: 15, labs: [RESOURCE_CATALYZED_GHODIUM_ACID], reaction: []},
        {id: 16, labs: [RESOURCE_GHODIUM,RESOURCE_HYDROGEN,RESOURCE_OXYGEN,RESOURCE_GHODIUM_HYDRIDE,RESOURCE_GHODIUM_ACID,RESOURCE_HYDROXIDE,'endProduct','endProduct',RESOURCE_CATALYST,'endProduct'], reaction: [[3,0,1],[5,2,1],[4,3,5],[6,4,8],[7,4,8],[9,4,8],]},
        {id: 17, conditions: [{resource: RESOURCE_HYDROXIDE, amount: 10000}], labs: ['endProduct','endProduct','endProduct','endProduct',RESOURCE_OXYGEN,'endProduct',RESOURCE_HYDROGEN,'endProduct','endProduct','endProduct'], reaction: [[0,4,6],[1,4,6],[2,4,6],[3,4,6],[5,4,6],[7,4,6],[8,4,6],[9,4,6],]},
        {id: 18, manual:0, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID], reaction: []},
        {id: 19, manual:0, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID], reaction: []},
        {id: 20, manual:0, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID], reaction: []},
        {id: 21, manual:0, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID], reaction: []},
        {id: 22, manual:0, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID], reaction: []},
        {id: 23, manual:0, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID], reaction: []},
        {id: 24, manual:0, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID], reaction: []},
        {id: 25, manual:0, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID], reaction: []},
        {id: 26, manual:0, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID], reaction: []},
        {id: 27, manual:0, labs: [RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ACID], reaction: []},
        {id: 99, labs: [RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ALKALIDE], reaction: []},
    ],
    factoryConfig: [
        {id: 0, factoryId:'', endProduct: [], produce:[]},
        {id: 1, endProduct: [RESOURCE_REDUCTANT,], produce:[
            {product: RESOURCE_REDUCTANT, needAmount: 500000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 60000}],},
        ]},
        {id: 2, factoryId:'5dc7195f9ee49d67d888a593', endProduct: [RESOURCE_FIXTURES, RESOURCE_UTRIUM_BAR, RESOURCE_EXTRACT, RESOURCE_CRYSTAL], produce:[
            {product: RESOURCE_FIXTURES, ingridients: [
                {resource: RESOURCE_ENERGY, amount: 8},
                {resource: RESOURCE_COMPOSITE, amount: 20, external: 1},
                {resource: RESOURCE_ALLOY, amount: 41, external: 1},
                {resource: RESOURCE_OXIDANT, amount: 161, external: 1},
            ], needAmount: 10},
            {product: RESOURCE_OXIDANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_OXYGEN, amount: 500, external: 1}], needAmount: 800,},
            {product: RESOURCE_EXTRACT, ingridients: [
                {resource: RESOURCE_ENERGY, amount: 16},
                {resource: RESOURCE_CONCENTRATE, amount: 10, external: 1},
                {resource: RESOURCE_CONDENSATE, amount: 30, external: 1},
                {resource: RESOURCE_OXIDANT, amount: 60, external: 1},
            ], needAmount: 10},
            {product: RESOURCE_CRYSTAL, ingridients: [
                {resource: RESOURCE_LEMERGIUM_BAR, amount: 6, external: 1},
                {resource: RESOURCE_KEANIUM_BAR, amount: 6, external: 1},
                {resource: RESOURCE_PURIFIER, amount: 6, external: 1},
                {resource: RESOURCE_ENERGY, amount: 45},
            ], needAmount: 300,},
            {product: RESOURCE_UTRIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_UTRIUM, amount: 500, external: 1}], needAmount: 6000,},
            {product: RESOURCE_LEMERGIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_LEMERGIUM, amount: 500, external: 1}], needAmount: 100},
            {product: RESOURCE_KEANIUM_BAR,   ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_KEANIUM,   amount: 500, external: 1}], needAmount: 100},
            {product: RESOURCE_PURIFIER,      ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_CATALYST,  amount: 500, external: 1}], needAmount: 100},
            {product: RESOURCE_UTRIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_UTRIUM, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_UTRIUM, amount: 60000}],},
        ]},
        {id: 3, factoryId:'5dc6a1d434a14a2343c9a085', endProduct: [RESOURCE_FRAME, RESOURCE_LIQUID, /*RESOURCE_OXIDANT,*/RESOURCE_SPIRIT,], produce:[
            {product: RESOURCE_FRAME, ingridients: [
                {resource: RESOURCE_FIXTURES, amount: 2, external: 1},
                {resource: RESOURCE_TUBE, amount: 4, external: 1},
                {resource: RESOURCE_REDUCTANT, amount: 330, external: 1},
                {resource: RESOURCE_ZYNTHIUM_BAR, amount: 31, external: 1},
                {resource: RESOURCE_ENERGY, amount: 16},
            ], needAmount: 10},
            {product: RESOURCE_SPIRIT, ingridients: [
                {resource: RESOURCE_EXTRACT, amount: 2, external: 1},
                {resource: RESOURCE_CONCENTRATE, amount: 6, external: 1},
                {resource: RESOURCE_REDUCTANT, amount: 90, external: 1},
                {resource: RESOURCE_PURIFIER, amount: 20, external: 1},
                {resource: RESOURCE_ENERGY, amount: 16},
            ], needAmount: 10},
            {product: RESOURCE_REDUCTANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_HYDROGEN, amount: 500, external: 1}], needAmount: 1200,},
            {product: RESOURCE_ZYNTHIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_ZYNTHIUM, amount: 500, external: 1}], needAmount: 100},
            {product: RESOURCE_LIQUID, ingridients: [
                {resource: RESOURCE_OXIDANT, amount: 12, external: 1},
                {resource: RESOURCE_REDUCTANT, amount: 12, external: 1},
                {resource: RESOURCE_GHODIUM_MELT, amount: 12, external: 1},
                {resource: RESOURCE_ENERGY, amount: 90},
            ], needAmount: 5000},
            {product: RESOURCE_PURIFIER,      ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_CATALYST,  amount: 500, external: 1}], needAmount: 100},
            {product: RESOURCE_OXIDANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_OXYGEN, amount: 500, external: 1}], needAmount: 800,},
            {product: RESOURCE_OXIDANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_OXYGEN, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_OXYGEN, amount: 60000}],},
            // {product: RESOURCE_LEMERGIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_LEMERGIUM, amount: 500, external: 1}], needAmount: 10000},
        ]},
        {id: 4, factoryId:'5dc772c8d0aead9ee804a7b2', endProduct: [RESOURCE_HYDRAULICS, RESOURCE_OXIDANT, RESOURCE_REDUCTANT, RESOURCE_EMANATION], produce:[
            {product: RESOURCE_HYDRAULICS, ingridients: [
                {resource: RESOURCE_LIQUID, amount: 150, external: 1},
                {resource: RESOURCE_FIXTURES, amount: 3, external: 1},
                {resource: RESOURCE_TUBE, amount: 15, external: 1},
                {resource: RESOURCE_PURIFIER, amount: 208, external: 1},
                {resource: RESOURCE_ENERGY, amount: 32},
            ], needAmount: 2},
            {product: RESOURCE_EMANATION, ingridients: [
                {resource: RESOURCE_SPIRIT, amount: 2, external: 1},
                {resource: RESOURCE_EXTRACT, amount: 2, external: 1},
                {resource: RESOURCE_CONCENTRATE, amount: 3, external: 1},
                {resource: RESOURCE_KEANIUM_BAR, amount: 112, external: 1},
                {resource: RESOURCE_ENERGY, amount: 32},
            ], needAmount: 2},
            {product: RESOURCE_KEANIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_KEANIUM, amount: 500, external: 1}], needAmount: 200},
            {product: RESOURCE_OXIDANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_OXYGEN, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_OXYGEN, amount: 60000}],},
            {product: RESOURCE_REDUCTANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_HYDROGEN, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 60000}],},
            //{product: RESOURCE_LEMERGIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_LEMERGIUM, amount: 500, external: 1}], needAmount: 10000},
        ]},
        {id: 5, factoryId: '5df3707431b30c1194c495bf', endProduct: [RESOURCE_MACHINE,RESOURCE_PURIFIER,RESOURCE_LEMERGIUM_BAR,RESOURCE_REDUCTANT, RESOURCE_ESSENCE], produce:[
            {product: RESOURCE_MACHINE, ingridients: [
                {resource: RESOURCE_HYDRAULICS, amount: 1, external: 1},
                {resource: RESOURCE_FRAME, amount: 2, external: 1},
                {resource: RESOURCE_FIXTURES, amount: 3, external: 1},
                {resource: RESOURCE_TUBE, amount: 12, external: 1},
                {resource: RESOURCE_ENERGY, amount: 64},
            ], needAmount: 1000},

            {product: RESOURCE_ESSENCE, ingridients: [
                {resource: RESOURCE_EMANATION, amount: 1, external: 1},
                {resource: RESOURCE_SPIRIT, amount: 3, external: 1},
                {resource: RESOURCE_CRYSTAL, amount: 110, external: 1},
                {resource: RESOURCE_GHODIUM_MELT, amount: 150, external: 1},
                {resource: RESOURCE_ENERGY, amount: 64},
            ], needAmount: 1000},
            {product: RESOURCE_PURIFIER, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_CATALYST, amount: 500, external: 1}], needAmount: 2000},
            {product: RESOURCE_GHODIUM_MELT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_GHODIUM, amount: 500, external: 1}], needAmount: 300},
            {product: RESOURCE_LEMERGIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_LEMERGIUM, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_LEMERGIUM, amount: 60000}],},
            {product: RESOURCE_REDUCTANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_HYDROGEN, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 60000}],},
        ]},
        {id: 6, factoryId:'5db206a78c320953d8d26a0d', endProduct: [RESOURCE_ALLOY,RESOURCE_KEANIUM_BAR,], produce:[
            {product: RESOURCE_ALLOY, ingridients: [{resource: RESOURCE_ENERGY, amount: 40}, {resource: RESOURCE_ZYNTHIUM_BAR, amount: 20, external: 1}, {resource: RESOURCE_METAL, amount: 100, external: 1}], needAmount: 700000},
            {product: RESOURCE_KEANIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_KEANIUM, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_KEANIUM, amount: 40000}],},
            {product: RESOURCE_ZYNTHIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_ZYNTHIUM, amount: 500, external: 1}], needAmount: 100},
        ]},
        {id: 7, factoryId:'5dc772c8d0aead9ee804a7b2', endProduct: [RESOURCE_OXIDANT, RESOURCE_ENERGY], produce:[
        ]},
        {id: 8, factoryId:'5dc767b5c3d7f45e06da5fdf', endProduct: [RESOURCE_REDUCTANT, /*RESOURCE_BATTERY*/], produce:[
            {product: RESOURCE_ENERGY, ingridients: [{resource: RESOURCE_BATTERY, amount: 50}], needAmount: 10000},
            {product: RESOURCE_REDUCTANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_HYDROGEN, amount: 500, external: 1}], needAmount: 50000},
            //{product: RESOURCE_BATTERY, ingridients: [{resource: RESOURCE_ENERGY, amount: 600}], needAmount: 100000, conditions: [{resource: RESOURCE_ENERGY, amount: 11900000}],},

        ]},
        {id: 9, factoryId:'5dc760f15e1d5e3ee99a3e03', endProduct: [RESOURCE_GHODIUM_MELT, RESOURCE_UTRIUM_BAR, RESOURCE_KEANIUM_BAR], produce:[
            {product: RESOURCE_GHODIUM_MELT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_GHODIUM, amount: 500, external: 1}], needAmount: 5000},
            {product: RESOURCE_UTRIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_UTRIUM, amount: 500, external: 1}], needAmount: 6000},
            {product: RESOURCE_UTRIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_UTRIUM, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_UTRIUM, amount: 20000}],},
            {product: RESOURCE_KEANIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_KEANIUM, amount: 500, external: 1}], needAmount: 200000,conditions: [{resource: RESOURCE_KEANIUM, amount: 40000}],},
        ]},
        {id: 10, factoryId:'5dc744196765c2767e172b09', endProduct: [RESOURCE_ZYNTHIUM_BAR,RESOURCE_FIXTURES, RESOURCE_EXTRACT, RESOURCE_CRYSTAL], produce:[
            {product: RESOURCE_FIXTURES, ingridients: [
                {resource: RESOURCE_ENERGY, amount: 8},
                {resource: RESOURCE_COMPOSITE, amount: 20, external: 1},
                {resource: RESOURCE_ALLOY, amount: 41, external: 1},
                {resource: RESOURCE_OXIDANT, amount: 161, external: 1},
            ], needAmount: 10},
            {product: RESOURCE_OXIDANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_OXYGEN, amount: 500, external: 1}], needAmount: 800,},
            {product: RESOURCE_EXTRACT, ingridients: [
                {resource: RESOURCE_ENERGY, amount: 16},
                {resource: RESOURCE_CONCENTRATE, amount: 10, external: 1},
                {resource: RESOURCE_CONDENSATE, amount: 30, external: 1},
                {resource: RESOURCE_OXIDANT, amount: 60, external: 1},
            ], needAmount: 10},
            {product: RESOURCE_CRYSTAL, ingridients: [
                {resource: RESOURCE_LEMERGIUM_BAR, amount: 6, external: 1},
                {resource: RESOURCE_KEANIUM_BAR, amount: 6, external: 1},
                {resource: RESOURCE_PURIFIER, amount: 6, external: 1},
                {resource: RESOURCE_ENERGY, amount: 45},
            ], needAmount: 300,},
            {product: RESOURCE_LEMERGIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_LEMERGIUM, amount: 500, external: 1}], needAmount: 100},
            {product: RESOURCE_KEANIUM_BAR,   ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_KEANIUM,   amount: 500, external: 1}], needAmount: 100},
            {product: RESOURCE_PURIFIER,      ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_CATALYST,  amount: 500, external: 1}], needAmount: 100},
            {product: RESOURCE_ZYNTHIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_ZYNTHIUM, amount: 500, external: 1}], needAmount: 5000},
            {product: RESOURCE_ZYNTHIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_ZYNTHIUM, amount: 500, external: 1}], needAmount: 500000, conditions: [{resource: RESOURCE_ZYNTHIUM, amount: 40000}],},
        ]},
        {id: 11, factoryId:'5dc77c499010252091d474d8', endProduct: [RESOURCE_LEMERGIUM_BAR, RESOURCE_OXIDANT], produce:[
            {product: RESOURCE_LEMERGIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_LEMERGIUM, amount: 500, external: 1}], needAmount: 300000, conditions: [{resource: RESOURCE_LEMERGIUM, amount: 60000}],},
            {product: RESOURCE_OXIDANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_OXYGEN, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_OXYGEN, amount: 60000}],},
        ]},
        {id: 12, factoryId:'5e09c6a219e0279c4eaf03fb', endProduct: [RESOURCE_LEMERGIUM_BAR], produce:[
            {product: RESOURCE_LEMERGIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_LEMERGIUM, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_LEMERGIUM, amount: 30000}],},
        ]},
        {id: 13, factoryId: '5e15d805625f3abda8ba9bd6',  endProduct: [RESOURCE_LEMERGIUM_BAR], produce:[
            {product: RESOURCE_LEMERGIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_LEMERGIUM, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_LEMERGIUM, amount: 60000}],},
        ]},
        {id: 14, factoryId: '5e205177625f3a6c58c003b4',  endProduct: [RESOURCE_KEANIUM_BAR], produce:[
            {product: RESOURCE_KEANIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_KEANIUM, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_KEANIUM, amount: 60000}],},
        ]},
        {id: 15, factoryId: '5e2fa5fd5625c54343495026',  endProduct: [RESOURCE_OXIDANT], produce:[
            {product: RESOURCE_OXIDANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_OXYGEN, amount: 500, external: 1}], needAmount: 15000},
        ]},
        {id: 16, factoryId:'5e4b2abc82ec2664e98b7f44', endProduct: [RESOURCE_TUBE, /*RESOURCE_REDUCTANT,*/ RESOURCE_COMPOSITE, RESOURCE_CONCENTRATE], produce:[
            {product: RESOURCE_TUBE, ingridients: [
                {resource: RESOURCE_ENERGY, amount: 8},
                {resource: RESOURCE_ZYNTHIUM_BAR, amount: 16, external: 1},
                {resource: RESOURCE_ALLOY, amount: 40, external: 1}
            ], needAmount: 40},
            {product: RESOURCE_COMPOSITE, ingridients: [
                {resource: RESOURCE_ENERGY, amount: 20},
                {resource: RESOURCE_UTRIUM_BAR, amount: 20,external: 1},
                {resource: RESOURCE_ZYNTHIUM_BAR, amount: 20,external: 1}
            ], needAmount: 2000},
            {product: RESOURCE_CONCENTRATE, ingridients: [
                {resource: RESOURCE_ENERGY, amount: 12},
                {resource: RESOURCE_KEANIUM_BAR, amount: 15, external: 1},
                {resource: RESOURCE_REDUCTANT, amount: 54, external: 1},
                {resource: RESOURCE_CONDENSATE, amount: 30, external: 1}
            ], needAmount: 40},
            {product: RESOURCE_ZYNTHIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_ZYNTHIUM, amount: 500, external: 1}], needAmount: 100},
            {product: RESOURCE_KEANIUM_BAR, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_KEANIUM, amount: 500, external: 1}], needAmount: 100},
            {product: RESOURCE_REDUCTANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_HYDROGEN, amount: 500, external: 1}], needAmount: 1200,},
            //{product: RESOURCE_REDUCTANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_HYDROGEN, amount: 500, external: 1}], needAmount: 100000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 60000}],},

            //{product: RESOURCE_ALLOY, ingridients: [{resource: RESOURCE_ENERGY, amount: 40}, {resource: RESOURCE_ZYNTHIUM_BAR, amount: 20}, {resource: RESOURCE_METAL, amount: 100, external: 1}], needAmount: 1000},
            //{product: RESOURCE_REDUCTANT, ingridients: [{resource: RESOURCE_ENERGY, amount: 200}, {resource: RESOURCE_HYDROGEN, amount: 500, external: 1}], needAmount: 10000},
            //{product: RESOURCE_BATTERY, ingridients: [{resource: RESOURCE_ENERGY, amount: 600}], needAmount: 1000},
        ]},
        {id: 17, endProduct: [RESOURCE_LEMERGIUM_BAR,RESOURCE_REDUCTANT,RESOURCE_OXIDANT, RESOURCE_UTRIUM_BAR], produce:[
            {product: RESOURCE_LEMERGIUM_BAR, needAmount: 1000000, conditions: [{resource: RESOURCE_LEMERGIUM, amount: 90000}],},
            {product: RESOURCE_REDUCTANT, needAmount: 500000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 30000}],},
            {product: RESOURCE_OXIDANT, needAmount: 500000, conditions: [{resource: RESOURCE_OXYGEN, amount: 20000}],},
            {product: RESOURCE_UTRIUM_BAR, needAmount: 15000, conditions: [{resource: RESOURCE_UTRIUM, amount: 4999}],},
        ]},
        {id: 18, endProduct: [RESOURCE_REDUCTANT], produce:[
            {product: RESOURCE_REDUCTANT, needAmount: 500000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 60000}],},
        ]},
        {id: 19, endProduct: [RESOURCE_UTRIUM_BAR], produce:[
            {product: RESOURCE_UTRIUM_BAR, needAmount: 500000, conditions: [{resource: RESOURCE_UTRIUM, amount: 60000}],},
        ]},
        {id: 20, endProduct: [RESOURCE_PURIFIER], produce:[
            {product: RESOURCE_PURIFIER, needAmount: 500000, conditions: [{resource: RESOURCE_CATALYST, amount: 60000}],},
        ]},
        {id: 21, endProduct: [RESOURCE_REDUCTANT], produce:[
            {product: RESOURCE_REDUCTANT, needAmount: 500000, conditions: [{resource: RESOURCE_HYDROGEN, amount: 60000}],},
        ]},
        {id: 22, endProduct: [RESOURCE_OXIDANT], produce:[
            {product: RESOURCE_OXIDANT, needAmount: 500000, conditions: [{resource: RESOURCE_OXYGEN, amount: 60000}],},
        ]},


    ],
    sectorAttackers: [
        {id: 0, creeps: {}},
        {id: 1, creeps: {atacker:0, hunter: 1}, place: {room: "E78N53", posx: 26, posy: 4,  flag: 'FlagAttack1'}, qwadrant: 1},
        {id: 2, creeps: {atacker:0, hunter: 2}, place: {room: "E76N55", posx: 31, posy: 43, flag: 'FlagAttack2'}, qwadrant: 1},
        {id: 3, creeps: {hunter:1}, place: {room: "E79N59", posx: 4, posy: 21, flag: 'FlagAttack3'}, qwadrant: 1},
        {id: 4, creeps: {atacker:1}, place: {room: "E59N46", posx: 8, posy: 28, flag: 'FlagAttack4'}, qwadrant: 2},
        {id: 5, creeps: {atacker:1}, place: {room: "E54N49", posx: 44, posy: 30, flag: 'FlagAttack5'}, qwadrant: 2},
        {id: 6, creeps: {atacker:1}, place: {room: "E52N46", posx: 26, posy: 24, flag: 'FlagAttack6'}, qwadrant: 2},
        {id: 7, creeps: {atacker:1, hunter: 0}, place: {room: "E71N56", posx: 44, posy: 18, flag: 'FlagAttack7'}, qwadrant: 1},
        {id: 8, creeps: {atacker:1, hunter: 0}, place: {room: "E52N41", posx: 12, posy: 5, flag: 'FlagAttack8'}, qwadrant: 2},
    ],
    sectorCreeps: [
        {id: 0, creeps: {}},
        {id: 1, creeps: {miner: 3, supertransporter: 3 }},
        {id: 2, creeps: {miner: 1, supertransporter: 1 }},
        {id: 3, creeps: {miner: 3, supertransporter: 7, superharvester: 1}}, //E85N55
        {id: 4, creeps: {miner: 2, supertransporter: 2 , superharvester: 0}}, //metal
        {id: 5, creeps: {miner: 2, supertransporter: 2 }},
        {id: 6, creeps: {miner: 2, supertransporter: 1 }},
        {id: 7, creeps: {miner: 4, supertransporter: 3}},
        {id: 8, creeps: {miner: 2, supertransporter: 1 }},
        {id: 9, creeps: {miner: 2, supertransporter: 2 }},
        {id: 10, creeps:{miner: 4, supertransporter: 2 }},
        {id: 11, creeps:{miner: 2, supertransporter: 1 }},
        {id: 12, creeps:{miner: 1, supertransporter: 1 }},
        {id: 13, creeps:{miner: 1, supertransporter: 1}},
        {id: 14, creeps:{miner: 1, supertransporter: 1, superharvester: 1}}, //E84N54
        {id: 15, creeps:{miner: 1, supertransporter: 1,  superharvester: 0 }}, //metal
        {id: 16, creeps:{miner: 1, supertransporter: 1 }},
        {id: 17, creeps:{miner: 2, supertransporter: 2, superharvester: 0}},
        {id: 18, creeps:{miner: 1, supertransporter: 1 }},
        {id: 19, creeps:{miner: 1, supertransporter: 1 }},
        {id: 20, creeps:{miner: 1, supertransporter: 1 }},
        {id: 21, creeps:{miner: 3, supertransporter: 4 }},
        {id: 22, creeps:{miner: 2, supertransporter: 2 ,  superharvester: 0 }}, //metal
        {id: 23, creeps:{miner: 3, supertransporter: 4}},
        {id: 24, creeps:{miner: 1, supertransporter: 1, superharvester: 1}}, //E85N54
        {id: 25, creeps:{miner: 2, supertransporter: 4}},
        {id: 26, creeps:{miner: 3, supertransporter: 4, superharvester: 1}}, //E86N56
        {id: 27, creeps:{miner: 3, supertransporter: 3, superharvester: 1}}, //E85N56
        {id: 28, creeps:{miner: 3, supertransporter: 4, superharvester: 1}}, //E86N55
        {id: 29, creeps:{miner: 3, supertransporter: 5 + ((Game.time<40262837+3000)?3:0), superharvester: 0}},
        {id: 30, creeps:{miner: 1, supertransporter: 1}},
        {id: 31, creeps:{miner: 1, supertransporter: 1}},
        {id: 32, creeps:{miner: 1, supertransporter: 1, superharvester: 0}}, //metal e85n57!
        {id: 33, creeps:{miner: 2, supertransporter: 1}},
        {id: 34, creeps:{miner: 1, supertransporter: 1}},
        {id: 35, creeps:{miner: 2, supertransporter: 2}},
        {id: 36, creeps:{miner: 2, supertransporter: 2}},
        {id: 37, creeps:{miner: 0, supertransporter: 0}}, //E77N52
        {id: 38, creeps:{miner: 3, supertransporter: 3}, rooms: ['E76N54']}, //E77N54 sk
        {id: 39, creeps:{miner: 2, supertransporter: 1}}, //E88N58
        {id: 40, creeps:{miner: 1, supertransporter: 1}},
        {id: 41, creeps:{miner: 2, supertransporter: 2}}, //E88N57
        {id: 42, creeps:{miner: 3, supertransporter: 3, superharvester: 1}, rooms: ['E76N54','E76N55']}, //E76N55 sk H
        {id: 43, creeps:{miner: 3, supertransporter: 3}},
        {id: 44, creeps:{miner: 2, supertransporter: 1}},
        {id: 45, creeps:{miner: 2, supertransporter: 1}},
        {id: 46, creeps:{miner: 3, supertransporter: 3}},
        {id: 47, creeps:{miner: 4, supertransporter: 4}},
        {id: 48, creeps:{miner: 4, supertransporter: 3}},
        {id: 49, creeps:{miner: 3, supertransporter: 2}},
        {id: 50, creeps:{miner: 2, supertransporter: 1}},
        {id: 51, creeps:{miner: 2, supertransporter: 1}},
        {id: 52, creeps:{miner: 7, supertransporter: 6}}, 
    ],
    depositHarvesting: {
        // 'E86N53': { depositRooms: [
        //     'E80N50', 'E80N51', 'E80N52', 'E80N53', 'E80N54', 'E80N55', 'E80N56', 'E80N57', 'E80N58', 'E80N59', 'E80N60',
        //     'E90N50', 'E90N51', 'E90N52', 'E90N53', 'E90N54', 'E90N55', 'E90N56', 'E90N57', 'E90N58', 'E90N59', 'E90N60',
        //     'E81N50', 'E82N50', 'E83N50', 'E84N50', 'E85N50', 'E86N50', 'E87N50', 'E88N50', 'E89N50',
        //     'E81N60', 'E82N60', 'E83N60', 'E84N60', 'E85N60', 'E86N60', 'E87N60', 'E88N60', 'E89N60',
        // ], roomToHarvestDeposits: ['E81N54', 'E81N58', 'E79N52', 'E79N54', 'E85N57', /*'E87N56', */'E81N53', 'E89N54', 'E87N58'],},
        'E77N54': { depositRooms: [
            'E75N60','E76N60','E77N60','E78N60','E79N60','E80N60',
            'E80N59','E80N58','E80N57','E80N56','E80N55','E80N54','E80N53','E80N52','E80N51','E80N50',
            'E79N50',
            'E70N59','E70N58','E70N57','E70N56','E70N55','E70N54','E70N53',
        ], roomToHarvestDeposits: ['E79N52', 'E79N54', 'E79N59', 'E71N56',],},
        'E52N46': { depositRooms: [
            'E60N49','E60N48','E60N47','E60N46','E60N45','E60N44','E60N43',
            'E51N50','E52N50','E53N50','E54N50','E55N50','E56N50','E57N50',
            'E50N49','E50N48','E50N47','E50N46','E50N45','E50N44','E50N43',
            'E50N41','E50N40','E51N40','E52N40','E53N40','E54N40','E55N40','E56N40',
        ], roomToHarvestDeposits: ['E52N46', 'E59N46', 'E54N49', 'E52N41',],},
    },
    powerHarvesting: {
        //'E83N58': {sector: 0, powerRooms: ['E83N60', 'E82N60', 'E81N60', 'E80N60','E80N59', 'E80N58', 'E80N57', 'E80N56', 'E80N55', 'E80N54', 'E80N53',]},
        'E79N52': {sector: 1, powerRooms: ['E79N50','E80N51','E80N52','E80N53','E80N54','E80N55',]},
        'E79N54': {sector: 2, powerRooms: ['E80N52','E80N53','E80N54','E80N55','E80N56','E80N57',]},
        'E79N59': {sector: 3, powerRooms: [/*'E80N56','E80N57',*/'E80N58','E80N59','E80N60','E79N60','E79N60','E78N60','E77N60','E76N60','E75N60',]},
        'E71N56': {sector: 4, powerRooms: ['E70N59','E70N58','E70N57','E70N56','E70N55','E70N54','E70N53',]},
        'E59N46': {sector: 5, powerRooms: ['E60N49','E60N48','E60N47','E60N46','E60N45','E60N44','E60N43',]},
        'E54N49': {sector: 6, powerRooms: ['E51N50','E52N50','E53N50','E54N50','E55N50','E56N50','E57N50',]},
        'E52N46': {sector: 7, powerRooms: ['E50N49','E50N48','E50N47','E50N46','E50N45','E50N44','E50N43',]},
        'E52N41': {sector: 8, powerRooms: ['E50N41','E50N40','E51N40','E52N40','E53N40','E54N40','E55N40',]},
    },
    teamAssaults: [
        {id: 0, creeps: {dismantler: 0, assault:0, defender:0, healer: 0, transporter: 0, transporter2: 0 }, place: {room: "E83N54", posx: 26, posy: 10}},
        {id: 1, creeps: {}},
        {id: 2, creeps: {assault:6}, place: {room: "E76N52", posx: 32, posy: 37}},
        {id: 3, creeps: {dismantler:0, healer: 0}, place: {room: "E81N53", posx: 43, posy: 42}},
    ],
    teamMassRangers: {
        0: {id: 0, creeps: {}, },
        1: {id: 1, creeps: {massRanger: roleMassRanger.getRangerCount(1)}, },
        2: {id: 2, creeps: {massRanger: roleMassRanger.getRangerCount(2)}, },
    },
    strongholdCheck: {
        'E83N54': {
            rooms: ['E84N54','E85N54','E86N54','E84N55','E85N55','E86N55','E84N56','E85N56','E86N56'],
            atackerRoom: 'E83N54',
            qwadrant: 0,
        },
        'E77N54': {
            rooms: ['E74N54','E75N54','E76N54','E74N55','E75N55','E76N55','E74N56','E75N56','E76N56',],
            atackerRoom: 'E77N54',
            qwadrant: 1,
        },
        'E59N46': {
            rooms: ['E54N46','E55N46','E56N46','E54N45','E55N45','E56N45','E54N44','E55N44','E56N44',],
            atackerRoom: 'E59N46',
            qwadrant: 2,
        },
    },
    manageResources: {
        // 'E81N58': {[RESOURCE_GHODIUM]: {conditionsOr: [{res: RESOURCE_GHODIUM, amount: 15000},], maxPrice: 1.100, buyAmount: 20000}}, 
        'E54N49': {[RESOURCE_UTRIUM]: {conditionsOr: [{res: RESOURCE_UTRIUM, amount: 30000},], maxPrice: 75.700, buyAmount: 30000}},
        // 'E81N54': {[RESOURCE_ZYNTHIUM]: {conditionsOr: [{res: RESOURCE_ZYNTHIUM, amount: 10000}, /*{res: RESOURCE_ZYNTHIUM_BAR, amount: 1000}*/], maxPrice: 0.100, buyAmount: 30000}},
        'E71N56': {[RESOURCE_OXYGEN]: {conditionsOr: [{res: RESOURCE_OXYGEN, amount: 10000}, /*{res: RESOURCE_OXIDANT, amount: 1000}*/], maxPrice: 85.100, buyAmount: 30000}},
        // 'E86N53': {[RESOURCE_HYDROGEN]: {conditionsOr: [{res: RESOURCE_HYDROGEN, amount: 10000}, /*{res: RESOURCE_REDUCTANT, amount: 1000}*/], maxPrice: 0.500, buyAmount: 30000}},
        'E79N54': {[RESOURCE_CATALYST]: {conditionsOr: [{res: RESOURCE_CATALYST, amount: 30000}], maxPrice: 2.100, buyAmount: 15000}},
        'E77N54': {
            [RESOURCE_OPS]: {conditionsOr: [{res: RESOURCE_OPS, amount: 10000}], maxPrice: 20.250, buyAmount: 6000},
            [RESOURCE_HYDROGEN]: {conditionsOr: [{res: RESOURCE_HYDROGEN, amount: 10000},], maxPrice: 40.500, buyAmount: 30000},
            [RESOURCE_POWER]: {conditionsOr: [{res: RESOURCE_POWER, amount: 50000}], maxPrice: 295.950, buyAmount: 20000},
        },
        'E79N52': {
            [RESOURCE_KEANIUM]: {conditionsOr: [{res: RESOURCE_KEANIUM, amount: 10000}], maxPrice: 29.250, buyAmount: 10000},
            [RESOURCE_ZYNTHIUM]: {conditionsOr: [{res: RESOURCE_ZYNTHIUM, amount: 10000}, /*{res: RESOURCE_ZYNTHIUM_BAR, amount: 1000}*/], maxPrice: 0.100, buyAmount: 30000}
        },
        'E79N59': {
            [RESOURCE_OPS]: {conditionsOr: [{res: RESOURCE_OPS, amount: 10000}], maxPrice: 20.250, buyAmount: 6000},
            [RESOURCE_LEMERGIUM]: {conditionsOr: [{res: RESOURCE_LEMERGIUM, amount: 20000}], maxPrice: 15.250, buyAmount: 15000},
            [RESOURCE_OXYGEN]: {conditionsOr: [{res: RESOURCE_OXYGEN, amount: 25000}, ], maxPrice: 85.100, buyAmount: 30000},
            [RESOURCE_ZYNTHIUM]: {conditionsOr: [{res: RESOURCE_ZYNTHIUM, amount: 25000}, ], maxPrice: 23.100, buyAmount: 30000},
        },
        'E59N46': {[RESOURCE_CATALYZED_GHODIUM_ACID]: {conditionsOr: [{res: RESOURCE_CATALYZED_GHODIUM_ACID, amount: 30000}], maxPrice: 20.250, buyAmount: 6000},},
        'E52N41': {[RESOURCE_GHODIUM_ACID]: {conditionsOr: [{res: RESOURCE_GHODIUM_ACID, amount: 120000}], maxPrice: 20.250, buyAmount: 30000},}, 
        
    },
    // clone: function(object) {
    //     // return JSON.parse(JSON.stringify(object));
    //     let cloneObject = null;
    //     if (Array.isArray(object)) {
    //         require('profiler').start('cloneArrSlice');
    //         cloneObject = object.slice(0);
    //         require('profiler').end('cloneArrSlice');
    //         require('profiler').start('cloneArrMap');
    //         cloneObject = object.map(a => Object.assign({}, a));
    //         require('profiler').end('cloneArrMap');
    //     } else {
    //         require('profiler').start('cloneObjAssign');
    //         cloneObject = Object.assign({}, object);    
    //         require('profiler').end('cloneObjAssign');
    //     }
        
    //     require('profiler').start('cloneArrParse');
    //     let cloneObjectParse = JSON.parse(JSON.stringify(object));
    //     require('profiler').end('cloneArrParse');
    //     if (JSON.stringify(cloneObjectParse) != JSON.stringify(cloneObject)) {
    //         console.log('Error clone object1', JSON.stringify(cloneObjectParse));
    //         console.log('Error clone object2', JSON.stringify(cloneObject));
    //     } else {
    //         //console.log('Success clone object1', JSON.stringify(cloneObjectParse));
    //         //console.log('Success clone object2', JSON.stringify(cloneObject));
    //     }
        
    //     return cloneObjectParse;
    // },
    
    // clone: function(object) {
    //     // return JSON.parse(JSON.stringify(object)); // 0.23
    //     let cloneObject = null;
    //     if (Array.isArray(object)) {
    //         // cloneObject = object.slice(0); //0.02
    //         cloneObject = object.map(a => Object.assign({}, a)); //0.04
    //     } else {
    //         cloneObject = Object.assign({}, object); //0.02    
    //     }
    //     return cloneObject;
    // },

    clone: function(object) {
        return require('fastest-json-copy').copy(object);
    },


    getCfg: function () {

        //this.labConfig[1].reaction = []; //atack
        this.labConfig[2].reaction = [];
        //this.labConfig[3].reaction = [];
        //this.labConfig[4].reaction = []; //ghodium
        //this.labConfig[5].reaction = []; //XGHO2 def
        //this.labConfig[6].reaction = []; //XZHO2 move
        //this.labConfig[7].reaction = []; //range
        //this.labConfig[8].reaction = [];
        //this.labConfig[9].reaction = [];
        //this.labConfig[12].reaction = []; //LH


        if (0) {
            ['E87N56','E85N57','E86N53',].forEach(roomName => {
                Game.rooms[roomName].memory.resetLab = 1;
                let roomInfo = _.find( this.myRooms, {roomName: roomName});
                if (roomInfo && roomInfo.lab) {
                    roomInfo.creeps.suplier = 2;
                    this.labConfig[roomInfo.lab].reaction = [];
                    this.labConfig[roomInfo.lab].labs = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_LEMERGIUM_HYDRIDE ]
                }
            });
        }

        if (0) {
            ['E81N58',].forEach(roomName => {
                //Game.rooms[roomName].memory.resetLab = 1;
                let roomInfo = _.find( this.myRooms, {roomName: roomName});
                if (roomInfo && roomInfo.lab) {
                    this.labConfig[roomInfo.lab].reaction = [];
                    this.labConfig[roomInfo.lab].labs = [RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ACID ]
                }
            });
        }


        //E87N56
        //  Game.rooms.E87N56.memory.resetLab = 1;
        //  this.labConfig[9].reaction = [];
        //  this.labConfig[9].labs = [];
        //  this.labConfig[9].labs = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ]
        
        //E85N57
        //  Game.rooms.E85N57.memory.resetLab = 1;
        //  this.labConfig[11].reaction = [];
        //  this.labConfig[11].labs = [];
        //  this.labConfig[11].labs = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ]
        
        //E86N53
        // Game.rooms.E86N53.memory.resetLab = 1;
        //  this.labConfig[8].reaction = [];
        //  this.labConfig[8].labs = [];
        //  this.labConfig[8].labs = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ]

        if (0) { 
            //send energy to target room
            const targetRoom = 'E79N52';// 'E77N54';
            for(const myRoom of this.myRooms) {
                const room = Game.rooms[myRoom.roomName];
                if (room && room.terminal && room.terminal.store[RESOURCE_ENERGY]>40000 && room.name != targetRoom){
                    room.terminal.send(RESOURCE_ENERGY, 15000, targetRoom);
                    if (global.VERBOSE_CPU) console.log('send energy',15000, targetRoom);
                }
            }
        }

       
        if (0){ // tmp!!
            let helpRoom = Game.rooms['E54N49'];
            if (1 && helpRoom &&  helpRoom.terminal && helpRoom.terminal.store[RESOURCE_ENERGY] < 60000) {
                //send energy to target room
                const targetRoom = helpRoom.name;
                for(const myRoom of this.myRooms) {
                    const room = Game.rooms[myRoom.roomName];
                    if (room && room.terminal && room.terminal.store[RESOURCE_ENERGY]>40000 && room.storage && room.storage.store[RESOURCE_ENERGY]>300000 && room.name != targetRoom){
                        room.terminal.send(RESOURCE_ENERGY, 15000, targetRoom);
                        if (global.VERBOSE_CPU) console.log('send energy',15000, targetRoom);
                    }
                }
            }
        }
        
        if (1){
            let helpRooms = ['E79N52',];
            for (const helpRoomName of helpRooms) {
                let terminalUsed = [];
                let helpRoom = Game.rooms[helpRoomName];
                if (1 && helpRoom && helpRoom.storage && helpRoom.terminal && helpRoom.storage.store[RESOURCE_ENERGY] < 300000 && helpRoom.terminal.store[RESOURCE_ENERGY] < 60000) {
                    //send energy to target room
                    const targetRoom = helpRoom.name;
                    for(const myRoom of this.myRooms) {
                        if (terminalUsed.includes(myRoom.roomName)) continue;
                        const room = Game.rooms[myRoom.roomName];
                        if (room && room.terminal && !room.terminal.cooldown && room.terminal.store[RESOURCE_ENERGY]>=40000 && room.storage && room.storage.store[RESOURCE_ENERGY]>250000 && room.name != targetRoom && room.name !='E44N38_' && !helpRooms.includes(room.name)){
                            if (room.terminal.send(RESOURCE_ENERGY, 15000, targetRoom) == OK) {
                                terminalUsed.push(room.name);
                            }
                            if (global.VERBOSE_CPU) console.log('send energy',15000, targetRoom);
                        }
                    }
                }
            }
        }

        let myRooms = this.clone(this.myRooms);
        // if (Game.cpu.bucket < 6000) {
        //     myRooms.forEach(myRoom => myRoom.creeps.wallbuilder = 0);
        // }


        return [myRooms, this.clone(this.skRooms), this.clone(this.labConfig), this.clone(this.factoryConfig), this.clone(this.sectorAttackers), this.clone(this.sectorCreeps), this.clone(this.depositHarvesting), 
            this.clone(this.powerHarvesting), this.clone(this.teamAssaults), this.clone(this.teamMassRangers), this.clone(this.strongholdCheck), this.clone(this.manageResources),];
    },
    
    changeCfgForStronghold: function (stRoom, myRooms, sectorAttackers) {
        let changing = true;
        if (stRoom == 'E76N55'){
            sectorAttackers[2] = {id: 7, creeps: {atacker:0, hunter: 2}, place: {room: "E76N54", posx: 36, posy: 11, flag: 'FlagAttack2'}}; 
        } else if (stRoom == 'E76N54'){
            sectorAttackers[2] = {id: 7, creeps: {atacker:0, hunter: 0}, place: {room: "E76N54", posx: 36, posy: 11, flag: 'FlagAttack2'}}; 
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
        'E81N58': [
            [3,35,100],[3,34,100],[2,34,100],
            [1,28,100],[2,28,100],[2,27,100],[2,26,100],[2,25,100],[2,24,100],[2,23,100],[2,22,100],[2,21,100],[2,20,100],[1,20,100],
            [20,2,100],[20,1,100],
            [28,2,100],[29,2,100],[30,2,100],[31,2,100],[32,2,100],[33,2,100],[34,2,100],
        ],
        'E83N54': [
            [45,18, 10000], //wall
            [3,17,1000],[3,18,1000],[2,14,1000],[3,14,1000],
        ],
        'E79N52': [
            [17,21, 10000], //wall
        ],
        'E81N55': [
            [24,19],[24,18],[24,17],[24,16],
        ],
        'E87N56': [
            [28,18,1000],
        ],
        'E89N54': [
             [39,27],[40,27],[41,27],[42,27],[35,26],[34,26],[29,26],[28,26],[20,47],[19,47],[3,38],[3,39],[3,37],[29,37],[29,38],[27,35],[26,34],[26,35],[25,34],[25,33],[24,32],[24,33],[23,32],[23,31],
        ],
        'E79N59': [
            [43,28],[38,23],[41,27],[37,24],[41,25],[38,27],[37,26],[32,24],[32,23],[32,22],[32,21],[32,25],[32,20],[34,18],[36,18],[33,18],[37,18],[32,19],[32,18],[38,18],[39,18],[46,26],[40,18],[46,27],[46,28],[41,18],[46,29],[46,25],[42,18],[46,30],[43,18],[46,22],[44,18],[46,23],[46,24],[45,18],[45,19],[46,21],[46,19],[46,20],[46,31],[45,31],[44,31],[32,27],[32,26],[32,28],[32,29],[32,31],[32,30],[37,32],[36,32],[35,32],[34,32],[33,32],[32,32],
        ],
        'E59N46': [
            [18,20],[11,19],[7,19],[12,19],[12,22],[9,21],[12,26],[13,26],[14,26],[15,26],[16,26],[17,26],[8,25],[17,20],[7,25],[16,20],[18,26],[6,25],[5,25],[19,23],[19,22],[19,21],[4,25],[19,20],[2,21],[2,16],[2,22],[2,17],[2,23],[2,18],[2,19],[2,20],[14,14],[2,15],[14,13],[2,14],[2,13],[13,13],[10,12],[13,12],[11,12],[12,12],
        ],
        'E54N49': [
            [39,9],[30,9],[34,9],[34,7],[35,8],[32,7],[24,13],[23,1],[24,14],[23,2],[25,14],[23,3],[30,1],[23,4],[23,7],[30,2],[23,8],[31,2],[23,5],[23,9],[32,2],[23,10],[23,6],[23,11],[33,2],[23,12],[23,13],[34,2],[35,2],[25,15],[26,15],[28,15],[27,15],[29,15],[39,6],[39,7],[39,8],[36,2],[30,15],[31,15],[37,2],[38,2],[32,15],[38,13],[39,10],[39,13],[39,12],[35,15],[39,11],[36,15],[37,14],[38,14],[37,15],
        ],
        'E52N46': [
            [15,28],[15,25],[19,23],[20,22],[22,23],[6,32],[22,22],[6,31],[6,30],[22,21],[6,29],[14,19],[15,19],[19,41],[19,40],[19,42],[17,26],
        ],
        'E71N56': [
            [42,34],[40,30],[40,33],[41,29],[38,35],[37,31],[42,32],[34,41],[35,41],[33,41],[32,41],[31,41],[30,41],[30,31],[30,32],[31,30],[32,30],[30,30],[34,23],[34,24],[39,23],[38,23],[40,23],[41,23],[44,25],[42,23],[45,29],[44,26],[45,31],[45,30],[45,35],[45,36],[45,37],[45,40],[45,41],[43,25],[43,24],[42,24],
        ],
        'E52N41': [
            [20,24],[21,23],[20,27],[22,22],[22,25],[19,25],[23,21],[21,30],[22,30],[23,30],[24,30],[26,30],[25,30],[27,30],[28,29],[28,30],[20,30],[31,26],[16,19],[16,18],[16,20],[24,17],[23,17],[21,17],[22,17],[20,17],[17,17],[18,17],[17,18],[19,17],[14,27],[14,28],[14,26],[30,26],[32,25],[31,25],
        ],
    },
    
    getObstacles: {
        'E79N59': [{"x":37,"y":33},{"x":36,"y":33},{"x":35,"y":33},{"x":34,"y":33},{"x":33,"y":33},{"x":32,"y":33},{"x":31,"y":33},{"x":31,"y":32},{"x":31,"y":31},{"x":31,"y":30},{"x":31,"y":29},{"x":31,"y":28},{"x":31,"y":27},{"x":31,"y":26},{"x":31,"y":25},{"x":31,"y":24},{"x":31,"y":23},{"x":31,"y":22},{"x":31,"y":21},{"x":31,"y":20},{"x":31,"y":19},{"x":31,"y":18},{"x":31,"y":17},{"x":32,"y":17},{"x":33,"y":17},{"x":37,"y":17},{"x":38,"y":17},{"x":39,"y":17},{"x":40,"y":17},{"x":41,"y":17},{"x":42,"y":17},{"x":43,"y":17},{"x":44,"y":17},{"x":45,"y":17},{"x":46,"y":17},{"x":46,"y":18},{"x":47,"y":18},{"x":47,"y":19},{"x":47,"y":20},{"x":47,"y":21},{"x":47,"y":22},{"x":47,"y":23},{"x":47,"y":24},{"x":47,"y":25},{"x":47,"y":26},{"x":47,"y":27},{"x":47,"y":28},{"x":47,"y":29},{"x":47,"y":30},{"x":47,"y":31},{"x":47,"y":32},{"x":46,"y":32},{"x":45,"y":32},{"x":44,"y":32}],
        'E59N46': [{"x":1,"y":12},{"x":1,"y":13},{"x":1,"y":14},{"x":1,"y":15},{"x":1,"y":16},{"x":1,"y":17},{"x":1,"y":18},{"x":1,"y":19},{"x":1,"y":20},{"x":1,"y":21},{"x":1,"y":22},{"x":1,"y":23},{"x":1,"y":24},{"x":3,"y":26},{"x":4,"y":26},{"x":5,"y":26},{"x":6,"y":26},{"x":7,"y":26},{"x":8,"y":26},{"x":12,"y":27},{"x":13,"y":27},{"x":14,"y":27},{"x":15,"y":27},{"x":16,"y":27},{"x":17,"y":27},{"x":18,"y":27},{"x":19,"y":27},{"x":20,"y":23},{"x":20,"y":22},{"x":20,"y":21},{"x":20,"y":20},{"x":20,"y":19},{"x":19,"y":19},{"x":18,"y":19},{"x":17,"y":19},{"x":15,"y":14},{"x":15,"y":13},{"x":15,"y":12},{"x":14,"y":12},{"x":14,"y":11},{"x":13,"y":11},{"x":12,"y":11},{"x":11,"y":11}],
        'E54N49': [{"x":22,"y":1},{"x":22,"y":2},{"x":22,"y":3},{"x":22,"y":4},{"x":22,"y":5},{"x":22,"y":6},{"x":22,"y":7},{"x":22,"y":8},{"x":22,"y":9},{"x":22,"y":10},{"x":22,"y":11},{"x":22,"y":12},{"x":22,"y":13},{"x":22,"y":14},{"x":23,"y":14},{"x":23,"y":15},{"x":24,"y":15},{"x":24,"y":16},{"x":25,"y":16},{"x":26,"y":16},{"x":27,"y":16},{"x":28,"y":16},{"x":29,"y":16},{"x":30,"y":16},{"x":31,"y":16},{"x":35,"y":16},{"x":36,"y":16},{"x":37,"y":16},{"x":38,"y":16},{"x":38,"y":15},{"x":39,"y":15},{"x":39,"y":14},{"x":40,"y":14},{"x":40,"y":13},{"x":40,"y":12},{"x":40,"y":11},{"x":40,"y":10},{"x":40,"y":9},{"x":40,"y":8},{"x":40,"y":7},{"x":39,"y":2},{"x":39,"y":1},{"x":38,"y":1},{"x":37,"y":1},{"x":36,"y":1},{"x":35,"y":1},{"x":34,"y":1},{"x":33,"y":1},{"x":32,"y":1},{"x":31,"y":1}],
        'E52N46': [{"x":14,"y":18},{"x":15,"y":18},{"x":23,"y":23},{"x":23,"y":22},{"x":23,"y":21},{"x":20,"y":43},{"x":20,"y":42},{"x":20,"y":41},{"x":5,"y":31},{"x":5,"y":30},{"x":5,"y":29},{"x":5,"y":28}],
        'E71N56': [{"x":29,"y":42},{"x":30,"y":42},{"x":31,"y":42},{"x":32,"y":42},{"x":33,"y":42},{"x":34,"y":42},{"x":46,"y":41},{"x":46,"y":40},{"x":46,"y":39},{"x":46,"y":38},{"x":46,"y":37},{"x":46,"y":36},{"x":46,"y":35},{"x":46,"y":31},{"x":46,"y":30},{"x":46,"y":29},{"x":46,"y":28},{"x":45,"y":26},{"x":45,"y":25},{"x":45,"y":24},{"x":44,"y":24},{"x":44,"y":23},{"x":43,"y":23},{"x":43,"y":22},{"x":42,"y":22},{"x":41,"y":22},{"x":40,"y":22},{"x":39,"y":22},{"x":38,"y":22},{"x":33,"y":22},{"x":33,"y":23},{"x":33,"y":24},{"x":31,"y":29},{"x":30,"y":29},{"x":29,"y":29},{"x":29,"y":30},{"x":29,"y":31}],
        'E52N41': [{"x":13,"y":26},{"x":13,"y":27},{"x":13,"y":28},{"x":20,"y":31},{"x":21,"y":31},{"x":22,"y":31},{"x":23,"y":31},{"x":24,"y":31},{"x":25,"y":31},{"x":26,"y":31},{"x":27,"y":31},{"x":28,"y":31},{"x":29,"y":31},{"x":29,"y":30},{"x":31,"y":27},{"x":32,"y":27},{"x":32,"y":26},{"x":33,"y":26},{"x":15,"y":19},{"x":15,"y":18},{"x":15,"y":17},{"x":16,"y":17},{"x":16,"y":16},{"x":17,"y":16},{"x":18,"y":16},{"x":19,"y":16},{"x":20,"y":16},{"x":21,"y":16},{"x":22,"y":16},{"x":23,"y":16}],
    },
    
    sectorTargets: {
        0: {id: 0, targets: [],},
        6: {id: 6, targets: [
            {flag:'Flag29', id: '5836b9398b8b9619519f3620', koef: 0},
            {flag:'Flag29', id: '5836b9398b8b9619519f361f', koef: 0},
        ],},     
        7: {id: 7, targets: [
            {flag:'Flag36', id: '5836b9228b8b9619519f3414', koef: 0}, 
            {flag:'Flag36', id: '5836b9228b8b9619519f3416', koef: 0}, 
            {flag:'Flag37', id: '5836b90d8b8b9619519f3206', koef: 0},
            {flag:'Flag37', id: '5836b90d8b8b9619519f3207', koef: 0},
        ],},     
        10: {id: 10, targets: [
            {flag:'Flag31', id: '5836b9228b8b9619519f340d', koef: 0},
            {flag:'Flag31', id: '5836b9228b8b9619519f340e', koef: 0},
            {flag:'Flag32', id: '5836b9228b8b9619519f3412', koef: 0},
            {flag:'Flag32', id: '5836b9228b8b9619519f3411', koef: 0},
        ],},     
        11: {id: 11, targets: [
            {flag:'Flag30', id: '5836b9398b8b9619519f3626', koef: 0},
            {flag:'Flag30', id: '5836b9398b8b9619519f3628', koef: 0},
        ],},     
        37: {id: 37, targets: [
            {flag:'Flag37', id: '5836b90d8b8b9619519f3206', koef: 0},
            {flag:'Flag37', id: '5836b90d8b8b9619519f3207', koef: 0},
        ],},     
        38: {id: 38, targets: [
            {flag:'Flag97', id: '5836b8f18b8b9619519f2f18', koef: 0},
            {flag:'Flag98', id: '5836b8f18b8b9619519f2f1c', koef: 0},
            {flag:'Flag99', id: '5836b8f18b8b9619519f2f1b', koef: 0},
        ],},     
        42: {id: 42, targets: [
            {flag:'Flag105', id: '5836b8f08b8b9619519f2f15', koef: 0},
            {flag:'Flag106', id: '5836b8f08b8b9619519f2f0f', koef: 0},
            {flag:'Flag107', id: '5836b8f08b8b9619519f2f14', koef: 0},
        ],},     
        43: {id: 43, targets: [
            {flag:'Flag2', id: '5836b9218b8b9619519f33fd', koef: 0},
            {flag:'Flag3', id: '5836b90c8b8b9619519f31ee', koef: 0},
            {flag:'Flag3', id: '5836b90c8b8b9619519f31ef', koef: 0},
        ],},     
        44: {id: 44, targets: [
            {flag:'Flag20', id: '579faa7b0700be0674d310cb', koef: 0},
            {flag:'Flag20', id: '579faa7b0700be0674d310ca', koef: 0},
        ],},     
        45: {id: 45, targets: [
            {flag:'Flag23', id: '579faa6b0700be0674d30f4a', koef: 0},
            {flag:'Flag23', id: '579faa6b0700be0674d30f49', koef: 0},
        ],},     
        46: {id: 46, targets: [
            {flag:'Flag28', id: '579faa300700be0674d30953', koef: 0},
            {flag:'Flag33', id: '579faa3f0700be0674d30b77', koef: 0},
            {flag:'Flag33', id: '579faa3f0700be0674d30b78', koef: 0},
        ],},  
        47: {id: 47, targets: [
            {flag:'Flag34', id: '579faa200700be0674d3070b', koef: 0},
            {flag:'Flag34', id: '579faa200700be0674d30709', koef: 0},
            {flag:'Flag35', id: '579faa300700be0674d30955', koef: 0},
            {flag:'Flag35', id: '579faa300700be0674d30956', koef: 0},
        ],},     
        48: {targets: [
            {flag:'Flag38', id: '579fa9f00700be0674d30266', koef: 0},
            {flag:'Flag40', id: '579fa9f00700be0674d30268', koef: 0},
            {flag:'Flag41', id: '579fa9f00700be0674d3026a', koef: 0},
            {flag:'Flag41', id: '579fa9f00700be0674d3026c', koef: 0},
        ],},     
        49: {targets: [
            {flag:'Flag42', id: '579faa000700be0674d303ed', koef: 0},
            {flag:'Flag44', id: '579faa110700be0674d30579', koef: 0},
            {flag:'Flag44', id: '579faa110700be0674d30578', koef: 0},
        ],},     
        50: {targets: [
            {flag:'Flag62', id: '5836b89d8b8b9619519f24ed', koef: 0},
            {flag:'Flag62', id: '5836b89d8b8b9619519f24eb', koef: 0},
        ],},     
        51: {targets: [
            {flag:'Flag73', id: '5836b8898b8b9619519f22eb', koef: 0},
            {flag:'Flag73', id: '5836b8898b8b9619519f22ea', koef: 0},
        ],},     
        52: {targets: [
            {flag:'Flag78', id: '579faa010700be0674d303ff', koef: 0},
            {flag:'Flag78', id: '579faa010700be0674d303fe', koef: 0},
            {flag:'Flag81', id: '579faa010700be0674d303fb', koef: 0},
            {flag:'Flag85', id: '579faa120700be0674d30587', koef: 0},
            {flag:'Flag86', id: '579faa120700be0674d30588', koef: 0},
            {flag:'Flag89', id: '579faa120700be0674d3058d', koef: 0},
            {flag:'Flag89', id: '579faa120700be0674d3058c', koef: 0},
        ],},     
        
        
    },
    getSectorTargets: function(sectorId) {
        
       if (sectorId == undefined || !this.sectorTargets[sectorId]) {
           Game.notify('getSectorTargets error '+sectorId);
           return [];
       }
       return this.sectorTargets[sectorId].targets;
    },

};

module.exports = shardCfg;
