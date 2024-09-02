const Transaction =require("../models/Transaction");
const User = require("../models/User");
const moment=require('moment');



//create Transaction
exports.createTransaction=async(req,res)=>{
    try {
        const {category,type,reference,amount,description,date}=req.body;

        if(!category || !type || !reference || !amount || !description){
            return res.status(400).json({
                success:false,
                message:"ALL fields are required"
            })
        }

        //Check for Admin
        const userId = req.user.id
        console.log("USer ID",userId)
        const userDetails=await User.findById(userId);
        console.log("USer Details...",userDetails);

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User Details Not Found"
            })
        }

        //Create entry in DB
         const newTransaction=await Transaction.create({
            category,
            type,
            ownerName:userDetails._id,
            reference,
            description,
            date,
            amount
         })

         await User.findByIdAndUpdate({
            _id:userDetails._id
         },
        {
            $push:{
                transactions:newTransaction._id
            }
        },{
            new:true,
        });
        // console.log("Transaction Created Successfully",newTransaction)
        return res.status(200).json({
            success:true,
            message:"Transction Created Successfully",
            data:newTransaction
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed To create Transaction",
            error:error.message
        })
        
    }
}

//get ALL Transaction
exports.showALLTransaction=async(req,res)=>{
    try {
            const allTransactions=await Transaction.find({},)
            return res.status(200).json({
                success:true,
                message:"Data For ALL transaction Fetched SuccessFully"
            })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed To fetch Transactions",
            data:allTransactions
        })
        
    }
}

exports.getTransactoion=async(req,res)=>{
    try {
        //get ID
        const {userid,frequency,selectedDate,type} = req.body;
        const userDetails=await Transaction.find({ownerName:userid,
           ...(frequency!== "custom") ? {
            date:{
                $gt:moment().subtract(Number(frequency),"d").toDate(),
            },
           }:{
            date:{
                $gte:selectedDate[0],
                $lte:selectedDate[1],
            },
           },
           ...(type!=='all'  &&{type}),
           //Category Basis 
        });
        
         //validation 
         if(!userDetails){
            return res.status(201).json({
                success:false,
                message:"Transaction Not Found"
            })
         }  
         
         console.log("Transaction Data",userDetails)
         
         //return response

         return res.status(200).json({
            success:true,
            message:"Transaction Fetched SuccessFully",
            data:userDetails
         })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

//Update Transaction

exports.updateTransaction=async(req,res)=>{
    try {

        //data input
        const {category,type,reference,description,amount}=req.body;
        const {transactionId}=req.body;

        //data validation
        if(!transactionId){
            return res.status(400).json({
                success:false,
                message:"Missing Transaction Id"
            })
        }
        //update data
        const updatedData= await Transaction.findByIdAndUpdate(transactionId,{category,type,reference,description,amount},{new:true})
        if(!updatedData){
            return res.status(403).json({
                success:false,
                message:"No Record Found"
            })
        }
        //return response
        return res.status(200).json({
            success:true,
            message:"Transaction Updated SuccessFully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Updating Transaction",
            data:updatedData
        })

    }
}

//Delete Transaction

exports.deleteTransaction=async(req,res)=>{
    try {
        //get Id
        const {transactionId}=req.body;
        //use find by id ANd delete
        await Transaction.findByIdAndDelete(transactionId);
        //return response
        return res.status(200).json({
            success:true,
            message:"Transaction Deleted SuccessFully"
        })
        
    } catch (error) {
        console.log(error)
    }
}