import Header from "./Header";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Users = () => {
  const { fetchUsers, isAuthenticated, CreateNewUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    role: "",
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await CreateNewUser(
      //   formData.username,
      //   formData.password,
      //   formData.name,
      //   formData.role
      // );

      const response = await axios.post("/api/user", {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        role: formData.role,
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
    });

      if (response.status === 200) {
        const getUsers = async () => {
          const usersData = await fetchUsers();
          setUsers(usersData);
        };
        getUsers();
      } else {
        alert("Fail to Create");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในขณะกำลังสร้าง user:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      const getUsers = async () => {
        const usersData = await fetchUsers();
        setUsers(usersData);
      };
      getUsers();
    }
  }, [fetchUsers, isAuthenticated]);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShow(true);
      }, 10);
    } else {
      setShow(false);
    }
  }, [showModal]);

  return (
    <>
      <Header />
      <div className="container" style={{ textAlign: "-webkit-center" }}>
        <table className="table table-bordered table-striped mt-2">
          <thead>
            <tr>
              <th>#</th>
              <th>username</th>
              <th>name</th>
              <th>role</th>
              <th>status</th>
              <th>manage</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
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
                    <option value="Admin">Admin</option>
                    <option value="Jater">Jater</option>
                    <option value="Boss">Boss</option>
                    <option value="Team">Team</option>
                  </select>
                </div>
                <hr className="bg-dark opacity-10"/>
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
