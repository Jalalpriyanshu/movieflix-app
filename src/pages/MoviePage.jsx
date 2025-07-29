import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetail } from "../api/omdb";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem"
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        gap: "2rem",
        background: "#292929",
        borderRadius: "12px",
        padding: "2rem"
      }}>
        {/* Movie Poster */}
        <div>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450/666/fff?text=No+Poster"}
            alt={movie.Title}
            style={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
            }}
          />
        </div>

        {/* Movie Details */}
        <div>
          <h1 style={{marginTop: 0, color: "#fff"}}>{movie.Title}</h1>
          
          <div style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
            flexWrap: "wrap"
          }}>
            <span style={{
              background: "#ff9800",
              color: "#fff",
              padding: "0.3rem 0.8rem",
              borderRadius: "4px",
              fontSize: "0.9rem"
            }}>
              {movie.Year}
            </span>
            <span style={{
              background: "#4CAF50",
              color: "#fff",
              padding: "0.3rem 0.8rem",
              borderRadius: "4px",
              fontSize: "0.9rem"
            }}>
              {movie.Runtime}
            </span>
            <span style={{
              background: "#2196F3",
              color: "#fff",
              padding: "0.3rem 0.8rem",
              borderRadius: "4px",
              fontSize: "0.9rem"
            }}>
              {movie.Rated}
            </span>
          </div>

          <p style={{color: "#bdbdbd", lineHeight: "1.6"}}>{movie.Plot}</p>

          <div style={{marginBottom: "1rem"}}>
            <strong style={{color: "#ff9800"}}>Genre:</strong> {movie.Genre}
          </div>
          
          <div style={{marginBottom: "1rem"}}>
            <strong style={{color: "#ff9800"}}>Director:</strong> {movie.Director}
          </div>
          
          <div style={{marginBottom: "1rem"}}>
            <strong style={{color: "#ff9800"}}>Cast:</strong> {movie.Actors}
          </div>

          <div style={{marginBottom: "1rem"}}>
            <strong style={{color: "#ff9800"}}>IMDb Rating:</strong> {movie.imdbRating}/10
          </div>

          {/* Pricing Information */}
          <div style={{
            background: "#1a1a1a",
            padding: "1.5rem",
            borderRadius: "8px",
            marginBottom: "2rem"
          }}>
            <h3 style={{marginTop: 0, color: "#ff9800"}}>🎬 Ticket Pricing</h3>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem"
            }}>
              <span>Base Price:</span>
              <span style={{fontSize: "1.2rem", fontWeight: "bold", color: "#ff9800"}}>₹{basePrice}</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem"
            }}>
              <span>GST (18%):</span>
              <span>₹{(basePrice * 0.18).toFixed(2)}</span>
            </div>
            <hr style={{border: "1px solid #444", margin: "1rem 0"}} />
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{fontWeight: "bold"}}>Total per Ticket:</span>
              <span style={{fontSize: "1.3rem", fontWeight: "bold", color: "#4CAF50"}}>
                ₹{(basePrice * 1.18).toFixed(2)}
              </span>
            </div>
          </div>

          <Link to={`/book/${id}`} style={{
            background: "#ff9800",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "6px",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "1.1rem",
            fontWeight: "bold"
          }}>
            Book Now - ₹{(basePrice * 1.18).toFixed(2)}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;