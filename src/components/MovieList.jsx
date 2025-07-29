import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  if (!movies.length) {
    return <div style={{textAlign: "center", color: "#bdbdbd"}}>No movies found.</div>;
  }
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "2rem"
    }}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;