import { IMAGE_BASE_URL } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  overview?: string;
}

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${movie.id}`);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="w-60 bg-zinc-900 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 cursor-pointer"
            onClick={handleClick}
          >
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-50 object-cover"
              />
            ) : (
              <div className="w-full h-50 bg-zinc-800 flex items-center justify-center">
                <span className="text-zinc-500 text-sm">No Image</span>
              </div>
            )}

            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
              {movie.release_date && (
                <p className="text-sm text-zinc-400 mb-2">
                  {movie.release_date}
                </p>
              )}
              {movie.overview && (
                <p className="text-sm text-zinc-300 line-clamp-3">
                  {movie.overview}
                </p>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={-150} className="bg-black/80">
          <div className="flex h-full w-52">
            <p className="text-center text-white px-2">
              Click to watch {movie.title}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MovieCard;
