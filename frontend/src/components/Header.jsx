import React from "react";
import logo from "../assets/logotip.png";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import UserMenu from "./UserMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axios.post("/auth/logout");
    if (response.status === 200) {
      toast.success("Logout successful!");
      setUser(null);
      navigate("/");
    }
  };

  return (
    <header className="relative h-[130px] bg-white shadow-md flex items-center justify-between px-8">
      <div className="flex-1 flex justify-center">
        <Link to="/">
          <img src={logo} alt="AI Logo" className="h-16 cursor-pointer" />
        </Link>
      </div>
      <UserMenu
        user={user}
        onLogout={() => {
          handleLogout();
        }}
      />
    </header>
  );
};

export default Header;
