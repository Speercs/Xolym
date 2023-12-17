
module.exports = {
    globalShardStock: {},
    tickReset: function () {
        this.globalShardStock = {};
        
        
        let dtime = 100;
        if (Game.shard.name=='shard1') {
            dtime = 20;
        }
        if (Game.cpu.bucket < 6500) {
            dtime = 300;
        }
        if (Game.shard.name=='shard3' && Game.cpu.bucket < 7000) {
            dtime = 500;
        }
        this.manageBuyOrders();
        
        if (!(Game.time%dtime)) { 
            this.processBuyOrder();    
        }
        
        
        
        
        
    },
    
    buyOrdersConfig: {
        'shard2': [
            {roomName: 'E49N22', resource: RESOURCE_UTRIUM, minLocalStore: 30000, buyAmount: 30000},
            {roomName: 'E58N27', resource: RESOURCE_LEMERGIUM, minLocalStore: 30000, buyAmount: 30000},
            {roomName: 'E55N21', resource: RESOURCE_KEANIUM, minLocalStore: 30000, buyAmount: 30000},
            {roomName: 'E53N21', resource: RESOURCE_CATALYST, minLocalStore: 30000, buyAmount: 30000},
            {roomName: 'E45N29', resource: RESOURCE_OXYGEN, minLocalStore: 30000, buyAmount: 30000},
            {roomName: 'E52N32', resource: RESOURCE_HYDROGEN, minLocalStore: 30000, buyAmount: 30000},
            {roomName: 'E55N27', resource: RESOURCE_POWER, minLocalStore: 200000, buyAmount: 20000},
            {roomName: 'E43N38', resource: RESOURCE_CATALYZED_GHODIUM_ACID, minLocalStore: 100000, buyAmount: 15000},
            {roomName: 'E36N9',  resource: RESOURCE_CATALYZED_LEMERGIUM_ACID, minLocalStore: 30000, buyAmount: 10000},
            {roomName: 'E55N31', resource: RESOURCE_ZYNTHIUM, minLocalStore: 30000, buyAmount: 30000},
            {roomName: 'E45N29', resource: RESOURCE_SILICON, minLocalStore: 30000, buyAmount: 30000},
            {roomName: 'E43N21', resource: RESOURCE_METAL, minLocalStore: 30000, buyAmount: 30000},
            {roomName: 'E43N21', resource: RESOURCE_MIST, minLocalStore: 30000, buyAmount: 30000},
            
        ],
        'shard3': [
            {roomName: 'E45N28', resource: RESOURCE_CATALYZED_GHODIUM_ACID, minLocalStore: 30000, buyAmount: 15000},
            {roomName: 'E39N21', resource: RESOURCE_UTRIUM,   minLocalStore: 200000, buyAmount: 15000},
            {roomName: 'E39N21', resource: RESOURCE_HYDROGEN, minLocalStore: 200000, buyAmount: 15000},
            {roomName: 'E39N21', resource: RESOURCE_CATALYST, minLocalStore: 200000, buyAmount: 15000},
            {roomName: 'E42N31', resource: RESOURCE_ZYNTHIUM, minLocalStore: 9000, buyAmount: 5000},
            {roomName: 'E42N31', resource: RESOURCE_CATALYST, minLocalStore: 9000, buyAmount: 5000},
            {roomName: 'E42N31', resource: RESOURCE_LEMERGIUM,minLocalStore: 9000, buyAmount: 5000},
            {roomName: 'E42N31', resource: RESOURCE_OXYGEN,   minLocalStore: 9000, buyAmount: 5000},
            {roomName: 'E42N31', resource: RESOURCE_POWER,    minLocalStore: 9000, buyAmount: 5000},
        ],
        'shard0': [
            {roomName: 'E79N59', resource: RESOURCE_CATALYZED_GHODIUM_ACID, minLocalStore: 200000, buyAmount: 15000},
            {roomName: 'E79N59', resource: RESOURCE_CATALYST, minLocalStore: 60000, buyAmount: 10000},
            {roomName: 'E79N52', resource: RESOURCE_METAL, minLocalStore: 250000, buyAmount: 10000},
            {roomName: 'E79N59', resource: RESOURCE_UTRIUM, minLocalStore: 18000, buyAmount: 10000},
            {roomName: 'E79N59', resource: RESOURCE_ZYNTHIUM, minLocalStore: 18000, buyAmount: 10000}, 
            {roomName: 'E79N59', resource: RESOURCE_HYDROGEN, minLocalStore: 18000, buyAmount: 10000},
            {roomName: 'E79N59', resource: RESOURCE_OXYGEN, minLocalStore: 18000, buyAmount: 10000},
            {roomName: 'E52N41', resource: RESOURCE_KEANIUM, minLocalStore: 18000, buyAmount: 10000},
            {roomName: 'E52N41', resource: RESOURCE_LEMERGIUM, minLocalStore: 18000, buyAmount: 10000},
            {roomName: 'E52N41', resource: RESOURCE_POWER, minLocalStore: 20000, buyAmount: 7000},
        ],
        'shard1': [
            // {roomName: 'E41N38', resource: RESOURCE_CATALYZED_GHODIUM_ACID, minLocalStore: 200000, buyAmount: 15000},
            {roomName: 'E41N38', resource: RESOURCE_ZYNTHIUM, minLocalStore: 150000, buyAmount: 10000},
            {roomName: 'E41N38', resource: RESOURCE_KEANIUM, minLocalStore: 150000, buyAmount: 10000},
            {roomName: 'E41N38', resource: RESOURCE_UTRIUM, minLocalStore: 150000, buyAmount: 10000},
            {roomName: 'E41N38', resource: RESOURCE_LEMERGIUM, minLocalStore: 150000, buyAmount: 10000},
            {roomName: 'E41N38', resource: RESOURCE_HYDROGEN, minLocalStore: 200000, buyAmount: 15000},
            {roomName: 'E41N38', resource: RESOURCE_OXYGEN, minLocalStore: 150000, buyAmount: 10000},
            {roomName: 'E41N38', resource: RESOURCE_CATALYST, minLocalStore: 150000, buyAmount: 10000},
        ],
    },
    
    
    manageBuyOrders: function() {
        if (!(Game.time%50) && this.buyOrdersConfig && this.buyOrdersConfig[Game.shard.name]) {
            this.buyOrdersConfig[Game.shard.name].forEach(orderInfo => {
                let room = Game.rooms[orderInfo.roomName];
                if (room && room.terminal && room.storage) {
                    if (orderInfo.minLocalStore) {
                        let amount = room.terminal.store[orderInfo.resource] + room.storage.store[orderInfo.resource];
                        if (amount < orderInfo.minLocalStore && room.terminal.store.getFreeCapacity() > 10000) {
                            require('market').buyOrder(room, orderInfo.resource, orderInfo.buyAmount);
                            //console.log('buyOrdersConfig', room.name,  orderInfo.resource, amount, orderInfo.minLocalStore, orderInfo.buyAmount);
                        }
                    }
                }
            });
        }
        
         if (1 && Game.shard.name == 'shard0' && !(Game.time%50)) {
            let room = Game.rooms.E54N49;
            if (room && room.terminal && room.storage && room.storage.store[RESOURCE_ENERGY] < 450000 && room.storage.store.getFreeCapacity()>150000) {
                require('market').buyOrder(room, RESOURCE_ENERGY, 100000);
            }
         }
          if (1 && Game.shard.name == 'shard1' && !(Game.time%50)) {
            let room = Game.rooms.E41N38;
            if (room && room.terminal && room.storage && room.storage.store[RESOURCE_ENERGY] < 150000 && room.storage.store.getFreeCapacity()>40000 && room.terminal.store.getFreeCapacity()>40000) {
                require('market').buyOrder(room, RESOURCE_ENERGY, 30000);
            }
         }
        //   if (1 && Game.shard.name == 'shard1' && !(Game.time%50)) {
        //     let room = Game.rooms.E41N39;
        //     if (room && room.terminal && room.storage && room.storage.store[RESOURCE_ENERGY] < 850000 && room.storage.store.getFreeCapacity()>60000 && room.terminal.store.getFreeCapacity()>60000) {
        //         require('market').buyOrder(room, RESOURCE_ENERGY, 100000);
        //     }
        //  }
        
        //  if (1 && Game.shard.name == 'shard2' && !(Game.time%50)) {
        //     let room = Game.rooms.E57N29;
        //     if (room && room.terminal && room.storage && room.storage.store[RESOURCE_ENERGY] < 250000 && room.storage.store.getFreeCapacity()>40000 && room.terminal.store.getFreeCapacity()>40000) {
        //         require('market').buyOrder(room, RESOURCE_ENERGY, 100000);
        //     }
        //  }
        //  if (1 && Game.shard.name == 'shard2' && !(Game.time%50)) {
        //     let room = Game.rooms.E49N22;
        //     if (room && room.terminal && room.storage && room.storage.store[RESOURCE_ENERGY] < 450000 && room.storage.store.getFreeCapacity()>40000 && room.terminal.store.getFreeCapacity()>40000) {
        //         require('market').buyOrder(room, RESOURCE_ENERGY, 100000);
        //     }
        //  }
         
         if (1 && Game.shard.name == 'shard3' && !(Game.time%50)) {
            let room = Game.rooms.E45N28;
            if (room && room.terminal && room.storage && room.storage.store[RESOURCE_ENERGY] < 450000 && room.storage.store.getFreeCapacity()>150000) {
                require('market').buyOrder(room, RESOURCE_ENERGY, 100000);
            }
         }
    },
    
    //call every 50tick on every my room
    checkRoomEnergy: function(room) {
        if (['shard2'].includes(Game.shard.name) && room.controller && room.controller.my && room.controller.level >= 8) {
            if (room.terminal && room.storage && room.storage.store[RESOURCE_ENERGY] < 250000 && room.storage.store.getFreeCapacity()>40000 && room.terminal.store.getFreeCapacity()>40000) {
                this.buyOrder(room, RESOURCE_ENERGY, 100000);
            }
        }
    },

    
    buyOrder: function(room, resource, amount) {
        if (Game.market.credits < 2300000000) {
            return ERR_NOT_ENOUGH_RESOURCES;
        }
        
        if (!Memory.marketBuyOrders) {
            Memory.marketBuyOrders = {};
        }

        if (!Memory.marketBuyOrders[resource]) {
            Memory.marketBuyOrders[resource] = {};
        }
        if (!Memory.marketBuyOrders[resource][room.name]) {
            Memory.marketBuyOrders[resource][room.name] = {};
        }
        
        Memory.marketBuyOrders[resource][room.name].needAmount = amount;
        
        return OK;
    },
    
    processBuyOrder: function() {
        //if (Game.shard.name == 'shard2') return;
        
        if (Game.shard.name == 'shard2') {
            //this.buyOrder(Game.rooms.E49N37, RESOURCE_ENERGY, 100000);
        }
        
        if (!Memory.marketBuyOrders) {
            return;
        }
        
        if (_.size(Game.market.orders) > 80) return; 
        
        let maxPriceBorder = {
            [RESOURCE_ENERGY]: {borderPrice: 0.7, amountOrdersFilter: 10000, dPrice: 0.001},
            
            [RESOURCE_CATALYZED_GHODIUM_ACID]: {borderPrice: 45, amountOrdersFilter: 1000, dPrice: 0.05},
            [RESOURCE_OXYGEN]: {borderPrice: 11.0, amountOrdersFilter: 1000, dPrice: 0.5},
            [RESOURCE_HYDROGEN]: {borderPrice: 11.0, amountOrdersFilter: 1000, dPrice: 0.5},
            [RESOURCE_CATALYST]: {borderPrice: 45.7, amountOrdersFilter: 2000, dPrice: 0.05},
            [RESOURCE_CATALYZED_LEMERGIUM_ACID]: {borderPrice: 20, amountOrdersFilter: 1000, dPrice: 0.05},
            
            
            [RESOURCE_UTRIUM]: {borderPrice: 1.5, amountOrdersFilter: 3000, dPrice: 0.05},
            [RESOURCE_LEMERGIUM]: {borderPrice: 1.5, amountOrdersFilter: 3000, dPrice: 0.05},
            [RESOURCE_KEANIUM]: {borderPrice: 1.5, amountOrdersFilter: 2000, dPrice: 0.05},
            [RESOURCE_ZYNTHIUM]: {borderPrice: 1.5, amountOrdersFilter: 2000, dPrice: 0.05},
            [RESOURCE_LEMERGIUM]: {borderPrice: 1.5, amountOrdersFilter: 2000, dPrice: 0.05},
            [RESOURCE_POWER]: {borderPrice: 10.5, amountOrdersFilter: 1000, dPrice: 0.05},
            [RESOURCE_SILICON]: {borderPrice: 92.5, amountOrdersFilter: 1000, dPrice: 0.1, agressive: 1},
            [RESOURCE_METAL]: {borderPrice: 92.7, amountOrdersFilter: 1000, dPrice: 0.1, agressive: 1},
            [RESOURCE_MIST]: {borderPrice: 112.7, amountOrdersFilter: 1000, dPrice: 0.1, agressive: 1},
            
        };
        if (Game.shard.name == 'shard0') { 
            maxPriceBorder[RESOURCE_ENERGY].borderPrice = 2.7;
            maxPriceBorder[RESOURCE_CATALYZED_GHODIUM_ACID].borderPrice = 15.01;
            maxPriceBorder[RESOURCE_CATALYST].borderPrice = 110.7;
            maxPriceBorder[RESOURCE_CATALYST].agressive = 1;
            maxPriceBorder[RESOURCE_UTRIUM].borderPrice = 155.2;
            maxPriceBorder[RESOURCE_UTRIUM].amountOrdersFilter = 1000;
            maxPriceBorder[RESOURCE_UTRIUM].agressive = 1;
            maxPriceBorder[RESOURCE_HYDROGEN].borderPrice = 45.5;
            maxPriceBorder[RESOURCE_OXYGEN].borderPrice = 158.5;
            maxPriceBorder[RESOURCE_OXYGEN].agressive = 1;
            maxPriceBorder[RESOURCE_KEANIUM].borderPrice = 30.5;
            maxPriceBorder[RESOURCE_KEANIUM].agressive = 1;
            maxPriceBorder[RESOURCE_LEMERGIUM].borderPrice = 15.5;
            maxPriceBorder[RESOURCE_ZYNTHIUM].borderPrice = 15.5; 
            maxPriceBorder[RESOURCE_ZYNTHIUM].agressive = 1;
            maxPriceBorder[RESOURCE_POWER].borderPrice = 390.5;
            maxPriceBorder[RESOURCE_POWER].dPrice = 0.1;
            maxPriceBorder[RESOURCE_POWER].agressive = 1;

            
        }
        if (Game.shard.name == 'shard1') { 
            maxPriceBorder[RESOURCE_ENERGY].borderPrice = 17.970;
            maxPriceBorder[RESOURCE_ENERGY].dPrice = 0.05;
            maxPriceBorder[RESOURCE_ENERGY].agressive = 1;
            maxPriceBorder[RESOURCE_CATALYZED_GHODIUM_ACID].borderPrice = 160;
            maxPriceBorder[RESOURCE_CATALYZED_GHODIUM_ACID].dPrice = 0.5;
            
            maxPriceBorder[RESOURCE_ZYNTHIUM].borderPrice = 15.5; 
            maxPriceBorder[RESOURCE_KEANIUM].borderPrice = 15.5;
            maxPriceBorder[RESOURCE_UTRIUM].borderPrice = 21.5;
            maxPriceBorder[RESOURCE_LEMERGIUM].borderPrice = 15.5;
            maxPriceBorder[RESOURCE_OXYGEN].borderPrice = 22.5;
            maxPriceBorder[RESOURCE_HYDROGEN].borderPrice = 35.5;
            maxPriceBorder[RESOURCE_CATALYST].borderPrice = 55.5;
            maxPriceBorder[RESOURCE_CATALYST].dPrice = 0.2;
            maxPriceBorder[RESOURCE_CATALYST].agressive = 1;
        }
        if (Game.shard.name == 'shard2') {
            maxPriceBorder[RESOURCE_ENERGY].borderPrice = 4.9;
            maxPriceBorder[RESOURCE_ENERGY].borderPrice = 11.9;
            maxPriceBorder[RESOURCE_ENERGY].borderPrice = 19.9;
            maxPriceBorder[RESOURCE_ENERGY].borderPrice = 13.9;
            maxPriceBorder[RESOURCE_ENERGY].agressive = 1
            maxPriceBorder[RESOURCE_ENERGY].dPrice = 0.05;
            
            
            maxPriceBorder[RESOURCE_METAL].borderPrice = 95.5;
            maxPriceBorder[RESOURCE_SILICON].borderPrice = 95.5;
            
            maxPriceBorder[RESOURCE_CATALYZED_GHODIUM_ACID].borderPrice = 165;
            maxPriceBorder[RESOURCE_CATALYZED_GHODIUM_ACID].dPrice = 0.2;;
            maxPriceBorder[RESOURCE_KEANIUM].borderPrice = 45;
            maxPriceBorder[RESOURCE_UTRIUM].borderPrice = 45.1;
            maxPriceBorder[RESOURCE_UTRIUM].dPrice = 0.1;
            maxPriceBorder[RESOURCE_UTRIUM].agressive = 1;
            maxPriceBorder[RESOURCE_LEMERGIUM].borderPrice = 55.1;
            maxPriceBorder[RESOURCE_LEMERGIUM].dPrice = 0.1;
            maxPriceBorder[RESOURCE_LEMERGIUM].agressive = 1;
            maxPriceBorder[RESOURCE_HYDROGEN].borderPrice = 89.1;
            maxPriceBorder[RESOURCE_HYDROGEN].agressive = 1;
            maxPriceBorder[RESOURCE_OXYGEN].borderPrice = 75.1;
            maxPriceBorder[RESOURCE_ZYNTHIUM].borderPrice = 85.5;
            maxPriceBorder[RESOURCE_ZYNTHIUM].agressive = 1;
            maxPriceBorder[RESOURCE_POWER].borderPrice = 900.5;
            maxPriceBorder[RESOURCE_POWER].dPrice = 0.1;
            maxPriceBorder[RESOURCE_POWER].agressive = 1;
            maxPriceBorder[RESOURCE_CATALYST].borderPrice = 250.5;
            maxPriceBorder[RESOURCE_CATALYST].dPrice = 0.2;
            maxPriceBorder[RESOURCE_CATALYST].agressive = 1

        }
        if (Game.shard.name == 'shard3') {
            maxPriceBorder[RESOURCE_ENERGY].borderPrice = 4.01; 
            maxPriceBorder[RESOURCE_ENERGY].dPrice = 0.05;
            maxPriceBorder[RESOURCE_CATALYZED_GHODIUM_ACID].borderPrice = 55.01;
            maxPriceBorder[RESOURCE_CATALYZED_GHODIUM_ACID].dPrice = 0.5;
            maxPriceBorder[RESOURCE_UTRIUM].borderPrice = 67.5;
            maxPriceBorder[RESOURCE_UTRIUM].amountOrdersFilter = 1000;
            maxPriceBorder[RESOURCE_UTRIUM].agressive = 1;
            maxPriceBorder[RESOURCE_HYDROGEN].borderPrice = 90.1;
            maxPriceBorder[RESOURCE_HYDROGEN].amountOrdersFilter = 1000;
            maxPriceBorder[RESOURCE_HYDROGEN].agressive = 1;
            maxPriceBorder[RESOURCE_OXYGEN].borderPrice = 78.1;
            maxPriceBorder[RESOURCE_OXYGEN].amountOrdersFilter = 1000;
            maxPriceBorder[RESOURCE_OXYGEN].agressive = 1;
            maxPriceBorder[RESOURCE_ZYNTHIUM].borderPrice = 102.5;
            maxPriceBorder[RESOURCE_ZYNTHIUM].agressive = 1;
            maxPriceBorder[RESOURCE_CATALYST].borderPrice = 145.5;
            maxPriceBorder[RESOURCE_CATALYST].amountOrdersFilter = 1000;
            maxPriceBorder[RESOURCE_CATALYST].agressive = 1;
            maxPriceBorder[RESOURCE_LEMERGIUM].borderPrice = 110.5;
            maxPriceBorder[RESOURCE_LEMERGIUM].agressive = 1;
            maxPriceBorder[RESOURCE_POWER].borderPrice = 490.5;
            maxPriceBorder[RESOURCE_POWER].dPrice = 0.1;
            maxPriceBorder[RESOURCE_POWER].agressive = 1;

        }

        
        

        let myOrders = Object.keys(Game.market.orders);
        for (const resource in Memory.marketBuyOrders) {
            if (!maxPriceBorder[resource] || !maxPriceBorder[resource].amountOrdersFilter) {
                Game.notify('Set border price for buy resource '+resource );
                continue;
            }
            let orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: resource}); // fast
            orders = _.filter(orders, (order) => !myOrders.includes(order.id) && order.amount>=maxPriceBorder[resource].amountOrdersFilter);
            
            if (orders.length) {
                orders.sort(function (a,b){return b.price-a.price;});
                Memory.marketBuyOrders[resource].price = orders[0].price
            } else {
                Memory.marketBuyOrders[resource].price = undefined;
            }
            
            let price = Memory.marketBuyOrders[resource].price;
            
            //check price for invalid value
            let today = new Date().toJSON().slice(0,10).replace(/-/g,'-');
            let todayInfo = _.find(Game.market.getHistory(resource), {date: today});
            let yesterday  = new Date(new Date().setDate(new Date().getDate()-1)).toJSON().slice(0,10).replace(/-/g,'-');
            let yesterdayInfo = _.find(Game.market.getHistory(resource), {date: yesterday});
            if (!todayInfo && !yesterdayInfo) {
                //console.log('resource', resource, 'nostat');
                continue;
            } else {
                let maxPrice1 = 0
                let maxPrice2 = 0
                if (todayInfo) {
                    maxPrice1 = todayInfo.avgPrice+todayInfo.stddevPrice;
                    Memory.marketBuyOrders[resource].today = maxPrice1;
                }
                if (yesterdayInfo) {
                    maxPrice2 = yesterdayInfo.avgPrice+yesterdayInfo.stddevPrice;    
                    Memory.marketBuyOrders[resource].yesterday = maxPrice2;
                }
                let maxPrice = Math.max(maxPrice1, maxPrice2);
                if (maxPriceBorder[resource].agressive) {
                    maxPrice *= 1.75;
                } else {
                    maxPrice *= 1.05;    
                }
                //console.log('resource', resource, 'price', price, 'MaxPrice', maxPrice);
                if (price > maxPrice) {
                    price = maxPrice
                }
                if (maxPriceBorder[resource] && maxPriceBorder[resource].borderPrice) {
                    if (price > maxPriceBorder[resource].borderPrice) {
                        price = maxPriceBorder[resource].borderPrice;    
                    }
                } else {
                    Game.notify('Set border price for boy resource '+resource );
                    if (price > 0.001) {
                        price = 0.001;
                    }
                }
                // if (resource == RESOURCE_ENERGY && price > maxPriceBorder) {
                //     price = maxPriceBorder;
                // }
            }
            
            
            
            
            if (price) {
                Memory.marketBuyOrders[resource].maxPrice = price;
                for (const roomName in Memory.marketBuyOrders[resource]) {
                    let orderId = Memory.marketBuyOrders[resource][roomName].id;
                    //check order exist
                    if (orderId && !Game.market.orders[orderId]) {
                        Memory.marketBuyOrders[resource][roomName].id = undefined;
                        orderId = undefined;
                    }
                    
                    let orderInfo = null;
                    if (!orderId) { //find new order
                        orderInfo = _.find(Game.market.orders, { resourceType: resource, roomName: roomName, type: ORDER_BUY})
                        if (orderInfo) {
                            orderId = orderInfo.id;
                            Memory.marketBuyOrders[resource][roomName].id = orderInfo.id;
                            
                        }
                    } else {
                        orderInfo = Game.market.orders[orderId];
                    }
                    let needAmount = Memory.marketBuyOrders[resource][roomName].needAmount;
                    if (needAmount) {
                        if (!orderInfo) {
                            //create new order
                            const createOrderInfo = {
                                type: ORDER_BUY,
                                resourceType: resource,
                                price: price,
                                totalAmount: needAmount, 
                                roomName: roomName   
                            };
                            console.log('create order', JSON.stringify(createOrderInfo));
                            Game.market.createOrder(createOrderInfo); 
                            Memory.marketBuyOrders[resource][roomName].needAmount = 0;
                            Memory.marketBuyOrders[resource][roomName].startOrderTime = Game.time;
                            Memory.marketBuyOrders[resource][roomName].startOrderPrice = price;
                            Memory.marketBuyOrders[resource][roomName].startOrderAmount = needAmount;
                        } else {
                            //look remainingAmount
                            const remainingAmount = orderInfo.remainingAmount;
                            
                            if (Memory.marketBuyOrders[resource][roomName].remainingAmount != remainingAmount) {
                                Memory.marketBuyOrders[resource][roomName].remainingAmount = remainingAmount;    
                                Memory.marketBuyOrders[resource][roomName].remainingAmountTime = Game.time;
                            }
                            let noChangeAmountTicks = Game.time - Memory.marketBuyOrders[resource][roomName].remainingAmountTime;
                            
                            if (!remainingAmount) { // !!todo notify for closed orders without new order
                                // Game.notify('buyOrder closed '+ resource + ' in Room ' + roomName + 
                                // ' startPrice ' + Memory.marketBuyOrders[resource][roomName].startOrderPrice +
                                // ' end Price ' + orderInfo.price + 
                                // ' amount ' + Memory.marketBuyOrders[resource][roomName].startOrderAmount +
                                // ' ticks '+ (Game.time - Memory.marketBuyOrders[resource][roomName].startOrderTime), 360
                                // );
                                
                                //change price
                                //console.log('changeOrderPrice');
                                Game.market.changeOrderPrice(orderInfo.id, price);
                                Game.market.extendOrder(orderInfo.id, needAmount);
                                Memory.marketBuyOrders[resource][roomName].needAmount = 0;
                                Memory.marketBuyOrders[resource][roomName].startOrderTime = Game.time;
                                Memory.marketBuyOrders[resource][roomName].startOrderPrice = price;
                                Memory.marketBuyOrders[resource][roomName].startOrderAmount = needAmount;
                                // Game.notify('extend buyOrder '+ resource + ' in Room ' + roomName +
                                // ' startPrice ' + Memory.marketBuyOrders[resource][roomName].startOrderPrice +
                                // ' amount ' + Memory.marketBuyOrders[resource][roomName].startOrderAmount 
                                // );
                                
                            } else { 
                                let deltaPrice = price - orderInfo.price;
                                let tiksToChangePrice = 50;
                                if (maxPriceBorder[resource].agressive) {
                                     tiksToChangePrice = 1;
                                }
                                
                                if (deltaPrice >= 0.000 && noChangeAmountTicks > tiksToChangePrice) {
                                    let configDeltaPrice = maxPriceBorder[resource]?maxPriceBorder[resource].dPrice:0.001;
                                    let configBorderPrice = maxPriceBorder[resource]?maxPriceBorder[resource].borderPrice:0.001;
                                    let d = Math.max(deltaPrice/2, configDeltaPrice);
                                    if (maxPriceBorder[resource].agressive) {
                                        d = deltaPrice;
                                    }
                                    if (orderInfo.price+d > configBorderPrice) {
                                        //d = Math.min(d, 0.001);    
                                        d = configBorderPrice - orderInfo.price;
                                    }
                                    if (d>=0.001) {
                                        Game.market.changeOrderPrice(orderInfo.id, orderInfo.price+d);
                                        Memory.marketBuyOrders[resource][roomName].remainingAmountTime = Game.time;
                                    }
                                    //console.log('buy order price changed', noChangeAmountTicks, 'new price', price, 'dPrice',  deltaPrice.toFixed(3), JSON.stringify(orderInfo));    
                                } else {
                                    //console.log('active buy order noChangeAmountTicks', noChangeAmountTicks, 'new price', price, 'dPrice',  deltaPrice.toFixed(3), 'order price', orderInfo.price, 'left', orderInfo.remainingAmount);    
                                }
                                
                                
                            }
                            
                        }
                        
                    }
                    
                    

                    
                    
                    if (needAmount) {
                    }
                    
                    
                    
                }
                
            }
            
            
            
            
          
        }
        
    
        
        
        // if (orderId) {
        //     const order = Game.market.orders[orderId];
        //     const amount = order.amount;
            
        // }
        
        
        //calc price

        
        
    },
            
    getDTime: function() {
        let dTime = 90;
        if (Game.cpu.bucket>=9990) {
            dTime = 10;
        } else if (Game.cpu.bucket>=9500) {
            dTime = 15;
        } else if (Game.cpu.bucket>=6000) {
            dTime = 20;
        } else if (Game.cpu.bucket>=4000) {
            dTime = 40;
        } else if (Game.cpu.bucket>=3000) {
            dTime = 50;
        }
        if (Game.shard.name == 'shard1' && Game.time < 45701396 + 5000) {
            dTime = 1;
        }
        return dTime;
    },


    noCheckResourceToBuyForRoom: {},
    checkResourceToBuy: function(room, myRooms, manageResources)  {
        if (Game.time%this.getDTime()) return;
        if (!manageResources[room.name]) return;
        if (this.noCheckResourceToBuyForRoom[room.name] && Game.time < this.noCheckResourceToBuyForRoom[room.name]) {
            //console.log('checkResourceToBuy', room.name, 'all resources full', this.noCheckResourceToBuyForRoom[room.name] - Game.time);
            return;
        }
        //console.log('checkResourceToBuy', room.name);
        let resourcesList = Object.keys(manageResources[room.name]);
        if (!resourcesList.length) return;
        if (room.memory.manageOrdersList && room.memory.manageOrdersList.length) {
            let resourcesInOrder = room.memory.manageOrdersList.map(manageOrder => manageOrder.resource);
            resourcesList = _.filter(resourcesList, resource => !resourcesInOrder.includes(resource));
            if (!resourcesList.length) return;
        }
        //console.log('checkResourceToBuy', 'resourcesList', resourcesList);
        
        if (_.isEmpty(this.globalShardStock)) {
            for(const myRoom of myRooms) {
                const room = Game.rooms[myRoom.roomName];
                this.globalShardStock = _.assign(this.globalShardStock, _.get(room, 'storage.store'), _.add);
                this.globalShardStock = _.assign(this.globalShardStock, _.get(room, 'terminal.store'), _.add);
            }
        }
        
        for (const resource of resourcesList) {
            const manageResourceInfo = manageResources[room.name][resource];
            let conditionOK = false;
            for (let conditionInfo of manageResourceInfo.conditionsOr) {
                let resource = conditionInfo.res;
                //console.log(room.name, resource, this.globalShardStock[resource], conditionInfo.amount);
                if (this.globalShardStock[resource] && this.globalShardStock[resource] >= conditionInfo.amount) {
                    conditionOK = true;
                }
            } 
            if (!conditionOK) {
                if (!room.memory.manageOrdersList) {
                    room.memory.manageOrdersList = [];
                }
                room.memory.manageOrdersList.push({resource: resource, maxPrice: manageResourceInfo.maxPrice, buyAmount: manageResourceInfo.buyAmount, time: Game.time});
            }
        }
        if (!room.memory.manageOrdersList || !room.memory.manageOrdersList.length) {
            this.noCheckResourceToBuyForRoom[room.name] = Game.time + 750;
        }
        
    },
    getMinAmount: function(resource) {
        let amount = 1;
        if ([RESOURCE_ZYNTHIUM, RESOURCE_KEANIUM, RESOURCE_UTRIUM, RESOURCE_LEMERGIUM,]) {
            amount = 1000;
        }
        return amount;
    },
    buyResourceToBuy: function(room) { 
        if (Game.time%this.getDTime()) return;
        if (!room.memory.manageOrdersList || !room.memory.manageOrdersList.length) return;
        if (!room.terminal || room.terminal.cooldown || room.terminal.store[RESOURCE_ENERGY] < 15000 || room.terminal.store.getFreeCapacity() < 25000) return;
        if (require('terminal').roomTerminalUsed.includes(room.name)) return;
        //console.log('buyResourceToBuy', room.name, room.memory.manageOrdersList.map(o=>('_'+o.resource+'_'+((o.noCheck && Game.time < o.noCheck) ? 'noCheck' : ''))));
        
        for (let i = 0; i<room.memory.manageOrdersList.length; i++) {
            let manageOrder = room.memory.manageOrdersList[i];
            if (manageOrder.noCheck && Game.time < manageOrder.noCheck) {
                continue;
            }
            //console.log('buyResourceToBuy',manageOrder.resource,'check');
            manageOrder.noCheck = undefined;
            //let orders = Game.market.getAllOrders(order => order.resourceType == manageOrder.resource && order.type == ORDER_SELL /* && order.amount >= manageOrder.buyAmount*/ && order.price <= manageOrder.maxPrice);
            let orders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: manageOrder.resource}); // fast
            let minAmount = this.getMinAmount(manageOrder.resource);
            orders = _.filter(orders, (order) => order.amount>=minAmount && order.price <= manageOrder.maxPrice);    
            if (orders.length) {
                let order = _.min(orders, 'price');
                let amount = Math.min(manageOrder.buyAmount, order.amount)
                let res = Game.market.deal(order.id, amount, room.name);
                if (res == OK) {
                    require('terminal').roomTerminalUsed.push(room.name);
                    manageOrder.buyAmount -= amount;
                    manageOrder.time = Game.time;
                    if (!manageOrder.buyAmount ||  manageOrder.buyAmount <= 0) {
                        room.memory.manageOrdersList.splice(i, 1);
                    }
                    break;
                } else {
                    console.log('Deal failed in roon ', room.name, ' res ', res);
                }
            } else {
                if (Game.time > manageOrder.time + 1000 ) {
                    manageOrder.noCheck = Game.time+300;
                    //console.log('buyResourceToBuy','noChek SET');
                    //room.memory.manageOrdersList.splice(i--, 1);
                    //Game.notify('cannot buy order. Removed! '+JSON.stringify(manageOrder), 5000);
                    //continue;
                }
            }
        }
    },
            

    manageResource: function (room, myRooms, manageResources, dTime = 90) {
        if (!room) return;
        if (Game.cpu.bucket>=9990) {
            dTime = 1;
        } else if (Game.cpu.bucket>=9500) {
            dTime = 9;
        } else if (Game.cpu.bucket>=6000) {
            dTime = 20;
        } else if (Game.cpu.bucket>=4000) {
            dTime = 40;
        } else if (Game.cpu.bucket>=3000) {
            dTime = 50;
        }

        if (1 && !((Game.time+10)%dTime) && manageResources && manageResources[room.name] && !room.memory.manageOrder) {
            const startCpuManageResources = Game.cpu.getUsed();
            if (_.isEmpty(this.globalShardStock)) {
                for(const myRoom of myRooms) {
                    const room = Game.rooms[myRoom.roomName];
                    this.globalShardStock = _.assign(this.globalShardStock, _.get(room, 'storage.store'), _.add);
                    this.globalShardStock = _.assign(this.globalShardStock, _.get(room, 'terminal.store'), _.add);
                }
            }
            for (const resource in manageResources[room.name]) {
                const manageResourceInfo = manageResources[room.name][resource];
                let condition = false;
                for (let conditionInfo of manageResourceInfo.conditionsOr) {
                    let resource = conditionInfo.res;
                    console.log(room.name, resource, this.globalShardStock[resource], conditionInfo.amount);
                    if (this.globalShardStock[resource] && this.globalShardStock[resource] >= conditionInfo.amount) {
                        condition = true;
                    }
                }
                if (!condition) {
                    room.memory.manageOrder = {resource: resource, maxPrice: manageResourceInfo.maxPrice, buyAmount: manageResourceInfo.buyAmount, time: Game.time};
                    //Game.notify('Need buy'+resource+ ' '+ this.globalShardStock[manageResourceInfo.resource] + ' ' +JSON.stringify(room.memory.manageOrder));
                    if (VERBOSE_CPU) console.log('Need buy'+resource+ ' '+ this.globalShardStock[resource] + ' ' +JSON.stringify(room.memory.manageOrder));
                } else {
                    if (VERBOSE_CPU) console.log(room.name, resource, 'Ok');
                }
            }
            if (!room.memory.manageOrder) {
                
            }
            const elapsedManageResources = Game.cpu.getUsed() - startCpuManageResources;
            if (VERBOSE_CPU) console.log('manageResourcesCpu '+ elapsedManageResources.toFixed(2));    
        }
        
        if (1 && !(Game.time%10) && room.memory.manageOrder && room.terminal && !room.terminal.cooldown && room.terminal.store[RESOURCE_ENERGY]>=10000 && !_.includes(require('terminal').roomTerminalUsed, room.name)) {
            const startCpuManageBuyResources = Game.cpu.getUsed();
            let manageOrder = room.memory.manageOrder;
            //console.log(room.name, 'try buy resource!!!!', manageOrder.resource);
            if (Game.time > manageOrder.time + 400 ) {
                room.memory.manageOrder = undefined;
                Game.notify('cannot buy order. Removed! '+JSON.stringify(manageOrder), 5000);
            } else {
                //let orders = Game.market.getAllOrders(order => order.resourceType == manageOrder.resource && order.type == ORDER_SELL /* && order.amount >= manageOrder.buyAmount*/ && order.price <= manageOrder.maxPrice);
                let orders = Game.market.getAllOrders({type: ORDER_SELL, resourceType: manageOrder.resource}); // fast
                orders = _.filter(orders, (order) => order.amount>0);
                orders = _.filter(orders, (order) => ['5a981326642e1a125e7ef5e1'].indexOf(order.id) === -1);
                orders.sort(function (a,b){return a.price-b.price;});
                if (0 && orders.length){
                    orders.forEach(order => console.log(JSON.stringify(order)));
                }
                if (orders.length && orders[0].price <= manageOrder.maxPrice){
                    let amount = Math.min(manageOrder.buyAmount, orders[0].amount)
                    let res = Game.market.deal(orders[0].id, amount, room.name);
                    if (res == OK) {
                        //console.log('deal OK', amount);
                        require('terminal').roomTerminalUsed.push(room.name);
                        manageOrder.buyAmount -= amount;
                        manageOrder.time = Game.time;
                        if (!manageOrder.buyAmount ||  manageOrder.buyAmount <= 0) {
                            room.memory.manageOrder = undefined;    
                            // Game.notify('ORDER CLOSE deal '+ orders[0].resourceType + ' ' /*+JSON.stringify(orders[0])*/);
                        } else {
                            //Game.notify('ORDER more '+manageOrder.buyAmount+' deal '+JSON.stringify(orders[0]));
                        }
                        
                        // if (!Memory.marketHistory) {
                        // Memory.marketHistory = [];
                        // }
                        // const orderInfo = {time: Game.time, order: ORDER_BUY, resource:manageOrder.resource, price: orders[0].price, amount: amount, left: manageOrder.buyAmount, room: room.name};
                        //Memory.marketHistory.push(orderInfo);
                        //Game.notify('buy order '+JSON.stringify(orderInfo));
                    }
                } else {
                    if (orders.length) {
                        //console.log('price high', orders[0].price, 'with limit', manageOrder.maxPrice);    
                    } else {
                        //console.log('market empty');    
                    }
                }                    
            }
            const elapsedManageBuyResources = Game.cpu.getUsed() - startCpuManageBuyResources;
            if (0 || VERBOSE_CPU) console.log('ManageBuyResourcesCpu '+ elapsedManageBuyResources.toFixed(2));
        
        }
        
    },
            
    
    
    sellEnergy: function(room, tick1){
        if (room.name == 'E43N38') return; //gcl 
        if (room.name == Memory.helpRoomTerminal) return; //help
        
        if (1 && !(Game.time%tick1) && room.storage && ['shard0','shard1','shard2','shard3'].includes(Game.shard.name)  && room.terminal  && !room.terminal.cooldown) {
            //sell energy where starge full
            let minPrice = 4.000;
            let sellAmount = 5000;
            let sellMaxAmount = 25000;
            
            if (room.storage.store.getFreeCapacity() < 5000 && room.terminal.store[RESOURCE_ENERGY] > 60000) {
                minPrice = 0.100;
                //sellMaxAmount = 10000;
            }
            
            let doSell = false;
            
            if (room.storage.store.getFreeCapacity() < 10000 && room.storage.store[RESOURCE_ENERGY] >= 300000 && room.terminal.store[RESOURCE_ENERGY]>=50000) {
                doSell = true;
            }
            
            if (room.terminal.store.getFreeCapacity() < 5000 && room.storage.store[RESOURCE_ENERGY] >= 300000 && room.terminal.store[RESOURCE_ENERGY]>=50000 && room.storage.store.getFreeCapacity() < 15000) {
                minPrice = 0.100;
                doSell = true;
            }
            
            if (doSell) {
                //let orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_ENERGY && order.type == ORDER_BUY && order.amount >= sellAmount && order.price >= minPrice);
                let orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY}); // fast
                orders = _.filter(orders, order => order.amount >= sellAmount && order.price >= minPrice)
                orders.sort(function (a,b){return b.price-a.price || Game.market.calcTransactionCost(sellAmount, room.name, a.roomName) - Game.market.calcTransactionCost(sellAmount, room.name, b.roomName);});
                if (0 && orders.length>5){
                    for(let i=0; i<5;i++){
                        console.log(JSON.stringify(orders[i]), Game.market.calcTransactionCost(sellAmount, room.name, orders[i].roomName), Game.map.getRoomLinearDistance(room.name, orders[i].roomName, true));
                    }
                }
                if (orders.length){
                    let amount = Math.min(orders[0].amount, sellMaxAmount, room.terminal.store[RESOURCE_ENERGY]-5000);
                    let res = Game.market.deal(orders[0].id, amount, room.name);
                    let transferCost = Game.market.calcTransactionCost(amount, room.name, orders[0].roomName);
                    Game.notify('Selling energy '+room.name+' amount '+ amount + '['+room.terminal.store[RESOURCE_ENERGY] + ']['+transferCost+ '] price ' + orders[0].price + ' return code '+ res, 120);
                }
            } 
        }
    },
            
    sellResources: function(room) {
        //if (Game.shard.name == 'shard2') return;
        let dTick = 10;
        if (Game.cpu.bucket > 9500) {
            dTick = 1;
        } else if (Game.shard.name == 'shard0' && Game.cpu.bucket > 7000) {
            dTick = 1;
        }
        
        if (1 && !(Game.time%dTick) && ['shard3','shard0','shard1','shard2'].includes(Game.shard.name) && room.storage && room.terminal  && !room.terminal.cooldown) {
                
            const resourcesToSell = [
                // {resourceType: RESOURCE_UTRIUM,    minPrice: 0.1, sellAmount: 3000, minQty: 180000},
                // {resourceType: RESOURCE_LEMERGIUM, minPrice: 0.1, sellAmount: 3000, minQty: 180000},
                // {resourceType: RESOURCE_OXYGEN,    minPrice: 0.1, sellAmount: 3000, minQty: 180000},
                // {resourceType: RESOURCE_KEANIUM,   minPrice: 0.1, sellAmount: 3000, minQty: 180000},
                // {resourceType: RESOURCE_HYDROGEN,  minPrice: 0.1, sellAmount: 3000, minQty: 180000},
                // {resourceType: RESOURCE_GHODIUM,   minPrice: 0.25, sellAmount: 3000, minQty: 180000},
                // {resourceType: RESOURCE_CATALYST,  minPrice: 0.25, sellAmount: 3000, minQty: 180000},
                // {resourceType: RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,   minPrice: 0.15, sellAmount: 1000, minQty: 180000},
                // {resourceType: RESOURCE_CATALYZED_UTRIUM_ACID,          minPrice: 0.15, sellAmount: 1000, minQty: 180000},
                // {resourceType: RESOURCE_CATALYZED_ZYNTHIUM_ACID,        minPrice: 0.15, sellAmount: 1000, minQty: 180000},
                // {resourceType: RESOURCE_CATALYZED_GHODIUM_ALKALIDE,     minPrice: 0.15, sellAmount: 1000, minQty: 180000},
                // {resourceType: RESOURCE_CATALYZED_GHODIUM_ACID,         minPrice: 0.15, sellAmount: 1000, minQty: 180000},
                // {resourceType: RESOURCE_CATALYZED_GHODIUM_ACID,         minPrice: 0.15, sellAmount: 1000, minQty: 180000},
                // {resourceType: RESOURCE_LEMERGIUM_BAR, minPrice: 0.601, sellAmount: 1000, minQty: 50000},
                //{resourceType: RESOURCE_ZYNTHIUM_BAR, minPrice: 0.4500, sellAmount: 1000, minQty: 50000},
                
                {resourceType: RESOURCE_MACHINE, minPrice: 6000000, sellAmount: 5, minSellAmount: 1, minQty: 0, shards: ['shard0','shard1'],},
                //{resourceType: RESOURCE_ESSENCE, minPrice: 3400000, sellAmount: 5, minSellAmount: 1, minQty: 0, shards: ['shard0',],},  
                {resourceType: RESOURCE_DEVICE,  minPrice: 3600000, sellAmount: 5, minSellAmount: 1, minQty: 0, shards: ['shard3','shard1','shard0','shard2'],}, 
                //{resourceType: RESOURCE_POWER,                          minPrice: 0.05, sellAmount: 1000, minQty: 00},
                ];
            for(const resourceToSell of resourcesToSell) {
                const resourceType = resourceToSell.resourceType;
                const minSellAmount = resourceToSell.minSellAmount?resourceToSell.minSellAmount:resourceToSell.sellAmount;
                if ((!resourceToSell.shards || resourceToSell.shards.indexOf(Game.shard.name) >= 0) && room.terminal.store[resourceType]>=resourceToSell.minQty && room.terminal.store[resourceType] >= resourceToSell.minSellAmount 
                    && room.terminal.store[RESOURCE_ENERGY]>10000) {
                    const startCpuSellResources = Game.cpu.getUsed();
                    const minPrice = resourceToSell.minPrice;
                    const sellAmount = resourceToSell.sellAmount;
                    let orders = Game.market.getAllOrders({type: ORDER_BUY, resourceType: resourceType}); // fast
                    orders = _.filter(orders, (order) => order.amount >= minSellAmount && order.price >= minPrice);
                    //let orders = Game.market.getAllOrders(order => order.resourceType == resourceType && order.type == ORDER_BUY && order.amount >= sellAmount && order.price >= minPrice);
                    //console.log('SellingResMarketCheck');
                    if (orders.length){
                        let amount = Math.min(sellAmount, orders[0].amount, room.terminal.store[resourceType]);
                        orders.sort(function (a,b){return b.price-a.price || Game.market.calcTransactionCost(amount, room.name, a.roomName) - Game.market.calcTransactionCost(amount, room.name, b.roomName);});
                        let res = Game.market.deal(orders[0].id, amount, room.name);
                        let message = 'Selling '+resourceType+' in room '+room.name+' amount '+ amount + ' with price ' + orders[0].price + ' return code '+ res + ' ' +
                        room.terminal.store[resourceType] + ' ' + resourceToSell.minQty + ' ' + ((room.terminal.store[resourceType]>=resourceToSell.minQty)?'yes':'no');
                        // Game.notify( message, 120);
                        console.log(message);
                    }
                    const elapsedSellResources = Game.cpu.getUsed() - startCpuSellResources;
                    if (0 || VERBOSE_CPU) console.log('SellResourcesCpu', resourceType, room.name, elapsedSellResources.toFixed(2));    
                }
            }
        }
    },
    
    

};