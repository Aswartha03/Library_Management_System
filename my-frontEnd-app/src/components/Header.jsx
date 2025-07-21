import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="title">Library Management System</h1>
      <div className="header-buttons">
        <Link to="/profile">
          <button className="header-btn">Profile</button>
        </Link>
        <Link to="/">
          <button className="header-btn">Home</button>
        </Link>
        <Link to="/signup">
          <button className="header-btn">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="header-btn">Login</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
