import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../services/authApi'

const Header = () => {
  const {user}=useSelector((state)=>state.profile);
  const {token}=useSelector((state)=>state.auth)
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handlelogout=()=>{
     dispatch(logout(navigate))
  }
  return (
    <nav className="bg-gray-800 p-4 mb-0"> {/* Ensure no bottom margin */}
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <Link className="text-white text-xl font-bold" to="/">
            Expense Tracker
          </Link>
        </div>
        <div className="flex space-x-2">
          {token === null && (
            <>
              <Link to="/login">
                <button className="rounded-[8px] bg-blue-500 border border-blue-700 px-[12px] py-[8px] text-white hover:bg-blue-600">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-[8px] bg-green-500 border border-green-700 px-[12px] py-[8px] text-white hover:bg-green-600">
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {token !== null && (
            <button
              className="rounded-[8px] bg-red-500 border border-red-700 px-[12px] py-[8px] text-white hover:bg-red-600"
              onClick={handlelogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header