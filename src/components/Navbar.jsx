import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
  return (
    <nav style={{
      background: "#fff",
      padding: "1rem 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Link to="/" style={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "#e71a38"
        }}>
          Movie<span style={{color: "#222"}}>Flix</span>
        </Link>
        
        <SearchBar />
        
        <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
          <Link to="/faq" style={{color: "#333", textDecoration: "none"}}>FAQ</Link>
          <Link to="/contact" style={{color: "#333", textDecoration: "none"}}>Contact</Link>
          <Link to="/login" style={{
            background: "#e71a38",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "0.5rem 1.5rem",
            fontWeight: "bold",
            textDecoration: "none"
          }}>
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;