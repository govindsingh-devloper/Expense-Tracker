const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },

    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
      accountType:{
        type:String,
        enum:["User","Admin"],
        required:true,
    },
    transactions:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction"
       }
    ],
    image:{
        type:String,
        required:true
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:String
    }
});

module.exports=mongoose.model("User",userSchema)