"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function ReportsPage() {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t("reports.title")}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t("reports.subtitle")}</p>
        <button className="bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors">
          {t("reports.generate")}
        </button>
      </div>

      {/* Filtros de Relatório */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <select className="bg-black text-gray-100 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-gold-600">
          <option value="financial">{t("reports.types.financial")}</option>
          <option value="performance">{t("reports.types.performance")}</option>
          <option value="user">{t("reports.types.user")}</option>
          <option value="sales">{t("reports.types.sales")}</option>
        </select>

        <select className="bg-black text-gray-100 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-gold-600">
          <option value="daily">Diário</option>
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensal</option>
          <option value="yearly">Anual</option>
        </select>

        <select className="bg-black text-gray-100 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-gold-600">
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
        </select>

        <button className="bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors">
          {t("reports.download")}
        </button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-gray-900 dark:text-gray-100 mb-2">{t("reports.stats.totalRevenue")}</h3>
          <p className="text-2xl font-bold text-gold-600">R$ 45.231,89</p>
          <p className="text-green-500 text-sm">+12.5% {t("reports.stats.vsLastMonth")}</p>
        </div>

        <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-gray-900 dark:text-gray-100 mb-2">{t("reports.stats.totalUsers")}</h3>
          <p className="text-2xl font-bold text-gold-600">2,543</p>
          <p className="text-green-500 text-sm">+8.2% {t("reports.stats.vsLastMonth")}</p>
        </div>

        <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-gray-900 dark:text-gray-100 mb-2">{t("reports.stats.totalSales")}</h3>
          <p className="text-2xl font-bold text-gold-600">1,234</p>
          <p className="text-green-500 text-sm">+5.7% {t("reports.stats.vsLastMonth")}</p>
        </div>

        <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-gray-900 dark:text-gray-100 mb-2">{t("reports.stats.conversionRate")}</h3>
          <p className="text-2xl font-bold text-gold-600">3.2%</p>
          <p className="text-green-500 text-sm">+2.1% {t("reports.stats.vsLastMonth")}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-4">{t("reports.charts.revenue")}</h3>
          <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Gráfico de Receita</p>
          </div>
        </div>

        <div className="bg-white dark:bg-black rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-gray-900 dark:text-gray-100 text-lg font-semibold mb-4">{t("reports.charts.users")}</h3>
          <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Gráfico de Usuários</p>
          </div>
        </div>
      </div>
    </div>
  );
} 