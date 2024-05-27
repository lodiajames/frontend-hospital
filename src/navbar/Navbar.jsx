import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Kindred Clinic</Link>
      </div>
      <ul className={isMobile ? "navbar-menu mobile" : "navbar-menu"}>
        <li>
          <Link to="/appointment">Appointment</Link>
        </li>
        <li>
          <Link to="/doctor">Doctor</Link>
        </li>
        <li>
          <Link to="/patient">Patient</Link>
        </li>
      </ul>
      <div className="navbar-toggle" onClick={() => setIsMobile(!isMobile)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
