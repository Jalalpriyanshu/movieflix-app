import React, { useState } from "react";

function Signup() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{maxWidth: "400px", margin: "2rem auto"}}>
      <h2>Signup</h2>
      {submitted ? (
        <p>Signup successful! (This is a mock signup.)</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: "1rem"}}>
            <label>Name:</label>
            <input type="text" required style={{width: "100%", padding: "0.5rem", borderRadius: "4px", border: "none", marginTop: "0.5rem"}} />
          </div>
          <div style={{marginBottom: "1rem"}}>
            <label>Email:</label>
            <input type="email" required style={{width: "100%", padding: "0.5rem", borderRadius: "4px", border: "none", marginTop: "0.5rem"}} />
          </div>
          <div style={{marginBottom: "1rem"}}>
            <label>Password:</label>
            <input type="password" required style={{width: "100%", padding: "0.5rem", borderRadius: "4px", border: "none", marginTop: "0.5rem"}} />
          </div>
          <button type="submit" style={{
            padding: "0.7rem 2rem",
            background: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1.1rem",
            cursor: "pointer"
          }}>Signup</button>
        </form>
      )}
    </div>
  );
}

export default Signup;