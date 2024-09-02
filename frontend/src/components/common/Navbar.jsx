import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Heading */}
        <div className="text-white text-2xl font-bold">
          Expense Tracker
        </div>
        {/* Buttons */}
        <div className="space-x-4">
          <Link to="/login">
            <button className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 font-medium">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="text-white bg-green-500 hover:bg-green-600 rounded-lg px-4 py-2 font-medium">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
