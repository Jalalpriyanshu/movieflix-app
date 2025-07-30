import React, { useState, useEffect } from "react";

// Banner data with working image URLs and movie details
const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=400&fit=crop&crop=center",
    title: "Special Movie Offers",
    description: "Get 50% off on all movie tickets",
    movieId: "special-offers",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    price: "$12.99",
    duration: "2h 15m",
    genre: "Action, Adventure"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&h=400&fit=crop&crop=center",
    title: "New Releases",
    description: "Watch the latest blockbusters",
    movieId: "new-releases",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    price: "$15.99",
    duration: "1h 45m",
    genre: "Drama, Thriller"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=400&fit=crop&crop=center&blur=2",
    title: "Weekend Special",
    description: "Weekend movie marathon",
    movieId: "weekend-special",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    price: "$9.99",
    duration: "3h 20m",
    genre: "Comedy, Family"
  }
];

function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Auto-rotate banners every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToBanner = (index) => {
    setCurrentIndex(index);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleBannerClick = (banner) => {
    setSelectedMovie(banner);
    setShowModal(true);
    setShowBooking(false);
    setShowPaymentSuccess(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
    setShowBooking(false);
    setShowPaymentSuccess(false);
    setBookingDetails(null);
  };

  const handleBookNow = () => {
    setShowBooking(true);
    setShowPaymentSuccess(false);
  };

  const handlePayment = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    
    // Simulate payment processing
    setTimeout(() => {
      const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase();
      const basePrice = parseFloat(selectedMovie.price.replace('$', ''));
      const totalPrice = basePrice * selectedSeats;
      const gst = totalPrice * 0.18;
      const finalTotal = totalPrice + gst;
      
      setBookingDetails({
        movie: selectedMovie.title,
        customer: "John Doe", // In real app, this would come from user profile
        seats: selectedSeats,
        paymentMethod: paymentMethod,
        bookingId: bookingId,
        basePrice: basePrice,
        gst: gst,
        total: finalTotal,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 7 days from now
        time: "7:00 PM",
        venue: "PVR Cinemas, City Center"
      });
      
      setShowPaymentSuccess(true);
      setShowBooking(false);
    }, 2000);
  };

  const handleBookAnotherMovie = () => {
    closeModal();
  };

  const handlePrintTicket = () => {
    // In real app, this would generate and download a PDF ticket
    alert("Ticket downloaded successfully!");
  };

  return (
    <>
      <div style={{
        width: "100%",
        marginBottom: "2rem",
        borderRadius: "0",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }}>
        <div 
          style={{
            position: "relative",
            width: "100%",
            height: "400px",
            background: "#2a2a2a",
            cursor: "pointer"
          }}
          onClick={() => handleBannerClick(banners[currentIndex])}
        >
          {!imageError ? (
            <img
              src={banners[currentIndex].image}
              alt={banners[currentIndex].title}
              onError={handleImageError}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          ) : (
            <div style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "2rem",
              fontWeight: "bold"
            }}>
              {banners[currentIndex].title}
            </div>
          )}
          <div style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
            padding: "2rem",
            color: "white"
          }}>
            <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem" }}>
              {banners[currentIndex].title}
            </h2>
            <p style={{ margin: "0", fontSize: "1.1rem" }}>
              {banners[currentIndex].description}
            </p>
            <div style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1rem"
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBannerClick(banners[currentIndex]);
                }}
                style={{
                  background: "#ff6b6b",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1rem"
                }}
              >
                Watch Now
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMovie(banners[currentIndex]);
                  setShowModal(true);
                  setShowBooking(true);
                }}
                style={{
                  background: "transparent",
                  color: "white",
                  border: "2px solid white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1rem"
                }}
              >
                Book Tickets
              </button>
            </div>
          </div>
        </div>
        
        {/* Banner indicators */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "1rem"
        }}>
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              onClick={() => goToBanner(index)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: index === currentIndex ? "#ff6b6b" : "#ddd",
                cursor: "pointer",
                transition: "background-color 0.3s"
              }}
            />
          ))}
        </div>
      </div>

      {/* Movie Modal */}
      {showModal && selectedMovie && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            background: "#1a1a1a",
            borderRadius: "12px",
            maxWidth: "800px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative"
          }}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                color: "white",
                fontSize: "1.5rem",
                cursor: "pointer",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                zIndex: 10
              }}
            >
              ✕
            </button>

            {!showBooking ? (
              /* Movie Details View */
              <div style={{ padding: "2rem" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2rem",
                  alignItems: "start"
                }}>
                  <div>
                    <img
                      src={selectedMovie.image}
                      alt={selectedMovie.title}
                      style={{
                        width: "100%",
                        borderRadius: "8px"
                      }}
                    />
                  </div>
                  <div>
                    <h2 style={{ margin: "0 0 1rem 0", color: "#ff6b6b" }}>
                      {selectedMovie.title}
                    </h2>
                    <p style={{ margin: "0 0 1rem 0", color: "#ccc" }}>
                      {selectedMovie.description}
                    </p>
                    <div style={{ marginBottom: "1rem" }}>
                      <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>
                        Price: {selectedMovie.price}
                      </span>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <span style={{ color: "#ccc" }}>
                        Duration: {selectedMovie.duration}
                      </span>
                    </div>
                    <div style={{ marginBottom: "2rem" }}>
                      <span style={{ color: "#ccc" }}>
                        Genre: {selectedMovie.genre}
                      </span>
                    </div>
                    <div style={{
                      display: "flex",
                      gap: "1rem",
                      flexWrap: "wrap"
                    }}>
                      <button
                        onClick={() => {
                          // Play video functionality
                          alert("Playing video: " + selectedMovie.title);
                        }}
                        style={{
                          background: "#ff6b6b",
                          color: "white",
                          border: "none",
                          padding: "0.75rem 1.5rem",
                          borderRadius: "25px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        ▶ Play Movie
                      </button>
                      <button
                        onClick={handleBookNow}
                        style={{
                          background: "transparent",
                          color: "#ff6b6b",
                          border: "2px solid #ff6b6b",
                          padding: "0.75rem 1.5rem",
                          borderRadius: "25px",
                          cursor: "pointer",
                          fontWeight: "bold"
                        }}
                      >
                        Book Tickets
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Booking View */
              <div style={{ padding: "2rem" }}>
                <h2 style={{ margin: "0 0 1rem 0", color: "#ff6b6b" }}>
                  Book Tickets - {selectedMovie.title}
                </h2>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2rem"
                }}>
                  <div>
                    <h3 style={{ margin: "0 0 1rem 0", color: "#fff" }}>
                      Select Seats
                    </h3>
                    <div style={{
                      background: "#333",
                      padding: "1rem",
                      borderRadius: "8px",
                      marginBottom: "1rem"
                    }}>
                      <p style={{ color: "#ccc", margin: "0 0 0.5rem 0" }}>
                        Screen
                      </p>
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(8, 1fr)",
                        gap: "0.5rem"
                      }}>
                        {Array.from({ length: 40 }, (_, i) => (
                          <button
                            key={i}
                            style={{
                              width: "30px",
                              height: "30px",
                              background: "#555",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.7rem",
                              color: "#fff"
                            }}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ color: "#fff", display: "block", marginBottom: "0.5rem" }}>
                        Number of Tickets:
                      </label>
                      <select 
                        value={selectedSeats}
                        onChange={(e) => setSelectedSeats(parseInt(e.target.value))}
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          background: "#333",
                          color: "#fff",
                          border: "1px solid #555",
                          borderRadius: "4px"
                        }}
                      >
                        {[1,2,3,4,5,6,7,8].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 1rem 0", color: "#fff" }}>
                      Payment
                    </h3>
                    <div style={{
                      background: "#333",
                      padding: "1rem",
                      borderRadius: "8px",
                      marginBottom: "1rem"
                    }}>
                      <div style={{ marginBottom: "1rem" }}>
                        <span style={{ color: "#ccc" }}>Price per ticket: </span>
                        <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>
                          {selectedMovie.price}
                        </span>
                      </div>
                      <div style={{ marginBottom: "1rem" }}>
                        <span style={{ color: "#ccc" }}>Number of tickets: </span>
                        <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>
                          {selectedSeats}
                        </span>
                      </div>
                      <div style={{ marginBottom: "1rem" }}>
                        <span style={{ color: "#ccc" }}>Subtotal: </span>
                        <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>
                          ${(parseFloat(selectedMovie.price.replace('$', '')) * selectedSeats).toFixed(2)}
                        </span>
                      </div>
                      <div style={{ marginBottom: "1rem" }}>
                        <span style={{ color: "#ccc" }}>GST (18%): </span>
                        <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>
                          ${((parseFloat(selectedMovie.price.replace('$', '')) * selectedSeats * 0.18)).toFixed(2)}
                        </span>
                      </div>
                      <div style={{ marginBottom: "1rem" }}>
                        <span style={{ color: "#ccc" }}>Total: </span>
                        <span style={{ color: "#4CAF50", fontWeight: "bold", fontSize: "1.1rem" }}>
                          ${((parseFloat(selectedMovie.price.replace('$', '')) * selectedSeats * 1.18)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem"
                    }}>
                      <button
                        onClick={() => handlePayment("Credit Card")}
                        style={{
                          background: "#ff6b6b",
                          color: "white",
                          border: "none",
                          padding: "0.75rem",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem"
                        }}
                      >
                        💳 Pay with Credit Card
                      </button>
                      <button
                        onClick={() => handlePayment("UPI")}
                        style={{
                          background: "#6f42c1",
                          color: "white",
                          border: "none",
                          padding: "0.75rem",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem"
                        }}
                      >
                        📱 Pay with UPI
                      </button>
                      <button
                        onClick={() => handlePayment("PayPal")}
                        style={{
                          background: "#0070ba",
                          color: "white",
                          border: "none",
                          padding: "0.75rem",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem"
                        }}
                      >
                        💰 Pay with PayPal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Success Modal */}
      {showPaymentSuccess && bookingDetails && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div style={{
            background: "#1a1a1a",
            borderRadius: "12px",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "80vh",
            overflow: "auto",
            position: "relative",
            textAlign: "center"
          }}>
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                color: "white",
                fontSize: "1.5rem",
                cursor: "pointer",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                zIndex: 10
              }}
            >
              ✕
            </button>

            <div style={{ padding: "2rem" }}>
              <h2 style={{ color: "#4CAF50", marginBottom: "1rem" }}>
                Payment Successful!
              </h2>
              <p style={{ color: "#ccc", marginBottom: "1rem" }}>
                Your booking for {bookingDetails.movie} has been confirmed.
              </p>
              <div style={{
                background: "#2a2a2a",
                padding: "1.5rem",
                borderRadius: "8px",
                marginBottom: "1.5rem"
              }}>
                <h3 style={{ color: "#fff", marginBottom: "0.5rem" }}>
                  Booking Details
                </h3>
                <p style={{ color: "#ccc", marginBottom: "0.3rem" }}>
                  Movie: <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>{bookingDetails.movie}</span>
                </p>
                <p style={{ color: "#ccc", marginBottom: "0.3rem" }}>
                  Customer: <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>{bookingDetails.customer}</span>
                </p>
                <p style={{ color: "#ccc", marginBottom: "0.3rem" }}>
                  Seats: <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>{bookingDetails.seats}</span>
                </p>
                <p style={{ color: "#ccc", marginBottom: "0.3rem" }}>
                  Payment Method: <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>{bookingDetails.paymentMethod}</span>
                </p>
                <p style={{ color: "#ccc", marginBottom: "0.3rem" }}>
                  Booking ID: <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>{bookingDetails.bookingId}</span>
                </p>
                <p style={{ color: "#ccc", marginBottom: "0.3rem" }}>
                  Base Price: <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>${bookingDetails.basePrice.toFixed(2)}</span>
                </p>
                <p style={{ color: "#ccc", marginBottom: "0.3rem" }}>
                  GST: <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>${bookingDetails.gst.toFixed(2)}</span>
                </p>
                <p style={{ color: "#ccc", marginBottom: "0.3rem" }}>
                  Total: <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>${bookingDetails.total.toFixed(2)}</span>
                </p>
                <p style={{ color: "#ccc", marginBottom: "0.3rem" }}>
                  Date: <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>{bookingDetails.date}</span>
                </p>
                <p style={{ color: "#ccc", marginBottom: "0.3rem" }}>
                  Time: <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>{bookingDetails.time}</span>
                </p>
                               <p style={{ color: "#ccc", marginBottom: "0.3rem" }}>
                 Venue: <span style={{ color: "#ff6b6b", fontWeight: "bold" }}>{bookingDetails.venue}</span>
               </p>
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
             
             <button
                onClick={handleBookAnotherMovie}
                style={{
                  background: "#ff6b6b",
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
                  fontSize: "1rem",
                  marginLeft: "1rem"
                }}
              >
                Print Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BannerSlider;