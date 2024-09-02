const mongoose=require('mongoose')

const transactionSchema=new mongoose.Schema({
    category:{
        type:String,
        required:true,
        trim:true,
    },
    type:{
        type:String,
        required:true,
        trim:true,
    },
    ownerName:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
    },
    reference:{
        type:String,
        required:true,
        trim:true,
   },
    amount:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:Date,

    },
},{timestamps:true});

module.exports=mongoose.model("Transaction",transactionSchema)