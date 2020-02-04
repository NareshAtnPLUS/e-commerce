const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    otp:{
        type:String,
    }
});

const User = module.exports = mongoose.model('User',UserSchema);
module.exports.getUserByUsername = function(username,callback){
    const query = {userName:username};
    console.log(query)
    User.findOne(query,callback);
}
module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}
module.exports.addUser = function(newUser, callback){
    newUser.save(callback);
}
module.exports.comparePassword = function(candidatePassword,hash,callback){
    if(candidatePassword == hash){
        console.log('passwords mathed')
        callback(null,true)
    }
}
module.exports.updatePassword = function(user,callback){
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(user.password, salt, (err,hash) => {
            if (err) throw err;
            user.password = hash;
            console.log(user.password)
            callback(user.password);
        });
    });
}