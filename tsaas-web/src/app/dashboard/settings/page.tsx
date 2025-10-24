"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { StorageService } from "@/services/storageService";
import { updateFavicon } from "@/components/FaviconManager";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Carregar favicon do localStorage após hidratação
  useEffect(() => {
    const savedFavicon = localStorage.getItem('app_favicon_url');
    if (savedFavicon) {
      setFaviconUrl(savedFavicon);
    }
  }, []);

  const handleSelectFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      setUploadError(null);
      
      const result = await StorageService.uploadFavicon(file);
      setFaviconUrl(result.url);
      updateFavicon(result.url);
      
      console.log('Favicon uploaded successfully:', result.url);
    } catch (err: any) {
      console.error('Error uploading favicon:', err);
      setUploadError(err?.message || 'Falha ao enviar favicon');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, []);

  const handleRemoveFavicon = useCallback(() => {
    setFaviconUrl(null);
    updateFavicon(null);
  }, []);

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
        {/* Favicon Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Favicon
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Envie um arquivo PNG ou SVG para personalizar o ícone do site.
          </p>

          {uploadError && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-red-600 dark:text-red-400 text-sm">{uploadError}</p>
            </div>
          )}

          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
              {faviconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={faviconUrl} alt="favicon" className="w-full h-full object-contain" />
              ) : (
                <span className="text-xs text-gray-500">Sem ícone</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectFile}
                disabled={isUploading}
                className="px-4 py-2 rounded-md bg-gold-500 text-white hover:bg-gold-600 disabled:opacity-60"
              >
                {isUploading ? 'Enviando...' : 'Enviar favicon'}
              </button>
              {faviconUrl && (
                <button
                  onClick={handleRemoveFavicon}
                  disabled={isUploading}
                  className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-60"
                >
                  Remover
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/svg+xml"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t("settings.theme.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Escolha entre o tema claro ou escuro para personalizar sua experiência
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* System Theme Option */}
            <button
              onClick={() => setTheme('system')}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === 'system'
                  ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gold-300 dark:hover:border-gold-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">
                    Sistema
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Seguir configurações do dispositivo
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
            <button
              onClick={() => setLanguage("en")}
              className={`p-4 rounded-lg border-2 ${language === "en" ? "border-gold-500" : "border-gray-200 dark:border-gray-600"} hover:border-gold-300 dark:hover:border-gold-600 transition-all`}
            >
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

            <button
              onClick={() => setLanguage("pt-BR")}
              className={`p-4 rounded-lg border-2 ${language === "pt-BR" ? "border-gold-500" : "border-gray-200 dark:border-gray-600"} hover:border-gold-300 dark:hover:border-gold-600 transition-all`}
            >
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