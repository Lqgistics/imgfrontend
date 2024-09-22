"use client";

import React, { useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, X } from "lucide-react";

type Requirement = {
  text: string;
  validator: (password: string) => boolean;
};

const requirements: Requirement[] = [
  {
    text: "At least 12 characters long",
    validator: (password) => password.length >= 12,
  },
  {
    text: "Contains a lowercase letter",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    text: "Contains an uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  { text: "Contains a number", validator: (password) => /\d/.test(password) },
  {
    text: "Contains a special character",
    validator: (password) => /[^a-zA-Z0-9]/.test(password),
  },
];

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const errors: { [key: string]: string } = {};

    // Username validation
    if (formData.username.length < 3 || formData.username.length > 30) {
      errors.username = "Username must be between 3 and 30 characters";
      isValid = false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username =
        "Username must contain only alphanumeric characters and underscores";
      isValid = false;
    }

    // Email validation
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    const password = formData.password;
    if (!requirements.every((req) => req.validator(password))) {
      errors.password = "Password does not meet all requirements";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setMessage("");
    setLoading(true);
    setIsSuccess(false);

    if (!validateForm()) {
      setLoading(false);
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.post(
        "https://api.dbrad.engineer/auth/signup",
        formData
      );
      setMessage(response.data.message || "Signup successful!");
      setIsSuccess(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response);
        if (error.response?.data?.errors) {
          // Display field-specific error messages if available
          setErrors(error.response.data.errors);
        } else {
          // Check for specific error messages from backend
          if (
            error.response?.data?.error ===
            "Email address is already registered"
          ) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              email: "Email address is already registered",
            }));
          } else if (
            error.response?.data?.error === "Username is already taken"
          ) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              username: "Username is already taken",
            }));
          } else {
            setMessage(error.response?.data?.message || "An error occurred");
          }
        }
      } else {
        console.error("Unexpected error:", error);
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <Card className="mx-auto w-[28%] min-w-[350px] bg-black/10 text-white border-white/10">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <Label className="text-md" htmlFor="username">
                Username
              </Label>
              <Input
                className="h-[50px] rounded-xl text-md bg-black/20 text-white border-white/10 "
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && (
                <div className="text-red-500">{errors.username}</div>
              )}
            </div>
            <div className="space-y-3">
              <Label className="text-md" htmlFor="email">
                Email
              </Label>
              <Input
                className="h-[50px] rounded-xl text-md bg-black/20 text-white border-white/10 "
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>
            <div className="space-y-3">
              <Label className="text-md" htmlFor="password">
                Password
              </Label>
              <Input
                className="h-[50px] rounded-xl text-md bg-black/20 text-white border-white/10 "
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                required
                aria-describedby="password-requirements"
              />
              {errors.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
              {isPasswordFocused && (
                <div id="password-requirements" className="space-y-2 ">
                  <h3 className="text-sm font-semibold text-card-foreground mb-2">
                    Password must:
                  </h3>
                  <ul className="list-none space-y-1">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-center text-sm">
                        {req.validator(formData.password) ? (
                          <Check
                            className="w-4 h-4 mr-2 text-green-500"
                            aria-hidden="true"
                          />
                        ) : (
                          <X
                            className="w-4 h-4 mr-2 text-destructive "
                            aria-hidden="true"
                          />
                        )}
                        <span
                          className={
                            req.validator(formData.password)
                              ? "text-green-500"
                              : "text-white"
                          }
                        >
                          {req.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-[50px] rounded-xl bg-gray-900 hover:bg-gray-800"
              disabled={loading}
            >
              {loading
                ? "Signing Up..."
                : isSuccess
                ? "Go to dashboard"
                : "Sign Up"}
            </Button>
          </form>
          {message && (
            <Alert className="mt-4">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
