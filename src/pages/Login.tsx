import LoginForm from "@/components/LoginForm";
import { LOGIN_IMAGE_URL } from "@/utils/constants";

export default function Login() {
  return (
    <div className=" bg-black text-white flex items-center justify-center min-h-screen">
      <img
        src={LOGIN_IMAGE_URL}
        alt="Background"
        className="absolute w-full h-full object-cover opacity-30"
      />
      <LoginForm />
    </div>
  );
}
