const mongoose=require("mongoose");
const mailSender = require("../utilis/mailSender");


const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});

//Mail Send krni h

async function sendVerificationEmail(email,otp){
    try {
        const mailResponse= await mailSender(email,"Verification Email From ExpenseTracker",otp);
        console.log("Email Sent successFully",mailResponse)
        
    } catch (error) {
        console.log("Error occured while sending Mail",error);
        throw error
        
    }
}

//Pre Middleware

OTPSchema.pre("save",async function(next) {
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports=mongoose.model("OTP",OTPSchema);