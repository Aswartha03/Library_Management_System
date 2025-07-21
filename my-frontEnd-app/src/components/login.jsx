import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  useEffect(() => {
    setFormData({ email: "", password: "" });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Login Successful!");
        localStorage.setItem("token", data.token);
        setFormData({ email: "", password: "" });
        if (data.role === "librarian") {
          navigate("/librarian-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Try again.");
    }
  }

  const styles = {
    outerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#f5f5f5",
    },
    loginBox: {
      backgroundColor: "#fff",
      padding: "30px 40px",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
      fontSize: "24px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
    },
    link: {
      textAlign: "center",
      marginTop: "15px",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <div style={styles.link}>
          <p style={{color:"black"}}>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
