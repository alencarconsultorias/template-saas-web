"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // Aqui você adicionaria a lógica de autenticação
    // Por enquanto, vamos apenas redirecionar para o dashboard
    router.push("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-secondary p-8 rounded-xl shadow-xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
        <p className="mt-2 text-gray-400">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-secondary-light border border-gray-600 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-secondary-light border border-gray-600 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 bg-secondary-light border-gray-600 rounded focus:ring-primary"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:text-primary-light transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-secondary bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          Sign in
        </button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:text-primary-light transition-colors">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
} 