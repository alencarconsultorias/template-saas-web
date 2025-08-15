"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import LogoLogin from "@/images/logo_login.svg";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState<"notFound" | "invalidEmail" | "tooManyRequests" | "generic" | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { t } = useLanguage();
  const { sendPasswordResetEmail } = useAuth();

  const onSubmit = async (data: any) => {
    setError("");
    setErrorType(null);
    
    try {
      await sendPasswordResetEmail(data.email);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Password reset error:", err);
      
      switch (err.code) {
        case "auth/user-not-found":
          setError(t("auth.forgotPassword.errors.notFound"));
          setErrorType("notFound");
          break;
        case "auth/invalid-email":
          setError(t("auth.forgotPassword.errors.invalidEmail"));
          setErrorType("invalidEmail");
          break;
        case "auth/too-many-requests":
          setError(t("auth.forgotPassword.errors.tooManyRequests"));
          setErrorType("tooManyRequests");
          break;
        default:
          setError(t("auth.forgotPassword.errors.generic"));
          setErrorType("generic");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-xl"
    >
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <LogoLogin className="w-64 h-20" />
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary">{t("auth.forgotPassword.title")}</h2>
        <p className="mt-2 text-gray-500">{t("auth.forgotPassword.subtitle")}</p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              {t("auth.login.email")}
            </label>
            <input
              {...register("email", { 
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("auth.forgotPassword.errors.invalidEmail")
                }
              })}
              type="email"
              required
              className={`mt-1 block w-full px-3 py-2 bg-gray-50 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
              }`}
              placeholder={t("auth.login.emailPlaceholder")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message?.toString() || t("auth.forgotPassword.errors.invalidEmail")}
              </p>
            )}
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <div className="text-center mb-3">
                <svg className="w-5 h-5 mx-auto mb-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="font-medium">{error}</p>
              </div>
              
              {errorType === "notFound" && (
                <div className="text-center pt-2 border-t border-red-200">
                  <p className="text-red-600 text-xs mb-2">{t("auth.forgotPassword.noAccount")}</p>
                  <Link 
                    href="/register" 
                    className="inline-flex items-center text-xs text-gold-600 hover:text-gold-700 font-medium transition-colors"
                  >
                    {t("auth.forgotPassword.createAccount")}
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-600 transition-colors"
          >
            {t("auth.forgotPassword.submit")}
          </button>

          <p className="text-center text-sm text-gray-500">
            <Link href="/login" className="text-gold-600 hover:text-gold-500 transition-colors">
              {t("auth.forgotPassword.backToLogin")}
            </Link>
          </p>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="mx-auto w-16 h-16 bg-gold-600/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gold-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gold-600">{t("auth.forgotPassword.successTitle")}</h3>
          <p className="text-gray-500">
            {t("auth.forgotPassword.successMessage")}
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block text-gold-600 hover:text-gold-500 transition-colors"
          >
            {t("auth.forgotPassword.backToLogin")}
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
} 