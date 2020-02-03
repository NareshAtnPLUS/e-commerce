const express = require('express');
const user = express.Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database')


user.post('/register',(req, res, next) => {
    let newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        userName:req.body.userName,
        password:req.body.password,
    });
    console.log(req.body.name)
    User.addUser(newUser, (err,user) =>{
        if (err){
            res.json({success:false,msg:'Failed to register user'});
        } else {
            res.json({success:true,msg:'Registered user Successfully'});
        }
    
    })
});

user.post('/authenticate',(req, res, next) => {
    const username = req.body.userName;
    const password = req.body.password;

    User.getUserByUsername(username, (err,user) =>{
        if (err) throw err;
        if (!user) {
            return res.json({success:false,msg:'User not Found'});
        }
        User.comparePassword(password, user.password, (err,isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(),config.secret,{
                    expiresIn:10 // 1 day in seconds
                });
                res.json({
                    success:true,
                    token:'JWT '+token,
                    user: {
                        id:user._id,
                        name:user.firstName,
                        username:user.username,
                        email:user.email
                    }
                });
            } else {
                return res.json({success:false,msg:'Passwords MisMatched'});
            }
        });
    });
    console.log(req.user);

});
module.exports = user;