var helpers = require('helpers'); 

var roleAtacker = {
    
    addBody: function(arr, body, n) {
      return arr.concat(Array(n).fill(body));
    },
    
    getBody:function (spawn, sector = 0) {
        if (!Game.spawns[spawn] || !Game.spawns[spawn].room) return [];
    
        // if (sector == 3){
        //     return [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL];
        // }
        //let gameCreepsAtackers = _.filter(gameCreeps, (creep) => creep.memory.role == 'atacker' && creep.memory.sector == sector && creep.memory.type == undefined && (creep.ticksToLive > 100 || creep.spawning));
        let melee = [];//_.filter(gameCreepsAtackers, (creep) => Game.getObjectById(creep.id) && Game.getObjectById(creep.id).getActiveBodyparts(ATTACK) );
        let ranger = [];//_.filter(gameCreepsAtackers, (creep) => Game.getObjectById(creep.id) && Game.getObjectById(creep.id).getActiveBodyparts(RANGED_ATTACK) );
        let healers = [];//_.filter(gameCreepsAtackers, (creep) => Game.getObjectById(creep.id) && Game.getObjectById(creep.id).getActiveBodyparts(HEAL)>1 );
    
    
        //console.log('atacker count', melee.length, ranger.length, healers.length);
        let cap = Game.spawns[spawn].room.energyCapacityAvailable;
        let roomName = Game.spawns[spawn].room.name;
        if (cap>2300) {
            cap = 2300;
        }
        let res = [];
        if (Math.floor((ranger.length + melee.length) / 3) > healers.length){
            //healer
            let heal_part = Math.floor(cap*0.84/250);
            let move_part = heal_part;
            let tough_part = Math.floor((cap-heal_part*250-move_part*50)/60);
            move_part+=tough_part;
    
            res = this.addBody(res, TOUGH,  tough_part);
            res = this.addBody(res, MOVE,  move_part-1);
            res = this.addBody(res, HEAL,  heal_part);
            res = this.addBody(res, MOVE,  1);
    
        } else  if (1 || ranger.length >= melee.length){
            //melee
            let atack_part = Math.floor(cap*0.616/80);
            let move_part = atack_part;
            let tough_part = Math.floor((cap-atack_part*80-move_part*50)/60);
            move_part+=tough_part;
    
            res = this.addBody(res, TOUGH,  tough_part);
            res = this.addBody(res, MOVE,  move_part-1);
            res = this.addBody(res, ATTACK,  atack_part);
            res = this.addBody(res, MOVE,  1);
    
        } else {
            //ranged
            let atack_part = Math.floor(cap*0.75/150);
            let move_part = atack_part;
            let tough_part = Math.floor((cap-atack_part*150-move_part*50)/60);
            move_part+=tough_part;
    
            if (0 && roomName == 'E42N31' && Game.spawns[spawn].room.energyCapacityAvailable >= 2500){ 
                res = this.addBody(res, RANGED_ATTACK,  atack_part-1);
                res = this.addBody(res, MOVE,  move_part);
                res = this.addBody(res, RANGED_ATTACK,  1);
                res = this.addBody(res, HEAL,  tough_part);
            } else {
                res = this.addBody(res, TOUGH,  tough_part);
                res = this.addBody(res, RANGED_ATTACK,  atack_part-1);
                res = this.addBody(res, MOVE,  move_part);
                res = this.addBody(res, RANGED_ATTACK,  1);
            }
    
        }
        //console.log(cap, atack_part, move_part, tough_part, res);
        return res;
    },

    
    
    
    
    run: function(creep, sectorAttackers = []) {
        
        // if ((creep.memory.type == 'dismantler' || creep.memory.type == 'defender') && (creep.room.name == 'E83N58' || creep.room.name == 'E83N57') && creep.hits < creep.hitsMax){
        //     creep.moveTo(Game.flags['FlagRetreat'], {reusePath: 0});
        //     return;
        // }

        // if (creep.memory.type == 'assault'  && (creep.room.name == 'E83N58' || creep.room.name == 'E83N57') && creep.hits < creep.hitsMax*0.8){
        //     creep.heal(creep);
        //     creep.moveTo(Game.flags['FlagRetreat'], {reusePath: 0});
        //     return;
        // }


        if (helpers.sleep(creep)) return; 
        
        if (creep.memory.nwa == undefined) {
            creep.notifyWhenAttacked(false);
            creep.memory.nwa = 1;
        }
        
        var verbose = false;
        // if (creep.name == 'LeviMiles') {
        //     verbose = true;
        // }
        // if (creep.memory.type == 'defender' || creep.memory.type == 'assault'){
        //     verbose = true;
        // }
        if (Memory.mapVisual) Game.map.visual.text("A️",creep.pos, { fontSize:10});

        var sourceKeeper = 'Source Keeper';
        
        var flagAttack = Game.flags['FlagAttack'];
        
        let sectorInfo = sectorAttackers[creep.memory.sector];
        if (sectorInfo != undefined && sectorInfo.place != undefined){
            flagAttack = Game.flags[sectorInfo.place.flag];
            if (flagAttack == undefined){
             var flagpos = new RoomPosition(sectorInfo.place.posx, sectorInfo.place.posy, sectorInfo.place.room);
             if (Game.rooms[flagpos.roomName]) {
                flagpos.createFlag(sectorInfo.place.flag);    
             }
            }  
        }
        
        if (creep.memory.type == 'defender'){
            flagAttack = Game.flags['FlagDefend'];
            if (flagAttack == undefined){
             var flagpos = new RoomPosition(22, 43, 'E83N54');
             flagpos.createFlag('FlagDefend');    
            }  
        }
        if (creep.memory.type == 'dismantler'){
            flagAttack = Game.flags['FlagDismantle'];
            if (flagAttack == undefined){
             var flagpos = new RoomPosition(23, 43, 'E83N54');
             flagpos.createFlag('FlagDismantle');    
            }  
        }
        if (creep.memory.type == 'healer'){
            flagAttack = Game.flags['FlagRetreat'];
            if (flagAttack == undefined){
             var flagpos = new RoomPosition(28, 4, 'E83N57');
             flagpos.createFlag('FlagRetreat');    
            }  
        }

        if (creep.memory.type == 'assault'){
            flagAttack = Game.flags['FlagAssault'];
            if (flagAttack == undefined){
             var flagpos = new RoomPosition(46, 12, 'E83N54');
             flagpos.createFlag('FlagAssault');    
            }  
        }
        if (creep.memory.type == 'keeper' && creep.memory.keeperSector == undefined){
            flagAttack = Game.flags['FlagKeeper'];
            sourceKeeper = '2YhvVHQg';
            if (flagAttack == undefined){
             var flagpos = new RoomPosition(8, 19, 'E84N54');
             flagpos.createFlag('FlagKeeper');    
            }  
        }

        if (creep.memory.type == 'keeper' && creep.memory.keeperSector != undefined){
            //console.log('FlagKeeper'+creep.memory.keeperSector);
            flagAttack = Game.flags['FlagKeeper'+creep.memory.keeperSector];
            sourceKeeper = '2YhvVHQg';
            if (flagAttack == undefined){
             var flagpos = new RoomPosition(24, 17, creep.memory.keepRoom);
             if (Game.rooms[creep.memory.keepRoom]) {
                 let res = flagpos.createFlag('FlagKeeper'+creep.memory.keeperSector);    
                 creep.say(res);
             } else {
                 let pos = new RoomPosition(24, 24, creep.memory.keepRoom);
                 helpers.smartMove(creep, pos, 0, 24);
                 creep.heal(creep);
                 return;
             }
            }  
        }


        if (creep.memory.type == 'power'){
            flagAttack = Game.flags['FlagPower'+(creep.memory.sector?creep.memory.sector:'')];
            let homeRoom = Game.rooms[creep.memory.room];
            if (creep.memory.highwayWall && homeRoom) {
                if (homeRoom.memory.power) {
                    Game.notify('PowerBank in novice respawn zone '+creep.room.name+' Canceled on tick '+ Game.time+ ' '+JSON.stringify(homeRoom.memory.power));
                    delete homeRoom.memory.power;
                }
                creep.memory.role = undefined;
                return;
            }
            
            if (homeRoom && homeRoom.memory.droppedPowerId) {
                creep.memory.role = undefined;
            } else if (flagAttack == undefined){
                creep.memory.role = undefined;
            } else if (creep.memory.powerId && creep.memory.powerRoom && creep.room.name == creep.memory.powerRoom && !Game.getObjectById(creep.memory.powerId)) {
                //console.log('PowerBank destroyed');
                //creep.memory.role = undefined;
                const found = flagAttack.pos.lookFor(LOOK_RESOURCES);
                if(found.length && found[0].resourceType == RESOURCE_POWER) {
                    //let homeRoom = Game.rooms[creep.memory.room];
                    if (homeRoom && homeRoom.memory.droppedPowerId == undefined) {
                        homeRoom.memory.droppedPowerId = found[0].id;
                        if (Memory.PowerBankUsed && homeRoom.memory.power && homeRoom.memory.power.id) {
                            Memory.PowerBankUsed[homeRoom.memory.power.id] = undefined;    
                        }
                        homeRoom.memory.power = undefined;
                        
                    }
                }
            } else if (homeRoom.memory.power && homeRoom.memory.power.pos) {
                const pos = new RoomPosition(homeRoom.memory.power.pos.x, homeRoom.memory.power.pos.y, homeRoom.memory.power.pos.roomName);
                if (!pos.isEqualTo(flagAttack) && Game.rooms[homeRoom.memory.power.pos.roomName]) {
                    let res = pos.createFlag(flagAttack.name);
                    if (res == ERR_NAME_EXISTS){
                        var res2 = flagAttack.setPosition(pos);     
                    }
                    let observer = Game.getObjectById(homeRoom.memory.observer);
                    if (observer) {
                        var res3 = observer.observeRoom(homeRoom.memory.power.pos.roomName); 
                    }
                    console.log('!!!!!!!!!!!!!!!!POWER FLaG NOT SET!!!!',res, res2, res3);
                    Game.notify('!!!!!!!!!!!!!!!!POWER FLaG NOT SET!!!!'+res+' '+res2+' '+res3+' '+flagAttack.name+' '+pos.roomName+' '+flagAttack.pos.roomName);
                }
            }
        }
        if (creep.memory.type == 'powertransporter'){
            if (creep.carry[RESOURCE_POWER]){
                if (creep.memory.room && creep.room.name != creep.memory.room) {
                    var pos = new RoomPosition(38, 43, creep.memory.room);
                    if (Game.rooms[creep.memory.room] && Game.rooms[creep.memory.room].storage) {
                        pos = Game.rooms[creep.memory.room].storage.pos;
                    }
                    //let res = creep.moveTo(pos, {reusePath: 15, visualizePathStyle: {stroke: '#ffaa00'}});
                    let res = helpers.smartMove(creep, pos, 0, 1);
                    //console.log(creep.name, res);
                } else {
                    let target = creep.room.terminal;
                    if (target) {
                        let res = creep.transfer(target, RESOURCE_POWER);
                        if (res == ERR_NOT_IN_RANGE) {
                            helpers.smartMove(creep, target);
                        } else if (res == OK) {
                            creep.memory.role = undefined;
                        } else {
                            console.log('powertransporter err', res, helpers.getRoomLink(creep.room.name));
                        }
                    }
                }
                
            } else {
                let flag = Game.flags['FlagPower'+(creep.memory.sector?creep.memory.sector:'')];
                if (flag && flag.room && creep.room.name == flag.room.name) {
                    let waitRange = 4;
                    if (creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) {
                        waitRange = 1; //no stay on border
                    }
                    if (creep.pos.getRangeTo(flag.pos) > waitRange){
                        //console.log('powertransporter', creep.name, creep.pos.getRangeTo(flag.pos));
                        helpers.smartMove(creep, flag, 0, waitRange);
                        //creep.moveTo(flag, {reusePath: 15, visualizePathStyle: {stroke: '#ffaa00'}});
                    } else {
                        //wait power drop
                        let homeRoom = Game.rooms[creep.memory.room];
                        if (homeRoom && homeRoom.memory.droppedPowerId) {
                            //get dropped
                            let dropped = Game.getObjectById(homeRoom.memory.droppedPowerId);
                            if (dropped){
                                if(creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
                                    //creep.moveTo(dropped);
                                    creep.moveTo(dropped, {reusePath: 0, visualizePathStyle: {stroke: '#ffaa00'}});
                                }
                            } else {
                                creep.memory.role = undefined;
                                homeRoom.memory.droppedPowerId = undefined;
                            }
                        }
                    }
                } else if (flag){
                    //creep.moveTo(flag, {reusePath: 15, visualizePathStyle: {stroke: '#ffaa00'}});
                    helpers.smartMove(creep, flag, 0);
                    //console.log('powertransporter2', creep.name, 'moving');
                } else {
                    creep.memory.role = undefined;
                }
            }
            return;
        }
        
        
        
        if (!creep.spawning && creep.memory.boosts && creep.memory.boosts.length){
            
            let mineral = creep.memory.boosts[0];
            
            let lab = creep.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: function (object) {return object.structureType == STRUCTURE_LAB && object.mineralType == mineral && object.mineralAmount>1000;}
            });
            console.log(creep.name, mineral, lab);
            if (lab) {
                let res = lab.boostCreep(creep);
                if (res == ERR_NOT_IN_RANGE) {
                    creep.moveTo(lab, {visualizePathStyle: {stroke: '#ffaa00'}});
                } else {
                    creep.memory.boosts.shift();
                    if (!creep.memory.boosts.length){
                        creep.memory.boosts = undefined;
                    }
                }
                return;
            } else {
                creep.memory.boosts.shift();
                if (!creep.memory.boosts.length){
                    creep.memory.boosts = undefined;
                }
            }
        }

        //retreat ranged
        if (creep.hits < creep.hitsMax
        && !creep.getActiveBodyparts(ATTACK) 
        //&& !creep.getActiveBodyparts(HEAL) 
        && creep.getActiveBodyparts(RANGED_ATTACK) == 1) {
            console.log (creep.name, 'retreating');
            //console.log(targetRoomName);
            const  targetPos = new RoomPosition(17,25, creep.memory.room);
            creep.moveTo(targetPos, {reusePath: 1});
            const hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            const target = creep.pos.findClosestByRange(hostiles);
            creep.rangedAttack(target);
            return;
        }

        
        if (flagAttack && (flagAttack.room == undefined || flagAttack.room.name != creep.room.name)){
            //creep.moveTo(flagAttack);
            if (creep.memory.atackerId) {
                let targetHeal = Game.getObjectById(creep.memory.atackerId);
                if (targetHeal && !targetHeal.memory.role) {
                    creep.memory.role = undefined;
                    return;
                } else if (targetHeal) {
                    creep.say('wa');
                    if (creep.pos.inRangeTo(targetHeal, 5)){
                        creep.moveTo(targetHeal, {ignoreCreeps: true, visualizePathStyle: {stroke: '#ffffff'}});
                    } else {
                        if (creep.hits<creep.hitsMax) {
                            creep.heal(creep);
                        }
                        helpers.smartMove(creep, targetHeal, 0);    
                    }
                    return;
                    
                }
            }
            
            helpers.smartMove(creep, flagAttack, 0);
            if (creep.getActiveBodyparts(HEAL) && creep.hits<creep.hitsMax){
                creep.heal(creep);
            }
            
        } else {
            if ((Game.time%10) && creep.memory.sleepA && creep.memory.sleepA.flag && flagAttack && creep.memory.sleepA.flag.room == flagAttack.room.name 
            && creep.memory.sleepA.flag.posX == flagAttack.pos.x && creep.memory.sleepA.flag.posY == flagAttack.pos.y && creep.hits == creep.hitsMax && creep.memory.type != 'power'){
                if (verbose) console.log (creep.name, 'sleeping');
                return;
            } else if (creep.memory.sleepA){
                if (verbose) console.log (creep.name, 'awaking');
                creep.memory.sleepA = undefined;
            }
            
            const hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            
            
            
            
            if (creep.getActiveBodyparts(HEAL) && ((!creep.getActiveBodyparts(ATTACK) && !creep.getActiveBodyparts(RANGED_ATTACK)) /*|| !hostiles.length*/) && creep.memory.type != 'keeper' ) {
                //creep.say('hl');
                var target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function (object) {
                        return object.hits < object.hitsMax && object.name != creep.name && (object.getActiveBodyparts(ATTACK) || object.getActiveBodyparts(RANGED_ATTACK) || object.getActiveBodyparts(HEAL) );
                    }
                });
                if (!target) {
                    target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                        filter: function (object) {
                            return object.hits < object.hitsMax && object.name != creep.name;
                        }
                    });
                }
                if (creep.memory.atackerId) {
                    let targetHeal = Game.getObjectById(creep.memory.atackerId);
                    if (targetHeal) {
                        //creep.say('th');
                        target = targetHeal;
                    }
                }
                
                if (verbose) console.log(creep.name, 'finding target for healing');
                //creep.moveTo(flagAttack);
                //target = null;
                if (creep.hits < creep.hitsMax ){
                    creep.heal(creep);
                    if (target && creep.memory.type != 'assault' && creep.room.name != 'E83N58') {
                        creep.moveTo(target, {reusePath: 0,visualizePathStyle: {stroke: '#ffaa00'}});
                    } else {
                        creep.moveTo(flagAttack, {reusePath: 0,visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else if (target) {
                    if(creep.pos.isNearTo(target)) {
                        creep.heal(target);
                    } else {
                        creep.rangedHeal(target);
                    }
                    
                    if (creep.memory.type == 'power' && creep.pos.isNearTo(target)) {
                        //creep.say('nomv');   
                        if (flagAttack && target.pos.isNearTo(flagAttack)) {
                            
                        } else {
                            creep.move(creep.pos.getDirectionTo(target));
                            creep.say('mtv');
                        }
                    } else {
                    //if (creep.memory.type != 'assault'  && creep.room.name != 'E83N58'){
                        creep.moveTo(target, {reusePath: 0});    
                    //}
                    }
                } else {
                    creep.heal(creep);
                    target = flagAttack;
                    if (0 && creep.memory.type == 'assault'){
                        creep.moveTo(target);
                    } else {
                        var range = creep.pos.getRangeTo(target);
                        if (range <= 1) {
                            creep.move(target.pos.getDirectionTo(creep));
                        }
                        if (range > 2) {
                            creep.moveTo(target);
                        }
                    }

                }

            } else {
                var target = null;
                var reuse = 0;
                var path = [];
                if (flagAttack && flagAttack.room.name == creep.room.name) {
                    var found = creep.room.lookForAt(LOOK_STRUCTURES, flagAttack);
                    if (verbose) console.log(creep.name, 'finding LookForAt Flag');
                    found.forEach(function (lookObject) {
                        if (lookObject.structureType != STRUCTURE_ROAD  
                        && lookObject.structureType != STRUCTURE_KEEPER_LAIR 
                        && lookObject.structureType != STRUCTURE_INVADER_CORE
                        && lookObject.structureType != STRUCTURE_CONTAINER
                        //&& !(lookObject.structureType = STRUCTURE_RAMPART && lookObject.my)
                        && !lookObject.my
                        ) {
                            target = lookObject;
                            //creep.say(lookObject.structureType);
                            if (target.structureType == STRUCTURE_POWER_BANK) {
                                //console.log(creep.name, 'Target sctructure', target, target.hits, target.hitsMax);    
                                if (target.hits < 550000 && creep.ticksToLive > 600) {
                                    creep.memory.lastSpawn = 1;
                                }
                                
                                if (target.hits < 100000) {
                                    //Game.notify('PowerBank soon destroyed!'); 
                                     let transports = creep.pos.findInRange(FIND_MY_CREEPS,15,{
                                     filter: function (object) {
                                        return object.memory.type == 'powertransporter' && object.getActiveBodyparts(CARRY); 
                                    }});
                                    
                                    let carry = 0;
                                    transports.forEach(transport => {
                                        carry+= transport.getActiveBodyparts(CARRY)*50;
                                    });
                                    creep.say(transports.length+ ' '+carry+'('+target.power+')');    
                                    if (target.hits < 2500) {
                                        
                                        
                                        if (target.power*0.8>carry) {
                                            creep.say('w'+carry+'('+target.power+')'); 
                                            if ((!creep.memory.lastSpawn  || creep.ticksToLive > 30) && target.ticksToDecay > 20) {
                                                target = null;        
                                            } else {
                                                creep.say('nt'+carry+'('+target.power+')'); 
                                            }
                                            
                                        } else {
                                            creep.say('ok'+carry+'('+target.power+')');    
                                        }
                                    }
                                }
                                if (creep.hits<creep.hitsMax*0.8){
                                    target = null;
                                }
                                let powerEnemys = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 6);
                                if (powerEnemys.length) {
                                    creep.say('😦',1);   
                                    target = null;
                                }
                                
                            }
                        }
                    });
                }
                if (!target) {
                    if (verbose) console.log(creep.name, 'finding HOSTILE_CREEPS in room', creep.room.name);
                    if (creep.memory.type == 'defender'){
                        target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                            filter: function (object) {
                                return helpers.ownerNotInWhiteList(object.owner.username)
                                && object.owner.username != sourceKeeper;
                                
                            }
                        });
                    } else {
                        target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                            filter: function (object) {
                                return helpers.ownerNotInWhiteList(object.owner.username)
                                && object.owner.username != sourceKeeper
                               //&& object.id != '5e6bbd35b6fde3573829a1a1'
                                //  && (object.owner.username == 'Invader' && creep.memory.type == 'assault')
                                && object.name != 'defender0' && object.name != 'defender1' && object.name != 'defender2' && object.name != 'defender3' && object.name != 'defender4' 
                                && !(object.room.name == 'E86N54' && object.pos.x == 37 && object.pos.y == 10 )
                                && !(object.room.name == 'E84N56' && object.pos.x == 14 && object.pos.y == 41 )
                                && !(object.room.name == 'E84N55' && object.pos.x == 14 && object.pos.y == 3 )
                                && !(object.room.name == 'E76N54' && object.pos.x == 10 && object.pos.y == 45 )
                                && !(object.room.name == 'E46N35' && object.pos.x == 12 && object.pos.y == 16 )
                                && !(object.room.name == 'E55N24' && object.pos.x == 44 && object.pos.y == 5 )
                                && !(object.room.name == 'E55N24' && object.pos.x == 45 && object.pos.y == 5 )
                                && !(object.room.name == 'E56N25' && object.pos.x == 33 && object.pos.y == 11 )
                                && !(object.room.name == 'E56N25' && object.pos.x == 6  && object.pos.y == 14 )
                                ;
                            }
                        });
                    }
                    
                    if (target) {
                        if (verbose) console.log(creep.name, 'finding path to HOSTILES creep');
                        let ignoreRoads = false;
                        if (creep.room.name == 'E85N54' || creep.room.name == 'E84N55') {
                            ignoreRoads = true;
                        }
                        //creep.say('p');
                        let maxRooms;
                        if (creep.memory.type == 'keeper') {
                            creep.say('P!!P');
                            path = creep.room.findPath(creep.pos, target.pos, {ignoreRoads: ignoreRoads, maxRooms:1});    
                        } else {
                            path = creep.room.findPath(creep.pos, target.pos, {ignoreRoads: ignoreRoads, });    
                        }
                        
                        
                    }

                    if (creep.memory.type != 'defender') { //kill also structure
                        if (verbose) console.log(creep.name, 'finding HOSTILE_STRUCTURES in room', creep.room.name);
                         var target2 = creep.pos.findClosestByRange (FIND_HOSTILE_STRUCTURES, {
                            filter: function (object) {
                                return helpers.ownerNotInWhiteList(object.owner.username)
                                    
                                    && object.structureType != STRUCTURE_ROAD
                                    && object.structureType != STRUCTURE_CONTROLLER
                                    && object.structureType != STRUCTURE_WALL
                                    && object.structureType != STRUCTURE_RAMPART
                                    && object.structureType != STRUCTURE_KEEPER_LAIR
                                    && object.structureType != STRUCTURE_POWER_BANK
                                    && !(object.structureType == STRUCTURE_INVADER_CORE && object.level > 0)
                                    //&& object.structureType != STRUCTURE_TOWER
                                    && !(object.owner.username == 'Invader' && object.structureType == STRUCTURE_TOWER)
                                    && object.owner.username != 'Blood'
                                    ;
                            }
                        });

                        if (1 && !target2){
                            if (verbose) console.log(creep.name, 'finding FIND_HOSTILE_CONSTRUCTION_SITES in room', creep.room.name);
                            target2 = creep.pos.findClosestByRange (FIND_HOSTILE_CONSTRUCTION_SITES);    
                            target2 = null;
                        }    

                        //kill wall
                        if (!target && !target2 && flagAttack && flagAttack.room.name == creep.room.name && creep.memory.keeper == undefined && creep.room.name == '_E75N57'){
                            if (verbose) console.log(creep.name, 'finding FIND_ALL_STRUCTURES!!!!!!!!!!!!!!!!!!! in room', creep.room.name);
                            target2 = creep.pos.findClosestByRange(FIND_STRUCTURES);
                            if (target2 && (target2.structureType == STRUCTURE_CONTROLLER /*|| target2.structureType == STRUCTURE_CONTAINER */|| target2.structureType == STRUCTURE_WALL)){
                                target2 = flagAttack;
                            }
                            console.log(creep.name, target2);
                        }

                        var path2 = [];
                        if (target2) {
                            if (verbose) console.log(creep.name, 'finding path to HOSTILES structures');
                            path2 = creep.room.findPath(creep.pos, target2.pos);
                        }

                        if (!target || (target && target2 && path2.length < path.length)) {
                            target = target2;
                            path = path2;
                        }
                    }
                }

                
                if (!target && creep.getActiveBodyparts(HEAL) && creep.hits < creep.hitsMax ){
                    creep.heal(creep);
                } 
                
                if (!flagAttack) {
                    Game.notify('no flag attack in room '+creep.room.name);
                }
                

                if (creep.memory.type == 'keeper' && flagAttack && flagAttack.room && creep.room.name == flagAttack.room.name /* && !target */) {
                    var lairs = creep.room.find (FIND_HOSTILE_STRUCTURES, {
                        filter: function (object) {
                            return object.structureType == STRUCTURE_KEEPER_LAIR 
                            && object.ticksToSpawn>0
                            && object.id !== '5873be3811e3e4361b4da6ff'
                            && object.id !== '5873be6c11e3e4361b4dada6'
                            && object.id !== '5873be3711e3e4361b4da6fc'
                            && object.id !== '5836b8f18b8b9619519f2f1f'
                            && object.id !== '59f1a61882100e1594f3f873'
                            && object.id !== '59f1a6b482100e1594f406db'
                            && object.id !== '59f1a6c582100e1594f408fc'
                            && object.id !== '59f1a6c582100e1594f408fe'
                            
                            ;
                        }
                    });
                    //creep.say('dd'+lairs.length);
                    
                    if (lairs.length){
                       // creep.say(lairs[0].ticksToSpawn);
                        lairs.sort(function (a,b){return a.ticksToSpawn-b.ticksToSpawn;});   
                        const flagName = 'FlagKeeper'+(creep.memory.keeperSector != undefined?creep.memory.keeperSector:'');
                        if (Game.flags[flagName] != undefined && Game.flags[flagName].pos.x != lairs[0].pos.x || Game.flags[flagName].pos.y != lairs[0].pos.y ){
                            Game.flags[flagName].setPosition( lairs[0].pos );       
                            //console.log('set'+flagName);
                        }
                        lairs[0].room.visual.text('' + lairs[0].ticksToSpawn,lairs[0].pos.x + 1, lairs[0].pos.y, {align: 'left', opacity: 0.8});
                    }
                     
                    
                }

                var noEnemy = false;
                if (!target) {
                    target = flagAttack;
                    reuse = 5;
                    noEnemy = true;
                    
                }

                
                var resD = creep.dismantle(target);
                
                var resA = creep.attack(target);
                if (resA != OK){
                    creep.heal(creep);
                }
                var resR = creep.rangedAttack(target);
                if (resR != OK || creep.memory.type == 'power') {
                    if (path.length) {
                        creep.move(path[0].direction, {visualizePathStyle: {stroke: '#ffaa00'}});
                    } else {
                        if (creep.memory.type == 'power' && creep.pos.isNearTo(target)) {
                            //creep.say('nomv');    
                        } else {
                            let res = -1;
                            if (noEnemy){
                                res = helpers.smartMove(creep, target, 0);
                            } else {
                                creep.say('mt'+reuse);
                                res = creep.moveTo(target, {reusePath: reuse, visualizePathStyle: {stroke: '#ffaa00'}});    
                                creep.memory._trav = undefined;
                            }
                            
                            if (verbose) console.log(creep.name, 'Atacker Moving result ', res );
                            if (noEnemy && res == OK && creep.pos.getRangeTo(target) <=3 && creep.hits == creep.hitsMax ){
                                //prepare for sleep
                                creep.memory.sleepA = {flag: {room: target.room.name, posX: target.pos.x, posY: target.pos.y}}
                            }
                        }
                    }

                } else { 
                    if (creep.memory.type == 'defender'){
                        creep.moveTo(target);
                    } else {
                        var range = creep.pos.getRangeTo(target);
                        if (range <= 2) {
                            creep.move(target.pos.getDirectionTo(creep));
                        }
                    }
                }
            }

        }
	}
};

module.exports = roleAtacker;