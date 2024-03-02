import Header from "./Header";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  fetchUsers,
  CreateNewUser,
  UpdateUserStatus,
  ResetUserPass,
} from "../features/api/userAPI";
import { Navigate } from "react-router";

import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Users = () => {
  const { userAuth } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [currentUser, setCurrentUserId] = useState(null);
  const [currentUserName, setCurrentUserName] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersPage, setUsersPage] = useState([]);

  const [params, setParams] = useState({
    username: "",
    status: "",
    role: "",
    page: 1,
    pageSize: 30,
  });

  const handleFilterChange = (name, value) => {
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    role: "",
  });

  const [formData2, setFormData2] = useState({
    user_id: "",
    status: "",
  });

  const [formData3, setFormData3] = useState({
    user_id: "",
    password: "",
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const openModal2 = (user_id, user_name) => {
    setShowModal2(true);
    setCurrentUserId(user_id);
    setCurrentUserName(user_name);
  };
  const closeModal2 = () => {
    setShowModal2(false);
  };
  const openModal3 = (user_id, user_name) => {
    setShowModal3(true);
    setCurrentUserId(user_id);
    setCurrentUserName(user_name);
  };
  const closeModal3 = () => {
    setShowModal3(false);
  };

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await CreateNewUser(
        formData.username,
        formData.password,
        formData.name,
        formData.role,
        userAuth
      );

      if (response.status === 200) {
        const getUsers = async () => {
          setIsLoading(true);
          const users = await fetchUsers(params, userAuth);
          setUsers(users.data);
          setUsersPage(users);
          setIsLoading(false);
        };
        getUsers();
      } else {
        alert("Fail to Create");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในขณะกำลังสร้าง user:", error);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      const response = await UpdateUserStatus(
        currentUser,
        formData2.status,
        userAuth
      );

      if (response.status === 200) {
        setIsLoading(true);
        const users = await fetchUsers(params, userAuth);
        setUsers(users.data);
        setUsersPage(users);
        closeModal2();
        setIsLoading(false);
      } else {
        alert("Fail to Change");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในขณะกำลังอัพเดท user:", error);
    }
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();

    try {
      const response = await ResetUserPass(
        currentUser,
        formData3.password,
        userAuth
      );

      if (response.status === 200) {
        setIsLoading(true);
        const users = await fetchUsers(params, userAuth);
        setUsers(users.data);
        setUsersPage(users);
        closeModal3();
        setIsLoading(false);
      } else {
        alert("Fail to Change");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในขณะกำลังอัพเดท user:", error);
    }
  };

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const usersData = await fetchUsers(params,userAuth);
  //     setUsers(usersData.data)
  // setUsersPage(usersData);
  //   };
  //   getUsers();
  // }, [fetchUsers]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const users = await fetchUsers(params, userAuth);
      setUsers(users.data);
      setUsersPage(users);
      setIsLoading(false);
    };
    fetchData();
  }, [fetchUsers]);

  useEffect(() => {
    const searchByParams = async () => {
      setIsLoading(true);
      const users = await fetchUsers(params, userAuth);
      setUsers(users.data);
      setUsersPage(users);
      setIsLoading(false);
    };
    searchByParams();
  }, [params, userAuth]);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShow(true);
      }, 10);
    } else {
      setShow(false);
    }

    if (showModal2) {
      setTimeout(() => {
        setShow2(true);
      }, 10);
    } else {
      setShow2(false);
    }

    if (showModal3) {
      setTimeout(() => {
        setShow3(true);
      }, 10);
    } else {
      setShow3(false);
    }
  }, [showModal, showModal2, showModal3]);

  console.log(users);
  return (
    <>
      <Header />
      <div
        className="container overflow-auto"
        style={{ textAlign: "-webkit-center" }}
      >
        <div className="row">
          <div className="col-3">
            <div className="form-group my-1 text-start">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Domain Name"
                value={params.name}
                onChange={(e) => handleFilterChange("username", e.target.value)}
              />
            </div>
          </div>
          <div className="col-2">
            <div className="form-group my-1 text-start">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                className="form-control"
                style={{ cursor: "pointer" }}
                value={params.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
          <div className="col-2">
            <div className="form-group my-1 text-start">
              <label htmlFor="status">Role</label>
              <select
                id="role"
                className="form-control"
                style={{ cursor: "pointer" }}
                value={params.role}
                onChange={(e) => handleFilterChange("role", e.target.value)}
              >
                <option value="admin">admin</option>
                <option value="jater">jater</option>
                <option value="boss">boss</option>
                <option value="team">team</option>
              </select>
            </div>
          </div>
          <div className="col text-end align-self-center">
            <button className="btn btn-sm btn-dark my-2" onClick={openModal}>
              + Create User
            </button>
          </div>
        </div>
        <table
          className="table table-bordered table-striped"
          style={{ whiteSpace: "nowrap" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>username</th>
              <th>name</th>
              <th>role</th>
              <th>status</th>
              <th width={400}>manage</th>
            </tr>
          </thead>
          <tbody className="overflow-auto">
            {isLoading && (
              <tr>
                <td className="text-center" colSpan={6}>
                  <div className="spinner-grow" role="status"></div>
                </td>
              </tr>
            )}

            {users &&
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-dark mx-1"
                      onClick={(e) => openModal2(user.id, user.username)}
                    >
                      Edit Status
                    </button>
                    <button
                      className="btn btn-sm btn-dark mx-1"
                      onClick={(e) => openModal3(user.id, user.username)}
                    >
                      Edit Pass
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="row">
          <div className="col text-start">
            <div
              className="form-group align-items-center my-1"
              style={{ width: "fit-content" }}
            >
              <label className="mx-2" htmlFor="pageSize">
                Page Size :
              </label>
              <select
                id="pageSize"
                className="form-control"
                style={{ cursor: "pointer" }}
                value={params.pageSize}
                onChange={(e) => handleFilterChange("pageSize", e.target.value)}
              >
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          </div>
          <div className="col align-self-center">
            <div className="form-group my-1 text-end ">
              <label className="mx-2" htmlFor="pageNavi">
                Page :{" "}
              </label>
              <div
                className="btn-group"
                role="group"
                aria-label="Page navigation"
              >
                {/* สร้างปุ่มกดแต่ละหมายเลขหน้า */}
                <Stack spacing={2}>
                  <Pagination
                    page={params.page}
                    onChange={(e) => handleFilterChange("page", e.target.value)}
                    count={Math.ceil(usersPage.total / usersPage.pageSize)}
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className={`modal fade${show ? " show" : ""}`}
        style={{
          display: showModal ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        onClick={() => closeModal()}
      >
        <div
          className="modal-dialog"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create User
              </h5>
              <button
                type="button"
                className="btn btn-sm"
                aria-label="Close"
                onClick={() => closeModal()} // เมื่อคลิกปุ่มปิดใน modal ให้ปิด modal
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* ฟอร์มสำหรับการสร้าง user */}
              <form onSubmit={handleSubmit}>
                <div className="form-group my-1">
                  <label htmlFor="username">Username</label>
                  <input
                    type="number"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                </div>
                <div className="form-group my-1">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div className="form-group my-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group my-1">
                  <label htmlFor="role">Role:</label>
                  <select
                    id="role"
                    className="form-control"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    required
                  >
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="jater">Jater</option>
                    <option value="boss">Boss</option>
                    <option value="team">Team</option>
                  </select>
                </div>
                <hr className="bg-dark opacity-10" />
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade${show2 ? " show" : ""}`}
        style={{
          display: showModal2 ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        onClick={() => closeModal2()}
      >
        <div
          className="modal-dialog"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change Status :{" "}
                <strong className="h5">{currentUserName}</strong>
              </h5>
              <button
                type="button"
                className="btn btn-sm"
                aria-label="Close"
                onClick={() => closeModal2()} // เมื่อคลิกปุ่มปิดใน modal ให้ปิด modal
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit2}>
                <div className="form-group my-1">
                  <label htmlFor="status">Status:</label>
                  <select
                    id="status"
                    className="form-control"
                    value={formData2.status}
                    onChange={(e) =>
                      setFormData2({ ...formData2, status: e.target.value })
                    }
                    required
                  >
                    <option value="">Select a status</option>
                    <option value="active">active</option>
                    <option value="blocked">blocked</option>
                  </select>
                </div>

                <hr className="bg-dark opacity-10" />
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade${show3 ? " show" : ""}`}
        style={{
          display: showModal3 ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        onClick={() => closeModal3()}
      >
        <div
          className="modal-dialog"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change User Password :{" "}
                <strong className="h5">{currentUserName}</strong>
              </h5>
              <button
                type="button"
                className="btn btn-sm"
                aria-label="Close"
                onClick={() => closeModal3()} // เมื่อคลิกปุ่มปิดใน modal ให้ปิด modal
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit3}>
                <div className="form-group my-1">
                  <label htmlFor="password3">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    placeholder="Enter New password"
                    value={formData3.password}
                    onChange={(e) =>
                      setFormData3({ ...formData3, password: e.target.value })
                    }
                  />
                </div>

                <hr className="bg-dark opacity-10" />
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
