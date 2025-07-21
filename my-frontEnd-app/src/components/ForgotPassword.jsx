

import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || "Check your email for reset instructions.");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <style>{`
        .forgot-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 20px;
          background-color: #f9fafb;
          min-height: 100vh;
        }

        .forgot-form {
          background-color: #fff;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .forgot-form h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #111827;
        }

        .forgot-form label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #374151;
          margin-top: 15px;
        }

        .forgot-form input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
        }

        .forgot-form input:focus {
          border-color: #3b82f6;
        }

        .forgot-form button {
          width: 100%;
          margin-top: 25px;
          padding: 12px;
          background-color: #3b82f6;
          color: #fff;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .forgot-form button:hover {
          background-color: #2563eb;
        }

        .response-message {
          text-align: center;
          margin-top: 20px;
          color: #047857;
          font-weight: 500;
        }
      `}</style>

      <div className="forgot-container">
        <form className="forgot-form" onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>

          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Reset Link</button>

          {message && <p className="response-message">{message}</p>}
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;


