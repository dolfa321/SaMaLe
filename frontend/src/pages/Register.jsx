import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { name, lastname, email, password, confirmPassword } = formData;

      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const response = await axios.post("/auth/register", {
        name,
        lastname,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        // Handle specific error responses
        if (error.response.status === 400) {
          toast.error(
            error.response.data.message || "Registration failed!",
            {}
          );
        } else {
          toast.error(`Error: ${error.response.data.message}`);
        }
      } else {
        // Generic error (e.g., network issues)
        toast.error("An unexpected error occurred!");
      }
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-blue-300 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Lastname"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="E-mail"
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Have account?{" "}
          <a href="/login" className="text-blue-700 font-semibold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
