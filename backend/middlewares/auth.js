const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");
const { json } = require("express");


//auth

exports.auth = async (req, res, next) => {
    try{

        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");
        console.log("AFTER ToKEN EXTRACTION");

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}


exports.isUser=async(req,res,next)=>{
    try {
        console.log("Printing AccountType",req.user.accountType)
        if(req.user.accountType!=="User"){
            return res.status(401).json({
                success:false,
                message:"This is Protected Route For Users Only"
            })
        }

        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User Role cannot be verified, pls try again"
        })
    }
}
exports.isAdmin=async(req,res,next)=>{
    try {
        if(req.user.accounyType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is Protected Route For Admin Only"
            })
        }

        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Admin Role cannot be verified, pls try again"
        })
    }
}