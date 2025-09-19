"use client";

import { motion } from "framer-motion";
import { CodeIcon } from "@heroicons/react/outline";

export default function DevBanner() {
  // Only show in development environment
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-lg shadow-sm border border-orange-400/30"
    >
      <CodeIcon className="h-4 w-4 flex-shrink-0" />
      <span className="hidden sm:inline">DEV</span>
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
    </motion.div>
  );
}
