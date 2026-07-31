import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiFolder,
  FiClipboard,
  FiCheckCircle,
  FiMail,
  FiLock,
} from "react-icons/fi";

import { loginUser } from "../../services/authService";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));


      alert("Login Successful");

if (data.user.role === "Admin") {
    navigate("/dashboard");
}
else if (data.user.role === "Manager") {
    navigate("/dashboard");
}
else if (data.user.role === "Member") {
    navigate("/member-dashboard");
}


    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Login Failed");

      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="left-section">

        <div className="brand">
          <h1>ProjectFlow</h1>

          <p className="tagline">
            One place to manage your team's work efficiently.
          </p>
        </div>

        <div className="hero-content">
          <h2>
            Plan.<br />
            Collaborate.<br />
            Deliver.
          </h2>

          <p className="quote">
            Simplify project management with workspaces,
            projects, task tracking and team collaboration.
          </p>
        </div>

        <div className="dashboard-preview">

          <div className="preview-card">
            <FiFolder className="icon" />

            <div>
              <h4>Workspaces</h4>
            </div>
          </div>

          <div className="preview-card">
            <FiClipboard className="icon" />

            <div>
              <h4>Projects</h4>
            </div>
          </div>

          <div className="preview-card">
            <FiCheckCircle className="icon" />

            <div>
              <h4>Tasks</h4>
            </div>
          </div>

        </div>

      </div>

      <div className="right-section">

        <div className="login-card">

          <div className="login-header">
            <h2>Welcome To ProjectFlow 👋</h2>

            <p>Sign in to continue to ProjectFlow</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <FiMail className="input-icon" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FiLock className="input-icon" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p style={{ color: "red", marginBottom: "15px" }}>
                {error}
              </p>
            )}

            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="bottom-links">
            <p>
              Don't have an account?
              <Link to="/register"> Register</Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;