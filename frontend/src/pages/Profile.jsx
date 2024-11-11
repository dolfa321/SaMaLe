import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Profile() {
  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    const response = await axios.post("/auth/logout");
    if (response.status === 200) {
      toast.success("Logout successful!");
    }
  };
  return (
    <div>
      Profile
      {user ? (
        <>
          <p>
            {user.name} {user.lastname}
          </p>
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <>
          <p>Loading...</p>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}