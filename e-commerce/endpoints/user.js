const express = require('express');
const user = express.Router();
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require('../config/database')
const authenticator = require('otplib').authenticator
const totp = require('otplib').totp
const secret = authenticator.generateSecret();


user.post('/register',(req, res, next) => {
    let newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        userName:req.body.userName,
        password:req.body.password,
    });
    // console.log(req.body.name)
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
    // console.log(username,'password',password)
    User.getUserByUsername(username, (err,user) =>{
        if (err) throw err;
        // console.log(user)
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
    // console.log(req.user);

});
user.post('/verify-otp',(req,res,next) => {
    const userName = req.body.userName
    const otp = req.body.otp;
    User.findOne({userName,otp},(err,data)=>{
        if(!err){
            return res.json({
                success:true,
                user:userName,  
                msg:'OTP verification Sucessfull.'
            });
        } else {
            return res.json({success:false,msg:'OTP Verification failed'});
        }
    })
});
user.post('/update-password',(req,res) => {
    const password = req.body.password.password;
    const confirmPassword = req.body.password.confirmPassword;
    const userName = req.body.userName
    let gUser={};
    User.updatePassword(password,(hashedPassword)=>{
        if(hashedPassword){
            User.findOneAndUpdate({userName},{password:hashedPassword},(err,data)=>{
                if(!err){
                    // console.log(data)
                    res.json({
                        success:true,
                        msg:"Password changed Successfully"
                    })
                } else{
                    res.json({
                        success:false,
                        msg:"Password Updation failed"
                    })
                }
            })
        }
    })
});
user.post('/request-otp',(req, res, next) => {
    const username = req.body.userName;

    User.getUserByUsername(username, (err,user) =>{
        if (err) throw err;
        if (user) {
            const token = totp.generate(secret);
            // console.log(token)
            const isValid = totp.check(token, secret);
            // console.log(isValid)
            const isValidVerify = totp.verify({ token, secret });
            // console.log(isValidVerify)
            // console.log(user.email,user.userName);            
            const mailContent = `
                <p>You have a requested a updation of Password</p>
                <h3>OTP: ${token}</h3>
                <p> OTP is valid only for short time</p>
                `;
            sendEmailToUser(user.email,mailContent,()=>{
                User.findOneAndUpdate({userName:user.userName},{otp:token},(err,data)=>{
                    if (err) throw err;
                    else{
                        // console.log(data);
                        return res.json({
                            success:true,
                            user:user.userName,  
                            token:'User Found,OTP has been sent to your mail.'
                        });
                    }
                })
            })
            // .catch(console.error());
        }else{
            return res.json({success:false,msg:'User not Found'});
        }
    });
    // console.log(req.user);
});
async function sendEmailToUser(email,mailContent,cb) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'testnplus21@gmail.com', // generated ethereal user
        pass: 'nplus12.3' // generated ethereal password
      },
      tls:{
          rejectUnauthorized:false
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Nodemailer contact" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "OTP for password Updation ✔", // Subject line
      text: "Hello world?", // plain text body
      html: mailContent // html body
    });
  
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    cb();
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports = user;