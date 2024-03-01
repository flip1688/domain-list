import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userRefreshToken } from "../features/auth/authActions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const { loading, userAuth, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const username = userInfo ? userInfo.username : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (userAuth) {
      dispatch(userRefreshToken(userAuth));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light flex-wrap flex-lg-nowrap">
        <div className="container-fluid">
          <a className="navbar-brand align-items-center" href="/">
            Domain-List
          </a>
          <button
            className="navbar-toggler border border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav flex-row flex-wrap ms-lg-auto w-auto">
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
                  Dashboard
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
                  Users
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
                  Domains
                </Link>
              </li>
              <li className="nav-item col-6 col-lg-auto ">
                <Link
                  className={`nav-link border rounded m-1 px-2 ${
                    location.pathname === "/report"
                      ? "bg-secondary text-white active"
                      : ""
                  }`}
                  aria-current="page"
                  to="/report"
                >
                  Report
                </Link>
              </li>
            </ul>
            <hr className="d-lg-none text-dark-25 bg-dark" />
            <ul className="navbar-nav flex-row flex-wrap ms-lg-auto w-auto ">
              <li className="nav-item col-6 col-lg-auto">
                <div className="btn-group dropstart">
                  <button
                    className="btn btn-sm btn-light dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="9"
                        r="3"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="mx-1">{username}</span>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link to="/me" className="dropdown-item">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/logout" className="dropdown-item">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
