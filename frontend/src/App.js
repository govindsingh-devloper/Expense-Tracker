import "./App.css";
import {Route, Routes, useNavigate } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUP from "./pages/SignUP";



function App() {
  return (
  <>
    <Routes>
    
      <Route path="/" element={<Home/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<SignUP/>}/>
      <Route path="forgot-password" element={<ForgotPassword/>}/>
      <Route path="update-password/:id" element={<UpdatePassword/>}/>
      <Route path="verify-email" element={<VerifyEmail/>}/>
      
     </Routes>
  </>
   
  );
}

export default App;
