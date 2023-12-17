// import {
//     Coord,
//     packCoord,
//     packCoordList,
//     packId,
//     packIdList, packPos, packPosList,
//     unpackCoord, unpackCoordAsPos,
//     unpackCoordList, unpackCoordListAsPosList,
//     unpackId,
//     unpackIdList, unpackPos, unpackPosList
// } from 'packrat';
var helpers = require('helpers');

module.exports = {
    myUsername: 'Xolym',
    roadSegmentIndex: 3,
    action: function() {
        
        if (1 && ['shard3', 'shard2', 'shard0'].indexOf(Game.shard.name) >= 0) {
            const startCpuAction = Game.cpu.getUsed();
            this.run();    
            const elapsedAction = Game.cpu.getUsed() - startCpuAction;
            if (0 && elapsedAction>0.2) console.log('roadController '+ elapsedAction.toFixed(2), RawMemory.segments[this.roadSegmentIndex]?RawMemory.segments[this.roadSegmentIndex].length:'');
        }
        
    },
    updateRoomList: function() {
        if (!Memory.roadController.roomList) {
            Memory.roadController.roomList = [];
        }
        let roomsList = Object.keys(Game.rooms).filter((roomName)=> {
            let room = Game.rooms[roomName];
            if (room && room.controller && (room.controller.my || (room.controller.reservation && room.controller.reservation.username == this.myUsername))) {
                return 1;
            } else {
                let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
                let fMod = parsed[1] % 10;
                let sMod = parsed[2] % 10;
                let isSK = ((fMod >= 4) && (fMod <= 6)) && ((sMod >= 4) && (sMod <= 6)); //!(fMod === 5 && sMod === 5) && 
                if (isSK && room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == 'miner'}).length) {
                    return 1;
                }
            }
            return 0;
        });
        //console.log(roomsList);
        Memory.roadController.roomList = _.union(Memory.roadController.roomList, roomsList); 
        Memory.roadController.nextUpdateRoomList = Game.time + 10000;
        Memory.roadController.nextUpdateRoom = Game.time;
        
    },
    getRoadMap: function() {
        if (!_.isEmpty(this.roadMap)) {
            return this.roadMap;
        }
        if (!RawMemory.segments || !Object.keys(RawMemory.segments).includes(String(this.roadSegmentIndex))) {
            RawMemory.setActiveSegments([this.roadSegmentIndex]);
            return undefined;
        }
        let roadMap = {};
        try {
            const startCpuAction = Game.cpu.getUsed();
            roadMap = JSON.parse(RawMemory.segments[this.roadSegmentIndex]) || {};    /* code */
            const elapsedAction = Game.cpu.getUsed() - startCpuAction;
            if (1) console.log('JSON.parse '+ elapsedAction.toFixed(2));
        } catch (e) {
            roadMap = {};
        }
        this.roadMap = roadMap;
        return roadMap;
    },
    saveRoadMap: function(roadMap) {
        this.roadMap = roadMap;
        RawMemory.segments[this.roadSegmentIndex] = JSON.stringify(this.roadMap);
        //this.roadMap = undefined; //clear!!!!
    },
    getSavedRoomRoads: function(roomName) {
        let roadMap = this.getRoadMap();
        if (!roadMap) {
            return undefined;
        }
        if (roadMap[roomName]) {
            return unpackCoordList(roadMap[roomName]);
        } 
        return [];
    },
    saveRoomRoads: function(roomName, roads) {
        let roadMap = this.getRoadMap();
        if (roadMap) {
            roadMap[roomName] = packCoordList(roads);
            this.saveRoadMap(roadMap);
        }
        
    },
    getCurrentRoomRoads: function(room) {
        if (room) {
            const roads = room.find(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.structureType == STRUCTURE_ROAD && !structure.effects;
                }
            });
            let roadsCoord = [];
            roads.forEach(road => roadsCoord.push({x:road.pos.x, y:road.pos.y}));
            return roadsCoord;
        }
        return undefined;
    },
    
    run: function() {
                
        if (!Memory.roadController) {
            Memory.roadController = {
                state: 'init',
            };
        }
        
        let state = Memory.roadController.state;
        
        if (!Memory.roadController.nextUpdateRoomList || Game.time >= Memory.roadController.nextUpdateRoomList) {
            this.updateRoomList();
            return;
        }
        
       //Memory.roadController.excludeRooms = ['E83N57','E81N57','E82N57','E87N53']
       //Memory.roadController.excludeRooms.push('E46N29')
       //Memory.rooms.E55N39.excludeRoads = [{x:23, y:9}];
       //Memory.rooms.E52N29.updateRoads = 1;
       //Memory.roadController.nextUpdateRoom = 0;
        if (Game.time >= Memory.roadController.nextUpdateRoom && Game.cpu.bucket > 2000) {
            if (!this.getRoadMap()) {
                console.log('segment not ready');
                return;
            }
            Memory.roadController.roomList.forEach(roomName => {
                if (Memory.roadController.excludeRooms && Memory.roadController.excludeRooms.length && Memory.roadController.excludeRooms.includes(roomName)) {
                    return;
                }
                
                let room = Game.rooms[roomName];
                if (room && !room.memory.defendRoomMode) {
                    let roadMap = this.getSavedRoomRoads(roomName);
                    let currentRoadMap = this.getCurrentRoomRoads(room);
                    if (roadMap && currentRoadMap) {
                        let roomUpdatedIs = false;
                        if (room.memory.updateRoads) {
                            roomUpdatedIs = true;
                            room.memory.updateRoads = undefined;
                            roadMap = [];
                            console.log('roadMap updates in room', helpers.getRoomLink(room.name), JSON.stringify(roadMap), JSON.stringify(currentRoadMap) );
                        }
                        let roadMapSimple = roadMap.map(packCoord);
                        let currentRoadMapSimple = currentRoadMap.map(packCoord);
                        // let newRoadMap = _.uniq(_.union(roadMap, currentRoadMap), false, packCoord);
                        let newRoadMap = [...new Set([...roadMapSimple, ...currentRoadMapSimple])].map(unpackCoord);
                        if (room.memory.excludeRoads) {
                            let excludeRoadsPack = room.memory.excludeRoads.map(packCoord);
                            let newRoadMapPack = newRoadMap.map(packCoord);
                            newRoadMap = newRoadMapPack.filter(x => !excludeRoadsPack.includes(x)).map(unpackCoord);
                            roadMapSimple = roadMapSimple.filter(x => !excludeRoadsPack.includes(x));
                            //delete room.memory.excludeRoads;
                        }
                        if (newRoadMap.length != roadMap.length || roomUpdatedIs) {
                            this.saveRoomRoads(roomName, newRoadMap);    
                        }
                        let difference = roadMapSimple.filter(x => !currentRoadMapSimple.includes(x)).map(unpackCoord);
                        if (difference.length){
                            console.log('recreate roads in room', helpers.getRoomLink(roomName), JSON.stringify(difference));
                            difference.forEach(coord => {
                                const pos = new RoomPosition(coord.x, coord.y, roomName);
                                room.visual.circle(pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
                                if (Object.keys(Game.constructionSites).length < MAX_CONSTRUCTION_SITES*0.85) {
                                    pos.createConstructionSite(STRUCTURE_ROAD);    
                                } else {
                                    console.log('Cannot create ConstructionSite. Too Many ', Object.keys(Game.constructionSites).length);
                                }
                                
                                
                            });
                        }
                        if (newRoadMap.length != roadMap.length) {
                            console.log('road action', helpers.getRoomLink(roomName), 'saved', roadMap.length, 'current', currentRoadMap.length, 'union', newRoadMap.length);
                        }
                        
                    }
                    Memory.roadController.currentRoomIndex++;
                }
            });
            Memory.roadController.nextUpdateRoom = Game.time + 5000;
            this.roadMap = undefined;
            RawMemory.setActiveSegments([]);
            return;
        }
        
        //Memory.roadController.roomVisuals = [];
        if (Memory.roadController.roomVisuals && Memory.roadController.roomVisuals.length) {
            if (!this.getRoadMap()) {
                console.log('segment not ready');
                return;
            }
            Memory.roadController.roomVisuals.forEach(roomName => {
                let room = Game.rooms[roomName];
                if (room) {
                    let roadMap = this.getSavedRoomRoads(roomName);
                    roadMap.forEach(coord => {
                        const pos = new RoomPosition(coord.x, coord.y, roomName);
                        room.visual.circle(pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
                    });
                    if (0 && roomName == 'E86N54') {
                        this.saveRoomRoads(roomName, []);    
                        Memory.roadController.nextUpdateRoom = Game.time + 4;
                    }
                }
            });
        } else if (!(Game.time%100)) {
            this.roadMap = undefined;
            RawMemory.setActiveSegments([]);
        }
        
            
        if (0) {
            Memory.roadController.roomList.forEach((roomName) => {
                Game.map.visual.circle(new RoomPosition(25,25,roomName));
            });
        }

    
        

    },
};