const mongoose = require('mongoose');
const {bookingStatus} =  require('../utils/constants');
const bookingSchema = new mongoose.Schema({
    roomId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"Room"
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true,
        ref:"User"
    },
    noOfBeds:{
        type:Number,
        required:true,
    },
    totalCost:{
        type:String,

    },
    status:{
     type:String,
     require:true,
     default:bookingStatus.inProgress
    },
    createdAt:{
        type:Date,
        immutable:true,
        default: ()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now();
        }
    }
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;