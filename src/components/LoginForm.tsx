import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/auth/firebase";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const primaryColorClasses = isSignup
    ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
    : "bg-red-600 hover:bg-red-700 focus:ring-red-500";

  const inputFocusRing = isSignup
    ? "focus:ring-blue-500"
    : "focus:ring-red-500";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Signed up:", userCredential.user);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Sign up error:", error);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Signed in:", userCredential.user);
          setIsLoggedIn(true);
          navigate("/browse");
        })
        .catch((error) => {
          console.error("Sign in error:", error);
        });
    }
  };

  return (
    <div className="w-4/12 max-w-md backdrop-blur-md bg-black/50 shadow-2xl bg-gradient-to-b from-black to-zinc-900 p-4 rounded-lg">
      <Card className="w-full bg-transparent border-none">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-extrabold text-white">
            {isSignup ? "Create Account" : "Sign In"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <Label className="text-zinc-300 text-base font-semibold mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`bg-zinc-900/70 text-white outline-none rounded-md px-4 py-3 placeholder-opacity-60 focus:outline-none focus:ring-2 ${inputFocusRing} shadow-sm`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label className="text-zinc-300 text-base font-semibold mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`bg-zinc-900/70 text-white outline-none rounded-md px-4 py-3 placeholder-opacity-60 focus:outline-none focus:ring-2 ${inputFocusRing} shadow-sm`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className={`w-full mt-4 text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-300 ${primaryColorClasses}`}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>

            <p className="text-sm text-center mt-6 text-zinc-400">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                onClick={() => setIsSignup(!isSignup)}
                className={`font-bold transition-colors duration-200 cursor-pointer ${
                  isSignup
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-red-400 hover:text-red-300"
                }`}
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
