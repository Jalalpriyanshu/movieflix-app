import React from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  
  const posterUrl = movie.Poster !== "N/A" ? movie.Poster : 
                   movie.poster || "https://via.placeholder.com/180x270/666/fff?text=No+Image";
  
  const title = movie.Title || movie.title;
  const year = movie.Year || movie.year;
  const id = movie.imdbID || movie.id;

  const handleClick = () => {
    // Navigate instantly to movie details
    navigate(`/movie/${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      style={{
        minWidth: "180px",
        background: "#292929",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.05)";
        e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.18)";
      }}
    >
      <img
        src={posterUrl}
        alt={title}
        style={{
          width: "100%",
          height: "270px",
          objectFit: "cover",
          background: "#444"
        }}
      />
      <div style={{padding: "1rem"}}>
        <h3 style={{
          margin: "0 0 0.5rem 0",
          fontSize: "1rem",
          color: "#fff",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>
          {title}
        </h3>
        <p style={{
          margin: 0,
          color: "#bdbdbd",
          fontSize: "0.9rem"
        }}>
          {year}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;