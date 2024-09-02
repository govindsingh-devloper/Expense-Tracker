const Profile=require("../models/Profile");
const User=require("../models/User");


exports.updateProfile=async(req,res)=>{
    try {
        //get Data
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;
        //get user id
        const id=req.user.id;

        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                messsage:"ALL Fields Are Required"
            });
        }
        //find Profile
        const userDetails=await User.findById(id);
        const profileID=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(profileID);

        //update ProfileDetails
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;
        profileDetails.about=about;

        await profileDetails.save();

        //return response
        return res.status(200).json({
            success:true,
            messsage:"Profile Updated SuccessFully",
            profileDetails,
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:False,
            errror:error.messsage;
        })
        
    }
}

//UPdate Display Picture

//Delete Account
exports.deleteAccount=async(req,res)=>{
    try {
        //get id
        const id=req.user.id;
        //validation
        const userDetails=await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:true,
                messsage:"User Not Found",
            })
        }

        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //delete User
        await User.findByIdAndDelete({_id:id});
        //return response
        return res.status(200).json({
            success:true,
            messsage:"Account Deleted SuccessFully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:true,
            messsage:"User cannot be Deleted SuccessFully",
        })
        
    }
}

//Get user Details

//Get ALL User Details