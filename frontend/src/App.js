import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./context/userContext";
import axios from "axios";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Home from "./pages/Home";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-col items-center justify-center flex-1">
          <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </UserContextProvider>
  );
}

export default App;
