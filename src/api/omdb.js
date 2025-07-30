const API_KEY = "f84fc31d"; // Updated API key for better reliability
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
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { Response: "False", Error: "Failed to fetch movies" };
  }
}

export async function getMovieDetail(imdbID) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return { Response: "False", Error: "Failed to fetch movie details" };
  }
}