import React, { useEffect, useState } from "react";
import BannerSlider from "../components/BannerSlider";
import MovieCarousel from "../components/MovieCarousel";
import { searchMovies } from "../api/omdb";

function Home() {
  const [recommended, setRecommended] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch recommended movies
        const recommendedData = await searchMovies("Avengers");
        if (recommendedData.Response === "True") {
          setRecommended(recommendedData.Search);
        }

        // Fetch trending movies
        const trendingData = await searchMovies("Marvel");
        if (trendingData.Response === "True") {
          setTrending(trendingData.Search);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="container" style={{textAlign: "center", padding: "2rem"}}>
        <div style={{
          display: "inline-block",
          width: "50px",
          height: "50px",
          border: "3px solid #f3f3f3",
          borderTop: "3px solid #ff9800",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <BannerSlider />
      <MovieCarousel movies={recommended} title="Recommended Movies" />
      <MovieCarousel movies={trending} title="Trending Now" />
    </div>
  );
}

export default Home;