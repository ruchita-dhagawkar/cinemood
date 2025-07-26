import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative bg-black text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-50 z-0"
        style={{ backgroundImage: "url('/login-bg.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-zinc-900/90 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-md">
        {/* Logo + Tagline */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-serif tracking-wide text-white">
            🎬 CineMood
          </h1>
          <p className="text-zinc-300 text-sm italic">
            Let your mood pick the movie.
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  );
}
