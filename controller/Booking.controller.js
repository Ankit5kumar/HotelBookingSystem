
const mongoose = require('mongoose')
const Booking = require('../model/booking.model');
const Room = require('../model/Rood.model');
const User = require("../model/User")
const {bookingStatus} =  require('../utils/constants');

const createBooking = async (req,res) => {
   
    const userId = new mongoose.Types.ObjectId(req.body.userId);
    const room = await Room.findOne({_id:req.body.roomId});

    const bookingObj = {
        roomId:req.body.roomId,
        userId:req.body.userId,
        noOfBeds:req.body.noOfBeds,
        status:req.body.status,
        totalCost:req.body.noOfBeds * room.pricePerNight
    }

    try {
        const booking = await Booking.create(bookingObj)
        return res.status(200).send({msg:"booking done",booking})
    } catch (error) {
        res.status(500).send({msg:"internal server error", error:error.message})
    }
}

const gettingallBooking = async (req, res) => {
    try {
        const allBooking  = await Booking.find();
        return res.status(200).send(allBooking)
    } catch (error) {
        return res.send({msg:"internal server error", error:error.message})
    }
}

const cancelbooking = async (req, res) => {
    const bookingId =  req.params.id;
    try {
        const booking  = await Booking.findOne({_id:bookingId});
        if (!booking) {
            return res.status(404).send({ msg: "Booking not found" });
          }

          booking.status = bookingStatus.cancel;
          await booking.save();
    return res.status(200).send({ msg: "Booking cancelled", booking });
    } catch (error) {
        return res.status(500).send({ msg: "Internal server error", error: error.message });
    }
}

// const updateBooking = async (req, res) => { 

//     const savedBooking = await Booking.findById({_id:req.params.id})
//     if (!savedBooking) {
//         return res.status(400).send({msg: "Invalid booking ID"});
//     }
//     const { status } = req.body;
//     if (!status) {
//         return res.status(400).send({msg: "Status field is missing"});
//     }
    
//     savedBooking.status = status;
//     try {
//         const updatedBooking = await savedBooking.save();
//         res.status(201).send(updatedBooking);
//     } catch (err) {
//         res.status(500).send({msg: "Internal error", err});
//     }



// }
const updateBooking = async (req, res) => {
    const BookingId = req.params.id;
    try {
        const updatedbooking = await Booking.findOneAndUpdate({
            bookingid: BookingId
        },{
            status:req.body.status
        }).exec();
        console.log(updatedbooking)
        res.status(200).send("updated");

        

    } catch (error) {
        console.log(error)
        res.status(500).send({msg:'some internal error occured'})
    }
}

module.exports = {
    createBooking,
    cancelbooking,
    gettingallBooking,
    updateBooking
}
