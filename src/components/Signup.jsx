import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      // Here you would typically send the data to your backend
      console.log("Signup data:", formData);
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
        Create Account
      </h2>
      
      {submitted ? (
        <div style={{
          textAlign: "center",
          padding: "2rem",
          background: "#4caf50",
          borderRadius: "8px",
          color: "#fff"
        }}>
          <h3>🎉 Signup Successful!</h3>
          <p>Welcome to MovieFlix! You can now log in with your credentials.</p>
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
              Full Name:
            </label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
              style={{
                width: "100%", 
                padding: "0.75rem", 
                borderRadius: "6px", 
                border: errors.name ? "1px solid #e74c3c" : "1px solid #444",
                background: "#181818",
                color: "#fff",
                fontSize: "1rem"
              }} 
            />
            {errors.name && (
              <div style={{color: "#e74c3c", fontSize: "0.875rem", marginTop: "0.25rem"}}>
                {errors.name}
              </div>
            )}
          </div>
          
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
          
          <div style={{marginBottom: "1.5rem"}}>
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
          
          <div style={{marginBottom: "2rem"}}>
            <label style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#fff",
              fontWeight: "500"
            }}>
              Confirm Password:
            </label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
              style={{
                width: "100%", 
                padding: "0.75rem", 
                borderRadius: "6px", 
                border: errors.confirmPassword ? "1px solid #e74c3c" : "1px solid #444",
                background: "#181818",
                color: "#fff",
                fontSize: "1rem"
              }} 
            />
            {errors.confirmPassword && (
              <div style={{color: "#e74c3c", fontSize: "0.875rem", marginTop: "0.25rem"}}>
                {errors.confirmPassword}
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
            Create Account
          </button>
          
          <div style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "#ccc"
          }}>
            <p>Already have an account? 
              <a href="/login" style={{
                color: "#ff9800",
                textDecoration: "none",
                marginLeft: "0.5rem",
                fontWeight: "bold"
              }}>
                Sign in here
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default Signup;