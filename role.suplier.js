var helpers = require('helpers');

var roleSuplier = {
    getBody: function (spawn) {
        if (!Game.spawns[spawn] || !Game.spawns[spawn].room) return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
        let cap = Game.spawns[spawn].room.energyCapacityAvailable;
        if (Game.shard.name == 'shard2') {
            //if (Game.spawns[spawn].room.name == "E55N27") return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
        }
        if (Game.shard.name == 'shard0') {
            if (Game.spawns[spawn].room.name == "E83N55" && Game.spawns[spawn].room.controller.level < 5) return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
        }
        // if (Game.spawns[spawn].room.energyAvailable <= 300) { cap = 300 };
        if (cap >= 1950) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];//MOVE*13,CARRY*26 carry	1.300K
        if (cap >= 1800) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*12,CARRY*24
        if (cap >= 1350) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; // sum	1.350K MOVE*9,CARRY*18 carry	900.000
        if (cap >= 1200) return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
        if (cap >= 600) return [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,];
        if (cap >= 300) return [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY];
    },
    
    checkHibernate: function(creep, label="other") {
        let sleepTime = 3;
        if (Game.cpu.bucket < 9500) {
            sleepTime = 5;
        }
        if (Game.cpu.bucket < 5000) {
            sleepTime = 10;
        }
        creep.room.memory['hibernate_'+label] = Game.time + sleepTime;
        //return;
        // if (Game.time < creep.memory.hibernateCheck) return;
        // if (Game.cpu.bucket < 4000) {
        //     creep.memory.hibernate = Game.time+5;
        //     creep.memory.hibernateCheck = Game.time+15;
        // }
    },
    
    isHibernate: function(creep, label="other") {
        if (Game.time < creep.room.memory['hibernate_'+label]) {
            //creep.say('⏱︎'+label);
            return 1;
        }
        return 0;
    },
    
    factoryDeal: function(creep, factoryEndProduct = []) {
        if (creep.memory.role == 'helper') return 1;
        if (0) { //get from Factory to Terminal ALL
            let factoryRoom = 'E77N55';
            if (creep.room.name == factoryRoom){
                creep.say('!!');
                let factory = Game.getObjectById(creep.room.memory.factory);
                if (factory && factory.store.getUsedCapacity()) {
                    let total = creep.store.getUsedCapacity();
                    
                     if (!total && factory.store.getUsedCapacity()) {
                        creep.moveTo(factory, {visualizePathStyle: {stroke: '#ffaa00'}});
                        if (creep.pos.isNearTo(factory)){
                            creep.say('Get');
                            for(const resourceType in factory.store) {
                                creep.withdraw(factory, resourceType);
                            }
                        }
                    } else {
                        creep.say('Put');
                        creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                        for(const resourceType in creep.store) {
                            creep.transfer(creep.room.terminal, resourceType);
                            break;
                        }
                    }
                    return;
                }
            }
        }
        if (this.isHibernate(creep,'fact')) return 1;
        let total = creep.store.getUsedCapacity();
        
         var factoryPriorityRoomsPerShard = {
            'shard0': ['E79N52', 'E79N54', 'E81N53', 'E83N54', 'E87N56', 'E83N58'],
            'shard2': ['E45N29', 'E58N22', 'E55N21', 'E59N24', 'E58N27', 'E55N27'],
        }
        let factoryPriorityRooms = factoryPriorityRoomsPerShard[Game.shard.name]?factoryPriorityRoomsPerShard[Game.shard.name]:[];
        
        // creep.say('f...');
        if (1 && creep.room.memory.factoryNeed && Object.keys(creep.room.memory.factoryNeed).length && !creep.memory.factoryDelivery && !creep.memory.lab && creep.memory.role != 'helper' && (factoryPriorityRooms.indexOf(creep.room.name)>=0 || creep.room.energyAvailable > 0.7*creep.room.energyCapacityAvailable || creep.memory.role == 'transporter')) {
            // creep.say('fD...');
            let deliverySet = false;
            for (resource in creep.room.memory.factoryNeed){
                let needInfo = creep.room.memory.factoryNeed[resource];
                if (needInfo && (!needInfo.delivery || Game.time>needInfo.delivery) && !deliverySet) {
                    if ((creep.room.terminal.store[resource] && creep.room.terminal.store[resource]>=needInfo.amount)
                    || (creep.room.storage.store[resource] && creep.room.storage.store[resource]>=needInfo.amount)
                    ){
                        creep.memory.factoryDelivery = {resource: resource, amount: needInfo.amount};
                        needInfo.delivery = Game.time+50;
                        deliverySet = true; 
                    } else {
                        if (needInfo.external) {
                            //need resource
                            if (creep.room.memory.needResource == undefined) {
                                creep.room.memory.needResource = [];
                            }
                            if (creep.room.memory.needResource.indexOf(resource) == -1){
                                creep.room.memory.needResource.push(resource);    
                                //Game.notify(Game.time+' '+creep.room.name+' needed resource to Factory '+resource,180);
                                //console.log(creep.room.name,' needed resource to Factory',resource);
                            }
                        }
                    }
                } else {
                    // creep.say('del_'+resource);
                    // creep.room.memory.factoryNeed[resource] = undefined
                }
                
            }
        }
        
        if (1 && creep.memory.factoryDelivery) {
            let factory = Game.getObjectById(creep.room.memory.factory);
            if (factory && factory.store.getFreeCapacity()> 1500){
                creep.say('fD');
                let resource = creep.memory.factoryDelivery.resource;
                let amount = creep.memory.factoryDelivery.amount;
                
                if (creep.store[resource]){
                    creep.say('fD transfer');
                    creep.moveTo(factory);
                    let res = creep.transfer(factory, resource);
                    if (res == OK) {
                        creep.memory.factoryDelivery = undefined;
                        creep.room.memory.factoryNeed[resource] = undefined;
                        delete creep.room.memory.factoryNeed[resource];
                    }
                } else {
                    if (creep.store.getFreeCapacity() >= amount || !creep.store.getUsedCapacity()) {
                        creep.say('fD get Res');
                        let terminal = creep.room.terminal;
                        if (!terminal.store[resource]) {
                            terminal = creep.room.storage;
                        }
                        creep.moveTo(terminal);    
                        let res = creep.withdraw(terminal, resource);
                        if (res == ERR_NOT_ENOUGH_RESOURCES) {
                            creep.memory.factoryDelivery = undefined;
                            creep.room.memory.factoryNeed[resource] = undefined;
                            delete creep.room.memory.factoryNeed[resource];
                        }
                    
                    } else {
                        let terminal = creep.room.terminal;
                        if (!terminal.store.getFreeCapacity()) {
                            terminal = creep.room.storage;
                        }
                        
                        creep.moveTo(terminal);    
                        let res = -1;
                        for(const resourceType in creep.store) {
                            res = creep.transfer(terminal, resourceType);
                            break;
                        }
                        //let res = creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                        creep.say('fDempty'+res);
                    }
                }
                return;                
            }
        }
        
        if (1 && !(Game.time%1) && creep.room.memory.factory && factoryEndProduct.length && !creep.memory.factoryReturn && creep.memory.role != 'helper' && (factoryPriorityRooms.indexOf(creep.room.name)>=0 || creep.room.energyAvailable > 0.7*creep.room.energyCapacityAvailable) ) {
            let factory = Game.getObjectById(creep.room.memory.factory);
            if (factory){
                for (let resource of factoryEndProduct) {
                    let minAmount = 1000;
                    if ([RESOURCE_LEMERGIUM, RESOURCE_HYDROGEN,RESOURCE_OXIDANT].indexOf(resource) !== -1) {
                        minAmount = 1500;
                    }
                    if ([RESOURCE_COMPOSITE, RESOURCE_LIQUID, RESOURCE_CRYSTAL].indexOf(resource) !== -1) {
                        minAmount = 100;
                    }
                    if ([RESOURCE_ALLOY,RESOURCE_CONDENSATE, RESOURCE_WIRE].indexOf(resource) !== -1) {
                        minAmount = 60;
                    }
                    if ([RESOURCE_TUBE, RESOURCE_CONCENTRATE, RESOURCE_SWITCH].indexOf(resource) !== -1) {
                        minAmount = 10;
                    }
                    if ([RESOURCE_FIXTURES, RESOURCE_FRAME, RESOURCE_HYDRAULICS, RESOURCE_MACHINE, RESOURCE_EXTRACT, RESOURCE_SPIRIT, RESOURCE_EMANATION, RESOURCE_ESSENCE,
                        RESOURCE_TRANSISTOR, RESOURCE_MICROCHIP, RESOURCE_CIRCUIT, RESOURCE_DEVICE,
                    ].indexOf(resource) !== -1) {
                        minAmount = 1;
                    }
                    if (Game.shard.name == 'shard2' && creep.room.name == 'E59N24' && resource == RESOURCE_ZYNTHIUM_BAR) {
                        minAmount = 5000;
                    }
                    if (Game.shard.name == 'shard3' && creep.room.name == 'E42N31' && resource == RESOURCE_KEANIUM_BAR) {
                        minAmount = 5000;
                    }
                    if (Game.shard.name == 'shard2' && creep.room.name == 'E55N27' && resource == RESOURCE_OXIDANT) {
                        minAmount = 5000;
                    }
                    if (Game.shard.name == 'shard2' && creep.room.name == 'E55N21' && resource == RESOURCE_KEANIUM_BAR) {
                        minAmount = 5000;
                    }
                    
                    
                    if (factory.store[resource]>= minAmount) {
                        creep.memory.factoryReturn = resource;
                    }
                }
            }
        }
        
        if (1 && creep.memory.factoryReturn) {
            let factory = Game.getObjectById(creep.room.memory.factory);
            if (factory){
                creep.say('fR');
                let resource = creep.memory.factoryReturn;
                let terminal = creep.room.terminal;
                if (creep.room.terminal.store.getFreeCapacity() < 10000 && creep.room.storage.store.getFreeCapacity()>20000) {
                    terminal = creep.room.storage;
                }
                if (creep.room.terminal.store.getFreeCapacity() < 1000 && creep.room.storage.store.getFreeCapacity()>2000) {
                    terminal = creep.room.storage;
                }
                if (!creep.store[resource]){
                    if (total) {
                        creep.moveTo(terminal);    
                        let res = -1;
                        for(const resourceType in creep.store) {
                            res = creep.transfer(terminal, resourceType);
                            break;
                        }
                        creep.say('fRempty'+res);
                    } else {
                        creep.moveTo(factory);
                        let res = creep.withdraw(factory, resource);
                        creep.say('fRgetR'+res);
                        if (res == ERR_NOT_ENOUGH_RESOURCES) {
                            creep.memory.factoryReturn = undefined;
                        }
                    }
                } else {
                    creep.say('fR putRet');
                    creep.moveTo(terminal);    
                    let res = creep.transfer(terminal, resource);
                    if (res == OK) {
                        creep.memory.factoryReturn = undefined;
                    }
                }
                return;                
            }
        }
        
        this.checkHibernate(creep,'fact');
        return 1;
    },
    
    labDeal: function(creep, labInfo = []) {
        
        if (creep.memory.role == 'helper') return 1;
        
        if (0) { //get from lab to terminal
            
            let labnum = 5;
            let labroom = 'E23N22';
            var labMineral = RESOURCE_CATALYZED_GHODIUM_ALKALIDE;
            
            if( creep.room.name == labroom) {
                let labs = creep.room.find(FIND_STRUCTURES, {
                  filter: { structureType: STRUCTURE_LAB }
                });
                if ((labs[labnum].mineralAmount && labs[labnum].mineralType == labMineral) || creep.store[labMineral]){
                    if (!total){
                        creep.moveTo(labs[labnum], {visualizePathStyle: {stroke: '#ffaa00'}});
                        creep.withdraw(labs[labnum], labs[labnum].mineralType);
                    } else {
                        creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                        creep.transfer(creep.room.terminal, labMineral);
                        creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                        creep.transfer(creep.room.terminal, RESOURCE_OXYGEN);
                    }
                    return;
                }
                // creep.moveTo(labs[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                // creep.transfer(labs[1], RESOURCE_UTRIUM_HYDRIDE);
            }
        }
        
        if (0 || creep.room.memory.resetLab) { 
          
            //get from lab to terminal ALL
            let labroom = 'E58N22_';
            if(creep.room.name == labroom || creep.room.memory.resetLab) {
                creep.say('resetLab');
                let labs = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {return (structure.structureType == STRUCTURE_LAB && structure.mineralAmount);
                    }
                });
                if (labs.length || creep.store.getUsedCapacity()){
                    let terminal = creep.room.terminal;
                    if (terminal.store.getFreeCapacity()<3000 && creep.room.storage.store.getFreeCapacity()>3000) {
                        terminal = creep.room.storage;
                    }
                    if (creep.store.getFreeCapacity() && labs.length && !(creep.store.getUsedCapacity() && creep.pos.isNearTo(terminal)) ){
                        creep.moveTo(labs[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                        let res = creep.withdraw(labs[0], labs[0].mineralType);
                        if (res == OK) {
                            //creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});    
                        }
                    } else {
                        
                        creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                        let res = -1;
                        for(const resourceType in creep.store) {
                            res = creep.transfer(terminal, resourceType);
                            break;
                        }
                        if (res == OK && labs.length>1) {
                            //creep.moveTo(labs[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                    return;
                } else if (creep.room.memory.resetLab) {
                    creep.room.memory.resetLab = undefined;
                }
                
            }
        }
        
        if (0 || creep.room.memory.harvestLab) {  
          
            //get from lab to terminal ALL
            let labroom = 'E58N22_';
            if(creep.room.name == labroom || creep.room.memory.harvestLab) {
                creep.say('harvestLab');
                let labs = creep.room.find(FIND_STRUCTURES, {filter:{structureType: STRUCTURE_LAB}}).filter((lab, index) => lab.mineralAmount > 30 && labInfo[index] && ['endProduct', 'endFullProduct'].includes(labInfo[index]));
                labs.forEach(lab=>lab.room.visual.text("*", lab.pos.x, lab.pos.y, {color: 'green', font: 0.8})); 
                if (labs.length || creep.store.getUsedCapacity()){
                    if (creep.store.getFreeCapacity() && labs.length && !(creep.store.getUsedCapacity() && creep.pos.isNearTo(creep.room.terminal)) ){
                        creep.moveTo(labs[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                        let res = creep.withdraw(labs[0], labs[0].mineralType);
                        if (res == OK) {
                            //creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});    
                        }
                    } else {
                        creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                        let res = -1;
                        for(const resourceType in creep.store) {
                            res = creep.transfer(creep.room.terminal, resourceType);
                            break;
                        }
                        if (res == OK && labs.length>1) {
                            //creep.moveTo(labs[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                    return;
                } else if (creep.room.memory.harvestLab) {
                    creep.room.memory.harvestLab = undefined;
                }
                
            }
        }
        
        if (creep.room.memory.boostLab && creep.room.terminal && creep.room.memory.boostLab.boosts) {
            const labInfo = creep.room.memory.boostLab;
            let clearBoostLab = Game.time < labInfo.time && !labInfo.completed;
            let restoreBoostLab = Game.time >= labInfo.time;
            if (clearBoostLab || restoreBoostLab) {
                let index = 0;
                let labCount = labInfo.boosts.length;
                let labs = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            if (structure.structureType == STRUCTURE_LAB) {
                                index++;
                            }
                            return (structure.structureType == STRUCTURE_LAB && structure.mineralAmount && index <= labCount);
                    }
                });
                if (clearBoostLab) creep.say('ndLB'+labs.length);
                if (restoreBoostLab) creep.say('rsLB'+labs.length);
                
                if (labs.length || creep.store.getUsedCapacity()){
                    if (creep.store.getFreeCapacity() && labs.length && !(creep.store.getUsedCapacity() && creep.pos.isNearTo(creep.room.terminal)) ){
                        creep.moveTo(labs[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                        let res = creep.withdraw(labs[0], labs[0].mineralType);
                    } else {
                        creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                        let res = -1;
                        for(const resourceType in creep.store) {
                            res = creep.transfer(creep.room.terminal, resourceType);
                            break;
                        }
                    }
                    return;
                } else {
                    if (clearBoostLab) {
                        labInfo.completed = 1;
                    }
                    if (restoreBoostLab) {
                        creep.room.memory.boostLab = undefined;
                    }
                }
            }
        }
        
        // if (!(Game.time%1) && creep.room.memory.lab == 1) {
        //     creep.room.memory.lab = undefined;
        // }
        if (creep.room.memory.lab && Game.time > creep.room.memory.lab + 50) {
            creep.room.memory.lab = undefined;
        }
        
        if (this.isHibernate(creep,'lab') && !creep.memory.lab)  {return 1;}
        
        
        let total = creep.store.getUsedCapacity();
        
        if (creep.memory.lab && !creep.spawning && !creep.store[RESOURCE_POWER]){
            if (creep.memory.lab.return) {
                //return end product to storage
                if (total && !creep.store[creep.memory.lab.mineral]) {
                    let target = creep.room.storage;
                    if (target.store.getFreeCapacity() <= 0) {
                        creep.say('l!');
                        target = creep.room.terminal;
                    }
                    //empty cargo
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});    
                    // transfer all resources
                    for(const resourceType in creep.store) {
                        creep.transfer(target, resourceType);
                        break;
                    }
                } else if (creep.store[creep.memory.lab.mineral]) {
                    let target = creep.room.terminal;
                    if (target.store[creep.memory.lab.mineral] > 50000) {
                        target = creep.room.storage;
                    }
                    //!todo check is full
                    
                    //return end product
                    let res = creep.transfer(target, creep.memory.lab.mineral);
                    if (res == ERR_NOT_IN_RANGE){
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});    
                    } else if (res == OK) {
                        creep.memory.lab = undefined;                        
                        creep.room.memory.lab = undefined;
                    }
                } else if (!total) {
                    //go to lab
                    let lab = Game.getObjectById(creep.memory.lab.labId);
                    if (lab && lab.mineralAmount) {
                        creep.moveTo(lab, {visualizePathStyle: {stroke: '#ffaa00'}});
                        creep.withdraw(lab, creep.memory.lab.mineral);
                    } else {
                        creep.memory.lab = undefined;
                        creep.room.memory.lab = undefined;
                    }
                } else {
                    console.log('error in suply labs');
                    creep.memory.lab = undefined;
                    creep.room.memory.lab = undefined;
                }
            } else {
                //transport mineral to lab
                if (!creep.store[creep.memory.lab.mineral]) {
                    //get mineral
                    let target = creep.room.terminal;
                    if (!target.store[creep.memory.lab.mineral]){
                        target = creep.room.storage;
                    }
                    if (!target.store[creep.memory.lab.mineral]){
                        creep.memory.lab = undefined;
                        creep.room.memory.lab = undefined;
                    } else {
                        let res = creep.withdraw(target, creep.memory.lab.mineral, Math.min(creep.memory.lab.amount, creep.store.getCapacity(), target.store[creep.memory.lab.mineral]));
                        //console.log(creep.name, 'get mineral '+creep.memory.lab.mineral+' in room ',creep.room.name, res);
                        if (res == ERR_FULL && total){
                            for (let res in creep.store){
                                creep.transfer(target, res);
                            }
                            //creep.transfer(target, RESOURCE_ENERGY);
                        } else if (res == ERR_NOT_IN_RANGE){
                            creep.moveTo(target, {range: 1,reusePath:0, visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                } else {
                    //transfer to lab
                    let lab = Game.getObjectById(creep.memory.lab.labId);
                    if (lab) {
                        let res = creep.transfer(lab, creep.memory.lab.mineral);
                        if (res == ERR_NOT_IN_RANGE){
                            creep.moveTo(lab, {range: 1,reusePath:0, visualizePathStyle: {stroke: '#ffaa00'}});
                        } else if (res == OK) {
                            creep.memory.lab = undefined;
                            creep.room.memory.lab = undefined;
                        } else {
                            creep.say(res+ 'sssdsd');
                            creep.memory.lab = undefined;
                            creep.room.memory.lab = undefined;
                            if (res == ERR_INVALID_TARGET) {
                                //Game.notify('lab transfer error in room '+res+' '+creep.room.name);
                                creep.room.memory.resetLab = 1;
                            }
                        }
                    } else {
                        creep.memory.lab = undefined;
                        creep.room.memory.lab = undefined;
                    }
                    
                }   
            }
            return;
        }
        
        
        if (!creep.memory.lab && !creep.room.memory.lab && creep.room.name == 'E41N5'){ //??????????
            //check labs
            var labs = creep.room.find(FIND_STRUCTURES, {
                filter: { structureType: STRUCTURE_LAB }
            });
            for(let lab of labs) {
                if (lab.store.getFreeCapacity(RESOURCE_ENERGY) > creep.store.getCapacity()/2) {
                    creep.memory.lab = {mineral: RESOURCE_ENERGY, labId: lab.id, amount: Math.min(lab.store.getFreeCapacity(RESOURCE_ENERGY),creep.store.getCapacity())};
                    creep.room.memory.lab = Game.time;
                    break;
                }
            }
             if (creep.memory.lab) {
                return;
            }
        }
    

        if (!(Game.time%1) && !creep.memory.lab && !creep.room.memory.lab && labInfo.length){
            //check labs
            var labs = creep.room.find(FIND_STRUCTURES, {
               filter: { structureType: STRUCTURE_LAB }
            });
            //console.log('finding lab in room', creep.room.name);
            
            if (1 || labs.length >= labInfo.length){
                //console.log(creep.name, creep.memory.room, JSON.stringify(labInfo));
                for(let labNum in labInfo) {
                    if (labNum>=labs.length) {
                        continue;
                    }
                    let minEndProductAmount = creep.store.getCapacity();
                    let carryCapacity =creep.store.getCapacity();
                    if ([RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE,RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_ZYNTHIUM_ACID].includes(labInfo[labNum])){
                        carryCapacity = 500;
                    }
                    // if (labInfo[labNum] && [RESOURCE_HYDROXIDE].includes(labs[labNum].mineralType)) {
                    //     minEndProductAmount = 500;    
                    // }
                    if (labInfo[labNum] == 'endProduct' && labs[labNum].mineralAmount >= minEndProductAmount) { // labs[labNum].mineralCapacity-100) { 
                        creep.memory.lab = {mineral: labs[labNum].mineralType, labId: labs[labNum].id, return: 1};
                        creep.room.memory.lab = Game.time;
                        break;
                    } else if (labInfo[labNum] == 'endFullProduct' && labs[labNum].mineralAmount > labs[labNum].mineralCapacity-100) { 
                        creep.memory.lab = {mineral: labs[labNum].mineralType, labId: labs[labNum].id, return: 1};
                        creep.room.memory.lab = Game.time;;
                        break;
                    } else if (labInfo[labNum] && labInfo[labNum] != 'endProduct' /*&& labInfo[labNum] != 'endFullProduct'*/ && labs[labNum].mineralAmount <= (labInfo[labNum] == 'endFullProduct'?1000:(labs[labNum].mineralCapacity-carryCapacity))){ 
                        let labResource =  labInfo[labNum] == 'endFullProduct'? labs[labNum].mineralType : labInfo[labNum];
                        if (labResource) {
                            if (creep.room.terminal.store[labResource] || creep.room.storage.store[labResource]) {
                                creep.memory.lab = {mineral: labResource, labId: labs[labNum].id, amount: labs[labNum].mineralCapacity-labs[labNum].mineralAmount};
                                creep.room.memory.lab = Game.time;;
                                break;
                                //console.log(creep.name, creep.memory.room, JSON.stringify(labInfo),labNum,  labInfo[labNum], labs.length,  labs[labNum].mineralAmount, labs[labNum].mineralCapacity, labs[0].energy, labs[labNum].energyCapacity, creep.room.terminal.store[labInfo[labNum]] , creep.room.storage.store[labInfo[labNum]]);    
                            } else if (1 || [RESOURCE_UTRIUM_LEMERGITE, RESOURCE_ZYNTHIUM_KEANITE].indexOf(labResource) == -1) {
                                //find mineral in other room and send
                                //Game.rooms['E81N58'].memory.needResource = [];
                                if (creep.room.memory.needResource == undefined) {
                                    creep.room.memory.needResource = [];
                                }
                                if (creep.room.memory.needResource.indexOf(labResource) == -1){
                                    creep.room.memory.needResource.push(labResource);    
                                    //Game.notify(Game.time+' '+creep.room.name+' needed resource '+labInfo[labNum],180);
                                    //console.log(creep.room.name,' needed resource ',labResource);
                                }
                            }
                        }
                    } 
                }
            }
            if (creep.memory.lab) {
                return;
            }
        }       
        
        this.checkHibernate(creep,'lab');
        return 1;
    },
    
    storageTerminalWork: function(creep) {
        
        if (!creep.room.storage || !creep.room.terminal) return 1;
        if (creep.memory.role == 'helper') return 1;
        if (this.isHibernate(creep,'term')) return 1;
        
        let roomEnergy = creep.room.energyAvailable/creep.room.energyCapacityAvailable;
        if (creep.memory.role == 'transporter') {
            if (creep.memory.storageLinkId) {
                let storageLink = Game.getObjectById(creep.memory.storageLinkId);
                roomEnergy = storageLink && storageLink.store[RESOURCE_ENERGY]?0:1;    
            } else {
                roomEnergy = 1;    
            }
            
        }
        
        
        if (0  && Game.shard.name == 'shard2') {
            let total = creep.store.getUsedCapacity();
            const mineralToTerminal = RESOURCE_SILICON;//RESOURCE_OPS;// RESOURCE_GHODIUM;//RESOURCE_CATALYZED_KEANIUM_ALKALIDE;//RESOURCE_CATALYST;// RESOURCE_OPS;
            const mineralRoomExec = 'E49N22'; 
            const andSendTo = '';
            const mineralAmount = 90000; 
            const metka = mineralToTerminal+mineralRoomExec+andSendTo+mineralAmount;
            //creep.room.memory.metka = undefined;
            if (creep.room.name == mineralRoomExec) {
                console.log('manual mineralToTerminal!!!!!!!!!!!!!!!!!!!!')
            }
            if (creep.room.memory.metka != metka && (creep.room.name == mineralRoomExec) &&  creep.room.storage && creep.room.terminal && ((creep.room.storage.store[mineralToTerminal] && (creep.room.terminal.store[mineralToTerminal]<mineralAmount || creep.room.terminal.store[mineralToTerminal] == undefined)) || creep.store[mineralToTerminal])) {
                if (!total){
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.withdraw(creep.room.storage, mineralToTerminal);
                    creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                } else {
                    for(const resourceType in creep.store) {
                        creep.transfer(creep.room.terminal, resourceType);
                    }
                    // creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                    // creep.transfer(creep.room.terminal, mineralToTerminal);
                    creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                    
                }
                //Game.rooms['E81N58'].terminal.send(RESOURCE_UTRIUM_LEMERGITE, 54000, 'E82N56');
                creep.say('!!');
                return;
            } else if (creep.room.memory.metka != metka && (creep.room.name == mineralRoomExec) && andSendTo != '' && creep.room.terminal.store[mineralToTerminal] && creep.room.terminal.store[mineralToTerminal] >= 100) {
              const res = creep.room.terminal.send(mineralToTerminal, mineralAmount, andSendTo);  
              console.log(creep.room.name, mineralToTerminal, creep.room.terminal.store[mineralToTerminal], res);
              if (res == OK){
                creep.room.memory.metka = metka;    
              }
              return;
            }
        }
        if (0  && Game.shard.name == 'shard2') {
            let total = creep.store.getUsedCapacity();
            const mineralToTerminal = RESOURCE_POWER;//RESOURCE_OPS;// RESOURCE_GHODIUM;//RESOURCE_CATALYZED_KEANIUM_ALKALIDE;//RESOURCE_CATALYST;// RESOURCE_OPS;
            const mineralRoomExec = 'E41N5'; 
            const andSendTo = 'E55N27';
            const mineralAmount = 55000; 
            const metka = mineralToTerminal+mineralRoomExec+andSendTo+mineralAmount;
            //creep.room.memory.metka = undefined;
            
            if (creep.room.memory.metka != metka && (creep.room.name == mineralRoomExec) &&  creep.room.storage && creep.room.terminal && ((creep.room.storage.store[mineralToTerminal] && (creep.room.terminal.store[mineralToTerminal]<mineralAmount || creep.room.terminal.store[mineralToTerminal] == undefined)) || creep.store[mineralToTerminal])) {
                if (!total){
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.withdraw(creep.room.storage, mineralToTerminal);
                    creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                } else {
                    for(const resourceType in creep.store) {
                        creep.transfer(creep.room.terminal, resourceType);
                    }
                    // creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                    // creep.transfer(creep.room.terminal, mineralToTerminal);
                    creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                    
                }
                //Game.rooms['E81N58'].terminal.send(RESOURCE_UTRIUM_LEMERGITE, 54000, 'E82N56');
                creep.say('!!');
                return;
            } else if (creep.room.memory.metka != metka && (creep.room.name == mineralRoomExec) && andSendTo != '' && creep.room.terminal.store[mineralToTerminal] && creep.room.terminal.store[mineralToTerminal] >= 100) {
              const res = creep.room.terminal.send(mineralToTerminal, mineralAmount, andSendTo);  
              console.log(creep.room.name, mineralToTerminal, creep.room.terminal.store[mineralToTerminal], res);
              if (res == OK){
                creep.room.memory.metka = metka;    
              }
              return;
            }
        }
        
        if (0  && Game.shard.name == 'shard0') {
            let total = creep.store.getUsedCapacity();
            const mineralToTerminal = RESOURCE_LEMERGIUM;//RESOURCE_OPS;// RESOURCE_GHODIUM;//RESOURCE_CATALYZED_KEANIUM_ALKALIDE;//RESOURCE_CATALYST;// RESOURCE_OPS;
            const mineralRoomExec = 'E85N57'; 
            const andSendTo = 'E79N59';
            const mineralAmount = 269000; 
            const metka = mineralToTerminal+mineralRoomExec+andSendTo+mineralAmount;
            //creep.room.memory.metka = undefined;
            
            if (creep.room.memory.metka != metka && (creep.room.name == mineralRoomExec) &&  creep.room.storage && creep.room.terminal && ((creep.room.storage.store[mineralToTerminal] && (creep.room.terminal.store[mineralToTerminal]<mineralAmount || creep.room.terminal.store[mineralToTerminal] == undefined)) || creep.store[mineralToTerminal])) {
                if (!total){
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.withdraw(creep.room.storage, mineralToTerminal);
                    creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                } else {
                    for(const resourceType in creep.store) {
                        creep.transfer(creep.room.terminal, resourceType);
                    }
                    // creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                    // creep.transfer(creep.room.terminal, mineralToTerminal);
                    creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                    
                }
                //Game.rooms['E81N58'].terminal.send(RESOURCE_UTRIUM_LEMERGITE, 54000, 'E82N56');
                return;
            } else if (creep.room.memory.metka != metka && (creep.room.name == mineralRoomExec) && andSendTo != '' && creep.room.terminal.store[mineralToTerminal] && creep.room.terminal.store[mineralToTerminal] >= 100) {
              const res = creep.room.terminal.send(mineralToTerminal, mineralAmount, andSendTo);  
              console.log(creep.room.name, mineralToTerminal, creep.room.terminal.store[mineralToTerminal], res);
              if (res == OK){
                creep.room.memory.metka = metka;    
              }
              return;
            }
        }
        if (0  && Game.shard.name == 'shard0') {
            let total = creep.store.getUsedCapacity();
            const mineralToTerminal = RESOURCE_CATALYZED_GHODIUM_ACID;//RESOURCE_OPS;// RESOURCE_GHODIUM;//RESOURCE_CATALYZED_KEANIUM_ALKALIDE;//RESOURCE_CATALYST;// RESOURCE_OPS;
            const mineralRoomExec = 'E87N56'; 
            const andSendTo = 'E79N59';
            const mineralAmount = 269000; 
            const metka = mineralToTerminal+mineralRoomExec+andSendTo+mineralAmount;
            //creep.room.memory.metka = undefined;
            
            if (creep.room.memory.metka != metka && (creep.room.name == mineralRoomExec) &&  creep.room.storage && creep.room.terminal && ((creep.room.storage.store[mineralToTerminal] && (creep.room.terminal.store[mineralToTerminal]<mineralAmount || creep.room.terminal.store[mineralToTerminal] == undefined)) || creep.store[mineralToTerminal])) {
                if (!total){
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.withdraw(creep.room.storage, mineralToTerminal);
                    creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                } else {
                    for(const resourceType in creep.store) {
                        creep.transfer(creep.room.terminal, resourceType);
                    }
                    // creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                    // creep.transfer(creep.room.terminal, mineralToTerminal);
                    creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                    
                }
                //Game.rooms['E81N58'].terminal.send(RESOURCE_UTRIUM_LEMERGITE, 54000, 'E82N56');
                return;
            } else if (creep.room.memory.metka != metka && (creep.room.name == mineralRoomExec) && andSendTo != '' && creep.room.terminal.store[mineralToTerminal] && creep.room.terminal.store[mineralToTerminal] >= 100) {
              const res = creep.room.terminal.send(mineralToTerminal, mineralAmount, andSendTo);  
              console.log(creep.room.name, mineralToTerminal, creep.room.terminal.store[mineralToTerminal], res);
              if (res == OK){
                creep.room.memory.metka = metka;    
              }
              return;
            }
        }
       
        if (0 && Game.shard.name == 'shard0') {
            let total = creep.store.getUsedCapacity();
            const mineralToStorage = RESOURCE_LEMERGIUM_HYDRIDE;
            const mineralRoomExec = 'E79N59';
            const mineralAmount = 600000;
            if (creep.room.name == mineralRoomExec && creep.room.storage && creep.room.terminal && ((creep.room.terminal.store[mineralToStorage] && (creep.room.storage.store[mineralToStorage]<mineralAmount || creep.room.storage.store[mineralToStorage] == undefined)) || creep.store[mineralToStorage])){
                if (!total){
                    creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.withdraw(creep.room.terminal, mineralToStorage);
                    creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                } else {
                    for(const resourceType in creep.store) {
                        creep.transfer(creep.room.storage, resourceType);
                    }
                    // creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                    // creep.transfer(creep.room.storage, mineralToStorage);
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                return;
            }
        }
        
        
        //auto transfer goods to terminal
        if (!(Game.time%10) && creep.room.storage && creep.room.terminal && !creep.memory.goodsTransfer && creep.room.terminal.store.getFreeCapacity()>30000 && creep.pos.isNearTo(creep.room.storage)){
            let resource = 0;
            for(const resourceType in creep.room.storage.store) {
                if (resourceType != RESOURCE_ENERGY && (creep.room.storage.store[resourceType] < 3000 || (creep.room.storage.store[resourceType] && !creep.room.terminal.store[resourceType]))) {
                    creep.memory.goodsTransfer = resourceType;
                    break;
                }
                if ([RESOURCE_DEVICE, RESOURCE_MACHINE, RESOURCE_ESSENCE].includes(resourceType)) {
                    creep.memory.goodsTransfer = resourceType;
                    break;
                }
            }
        }
        if (creep.memory.goodsTransfer && creep.memory.goodsTransfer == RESOURCE_ENERGY) {
            creep.memory.goodsTransfer = undefined;
        } 
        
        if (creep.memory.goodsTransfer && creep.room.storage && creep.room.terminal && creep.room.terminal.store.getFreeCapacity()>30000) {
            if (creep.memory.goodsTransfer) {creep.say('gTransfer')};
            if (creep.room.terminal.store[creep.memory.goodsTransfer] > 6000) {
                creep.memory.goodsTransfer = undefined;
                return;
            }
            if((creep.store.getFreeCapacity() || creep.store.getUsedCapacity() == creep.store[RESOURCE_ENERGY]) && creep.room.storage.store[creep.memory.goodsTransfer]) {
                if (creep.store[RESOURCE_ENERGY]){
                    creep.transfer(creep.room.storage, RESOURCE_ENERGY);    
                } else {
                    creep.withdraw(creep.room.storage, creep.memory.goodsTransfer);    
                }
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else if (creep.store.getUsedCapacity()){
                for(const resourceType in creep.store) {
                    creep.transfer(creep.room.terminal, resourceType);
                }
                creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else {
                creep.memory.goodsTransfer = undefined;
            }
            return;
        }
        
        //auto transfer to storage 
        let doTransfer = false;
        if ( !((Game.time+5)%10) && creep.room.storage && creep.room.terminal && !creep.memory.backTransfer && creep.pos.isNearTo(creep.room.storage) && roomEnergy > 0.8) {
            if (creep.room.terminal.store.getFreeCapacity() < 150000 && creep.room.storage.store.getFreeCapacity()>100000){
                doTransfer = true;
            } else if (creep.room.terminal.store.getFreeCapacity() < 5000 && creep.room.storage.store.getFreeCapacity()>20000){
                doTransfer = true;
            } else if (creep.room.terminal.store.getFreeCapacity() < 500 && creep.room.storage.store.getFreeCapacity()>6000){
                doTransfer = true;
            }
        }
        
        if (doTransfer){
            //console.log(creep.room.name, 'auto transfer to storage');
            let resource = 0;
            for(const resourceType in creep.room.terminal.store) {
                if ([RESOURCE_ENERGY, /*RESOURCE_POWER,*/ RESOURCE_CONDENSATE].indexOf(resourceType) >= 0) {
                    continue;
                }
                if (creep.room.terminal.store[resourceType] > 18000) {
                    creep.memory.backTransfer = {resource: resourceType, amount:  creep.room.storage.store[resourceType] + Math.max(5000,  creep.room.terminal.store[resourceType] - 13000)};
                    console.log('transferToStorage in room', helpers.getRoomLink(creep.room.name), resourceType);
                    break;
                }
            }
        }
        
        if (1 && creep.memory.backTransfer && creep.room.storage && creep.room.terminal && creep.room.storage.store.getFreeCapacity()>50000) {
            if (creep.memory.backTransfer) {creep.say('backTrans');}
            let resource = creep.memory.backTransfer.resource;
            let amount = creep.memory.backTransfer.amount;
            
            if((creep.store.getFreeCapacity() || creep.store.getUsedCapacity() == creep.store[RESOURCE_ENERGY]) && creep.room.terminal.store[resource]) {
                if (creep.store[RESOURCE_ENERGY]){
                    creep.transfer(creep.room.storage, RESOURCE_ENERGY);    
                } else {
                    creep.withdraw(creep.room.terminal, resource);
                }
                creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
            } else if (creep.store.getUsedCapacity()){
                for(const resourceType in creep.store) {
                    creep.transfer(creep.room.storage, resourceType);
                }
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            if (!creep.room.terminal.store[resource] || creep.room.storage.store[resource] >= amount) {
                creep.memory.backTransfer = undefined;
            }
            return;
        }
        
        let total = creep.store.getUsedCapacity();
        let maxTerminalEnergyStore = 60000;
        // if (creep.room.name == 'E42N31') maxTerminalEnergyStore = 60000;
        // if (creep.room.name == 'E46N31') maxTerminalEnergyStore = 20000;
        if (Game.shard.name == 'shard2' && creep.room.name == 'E43N38') {
            maxTerminalEnergyStore = 250000;//29500;
        }
        // if (Game.shard.name == 'shard2' && creep.room.name == 'E43N38' && creep.room.storage && creep.room.storage.store.getFreeCapacity()> 700000 && !(Game.time%3)) {
        //     maxTerminalEnergyStore = 60000;//250000;//29500;
        //     creep.say('60k');
        // }
        //if (Game.shard.name == 'shard2' &&  creep.room.name == 'E45N29') maxTerminalEnergyStore = 20000;
        //if (Game.shard.name == 'shard2' &&  creep.room.name == 'E47N36') maxTerminalEnergyStore = 20000;
        if (creep.room.name == 'E77N55') maxTerminalEnergyStore = 295000;
        
        if (1  && !total && creep.room.storage && creep.room.terminal 
        &&  creep.room.storage.store[RESOURCE_ENERGY] < 9350000 && creep.room.terminal.store[RESOURCE_ENERGY]>maxTerminalEnergyStore && creep.room.storage.store.getFreeCapacity() > 10000 
        && (roomEnergy > 0.8 || creep.room.storage.store[RESOURCE_ENERGY] < 12000 || creep.room.terminal.store.getFreeCapacity() < 5000)
        && (creep.memory.role != 'helper' || creep.room.storage.store[RESOURCE_ENERGY] < 3000)){
            let res = creep.withdraw(creep.room.terminal, RESOURCE_ENERGY);
            if (res == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});     
            } else if (res == OK) {
                //creep.say(creep.room.terminal.store[RESOURCE_ENERGY]);
                creep.memory.terminalSuply = 1;    
            }
            return;
        }
        if (creep.memory.terminalSuply && creep.store[RESOURCE_ENERGY]){
            let res = creep.transfer(creep.room.storage, RESOURCE_ENERGY);
            if (res == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffaa00'}});     
            } else if (res == OK) {
                creep.memory.terminalSuply = undefined;    
            }   
            return;
        }
        
        //transfer to terminal needed res
        if (1 && creep.room.memory.transferToTerminal) {
            if (creep.room.storage.store.getFreeCapacity()>2000 && creep.room.terminal.store.getFreeCapacity()>10000) {
                creep.say('toTerm');
                let resource = creep.room.memory.transferToTerminal.resource;
                let amount = creep.room.memory.transferToTerminal.amount;
                if (creep.store[resource]) {
                    creep.moveTo(creep.room.terminal);
                    if (creep.pos.isNearTo(creep.room.terminal)) {
                        creep.transfer(creep.room.terminal, resource);
                    }
                } else {
                    creep.moveTo(creep.room.storage);
                    if (creep.pos.isNearTo(creep.room.storage)) {
                        if (creep.store.getUsedCapacity()) {
                            for(const resourceType in creep.store) {
                                creep.transfer(creep.room.storage, resourceType);
                            }    
                        } else {
                            let res = creep.withdraw(creep.room.storage, resource);
                            if (res == ERR_NOT_ENOUGH_RESOURCES) {
                                creep.room.memory.transferToTerminal = undefined;
                            }
                        }
                    }
                }
                if (creep.room.terminal.store[resource] >= amount) {
                    creep.room.memory.transferToTerminal = undefined;
                }
                return;
            } else {
                let res = freeSpace(creep.room.name);
                Game.notify('Need free space to transfer resources to terminal in room '+creep.room.name+' free space result '+res);
            }
        }
        
        this.checkHibernate(creep,'term');
        
        return 1;
    },

    /** @param {Creep} creep **/
    run: function(creep, labInfo = [], factoryEndProduct = []) {
        
        if (creep.room.memory.defendRoomMode && !(Game.time%3)) {
            creep.say('🛡️',0);
        }
        
       
        if (creep.room.name == creep.memory.room && (!creep.room.storage || !creep.room.storage.my)){
            if (creep.memory.storageId == undefined && creep.room.controller){
                creep.say('f');
                let storageContainer = creep.room.controller.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_CONTAINER
                                       && i.id != '6072186026dc9c29912ec581'
                    });
                if (storageContainer && creep.room.controller.pos.inRangeTo(storageContainer, 5)) {
                    creep.memory.storageId = storageContainer.id;
                } else {
                    creep.memory.storageId = 0
                }
            }
    
        }

        
        let total = creep.store.getUsedCapacity();
        
        //Game.getObjectById('5958a511163dbf74323199c9').send(RESOURCE_OPS, 30000, 'E83N51')
        
        require('profiler').start('storageTerminalWork');
        if (!creep.room.memory.storageLinkPos && !this.storageTerminalWork(creep)) {
            require('profiler').end('storageTerminalWork');
            return;
        }
        require('profiler').end('storageTerminalWork');
            
        
        if (1 && creep.room.storage && creep.room.terminal) { //factoryand lab deal
            require('profiler').start('factoryDeal');
            if (!creep.room.memory.factoryNearLinkPos && !this.factoryDeal(creep, factoryEndProduct)) {
                require('profiler').end('factoryDeal');
                return;
            }
            require('profiler').end('factoryDeal');
            
            require('profiler').start('labDeal');
            if (!this.labDeal(creep, labInfo)) {
                require('profiler').end('labDeal');
                return;
            }
            require('profiler').end('labDeal');
        }

      
        
        if (!(Game.time%350) && creep.room.storage && creep.room.terminal && creep.room.controller.level == 8 && creep.memory.role != 'helper') {
            //check nuker
            const nukers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_NUKER;}});
            if (nukers.length){
                const nuker = nukers[0];
                if (nuker.store.getFreeCapacity(RESOURCE_GHODIUM) && (creep.room.terminal.store[RESOURCE_GHODIUM] || creep.room.storage.store[RESOURCE_GHODIUM]) ) {
                    creep.memory.chargeNuker = nuker.id;
                }
            }
        }
        if (creep.memory.chargeNuker) {//charge nuker 
            creep.say('nuker');
            const nuker = Game.getObjectById(creep.memory.chargeNuker);
            if (nuker && nuker.store.getFreeCapacity(RESOURCE_GHODIUM)) {
                if (creep.store[RESOURCE_GHODIUM]) {
                    creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                    creep.transfer(nuker, RESOURCE_GHODIUM);
                    creep.moveTo(nuker, {visualizePathStyle: {stroke: '#ffaa00'}});
                    return;
                } else {
                    let needed = nuker.store.getFreeCapacity(RESOURCE_GHODIUM);
                    let target = null;
                    if (needed) {
                        if (creep.room.terminal && creep.room.terminal.store[RESOURCE_GHODIUM]) {
                            target = creep.room.terminal;
                        }
                        if (creep.room.storage && creep.room.storage.store[RESOURCE_GHODIUM]) {
                            target = creep.room.storage;
                        }
                        if (target) {
                            creep.say('get Gh'+needed);
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                            for(const resourceType in creep.store) {
                                if (resourceType != RESOURCE_GHODIUM) {
                                    creep.transfer(target, resourceType);    
                                    break;
                                }
                            }    
                            creep.withdraw(target, RESOURCE_GHODIUM, Math.min(target.store[RESOURCE_GHODIUM],needed>creep.store.getFreeCapacity()?creep.store.getFreeCapacity():needed));
                            return;
                        }
                    }
                    
                }
                
                
            }
            creep.memory.chargeNuker = undefined;
            
        }
        
        //Game.rooms.E42N28.terminal.send(RESOURCE_GHODIUM, 5000, 'E46N31');
        if (0) {//charge nuker 
            let room = 'E17N23';
            if (creep.room.name == room && creep.room.terminal && (creep.room.terminal.store[RESOURCE_GHODIUM] || creep.store[RESOURCE_GHODIUM])) {
                const nukers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_NUKER;}});
                if (nukers.length){
                    const nuker = nukers[0];
                    if (nuker.ghodium < nuker.ghodiumCapacity) {
                        if (!total || creep.store[RESOURCE_ENERGY]){
                            creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                            creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                            creep.withdraw(creep.room.terminal, RESOURCE_GHODIUM, (nuker.ghodiumCapacity-nuker.ghodium)>creep.store.getCapacity()?creep.store.getCapacity():(nuker.ghodiumCapacity-nuker.ghodium));
                        } else {
                            creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
                            creep.transfer(nuker, RESOURCE_GHODIUM);
                            creep.moveTo(nuker, {visualizePathStyle: {stroke: '#ffaa00'}});
                            
                        }
                        return;
                    }
                }
            }
        }
        
        
        
        if (1 && creep.room.memory.powerSpawn && creep.room.terminal &&  !(Game.time<creep.room.memory.powerSpawnCheck) && !creep.memory.chargePowerSpawn && creep.memory.role != 'helper') {
            creep.room.memory.powerSpawnCheck = Game.time + 7;
            let powerSpawn = Game.getObjectById(creep.room.memory.powerSpawn);
            if (powerSpawn) {
                if (!creep.room.terminal.store[RESOURCE_POWER]) {
                    creep.room.memory.powerSpawnCheck = Game.time + 100;
                } else if (powerSpawn.store[RESOURCE_POWER] < 15) {
                    creep.memory.chargePowerSpawn = 1;
                    creep.room.memory.powerSpawnCheck = Game.time + 80;
                } else {
                    creep.room.memory.powerSpawnCheck = Game.time + powerSpawn.store[RESOURCE_POWER] - 14;
                }
            } else {
                delete creep.room.memory.powerSpawn;
                delete creep.memory.chargePowerSpawn;
            }
        }
        if (creep.memory.chargePowerSpawn && creep.room.terminal) {
            let powerSpawn = Game.getObjectById(creep.room.memory.powerSpawn);
            if (powerSpawn) {
                if (powerSpawn.store.getFreeCapacity(RESOURCE_POWER)<20) {
                    delete creep.memory.chargePowerSpawn;
                } else if (!creep.store[RESOURCE_POWER]) {
                    if (!creep.room.terminal.store[RESOURCE_POWER]) {
                        delete creep.memory.chargePowerSpawn;
                    } else {
                        creep.say('get Pw'+creep.memory.chargePowerSpawn);
                        creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffaa00'}});
                        for(const resourceType in creep.store) {
                            if (resourceType != RESOURCE_POWER) {
                                creep.transfer(creep.room.terminal, resourceType);    
                                break;
                            }
                        }    
                        creep.withdraw(creep.room.terminal, RESOURCE_POWER, Math.min(creep.room.terminal.store[RESOURCE_POWER], powerSpawn.store.getFreeCapacity(RESOURCE_POWER)));
                        return;
                    }
    
                } else {
                    creep.say('put Pw'+creep.memory.chargePowerSpawn);
                    creep.moveTo(powerSpawn, {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.transfer(powerSpawn, RESOURCE_POWER);
                    return;
                }
            }
        }
        
        
        
        
        
        
        require('profiler').start('suplierRefill');
        
        let refill = false;
        if (creep.store[RESOURCE_ENERGY]) {
            let cpuStart = Game.cpu.getUsed();
            if (!helpers.transferEnergyToClosestStructure(creep)){
                let elapsed = (Game.cpu.getUsed()-cpuStart).toFixed(2);
                if (creep.store.getFreeCapacity()) {
                    refill = true;
                    creep.say('refill'+elapsed);
                } else {
                    //creep.say('⁉︎'+elapsed);
                    if(Game.shard.name == 'shard0' && creep.room.name == 'E83N54'){
                        if (Game.flags['Flag14'] && !creep.pos.isNearTo(Game.flags['Flag14'])) {
                            creep.moveTo(Game.flags['Flag14']);        
                        }
                    }
                    if(Game.shard.name == 'shard2' && creep.room.name == 'E43N38' && Game.flags['Flag142']){
                        if (!creep.pos.isEqualTo(Game.flags['Flag142'])) {
                            creep.moveTo(Game.flags['Flag142']);        
                        } else {
                            if (creep.room.terminal && creep.room.storage && creep.room.controller.level >= 6) {
                                if (creep.room.terminal.store[RESOURCE_ENERGY] > 60000 && creep.room.storage.store.getFreeCapacity()>500000) {
                                    creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                                    creep.memory.terminalSuplyGCL = 1;
                                    creep.say('idle');
                                }
                                if (!(Game.time%100) && creep.room.storage.store[RESOURCE_OXYGEN] && creep.room.terminal.store[RESOURCE_OXYGEN] >= 6000) {
                                    require('consoleUtils').freeSpace('E43N38');
                                }
                            }
                        }
                    }

                }
            } else {
                // let elapsed = (Game.cpu.getUsed()-cpuStart).toFixed(2);
                // creep.say('fill'+elapsed);
            }
        }
        
        if (!creep.store[RESOURCE_ENERGY] || refill) {
            if (!creep.store.getUsedCapacity() && creep.ticksToLive<20) {
                creep.memory.role = undefined;
                return;
            }
            let target = creep.room.storage;
            if (target && !target.store[RESOURCE_ENERGY]) {
                // if (creep.room.terminal) {
                    creep.memory.storageId = target.id;
                    target = creep.room.terminal;    
                // } else {
                    
                // }
                
            }
            if (creep.room.name == 'E43N38' && creep.memory.terminalSuplyGCL) {
                target = creep.room.terminal;
                creep.memory.terminalSuplyGCL = undefined;
            }
            
            if (!target && creep.memory.storageId) {
                target = Game.getObjectById(creep.memory.storageId);
                
                if (target && target.store[RESOURCE_ENERGY] < (creep.room.energyCapacityAvailable - creep.room.energyAvailable)) {
                    creep.say('noE');
                    let anotherTarget = creep.pos.findClosestByPath(FIND_MY_CREEPS, {filter: (object) => object.memory.role != creep.memory.role && object.store[RESOURCE_ENERGY]>=50});
                    if (anotherTarget) {
                        target = anotherTarget;
                        if (creep.pos.isNearTo(target)) {
                            target.transfer(creep, RESOURCE_ENERGY);
                        }
                    } else {
                        anotherTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (object) => object.structureType == STRUCTURE_CONTAINER && object.store[RESOURCE_ENERGY]>=50});                        
                        if (anotherTarget) {
                            target = anotherTarget;
                            
                        }
                    }
                }
            }

            if (creep.pos.isNearTo(target)) {
                if (creep.store.getUsedCapacity()){ //store no energy
                    for(const resourceType in creep.store) {
                        if (target.store.getFreeCapacity()) {
                            creep.transfer(target, resourceType);
                        } else {
                            creep.drop(resourceType);
                        }
                        break;
                    }
                } else {
                    creep.withdraw(target, RESOURCE_ENERGY);   
                }                
            } else {
                creep.moveTo(target, {range:1,visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        
        require('profiler').end('suplierRefill');
	}
};

module.exports = roleSuplier;