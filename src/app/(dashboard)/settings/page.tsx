"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function SettingsPage() {
  const { t, setLanguage, language } = useLanguage();
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "email-updates",
      title: "Email Updates",
      description: "Receive project updates via email",
      enabled: true,
    },
    {
      id: "push-notifications",
      title: "Push Notifications",
      description: "Get instant notifications in your browser",
      enabled: false,
    },
    {
      id: "weekly-digest",
      title: "Weekly Digest",
      description: "Get a summary of your weekly activity",
      enabled: true,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">{t("settings.title")}</h1>

      <div className="space-y-6">
        {/* Language Settings */}
        <div className="bg-black rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">{t("settings.language.title")}</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                language === "en"
                  ? "bg-gold-600 text-white"
                  : "bg-gray-900 text-gray-300 hover:bg-gold-500/5"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("pt-BR")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                language === "pt-BR"
                  ? "bg-gold-600 text-white"
                  : "bg-gray-900 text-gray-300 hover:bg-gold-500/5"
              }`}
            >
              Português
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-black rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">
            {t("settings.notifications.title")}
          </h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-900"
              >
                <div>
                  <h3 className="font-medium text-gray-200">{notification.title}</h3>
                  <p className="text-sm text-gray-400">{notification.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(notification.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notification.enabled ? "bg-gold-600" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notification.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-black rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">{t("settings.account.title")}</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                {t("settings.account.email")}
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-100 focus:outline-none focus:border-gold-600"
                defaultValue="user@example.com"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                {t("settings.account.name")}
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-100 focus:outline-none focus:border-gold-600"
                defaultValue="John Doe"
              />
            </div>
            <button className="w-full bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors">
              {t("settings.account.save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 