import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authsSice"
import profileReducer from "../slices/profile"


const rootReducer=combineReducers({
    auth:authReducer,
    profile:profileReducer

})

export default rootReducer;