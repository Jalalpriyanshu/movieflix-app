import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetail } from "../api/omdb";
import BookingForm from "../components/BookingForm";

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [booked, setBooked] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetail(id);
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found");
        }
      } catch (error) {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleBook = (data) => {
    console.log("Booking data:", data);
    setBookingData(data);
    setBooked(true);
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh"
      }}>
        <div style={{
          display: "inline-block",
          width: "50px",
          height: "50px",
          border: "3px solid #f3f3f3",
          borderTop: "3px solid #ff9800",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}></div>
        <p style={{marginLeft: "1rem"}}>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        textAlign: "center",
        padding: "2rem",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#ff9800",
            color: "#fff",
            padding: "0.7rem 2rem",
            borderRadius: "6px",
            border: "none",
            fontSize: "1.1rem",
            cursor: "pointer",
            marginTop: "1rem"
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (booked) {
    return (
      <div style={{
        textAlign: "center",
        padding: "2rem",
        maxWidth: "700px",
        margin: "0 auto",
        background: "#292929",
        borderRadius: "12px"
      }}>
        <h2 style={{color: "#4CAF50"}}>🎉 Payment Successful!</h2>
        <div style={{
          background: "#1a1a1a",
          padding: "2rem",
          borderRadius: "8px",
          margin: "1.5rem 0",
          textAlign: "left"
        }}>
          <h3 style={{color: "#ff9800", marginTop: 0}}>Booking Details</h3>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem"}}>
            <div>
              <p><strong>Movie:</strong> {bookingData?.movie}</p>
              <p><strong>Customer:</strong> {bookingData?.name}</p>
              <p><strong>Seats:</strong> {bookingData?.seats}</p>
              <p><strong>Payment Method:</strong> {bookingData?.paymentMethod === "card" ? "Credit/Debit Card" : "UPI"}</p>
            </div>
            <div>
              <p><strong>Booking ID:</strong> {bookingData?.bookingId}</p>
              <p><strong>Base Price:</strong> ₹{bookingData?.basePrice}</p>
              <p><strong>GST (18%):</strong> ₹{bookingData?.gst?.toFixed(2)}</p>
              <p><strong>Total Amount:</strong> ₹{bookingData?.total?.toFixed(2)}</p>
            </div>
          </div>
          
          <div style={{
            background: "#2a2a2a",
            padding: "1rem",
            borderRadius: "6px",
            marginTop: "1rem"
          }}>
            <p style={{margin: 0, fontSize: "0.9rem", color: "#bdbdbd"}}>
              <strong>📧</strong> A confirmation email has been sent to your registered email address.
            </p>
            <p style={{margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "#bdbdbd"}}>
              <strong>📱</strong> You will receive an SMS with your booking details shortly.
            </p>
          </div>
        </div>
        
        <div style={{
          background: "#1a1a1a",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem"
        }}>
          <h4 style={{margin: "0 0 0.5rem 0", color: "#ff9800"}}>🎬 Show Information</h4>
          <p style={{margin: "0.5rem 0", fontSize: "0.9rem"}}>
            <strong>Date:</strong> {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </p>
          <p style={{margin: "0.5rem 0", fontSize: "0.9rem"}}>
            <strong>Time:</strong> 7:00 PM
          </p>
          <p style={{margin: "0.5rem 0", fontSize: "0.9rem"}}>
            <strong>Venue:</strong> PVR Cinemas, City Center
          </p>
        </div>
        
        <p style={{color: "#bdbdbd", marginBottom: "1.5rem"}}>
          Thank you for your booking! Please arrive 15 minutes before the show time.
        </p>
        
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#ff9800",
            color: "#fff",
            padding: "0.7rem 2rem",
            borderRadius: "6px",
            border: "none",
            fontSize: "1.1rem",
            cursor: "pointer",
            marginRight: "1rem"
          }}
        >
          Book Another Movie
        </button>
        
        <button
          onClick={() => window.print()}
          style={{
            background: "#4CAF50",
            color: "#fff",
            padding: "0.7rem 2rem",
            borderRadius: "6px",
            border: "none",
            fontSize: "1.1rem",
            cursor: "pointer"
          }}
        >
          Print Ticket
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem"
    }}>
      <BookingForm movie={movie} onBook={handleBook} />
    </div>
  );
}

export default BookingPage;