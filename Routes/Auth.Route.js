const express = require('express')
const AuthController  = require('../controller/Auth.controller')
const {verifyToken,IsUser} = require('../Middleware/AuthJWT');
const ValidateReqbody = require('../Middleware/ValidateReqBody');
const route = express.Router();

route.post("/Hotel/Booking/Api/Signup",ValidateReqbody,AuthController.signup);
route.post("/Hotel/Booking/Api/Signin",verifyToken,IsUser,AuthController.signin);

module.exports = route;
