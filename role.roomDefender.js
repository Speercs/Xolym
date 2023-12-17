var helpers = require('helpers');
var roleRoomDefender = {
    init: function() {
    },
    // getBody: {
    //     //melee: [ATTACK, MOVE],
    //     //ranged: [RANGED_ATTACK, MOVE],
    //     melee: [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,],
    //     ranged: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,],
    //     //[RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    // },

    getBody: function(spawnName, type) {

        if (!Game.spawns[spawnName]) return [MOVE,MOVE,ATTACK,ATTACK];
        const room = Game.spawns[spawnName].room;
        if (!room) return [MOVE,MOVE,ATTACK,ATTACK];
        let cap = room.energyCapacityAvailable;

        // if (room.name == 'E13N18' && Game.time < 172105+3500) { //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //     return [MOVE,MOVE];
        // }

        if (cap >= 3770 && type == 'melee') return [
            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
            ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
            ATTACK,ATTACK,ATTACK,ATTACK,
            RANGED_ATTACK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];

        if (cap >= 2230 && type == 'melee') return [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*11,ATTACK*21
        if (cap >= 1680 && type == 'melee') return [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*8,ATTACK*16
        if (cap >= 1260 && type == 'melee') return [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,]; //MOVE*6,ATTACK*12
        if (cap >= 780  && type == 'melee') return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]; //MOVE*6,ATTACK*6
        if (cap >= 260  && type == 'melee') return [MOVE,ATTACK,ATTACK,MOVE,]; //MOVE*2,ATTACK*2

        if (cap >= 5600 && type == 'ranged') return [
            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
            RANGED_ATTACK,RANGED_ATTACK,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,];

        if (cap >= 2300 && type == 'ranged') return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
        if (cap >= 1750 && type == 'ranged') return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,];
        if (cap >= 1250 && type == 'ranged') return [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,];
        if (cap >= 300 && type == 'ranged') return [RANGED_ATTACK,MOVE,];

    },

    getObstacles: function(roomName) {
        try {
            const shardCfg = require(Game.shard.name+'.cfg');
            if (shardCfg && shardCfg.getObstacles && shardCfg.getObstacles[roomName]) {
                return shardCfg.getObstacles[roomName];
            }
            return false;
        } catch (e) {
        }
        return false;
    },

    getCostMatrix: function(roomName) {
        let room = Game.rooms[roomName];
        // In this example `room` will always exist, but since
        // PathFinder supports searches which span multiple rooms
        // you should be careful!
        if (!room) return;
        let costs = null;
        room.memory.defCostMatrixTime = Game.time;
        if (1 && room.memory.defCostMatrix) {
            costs = PathFinder.CostMatrix.deserialize(room.memory.defCostMatrix)
        } else {
            costs = new PathFinder.CostMatrix;
            room.find(FIND_STRUCTURES).forEach(function(struct) {
                if (struct.structureType === STRUCTURE_ROAD) {
                    costs.set(struct.pos.x, struct.pos.y, 1);
                } else if (struct.structureType !== STRUCTURE_CONTAINER && (struct.structureType !== STRUCTURE_RAMPART || !struct.my)) {
                    costs.set(struct.pos.x, struct.pos.y, 255);
                }
            });
            if (roleRoomDefender.getObstacles(roomName)) {
                roleRoomDefender.getObstacles(roomName).forEach( pos => costs.set(pos.x, pos.y, 0xff));
                room.memory.defCostMatrix = costs.serialize();
                console.log(costs.serialize());
            }
        }

        if (0) {
            // Avoid creeps in the room
            room.find(FIND_CREEPS).forEach(function(creep) {
                costs.set(creep.pos.x, creep.pos.y, 255);
            });
        }


        return costs;

    },

    getChebyshevDist: function(pos1, pos2) {
        return Math.max( Math.abs((pos1.x-pos2.x)), Math.abs((pos1.y-pos2.y)) );
    },
    getEuclidDist: function(pos1, pos2) {
        return Math.hypot( pos1.x - pos2.x, pos1.y - pos2.y );
    },

    move: function(creep, target, range) {
        if (!target) return {};
        if (creep.pos.inRangeTo(target, range)) return {};

        // if (creep.memory.swapCreepTime && Game.time == creep.memory.swapCreepTime) {
        //     //we moved
        //     return {};
        // }
        let targetPos = target.pos?target.pos:target;


        let goal =  { pos: targetPos, range: range };
        let ret = PathFinder.search(
            creep.pos, goal,
            {
                // We need to set the defaults costs higher so that we
                // can set the road cost lower in `roomCallback`
                plainCost: 2,
                swampCost: 10,
                roomCallback: this.getCostMatrix,
            }
        );

        if (ret.path.length) {
            ret.path.forEach(pos=>creep.room.visual.circle(pos));
        }


        if (ret.incomplete && ret.path.length){
            let pos = ret.path[ret.path.length - 1];
            if (pos) {
                let curentRange = this.getEuclidDist(creep.pos, target.pos?target.pos:target);
                let newRange = this.getEuclidDist(pos, target.pos?target.pos:target);
                if (newRange > curentRange) {
                    ret.path[0] = null;
                    creep.say('t');
                    creep.memory.defendMove = Game.time;
                    creep.memory.defendMoveRange = curentRange;
                } else {
                    creep.say(curentRange+' '+ newRange);
                }
            }
        }

        let pos = ret.path[0];
        if (pos){
            let obstacleCreeps = pos.lookFor(LOOK_CREEPS);
            let obstCreep = obstacleCreeps.length?obstacleCreeps[0]:null;
            if (obstCreep && obstCreep.my) {
                let doMoveObstacle = true;
                if (obstCreep.memory.defendMove && Game.time - 2 <= obstCreep.memory.defendMove ) {
                    //creep moving
                    if (obstCreep.ticksToLive < creep.ticksToLive) {
                        doMoveObstacle = false;
                    }

                }
                let curentRange = this.getEuclidDist(creep.pos, target.pos?target.pos:target);
                if (obstCreep.memory.defendMoveRange &&  curentRange > obstCreep.memory.defendMoveRange ) {
                    doMoveObstacle = false;
                }
                if (obstCreep.memory.role == 'wallbuilder') {
                    doMoveObstacle = true;
                }

                if (doMoveObstacle) {
                    obstCreep.move(obstCreep.pos.getDirectionTo(creep));
                }
            }

            // if (obstacleCreeps.length && creep.memory.swapCreepId && creep.memory.swapCreepId == obstacleCreeps[0].id) {
            //     //he move us
            //     obstacleCreeps = [];
            // }
            // if (obstacleCreeps.length && obstacleCreeps[0].memory.swapCreepTime && Game.time == obstacleCreeps[0].memory.swapCreepTime) {
            //     //already move this tick
            //     obstacleCreeps = [];
            // }

            // if (obstacleCreeps.length && obstacleCreeps[0].my) {
            //     obstacleCreeps[0].move(obstacleCreeps[0].pos.getDirectionTo(creep));
            //     obstacleCreeps[0].say('s');
            //     obstacleCreeps[0].memory.swapCreepId = creep.id;
            //     obstacleCreeps[0].memory.swapCreepTime = Game.time;

            // }
        }
        if (pos) {
            creep.move(creep.pos.getDirectionTo(pos));
            creep.memory.defendMove = Game.time;
            creep.memory.defendMoveRange = this.getEuclidDist(creep.pos, target.pos?target.pos:target);
        }
        return ret;
    },

    visual: function(room) {
        require('profiler').start('defendVisual');
        if (Memory.mapVisual && Game.cpu.bucket > 6000) {
            let obstacles = this.getObstacles(room.name);
            if (obstacles) {
                obstacles.forEach(
                    pos => room.visual.circle(pos.x, pos.y, {radius: 0.05})
                );
            }
        }
        if (!(Game.time%100) && room.memory.defCostMatrix && ((room.memory.defCostMatrixTime && Game.time > room.memory.defCostMatrixTime + 2000) || !room.memory.defCostMatrixTime) ) {
            delete room.memory.defCostMatrix;
            delete room.memory.defCostMatrixTime;
        }
        require('profiler').end('defendVisual');
    },

    run: function(creep) {
        //creep.say('111');
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: function(object) {return object.owner.username != 'Darking';}
        });

        if (0 && creep.room.name == 'E39N28' && Game.creeps.mrE39N28_37284422) {
            hostiles = [Game.creeps.mrE39N28_37284422];
            console.log('test target!!!!!!!!!!!!!!');
        }

        //creep.say(hostiles.length);
        if (hostiles.length) {
            let target = creep.pos.findClosestByPath(hostiles);
            this.move(creep, target, 1);
            if (creep.getActiveBodyparts(ATTACK) && creep.pos.isNearTo(target)) {
                creep.attack(target);
            }

            let massTarget = creep.pos.findInRange(hostiles, 3);
            if (creep.getActiveBodyparts(RANGED_ATTACK)) {
                if (massTarget.length > 1) {
                    let closeTarget = creep.pos.findClosestByRange(massTarget);
                    if (!creep.pos.isNearTo(closeTarget)){
                        creep.rangedAttack(closeTarget);
                    } else {
                        creep.rangedMassAttack();
                    }

                } else {
                    creep.rangedAttack(target);
                }
            }

            if (!(Game.time%10) && !creep.body[0].boost && creep.memory.copyBoosts) {
                creep.memory.boosts = creep.memory.copyBoosts;
            }
        }



        // let target = Game.flags['FlagTest'];
        // if (target){
        //     this.move(creep, target, 1);
        // }

    },

    calcTowerDmgAtRange: function(distance) {
        // TOWER_POWER_ATTACK: 600,
        // TOWER_OPTIMAL_RANGE: 5,
        // TOWER_FALLOFF_RANGE: 20,
        // TOWER_FALLOFF: 0.75,

        let towerRangeImpactFactor = 1;
        if(distance <= TOWER_OPTIMAL_RANGE) {
            towerRangeImpactFactor = 1;
        } else if (distance >= TOWER_FALLOFF_RANGE) {
            towerRangeImpactFactor = 1 - TOWER_FALLOFF
        } else {
            let towerFalloffPerTile = TOWER_FALLOFF / (TOWER_FALLOFF_RANGE - TOWER_OPTIMAL_RANGE)
            towerRangeImpactFactor =  1 - (distance - TOWER_OPTIMAL_RANGE) * towerFalloffPerTile
        }

        return TOWER_POWER_ATTACK * towerRangeImpactFactor;
    },
    smartTowersAttack: function(room, towers = false, hostiles = false) {
        const startCpu = Game.cpu.getUsed();
        let findMode = FIND_HOSTILE_CREEPS;

        if (!hostiles) {
            hostiles = room.find(findMode);
        }
        if (!towers) {
            towers = room.find(FIND_MY_STRUCTURES, {filter: (obj) => obj.structureType == STRUCTURE_TOWER && obj.store[RESOURCE_ENERGY] >= 10 });
        }
        let sortedHostiles = hostiles
            .map((hostile) => {
                let hostilePotentialRecovery = hostile.pos.findInRange(findMode, 1)
                    .map((c) => {
                        return _.filter(c.body, {type: HEAL})
                            .map((b) => {
                                switch (b.boost) {
                                    case RESOURCE_LEMERGIUM_OXIDE:
                                        return 2 * HEAL_POWER
                                    case RESOURCE_LEMERGIUM_ALKALIDE:
                                        return 3 * HEAL_POWER
                                    case RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE:
                                        return 4 * HEAL_POWER
                                    default:
                                        return HEAL_POWER;
                                }
                            }).reduce((h1, h2) => { return h1 + h2 }, 0)
                    }).reduce((th1, th2) => { return th1 + th2 }, 0)
                return { creep: hostile, potentialRecovery: hostilePotentialRecovery }
            })
            .map((hostile) => {
                let dmgByTowers = towers.map((t) => { return t.pos.getRangeTo(hostile.creep) })
                    .map((dist) => { return this.calcTowerDmgAtRange(dist) }).reduce((d1, d2) => { return d1 + d2 }, 0)
                return { hostile: hostile.creep, potentialRecovery: hostile.potentialRecovery, potentialTowerDmg: dmgByTowers }
            })
            .map((hostile) => {
                let actualDmg = 0;
                let towerDmg = hostile.potentialTowerDmg;
                let damageReduction = hostile.hostile.body.forEach((b) => {
                    if (towerDmg > 0) {
                        let k = 1;
                        if (b.type == TOUGH) {
                            switch (b.boost) {
                                case RESOURCE_GHODIUM_OXIDE:
                                    k = 0.7;
                                    break;
                                case RESOURCE_GHODIUM_ALKALIDE:
                                    k = 0.5;
                                    break;
                                case RESOURCE_CATALYZED_GHODIUM_ALKALIDE:
                                    k = 0.3;
                                    break;
                                default:
                                    k = 1;
                            }
                        }

                        towerDmg -= (b.hits / k);
                        if (towerDmg >= 0) {
                            actualDmg += b.hits;
                        } else {
                            towerDmg += (b.hits / k);
                            let newHits = b.hits - towerDmg * k;
                            actualDmg += (b.hits - newHits);
                            towerDmg -= (b.hits / k);
                        }
                    }
                });
                if (towerDmg>0) {
                    actualDmg += towerDmg;
                }
                return { hostile: hostile.hostile, potentialRecovery: hostile.potentialRecovery, potentialTowerDmg: hostile.potentialTowerDmg, actualTowerDmg:  actualDmg, hitsLeft: hostile.hostile.hits - actualDmg +  hostile.potentialRecovery};
            })
            .sort((h1, h2) => {
                return h1.hitsLeft - h2.hitsLeft;
            })
            .sort((h1, h2) => {
                return (h2.actualTowerDmg - h2.potentialRecovery) - (h1.actualTowerDmg - h1.potentialRecovery)
            });


        const elapsed = Game.cpu.getUsed() - startCpu;
        console.log('smartTowersAttackCPU '+ elapsed.toFixed(2));

        sortedHostiles.forEach(hostileInfo => {
            let creep = hostileInfo.hostile;
            if (creep) {
                //room.visual.text(hostileInfo.potentialTowerDmg+' '+hostileInfo.potentialRecovery+' '+hostileInfo.actualTowerDmg+' '+hostileInfo.hitsLeft,  creep.pos);
                room.visual.text(hostileInfo.actualTowerDmg - hostileInfo.potentialRecovery,  creep.pos);
            }
        });

        try {
            sortedHostiles = sortedHostiles.filter(h => !this.positionInNearBorder(h.hostile));
        } catch (e) {}
        
        
        if (sortedHostiles.length) {
            let target = sortedHostiles[0].hostile;
            room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
            if ((sortedHostiles[0].actualTowerDmg - sortedHostiles[0].potentialRecovery) > 0) {
                towers.forEach((tower)=> tower.attack(target));
                room.memory.towerAttackedTime = Game.time;
                return 1;
            }
        }
        return 0;
    },
    
    positionInBorder: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 1 || pos.x >48 || pos.y < 1 || pos.y > 48);
    },
    positionInNearBorder: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 2 || pos.x >47 || pos.y < 2 || pos.y > 47);
    },
    positionInNearBorder2: function(target){
        let pos = target.pos?target.pos:target;
        return (pos.x < 3 || pos.x >46 || pos.y < 3 || pos.y > 46);
    },


    defendRoom: function(roomName) {

        let testMode = 0 && Game.shard.name == 'shard3' && roomName == 'E39N28';

        const room = Game.rooms[roomName];
        if (!room) return;
        var hostiles = room.find(FIND_HOSTILE_CREEPS
            //,{filter: function(object) {return object.body.length>1}}
            //,{filter: function(object) {return object.owner.username != 'Darking';}}
        );
        let hostilesPowerCreeps = room.find(FIND_HOSTILE_POWER_CREEPS);

        if (!room.memory.defCountEnemy) {
            room.memory.defCountEnemy = 0;
        }

        if (testMode) {
            hostiles = [{
                id: 'dd',
                owner: {username: 'blabla'},
                body: [{type:ATTACK}],
                getActiveBodyparts: function(b){return 1},

            }]
        }


        if (hostiles.length > 0 || testMode) {

            let filteredHostile = hostiles.filter(creep => _.some(creep.body, part => [WORK, ATTACK, RANGED_ATTACK, HEAL].includes(part.type)));
            let username = hostiles[0].owner.username;
            if (filteredHostile.length && username !== 'Invader') {
                room.memory.defCountEnemy += 2;
                console.log('room ATTACKED ',helpers.getRoomLink(roomName), room.memory.defCountEnemy, '/', 40);
                if (room.memory.defCountEnemy > 40 && !room.memory.defendRoomMode) {
                    Game.notify(`SET ON Defend Room Mode in room ${roomName}`, 0);
                    room.memory.defendRoomMode = 1;
                    room.memory.defCountEnemy += 500;

                    if (room.controller.level >= 6 && room.memory.rampartsHP && room.memory.rampartsHP > 2500000) {
                        room.memory.defendRoomMode = 2;    //antidrain mode
                        room.memory.rampartsAttackCount = 0;
                    }

                }

                if (room.memory.defendRoomMode && room.memory.defendRoomMode == 2) {
                    // Find all hostile actions against your creeps and structures
                    let eventLog = room.getEventLog();
                    let attackEvents = _.filter(eventLog, {event: EVENT_ATTACK});
                    let structureAttacked = false;
                    attackEvents.forEach(event => {
                        if (event.data && event.data.damage && event.data.targetId) {
                            const obj = Game.getObjectById(event.data.targetId);
                            if (obj && ((obj.structureType == STRUCTURE_RAMPART && obj.my) || obj.structureType == STRUCTURE_WALL)) {
                                structureAttacked = true;
                            }
                        }
                    });
                    if (structureAttacked) {
                        room.memory.rampartsAttackCount++;
                        console.log('room.memory.rampartsAttackCount', room.memory.rampartsAttackCount);
                        if (room.memory.rampartsAttackCount > 50) {
                            room.memory.defendRoomMode = 1;    //antidrain mode off
                            room.memory.rampartsAttackCount = undefined;
                        }
                    }

                }

                if (room &&  room.memory.defCountEnemy >= 4 &&  room.controller && room.controller.my && room.controller.level > 1 && room.controller.level < 8) {
                    if (room.controller.pos.findInRange(FIND_HOSTILE_CREEPS, 3 , {filter: c=>c.getActiveBodyparts(CLAIM)}).length) {
                        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!room.controller.activateSafeMode()');
                        room.controller.activateSafeMode();
                    }
                }

                if (room.memory.defendRoomMode && room.memory.defCountEnemy > 100 && room.controller.safeModeAvailable && !room.controller.safeModeCooldown && !room.controller.safeMode && room.controller.level < 5) {
                    room.controller.activateSafeMode();
                }
                if (room.memory.defendRoomMode && room.memory.defCountEnemy > 1900 && room.controller.safeModeAvailable && !room.controller.safeModeCooldown && !room.controller.safeMode && room.controller.level < 8) {
                    //room.controller.activateSafeMode();
                }
                if (room.memory.defCountEnemy > 2000) {
                    room.memory.defCountEnemy = 2000;
                }
                if (hostiles[0].getActiveBodyparts(ATTACK) || hostiles[0].getActiveBodyparts(RANGED_ATTACK) || hostiles[0].getActiveBodyparts(HEAL) || hostiles[0].getActiveBodyparts(WORK)) {
                    if (username == 'Luvs' &&  roomName == 'E18N29') {
                    } else {
                        Game.notify(`User ${username} spotted in room ${roomName}`);
                    }
                }
            }
            let towers = room.find(FIND_MY_STRUCTURES, {filter: (obj) => obj.structureType == STRUCTURE_TOWER && obj.store[RESOURCE_ENERGY] >= 10 });

            if (0 || room.memory.defendRoomMode) {
                let towersAtacked = false;
                var targetsHeal = room.find(FIND_MY_CREEPS, {
                    filter: function(object) {
                        return object.hits < object.hitsMax*0.85;
                    }
                });
                if(targetsHeal.length) {
                    towers.forEach(tower => tower.heal(targetsHeal[0]));
                    towersAtacked = true;
                }



                if (1 || room.memory.defendRoomMode == 2) {
                    //antidrain
                    if (!towersAtacked && this.smartTowersAttack(room, towers)) {
                        towersAtacked = true;
                    }
                } else {
                    if (room.memory.towerAttackCount == undefined || room.memory.towerAttackCount < -5 ) {
                        room.memory.towerAttackCount = 21;
                    } else {
                        room.memory.towerAttackCount --;
                        if (!(room.memory.towerAttackCount%5) && !towersAtacked && room.memory.defendRoomMode == 1) {
                            let currentHostile = 0;
                            towers.forEach(tower => {
                                tower.attack(hostiles[currentHostile]);
                                currentHostile++;
                                if (currentHostile >= hostiles.length) {
                                    currentHostile = 0;
                                }
                                towersAtacked = true;
                            });
                        } else if (room.memory.towerAttackCount > 0 && !towersAtacked) {
                            let target = null;
                            towers.forEach(tower => {
                                if (!target) {
                                    target = tower.pos.findClosestByRange(hostiles,  {
                                        filter: function(object) {
                                            return object.hits < object.hitsMax;
                                        }
                                    });
                                }
                                if (!target) {
                                    target = tower.pos.findClosestByRange(hostiles);
                                }
                                if (target) {
                                    tower.attack(target);
                                    towersAtacked = true;
                                }
                            });
                        } else {
                            //pause atacking
                        }
                    }
                }

            } else {
                towers.forEach(tower => {
                    if (1 || roomName != "E58N22" || Game.time > 28665093+1500 || Game.shard.name == 'shard3') {
                        if (0 && room.name == 'E49N37' && hostiles[0].owner.username == 'Robinlub_UG_NL' && tower.pos.getRangeTo(hostiles[0])>12){
                        } else {
                            tower.attack(tower.pos.findClosestByRange(hostiles));
                        }
                    }
                    //tower.attack(hostiles[1]);
                });
            }
        } else if (hostilesPowerCreeps.length > 0) {
            Game.notify(`User ${hostilesPowerCreeps[0].owner.username} PowerCreep spotted in room ${roomName}`);
            room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}}).forEach(tower => {
                tower.attack(tower.pos.findClosestByRange(hostilesPowerCreeps));
            });
        } else {
            if (room.memory.defCountEnemy || room.memory.defendRoomMode){
                room.memory.defCountEnemy -= 1;
                if (room.memory.defCountEnemy < 0) {
                    room.memory.defCountEnemy = 0;
                    room.memory.defendRoomMode = 0;
                    room.memory.rampartsAttackCount = undefined;
                    Game.notify(`OFF Defend Room Mode in room ${roomName}`);
                }
            }

            require('profiler').start('towerHealRepair');
            var targets = room.find(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });
            if(targets.length > 0) {
                var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                towers.forEach(tower => tower.heal(targets[0]));
            } else {
                if (!room.memory.nextRepairTime || Game.time > room.memory.nextRepairTime) {
                    var targets = Game.rooms[roomName].find(FIND_STRUCTURES, {
                        filter: object => ([STRUCTURE_ROAD, STRUCTURE_RAMPART, STRUCTURE_WALL].includes(object.structureType) || (object.structureType == STRUCTURE_CONTAINER && room.memory.labContainerPos && object.pos.x == room.memory.labContainerPos.x && object.pos.y == room.memory.labContainerPos.y))
                            && object.hits < object.hitsMax
                            && ((object.hits<2000 && object.structureType == STRUCTURE_ROAD) || (object.hits<20000 && object.structureType != STRUCTURE_ROAD))
                    });

                    //targets.sort((a,b) => a.hits - b.hits);

                    if(targets.length > 0) {
                        let target = _.min(targets, 'hits');
                        var towers = Game.rooms[roomName].find(
                            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                        towers.forEach(tower => tower.energy>500?tower.repair(target):0);
                    } else {
                        room.memory.nextRepairTime = Game.time+200+Math.ceil(Math.random()*100);
                    }
                }
            }
            require('profiler').end('towerHealRepair');
        }

        //var room = Game.rooms[roomName];
        if (!(Game.time%1000)) {
            room.memory.powerSpawn = undefined;
            room.memory.storageLink = undefined;
            room.memory.factory = undefined;
        }

        if (!(Game.time%3000)) {
            room.memory.storageLinkPos = undefined;
            room.memory.factoryNearLinkPos = undefined;
        }


        if (!(Game.time%2000)) {
            room.memory.observer = undefined;
        }


        if (room.memory.factory == undefined) {
            let factory = room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_FACTORY }
            });
            if (factory.length) {
                room.memory.factory = factory[0].id;
            } else {
                room.memory.factory = 0;
            }
        }


        if (room.memory.powerSpawn == undefined) {
            var powerSpawns = room.find(FIND_STRUCTURES, {
                filter: (structure) => {return structure.structureType == STRUCTURE_POWER_SPAWN;}
            });
            if (powerSpawns.length) {
                room.memory.powerSpawn = powerSpawns[0].id
            } else {
                room.memory.powerSpawn = 0;
            }
        }

        if (room.memory.powerSpawn) {
            let powerSpawn = Game.getObjectById(room.memory.powerSpawn);
            if (powerSpawn && powerSpawn.power && !Memory.stopPowerProcess){
                require('profiler').start('powerProcess');
                let res = powerSpawn.processPower();
                require('profiler').end('powerProcess');
            }
        }

        if (room.storage && room.memory.storageLink == undefined){
            var storagelinks = room.storage.pos.findInRange(FIND_STRUCTURES, 2, {
                filter: (structure) => {return structure.structureType == STRUCTURE_LINK;}
            });
            if (storagelinks.length){
                room.memory.storageLink = storagelinks[0].id;
            } else {
                room.memory.storageLink = 0;
            }
        }

        if (room.memory.storageLinkPos == undefined) {
            this.findStorageLinkPos(room);
        }

        if (room.memory.factoryNearLinkPos == undefined) {
            if (room.memory.storageLinkPos) {
                let pos = new RoomPosition(room.memory.storageLinkPos.x, room.memory.storageLinkPos.y, room.name);
                room.memory.factoryNearLinkPos = pos.findInRange(FIND_MY_STRUCTURES, 1, {filter: obj=>obj.structureType == STRUCTURE_FACTORY}).length?1:0;
            } else {
                room.memory.factoryNearLinkPos = 0;
            }
        }


        if (1 && room.memory.storageLinkPos) {
            require('profiler').start('storageLinkPosVisual');
            let pos = new RoomPosition(room.memory.storageLinkPos.x, room.memory.storageLinkPos.y, room.memory.storageLinkPos.r);
            room.visual.circle(pos.x, pos.y, {radius: 0.35, fill: 'blue',})
            require('profiler').end('storageLinkPosVisual');
        }
        if (0 && room.memory.storageLinkPos) {
            let pos = new RoomPosition(room.memory.storageLinkPos.x, room.memory.storageLinkPos.y, room.memory.storageLinkPos.r);
            pos.lookFor(LOOK_STRUCTURES).forEach(structure => {
                if (structure.structureType == STRUCTURE_ROAD) {
                    room.memory.excludeRoads = [{x:pos.x, y:pos.y}];
                    structure.destroy();
                }
            });
        }


        if (0 && !(Game.time%1) && (room.memory.storageLink || room.name == 'E77N55')) {
            require('profiler').start('linkProcess');
            const startCpuLinkProcess = Game.cpu.getUsed();
            let storageLinkId = room.memory.storageLink;

            let res = -1;
            if (room.name == 'E77N55'){
                storageLinkId = '5e1facee6207c4c47aa80e90';
            }

            let storageLink = Game.getObjectById(storageLinkId);
            if (storageLink && storageLink.store[RESOURCE_ENERGY]<100) {
                delete (room.memory.storageLinkBusy);
                let links = room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_LINK }
                });
                links = _.filter(links, (structure) => structure.id != storageLinkId && !structure.cooldown && structure.store[RESOURCE_ENERGY] > 400 && structure.id != room.memory.remoteLinkUpgradeId);

                // let links = room.find(FIND_MY_STRUCTURES, {
                //     filter: (structure) => {return structure.structureType == STRUCTURE_LINK && structure.id != storageLinkId && !structure.cooldown && structure.energy>400;}
                // });
                if (links.length){
                    //console.log(room.name, 'links found', links.length);
                    //let storageLink = Game.getObjectById(storageLinkId);
                    //if (storageLink && storageLink.energy < 100){
                    res = links[0].transferEnergy(storageLink);
                    //links.forEach(link => link.transferEnergy(storageLink));
                    //}
                }
            } else {
                room.memory.storageLinkBusy = (room.memory.storageLinkBusy || 0) + 1;
                if (room.memory.storageLinkBusy>25 && room.name != 'E77N55') {
                    console.log('storageLinkBusy', room.memory.storageLinkBusy, 'ticks in room', helpers.getRoomLink(room.name));
                }
            }
            const elapsedLinkProcess = Game.cpu.getUsed() - startCpuLinkProcess;
            if (VERBOSE_CPU) console.log('LinkProcessCpu '+ elapsedLinkProcess.toFixed(2), 'res', res, 'links.length', links.length);
            require('profiler').end('linkProcess');
        }


        require('profiler').start('linkProcess');
        if (1) {
            helpers.processLinks(room);
        }
        require('profiler').end('linkProcess');

        if (!(Game.time%100) ) {
            room.memory.mineralHarvest = 0;
            let extractors = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_EXTRACTOR}});
            if (extractors.length){
                let minerals = room.find(FIND_MINERALS);
                if (minerals.length && minerals[0].mineralAmount){
                    room.memory.mineralHarvest = 1;
                }
            }
        }

    },
    findStorageLinkPos: function(room) {
        console.log('findStorageLinkPos in',room.name);
        let storageLink = Game.getObjectById(room.memory.storageLink);
        if (!storageLink && room.storage && room.memory.storageLink == undefined){
            var storagelinks = room.storage.pos.findInRange(FIND_STRUCTURES, 2, {
                filter: (structure) => {return structure.structureType == STRUCTURE_LINK;}
            });
            if (storagelinks.length){
                room.memory.storageLink = storagelinks[0].id;
                storageLink = storagelinks[0];
            } else {
                room.memory.storageLink = 0;
            }
        }
        
        
        if (storageLink && room.storage && room.terminal) {
            let storagePos = room.storage.pos;
            let freeSides = 0;
            let storageLinkPos = null;
            let factory = room.find(FIND_MY_STRUCTURES).filter(s=>s.structureType == STRUCTURE_FACTORY)[0];
            let step = 0;
            if (!factory) {
                factory = room.terminal;
                step = 1;
            }
            for (; step<2; step++){
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (!dx && !dy) { continue;}
                        let pos = new RoomPosition(storagePos.x + dx, storagePos.y + dy, room.name);
                        if (pos.isNearTo(room.storage) && pos.isNearTo(room.terminal) && pos.isNearTo(storageLink) && pos.isNearTo(factory)) {
                            let allow = true;
                            pos.lookFor(LOOK_STRUCTURES).forEach(structure => {
                                if (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) {
    
                                } else if (structure.structureType == STRUCTURE_RAMPART && structure.my) {
    
                                } else {
                                    allow = false;
                                }
                            });
                            if (allow) {
                                storageLinkPos = pos;
                            }
                        }
                    }
                }
                if (!storageLinkPos) {
                    factory = room.terminal;
                }
            }
            if (storageLinkPos) {
                room.memory.storageLinkPos = {x:storageLinkPos.x, y:storageLinkPos.y, r:storageLinkPos.roomName};
            } else {
                room.memory.storageLinkPos = 0;
            }
        } else {
            room.memory.storageLinkPos = 0;
        }
    },
};

module.exports = roleRoomDefender;