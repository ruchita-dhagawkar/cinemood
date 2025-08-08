export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const LOGIN_IMAGE_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/GB-en-20250721-TRIFECTA-perspective_e46accef-a86c-4530-a3c6-0bd0f45dc7d2_large.jpg";

export const TMDB_API_BASE = "https://api.themoviedb.org/3";
export const TMDB_VIDEOS_PATH = (movieId: string) =>
  `${TMDB_API_BASE}/movie/${movieId}/videos?language=en-US`;

export const YOUTUBE_EMBED_BASE = "https://www.youtube.com/embed";

export const TMDB_MOVIE_CATEGORY_PATH = (category: string) =>
  `${TMDB_API_BASE}/movie/${category}?language=en-US&page=1`;
