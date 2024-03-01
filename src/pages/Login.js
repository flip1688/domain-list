import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (userAuth) {
      console.log("userAuth:", userAuth);
      dispatch(userRefreshToken(userAuth));
      navigate("/home");
    }
  }, [navigate, dispatch]);

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
      <header className="App-header" style={{ minHeight: "100vh" }}>
        <div className="column is-one-quarter-desktop is-four-fifths-mobile panel py-6">
          <div className="is-full is-size-3">เข้าสู่ระบบ</div>
          <form onSubmit={handleSubmit}>
            <div className="field is-full mx-3">
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                ></input>
                <span className="icon is-small is-left">
                  <i className="mdi mdi-account"></i>
                </span>
              </div>
            </div>

            <div className="field is-full mx-3">
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Password"
                  onChange={handleChange}
                ></input>
                <span className="icon is-small is-left">
                  <i className="mdi mdi-lock"></i>
                </span>
              </div>
            </div>

            <div className="field is-full is-grouped is-justify-content-center">
              <div className="control">
                <button className="button is-link" type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Login;
