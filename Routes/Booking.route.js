const express = require('express')
const {createBooking,cancelbooking,gettingallBooking,updateBooking} = require('../controller/Booking.controller');
const {verifyToken,IsUser,isAdmin,IsManager} = require('../Middleware/AuthJWT');
const {validateBooking} = require('../Middleware/ValidatingBooking');
const route = express.Router();


route.post("/api/Room/Booking",validateBooking,verifyToken,IsUser,createBooking);
route.get("/api/Room/Booking/gettingallbookings",verifyToken,IsManager,gettingallBooking);
route.put("/api/Room/Booking/cancel/:id",verifyToken,isAdmin,cancelbooking);
route.put("/api/Room/Booking/updatingStatus/manager/:id",verifyToken,IsManager,updateBooking);
module.exports = route;