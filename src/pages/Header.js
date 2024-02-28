import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const username = user ? user.username : null;

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light flex-wrap flex-lg-nowrap">
        <div class="container-fluid">
          <a class="navbar-brand align-items-center" href="/">
            Domain-List
          </a>
          <button
            class="navbar-toggler border border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarNav">
            <ul class="navbar-nav flex-row flex-wrap ms-lg-auto w-auto">
              <li class="nav-item col-6 col-lg-auto ">
                <Link
                  class={`nav-link border rounded m-1 px-2 ${
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
              <li class="nav-item col-6 col-lg-auto ">
                <Link
                  class={`nav-link border rounded m-1 px-2 ${
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
              <li class="nav-item col-6 col-lg-auto ">
                <Link
                  class={`nav-link border rounded m-1 px-2 ${
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
            <hr class="d-lg-none text-dark-25 bg-dark" />
            <ul class="navbar-nav flex-row flex-wrap ms-lg-auto w-auto ">
              <li class="nav-item col-6 col-lg-auto">
                <div class="btn-group dropstart">
                  <button
                    class="btn btn-sm btn-light dropdown-toggle"
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
                        stroke-width="1.5"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#1C274C"
                        stroke-width="1.5"
                      />
                      <path
                        d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                        stroke="#1C274C"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span className="mx-1">{username}</span>
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link to="/me" class="dropdown-item">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/logout" class="dropdown-item">
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
