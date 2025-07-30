import React, { useState } from "react";
import PaymentForm from "./PaymentForm";

function BookingForm({ movie, onBook }) {
  const [name, setName] = useState("");
  const [seats, setSeats] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

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
    setBookingDetails({
      movie: movie?.Title,
      customer: name || "Guest User",
      seats,
      paymentMethod: paymentData.paymentMethod,
      bookingId: paymentData.bookingId,
      basePrice: paymentData.basePrice,
      gst: paymentData.gst,
      total: paymentData.total,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 7 days from now
      time: "7:00 PM",
      venue: "PVR Cinemas, City Center"
    });
    setShowPaymentSuccess(true);
    setShowPayment(false);
    
    // Also call the original onBook callback
    onBook({
      name,
      seats,
      ...paymentData
    });
  };

  const handleBookAnotherMovie = () => {
    setShowPaymentSuccess(false);
    setShowPayment(false);
    setBookingDetails(null);
    setName("");
    setSeats(1);
  };

  const handlePrintTicket = () => {
    // In real app, this would generate and download a PDF ticket
    alert("Ticket downloaded successfully!");
  };

  // Payment Success Screen
  if (showPaymentSuccess && bookingDetails) {
    return (
      <div style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "#292929",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        textAlign: "center"
      }}>
        <h2 style={{
          color: "#4CAF50",
          marginBottom: "1rem",
          fontSize: "2rem"
        }}>
          🎉 Payment Successful!
        </h2>
        
        <div style={{
          background: "#1a1a1a",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "1.5rem"
        }}>
          <h3 style={{ color: "#ff9800", marginBottom: "1rem" }}>
            📋 Booking Details
          </h3>
          <div style={{ textAlign: "left", color: "#fff" }}>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>Movie:</strong> <span style={{ color: "#ff9800" }}>{bookingDetails.movie}</span>
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>Customer:</strong> <span style={{ color: "#ff9800" }}>{bookingDetails.customer}</span>
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>Seats:</strong> <span style={{ color: "#ff9800" }}>{bookingDetails.seats}</span>
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>Payment Method:</strong> <span style={{ color: "#ff9800" }}>{bookingDetails.paymentMethod}</span>
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>Booking ID:</strong> <span style={{ color: "#ff9800" }}>{bookingDetails.bookingId}</span>
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>Base Price:</strong> <span style={{ color: "#ff9800" }}>₹{bookingDetails.basePrice}</span>
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>GST (18%):</strong> <span style={{ color: "#ff9800" }}>₹{bookingDetails.gst.toFixed(2)}</span>
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>Total Amount:</strong> <span style={{ color: "#4CAF50", fontSize: "1.1rem", fontWeight: "bold" }}>₹{bookingDetails.total.toFixed(2)}</span>
            </p>
          </div>
        </div>

        <div style={{
          background: "#1a1a1a",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "1.5rem"
        }}>
          <h3 style={{ color: "#ff9800", marginBottom: "1rem" }}>
            🎬 Show Information
          </h3>
          <div style={{ textAlign: "left", color: "#fff" }}>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>Date:</strong> <span style={{ color: "#ff9800" }}>{bookingDetails.date}</span>
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>Time:</strong> <span style={{ color: "#ff9800" }}>{bookingDetails.time}</span>
            </p>
            <p style={{ marginBottom: "0.5rem" }}>
              <strong>Venue:</strong> <span style={{ color: "#ff9800" }}>{bookingDetails.venue}</span>
            </p>
          </div>
        </div>

                 <div style={{
           background: "#2a2a2a",
           padding: "1rem",
           borderRadius: "8px",
           marginBottom: "1.5rem"
         }}>
           <p style={{ color: "#4CAF50", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
             📧 A confirmation email has been sent to your registered email address.
           </p>
           <p style={{ color: "#4CAF50", marginBottom: "0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
             📱 You will receive an SMS with your booking details shortly.
           </p>
         </div>
         
         <p style={{ color: "#ccc", marginBottom: "1.5rem" }}>
           Thank you for your booking! Please arrive 15 minutes before the show time.
         </p>

        <div style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <button
            onClick={handleBookAnotherMovie}
            style={{
              background: "#ff9800",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            Book Another Movie
          </button>
          <button
            onClick={handlePrintTicket}
            style={{
              background: "#4CAF50",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            Print Ticket
          </button>
        </div>
      </div>
    );
  }

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
        Book Your Tickets
      </h2>
      
      <form onSubmit={handleBookingSubmit}>
        <div style={{marginBottom: "2rem"}}>
          <label style={{
            display: "block",
            marginBottom: "0.5rem",
            color: "#fff",
            fontWeight: "500"
          }}>
            Number of Seats:
          </label>
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
              padding: "0.75rem",
              borderRadius: "6px",
              border: "1px solid #444",
              background: "#181818",
              color: "#fff",
              fontSize: "1rem"
            }}
          />
          <small style={{color: "#bdbdbd", fontSize: "0.8rem"}}>
            Select between 1-10 seats
          </small>
        </div>
        
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
        
        <button type="submit" style={{
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
        }}>
          Book Now - ₹{finalTotal.toFixed(2)}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;