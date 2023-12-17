/*
LAST !!!123456789
!todo5
1. stable creep boost 
*/ 
var MemHack = require('MemHack');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleAtacker = require('role.atacker');
// var roleAssault = require('role.assault');
var roleClaim = require('role.claim');
var roleSuperHarvester = require('role.superharvester');
var roleSuplier = require('role.suplier');
var roleMiner = require('role.miner');
var roleTransporter = require('role.transporter');
var roleSuperTransporter = require('role.supertransporter');
var roleWallBuilder = require('role.wallbuilder');
var roleOperator = require('role.operator');
var roleDeposit = require('role.deposit');
var roleSkMineral = require('role.skMineral');
var roleCollector = require('role.collector');
var roleHWDefenders =  require('role.hwDefenders');
var roleQuad =  require('role.quad');
var roleRoomDefender =  require('role.roomDefender');
var roleDeliver = require('role.deliver');
var roleInter = require('role.inter'); 
var roleGclBooster = require('role.gclBooster'); 
var roleMassRanger = require('role.massRanger'); 
var rolePair = require('role.pair'); 
var roleHunter = require('role.hunter'); 
var roleSettler = require('role.settler');
// var rolePuller = require('role.puller'); 
// var roleScoreCollector = require('role.scoreCollector');
// var roleScoreDeliver = require('role.scoreDeliver');

var helpers = require('helpers');
var marketHelper = require('market');
var terminalHelper = require('terminal');
var labHelper = require('lab');
var factoryHelper = require('factory');
var spawnHelper = require('spawn');
var roadController = require('roadController');
var observerHelper = require('observer');

var Traveler = require('Traveler');
var packrat = require('packrat');
var profiler = require('profiler');
var consoleUtils = require('consoleUtils');
 

let VERBOSE_CPU = false;
let VERBOSE_SHARDS = ['shard0','shard1','shard2','shard3',];
const CPU_ASSIGNED = {
    'shard0': 53,//60,
    'shard1': 5,//3,
    'shard2': 222,//217,
    'shard3': 20,
};
const DELTA_BUCKET_POWERSAVE = {
    'shard0': 15,
    'shard1': 0,
    'shard2': 20,
    'shard3': 1, 
}
 

if (VERBOSE_CPU && VERBOSE_SHARDS.indexOf(Game.shard.name)<0) {
     VERBOSE_CPU = false;    
}

global.VERBOSE_CPU = VERBOSE_CPU;

//Game.rooms['E81N58'].terminal.send(RESOURCE_ZYNTHIUM, 50000, 'E83N58');
//Game.market.createOrder(ORDER_BUY, CPU_UNLOCK, 81000000, 5);
//Game.market.createOrder(ORDER_BUY, PIXEL, 9500, 10000);
//Game.market.createOrder(ORDER_SELL, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, 0.9, 120000, "E79N54");
//Game.market.createOrder(ORDER_BUY, RESOURCE_ENERGY, 1.01, 100000, 'E52N29')

global.commitTick = 1;

