"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useCompany } from "@/contexts/CompanyContext";
import Image from "next/image";
import { MenuIcon } from "@heroicons/react/outline";
import DevBanner from "./DevBanner";

export default function Header() {
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useLanguage();
  const { logout } = useAuth();
  const { toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const { companyLogo, logoError } = useCompany();

  // Atualizar logo quando mudar no contexto
  useEffect(() => {
    console.log('🎨 Header: Logo atualizado no contexto:', companyLogo);
    if (companyLogo) {
      console.log('✅ Header: Aplicando novo logo:', companyLogo);
      setCurrentLogo(companyLogo);
    } else {
      console.log('❌ Header: Logo é null, mantendo texto padrão');
    }
  }, [companyLogo]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode redirecionar ou filtrar resultados
    // Exemplo: router.push(`/search?q=${search}`)
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileMenu(false);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md px-6 py-3 flex items-center justify-between h-16 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
      {/* Left section with sidebar toggle and logo */}
      <div className="flex items-center gap-4">
        {/* Sidebar toggle button (desktop only) */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:block p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gold-500 dark:hover:text-gold-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        
        {/* Logo ou nome do sistema */}
        <div className="flex items-center">
          {currentLogo && !logoError ? (
            <div className="relative w-32 h-8 mr-2">
              <Image
                src={currentLogo}
                alt="Company Logo"
                fill
                className="object-contain"
                onError={() => {
                  console.log("Erro ao carregar logotipo");
                  setCurrentLogo(null);
                }}
                key={currentLogo}
              />
            </div>
          ) : (
            <div className="text-xl font-bold text-gray-900 dark:text-gold-600">{t("app.name")}</div>
          )}
        </div>
      </div>

      {/* Barra de pesquisa */}
      <form onSubmit={handleSearch} className="flex-1 flex justify-center mx-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t("search.placeholder")}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-gold-500 dark:focus:border-gold-500 focus:ring-1 focus:ring-gold-500 dark:focus:ring-gold-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>

      {/* Botões à direita */}
      <div className="flex items-center gap-4">
        {/* Dev Banner */}
        <DevBanner />
        
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === 'dark' ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gold-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 z-10 border border-gray-200 dark:border-gray-700">
              <Link 
                href="/dashboard/profile"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gold-50 dark:hover:bg-gold-600 hover:text-gold-700 dark:hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {t("header.myProfile")}
              </Link>
              <Link 
                href="/dashboard/company-settings"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gold-50 dark:hover:bg-gold-600 hover:text-gold-700 dark:hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Minha Empresa
              </Link>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <Link 
                href="/dashboard/billing"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gold-50 dark:hover:bg-gold-600 hover:text-gold-700 dark:hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                {t("common.billing")}
              </Link>
              <Link 
                href="/dashboard/support"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gold-50 dark:hover:bg-gold-600 hover:text-gold-700 dark:hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {t("common.support")}
              </Link>
              <Link 
                href="/dashboard/sessions"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gold-50 dark:hover:bg-gold-600 hover:text-gold-700 dark:hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {t("header.sessions")}
              </Link>
              <Link 
                href="/dashboard/settings"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gold-50 dark:hover:bg-gold-600 hover:text-gold-700 dark:hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {t("common.settings")}
              </Link>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gold-50 dark:hover:bg-gold-600 hover:text-gold-700 dark:hover:text-white transition-colors"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                {t("header.logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}