import React from "react";
import { Link } from "react-router-dom";

function MovieDetail({ movie }) {
  if (!movie) return null;
  return (
    <div style={{display: "flex", gap: "2rem", flexWrap: "wrap"}}>
      <img
        src={movie.poster}
        alt={movie.title}
        style={{width: "300px", height: "450px", objectFit: "cover", borderRadius: "12px", background: "#444"}}
      />
      <div>
        <h2>{movie.title} ({movie.year})</h2>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Cast:</strong> {movie.cast}</p>
        <p><strong>Plot:</strong> {movie.plot}</p>
        <Link to={`/book/${movie.id}`}>
          <button style={{
            padding: "0.7rem 2rem",
            background: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1.1rem",
            cursor: "pointer",
            marginTop: "1rem"
          }}>Book Now</button>
        </Link>
      </div>
    </div>
  );
}

export default MovieDetail;