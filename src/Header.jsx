import React from "react";
import { Link, Outlet } from "react-router-dom";


const Header = () => {
    return (
        
            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/movies"}>Movies</Link>
            </nav>
       
    )

}

export default Header