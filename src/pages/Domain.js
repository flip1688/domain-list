import { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import {
  CreateNewDomain,
  fetchDomains,
  updateDomainName,
  updateDomainAmount,
  updateDomainRemarks,
  updateDomainStatus,
} from "../features/api/domainAPI";

const Domains = () => {
  const { userAuth } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal0, setShowModal0] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentUser, setCurrentUserId] = useState(null);
  const [currentUserName, setCurrentUserName] = useState(null);
  const [domains, setDomain] = useState([]);

  const [formData0, setFormData0] = useState({
    name: "",
    amount: "",
    remarks: "",
  });

  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
  });

  const [formData2, setFormData2] = useState({
    user_id: "",
    status: "",
  });

  const [formData3, setFormData3] = useState({
    user_id: "",
    remarks: "",
  });

  const [formData4, setFormData4] = useState({
    user_id: "",
    status: "",
  });
  const openModal0 = () => {
    setShowModal0(true);
  };
  const closeModal0 = () => {
    setShowModal0(false);
  };

  const openModal = (user_id, user_name) => {
    setShowModal(true);
    setCurrentUserId(user_id);
    setCurrentUserName(user_name);
  };
  const closeModal = () => {
    setShowModal(false);
  };
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
  const openModal4 = (user_id, user_name) => {
    setShowModal4(true);
    setCurrentUserId(user_id);
    setCurrentUserName(user_name);
  };
  const closeModal4 = () => {
    setShowModal4(false);
  };

  const [show0, setShow0] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  const handleSubmit0 = async (e) => {
    e.preventDefault();

    try {
      const response = await CreateNewDomain(
        formData0.name,
        formData0.amount,
        formData0.remarks,
        userAuth
      );

      if (response.status === 200) {
        const getUsers = async () => {
          setIsLoading(true);
          const domainsData = await fetchDomains(userAuth);
          setDomain(domainsData);
          setIsLoading(false);
          closeModal0();
        };
        getUsers();
      } else {
        alert("Fail to Create");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในขณะกำลังสร้าง user:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateDomainName(
        currentUser,
        formData.name,
        userAuth
      );

      if (response.status === 200) {
        const getDomains = async () => {
          setIsLoading(true);
          const domainsData = await fetchDomains(userAuth);
          setDomain(domainsData);
          setIsLoading(false);
          closeModal0();
        };
        getDomains();
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
      const response = await updateDomainAmount(
        currentUser,
        formData2.amount,
        userAuth
      );

      if (response.status === 200) {
        const getDomains = async () => {
          setIsLoading(true);
          const domainsData = await fetchDomains(userAuth);
          setDomain(domainsData);
          setIsLoading(false);
          closeModal2();
        };
        getDomains();
      } else {
        alert("Fail to Create");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในขณะกำลังสร้าง user:", error);
    }
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();

    try {
      const response = await updateDomainRemarks(
        currentUser,
        formData3.remarks,
        userAuth
      );

      if (response.status === 200) {
        const getDomains = async () => {
          setIsLoading(true);
          const domainsData = await fetchDomains(userAuth);
          setDomain(domainsData);
          setIsLoading(false);
          closeModal3();
        };
        getDomains();
      } else {
        alert("Fail to Create");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในขณะกำลังสร้าง user:", error);
    }
  };

  const handleSubmit4 = async (e) => {
    e.preventDefault();

    try {
      const response = await updateDomainStatus(
        currentUser,
        formData4.status,
        userAuth
      );

      if (response.status === 200) {
        const getDomains = async () => {
          setIsLoading(true);
          const domainsData = await fetchDomains(userAuth);
          setDomain(domainsData);
          setIsLoading(false);
          closeModal4();
        };
        getDomains();
      } else {
        alert("Fail to Create");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในขณะกำลังสร้าง user:", error);
    }
  };

  useEffect(() => {
    const getDomains = async () => {
      setIsLoading(true);
      const domainsData = await fetchDomains(userAuth);
      setDomain(domainsData);
      setIsLoading(false);
    };
    getDomains();
  }, [fetchDomains]);

  useEffect(() => {
    if (showModal0) {
      setTimeout(() => {
        setShow0(true);
      }, 10);
    } else {
      setShow0(false);
    }

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

    if (showModal4) {
      setTimeout(() => {
        setShow4(true);
      }, 10);
    } else {
      setShow4(false);
    }
  }, [showModal0, showModal, showModal2, showModal3, showModal4]);

  return (
    <>
      <Header />
      <div
        className="container overflow-auto"
        style={{ textAlign: "-webkit-center" }}
      >
        <div className="text-end">
          <button className="btn btn-sm btn-dark my-2" onClick={(e) => openModal0()}>+ Create Domain</button>
        </div>
        {/* Show loading indicator */}
        <table
          className="table table-bordered table-striped"
          style={{ whiteSpace: "nowrap" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>หมายเหตุ</th>
              <th>amount</th>
              <th>status</th>
              <th>manage</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="text-center" colSpan={6}>
                  <div className="spinner-grow" role="status"></div>
                </td>
              </tr>
            )}

            {domains &&
              domains.map((domain, index) => (
                <tr key={domain.id}>
                  <td>{index + 1}</td>
                  <td>{domain.name}</td>
                  <td>{domain.remarks}</td>
                  <td>{domain.amount}</td>
                  <td>{domain.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-dark mx-1"
                      onClick={(e) => openModal(domain.id, domain.name)}
                    >
                      Edit Name
                    </button>
                    <button
                      className="btn btn-sm btn-dark mx-1"
                      onClick={(e) => openModal2(domain.id, domain.name)}
                    >
                      Edit Amount
                    </button>
                    <button
                      className="btn btn-sm btn-dark mx-1"
                      onClick={(e) => openModal3(domain.id, domain.name)}
                    >
                      Edit Remarks
                    </button>
                    <button
                      className="btn btn-sm btn-dark mx-1"
                      onClick={(e) => openModal4(domain.id, domain.name)}
                    >
                      Edit Status
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div
        className={`modal fade${show0 ? " show" : ""}`}
        style={{
          display: showModal0 ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        onClick={() => closeModal0()}
      >
        <div
          className="modal-dialog"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Domains : <strong className="h5"></strong>
              </h5>
              <button
                type="button"
                className="btn btn-sm"
                aria-label="Close"
                onClick={() => closeModal0()} // เมื่อคลิกปุ่มปิดใน modal ให้ปิด modal
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit0}>
                <div className="form-group my-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Domain Name"
                    value={formData0.name}
                    onChange={(e) =>
                      setFormData0({ ...formData0, name: e.target.value })
                    }
                  />
                  <small>ให้อยู่ในรูปแบบ ex: example.com</small>
                </div>

                <div className="form-group my-1">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    placeholder="Enter amount"
                    value={formData0.amount}
                    step="any"
                    onChange={(e) =>
                      setFormData0({ ...formData0, amount: e.target.value })
                    }
                  />
                </div>

                <div className="form-group my-1">
                  <label htmlFor="remarks">Remarks</label>
                  <input
                    type="text"
                    className="form-control"
                    id="remarks"
                    placeholder="Enter Remarks"
                    value={formData0.remarks}
                    onChange={(e) =>
                      setFormData0({ ...formData0, remarks: e.target.value })
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
                Edit Name : <strong className="h5">{currentUserName}</strong>
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
              <form onSubmit={handleSubmit}>
                <div className="form-group my-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter New Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
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
                Edit Amount : <strong className="h5">{currentUserName}</strong>
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
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    placeholder="Enter amount"
                    value={formData2.amount}
                    step="any"
                    onChange={(e) =>
                      setFormData2({ ...formData2, amount: e.target.value })
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
                Edit Remarks : <strong className="h5">{currentUserName}</strong>
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
                  <label htmlFor="remarks">Remarks</label>
                  <input
                    type="text"
                    className="form-control"
                    id="remarks"
                    placeholder="Enter Remarks"
                    value={formData3.remarks}
                    onChange={(e) =>
                      setFormData3({ ...formData3, remarks: e.target.value })
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
        className={`modal fade${show4 ? " show" : ""}`}
        style={{
          display: showModal4 ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        onClick={() => closeModal4()}
      >
        <div
          className="modal-dialog"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Status : <strong className="h5">{currentUserName}</strong>
              </h5>
              <button
                type="button"
                className="btn btn-sm"
                aria-label="Close"
                onClick={() => closeModal4()} // เมื่อคลิกปุ่มปิดใน modal ให้ปิด modal
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit4}>
                <div className="form-group my-1">
                  <label htmlFor="status">Status</label>
                  <select
                    id="amount"
                    className="form-control"
                    value={formData4.status}
                    onChange={(e) =>
                      setFormData4({ ...formData4, status: e.target.value })
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
    </>
  );
};

export default Domains;
