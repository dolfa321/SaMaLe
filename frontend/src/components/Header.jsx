import React from 'react';
import logo from '../assets/logotip.png';
import {Link} from "react-router-dom";
const Header = () => {
    return (
        <header className="relative h-[130px] bg-white shadow-md flex items-center justify-center">
            <Link to="/">
                <img src={logo} alt="AI Logo" className="h-16 cursor-pointer" />
            </Link>
        </header>
    );
};

export default Header;