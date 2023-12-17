var helpers = require('helpers');
var marketHelper = require('market');

//Memory.rooms['E43N38'].noHelpOtherWithEnergy = 143632634 

var roleGclBooster = {
    roomConfig: {
        'E43N38': {
            upgraderCount: 7,//7,
            stopReClaim: 0,
            cranePos: [44,23],
            renewPos: [43,23],
            predRenewPos: [44,22],
            containerPos: [43,22],
            spawn: 'Spawn1_E43N38',
            container: '61aa6b67815b472fa6c29ddd',
            lab: '61aa6af9a177370bd02c1f10',
            moveMatrix: [
                [43,23,LEFT],
                [42,23,TOP],
                [42,22,RIGHT],
                [43,22,TOP_LEFT],
                [42,21,RIGHT],
                [43,21,RIGHT],
                [44,21,BOTTOM],
                [44,22,BOTTOM_LEFT],
                
                // [27,21, RIGHT],
                // [28,21, TOP],
                // [28,20, LEFT],
                // [27,20, TOP_RIGHT],
                // [28,19, LEFT],
                // [27,19, LEFT],
                // [26,19, BOTTOM],
                // [26,20, BOTTOM_RIGHT],

                // [27,21, TOP_LEFT],
                // [28,21, LEFT],
                // [28,20, BOTTOM],
                // [27,20, RIGHT],
                // [28,19, BOTTOM_LEFT],
                // [27,19, RIGHT],
                // [26,19, RIGHT],
                // [26,20, TOP],
                

            ],
        }, 
    },
    getGclCraneBody: function(roomName) {
        return [MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
    },
    getGclUpgraderBody: function(roomName) {
        //return [MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY]; // MOVE*2,WORK*19,CARRY*4 2.20K
         //return [MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY]; // MOVE*2,WORK*19,CARRY*4 2.20K
        //return [MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY];
        return [MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY]; //MOVE*1,WORK*45,CARRY*4
    },
    getGclUpgraderCount: function(roomName) {
        const roomConfig = roleGclBooster.roomConfig[roomName];
        if (roomConfig && roomConfig.upgraderCount) {
            return roomConfig.upgraderCount;
        }
        return 0;
    },
    getGclClaimerBody: [MOVE, CLAIM],
    rotateCreeps(roomName) {
        const roomConfig = roleGclBooster.roomConfig[roomName];
        if (!roomConfig) return;
        for (const posInfo of roomConfig.moveMatrix){
            const creepPos = new RoomPosition(posInfo[0], posInfo[1], roomName);
            const creeps = creepPos.lookFor(LOOK_CREEPS);
            if (creeps.length) {
                if (creeps[0].fatigue){
                    return Math.ceil(creeps[0].fatigue/2);
                }
                creeps[0].move(posInfo[2]);
            }
        }
        return 0;
    },
    gclClaimer: function(creep) {
        if (!creep.pos.isNearTo(creep.room.controller)){
            creep.moveTo(creep.room.controller, {reusePath: 0, ignoreCreeps: false});    
        } else {
            if (creep.room.controller.my && creep.room.controller.level < 7) {
                creep.suicide();
            } else {
                creep.claimController(creep.room.controller);
            }
        }
    },
    boostGclUpgrader: undefined,
    gclUpgrader: function(creep) {
        
        const roomConfig = roleGclBooster.roomConfig[creep.memory.room];
        if (!roomConfig) return;
        const container = Game.getObjectById(roomConfig.container);
        if (!container) return;
        // creep.say('sdsd2');
        if (!creep.pos.isNearTo(container)){
            if (creep.room.name == 'E43N38' && creep.pos.isEqualTo(42,24)){
                if (!(Game.time%2)){
                    creep.move(TOP_RIGHT);    
                } else {
                    creep.move(TOP);    
                }
            } else if (creep.room.name == 'E43N38' && !creep.pos.isEqualTo(42,24)){
                creep.moveTo(new RoomPosition(42,24,'E43N38'), {range:0, ignoreCreeps: false, reusePath: 0});
            } else {
                creep.moveTo(container, {range:1, ignoreCreeps: true});    
            }

            // const obstacles = creep.room.lookForAt(LOOK_CREEPS, creep.pos.x, creep.pos.y-1);
            // if (obstacles.length && obstacles[0].getActiveBodyparts(WORK) < creep.getActiveBodyparts(WORK) && !creep.fatigue){
            //     obstacles[0].move(obstacles[0].pos.getDirectionTo(creep.pos));
            //     creep.move(TOP);
            // } else if (!obstacles.length){
            //     creep.move(TOP);
            // }
        } else {
            if (creep.room.controller.my && creep.room.controller.level < 9) { //8 !!!!!!!!!!!!
                if (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 100000) {
                    if (creep.room.controller.level == 7 && creep.room.controller.progress > 1000000 && creep.room.storage.store[RESOURCE_ENERGY] < 1500000){
                        Memory.stopPowerProcess = 1;
                    } else if (creep.room.controller.level == 7 && creep.room.controller.progress > 6000000 && creep.room.storage.store[RESOURCE_ENERGY] < 4000000){
                        Memory.stopPowerProcess = 1;
                    } else {
                        if (!(Game.time%100)) {
                            if (_.get(Memory, 'stock.energy', '0') < 10000000) {
                                Memory.stopPowerProcess = 1;
                            } else {
                                Memory.stopPowerProcess = undefined;
                            }
                        }
                        //Memory.stopPowerProcess = undefined;//1;//undefined;
                    }
                    
                    if ( (creep.room.controller.level == 7 && creep.room.controller.progress > 1000000 && creep.room.storage.store.getFreeCapacity() > 600000) ||
                        (creep.room.controller.level >= 6 && creep.room.storage.store[RESOURCE_ENERGY] < 300000)
                    ){
                        let inSkipPosition = false;
                        // for (let i=1;i<6;i++){
                        //     if (creep.pos.isEqualTo(roomConfig.moveMatrix[i][0], roomConfig.moveMatrix[i][1])) {
                        //         inSkipPosition = true;
                        //     }
                        // }
                        
                        //Memory.rooms.E43N38.stopGclUprade = 1;
                        
                        if ((!inSkipPosition && !creep.room.memory.stopGclUprade) || creep.memory.boosted || creep.room.controller.ticksToDowngrade < 100000){
                            creep.upgradeController(creep.room.controller);    
                        } else {
                            //creep.say('skip');
                        }
                    } else {
                        if (creep.room.controller.level < 7 || !creep.room.memory.stopGclUprade || creep.room.controller.ticksToDowngrade < 145000 || creep.memory.boosted) {
                            creep.upgradeController(creep.room.controller);
                        } 
                    }
                }
            }
            if (creep.store[RESOURCE_ENERGY] < creep.getActiveBodyparts(WORK) * 2){
                creep.withdraw(container, RESOURCE_ENERGY);
            }
            if (creep.pos.isEqualTo(roomConfig.renewPos[0],roomConfig.renewPos[1])) {
                if (this.boostGclUpgrader == undefined || !(Game.time%100)) {
                    this.boostGclUpgrader = _.get(Memory, 'stock.XGH2O',0) > ((new Date()) >= (new Date('2023-12-01')) ? 800000 : 8000000); //1100000;
                    //console.log('boostGclUpgrader is ', this.boostGclUpgrader?'On':'Off');
                    if (creep.room.memory.stopGclUprade) {
                        this.boostGclUpgrader = false;
                    }
                }

                if (creep.memory.boosted && creep.ticksToLive > 155 /*151*/){
                
                } else if (creep.ticksToLive <= 1500-11) {
                    const spawn = Game.spawns[roomConfig.spawn];
                    if (spawn && !spawn.spawning && !spawn.memory.renew) {
                        spawn.renewCreep(creep);
                        creep.memory.boosted = undefined;
                    }
                } else {
                    const lab = Game.getObjectById(roomConfig.lab);
                    
                    if ((this.boostGclUpgrader || creep.room.memory.reClaimRoom) && lab 
                    && lab.store[RESOURCE_CATALYZED_GHODIUM_ACID] >= creep.getActiveBodyparts(WORK)* LAB_BOOST_MINERAL 
                    && lab.store[RESOURCE_ENERGY] >= creep.getActiveBodyparts(WORK)* LAB_BOOST_ENERGY) {
                        const res = lab.boostCreep(creep);
                        if (res == OK) {
                            creep.memory.boosted = 1;
                        }
                    }
                }
            }
        }
    },
    gclCrane: function(creep) {
        // if (!(Game.time%50)) {
             //roleGclBooster.rotateCreeps(creep.room.name);
        // } 
        
        if (!(Game.time%30)) {
            creep.room.memory.stopGclUprade = ((new Date()) >= (new Date('2023-12-01')))?0:1;
        }

        
        const roomConfig = roleGclBooster.roomConfig[creep.memory.room];
        if (!roomConfig) return;
        const cranePos = new RoomPosition(roomConfig.cranePos[0], roomConfig.cranePos[1], creep.memory.room);
        if (!creep.pos.isEqualTo(cranePos)){
            helpers.smartMove(creep, cranePos, 1, 0);
            const obstacles = cranePos.lookFor(LOOK_CREEPS);
            if (obstacles.length){
                obstacles[0].move(obstacles[0].pos.getDirectionTo(creep.pos));
                obstacles[0].say('sory');
            }
        }
        
        let container = Game.getObjectById(roomConfig.container);
        if (!container && roomConfig.containerPos) {
            console.log('no container in gcl room');
            let cPos = new RoomPosition(roomConfig.containerPos[0], roomConfig.containerPos[1], creep.room.name);
            let newContainer = cPos.lookFor(LOOK_STRUCTURES).find(s=>s.structureType == STRUCTURE_CONTAINER);
            if (newContainer) {
                container = newContainer;
                roomConfig.container = newContainer.id;
                console.log('found new container in gcl room');
            } else {
                cPos.createConstructionSite(STRUCTURE_CONTAINER);
            }
        }
        if (container && !creep.room.memory.labContainerPos) {
            creep.room.memory.labContainerPos = {x:container.pos.x, y:container.pos.y, roomName:container.pos.roomName}; 
        }
        
        const spawn = Game.spawns[roomConfig.spawn];
        const storage = creep.room.storage;
        const terminal = creep.room.controller.level >=6 ? creep.room.terminal : null;
        if (!container || !spawn || !storage) return;
        
        if (!(Game.time%10) && terminal && ((storage.store[RESOURCE_ENERGY] < 4900000 && storage.store.getFreeCapacity()>70000) || terminal.store[RESOURCE_ENERGY] < 120000)) {
            marketHelper.buyOrder(creep.room, RESOURCE_ENERGY, 100000);
        }
        
        let needWithdraw = false;
        if (creep.store.getUsedCapacity()) {
            if (creep.store[RESOURCE_ENERGY] != creep.store.getUsedCapacity()) {
                for (let res in creep.store){
                    creep.transfer(storage, res);
                }
            } else if (spawn.store[RESOURCE_ENERGY] < 80) {
                creep.transfer(spawn, RESOURCE_ENERGY);
            } else if (container.store[RESOURCE_ENERGY] < 1000 || container.store.getFreeCapacity() >= creep.store[RESOURCE_ENERGY] ){
                creep.transfer(container, RESOURCE_ENERGY);
            } else if (storage.store.getFreeCapacity() > 50000 && terminal && terminal.store[RESOURCE_ENERGY]>10000) {
                creep.transfer(storage, RESOURCE_ENERGY);
            } else if (creep.store.getFreeCapacity()) {
                needWithdraw = true;
            }
        }
        
        if (!creep.store.getUsedCapacity() || needWithdraw) {
            let getFrom = storage;
            if (terminal && terminal.store[RESOURCE_ENERGY]>10000) {
                getFrom = terminal;
            }
            creep.withdraw(getFrom, RESOURCE_ENERGY);
        }
        
        if (creep.memory.renew || creep.ticksToLive<1380 && !spawn.spawning) {
            spawn.renewCreep(creep);
            creep.memory.renew = 1;
            spawn.memory.renew = 1;
        }
        
        if (creep.ticksToLive > 1480) {
            creep.memory.renew = undefined;
            spawn.memory.renew = undefined;
        }
        
        const renewPos = new RoomPosition(roomConfig.renewPos[0], roomConfig.renewPos[1], creep.memory.room);
        const renewDropped = renewPos.lookFor(LOOK_RESOURCES);
        if (renewDropped.length){
            creep.pickup(renewDropped[0]);
        }
        const renewCreeps = renewPos.lookFor(LOOK_CREEPS).filter(c=>c.memory.role == 'gclUpgrader');
        if (creep.memory.pauseRotate) {
            creep.memory.pauseRotate --;
            creep.say(creep.memory.pauseRotate);
        }
        if (!creep.memory.pauseRotate 
            && (!renewCreeps.length || renewCreeps[0].ticksToLive > 1500-11 || (renewCreeps[0].memory.boosted && renewCreeps[0].ticksToLive > 1000))) {
            const fatigue = roleGclBooster.rotateCreeps(creep.room.name);
            creep.memory.pauseRotate = fatigue?(fatigue+1):150;
        }
        
        if (renewCreeps.length && renewCreeps[0].ticksToLive<100) {
            const spawn = Game.spawns[roomConfig.spawn];
            if (spawn && spawn.spawning && spawn.spawning.remainingTime > renewCreeps[0].ticksToLive - 20) {
                spawn.spawning.cancel();
                spawn.memory.busyTime = Game.time + 137; 
            }
        }
        
        const predRenewPos = new RoomPosition(roomConfig.predRenewPos[0], roomConfig.predRenewPos[1], creep.memory.room);
        const predRenewCreeps = predRenewPos.lookFor(LOOK_CREEPS);
        if (predRenewCreeps.length && predRenewCreeps[0].ticksToLive <5) {
            roleGclBooster.rotateCreeps(creep.room.name);
            creep.memory.pauseRotate = 135;
        }

        
        if (!roomConfig.stopReClaim && !creep.room.memory.reClaimRoom &&  creep.room.controller && creep.room.controller.my && spawn && !spawn.spawning
        && ((creep.room.controller.level == 7 && creep.room.controller.progressTotal-creep.room.controller.progress < 1300000) || creep.room.controller.level == 8)) {
            creep.room.memory.reClaimRoom = Game.time+150*8-80;
        }
        
        
        if (creep.room.memory.reClaimRoom) {
            const gclClaimer = Game.creeps['gclClaimer_'+creep.room.name];
            
            if (Game.time > creep.room.memory.reClaimRoom && !gclClaimer && creep.memory.pauseRotate && creep.memory.pauseRotate < 115 && creep.memory.pauseRotate > 85 ){
                spawn.spawnCreep(this.getGclClaimerBody, 'gclClaimer_'+creep.room.name, {memory: {role: 'gclClaimer', room: creep.room.name, }});
            }
            if (gclClaimer && !gclClaimer.spawning && gclClaimer.pos.isNearTo(creep.room.controller)) {
                creep.say('unclaim');
                const res = creep.room.controller.unclaim();
                if (res == OK) {
                     creep.room.memory.reClaimRoom = undefined;
                }
            }
            
            if (!(Game.time%2) && creep.room.memory.reClaimRoom){
                creep.say((creep.room.memory.reClaimRoom - Game.time)+'c');
            }
        }
        
        
    },
    run: function(creep) {
       
    }
};

module.exports = roleGclBooster; 