import React, { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h2>Contact Us</h2>
      {submitted ? (
        <p>Thank you for contacting us! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{maxWidth: "400px"}}>
          <div style={{marginBottom: "1rem"}}>
            <label>Name:</label>
            <input type="text" required style={{width: "100%", padding: "0.5rem", borderRadius: "4px", border: "none", marginTop: "0.5rem"}} />
          </div>
          <div style={{marginBottom: "1rem"}}>
            <label>Email:</label>
            <input type="email" required style={{width: "100%", padding: "0.5rem", borderRadius: "4px", border: "none", marginTop: "0.5rem"}} />
          </div>
          <div style={{marginBottom: "1rem"}}>
            <label>Message:</label>
            <textarea required style={{width: "100%", padding: "0.5rem", borderRadius: "4px", border: "none", marginTop: "0.5rem"}} />
          </div>
          <button type="submit" style={{
            padding: "0.7rem 2rem",
            background: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1.1rem",
            cursor: "pointer"
          }}>Send</button>
        </form>
      )}
    </div>
  );
}

export default Contact;