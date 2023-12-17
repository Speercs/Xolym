var helpers = require('helpers');

module.exports = {
    roomTerminalUsed: [],
    tickReset: function() {
        this.roomTerminalUsed = [];  
        this.terminalManagerTick();
    },
    minStockHelpEnergy: 200000,
    terminalSend: function(room, resource, amount, targetRoom, isHelp = true) {
        require('profiler').start('terminalSend');
        const result = room.terminal.send(resource, amount, targetRoom);
        require('profiler').end('terminalSend');
        if (result == OK) {
            this.roomTerminalUsed.push(room.name);
            if (resource == RESOURCE_ENERGY && isHelp) {
                if (!Memory.rooms[targetRoom].noHelpOtherWithEnergy) {
                    //Game.notify(targetRoom+' in need of energy state')
                }
                Memory.rooms[targetRoom].noHelpOtherWithEnergy = Game.time + 3000;
                if (Memory.rooms[room.name].noHelpOtherWithEnergy) {
                    //Game.notify(room.name+' no more need energy. Last '+(Game.time - Memory.rooms[room.name].noHelpOtherWithEnergy)+' tiks.')
                    Memory.rooms[room.name].noHelpOtherWithEnergy = undefined;
                }
            }
            if (resource == RESOURCE_ENERGY) {
                if (!Memory.production && ['shard2'].includes(Game.shard.name)) {
                    if (!Memory.sendEnergyLog) {
                        Memory.sendEnergyLog = [];
                    }
                    let transferCost = Game.market.calcTransactionCost(amount, room.name, targetRoom);
                    Memory.sendEnergyLog.push(''+Game.time+' sendEnergy '+room.name+' send '+resource+' '+amount+' to '+targetRoom+' cost = '+transferCost);
                    if (Memory.sendEnergyLog.length > 30) {
                        Memory.sendEnergyLog.shift();
                    }
                } else if (Memory.sendEnergyLog) {
                    Memory.sendEnergyLog = undefined;
                }
            }
            

        }
        if (global.VERBOSE_CPU) console.log('send energy',15000, targetRoom);
        return result;
    },
    helpGclRoom: function(myRooms) {
        if (1 && Game.shard.name == 'shard2'){
            let helpRoom = Game.rooms['E43N38'];
            if (1 && helpRoom && helpRoom.storage && helpRoom.terminal && helpRoom.storage.store.getFreeCapacity() > 100000 && helpRoom.terminal.store[RESOURCE_ENERGY] < 60000) {
                //send energy to target room
                const targetRoom = helpRoom.name;
                for(const myRoom of myRooms) {
                    const room = Game.rooms[myRoom.roomName];
                    if (room && room.terminal && !room.terminal.cooldown && room.terminal.store[RESOURCE_ENERGY]>40000 && room.storage && room.storage.store[RESOURCE_ENERGY]>(this.minStockHelpEnergy + 15000) && room.name != targetRoom && !this.roomTerminalUsed.includes(room.name) && (!Memory.rooms[room.name].noHelpOtherWithEnergy || Game.time > Memory.rooms[room.name].noHelpOtherWithEnergy)){
                        this.terminalSend(room, RESOURCE_ENERGY, 15000, targetRoom);
                    }
                }
            }
        }
    },
    
    helpRoom: function (helpRoomName, myRooms) {
        if (helpRoomName && Game.rooms[helpRoomName] && Game.rooms[helpRoomName].terminal && Game.rooms[helpRoomName].terminal.my) {
            let helpRoom = Game.rooms[helpRoomName];
            if (1 && helpRoom && helpRoom.terminal && helpRoom.terminal.store[RESOURCE_ENERGY] <= 60000 && ((helpRoom.storage  && helpRoom.storage.store[RESOURCE_ENERGY] < 300000) || !helpRoom.storage)) {
                //send energy to target room
                for(const myRoom of myRooms) {
                    const room = Game.rooms[myRoom.roomName];
                    if (room && room.terminal && !room.terminal.cooldown && room.terminal.store[RESOURCE_ENERGY]>40000 && room.storage && room.storage.store[RESOURCE_ENERGY]>this.minStockHelpEnergy && room.name != helpRoomName  && !this.roomTerminalUsed.includes(room.name) && (!Memory.rooms[room.name].noHelpOtherWithEnergy || Game.time > Memory.rooms[room.name].noHelpOtherWithEnergy)){
                        this.terminalSend(room, RESOURCE_ENERGY, 15000, helpRoomName);
                    }
                }
            }
        }    
    },
    
    helpRoomNeedEnergy: function(myRooms) {
         if (1 && Memory.roomNeedEnergy){
            let helpRooms = Object.keys(Memory.roomNeedEnergy);
            for (const helpRoomName of helpRooms) {
                let helpRoom = Game.rooms[helpRoomName];//'E55N31'];E52N32 E49N22
                if (1 && helpRoom && helpRoom.storage && helpRoom.terminal && helpRoom.storage.store[RESOURCE_ENERGY] < 210000 && helpRoom.terminal.store[RESOURCE_ENERGY] < 60000) {
                    //send energy to target room
                    const targetRoom = helpRoom.name;
                    let helped = 0;
                    for(const myRoom of myRooms) {
                        const room = Game.rooms[myRoom.roomName];
                        if (room && room.terminal && room.terminal.store[RESOURCE_ENERGY]>40000 && room.storage && room.storage.store[RESOURCE_ENERGY]>this.minStockHelpEnergy && room.name != targetRoom  && !helpRooms.includes(room.name) && !this.roomTerminalUsed.includes(room.name) && (!Memory.rooms[room.name].noHelpOtherWithEnergy || Game.time > Memory.rooms[room.name].noHelpOtherWithEnergy)){
                            const result = this.terminalSend(room, RESOURCE_ENERGY, 15000, targetRoom);
                            if (result == OK) {
                                Memory.roomNeedEnergy[helpRoomName] = undefined;
                                helped = 1;
                            }
                        }
                    }
                    if (!helped) {
                        for(const myRoom of myRooms) {
                            const room = Game.rooms[myRoom.roomName];
                            if (room && room.terminal && room.terminal.store[RESOURCE_ENERGY]>40000 && room.storage && room.storage.store[RESOURCE_ENERGY]>(this.minStockHelpEnergy - 25000) && room.name != targetRoom && !helpRooms.includes(room.name) && !this.roomTerminalUsed.includes(room.name) && (!Memory.rooms[room.name].noHelpOtherWithEnergy || Game.time > Memory.rooms[room.name].noHelpOtherWithEnergy)){
                                const result = this.terminalSend(room, RESOURCE_ENERGY, 15000, targetRoom);
                                if (result == OK) {
                                    Memory.roomNeedEnergy[helpRoomName] = undefined;
                                    helped = 1;
                                }
                            }
                        }
                    }
                } else {
                    Memory.roomNeedEnergy[helpRoomName] = undefined;
                }
            }
        }
    },
    
    
    roomWithMinEnergy: null,
    getRoomWithMinEnergy: function(myRooms) {
        if (!this.roomWithMinEnergy || Game.time > this.roomWithMinEnergy.time) {
            this.roomWithMinEnergy = {name: '', energy: 9999999999, time: Game.time};
            //find room with min energy
            for(const myRoom of myRooms) {
                const room = Game.rooms[myRoom.roomName];
                if (room && room.storage && room.terminal && room.storage.store[RESOURCE_ENERGY]+room.terminal.store[RESOURCE_ENERGY] < this.roomWithMinEnergy.energy 
                && room.storage.store.getFreeCapacity() > 40000 && room.terminal.store.getFreeCapacity() > 30000 && room.terminal.store[RESOURCE_ENERGY] < 60000) {
                    this.roomWithMinEnergy = {name: room.name, energy: room.storage.store[RESOURCE_ENERGY]+room.terminal.store[RESOURCE_ENERGY], time: Game.time};
                }
            }
            console.log('finding roomWithMinEnergy', this.roomWithMinEnergy.name?helpers.getRoomLink(this.roomWithMinEnergy.name):'', JSON.stringify(this.roomWithMinEnergy));
        }
        // console.log('^^^^^^^^^^^^^^^^^^^^^^^^getRoomWithMinEnergy', this.roomWithMinEnergy.name, this.roomWithMinEnergy.time, Game.time > this.roomWithMinEnergy.time, JSON.stringify(this.roomWithMinEnergy));
        return this.roomWithMinEnergy.name;
    },
    
    
    sendEnergyToMinEnergyRoom: function(room, myRooms, tick1 = 1) {
        if (1 && !(Game.time%tick1) && room.storage && room.terminal && !room.terminal.cooldown && room.storage.store.getFreeCapacity()<20000 && room.terminal.store[RESOURCE_ENERGY]>=50000 && (!Memory.rooms[room.name].noHelpOtherWithEnergy || Game.time > Memory.rooms[room.name].noHelpOtherWithEnergy) && this.getRoomWithMinEnergy(myRooms)) {
            const otherRoom = Game.rooms[this.getRoomWithMinEnergy(myRooms)];
            if (otherRoom && otherRoom.name != room.name && otherRoom.storage && otherRoom.terminal && otherRoom.storage.store.getFreeCapacity()>20000 && otherRoom.terminal.store.getFreeCapacity()>25000) {
                let result = this.terminalSend(room, RESOURCE_ENERGY, 20000, otherRoom.name, false);
                if (result == OK) {
                    console.log(helpers.getRoomLink(room.name), 'sended energy to min room ', otherRoom.name);
                    this.roomWithMinEnergy.name = '';
                }
            }
        }
    },
    
    sendEnergyToMinEnergyRoom_test: function(room, myRooms, tick1 = 1) { //new version with sending where many energy
        if (1 && !(Game.time%tick1) && room.storage && room.terminal && !room.terminal.cooldown && !this.roomTerminalUsed.includes(room.name)
        && (room.storage.store.getFreeCapacity()<20000 || (room.storage.store[RESOURCE_ENERGY] > 600000 && Game.shard.name == 'shard2'))
        && room.terminal.store[RESOURCE_ENERGY]>=50000 
        && (!Memory.rooms[room.name].noHelpOtherWithEnergy || Game.time > Memory.rooms[room.name].noHelpOtherWithEnergy) && this.getRoomWithMinEnergy(myRooms)) {
            const otherRoom = Game.rooms[this.getRoomWithMinEnergy(myRooms)];
            let maxEnergy = 999999999;
            if (room.storage.store.getFreeCapacity()>=20000) { // room.storage.store[RESOURCE_ENERGY] > 600000
                maxEnergy = 500000; //
            }
            if (otherRoom && otherRoom.name != room.name && otherRoom.storage && otherRoom.terminal && otherRoom.storage.store.getFreeCapacity()>20000 && otherRoom.terminal.store.getFreeCapacity()>25000 && otherRoom.storage.store[RESOURCE_ENERGY]<maxEnergy) {
                let result = this.terminalSend(room, RESOURCE_ENERGY, 20000, otherRoom.name, false);
                if (result == OK) {
                    console.log(helpers.getRoomLink(room.name), 'sended energy to min room ', helpers.getRoomLink(otherRoom.name));
                    this.roomWithMinEnergy.name = '';
                } else {
                    console.log(helpers.getRoomLink(room.name), 'sending energy to min room FAIL', helpers.getRoomLink(otherRoom.name), 'return', result);
                }
            } else {
                console.log(helpers.getRoomLink(room.name), 'sending energy to min room FAIL', helpers.getRoomLink(otherRoom.name));
            }
        }
    },
    
    amountResToSend: {
            [RESOURCE_METAL]: {minSend: 1, send: 1000, leave: 0},
            [RESOURCE_ALLOY]: {send: 1000, leave: 41, exporters: ['E79N52']},
            [RESOURCE_TUBE]: {send: 15, leave: 15, exporters: ['E79N54']},
            [RESOURCE_FIXTURES]: {send: 3, leave: 3, exporters: ['E81N53']},
            [RESOURCE_FRAME]: {send: 2, leave: 2, exporters: ['E83N54']},
            [RESOURCE_HYDRAULICS]: {send: 1, leave: 0, exporters: ['E87N56']},
            [RESOURCE_MACHINE]: {minSend: 1, send: 10, leave: 0, exporters: ['E83N58']},
            [RESOURCE_ESSENCE]: {minSend: 1, send: 10, leave: 0, exporters: ['E83N58']},
            [RESOURCE_DEVICE]: {minSend: 1, send: 10, leave: 0, exporters: ['E58N22']},
            [RESOURCE_CONDENSATE]: {send: 41, leave: 41, exporters: ['E79N52']},
            [RESOURCE_CONCENTRATE]: {send: 15, leave: 15, exporters: ['E79N54']},
            [RESOURCE_EXTRACT]: {send: 3, leave: 3, exporters: ['E81N53']},
            [RESOURCE_SPIRIT]: {send: 2, leave: 2, exporters: ['E83N54']},
            [RESOURCE_EMANATION]: {send: 1, leave: 0, exporters: ['E87N56']},
            [RESOURCE_WIRE]: {minSend: 120,send: 600, leave: 120, exporters: ['E45N29']},
            [RESOURCE_SWITCH]: {send: 15, leave: 15, exporters: ['E59N24']},
            [RESOURCE_TRANSISTOR]: {send: 5, leave: 5, exporters: []},
            [RESOURCE_MICROCHIP]: {send: 3, leave: 3, exporters: ['E58N27']},
            [RESOURCE_CIRCUIT]: {send: 1, leave: 1, exporters: ['E55N27']},
            [RESOURCE_DEVICE]: {minSend: 1, send: 10, leave: 0, exporters: []},
            [RESOURCE_POWER]: {minSend: 300, send: 600, leave: 1200},
            [RESOURCE_CATALYZED_GHODIUM_ACID]: {minSend: 1000, send: 5000, leave: 3000},
            [RESOURCE_COMPOSITE]: {minSend: 1000, send: 5000, leave: 600},
            [RESOURCE_OPS]: {minSend: 1000, send: 2000, leave: 1000},
            //[RESOURCE_UTRIUM_BAR]: {minSend: 100, send: 500, leave: 100, exporters: []},
    },
    
    sendResources: function (room, myRooms, tick1) {
        const amountResToSend = this.amountResToSend; 
        if (0){ //spread boosts resource to all rooms
            const fightResources = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, /*RESOURCE_CATALYZED_ZYNTHIUM_ACID,*/RESOURCE_CATALYZED_LEMERGIUM_ACID ];
            fightResources.forEach((resource) => {
                amountResToSend[resource] = {minSend: 1000, send: 3000, leave: 3000};
            });
            if (1 && !(Game.time%5) && room.terminal && room.storage) {
                fightResources.forEach((resource) => {
                    if (room.memory.needResource.indexOf(resource) == -1 && room.terminal.store[resource] + room.storage.store[resource] < 3000) {
                        room.memory.needResource.push(resource);
                    }
                    if (room.memory.needResource.indexOf(resource) >=0) {
                        console.log(helpers.getRoomLink(room.name), 'needed boost resource', resource);
                    }
                });
            }
        }
        
         if (!(Game.time%1000) && room.storage && room.terminal) {
             //check nukers for ghodium
            let nukers = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_NUKER}});
            if (nukers.length) {
                let needed = nukers[0].store.getFreeCapacity(RESOURCE_GHODIUM);
                let avaiable = room.storage.store[RESOURCE_GHODIUM]+ room.terminal.store[RESOURCE_GHODIUM];
                if (needed && needed>avaiable && room.memory.needResource && room.memory.needResource.indexOf(RESOURCE_GHODIUM) == -1) {
                    room.memory.needResource.push(RESOURCE_GHODIUM);    
                }
            }
                
            
             
         }
         if (!(Game.time%tick1) && !room.memory.needResource) {
             room.memory.needResource = [];
         }

        //send resources to other base
        if (1 && !(Game.time%tick1) && room.storage && room.terminal  && !room.terminal.cooldown && room.memory.needResource) {
            let needResource = room.memory.needResource;
            if (needResource.indexOf(RESOURCE_POWER) == -1 && room.controller.level == 8 && room.memory.powerSpawn && room.storage.store[RESOURCE_ENERGY]> 200000 && room.terminal.store[RESOURCE_POWER] < 1200 && !room.memory.timeSavingEnable) {
                needResource.push(RESOURCE_POWER);
            }
            // if (Game.shard.name == 'shard0' && room.name.startsWith('E8') && room.name != 'E83N54') {
            //     needResource = [];
            //     room.memory.factoryNeed = [];
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E77N55') {
            //     needResource = [];
            //     room.memory.factoryNeed = [];
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.memory.needResource.indexOf(RESOURCE_MACHINE) == -1) {
            //     room.memory.needResource.push(RESOURCE_MACHINE);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.memory.needResource.indexOf(RESOURCE_ESSENCE) == -1) {
            //     room.memory.needResource.push(RESOURCE_ESSENCE);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_KEANIUM_BAR] < 5000 && room.memory.needResource.indexOf(RESOURCE_KEANIUM_BAR) == -1) {
            //     room.memory.needResource.push(RESOURCE_KEANIUM_BAR);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_UTRIUM_BAR] < 5000 && room.memory.needResource.indexOf(RESOURCE_UTRIUM_BAR) == -1) {
            //     room.memory.needResource.push(RESOURCE_UTRIUM_BAR);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_KEANIUM] < 5000 && room.memory.needResource.indexOf(RESOURCE_KEANIUM) == -1) {
            //     room.memory.needResource.push(RESOURCE_KEANIUM);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE) == -1) {
            //     room.memory.needResource.push(RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_LEMERGIUM_BAR] < 5000 && room.memory.needResource.indexOf(RESOURCE_LEMERGIUM_BAR) == -1) {
            //     room.memory.needResource.push(RESOURCE_LEMERGIUM_BAR);
            // }
            // // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_GHODIUM_ALKALIDE] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_GHODIUM_ALKALIDE) == -1) {
            // //     room.memory.needResource.push(RESOURCE_CATALYZED_GHODIUM_ALKALIDE);
            // // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_UTRIUM_ACID] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_UTRIUM_ACID) == -1) {
            //     room.memory.needResource.push(RESOURCE_CATALYZED_UTRIUM_ACID);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_PURIFIER] < 2000 && room.memory.needResource.indexOf(RESOURCE_PURIFIER) == -1) {
            //     room.memory.needResource.push(RESOURCE_PURIFIER);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_ZYNTHIUM_ACID] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_ZYNTHIUM_ACID) == -1) {
            //     room.memory.needResource.push(RESOURCE_CATALYZED_ZYNTHIUM_ACID);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE) == -1) {
            //     room.memory.needResource.push(RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_KEANIUM_ALKALIDE] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_KEANIUM_ALKALIDE) == -1) {
            //     room.memory.needResource.push(RESOURCE_CATALYZED_KEANIUM_ALKALIDE);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_LEMERGIUM_ACID] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_LEMERGIUM_ACID) == -1) {
            //     room.memory.needResource.push(RESOURCE_CATALYZED_LEMERGIUM_ACID);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_ALLOY] < 5000 && room.memory.needResource.indexOf(RESOURCE_ALLOY) == -1) {
            //     room.memory.needResource.push(RESOURCE_ALLOY);
            // }

            // if (Game.shard.name == 'shard0' && room.name == 'E83N58' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_GHODIUM_ACID] < 50000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_GHODIUM_ACID) == -1) {
            //     room.memory.needResource.push(RESOURCE_CATALYZED_GHODIUM_ACID);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E83N58' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_GHODIUM_ALKALIDE] < 50000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_GHODIUM_ALKALIDE) == -1) {
            //     room.memory.needResource.push(RESOURCE_CATALYZED_GHODIUM_ALKALIDE);
            // }


            if (Game.shard.name == 'shard0' && room.name == 'E79N59' && !(Game.time%50)) {

                if (Game.shard.name == 'shard0' && room.name == 'E79N59' && room.terminal && room.terminal.store[RESOURCE_ALLOY] < 5000 && room.memory.needResource.indexOf(RESOURCE_ALLOY) == -1) {
                    room.memory.needResource.push(RESOURCE_ALLOY);
                }
                [RESOURCE_TUBE, RESOURCE_FIXTURES, RESOURCE_FRAME, RESOURCE_HYDRAULICS].forEach(res=> {
                    if (Game.shard.name == 'shard0' && room.name == 'E79N59' && room.terminal && room.terminal.store[res] < 5000 && room.memory.needResource.indexOf(res) == -1) {
                        room.memory.needResource.push(res);
                    }
                });
                
                
                if (Game.shard.name == 'shard0' && room.name == 'E79N59' && room.terminal && room.terminal.store[RESOURCE_CONDENSATE] < 5000 && room.memory.needResource.indexOf(RESOURCE_CONDENSATE) == -1) {
                    room.memory.needResource.push(RESOURCE_CONDENSATE);
                }
                if (Game.shard.name == 'shard0' && room.name == 'E79N59' && room.terminal && room.terminal.store[RESOURCE_REDUCTANT] < 5000 && room.memory.needResource.indexOf(RESOURCE_REDUCTANT) == -1) {
                    room.memory.needResource.push(RESOURCE_REDUCTANT);
                }
                if (Game.shard.name == 'shard0' && room.name == 'E79N59' && room.terminal && room.terminal.store[RESOURCE_OXIDANT] < 5000 && room.memory.needResource.indexOf(RESOURCE_OXIDANT) == -1) {
                    room.memory.needResource.push(RESOURCE_OXIDANT);
                }
                if (Game.shard.name == 'shard0' && room.name == 'E79N59' && room.terminal && room.terminal.store[RESOURCE_PURIFIER] < 5000 && room.memory.needResource.indexOf(RESOURCE_PURIFIER) == -1) {
                    room.memory.needResource.push(RESOURCE_PURIFIER);
                }
                if (Game.shard.name == 'shard0' && room.name == 'E79N59' && room.terminal && room.terminal.store[RESOURCE_UTRIUM_BAR] < 5000 && room.memory.needResource.indexOf(RESOURCE_UTRIUM_BAR) == -1) {
                    room.memory.needResource.push(RESOURCE_UTRIUM_BAR);
                }
                if (Game.shard.name == 'shard0' && room.name == 'E79N59' && room.terminal && room.terminal.store[RESOURCE_UTRIUM] < 5000 && room.memory.needResource.indexOf(RESOURCE_UTRIUM) == -1) {
                    room.memory.needResource.push(RESOURCE_UTRIUM);
                }
                if (Game.shard.name == 'shard0' && room.name == 'E79N59' && room.terminal && room.terminal.store[RESOURCE_KEANIUM_BAR] < 10000 && room.memory.needResource.indexOf(RESOURCE_KEANIUM_BAR) == -1) {
                    room.memory.needResource.push(RESOURCE_KEANIUM_BAR);
                }
                if (Game.shard.name == 'shard0' && room.name == 'E79N59' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_ZYNTHIUM_ACID] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_ZYNTHIUM_ACID) == -1) {
                    room.memory.needResource.push(RESOURCE_CATALYZED_ZYNTHIUM_ACID);
                }
                if (Game.shard.name == 'shard0' && room.name == 'E79N59' && room.terminal && room.terminal.store[RESOURCE_GHODIUM] < 5000 && room.memory.needResource.indexOf(RESOURCE_GHODIUM) == -1) {
                    room.memory.needResource.push(RESOURCE_GHODIUM);
                }
            }

            if (Game.shard.name == 'shard3' && room.name == 'E42N31' && !(Game.time%200)) {

                if (Game.shard.name == 'shard3' && room.name == 'E42N31' && room.terminal && room.terminal.store[RESOURCE_LEMERGIUM_BAR] < 5000 && room.memory.needResource.indexOf(RESOURCE_LEMERGIUM_BAR) == -1) {
                    room.memory.needResource.push(RESOURCE_LEMERGIUM_BAR);
                }
                if (Game.shard.name == 'shard3' && room.name == 'E42N31' && room.terminal && room.terminal.store[RESOURCE_GHODIUM_OXIDE] < 100 && room.memory.needResource.indexOf(RESOURCE_GHODIUM_OXIDE) == -1) {
                    room.memory.needResource.push(RESOURCE_GHODIUM_OXIDE);
                }
                if (Game.shard.name == 'shard3' && room.name == 'E42N31' && room.terminal && room.terminal.store[RESOURCE_ZYNTHIUM_HYDRIDE] < 100 && room.memory.needResource.indexOf(RESOURCE_ZYNTHIUM_HYDRIDE) == -1) {
                    room.memory.needResource.push(RESOURCE_ZYNTHIUM_HYDRIDE);
                }
                if (Game.shard.name == 'shard3' && room.name == 'E42N31' && room.terminal && room.terminal.store[RESOURCE_UTRIUM_HYDRIDE] < 100 && room.memory.needResource.indexOf(RESOURCE_UTRIUM_HYDRIDE) == -1) {
                    room.memory.needResource.push(RESOURCE_UTRIUM_HYDRIDE);
                }
                if (Game.shard.name == 'shard3' && room.name == 'E42N31' && room.terminal && room.terminal.store[RESOURCE_LEMERGIUM_OXIDE] < 100 && room.memory.needResource.indexOf(RESOURCE_LEMERGIUM_OXIDE) == -1) {
                    room.memory.needResource.push(RESOURCE_LEMERGIUM_OXIDE);
                }
                if (Game.shard.name == 'shard3' && room.name == 'E42N31' && room.terminal && room.terminal.store[RESOURCE_CONDENSATE] < 5000 && room.memory.needResource.indexOf(RESOURCE_CONDENSATE) == -1) {
                    room.memory.needResource.push(RESOURCE_CONDENSATE);
                }
                // if (Game.shard.name == 'shard3' && room.name == 'E42N31' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_KEANIUM_ALKALIDE] < 30000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_KEANIUM_ALKALIDE) == -1) {
                //     room.memory.needResource.push(RESOURCE_CATALYZED_KEANIUM_ALKALIDE);
                // }
                // if (Game.shard.name == 'shard3' && room.name == 'E42N31' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_LEMERGIUM_ACID] < 30000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_LEMERGIUM_ACID) == -1) {
                //     room.memory.needResource.push(RESOURCE_CATALYZED_LEMERGIUM_ACID);
                // }

            }
            
            if (Game.shard.name == 'shard2' && !(Game.time%350) && room.controller.level == 8 && Memory.stock && Memory.stock[RESOURCE_CATALYZED_GHODIUM_ACID] > 400000 && room.terminal && room.terminal.store.getFreeCapacity() > 45000 && room.storage && (room.terminal.store[RESOURCE_CATALYZED_GHODIUM_ACID] + room.storage.store[RESOURCE_CATALYZED_GHODIUM_ACID])  < 10000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_GHODIUM_ACID) == -1) {
                room.memory.needResource.push(RESOURCE_CATALYZED_GHODIUM_ACID);
            }

            
            if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.storage && room.storage.store.getFreeCapacity() > 100000 && !(Game.time%50)) { 
                // if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.terminal && room.terminal.store[RESOURCE_ZYNTHIUM_BAR] < 5000 && room.memory.needResource.indexOf(RESOURCE_ZYNTHIUM_BAR) == -1) {
                //     room.memory.needResource.push(RESOURCE_ZYNTHIUM_BAR);
                // }
                // if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE] < 30000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE) == -1) {
                //     room.memory.needResource.push(RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE);
                // }
                
                // if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_GHODIUM_ACID] < 30000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_GHODIUM_ACID) == -1) {
                //     room.memory.needResource.push(RESOURCE_CATALYZED_GHODIUM_ACID);
                // }
                if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_GHODIUM_ALKALIDE] < 30000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_GHODIUM_ALKALIDE) == -1) {
                    room.memory.needResource.push(RESOURCE_CATALYZED_GHODIUM_ALKALIDE);
                }
                // if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_ZYNTHIUM_ACID] < 30000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_ZYNTHIUM_ACID) == -1) {
                //     room.memory.needResource.push(RESOURCE_CATALYZED_ZYNTHIUM_ACID);
                // }
                if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.terminal && room.terminal.store[RESOURCE_OPS] < 4000 && room.memory.needResource.indexOf(RESOURCE_OPS) == -1) {
                    room.memory.needResource.push(RESOURCE_OPS);
                }
                // if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.memory.needResource.indexOf(RESOURCE_DEVICE) == -1) {
                //     room.memory.needResource.push(RESOURCE_DEVICE);
                // }
                // // if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.memory.needResource.indexOf(RESOURCE_MACHINE) == -1) {
                // //     room.memory.needResource.push(RESOURCE_MACHINE);
                // // }
                // if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.memory.needResource.indexOf(RESOURCE_ESSENCE) == -1) {
                //     room.memory.needResource.push(RESOURCE_ESSENCE);
                // }
                // if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.memory.needResource.indexOf(RESOURCE_MACHINE) == -1) {
                //     room.memory.needResource.push(RESOURCE_MACHINE);
                // }

            }
            
            let t5resRoom = 'E42N28_';
            if (Game.shard.name == 'shard2' && room.name == t5resRoom && room.storage && room.storage.store.getFreeCapacity() > 100000 && !(Game.time%50)) { 
                if (Game.shard.name == 'shard2' && room.name == t5resRoom && room.memory.needResource.indexOf(RESOURCE_DEVICE) == -1) {
                    room.memory.needResource.push(RESOURCE_DEVICE);
                }
                if (Game.shard.name == 'shard2' && room.name == t5resRoom && room.memory.needResource.indexOf(RESOURCE_ESSENCE) == -1) {
                    room.memory.needResource.push(RESOURCE_ESSENCE);
                }
                if (Game.shard.name == 'shard2' && room.name == t5resRoom && room.memory.needResource.indexOf(RESOURCE_MACHINE) == -1) {
                    room.memory.needResource.push(RESOURCE_MACHINE);
                }
            }
            
            
            if (Game.shard.name == 'shard2' && room.name == 'E44S8' && room.terminal && room.terminal.store[RESOURCE_OPS] < 4000 && room.memory.needResource.indexOf(RESOURCE_OPS) == -1) {
                    room.memory.needResource.push(RESOURCE_OPS);
            }

            
            
            if (Game.shard.name == 'shard2' && room.name == 'E41N39' && room.storage && room.storage.store.getFreeCapacity() > 100000 && !(Game.time%20)) {
                // if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.terminal && room.terminal.store[RESOURCE_ZYNTHIUM_BAR] < 5000 && room.memory.needResource.indexOf(RESOURCE_ZYNTHIUM_BAR) == -1) {
                //     room.memory.needResource.push(RESOURCE_ZYNTHIUM_BAR);
                // }
                if (Game.shard.name == 'shard2' && room.name == 'E41N39' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_UTRIUM_ACID] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_UTRIUM_ACID) == -1) {
                    room.memory.needResource.push(RESOURCE_CATALYZED_UTRIUM_ACID);
                }
                if (Game.shard.name == 'shard2' && room.name == 'E41N39' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_KEANIUM_ALKALIDE] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_KEANIUM_ALKALIDE) == -1) {
                    room.memory.needResource.push(RESOURCE_CATALYZED_KEANIUM_ALKALIDE);
                }
                if (Game.shard.name == 'shard2' && room.name == 'E41N39' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_LEMERGIUM_ACID] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_LEMERGIUM_ACID) == -1) {
                    room.memory.needResource.push(RESOURCE_CATALYZED_LEMERGIUM_ACID);
                }
                if (Game.shard.name == 'shard2' && room.name == 'E41N39' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE) == -1) {
                    room.memory.needResource.push(RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE);
                }
                if (Game.shard.name == 'shard2' && room.name == 'E41N39' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_KEANIUM_ACID] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_KEANIUM_ACID) == -1) {
                    room.memory.needResource.push(RESOURCE_CATALYZED_KEANIUM_ACID);
                }
                
                // if (Game.shard.name == 'shard2' && room.name == 'E41N39' && room.memory.needResource.indexOf(RESOURCE_DEVICE) == -1) {
                //     room.memory.needResource.push(RESOURCE_DEVICE);
                // }
                // // if (Game.shard.name == 'shard2' && room.name == 'E42N28' && room.memory.needResource.indexOf(RESOURCE_MACHINE) == -1) {
                // //     room.memory.needResource.push(RESOURCE_MACHINE);
                // // }
                // if (Game.shard.name == 'shard2' && room.name == 'E41N39' && room.memory.needResource.indexOf(RESOURCE_ESSENCE) == -1) {
                //     room.memory.needResource.push(RESOURCE_ESSENCE);
                // }
                // if (Game.shard.name == 'shard2' && room.name == 'E41N39' && room.memory.needResource.indexOf(RESOURCE_MACHINE) == -1) {
                //     room.memory.needResource.push(RESOURCE_MACHINE);
                // }

                
                // if (Game.shard.name == 'shard2' && room.name == 'E41N39' && room.memory.needResource.indexOf(RESOURCE_MACHINE) == -1) {
                //     room.memory.needResource.push(RESOURCE_MACHINE);
                // }

            }
            
            // if (Game.shard.name == 'shard2' && room.name == 'E49N22' && room.terminal && room.terminal.store[RESOURCE_GHODIUM] < 5000 && room.memory.needResource.indexOf(RESOURCE_GHODIUM) == -1) {
            //     room.memory.needResource.push(RESOURCE_GHODIUM);
            // }
            if (room.memory.factoryNeedPower && room.terminal && room.terminal.store[RESOURCE_OPS] < 300 && room.memory.needResource.indexOf(RESOURCE_OPS) == -1) {
                room.memory.needResource.push(RESOURCE_OPS);
            }
            
            
            
            // if (Game.shard.name == 'shard0' && room.name == 'E89N54' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_GHODIUM_ACID] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_GHODIUM_ACID) == -1) {
            //     room.memory.needResource.push(RESOURCE_CATALYZED_GHODIUM_ACID);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_LEMERGIUM_BAR] < 9000 && room.memory.needResource.indexOf(RESOURCE_LEMERGIUM_BAR) == -1) {
            //     room.memory.needResource.push(RESOURCE_LEMERGIUM_BAR);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E89N54' && room.terminal && room.terminal.store[RESOURCE_LEMERGIUM_BAR] < 9000 && room.memory.needResource.indexOf(RESOURCE_LEMERGIUM_BAR) == -1) {
            //     room.memory.needResource.push(RESOURCE_LEMERGIUM_BAR);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E89N54' && room.terminal && room.terminal.store[RESOURCE_LEMERGIUM] < 40000 && room.memory.needResource.indexOf(RESOURCE_LEMERGIUM) == -1) {
            //     room.memory.needResource.push(RESOURCE_LEMERGIUM);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_LEMERGIUM] < 7000 && room.memory.needResource.indexOf(RESOURCE_LEMERGIUM) == -1) {
            //     room.memory.needResource.push(RESOURCE_LEMERGIUM);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E89N54' && room.terminal && room.terminal.store[RESOURCE_UTRIUM_BAR] < 5000 && room.memory.needResource.indexOf(RESOURCE_UTRIUM_BAR) == -1) {
            //     room.memory.needResource.push(RESOURCE_UTRIUM_BAR);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E89N54' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_GHODIUM_ALKALIDE] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_GHODIUM_ALKALIDE) == -1) {
            //     room.memory.needResource.push(RESOURCE_CATALYZED_GHODIUM_ALKALIDE);
            // }
            // if (Game.shard.name == 'shard0' && room.name == 'E89N54' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE] < 5000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE) == -1) {
            //     room.memory.needResource.push(RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE);
            // }

            // if (Game.shard.name == 'shard0' && room.name == 'E81N58' && room.terminal && room.terminal.store[RESOURCE_LEMERGIUM_HYDRIDE] < 15000 && room.memory.needResource.indexOf(RESOURCE_LEMERGIUM_HYDRIDE) == -1) {
            //     room.memory.needResource.push(RESOURCE_LEMERGIUM_HYDRIDE);
            // }
            
            // if (Game.shard.name == 'shard2' && room.name == 'E58N22' && room.terminal && room.terminal.store[RESOURCE_CRYSTAL] < 15000 && room.memory.needResource.indexOf(RESOURCE_CRYSTAL) == -1) {
            //     room.memory.needResource.push(RESOURCE_CRYSTAL);
            // }
            // if (Game.shard.name == 'shard2' && room.name == 'E58N22' && room.terminal && room.terminal.store[RESOURCE_GHODIUM_MELT] < 15000 && room.memory.needResource.indexOf(RESOURCE_GHODIUM_MELT) == -1) {
            //     room.memory.needResource.push(RESOURCE_GHODIUM_MELT);
            // }
            
            
            // if (Game.shard.name == 'shard0' && room.name == 'E83N58' && room.terminal && room.terminal.store[RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE] < 50000 && room.memory.needResource.indexOf(RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE) == -1) {
            //     room.memory.needResource.push(RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE);
            // }

            
            if (this.newTerminalShardEnable.includes(Game.shard.name)) {
                return this.runTerminalQueue(room);
            }
            
            require('profiler').start('terminalSendLoop');
            for(const myRoom of myRooms) {
                const otherRoom = Game.rooms[myRoom.roomName];
                if (otherRoom && room.name != otherRoom.name && !this.roomTerminalUsed.includes(otherRoom.name) && otherRoom.controller.level >= 6){
                    for(const resource of needResource){
                    // for (let i=0;i<room.memory.needResource.length;i++){
                    //     const resource = room.memory.needResource[i];
                        let maxAmount = 1;
                        let leave = 600;
                        let send = 5000;
                        let minSend = send;
                        if (amountResToSend[resource]){
                            leave = amountResToSend[resource].leave;
                            if (amountResToSend[resource].exporters && amountResToSend[resource].exporters.indexOf(otherRoom.name) !== -1) {
                                leave = 0;
                            }
                            send = amountResToSend[resource].send;
                            minSend = amountResToSend[resource].minSend?amountResToSend[resource].minSend:send;
                            maxAmount = minSend + leave;
                        }
                        if (!otherRoom.memory.importResourceList || !otherRoom.memory.importResourceList[resource]){
                            leave = 0;
                            maxAmount = 1;
                        }

                        // if (otherRoom.name == 'E79N54') {
                        //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',otherRoom.name, maxAmount, send, leave);
                        // }
                        if (otherRoom.terminal && otherRoom.terminal.my && !otherRoom.terminal.cooldown && otherRoom.terminal.store[resource]>=maxAmount){
                            let amount = Math.min(otherRoom.terminal.store[resource]-leave, send);
                            if (amount >= 1){
                                const res = this.terminalSend(otherRoom, resource, amount, room.name);
                                if (res == OK){
                                    this.roomTerminalUsed.push(otherRoom.name);
                                    if (!otherRoom.memory.terminalLog || otherRoom.memory.terminalLog == 1) {
                                        otherRoom.memory.terminalLog = [];
                                    }
                                    otherRoom.memory.terminalLog.push(''+Game.time+' '+otherRoom.name+' send '+resource+' '+amount+' to '+room.name);
                                    if (otherRoom.memory.terminalLog.length > 20) {
                                        otherRoom.memory.terminalLog.shift();
                                    }
                                    //Game.notify(Game.time+' '+otherRoom.name+' sending needed resource '+resource+' to '+room.name+' amount '+amount+ ' result ' + res, 180);
                                    //console.log(otherRoom.name,' sending needed resource ',resource,' to ',room.name, res);
                                    do {
                                        room.memory.needResource.splice(room.memory.needResource.indexOf(resource), 1);    
                                    } while (room.memory.needResource.indexOf(resource) >= 0);
                                    if (room.memory.importResourceList === undefined){
                                        room.memory.importResourceList = {}
                                    }
                                    room.memory.importResourceList[resource] = 1;
                                    break;
                                } else {
                                    console.log(otherRoom.name,' ERROR sending needed resource '+resource+' to '+room.name, res, amount, otherRoom.terminal.store[resource]);
                                }
                            }
                        }
                        if (otherRoom.name == 'E42N28' && resource == 'XGHO2') {
                            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', otherRoom.terminal.store[resource] < (leave + maxAmount), otherRoom.storage.store[resource] >= maxAmount, otherRoom.memory.importResourceList[resource], leave, maxAmount);
                        }
                        if (otherRoom.terminal && otherRoom.terminal.my && !otherRoom.terminal.cooldown && otherRoom.terminal.store[resource] < (leave + maxAmount)
                        && otherRoom.storage && otherRoom.storage.my && otherRoom.storage.store[resource] >= maxAmount && !otherRoom.memory.transferToTerminal) {
                            if (otherRoom.terminal.store.getFreeCapacity() < 5000) {
                                Game.notify('Room '+otherRoom.name+' no free space for transfer res from storage to terminal');
                                console.log('Room '+otherRoom.name+' no free space for transfer res from storage to terminal');
                            } else {
                                let transferAmount = 5000;
                                if (otherRoom.terminal.store.getFreeCapacity() < 15000) {
                                    transferAmount = 3000;
                                }
                                console.log(otherRoom.name+' storage store needed '+resource+'('+ otherRoom.storage.store[resource] +') for '+room.name);
                                otherRoom.memory.transferToTerminal = {resource: resource, amount: transferAmount};
                            }
                            
                        }
                    }
                }
             }
            require('profiler').end('terminalSendLoop');
        }        
    },
    
    
    tsrCustomCheck: function(room) {
         if (Game.shard.name == 'shard3' && room.name == 'E39N21' && !(Game.time%20)) {
            [RESOURCE_UTRIUM, RESOURCE_HYDROGEN, RESOURCE_CATALYST].forEach(res => {
                if (room.terminal && room.terminal.store[res] < 15000 && room.memory.needResource.indexOf(res) == -1) {
                    room.memory.needResource.push(res);
                }
            });
            [RESOURCE_OXYGEN, RESOURCE_LEMERGIUM, RESOURCE_KEANIUM, RESOURCE_ZYNTHIUM].forEach(res => {
                if (room.terminal && room.terminal.store[res] < 5000 && room.memory.needResource.indexOf(res) == -1) {
                    room.memory.needResource.push(res);
                }
            });
        }
    },
    
    
    newTerminalShardEnable: ['shard3', 'shard1', 'shard0', 'shard2'],
    terminalManagerTick: function() {
        if (this.newTerminalShardEnable.includes(Game.shard.name)) {
            let ticks = 25;
            if (Game.cpu.bucket < 6000) {
                ticks = 40;
            } else if (Game.cpu.bucket < 3000) {
                ticks = 50;
            } else if (Game.cpu.bucket < 1500) {
                ticks = 80;
            }
            
            if (!(Game.time%ticks)) {
                //console.log('terminalManagerTick');
                this.terminalManager();
            }
        }
    },
    
    //require('terminal').terminalManager(1); 
    terminalManager: function(verbose = false) {
        require('profiler').start('terminalManager');
        if (!this.myRoomsList) {
            this.myRoomsList= _.filter(Game.rooms, room => room.controller && room.controller.my && room.controller.level >=6 && room.terminal && room.terminal.my).map(room => room.name);
        }
        const startCpu = Game.cpu.getUsed();
        let resourcesList = {};
        this.myRoomsList.forEach(roomName => {
            _.get(Memory, `rooms.${roomName}.needResource`, []).forEach(res => {
                if (verbose) {
                    if (!resourcesList[res]) {
                        resourcesList[res] = {rooms:[roomName]};    
                    } else {
                        resourcesList[res].rooms.push(roomName);
                    }
                } else {
                    resourcesList[res] = {};
                }
            })
        });
        let needResourcesArr =  Object.keys(resourcesList);
        
        this.myRoomsList.forEach(roomName => {
            let room = Game.rooms[roomName];
            if (!room) return;
            Object.entries(_.get(room, 'terminal.store', {}))
                .filter(resPair => needResourcesArr.includes(resPair[0]) && resPair[1] >= this.getTransportResMinStockAmount(resPair[0], roomName).minStockAmount)
                .forEach(resPair => {
                    resourcesList[resPair[0]][roomName] = {amountTerminal: resPair[1], amountStorage: 0, amount: resPair[1], minStockAmount: this.getTransportResMinStockAmount(resPair[0], roomName, verbose).minStockAmount};
                });    
            Object.entries(_.get(room, 'storage.store', {}))
                .filter(resPair => needResourcesArr.includes(resPair[0]) && resPair[1] >= this.getTransportResMinStockAmount(resPair[0], roomName, verbose).minStockAmount)
                .forEach(resPair => {
                    resourcesList[resPair[0]][roomName] = _.assign((resourcesList[resPair[0]][roomName] || {}), {amountTerminal: 0, amountStorage: resPair[1], amount: resPair[1]}, _.add); 
                });
        });
        if (verbose) console.log(JSON.stringify(resourcesList));
        Object.keys(resourcesList).forEach(res => !Object.keys(resourcesList[res]).length?(delete resourcesList[res]) : 0);
        //console.log(JSON.stringify(resourcesList));
        this.myRoomsList.forEach(roomName => {
            let needResources = _.get(Memory, `rooms.${roomName}.needResource`, []);
            needResources.forEach(resource => {
                let roomsList = Object.keys(_.get(resourcesList, resource, {})).filter(supRoom => supRoom != roomName);
                if (!roomsList.length) return;
                
                //try terminal first with huge stock
                let suppliersRooms = roomsList.filter(roomName=>_.get(resourcesList, `${resource}.${roomName}.amountTerminal`, 0) >= 5000);
                if (!suppliersRooms.length) { //try terminal first with min stock
                    suppliersRooms = roomsList.filter(roomName=>_.get(resourcesList, `${resource}.${roomName}.amountTerminal`, 0) >= this.getTransportResMinStockAmount(resource, roomName, verbose).minStockAmount);
                }
                if (!suppliersRooms.length) { //any
                    suppliersRooms = roomsList.filter(roomName=>_.get(resourcesList, `${resource}.${roomName}.amount`, 0) >= this.getTransportResMinStockAmount(resource, roomName, verbose).minStockAmount);
                }
                if (!suppliersRooms.length) return;
                
                let suplyRoom = _.max(suppliersRooms, roomName => resourcesList[resource][roomName].amount);
                let amount = this.getTransportResAmount(resource);
                this.addTerminalQueue(suplyRoom, roomName, resource, amount, verbose);
                
                resourcesList[resource][suplyRoom].transfer = (resourcesList[resource][suplyRoom].transfer || 0) + 1;
                resourcesList[resource][suplyRoom].amount -= amount;
                if (1 || resourcesList[resource][suplyRoom].amount > this.getTransportResMinStockAmount(resource, suplyRoom, verbose).minStockAmount) {
                    resourcesList[resource][suplyRoom].amountTerminal -= amount;
                    if (resourcesList[resource][suplyRoom].amountTerminal <0 ) {
                        resourcesList[resource][suplyRoom].amountStorage += resourcesList[resource][suplyRoom].amountTerminal;
                        resourcesList[resource][suplyRoom].amountTerminal = 0;
                    }
                } else {
                    //delete resourcesList[resource][suplyRoom]
                }
            });
        });
        if (verbose) console.log('cpu used', Game.cpu.getUsed() - startCpu,'\n', JSON.stringify(resourcesList));
        require('profiler').end('terminalManager');
    },
    
    addTerminalQueue: function(roomName, targetRoomName, resource, amount, verbose = false) {
        if (!Memory.rooms[roomName].terminalQueueTime || Memory.rooms[roomName].terminalQueueTime != Game.time || !Memory.rooms[roomName].terminalQueue) {
            Memory.rooms[roomName].terminalQueue = [];
            Memory.rooms[roomName].terminalQueueTime = Game.time;
        }
        if (this.newTerminalShardEnable.includes(Game.shard.name)) {
            Memory.rooms[roomName].terminalQueue.push({dest: targetRoomName, res: resource, amount: amount});    
        }
        if (verbose) console.log('addTerminalQueue', roomName, JSON.stringify({dest: targetRoomName, res: resource, amount: amount}));
    },
    
    getTransportResAmount: function(resource) {
        return this.amountResToSend[resource]?this.amountResToSend[resource].send:5000;
    },
    
    
    getTransportResMinStockAmount: function(resource, roomName, verbose = false) {
        if (roomName == 'rooms') return {minStockAmount: 1};
        let params = {};
        params.maxAmount = 1;
        params.leave = 600;
        params.send = 5000;
        params.minSend = 5000;
        if (this.amountResToSend[resource]) {
            params.leave = this.amountResToSend[resource].leave;
            if (this.amountResToSend[resource].exporters && this.amountResToSend[resource].exporters.indexOf(roomName) !== -1) {
                params.leave = 0;
            }
            params.send = this.amountResToSend[resource].send;
            params.minSend = this.amountResToSend[resource].minSend?this.amountResToSend[resource].minSend:params.send;
            params.maxAmount = params.minSend + params.leave;    
        }
        if (!Memory.rooms[roomName].importResourceList || !Memory.rooms[roomName].importResourceList[resource]){
            params.leave = 0;
            params.maxAmount = 1;
        }
        params.minStockAmount =  params.leave + params.maxAmount;
        
        if (verbose) {
            if (!this.trmsaCache) {
                this.trmsaCache = {};
            }
            if (!this.trmsaCache[roomName]) {
                this.trmsaCache[roomName] = {};
            }
            if (!this.trmsaCache[roomName][resource]) {
                this.trmsaCache[roomName][resource] = 1;
                console.log('getTransportResMinStockAmount', roomName, resource, JSON.stringify(params));
            }
        }
        
        
        
        
        return params;
    },
    
    runTerminalQueue: function(room) {
        if (!room.terminal || !room.terminal.my|| this.roomTerminalUsed.includes(room.name)) {
            return;
        } else if (room.terminal.cooldown) {
            return room.terminal.cooldown;
        } else if (!room.memory.terminalQueue || !room.memory.terminalQueue.length) {
            //console.log('runTerminalQueue', room.name, 'no task');
            return 10; //10 ticks wait
        }
        require('profiler').start('runTerminalQueue');
        
        let sendInfo = room.memory.terminalQueue[0];
        room.memory.terminalQueue = room.memory.terminalQueue.slice(1);
        
        let resource = sendInfo.res;
        const amountResToSend = this.amountResToSend;
        
        let sendParams = this.getTransportResMinStockAmount(resource, room.name);
        
        //console.log('runTerminalQueue', room.name, resource, room.terminal.store[resource], sendParams.maxAmount);
        if (room.terminal.store[resource]>=sendParams.maxAmount){
            let amount = Math.min(room.terminal.store[resource]-sendParams.leave, sendParams.send);
            if (amount >= 1){
                const res = this.terminalSend(room, resource, amount, sendInfo.dest);
                if (res == OK){
                    if (!Memory.production) {
                        if (!room.memory.terminalLog || room.memory.terminalLog == 1) {
                            room.memory.terminalLog = [];
                        }
                        room.memory.terminalLog.push(''+Game.time+' NEWALG '+room.name+' send '+resource+' '+amount+' to '+sendInfo.dest);
                        if (room.memory.terminalLog.length > 20) {
                            room.memory.terminalLog.shift();
                        }
                    } else {
                        if (room.memory.terminalLog) {
                            delete room.memory.terminalLog;
                        }
                    }
                    //console.log(room.name,' sending needed resource ',resource,' to ',sendInfo.dest, res);
                    do {
                        Memory.rooms[sendInfo.dest].needResource.splice(Memory.rooms[sendInfo.dest].needResource.indexOf(resource), 1);    
                    } while (Memory.rooms[sendInfo.dest].needResource.indexOf(resource) >= 0);
                    if (Memory.rooms[sendInfo.dest].importResourceList === undefined){
                        Memory.rooms[sendInfo.dest].importResourceList = {}
                    }
                    Memory.rooms[sendInfo.dest].importResourceList[resource] = 1;
                } else {
                    console.log(room.name,' ERROR sending needed resource '+resource+' to '+sendInfo.dest, res, amount, room.terminal.store[resource]);
                    //need sleep
                }
            } else {
                //need sleep
            }
        }
        
        if (room.terminal.store[resource] < (sendParams.leave + sendParams.maxAmount) && room.storage && room.storage.my && room.storage.store[resource] >= sendParams.maxAmount && !room.memory.transferToTerminal) {
            if (room.terminal.store.getFreeCapacity() < 5000) { 
                Game.notify('Room '+room.name+' no free space for transfer res from storage to terminal');
                console.log('Room '+room.name+' no free space for transfer res from storage to terminal');
            } else {
                let transferAmount = 5000;
                if (room.terminal.store.getFreeCapacity() < 15000) {
                    transferAmount = 3000;
                }
                console.log(room.name+' storage store needed '+resource+'('+ room.storage.store[resource] +') for '+sendInfo.dest);
                room.memory.transferToTerminal = {resource: resource, amount: transferAmount};
            }
        }
      
        require('profiler').end('runTerminalQueue');
    },
    
       
            

};