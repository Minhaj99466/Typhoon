const mongoose = require('mongoose');

const userSChema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    adharnumber:{
        type:Number,
        required:true,
    },
    phonenumber:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    is_admin:{
        type:Number,
        required:true,
    },
    is_block:{
        type:Boolean,
        default:false,
    },
    is_verified:{
        type:Boolean,
        default:false,
    }
});

const User = mongoose.model('User',userSChema);

module.exports =  User;