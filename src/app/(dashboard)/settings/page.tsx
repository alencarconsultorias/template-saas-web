"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t("settings.title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      <div className="grid gap-6">
        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t("settings.theme.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Escolha entre o tema claro ou escuro para personalizar sua experiência
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Light Theme Option */}
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === 'light'
                  ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gold-300 dark:hover:border-gold-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {t("settings.theme.light")}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Tema claro para ambientes bem iluminados
                  </div>
                </div>
              </div>
            </button>

            {/* Dark Theme Option */}
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === 'dark'
                  ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gold-300 dark:hover:border-gold-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {t("settings.theme.dark")}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Tema escuro para reduzir o cansaço visual
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t("settings.language.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Escolha o idioma de sua preferência
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-gold-300 dark:hover:border-gold-600 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  EN
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {t("settings.language.en")}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    English
                  </div>
                </div>
              </div>
            </button>

            <button className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-gold-300 dark:hover:border-gold-600 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                  PT
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {t("settings.language.ptBR")}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Português (Brasil)
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t("settings.notifications.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Configure suas preferências de notificações
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {t("settings.notifications.email")}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Receber notificações por e-mail
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {t("settings.notifications.push")}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Notificações push no navegador
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {t("settings.notifications.updates")}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Atualizações do sistema
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gold-500 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 