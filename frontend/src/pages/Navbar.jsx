import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [renderKey, setRenderKey] = useState(0); // Adding a render key to force re-render

  // Force re-render whenever 'user' changes
  useEffect(() => {
    setRenderKey((prevKey) => prevKey + 1); // Increment the key to trigger re-render
  }, [user]);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold font-satisfy text-white">
            Event Manager
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="hover:text-yellow-300 transition duration-300 flex items-center"
              >
                <UserIcon className="w-6 h-6 mr-1" />
                <span>Profile</span>
              </Link>
              <Link
                to="/create"
                className="hover:text-yellow-300 transition duration-300"
              >
                Create Event
              </Link>
              <button onClick={logout} className="hover:text-yellow-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="hover:text-yellow-300 transition duration-300 flex items-center"
              >
                <UserIcon className="w-6 h-6 mr-1" />
                <span>Register</span>
              </Link>
              <Link
                to="/login"
                className="hover:text-yellow-300 transition duration-300 flex items-center"
              >
                <UserIcon className="w-6 h-6 mr-1" />
                <span>Login</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
