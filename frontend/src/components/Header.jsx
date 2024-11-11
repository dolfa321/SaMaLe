import React from "react";
import logo from "../assets/logotip.png";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="relative h-[130px] bg-white shadow-md flex items-center justify-between px-8">
      <div className="flex-1 flex justify-center">
        <Link to="/">
          <img src={logo} alt="AI Logo" className="h-16 cursor-pointer" />
        </Link>
      </div>

      {user && (
        <div className="absolute right-8">
          <div className="w-12 h-12 bg-[#EE6C4D] text-white rounded-full flex items-center justify-center text-lg font-bold">
            {user.name[0].toUpperCase() + user.lastname[0].toUpperCase()}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
