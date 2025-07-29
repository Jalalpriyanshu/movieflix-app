import React from "react";
import MovieCard from "./MovieCard";

function MovieCarousel({ movies, title = "Movies" }) {
  if (!movies || movies.length === 0) {
    return (
      <div style={{
        textAlign: "center", 
        color: "#bdbdbd", 
        padding: "2rem",
        width: "100%"
      }}>
        No movies found.
      </div>
    );
  }

  return (
    <div style={{
      width: "100%",
      marginBottom: "3rem"
    }}>
      <h2 style={{
        marginLeft: "0",
        marginBottom: "1rem",
        fontSize: "1.5rem",
        fontWeight: "bold"
      }}>
        {title}
      </h2>
      <div style={{
        display: "flex",
        overflowX: "auto",
        gap: "1.5rem",
        padding: "1rem 0",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        width: "100%"
      }}>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID || movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieCarousel;