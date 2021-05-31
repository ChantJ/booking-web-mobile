import React, { useState, useContext } from "react";
import { FaEye } from "react-icons/fa";
import { SellerContext } from "../../contexts/sellerContext";
import axios from "axios";
import "./style.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { setSeller } = useContext(SellerContext);

  const login = () => {
    let data = {
      email: email,
      password: password,
      role:"seller"
    };

    axios
      .post("/users/login", data)
      .then((res) => {
        setSeller(res.data);
        props.history.push("/schedules");
      })
      .catch((err) => setError(err.response.data));
  };

  return (
    <div className="login">
      <div className="loginTitle">
        WelCome To NovaLabs
      </div>
      <div className="loginForm">
        <div className="loginFormBox">
          <div className="loginFormLabelFields">
            <label>Email</label>
            <div className="loginFormInputFields">
              <input
                type="email"
                className="loginFormInput"
                value={email}
                required
                autoComplete="new-password"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="loginFormLabelFields">
            <label>Password</label>
            <div className="loginFormInputFields">
              <input
                type={showPassword ? "text" : "password"}
                className="loginFormInput"
                value={password}
                required
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaEye
                size={16}
                style={{ marginLeft: "0.3rem" }}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {error && <span style={{ color: "red" }}>{error}</span>}
          <div
            style={{ display: "flex", justifyContent: "center", height: "13%" }}
          >
            <button
              disabled={!email || !password}
              style={{ width: "20%", fontSize: "18px", margin: "1rem" }}
              onClick={login}
            >
              {"Login"}
            </button>
          </div>
        </div>
      </div>
      <div className="notification">
       P.S.: If you're a buyer, please login through our mobile app to book your appointment. Thank you!
      </div>
    </div>
  );
};
export default Login;
