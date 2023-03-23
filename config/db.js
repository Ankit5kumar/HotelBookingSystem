const mongoose = require('mongoose')
require('dotenv').config();
const config = require('./config');

mongoose.connect(config.url,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('mongodb connected')
}).catch(err=>{
    console.log("err",err)
})

