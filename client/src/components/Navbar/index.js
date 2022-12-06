import React from "react";
import { Link  } from "react-router-dom";
import Auth from "../../utils/auth";

const Navbar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <nav>
            <Link to="/home"> Home </Link>
    
            <Link to="/me"> Profile </Link>

            <button onClick={logout}> Logout </button> 

      </nav>
       ) 
    }

export default Navbar;