import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaUserShield } from "react-icons/fa";

import {
  FiUser,
  FiMail,
  FiLock,
  FiUsers,
  FiFolder,
  FiActivity,
  FiArrowRight,
} from "react-icons/fi";

import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  role: "Member", // Default role
  password: "",
  confirmPassword: "",
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

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
  name: formData.name,
  email: formData.email,
  role: formData.role,
  password: formData.password,
});

const { user, token } = response;

// Store login information
login(user, token);

alert("Registration Successful!");

// Redirect according to role
if (user.role === "Admin") {
  navigate("/admin");
} else if (user.role === "Member") {
  navigate("/member-dashboard");
} else if (user.role === "Manager") {
  navigate("/manager");
} else {
  navigate("/member-dashboard");
}
    } catch (err) {
  console.log("===== REGISTER ERROR =====");
  console.log(err);
  console.log(err.response);
  console.log(err.response?.data);

  alert(err.response?.data?.message || err.message);

  setError(
    err.response?.data?.message || "Registration Failed"
  );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* ================= LEFT SECTION ================= */}

      <div className="register-left">
        <div className="brand">
          <h1>ProjectFlow</h1>

          <p className="tagline">
            Project Management made simple and powerful.
          </p>
        </div>

        <div className="hero-content">
          <h2>
            Start Your
            <br />
            Journey 🚀
          </h2>

          <p className="quote">
            Join ProjectFlow and build better teams, manage projects
            efficiently, collaborate seamlessly, and deliver every
            project on time.
          </p>
        </div>

        <div className="feature-list">
          <div className="feature-card">
            <FiFolder className="feature-icon" />

            <div>
              <h4>Unlimited Workspaces</h4>
              <p>Create multiple workspaces for every team.</p>
            </div>
          </div>

          <div className="feature-card">
            <FiUsers className="feature-icon" />

            <div>
              <h4>Team Collaboration</h4>
              <p>Assign tasks and collaborate effortlessly.</p>
            </div>
          </div>

          <div className="feature-card">
            <FiActivity className="feature-icon" />

            <div>
              <h4>Track Progress</h4>
              <p>Monitor project progress in real time.</p>
            </div>
          </div>
        </div>

        <div className="journey-box">
          <h3>Your Journey</h3>

          <div className="flow">
            <div>Create Account</div>

            <FiArrowRight />

            <div>Workspace</div>

            <FiArrowRight />

            <div>Project</div>

            <FiArrowRight />

            <div>Tasks</div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}

      <div className="register-right">
        <div className="register-card">
          <div className="register-header">
            <h2>Create Your Account</h2>

            <p>
              Join ProjectFlow and start managing your projects today.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FiUser className="input-icon" />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
    <span className="input-icon">
        <FaUserShield />
    </span>

    <select
        name="role"
        value={formData.role}
        onChange={handleChange}
    >
        <option value="Admin">Admin</option>
<option value="Manager">Manager</option>
<option value="Member">Member</option>
    </select>

    <span className="select-arrow">
        <FaChevronDown />
    </span>
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

            <div className="input-group">
              <FiLock className="input-icon" />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p
                style={{
                  color: "#dc2626",
                  fontSize: "14px",
                  marginBottom: "15px",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading
                ? "Creating Account..."
                : "Create My Account"}
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="bottom-links">
            <p>
              Already have an account?{" "}
              <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;