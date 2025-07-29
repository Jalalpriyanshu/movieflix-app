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
      maxWidth: "500px",
      margin: "0 auto",
      background: "#292929",
      padding: "2rem",
      borderRadius: "12px"
    }}>
      <h2 style={{textAlign: "center", marginBottom: "2rem"}}>Payment Details</h2>
      
      {/* Price Breakdown */}
      <div style={{
        background: "#1a1a1a",
        padding: "1.5rem",
        borderRadius: "8px",
        marginBottom: "2rem"
      }}>
        <h3 style={{marginTop: 0, color: "#ff9800"}}>Price Breakdown</h3>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.5rem"}}>
          <span>Movie: {movie?.Title}</span>
          <span>₹{basePrice}</span>
        </div>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.5rem"}}>
          <span>Seats: {seats}</span>
          <span>× {seats}</span>
        </div>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.5rem"}}>
          <span>Subtotal:</span>
          <span>₹{totalPrice}</span>
        </div>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.5rem"}}>
          <span>GST (18%):</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>
        <hr style={{border: "1px solid #444", margin: "1rem 0"}} />
        <div style={{display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "1.2rem"}}>
          <span>Total:</span>
          <span style={{color: "#ff9800"}}>₹{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div style={{marginBottom: "2rem"}}>
        <h3 style={{marginBottom: "1rem"}}>Select Payment Method</h3>
        <div style={{display: "flex", gap: "1rem", marginBottom: "1rem"}}>
          <label style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{marginRight: "0.5rem"}}
            />
            Credit/Debit Card
          </label>
          <label style={{display: "flex", alignItems: "center", cursor: "pointer"}}>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{marginRight: "0.5rem"}}
            />
            UPI
          </label>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit}>
        {paymentMethod === "card" ? (
          <>
            <div style={{marginBottom: "1rem"}}>
              <label style={{display: "block", marginBottom: "0.5rem"}}>Card Number:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
                style={{
                  width: "100%",
                  padding: "0.7rem",
                  borderRadius: "4px",
                  border: "1px solid #444",
                  background: "#181818",
                  color: "#fff"
                }}
              />
            </div>
            <div style={{marginBottom: "1rem"}}>
              <label style={{display: "block", marginBottom: "0.5rem"}}>Cardholder Name:</label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                required
                style={{
                  width: "100%",
                  padding: "0.7rem",
                  borderRadius: "4px",
                  border: "1px solid #444",
                  background: "#181818",
                  color: "#fff"
                }}
              />
            </div>
            <div style={{display: "flex", gap: "1rem", marginBottom: "1rem"}}>
              <div style={{flex: 1}}>
                <label style={{display: "block", marginBottom: "0.5rem"}}>Expiry:</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  required
                  style={{
                    width: "100%",
                    padding: "0.7rem",
                    borderRadius: "4px",
                    border: "1px solid #444",
                    background: "#181818",
                    color: "#fff"
                  }}
                />
              </div>
              <div style={{flex: 1}}>
                <label style={{display: "block", marginBottom: "0.5rem"}}>CVV:</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                  style={{
                    width: "100%",
                    padding: "0.7rem",
                    borderRadius: "4px",
                    border: "1px solid #444",
                    background: "#181818",
                    color: "#fff"
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <div style={{marginBottom: "1rem"}}>
            <label style={{display: "block", marginBottom: "0.5rem"}}>UPI ID:</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="username@upi"
              required
              style={{
                width: "100%",
                padding: "0.7rem",
                borderRadius: "4px",
                border: "1px solid #444",
                background: "#181818",
                color: "#fff"
              }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={processing}
          style={{
            width: "100%",
            padding: "1rem",
            background: processing ? "#666" : "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1.1rem",
            cursor: processing ? "not-allowed" : "pointer"
          }}
        >
          {processing ? "Processing Payment..." : `Pay ₹${finalTotal.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;