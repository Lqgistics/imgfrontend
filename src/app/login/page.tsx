"use client";

import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://api.dbrad.engineer/auth/login",
        { email, password }
      );

      console.log("Login successful");
      const { token, user } = response.data;
      console.log(token);
      Cookies.set("token", token, {});
      Cookies.set("user", JSON.stringify(user), { expires: 1 });

      router.push("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        setError(
          error.response?.data?.message || "Email or password is incorrect"
        );
      } else {
        // Handle other errors
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-[#09090b]">
      <Card className="mx-auto w-[28%] min-w-[350px] bg-[#18181b]/70 text-white border-white/10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription>Enter your login details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <Label className="text-md" htmlFor="email">
                Email
              </Label>
              <Input
                className="h-[50px] rounded-xl text-md bg-black/10 text-white border-white/10 "
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-3">
              <Label className="text-md" htmlFor="password">
                Password
              </Label>
              <Input
                className="h-[50px] rounded-xl text-md bg-black/10 text-white border-white/10"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <Button
              type="submit"
              className="w-full h-[50px] rounded-xl bg-[#262626]/60 hover:bg-[#0e1f19] text-white"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
