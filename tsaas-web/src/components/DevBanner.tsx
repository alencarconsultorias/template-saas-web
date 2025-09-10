"use client";

import { motion } from "framer-motion";
import { ExclamationIcon, CodeIcon } from "@heroicons/react/outline";

export default function DevBanner() {
  // Only show in development environment
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-20 right-4 z-40 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white shadow-2xl rounded-lg border border-orange-400/30"
    >
      <div className="px-4 py-3 space-y-2">
        {/* Header */}
        <div className="flex items-center justify-center">
          <CodeIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="text-sm font-bold tracking-wide">
            DESENVOLVIMENTO
          </span>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-mono bg-white/20 px-2 py-1 rounded">
            DEV MODE
          </span>
        </div>
        
        {/* Warning */}
        <div className="flex items-center justify-center text-xs opacity-90">
          <ExclamationIcon className="h-3 w-3 mr-1" />
          <span>Ambiente de Teste</span>
        </div>
      </div>
      
      {/* Decorative border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
    </motion.div>
  );
}
