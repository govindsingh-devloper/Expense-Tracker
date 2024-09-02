import React from 'react'
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from '../services/authApi'
import Layout from './Layout/Layout'



const Login = () => {
  const navigate = useNavigate()
const dispatch = useDispatch()
const [formData, setFormData] = useState({
  email: "",
  password: "",
})

const [showPassword, setShowPassword] = useState(false)

const { email, password } = formData

const handleOnChange = (e) => {
  setFormData((prevData) => ({
    ...prevData,
    [e.target.name]: e.target.value,
  }))
}

const handleOnSubmit = (e) => {
  e.preventDefault()
  dispatch(login(email, password, navigate))
}
return (
<Layout>
  <div className="flex  bg bg-custom-bg items-center justify-center h-screen">
    <div className="w-full mx-auto p-4 max-w-sm rounded-lg shadow-2xl border">
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-y-4 bg-transparent"
      >
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">
            Email Address <sup className="text-pink-600">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              backgroundColor: "transparent",
            }}
            className="w-full rounded-lg bg-gray-800 p-[12px] text-richblack-900"
          />
        </label>
        <label className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-900">
            Password <sup className="text-pink-600">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              backgroundColor: "transparent",
            }}
            className="w-full rounded-lg bg-gray-800 p-[12px] pr-12 text-richblack-900"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-300">
              Forgot Password
            </p>
          </Link>
        </label>
        <button
          type="submit"
          className="mt-4 rounded-lg bg-blue-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</Layout>

);



}

export default Login