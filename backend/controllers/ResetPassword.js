const User=require("../models/User")
const mailSender=require("../utilis/mailSender")
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

//resetPasswordToken
exports.resetPasswordToken=async(req,res)=>{
   try {
     //get email from req body
     const email=req.body.email
     //check user for this email , email verification
     const user=await User.findOne({email:email});
     if(!user){
         return res.status(201).json({
             success:false,
             message:"Your Email is not Registerd With us"
         })
     }
     //generate token 
     const token = crypto.randomBytes(20).toString("hex");
     //upadte user by addding token and expiration Time
     const updatedDetails= await User.findOneAndUpdate({email:email},
                                               {
                                                 token:token,
                                                 resetPasswordExpires:Date.now()+5*60*1000
                                               },
                                               {new:true}
     );
     console.log("UpdatedDetails for Token",updatedDetails)
     //create url
     const url=`http://localhost:3000/update-password/${token}`
     //send email containing the url
     await mailSender(email,"Password Reset Link",`Password Reset Link ${url}`)
     //return response
     return res.status(200).json({
         success:true,
         message:"Email Sent SuccessFully. please check Email and chnage pwd",
     })
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Something Went wrong while sending reset mail"
    })
    
   }
}

//resetPassword

exports.resetPassword=async(req,res)=>{
    try {
        //data fetch
        const {password,confirmPassword,token}=req.body
        //validation 
        if(password!==confirmPassword){
            return res.status(201).json({
                success:false,
                message:"Password Not Match"
            });
        }
        //get userDetails
        const userDetails=await User.findOne({token:token});
        //if no entry Invalid Token
        if(!userDetails){
            return res.status(201).json({
                success:false,
                message:"Token in Invalid"
            });
        }
        //Token time check 
        if(userDetails.resetPasswordExpires > Date.now()){
            return res.status(403).json({
                success:false,
                message:"Token is Expires, pls regenerate your Token"
            });
        }
        //hash Password
        const hashedPassword=await bcrypt.hash(password,10);
        //password update
        await User.findByIdAndUpdate({
            token:token
        },{
            password:hashedPassword,
        },{new:true});

        //return response
        return res.status(200).json({
                success:false,
                message:"Password Reset SuccessFully"
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something Went Worng while sending reset Password Mail"
        });
        
    }
}