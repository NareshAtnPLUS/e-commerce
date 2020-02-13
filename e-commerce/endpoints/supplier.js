const express = require('express');
const supplier = express.Router();
const Supplier = require('../models/supplier');
const Mobile = require('../models/mobile')
const jwt = require('jsonwebtoken');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../uploads');
    },
    filename:function(req,file,cb){
        cb(null,file.filename);
    }
})
const upload = multer({storage:storage});
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
supplier.post('/add-product-image',upload.single('file'),(req,res,next) => {
    let file = req.file
    console.log(file.filename);
    if(!file){
        const error = new Error('No File Found');
        error.httpStatusCode = 404
        return next(error);
    }else{
        console.log(file)
    }
    let newProduct = new Mobile(req.body)
    
    
})
supplier.post('/add-product',(req,res,next) => {
    console.log(req.body);
    let newProduct = new Mobile(req.body)
    newProduct
        .save()
        .then(()=>{
            res.json({
                success:true,
                msg:"Product Added Successfully"
            })
        })
        .catch(err =>{
            console.log(err);
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