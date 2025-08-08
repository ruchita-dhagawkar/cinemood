// src/components/__tests__/MovieCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "../MovieCard";
import { vi } from "vitest";

const sampleMovie = {
  id: 123,
  title: "Inception",
  poster_path: "/poster.jpg",
  release_date: "2010-07-16",
};

const mockSetWatchlist = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: "/browse" }), // default not watchlist page
}));

vi.mock("@/store/movieStore", () => ({
  useMovieStore: (selector: any) =>
    selector({
      watchlist: [],
      setWatchlist: mockSetWatchlist,
    }),
}));

describe("MovieCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("renders movie title and poster image", async () => {
    render(<MovieCard movie={sampleMovie} />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByAltText("Inception")).toHaveAttribute(
      "src",
      expect.stringContaining(sampleMovie.poster_path)
    );
  });

  it("shows release year if release_date is provided", () => {
    render(<MovieCard movie={sampleMovie} />);
    expect(screen.getByText("2010")).toBeInTheDocument();
  });

  it("shows fallback if poster_path is null", () => {
    const movie = { ...sampleMovie, poster_path: null };
    render(<MovieCard movie={movie} />);
    expect(screen.getByText(/No Image/i)).toBeInTheDocument();
  });

  it("navigates to movie details on card click", () => {
    render(<MovieCard movie={sampleMovie} />);
    fireEvent.click(screen.getByText("Inception").closest("div")!);
    expect(mockNavigate).toHaveBeenCalledWith("/watch/123");
  });

  it("adds movie to watchlist if not already present", () => {
    render(<MovieCard movie={sampleMovie} />);
    const addButton = screen.getByRole("button", {
      name: `Add ${sampleMovie.title} to watchlist`,
    });
    fireEvent.click(addButton);
    expect(mockSetWatchlist).toHaveBeenCalledWith([sampleMovie]);
  });

  it("does not add movie again if already in watchlist", async () => {
    vi.doMock("@/store/movieStore", () => ({
      useMovieStore: (selector: any) =>
        selector({
          watchlist: [sampleMovie],
          setWatchlist: mockSetWatchlist,
        }),
    }));
    // re-import after mocking
    const { default: MovieCard } = await import("../MovieCard");
    render(<MovieCard movie={sampleMovie} />);
    const addButton = screen.getByRole("button", {
      name: `Add ${sampleMovie.title} to watchlist`,
    });
    fireEvent.click(addButton);
    expect(mockSetWatchlist).not.toHaveBeenCalled();
  });

  it("shows remove button on watchlist page and removes on click", async () => {
    vi.doMock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
      useLocation: () => ({ pathname: "/watchlist" }),
    }));
    vi.doMock("@/store/movieStore", () => ({
      useMovieStore: (selector: any) =>
        selector({
          watchlist: [sampleMovie],
          setWatchlist: mockSetWatchlist,
        }),
    }));
    // re-import after mocking
    const { default: MovieCard } = await import("../MovieCard");
    render(<MovieCard movie={sampleMovie} />);
    const removeButton = screen.getByRole("button", {
      name: `Remove ${sampleMovie.title} from watchlist`,
    });
    fireEvent.click(removeButton);
    expect(mockSetWatchlist).toHaveBeenCalledWith([]);
  });
});
