import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGenresFromMood } from "@/services/openaiService";
import { auth } from "@/auth/firebase";
import { API_OPTIONS, searchMoviesByKeywords } from "@/services/tmdbService";
import { useMovieStore } from "@/store/movieStore";

export default function Browse() {
  const navigate = useNavigate();

  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);
  const setWatchlist = useMovieStore((state) => state.setWatchlist);
  const watchlist = useMovieStore((state) => state.watchlist);

  const clearSearch = () => {
    setMood("");
    setSearchedMovies([]);
  };

  //   TODO: Create a custom hook for fetching movies
  const getNowPlayingMovies = async () => {
    console.log("Fetching now playing movies...");
    try {
      const results = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        API_OPTIONS
      )
        .then((res) => res.json())
        .then((res) => res.results)
        .catch((err) => console.error(err));
      setNowPlayingMovies(results);
      console.log("Now Playing Movies:", results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const getPopularMovies = async () => {
    console.log("Fetching popular movies...");
    try {
      const results = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        API_OPTIONS
      )
        .then((res) => res.json())
        .then((res) => res.results)
        .catch((err) => console.error(err));
      setPopularMovies(results);
      console.log("Popular Movies:", results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const getTopRatedMovies = async () => {
    console.log("Fetching top rated movies...");
    try {
      const results = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        API_OPTIONS
      )
        .then((res) => res.json())
        .then((res) => res.results)
        .catch((err) => console.error(err));
      setTopRatedMovies(results);
      console.log("Top Rated Movies:", results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const genres = await getGenresFromMood(mood);
      // const genres = [
      //   "Dilwale Dulhania Le Jayenge",
      //   "Kabhi Khushi Kabhie Gham",
      //   "Kabir Singh",
      // ];
      console.log("OpenAI returned genres:", genres);
      const results = await searchMoviesByKeywords(genres);
      console.log("TMDB search results:", results);
      setSearchedMovies(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
    getPopularMovies();
    getTopRatedMovies();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const addToWatchlist = (movie: any) => {
    if (watchlist.find((m: any) => m.id === movie.id)) return;
    setWatchlist([...watchlist, movie]);
    console.log("Added to watchlist:", [...watchlist, movie]);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-16 p-4">
      <div className="flex justify-center mt-6">
        <div className="bg-white/10 p-4 rounded-lg shadow-lg w-6/12 border">
          <form onSubmit={handleSearch} className="flex gap-2 relative">
            <Input
              type="text"
              placeholder="Search movies by describing your mood, e.g., romantic comedy with a twist"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="flex-1 text-black bg-white/90 italic placeholder:italic"
            />
            {mood && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-18 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                aria-label="Clear search input"
              >
                &#x2715;
              </button>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              {loading ? "Searching..." : "Go"}
            </Button>
          </form>
        </div>
      </div>
      {searchedMovies.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Searched Movies</h2>
          <div className="flex gap-4 overflow-x-auto">
            {searchedMovies?.map((movie) => (
              <div key={movie.id} className="flex-shrink-0">
                <div>
                  <MovieCard movie={movie} />
                  <Button
                    onClick={() => addToWatchlist(movie)}
                    size="sm"
                    className="mt-2 w-full"
                  >
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {searchedMovies.length === 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-6 mb-4">
            Now Playing Movies
          </h2>
          <div className="flex gap-4 overflow-x-auto">
            {nowPlayingMovies?.map((movie) => (
              <div key={movie.id} className="flex-shrink-0">
                <div>
                  <MovieCard movie={movie} />
                  <Button
                    onClick={() => addToWatchlist(movie)}
                    size="sm"
                    className="mt-2 w-full cursor-pointer hover:bg-neutral-800"
                  >
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Popular Movies</h2>
          <div className="flex gap-4 overflow-x-auto">
            {popularMovies?.map((movie) => (
              <div key={movie.id} className="flex-shrink-0">
                <div>
                  <MovieCard movie={movie} />
                  <Button
                    onClick={() => addToWatchlist(movie)}
                    size="sm"
                    className="mt-2 w-full cursor-pointer hover:bg-neutral-800"
                  >
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Top Rated Movies</h2>
          <div className="flex gap-4 overflow-x-auto">
            {topRatedMovies?.map((movie) => (
              <div key={movie.id} className="flex-shrink-0">
                <div>
                  <MovieCard movie={movie} />
                  <Button
                    onClick={() => addToWatchlist(movie)}
                    size="sm"
                    className="mt-2 w-full cursor-pointer hover:bg-neutral-800"
                  >
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
