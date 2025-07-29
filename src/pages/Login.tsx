import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className=" bg-black text-white flex items-center justify-center min-h-screen">
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/GB-en-20250721-TRIFECTA-perspective_e46accef-a86c-4530-a3c6-0bd0f45dc7d2_large.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover opacity-30"
      />
      <LoginForm />
    </div>
  );
}