module.exports.loop = function () {
    // if (Game.shard.name == 'shard3') {
    //     console.log(Game.shard.name);
    //     return;
    // }
    
    //return; 
    MemHack.pretick();
    
    
    
    
    const startCpu = Game.cpu.getUsed();
    profiler.init();
    profiler.start('AllTime');
    profiler.start('prepareTime');
    if (1 && Game.shard.name == 'shard3') {
        if (Game.cpu.bucket < 50 && !Memory.stopAllProcess) {
            Memory.stopAllProcess = 1;
            Game.notify(Game.shard.name+' CPU collapse');
        }
        if (Memory.stopAllProcess && Game.cpu.bucket < 1500) {
            console.log ('skipp', Game.shard.name, Game.cpu.bucket);
            return;
        }
        if (Memory.stopAllProcess) {
            Memory.stopAllProcess = undefined;
        }
        
    }
    
    
    
    if (0 && global.testGlobal && VERBOSE_SHARDS.indexOf(Game.shard.name)>=0) {
        let paths = global.paths?Object.keys(global.paths).length:0
        let pathsM = Memory.paths?Object.keys(Memory.paths).length:0
        console.log(startCpu.toFixed(2), 'global no reset',global.testGlobal++, paths, pathsM);
    }

    
    // if(!(Game.time%2000) && Game.shard.name == 'shard0' && Game.cpu.unlockedTime && ((Game.cpu.unlockedTime - Date.now()) < 1000*60*60*24)) {
    //     Game.cpu.unlock();
    //     //Game.notify('CPU unlocked!!!');
    // }
    
    //console.log(`<script>angular.element(document.querySelector('.room')).scope().Room.decorations = []</script>`);
    
    // if (Game.cpu.bucket>9999 && Game.cpu.generatePixel && Game.shard.name == 'shard3' && !observerHelper.observeEnable()) {
    //     Game.cpu.generatePixel();
    // }
    // if (Game.cpu.bucket>9999 && Game.cpu.generatePixel && Game.shard.name == 'shard2' && Memory.profiler && Memory.profiler.stats && Memory.profiler.stats.AllTime && Memory.profiler.stats.AllTime < CPU_ASSIGNED[Game.shard.name] - 20 && !observerHelper.observeEnable()) {
    //     Game.cpu.generatePixel();
    // }
    if (Game.cpu.bucket>9999 && Game.cpu.generatePixel && Game.shard.name == 'shard0' && Memory.profiler && Memory.profiler.stats && Memory.profiler.stats.AllTime && Memory.profiler.stats.AllTime < CPU_ASSIGNED[Game.shard.name] - 20 && !observerHelper.observeEnable()) {
        //Game.cpu.generatePixel();
    }
    if (Game.cpu.bucket>9999 && Game.cpu.generatePixel && Game.shard.name == 'shard1' && Memory.profiler && Memory.profiler.stats && Memory.profiler.stats.AllTime && Memory.profiler.stats.AllTime < CPU_ASSIGNED[Game.shard.name] - 20 && !observerHelper.observeEnable()) {
        Game.cpu.generatePixel(); 
    }
    
    profiler.start('dataRecycler');
    helpers.dataRecycler();
    profiler.end('dataRecycler');
    
    //roleHWDefenders.init(); //move to bottom
    profiler.start('quadRunGroups');
    roleQuad.init();
    roleQuad.runGroups();
    profiler.end('quadRunGroups');
    
    profiler.start('pairRunGroups');
    rolePair.runGroups();
    profiler.end('pairRunGroups');
    
    profiler.start('roleInter');
    roleInter.action();
    profiler.end('roleInter');
    
    profiler.start('terminalHelper');
    terminalHelper.tickReset();
    profiler.end('terminalHelper');
    
    profiler.start('marketHelper');
    marketHelper.tickReset();
    profiler.end('marketHelper');
    
    profiler.start('roadController');
    roadController.action();
    profiler.end('roadController');
    
    profiler.start('observer');
    observerHelper.tickReset();
    profiler.end('observer');
    
    profiler.start('skMineralTick');
    roleSkMineral.tickReset();
    profiler.end('skMineralTick');
    
    profiler.start('roleDepositTickReset');
    roleDeposit.tickReset();
    profiler.end('roleDepositTickReset');

    labHelper.tickReset();
    
    profiler.start('roleSt4level');
    require('role.st4level').tickReset();
    profiler.start('roleSt4level');

    if (['shard0','shard1','shard2','shard3',].indexOf(Game.shard.name) >= 0) {
        var [myRooms, skRooms, labConfig, factoryConfig, sectorAttackers, sectorCreeps, depositHarvesting, powerHarvesting, teamAssaults,
            teamMassRangers, strongholdCheck, manageResources,] = require(Game.shard.name+'.cfg').getCfg();
    } else {
        console.log('unknown shard', Game.shard.name);
        return;
    } 
    
    profiler.start('strongholdCheck');
    if (strongholdCheck) {
        helpers.strongholdStateProcess(strongholdCheck, myRooms, sectorAttackers, sectorCreeps, skRooms);
    }
    profiler.end('strongholdCheck');
    
    profiler.start('helpRoomNeedEnergy');
    if (!(Game.time%10)) {
        terminalHelper.helpGclRoom(myRooms);
        terminalHelper.helpRoom(Memory.helpRoomTerminal, myRooms);   
        terminalHelper.helpRoomNeedEnergy(myRooms);   
    }
    profiler.end('helpRoomNeedEnergy');
    
    profiler.start('mapVisual'); //console commands mapVisual(1000)
    if (1 && Memory.mapVisual) {
        if (Game.time < Memory.mapVisual && Memory.rooms && Game.cpu.bucket > 2000 ) {
            for (let roomName of Object.keys(Memory.rooms)) {
                if (Memory.rooms[roomName] && Memory.rooms[roomName].avoid) {
                    let pos = new RoomPosition(25, 25, roomName);
                    Game.map.visual.text('avoid', pos, {color: '#FFFFFF', fontSize: 12});             
                }
                if (Memory.rooms[roomName] && Memory.rooms[roomName].enemyRoom) {
                    let pos = new RoomPosition(25, 15, roomName);
                    Game.map.visual.text('enemy', pos, {color: '#FF0000', fontSize: 12});             
                }
                if (0 && Memory.rooms[roomName] && Memory.rooms[roomName].skMineralChecked) {
                    let pos = new RoomPosition(25, 35, roomName);
                    Game.map.visual.text('skM'+Memory.rooms[roomName].skMineralChecked, pos, {color: '#FFFFFF', fontSize: 12});             
                }
            }
            if (Memory.signerBlackList) {
                for (let roomName of Memory.signerBlackList) {
                    let pos = new RoomPosition(25, 36, roomName);
                    Game.map.visual.text('incomplite', pos, {color: '#FF0000', fontSize: 10});             
                }
            }
            if (Memory.signers ) {
                for (let roomName in Memory.signers) {
                    let pos = new RoomPosition(25, 35, roomName);
                    Game.map.visual.text('signer', pos, {color: '#00FF00', fontSize: 12});             
                }
            }
            require('role.roadRepairer').mapVisual();
            require('role.roomBlocker').mapVisual();
        } else {
            delete Memory.mapVisual    
        }
    } else {
        if (myRooms && myRooms.length) {
            Game.map.visual.text('Type mv() in console', new RoomPosition(25, 25, myRooms[0].roomName));
        }
    }
    profiler.end('mapVisual');

    
    if (0 && Game.shard.name == 'shard2') {  
        let targetRoom = 'E41N11';
        let targetPos = new RoomPosition(29,22,targetRoom); //Memory.nukeLaunch = 5; // type in console
        // let targetRoom = 'E57N34';
        // let targetPos = new RoomPosition(29,36,targetRoom); //Memory.nukeLaunch = 5; // type in console
        for(const myRoom of myRooms) {
            const room = Game.rooms[myRoom.roomName];
            if (room) {
                let nukers = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_NUKER}});
                if (nukers.length) {
                    let nuker = nukers[0];
                    let range = Game.map.getRoomLinearDistance(room.name, targetRoom);
                    let ready = !nuker.cooldown && range <= 10 && nuker.store[RESOURCE_ENERGY] == 300000 && nuker.store[RESOURCE_GHODIUM] == 5000;
                    if (range <= 10) {// && !nuker.cooldown) {
                        console.log(helpers.getRoomLink(room.name), 'NUKE distance', nuker.cooldown, range, nuker.store[RESOURCE_ENERGY], nuker.store[RESOURCE_GHODIUM], ready?'READY':'not ready');    
                    }
                    if (0 && Memory.nukeLaunch && range <= 10 && ready) { //!!
                        let res = nuker.launchNuke(targetPos);
                        if (res == OK) {
                            Memory.nukeLaunch--;    
                        }
                    }
                    
                }
            }
        }
        
    }

    if (myRooms && myRooms.length){
        if (1 && !(Game.time%30) ) {
            //check minerals in sourcekeepers rooms
            if (VERBOSE_CPU) console.log('check minerals in sourcekeepers rooms');
            Memory.skMineralHarvest = {};
            for(const skRoom of skRooms) {
                const room =  Game.rooms[skRoom.roomName];
                if (room){
                    Memory.skMineralHarvest[skRoom.sector] = 0;
                    let extractors = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_EXTRACTOR}});
                    if (extractors.length){
                        let minerals = room.find(FIND_MINERALS);
                        if (minerals.length && minerals[0].mineralAmount){
                            Memory.skMineralHarvest[skRoom.sector] = 1;
                        }
                    }
                }
            }
        }
        //change harvester for SK minerals
        for(const skRoom of skRooms) {
            if (Memory.skMineralHarvest && !Memory.skMineralHarvest[skRoom.sector]) {
                if (sectorCreeps[skRoom.sector] && sectorCreeps[skRoom.sector].creeps.superharvester != undefined){
                    sectorCreeps[skRoom.sector].creeps.superharvester = 0;
                }
                //console.log(skRoom.roomName, skRoom.sector, 'no minerals' );
            }
        }
        if (!(Game.time%250)) {
            helpers.reportResources(myRooms);
        }

    }

    const elapsed = Game.cpu.getUsed() - startCpu;
    if (VERBOSE_CPU) console.log('Prepare time', elapsed);
    
    profiler.end('prepareTime');
    let roomsCpu = {};
    profiler.start('allRooms');
    for(const myRoom of myRooms) {
        const startCpuRoom = Game.cpu.getUsed();
        const room = Game.rooms[myRoom.roomName];
        if (!room) {
            roleSettler.settleRoom(myRoom.roomName);
        } else {
            if (Memory.rooms[room.name].timeSavingEnable) {
                //continue;
                require('profiler').start('timeSavingRoom'+room.name);
                require('timeSavingRoom').manageRoom(room);
                require('profiler').end('timeSavingRoom'+room.name);
                
                if (manageResources[room.name]) {
                    require('profiler').start('manageResourceNew');
                    marketHelper.checkResourceToBuy(room, myRooms, manageResources);
                    marketHelper.buyResourceToBuy(room);
                    require('profiler').end('manageResourceNew');
                }
                if (Game.shard.name == 'shard1') {
                    profiler.start('sellEnergy');
                    marketHelper.sellEnergy(room, 100);
                    profiler.end('sellEnergy');
                }
                
                if (!Memory.production) {
                    roomsCpu[myRoom.roomName] = (roomsCpu[myRoom.roomName] || 0) + (Game.cpu.getUsed() - startCpuRoom);
                }
                continue;
            }


            if (!(Game.time%5000)){
                room.memory.importResourceList = {};
            }
            
            if (!(Game.time%50)){
                if (room.storage && !room.storage.store.getFreeCapacity() && room.storage.store.getCapacity()) {
                    Game.notify(Game.shard.name+' '+room.name+ ' storage Full!!');
                }
                if (room.storage && room.storage.store[RESOURCE_ENERGY] < 2000) {
                    Game.notify(Game.shard.name+' '+room.name+ ' storage no energy!!');
                }
                if (room.terminal && !room.terminal.store.getFreeCapacity() && room.terminal.store.getCapacity() && room.terminal.store[RESOURCE_ENERGY] < 70000) {
                    let res = require('consoleUtils').freeSpace(room.name);
                    Game.notify(Game.shard.name+' '+room.name+ ' terminal Full!! '+ res);
                }
                if (room.terminal && room.storage && room.terminal.store[RESOURCE_ENERGY] < 15000 && room.storage.store[RESOURCE_ENERGY] < 100000 && Memory.roomNeedEnergy) {
                    Memory.roomNeedEnergy[room.name] = 1;
                }
            }
            
            if (!(Game.time%50)){
                marketHelper.checkRoomEnergy(room);
            }
            
            if (!(Game.time%300)){
                helpers.checkNuke(room.name);
            }
            
            profiler.start('settlerRoomManage');
            roleSettler.roomManage(myRoom.roomName, myRoom, teamMassRangers);
            profiler.end('settlerRoomManage');

            if (powerHarvesting[myRoom.roomName] && depositHarvesting[myRoom.roomName]){
                if (!room.memory.observerSwitch || Game.time>room.memory.observerSwitch) {
                    if (!room.memory.observerMode || room.memory.observerMode == 'power') {
                        room.memory.observerMode = 'deposit';
                    } else {
                        room.memory.observerMode = 'power';
                    }
                    room.memory.observerSwitch = Game.time + 30;
                }
        
                if (!room.memory.observerMode || room.memory.observerMode == 'power') {
                    profiler.start('processPowerHarvest');
                    helpers.processPowerHarvest(myRoom.roomName, powerHarvesting[myRoom.roomName].sector, powerHarvesting[myRoom.roomName].powerRooms);    
                    profiler.end('processPowerHarvest');
                } else {
                    profiler.start('processDepositHarvest');
                    helpers.processDepositHarvest(myRoom.roomName, depositHarvesting[myRoom.roomName].depositRooms, depositHarvesting[myRoom.roomName].roomToHarvestDeposits);    
                    profiler.end('processDepositHarvest');
                }
            } else if (powerHarvesting[myRoom.roomName]){
                profiler.start('processPowerHarvest');
                helpers.processPowerHarvest(myRoom.roomName, powerHarvesting[myRoom.roomName].sector, powerHarvesting[myRoom.roomName].powerRooms);    
                profiler.end('processPowerHarvest');
            } else if (depositHarvesting[myRoom.roomName]){
                profiler.start('processDepositHarvest');
                helpers.processDepositHarvest(myRoom.roomName, depositHarvesting[myRoom.roomName].depositRooms, depositHarvesting[myRoom.roomName].roomToHarvestDeposits);    
                profiler.end('processDepositHarvest');
            }

            if (strongholdCheck && strongholdCheck[myRoom.roomName]) {
                profiler.start('strongholdCheck');
                helpers.processStrongholdCheck(myRoom.roomName, strongholdCheck[myRoom.roomName]);
                profiler.end('strongholdCheck');
            }
            

            

            const startCpuDefendRoom = Game.cpu.getUsed();
            roleRoomDefender.visual(room);
            profiler.start('defendRoom');
            roleRoomDefender.defendRoom(myRoom.roomName);
            profiler.end('defendRoom');
            const elapsedDefendRoom = Game.cpu.getUsed() - startCpuDefendRoom;
            if (VERBOSE_CPU) console.log('DefendRoomCpu '+ elapsedDefendRoom.toFixed(2));

            //check mineral available
            if (myRoom.creeps && myRoom.creeps.harvester && !room.memory.mineralHarvest){
                myRoom.creeps.harvester = 0; //console.log(room.name, 'no harvest mineral');
            }

            //check controller downgrade alarm
            if (myRoom.creeps && myRoom.creeps.harvester2 && room.controller.level == 8 && room.controller.ticksToDowngrade > 100000){
                myRoom.creeps.harvester2 = 0;
            }

            //check and buy needed resources
            // profiler.start('manageResource');
            // marketHelper.manageResource(room, myRooms, manageResources);
            // profiler.end('manageResource');
            
            if (manageResources[room.name]) {
                require('profiler').start('manageResourceNew');
                marketHelper.checkResourceToBuy(room, myRooms, manageResources);
                marketHelper.buyResourceToBuy(room);
                require('profiler').end('manageResourceNew');
            }

            
            profiler.start('processLabs');
            labHelper.processLabs(room, myRoom, labConfig);
            profiler.end('processLabs');

            //const tick1 = Game.shard.name == 'shard0' ? 2 : (Game.cpu.bucket > 3000 ? 2 : 10);
            //const tick1 = Game.cpu.bucket > 3000 ? 2 : 10;
            let tick1 = 2;
            if (Game.cpu.bucket<=3000) {
                tick1 = 10;
            } else if (Game.cpu.bucket<=6000) {
                tick1 = 8;
            } else if (Game.cpu.bucket<=9000) {
                tick1 = 4;
            } 
            if (Game.shard.name == 'shard1') {
                tick1 = 10;
            }
            
            profiler.start('processFactory');
            if (0 && Game.shard.name == 'shard2' && _.get(Memory, 'stock['+RESOURCE_UTRIUM+']', 0) < 40000) {
                //console.log('skip factory')
            } else {
                factoryHelper.processFactory(room, myRoom, factoryConfig, tick1);
            }
            profiler.end('processFactory');
            
            profiler.start('sellEnergy');
            marketHelper.sellEnergy(room, tick1);
            profiler.end('sellEnergy');
            
            profiler.start('sendEnergyToMinEnergyRoom');
            terminalHelper.sendEnergyToMinEnergyRoom(room, myRooms, tick1);
            profiler.end('sendEnergyToMinEnergyRoom');
            
            //helpers.spawnTracking(room);
            
            //sell resources
            profiler.start('sellResources');
            marketHelper.sellResources(room);
            profiler.end('sellResources');

            profiler.start('sendResources');
            terminalHelper.sendResources(room, myRooms, tick1);
            profiler.end('sendResources');
            
            profiler.start('observer');
            observerHelper.observeRoom(room);    
            profiler.end('observer');

            profiler.start('tsrMineral');
            require('tsrMineral').runProcess(room);
            profiler.end('tsrMineral');

            //write room log
            global.logText = myRoom.roomName+':'+(room.storage?room.storage.store[RESOURCE_ENERGY]:'0')+' ';

            //find free spawn
            const spawns = room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN && !structure.spawning && (!Memory.spawns || !Memory.spawns[structure.name] || (Memory.spawns[structure.name].busyTime && Game.time > Memory.spawns[structure.name].busyTime));}
            });
            let freeSpawn = spawns.length ? spawns[0] : null;
            if (freeSpawn && freeSpawn.id == '61a9f9f54b6a64060df640c9' && spawns.length > 1 && room.controller.level>=7) { //gclRoom
                freeSpawn = spawns[1];
            } else if (freeSpawn && freeSpawn.id == '61a9f9f54b6a64060df640c9' && spawns.length == 1 && room.controller.level>=7){ //gclRoom
                freeSpawn = null;
            }
            if (freeSpawn && Game.time == room.memory.spawnBusyTick) {
                freeSpawn = null;
            }

            global.logText += " "+((freeSpawn&&0)?freeSpawn.name:"")+"("+room.energyAvailable+"/"+room.energyCapacityAvailable+") ";

            const elapsedPrepareRoom = Game.cpu.getUsed() - startCpuRoom;
            if (VERBOSE_CPU) global.logText+='<br/>PrepareRoomCpu '+ elapsedPrepareRoom.toFixed(2);

            const startCpuCreepsSpawn = Game.cpu.getUsed();


            if (room.memory.defendRoomMode) {
                if (room.memory.defendRoomMode == 2) {
                    myRoom.creeps = {roomDef: 0, roomDefRanged: 0, suplier: 2, miner: 0, transporter: 1, superharvester: 0, upgrader: 0, wallbuilder: 2 , harvester: 0}    
                } else {
                    if (room.name == 'E36N9') {
                        myRoom.creeps = {roomDef: 0, roomDefRanged: 0, suplier: 2, miner: 0, transporter: 1, superharvester: 0, upgrader: 0, wallbuilder: 2 , harvester: 0}    
                    } else {
                        myRoom.creeps = {roomDef: 1, roomDefRanged: 3, suplier: 2, miner: 0, transporter: 1, superharvester: 0, upgrader: 0, wallbuilder: 2 , harvester: 0}        
                    }
                    
                }
                
                
                myRoom.sector = [];
                myRoom.keepers = [];
                myRoom.atack_sector = 0;
                if (room.memory.defendRoomMode == 1) {
                    if (!room.memory.boostLab) {
                        room.memory.boostLab = {boosts: [RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ACID], time:Game.time + 200000, defend: 1};
                    }
                }
            } else if (room.memory.boostLab && room.memory.boostLab.defend) {
                room.memory.boostLab.time = Game.time-1;
                room.memory.boostLab.defend = undefined;
            }
            
            
            if (room.memory.needGclClaimer) {
                myRoom.creeps.gclClaimer = 1;
            }
            
            let spawnTick = 1;
            if (Game.cpu.bucket<=2000) { spawnTick = 8;
            } else if (Game.cpu.bucket<=3000) { spawnTick = 6;
            } else if (Game.cpu.bucket<=4000) { spawnTick = 4;
            } else if (Game.cpu.bucket<=9800) { spawnTick = 2;} 
            
            
            
            profiler.start('spawn');
            if (freeSpawn && !(Game.time%spawnTick) && spawnHelper.spawnQueueEmpty(room)) {
                
                profiler.start('spawnRoomCreep');
                freeSpawn = spawnHelper.spawnRoomCreep(room, myRoom, freeSpawn);
                profiler.end('spawnRoomCreep');
                
                profiler.start('spawnHWDefenders');
                freeSpawn = roleHWDefenders.spawn(room, myRoom, freeSpawn, spawns);
                profiler.end('spawnHWDefenders');
                
                profiler.start('spawnQuad');
                freeSpawn = roleQuad.spawn(room, myRoom, freeSpawn);    
                profiler.end('spawnQuad');
                
                profiler.start('spawnMassRanger');
                freeSpawn = roleMassRanger.spawn(room, myRoom, freeSpawn, teamMassRangers);
                profiler.end('spawnMassRanger');
                
                profiler.start('spawnPair');
                freeSpawn = rolePair.spawnHelpers(room, myRoom, freeSpawn);
                profiler.end('spawnPair');
                
                // freeSpawn = rolePuller.spawnHelpers(room, myRoom, freeSpawn);
                
                profiler.start('spawnMassRangerHelpers');
                freeSpawn = roleMassRanger.spawnHelpers(room, myRoom, freeSpawn);
                profiler.end('spawnMassRangerHelpers');
                
                profiler.start('spawnKeepers');
                freeSpawn = spawnHelper.spawnKeepers(room, myRoom, freeSpawn, skRooms);
                profiler.end('spawnKeepers');
                
                profiler.start('spawnPowerHarvester');
                freeSpawn = spawnHelper.spawnPowerHarvester(room, myRoom, freeSpawn, powerHarvesting);
                profiler.end('spawnPowerHarvester');
                
                profiler.start('spawnAtackers');
                freeSpawn = spawnHelper.spawnAtackers(room, myRoom, freeSpawn, sectorAttackers);
                profiler.end('spawnAtackers');
                
                profiler.start('spawnDeposit');
                freeSpawn = roleDeposit.spawn(room, myRoom, freeSpawn);
                profiler.end('spawnDeposit');
                
                profiler.start('spawnSkMineral');
                freeSpawn = roleSkMineral.spawn(room, myRoom, freeSpawn);
                profiler.end('spawnSkMineral');
                
                profiler.start('spawnCollector');
                freeSpawn = roleCollector.spawn(room, myRoom, freeSpawn);
                profiler.end('spawnCollector'); 
                
                profiler.start('spawnClaim');
                freeSpawn = roleClaim.spawn(room, myRoom, freeSpawn);
                profiler.end('spawnClaim');
                
                // freeSpawn = roleScoreCollector.spawn(room, myRoom, freeSpawn);
                // freeSpawn = roleScoreDeliver.spawn(room, myRoom, freeSpawn);
                
                profiler.start('spawnSectorsCreep');
                freeSpawn = spawnHelper.spawnSectorsCreep(room, myRoom, freeSpawn, sectorCreeps);
                profiler.end('spawnSectorsCreep');
                room.memory.spawnBusyTick = !freeSpawn?Game.time:undefined;
            }
            
            profiler.start('spawnQuadHelpers');
            freeSpawn = roleQuad.spawnHelpers(room, myRoom, freeSpawn); //each tick!
            profiler.end('spawnQuadHelpers');
            profiler.end('spawn');
            
            //profiler.start('spawnFromQueue');
            //spawnHelper.spawnFromQueue(room);
            //profiler.end('spawnFromQueue');
            
            if (room.controller.level >= 8) {
                require('tsrDropper').dropperRun(room);    
            }
            
            if (!Memory.production) {
                profiler.start('spawn_visual');
                const allSpawns = room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN;}
                });
    
                let colorIndex = 0;
                let colorTable = ['#43eca6', '#dd0000', '#0000dd'];
                allSpawns.forEach(spawn => {
                    if(spawn.spawning && Memory.creeps[spawn.spawning.name]) {
                        let spawnCreepMemory = Memory.creeps[spawn.spawning.name];
                        let text = spawnCreepMemory.role;
                        if (text && spawnCreepMemory.type) {
                            text = text[0]+'_'+spawnCreepMemory.type;
                        }
                        spawn.room.visual.text('!!' + text,spawn.pos.x + 1, spawn.pos.y+0.4*colorIndex, {align: 'left', opacity: 0.8, color: colorTable[colorIndex++]});
                    }
    
                });
                if (room.controller.level < 8) {
                    const controllerLeft = room.controller.progressTotal-room.controller.progress;
                    room.visual.text(controllerLeft, room.controller.pos.x + 1, room.controller.pos.y, {align: 'left', opacity: 0.8});
                }
                profiler.end('spawn_visual');
            }


            if (VERBOSE_SHARDS.indexOf(Game.shard.name)>=0 && VERBOSE_CPU) {
                console.log(global.logText);     
            }
           
        }
        const elapsed = Game.cpu.getUsed() - startCpuRoom;
        
        if (VERBOSE_CPU) console.log(myRoom.roomName,'room time', elapsed.toFixed(2));
        
        if (!Memory.production) {
            roomsCpu[myRoom.roomName] = (roomsCpu[myRoom.roomName] || 0) + elapsed;    
        }
    }
    profiler.end('allRooms');
    
    
    
    profiler.start('roleHWDefendersInit');
    roleHWDefenders.init();
    profiler.end('roleHWDefendersInit');
    
    const elapsed2 = Game.cpu.getUsed() - startCpu;
    //console.log('All room time', elapsed2);
    const startCreepCpu = Game.cpu.getUsed();

    let enemyDetected = 0;
    let roomChecked = [];
    let bucket = false;
    
    let creepsCpuStat = {};
    profiler.start('runCreeps');
    let boostLabsUsed = [];
    for(let name in Game.creeps) {
        const startCpu = Game.cpu.getUsed();
        let creep = Game.creeps[name];
        if (!creep || creep.spawning) continue;
        
        if (['tsr'].includes(creep.memory.role)) continue;
        
        if (creep.memory.role == 'hwd' && (!creep.memory.boosts || !creep.memory.boosts.length) && creep.memory.copyBoosts && creep.memory.copyBoosts.length && !_.some(creep.body, part => part.boost)) {
            creep.memory.boosts = creep.memory.copyBoosts.slice();
            Game.notify('hwd wait boost in room '+creep.room.name);
        }

        if (!creep.spawning && creep.memory.boosts){
            if (creep.memory.boosts.length) {
                
                if (!creep.memory.copyBoosts) {
                    creep.memory.copyBoosts = creep.memory.boosts.slice();
                }
                
                
                //creep.say('boost');
    
                let mineral = creep.memory.boosts[0];
    
                let lab = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                  filter: function (object) {return object.structureType == STRUCTURE_LAB && object.mineralType == mineral && object.mineralAmount>=450;}
                });
                //console.log(creep.name, mineral, lab);
                if (creep.pos.isNearTo(lab) && boostLabsUsed.includes(lab.id)) {
                    lab = null;
                }
                if (lab) {
                    let res = lab.boostCreep(creep);
                    if (res == OK) {
                        boostLabsUsed.push(lab.id);
                    }
                    if (res == ERR_NOT_IN_RANGE) {
                        if (lab.store[RESOURCE_ENERGY]>600) {
                            if (creep.pos.getRangeTo(lab)> 2) {
                                helpers.smartMove(creep, lab);
                                creep.say('sm');
                            } else {
                                creep.moveTo(lab, {reusePath: 0, range: 1, maxOps: 9000, visualizePathStyle: {stroke: '#ffaa00'}});        
                                creep.say('mv');
                            }
                        } else {
                            creep.say('w energy');
                            if (Game.flags['Flag'+creep.memory.room+'wait']) {
                                creep.moveTo(Game.flags['Flag'+creep.memory.room+'wait'], {range:2});
                            }
                        }
                        
                    } else {
                        if (res == OK || ['hwd_','pair'].indexOf(creep.memory.role) < 0) {
                            creep.memory.boosts.shift();
                            if (!creep.memory.boosts.length){
                                creep.memory.boosts = undefined;
                            }
                        }
                    }
                    continue;
                } else {
                    if (1 && creep.memory.boosts && creep.memory.boosts.length){
                        if (['hwd_'].indexOf(creep.memory.role) < 0) {
                            creep.memory.boosts.shift();
                            if (!creep.memory.boosts.length){
                                creep.memory.boosts = undefined;
                                if (['quad','pair'].indexOf(creep.memory.role) >= 0 && creep.memory.copyBoosts && creep.memory.copyBoosts.length) {
                                    let allBoosted = true;
                                    creep.body.forEach(body=>{
                                        if (!body.boost) {
                                            allBoosted = false;
                                        }
                                    });
                                    if (!allBoosted) {
                                        creep.memory.boosts = creep.memory.copyBoosts.slice();
                                    }
                                }
                                
                            }
                        } else {
                            let flag = Game.flags['Flag'+creep.room.name+'wait'];
                            if (flag) {
                                creep.moveTo(flag);
                            }
                        }
                    }
                }                
            } else {
                creep.memory.boosts = undefined;
            }

        }
        
        if (Game.shard.name == 'shard2' && creep.room.name == 'E45N55' && Game.getObjectById('63829834f9aadf23eaa7d2a2')) {
            creep.moveTo(Game.getObjectById('63829834f9aadf23eaa7d2a2'));
            creep.memory._trav = undefined;
            Game.notify('detect portal move '+ creep.room.name+ ' tick '+Game.time);
            creep.heal(creep);
            continue;
        }
        if (Game.shard.name == 'shard2' && creep.room.name == 'W55N15' && Game.getObjectById('639d1244fe90bba0453bec31')) {
            creep.moveTo(Game.getObjectById('639d1244fe90bba0453bec31'));
            creep.memory._trav = undefined;
            Game.notify('detect portal move '+ creep.room.name+ ' tick '+Game.time);
            creep.heal(creep);
            continue;
        }
        if (Game.shard.name == 'shard2' && creep.room.name == 'E25S35' && Game.getObjectById('63b91637e2c79bd8dc23e646')) {
            creep.moveTo(Game.getObjectById('63b91637e2c79bd8dc23e646'));
            creep.memory._trav = undefined;
            Game.notify('detect portal move '+ creep.room.name+ ' tick '+Game.time);
            creep.heal(creep);
            continue;
        }
        if (Game.shard.name == 'shard2' && creep.room.name == 'W45S45' && Game.getObjectById('63e72ca2c835aba7c6c1b3f2')) {
            creep.moveTo(Game.getObjectById('63e72ca2c835aba7c6c1b3f2'));
            creep.memory._trav = undefined;
            Game.notify('detect portal move '+ creep.room.name+ ' tick '+Game.time);
            creep.heal(creep);
            continue;
        }
        if (Game.shard.name == 'shard2' && creep.room.name == 'E35N25' && Game.getObjectById('63e23b071a18a09896bb04cd')) {
            creep.moveTo(Game.getObjectById('63e23b071a18a09896bb04cd'));
            creep.memory._trav = undefined;
            Game.notify('detect portal move '+ creep.room.name+ ' tick '+Game.time);
            creep.heal(creep);
            continue;
        }
        if (Game.shard.name == 'shard2' && creep.room.name == 'E15N5' && Game.getObjectById('63f86c38ace087510261f828')) {
            creep.moveTo(Game.getObjectById('63f86c38ace087510261f828'));
            creep.memory._trav = undefined;
            Game.notify('detect portal move '+ creep.room.name+ ' tick '+Game.time);
            creep.heal(creep);
            continue;
        }
        if (Game.shard.name == 'shard2' && creep.room.name == 'W45N55' && Game.getObjectById('64e1a9a5b8ab6fdba371ef9e')) {
            creep.moveTo(Game.getObjectById('64e1a9a5b8ab6fdba371ef9e'));
            creep.memory._trav = undefined;
            Game.notify('detect portal move '+ creep.room.name+ ' tick '+Game.time);
            creep.heal(creep);
            continue;
        }
        if (Game.shard.name == 'shard2' && creep.room.name == 'W45N45' && Game.getObjectById('64f7a2ad9b32abc423d092f2')) {
            creep.moveTo(Game.getObjectById('64f7a2ad9b32abc423d092f2'));
            creep.memory._trav = undefined;
            Game.notify('detect portal move '+ creep.room.name+ ' tick '+Game.time);
            creep.heal(creep);
            continue;
        }
         if (Game.shard.name == 'shard2' && creep.room.name == 'E15S35' && Game.getObjectById('64f634ef41854d16782e48fc')) {
            creep.moveTo(Game.getObjectById('64f634ef41854d16782e48fc'));
            creep.memory._trav = undefined;
            Game.notify('detect portal move '+ creep.room.name+ ' tick '+Game.time);
            creep.heal(creep);
            continue;
        }

        if (1 && /*!creep.room.memory.noCheckAtack &&*/ creep.memory.role && !['atacker', 'hunter','hwd','massRanger','quad', 'collector','pair','settler','manual_claim','signer','manualBuilder','tsr','skMineral','deposit'].includes(creep.memory.role) && !(Game.time%5) && !_.contains(roomChecked, creep.room.name) 
            && !creep.name.startsWith('wall') && !creep.memory.claimRoom) 
        {
            profiler.start('creepCheckEnemy');
            enemyDetected = helpers.creepCheckEnemy(creep, sectorAttackers, myRooms);
            roomChecked.push(creep.room.name);
            //console.log(i++, creep.name, creep.room.name, 'check Enemy');
            if (enemyDetected) {
                Memory.enemyDetectedTime = Game.time;
            }
            profiler.end('creepCheckEnemy');
        }
        
        if (creep.memory.role) {
            let profilerRole = '_role'+creep.memory.role.charAt(0).toUpperCase() + creep.memory.role.slice(1);
            if (creep.memory.role == 'atacker' && creep.memory.type) {
                profilerRole = '_role'+creep.memory.role.charAt(0).toUpperCase() + creep.memory.role.slice(1)+'_'+creep.memory.type;
            }
            profiler.start(profilerRole);
            
            if (creep.memory.role == 'massRanger') {
                roleMassRanger.run(creep);
            }
            if (creep.memory.role == 'pair') {
                rolePair.run(creep);
            }
    
            if (creep.memory.role == 'hunter') {
                roleHunter.run(creep);
            }
    
            if(creep.memory.role == 'atacker' && creep.memory.type == 'assault' ) {
                //roleAssault.run(creep);
            } else if(creep.memory.role == 'atacker') {
                roleAtacker.run(creep, sectorAttackers);
            }
            
            if (creep.memory.role == 'roomDef' || creep.memory.role == 'roomDefRanged') {
                roleRoomDefender.run(creep);
            }
    
    
            if(creep.memory.role == 'hwd') {
                roleHWDefenders.run(creep);
            }
            
            if(creep.memory.role == 'suplier') {
                let labInfo = [];
                let factoryInfo = [];
                let roomInfo = _.findWhere(myRooms, {roomName: creep.memory.room});
                if (roomInfo && labConfig[roomInfo.lab]){
                    labInfo = labConfig[roomInfo.lab].labs;
                    if (roomInfo.factory){
                        factoryInfo = factoryConfig[roomInfo.factory].endProduct;    
                    }
                }
                roleSuplier.run(creep, labInfo, factoryInfo);
            }
            if(creep.memory.role == 'transporter') {
                let factoryInfo = [];
                if (creep.room.memory.factoryNearLinkPos) {
                    let roomInfo = _.findWhere(myRooms, {roomName: creep.memory.room});
                    if (roomInfo && roomInfo.factory){
                        factoryInfo = factoryConfig[roomInfo.factory].endProduct;    
                    }
                }
                roleTransporter.run(creep, factoryInfo);
            }
    
            
            if(creep.memory.role == 'helper') {
                roleSuplier.run(creep, []);
            }
            if(creep.memory.role == 'gclCrane') {
                roleGclBooster.gclCrane(creep);
            }
            if(creep.memory.role == 'gclUpgrader') {
                roleGclBooster.gclUpgrader(creep);
            }
            if(creep.memory.role == 'gclClaimer') {
                roleGclBooster.gclClaimer(creep);
            }
            
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'upgrader2') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'miner' ) {
                roleMiner.run(creep);
            }
            if(creep.memory.role == 'claim') {
                roleClaim.run(creep);
            }
            if(creep.memory.role == 'dropper') {
                roleTransporter.run(creep);
            }
            if(creep.memory.role == 'intershard') {
                roleInter.run(creep);
            }
            if(creep.memory.role == 'deposit') {
                roleDeposit.run(creep);
            }
            if(creep.memory.role == 'skMineral') {
                roleSkMineral.run(creep);
            }
            
            let bucketMove = 600;
            if (Game.shard.name == 'shard0') {
                bucketMove = 1500;
            }
            if (Game.shard.name == 'shard3') {
                bucketMove = 3000;
            }
            if (Game.shard.name == 'shard2') {
                bucketMove = 2000;
            }
    
            if (Game.cpu.bucket > bucketMove || !(Game.time%4) || helpers.positionInBorder(creep)){
                if(creep.memory.role == 'supertransporter') {
                    roleSuperTransporter.run(creep); 
                }
                if(creep.memory.role == 'harvester') {
                    roleHarvester.run(creep);
                }
                if(creep.memory.role == 'superharvester') {
                    roleSuperHarvester.run(creep);
                }
                if(creep.memory.role == 'settler') {
                    roleSettler.run(creep);
                }
                if(creep.memory.role == 'wallbuilder') {
                    roleWallBuilder.run(creep);
                }
                if(creep.memory.role == 'collector') {
                    roleCollector.run(creep);
                }
                if(creep.memory.role == 'deliver') {
                    roleDeliver.run(creep);
                }
                if (creep.memory.role == 'filler') {
                    require('role.filler').run(creep);
                }
                if (creep.memory.role == 'roadRepairer') {
                    require('role.'+creep.memory.role).run(creep);
                }
                if (creep.memory.role == 'man') {
                    require('manualScripts').runMan(creep);
                }
    
                
    
            } else if (!bucket && Game.shard.name != 'shard1') {
                console.log('bucket too low. Only attackers move');
                bucket = true;
            }
            profiler.end(profilerRole);
        }

        if (!creep.spawning && creep.memory.role == undefined && (creep.name.startsWith("int") || creep.name.startsWith("mr") || creep.name.startsWith("pr")) && !creep.memory.restoreAttempt){
            profiler.start('restoreMemory');
            creep.memory.restoreAttempt = !roleInter.restoreMemory(creep);
            profiler.end('restoreMemory');
        } else if(!creep.spawning && creep.memory.role == undefined) {
            profiler.start('_roleDie');
            helpers.recycleCreep(creep);
            profiler.end('_roleDie');
            
            if (Game.shard.name == 'shard1' && creep.name.startsWith('mr') && creep.room.name == 'E50S10') {
                creep.memory = {"role":"massRanger","type":"helper","room":"E44S8","group":"E50S10","flagRange":2,};
            }
        }
        if (creep.memory.role == 'die') {
            profiler.start('_roleDie');
            helpers.recycleCreep(creep);    
            profiler.end('_roleDie');
        }
        
        let type = creep.memory.type?('_'+creep.memory.type):'';
        let role = creep.memory.role?creep.memory.role+type:'dead';
        
        if (!creepsCpuStat[role]) {
            creepsCpuStat[role] = {cpu: 0, count: 0, list: ''};
        }
        
        const creepElapsed = Game.cpu.getUsed() - startCpu;
        
        creepsCpuStat[role].cpu += creepElapsed
        creepsCpuStat[role].count++;
        creepsCpuStat[role].list += creepElapsed.toFixed(2)+'_';
        
        if (creepElapsed>8 && !Memory.production) {
            console.log('<span style="color:red">Creep TOO MANY CPU USED </span> '+name+' '+creep.memory.role+' '+helpers.getRoomLink(creep.room.name)+' has used '+creepElapsed+' CPU time');
        }
        if (creep.memory.room && !Memory.production) {
            roomsCpu[creep.memory.room] = (roomsCpu[creep.memory.room] || 0) + creepElapsed;
        }


    }
    profiler.end('runCreeps');
    
    let deltaBucket;
    if (!Memory.production) {
        profiler.start('bucketStats');
        deltaBucket = Memory.bucket?Game.cpu.bucket-Memory.bucket:0;
        if (deltaBucket < -9000) {
            deltaBucket += 10000;
        }
        if (!Memory.bucketHistory) {
            Memory.bucketHistory = [];
        }
        Memory.bucketHistory.push(deltaBucket);
        if (Memory.bucketHistory.length > 100) {
            Memory.bucketHistory.shift();
        }
        deltaBucket = deltaBucket>0?'+'+deltaBucket:deltaBucket;
        Memory.bucket = Game.cpu.bucket;
        
        
        creepsCpuStatInfo = {};
        for (role in creepsCpuStat) {
            let avgCpu = (creepsCpuStat[role].cpu/creepsCpuStat[role].count).toFixed(2);
            creepsCpuStatInfo[role] =  ''+avgCpu+'='+(creepsCpuStat[role].cpu).toFixed(2)+'/'+creepsCpuStat[role].count+' '+creepsCpuStat[role].list;
        }
        
        if (!Memory.creepsCpuStat || !(Game.time%10)) {
            Memory.creepsCpuStat = {};
        }
        Memory.creepsCpuStat[Game.time] = creepsCpuStatInfo;
        Memory.creepsCpuStat[Game.time].deltaBucket = deltaBucket;
    
    
    
        Memory.cpuByRoomArray = undefined;
        
        if (!Memory.roomsCpuArray) {
            Memory.roomsCpuArray = {};
        }
        Memory.roomsCpu = {};
        for (let roomName in roomsCpu) {
            if (!Memory.roomsCpuArray[roomName]) {
                Memory.roomsCpuArray[roomName] = [];
            }
            Memory.roomsCpuArray[roomName].push(roomsCpu[roomName].toFixed(3));
            if (Memory.roomsCpuArray[roomName].length > 30) {
                Memory.roomsCpuArray[roomName].shift();
            }
            Memory.roomsCpu[roomName] = (_.reduce(Memory.roomsCpuArray[roomName], _.add)/Memory.roomsCpuArray[roomName].length).toFixed(2);
        }
        
        profiler.end('bucketStats');
    }

    
    
    

    const elapsed3 = Game.cpu.getUsed() - startCpu;
    const elapsedCreep = Game.cpu.getUsed() - startCreepCpu;

    
    profiler.start('endAttack');
    if (!enemyDetected && !(Game.time%5) && Memory.enemyDetectedTime && Game.time > Memory.enemyDetectedTime + 35) {
        let flagSet = true;
        sectorAttackers.forEach(sector => {
            if (sector.place) {
                let res = null;
                let flag = Game.flags[sector.place.flag];
                if (!flag){
                    res = (new RoomPosition(sector.place.posx, sector.place.posy, sector.place.room)).createFlag(sector.place.flag); 
                } else {
                    res = flag.setPosition(new RoomPosition(sector.place.posx, sector.place.posy, sector.place.room));
                }
                if (res != OK){
                    flagSet = false;
                }    
            }
        });
        if (flagSet){
            Memory.enemyDetectedTime = undefined;
        }

        //Game.notify(`Attack ended`);
        console.log(`Attack ended`);
    }
    profiler.end('endAttack');
    
    profiler.start('operator');
    if (Game.shard.name == 'shard0') {
        for (let operatorName of ['OpF5', ]) {
            let operator = Game.powerCreeps[operatorName];
            if (operator && operator.shard){
                roleOperator.run(operator)
            } else {
                if (!(Game.time%10)) roleOperator.spawn(operatorName);
            }
        }
    }
    if (Game.shard.name == 'shard2') {
        for (let operatorName of ['S2opF1','S2_opF1','S2_opF2','S2_opF3','S2_opF4','S2_opF2_2','S2_opF1_2','S2_opF3_2','S2_opF4_2','S2_opF5','S2_opF3_3','S2_opF4_3','OpF2','OpF2_2','OpF1', 'OpF1_2',
        'OpF4','S2_opF1_3','S2_opF1_4','S2_opS1','OpF3','OpF2_3','S2_opF1_5','S2_opF5_3','S2_opF1_6','S2_opF1_7','S2_opF3_4','S2_opF4_4','S2_opF3_5','S2_opF2_3','S2_opF1_8','S2_opF2_4','S2_opF3_6','OpS2',]) { //
            let operator = Game.powerCreeps[operatorName];
            if (operator && operator.shard){
                roleOperator.run(operator)
            } else {
                if (!(Game.time%10)) roleOperator.spawn(operatorName);
            }
        }
    }
    if (Game.shard.name == 'shard3') {
        for (let operatorName of ['S3_opF1_1']) {
            let operator = Game.powerCreeps[operatorName];
            if (operator && operator.shard){
                roleOperator.run(operator)
            } else {
                if (!(Game.time%10)) roleOperator.spawn(operatorName);
            }
        }
    }
    
    if (Game.shard.name == 'shard1') {
        for (let operatorName of ['S1_OpS1']) {
            let operator = Game.powerCreeps[operatorName];
            if (operator && operator.shard){
                roleOperator.run(operator)
            } else {
                if (!(Game.time%10)) roleOperator.spawn(operatorName);
            }
        }
    }
    
    
    
    
    profiler.end('operator');
    
    profiler.start('manualScripts');
    require('manualScripts').run();
    profiler.end('manualScripts');
    profiler.start('attackController');
    require('role.attackController').process();
    profiler.end('attackController');
    profiler.start('roomBlocker');
    require('role.roomBlocker').process(); 
    profiler.end('roomBlocker');
    profiler.start('smcReset');
    require('role.smcReset').process(); 
    profiler.end('smcReset');
    
    
    spawnHelper.freeMemory();
    
    
    if (0) {
        Memory.creepsCpuStat = undefined;
        Memory.pathCashingStat = undefined;
        Memory.roomsCpu = undefined;
        Memory.roomsCpuArray = undefined;
        Memory.profiler = undefined;
    }


    const colorTable = {
        'shard0' : '#a3abe9',
        'shard1' : '#c5bb16',
        'shard2' : '#51ce9a',
        'shard3' : '#cb58d2',
    }
    const shardColor = colorTable[Game.shard.name]?colorTable[Game.shard.name]:'#ccc';
    
    if (!Memory.production) {
        profiler.start('bucketStats');
        const elapsed4 = Game.cpu.getUsed() - startCpu;
        if (VERBOSE_SHARDS.indexOf(Game.shard.name)>=0) {
            let color = 'white';
            const assigned = CPU_ASSIGNED[Game.shard.name];
            if (elapsed4 < assigned-assigned*0.1){
                color = '#4e884e';
            } else if (elapsed4 > assigned){
                color = '#e8495f';
            }
            
            let dCpu = elapsed4-assigned;
            let pathfinding = _.get(Memory, 'pathCashingStat.'+Game.time+'.nocache', 0);//+_.get(Memory, 'pathCashingStat.'+Game.time+'.cache', 0);
            Memory.deltaBucket = Math.round(_.reduce(Memory.bucketHistory, _.add)/Memory.bucketHistory.length);
            let deltaBucketPowerSave = DELTA_BUCKET_POWERSAVE[Game.shard.name]?DELTA_BUCKET_POWERSAVE[Game.shard.name]:0;
            if (Memory.deltaBucket < deltaBucketPowerSave) {
                Memory.deltaBucketPowerSave = 1;
            } else {
                Memory.deltaBucketPowerSave = 0;
            }
    
            let profilerCpu =  Memory.profiler && Memory.profiler.stats && Memory.profiler.stats.AllTime && CPU_ASSIGNED[Game.shard.name]? Math.round(CPU_ASSIGNED[Game.shard.name] - Memory.profiler.stats.AllTime) : '??';
            if (1 && typeof Game.cpu.getHeapStatistics === 'function') {
        		const heapStats = Game.cpu.getHeapStatistics();
        		const heapPercent = Math.round(100 * (heapStats.total_heap_size + heapStats.externally_allocated_size) / heapStats.heap_size_limit);
        		const heapSize = Math.round((heapStats.total_heap_size) / 1048576);
        		const externalHeapSize = Math.round((heapStats.externally_allocated_size) / 1048576);
        		const heapLimit = Math.round(heapStats.heap_size_limit / 1048576);
        		if (heapPercent > 90) {
        		    console.log(`Heap usage: ${heapSize} MB + ${externalHeapSize} MB of ${heapLimit} MB (${heapPercent}%).`);    
        		}
        	} 
            
            console.log('<span style="color:'+shardColor+'">', Game.shard.name, Game.time,'Start',startCpu.toFixed(2), 'Prepare', elapsed.toFixed(2), 'All room', elapsed2.toFixed(2), 'All creep', elapsedCreep.toFixed(2), 'Path', pathfinding.toFixed(1), 'All time end <span style="color:'+color+'">'+ elapsed4.toFixed(2)+'</span>', dCpu.toFixed(1), ' AllCreeps: '+spawnHelper.getGameCreepsLength()+ ' (CPU '+Game.cpu.tickLimit+' '+Game.cpu.bucket+') '+Game.shard.name+' '+deltaBucket + ' ('+Memory.deltaBucket+') '+(Memory.bucketHistory.length<100?Memory.bucketHistory.length:'') + '['+profilerCpu+']', '</span>', "<br>\n");
        }
        profiler.end('bucketStats');
    } else {
        let ticks = 10;
        //if (Game.shard.name == 'shard2') ticks = 1;
        
        if (!(Game.time%ticks) || global.commitTick) {
            if (global.commitTick) delete global.commitTick;
            let profilerCpu =  Memory.profiler && Memory.profiler.stats && Memory.profiler.stats.AllTime && CPU_ASSIGNED[Game.shard.name]? Math.round(CPU_ASSIGNED[Game.shard.name] - Memory.profiler.stats.AllTime) : '??';
            let stock = '';
            if (Memory.stock) {
                stock += ' Stock: '
                const lowRes = {
                    'shard0': 10000,
                    'shard1': 3000,
                    'shard2': 30000,
                    'shard3': 10000,
                };
                const amountLowRes = lowRes[Game.shard.name]?lowRes[Game.shard.name]:10000;
                const colorMark = (res) => (Memory.stock[res]?Memory.stock[res]:0)<amountLowRes?'red':'#ccc';
                const color = {'Z':'#f7d492','K':'#9976f7','U':'#75d5f5','L':'#6cf0a9','X':'#f3817f','O':'#c3c3c3','H':'#c3c3c3',};
                ['Z','K','U','L','O','H','X'].forEach(res => {
                    stock += '<span style="color:'+color[res]+'">'+res+'</span>:<span style="color:'+colorMark(res)+'">'+(''+Math.round((Memory.stock[res]?Memory.stock[res]:0)/1000)).padStart(4)+'k</span> ';
                });
            }
            const heapStats = Game.cpu.getHeapStatistics();
            const heapPercent = Math.round(100 * (heapStats.total_heap_size + heapStats.externally_allocated_size) / heapStats.heap_size_limit);

            console.log('<span style="color:'+shardColor+'">', Game.shard.name, Game.time, stock,'Heap:'+(''+heapPercent).padStart(2)+'%',Game.shard.name+' Bucket:',(''+Game.cpu.bucket).padStart(4), '['+(''+profilerCpu).padStart(3)+']');
        }
    }

   
//    global.matrix = {};
    
    profiler.end('AllTime');
    profiler.finalize();
    

};
