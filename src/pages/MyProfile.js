import Header from "./Header";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChangeOwnName, ChangeOwnPass } from "../features/api/userAPI";
import Sidebar from "./Sidebar";

const MyProfile = () => {
  const { userAuth, userInfo } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  });
  const [formData2, setFormData2] = useState({
    name: "",
  });

  const [user, setUsers] = useState(userInfo);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openModal2 = () => setShowModal2(true);
  const closeModal2 = () => setShowModal2(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ChangeOwnPass(
        formData.password,
        formData.newPassword,
        userAuth
      );

      if (response.status === 200) {
        setUsers(userInfo);
        closeModal();
      } else {
        alert("Fail to Change");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในขณะกำลังสร้าง user:", error);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      const response = await ChangeOwnName(formData2.name, userAuth);
      if (response.status === 200) {
        setUsers(response.data);
        closeModal2();
      } else {
        alert("Fail to Change");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในขณะกำลังสร้าง user:", error);
    }
  };

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
  }, [showModal, showModal2]);

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-body-tertiary">
          <Header />
        </div>
        <div className="row">
          <div className="d-none d-lg-block col-lg-2 bg-body-tertiary">
            <Sidebar />
          </div>
          <div className="col-12 col-lg-10">
            <div
              className="container overflow-auto"
              style={{ textAlign: "-webkit-center" }}
            >
              {user && (
                <div className="card mt-2" style={{ width: "600px" }}>
                  <div className="card-header bg-secondary">
                    <strong className="text-white">บัญชีของฉัน</strong>
                  </div>
                  <div className="card-body p-0 overflow-auto">
                    <table
                      className="table table-striped my-0"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <thead>
                        <tr>
                          <th>ประเภท</th>
                          <th>การตั้งค่า</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>ID</td>
                          <td>{user.id}</td>
                        </tr>
                        <tr>
                          <td>Username</td>
                          <td>{user.username}</td>
                        </tr>
                        <tr>
                          <td>name</td>
                          <td>
                            <div className="border rounded p-2 mb-2">
                              <strong>{user.name}</strong>
                            </div>
                            <button
                              className="btn btn-outline-light w-100"
                              id="basic-url"
                              onClick={openModal2}
                            >
                              Change Own Name
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>role</td>
                          <td>{user.role}</td>
                        </tr>
                        <tr>
                          <td>status</td>
                          <td>{user.status}</td>
                        </tr>
                        <tr>
                          <td>createdBy</td>
                          <td>{user.createdBy}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="card-footer d-block">
                    <div className="my-2" htmlFor="basic-url">
                      <strong>Your Password</strong>
                    </div>
                    <button
                      className="btn btn-outline-light w-100"
                      id="basic-url"
                      onClick={openModal}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
                Change Own Password
              </h5>
              <button
                type="button"
                className="btn "
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
                  <label htmlFor="name">New Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter New Password"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
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

      <div
        className={`modal fade${show2 ? " show" : ""}`}
        style={{
          display: showModal2 ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel2"
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
              <h5 className="modal-title" id="exampleModalLabel2">
                Change Own Name
              </h5>
              <button
                type="button"
                className="btn "
                aria-label="Close"
                onClick={() => closeModal2()} // เมื่อคลิกปุ่มปิดใน modal ให้ปิด modal
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit2}>
                <div className="form-group my-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="name"
                    value={formData2.name}
                    onChange={(e) =>
                      setFormData2({ ...formData2, name: e.target.value })
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

export default MyProfile;
