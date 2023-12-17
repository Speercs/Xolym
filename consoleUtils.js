var helpers = require('helpers');
var consoleUtils = {
    help: function() {
        let textOut = '';
        Object.keys(consoleUtils).forEach((cmd, index) => {textOut += cmd+'(), ';if (!(index%10)) textOut +='\n';});
        return textOut;
    },
    prepareJson: function (json) {
        inputData = {"name":"E53N21","world":"mmo","shard":"shard2","rcl":8,};
        
        
        let template = {"name":"E57N33","world":"mmo","shard":"shard2","rcl":8,"buildings":{
                "spawn":{"pos":[]},
                "tower":{"pos":[]},
                "link":{"pos":[]},
                "storage":{"pos":[]},
                "terminal":{"pos":[]},
                "extension":{"pos":[]},
                "lab":{"pos":[]},
                "extractor":{"pos":[]},
                "factory":{"pos":[]},
                "observer":{"pos":[]},
                "powerSpawn":{"pos":[]},
                "nuker":{"pos":[]},
                "rampart":{"pos":[]},
                "road":{"pos":[]},
                "container":{"pos":[]},
        }};
        let data;
        if (!json) {
            data = inputData;
        } else {
            data = JSON.parse(json);    
        }
        template =  require('fastest-json-copy').copy(template);
        
        if (data && data.name && data.buildings)  {
            template.name = data.name;
            template.shard = data.shard;
            for (structure in template.buildings) {
                template.buildings[structure] = data.buildings[structure];
            }
            let textOut = JSON.stringify(template);
            for (structure in template.buildings) {
                textOut = textOut.replace('"'+structure+'"','\n"'+structure+'"',);
            }
            console.log('\n'+textOut);
            
        } else {
            return 'Error '+ JSON.stringify(data);
        }
    },
    
    findCS: function (command) {
        let rooms = {};
        let total = 0;
        if (!Object.values(Game.constructionSites)) {
            return 'constructionSites empty';
        }
        Object.values(Game.constructionSites).forEach(c=> {
            rooms[c.pos.roomName] = (rooms[c.pos.roomName] || 0) + 1;
            total++;
        })
        let result = "constructionSites: "+total+'; ';
        for (roomName in rooms) {
            result += helpers.getRoomLink(roomName)+':'+rooms[roomName]+', ';
        }
        if (command == 'remove') {
            Object.values(Game.constructionSites).forEach(c=>c.remove());
            result += ' ...removed!';
        } if (command) {
            Object.values(Game.constructionSites).filter(c=>c.pos.roomName == command).forEach(c=>c.remove());
        } else {
            result += " ...type findCS('remove'); to remove All!";
        }
        
        
        return result
    },
    
    getRamps: function(roomName) {
        let room = Game.rooms[roomName];
        if (!room) return 'no rooom';
         
        const ramps = room.find(FIND_MY_STRUCTURES, {filter: structure => structure.structureType == STRUCTURE_RAMPART});
        let textOut = "'"+roomName+"': [\n";
        ramps.forEach(ramp => textOut += '['+ramp.pos.x+','+ramp.pos.y+'],');
        textOut += "\n],";
        //console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', textOut);
        return textOut;
    
        
    },
    
    ff: function(level = 0) {
        return this.findFactory(level);
    },
    findFactory: function(level = 0) {
        if (!level) {
            let textOut = '';
            for (let level = 1; level < 6; level++) {
                textOut += consoleUtils.findFactory(level)+'\n';
            }
            return textOut;
        } else {
            let textOut = 'Factory Level '+level+': ';
            Object.keys(Game.rooms).forEach(roomName=>Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: obj=>obj.structureType == STRUCTURE_FACTORY && obj.level == level})
                .map(fact=>textOut+=helpers.getRoomLink(fact.room.name)+(fact.cooldown?'(work)':'(stay'+(Game.time - fact.room.memory.factoryStayTime)+')')+', '));
            return textOut;
        }
    },
    
    freeSpace: function(roomName) {
        let textOut = 'error';
        let room = Game.rooms[roomName];
        if (!room || !room.storage || !room.terminal) return ;
        let terminal = room.terminal;
        const skipRes = [RESOURCE_ENERGY];
        let maxAmount = 50000;
        let resInfo = Object.entries(terminal.store).filter(v=>!skipRes.includes(v[0])).reduce((acc, curr) => acc[1] > curr[1] ? acc : curr);
        if (resInfo && resInfo.length) {
            let targetRoomName;
            Object.keys(Game.rooms).some(roomName=>{
                let room = Game.rooms[roomName];
                if (room && room.controller && room.controller.my && room.storage) {
                    //console.log(roomName, room.storage.store.getFreeCapacity(), room.terminal.store.getFreeCapacity());
                    if (room.storage.store.getFreeCapacity()>250000 && room.terminal.store.getFreeCapacity() > 175000) {
                        targetRoomName = roomName;
                        return true;
                    }
                }
            });
            if (!targetRoomName) {
                Object.keys(Game.rooms).some(roomName=>{
                    let room = Game.rooms[roomName];
                    if (room && room.controller && room.controller.my && room.storage) {
                        //console.log(roomName, room.storage.store.getFreeCapacity(), room.terminal.store.getFreeCapacity());
                        if (room.storage.store.getFreeCapacity()>150000 && room.terminal.store.getFreeCapacity() > 95000) {
                            targetRoomName = roomName;
                            return true;
                        }
                    }
                });
            }
            if (!targetRoomName && room.terminal.store.getFreeCapacity() < 100) {
                Object.keys(Game.rooms).some(roomName=>{
                    let room = Game.rooms[roomName];
                    if (room && room.controller && room.controller.my && room.storage) {
                        //console.log(roomName, room.storage.store.getFreeCapacity(), room.terminal.store.getFreeCapacity());
                        if (room.storage.store.getFreeCapacity()>50000 && room.terminal.store.getFreeCapacity() > 25000) {
                            targetRoomName = roomName;
                            maxAmount = 5000;
                            return true;
                        }
                    }
                });
            }
            if (targetRoomName) {
                let amount = Math.min(resInfo[1], maxAmount);
                //let res = terminal.send(resInfo[0], amount, targetRoomName);
                let res = require('terminal').terminalSend(room, resInfo[0], amount, targetRoomName);
                textOut = 'send res '+ resInfo[0]+ ' amount '+ amount + ' to target room ' +  targetRoomName+ ' result '+ res;
                //console.log(resInfo, targetRoomName, res);
            }
        }
        
        if (1) {
            let freeSpaceWOEnergy = room.storage.store.getFreeCapacity()+room.storage.store[RESOURCE_ENERGY];
            if (freeSpaceWOEnergy < 250000 && !room.memory.transferToTerminal) {
                let resInfo = Object.entries(room.storage.store).filter(v=>!skipRes.includes(v[0])).reduce((acc, curr) => acc[1] > curr[1] ? acc : curr);
                if (resInfo && resInfo.length) {
                    let amount = Math.min(resInfo[1], 15000) + terminal.store[resInfo[0]];
                    amount = Math.min(amount, 75000);
                    room.memory.transferToTerminal = {resource: resInfo[0], amount: amount };    
                }
            }
        }
        //console.log(resInfo);
        return textOut;
    },
    
    showFreeSpace: function() {
        let textOut = '';
        let free = 0;
        let index = 0;
        let result = [];
        let doptext = '';
        Object.keys(Game.rooms).forEach(roomName=>{
            let room = Game.rooms[roomName];
            if (room && room.controller && room.controller.my && room.storage) {
                free += room.storage.store.getFreeCapacity();
                let text =  ' '+helpers.getRoomLink(room.name)+': '+Math.round(room.storage.store.getFreeCapacity()/1000)+'k'+(room.terminal?('(T:'+Math.round(room.terminal.store.getFreeCapacity()/1000)+'k), '):', ');
                result.push({roomName: room.name, freeSpace: room.storage.store.getFreeCapacity(), text});
                if (room.storage.store.getFreeCapacity() < 100000) {
                    doptext += 'freeSpace("'+room.name+'");';
                }
            }
        });
        _.sortBy(result, 'freeSpace').forEach(roomInfo => {
            textOut += roomInfo.text;
            if (index++ > 9) {
                textOut +='\n';
                index = 0;
            }
        });
        textOut = 'freeSpace: '+Math.round(free/1000)+'k\n'+textOut+'\n'+doptext;
        return textOut;
    },
    
    showEnergy: function() {
        let textOut = '';
        let total = 0;
        let index = 0;
        let result = [];
        Object.keys(Game.rooms).forEach(roomName=>{
            let room = Game.rooms[roomName];
            if (room && room.controller && room.controller.my && room.storage) {
                let energy = room.storage.store[RESOURCE_ENERGY];
                let stEnergy = energy;
                let termEnergy = 0;
                if (room.terminal) {
                    termEnergy = room.terminal.store[RESOURCE_ENERGY];
                    energy += termEnergy;
                }
                total += energy;
                let text = ' '+helpers.getRoomLink(room.name)+': '+Math.round(energy/1000)+'k('+Math.round(stEnergy/1000)+'+'+Math.round(termEnergy/1000)+'), ';
                result.push({roomName:room.name, energy: energy, text:text});
            }
        });
        _.sortBy(result, 'energy').reverse().forEach(roomInfo => {
            textOut += roomInfo.text;
            if (index++ > 9) {
                textOut +='\n';
                index = 0;
            }
        });
        textOut = 'total: '+Math.round(total/1000)+'k\n'+textOut;
        return textOut;
    },
    findRes: function(res) {
        let textOut='';
        let total = 0;
        Object.keys(Game.rooms).forEach(roomName => {
            let room = Game.rooms[roomName];
            if (room.controller && room.controller.my && room.controller.level) {
                let roomText = helpers.getRoomLink(roomName);
                if (room.storage && room.storage.store[res]) {
                    roomText+=' storage('+room.storage.store[res]+'),';
                    total += room.storage.store[res];
                }
                if (room.terminal && room.terminal.store[res]) {
                    roomText+=' terminal('+room.terminal.store[res]+'),';
                    total += room.terminal.store[res];
                }
                let factory = Game.getObjectById(room.memory.factory);
                if (factory && factory.store[res]) {
                    roomText+=' factory'+(factory.level?'['+factory.level+']':'')+'('+factory.store[res]+'),';
                    total += factory.store[res];
                }
                let labStore = 0;
                room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LAB}}).forEach(lab => {labStore+=lab.store[res]});
                if (labStore) {
                    roomText+=' labs('+labStore+'),';
                    total += labStore;
                }
                
                if (roomText != helpers.getRoomLink(roomName)) {
                    textOut += roomText+'\n';
                }
            }
            
        });
        textOut += res+ ' total = ' + total;
        return textOut;
    },
    
    ls: function() {
        return this.ls2();
    },
    ls2: function() {
        textOut = '';
        let [ingridientsList, resProdStopped,resProdWorked,resProdDone,resProdAmount,resProdMaxAmount] = require('lab').labStat();
        ingridientsList.forEach(res => {
            let labDoneText = '';
            if (resProdDone[res] && resProdDone[res].length) {
                resProdDone[res].forEach(roomName => labDoneText += "'"+helpers.getRoomLink(roomName)+"'"+', ');
                labDoneText = ' done['+labDoneText+'] ';
            }

            let labStoppedText = '';
            if (resProdStopped[res] && resProdStopped[res].length) {
                resProdStopped[res].forEach(roomName => labStoppedText += "'"+helpers.getRoomLink(roomName)+"'"+', ');
                labStoppedText = ' stopped['+labStoppedText+'] ';
            }
            let labWorkedText = '';
            if (resProdWorked[res] && resProdWorked[res].length) {
                resProdWorked[res].forEach(roomName => labWorkedText += "'"+helpers.getRoomLink(roomName)+"'"+', ');
                labWorkedText = ' worked['+labWorkedText+'] ';
            }
            let maxAmountText = '';
            if (resProdMaxAmount[res]) {
                maxAmountText = ' / ';
                if (resProdAmount[res].total + resProdAmount[res].labTotal > resProdMaxAmount[res]) {
                    maxAmountText += '<b style="color:green">'+ resProdMaxAmount[res] + '</b> ';
                } else {
                    maxAmountText += '<b style="color:red">'+ resProdMaxAmount[res] + '</b> ';
                }
                
            }
            let cooldown = _.get(Memory, 'labs.tasks.resourceInfo['+res+'].time');
            textOut += res+(cooldown?'('+cooldown+')':'')+': '+resProdAmount[res].total+' labs('+resProdAmount[res].labTotal+')'+maxAmountText+labDoneText+labStoppedText+labWorkedText+'\n';
        });
        textOut += "type changeRoomLabProduce([roomName], resource); to change produce on rooms\n"
        return textOut;
        
    },
    showLabLimit: function(amount) {
        textOut = '';
        let resourceInfo = _.get(Memory, 'labs.tasks.resourceInfo', {});
        for (let res in resourceInfo) {
            if (resourceInfo[res].needAmount) {
                textOut += res+'['+resourceInfo[res].needAmount+']';
                if (amount) {
                    resourceInfo[res].needAmount = amount;
                    textOut += ' -> '+resourceInfo[res].needAmount;
                }
                textOut += '\n';
            }
        }
        textOut += "type require('lab').manageLabs(); for auto switch produce\n";
        return textOut;
    },
    
    checkIntersectionRoom: function() {
        return require('role.roadRepairer').checkIntersectionRoom();
    },
    
    mapVisual: function(ticks = 200) {
        Memory.mapVisual = Game.time + ticks;
        return 'MapVisual On for '+ ticks + ' ticks';
    },
    mv: function(ticks = 200) {
        return this.mapVisual(ticks);
    },
    
    doManual: function() {
        // Object.values(Game.powerCreeps).forEach(c=> {
        //     if (c.room ) {
        //         let f = c.room.find(FIND_MY_STRUCTURES).filter(s=>s.structureType == STRUCTURE_FACTORY);
        //         if (f.length) {
        //             if (c.powers[PWR_OPERATE_FACTORY] && c.powers[PWR_OPERATE_FACTORY].level == f[0].level) {
                        
        //             } else {
        //                 console.log(helpers.getRoomLink(c.room.name), c.name, c.powers[PWR_OPERATE_FACTORY]?('level'+c.powers[PWR_OPERATE_FACTORY].level):'no', f[0].level);
        //             }
        //         }
        //     }
        // })
        
        // Object.keys(Memory.rooms).forEach(roomName => {
        //     if (roomName.startsWith('E8')) {
        //         console.log(roomName);
        //         delete Memory.rooms[roomName];
        //     }
        // })
        Object.keys(Memory.rooms).forEach(roomName => {
            if (Game.rooms[roomName] && Game.rooms[roomName].controller && Game.rooms[roomName].controller.my && !_.get(Memory, 'rooms.'+roomName+'.storageLinkPos')) {
                console.log(helpers.getRoomLink(roomName));
            }
        })
        
    },
    checkLabContainer: function() {
        let textOut = '';
        Object.keys(Memory.rooms).forEach(roomName => {
            let room = Game.rooms[roomName];
            if (room && room.controller && room.controller.my) {
                const labContainerCoord = _.get(Memory, 'labs.rooms.'+room.name+'.labContainerPos', 0);
                if (labContainerCoord) {
                    const labContainerPos = new RoomPosition(labContainerCoord.x, labContainerCoord.y, labContainerCoord.roomName);
                    const containerPresent =  _.filter(labContainerPos.lookFor(LOOK_STRUCTURES), {structureType: STRUCTURE_CONTAINER});
                    if (containerPresent.length && containerPresent[0].store.getUsedCapacity()) {
                        let sendedText = ''
                        if (containerPresent[0].store.getUsedCapacity() > containerPresent[0].store.getUsedCapacity(RESOURCE_CATALYZED_GHODIUM_ACID)) {
                            let creeps = room.find(FIND_MY_CREEPS, {filter: creep => creep.memory.role == 'transporter' && !creep.memory.targetId});
                            if (creeps.length) {
                                creeps[0].memory.targetId = containerPresent[0].id;
                                sendedText = creeps[0].id+' transporter sended...'
                            }
                        }
                        textOut += helpers.getRoomLink(roomName)+' free: '+containerPresent[0].store.getFreeCapacity() + ' ' + JSON.stringify(Object.keys(containerPresent[0].store))+' '+sendedText+'\n';
                    }
                }
            }
        })
        return textOut;
    },
    
    findMineral: function(mineral = undefined) {
        let textOut = '';
        Object.keys(Memory.rooms).forEach(roomName => {
            let room = Game.rooms[roomName];
            if (room && room.controller && room.controller.my && room.controller.level > 5) {
                let minerals = room.find(FIND_MINERALS);
                if (minerals.length && (!mineral ||  minerals[0].mineralType == mineral)) {
                    let density = [0, 'LOW', 'MODERATE', 'HIGH', 'ULTRA'];
                    if (minerals[0].mineralAmount) {
                        textOut += helpers.getRoomLink(roomName)+' '+minerals[0].mineralType + ' '+minerals[0].mineralAmount + ' '+density[minerals[0].density]  + '\n';    
                    } else {
                        textOut += helpers.getRoomLink(roomName)+' '+minerals[0].mineralType + ' EMPTY '+density[minerals[0].density] + ' ticksToRegen '+minerals[0].ticksToRegeneration + '\n';
                    }
                    
                }
                
            }
        })
        return textOut;
    },
    
    findDeposit: function() {
        let textOut = '';
        let depositCount = 0;
        let deposits = Memory.depositWork || {};
        for (roomName in deposits) {
            for (depositId in deposits[roomName]) {
                const depositInfo = deposits[roomName][depositId];
                if (!depositInfo.closed) {
                    depositCount++;
                    let isDangerRoomText = '';//require('role.deposit').isDangerRoom(depositInfo.depositRoom)?' DangerRoom ':' Safe room ';
                    let deposit = Game.getObjectById(depositId);
                    let depositType =  deposit?deposit.depositType:'unknown';
                    let depositType2 =  depositInfo.depositType;
                    
                    textOut += helpers.getRoomLink(depositInfo.depositRoom)+' '+depositId +' '+depositType +' '+depositType2+ ' freeSides ' + depositInfo.freeSides + ' lastCooldown ' + depositInfo.lastCooldown + (depositInfo.maxCooldown?(' maxCooldown '+ depositInfo.maxCooldown):'') + isDangerRoomText + '\n';    
                }
            }
        }
        return textOut;
    },
    
    findInObject: function (obj, name) {
        if (!obj || !name) return "example findInObject(Memory.rooms, 'avoid');"
        for (var k in obj) { // Loop through all properties of the object.
            if(k == name){ // If the property is the one you're looking for.
                return JSON.stringify(obj[k]); // Return it.
            }else if (typeof obj[k] == "object"){ // Else, if the object at [key] is a object,
                var t = this.findInObject(obj[k], name); // Loop through it. 
                if(t){ // If the recursive function did return something.
                    return t; // Return it to the higher recursion iteration, or to the first function call.
                }
            }               
        }
    },
    
    skMineral: function() {
        let [harvestCount, spawnRooms, harvestRooms, details] = require('role.skMineral').skHarvestInfo();
        let textOut = '';
        details.forEach(mineralInfo => textOut += '['+mineralInfo.mineralType+']'+mineralInfo.amount+':'+helpers.getRoomLink(mineralInfo.mineralRoom)+ ', ');
        return 'skMineral: '+textOut;
    },
    
    skMineralStock: function() {
        let textOut = '';
        let [harvestCount, spawnRooms, harvestRooms, detailsInfo] = require('role.skMineral').skHarvestInfo();
        let details = require('role.skMineral').skStockInfo();
        details.forEach(mineralInfo => {
            let text = mineralInfo.mineralId+' ['+mineralInfo.mineralType+'] room:'+helpers.getRoomLink(mineralInfo.mineralRoom)+', spawn:'+helpers.getRoomLink(mineralInfo.spawnRoom)+ ', amount:'+(mineralInfo.amount?mineralInfo.amount:'regen')+ ', freeSides:'+mineralInfo.freeSides +', timeToTarget:'+mineralInfo.timeToTarget;
            if (spawnRooms.includes(mineralInfo.spawnRoom)) {
                text = '<span style="text-decoration: line-through">'+text+'</span>';
            }
            if (Memory.rooms[mineralInfo.spawnRoom].noSpawnSKMineral && Game.time < Memory.rooms[mineralInfo.spawnRoom].noSpawnSKMineral) {
                text = '<span style="text-decoration: line-through">'+text+'</span>';
                text += ' <span style="color:red">noSpawnSkMineral</span>';
            }
            if (Memory.rooms[mineralInfo.mineralRoom] && Memory.rooms[mineralInfo.mineralRoom].avoid > 1) {
                text = '<span style="text-decoration: line-through">'+text+'</span>';
                text += ' <span style="color:red">STRONGHOLD</span>';
            }
            text += ' stock: '+_.get(Memory, 'stock.'+mineralInfo.mineralType);
            
            textOut += text +' \n';
        })
        return this.skMineral()+'spawnBusy:'+JSON.stringify(spawnRooms) +'\nskMineralStock: \n'+textOut+'\n type '+"require('role.skMineral').enableSKharvest(3, RESOURCE_OXYGEN, '59f1c268a5165f24b259ad12); for harvest resource begin "+ '\n type Memory.rooms[spawnRoom].noSpawnSKMineral = Game.time + 3000; for disable harvesting';
    },
    sk: function() {
        return this.skMineralStock();
    },
    
    invasion: function(roomName, toX=24, toY=24, range=25) {
        return require('observer').invasion(roomName, toX, toY, range);
    },
    
    changeRoomLabProduce: function(roomName, resource, additionResourceG = RESOURCE_CATALYZED_GHODIUM_ACID) {
        if (!roomName || ! resource) return "type changeRoomLabProduce(roomName, resource, additionResourceG = RESOURCE_CATALYZED_GHODIUM_ACID)";

        if (roomName instanceof Array) {
            let textOut = '';
            for (let roomNameOne of roomName) {
                textOut += this.changeRoomLabProduce(roomNameOne, resource, additionResourceG)+'\n';
            }
            return textOut;
        }
        return require('lab').changeRoomLabProduce(roomName, resource, additionResourceG);
    },
    
    resetRoomsImport: function() {
        let textOut = 'reset imports: ';
        Object.keys(Memory.rooms).forEach(roomName => {
            let room = Game.rooms[roomName];
            if (room && room.controller && room.controller.my && room.controller.level > 5 && room.memory.importResourceList) {
                textOut += room.name+' '+JSON.stringify(room.memory.importResourceList)+'\n';
                room.memory.importResourceList = {};
            }
        })
        return textOut;
    },
    resetRoomsNeedResource: function() {
        let textOut = 'reset needResource: ';
        Object.keys(Memory.rooms).forEach(roomName => {
            let room = Game.rooms[roomName];
            if (room && room.controller && room.controller.my && room.controller.level > 5 && room.memory.needResource) {
                textOut += room.name+' '+JSON.stringify(room.memory.needResource)+'\n';
                room.memory.needResource = [];
            }
        })
        return textOut;
    },
    
    
    harvestRoomsLab: function(rooms) {
        let textOut = '';
        rooms.forEach(roomName => {
            if (Memory.rooms[roomName] && Memory.rooms[roomName].labsInfo) {
                Memory.rooms[roomName].harvestLab = 1;
                textOut += roomName+', ';
            }
        })
        return textOut;
    },
    
    resetLab: function(room) {
        if (!room || !Memory.rooms[room]) return 'resetLab("roomName");';
        Memory.rooms[room].resetLab = 1;
        return 'success'; 
    },
    rl: function(room) {
        return this.resetLab(room);
    },
    mr: function(roomName, count = 1, duration = 3100) {
        if (!roomName) return "mr(roomName, count, duration)";
        return this.defendRoom(roomName, undefined, 'none', count, duration);
    },
    mrb: function(roomName, count = 1, duration = 3100) {
        if (!roomName) return "mr(roomName, count, duration)";
        return this.defendRoom(roomName, undefined, 'low', count, duration);
    },
    tiny: function(roomName, count = 1, duration = 3100) {
        if (!roomName) return "tiny(roomName, count, duration)";
        return this.defendRoom(roomName, undefined, 'tiny', count, duration);
    },
    defendRoom: function(roomName, homeRoom, level = 'low', count = false, duration = 20000) { 
        if (!roomName) return "defendRoom(roomName, homeRoom, level = 'low(2) | middle(1) | high(2) || none(1)', count, duration = 20000)";
        let pathLength = 250;
        if (!homeRoom) {
            let spawnRoomInfo = require('observer').findClosestRoomByPath(roomName, 24, 24, 25, true);
            if (!spawnRoomInfo) {
                return 'no spawn room found.';
            }
            homeRoom = spawnRoomInfo.roomName;
            pathLength = spawnRoomInfo.length;            
        }
        let baseRoom = Game.rooms[homeRoom];
        if (!baseRoom || baseRoom.controller.level < 7 || !baseRoom.controller.my) return 'invalid spawn room';
        
        let boosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
        let boosted = 1;
        
        // let body = [TOUGH,TOUGH,TOUGH,TOUGH,
        // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        // RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
        // HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]; //TOUGH*4,MOVE*24,RANGED_ATTACK*12,HEAL*8
        let body = [TOUGH,TOUGH,TOUGH,TOUGH,
        RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,]; //TOUGH*4,MOVE*10,RANGED_ATTACK*27,HEAL*9
        
        if (level == 'middle') {
            boosts = [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE];
            body = [TOUGH,TOUGH,
            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]; //TOUGH*2,MOVE*25,RANGED_ATTACK*16,HEAL*7
            count = count?count:1;
        }
        
        if (level == 'low') {
            boosts = [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE];
            body = [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                HEAL,HEAL,HEAL,HEAL,MOVE,];
            count = count?count:2;
        }
        if (level == 'none') {
            boosts = [];
            body = [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                HEAL,HEAL,HEAL,HEAL,MOVE,];
            count = count?count:1;
        }
        if (level == 'tiny') {
            boosts = [];
            body = [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL, HEAL,MOVE,]
            count = count?count:1;
        }
        if (level == 'melee') {
            boosts = [];
            body = [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK];
            count = count?count:1;
        }
        
        count = count?count:2;

        //return roomName+' '+ homeRoom+ ' ' + level+ ' '+ count + ' ' + JSON.stringify(boosts)+' '+JSON.stringify(body);

        if (boosts.length && baseRoom.memory.boostLab && !helpers.checkLabsBoosts(homeRoom, boosts)) {
            return 'room already boosted and invalid boosts type Memory.rooms.'+homeRoom+'.boostLab.time = 1';
        }

        if (boosts.length && !baseRoom.memory.boostLab && !baseRoom.memory.boostLabManual && !helpers.checkLabsBoosts(homeRoom, boosts)) {
            baseRoom.memory.boostLab = {boosts:boosts.slice(0), time:Game.time +duration+300, helpRoom: 1};    
        }
        let startTime = boosted && boosted.length ? Game.time + 60 : Game.time;
        Memory.massRangers[roomName] = {room:homeRoom, count: count, startTime: startTime, time:Game.time + duration+400, boosted: boosted, body: body, boosts: boosts.slice(0), helpRoom: 1};
        return 'success '+roomName+' '+ homeRoom+ ' ' + level+ ' '+ count + ' ' + JSON.stringify(boosts)+' '+JSON.stringify(body);
        
    }, 
    stopHelp: function(roomName) {
        let mrInfo = Memory.massRangers[roomName];
        if (!mrInfo) return 'help room '+roomName+' not found';
        if (!mrInfo.helpRoom) return 'this squad no helpRoom created';
        let homeRoom = mrInfo.room;
        if (!homeRoom) return 'no home room';
        if (Memory.rooms[homeRoom] && Memory.rooms[homeRoom].boostLab && Memory.rooms[homeRoom].boostLab.helpRoom) {
            Memory.rooms[homeRoom].boostLab.time = 1;
        }
        delete Memory.massRangers[roomName];
        return 'success';
    },
    
    quad: function(roomName, count = 1, duration = 20000, melee = 0) { 
        if (!roomName) return "quad(roomName, count = 1, duration = 20000, melee = 0)";
        let pathLength = 250;
        let homeRoom;
        if (!homeRoom) {
            let spawnRoomInfo = require('observer').findClosestRoomByPath(roomName, 24, 24, 25, true);
            if (!spawnRoomInfo) {
                return 'no spawn room found.';
            }
            homeRoom = spawnRoomInfo.roomName;
            pathLength = spawnRoomInfo.length;            
        }
        Memory.quads[roomName] = {room:homeRoom, time:Game.time, duration: duration, count:count, soonDie: 200+pathLength, melee: melee};
        return 'success '+roomName+' '+ homeRoom+ ' ' + count + ' ' + JSON.stringify(Memory.quads[roomName]);
    },

    
    sleep: function() {
        Memory.sleepMode = 1;
    },
    wakeUp: function() {
        Memory.sleepMode = 0;
    },
    wakeup: function() {
        Memory.sleepMode = 0;
    },
    boostRoom: function(roomName, boosts, duration=20000) {
        let alreadyBoost = _.get(Memory, 'rooms.'+roomName+'.boostLab');
        if (alreadyBoost) return 'Already boosted type Memory.rooms.'+roomName+'.boostLab.time = 1;';
        _.set(Memory, 'rooms.'+roomName+'.boostLab', {boosts:boosts, time:Game.time+duration});
        return 'success';
    },
    unboostRoom: function(roomName) {
        if (_.get(Memory,'rooms['+roomName+'].boostLab')) {
            Memory.rooms[roomName].boostLab.time = 1;
            return 'success';
        }
        return 'room not busted';
    },
    
    timeSavingEnable: function(roomName) {
        let room = Game.rooms[roomName];
        if (!room || !room.controller || !room.controller.my || room.controller.level < 8) return 'room error';
        if (Memory.rooms[roomName].timeSavingEnable) return 'Already enabled';
        Memory.rooms[roomName].timeSavingEnable = 1;
        room.find(FIND_MY_CREEPS, {filter: c => c.memory.room == roomName && c.name.startsWith('x')}).forEach(creep => creep.suicide());
        delete Memory.rooms[roomName].manageOrder;
        
    },
    timeSavingDisable: function(roomName) {
        let room = Game.rooms[roomName];
        if (!room || !room.controller || !room.controller.my) return 'room error';
        if (!Memory.rooms[roomName].timeSavingEnable) return 'Already disabled';
        Memory.rooms[roomName].timeSavingEnable = 0;
        room.find(FIND_MY_CREEPS, {filter: c => c.memory.room == roomName && c.name.startsWith('tsr')}).forEach(c => {
            if (c.name.startsWith('tsr_mi_')) {
                c.memory.role = 'miner';
            } else if (c.name.startsWith('tsr_su_')) {
                c.memory.role = 'suplier';
            } else if (c.name.startsWith('tsr_lm_')) {
                c.memory.role = 'transporter';
            } else if (c.name.startsWith('tsr_up_')) {
                c.memory.role = 'upgrader';
            } else if (c.name.startsWith('tsr_wb')) {
                c.memory.role = 'wallbuilder';
            } else {
                c.suicide();
            }
        });
    },
    
    profiler: function(minValue = 0.1) {
        if (minValue == 'reset') {
            delete Memory.profiler; 
            return 'Profiler reset';
        }
        let result = "Profiler:\n"
        let obj = Object.entries(_.get(Memory, 'profiler.stats', {})).filter(pair => pair[1]>=minValue).sort((a, b) => b[1] - a[1]).map((pair) => {
            result += ''+pair[0]+' '+pair[1]+'\n';
            return {[pair[0]] : pair[1]}; 
        });
        return result
    },
    
    getRoomBorders: function(roomName) {
        let room = Game.rooms[roomName];
        if (!room) return;
        let obstacles = require('manualScripts').ffBorderRoom(room);
        ramps = room.find(FIND_STRUCTURES, {filter: (struct=> /*struct.structureType == STRUCTURE_WALL ||*/ (struct.structureType == STRUCTURE_RAMPART || struct.my))});
        ramps = _.filter(ramps, ramp => obstacles.some(obst => ramp.pos.isNearTo(obst)));
        ramps.forEach(ramp => room.visual.circle(ramp.pos, {fill:'red'}));
        let result = "'"+roomName+"': [";
        ramps.forEach(ramp => result += '['+ramp.pos.x+','+ramp.pos.y+'],');
        result += "],\n\n";
        result += "'"+roomName+"': [";
        let i = 1;
        obstacles.forEach(pos => result += ('{x:'+pos.x+', y:'+pos.y+'},'+(!((i++)%50)?'\n':'')));
        result += "],\n\n";
        return result;
    },
    
    prod: function() {
        Memory.production = 1;
        
        delete Memory.creepsCpuStat;
        delete Memory.pathCashingStat;
        delete Memory.roomsCpu;
        delete Memory.roomsCpuArray;
        delete Memory.profiler;
        delete Memory.bucketHistory;
        delete Memory.sendEnergyLog;
        return 'Production mode ON';
    },
    debug: function() {
        Memory.production = 0;
    },
    
    heap: function() {
        let result = '';
        if (1 && typeof Game.cpu.getHeapStatistics === 'function') {
            const heapStats = Game.cpu.getHeapStatistics();
            const heapPercent = Math.round(100 * (heapStats.total_heap_size + heapStats.externally_allocated_size) / heapStats.heap_size_limit);
            const heapSize = Math.round((heapStats.total_heap_size) / 1048576);
            const externalHeapSize = Math.round((heapStats.externally_allocated_size) / 1048576);
            const heapLimit = Math.round(heapStats.heap_size_limit / 1048576);
            
            result += `Heap usage: ${heapSize} MB + ${externalHeapSize} MB of ${heapLimit} MB (${heapPercent}%).\n`;
            
            for (let key in heapStats) {
               result += key+' = '+heapStats[key]+'\n';
            }
        }
        ['Memory', 'matrix'].forEach(key => {
            try {
                let text = JSON.stringify(global[key]);
                if (text) {
                    let size = text.length;
                    if (size > 20) {
                        result += key+' = '+size+' \n';     
                    }    
                }
                
            } catch (e) {}
        });
        try {
            result += 'spawn creepLiveCustomData'+' = '+JSON.stringify(require('spawn').creepLiveCustomData).length+' \n';
        } catch (e) {}
        return result;
    },
   freeRoomsMemory: function(clearKeys) {
        let result = '';
        if (!clearKeys) {
            clearKeys = ['mbrSpawn'];   
        }
        require('observer').freeMemory();
        result += 'keys:'+JSON.stringify(clearKeys)+'\n';
        Object.keys(Memory.rooms).forEach(roomName=> {
           clearKeys.forEach(key=> {
               if (Memory.rooms[roomName][key] !== undefined) {
                   let size = '?';
                   try {
                       size = JSON.stringify(Memory.rooms[roomName][key]).length;
                   } catch (e) {}
                   delete Memory.rooms[roomName][key];
                   result += roomName+' '+key+' free '+size+' \n';
               } else {
                //   if (Game.rooms[roomName] && Game.rooms[roomName].controller && Game.rooms[roomName].controller.my) {
                //     result += roomName+' '+key+' not found '+_.get(Memory, 'rooms.'+roomName+'.'+key)+ '\n';    
                //   }
               }
           })
        });
        Object.keys(Memory.spawns).forEach(spawnName=> {if (!Game.spawns[spawnName] || _.isEmpty(Memory.spawns[spawnName])){delete Memory.spawns[spawnName]}});
        return result;
   },
   
