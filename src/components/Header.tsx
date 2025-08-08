import { signOut } from "firebase/auth";
import { useInRouterContext, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth/firebase";
import { useAuthStore } from "@/store/authStore";
import { useMovieStore } from "@/store/movieStore";
import { FaBookmark, FaHome } from "react-icons/fa";

const Header = () => {
  const inRouter = useInRouterContext();
  const navigate = useNavigate();
  const location = useLocation();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const watchlist = useMovieStore((state) => state.watchlist);

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
    <div className="h-[70px] w-full px-4 flex items-center absolute bg-gradient-to-b from-black to-transparent z-10 justify-between">
      <div className="text-left">
        <h1 className="text-3xl font-serif tracking-wide text-white">
          🎬 CineMood
        </h1>
        <p className="text-zinc-300 text-sm italic">
          Let your mood pick the movie.
        </p>
      </div>
      {isLoggedIn && location.pathname !== "/" && (
        <div className="flex gap-4 items-center">
          {(location.pathname === "/watchlist" ||
            location.pathname.startsWith("/watch")) && (
            <div
              className="relative group cursor-pointer"
              onClick={() => navigate("/browse")}
            >
              <FaHome className="text-white text-2xl" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                Back to Browse
              </span>
            </div>
          )}

          {location.pathname !== "/watchlist" && (
            <div
              className="relative group cursor-pointer"
              onClick={() => navigate("/watchlist")}
            >
              <FaBookmark className="text-white text-2xl" />
              {watchlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                  {watchlist.length}
                </span>
              )}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                Go to Watchlist
              </span>
            </div>
          )}

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
