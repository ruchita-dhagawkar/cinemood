import MovieCard from "./MovieCard";

export function MovieSection({
  title,
  movies,
}: {
  title: string;
  movies: any[];
}) {
  if (!movies.length) return null;
  return (
    <section aria-label={title} className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
