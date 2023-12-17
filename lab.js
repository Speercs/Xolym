var helpers = require('helpers');

module.exports = {
    clone: function(object) {
        return require('fastest-json-copy').copy(object);
    },

    tickReset: function() {
        if (!(Game.time%1000)) {
            this.stats();
        }
        
        if (!(Game.time%1000) && ['shard0', 'shard1', 'shard3','shard2'].includes(Game.shard.name)) {
            this.manageLabs();
        }
    },

    stats: function() {
        resourceInfo = _.get(Memory, 'labs.tasks,resourceInfo', 0);
        if (resourceInfo) {
            
        }
    },
    //require('lab').updateLabConfig(Game.rooms.E42N29);
    updateLabConfig: function(room) {
        //update labs config
        if (!Memory.labs.rooms[room.name]) {
           Memory.labs.rooms[room.name] = {};
        }
        if (!Memory.labs.rooms[room.name].labSet || !Memory.labs.rooms[room.name].labSetTime || Memory.labs.rooms[room.name].labSetTime + 5000000 < Game.time || Memory.labs.rooms[room.name].update) {
            Memory.labs.rooms[room.name].labSet = {};
            Memory.labs.rooms[room.name].labSet.in = [];
            Memory.labs.rooms[room.name].labSet.out = [];
            delete Memory.labs.rooms[room.name].update;
            //update labs
            // if (!labs) {
            let labs = room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_LAB }});
            // }
            let labsNear = [];
            for (let i = 0; i<labs.length; i++) {
                for (let j = 0; j<labs.length; j++) {
                    if (i == j) continue;
                    if (labs[i].pos.inRangeTo(labs[j], 2)) {
                        labsNear[i] = (labsNear[i] || 0) + 1;
                    }
                }
            }
            labsNearByIndex = [];
            for (let i = 0; i<labs.length; i++) {
                labsNearByIndex.push({id:i, value: labsNear[i]});
            }
            labsNearByIndex = _.sortBy(labsNearByIndex, 'value');
            for (let i = 0; i<labsNearByIndex.length; i++) {
                if (i < labsNearByIndex.length - 2) {
                    Memory.labs.rooms[room.name].labSet.out.push(labsNearByIndex[i].id);
                } else {
                    Memory.labs.rooms[room.name].labSet.in.push(labsNearByIndex[i].id);
                }
            }
            if (Memory.labs.rooms[room.name].labSet.in.length == 2 && labs.length >= 10) {
                //find lab container pos
                let lab1Pos = labs[Memory.labs.rooms[room.name].labSet.in[0]].pos;
                let lab2Pos = labs[Memory.labs.rooms[room.name].labSet.in[1]].pos;
                let lab3Pos = labs[Memory.labs.rooms[room.name].labSet.out[0]].pos;
                let labContainerPos = null;
                let labBestContainerPos = null;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {    
                        if (labBestContainerPos) continue;
                        if (!dx && !dy) continue;
                        let pos = new RoomPosition(lab1Pos.x + dx, lab1Pos.y + dy, room.name);
                        if (pos.isNearTo(lab2Pos)) {
                            let allow = true;
                            pos.lookFor(LOOK_STRUCTURES).forEach(structure => {
                                if (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) {
                                    
                                } else if (structure.structureType == STRUCTURE_RAMPART && structure.my) {
                                    
                                } else {
                                    allow = false;
                                }
                            });
                            if (allow) {
                                labContainerPos = pos;
                                if (pos.isNearTo(lab3Pos)) {
                                    labBestContainerPos = pos;
                                }
                            }
                        }
                    }
                }
                if (labBestContainerPos) {
                    labContainerPos = labBestContainerPos;
                    console.log(room.name, 'find best container pos ',JSON.stringify(labBestContainerPos));
                }
                if (labContainerPos) {
                    Memory.labs.rooms[room.name].labContainerPos = {x:labContainerPos.x, y:labContainerPos.y, roomName:labContainerPos.roomName}; 
                    room.memory.labContainerPos = {x:labContainerPos.x, y:labContainerPos.y, roomName:labContainerPos.roomName};
                    //check container
                    let already = false;
                    labContainerPos.lookFor(LOOK_STRUCTURES).forEach(structure => {
                        if (structure.structureType == STRUCTURE_CONTAINER) {
                            already = true;
                        }
                    });
                    if (!already) {
                        labContainerPos.createConstructionSite(STRUCTURE_CONTAINER);
                    }
                }
                

                
            }
            Memory.labs.rooms[room.name].labSetTime = Game.time;
            
            if (!Memory.labs.rooms[room.name].labSet.out.length || !Memory.labs.rooms[room.name].labSet.in.length) {
                delete Memory.labs.rooms[room.name];
                Memory.rooms[room.name].noLabSetUp = Game.time + 15000;
            } else if (Memory.rooms[room.name].noLabSetUp) {
                delete Memory.rooms[room.name].noLabSetUp;
            }
        }
        
    }, 
    
    //require('lab').updateLabTask(Game.rooms.E57N44);
    updateLabTask: function(room) { 
        if (!Memory.labs.tasks) {
            Memory.labs.tasks = {};
        }
        Memory.labs.tasks.taskTime = Game.time;
        
        let additionResourceG = RESOURCE_CATALYZED_GHODIUM_ACID; //1 lab used for this resource
        //Object.keys(Memory.rooms).forEach(roomName => {if (Memory.rooms[roomName].labAddRes) console.log(require('helpers').getRoomLink(roomName), Memory.rooms[roomName].labAddRes)})
        //additionResourceG = 'endProduct';
        let resourceInfo = {
            [RESOURCE_CATALYZED_GHODIUM_ACID]: {startAmount: Memory.stock?Memory.stock[RESOURCE_CATALYZED_GHODIUM_ACID]:undefined },
            // [RESOURCE_CATALYZED_GHODIUM_ALKALIDE]: {},
            // [RESOURCE_CATALYZED_UTRIUM_ACID]: {},
            //[RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE]: {},
            //  [RESOURCE_CATALYZED_LEMERGIUM_ACID]: {},
            //[RESOURCE_CATALYZED_ZYNTHIUM_ACID]: {},
        }
       
        let maxIter = 999;
        
        let recipies = {}
        for (let a in REACTIONS) {
          for (let b in REACTIONS[a]) {
            recipies[REACTIONS[a][b]] = [a, b];
          }
        }
        let roomsAvaiable = Object.keys(Memory.labs.rooms);
        let needAmount = 6000;
        if (roomsAvaiable.length >= 2) needAmount = 20000;
        if (roomsAvaiable.length >= 4) needAmount = 50000;
        if (roomsAvaiable.length >= 10) needAmount = 80000;
        if (roomsAvaiable.length >= 20) needAmount = 150000;
        if (roomsAvaiable.length >= 30) needAmount = 800000;
       
        if (0 && Game.shard.name == 'shard2') {
            resourceInfo = {
                [RESOURCE_CATALYZED_GHODIUM_ALKALIDE]: {},
                [RESOURCE_CATALYZED_KEANIUM_ALKALIDE]: {},
            }
            needAmount = 900000;
        }
         
        
        let allDataFill = true;
        do {
            allDataFill = true;
            for (let resource in resourceInfo) {
                if (!resourceInfo[resource] || !resourceInfo[resource].ingridients) {
                    allDataFill = false;
                    let ingridients = recipies[resource];
                    if (ingridients) {
                        resourceInfo[resource].ingridients = ingridients;
                        resourceInfo[resource].time = REACTION_TIME[resource];
                        resourceInfo[resource].rooms = undefined;
                        ingridients.forEach(ingridient => {
                            if (REACTION_TIME[ingridient]) {
                                resourceInfo[ingridient] = {needAmount: needAmount};
                            }
                        });
                    } else {
                        delete resourceInfo[resource];
                    }
                    break;
                }
            }
            
        } while (!allDataFill && maxIter-- > 0);
        
        
        let minTime = 100000;
        for (let resource in resourceInfo) {
            minTime = Math.min(minTime, resourceInfo[resource].time);
        }
        let needRooms = 0;
        for (let resource in resourceInfo) {
            let k = Math.ceil(resourceInfo[resource].time / minTime);
            resourceInfo[resource].needRooms = k;
            needRooms += k;
        }
        
        let roomsAvaiableCount = roomsAvaiable.length;
        let k = roomsAvaiableCount / needRooms;
        
        
        roomsCountResult = 0;
        
        for (let resource in resourceInfo) {
            resourceInfo[resource].needRoomsRealK = resourceInfo[resource].needRooms * k;
            resourceInfo[resource].needRoomsReal = Math.max(Math.floor(resourceInfo[resource].needRooms * k), 1);
            
            if (roomsAvaiableCount>15 && [RESOURCE_HYDROXIDE, RESOURCE_GHODIUM_HYDRIDE, RESOURCE_GHODIUM_ACID, RESOURCE_GHODIUM_OXIDE, RESOURCE_GHODIUM_ALKALIDE, RESOURCE_UTRIUM_ACID, RESOURCE_UTRIUM_HYDRIDE,
            /*RESOURCE_LEMERGIUM_HYDRIDE,*/ RESOURCE_LEMERGIUM_ACID].includes(resource)) {
                resourceInfo[resource].needRoomsReal++; 
                // resourceInfo[resource].needRoomsReal++; 
            }
            
            // if (roomsAvaiableCount>15 && [RESOURCE_GHODIUM, RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_UTRIUM_LEMERGITE].includes(resource)) {
            //     resourceInfo[resource].needRoomsReal++; 
            //     resourceInfo[resource].needRoomsReal++; 
            // }
            
            if ([RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE,RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_LEMERGIUM_ACID].includes(resource)) {
                resourceInfo[resource].needRoomsReal += 100;
                // resourceInfo[resource].needRoomsReal--; 
                // resourceInfo[resource].needRoomsReal--; 
                // resourceInfo[resource].needRoomsReal--;
            } 
           
            
            
            // else {
            //     resourceInfo[resource].needRoomsReal = 0;
            // }
            
            // if ([RESOURCE_UTRIUM_HYDRIDE, RESOURCE_UTRIUM_ACID, RESOURCE_GHODIUM_OXIDE].includes(resource)) {
            //     resourceInfo[resource].needRoomsReal = 0;
            // }
            // if ([RESOURCE_GHODIUM_ALKALIDE,].includes(resource)) {
            //     resourceInfo[resource].needRoomsReal = 6;
            // }
            // if ([RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_HYDROXIDE, RESOURCE_LEMERGIUM_ACID].includes(resource)) {
            //     resourceInfo[resource].needRoomsReal = 0;
            // }
            // if ([RESOURCE_HYDROXIDE,].includes(resource)) {
            //     resourceInfo[resource].needRoomsReal = 3;
            // }
            // if ([RESOURCE_LEMERGIUM_ACID].includes(resource)) {
            //     resourceInfo[resource].needRoomsReal = 2;
            // }
            
            roomsCountResult += resourceInfo[resource].needRoomsReal;
        }
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! roomsCountResult', roomsCountResult, roomsAvaiable.length);

        if (roomsCountResult <= roomsAvaiable.length || 1) {
            for (let resource of Object.keys(resourceInfo).reverse()) {
                
                resourceInfo[resource].roomList = [];
                for (let i=0;i<resourceInfo[resource].needRoomsReal;i++) {
                    let roomName = roomsAvaiable.pop();
                    if (roomName) {
                        let additionResource = Memory.rooms[roomName].labAddRes?Memory.rooms[roomName].labAddRes:additionResourceG;
                        resourceInfo[resource].roomList.push(roomName);    
                        let addRes = additionResource == resource? 'endFullProduct' : additionResource;
                        let labObj = {labs:[addRes,'endProduct','endProduct','endProduct','endProduct','endProduct','endProduct','endProduct','endProduct','endProduct',], reaction:[]};
                        let roomInfo = Memory.labs.rooms[roomName];
                        roomInfo.labSet.in.forEach((labIndex, index) => labObj.labs[labIndex] = resourceInfo[resource].ingridients[index]);
                        let in0 = roomInfo.labSet.in[0];
                        let in1 = roomInfo.labSet.in[1];
                        labObj.labs.forEach((value, index) =>{
                            if (value == 'endProduct' || value == 'endFullProduct') {
                                labObj.reaction.push([index,in0,in1]);
                            }
                        });
                        if (resourceInfo[resource].needAmount) {
                            labObj.conditions = [{resource: resource, amount: resourceInfo[resource].needAmount}];
                        }
                        labObj.time = resourceInfo[resource].time;
                        
                        roomInfo.labConfig = labObj;
                    }
                }
            }
        }
        Memory.labs.tasks.resourceInfo = resourceInfo;
        Memory.labs.tasks.needRooms = needRooms;
        Memory.labs.tasks.roomsAvaiable = roomsAvaiableCount;
        Memory.labs.tasks.k = k.toFixed(4);
        Memory.labs.taskCreated = 1;
    },
    
    processLabs: function(room, myRoom, labConfig) {
        if (!room) return;
        //let labs = null;
        if (Memory.mapVisual && Game.cpu.bucket > 6000){ //visual for lab
            require('profiler').start('LabVisual');
            room.find(FIND_STRUCTURES, {filter: { structureType: STRUCTURE_LAB }}).forEach((lab, index) =>
                lab.room.visual.text(index ,lab.pos.x + 0.1, lab.pos.y+0.1, {align: 'left', opacity: 0.8, color: '#00DD00'})
            );
            require('profiler').end('LabVisual');
        }
        
               
        if (1 && ['shard2','shard0','shard1','shard3',].includes(Game.shard.name) && labConfig[myRoom.lab] && !labConfig[myRoom.lab].manual) {
            require('profiler').start('newLabAlgorithm');    
            if (!Memory.labs) {
               Memory.labs = {};
            }
            if (!Memory.labs.rooms) {
                Memory.labs.rooms = {};
                Memory.labs.roomsTime = Game.time;
            }
            
            
            if ((!Memory.labs.rooms[room.name] || Memory.labs.rooms[room.name].update) && !(Game.time%10) && (!Memory.rooms[room.name].noLabSetUp || Game.time > Memory.rooms[room.name].noLabSetUp)) {
                this.updateLabConfig(room);
            }
            
            if (1 && !(Game.time%1) && Memory.labs.rooms && Memory.labs.roomsTime && Game.time > (Memory.labs.roomsTime + 10) && (!Memory.labs.tasks || !Memory.labs.tasks.taskTime || Memory.labs.tasks.taskTime + 5000000 < Game.time)) {
                this.updateLabTask(room);
            }
                
            if (Memory.labs && Memory.labs.rooms && Memory.labs.rooms[room.name] && Memory.labs.rooms[room.name].labConfig) {
                require('profiler').start('newLabAlgorithmReplace');  
                labConfig[myRoom.lab] = this.clone(Memory.labs.rooms[room.name].labConfig);    
                require('profiler').end('newLabAlgorithmReplace');  
            }
                
            require('profiler').end('newLabAlgorithm');   
       }
               
        
        if (room.memory.boostLab) {
            if (Game.time < room.memory.boostLab.time && labConfig[myRoom.lab].labs && room.memory.boostLab.boosts) {
                labConfig[myRoom.lab].labs = room.memory.boostLab.boosts.concat(labConfig[myRoom.lab].labs.slice(room.memory.boostLab.boosts.length));
                if (!room.memory.boostLab.reaction) { //reaction: [[0,1,2],[3,1,2],[4,1,2],[5,1,2],]},
                    let skipLabsCount = room.memory.boostLab.boosts.length;
                    room.memory.boostLab.reaction = labConfig[myRoom.lab].reaction.filter(r=>r.find(index => index < skipLabsCount) == undefined);
                }
                labConfig[myRoom.lab].reaction = room.memory.boostLab.reaction; 
                //console.log('boostLab',room.name, labConfig[myRoom.lab].labs, labConfig[myRoom.lab].reaction);
            }
        }
        
        let timeIntervalSkip = (labConfig[myRoom.lab] && labConfig[myRoom.lab].time)?labConfig[myRoom.lab].time:5;
        
        if (1 && !(Game.time%timeIntervalSkip) && !room.memory.resetLab && room.terminal && room.storage && labConfig[myRoom.lab] ) {
            let labsInfo = labConfig[myRoom.lab].labs;
            //console.log('lab compare', room.name, this.compareArrays(room.memory.labsInfo,labsInfo));
            if (room.memory.labsInfo == undefined) {
                room.memory.labsInfo = labsInfo;
            } else if (!this.compareArrays(room.memory.labsInfo,labsInfo)) {
                if (room.memory.boostLab) {
                    
                } else {
                    room.memory.labsInfo = labsInfo;
                    if (room.name == 'E41N5') {
                        
                    } else {
                        room.memory.resetLab = 1;    
                    }
                    return;
                }
            }
        }
    
        if (1 && !(Game.time%timeIntervalSkip) && !room.memory.resetLab && room.terminal && room.storage && labConfig[myRoom.lab] && labConfig[myRoom.lab].reaction && labConfig[myRoom.lab].reaction.length) {
            //check labs and run reaction
            let labReactions = labConfig[myRoom.lab].reaction;
            let labsInfo = labConfig[myRoom.lab].labs;
            let labConditions = labConfig[myRoom.lab].conditions;
            let conditionOk = true;
            
            if (labConfig[myRoom.lab].manual) {
                //check conditions
                if (labConditions && labReactions.length) {
                    for (let cond of labConditions){
                        let resource = cond.resource;
                        let amount = _.get(Memory, 'stock.'+resource, 0) * 0.9; //do condition on empire stock. little bit for produce not stopped
                        //let amount = room.storage.store[resource]+room.terminal.store[resource]; //deprecated
                        if (amount>cond.amount){
                            conditionOk = false;
                            //console.log(room.name, 'lab condition fail', resource, amount, '>', cond.amount);
                        }
                    }
                }
            }
            if (labReactions.length && conditionOk){
                let labs = room.find(FIND_STRUCTURES, {
                   filter: { structureType: STRUCTURE_LAB }
                });
                if (labs.length){
                    for(let index in labReactions) {
                        //console.log(room.name, JSON.stringify(labReactions[index]));
                        if (labReactions[index] && labsInfo[index] !== undefined) {
                            let labProduceIndex = labReactions[index][0];
                            let reverse = false;
                            if (labProduceIndex < 0) {
                                reverse = true;
                                labProduceIndex = -labProduceIndex;
                                if (labProduceIndex == 10) {
                                    labProduceIndex = 0;
                                }
                            }
                            let labProduce =  labs[labProduceIndex];
                            if (!labProduce) continue;
                            if (labProduce.cooldown) {
                                //console.log('+++++++++++++cooldown'+room.name+' '+labsInfo[labProduceIndex]+' '+labProduceIndex+' '+labProduce.mineralType);
                            } else if (!reverse && labProduce.mineralType && ['endProduct','endFullProduct'].indexOf(labsInfo[labProduceIndex]) == -1 && labProduce.store[labProduce.mineralType] > (labProduce.store.getCapacity(labProduce.mineralType)*0.5)) {
                                if (labsInfo[labProduceIndex] == 0){
                                    console.log('+++++++++++++++++++'+room.name+' '+labsInfo[labProduceIndex]+' '+labProduceIndex+' '+labProduce.mineralType+' full half!!!!!!!!!!!!!!!!!!!!!!'+ labProduce.store[labProduce.mineralType]+ ' '+labProduce.store.getCapacity(labProduce.mineralType));    
                                }
                            } else {
                                let res = -1;
                                require('profiler').start('labReaction');
                                if (!reverse) {
                                    res = labProduce.runReaction(labs[labReactions[index][1]], labs[labReactions[index][2]]);    
                                } else {
                                    res = labProduce.reverseReaction(labs[labReactions[index][1]], labs[labReactions[index][2]]);
                                }
                                require('profiler').end('labReaction');
                                if (res == ERR_INVALID_ARGS && ((labs[labReactions[index][1]]).mineralAmount < 5 || (labs[labReactions[index][2]]).mineralAmount < 5)) {
                                    Game.notify('Error lab in room no mineral'+room.name+' '+res);
                                } else if (res != OK && res != ERR_NOT_ENOUGH_RESOURCES) {
                                    if (room.memory.boostLab  && room.memory.boostLab.time > Game.time) {
                                    } else if (room.memory.noLabErrorNotify) {
                                    } else {
                                        console.log('Error lab in room', helpers.getRoomLink(room.name), res, labReactions[index][1], labReactions[index][2]);
                                        Game.notify('Error lab in room'+room.name+' '+res+' '+labReactions[index][1]+' '+labReactions[index][2]);
                                        if (!room.memory.labErrorTime) room.memory.labErrorTime = Game.time;
                                        if (Game.time -  room.memory.labErrorTime > 300) {
                                            delete room.memory.labErrorTime;
                                            room.memory.resetLab = 1;
                                            Game.notify('reset Lab in room'+room.name);
                                        }
                                    }
                                    // bug console.log(room.name, '!!!!!!!!!!!!!!!!!!!!!!!!!runReaction', labs[labReactions[index][0]].mineralType, labs[labReactions[index][1]].mineralType, labs[labReactions[index][2]].mineralType, res);
                                } else if (res == OK) {
                                    if (room.memory.labErrorTime) delete room.memory.labErrorTime;
                                }
                                
                                
                            }
                            
                        }
                    }
                }
            }
        }        
    },
    
    changeRoomLabProduce: function(roomName, resource, additionResourceG = RESOURCE_CATALYZED_GHODIUM_ACID) {
        let roomInfo = _.get(Memory, 'labs.rooms.'+roomName);
        if (!roomInfo) return 'labs object not created for room '+roomName;
        let resourceInfo = _.get(Memory, 'labs.tasks.resourceInfo');
        if (!resourceInfo) return 'labs resourceInfo not created';
        if (!resourceInfo[resource]) return 'labs resourceInfo recept not created for this resource '+resource;
        if (_.get(Memory, 'rooms.'+roomName+'.boostLab.strongholds', 0)) return 'labs waiting boosting strongholds attack';
        
        
        //find room in resourceInfoList and remove
        for (resOne in resourceInfo) {
            let resInfo = resourceInfo[resOne];
            if (!resInfo.roomList) continue;
            if (resInfo.roomList.includes(roomName)){
                resInfo.roomList = resInfo.roomList.filter(r => r != roomName);
            }
        }
        
        
        if (roomName) {
            let additionResource = Memory.rooms[roomName].labAddRes?Memory.rooms[roomName].labAddRes:additionResourceG;
            resourceInfo[resource].roomList.push(roomName);    
            let addRes = additionResource == resource? 'endFullProduct' : additionResource;
            let labObj = {labs:['endProduct','endProduct','endProduct','endProduct','endProduct','endProduct','endProduct','endProduct','endProduct','endProduct',], reaction:[]};
            let roomInfo = Memory.labs.rooms[roomName];
            roomInfo.labSet.in.forEach((labIndex, index) => labObj.labs[labIndex] = resourceInfo[resource].ingridients[index]);
            let addResIndex = labObj.labs.findIndex(el=> el == 'endProduct');
            if (addResIndex >= 0) {
                labObj.labs[addResIndex] = addRes;    
            }
            let in0 = roomInfo.labSet.in[0];
            let in1 = roomInfo.labSet.in[1];
            labObj.labs.forEach((value, index) =>{
                if (value == 'endProduct' || value == 'endFullProduct') {
                    labObj.reaction.push([index,in0,in1]);
                }
            });
            if (resourceInfo[resource].needAmount) {
                labObj.conditions = [{resource: resource, amount: resourceInfo[resource].needAmount}];
            }
            labObj.time = resourceInfo[resource].time;
            
            roomInfo.labConfig = labObj;
        }
        return 'roomLabs '+roomName+' changed succesfuly';
        
    },
    
    
    labStat: function() {
        let textOut='';
        let resourceInfo = _.get(Memory, 'labs.tasks.resourceInfo', 0);
        let resProdStopped = {};
        let resProdWorked = {};
        let resProdDone = {};
        let resProdAmount = {};
        let resProdMaxAmount = {};
        let ingridientsList = [];
        if (resourceInfo) {
            for (resource in resourceInfo) {
                let ingridients = resourceInfo[resource].ingridients;
                if (ingridients && ingridients.length) {
                    if (!ingridientsList.includes(resource)) {
                        ingridientsList.push(resource);
                    }   
                    ingridients.forEach(res => {
                        if (!ingridientsList.includes(res)) {
                            ingridientsList.push(res);
                        }    
                    })
                    if (!resProdStopped[resource]) {
                        resProdStopped[resource] = [];
                        resProdWorked[resource] = [];
                        resProdDone[resource] = [];
                    }
                    if (resourceInfo[resource].needAmount) {
                        resProdMaxAmount[resource] = resourceInfo[resource].needAmount;// * resourceInfo[resource].needRoomsReal;
                    }
                    
                    let roomList = resourceInfo[resource].roomList;
                    if (roomList && roomList.length) {
                        Object.values(roomList).forEach(roomName => {
                            let room = Game.rooms[roomName];
                            let labIn = _.get(Memory, 'labs.rooms.'+roomName+'.labSet.in', []);
                            if (room && labIn.length) {
                                let labs = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LAB}});
                                let isWorked = true;
                                labIn.forEach(index => {
                                    if (labs[index] && labs[index].mineralType && labs[index].store[labs[index].mineralType] >= 5) {
                                        
                                    } else {
                                       isWorked = false; 
                                    }
                                })
                                let isConditionOk = true;
                                if (room.storage && room.terminal) {
                                    let conditions = _.get(Memory, 'labs.rooms.'+roomName+'.labConfig.conditions', []);
                                    conditions.forEach(cond => {
                                        let amount = _.get(Memory, 'stock.'+resource, 0) * 0.9;
                                        //let amount = room.storage.store[cond.resource] + room.terminal.store[cond.resource];    
                                        if (amount > cond.amount) {
                                            isConditionOk = false;
                                        }
                                    })
                                }

                                if (!isConditionOk) {
                                    resProdDone[resource].push(roomName);
                                } else if (!isWorked) {
                                    resProdStopped[resource].push(roomName);
                                } else {
                                    resProdWorked[resource].push(roomName);
                                }
                            }

                        })
                    }
                }
            }
            if (ingridientsList.length) {
                ingridientsList.forEach(res => {
                    let total = 0;
                    let labTotal = 0;
                    Object.keys(Game.rooms).forEach(roomName => {
                        let room = Game.rooms[roomName];
                        if (room.controller && room.controller.my && room.controller.level) {
                            if (room.storage && room.storage.store[res]) {
                                total += room.storage.store[res];
                            }
                            if (room.terminal && room.terminal.store[res]) {
                                total += room.terminal.store[res];
                            }
                            let labStore = 0;
                            room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LAB}}).forEach(lab => {labStore+=lab.store[res]});
                            if (labStore) {
                                labTotal += labStore;
                            }
                        }
                    });
                    resProdAmount[res] = {total:total,labTotal:labTotal};
                });
            }
        }
        return [ingridientsList, resProdStopped,resProdWorked,resProdDone,resProdAmount,resProdMaxAmount];
    },
    
    
    //require('lab').manageLabs();
    manageLabs: function() {
        let resourceInfo = _.get(Memory, 'labs.tasks.resourceInfo', 0);
        if (!resourceInfo) return;
        
        let [ingridientsList, resProdStopped,resProdWorked,resProdDone,resProdAmount,resProdMaxAmount] = this.labStat();
        console.log('1step');
        let ingridientsListReverse = ingridientsList.slice(0).reverse();
        //1 step - All done labs change to high produce
        let stepPassIs = ingridientsListReverse.some(res => { //some break if return true
            if (!resourceInfo[res]) return;
            if (resProdDone[res] && resProdDone[res].length) {
                //find res amount < maxAmount || !maxAmount
                let needRes;
                ingridientsListReverse.some(toRes => { //some break if return true
                    if (!resourceInfo[toRes]) return;
                    if (toRes == res) return;
                    if (!resProdMaxAmount[toRes] || resProdAmount[toRes].total + resProdAmount[toRes].labTotal < 0.7*resProdMaxAmount[toRes]) {
                        //check avaiable resource to produce
                        if (resourceInfo[toRes].ingridients.every(checkRes => resProdAmount[checkRes].total > 2500)) {
                            needRes = toRes;
                            return true;
                        }
                    }
                });
                if (needRes) {
                    resProdDone[res].forEach(roomName => console.log(this.changeRoomLabProduce(roomName, needRes)));
                    return true;
                }
            }
        });
        if (stepPassIs) return '1s'+true;
        
        //2 step - All stoped labs change to lower res produce
        stepPassIs = ingridientsList.some(res => { //some break if return true
            if (!resourceInfo[res]) return;
            if (resProdStopped[res] && resProdStopped[res].length) {
                //find res amount < maxAmount || !maxAmount
                let needRes;
                ingridientsListReverse.some(toRes => { //some break if return true
                    if (!resourceInfo[toRes]) return;
                    if (toRes == res) return;
                    console.log('2step', toRes);
                    if (!resProdMaxAmount[toRes] || resProdAmount[toRes].total + resProdAmount[toRes].labTotal < 0.7*resProdMaxAmount[toRes]) {
                        //check avaiable resource to produce
                        if (resourceInfo[toRes].ingridients.every(checkRes => resProdAmount[checkRes].total > 2500)) {
                            console.log('2step', 'yes');    
                            needRes = toRes;
                            return true;
                        }
                    } else {
                        console.log('2step', 'no');    
                    }
                });
                if (needRes) {
                    resProdStopped[res].forEach(roomName => console.log(this.changeRoomLabProduce(roomName, needRes)));
                    return true;
                }
            }
        });
        if (stepPassIs) return '2s'+true;
        
        if (['shard2'].includes(Game.shard.name)) {
            return 'skip 3 step';
        }
        
        //3 step - check empty lower res and assign high level lab
        stepPassIs = ingridientsListReverse.some(res => { //some break if return true
            if (!resourceInfo[res]) return;
            console.log('3step', res, resProdMaxAmount[res], resProdAmount[res].total);
            if (resProdMaxAmount[res] && resProdAmount[res].total < 0.3 * resProdMaxAmount[res]) {
                console.log('3step', res, 'low');
                let needLabs = resourceInfo[res].needRoomsReal - resourceInfo[res].roomList.length;
                if (needLabs > 0) {
                    console.log('3step', res, 'low', 'yes');
                    roomsToAssign = [];
                    ingridientsList.some(fromRes => {
                        if (!resourceInfo[fromRes]) return;
                        if (fromRes == res) return true; //break
                        if (roomsToAssign.length >= needLabs) return true;
                        resourceInfo[fromRes].roomList.reverse().some(roomName => {
                            roomsToAssign.push(roomName);
                            if (roomsToAssign.length >= needLabs) return true;   
                        })
                    });
                    if (roomsToAssign.length) {
                        roomsToAssign.forEach(roomName => console.log(this.changeRoomLabProduce(roomName, res)));
                        return true;
                    }
                    
                    
                } else {
                    console.log('3step', res, 'low', 'no');
                }
            }
        });
        if (stepPassIs) return '3s'+true;
        
        
        //4 step - All done labs change to high produce with no bound
        stepPassIs = ingridientsListReverse.some(res => { //some break if return true
            if (!resourceInfo[res]) return;
            if (resProdDone[res] && resProdDone[res].length) {
                //find res amount < maxAmount || !maxAmount
                let needRes;
                ingridientsListReverse.some(toRes => { //some break if return true
                    if (!resourceInfo[toRes]) return;
                    console.log('4step', toRes, res, resProdMaxAmount[toRes], resProdAmount[toRes].total, resProdAmount[toRes].labTotal);
                    if (toRes == res) return;
                    if (!resProdMaxAmount[toRes] || resProdAmount[toRes].total + resProdAmount[toRes].labTotal < 1.0*resProdMaxAmount[toRes]) {
                        console.log('4step',toRes, '!', true);
                        //check avaiable resource to produce
                        if (resourceInfo[toRes].ingridients.every(checkRes => {console.log(checkRes, resProdAmount[checkRes].total); return resProdAmount[checkRes].total > 2500;})) {
                            console.log('4step',toRes, '!!', true);
                            needRes = toRes;
                            return true;
                        } else {
                            console.log('4step',toRes, '!!', false);
                        }
                    }
                });
                if (needRes) {
                    console.log('4step',res, true);
                    resProdDone[res].forEach(roomName => console.log(this.changeRoomLabProduce(roomName, needRes)));
                    return true;
                }
            }
        });
        if (stepPassIs) return '4s'+true;
        
        
        
    },
    compareArrays: function(array1, array2) {
        // let b1 = JSON.stringify(array1) == JSON.stringify(array2);
        // let b2 = array1.length === array2.length && array1.every((value, index) => value === array2[index]);
        // if (b1 != b2) {
        //     console.log('LAB compareArrays errorr!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        // }
        return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
    },
    


};