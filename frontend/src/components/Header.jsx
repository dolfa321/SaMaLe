import React from 'react';
import logo from '../assets/logotip.png';
import {Link} from "react-router-dom";


const Header = () => {

    const isLoggedIn = true;
    const user = { firstName: "Janez", lastName: "Novak" };

    const initials = user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase();

    return (
        <header className="relative h-[130px] bg-white shadow-md flex items-center justify-between px-8">
            <div className="flex-1 flex justify-center">
                <Link to="/">
                    <img src={logo} alt="AI Logo" className="h-16 cursor-pointer"/>
                </Link>
            </div>

            {isLoggedIn && (
                <div className="absolute right-8">
                    <div
                        className="w-12 h-12 bg-[#EE6C4D] text-white rounded-full flex items-center justify-center text-lg font-bold">
                        {initials}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;