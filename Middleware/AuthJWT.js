const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth.config');
const User = require("../model/User")
const constants = require("../utils/constants");


const verifyToken = async (req, res, next)=>{
    let token = req.headers['x-access-token'];
    
    if(!token){
        return res.status(403).send({msg: 'No token provided'});
    }
    try {
        jwt.verify(token,authConfig.secret,(err,decoded)=>{
            if(err){
                return res.status(401).send({msg:"Unauthenticated"});
            }
            req.id = decoded._id;
            
            next();
        })
    } catch (error) {
        return res.status(500).send("invalid token",error.message);
    }
}

const IsUser = async (req, res, next) => {
   const user  = await User.findOne({_id:req.id}); 
   console.log("from user",user);
   console.log(user && user.userTypes === constants.userTypes.user)
   if(user && user.userTypes === constants.userTypes.user){
    next();
   }else{
    return res.status(403).send({msg:"require User role"})
   }
}

const isAdmin = async (req,res,next) => {
    const user  = await User.findOne({_id:req.id});
    console.log("from user isadmin",user);
    console.log(user.userTypes,constants.userTypes.admin)
    console.log(user.userTypes === constants.userTypes.admin)
    if(user && user.userTypes === constants.userTypes.admin){
        next(); 
    }else{
        return res.status(403).send({msg:"require admin role"})
    }
}
const IsManager = async (req,res,next) => {
    const user  = await User.findOne({_id:req.id});
    console.log("from user ismanager",user);
    console.log(user.userTypes,constants.userTypes.manager)
    console.log(user.userTypes === constants.userTypes.manager)
    if(user && user.userTypes === constants.userTypes.manager){
        next(); 
    }else{
        return res.status(403).send({msg:"require manager role"})
    }
}
module.exports = {
    verifyToken,
    IsUser,
    isAdmin,
    IsManager
}