const express = require('express')
const {verifyToken,isAdmin,IsUser} = require('../Middleware/AuthJWT');
const {RoomCreation,deleteRoom,roomupdate,Getallroom,findAvailableRooms} = require('../controller/Room.controller');
const route = express.Router();


route.post("/api/Room/admin/RoomCreation",verifyToken,isAdmin,RoomCreation);
route.delete('/api/Room/admin/deleteRoom/:id',verifyToken,isAdmin,deleteRoom);
route.put('/api/Room/admin/roomupdate/:id',verifyToken,isAdmin,roomupdate);
route.get('/api/Room/admin/Getallroom',verifyToken,isAdmin,Getallroom);
route.get('/api/Room/admin/GetallAvailableRoom',verifyToken,IsUser,findAvailableRooms);
module.exports = route;
