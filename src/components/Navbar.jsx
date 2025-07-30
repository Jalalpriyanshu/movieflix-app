import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-nav') && !event.target.closest('.mobile-menu-btn')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      background: "#1a1a1a",
      padding: "clamp(0.75rem, 2vw, 1.5rem)",
      zIndex: 1000,
      boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
      backdropFilter: "blur(10px)"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        {/* Logo */}
        <Link to="/" style={{
          textDecoration: "none",
          color: "#ff9800",
          fontSize: "clamp(1.25rem, 3vw, 2rem)",
          fontWeight: "bold",
          whiteSpace: "nowrap"
        }}>
          MovieFlix
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          style={{
            display: "block",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#fff",
            fontSize: "1.5rem",
            cursor: "pointer",
            padding: "0.75rem",
            borderRadius: "6px",
            transition: "all 0.3s ease",
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          className="mobile-menu-btn"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Navigation */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(1rem, 3vw, 2rem)",
          flex: 1,
          justifyContent: "center",
          maxWidth: "600px"
        }} className="desktop-nav">
          <SearchBar />
        </div>

        {/* Desktop Links */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(0.5rem, 2vw, 1rem)"
        }} className="desktop-nav">
          <Link to="/faq" style={{
            textDecoration: "none",
            color: "#fff",
            padding: "clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)",
            borderRadius: "6px",
            transition: "all 0.3s ease",
            fontSize: "clamp(0.875rem, 2vw, 1rem)",
            whiteSpace: "nowrap"
          }}>
            FAQ
          </Link>
          <Link to="/contact" style={{
            textDecoration: "none",
            color: "#fff",
            padding: "clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)",
            borderRadius: "6px",
            transition: "all 0.3s ease",
            fontSize: "clamp(0.875rem, 2vw, 1rem)",
            whiteSpace: "nowrap"
          }}>
            Contact
          </Link>
          <Link to="/signup" style={{
            textDecoration: "none",
            background: "#ff9800",
            color: "#fff",
            padding: "clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.5rem)",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "clamp(0.875rem, 2vw, 1rem)",
            whiteSpace: "nowrap",
            transition: "all 0.3s ease"
          }}>
            Sign up
          </Link>
          <Link to="/login" style={{
            textDecoration: "none",
            background: "transparent",
            color: "#fff",
            padding: "clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.5rem)",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "clamp(0.875rem, 2vw, 1rem)",
            whiteSpace: "nowrap",
            transition: "all 0.3s ease",
            border: "1px solid #ff9800"
          }}>
            Sign in
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div style={{
          display: isMobileMenuOpen ? "flex" : "none",
          flexDirection: "column",
          width: "100%",
          marginTop: "1rem",
          gap: "1rem",
          background: "#292929",
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }} className="mobile-nav">
          <SearchBar />
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem"
          }}>
            <Link to="/faq" style={{
              textDecoration: "none",
              color: "#fff",
              padding: "0.75rem",
              borderRadius: "6px",
              background: "#333",
              fontSize: "1rem",
              textAlign: "center",
              transition: "background 0.3s"
            }}>
              FAQ
            </Link>
            <Link to="/contact" style={{
              textDecoration: "none",
              color: "#fff",
              padding: "0.75rem",
              borderRadius: "6px",
              background: "#333",
              fontSize: "1rem",
              textAlign: "center",
              transition: "background 0.3s"
            }}>
              Contact
            </Link>
            <Link to="/signup" style={{
              textDecoration: "none",
              background: "#ff9800",
              color: "#fff",
              padding: "0.75rem",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "1rem",
              textAlign: "center",
              transition: "all 0.3s ease"
            }}>
              Sign up
            </Link>
            <Link to="/login" style={{
              textDecoration: "none",
              background: "transparent",
              color: "#fff",
              padding: "0.75rem",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "1rem",
              textAlign: "center",
              transition: "all 0.3s ease",
              border: "1px solid #ff9800"
            }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;