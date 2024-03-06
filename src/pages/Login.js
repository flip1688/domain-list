import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userRefreshToken, userLogin } from "../features/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const { loading, userAuth, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const authRef = useRef(userAuth); 
  useEffect(() => {
    if (authRef.current == userAuth) {
      console.log("userAuth:", userAuth);
      if (authRef.current){
        const result = dispatch(userRefreshToken(authRef.current));
        if (result) {
          console.log("result",result)
          navigate("/home");
        }
      }
     
    }
  }, [authRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(userLogin(formData));
      console.log("dispatch login:", response);
      if (response.payload && response.payload.auth) {
        navigate("/home");
      } else {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลงชื่อเข้าใช้:", error);
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="App">
      
      <section className="vh-100 gradient-custom ">
        <div className="container py-5 h-100">
          <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your login and password!
                      </p>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="typeEmailX">
                          Email
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          name="password"
                          value={formData.password}
                          placeholder="Password"
                          onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          Password
                        </label>
                      </div>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>

                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white">
                          <i className="fab fa-facebook-f fa-lg"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-google fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
