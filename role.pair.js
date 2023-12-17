var helpers = require('helpers');
var roleInter = require('role.inter'); 

//Memory.pairs['E59N53'] = {room:'E57N47',  time: Game.time, duration: 300000, count: 1, body: {one:[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,], two:[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};
//Memory.pairs['E59N53'] = {room:'E57N47',  time: Game.time, duration: 30000, count: 1, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};
//Memory.pairs['E40N12'] = {room:'E36N9',  time: Game.time, duration: 30000, count: 1, soonDie: 400,  body: {one:b('10t15a9m15a1m'), two:b('10t5r9m25h1m')}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};
var rolePair = {
    getBody: function(pairType, bodyType) {
        if (bodyType == 'pairBusted') {
            if (pairType == 'one') {
                //return [TOUGH, ATTACK, MOVE, MOVE];
                
                //TOUGH*10,MOVE*10,ATTACK*30
                return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                MOVE,
                ];
                
                //TOUGH*12,MOVE*10,ATTACK*14,RANGED_ATTACK*14
                return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                MOVE,];
                
                
                //TOUGH*7,MOVE*10,RANGED_ATTACK*19,HEAL*14
                return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                MOVE,];
                
                //TOUGH*14,MOVE*10,RANGED_ATTACK*26
                return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];
                
            } else { //two boosted
                //return [TOUGH, HEAL, MOVE, MOVE];

                //TOUGH*8,MOVE*10,RANGED_ATTACK*1,HEAL*31
                // return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,
                // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                // HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                // MOVE];
                
                //TOUGH*10,MOVE*10,HEAL*30
                return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                MOVE,];
                
                //TOUGH*7,MOVE*10,RANGED_ATTACK*19,HEAL*14
                return [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                MOVE,];

                
            }
        } else {
            if (pairType == 'one') {
                // return [MOVE, MOVE, MOVE, ATTACK,ATTACK,ATTACK,];
                 //return [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,];
                //return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,];
                
                // //MOVE*25,ATTACK*15,RANGED_ATTACK*10
                // return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                // ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,
                // ];
                
                //MOVE*25,ATTACK*25
                return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                MOVE,];

                return [ MOVE, MOVE,ATTACK, ATTACK,];
                return [ATTACK, MOVE];
                
                
                //MOVE*25,RANGED_ATTACK*25
                return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];
                
                //MOVE*25,RANGED_ATTACK*20,HEAL*5
                return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,];
                
                    
            } else { //two
                // return [RANGED_ATTACK,RANGED_ATTACK, MOVE,MOVE,MOVE,HEAL,];
                // return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,];
                // return [
                //     RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                //     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                //     HEAL,HEAL,HEAL,HEAL];
                //return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL];
                //return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL];
            
                // //MOVE*25,RANGED_ATTACK*5,HEAL*20
                // return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                // MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                // HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,];

                // return [MOVE,MOVE,HEAL,HEAL, ];
                // return [HEAL, MOVE];
                
                //MOVE*25,HEAL*25
                return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,
                MOVE,];
                


            }
            
        }
        
    },
    getBoosts: function(pairType, bodyType) {
        if (bodyType == 'pairBusted') {
            if (pairType == 'one') {
                return [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_GHODIUM_ALKALIDE];
                // return [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID];
            } else {
                return [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, ];
                // return [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, ];
            }
        } else {
            if (pairType == 'one') {
                return [];
            } else {
                return [];
            }
        }
    },
    
    //Memory.pairs['E45N38'] = {room:'E47N39',  time: Game.time, count: 1};
    
    spawnHelpers: function (room, myRoom, freeSpawn) {
        if (Memory.pairs && freeSpawn) {
            for (helpRoom in Memory.pairs) {
                const pairTask = Memory.pairs[helpRoom];
                if (pairTask) {
                    let duration = pairTask.duration?pairTask.duration:999999999;
                    if (Game.time > pairTask.time && Game.time < pairTask.time + duration) {
                        if (pairTask.room == room.name) {
                            let soonDie = pairTask.soonDie?pairTask.soonDie:100;
                            
                            if (!pairTask.groups) {
                                pairTask.groups = [];
                            }
                            
                            let countLive = 0;
                            if (pairTask.inter && pairTask.spawnTimeList && pairTask.spawnTimeList.length >= pairTask.count && pairTask.count) {
                                let creepLiveLength = 0;
                                for (let i = 0; i < pairTask.count; i++) {
                                    let creepLiveTime = pairTask.spawnTimeList[pairTask.spawnTimeList.length - pairTask.count + i] + 1500 - soonDie;
                                    console.log('pair inter', helpRoom, 'count', pairTask.count, Game.time - creepLiveTime, Game.time < creepLiveTime);
                                    if (Game.time < creepLiveTime) { 
                                        countLive++
                                    }
                                }
                                //needSpawn = countLive < pairTask.count;
                            } else {
                                for (group of pairTask.groups){
                                    if (group.live === 0) {
                                        continue;
                                    }
                                    const one = Game.creeps[group.one];
                                    const two = Game.creeps[group.two];
                                    if (!group.one || !group.two) {
                                        group.live = 1;
                                        group.spawn = 1;
                                        countLive++;
                                    } else if (one && (one.ticksToLive> soonDie || one.spawning) && two && (two.ticksToLive> soonDie || two.spawning)) {
                                        group.live = 1;
                                        group.spawn = undefined;
                                        countLive++;
                                    } else {
                                        group.live = 0;
                                        group.spawn = undefined;
                                    }
                                }
                            }
                            
                            if (countLive < pairTask.count){
                                _.times(pairTask.count-countLive, () => { pairTask.groups.push({live:1, spawn:1})});
                                //pairTask.groups = pairTask.groups.concat(Array(pairTask.count-countLive).fill({live:1, spawn:1}));
                            }
                            
                            for (group of pairTask.groups){
                                if (!group.spawn || !freeSpawn) {
                                    continue;
                                }
                                ['one','two'].forEach(type => {
                                    if (freeSpawn && !group[type]) {
                                        let boosts = this.getBoosts(type, pairTask.boosted?'pairBusted':'pair');
                                        let body = this.getBody(type, pairTask.boosted?'pairBusted':'pair');
                                        if (pairTask.body) {
                                            body = pairTask.body[type].slice();
                                        }
                                        if (pairTask.boosts) {
                                            boosts = pairTask.boosts[type].slice();
                                        }
                                        const name = 'pr'+room.name+'_'+Game.time;
                                        const result = freeSpawn.spawnCreep(body, name, {memory: {role: 'pair', type: type, room: room.name, boosts: boosts, group: helpRoom, portal: pairTask.portal, inter: pairTask.inter, wayPoint: pairTask.wayPoint}});
                                        if (result == OK){
                                            freeSpawn = null;   
                                            group[type] = name;
                                            if (type == 'one' && (pairTask.spawnTimeList || pairTask.inter)) {
                                                if (!pairTask.spawnTimeList) {
                                                    pairTask.spawnTimeList = [];
                                                }
                                                pairTask.spawnTimeList.push(Game.time);
                                                
                                                if (pairTask.inter && pairTask.spawnTimeList.length > pairTask.count) {
                                                    pairTask.spawnTimeList = pairTask.spawnTimeList.slice(-pairTask.count);
                                                }
                                            }
                                            
                                        } else {
                                            freeSpawn = null;
                                            room.memory.spawnBusyTick = Game.time;
                                        }
                                    }
                                });
                            }
                            
                        }    
                    }
                }
            }

        }
        return freeSpawn;
    },
    
    run: function(creep) {
        if (creep.memory.inter && creep.memory.goToShardPortal && creep.memory.portal && creep.memory.portal.resetShard == Game.shard.name) {
            let pairInfo = _.get(Memory, 'pairs.'+creep.memory.group);
            if (pairInfo) {
                let one = creep.pos.findClosestByRange(FIND_MY_CREEPS, {filter: c=> c.memory.group == creep.memory.group && c.memory.role == 'pair' && c.memory.goToShardPortal && c.memory.type == 'one'});
                let two = creep.pos.findClosestByRange(FIND_MY_CREEPS, {filter: c=> c.memory.group == creep.memory.group && c.memory.role == 'pair' && c.memory.goToShardPortal && c.memory.type == 'two'});
                if (one && two) {
                    creep.say('pair_i');
                    if (!pairInfo.groups) {
                        pairInfo.groups = [];
                    }
                    if (!_.find(pairInfo.groups, group => group.one == one.name && group.two == two.name)) {
                        pairInfo.groups.push({one: one.name, two: two.name, live: 1});
                        creep.say('nfound');    
                    } else {
                        creep.say('found');    
                        one.memory.goToShardPortal = undefined;
                        two.memory.goToShardPortal = undefined;
                    }
                }
            }
        }
    },
    
    runGroups: function() {
        if (!Memory.pairs) return;
        
        for (let group in Memory.pairs) {
            const startCpuRunGroups = Game.cpu.getUsed();
            if (Memory.pairs[group] && Memory.pairs[group].groups) {
                for (creeps of Memory.pairs[group].groups) {
                    if (!creeps.die && (!creeps.spawn || Memory.pairs[group].inter)) {
                        this.runGroup(Memory.pairs[group], group, creeps);     
                    }
                }
                
                if (!(Game.time%100)) {
                    Memory.pairs[group].groups = _.filter(Memory.pairs[group].groups, (group) => !group.die);
                }
                
            }
            
            const elapsedRunGroups = Game.cpu.getUsed() - startCpuRunGroups;
            if (0 && elapsedRunGroups > 0.05) console.log('PairRunGroups '+group+' '+ elapsedRunGroups.toFixed(2));
        }
        
    },
    positionInBorder: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 1 || pos.x >48 || pos.y < 1 || pos.y > 48);
    },

    runGroup: function(group, groupName, creeps) {
        let creep = Game.creeps[creeps.one];
        let two = Game.creeps[creeps.two];
        if (!creep) {
            creep = Game.creeps[creeps.two];
            two = null;
        }
        if (!creep) {
            creeps.die = 1;
            return;
        }
        
        if (0 && groupName == 'E53N33') {
            creeps.die = 1;
            creep.memory.role = undefined;
            if (two) {
                two.memory.role = undefined;
            }
        }
        if (creep && !creep.spawning && !creep.memory.nwa) {
            creep.notifyWhenAttacked(false);
            creep.memory.nwa = 1;
        }
        if (two && !two.spawning && !two.memory.nwa) {
            two.notifyWhenAttacked(false);
            two.memory.nwa = 1;
        }

        
        if (creep && creep.memory.boosts && creep.memory.boosts.length) {
            return;
        }
        if (two && two.memory.boosts && two.memory.boosts.length) {
            if (Game.flags['Flag'+creep.memory.room+'wait']) {
                creep.moveTo(Game.flags['Flag'+creep.memory.room+'wait'], {range:2});
            }
            creep.say('w2b');
            return;
        }
        
        if (creep.memory.portal && creep.memory.portal.resetRoom && creep.room.name == creep.memory.portal.resetRoom) {
            creep.memory.portal = undefined;
            try {
                creep.moveTo(new RoomPosition(24, 24, creep.room.name), {range:5});
            } catch (e) {}
            return;
        }
        
        if (1 && two && two.memory.portal && !two.memory.portal.resetShard && two.room.name == two.memory.portal.roomName) {
            let targetPos = new RoomPosition(two.memory.portal.x, two.memory.portal.y, two.memory.portal.roomName);
            if (targetPos.isNearTo(two)) {
                two.moveTo(targetPos, {range:0});
                two.heal(two);
                return;
            }
        } 

        
        if (two && two.memory.portal && two.memory.portal.resetRoom && two.room.name == two.memory.portal.resetRoom) {
            two.memory.portal = undefined;
            try {
                two.moveTo(new RoomPosition(24, 24, two.room.name), {range:5});
            } catch (e) {}
            return;
        }

        if (creep.memory.portal && creep.memory.portal.resetShard && Game.shard.name == creep.memory.portal.resetShard) {
            creep.memory.portal = undefined;
        }
        if (!creep.memory.portal && creep.memory.wayPoint) {
            let pos = new RoomPosition(creep.memory.wayPoint.x, creep.memory.wayPoint.y, creep.memory.wayPoint.roomName)
            if (pos && creep.pos.isNearTo(pos)) {
                creep.memory.wayPoint = undefined;
                if (two) two.memory.wayPoint = undefined;
            }
        }

        
        Game.map.visual.text("🪓️",creep.pos, { fontSize:10});
        
        let sourceKeeper = 'Source Keeper';
        let flagName = 'flagPairAttack'+groupName;
        let flag = Game.flags[flagName];
        
        if (!flag) {
            flag = new RoomPosition(25,25, creep.memory.group);
            try {
                flag.createFlag(flagName);
                
            } catch (e) {}
            //return;
        }
        
        let escapePosition = Game.rooms[creep.memory.room]?Game.rooms[creep.memory.room].storage: null;
        
        if (!escapePosition /*&& creep.memory.inter*/) {
            if (!creep.memory.escapePos) {
                creep.memory.escapePos = {x: creep.pos.x, y: creep.pos.y, roomName: creep.pos.roomName};
            }
            escapePosition = new RoomPosition(creep.memory.escapePos.x, creep.memory.escapePos.y, creep.memory.escapePos.roomName);
        }
        
        if (!flag || !escapePosition) {
            creep.say('noflag');
            return;
        }
        
        if ( !flag.room  || creep.room.name != flag.room.name || (creep.memory.portal && creep.memory.portal.resetShard)) {
            if (creep.hits >= creep.hitsMax*0.9 && !creep.memory.retreat) {
                if (creep.memory.portal) {
                    // creep.say('portal');
                    let targetPos = new RoomPosition(creep.memory.portal.x, creep.memory.portal.y, creep.memory.portal.roomName);
                    this.moveTo(creep, two, targetPos, {range:0});
                    if (creep.memory.inter && creep.pos.inRangeTo(targetPos, 3)) {
                        creep.memory.goToShardPortal = 10;
                        roleInter.saveMemory(creep);
                        //roleInter.saveMemory(two);
                    }
                } else if (creep.memory.wayPoint) {
                    let targetPos = new RoomPosition(creep.memory.wayPoint.x, creep.memory.wayPoint.y, creep.memory.wayPoint.roomName);
                    this.moveTo(creep, two, targetPos);
                    creep.say('wayPoint');
                // } else if (Game.shard.name == 'shard3' && ['E40N40','E41N40','E42N40',].includes(creep.room.name)) {
                //     let pos =  new RoomPosition(2,8,'E43N40');
                //     //if (Memory.rooms.E38N25) Memory.rooms.E38N25.avoid = undefined;
                //     this.moveTo(creep, two, pos);
                } else if (Game.shard.name == 'shard3' && ['E38N24','E38N25'].includes(creep.room.name)) {
                    let pos =  new RoomPosition(41,47,'E37N25');
                    if (Memory.rooms.E38N25) Memory.rooms.E38N25.avoid = undefined;
                    this.moveTo(creep, two, pos);
                } else {
                    this.moveTo(creep, two, flag);
                }
            } else {
                this.retreat(creep, two, escapePosition);
            }
            if (creep.memory.retreat && creep.memory.retreat>0) {
                creep.memory.retreat--;
            }
            
            this.creepAttack(creep);
            if (two) {
                this.creepAttack(two);  
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
            
            
            let flagEscape = Game.flags['flagPairEscape'+creep.memory.group];
            if (flagEscape) {
                escapePosition = flagEscape;
            }

            let targetCreep;
            if (Game.shard.name == 'shard2' && creep.room.name == 'E41N12') {
                targetCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                        && object.owner.username != sourceKeeper
                        && creep.moveTo(object, {range:1}) != ERR_NO_PATH
                        && object.body.length > 1;
                    }
                });
                creep.cancelOrder('move');
            } else if (Game.shard.name == 'shard2' && creep.room.name == 'E40N30') {
                targetCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                        && object.owner.username != sourceKeeper
                        && object.owner.username != 'Montblanc'
                        && object.body.length > 1;
                    }
                });
            } else {
                targetCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                        && object.owner.username != sourceKeeper
                        && object.body.length > 1;
                    }
                });
            }
            let targetMeleeCreep;
            if (creep.room.name != 'E37N24_') {
                targetMeleeCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: function (object) {
                        return helpers.ownerNotInWhiteList(object.owner.username)
                        && object.owner.username != sourceKeeper
                        && _.filter(object.body, {type: ATTACK}).length>=1
                        //&& object.getActiveBodyparts(ATTACK)>= 1
                        && object.id !== '5f799a78a4afc6343b8549e2'
                        ;
                    }
                });
            }
            let targetStructure = this.getTargetStructure(creep);

            
          
            
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
                if (1 && creep.getActiveBodyparts(ATTACK) && creep.room.name == 'E26N28' && targetStructure) {
                    target = targetStructure;
                } else if (creep.getActiveBodyparts(WORK) && !creep.getActiveBodyparts(ATTACK) && !creep.getActiveBodyparts(RANGED_ATTACK)) {
                    target = targetStructure;
                } else if (creep.room.name == 'E45N41' && targetCreep) {
                    target = targetCreep;
                } else if (creep.pos.getRangeTo(targetCreep) <= creep.pos.getRangeTo(targetStructure)) {
                    target = targetCreep;
                } else {
                    target = targetStructure;
                }
            } else if (targetCreep) {
                target = targetCreep;
            } else if (targetStructure) {
                target = targetStructure;
            }
            
            let minHpFactor = 1;
            [creep, two].forEach(creep => {
                if (creep && creep.hits/creep.hitsMax < minHpFactor) {
                    minHpFactor = creep.hits/creep.hitsMax;
                }
            });

                
            if (target) {
                creep.say(target.id);
                
                this.creepAttack(creep);
                if (two) {
                    this.creepAttack(two);  
                }
                
                let lastTargetPos = null;
                try {
                    creep.memory.lastTargetPos = creep.memory.targetPos;
                    lastTargetPos = creep.memory.lastTargetPos?(new RoomPosition(creep.memory.lastTargetPos.x, creep.memory.lastTargetPos.y, creep.memory.lastTargetPos.roomName)):null;
                    creep.memory.targetPos = {x: target.pos.x, y: target.pos.y, roomName: target.pos.roomName};
                } catch (e) {
                    Game.notify('pairError '+ JSON.stringify(e));
                }
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
                
                
                
                if (safeModeOn) {
                    creep.memory.retreat = 6;
                }
                let retreatHpFactor = 0.85;
                if (creep.getActiveBodyparts(ATTACK)) {
                    retreatHpFactor = 0.05;
                }
                // if (minHpFactor < 1) {
                //     creep.say(minHpFactor.toFixed(2));    
                // }
                
                
                if (minHpFactor >= retreatHpFactor && !safeModeOn) {
                    
                    //creep.say(rangeToTarget+' '+rangeToTargetCreep+' '+rangeToTargetMeleeCreep);
                    //creep.say(rangeToTargetCreep);
                    let moveCloseRange = 1; //1 2 3 если один то масс атака
                    let safeDistance = 3; // если 4 то будет пляска.. если 3 то нет.
                    if (creep.getActiveBodyparts(ATTACK)) {
                        safeDistance = 1;
                    }
                    if (creep.getActiveBodyparts(ATTACK) && target && target.body && !target.getActiveBodyparts(ATTACK)) {
                        safeDistance = 0;
                        moveCloseRange = 0;
                    }
                    if (creep.getActiveBodyparts(WORK)) {
                        safeDistance = 1;
                    }
                    
                    let defendMode = false;
                    let radiusDefendMode = 0;
                    let maxradiusDefendMode = 13;
                    if (creep.room.controller && creep.room.controller.my && creep.room.controller.level >= 3 && escapePosition.pos && escapePosition.pos.roomName == creep.room.name) {
                        defendMode = true;
                        radiusDefendMode = creep.pos.getRangeTo(escapePosition);
                        creep.say('d'+radiusDefendMode);
                        //Memory.rooms.E33N9.maxradiusDefendMode = 11;
                        maxradiusDefendMode = creep.room.memory.maxradiusDefendMode?creep.room.memory.maxradiusDefendMode:maxradiusDefendMode;
                    }
                    
                    if (defendMode && radiusDefendMode > maxradiusDefendMode) {
                        this.retreat(creep, two, escapePosition);
                    } else if (rangeToTarget>moveCloseRange && rangeToTargetCreep>safeDistance) { //2 3  //идем смело
                        this.moveTo(creep, two, target, {battle:1, range: !safeDistance?0:1});
                        creep.memory.moveSlowly = safeDistance>1?1:0; 
                    } else if (rangeToTarget>moveCloseRange && rangeToTargetCreep>safeDistance-1 && !creep.memory.moveSlowly) { //2 3  //если в прошлый раз шли смело.. то один ход не будем приближаться. Может приблизятся к нам.
                        this.moveTo(creep, two, target, {battle:1});
                    } else if (rangeToTarget <= moveCloseRange && rangeToTargetCreep<safeDistance) {
                        this.retreat(creep, two, escapePosition);
                        creep.memory.retreat = 8;
                    } else if (rangeToTargetCreep < safeDistance) { 
                        this.retreat(creep, two, escapePosition);
                        creep.memory.retreat = 8;
                    } else {
                        creep.memory.moveSlowly = undefined;
                        if(creep && two && !two.pos.isNearTo(creep)) {
                            two.say('m');
                            this.tail(creep,two);
                        } else if(creep && two && two.pos.isNearTo(creep) && this.positionInBorder(two)) {
                            this.borderMove(creep,two);
                        }
                    }
                    
                } else {
                    if (escapePosition){
                        this.retreat(creep, two, escapePosition);
                    }
                }
            } else {
                let healed = false;
                if (minHpFactor < 1) {
                    this.creepAttack(creep);
                    if (two) {
                        this.creepAttack(two);  
                    }
                }
                
                if (!creep.pos.isNearTo(flag)) {
                    this.moveTo(creep, two, flag);
                }
                
                if(creep && two && !two.pos.isNearTo(creep)) {
                    two.say('m');
                    this.tail(creep,two);
                }
            }
        }
        
        
    },
    

    moveTo: function (creep, two, target, option={}) {
        if (!two ||  this.positionInBorder(creep) || (creep.pos.isNearTo(two) && !two.fatigue)) {
            if (option.battle) {
                let res = creep.moveTo(target, {reusePath: 0, range: option.range == undefined?1:option.range});
                creep.say('m'+res);
                creep.memory._trav = undefined;
            } else {
                helpers.smartMove(creep, target, 0, option.range == undefined?1:option.range);        
            }
        } else {
            creep.say('w');
        }
        this.tail(creep, two);
    },

    
    retreat: function(two, creep,  escapePosition) {
        if (!creep) {
            creep = two;
            two = null;
        }
        if (!two ||  this.positionInBorder(creep) || (creep.pos.isNearTo(two) && !two.fatigue)) {
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
                                                costMatrix.set(x, y, 50);
                                                creep.room.visual.circle(x, y, {radius: 0.15});
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
        } else {
            creep.say('wh');
        }
        this.tail(creep, two);
    },
    tail: function(creep, two) {
        if (two && creep) {
            if (two.pos.isNearTo(creep)) {
                two.move(two.pos.getDirectionTo(creep));    
            } else {
                if (two.pos.getRangeTo(creep)> 3) {
                    helpers.smartMove(two, creep);
                } else {
                    two.moveTo(creep, {reusePath: 0, range: 1});
                }
            }
        }
    },
    borderMove: function(creep, two) {
        if (two && creep) {
            if (two.pos.isNearTo(creep)) {
                if (this.positionInBorder(two)) {
                    console.log('sdsdsdsdsdsdsdsdsdsdsd borderMove pair');
                    two.moveTo(new RoomPosition(24,24,two.room.name), {reusePath: 0, range:23});
                } else {
                    two.move(two.pos.getDirectionTo(creep));    
                }
            } else {
                two.moveTo(creep, {reusePath: 0, range: 1});
            }
        }
    },
    
    sourceKeeper: 'Source Keeper_',
    
    creepAttack: function(creep, group = null) {
        let sourceKeeper = this.sourceKeeper;
        let targetCreep;
        let targetMeleeCreep;
        let enemyWoRamp = [];
        if (creep.room.name != 'E37N24_') {
            targetCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function (object) {
                    return helpers.ownerNotInWhiteList(object.owner.username)
                    //&& !(object.room.name == 'E86N54' && object.pos.x == 37 && object.pos.y == 10 )
                    && object.owner.username != sourceKeeper;
                }
            });
            targetMeleeCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function (object) {
                    return helpers.ownerNotInWhiteList(object.owner.username)
                    && object.owner.username != sourceKeeper
                    && _.filter(object.body, {type: ATTACK}).length>=1
                    //&& object.getActiveBodyparts(ATTACK)>= 1
                    ;
                }
            });
            enemyWoRamp = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3, {
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
            
        }

        let targetStructure = this.getTargetStructure(creep);
        
        
        
        
        let targetHeal = null;
        let targetHeals = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
            filter: function (object) {
                return object.hits < object.hitsMax && object.name != creep.name /*&& (object.getActiveBodyparts(ATTACK) || object.getActiveBodyparts(RANGED_ATTACK) || object.getActiveBodyparts(HEAL) )*/;
            }
        });
        if (targetHeals.length) {
            targetHeals.sort(function (a,b){return a.hits-b.hits;});   
            targetHeal = targetHeals[0];
            //targetHeal = creep.pos.findClosestByRange(targetHeals);
        } else {
            targetHeals = creep.pos.findInRange(FIND_MY_CREEPS, 3, {
                filter: function (object) {
                    return object.hits < object.hitsMax && object.name != creep.name /*&& (object.getActiveBodyparts(ATTACK) || object.getActiveBodyparts(RANGED_ATTACK) || object.getActiveBodyparts(HEAL) )*/;
                }
            });
            if (targetHeals.length) {
                targetHeal = creep.pos.findClosestByRange(targetHeals);
            }
        }
        if (targetHeal) {
            creep.memory.targetHealId = targetHeal.id;
        } else if (creep.memory.targetHealId) {
            targetHeal = Game.getObjectById(creep.memory.targetHealId);
            if (!targetHeal || !creep.pos.isNearTo(targetHeal)) {
                targetHeal = null;
            }
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
        }
        
        if (target) {
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
            let meleeAtacked = false;
            let manualTarget = Game.getObjectById('5fc25e835b185d82774feadd');//  group.mainTargetId?Game.getObjectById(group.mainTargetId):null;
            
            let enemyDamage = 0;
            enemyWoRamp.forEach(function(obj) {
                const rng = creep.pos.getRangeTo(obj);
                if (rng == 1) enemyDamage += 10;
                if (rng == 2) enemyDamage += 4;
                if (rng == 3) enemyDamage += 1;
            })
            
        

            if (creep.pos.isNearTo(target)){
                let res = creep.attack(target);
                if (res == OK) {
                    meleeAtacked = true;
                    creep.say('a');
                    
                    if (creep.room.controller && creep.room.controller.my && creep.room.memory.towerAttackedTime != Game.time) {
                        creep.say('at');
                        creep.room.find(FIND_MY_STRUCTURES).filter(s=>s.structureType == STRUCTURE_TOWER).forEach(t=>t.attack(target));
                    }
                    
                }
            }
            
            if (creep.getActiveBodyparts(WORK) && !meleeAtacked && targetStructure && creep.pos.isNearTo(targetStructure)) {
                let res = creep.dismantle(targetStructure);
                if (res == OK) {
                    meleeAtacked = true;
                    creep.say('d');
                }
            }

            
            
            if (enemyWoRamp.length > 1 && enemyDamage > 10) {
                creep.rangedMassAttack();
                rangedAtacked = true;
            } else if (enemyWoRamp.length) {
                creep.rangedAttack(enemyWoRamp[0]);    
                rangedAtacked = true;
            } else if (manualTarget && creep.pos.inRangeTo(manualTarget,3)){
                if (1 && creep.pos.inRangeTo(manualTarget,2)){
                    creep.rangedMassAttack();    
                } else {
                    creep.rangedAttack(manualTarget);        
                }
                rangedAtacked = true;
            } else {
                //creep.say(rangeToTarget);
                if (1 && rangeToTarget <= 2 && !(target.structureType && target.structureType == STRUCTURE_WALL)) { //check to wall
                    creep.rangedMassAttack();
                    rangedAtacked = true;
                } else if (rangeToTarget <= 3) {
                    creep.rangedAttack(target);    
                    // creep.rangedMassAttack();
                    rangedAtacked = true;
                } else {
                    creep.rangedMassAttack();
                    rangedAtacked = true;
                }
            }
            
            if (creep.hits >= creep.hitsMax*0.975) {
                if (targetHeal) {
                    if (creep.pos.getRangeTo(targetHeal) > 1) {
                        if (!rangedAtacked) {
                            creep.rangedHeal(targetHeal);    
                        } else if (!meleeAtacked){
                            creep.heal(creep);        
                        }
                    } else if (!meleeAtacked) {
                        creep.heal(targetHeal);
                    }
                } else if (!meleeAtacked) {
                    creep.heal(creep);
                }
            } else if (!meleeAtacked) {
                creep.heal(creep);
            }
        } else {//if target creep
            if (creep.hits >= creep.hitsMax*0.99) {
                if (targetHeal) {
                    if (creep.pos.getRangeTo(targetHeal) > 1) {
                        creep.rangedHeal(targetHeal);    
                    } else {
                        creep.heal(targetHeal);
                    }
                } else {
                    creep.heal(creep);
                }
            } else {
                creep.heal(creep);
            }        
        
        
        
            // let healed = false;
            // if (creep.hits < creep.hitsMax*0.99 && creep.getActiveBodyparts(HEAL)) {
            //     creep.heal(creep);
            //     //creep.say('h');
            //     healed = true;
            // }
        }        
    },
    
    getTargetStructure: function(creep) {
        let targetStructure = creep.pos.findClosestByRange (FIND_HOSTILE_STRUCTURES, {
            filter: function (object) {
                return helpers.ownerNotInWhiteList(object.owner.username)
                
                    && object.structureType != STRUCTURE_ROAD
                    && object.structureType != STRUCTURE_CONTAINER
                    && object.structureType != STRUCTURE_CONTROLLER
                    && object.structureType != STRUCTURE_WALL
                    //&& object.structureType != STRUCTURE_RAMPART //!!!!!!!!!!!!!!!!!!!!!!!!!!
                    //&& !(creep.room.name == 'E41N13' && object.structureType == STRUCTURE_RAMPART)
                    //&& !(creep.room.name == 'E37N13' && object.structureType == STRUCTURE_RAMPART && !Game.getObjectById('5f8d665db48c662226303efc'))
                    && object.structureType != STRUCTURE_KEEPER_LAIR
                    && object.structureType != STRUCTURE_POWER_BANK
                    && object.structureType != STRUCTURE_PORTAL
                    && !(object.structureType == STRUCTURE_INVADER_CORE && object.effects && object.effects.length && object.effects[0].effect == EFFECT_INVULNERABILITY)
                    //&& !(object.structureType == STRUCTURE_INVADER_CORE && object.level == 0)
                    //&& !(object.owner.username == 'Invader' && object.structureType == STRUCTURE_TOWER)
                    && object.id != '5f78c4cbdbed2554901184ed'
                    // && object.id != '5daf09c7613688b2aae05599'
                    // && object.id != '5dbb4758bb0248a2dea056e6'
                     && object.id != '5b230c2fe3acfd519a9edb61'
                     && object.id != '5b289062c1cf3612b5f996ee'
                    
                    ;
            }
        });
        
        if (!targetStructure) {
            targetStructure = creep.pos.findClosestByRange (FIND_HOSTILE_STRUCTURES, {
                filter: function (object) {
                    return helpers.ownerNotInWhiteList(object.owner.username)
                    
                        && object.structureType != STRUCTURE_ROAD
                        && object.structureType != STRUCTURE_CONTAINER
                        && object.structureType != STRUCTURE_CONTROLLER
                        && object.structureType != STRUCTURE_WALL
                        //&& object.structureType != STRUCTURE_RAMPART //!!!!!!!!!!!!!!!!!!!!!!!!!!
                        //&& !(creep.room.name == 'E41N13' && object.structureType == STRUCTURE_RAMPART)
                        //&& !(creep.room.name == 'E37N13' && object.structureType == STRUCTURE_RAMPART && !Game.getObjectById('5f8d665db48c662226303efc'))
                        && object.structureType != STRUCTURE_KEEPER_LAIR
                        && object.structureType != STRUCTURE_POWER_BANK
                        && object.structureType != STRUCTURE_PORTAL
                        && !(object.structureType == STRUCTURE_INVADER_CORE && object.effects && object.effects.length && object.effects[0].effect == EFFECT_INVULNERABILITY)
                        //&& !(object.structureType == STRUCTURE_INVADER_CORE && object.level == 0)
                        //&& !(object.owner.username == 'Invader' && object.structureType == STRUCTURE_TOWER)
                        && object.id != '5f78c4cbdbed2554901184ed'
                        // && object.id != '5daf09c7613688b2aae05599'
                        // && object.id != '5dbb4758bb0248a2dea056e6'
                         && object.id != '5b230c2fe3acfd519a9edb61'
                         && object.id != '5b289062c1cf3612b5f996ee'
                        
                        ;
                }
            });
            
        }
        
        let targetWallStructure = creep.pos.findClosestByRange (FIND_STRUCTURES, {
            filter:  (object)  => object.structureType == STRUCTURE_WALL && object.hits
        });

        if (1 && !targetStructure && (!creep.room.controller || !creep.room.controller.my) && targetWallStructure) {
            let rangeToStruct = targetStructure?creep.pos.getRangeTo(targetStructure):55;
            let rangeToWall = creep.pos.getRangeTo(targetWallStructure);
            if (rangeToWall < rangeToStruct) {
                targetStructure = targetWallStructure;
            } 
        }
        
        //road
        if (1 && creep.room.controller && creep.room.controller.level && !creep.room.controller.my) { // ['E59N53','E51N54','E55N52' ].includes(creep.room.name) ) {
            let targetRoadStructure = creep.pos.findClosestByRange (FIND_STRUCTURES, {
                filter:  (object)  => object.structureType == STRUCTURE_ROAD 
                 || object.structureType == STRUCTURE_CONTAINER
            });
    
            if (1 && (!creep.room.controller || !creep.room.controller.my) && targetRoadStructure) {
                let rangeToStruct = targetStructure?creep.pos.getRangeTo(targetStructure):55;
                let rangeToRoad =  creep.pos.getRangeTo(targetRoadStructure);
                if (rangeToRoad < rangeToStruct) {
                    targetStructure = targetRoadStructure;
                } 
            }
            
        }
        
        // Memory.pairs['E52N19'] = {room:'E55N21',  time: Game.time, duration: 300, count: 1, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};
        // Memory.pairs['E52N20'] = {room:'E55N21',  time: Game.time, duration: 300, count: 1, body: {one:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,], two:[TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,],}, boosts: {one:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID], two:[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ALKALIDE]}};                
     
        // if (creep.room.name == 'E46S1' && creep.memory.group == 'E47S1_') {
        //     let struct = targetStructure;
        //     targetStructure = Game.getObjectById('62b0f34ff6c1ce16c3b85ebf');
        //     if (!targetStructure) {
        //         targetStructure = Game.getObjectById('62b0fc2f73666057844fff16');
        //     }
        //     if (!targetStructure) {
        //         targetStructure = struct;
        //     } else {
        //         return targetStructure;
        //     }
        // }
        //  if (creep.room.name == 'E47S1' && creep.memory.group == 'E47S1_') {
        //     let struct = targetStructure;
        //     targetStructure = Game.getObjectById('614f90a31b61964a49e2d997');
        //     if (!targetStructure) {
        //         targetStructure = Game.getObjectById('61575f8b56965150d84ea884');
        //     }
        //     if (!targetStructure) {
        //         targetStructure = Game.getObjectById('61524740efa7408b7b6f8a82');
        //     }
        //     if (!targetStructure) {
        //         targetStructure = struct;
        //     } else {
        //         return targetStructure;
        //     }
        // }
         
        if (1 && creep.room.name == 'E28N11') {
            let struct = targetStructure;
            targetStructure = Game.getObjectById('6309b48988b8bf528b8aca07');
            //targetStructure = Game.getObjectById('6309b3bcbe0ad8ee81377bf7');
            // if (!targetStructure) {
            //     targetStructure = Game.getObjectById('64cea1441fc4c76cc1461e5f');
            // }
            // if (!targetStructure) {
            //     targetStructure = Game.getObjectById('64ce9179aad004211a217d55');
            // }
            if (!targetStructure) {
                targetStructure = struct;
            } else {
                return targetStructure;
            }
        }
       
        
        if (creep.room.controller && creep.room.controller.level && !creep.room.controller.my) {
            let struct = targetStructure;
            targetStructure = require('role.massRanger').getEnemyStruct(creep);
            if (!targetStructure) {
                targetStructure = struct;
            } else {
                creep.say('aT_inv');
                targetCreep = null;
            }
        }

        
        return targetStructure;
        
    },
    
};

module.exports = rolePair;