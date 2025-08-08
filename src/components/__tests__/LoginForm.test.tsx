import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import LoginForm from "../LoginForm";

// 🔹 Mock Zustand store
const mockSetIsLoggedIn = vi.fn();
vi.mock("@/store/authStore", () => ({
  useAuthStore: (selector: any) =>
    selector({
      setIsLoggedIn: mockSetIsLoggedIn,
    }),
}));

// 🔹 Mock Firebase Auth
const mockSignIn = vi.fn();
const mockSignUp = vi.fn();
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: (...args: any[]) => mockSignIn(...args),
  createUserWithEmailAndPassword: (...args: any[]) => mockSignUp(...args),
}));

// 🔹 Mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("switches to Sign Up mode when link is clicked", () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByText(/Sign Up/i));
    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  it("calls signInWithEmailAndPassword and navigates on Sign In", async () => {
    mockSignIn.mockResolvedValueOnce({ user: { uid: "123" } });
    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        expect.any(Object), // auth
        "test@example.com",
        "password123"
      );
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith("/browse");
    });
  });

  it("calls createUserWithEmailAndPassword on Sign Up", async () => {
    mockSignUp.mockResolvedValueOnce({ user: { uid: "456" } });
    render(<LoginForm />);

    // Switch to Sign Up mode
    fireEvent.click(screen.getByText(/Sign Up/i));

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "newpass123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        expect.any(Object), // auth
        "new@example.com",
        "newpass123"
      );
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
    });
  });
});
