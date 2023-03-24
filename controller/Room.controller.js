const Room = require('../model/Rood.model');

const RoomCreation  = async (req, res, next) => {
    const RoomObj = {
        roomNumber:req.body.roomNumber,
        pricePerNight:req.body.pricePerNight,
        availability:req.body.availability

    }
    const Rooms = await Room.create(RoomObj)
    return res.status(201).send(Rooms)
}

const roomupdate  = async (req, res) => {
    try{
        const id = req.params.id;
        console.log("from uodate",id);
        const savedRoom = await Room.findById({_id:id})
        console.log(savedRoom)
        if(!savedRoom){
            res.status(400).send('room to be updated does not exisits')
        }
        savedRoom.roomNumber = req.body.roomNumber ? req.body.roomNumber : savedRoom.roomNumber;
        savedRoom.roomType = req.body.roomType ? req.body.roomType : savedRoom.roomType
        savedRoom.pricePerNight = req.body.pricePerNight ? req.body.pricePerNight : savedRoom.pricePerNight;
        savedRoom.availability = req.body.availability ? req.body.availability : savedRoom.availability
    
       const Updatedroom = await savedRoom.save();
       console.log(Updatedroom)
       return res.status(200).send(Updatedroom)
    }catch(err){
      return res.send(err);
    }
}

const deleteRoom = async (req, res) => {
    const id = req.params.id;
    try {
        const result  = await Room.findByIdAndDelete({_id: id});
        console.log(result)
        if(!result){
            return res.send("wrong id")
        }
    return res.status(200).send({msg:`sucessfull deleted room with ${result}`})
    } catch (error) {
        return res.status(500).send(error)
    }
}

const Getallroom  = async (req, res) => {
    try {
        const rooms = await Room.find();
        return res.send(rooms);
    } catch (error) {
        return res.status(500).send(error)
    }
}

const findAvailableRooms = async (req, res) => {
    try {
      const availableRooms = await Room.find({ availability: "available" });
      return res.status(200).json({ availableRooms });
    } catch (error) {
      return res.status(500).send(error);
    }
  };

module.exports = {
    RoomCreation,
    deleteRoom,
    roomupdate,
    Getallroom,
    findAvailableRooms
}