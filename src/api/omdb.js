// omdb.js

// 🔑 Your OMDb API key
const API_KEY = "f84fc31d"; 

// Function: search movies by query
export async function searchMovies(query) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Search response:", data); // Debug log

    if (data.Response === "False") {
      console.warn("OMDb API Error:", data.Error);
    }

    return data;
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return { Response: "False", Error: "Failed to fetch movies" };
  }
}

// Function: get movie details by IMDb ID
export async function getMovieDetail(imdbID) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (data.Response === "False") {
      console.warn("OMDb API Error:", data.Error);
    }

    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    return { Response: "False", Error: "Failed to fetch movie details" };
  }
}
