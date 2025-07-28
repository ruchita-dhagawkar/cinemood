import { signOut } from "firebase/auth";
import { useInRouterContext, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth/firebase";
import { useAuthStore } from "@/store/authStore";
import { useMovieStore } from "@/store/movieStore";

const Header = () => {
  const inRouter = useInRouterContext();
  const navigate = useNavigate();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const watchlist = useMovieStore((state) => state.watchlist);
  const clearWatchlist = useMovieStore((state) => state.clearWatchlist);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  console.log(watchlist);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      if (inRouter) {
        navigate("/");
      }
    });
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-gradient-to-b from-black/80 to-zinc-900/90 z-10 flex items-center justify-between px-6 py-4">
      <div className="text-left">
        <h1 className="text-3xl font-serif tracking-wide text-white">
          🎬 CineMood
        </h1>
        <p className="text-zinc-300 text-sm italic">
          Let your mood pick the movie.
        </p>
      </div>
      {isLoggedIn && (
        <div className="flex gap-4">
          <Button
            onClick={() => {
              navigate("/watchlist");
            }}
            className="bg-zinc-800"
          >
            Watchlist
            <span className="ml-2 text-sm">({watchlist.length})</span>
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              clearWatchlist();
              console.log("Cleared watchlist");
            }}
          >
            Clear
          </Button>
          <Button
            variant="destructive"
            onClick={handleSignOut}
            className="bg-red-600"
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
