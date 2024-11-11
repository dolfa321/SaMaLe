import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-3xl font-bold underline">App</h1>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
