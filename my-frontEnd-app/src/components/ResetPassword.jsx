import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://library-management-system-i0c3.onrender.com/user/reset-password/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await res.json();
      setMessage(data.message || "Password reset successful!");
      if (res.ok) {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        .reset-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 20px;
          background-color: #f3f4f6;
          min-height: 100vh;
        }
        .reset-form {
          background-color: #fff;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        .reset-form h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #111827;
        }
        .reset-form label {
          display: block;
          margin-top: 15px;
          color: #374151;
          font-weight: 500;
        }
        .reset-form input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
          margin-top: 5px;
          outline: none;
        }
        .reset-form input:focus {
          border-color: #3b82f6;
        }
        .reset-form button {
          width: 100%;
          padding: 12px;
          margin-top: 25px;
          background-color: #3b82f6;
          color: #fff;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .reset-form button:hover {
          background-color: #2563eb;
        }
        .reset-form .message {
          text-align: center;
          margin-top: 20px;
          color: #047857;
          font-weight: 500;
        }
      `}</style>

      <div className="reset-container">
        <form className="reset-form" onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
