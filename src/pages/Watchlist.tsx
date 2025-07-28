import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { useMovieStore } from "@/store/movieStore";

const Watchlist = () => {
  const watchlist = useMovieStore((state) => state.watchlist);
  const setWatchlist = useMovieStore((state) => state.setWatchlist);

  const removeFromWatchlist = (movie: any) => {
    setWatchlist(watchlist.filter((m) => m.id !== movie.id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h2 className="text-2xl font-semibold mt-6 mb-4">Your Watchlist</h2>
      <div className="flex gap-4 overflow-x-auto">
        {watchlist?.map((movie) => (
          <div key={movie.id} className="flex-shrink-0">
            <div>
              <MovieCard movie={movie} />
              <Button
                onClick={() => removeFromWatchlist(movie)}
                size="sm"
                className="mt-2 w-full"
              >
                Remove from Watchlist
              </Button>
            </div>
          </div>
        ))}
        {watchlist.length === 0 && (
          <p className="text-zinc-400">Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