//   freeRoomsPortal: function(clearKeys) {
//         let result = '';
//         if (!clearKeys) {
//             clearKeys = ['ps'];   
//         }
//         require('observer').freeMemory();
//         result += 'keys:'+JSON.stringify(clearKeys)+'\n';
//         Object.keys(Memory.rooms).filter(roomName => !helpers.isCrossRoad(roomName)).forEach(roomName=> {
//           clearKeys.forEach(key=> {
//               if (Memory.rooms[roomName][key] !== undefined) {
//                   let size = '?';
//                   try {
//                       size = JSON.stringify(Memory.rooms[roomName][key]).length;
//                   } catch (e) {}
//                   delete Memory.rooms[roomName][key];
//                   result += roomName+' '+key+' free '+size+' \n';
//               } else {
//                 //   if (Game.rooms[roomName] && Game.rooms[roomName].controller && Game.rooms[roomName].controller.my) {
//                 //     result += roomName+' '+key+' not found '+_.get(Memory, 'rooms.'+roomName+'.'+key)+ '\n';    
//                 //   }
//               }
//           })
//         });
//         Object.keys(Memory.spawns).forEach(spawnName=> {if (!Game.spawns[spawnName] || _.isEmpty(Memory.spawns[spawnName])){delete Memory.spawns[spawnName]}});
//         return result;
//   },
   
   
   
   updateBuyPrices: function() {
       Object.keys(Memory.rooms).forEach(roomName=> {
           if (Memory.rooms[roomName].manageOrdersList) {
               delete Memory.rooms[roomName].manageOrdersList;
           }
       });
       return 'updated';
   },
   
   link: function(pos) {
       return `<a href="#!/room/${Game.shard.name}/${pos.roomName}">[${ pos.roomName } ${ pos.x },${ pos.y }]</a>`
   },
   
   flags: function(flagName, remove) { //flags('FlagQuad') flags('FlagQuad', 'remove')
       let result = Object.values(Game.flags)
      .filter(flag => flag.name.startsWith(flagName))
      .map(flag => flag.name + ' at ' + this.link(flag.pos) + '<br/>')
      .sort((a, b) => a.localeCompare(b))
      .join('');
      if (flagName && flagName != 'flag' && remove == 'remove') {
          Object.values(Game.flags).filter(flag => flag.name.startsWith(flagName)).forEach(flag => flag.remove());
          result += ' removed!'
      }
    return result;
   },
   
   flagsWrongRoom: function(flagName) { //flagsWrongRoom('flagMassRangeAttack') flagsWrongRoom('flagPairAttack')
        let result = Object.values(Game.flags)
        .filter(flag => flag.name.startsWith(flagName))
        .filter(flag => flag.pos.roomName != flag.name.replace(flagName, ''))
        .map(flag => flag.name + ' at ' + this.link(flag.pos) + '<br/>')
        .sort((a, b) => a.localeCompare(b))
        .join('');
        return result;
   },
   
   calcScoreRes: function(res, amount = 1) {
        let result = {};
        let info = COMMODITIES[res];
        if (info && ![RESOURCE_ZYNTHIUM, RESOURCE_KEANIUM, RESOURCE_UTRIUM, RESOURCE_LEMERGIUM, RESOURCE_ENERGY, RESOURCE_CATALYST, RESOURCE_OXYGEN, RESOURCE_HYDROGEN, RESOURCE_GHODIUM].includes(res)) {
            //let amount = info.amount;
            for (let component in info.components) {
                // console.log('start', component,info.amount,  JSON.stringify(result));
                let resAmount = this.calcScoreRes(component, info.components[component]);
                for (let resultRes in resAmount) {
                    result[resultRes] = (result[resultRes] || 0) + amount *(resAmount[resultRes]/info.amount);    
                }
                // console.log('end', component, info.amount,  JSON.stringify(result), JSON.stringify(resAmount));
            }
        } else {
            if (res == RESOURCE_GHODIUM) {
                [RESOURCE_ZYNTHIUM, RESOURCE_KEANIUM, RESOURCE_UTRIUM, RESOURCE_LEMERGIUM,].forEach(res=>{result[res] = (result[res] || 0) + amount;})
            } else {
                result[res] = (result[res] || 0) + amount;
            }
        }
        //console.log(res, amount, JSON.stringify(result));
        return result;
    },
    
    calcPriceRes: function(res) {
        let result = res+' on '+Game.shard.name;
        let history = Game.market.getHistory(res);
        if (history.length>1) {
            result += ' avgPrice: '+history[1].avgPrice+' cr.';
        }
        result +='\n';
        let resources = this.calcScoreRes(res);
        let priceTotal = 0;
        for (res in resources) {
            let history = Game.market.getHistory(res);
            if (history.length>1) {
                let price = history[1].avgPrice;
                if (res == RESOURCE_SILICON) price = 0;
                if (res == RESOURCE_ENERGY) price = 0;
                priceTotal += (price*resources[res]);
                result += res.padEnd(8)+' avgPrice: '+(''+price+' cr., ').padEnd(15)+' amount: '+(''+resources[res]+', ').padEnd(8)+'sum: '+ (''+Math.round(price*resources[res])+' cr.').padEnd(8)+'\n';
            }
        }
        result += 'total = '+Math.round(priceTotal)+' cr.';
        return result;
    },
    
    calcResCd: function(res, amount = 1) {
        let result = {};
        let info = COMMODITIES[res];
        if (info && info.level) {
            for (let component in info.components) {
                let resCooldown = this.calcResCd(component, info.components[component]);
                for (let level in resCooldown) {
                    result[level] = (result[level] || 0) + amount * (resCooldown[level]/info.amount);    
                }
            }
            result[info.level] = (result[info.level] || 0) + amount * (info.cooldown/info.amount);
            console.log(info.level, res, amount, JSON.stringify(result));
        }
        return result;
        
    },
    calcFactoryConfig: function(res, num = 1) {
        let result = '';
        let info = this.calcResCd(res, 1);
        if (!info[5]) return 'no 5 level res';
        let maxCd = info[5]/num;
        for (let level in info) {
            result += 'Factory level '+level+' = '+info[level]/maxCd+'\n';
        }
        return result;
    }, 
    
    updateAllLabs: function() {
        if (!Memory.labs.rooms) return 'no labs config';
        Object.keys(Memory.labs.rooms).forEach(roomName => {
            Memory.labs.rooms[roomName].update = 1;
            require('lab').updateLabConfig(Game.rooms[roomName]);
        })
    },
    clearRoadRepairInfo: function() {
       Object.keys(Memory.rooms).forEach(roomName=> {
           if (Memory.rooms[roomName].roadRepairInfo) {
               delete Memory.rooms[roomName].roadRepairInfo;
           }
       });
       return 'clear';
   },
   boostReport: function() {
       let result = '';
       [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_OPS].forEach(res=>{
           result += res+' '+_.get(Memory, 'stock.'+res, 0)+'\n';
       })
       return result; 
   },
   
   testParseMem: function() {
       let s = Game.cpu.getUsed();
       let d = JSON.stringify(Memory);
       let e = Game.cpu.getUsed();
       let m = JSON.parse(d);
       let result = 'stringify '+(e-s)+' Parse:'+(Game.cpu.getUsed() - e);
       return result;;
   },
   
