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
          navigate("/browse"); // Redirect to browse page after sign in
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
          <CardTitle className="text-center text-3xl font-bold text-white">
            {isSignup ? "Create Account" : "Sign In"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-zinc-300 text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-zinc-900/60 text-white border-zinc-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label className="text-zinc-300 text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-zinc-900/60 text-white border-zinc-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-4 bg-red-600">
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>

            <p className="text-sm text-center mt-4 text-zinc-400">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-400 hover:underline cursor-pointer"
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
