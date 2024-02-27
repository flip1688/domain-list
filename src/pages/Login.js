import { useState } from "react";

const Login = ({location}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    console.log(username);
  }

  const handlePwdChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  }

  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: "100vh" }}>
      <div className="column is-one-quarter-desktop is-four-fifths-mobile panel py-6">
          <div className="is-full is-size-3">
            เข้าสู่ระบบ
          </div>
          <form>
          <div className="field is-full mx-3">
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="text" placeholder="Username" onChange={handleUsernameChange}></input>
              <span className="icon is-small is-left">
                <i className="mdi mdi-account"></i>
              </span>
            </div>
          </div>

          <div className="field is-full mx-3">
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="password" placeholder="Password" onChange={handlePwdChange}></input>
              <span className="icon is-small is-left">
                <i className="mdi mdi-lock"></i>
              </span>
            </div>
          </div>

          <div className="field is-full is-grouped is-justify-content-center">
            <div className="control">
              <button className="button is-link">Login</button>
            </div>
          </div>
          </form>
      </div>
      </header>
    </div>
  )
}

export default Login;