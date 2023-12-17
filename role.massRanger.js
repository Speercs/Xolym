var helpers = require('helpers');
var roleInter = require('role.inter'); 
var roleMassRanger = {
    getMassRangerBody: function(roomName) {
        if (roomName == 'helper' || roomName == 'helperBusted') {
            // if (Game.shard.name == 'shard3') {
            //     return [RANGED_ATTACK, HEAL, MOVE, MOVE];
            // }
            //return [RANGED_ATTACK, HEAL, MOVE, MOVE];
            return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,];
            // return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            //     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            //     HEAL,HEAL,HEAL,HEAL,HEAL];
        }
        
        
        // if (roomName == 'E58N22' || roomName == 'E59N24' || roomName == 'E58N27' || roomName == 'E58N27') {
        //     return [
        //         RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
        //         MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //         HEAL,HEAL,HEAL,HEAL,HEAL];
        //     //return [RANGED_ATTACK, HEAL, MOVE, MOVE];    
            
        //     //TOUGH*3,MOVE*10,RANGED_ATTACK*27,HEAL*10
        //     return [
        //         TOUGH,TOUGH,TOUGH,
        //         RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
        //         HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
        //         MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //         HEAL,
        //     ]
        // }
        // Memory.massRangers.E50N8.body =  [TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,];
        // Memory.massRangers.E50N8.boosts =  [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE];
        if (Game.shard.name == 'shard3') {
            //TOUGH*6,MOVE*10,RANGED_ATTACK*22,HEAL*12
            // return [
            //     TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            //     RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            //     HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
            //     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            //     HEAL
            // ];
            
        }
        if (Game.shard.name == 'shard2') {
            // if (roomName == 'E58N22' ) {
            //     return [RANGED_ATTACK,RANGED_ATTACK,  MOVE,MOVE,MOVE,HEAL,HEAL, MOVE];
            // }
            // if (roomName == 'E55N27' ) {
            //     return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            //         RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            //         HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
            //         MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,
            //         HEAL
            //     ];
                
            // }
            // if (roomName == 'E41N23' ) {
            // // TOUGH*3,MOVE*10,RANGED_ATTACK*27,HEAL*10
            // return [
            //     TOUGH,TOUGH,TOUGH,
            //     RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            //     HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
            //     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            //     HEAL,
            // ]
            // }

            // if (1 && roomName == 'E47N36' ) {
            //     // return [
            //     //     RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            //     //     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            //     //     HEAL,HEAL,HEAL,HEAL,HEAL];
                    
            //     //TOUGH*6,MOVE*10,RANGED_ATTACK*22,HEAL*12
            //     return [
            //         TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            //         RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            //         HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
            //         MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            //         HEAL
            //     ];
                
            // }

            
            return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                HEAL,HEAL,HEAL,HEAL,HEAL];
                
            
        }
        
        return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,];


        //TOUGH*6,MOVE*10,RANGED_ATTACK*22,HEAL*12
        return [
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            HEAL
        ];
        
    
        //TOUGH*10,MOVE*6,RANGED_ATTACK*19,HEAL*15 //7.00K
        
        return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL];
    },
    getMassRangerBoosts: function(roomName) {
        if (roomName == 'helper') {
            return [];
        }
        if (roomName == 'helperBusted') {
            return [RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE];
        }
        
        // if (roomName == 'E58N22' || roomName == 'E59N24' || roomName == 'E58N27' || roomName == 'E58N27') {
        //     return [];
        //     //return [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ];
        // }
        if (Game.shard.name == 'shard2') {
            // if (1 && roomName == 'E41N23')  {
            //     return [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ];
            // }
            // if (1 && roomName == 'E47N36')  {
            //     return [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ];
            // }
            
            if (roomName == 'E55N27' ) {
                //return [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ];
            }
            return [];
            // if (roomName == 'E46N31' || roomName == 'E42N28') {
            //     return [];                
            //     return [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ];
            // }
            
        }
        return [];
        return [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ];
    },
    getRangerCount: function(group){
        // if return 0 then recycle all creeps!!!!!! use -1 instead
        return -1;
    },
    
    spawn: function (room, myRoom, freeSpawn, teamMassRangers) {
        return freeSpawn; //deprecated
        if (myRoom.massRanger_team && freeSpawn ) {
            //check all sector massRanger
            for(let creepMassRangersRole in teamMassRangers[myRoom.massRanger_team].creeps) {
                if (teamMassRangers[myRoom.massRanger_team].creeps[creepMassRangersRole] > 0) {
                    //let creepLive = _.filter(require('spawn').getGameCreeps(), (creep) =>            creep.memory.role == 'massRanger' && creep.memory.type == creepMassRangersRole && creep.memory.group == myRoom.massRanger_team && (creep.ticksToLive > 100 || creep.spawning));
                    let creepLiveLength = require('spawn').getGameCreeps().reduce((a, creep) => a + (creep.memory.role == 'massRanger' && creep.memory.type == creepMassRangersRole && creep.memory.group == myRoom.massRanger_team && (creep.ticksToLive > 100 || creep.spawning)?1:0), 0);
                    //console.log('creepLive massrangers', creepLive.length, creepLiveLength);
    
                    logText += creepMassRangersRole+":"+creepLiveLength+"("+teamMassRangers[myRoom.massRanger_team].creeps[creepMassRangersRole]+"), ";
                    if (freeSpawn && creepLiveLength < teamMassRangers[myRoom.massRanger_team].creeps[creepMassRangersRole]){
                        let boosts = this.getMassRangerBoosts(room.name);
                        let body = this.getMassRangerBody(room.name);
                        let warningMove = teamMassRangers[myRoom.massRanger_team].warningMove;
                        // if (myRoom.massRanger_team == 'SettlerE55N23') {
                        //     warningMove = teamMassRangers[myRoom.massRanger_team];
                        //     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!SettlerE55N23', JSON.stringify(teamMassRangers[myRoom.massRanger_team]));
                        // }
                        const result = freeSpawn.spawnCreep(body, 'mr'+room.name+'_'+Game.time, {memory: {role: 'massRanger', type: creepMassRangersRole, room: room.name, boosts: boosts, group: myRoom.massRanger_team, warningMove: warningMove}});
                        if (result == OK){
                            freeSpawn = null;   
                            teamMassRangers[myRoom.massRanger_team].creeps[creepMassRangersRole]--;
                        } else {
                            freeSpawn = null;
                        }
                    }
                }
            }
        }
        return freeSpawn;
    },
    spawnHelpers: function (room, myRoom, freeSpawn) {
        if (Memory.massRangers && freeSpawn) {
            for (helpRoom in Memory.massRangers) {
                const mrTask = Memory.massRangers[helpRoom];
                if (mrTask) {
                    if (mrTask.startTime && Game.time < mrTask.startTime) {
                        continue;
                    } else if (Game.time > mrTask.time) {
                        Memory.massRangers[helpRoom] = undefined;
                    } else {
                        if (mrTask.room == room.name && mrTask.count) {
                            let soonDie = mrTask.soonDie?mrTask.soonDie:100;
                            
                            if (0) { //!!!debug
                                if (mrTask.boosts && mrTask.boosts.length && !mrTask.copyBoosts) {
                                    mrTask.copyBoosts = mrTask.boosts;
                                }
                                if (mrTask.boosts && !mrTask.boosts.length && mrTask.copyBoosts && mrTask.copyBoosts.length) {
                                    Game.notify(JSON.stringify(mrTask));
                                    mrTask.boosts = mrTask.copyBoosts;
                                    mrTask.copyBoostCount = (mrTask.copyBoostCount || 0) + 1;
                                }
                            }
                            
                            let needSpawn = false;
                            if (mrTask.inter && mrTask.spawnTimeList && mrTask.spawnTimeList.length >= mrTask.count && mrTask.count) {
                                let creepLiveLength = 0;
                                for (let i = 0; i < mrTask.count; i++) {
                                    let creepLiveTime = mrTask.spawnTimeList[mrTask.spawnTimeList.length - mrTask.count + i] + 1500 - soonDie;
                                    //console.log('massRanger inter', helpRoom, 'count', mrTask.count, Game.time - creepLiveTime, Game.time < creepLiveTime);
                                    if (Game.time < creepLiveTime) { 
                                        creepLiveLength++
                                    }
                                }
                                needSpawn = creepLiveLength < mrTask.count;
                            } else {
                                //let creepLive = _.filter(require('spawn').getGameCreeps(), (creep) =>            creep.memory.role == 'massRanger' && creep.memory.type == 'helper' && creep.memory.group == helpRoom && (creep.ticksToLive > soonDie || creep.spawning));
                                // let creepLiveLength = require('spawn').getGameCreeps().reduce((a, creep) => a + (creep.memory.role == 'massRanger' && creep.memory.type == 'helper' && creep.memory.group == helpRoom && (creep.ticksToLive > soonDie || creep.spawning)?1:0), 0);
                                // needSpawn = creepLiveLength < mrTask.count;
                                //console.log('creepLive massrangers helpers', creepLive.length, creepLiveLength);
                                needSpawn = require('spawn').creepLiveCustomCheck(room.name, 'mrHelper_'+helpRoom, mrTask.count,
                                    creep => creep.memory.role == 'massRanger' && creep.memory.type == 'helper' && creep.memory.group == helpRoom && (creep.ticksToLive > soonDie || creep.spawning),
                                    'massRanger'
                                );
                            }

                            if (freeSpawn && needSpawn){
                                let boosts = this.getMassRangerBoosts(mrTask.boosted?'helperBusted':'helper');
                                let body = this.getMassRangerBody(mrTask.boosted?'helperBusted':'helper');
                                if (mrTask.body) {
                                    body = mrTask.body.slice();
                                }
                                if (mrTask.boosts) {
                                    boosts = mrTask.boosts.slice();
                                }
                                
                                if (mrTask.escalate) {
                                    if (!mrTask.spawnTimeList) {
                                        mrTask.spawnTimeList = [];
                                    }
                                    if (mrTask.spawnTimeList.length >= mrTask.count) {
                                        let minSpawnTime = _.min(mrTask.spawnTimeList.slice(-mrTask.count));
                                        if (minSpawnTime && (Game.time - minSpawnTime) < 750) {
                                            if (!boosts.length) {
                                                mrTask.boosts = [RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE];
                                                //Memory.massRangers[helpRoom].boosts = [RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE];
                                                boosts = mrTask.boosts.slice();
                                                if (!room.memory.boostLab && !helpers.checkLabsBoosts(room.name, boosts)) {
                                                    room.memory.boostLab = {boosts: mrTask.boosts, time: mrTask.time};           
                                                }
                                            }
                                            mrTask.escalate++;
                                            mrTask.spawnTimeList = [];
                                            Game.notify('Escalate confict level '+mrTask.escalate+' in room '+helpRoom+' Base room ' + room.name);
                                        }
                                    }
                                }
                                const result = freeSpawn.spawnCreep(body, 'mr'+room.name+'_'+Game.time, {memory: {
                                    role: 'massRanger', 
                                    type: 'helper', 
                                    room: room.name, 
                                    boosts: boosts.slice(), 
                                    group: helpRoom, 
                                    warningMove: mrTask.warningMove, 
                                    nwa: mrTask.nwa, 
                                    inter: mrTask.inter, 
                                    portal: mrTask.portal,
                                    wayPoint: mrTask.wayPoint,
                                    ensure: mrTask.ensure,
                                    flagRange: mrTask.flagRange,
                                }});
                                if (result == OK){
                                    if (mrTask.spawnTimeList || mrTask.inter) {
                                        if (!mrTask.spawnTimeList) {
                                            mrTask.spawnTimeList = [];
                                        }
                                        mrTask.spawnTimeList.push(Game.time);
                                        
                                        if (mrTask.inter && mrTask.spawnTimeList.length > mrTask.count) {
                                            mrTask.spawnTimeList = mrTask.spawnTimeList.slice(-mrTask.count);
                                        }
                                    }
                                    freeSpawn = null;   
                                } else {
                                    freeSpawn = null;
                                }
                            }
                        }    
                    }
                }
            }

        }
        return freeSpawn;
    },
    
    positionInBorder: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 1 || pos.x >48 || pos.y < 1 || pos.y > 48);
    },
    positionInNearBorder: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 2 || pos.x >47 || pos.y < 2 || pos.y > 47);
    },

    
    run: function(creep) {
        if (!creep) return;
        
        // if (['mrE41N19_43678064','mrE41N19_43678368','mrE41N19_43679032'].includes(creep.name) && Game.getObjectById('612d08cb376c268d3a7ce510')) {
        //     creep.rangedAttack(Game.getObjectById('612d08cb376c268d3a7ce510'));
        //     creep.heal(creep);
        //     creep.say('m');
        //     return;
        // }
        
        if (Game.shard.name == 'shard1' && creep.room.name == 'E50S10' && Game.cpu.bucket < 9000) {
            let skip = [0,1,2,3].some(i=>!((Game.time+i)%250));
            if (!skip) {
                let pos = new RoomPosition(26,33,'E50S10');
                if (!creep.pos.isNearTo(pos)) creep.moveTo(pos, {range:1});
                if (creep.hits < creep.hitsMax) creep.heal(creep);
                creep.rangedMassAttack();
                return;
            }
        }
        
        
        
        if (creep.memory.nwa) {
            creep.notifyWhenAttacked(false);
            creep.memory.nwa = undefined;
        }

        
        //console.log('mr', helpers.getRoomLink(creep.room.name));
        Game.map.visual.text("🏹️",creep.pos, { fontSize:10});
        
        if (creep.memory.portal && creep.memory.portal.resetRoom && creep.room.name == creep.memory.portal.resetRoom) {
            creep.memory.portal = undefined;
        }
        if (creep.memory.portal && creep.memory.portal.resetShard && Game.shard.name == creep.memory.portal.resetShard) {
            creep.memory.portal = undefined;
        }
        if (!creep.memory.portal && creep.memory.wayPoint) {
            let pos = new RoomPosition(creep.memory.wayPoint.x, creep.memory.wayPoint.y, creep.memory.wayPoint.roomName)
            if (pos && creep.pos.isNearTo(pos)) {
                creep.memory.wayPoint = undefined;
            }
        }
        
        if (creep.room.name == 'E55N27') {
            //creep.memory.boosts =  [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ];
        }
        
        if (creep.memory.group !== 'helper' && !this.getRangerCount(creep.memory.group)){
            creep.memory.role = undefined;
        }
        
        let sourceKeeper = 'Source Keeper';
        let flagName = 'flagMassRangeAttack'+creep.memory.group;
        let flag = Game.flags[flagName];
        
        if (!flag && creep.memory.type == 'helper') {
            flag = new RoomPosition(25,25, creep.memory.group);
            try {
                flag.createFlag(flagName);
            } catch (e) {}
            
        }
        
        
        
        let escapePosition = Game.rooms[creep.memory.room]?Game.rooms[creep.memory.room].storage: null;
        
        if (!escapePosition /*&& creep.memory.inter*/) {
            if (!creep.memory.escapePos) {
                creep.memory.escapePos = {x: creep.pos.x, y: creep.pos.y, roomName: creep.pos.roomName};
            }
            escapePosition = new RoomPosition(creep.memory.escapePos.x, creep.memory.escapePos.y, creep.memory.escapePos.roomName);
        }
        
        if (!flag) return;
        
        if (!flag.room  || creep.room.name != flag.room.name || creep.memory.portal) {
            if (creep.hits >= creep.hitsMax*0.9 && !creep.memory.retreat) {
                if (creep.memory.portal) {
                    let targetPos = new RoomPosition(creep.memory.portal.x, creep.memory.portal.y, creep.memory.portal.roomName);
                    helpers.smartMove(creep, targetPos, 0, 0);
                    if (creep.memory.inter && creep.pos.inRangeTo(targetPos, 3)) {
                        roleInter.saveMemory(creep);
                    }
                } else if (creep.memory.wayPoint) {
                    let targetPos = new RoomPosition(creep.memory.wayPoint.x, creep.memory.wayPoint.y, creep.memory.wayPoint.roomName);
                    helpers.smartMove(creep, targetPos);
                    creep.say('wayPoint'); 
                } else {
                    if (Game.shard.name == 'shard3' && ['E38N24','E38N25'].includes(creep.room.name)) {
                        let pos =  new RoomPosition(41,47,'E37N25');
                        if (Memory.rooms.E38N25) Memory.rooms.E38N25.avoid = undefined;
                        helpers.smartMove(creep, pos, 0);
                    } else {
                        helpers.smartMove(creep, flag, 0);
                    }
                }
            } else {
                this.retreat(creep, escapePosition);
                //creep.moveTo(escapePosition, {reusePath: 0, range: 1});
            }
            if (creep.memory.retreat && creep.memory.retreat>0) {
                creep.memory.retreat--;
            }
            creep.heal(creep);
            let targetCreeps = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {
                filter: function (object) {
                    return helpers.ownerNotInWhiteList(object.owner.username)
                    //&& object.owner.username != sourceKeeper
                    ;
                }
            });
            let targetCreep = creep.pos.findClosestByRange(targetCreeps);
            
            if (targetCreep && targetCreeps.length>1 && creep.pos.getRangeTo(targetCreep) <= 2) {
                creep.rangedMassAttack();
            } else if (targetCreep && creep.pos.inRangeTo(targetCreep, 3)) {
                creep.rangedAttack(targetCreep);    
            }
            creep.memory.safeModeCount = undefined;
            
        } else {
            //check safe mode
            let safeModeOn = false;
            if (creep.room.controller && !creep.room.controller.my && creep.room.controller.safeMode) {
                if (!creep.memory.safeModeCount) {
                    creep.memory.safeModeCount = 1;
                } else {
                    creep.memory.safeModeCount++
                }
                if (creep.memory.safeModeCount >= 1) {
                    safeModeOn = true;    
                    //creep.memory.safeModeCount = undefined;
                }
            }
            
            if (Game.shard.name == 'shard3' && creep.room.name == 'E46N7') {
                safeModeOn = false;
                creep.say('👁️');
            }
            
            creep.memory.warningMove = 0;
            
            
            let flagEscape = Game.flags['flagMassRangeEscape'+creep.memory.group];
            if (flagEscape) {
                escapePosition = flagEscape;
                //creep.say('1');
            }
            let minBodyLength = 1;
            if (Game.shard.name == 'shard1' && creep.room.name == 'E50S10' && creep.hits == creep.hitsMax) {
                minBodyLength = 2;
            }

            let enemyCreeps = creep.room.find(FIND_HOSTILE_CREEPS, {
                filter: function (object) {
                    return helpers.ownerNotInWhiteList(object.owner.username)
                    && object.owner.username != sourceKeeper
                    && object.body.length > minBodyLength;
                }
            });
            
            if (0) {
                let enemyCreepsFiltered = enemyCreeps.filter(c => creep.pos.inRangeTo(c,3) || !this.positionInNearBorder(c));
                if (enemyCreepsFiltered.length) {
                    enemyCreeps = enemyCreepsFiltered;
                }
            }
            
            if (!enemyCreeps.length && Game.shard.name == 'shard1' && creep.room.name == 'E50S10' && creep.hits == creep.hitsMax) {
                minBodyLength = 0;
                enemyCreeps = creep.room.find(FIND_HOSTILE_CREEPS, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                        && !(object.room.name == 'E86N54' && object.pos.x == 37 && object.pos.y == 10 )
                        && object.owner.username != sourceKeeper
                        && object.body.length > minBodyLength;
                    }
                });
            }

            
            if (Game.shard.name == 'shard2' && creep.room.name == 'E50S10' && creep.hits == creep.hitsMax) {
                enemyCreeps = enemyCreeps.filter(c=>c.owner.username != '6g3y');
            }
            if (Game.shard.name == 'shard2' && creep.room.name == 'E50S11' && creep.hits == creep.hitsMax) {
                enemyCreeps = enemyCreeps.filter(c=>c.owner.username != '6g3y');
            }
            if (1 && Game.shard.name == 'shard2' && creep.room.name == 'E40N30' && creep.hits == creep.hitsMax) {
                enemyCreeps = enemyCreeps.filter(c=>c.owner.username != 'Montblanc');
            }
            if (1 && Game.shard.name == 'shard2' && creep.room.name == 'E49S11' && enemyCreeps.length > 1) {
                enemyCreeps = enemyCreeps.filter(c=>!this.positionInBorder(c));
            }
            
            
            
            let targetCreep;
            
            if (Game.shard.name == 'shard2' && creep.room.name == 'E41N12') {
                targetCreep = creep.pos.findClosestByPath(enemyCreeps, {
                     filter: function (object) {
                        let onRamp = false;
                        object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                            if (lookObject.structureType == STRUCTURE_RAMPART) {
                                onRamp = true;
                            }
                        });
                        let isPathExist = creep.moveTo(object, {range:1}) != ERR_NO_PATH;
                        return !onRamp && isPathExist;
                     }
                });
                creep.cancelOrder('move');
            } else {
                targetCreep = creep.pos.findClosestByRange(enemyCreeps, {
                     filter: function (object) {
                        let onRamp = false;
                        object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                            if (lookObject.structureType == STRUCTURE_RAMPART) {
                                onRamp = true;
                            }
                        });
                        return !onRamp;
                     }
                });
            }
            
            
            
            let enemyCreepsCount = 0;
            if (targetCreep) { //check near enemy count
                let enemyCreepsNear = targetCreep.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                        && (_.filter(object.body, {type: ATTACK}).length>=2 || _.filter(object.body, {type: RANGED_ATTACK}).length>=2 || _.filter(object.body, {type: HEAL}).length>=2)
                        && object.body.length > 1;
                    }
                });
                enemyCreepsCount = enemyCreepsNear.length;
            }
            let myCreepsCount = creep.pos.findInRange(FIND_MY_CREEPS, 6, {
                    filter: function (object) {
                        return 1
                          && (_.filter(object.body, {type: ATTACK}).length>=2 || _.filter(object.body, {type: RANGED_ATTACK}).length>=2 || _.filter(object.body, {type: HEAL}).length>=2)
                          && object.body.length > 1;
                        
                    }
                }).length;
            if (enemyCreepsCount) {
                creep.say(myCreepsCount+' '+enemyCreepsCount);    
            }           
            if (creep.memory.noFear) {
                myCreepsCount = 2;
                enemyCreepsCount = 1;
                creep.say(myCreepsCount+' '+enemyCreepsCount+'noFear');
            }
            
            let targetMeleeCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function (object) {
                    return helpers.ownerNotInWhiteList(object.owner.username)
                    && object.owner.username != sourceKeeper
                    //&& _.filter(object.body, {type: ATTACK}).length>=2
                    && (_.filter(object.body, {type: ATTACK}).length>=2 ||  (myCreepsCount < enemyCreepsCount && _.filter(object.body, {type: RANGED_ATTACK}).length>=2))
                    //&& object.getActiveBodyparts(ATTACK)>= 1
                    && object.id !== '5f799a78a4afc6343b8549e2'
                    ;
                }
            });

            
            
            
            let targetStructure = creep.pos.findClosestByRange (FIND_HOSTILE_STRUCTURES, {
                filter: function (object) {
                    let onRamp = false;
                    object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                        if (lookObject.structureType == STRUCTURE_RAMPART) {
                            onRamp = true;
                        }
                    });
                    return helpers.ownerNotInWhiteList(object.owner.username)
                    
                        && object.structureType != STRUCTURE_ROAD
                        && object.structureType != STRUCTURE_CONTAINER
                        && object.structureType != STRUCTURE_CONTROLLER
                        && object.structureType != STRUCTURE_WALL
                        && object.structureType != STRUCTURE_RAMPART //!!!!!!!!!!!!!!!!!!!!!!!!!!
                        // && !(creep.room.name == 'E42N26' && object.structureType == STRUCTURE_RAMPART)
                        //&& !(creep.room.name == 'E37N13' && object.structureType == STRUCTURE_RAMPART && !Game.getObjectById('5f8d665db48c662226303efc'))
                        && object.structureType != STRUCTURE_KEEPER_LAIR
                        && object.structureType != STRUCTURE_POWER_BANK
                        && !(object.structureType == STRUCTURE_INVADER_CORE && object.effects && object.effects.length && object.effects[0].effect == EFFECT_INVULNERABILITY)
                        //&& !(object.structureType == STRUCTURE_INVADER_CORE && object.level == 0)
                        //&& !(object.owner.username == 'Invader' && object.structureType == STRUCTURE_TOWER)
                        && object.id != '5f78c4cbdbed2554901184ed'
                        // && object.id != '5daf09c7613688b2aae05599'
                        // && object.id != '5dbb4758bb0248a2dea056e6'
                        // && object.id != '5de27049100847407796b66b'
                         && object.id != '60d14e6cc779dc09ef3365d0'
                         && object.id != '5b230c2fe3acfd519a9edb61'
                         && object.id != '5b289062c1cf3612b5f996ee'
                        && !onRamp
                        ;
                }
            });
            
            if (!targetStructure && !targetCreep) { //find rampart
                targetStructure = creep.pos.findClosestByRange (FIND_HOSTILE_STRUCTURES, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                            && object.structureType == STRUCTURE_RAMPART //!!!!!!!!!!!!!!!!!!!!!!!!!!
                            ;
                    }
                });
            }
            
            let targetWallStructure = creep.pos.findClosestByRange (FIND_STRUCTURES, {
                filter:  (object)  => object.structureType == STRUCTURE_WALL
            });
    
            //deprecated wall attack bottom
            if (0 && (creep.room.name == 'E51N54' || creep.room.name == 'E41N13') && (!creep.room.controller || !creep.room.controller.my) && targetWallStructure  && !targetCreep) {
                let rangeToStruct = targetStructure?creep.pos.getRangeTo(targetStructure):55;
                let rangeToWall = creep.pos.getRangeTo(targetWallStructure);
                if (rangeToWall == rangeToStruct && targetStructure.structureType == STRUCTURE_RAMPART && targetWallStructure.hits < targetStructure.hits) {
                    targetStructure = targetWallStructure;
                } else if (rangeToWall < rangeToStruct) {
                    targetStructure = targetWallStructure;
                } 
            }
            
            //deprecated road attack bottom
            if (0 && (creep.room.name == 'E39N23' || creep.room.name == 'E36N21') && (!creep.room.controller || !creep.room.controller.my) && !targetStructure  && !targetCreep) {
                let targetRoadStructure = creep.pos.findClosestByRange (FIND_STRUCTURES, {
                    filter:  (object)  => {
                        let onRamp = false;
                        object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                            if (lookObject.structureType == STRUCTURE_RAMPART) {
                                onRamp = true;
                            }
                        });
                        return object.structureType == STRUCTURE_ROAD
                        && !onRamp;
                    }
                });
                if (targetRoadStructure) {
                    let rangeToStruct = targetStructure?creep.pos.getRangeTo(targetStructure):55;
                    let rangeToRoad = creep.pos.getRangeTo(targetRoadStructure);
                    if (rangeToRoad == rangeToStruct && targetStructure.structureType == STRUCTURE_RAMPART && targetRoadStructure.hits < targetStructure.hits) {
                        targetStructure = targetRoadStructure;
                    } else if (rangeToRoad < rangeToStruct) {
                        targetStructure = targetRoadStructure;
                    } 
                } else {
                    let targetContaionerStructure = creep.pos.findClosestByRange (FIND_STRUCTURES, {filter:  (object)  => object.structureType == STRUCTURE_CONTAINER});
                    if (targetContaionerStructure) {
                        targetStructure = targetContaionerStructure;
                    }
                }
            }
            
            
            let closestTarget = null;
            if (creep.room.controller && creep.room.controller.level && !creep.room.controller.my && creep.room.name != 'E47S3') {
                let struct = targetStructure;
                targetStructure = this.getEnemyStruct(creep);
                //console.log('getEnemyStruct', creep.room.name, creep.name, targetStructure);
                if (!targetStructure) {
                    targetStructure = struct;
                } else {
                    creep.say('aT_inv');
                    closestTarget = creep.pos.findClosestByRange([targetStructure, struct, targetCreep]);
                    targetCreep = null;
                    
                }
                
            }
            
              if (creep.room.name == 'E53N35_') {
                let struct = targetStructure;
                targetStructure = Game.getObjectById('644042072c5c641da589e3f0');//5f92ea853782fd09fbf2accf
                if (!targetStructure) {
                    targetStructure = Game.getObjectById('63ef22b635dd854664049a17');    
                }
                if (!targetStructure) {
                    targetStructure = Game.getObjectById('63ef22b635dd854664049a17');    
                }
                if (!targetStructure) {
                    targetStructure = Game.getObjectById('63ef22ba1da4d7331c9fd2b6');    
                }
                if (!targetStructure) {
                    targetStructure = Game.getObjectById('63ef22be09166a7f4c2f6c8b');    
                }
                if (!targetStructure) {
                    targetStructure = Game.getObjectById('63ef22c2f841d3434727887d');    
                }
                if (!targetStructure) {
                    targetStructure = Game.getObjectById('63ef22c647eb43c459047ac6');    
                }
                if (!targetStructure) {
                    targetStructure = Game.getObjectById('63ef22cafe4bd2843a9eba2a');    
                }
               
                if (!targetStructure) {
                    targetStructure = struct;
                } else {
                    creep.say('dddd');
                    targetCreep = null;
                }
            }
            
            
            let enemyWoRamp = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {
                filter: function (object) {
                    let onRamp = false;
                    object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                        if (lookObject.structureType == STRUCTURE_RAMPART) {
                            onRamp = true;
                        }
                    });
                    return helpers.ownerNotInWhiteList(object.owner.username) && !onRamp;
                }
            });
            
            
            
            let targetHeal = null;
            let targetHeals = creep.pos.findInRange(FIND_MY_CREEPS, 3, {
                filter: function (object) {
                    return object.hits < object.hitsMax && object.name != creep.name /*&& (object.getActiveBodyparts(ATTACK) || object.getActiveBodyparts(RANGED_ATTACK) || object.getActiveBodyparts(HEAL) )*/;
                }
            });
            if (targetHeals.length) {
                targetHeal = creep.pos.findClosestByRange(targetHeals);
            }
            
            let target = null;
            
            if (targetCreep && targetStructure) {
                if (creep.pos.getRangeTo(targetCreep) < creep.pos.getRangeTo(targetStructure)) {
                    target = targetCreep;
                } else {
                    target = targetStructure;
                }
            } else if (targetCreep) {
                target = targetCreep;
            } else if (targetStructure) {
                target = targetStructure;
                if (!(Game.time%10) && ![STRUCTURE_WALL, STRUCTURE_ROAD, STRUCTURE_CONTAINER].includes(target.structureType) && Game.cpu.bucket > 1500 && creep.pos.isNearTo(target) && !creep.fatigue) {
                    this.findOptimalPosition(creep, target);
                }
                
            }
            if (1 /*&& ['E57N48'].includes(creep.room.name)*/ && !target && !(creep.room.controller && creep.room.controller.my)) {
                let targetStructure = creep.pos.findClosestByRange (FIND_HOSTILE_STRUCTURES, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                            && object.structureType == STRUCTURE_RAMPART 
                            ;
                    }
                });
                if (targetStructure) {
                    if (targetWallStructure && creep.room.controller && creep.room.controller.level && !creep.room.controller.my) { //target wall only if controller level
                        let rangeToStruct = targetStructure?creep.pos.getRangeTo(targetStructure):55;
                        let rangeToWall = creep.pos.getRangeTo(targetWallStructure);
                        if (rangeToWall == rangeToStruct && targetStructure.structureType == STRUCTURE_RAMPART && targetWallStructure.hits < targetStructure.hits) {
                            targetStructure = targetWallStructure;
                        } else if (rangeToWall < rangeToStruct) {
                            targetStructure = targetWallStructure;
                        } 
                    }
                    target = targetStructure;
                } else if (targetWallStructure && creep.room.controller && creep.room.controller.level && !creep.room.controller.my) { //target wall only if controller level
                    target = targetWallStructure;
                }
                
                if (!target) {
                    let targetRoadStructure = creep.pos.findClosestByRange (FIND_STRUCTURES, {
                        filter:  (object)  => object.structureType == STRUCTURE_ROAD
                    });
                    if (targetRoadStructure) {
                        target = targetRoadStructure;
                    }

                }
                if (!target) {
                    let targetContStructure = creep.pos.findClosestByRange (FIND_STRUCTURES, {
                        filter:  (object)  => object.structureType == STRUCTURE_CONTAINER
                    });
                    if (targetContStructure) {
                        target = targetContStructure;
                    }

                }
                
                if (1 && !target) {
                    let constrSites = creep.pos.findClosestByPath(FIND_HOSTILE_CONSTRUCTION_SITES, {
                       filter: (object) => object.progress 
                    });
                    if (constrSites) {
                        creep.moveTo(constrSites,{reusePath: 0, range: 0, visualizePathStyle: {stroke: '#ffffff'}});
                        creep.memory._trav = undefined;
                        creep.heal(creep);
                        //creep.rangedMassAttack();
                        return;
                    } else {
                        creep.memory._move = undefined;
                    }
                }
                
            }
            
            if (target && !this.positionInBorder(creep)) {
                let lastTargetPos = null;
                creep.memory.lastTargetPos = creep.memory.targetPos;
                lastTargetPos = creep.memory.lastTargetPos?(new RoomPosition(creep.memory.lastTargetPos.x, creep.memory.lastTargetPos.y, creep.memory.lastTargetPos.roomName)):null;
                let lastTargetRange = lastTargetPos?creep.pos.getRangeTo(lastTargetPos):300;
                creep.memory.targetPos = {x: target.pos.x, y: target.pos.y, roomName: target.pos.roomName};
                
                let rangeToTarget = creep.pos.getRangeTo(target);
                let rangeToTargetCreep = 4;
                if (targetCreep) {
                    rangeToTargetCreep = creep.pos.getRangeTo(targetCreep);
                }
                let rangeToTargetMeleeCreep = 4;
                if (targetMeleeCreep) {
                    rangeToTargetMeleeCreep = creep.pos.getRangeTo(targetMeleeCreep);
                }
                rangeToTargetCreep = rangeToTargetMeleeCreep;
                //rangeToTargetCreep = 4;
                
                let rangedAtacked = false;
                let manualTarget = null;//Game.getObjectById('5f7efbd8ba25246dd77843ee'); 
                // if (creep.room.name == 'E41N13') {
                //     manualTarget = Game.getObjectById('5f95241cf03d9b71e652af4c');    
                // }
                
                let enemyDamage = 0;
                enemyWoRamp.forEach(function(obj) {
                    const rng = creep.pos.getRangeTo(obj);
                    if (rng == 1) enemyDamage += 10;
                    if (rng == 2) enemyDamage += 4;
                    if (rng == 3) enemyDamage += 1;
                })
                
                let massAllowed = true;
                if (0 && creep.room.name == 'E41N5') {
                    massAllowed = false;
                }
                let meleeAtacked = false;
            
                //blockAttack
                if (1) {
                    let savedTarget = null;
                    if (closestTarget && creep.pos.getRangeTo(target) > 3 && creep.pos.getRangeTo(closestTarget) <= 3) {
                        savedTarget = target;
                        target = closestTarget;
                    }
                    if (creep.getActiveBodyparts(ATTACK) && target && creep.pos.isNearTo(target) && (creep.hits == creep.hitsMax || !creep.getActiveBodyparts(HEAL))) {
                        creep.attack(target);
                        creep.say('a');
                        meleeAtacked = true;
                    }
                    if (creep.getActiveBodyparts(WORK) && target && creep.pos.isNearTo(target) && creep.hits == creep.hitsMax) {
                        creep.dismantle(target);
                        creep.say('w');
                        meleeAtacked = true;
                    }
                    
                    if (enemyWoRamp.length > 1 && enemyDamage > 10 && massAllowed) {
                        creep.rangedMassAttack();
                        rangedAtacked = true;
                    } else if (enemyWoRamp.length) {
                        if (creep.pos.inRangeTo(enemyWoRamp[0],1)){
                            creep.rangedMassAttack();    
                        } else {
                            creep.rangedAttack(enemyWoRamp[0]);
                        }
                        rangedAtacked = true;
                    } else if (manualTarget && creep.pos.inRangeTo(manualTarget,3)){
                        if (creep.pos.inRangeTo(manualTarget,1)){
                            creep.rangedMassAttack();    
                        } else {
                            creep.rangedAttack(manualTarget);        
                        }
                        rangedAtacked = true;
                    } else {
                        if (rangeToTarget <= 1 && !(target.structureType && (target.structureType == STRUCTURE_WALL || target.structureType == STRUCTURE_ROAD || target.structureType == STRUCTURE_CONTAINER )) && massAllowed) { //check to wall
                            creep.rangedMassAttack();
                            rangedAtacked = true;
                        } else if (rangeToTarget <= 3) {
                            if (creep.pos.getRangeTo(target) <=2 && !(target.structureType && (target.structureType == STRUCTURE_WALL || target.structureType == STRUCTURE_ROAD || target.structureType == STRUCTURE_CONTAINER )) && massAllowed) { //check to wall
                                creep.rangedMassAttack();        
                            } else {
                                creep.rangedAttack(target);    
                            }
                            
                            rangedAtacked = true;
                        }
                    }
                    if (savedTarget) {
                        target = savedTarget;
                    }
                }
                
                
                if (creep.hits == creep.hitsMax) {
                    if (targetHeal) {
                        if (creep.pos.getRangeTo(targetHeal) > 1) {
                            if (!rangedAtacked) {
                                creep.rangedHeal(targetHeal);    
                            } else {
                                if (!meleeAtacked) {
                                    creep.heal(creep);            
                                }
                            }
                        } else {
                            creep.heal(targetHeal);
                        }
                    } else {
                        if (!meleeAtacked) {
                            creep.heal(creep);            
                        }
                    }
                } else {
                    if (!meleeAtacked) {
                        creep.heal(creep);            
                    }
                }
            
                if (safeModeOn) {
                    creep.memory.retreat = 6;
                }
                if (creep.hits >= creep.hitsMax*0.85 && !safeModeOn) {
                    //creep.say(rangeToTarget+' '+rangeToTargetCreep+' '+rangeToTargetMeleeCreep);
                    //creep.say(rangeToTargetCreep);
                    let moveCloseRange = 1; //1 2 3 если один то масс атака
                    let moveCloseMeleeRange = 4;
                    if (creep.getActiveBodyparts(RANGED_ATTACK) && target.getActiveBodyparts && target.getActiveBodyparts(RANGED_ATTACK) > creep.getActiveBodyparts(RANGED_ATTACK)) {
                        moveCloseRange = 2
                    }
                    let safeDistance = 3; // если 4 то будет пляска.. если 3 то нет.
                    if (creep.memory.type == 'helper') {
                        safeDistance = 4; 
                        if (target.fatigue) {
                            safeDistance = 3; 
                        }
                    }
                    if (creep.room.controller && creep.room.controller.level>2 && !creep.room.controller.my) {
                        moveCloseMeleeRange = 3;
                        safeDistance = 3;
                    }
                    if (1 && Game.shard.name == 'shard2' && creep.room.name == 'E37N10') {
                        creep.say('s');
                        safeDistance = 3;
                        if (target.fatigue) {
                            safeDistance = 2; 
                        }
                        //  moveCloseMeleeRange = 1; 
                        //  moveCloseRange = 1;
                    }
                    if (1 && Game.shard.name == 'shard2' && creep.room.name == 'E35N3') {
                        creep.say('s');
                        safeDistance = 1;
                        moveCloseMeleeRange = 1;
                        moveCloseRange = 2;
                    }
                    let defendMode = false;
                    let radiusDefendMode = 0;
                    let maxradiusDefendMode = 11;
                    if (creep.room.controller && creep.room.controller.my && creep.room.controller.level >= 3 && escapePosition.pos && escapePosition.pos.roomName == creep.room.name) {
                        defendMode = true;
                        radiusDefendMode = creep.pos.getRangeTo(escapePosition);
                        creep.say('d'+radiusDefendMode);
                        //Memory.rooms.E33N9.maxradiusDefendMode = 11;
                        maxradiusDefendMode = creep.room.memory.maxradiusDefendMode?creep.room.memory.maxradiusDefendMode:maxradiusDefendMode;
                    }
                    
                    if (1 && Game.shard.name == 'shard2' && creep.room.name == 'E41S16') {
                        creep.say(lastTargetRange+' '+rangeToTarget+' '+rangeToTargetCreep);
                    }
                    if (defendMode && radiusDefendMode > maxradiusDefendMode) {
                        this.retreat(creep, escapePosition);
                    } else if (creep.memory.flagRange && creep.pos.getRangeTo(flag) > creep.memory.flagRange + (Math.round(Math.random()*2)-2)) {
                        creep.moveTo(flag, {reusePath: 0, range: 1, maxRooms: 1, });
                    } else if (lastTargetPos && rangeToTarget > 4 && lastTargetRange < rangeToTarget && rangeToTargetCreep >= 4) {    
                        creep.moveTo(lastTargetPos, {reusePath: 0, range: 1, maxRooms: 1, });
                    } else if (rangeToTarget>moveCloseRange && rangeToTargetCreep>4) { //2 3  //идем смело
                        creep.moveTo(target, {reusePath: 0, range: 1, maxRooms: 1, });// visualizePathStyle: {stroke: '#ffffff'}, });
                        if (!target.fatigue) creep.memory.moveSlowly = 1;
                        //creep.say('_1');
                    } else if (rangeToTarget>moveCloseRange && rangeToTargetCreep>(moveCloseMeleeRange-1) && !creep.memory.moveSlowly) { //2 3  //если в прошлый раз шли смело.. то один ход не будем приближаться. Может приблизятся к нам.
                        creep.moveTo(target, {reusePath: 0, range: 1, maxRooms: 1,});    
                        //creep.say('_2');
                    } else if (rangeToTarget <= moveCloseRange && rangeToTargetCreep < moveCloseMeleeRange) {
                        this.retreat(creep, escapePosition);
                        creep.memory.retreat = 3;
                        if (!target.fatigue) creep.memory.moveSlowly = 1;
                    } else if (rangeToTargetCreep < safeDistance) { 
                        this.retreat(creep, escapePosition);
                        creep.memory.retreat = 3;
                        if (!target.fatigue) creep.memory.moveSlowly = 1;
                    } else {
                        creep.memory.moveSlowly = undefined; 
                    } 
                    
                } else {
                    if (escapePosition){
                        this.retreat(creep, escapePosition);
                        //creep.moveTo(escapePosition, {reusePath: 0, range: 1});        
                    }
                }
            } else {
                let healed = false;
                if (creep.hits < creep.hitsMax || this.positionInBorder(creep)) {
                    creep.heal(creep);
                    //creep.say('h');
                    healed = true;
                }
                let helping = false;
                if (Game.shard.name == 'shard2' && creep.room.name == 'E40N30') {
                   
                } else if (creep.memory.type == 'helper') {
                    let healTarget = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                        filter: function (object) {
                            return object.hits < object.hitsMax && object.name != creep.name;
                        }
                    });
                    if (healTarget && !healed) {
                        helping = true;
                        if (!creep.pos.isNearTo(healTarget)) {
                            helpers.smartMove(creep, healTarget, 0);    
                        }
                        if (creep.pos.isNearTo(healTarget)) {
                            creep.heal(healTarget);
                        } else if (creep.pos.inRangeTo(healTarget, 3)) {
                            creep.rangedHeal(healTarget);
                        }
                    }
                        
                    if (1 && !helping) {
                         const powerBanks = creep.room.find(FIND_STRUCTURES, {filter: function(structure) {return structure.structureType == STRUCTURE_POWER_BANK && structure.hits < structure.hitsMax && structure.hits > 2000;}})
                        if (powerBanks.length) {
                            helping = true;
                            let target = powerBanks[0];
                            if (!creep.pos.inRangeTo(target, 3)) {
                                helpers.smartMove(creep, target, 0, 3);    
                            }
                            if (creep.pos.inRangeTo(target, 2)) {
                                creep.moveTo(escapePosition, {reusePath: 0, range: 1});
                            } else if (creep.pos.inRangeTo(target, 3)) {
                                if (creep.hits>0.98*creep.hitsMax) {
                                    creep.rangedAttack(target); 
                                    creep.heal(creep);
                                }
                            }
                        }
                    }
                    
                }
                
                
                
                
                if (!helping && !creep.pos.isNearTo(flag)) {
                    if (creep.memory.targetPos) {
                        let pos = new RoomPosition(creep.memory.targetPos.x, creep.memory.targetPos.y, creep.memory.targetPos.roomName);
                        creep.memory.targetPos = undefined;
                        if (pos) {
                            helpers.smartMove(creep, pos);
                            creep.rangedMassAttack();
                        } else {
                            console.log('unknown mr error');
                        }
                    } else {
                        if (creep.memory.incomplete) {
                            helpers.smartMove(creep, flag, 0, 2);
                        } else {
                            helpers.smartMove(creep, flag);
                        }
                        
                    }
                }
                if (Game.shard.name == 'shard2' && creep.room.name == 'E50S10' && creep.pos.isNearTo(flag) && !(Game.time%10)) {
                    creep.rangedMassAttack();
                }
                
                
                 if (creep.memory.CSId) {
                    let target = Game.getObjectById(creep.memory.CSId);
                    if (target) {
                        if (creep.pos.isEqualTo(target)) {
                            creep.memory.CSId = undefined;    
                        } else {
                            helpers.smartMove(creep, target, 0, 0);            
                            return;
                        }
                    } else {
                        creep.memory.CSId = undefined;
                    }
                }
                if (creep.pos.isNearTo(flag) && creep.memory.group && (''+creep.memory.group).startsWith('Settler')) {
                    creep.say('ready for recycle');
                    const spawns = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN;}
                    });
                    if (spawns.length) {
                        //creep.memory.role = undefined;    
                        // let dropped = creep.room.find(FIND_DROPPED_RESOURCES, {
                        //     filter: (i) => (i.resourceType == RESOURCE_ENERGY && i.amount >= 130)
                        // });    
                        let dropped = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 5, {
                            filter: (i) => (i.resourceType == RESOURCE_ENERGY && i.amount >= 130)
                        });    

                        let tombs = creep.room.find(FIND_TOMBSTONES, {
                            filter: (i) => i.store[RESOURCE_ENERGY] >= 200
                        });
                        if (!dropped.length && !tombs.length){
                            if (creep.room.name != 'E45N28_') {
                                creep.memory.role = undefined;        
                            }
                            
                        } else {
                            creep.say('see energy');
                        }
                    } else {
                        creep.say('nospawns');
                        creep.suicide();
                    }

                    //creep.suicide();
                } else if (creep.pos.isNearTo(flag)) {
                    if (!(Game.time%20) && creep.room.controller && !creep.room.controller.my && !creep.memory.CSId) {
                        creep.say('CSId');
                        let target = creep.pos.findClosestByRange(FIND_HOSTILE_CONSTRUCTION_SITES, {filter: cs=> cs.progress});
                        if (target) {
                            creep.memory.CSId = target.id
                        }
                    }
                   
                }
            }
        }
    },
    retreat: function(creep, escapePosition) {
        creep.moveTo(escapePosition, {reusePath: 0, range: 1,
            costCallback: function(roomName, costMatrix) {
                if(roomName == creep.room.name) {
                    const terrain = new Room.Terrain(roomName);
                    const roomStructures = creep.room.find(FIND_STRUCTURES);
                    creep.room.find(FIND_HOSTILE_CREEPS).forEach(function(enemyCreep) {
                        let sd = enemyCreep.getActiveBodyparts(ATTACK)?2:(enemyCreep.getActiveBodyparts(RANGED_ATTACK)?1:0);
                        if (sd){
                            for (dx= -sd;dx<=sd;dx++){
                                for (dy=-sd;dy<=sd;dy++){
                                    const x = enemyCreep.pos.x+dx;
                                    const y = enemyCreep.pos.y+dy;
                                    let place = terrain.get(x,y);
                                    if (place !== TERRAIN_MASK_WALL){
                                        let structures = _.filter(roomStructures, (struct) => struct.pos && struct.pos.isEqualTo(x,y));
                                        if (!structures.length || (structures.length == 1 && structures[0].structureType == STRUCTURE_ROAD )) {
                                            if (place == TERRAIN_MASK_SWAMP) {
                                                costMatrix.set(x, y, 150);
                                                creep.room.visual.circle(x, y, {radius: 0.25});
                                            } else {
                                                costMatrix.set(x, y, 50);
                                                creep.room.visual.circle(x, y, {radius: 0.15});
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                    // creep.room.find(FIND_HOSTILE_CREEPS).forEach(function(enemyCreep) {
                    //     let sd = enemyCreep.getActiveBodyparts(ATTACK)?2:(enemyCreep.getActiveBodyparts(RANGED_ATTACK)?1:0);
                    //     if (sd){
                    //         for (dx= -sd;dx<=sd;dx++){
                    //             for (dy=-sd;dy<=sd;dy++){    
                    //                 costMatrix.set(enemyCreep.pos.x+dx, enemyCreep.pos.y+dy, 50);
                    //                 creep.room.visual.circle(enemyCreep.pos.x+dx, enemyCreep.pos.y+dy, {radius: 0.15})
                    //             }
                    //         }
                    //     }
                    // });
                }
            },
        });
        
    },
    //require('role.massRanger').findOptimalPosition(Game.creeps.mrE52N41_51703253, Game.getObjectById('634fd1d29002ce09c2f88248'))
    findOptimalPosition: function(creep, target) {
        if (!target || !target.structureType || !creep.pos.isNearTo(target)) return;
        let result = [];
        let currentTargetsCount = 0;
        for (let dx = -1; dx<=1; dx++) {
            for (let dy = -1; dy<=1; dy++) {
                if (creep.pos.x+dx>49 || creep.pos.y+dy>49 || creep.pos.x+dx<0 || creep.pos.y+dy<0) continue;
                let pos = new RoomPosition(creep.pos.x+dx, creep.pos.y+dy, creep.pos.roomName);
                if (!pos || !pos.isNearTo(target)) continue;
                
                let top = creep.pos.y+dy-2;
                let left = creep.pos.x+dx-2;
                let bottom = creep.pos.y+dy+2;
                let right = creep.pos.x+dx+2;
                let targetsCount = 0;
                creep.room.lookForAtArea(LOOK_STRUCTURES,Math.max(top, 0), Math.max(left, 0), Math.min(bottom, 49), Math.min(right, 49), true).forEach(lookPos=>{
                    let weight = 1;
                    if (lookPos.x == left || lookPos.x == right || lookPos.y == top || lookPos.y == bottom) {
                        weight = 0.3;
                    }
                    targetsCount += ([STRUCTURE_RAMPART].includes(lookPos.structure.structureType)?weight:0);
                });
                result.push({targetsCount: targetsCount, x:creep.pos.x+dx, y:creep.pos.y+dy});
                if (!dx && !dy) {
                    currentTargetsCount = targetsCount;
                }
            }
        }
        result = result.filter(r=>{
            let res = true;
            let pos = new RoomPosition(r.x, r.y, creep.room.name);
            if (!pos.isNearTo(target)) {
                res = false;
            } else {
                pos.look().forEach(lookObject => {
                    if(lookObject.type == LOOK_CREEPS) {
                       res = false;
                    } else if(lookObject.type == LOOK_STRUCTURES && ![STRUCTURE_ROAD, STRUCTURE_CONTAINER].includes(lookObject.structure.structureType)) {
                       res = false;
                    } else if(lookObject.type == LOOK_TERRAIN && ['wall'].includes(lookObject.terrain)) {
                       res = false;
                    }
                })
            }
            return res;
        });
        let maxPos = _.max(result, 'targetsCount');
        if (maxPos.targetsCount > currentTargetsCount) {
            creep.say(currentTargetsCount.toFixed(1)+'->'+maxPos.targetsCount.toFixed(1));
            creep.move(creep.pos.getDirectionTo(new RoomPosition(maxPos.x, maxPos.y, creep.room.name)));
        } else if (maxPos.targetsCount){
            creep.say(currentTargetsCount.toFixed(1)+' >= '+maxPos.targetsCount.toFixed(1));
        }
        console.log('currentTargetsCount',currentTargetsCount);
        return JSON.stringify(result);
        
    },
    
    getEnemyStruct: function(creep) {
        let pos = creep.pos;
        let room = creep.room; 
         
        if (1 && room.memory.targetEnemyStruct) {
            if (Game.time < room.memory.targetEnemyStruct.time + 50 && !room.memory.targetEnemyStruct.id) {
                return;
            }
            let targetObj = Game.getObjectById(room.memory.targetEnemyStruct.id);
            if (Game.time < room.memory.targetEnemyStruct.time + 50 && targetObj) {
                return targetObj;
            } else {
                delete room.memory.targetEnemyStruct;
            }
        }
        let goalStructures = _.filter(room.find(FIND_STRUCTURES), struct => [STRUCTURE_SPAWN].includes(struct.structureType));
        if (!goalStructures.length) {
            goalStructures = _.filter(room.find(FIND_STRUCTURES), struct => [STRUCTURE_TOWER].includes(struct.structureType));
        }
        if (!goalStructures.length) {
            if (creep.memory.noStorage || (Game.shard.name=='shard2' && room.name == 'E59N54')) {
                goalStructures = [];
            } else {
                goalStructures = _.filter(room.find(FIND_STRUCTURES), struct => [STRUCTURE_TERMINAL, STRUCTURE_STORAGE].includes(struct.structureType));
            }
        }
        if (!goalStructures.length) {
            goalStructures = _.filter(room.find(FIND_STRUCTURES), struct => [STRUCTURE_EXTENSION, STRUCTURE_LINK, STRUCTURE_FACTORY, STRUCTURE_LAB].includes(struct.structureType));
        }
        
        let goals;
        if (goalStructures.length) {
            goals = _.map(goalStructures, struct => { return {pos: struct.pos, range: 0 };});
        } else if (!goalStructures.length && room.controller) {
            goalStructures = [room.controller];
            goals = _.map(goalStructures, struct => { return {pos: struct.pos, range: 1 };});
        } else {
            return;
        }
        //console.log(JSON.stringify(goals));

        let ret = PathFinder.search(pos, goals, {
            plainCost: 2,
            swampCost: 10,
            maxRooms: 1,
            
            roomCallback: function(roomName) {
                let room = Game.rooms[roomName];
                if (!room) return;
                let costs = new PathFinder.CostMatrix;
                
                let allStructures = room.find(FIND_STRUCTURES);
                let allWallRampStructures = _.filter(allStructures, struct => [STRUCTURE_RAMPART, STRUCTURE_WALL].includes(struct.structureType));
                let allRoads = _.filter(allStructures, struct => [STRUCTURE_ROAD, ].includes(struct.structureType));
                
                allRoads.forEach(road=>costs.set(road.pos.x, road.pos.y, 1));
                
                if (allWallRampStructures.length) {
                    let maxHP = _.max(allWallRampStructures, 'hits').hits;
                    //console.log(maxHP);
                    maxHP = Math.max(1, maxHP);
                    if (Game.shard.name=='shard2' && room.name == 'E29N12') {
                        maxHP = 3000000;
                    }
                    
                    allWallRampStructures.forEach(struct => {
                        let val = Math.floor(struct.hits / maxHP * 0xfe);
                        val = Math.max(1, Math.min(val, 0xfe));
                        costs.set(struct.pos.x, struct.pos.y, val);
                        room.visual.text(val, struct.pos.x, struct.pos.y, {font: 0.3});
                    });    
                }
                return costs;
            },
        });
        console.log(ret.incomplete, ret.path.length);
        if (ret.incomplete && ret.path.length) {
            ret.path.forEach(pos => room.visual.circle(pos));
        }
        if (!ret.incomplete && ret.path.length) {
            console.log('ret.path.length', ret.path.length);
            ret.path.forEach(pos => room.visual.circle(pos));
            let target = null;
            ret.path.some(pos => {
                return pos.lookFor(LOOK_STRUCTURES).some(struct => {
                    if (![STRUCTURE_CONTAINER, STRUCTURE_ROAD].includes(struct.structureType)) {
                        target = struct;
                        return true;
                    }
                });
            });
            console.log(room.name, target);
            if (target) {
                creep.room.memory.targetEnemyStruct = {
                  id: target.id,
                  time: Game.time,
                }
                return target;
            } else {
                if (goalStructures.length) {
                    let target = creep.pos.findClosestByRange(goalStructures);
                    if (target.id == room.controller.id) {
                        creep.room.memory.targetEnemyStruct = {
                          id: 0,
                          time: Game.time,
                        }
                        return false;
                    } else {
                        creep.room.memory.targetEnemyStruct = {
                          id: target.id,
                          time: Game.time,
                        }
                        return target;
                    }
                }
                
            }
        }
    },
    
};

module.exports = roleMassRanger;