import { create } from "zustand";

interface MovieState {
  watchlist: any[];
  setWatchlist: (movies: any[]) => void;
  clearWatchlist: () => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  watchlist: [],
  setWatchlist: (movies) => set({ watchlist: movies }),
  clearWatchlist: () => set({ watchlist: [] }),
}));
