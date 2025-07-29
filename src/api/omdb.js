const API_KEY = "ecc218a8"; // Replace with your actual API key
export async function searchMovies(query) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
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