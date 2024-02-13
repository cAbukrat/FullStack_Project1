const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const router = express.Router()

// Entry Point: 'http://localhost:8080/auth'

router.route('/login').post( async(req,res) => {
  const{ userName , password} = req.body
  const user = await User.findOne({"userName" : userName}).lean()
  if(user){
    if(bcrypt.compare(password, user.password)){
        const ACCESS_SECRET_TOKEN = 'someKey'

        const accessToken = jwt.sign(
         { 
            id : user._id,
            userName : user.userName
         },
            ACCESS_SECRET_TOKEN,
            { expiresIn : '1H' }
        )
        return res.json({status : "OK", token : accessToken})
      }
  }
  return res.json({status : "error",massage :'Invalid username/password'})
}) 

router.route('/verify').get((req, res) => {
  const token = req.headers['x-access-token']; 

  const ACCESS_SECRET_TOKEN = 'someKey';
  if(!token){
    return res.json("No Token Provided");
  }
  jwt.verify(token, ACCESS_SECRET_TOKEN, (err, data) => {
    if (err) {
      return res.json('Failed to authenticate token');
    }
    return res.json("OK");
  });
});

router.route('/register').post( async(req,res) => {
  const{ userName , password : plainTextPassword} = req.body
  const user = await User.find({"userName" : userName})

  if(user.length !== 0){
    if (!plainTextPassword){
      return res.json({status : "error",massage :'Invalid username/password'})
    }
  
    if(plainTextPassword.length <= 5){
      return res.json({status : "error",massage :'Password too small. Should be atleast 6 characters'})
    }
    else{
      const password = await bcrypt.hash(plainTextPassword, 10)
      await User.findByIdAndUpdate(user[0].id, {"userName" : userName, "password": password})
      return res.json({status : "OK",massage :"Created!"})
    }
  }
  return res.json({status : "error",massage :'Invalid username/password'})
  
}) 

module.exports = router 