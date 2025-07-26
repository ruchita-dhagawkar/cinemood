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

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-60">
      {movie.poster_path ? (
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-80 object-cover"
        />
      ) : (
        <div className="w-full h-80 bg-zinc-800 flex items-center justify-center">
          <span className="text-zinc-500 text-sm">No Image</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
        {movie.release_date && (
          <p className="text-sm text-zinc-400 mb-2">{movie.release_date}</p>
        )}
        {movie.overview && (
          <p className="text-sm text-zinc-300 line-clamp-3">{movie.overview}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
