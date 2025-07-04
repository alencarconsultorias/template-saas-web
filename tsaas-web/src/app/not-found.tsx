"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          className="flex justify-center mb-6"
          initial={{ rotate: -8 }}
          animate={{ rotate: [ -8, 8, -8 ] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <svg className="w-24 h-24 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" strokeWidth="4" className="text-gold-300 dark:text-gold-700" />
            <motion.ellipse
              cx="16"
              cy="20"
              rx="2"
              ry="2.5"
              fill="currentColor"
              className="text-gold-500"
              animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.2 }}
            />
            <motion.ellipse
              cx="32"
              cy="20"
              rx="2"
              ry="2.5"
              fill="currentColor"
              className="text-gold-500"
              animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.2 }}
            />
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M16 32c2.667-2 10.667-2 13.334 0"
              stroke="currentColor"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.5 }}
            />
          </svg>
        </motion.div>
        <motion.h1
          className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          404
        </motion.h1>
        <motion.h2
          className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Página não encontrada
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          A página que você está procurando não existe ou foi movida.<br />
          Verifique o endereço ou volte para o início.
        </motion.p>
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.07, backgroundColor: '#eab308', boxShadow: '0 4px 24px #eab30844' }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-lg bg-gold-500 text-white font-semibold shadow hover:bg-gold-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
          >
            Voltar para o Dashboard
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
} 