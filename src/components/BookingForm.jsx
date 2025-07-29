import React, { useState } from "react";
import PaymentForm from "./PaymentForm";

function BookingForm({ movie, onBook }) {
  const [name, setName] = useState("");
  const [seats, setSeats] = useState(1);
  const [showPayment, setShowPayment] = useState(false);

  // Handle case when movie is undefined
  if (!movie) {
    return (
      <div style={{
        textAlign: "center",
        padding: "2rem",
        color: "#bdbdbd"
      }}>
        <h2>Movie Not Found</h2>
        <p>Sorry, the movie details could not be loaded.</p>
      </div>
    );
  }

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
  const gst = totalPrice * 0.18;
  const finalTotal = totalPrice + gst;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePaymentComplete = (paymentData) => {
    onBook({
      name,
      seats,
      ...paymentData
    });
  };

  if (showPayment) {
    return (
      <PaymentForm 
        movie={movie} 
        seats={seats} 
        onPaymentComplete={handlePaymentComplete}
      />
    );
  }

  return (
    <div style={{
      maxWidth: "500px",
      margin: "0 auto",
      background: "#292929",
      padding: "2rem",
      borderRadius: "12px"
    }}>
      <h2>Book Tickets for {movie.title || movie.Title || "Movie"}</h2>
      
      {/* Price Preview */}
      <div style={{
        background: "#1a1a1a",
        padding: "1.5rem",
        borderRadius: "8px",
        marginBottom: "2rem"
      }}>
        <h3 style={{marginTop: 0, color: "#ff9800"}}>Price Preview</h3>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.5rem"}}>
          <span>Base Price:</span>
          <span>₹{basePrice}</span>
        </div>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.5rem"}}>
          <span>Seats:</span>
          <span>{seats}</span>
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

      <form onSubmit={handleBookingSubmit}>
        <div style={{marginBottom: "1rem"}}>
          <label style={{display: "block", marginBottom: "0.5rem"}}>Name:</label>
          <input
            type="text"
            value={name}
            required
            onChange={e => setName(e.target.value)}
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
          <label style={{display: "block", marginBottom: "0.5rem"}}>Number of Seats:</label>
          <input
            type="number"
            min="1"
            max="10"
            value={seats}
            required
            onChange={e => {
              const value = parseInt(e.target.value);
              if (value >= 1 && value <= 10) {
                setSeats(value);
              }
            }}
            style={{
              width: "100%",
              padding: "0.7rem",
              borderRadius: "4px",
              border: "1px solid #444",
              background: "#181818",
              color: "#fff"
            }}
          />
          <small style={{color: "#bdbdbd", fontSize: "0.8rem"}}>
            Select between 1-10 seats
          </small>
        </div>
        
        <button type="submit" style={{
          width: "100%",
          padding: "1rem",
          background: "#ff9800",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "1.1rem",
          cursor: "pointer"
        }}>
          Proceed to Payment - ₹{finalTotal.toFixed(2)}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;