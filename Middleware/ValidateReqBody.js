const User = require('../model/User')

const validateUserReqBody = async (req, res, next) => {
    // Check
    if(!req.body.name){
        return res.status(400).send({msg:"Failed! name is not provided"})
    }
    if(!req.body.userId){
        return res.status(400).send({msg:"Failed! userId is not provided"})
    }

    if(!req.body.userTypes){
        return res.status(400).send({msg:"Failed! userTypes is not provided"})
    }
    
    const user = await User.findOne({userId:req.body.userId});
    if(user!=null){
        return res.status(400).send({msg:"Failed userId already exist",user})
    }

      //validate email
      if(!req.body.email){
        return res.status(400).send({msg:"Failed email is not provided"})
    }
    const email = await User.findOne({email:req.body.email});

    if(email!=null){
        return res.status(400).send({msg:"Failed mail already exists"});
    }
    next();

}
module.exports = 
    validateUserReqBody
