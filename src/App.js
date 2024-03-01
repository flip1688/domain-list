import "bulma/css/bulma.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<Users />} />
          <Route path="/report" element={<Home />} />
          <Route path="/me" element={<MyProfile />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
