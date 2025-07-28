import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen relative bg-black text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-50 z-0"
        style={{ backgroundImage: "url('/login-bg.jpg')" }}
      />

      {/* Login Form */}
      <LoginForm />
    </div>
  );
}
