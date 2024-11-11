import React from 'react';
import logo from '../assets/logotip.png'; // Pot do slike

const Header = () => {
    return (
        <header className="relative h-[130px] bg-white shadow-md flex items-center justify-center">
            <img src={logo} alt="AI Logo" className="h-16" />
        </header>
    );
};

export default Header;