"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export default function AnalyticsPage() {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");

  const mockData = {
    revenue: [
      { date: "2024-01", value: 50000 },
      { date: "2024-02", value: 65000 },
      { date: "2024-03", value: 75000 },
    ],
    users: [
      { date: "2024-01", value: 1200 },
      { date: "2024-02", value: 1500 },
      { date: "2024-03", value: 1800 },
    ],
    conversion: [
      { date: "2024-01", value: 2.5 },
      { date: "2024-02", value: 2.8 },
      { date: "2024-03", value: 3.2 },
    ],
    engagement: [
      { date: "2024-01", value: 85 },
      { date: "2024-02", value: 87 },
      { date: "2024-03", value: 92 },
    ],
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t("analytics.title")}</h1>
        <div className="flex gap-2">
          {(["daily", "weekly", "monthly", "yearly"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedPeriod === period
                  ? "bg-gold-600 text-white"
                  : "bg-black text-gray-300 hover:bg-gold-500/5"
              }`}
            >
              {t(`analytics.periods.${period}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(mockData).map(([key, data]) => {
          const latestValue = data[data.length - 1].value;
          const previousValue = data[data.length - 2].value;
          const percentageChange = ((latestValue - previousValue) / previousValue) * 100;

          return (
            <div key={key} className="bg-white dark:bg-black rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
              <h3 className="text-gray-600 dark:text-gray-400 mb-2">{t(`analytics.metrics.${key}`)}</h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {key === "conversion" || key === "engagement"
                    ? `${latestValue}%`
                    : key === "revenue"
                    ? `$${latestValue.toLocaleString()}`
                    : latestValue.toLocaleString()}
                </span>
                <span
                  className={`text-sm ${
                    percentageChange >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {percentageChange >= 0 ? "+" : ""}
                  {percentageChange.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t("analytics.charts.revenue")}</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800">
            {t("analytics.charts.revenue")}
          </div>
        </div>

        <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t("analytics.charts.users")}</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800">
            {t("analytics.charts.users")}
          </div>
        </div>
      </div>
    </div>
  );
} 