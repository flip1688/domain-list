import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
    };

    handleLogout();
    navigate("/");

  }, [logout, navigate]);

  return null; 
};

export default Logout;