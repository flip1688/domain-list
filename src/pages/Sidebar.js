import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userRefreshToken } from "../features/auth/authActions";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { loading, userAuth, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const username = userInfo ? userInfo.username : null;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userAuth) {
  //     dispatch(userRefreshToken(userAuth));
  //   } else {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <ul className="navbar-nav flex-wrap ms-lg-auto w-auto">
      <li className="nav-item col-6 col-lg-auto ">
        <Link
          className={`nav-link border rounded m-1 px-2 ${
            location.pathname === "/home"
              ? "bg-secondary text-white active"
              : ""
          }`}
          aria-current="page"
          to="/home"
        >
          ค้นหา
        </Link>
      </li>
      <li className="nav-item col-6 col-lg-auto ">
        <Link
          className={`nav-link border rounded m-1 px-2 ${
            location.pathname === "/user"
              ? "bg-secondary text-white active"
              : ""
          }`}
          aria-current="page"
          to="/user"
        >
          ผู้ใช้งาน
        </Link>
      </li>
      <li className="nav-item col-6 col-lg-auto ">
        <Link
          className={`nav-link border rounded m-1 px-2 ${
            location.pathname === "/domain"
              ? "bg-secondary text-white active"
              : ""
          }`}
          aria-current="page"
          to="/domain"
        >
          รายชื่อเว็บ
        </Link>
      </li>
      <li className="nav-item col-6 col-lg-auto ">
        <Link
          className={`nav-link border rounded m-1 px-2 ${
            location.pathname === "/blocked"
              ? "bg-secondary text-white active"
              : ""
          }`}
          aria-current="page"
          to="/blocked"
        >
          รายการบล็อค
        </Link>
      </li>
      <li className="nav-item col-6 col-lg-auto ">
        <Link
          className={`nav-link border rounded m-1 px-2 ${
            location.pathname === "/payment"
              ? "bg-secondary text-white active"
              : ""
          }`}
          aria-current="page"
          to="/payment"
        >
          การชำระเงิน
        </Link>
      </li>
      <li className="nav-item col-6 col-lg-auto ">
        <Link
          className={`nav-link border rounded m-1 px-2 ${
            location.pathname === "/docs"
              ? "bg-secondary text-white active"
              : ""
          }`}
          aria-current="page"
          to="/docs"
        >
          คู่มือการใช้งาน
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
