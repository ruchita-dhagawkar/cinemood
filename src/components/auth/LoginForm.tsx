import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/auth/firebase";

const LoginForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Signed up:", userCredential.user);
        })
        .catch((error) => {
          console.error("Sign up error:", error);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Signed in:", userCredential.user);
        })
        .catch((error) => {
          console.error("Sign in error:", error);
        });
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-zinc-900 text-white px-4">
      <Card className="w-full max-w-md bg-zinc-950 border-zinc-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-white">
            {isSignup ? "Sign Up" : "Sign In"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              {isSignup ? "Create Account" : "Sign In"}
            </Button>

            <p className="text-sm text-center mt-2 text-zinc-400">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </form>
          <Button
            type="button"
            variant="secondary"
            onClick={handleSignOut}
            className="w-full mt-2"
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
