import { API_OPTIONS } from "@/services/tmdbService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TMDB_VIDEOS_PATH, YOUTUBE_EMBED_BASE } from "@/utils/constants";

const Watch = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [trailer, setTrailer] = useState<any>(null);

  useEffect(() => {
    if (!movieId) return;

    fetch(TMDB_VIDEOS_PATH(movieId), API_OPTIONS)
      .then((res) => res.json())
      .then((data) => {
        const trailers = data.results.filter(
          (video: any) => video.site === "YouTube" && video.type === "Trailer"
        );
        setTrailer(trailers[0]);
      })
      .catch((err) => console.error("Failed to fetch movie videos:", err));
  }, [movieId]);

  if (!trailer) {
    return <div>Loading trailer...</div>;
  }

  const youtubeUrl = `${YOUTUBE_EMBED_BASE}/${trailer.key}?autoplay=1&mute=1`;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <iframe
        title="Movie Trailer"
        className="w-full h-full"
        src={youtubeUrl}
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </div>
  );
};

export default Watch;
