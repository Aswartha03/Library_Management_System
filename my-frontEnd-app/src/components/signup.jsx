import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "user",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Reset form on load
    setFormData({
      email: "",
      password: "",
      name: "",
      role: "user",
    });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await fetch("https://library-management-system-i0c3.onrender.com/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await result.json();
      alert("Signup Successful!");
      navigate("/login");
    } catch (err) {
      console.log("Error during signup:", err.message);
      alert("Signup Failed!");
    }
  }

  const styles = {
    container: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f4f4",
      padding: "20px",
      boxSizing: "border-box",
    },
    card: {
      background: "#fff",
      padding: "30px 40px",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "450px",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "24px",
      // color: "#333",
      color:"black"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    select: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
      color:"black"
    },
    button: {
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    note: {
      textAlign: "center",
      marginTop: "15px",
      fontSize: "14px",
      color:"black"
    },
    label: {
      fontWeight: "bold",
      marginBottom: "5px",
      fontSize: "14px",
      color:"black"
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Your Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="name" style={styles.label}>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., John Doe"
            onChange={handleChange}
            value={formData.name}
            required
            style={styles.input}
          />

          <label htmlFor="email" style={styles.label}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="e.g., john@example.com"
            onChange={handleChange}
            value={formData.email}
            required
            style={styles.input}
          />

          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Minimum 6 characters"
            onChange={handleChange}
            value={formData.password}
            required
            minLength={6}
            style={styles.input}
          />

          <label htmlFor="role" style={styles.label }>Register as</label>
          <select
            name="role"
            onChange={handleChange}
            value={formData.role}
            required
            style={styles.select}
          >
            <option value="user">User</option>
            <option value="librarian">Librarian</option>
          </select>

          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.note}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
