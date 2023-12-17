var shardCfg = {
    myRooms: [
    /* 0 */{roomName: 'E41N38', sector: [], atack_sector: 0, massRanger_team: 0, lab:2, factory: 0, creeps: {suplier: 1, miner: 2, transporter: 1, upgrader: 1, wallbuilder: 0, harvester: 0, filler: 0, deliver: 0},keepers: []},
    /* 1 *///{roomName: 'E41N39', sector: [], atack_sector: 0, massRanger_team: 0, lab:0, factory: 0, creeps: {helper:1, suplier: 0, miner: 0, transporter: 0, upgrader: 0, wallbuilder: 0, harvester: 0, filler: 0, deliver: 0},keepers: []},
    ],
    skRooms: [],
    labConfig: [
        {id: 0, labs: [], reaction: []},
        {id: 1, labs: [RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_GHODIUM_OXIDE,'endProduct','endProduct',RESOURCE_GHODIUM_OXIDE,RESOURCE_GHODIUM_OXIDE,RESOURCE_GHODIUM_OXIDE,RESOURCE_GHODIUM_OXIDE,RESOURCE_GHODIUM_OXIDE ], reaction: [[-2,3,4],[-5,3,4],[-6,3,4],[-7,3,4],[-8,3,4],[-9,3,4],]},
        {id: 2, labs: [RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_LEMERGIUM_ACID,RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID], reaction: []},
    ],
    factoryConfig: [
        {id: 0, factoryId:'', endProduct: [], produce:[]},
    ],
    sectorAttackers: [
        {id: 0, creeps: {}},
    ],
    sectorCreeps: [],
    depositHarvesting: {},
    powerHarvesting: {},
    teamAssaults: [],
    teamMassRangers: {
        0: {id: 0, creeps: {}, },
    },
    strongholdCheck: {},
    manageResources: {
        'E41N38': { //updateBuyPrices()
            // // [RESOURCE_CATALYZED_KEANIUM_ACID]: {conditionsOr: [{res: RESOURCE_CATALYZED_KEANIUM_ACID, amount: 30000}, ], maxPrice: 16.501, buyAmount: 30000},
            // // [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE]: {conditionsOr: [{res: RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, amount: 30000}, ], maxPrice: 12.501, buyAmount: 30000},
            // [RESOURCE_CATALYZED_GHODIUM_ACID]: {conditionsOr: [{res: RESOURCE_CATALYZED_GHODIUM_ACID, amount: 300000}, ], maxPrice: 45.501, buyAmount: 30000},
            // [RESOURCE_CATALYZED_LEMERGIUM_ACID]: {conditionsOr: [{res: RESOURCE_CATALYZED_LEMERGIUM_ACID, amount: 100000}, ], maxPrice: 15.501, buyAmount: 30000},
            [RESOURCE_ZYNTHIUM]: {conditionsOr: [{res: RESOURCE_ZYNTHIUM, amount: 200000}, ], maxPrice: 15.501, buyAmount: 30000},
            [RESOURCE_LEMERGIUM]: {conditionsOr: [{res: RESOURCE_LEMERGIUM, amount: 200000}, ], maxPrice: 15.501, buyAmount: 30000},
            [RESOURCE_UTRIUM]: {conditionsOr: [{res: RESOURCE_UTRIUM, amount: 200000}, ], maxPrice: 15.501, buyAmount: 30000},
            [RESOURCE_KEANIUM]: {conditionsOr: [{res: RESOURCE_KEANIUM, amount: 200000}, ], maxPrice: 15.501, buyAmount: 30000},
            [RESOURCE_CATALYST]: {conditionsOr: [{res: RESOURCE_CATALYST, amount: 200000}, ], maxPrice: 120.501, buyAmount: 30000},
            [RESOURCE_OXYGEN]: {conditionsOr: [{res: RESOURCE_OXYGEN, amount: 200000}, ], maxPrice: 15.501, buyAmount: 30000},
            [RESOURCE_HYDROGEN]: {conditionsOr: [{res: RESOURCE_HYDROGEN, amount: 250000}, ], maxPrice: 35.901, buyAmount: 30000},
        },
    },
    
    clone: function(object) {
        return require('fastest-json-copy').copy(object);
    },


    getCfg: function () {
        return [this.clone(this.myRooms), this.clone(this.skRooms), this.clone(this.labConfig), this.clone(this.factoryConfig), this.clone(this.sectorAttackers), this.clone(this.sectorCreeps), this.clone(this.depositHarvesting), 
            this.clone(this.powerHarvesting), this.clone(this.teamAssaults), this.clone(this.teamMassRangers), this.clone(this.strongholdCheck), this.clone(this.manageResources),];
    },
    
     getObstacles: {
       'E41N38': [{"x":29,"y":15},{"x":29,"y":16},{"x":30,"y":16},{"x":30,"y":17},{"x":31,"y":17},],
     },
     
     getBorders: { //for wallbuilder
        'E41N38': [
            [28,16],[28,17],[29,17],[29,18],[30,18],[19,13],[18,15],
        ],
    },

};

module.exports = shardCfg;