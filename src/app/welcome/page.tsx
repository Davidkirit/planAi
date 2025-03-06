"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Welcome() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // For registration, ensure passwords match
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      let response;
      if (isLogin) {
        // Sign in: send only email and password
        response = await axios.post("http://localhost:5000/login", {
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Sign up: send username, email, and password
        response = await axios.post("http://localhost:5000/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      }

      // Assuming a successful response contains a username field
      // For sign in, you may get the username from the response
      const usernameFromResponse = isLogin
        ? response.data.username
        : formData.username;
      localStorage.setItem("username", usernameFromResponse);
      localStorage.setItem("isLogin", "true");
      router.push("/workspace");
    } catch (error: any) {
      // Display error message from backend if available
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-700">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg w-96 border border-white border-opacity-20">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Render username input only for sign up */}
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 border rounded bg-transparent text-black placeholder-gray-300"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded bg-transparent text-black placeholder-gray-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border rounded bg-transparent text-black placeholder-gray-300"
            required
          />
          {/* Render confirm password input only for sign up */}
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="p-2 border rounded bg-transparent text-black placeholder-gray-300"
              required
            />
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-black">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-300 hover:underline ml-1"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
