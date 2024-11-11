import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Home from "./pages/Home";
function App() {
  return (
      <div className="min-h-screen flex flex-col">
          <Header/>
          <div className="flex flex-col items-center justify-center flex-1">
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
              </Routes>
          </div>
      </div>
  );
}

export default App;
