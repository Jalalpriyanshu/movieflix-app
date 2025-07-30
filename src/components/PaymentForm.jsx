import React, { useState } from "react";

function PaymentForm({ movie, seats, onPaymentComplete }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);

  // Calculate price based on movie and seats
  const getMoviePrice = (movieTitle) => {
    const title = movieTitle?.toLowerCase() || "";
    if (title.includes("avengers") || title.includes("infinity")) return 350;
    if (title.includes("marvel")) return 300;
    if (title.includes("spider")) return 250;
    if (title.includes("batman") || title.includes("superman")) return 280;
    return 200; // Default price
  };

  const basePrice = getMoviePrice(movie?.Title);
  const totalPrice = basePrice * seats;
  const gst = totalPrice * 0.18; // 18% GST
  const finalTotal = totalPrice + gst;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete({
        movie: movie?.Title,
        seats,
        basePrice,
        gst,
        total: finalTotal,
        paymentMethod,
        bookingId: Math.random().toString(36).substr(2, 9).toUpperCase()
      });
    }, 2000);
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      background: "#292929",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
    }}>
      <h2 style={{
        textAlign: "center", 
        marginBottom: "2rem",
        color: "#ff9800",
        fontSize: "2rem"
      }}>
        Payment Details
      </h2>
      
      {/* Price Breakdown */}
      <div style={{
        background: "#1a1a1a",
        padding: "1.5rem",
        borderRadius: "8px",
        marginBottom: "2rem"
      }}>
        <h3 style={{marginTop: 0, color: "#ff9800", marginBottom: "1rem"}}>Price Breakdown</h3>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", color: "#fff"}}>
          <span>Base Price:</span>
          <span>₹{basePrice}</span>
        </div>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", color: "#fff"}}>
          <span>Seats:</span>
          <span>{seats}</span>
        </div>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", color: "#fff"}}>
          <span>Subtotal:</span>
          <span>₹{totalPrice}</span>
        </div>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", color: "#fff"}}>
          <span>GST (18%):</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
        <hr style={{border: "1px solid #444", margin: "1rem 0"}} />
        <div style={{display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "1.2rem", color: "#4caf50"}}>
          <span>Total Amount:</span>
          <span>₹{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div style={{marginBottom: "2rem"}}>
        <h3 style={{marginBottom: "1rem", color: "#fff"}}>Select Payment Method</h3>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            style={{
              background: paymentMethod === "card" ? "#ff9800" : "#333",
              color: "#fff",
              border: "none",
              padding: "1rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontSize: "1rem"
            }}
          >
            💳 Pay with Credit Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("upi")}
            style={{
              background: paymentMethod === "upi" ? "#6f42c1" : "#333",
              color: "#fff",
              border: "none",
              padding: "1rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontSize: "1rem"
            }}
          >
            📱 Pay with UPI
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("paypal")}
            style={{
              background: paymentMethod === "paypal" ? "#0070ba" : "#333",
              color: "#fff",
              border: "none",
              padding: "1rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontSize: "1rem"
            }}
          >
            💰 Pay with PayPal
          </button>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit}>
        {paymentMethod === "card" ? (
          <>
            <div style={{marginBottom: "1rem"}}>
              <label style={{
                display: "block", 
                marginBottom: "0.5rem",
                color: "#fff",
                fontWeight: "500"
              }}>
                Card Number:
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #444",
                  background: "#181818",
                  color: "#fff",
                  fontSize: "1rem"
                }}
              />
            </div>
            <div style={{marginBottom: "1rem"}}>
              <label style={{
                display: "block", 
                marginBottom: "0.5rem",
                color: "#fff",
                fontWeight: "500"
              }}>
                Cardholder Name:
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #444",
                  background: "#181818",
                  color: "#fff",
                  fontSize: "1rem"
                }}
              />
            </div>
            <div style={{display: "flex", gap: "1rem", marginBottom: "2rem"}}>
              <div style={{flex: 1}}>
                <label style={{
                  display: "block", 
                  marginBottom: "0.5rem",
                  color: "#fff",
                  fontWeight: "500"
                }}>
                  Expiry:
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #444",
                    background: "#181818",
                    color: "#fff",
                    fontSize: "1rem"
                  }}
                />
              </div>
              <div style={{flex: 1}}>
                <label style={{
                  display: "block", 
                  marginBottom: "0.5rem",
                  color: "#fff",
                  fontWeight: "500"
                }}>
                  CVV:
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid #444",
                    background: "#181818",
                    color: "#fff",
                    fontSize: "1rem"
                  }}
                />
              </div>
            </div>
          </>
        ) : paymentMethod === "upi" ? (
          <div style={{marginBottom: "2rem"}}>
            <label style={{
              display: "block", 
              marginBottom: "0.5rem",
              color: "#fff",
              fontWeight: "500"
            }}>
              UPI ID:
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="username@upi"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #444",
                background: "#181818",
                color: "#fff",
                fontSize: "1rem"
              }}
            />
            <small style={{color: "#bdbdbd", fontSize: "0.8rem", display: "block", marginTop: "0.5rem"}}>
              Enter your UPI ID (e.g., username@okicici, username@paytm)
            </small>
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "2rem",
            background: "#1a1a1a",
            borderRadius: "8px",
            marginBottom: "2rem"
          }}>
            <p style={{color: "#fff", margin: "0"}}>
              You will be redirected to PayPal to complete your payment.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={processing}
          style={{
            width: "100%",
            padding: "1rem 2rem",
            background: processing ? "#666" : "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: processing ? "not-allowed" : "pointer",
            transition: "all 0.3s ease"
          }}
        >
          {processing ? "Processing Payment..." : `Pay ₹${finalTotal.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;