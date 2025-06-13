"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode redirecionar ou filtrar resultados
    // Exemplo: router.push(`/search?q=${search}`)
  };

  const handleLogout = () => {
    // Aqui você implementaria a lógica de logout
    // Por exemplo, limpar o token de autenticação, cookies, etc.
    console.log("Logout realizado");
    router.push("/login"); // Redireciona para a página de login
  };

  return (
    <header className="w-full bg-black shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo ou nome do sistema */}
      <div className="text-xl font-bold text-gold-600">{t("app.name")}</div>

      {/* Barra de pesquisa */}
      <form onSubmit={handleSearch} className="flex-1 flex justify-center mx-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t("search.placeholder")}
          className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:border-gold-600"
        />
      </form>

      {/* Botões à direita */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/support">
          <button className="bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors">
            {t("header.faq")}
          </button>
        </Link>
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="bg-gray-800 text-gold-600 px-4 py-2 rounded-lg hover:bg-gold-600 hover:text-white transition-colors"
          >
            {t("header.profile")}
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2 z-10">
              <Link 
                href="/settings"
                className="block px-4 py-2 text-gray-300 hover:bg-gold-600 hover:text-white transition-colors"
              >
                {t("header.settings")}
              </Link>
              <Link 
                href="/dashboard/profile"
                className="block px-4 py-2 text-gray-300 hover:bg-gold-600 hover:text-white transition-colors"
              >
                {t("header.myProfile")}
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gold-600 hover:text-white transition-colors"
              >
                {t("header.logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 