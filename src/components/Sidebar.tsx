"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar } from "@/contexts/SidebarContext";
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
  const { isCollapsed, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gold-500 dark:hover:text-gold-500 focus:outline-none shadow-lg border border-gray-200 dark:border-gray-700"
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
        animate={{ 
          x: isSidebarOpen ? 0 : -300,
          width: isCollapsed ? 64 : 256
        }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-0 left-0 z-40 bg-white dark:bg-gray-900 transform lg:translate-x-0 lg:static lg:inset-0 ${
          isCollapsed ? 'w-16' : 'w-64'
        } h-[calc(100vh-2rem)] mt-4 mb-2 lg:mt-2 lg:mb-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700`}
      >
        <div className="flex flex-col h-full max-h-full">
          {/* Header - Altura fixa */}
          <div className="flex items-center justify-center h-14 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 rounded-t-lg">
            {!isCollapsed && (
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold text-gray-900 dark:text-gold-500"
              >
                SaaS Platform
              </motion.h1>
            )}
            {isCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center"
              >
                <span className="text-white font-bold text-xs">S</span>
              </motion.div>
            )}
          </div>

          {/* Navigation - Altura flexível com scroll */}
          <nav className="flex-1 px-3 py-3 overflow-y-auto min-h-0">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors relative ${
                      isActive
                        ? "text-gold-600 dark:text-gold-500 bg-gold-50 dark:bg-gold-500/10"
                        : "text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-500/5"
                    }`}
                    title={isCollapsed ? t(item.name) : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gold-50 dark:bg-gold-500/10 rounded-md"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <item.icon
                      className={`h-4 w-4 transition-colors flex-shrink-0 ${
                        isActive ? "text-gold-600 dark:text-gold-500" : "text-gray-500 dark:text-gray-400 group-hover:text-gold-600 dark:group-hover:text-gold-500"
                      } ${!isCollapsed ? "mr-3" : ""}`}
                    />
                    {!isCollapsed && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative truncate text-sm"
                      >
                        {t(item.name)}
                      </motion.span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User profile section - Altura fixa */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 rounded-b-lg">
            {!isCollapsed ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <div className="w-7 h-7 rounded-full bg-gold-100 dark:bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                  <UserGroupIcon className="w-3 h-3 text-gold-600 dark:text-gold-500" />
                </div>
                <div className="ml-3 min-w-0">
                  <p className="text-xs font-medium text-gray-900 dark:text-gray-300 truncate">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 truncate">Administrator</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <div className="w-7 h-7 rounded-full bg-gold-100 dark:bg-gold-500/20 flex items-center justify-center">
                  <UserGroupIcon className="w-3 h-3 text-gold-600 dark:text-gold-500" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile overlay */}
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