const express = require('express');
const supplier = express.Router();
const Supplier = require('../models/supplier');
const Mobile = require('../models/mobile')
const jwt = require('jsonwebtoken');

const config = require('../config/database')

supplier.post('/register',(req, res, next) => {
    let newUser = new Supplier({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        userName:req.body.userName,
        password:req.body.password,
    });
    Supplier.addUser(newUser, (err,user) =>{
        if (err){
            res.json({success:false,msg:'Failed to register user'});
        } else {
            res.json({success:true,msg:'Registered user Successfully'});
        }
    });    
});
supplier.post('/add-product',(req,res,next) => {
    console.log('req.body',req.body)
    let newProduct = new Mobile(req.body)
    productPromise = new Promise((resolve,reject) => {
        newProduct.save((err)=>{
            if(err){
                throw err;
            } else {
                resolve('Saved in MongoDB');
            }
        })
        
    });
    productPromise
        .then((successMsg)=>{
            console.log(successMsg)
        })
        .catch((err)=>{
            res.json({
                success:false,
                msg:'Invalid Entry to the database'
            })
        })
        .finally(()=>{
            res.json({
                success:true,
                msg:'Added Mobile to the products'
            })
        })

    
})
supplier.post('/authenticate',(req, res, next) => {
    const username = req.body.userName;
    const password = req.body.password;
    // console.log(username,'password',password)
    Supplier.getUserByUsername(username, (err,user) =>{
        if (err) throw err;
        // console.log(user)
        if (!user) {
            return res.json({success:false,msg:'User not Found'});
        }
        Supplier.comparePassword(password, user.password, (err,isMatch) => {
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
    // console.log(req.user);

});
module.exports = supplier;