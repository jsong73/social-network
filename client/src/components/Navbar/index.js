import React from "react";
import { Link  } from "react-router-dom";
import Auth from "../../utils/auth";

const Navbar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <nav className="float-right">
            <div className="">
            <Link 
            className="inline-block rounded-lg px-3 py-1.5 text-md leading-6 text-gray-900  ring-gray-900/10 hover:ring-gray-900/20"
            to="/home"> Home </Link>
    
            <Link 
            className="inline-block rounded-lg px-3 py-1.5 text-md leading-6 text-gray-900  ring-gray-900/10 hover:ring-gray-900/20"
            to="/me"> Profile </Link>

            <button 
            className="inline-block rounded-lg px-3 py-1.5 text-md leading-6 text-gray-900  ring-gray-900/10 hover:ring-gray-900/20"
            onClick={logout}> Logout </button> 
            </div>
      </nav>
       ) 
    }

export default Navbar;