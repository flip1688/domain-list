// import "bulma/css/bulma.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import Users from "./pages/Users";
import Domains from "./pages/Domain";
import Payments from "./pages/Payment";
import Docs from "./pages/Docs";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<Users />} />
          <Route path="/domain" element={<Domains />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/me" element={<MyProfile />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
