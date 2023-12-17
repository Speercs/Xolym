var helpers = require('helpers');

module.exports = {
    processFactory: function (room, myRoom, factoryConfig, tick1){
        if (!room) return;
        if (myRoom.factory !== undefined) {
            let factoryInfo = factoryConfig[myRoom.factory];
            let factory = Game.getObjectById(room.memory.factory);
            if (factory && factory.level) {
                if (factory.cooldown) {
                    if (room.memory.factoryStayTime) {
                        room.memory.factoryLastStayTicks = Game.time - room.memory.factoryStayTime;
                        room.memory.factoryStayTime = undefined;
                    }
                } else if (!room.memory.factoryStayTime) {
                    room.memory.factoryStayTime = Game.time;
                }
                
                if (Memory.mapVisual) {
                    let log = '';
                    let text = '';
                    let line = 0;
                    if (room.memory.factoryLastProduct) {
                        text = 'LastProduct '+ room.memory.factoryLastProduct;
                        room.visual.text(text ,0 + 0.1, (line++)+0.1, {align: 'left', opacity: 0.8, color: '#00DD00'})
                        log+=text+' ';
                    }
                    if (room.memory.factoryStayTime) {
                        text = 'stay ' +(Game.time - room.memory.factoryStayTime)+' ticks. ';
                        if (room.memory.factoryLastStayTicks) {
                            text += ' (last stay ' +room.memory.factoryLastStayTicks+' ticks.)';    
                        }
                        room.visual.text(text ,0 + 0.1, (line++)+0.1, {align: 'left', opacity: 0.8, color: '#00DD00'})
                        log+=text+' ';
                    } else if (room.memory.factoryLastStayTicks) {
                        text = 'last stay ' +room.memory.factoryLastStayTicks+' ticks. ';
                        room.visual.text(text ,0 + 0.1, (line++)+0.1, {align: 'left', opacity: 0.8, color: '#00DD00'})
                        log+=text+' ';
                    }
                    if (room.memory.factoryNeed && Object.keys(room.memory.factoryNeed).length) {
                        text = 'Need resources: ';
                        for (let res in room.memory.factoryNeed) {
                            text += res+'('+room.memory.factoryNeed[res].amount+'), ';
                        }
                        room.visual.text(text ,0 + 0.1, (line++)+0.1, {align: 'left', opacity: 0.8, color: '#00DD00'})
                        log+=text+' ';
                    }
                    if (room.memory.factoryDone) {
                        text = 'All done.';
                        room.visual.text(text ,0 + 0.1, (line++)+0.1, {align: 'left', opacity: 0.8, color: '#00DD00'})
                        log+=text+' ';
                    }
                    if (Game.shard.name == 'shard2') {
                        text = '';
                        [RESOURCE_SILICON, RESOURCE_WIRE, RESOURCE_SWITCH, RESOURCE_TRANSISTOR, RESOURCE_MICROCHIP, RESOURCE_CIRCUIT, RESOURCE_DEVICE].forEach(res => {
                           text += ''+res+':'+_.get(Memory, 'stock.'+res, 0)+', '; 
                        });
                        room.visual.text(text ,0 + 0.1, (line++)+0.1, {align: 'left', opacity: 0.8, color: '#00DD00'})
                        log+=text+' ';
                    }
                    if (Game.shard.name == 'shard2') {
                        text = '';
                        [RESOURCE_METAL,RESOURCE_ALLOY, RESOURCE_TUBE, RESOURCE_FIXTURES, RESOURCE_FRAME, RESOURCE_HYDRAULICS, RESOURCE_MACHINE].forEach(res => {
                           text += ''+res+':'+_.get(Memory, 'stock.'+res, 0)+', '; 
                        });
                        room.visual.text(text ,0 + 0.1, (line++)+0.1, {align: 'left', opacity: 0.8, color: '#00DD00'})
                        log+=text+' ';
                    }
                    if (Game.shard.name == 'shard2') {
                        text = '';
                        [RESOURCE_CONDENSATE, RESOURCE_CONCENTRATE, RESOURCE_EXTRACT, RESOURCE_SPIRIT, RESOURCE_EMANATION, RESOURCE_ESSENCE].forEach(res => {
                           text += ''+res+':'+_.get(Memory, 'stock.'+res, 0)+', '; 
                        });
                        room.visual.text(text ,0 + 0.1, (line++)+0.1, {align: 'left', opacity: 0.8, color: '#00DD00'})
                        log+=text+' ';
                    }
                }
                
                if (0 && room.memory.factoryStayTime && (Game.time - room.memory.factoryStayTime)>100 && !room.memory.factoryDone && log) {
                    console.log('Factory.stay in room',helpers.getRoomLink(room.name), log);
                }
            }
        }


        
        if (1 && !(Game.time%tick1) && myRoom.factory !== undefined && room.terminal && room.storage) {
            let factoryInfo = factoryConfig[myRoom.factory];
            if (room.memory.factory == undefined) {
                let factorys = room.find(FIND_MY_STRUCTURES, {filter: obj=>obj.structureType == STRUCTURE_FACTORY});
                if (factorys.length) {
                    room.memory.factory = factorys[0].id;
                } else {
                    room.memory.factory = 0;
                }
            } else if (!room.memory.factory) {
                return;
            }
            let factory = Game.getObjectById(room.memory.factory);
            if (!factory) {
                room.memory.factory = undefined;
                return;
            }
            //check factory and run produce
            if (factory && factoryInfo && factoryInfo.produce && factoryInfo.produce.length) {
                let isProduce = false;
                let produceAll = true;
                for(let produceInfo of factoryInfo.produce){
                    let productAmount = room.storage.store[produceInfo.product] + room.terminal.store[produceInfo.product] + factory.store[produceInfo.product];
                    //check conditions
                    let checked = true;
                    if (produceInfo.conditions){
                        for (let condition of produceInfo.conditions){
                            let condRes = condition.resource;
                            let condAmount = condition.amount;
                            if (1 || condRes == RESOURCE_ENERGY) {
                                checked = checked && ((room.terminal.store[condRes] + room.storage.store[condRes]) > condAmount);
                            } else {
                                checked = checked && ((room.terminal.store[condRes]) > condAmount);    
                            }
                            
                        }
                    }
                    if (checked && produceInfo.needAmount && productAmount < produceInfo.needAmount){
                        //need produce. Check ingridients
                        let needResource = false;
                        produceAll = false;
                        let commoInfo = COMMODITIES[produceInfo.product];
                        if (!commoInfo) {
                            Game.notify('Invalid factory product '+produceInfo.product);continue;
                        }
                        for (let ingridientsResource in commoInfo.components) {
                            let needAmount = commoInfo.components[ingridientsResource] - factory.store[ingridientsResource];
                            //console.log(room.name, '!WWWWWWWWWWWWWWWWWWWWWWWWWWWW', needAmount, ingridientsInfo.resource);
                            if (needAmount > 0){
                                needResource = true; 
                                //console.log(room.name, '!WWWWWWWWWWWWWWWWWWWWWWWWWWWW! need resource', ingridientsInfo.resource, needAmount );
                                if (!room.memory.factoryNeed) {
                                    room.memory.factoryNeed = {};
                                }
                                let external = [RESOURCE_ENERGY].includes(ingridientsResource)?0:1;
                                if (!room.memory.factoryNeed[ingridientsResource]) {
                                    room.memory.factoryNeed[ingridientsResource] = {amount:needAmount, external: external};    
                                }
                            }
                        }
                        
                        // for (let ingridientsInfo of produceInfo.ingridients) {
                        //     let needAmount = ingridientsInfo.amount - factory.store[ingridientsInfo.resource];
                        //     //console.log(room.name, '!WWWWWWWWWWWWWWWWWWWWWWWWWWWW', needAmount, ingridientsInfo.resource);
                        //     if (needAmount > 0){
                        //         needResource = true; 
                        //         //console.log(room.name, '!WWWWWWWWWWWWWWWWWWWWWWWWWWWW! need resource', ingridientsInfo.resource, needAmount );
                        //         if (room.memory.factoryNeed === undefined){
                        //             room.memory.factoryNeed = {};
                        //         }
                        //         if (room.memory.factoryNeed[ingridientsInfo.resource] === undefined) {
                        //             room.memory.factoryNeed[ingridientsInfo.resource] = {amount:needAmount, external: ingridientsInfo.external?1:0};    
                        //         }
                        //     }
                        // }
                        if (!needResource && !isProduce && !factory.cooldown){
                            let res = factory.produce(produceInfo.product);
                            //console.log('!WWWWWWWWWWWWWWWWWWWWWWWWWWWW! produce resource', produceInfo.product, res );
                            if (res == OK) {
                                isProduce = true;
                                room.memory.factoryLastProduct = produceInfo.product;
                                if ([RESOURCE_DEVICE, RESOURCE_MACHINE, RESOURCE_ESSENCE,RESOURCE_ORGANISM].includes(produceInfo.product)) {
                                    require('profiler').dayStats(produceInfo.product);
                                }
                            } else if (res == ERR_INVALID_TARGET || res == ERR_BUSY) {
                                room.memory.factoryNeedPower = 1;
                            }
                        }
                    }
                }
                if (produceAll) {
                    room.memory.factoryDone = 1;
                } else {
                    room.memory.factoryDone = 0;
                }
            }
            
        }        
    },
            
            

};