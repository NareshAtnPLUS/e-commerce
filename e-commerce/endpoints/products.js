const express = require('express');
const products = express.Router();
const Mobile = require('../models/mobile')
const User = require('../models/user')

products.get('/getMobiles',(req,res,next)=>{
    Mobile.find({},(err,mobile)=>{
        res.json({
            success:true,
            mobile
        })
    })    
})
products.post('/orderMobile',async (req,res,next) => {
    const variantId = req.body.variant._id;
    const updateAvailable = req.body.variant.available - 1;
    const query = req.body.product;
    const userName = req.body.userName;
    await Mobile.findOne({general:query}).then(mobile => {
        console.log(mobile)
        variant = mobile.variants.id(variantId);
        variant["available"] = updateAvailable;
        mobile.save();
    })
    .then(()=>{
        delete req.body.userName
        User.findOne({userName},(err,user)=>{
            user.ordersPlaced.push(req.body)
            user.save();
        })
    })
    .then(()=>{
        res.json({
            success:true,
            msg:"Product purchased successfully"
        })
    })
    .catch(err => {
        res.json({
            success:false,
            msg:"Product cannot be purchased due to server errors"
        })
        console.log('Error in Updating',err)
    })
})
module.exports = products;