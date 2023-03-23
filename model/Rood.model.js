const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true
  },
  roomType: {
    type: String,
    enum: [1,2],
    required: true
  },
//   description: String,
  pricePerNight: {
    type: Number,
    required: true,
    default:250
  },
  availability: {
    type: String,
    enum: ['booked', 'available'],
    required: true
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
