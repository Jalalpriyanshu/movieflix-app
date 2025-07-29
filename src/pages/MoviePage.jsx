import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetail } from "../api/omdb";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSeats, setSelectedSeats] = useState(1);

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

  // Calculate price based on movie
  const getMoviePrice = (movieTitle) => {
    const title = movieTitle?.toLowerCase() || "";
    if (title.includes("avengers") || title.includes("infinity")) return 350;
    if (title.includes("marvel")) return 300;
    if (title.includes("spider")) return 250;
    if (title.includes("batman") || title.includes("superman")) return 280;
    return 200; // Default price
  };

  const basePrice = getMoviePrice(movie?.Title);
  const totalPrice = basePrice * selectedSeats;
  const gst = totalPrice * 0.18;
  const finalTotal = totalPrice + gst;

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
        <Link to="/" style={{
          background: "#ff9800",
          color: "#fff",
          padding: "0.7rem 2rem",
          borderRadius: "6px",
          textDecoration: "none",
          display: "inline-block",
          marginTop: "1rem"
        }}>
          Back to Home
        </Link>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "clamp(1rem, 3vw, 2rem)"
    }}>
      {/* Movie Details Section */}
      <div style={{
        background: "#292929",
        borderRadius: "12px",
        padding: "clamp(1rem, 4vw, 2rem)",
        marginBottom: "clamp(1rem, 3vw, 2rem)"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(1rem, 3vw, 2rem)"
        }}>
          {/* Responsive Grid Layout */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(1rem, 3vw, 2rem)"
          }} className="responsive-grid">
            {/* Movie Poster */}
            <div style={{textAlign: "center"}}>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450/666/fff?text=No+Poster"}
                alt={movie.Title}
                style={{
                  width: "100%",
                  maxWidth: "clamp(250px, 40vw, 400px)",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
                }}
              />
            </div>

            {/* Movie Details */}
            <div>
              <h1 style={{
                marginTop: 0, 
                color: "#fff", 
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                lineHeight: "1.2"
              }}>
                {movie.Title}
              </h1>
              
              <div style={{
                display: "flex",
                gap: "clamp(0.5rem, 2vw, 1rem)",
                marginBottom: "clamp(1rem, 3vw, 1.5rem)",
                flexWrap: "wrap"
              }}>
                <span style={{
                  background: "#ff9800",
                  color: "#fff",
                  padding: "clamp(0.3rem, 1.5vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)",
                  borderRadius: "6px",
                  fontSize: "clamp(0.8rem, 2vw, 1rem)"
                }}>
                  {movie.Year}
                </span>
                <span style={{
                  background: "#4CAF50",
                  color: "#fff",
                  padding: "clamp(0.3rem, 1.5vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)",
                  borderRadius: "6px",
                  fontSize: "clamp(0.8rem, 2vw, 1rem)"
                }}>
                  {movie.Runtime}
                </span>
                <span style={{
                  background: "#2196F3",
                  color: "#fff",
                  padding: "clamp(0.3rem, 1.5vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)",
                  borderRadius: "6px",
                  fontSize: "clamp(0.8rem, 2vw, 1rem)"
                }}>
                  {movie.Rated}
                </span>
              </div>

              <p style={{
                color: "#bdbdbd", 
                lineHeight: "1.6", 
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                marginBottom: "clamp(1rem, 3vw, 1.5rem)"
              }}>
                {movie.Plot}
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "clamp(0.5rem, 2vw, 1rem)"
              }}>
                <div style={{fontSize: "clamp(0.9rem, 2.5vw, 1rem)"}}>
                  <strong style={{color: "#ff9800"}}>Genre:</strong> {movie.Genre}
                </div>
                
                <div style={{fontSize: "clamp(0.9rem, 2.5vw, 1rem)"}}>
                  <strong style={{color: "#ff9800"}}>Director:</strong> {movie.Director}
                </div>
                
                <div style={{fontSize: "clamp(0.9rem, 2.5vw, 1rem)"}}>
                  <strong style={{color: "#ff9800"}}>Cast:</strong> {movie.Actors}
                </div>

                <div style={{fontSize: "clamp(0.9rem, 2.5vw, 1rem)"}}>
                  <strong style={{color: "#ff9800"}}>IMDb Rating:</strong> {movie.imdbRating}/10
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Section - Below Movie Details */}
      <div style={{
        background: "#292929",
        borderRadius: "12px",
        padding: "clamp(1rem, 4vw, 2rem)",
        marginBottom: "clamp(1rem, 3vw, 2rem)"
      }}>
        <h2 style={{
          marginTop: 0, 
          color: "#ff9800", 
          textAlign: "center", 
          fontSize: "clamp(1.3rem, 3.5vw, 2rem)"
        }}>
          🎬 Book Your Tickets
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(1rem, 3vw, 2rem)"
        }}>
          {/* Seat Selection */}
          <div>
            <h3 style={{
              color: "#fff", 
              marginBottom: "clamp(0.5rem, 2vw, 1rem)", 
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)"
            }}>
              Select Number of Seats
            </h3>
            <div style={{
              background: "#1a1a1a",
              padding: "clamp(1rem, 3vw, 1.5rem)",
              borderRadius: "8px"
            }}>
              <label style={{
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#fff", 
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
              }}>
                Number of Seats:
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={selectedSeats}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1 && value <= 10) {
                    setSelectedSeats(value);
                  }
                }}
                style={{
                  width: "100%",
                  padding: "clamp(0.7rem, 2.5vw, 1rem)",
                  borderRadius: "6px",
                  border: "1px solid #444",
                  background: "#181818",
                  color: "#fff",
                  fontSize: "clamp(1rem, 2.5vw, 1.1rem)"
                }}
              />
              <small style={{
                color: "#bdbdbd", 
                fontSize: "clamp(0.8rem, 2vw, 0.9rem)"
              }}>
                Select between 1-10 seats
              </small>
            </div>
          </div>

          {/* Price Breakdown */}
          <div>
            <h3 style={{
              color: "#fff", 
              marginBottom: "clamp(0.5rem, 2vw, 1rem)", 
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)"
            }}>
              Price Breakdown
            </h3>
            <div style={{
              background: "#1a1a1a",
              padding: "clamp(1rem, 3vw, 1.5rem)",
              borderRadius: "8px"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "clamp(0.5rem, 2vw, 0.8rem)",
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
              }}>
                <span style={{color: "#bdbdbd"}}>Base Price:</span>
                <span style={{color: "#ff9800", fontWeight: "bold"}}>₹{basePrice}</span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "clamp(0.5rem, 2vw, 0.8rem)",
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
              }}>
                <span style={{color: "#bdbdbd"}}>Seats:</span>
                <span style={{color: "#fff"}}>{selectedSeats}</span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "clamp(0.5rem, 2vw, 0.8rem)",
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
              }}>
                <span style={{color: "#bdbdbd"}}>Subtotal:</span>
                <span style={{color: "#fff"}}>₹{totalPrice}</span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "clamp(0.5rem, 2vw, 0.8rem)",
                fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
              }}>
                <span style={{color: "#bdbdbd"}}>GST (18%):</span>
                <span style={{color: "#fff"}}>₹{gst.toFixed(2)}</span>
              </div>
              <hr style={{
                border: "1px solid #444", 
                margin: "clamp(0.5rem, 2vw, 1rem) 0"
              }} />
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: "bold",
                fontSize: "clamp(1.1rem, 3vw, 1.3rem)"
              }}>
                <span style={{color: "#fff"}}>Total Amount:</span>
                <span style={{color: "#4CAF50", fontSize: "clamp(1.2rem, 3.5vw, 1.5rem)"}}>
                  ₹{finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <div style={{
          textAlign: "center", 
          marginTop: "clamp(1rem, 3vw, 2rem)"
        }}>
          <Link to={`/book/${id}`} style={{
            background: "#ff9800",
            color: "#fff",
            padding: "clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 3rem)",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
            fontWeight: "bold",
            boxShadow: "0 6px 16px rgba(255, 152, 0, 0.3)",
            width: "100%",
            maxWidth: "clamp(300px, 50vw, 400px)",
            transition: "all 0.3s ease"
          }}>
            Book Now - ₹{finalTotal.toFixed(2)}
          </Link>
        </div>
      </div>

      {/* Show Information */}
      <div style={{
        background: "#292929",
        borderRadius: "12px",
        padding: "clamp(1rem, 4vw, 2rem)"
      }}>
        <h3 style={{
          color: "#ff9800", 
          marginTop: 0, 
          marginBottom: "clamp(1rem, 3vw, 1.5rem)", 
          fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)"
        }}>
          🎭 Show Information
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "clamp(0.5rem, 2vw, 1rem)"
        }}>
          <div style={{
            background: "#1a1a1a",
            padding: "clamp(0.75rem, 2.5vw, 1rem)",
            borderRadius: "8px"
          }}>
            <strong style={{
              color: "#ff9800", 
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
            }}>
              📅 Date:
            </strong>
            <p style={{
              margin: "clamp(0.25rem, 1vw, 0.5rem) 0 0 0", 
              color: "#fff", 
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
            }}>
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </div>
          <div style={{
            background: "#1a1a1a",
            padding: "clamp(0.75rem, 2.5vw, 1rem)",
            borderRadius: "8px"
          }}>
            <strong style={{
              color: "#ff9800", 
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
            }}>
              🕐 Time:
            </strong>
            <p style={{
              margin: "clamp(0.25rem, 1vw, 0.5rem) 0 0 0", 
              color: "#fff", 
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
            }}>
              7:00 PM
            </p>
          </div>
          <div style={{
            background: "#1a1a1a",
            padding: "clamp(0.75rem, 2.5vw, 1rem)",
            borderRadius: "8px"
          }}>
            <strong style={{
              color: "#ff9800", 
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
            }}>
              🎬 Venue:
            </strong>
            <p style={{
              margin: "clamp(0.25rem, 1vw, 0.5rem) 0 0 0", 
              color: "#fff", 
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
            }}>
              PVR Cinemas, City Center
            </p>
          </div>
          <div style={{
            background: "#1a1a1a",
            padding: "clamp(0.75rem, 2.5vw, 1rem)",
            borderRadius: "8px"
          }}>
            <strong style={{
              color: "#ff9800", 
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
            }}>
              🎫 Screen:
            </strong>
            <p style={{
              margin: "clamp(0.25rem, 1vw, 0.5rem) 0 0 0", 
              color: "#fff", 
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)"
            }}>
              Screen 3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;