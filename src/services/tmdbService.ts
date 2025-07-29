const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
};

export async function searchMoviesByKeywords(
  keywords: string[]
): Promise<any[]> {
  const movieMap = new Map<number, any>();

  for (const keyword of keywords) {
    const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(
      keyword
    )}&include_adult=false&language=en-US&page=1`;

    const res = await fetch(url, API_OPTIONS);
    if (!res.ok) throw new Error("Failed to fetch movies");
    const data = await res.json();
    const results = data.results || [];

    for (const movie of results) {
      const titleLower = movie.title.toLowerCase();
      if (
        titleLower.includes("making of") ||
        titleLower.includes("behind the scenes") ||
        titleLower.includes("documentary")
      ) {
        continue; // skip unwanted results
      }
      if (!movieMap.has(movie.id)) {
        movieMap.set(movie.id, movie);
      }
    }
  }

  return Array.from(movieMap.values());
}
