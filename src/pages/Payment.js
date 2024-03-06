import * as React from "react";
import { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import {
  CreatePayment,
  fetchPayments,
  updatePaymentTime,
  updatePaymentAmount,
  updatePaymentRemarks,
  updatePaymentDomain,
} from "../features/api/paymentAPI";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { fetchDomains } from "../features/api/domainAPI";
import { light } from "@mui/material/styles/createPalette";
import Sidebar from "./Sidebar";

const Payments = () => {
  const { userAuth } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal0, setShowModal0] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [currentPaymentDomain, setCurrentPaymentDomain] = useState(null);
  const [payments, setPayment] = useState([]);
  const [paymentsPage, setPaymentPage] = useState([]);
  const [TimeValue, setTimeValue] = React.useState(null);
  const [TimeFromValue, setTimeFromValue] = React.useState(null);
  const [TimeToValue, setTimeToValue] = React.useState(null);

  const [params, setParams] = useState({
    domainId: "",
    createdBy: "",
    from: "",
    to: "",
    page: 1,
    pageSize: 30,
  });

  const [domains, setDomains] = useState([]);
  const [paramsDomain, setParamsDomain] = useState({
    name: "",
    status: "all",
    page: 1,
    pageSize: 30,
    domainId: "", // เพิ่ม domainId เข้าไปใน params
  });

  const [formData0, setFormData0] = React.useState({
    time: TimeValue,
    domainId: "",
    amount: "",
    remarks: "",
  });

  const [formData, setFormData] = useState({
    payment_id: "",
    time: "",
  });

  const [formData2, setFormData2] = useState({
    payment_id: "",
    amount: "",
  });

  const [formData3, setFormData3] = useState({
    payment_id: "",
    remarks: "",
  });

  const [formData4, setFormData4] = useState({
    payment_id: "",
    domainId: "",
  });
  const openModal0 = () => {
    const fetchData = async () => {
      const domainsData = await fetchDomains(params, userAuth);
      setDomains(domainsData.data);
    };
    fetchData();
    console.log(domains);
    setShowModal0(true);
  };
  const closeModal0 = () => {
    setShowModal0(false);
  };

  const openModal = (payment_id, payment_domain) => {
    setShowModal(true);
    setCurrentPayment(payment_id);
    setCurrentPaymentDomain(payment_domain);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal2 = (payment_id, payment_domain) => {
    setShowModal2(true);
    setCurrentPayment(payment_id);
    setCurrentPaymentDomain(payment_domain);
  };
  const closeModal2 = () => {
    setShowModal2(false);
  };
  const openModal3 = (payment_id, payment_domain) => {
    setShowModal3(true);
    setCurrentPayment(payment_id);
    setCurrentPaymentDomain(payment_domain);
  };
  const closeModal3 = () => {
    setShowModal3(false);
  };
  const openModal4 = (payment_id, payment_domain) => {
    setShowModal4(true);
    setCurrentPayment(payment_id);
    setCurrentPaymentDomain(payment_domain);
  };
  const closeModal4 = () => {
    setShowModal4(false);
  };

  const [show0, setShow0] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setParamsDomain((prevParams) => ({
      ...prevParams,
      name: value,
    }));
    console.log(formData0);
  };

  const handleFilterChange = (name, value) => {
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSubmit0 = async (e) => {
    e.preventDefault();
    try {
      const response = await CreatePayment(
        formData0.time,
        formData0.domainId,
        formData0.amount,
        formData0.remarks,
        userAuth
      );

      if (response.status === 200) {
        const getUsers = async () => {
          setIsLoading(true);
          const paymentData = await fetchPayments(params, userAuth);
          setPayment(paymentData.data);
          setPaymentPage(paymentData);
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
      const response = await updatePaymentTime(
        currentPayment,
        formData.time,
        userAuth
      );

      if (response.status === 200) {
        const getPayments = async () => {
          setIsLoading(true);
          const paymentData = await fetchPayments(params, userAuth);
          setPayment(paymentData.data);
          setPaymentPage(paymentData);
          setIsLoading(false);
          closeModal();
        };
        getPayments();
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
      const response = await updatePaymentAmount(
        currentPayment,
        formData2.amount,
        userAuth
      );

      if (response.status === 200) {
        const getPayments = async () => {
          setIsLoading(true);
          const paymentData = await fetchPayments(params, userAuth);
          setPayment(paymentData.data);
          setPaymentPage(paymentData);
          setIsLoading(false);
          closeModal2();
        };
        getPayments();
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
      const response = await updatePaymentRemarks(
        currentPayment,
        formData3.remarks,
        userAuth
      );

      if (response.status === 200) {
        const getPayments = async () => {
          setIsLoading(true);
          const paymentData = await fetchPayments(params, userAuth);
          setPayment(paymentData.data);
          setPaymentPage(paymentData);
          setIsLoading(false);
          closeModal3();
        };
        getPayments();
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
      const response = await updatePaymentDomain(
        currentPayment,
        formData4.domainId,
        userAuth
      );

      if (response.status === 200) {
        const getPayments = async () => {
          setIsLoading(true);
          const paymentData = await fetchPayments(params, userAuth);
          setPayment(paymentData.data);
          setPaymentPage(paymentData);
          setIsLoading(false);
          closeModal4();
        };
        getPayments();
      } else {
        alert("Fail to Create");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในขณะกำลังสร้าง user:", error);
    }
  };

  useEffect(() => {
    const getPayments = async () => {
      setIsLoading(true);
      const paymentData = await fetchPayments(params, userAuth);
      setPayment(paymentData.data);
      setPaymentPage(paymentData);
      setIsLoading(false);
    };
    getPayments();
  }, [fetchPayments]);

  useEffect(() => {
    const searchByParams = async () => {
      setIsLoading(true);
      const paymentData = await fetchPayments(params, userAuth);
      setPayment(paymentData.data);
      setPaymentPage(paymentData);
      setIsLoading(false);
    };
    searchByParams();
  }, [params, userAuth]);

  useEffect(() => {
    const fetchData = async () => {
      const domainsData = await fetchDomains(paramsDomain, userAuth);
      setDomains(domainsData.data);
    };
    fetchData();
  }, [paramsDomain, userAuth]);

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

  const formatTime = (paymentTime) => {
    const formattedTime = new Date(paymentTime).toLocaleString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formattedTime;
  };

  console.log(paymentsPage);
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
              <div className="row">
                <div className="col-12 text-end align-self-center">
                  <button
                    className="btn  btn-outline-light my-2"
                    onClick={(e) => openModal0()}
                  >
                    + สร้างรายการใหม่
                  </button>
                </div>
                <div className="col-6 col-lg-3 align-self-center">
                  <div className="form-group my-1">
                    <label htmlFor="domainsId">ชื่อเว็บ</label>
                    <div className="text-end">
                      <input
                        type="search"
                        className="form-control"
                        id="search"
                        placeholder="ค้นหาโดยชื่อเว็บ"
                        value={paramsDomain.name}
                        onChange={handleSearchInputChange}
                      />
                      <select
                        className="form-select mt-2"
                        id="domainsId"
                        aria-label="ค้นหาชื่อเว็บ"
                        value={paramsDomain.id}
                        onChange={(e) =>
                          setParams({
                            ...params,
                            domainId: e.target.value,
                          })
                        }
                        data-live-search="true"
                        multiple
                      >
                        {domains &&
                          domains.map((domain) => (
                            <option key={domain.id} value={domain.id}>
                              {domain.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 align-self-center">
                  <div className="form-group my-1 text-start">
                    <label htmlFor="status">บันทึกโดย</label>
                    <input
                      type="search"
                      className="form-control"
                      id="search"
                      placeholder="Search by username"
                      value={params.createdBy}
                      onChange={(e) =>
                        setParams({
                          ...params,
                          createdBy: e.target.value,
                        })
                      }
                    />
                    
                  </div>
                </div>
                <div className="col-6 col-lg-3 align-self-center">
                  <div className="form-group my-1 text-start">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={2} sx={{ minWidth: 105 }}>
                        <DateTimePicker
                          label="From Date"
                          value={TimeFromValue}
                          onChange={(newValue) => {
                            setTimeFromValue(newValue);
                            setParams({
                              ...params,
                              from: newValue.format(),
                            });
                          }}
                          views={[
                            "year",
                            "month",
                            "day",
                            "hours",
                            "minutes",
                            "seconds",
                          ]}
                          className="bg-white rounded"
                          style={{ padding: "0px !important" }}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="col-6 col-lg-3 align-self-center">
                  <div className="form-group my-1 text-start">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={2} sx={{ minWidth: 105 }}>
                        <DateTimePicker
                          label="To Date"
                          value={TimeToValue}
                          onChange={(newValue) => {
                            setTimeToValue(newValue);
                            setParams({
                              ...params,
                              to: newValue.format(),
                            });
                          }}
                          views={[
                            "year",
                            "month",
                            "day",
                            "hours",
                            "minutes",
                            "seconds",
                          ]}
                          className="bg-white rounded"
                        />
                      </Stack>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              {/* Show loading indicator */}
              <table
                className="table table-bordered table-striped table-dark table-hover"
                style={{ whiteSpace: "nowrap" }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>เวลารายการ</th>
                    <th>ชื่อเว็บ</th>
                    <th>จำนวนเงิน</th>
                    <th>บันทึกโดย</th>
                    <th>หมายเหตุ</th>
                    <th width={400}>จัดการ</th>
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

                  {payments &&
                    payments.map((payment, index) => (
                      <tr key={payment.id}>
                        <td>{index + 1}</td>
                        <td>{formatTime(payment.time)}</td>
                        <td>{payment.domain}</td>
                        <td className="text-end">{new Intl.NumberFormat().format(payment.amount)}</td>
                        <td>{payment.createdBy}</td>
                        <td>{payment.remarks}</td>
                        <td>
                          <button
                            className="btn  btn-outline-light mx-1"
                            onClick={(e) =>
                              openModal(payment.id, payment.domain)
                            }
                          >
                            แก้ไขเวลารายการ
                          </button>
                          <button
                            className="btn  btn-outline-light mx-1"
                            onClick={(e) =>
                              openModal2(payment.id, payment.domain)
                            }
                          >
                            แก้ไขจำนวนเงิน
                          </button>
                          <button
                            className="btn  btn-outline-light mx-1"
                            onClick={(e) =>
                              openModal3(payment.id, payment.domain)
                            }
                          >
                            แก้ไขหมายเหตุ
                          </button>
                          <button
                            className="btn  btn-outline-light mx-1"
                            onClick={(e) =>
                              openModal4(payment.id, payment.domain)
                            }
                          >
                            แก้ไขชื่อเว็บ
                          </button>
                        </td>
                      </tr>
                    ))}
                  <tr>
                    <td>Total : {paymentsPage.total}</td>
                    <td colSpan={6} className="text-end">ยอดรวม: {paymentsPage.sum}</td>
                  </tr>
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
                      onChange={(e) =>
                        handleFilterChange("pageSize", e.target.value)
                      }
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
                          defaultPage={paymentsPage.page}
                          variant="outlined"
                          onChange={(e) =>
                            handleFilterChange("page", e.target.value)
                          }
                          count={Math.ceil(
                            paymentsPage.total / paymentsPage.pageSize
                          )}
                          renderItem={(item) => (
                            <PaginationItem
                              slots={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                            />
                          )}
                          style={{ filter: "invert(1)" }}
                        />
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                Create Payments<strong className="h5"></strong>
              </h5>
              <button
                type="button"
                className="btn "
                aria-label="Close"
                onClick={() => closeModal0()} // เมื่อคลิกปุ่มปิดใน modal ให้ปิด modal
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit0}>
                <div className="form-group my-1">
                  <label htmlFor="time">เวลาของรายการ</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={2} sx={{ minWidth: 305 }}>
                      <DateTimePicker
                        value={TimeValue}
                        onChange={(newValue) => {
                          setTimeValue(newValue);
                          setFormData0({
                            ...formData0,
                            time: newValue.format(),
                          });
                        }}
                        views={[
                          "year",
                          "month",
                          "day",
                          "hours",
                          "minutes",
                          "seconds",
                        ]}
                        className="bg-white rounded"
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>

                <div className="form-group my-1">
                  <label htmlFor="domainsId">ชื่อเว็บ</label>
                  <div className="text-end">
                    <input
                      type="search"
                      className="form-control"
                      id="search"
                      placeholder="Search by name"
                      value={paramsDomain.name}
                      onChange={handleSearchInputChange}
                    />
                    <select
                      className="form-select mt-2"
                      id="domainsId"
                      aria-label="ค้นหาชื่อเว็บ"
                      value={paramsDomain.id}
                      onChange={(e) =>
                        setFormData0({ ...formData0, domainId: e.target.value })
                      }
                      data-live-search="true"
                      multiple
                    >
                      {domains &&
                        domains.map((domain) => (
                          <option key={domain.id} value={domain.id}>
                            {domain.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="form-group my-1">
                  <label htmlFor="amount">จำนวนเงิน</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    placeholder="ระบุจำนวนเงิน"
                    value={formData0.amount}
                    step="any"
                    onChange={(e) =>
                      setFormData0({ ...formData0, amount: e.target.value })
                    }
                  />
                </div>

                <div className="form-group my-1">
                  <label htmlFor="remarks">หมายเหตุ</label>
                  <input
                    type="text"
                    className="form-control"
                    id="remarks"
                    placeholder="ระบุหมายเหตุ"
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
                Edit Time :{" "}
                <strong className="h5">{currentPaymentDomain}</strong>
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
              <form onSubmit={handleSubmit}>
                <div className="form-group my-1">
                  <label htmlFor="time">time</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={2} sx={{ minWidth: 305 }}>
                      <DateTimePicker
                        value={TimeValue}
                        onChange={(newValue) => {
                          setTimeValue(newValue);
                          setFormData({
                            ...formData,
                            time: newValue.format(),
                          });
                        }}
                        views={[
                          "year",
                          "month",
                          "day",
                          "hours",
                          "minutes",
                          "seconds",
                        ]}
                        className="bg-white rounded"
                      />
                    </Stack>
                  </LocalizationProvider>
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
                Edit Amount :{" "}
                <strong className="h5">{currentPaymentDomain}</strong>
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
                Edit Remarks :{" "}
                <strong className="h5">{currentPaymentDomain}</strong>
              </h5>
              <button
                type="button"
                className="btn "
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
                Edit Domain :{" "}
                <strong className="h5">{currentPaymentDomain}</strong>
              </h5>
              <button
                type="button"
                className="btn "
                aria-label="Close"
                onClick={() => closeModal4()} // เมื่อคลิกปุ่มปิดใน modal ให้ปิด modal
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit4}>
                <div className="form-group my-1">
                  <label htmlFor="domainsId">domainId</label>
                  <div className="text-end">
                    <input
                      type="search"
                      className="form-control"
                      id="search"
                      placeholder="Search by name"
                      value={paramsDomain.name}
                      onChange={handleSearchInputChange}
                    />
                    <select
                      className="form-select mt-2"
                      id="domainsId"
                      aria-label="Select Domain"
                      value={paramsDomain.id}
                      onChange={(e) =>
                        setFormData4({ ...formData4, domainId: e.target.value })
                      }
                      data-live-search="true"
                      multiple
                    >
                      {domains &&
                        domains.map((domain) => (
                          <option key={domain.id} value={domain.id}>
                            {domain.name}
                          </option>
                        ))}
                    </select>
                  </div>
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
      <script>$('#domainsId').selectpicker();</script>
    </>
  );
};

export default Payments;
