const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const Profile =require("../models/Profile");

const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
require("dotenv").config();

//sendOTP

exports.sendOTP=async(req,res)=>{
    
   try {
     //fetch email from user ki Body
     const {email}=req.body;
 
     // check user if already exist
     
      const checkUserPresent=await User.findOne({email});
      
      //If user already presented , then return response
 
      if(checkUserPresent){
         return res.status(401).json({
             success:false,
             message:"User Already Registered"
         })
      }

      //generate otp
      var otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
      });
      console.log("OTP Generated",otp);

      //Check unique OTP or Not
       let result=await OTP.findOne({otp:otp});
      
       //If otp find in DB ,then generate again otp
       while(result){
        otp=otpGenerator(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
        });
       result=await OTP.findOne({otp:otp});
       }

      //OTP object

      const otpPayload={email,otp};
    //   create OTP entry in DB
     const otpBody=await OTP.create(otpPayload);
     console.log("OTP BOdy",otpBody);

     //return response
     res.status(200).json({
        success:true,
        message:"OTP SENT SUCCESSFULLY",
        otp
     })



   } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,

        message:"OTP is not defined"
    })
    
   }
}

//Signup
exports.signup=async(req,res)=>{
    try {
        //Data Fetch from request body
        const {firstName,lastName,email,password,confirmPassword,accountType,otp}=req.body;
        
        //validate 
        if(!firstName || !lastName || !email || !otp || !password || !confirmPassword){
            return res.status(403).json({
                success:false,
                message:"ALL fields are required"
            })
        }
        //2 password match kro
        if(password!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password And ConfirmPassword value does not match.Pls try again"
            })
        }
        //check user already exist or not 
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(201).json({
                success:false,
                message:"User is Already Registered"
            })
        }

        //find most recent otp stored for the user
        const recentOTP=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("Recent OTP",recentOTP);
        //validate OTP
        if(recentOTP.length === 0){
            //OTP NOT Found
            return res.status(400).json({
                success:false,
                message:"This OTP is Not Valid",
            })
        } else if(otp!==recentOTP[0].otp){
            //Invalid OTP
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        //Hash password
        const hashedPassword=await bcrypt.hash(password,10);
        //create entry in DB
        
        
        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
           image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        //return res
        return res.status(200).json({
            success:true,
            message:"User registered SuccessFully",
            user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User Cannot be registered SuccessFULLY"
        })
        
    }
}
//Login

exports.login=async(req,res)=>{
    try {
        //get data from req body
        const {email,password}=req.body;
        //validation data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"ALL Fields Are required, Please try again",

            });
        }
        //user check exist or not
        const user=await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(201).json({
                success:false,
                message:"User Not Exist"
        })
        }
        //generate JWT ,after password matching
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });

            user.token=token;
            user.password=undefined;
             //create cookie and send ressponse
        const options={
            expires:new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Logged In SuccessFully"
        });


        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password Not Match SuccesFULLY"
            })
        }

       
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Fail Pls Try again"
        })
    }
}

//Change Password
