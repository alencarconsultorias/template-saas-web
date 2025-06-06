"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  DocumentReportIcon,
  CogIcon,
  MenuIcon,
  XIcon,
  UserGroupIcon,
  CreditCardIcon,
  SupportIcon,
} from "@heroicons/react/outline";

const navigation = [
  { name: "common.dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "common.projects", href: "/projects", icon: FolderIcon },
  { name: "common.analytics", href: "/analytics", icon: ChartBarIcon },
  { name: "common.reports", href: "/reports", icon: DocumentReportIcon },
  { name: "common.team", href: "/team", icon: UserGroupIcon },
  { name: "common.billing", href: "/billing", icon: CreditCardIcon },
  { name: "common.support", href: "/support", icon: SupportIcon },
  { name: "common.settings", href: "/settings", icon: CogIcon },
];

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-black text-gray-400 hover:text-gold-500 focus:outline-none"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-black transform lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-black border-b border-gray-800">
            <h1 className="text-2xl font-bold text-gold-500">SaaS Platform</h1>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors relative ${
                    isActive
                      ? "text-gold-500 bg-gold-500/10"
                      : "text-gray-300 hover:text-gold-500 hover:bg-gold-500/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gold-500/10 rounded-md"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors ${
                      isActive ? "text-gold-500" : "text-gray-400 group-hover:text-gold-500"
                    }`}
                  />
                  <span className="relative">{t(item.name)}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center">
                <UserGroupIcon className="w-4 h-4 text-gold-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-300">John Doe</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overlay */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
} 