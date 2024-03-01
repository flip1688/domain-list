import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("auth");
    dispatch(logout());
    navigate("/login");
  }, [logout]);

};
export default Logout;
