const express = require('express')
const app = express()
const config = require('./config/config');
const Routes  = require('./Routes/Auth.Route')
const roomroutes = require('./Routes/room.route')
const Bookingroutes = require('./Routes/Booking.route')
require('./config/db')
app.get('/', (req, res) => {
    res.status(201).send({msg: 'Hello welcome to hiring app'})
})
app.use(express.json());
app.use(Routes)
app.use(roomroutes);
app.use(Bookingroutes);

app.listen(config.port,()=>{
    console.log('listening on port ' +config.port)
})