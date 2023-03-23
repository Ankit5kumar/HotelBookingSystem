const mongoose = require('mongoose');
const constants = require('../utils/constants');

const userSchema  = new mongoose.Schema({
   name:{
    type: String,
    required: true,
   },
   userId:{
     type: String,
     required: true,
     unique: true
   },
   email:{
    type: String,
    required: true,
   },
   password:{
    type: String,
    
    unique: true,
    required: true,
   },
   userTypes:{
    type: String,
    required: true,
    uppercase: true,
   },
   createdAt:{
    type: Date, 
    immutable: true,
    default:()=>{return Date.now()}
}
})

module.exports = mongoose.model("User",userSchema);