parseBody2: function(str) { //test this.parseBody('1m1c1w1c20m3w');
    const shorts = {m:'MOVE', c:'CARRY', w:'WORK'}; //fill shortcuts
    return str.split(/(\d+[a-z])/).filter(c=>c)
        .map(s=>s.split(/(\d+)([a-z])/).filter(c=>c))    
        .map(a=>Array(parseInt(a[0])).fill(shorts[a[1]]?shorts[a[1]]:''))
        .reduce((a,c)=>a.concat(c));
},

b:function(str) {
    return this.parseBody(str);
},
// parseBody: function(str){  //test parseBody('1m1c1w1c20m3w2t4h1r2a5cl8h');
//     const shorts = {m:MOVE, c:CARRY, w:WORK, a:ATTACK, r:RANGED_ATTACK, h:HEAL, t:TOUGH, cl:CLAIM};
//     const myregexp = /(\d+)([a-z]+)/img;
//     let result = [];    
//     let match;
//     while ((match = myregexp.exec(str)) != null) {
//         result = result.concat(Array(parseInt(match[1])).fill(shorts[match[2]]));
//     }    
//     return result;
// },

parseBody: function(str) { //test b('1m1c1w1c20m3w2t4h1r2a5cl8h');
    console.log('parsing');
    //const shorts = {"m":"move","w":"work","c":"carry","a":"attack","r":"ranged_attack","h":"heal","t":"tough","cl":"claim"};
    const shorts = {m:MOVE, c:CARRY, w:WORK, a:ATTACK, r:RANGED_ATTACK, h:HEAL, t:TOUGH, cl:CLAIM};
    let res = [];  
    for (let i=0;i<str.length;){        
        let count = str[i++];
        if (str[i] >= '0' && str[i] <= '9') {
            count += str[i++];            
        }                
        let label = str[i++];
        if (str[i] === 'l') {
            label += str[i++];            
        }
		while(count--) res.push(shorts[label]);
    }
    return res;
},

