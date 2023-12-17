module.exports = {
    init: function() {
        //delete Memory.profiler; 
        if (Memory.profilerDisable !== undefined) {
            this.disable = Memory.profilerDisable;
        }
        if (Game.shard.name == 'shard1') {
         this.whiteList = ['AllTime'];
        }
        if (Game.shard.name == 'shard2') {
         this.whiteList = undefined;
        }
        if (Game.shard.name == 'shard3') {
         //this.whiteList = undefined;
        }
        if (Memory.production) {
            this.whiteList = ['AllTime'];
            if (Game.shard.name == 'shard2') {
                this.whiteList = ['AllTime', 'marketHelper'];
                
                //this.whiteList = ['AllTime', 'spawn', 'getGameCreeps'];
                //this.whiteList = undefined;
            }
        }
        
    },
    
    disable: 0,
    //whiteList: ['AllTime','getGameCreeps','spawn','spawnRoomCreep',],//'linkProcess','defendRoom','settlerRoomManage', 'settlerBuildOrders','settlerBuildings','factoryDeal','labDeal'],//'storageTerminalWork', 'factoryAndLabDeal', 'suplierRefill' /*'observer','marketHelper',*/], 
    whiteList: ['AllTime','prepareTime', 'allRooms', 'defendRoom', 'processLabs', 'processFactory', 'getGameCreeps','spawn', 'runCreeps', 'manualScripts', 'terminalSendLoop', 'runTerminalQueue', 'terminal.send','terminalManager','manageResource','manageResourceNew'],
    maxStatLength: 100,
     
    data: {},
    currentLabel: null,
    start: function(label) {
        if (this.disable) return;
        if (this.whiteList && !this.whiteList.includes(label)) return;
        
        if (!this.data[label]){
            this.data[label] = {};
        }
        this.currentLabel = label;
        this.data[label].start = Game.cpu.getUsed();
    },
    end: function(label = undefined) {
        if (this.disable) return;
        if (this.whiteList && !this.whiteList.includes(label)) return;
        let end = Game.cpu.getUsed();
        if (!label) {
            label = this.currentLabel;
        }
        if (this.data[label] && this.data[label].start) {
            this.data[label].amount = (this.data[label].amount || 0) + (end - this.data[label].start);
            this.currentLabel = null;
        } else {
            console.log('profiler error. label '+label+' not found!');
        }
    },
    
    getToday: function() {
        let date = new Date();
        let month = date.getMonth() +1;
        month = month<10?'0'+month:month;
        let dateMonth = date.getDate()<10?'0'+date.getDate():date.getDate();
        return ''+date.getFullYear()+month+dateMonth;
    },

    dayStats: function(label, amount = 1) {
        if (!Memory.dayStats) {
            Memory.dayStats = {};
            Memory.dayStats.data = {};
            Memory.dayStats.today = this.getToday();
        }
        Memory.dayStats.data[label] = (Memory.dayStats.data[label] || 0) + amount;    
    },
    
    getDayStats: function(label) {
        return _.get(Memory, 'dayStats.data['+label+']', 0);
    },
    
    finalizeDayStats: function() {
        if (!Memory.dayStats) return;
        if (!((Game.time-2)%100)) {
            let today = this.getToday();
            if (!Memory.dayStats.today || Memory.dayStats.today != today) {
                Memory.dayStats.today = today;
                Memory.dayStats.data = {};
            }
        }
    },
    
    finalize: function() {
        this.finalizeDayStats();
        
        if (this.disable) {
           delete Memory.profiler; 
           return;
        }
        
        
        if (!Memory.profiler) {
            Memory.profiler = {};
            Memory.profiler.stats = {};
            Memory.profiler.data = {};
        }
        for (label in this.data) {
            if (!Memory.profiler.data[label]) {
                Memory.profiler.data[label] = [];
            }
        }
        let stats = {};
        for (let label in Memory.profiler.data) {
            let amount = (this.data[label] && this.data[label].amount) ? this.data[label].amount : 0;
            Memory.profiler.data[label].push(amount.toFixed(3));
            if (Memory.profiler.data[label].length > this.maxStatLength) {
                Memory.profiler.data[label].shift();
            }
            stats[label] = (_.reduce(Memory.profiler.data[label], _.add)/Memory.profiler.data[label].length).toFixed(2);
        }
        // stats = _.reduceRight(_.invert(_.invert(stats)), function(current, val, key){
        //     current[key] = parseInt(val*100);//parseFloat(val);
        //     return current;
        // },{});
        
        //delete Memory.profiler.stats;
        Memory.profiler.stats = stats;
        
        delete this.data;
        this.data = {};
        this.currentLabel = null;
        
        this.saveStatsToSegment();
    },
    statsSegmentIndex: 7,
    prices: {},
    saveStatsToSegment: function() {
        if (_.isEmpty(this.prices) || !(Game.time%3000)) {
            [RESOURCE_DEVICE, RESOURCE_MACHINE, RESOURCE_ESSENCE].forEach( resource => {
                //check price for invalid value
                let price = 0;
                let today = new Date().toJSON().slice(0,10).replace(/-/g,'-');
                let todayInfo = _.find(Game.market.getHistory(resource), {date: today});
                if (!todayInfo) {
                    today  = new Date(new Date().setDate(new Date().getDate()-1)).toJSON().slice(0,10).replace(/-/g,'-');
                    todayInfo = _.find(Game.market.getHistory(resource), {date: today});
                }
                if (todayInfo) {
                    price = todayInfo.avgPrice+todayInfo.stddevPrice;
                }
                this.prices[resource] = Math.round(price);
            });
        }

        const ticksDelay = 100;
        if (!(Game.time%ticksDelay)) {
            if (!RawMemory.segments || !Object.keys(RawMemory.segments).includes(String(this.statsSegmentIndex))) {
                RawMemory.setActiveSegments([this.statsSegmentIndex]);
                return;
            }
        }
        
        if (!((Game.time-1)%ticksDelay)) {
            if (RawMemory.segments && Object.keys(RawMemory.segments).includes(String(this.statsSegmentIndex))) {
                let deposits = Memory.depositWork || {};
                let depositCount = 0;
                for (let roomName in deposits) {
                    for (let depositId in deposits[roomName]) {
                        const depositInfo = deposits[roomName][depositId];
                        if (!depositInfo.closed) {
                            depositCount++;
                        }
                    }
                }
                
                let data = {
                    tick: Game.time,
                    shard: Game.shard.name,
                    bucket: Game.cpu.bucket,
                    creeps: require('spawn').getGameCreepsLength(), //Object.keys(Game.creeps).length,
                    cpu: _.get(Memory, 'profiler.stats.AllTime', 'none'),
                    powerBanks: _.filter(Game.rooms, room => room.controller && room.controller.my && room.memory.power).map(room => room.name).length,
                    depositCount: depositCount,
                    observeEnable: _.get(Memory, 'observerManager.observeEnable', 0),
                    energy: _.get(Memory, 'stock.energy', '0'),
                    power: _.get(Memory, 'stock.power', '0'),
                    [RESOURCE_CATALYZED_GHODIUM_ACID]: _.get(Memory, 'stock.'+RESOURCE_CATALYZED_GHODIUM_ACID, '0'),
                    //[RESOURCE_CATALYZED_GHODIUM_ALKALIDE]: _.get(Memory, 'stock.'+RESOURCE_CATALYZED_GHODIUM_ALKALIDE, '0'),
                    [RESOURCE_SILICON]: _.get(Memory, 'stock.'+RESOURCE_SILICON, '0'),
                    //[RESOURCE_UTRIUM]: _.get(Memory, 'stock.'+RESOURCE_UTRIUM, '0'),
                    [RESOURCE_METAL]: _.get(Memory, 'stock.'+RESOURCE_METAL, '0'),
                    [RESOURCE_WIRE]: _.get(Memory, 'stock.'+RESOURCE_WIRE, '0'),
                    [RESOURCE_ALLOY]: _.get(Memory, 'stock.'+RESOURCE_ALLOY, '0'),
                    'statDevice': this.getDayStats(RESOURCE_DEVICE),
                    'statMachine': this.getDayStats(RESOURCE_MACHINE),
                    'statEssense': this.getDayStats(RESOURCE_ESSENCE),
                }
                // if (!((Game.time-1)%(ticksDelay*10))) {
                for (let resource in this.prices) {
                    data['price_'+resource] = this.prices[resource];
                }
                // } 
                RawMemory.segments[this.statsSegmentIndex] = JSON.stringify(data);
            }
        }
        
    },

};