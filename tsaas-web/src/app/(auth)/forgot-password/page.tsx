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
  const { register, handleSubmit } = useForm();
  const { t } = useLanguage();
  const { sendPasswordResetEmail } = useAuth();

  const onSubmit = async (data: any) => {
    setError("");
    try {
      await sendPasswordResetEmail(data.email);
      setIsSubmitted(true);
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError(t("auth.forgotPassword.errors.notFound"));
      } else {
        setError(t("auth.forgotPassword.errors.generic"));
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
        <h2 className="text-3xl font-bold text-primary">Recuperar senha</h2>
        <p className="mt-2 text-gray-500">Informe seu e-mail para receber o link de redefinição de senha.</p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              {...register("email")}
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-600 transition-colors"
          >
            Enviar e-mail
          </button>

          <p className="text-center text-sm text-gray-500">
            <Link href="/login" className="text-gold-600 hover:text-gold-500 transition-colors">
              Voltar para o login
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
          <h3 className="text-xl font-semibold text-gold-600">E-mail enviado!</h3>
          <p className="text-gray-500">
            Enviamos um link para redefinir sua senha. Verifique sua caixa de entrada.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block text-gold-600 hover:text-gold-500 transition-colors"
          >
            Voltar para o login
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
} 