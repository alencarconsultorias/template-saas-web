"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoLogin from "@/images/logo_login.svg";

export default function LoginPage() {
  const { t } = useLanguage();
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (error: any) {
      setError(
        error.code === "auth/invalid-credential"
          ? t("auth.errors.invalidCredentials")
          : t("auth.errors.generic")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-4">
        <div className="bg-black rounded-2xl shadow-xl p-8 border border-gray-800">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <LogoLogin className="w-64 h-20" />
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-100 mb-2">
            {t("auth.login.title")}
          </h2>
          <p className="text-gray-400 text-center mb-8">
            {t("auth.login.subtitle")}
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t("auth.login.email")}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-600 transition-colors"
                placeholder={t("auth.login.emailPlaceholder")}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t("auth.login.password")}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-600 transition-colors"
                placeholder={t("auth.login.passwordPlaceholder")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-gold-600 focus:ring-gold-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  {t("auth.login.rememberMe")}
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-gold-600 hover:text-gold-500 transition-colors"
              >
                {t("auth.login.forgotPassword")}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-gold-600 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {t("auth.login.submit")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {t("auth.login.noAccount")}{" "}
              <Link
                href="/register"
                className="text-gold-600 hover:text-gold-500 font-medium transition-colors"
              >
                {t("auth.login.registerLink")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 