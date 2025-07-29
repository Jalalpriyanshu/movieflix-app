import React from "react";

function Footer() {
  return (
    <footer style={{
      background: "#232323",
      padding: "2rem 0",
      marginTop: "auto"
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem"
        }}>
          <div>
            <h3 style={{color: "#ff9800", marginBottom: "1rem"}}>About Us</h3>
            <p style={{color: "#bdbdbd", lineHeight: "1.6"}}>
              Your premier destination for movie tickets, events, and entertainment.
            </p>
          </div>
          <div>
            <h3 style={{color: "#ff9800", marginBottom: "1rem"}}>Quick Links</h3>
            <ul style={{listStyle: "none", padding: 0, color: "#bdbdbd"}}>
              <li style={{marginBottom: "0.5rem"}}>Movies</li>
              <li style={{marginBottom: "0.5rem"}}>Events</li>
              <li style={{marginBottom: "0.5rem"}}>Plays</li>
              <li style={{marginBottom: "0.5rem"}}>Sports</li>
            </ul>
          </div>
          <div>
            <h3 style={{color: "#ff9800", marginBottom: "1rem"}}>Support</h3>
            <ul style={{listStyle: "none", padding: 0, color: "#bdbdbd"}}>
              <li style={{marginBottom: "0.5rem"}}>Contact Us</li>
              <li style={{marginBottom: "0.5rem"}}>FAQ</li>
              <li style={{marginBottom: "0.5rem"}}>Help Center</li>
            </ul>
          </div>
        </div>
        <div style={{
          borderTop: "1px solid #444",
          paddingTop: "1rem",
          textAlign: "center",
          color: "#bdbdbd"
        }}>
          &copy; {new Date().getFullYear()} MovieFlix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;