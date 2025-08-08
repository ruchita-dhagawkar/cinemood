import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/Header";
import { vi } from "vitest";

// 🔹 Mock Zustand stores
vi.mock("@/store/authStore", () => ({
  useAuthStore: (selector: any) =>
    selector({
      isLoggedIn: true,
      setIsLoggedIn: vi.fn(),
    }),
}));

vi.mock("@/store/movieStore", () => ({
  useMovieStore: (selector: any) =>
    selector({
      watchlist: [{ id: 1 }, { id: 2 }],
    }),
}));

// 🔹 Mock Firebase Auth
const mockSignOut = vi.fn(() => Promise.resolve());
const mockOnAuthStateChanged = vi.fn();

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({
    onAuthStateChanged: (callback: any) => {
      mockOnAuthStateChanged(callback);
      return () => {};
    },
  })),
  signOut: vi.fn(() => mockSignOut()),
}));

// 🔹 Mock React Router
const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: "/browse" }),
  useInRouterContext: () => true,
}));

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders CineMood title and tagline", () => {
    render(<Header />);
    expect(screen.getByText(/🎬 CineMood/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Let your mood pick the movie/i)
    ).toBeInTheDocument();
  });

  it("shows watchlist count when watchlist has movies", () => {
    render(<Header />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls navigate to watchlist when bookmark icon is clicked", () => {
    render(<Header />);
    // Find the watchlist count badge (e.g., "2") and click its parent container
    const badge = screen.getByText("2");
    const clickableContainer = badge.parentElement;
    expect(clickableContainer).not.toBeNull();
    fireEvent.click(clickableContainer!);
    expect(mockNavigate).toHaveBeenCalledWith("/watchlist");
  });

  it("calls signOut and navigates to home when Sign Out clicked", async () => {
    render(<Header />);
    await fireEvent.click(screen.getByRole("button", { name: /Sign Out/i }));
    expect(mockSignOut).toHaveBeenCalled();
    // Wait for any async navigation after signOut
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("subscribes to auth state changes on mount", () => {
    render(<Header />);
    expect(mockOnAuthStateChanged).toHaveBeenCalled();
  });
});
