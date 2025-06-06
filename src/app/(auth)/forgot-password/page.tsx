"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    setIsSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md space-y-8 bg-secondary p-8 rounded-xl shadow-xl"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary">Reset Password</h2>
        <p className="mt-2 text-gray-400">
          Enter your email address and we'll send you instructions to reset your password
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-secondary-light border border-gray-600 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-secondary bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Send Reset Instructions
          </button>

          <p className="text-center text-sm text-gray-400">
            Remember your password?{" "}
            <Link href="/login" className="text-primary hover:text-primary-light transition-colors">
              Sign in
            </Link>
          </p>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary"
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
          <h3 className="text-xl font-semibold text-gray-300">Check your email</h3>
          <p className="text-gray-400">
            We've sent password reset instructions to your email address.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block text-primary hover:text-primary-light transition-colors"
          >
            Back to Sign in
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
} 