import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../api/omdb";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Debounced search - search as user types
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim().length > 2) {
        performSearch();
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const data = await searchMovies(query);
      if (data.Response === "True") {
        setResults(data.Search.slice(0, 5)); // Limit to 5 results for faster display
        setShowResults(true);
      } else {
        setResults([]);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    performSearch();
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
    setShowResults(false);
    setQuery("");
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow clicking
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <div style={{position: "relative"}}>
      <form onSubmit={handleSearch} style={{
        display: "flex",
        alignItems: "center"
      }}>
        <input
          type="text"
          placeholder="Search for Movies, Events, Plays, Sports and Activities"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          style={{
            padding: "0.7rem 1rem",
            borderRadius: "4px 0 0 4px",
            border: "1px solid #ccc",
            width: "350px",
            fontSize: "0.9rem"
          }}
        />
        <button type="submit" disabled={loading} style={{
          background: "#e71a38",
          color: "#fff",
          border: "none",
          borderRadius: "0 4px 4px 0",
          padding: "0.7rem 1.5rem",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1
        }}>
          {loading ? "..." : "Search"}
        </button>
      </form>
      
      {showResults && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "4px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 1000,
          maxHeight: "300px",
          overflowY: "auto"
        }}>
          {loading ? (
            <div style={{
              padding: "1rem",
              textAlign: "center",
              color: "#666"
            }}>
              Searching...
            </div>
          ) : results.length > 0 ? (
            results.map((movie) => (
              <div 
                key={movie.imdbID} 
                onClick={() => handleMovieClick(movie.imdbID)}
                style={{
                  padding: "0.8rem 1rem",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  color: "#333",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                <img 
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/40x60/666/fff?text=No+Image"}
                  alt={movie.Title}
                  style={{
                    width: "40px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "4px"
                  }}
                />
                <div>
                  <div style={{fontWeight: "bold"}}>{movie.Title}</div>
                  <div style={{fontSize: "0.8rem", color: "#666"}}>{movie.Year}</div>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              padding: "1rem",
              textAlign: "center",
              color: "#666"
            }}>
              No movies found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;