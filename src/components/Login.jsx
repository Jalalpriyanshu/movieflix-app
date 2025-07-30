import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      // Here you would typically send the data to your backend
      console.log("Login data:", formData);
    }
  };

  return (
    <div style={{
      maxWidth: "500px", 
      margin: "2rem auto",
      padding: "2rem",
      background: "#292929",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: "2rem",
        color: "#ff9800",
        fontSize: "2rem"
      }}>
        Welcome Back
      </h2>
      
      {submitted ? (
        <div style={{
          textAlign: "center",
          padding: "2rem",
          background: "#4caf50",
          borderRadius: "8px",
          color: "#fff"
        }}>
          <h3>🎉 Login Successful!</h3>
          <p>Welcome back to MovieFlix! You're now logged in.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: "1.5rem"}}>
            <label style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#fff",
              fontWeight: "500"
            }}>
              Email:
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
              style={{
                width: "100%", 
                padding: "0.75rem", 
                borderRadius: "6px", 
                border: errors.email ? "1px solid #e74c3c" : "1px solid #444",
                background: "#181818",
                color: "#fff",
                fontSize: "1rem"
              }} 
            />
            {errors.email && (
              <div style={{color: "#e74c3c", fontSize: "0.875rem", marginTop: "0.25rem"}}>
                {errors.email}
              </div>
            )}
          </div>
          
          <div style={{marginBottom: "2rem"}}>
            <label style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#fff",
              fontWeight: "500"
            }}>
              Password:
            </label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
              style={{
                width: "100%", 
                padding: "0.75rem", 
                borderRadius: "6px", 
                border: errors.password ? "1px solid #e74c3c" : "1px solid #444",
                background: "#181818",
                color: "#fff",
                fontSize: "1rem"
              }} 
            />
            {errors.password && (
              <div style={{color: "#e74c3c", fontSize: "0.875rem", marginTop: "0.25rem"}}>
                {errors.password}
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            style={{
              width: "100%",
              padding: "1rem 2rem",
              background: "#ff9800",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#f57c00";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#ff9800";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Sign In
          </button>
          
          <div style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#ccc"
          }}>
            <p>Don't have an account? 
              <a href="/signup" style={{
                color: "#ff9800",
                textDecoration: "none",
                marginLeft: "0.5rem",
                fontWeight: "bold"
              }}>
                Sign up here
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;