var helpers = require('helpers');
var roleHWDefenders = {
    
    init: function() {
        
        if (!Memory.highWayDefenders) {
            Memory.highWayDefenders = {};
        }
        if (!Memory.targetTasks) {
            Memory.targetTasks = {};
        }
        
        //!!!!!!!!!!! to new squad create flag FlagE42N28wait !! 
        //!!todo automate
        
        if (Game.shard.name == 'shard3') {
            //console.log('#########################################################################'+roleHWDefenders.createSquad('E45N28', 'E45N26'));
        }
        if (Game.shard.name == 'shard2') {
            //console.log('#########################################################################'+roleHWDefenders.createSquad('E57N25', 'E56N25'));
             //console.log('#########################################################################'+roleHWDefenders.createSquad('E55N27', 'E55N24'));
            // console.log('#########################################################################'+roleHWDefenders.createSquad('E42N28', 'E44N26')); 
            //console.log('#########################################################################'+roleHWDefenders.createSquad('E52N32', 'E54N35'));
             //console.log('#########################################################################'+roleHWDefenders.createSquad('E47N36', 'E44N34')); 
            //console.log('#########################################################################'+roleHWDefenders.createSquad('E45N11', 'E44N14'));
            //console.log('#########################################################################'+roleHWDefenders.createSquad('E41N5', 'E45N6'));
            //console.log('#########################################################################'+roleHWDefenders.createSquad('E43N25', 'E46N26')); 
            //console.log('#########################################################################'+roleHWDefenders.createSquad('E59N41', 'E54N44')); 
            //console.log('#########################################################################'+roleHWDefenders.createSquad('E57N44', 'E56N46')); 
            
        }
        
        if (Game.shard.name == 'shard0') {
            //console.log('#########################################################################'+roleHWDefenders.createSquad('E77N54', 'E76N55'));
            //console.log('#########################################################################'+roleHWDefenders.createSquad('E83N54', 'E85N54'));
            //console.log('#########################################################################'+roleHWDefenders.createSquad('E59N46', 'E55N46'));

            if (0) {
                let pointTime = 36246715+4756;
                if (!Memory.highWayDefenders.E83N54.group2){
                    Memory.highWayDefenders.E83N54.group2 = {
                        
                            spawnTime: pointTime-750,
                            target: 1,
                            melee: {
                                //TOUGH*6,MOVE*25,ATTACK*19 2.830K
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],

                                
                                //TOUGH*9,MOVE*10,ATTACK*31 3.070K
                                body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
                                
                                //TOUGH*6,MOVE*16,ATTACK*26
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
                                boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                            },
                            heal: {
                                
                                //TOUGH*6,MOVE*23,HEAL*17 5.460K
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],

                                
                                //TOUGH*9,MOVE*9,HEAL*27 7.290K
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                
                                //TOUGH*6,MOVE*10,HEAL*34 9.060K
                                body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                
                                //TOUGH*6,MOVE*16,HEAL*26
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                            },
                            ranged: {
                                // body: [MOVE, RANGED_ATTACK, HEAL, MOVE],
                                // boosts: [],
                                
                                //TOUGH*9,MOVE*9,RANGED_ATTACK*21,HEAL*6 5.190K
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                
                                
                                //TOUGH*6,MOVE*10,RANGED_ATTACK*26,HEAL*8 6.460K
                                body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                                
                                //MOVE*24,RANGED_ATTACK*18,HEAL*6
                                //body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                //boosts: [],
                            }
                        }
                    
                }
                
                if (!Memory.targetTasks[1]){
                    Memory.targetTasks[1] = {
                         targets: [
                            {flag: 'step', time: Game.time,},
                            {flag: 'step0', time: Game.time,},
                            {flag: 'step1', time: pointTime+50,},
                            {flag: 'step2', },
                            {flag: 'step3', },
                            // {flag: 'step4', },
                            // {flag: 'step5', },
                            {flag: 'FlagE83N54wait', },
                            {flag: 'FlagE83N54wait', recycle: 1},
                        ],
                        startTime: Game.time,
                    }    
                }    
            }

            if (0) {
                let pointTime = 35997721+2325;
                if (!Memory.highWayDefenders.E77N54){
                    Memory.highWayDefenders.E77N54 = {
                        group1: {
                            spawnTime: pointTime-500,
                            target: 2,
                            melee: {
                                //MOVE*17,ATTACK*33
                                body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
                                boosts: [],
                                //TOUGH*12,MOVE*10,ATTACK*28 2.86K
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
                                
                                //TOUGH*6,MOVE*25,ATTACK*19 2.830K
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
                                
                                //TOUGH*9,MOVE*16,ATTACK*23 2.730K
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
                                //boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                            },
                            heal: {
                                //MOVE*17,HEAL*33
                                body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                boosts: [],
                                //TOUGH*10,MOVE*10,HEAL*30 8.10K
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                
                                //TOUGH*6,MOVE*23,HEAL*17 5.460K
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                
                                //TOUGH*6,MOVE*16,HEAL*26
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                //boosts: [],//RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                            },
                            ranged: {
                                body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                boosts: [],
                                //TOUGH*10,MOVE*10,RANGED_ATTACK*17,HEAL*13 6.40K
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                
                                //TOUGH*6,MOVE*20,RANGED_ATTACK*10,HEAL*4 3.560K
                                //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL],
                                
                                //MOVE*17,RANGED_ATTACK*22,HEAL*11
                                //body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                                //body: [MOVE, RANGED_ATTACK, HEAL, MOVE],
                                //boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                            }
                        }
                    }
                }
                
                if (!Memory.targetTasks[2]){
                    Memory.targetTasks[2] = {
                         targets: [
                            {flag: 'fstep0', time: Game.time,},
                            {flag: 'fstep1', time: Game.time,},
                            {flag: 'fstep2', time: pointTime+50,},
                            {flag: 'FlagE77N54wait', },
                            {flag: 'FlagE77N54wait', recycle: 1},
                        ],
                        startTime: Game.time,
                    }    
                }    
            }
            
            if (0) {
                //Memory.highWayDefenders.E77N54.group2.ranged.body = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL];
                let pointTime = 35997721+2325;
                if (Memory.highWayDefenders.E77N54 && !Memory.highWayDefenders.E77N54.group3){
                    Memory.highWayDefenders.E77N54.group3 = {
                        spawnTime: pointTime-250,
                        target: 2,
                        melee: {
                            //TOUGH*12,MOVE*10,ATTACK*28 2.86K
                            body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
                            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                        },
                        heal: {
                            //TOUGH*10,MOVE*10,HEAL*30 8.10K
                            body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                        },
                        ranged: {
                            body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                            //TOUGH*10,MOVE*10,RANGED_ATTACK*17,HEAL*13 6.40K
                            //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                        }
                    }
                
                }
            }
            
            
        }
        if (Game.shard.name == 'shard2') {
            if (0){
                let pointTime = 28431032+1907;
                if (!Memory.highWayDefenders.E41N23){
                    Memory.highWayDefenders.E41N23 = {};
                }
                
                if (!Memory.highWayDefenders.E41N23.group4){
                    Memory.highWayDefenders.E41N23.group4 =  {
                        spawnTime: pointTime-550,
                        target: 1,
                        melee: { 
                            //TOUGH*8,MOVE*6,WORK*36
                            //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
                            //TOUGH*8,MOVE*10,WORK*32
                            body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
                            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID],
                        
                            //TOUGH*10,MOVE*10,ATTACK*30
                            //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
                            
                            //  body: [WORK, MOVE],
                            //  boosts: [],
                        },
                        heal: {
                            //TOUGH*8,MOVE*9,HEAL*28
                            body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE],
                            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID],
                            //TOUGH*10,MOVE*10,HEAL*30
                            // body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                             
                            // body: [HEAL, MOVE],
                            // boosts: [],
                        },
                        ranged: {
                            //TOUGH*8,MOVE*10,RANGED_ATTACK*22,HEAL*10
                            body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE],
                            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID],
                            // body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                             
                            // body: [RANGED_ATTACK, HEAL, MOVE, MOVE],
                            // boosts: [],
                        }
                    }
                }
                
                
                if (0 || !Memory.targetTasks[1]){
                    Memory.targetTasks[1] = {
                        targets: [
                            {flag: '1step', },
                            {flag: '1step1',},
                            {flag: '1step1_2', time: pointTime+10},
                            
                            {flag: '1step2', },
                            {flag: '1step3', },
                            {flag: '1step4', },
                            {flag: '1step5', },
                            {flag: '1step6', },
                            {flag: '1step7', },
                            {flag: '1step8', },
                            {flag: '1step9', },
                            {flag: '1step10', },
                            {flag: '1step11', },
                            {flag: 'FlagE41N23wait', time: 999999999999999},
                            // {flag: 'step0', time: pointTime+10 },
                            // {flag: 'step1', },
                            // {flag: 'step2', },
                            // {flag: 'step3',  },
                            // {flag: 'step4',  },
                            // {flag: 'step5',  },
                            // {flag: 'FlagE42N31group1',},
                            // {flag: 'FlagE42N31group1',  recycle: 1,},
                        ],
                        startTime: Game.time,
                    }    
                }
            }
        }
        if (Game.shard.name == 'shard3') {
            if (0){
                let pointTime = 19040822+2741;
                if (!Memory.highWayDefenders.E42N31){
                    Memory.highWayDefenders.E42N31 = {};
                }
                
                if (!Memory.highWayDefenders.E42N31.group1){
                    Memory.highWayDefenders.E42N31.group1 =  {
                        spawnTime: pointTime-450,
                        target: 1,
                        melee: { 
                            //TOUGH*8,MOVE*6,WORK*36
                            //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
                            //TOUGH*8,MOVE*10,WORK*32
                            body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
                            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID],
                        
                            //TOUGH*10,MOVE*10,ATTACK*30
                            //body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
                            
                            //  body: [WORK, MOVE],
                            //  boosts: [],
                        },
                        heal: {
                            //TOUGH*8,MOVE*9,HEAL*28
                            body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE],
                            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID],
                            //TOUGH*10,MOVE*10,HEAL*30
                            // body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                             
                            // body: [HEAL, MOVE],
                            // boosts: [],
                        },
                        ranged: {
                            //TOUGH*8,MOVE*10,RANGED_ATTACK*22,HEAL*10
                            body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE],
                            boosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID],
                            // body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
                             
                            // body: [RANGED_ATTACK, HEAL, MOVE, MOVE],
                            // boosts: [],
                        }
                    }
                }
                
                
                if (!Memory.targetTasks[1]){
                    Memory.targetTasks[1] = {
                        targets: [
                            {flag: 'step', },
                            {flag: 'step0', time: pointTime+10 },
                            {flag: 'step1', },
                            {flag: 'step2', },
                            {flag: 'FlagE42N29group1',},
                            {flag: 'FlagE42N29group1',  recycle: 1,},
                        ],
                        startTime: Game.time,
                    }    
                }
            }
        }
        
    },
    
    strongholdsFlagPositions: {
        1: {
            flags: {
                step: [4,-4],
                step0: [0,0],
                step1: [0,0,{collect: 1}],
                step2: [1,0],
            },
            //TOUGH*4,MOVE*24,ATTACK*20 2.84K
            meleeBody: [TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
            meleeBoosts: [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
            
            //TOUGH*2,MOVE*22,HEAL*20 6.12K
            healBody: [TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
            healBoosts: [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
            
            rangedBody: [MOVE, RANGED_ATTACK, HEAL, MOVE],
            rangedBoosts: [],
        },
        
        2: {
            flags: {
                step: [4,4],
                step0: [1,1],
                step1: [0,0,{collect: 1}],
                step2: [1,0],
                step3: [-1,0],
            },
            //TOUGH*9,MOVE*10,ATTACK*31 3.070K
            meleeBody: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
            meleeBoosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
            
            //TOUGH*6,MOVE*10,HEAL*34 9.060K
            healBody: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
            healBoosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
            
            rangedBody: [MOVE, RANGED_ATTACK, HEAL, MOVE],
            rangedBoosts: [],
            
        },
        
        3: {
            flags: {
                step: [4,4],
                step0: [1,1],
                step1: [0,0,{collect: 1}],
                step2: [1,-1],
                step3: [0,2],
                step4: [-2,0],
            },
            //TOUGH*9,MOVE*10,ATTACK*31 3.070K
            meleeBody: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
            meleeBoosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
            
            //TOUGH*6,MOVE*10,HEAL*34 9.060K
            healBody: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
            healBoosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
            
            // rangedBody: [MOVE, RANGED_ATTACK, HEAL, MOVE],
            // rangedBoosts: [],
            
            //TOUGH*6,MOVE*10,RANGED_ATTACK*26,HEAL*8 6.460K
            rangedBody: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
            rangedBoosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
            
        },
        4: {
            flags: {
                step: [-2,-2],
                step0: [-3,-2, {move: 1}],
                step1: [-2,-1],
                step2: [-2,-3, {move: 1}],
                step3: [-1,-2],
                step4: [-2,-2, {move: 1}],
                step5: [-1,-1],
                step4: [-2,-2, {move: 1}],
                step5: [-1,-1],
            },
            //TOUGH*20,MOVE*6,ATTACK*24 //2.42K
            meleeBody: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
            meleeBoosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
            
            //TOUGH*10,MOVE*6,HEAL*34 //8.90K
            healBody: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
            healBoosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
            
            //TOUGH*10,MOVE*6,RANGED_ATTACK*17,HEAL*17 //7.20K
            rangedBody: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],
            rangedBoosts: [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
            
        }
    },


    
    spawn: function (room, myRoom, freeSpawn, spawns) {
        //check all sector highWayDefenders
        if (freeSpawn && Memory.highWayDefenders && Memory.highWayDefenders[room.name]){
            for (let hwGroup in Memory.highWayDefenders[room.name]) {
                let hwGroupInfo = Memory.highWayDefenders[room.name][hwGroup];
                if (hwGroupInfo.spawnTime && Game.time >= hwGroupInfo.spawnTime) {
                    let body = [];
                    let name = 'hwd';
                    let type = '';
                    let boosts = [];
                    let waitEnergy = false;
                    if (!hwGroupInfo.melee || !hwGroupInfo.melee.name) {
                        type = 'melee';
                        body = hwGroupInfo.melee.body?hwGroupInfo.melee.body:[ATTACK, MOVE];
                        boosts = hwGroupInfo.melee.boosts?hwGroupInfo.melee.boosts:[];
                        name += '_m';
                        waitEnergy = true;
                    } else if (!hwGroupInfo.heal || !hwGroupInfo.heal.name) {
                        type = 'heal';
                        body = hwGroupInfo.heal.body?hwGroupInfo.heal.body:[HEAL, MOVE];
                        boosts = hwGroupInfo.heal.boosts?hwGroupInfo.heal.boosts:[];
                        name += '_h';
                        waitEnergy = true;
                    } else if (!hwGroupInfo.ranged || !hwGroupInfo.ranged.name) {
                        type = 'ranged';
                        body = hwGroupInfo.ranged.body?hwGroupInfo.ranged.body:[RANGED_ATTACK, HEAL, MOVE,MOVE];
                        boosts = hwGroupInfo.ranged.boosts?hwGroupInfo.ranged.boosts:[];
                        name += '_r';
                        waitEnergy = true;
                    }
                    
                    if (waitEnergy  && (spawns.length < 1 || room.energyAvailable < 0.6*room.energyCapacityAvailable) ) {
                        freeSpawn = null; // stop spawn another creeps;
                    } else {
                        if (freeSpawn && type) {
                            name += '_'+Game.time;
                            const result = freeSpawn.spawnCreep(body, name, {memory: {role: 'hwd', type: type, room: room.name, boosts: boosts.slice(), hwGroup: hwGroup,}});
                            if (result == OK){
                                freeSpawn = null;
                                hwGroupInfo[type]['name'] = name;
                            }
                            freeSpawn = null;
                        }
    
                    }    
                }
            }
        }
        return freeSpawn;
    },
                
    
    createSquad: function(roomName, targetRoomName) {
        const room = Game.rooms[roomName];
        if (!room) return 1;
        if (room.memory.observer == undefined){
            let observers = room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_OBSERVER }});
            if (observers.length) {
                room.memory.observer = observers[0].id;
            } else {
                room.memory.observer = 0;
            }
        }
        const observer = Game.getObjectById(room.memory.observer);
        if (!observer) return 2;
        let res = observer.observeRoom(targetRoomName);
        targetRoom = Game.rooms[targetRoomName];
        if (!targetRoom) return 3;
        const invaderCores = targetRoom.find(FIND_HOSTILE_STRUCTURES, {filter: {structureType: STRUCTURE_INVADER_CORE}});
        if (invaderCores.length) {
            const target = invaderCores[0];
            if (target.level > 0) {
                let flagName = 'core_'+roomName+'_';
                const targetInfo = roleHWDefenders.strongholdsFlagPositions[target.level];
                if (!targetInfo) return 4;
                allFlagInPosition = true;
                
                //find pos 1st flag
                let firstFlagX = target.pos.x + 4
                let firstFlagY = target.pos.y + 4;
                
                if (Game.rooms[roomName] && Game.rooms[roomName].storage) {
                    const path = target.pos.findPathTo(Game.rooms[roomName].storage, {ignoreCreeps: true, ignoreRoads: true, maxOps: 6000, range: 1});
                    if (path.length > 4) {
                        firstFlagX = path[3].x;
                        firstFlagY = path[3].y;
                    }
                }
                const firstFlagPos = new RoomPosition(firstFlagX, firstFlagY, targetRoomName);
                
                for( const flagAdd in targetInfo.flags) {
                    const flag = Game.flags[flagName+flagAdd];
                    const dx = targetInfo.flags[flagAdd][0];
                    const dy = targetInfo.flags[flagAdd][1];
                    let newFlagPos = null;
                    if (flagAdd == 'step' && firstFlagPos) {
                        newFlagPos = firstFlagPos;
                    } else {
                        newFlagPos = new RoomPosition(target.pos.x + dx, target.pos.y + dy, targetRoomName);
                    }
                    
                    if (!flag) {
                        newFlagPos.createFlag(flagName+flagAdd);
                        allFlagInPosition = false;
                    } else if (!flag.pos.isEqualTo(newFlagPos)) {
                        flag.setPosition(newFlagPos);
                        allFlagInPosition = false;
                    }
                }
                if (!allFlagInPosition) return 5;
                let pointTime = 0;
                let noWaitToSpawn = false;
                if (target.effects.length && target.effects[0].effect == EFFECT_COLLAPSE_TIMER && target.effects[0].ticksRemaining > 1500) {
                    pointTime = Game.time + target.effects[0].ticksRemaining;   
                    noWaitToSpawn = true;
                }
                
                if (target.effects.length && target.effects[0].effect == EFFECT_INVULNERABILITY && target.effects[0].ticksRemaining > 10) {
                    pointTime = Game.time + target.effects[0].ticksRemaining;    
                }
                
                if (!pointTime) {
                    return 6;
                }
                
                
                const targetTaskId = targetRoomName+'_'+pointTime;
                if (!Memory.targetTasks[targetTaskId]) {
                    let newTask = {
                        startTime: Game.time,
                        targets: [],
                    };
                    let i = 0;
                    for(const flagAdd in targetInfo.flags) {
                        const taskFlagName = flagName+flagAdd;
                        if (i == 1) {
                            newTask.targets.push({flag: taskFlagName, time: noWaitToSpawn ? Game.time : pointTime + 1})    
                        } else {
                            let flagTask = this.clone(targetInfo.flags[flagAdd][2]);
                            if (flagTask) {
                                flagTask.flag = taskFlagName;
                                newTask.targets.push(flagTask);    
                            } else {
                                newTask.targets.push({flag: taskFlagName})        
                            }
                        }
                        i++;
                    }
                    const flagWait = 'Flag'+roomName+'wait';
                    if (!Game.flags[flagWait]) {
                        Game.notify('no WAIT flag in room '+roomName);
                    }
                    
                    newTask.targets.push({flag: flagWait});
                    newTask.targets.push({flag: flagWait, recycle: 1});
                    Memory.targetTasks[targetTaskId] = newTask;
                    return 7;
                } 
                const groupId = targetTaskId;
                if (!Memory.highWayDefenders[roomName]) {
                    Memory.highWayDefenders[roomName] = {};
                }
                
                if (!Memory.highWayDefenders[roomName][groupId]) {
                    let newGroup = {
                        spawnTime: noWaitToSpawn ? Game.time : pointTime-750,
                        target: targetTaskId,
                        melee: {
                            body: targetInfo.meleeBody,
                            boosts: targetInfo.meleeBoosts,
                        },
                        heal: {
                            body: targetInfo.healBody,
                            boosts: targetInfo.healBoosts,
                        },
                        ranged: {
                            body: targetInfo.rangedBody,
                            boosts: targetInfo.rangedBoosts,
                        },
                        
                    }
                    Memory.highWayDefenders[roomName][groupId] = newGroup;
                    return 8;
                } 
                
                //check lab boosts
                if (room.memory.boostLab && !room.memory.boostLab.strongholds) {
                    return 9
                }
                
                
                if (!room.memory.boostLab) {
                    let labs = room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_LAB }});
                    let neededBoosts = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ];
                    labs.forEach((lab) => {
                        let index = neededBoosts.indexOf(lab.mineralType);
                        if (index>=0) {
                            neededBoosts.splice(index, 1);
                        } 
                    });
                    if (neededBoosts.length) {
                        room.memory.boostLab = {boosts:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, ],
                        time: (noWaitToSpawn ? Game.time+5000 : pointTime-750+1000), strongholds: 1};
                        console.log(pointTime, Game.time);
                    }
                }
                
                return 100;
            }
            
        }
        
        return -1;
    },
    clone: function(object) {
        return require('fastest-json-copy').copy(object);
    },

    run: function(creep) {
        
        if (!creep.memory.nwa) {
            creep.notifyWhenAttacked(false);
            creep.memory.nwa = 1;
        }

        
        let groupInfo = Memory.highWayDefenders[creep.memory.room][creep.memory.hwGroup];
        if (!groupInfo) return;
        let groupRole = creep.memory.type;
        let partner1 = null;
        let partner2 = null;
        let forward = true;
        
        if (!groupInfo['heal'] || !groupInfo['ranged'] || !groupInfo['melee']){
            creep.say('no');
        } else {
            partner1 = Game.creeps[groupInfo['heal']['name']];
            partner2 = Game.creeps[groupInfo['ranged']['name']];
            
            if (groupRole == 'melee') {
                
            } else if (groupRole == 'heal') {
                forward = false;
                partner1 = Game.creeps[groupInfo['melee']['name']];
                if (!partner1) {
                    partner1 = partner2;
                }
                if (!partner1) {
                   forward = true;
                }
            } else if (groupRole == 'ranged') {
                forward = false;
                partner2 = Game.creeps[groupInfo['melee']['name']];
                if (!partner2){
                    forward = true;
                }
                if (!partner1) {
                    forward = true;
                    partner1 = partner2;
                }
                
            }    
        }
        
        
        
        //creep.say('hwd');
        
        
        
        if (!groupInfo.grouped) {
            //creep.say('grouping');
            if (creep.memory.grouped && partner1 && partner1.memory.grouped && partner2 && partner2.memory.grouped) {
                groupInfo.grouped = 1;
            } else {
                let waitPlacePos = new RoomPosition(20,20,creep.memory.room);
                let waitPlaceFlag = Game.flags['Flag'+creep.memory.room+'wait'];
                if (waitPlaceFlag) {
                    waitPlacePos = waitPlaceFlag.pos;
                }
                helpers.smartMove(creep, waitPlacePos,0);
                
                
                if (creep.pos.inRangeTo(waitPlacePos, 3) && partner1 && creep.pos.inRangeTo(partner1,2) && partner2 && creep.pos.inRangeTo(partner2,2)) {
                    creep.memory.grouped = 1;
                }
            }
            return;
        } else {
          //  creep.say('hwd gr');
        }
        
        
        
        let target = Game.flags['Flag'+creep.memory.room+creep.memory.hwGroup];
        
        if (groupInfo.target && Memory.targetTasks && Memory.targetTasks[groupInfo.target]){
            let targetsInfo =  Memory.targetTasks[groupInfo.target];
            let startTime = targetsInfo.startTime?targetsInfo.startTime:Game.time;
            let index = groupInfo.targetIndex?groupInfo.targetIndex:0;
            let curentTarget = Memory.targetTasks[groupInfo.target]['targets'][index];
            if (curentTarget && Game.time >= startTime && (!curentTarget.time || Game.time>=curentTarget.time)) {
                target = Game.flags[curentTarget.flag];
                groupInfo.targetIndex = index;
                if (curentTarget.recycle) {
                    groupInfo.recycle = 1;
                }
                if (curentTarget.collect) {
                    if (!Memory.collectWork) Memory.collectWork = {};
                    if (!Memory.collectWork[creep.memory.room]) Memory.collectWork[creep.memory.room] = {};
                    Memory.collectWork[creep.memory.room][Game.time] = {x: target.pos.x, y: target.pos.y, roomName: target.pos.roomName};
                    curentTarget.collect = 0;
                }

                // if (creep.pos.isNearTo(target)){
                //     index++;
                //     groupInfo.targetIndex = index;
                // }
            } else {
                if (curentTarget && curentTarget.time && Game.time < curentTarget.time) {
                    //creep.say(curentTarget.time - Game.time);
                }
                //groupInfo.targetIndex = 0;
            }
        }
        
        if (groupInfo.recycle) {
            creep.memory.role = undefined;
            return;
        }
        
        if (!target) {
            //creep.say('notarget');
            return;
        }
        
        let inBorder = creep.pos.x == 49 || creep.pos.y == 49 || creep.pos.x == 0 || creep.pos.y == 0;
        if (!inBorder && partner1 && (partner1.pos.x == 49 || partner1.pos.y == 49 || partner1.pos.x == 0 || partner1.pos.y == 0)) {
            inBorder = true;
        }
        if (inBorder || !partner1 || creep.pos.isNearTo(partner1) || (groupRole == 'ranged' && creep.pos.isNearTo(partner2))) {
            groupInfo[groupRole]['close'] = 1;
            //creep.say('cl');
        } else {
            groupInfo[groupRole]['close'] = 0;
            creep.say('fa');
        }
        
        let allClose = groupInfo['melee'].close && groupInfo['heal'].close && groupInfo['ranged'].close;
        
        if (!allClose) {
            ['melee', 'heal', 'ranged'].forEach(type => {
                let creep = Game.creeps[groupInfo[type].name];
                if (!creep && !groupInfo[type].close) {
                    groupInfo[type].close = 1;
                }
            });
            allClose = groupInfo['melee'].close && groupInfo['heal'].close && groupInfo['ranged'].close;
        }
        
        let rangeToTarget = creep.pos.getRangeTo(target);
        
        if (forward) {
            if (inBorder || (allClose && rangeToTarget>1)) {
                if (!partner1 || !partner1.fatigue) {
                    helpers.smartMove(creep, target,0);        
                } else {
                    creep.say('fat');
                }
            }
        } else {
            if (0 && groupRole == 'ranged' && rangeToTarget <= 3 && partner2 && partner2.pos.isNearTo(target)){
                creep.moveTo(partner2, {ignoreCreeps: false})    
            } else {
                creep.moveTo(partner1, {ignoreCreeps: true})    
            }
            
        }
        
        if (groupRole == 'melee' || forward){
            
            //  let sayInfo = ['Non-coding','players','unwelcome'];
            //  creep.say(sayInfo[Game.time%sayInfo.length], creep.room.name == 'E42N29');
        
            let enemy = null;
            var found = creep.room.lookForAt(LOOK_STRUCTURES, target);
            found.forEach(function (lookObject) {
                if (lookObject.structureType != STRUCTURE_ROAD && lookObject.structureType != STRUCTURE_KEEPER_LAIR && lookObject.structureType != STRUCTURE_CONTAINER && !lookObject.my) {
                    enemy = lookObject;
                }
            });
            if (!enemy){
                if (creep.pos.isNearTo(target) && groupInfo.targetIndex != undefined){
                    let targetsInfo =  Memory.targetTasks[groupInfo.target].targets;
                    let index = groupInfo.targetIndex?groupInfo.targetIndex:0;
                    index ++ ;
                    if (targetsInfo[index] && (!targetsInfo[index].time || Game.time >= targetsInfo[index].time)){
                        groupInfo.targetIndex = index;
                    } else {
                        if (targetsInfo[index] && targetsInfo[index].time) {
                            //creep.say(targetsInfo[index].time-Game.time);
                        }
                    }
                }
                
                enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: function (object) {
                        return object.owner.username != 'Darking';
                    }
                });
            }
            if (enemy) {
                let enemyRange = creep.pos.getRangeTo(enemy);
                if (groupRole == 'melee' && enemyRange == 1) {
                    if (creep.getActiveBodyparts(ATTACK)){
                        creep.attack(enemy);    
                    } else if (creep.getActiveBodyparts(WORK)){
                        creep.dismantle(enemy);
                    }
                    
                    groupInfo.targetId = enemy.id;
                }
                if (groupRole == 'ranged') {
                    let enemyWoRamp = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {
                        filter: function (object) {
                            let onRamp = false;
                            object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                                if (lookObject.structureType == STRUCTURE_RAMPART) {
                                    onRamp = true;
                                }
                            });
                            return object.owner.username != 'Darking' && !onRamp;
                        }
                    });
                    if (enemyWoRamp.length) {
                        creep.rangedAttack(enemyWoRamp[0]);    
                    } else if (enemyRange <=3) {
                        creep.rangedAttack(enemy);
                    }
                }
            }    
        }
        
        if (groupRole == 'ranged'){
            let enemy = null;
            if (groupInfo.targetId) {
                enemy = Game.getObjectById(groupInfo.targetId);
                if (!enemy || creep.pos.getRangeTo(enemy) > 3) {
                    enemy = null;
                }
            }
            
            let enemyCreeps = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {
                filter: function (object) {
                    return object.owner.username != 'Darking';
                }
            });
            let enemyWoRamp = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {
                filter: function (object) {
                    let onRamp = false;
                    object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                        if (lookObject.structureType == STRUCTURE_RAMPART) {
                            onRamp = true;
                        }
                    });
                    return object.owner.username != 'Darking' && !onRamp;
                }
            });
            let structureWoRamp = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 3, {
                filter: function (object) {
                    let onRamp = false;
                    object.pos.lookFor(LOOK_STRUCTURES).forEach(function (lookObject) {
                        if (lookObject.structureType == STRUCTURE_RAMPART) {
                            onRamp = true;
                        }
                    });
                    return object.owner.username != 'Darking' && !onRamp
                        && object.structureType != STRUCTURE_ROAD
                        && object.structureType != STRUCTURE_CONTAINER
                        && object.structureType != STRUCTURE_CONTROLLER
                        && object.structureType != STRUCTURE_RAMPART
                        && object.structureType != STRUCTURE_KEEPER_LAIR
                    ;
                }
            });
            
            let enemyDamage = 0;
            enemyWoRamp.forEach(function(obj) {
                const rng = creep.pos.getRangeTo(obj);
                if (rng == 1) enemyDamage += 10;
                if (rng == 2) enemyDamage += 4;
                if (rng == 3) enemyDamage += 1;
            })
            
            let structureDamage = 0;
            structureWoRamp.forEach(function(obj) {
                const rng = creep.pos.getRangeTo(obj);
                if (rng == 1) structureDamage += 10;
                if (rng == 2) structureDamage += 4;
                if (rng == 3) structureDamage += 1;
            })
            
            
            if (enemyWoRamp.length && enemyDamage > 10) {
                creep.rangedMassAttack();
            } else if (enemyWoRamp.length) {
                creep.rangedAttack(enemyWoRamp[0]);    
            // } else if (!enemy && enemyCreeps.length) {
            //     if (enemyCreeps.length == 1) {
            //         enemy = enemyCreeps[0];//creep.pos.findClosestByRange(enemyCreeps);
            //         creep.rangedAttack(enemy);
            //         //!todo check ramparts enemy
            //     } else {
            //         creep.rangedMassAttack();
            //         enemy = null;
            //     }
            } else if (structureWoRamp.length && structureDamage > 10) {
                creep.say(structureWoRamp.length+' '+structureDamage);
                creep.rangedMassAttack();
            } else if (structureWoRamp.length) {
                creep.say(structureWoRamp.length+' '+structureDamage);
                creep.rangedAttack(structureWoRamp[0]);  
            } else if (enemy) {
                creep.rangedAttack(enemy);
                //creep.rangedMassAttack();
            }
        }
        
        if (groupRole == 'heal' || groupRole == 'ranged') {
            let healTarget = null;
            if (partner1 && creep.pos.inRangeTo(partner1, 3)) {
                healTarget = partner1;
            }
            if (partner1 && partner2 && creep.pos.inRangeTo(partner2, 3) && partner1.hits == partner1.hitsMax && partner2.hits < partner2.hitsMax) {
                healTarget = partner2;
            }
            if (healTarget && healTarget.hits == healTarget.hitsMax && creep.hits < creep.hitsMax) {
                healTarget = creep;
            }
            
            if (!healTarget || !creep.pos.inRangeTo(healTarget, 3)){
                creep.heal(creep);
            } else {
                if (creep.pos.isNearTo(healTarget)) {
                    creep.heal(healTarget);    
                } else {
                    creep.rangedHeal(healTarget);
                }
            }
        }
        
        
        
        
        
        

        
        
    }
};

module.exports = roleHWDefenders;