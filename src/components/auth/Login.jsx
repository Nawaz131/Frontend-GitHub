import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Button } from "@primer/react";
import "./auth.css";

import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3002/login", {
        email,
        password,
      });

      // const res = await axios.post(
      //   "https://github-backend-3.onrender.com/login",
      //   {
      //     email,
      //     password,
      //   },
      // );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div style={{ padding: "10px" }}>
          <h2>Log In</h2>
        </div>

        <form className="login-box" onSubmit={handleLogin}>
          <div>
            <label className="label" htmlFor="email">
              Email address
            </label>

            <input
              autoComplete="off"
              name="email"
              id="email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="password">
              Password
            </label>

            <input
              autoComplete="off"
              name="password"
              id="password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>

        <div className="pass-box">
          <p>
            New to GitHub? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
