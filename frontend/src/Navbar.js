import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";

const Navbar = ({ transparent }) => {
  return (
    <nav
      style={{
        width: "100%",
        height: "64px",
        background: "rgba(0, 0, 0, 0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        boxSizing: "border-box",
        backdropFilter: transparent ? "blur(4px)" : undefined,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <img src={logo} alt="Logo" style={{
          height: "40px",
          width: "40px",
          objectFit: "contain",
          background: "#fff",
          borderRadius: "8px",
          marginRight: "8px",
        }} />
        <span style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1.25rem",
          marginRight: "18px",
        }}>Pianist</span>
       
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link to="/signup" style={signupBtnStyle}>Create Account</Link>
        <Link to="/login" style={loginBtnStyle}>Log In</Link>
      </div>
    </nav>
  );
};

const navLinkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1rem",
  marginRight: "10px",
  padding: "6px 12px",
  borderRadius: "4px",
  transition: "background 0.2s",
};

const signupBtnStyle = {
  background: "#28a745",
  color: "#fff",
  textDecoration: "none",
  padding: "6px 16px",
  borderRadius: "4px",
  fontWeight: "bold",
  marginRight: "8px",
  transition: "background 0.2s",
};

const loginBtnStyle = {
  background: "#fff",
  color: "#007bff",
  textDecoration: "none",
  padding: "6px 16px",
  borderRadius: "4px",
  fontWeight: "bold",
  border: "1px solid #007bff",
  transition: "background 0.2s, color 0.2s",
};

export default Navbar;