import React, { useState } from "react";

function Login() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{maxWidth: "400px", margin: "2rem auto"}}>
      <h2>Login</h2>
      {submitted ? (
        <p>Login successful! (This is a mock login.)</p>
      ) : (
        <form onSubmit={handleSubmit}>
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
          }}>Login</button>
        </form>
      )}
    </div>
  );
}

export default Login;