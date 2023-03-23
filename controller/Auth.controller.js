const bcrypt = require('bcrypt');
const User = require('../model/User')
const jwt = require('jsonwebtoken');
const constants = require('../utils/constants')
const config = require('../config/auth.config');


exports.signup = async (req, res) => {

   
   try {
    const {name,email,password,userTypes,userId} = req.body;
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login" + oldUser);
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      userTypes,
      userId,
      password: encryptedPassword,
    });
 // Create token
 const token = jwt.sign(
  {_id:user._id},
  config.secret,
  {
    expiresIn: "1h",
  }
);
user.token = token;
const responseobj = {
  _id: user._id,
  name,email,userTypes,token,userId,
  
}
// save user token

// return new user
return res.status(201).send(responseobj);
   } catch (err) {
    console.log(err);
   }

}
 
 
 

exports.signin = async (req, res) => {
       // Our login logic starts here
  try {
    // Get user input
    const { email, password} = req.body;
    console.log(email, password);

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    console.log("from user info signin section",user)
   
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      // Create token
      const credential = await bcrypt.compare(req.body.password, user.password);
      console.log("credebtial from signin part",credential)
      const token = jwt.sign(
        { _id: user._id},
        config.secret,
        {
          expiresIn: "1h",
        }
      );

      // save user token
      user.token = token;
      // user

      return res.status(200).send("user logged in"+ user + user.token);
    }
     
    return res.send("invalid credentials")
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};
