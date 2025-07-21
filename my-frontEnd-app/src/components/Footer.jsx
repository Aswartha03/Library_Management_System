import React from "react";
import "../CSS/Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Library Management System. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
