import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";
function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { email, password } = formData;

      console.log("FormData", formData);

      // Axios POST request
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Login successful!");
        setUser(response.data);
        navigate("/chat");
      } else {
        toast.error("Unexpected response status");
      }
    } catch (error) {
      if (error.response) {
        console.log("Error Response:", error.response);
        console.log("Status Code:", error.response.status);
        console.log("Error Data:", error.response.data);

        toast.error(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made, but no response was received
        console.log("No response received:", error.request);
        toast.error("No response from the server. Please try again later.");
      } else {
        // Something else happened
        console.log("Error:", error.message);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="h-[calc(100vh-130px)] w-full flex items-center justify-center bg-white">
      <div className="bg-custom-blue p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome back</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-700 font-semibold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
