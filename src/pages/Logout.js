import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {logout} from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      dispatch(logout())
    };

    handleLogout();
    navigate("/");

  }, []);

  return  null;
};

export default Logout;
