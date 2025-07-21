import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchData() {
      const res = await fetch("http://localhost:3000/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFormData({ name: data.name || "", contact: data.contact || "" });
    }
    fetchData();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (result.message === "Profile Updated") {
      navigate("/profile");
    } else {
      alert(result.message || "Error while profile updating");
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Edit Profile</h2>

        <label style={styles.label}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Contact Number :</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Save</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
    padding: "20px",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "18px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default EditProfile;
