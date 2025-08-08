import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGenresFromMood } from "@/services/openaiService";
import { auth } from "@/auth/firebase";
import { API_OPTIONS, searchMoviesByKeywords } from "@/services/tmdbService";
import { MovieSection } from "@/components/MovieSection";
import { TMDB_MOVIE_CATEGORY_PATH } from "@/utils/constants";

export default function Browse() {
  const navigate = useNavigate();

  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (
    category: string,
    setter: (movies: any[]) => void
  ) => {
    try {
      setError(null);
      const response = await fetch(
        TMDB_MOVIE_CATEGORY_PATH(category),
        API_OPTIONS
      );
      if (!response.ok) throw new Error(`Failed to fetch ${category}`);
      const data = await response.json();
      setter(data.results ?? []);
    } catch (err) {
      console.error(err);
      setError(`Could not load ${category} movies.`);
    }
  };

  useEffect(() => {
    fetchMovies("now_playing", setNowPlayingMovies);
    fetchMovies("popular", setPopularMovies);
    fetchMovies("top_rated", setTopRatedMovies);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;
    setLoading(true);
    try {
      setError(null);
      const genres = await getGenresFromMood(mood);
      const results = await searchMoviesByKeywords(genres);
      setSearchedMovies(results);
      if (!results.length) setError("No movies found for that mood.");
    } catch (err) {
      console.error(err);
      setError("Failed to search movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-16 p-4">
      <div className="flex justify-center mt-6">
        <div className="bg-white/10 p-4 rounded-lg shadow-lg w-full max-w-4xl border border-gray-600">
          <form
            onSubmit={handleSearch}
            className="flex gap-2 relative items-center"
          >
            <Input
              type="text"
              placeholder="Search movies by describing your mood, e.g., romantic comedy with a twist"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="flex-1 text-black bg-white/90 italic placeholder:italic"
              aria-label="Search movies by mood description"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading || !mood.trim()}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold min-w-[80px]"
              aria-disabled={loading || !mood.trim()}
            >
              {loading ? "Searching..." : "Go"}
            </Button>
          </form>
          {error && (
            <p
              className="mt-2 text-red-400 text-center"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          )}
        </div>
      </div>

      {searchedMovies.length > 0 ? (
        <MovieSection title="Searched Movies" movies={searchedMovies} />
      ) : (
        <>
          <MovieSection title="Now Playing Movies" movies={nowPlayingMovies} />
          <MovieSection title="Popular Movies" movies={popularMovies} />
          <MovieSection title="Top Rated Movies" movies={topRatedMovies} />
        </>
      )}
    </main>
  );
}
