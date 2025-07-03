import React from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from "./logo.png";

const Navbar = ({ transparent }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <nav
      style={{
        width: "100%",
        height: "64px",
        background: "#000", // Black background
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
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
        <Link to="/myhome" style={navBtnStyle}>Practice a Song</Link>
        <Link to="/recordings" style={navBtnStyle}>Your Recordings</Link>
      </div>
      <button
        onClick={handleLogout}
        style={{
          ...navBtnStyle,
          position: "absolute",
          right: "10px",
          top: "5px",
          background: "#d44c90",
          border: "1px solid #d44c90",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </nav>
  );
};

const navBtnStyle = {
  background: "#222",
  color: "#fff",
  textDecoration: "none",
  padding: "8px 18px",
  borderRadius: "4px",
  fontWeight: "bold",
  marginRight: "8px",
  border: "1px solid #444",
  transition: "background 0.2s, color 0.2s",
  fontSize: "1rem",
};

export default Navbar;