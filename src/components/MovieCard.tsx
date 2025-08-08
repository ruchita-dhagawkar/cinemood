import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IMAGE_BASE_URL } from "@/utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useMovieStore } from "@/store/movieStore";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  overview?: string;
}

interface Props {
  movie: Movie;
  onAddToWatchlist?: (movie: Movie) => void;
}

const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const setWatchlist = useMovieStore((state) => state.setWatchlist);
  const watchlist = useMovieStore((state) => state.watchlist);

  const isWatchlistPage = location.pathname.startsWith("/watchlist");

  const handleClick = () => {
    navigate(`/watch/${movie.id}`);
  };

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (watchlist.find((m: any) => m.id === movie.id)) return;
    setWatchlist([...watchlist, movie]);
  };

  const handleRemoveFromWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWatchlist(watchlist.filter((m) => m.id !== movie.id));
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="w-60 bg-zinc-900 rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={handleClick}
          >
            <div className="relative">
              {movie.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-50 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-50 bg-zinc-800 flex items-center justify-center rounded-t-lg">
                  <span className="text-zinc-500 text-sm">No Image</span>
                </div>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  {isWatchlistPage ? (
                    <button
                      onClick={handleRemoveFromWatchlist}
                      className="absolute bottom-2 right-2 bg-red-700 hover:bg-red-800 text-white rounded-full p-1.5 flex items-center justify-center active:scale-90 transition-transform duration-150"
                      aria-label={`Remove ${movie.title} from watchlist`}
                      type="button"
                    >
                      <FaMinus size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToWatchlist}
                      className="absolute bottom-2 right-2 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 flex items-center justify-center active:scale-90 transition-transform duration-150"
                      aria-label={`Add ${movie.title} to watchlist`}
                      type="button"
                    >
                      <FaPlus size={14} />
                    </button>
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {isWatchlistPage
                    ? "Remove from watchlist"
                    : "Add to watchlist"}
                </TooltipContent>
              </Tooltip>

              {movie.release_date && (
                <div className="absolute bottom-0 left-0 w-full bg-black/70 text-zinc-200 text-xs text-center py-1 rounded-b-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {new Date(movie.release_date).getFullYear()}
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={-150}>
          Click to watch {movie.title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MovieCard;
