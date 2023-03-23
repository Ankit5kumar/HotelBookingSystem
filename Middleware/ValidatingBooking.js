const room = require('../model/Rood.model');
const User = require('../model/User');
const booking = require('../model/booking.model')
const validateBooking = async (req,res,next) => {
   
    if(!req.body.roomId){
       return res.status(404).send({msg:"Failed roomId is not provided"})
    }
    if(!req.body.userId){
       return res.status(404).send({msg:"Failed userId is not provided"})
     }
     if(!req.body.noOfBeds){
        return res.status(404).send({msg:"Please provide the number of bed"});
      }
     if(req.body.noOfBeds>2){
       return res.status(404).send({msg:"only 2 bed are available book you can book only 1 or 2 beds"});
     }
     

    const savedroom = await room.findOne({_id:req.body.roomId})

    if(!savedroom){
       return res.status(404).send({msg:"Failed roomId is not valid"})
     }

    next(); // call next() to pass control to the next middleware or route handler
}

module.exports = {
    validateBooking
}