short: function(body) {
    return "b('"+this.shortBody(body)+"')";
},
shortBody: function (body) {
    //const shorts = {m:MOVE, c:CARRY, w:WORK, a:ATTACK, r:RANGED_ATTACK, h:HEAL, t:TOUGH, cl:CLAIM};
    //let shortReverse = Object.fromEntries(Object.entries(shorts).map(([key, value]) => [value, key])); 
    const shortReverse = {[MOVE]:'m', [CARRY]:'c', [WORK]:'w', [ATTACK]:'a', [RANGED_ATTACK]:'r', [HEAL]:'h', [TOUGH]:'t', [CLAIM]:'cl'};
    let result = '';
    let current = {};
    body.forEach(b => {        
        if (current.body != b) {
            if (current.count) {
                result +=''+current.count+shortReverse[current.body];                
            }
            current = {body:b, count: 1};
        } else {
            current.count++;
        }
    });
    if (current.count) {
        result +=''+current.count+shortReverse[current.body];                
    }
    return result;
},
spawnCost: function(body) {
    let result = body.reduce((a, c) => a += BODYPART_COST[c], 0);
    console.log('parsing Cost', result, body);
    return result;
},

resetInterAttacked: function() {
    Memory.inter_attacked = undefined;
    let data = JSON.parse(InterShardMemory.getLocal() || "{}");
    if (data.inter_attacked) {
        data.inter_attacked = undefined
        InterShardMemory.setLocal(JSON.stringify(data));
        return 'reset';
    }
    return 'not found';
},



};

module.exports = consoleUtils;

Object.keys(consoleUtils).forEach(cmd => {global[cmd] = consoleUtils[cmd];});

// global.help = consoleUtils.help;
// global.prepareJson = consoleUtils.prepareJson;
// global.findCS = consoleUtils.findCS;
// global.getRamps = consoleUtils.getRamps;
// global.findFactory = consoleUtils.findFactory;
// global.showFreeSpace = consoleUtils.showFreeSpace;