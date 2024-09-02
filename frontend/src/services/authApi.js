import { toast } from "react-hot-toast"
import { apiConnector } from "./apiconnector"
import { setUser } from "../slices/profile"
import { setLoading, setToken } from "../slices/authsSice"
import { endpoints } from "./api"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints


export function sendOtp(email,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading");
        dispatch(setLoading(true));
        try {
            const response=await apiConnector("POST",SENDOTP_API,{
                email,
                checkUserPresent:true,
            })
            console.log("SENDOTP API RESPONSE.....",response)
            console.log(response.data.success);

            if(!response.data.success){
                throw new Error(response.data.success)
            }
            toast.success("OTP SENT SUCCESSFULLY")
            navigate("/verify-email")
            
        } catch (error) {
            console.log("SENDOTP_API ERROR.....",error);
            toast.error("Could Not Send OTP");
            
        }
        dispatch(setLoading(true));
        toast.dismiss(toastId);
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading")
        dispatch(setLoading(true));
        try {
            const response=await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });
            console.log("Signup Data....",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")
            
        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
            
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)

    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    try {
        const response=await apiConnector("POST",LOGIN_API,{
            email,password
        })
        console.log("LOGIN API...",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
       
        dispatch(setUser({ ...response.data.user, image: userImage }))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/")
    } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    }
}


export function getPasswordResetToken(email,setEmailSent){
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try {
        const response=await apiConnector("POST",RESETPASSTOKEN_API,{email,});

        console.log("Reset Password Token......",response)
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Reset Email Sent");
        setEmailSent(true)
    } catch (error) {
        console.log("Reset Password Token Error");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password,confirmpassword,token){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response=await apiConnector("POST",RESETPASSWORD_API,{
                password,confirmpassword,token
            })

            console.log("Reset Password Response....",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Password Updated SuccessFully");

        } catch (error) {
            console.log("RESET PASSWORD TOKEN ERROR",error);
            toast.success("Unable To Reset Password");
            
        }
        dispatch(setLoading(false));
    }}


export function logout(navigate){
    return async(dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out SuccessFully");
        navigate("/login")
    }
}    
