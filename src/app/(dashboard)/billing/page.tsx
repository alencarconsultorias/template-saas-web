"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  description: string;
}

export default function BillingPage() {
  const { t } = useLanguage();
  const [plans] = useState<Plan[]>([
    {
      id: "basic",
      name: "Basic",
      price: 29,
      features: [
        "5 usuários",
        "10GB de armazenamento",
        "Suporte por email",
        "Relatórios básicos",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: 99,
      features: [
        "20 usuários",
        "50GB de armazenamento",
        "Suporte prioritário",
        "Relatórios avançados",
        "API access",
      ],
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 299,
      features: [
        "Usuários ilimitados",
        "Armazenamento ilimitado",
        "Suporte 24/7",
        "Relatórios personalizados",
        "API access",
        "SLA garantido",
      ],
    },
  ]);

  const [invoices] = useState<Invoice[]>([
    {
      id: "INV-001",
      date: "2024-03-01",
      amount: 99,
      status: "paid",
      description: "Assinatura Pro - Março 2024",
    },
    {
      id: "INV-002",
      date: "2024-02-01",
      amount: 99,
      status: "paid",
      description: "Assinatura Pro - Fevereiro 2024",
    },
    {
      id: "INV-003",
      date: "2024-01-01",
      amount: 99,
      status: "paid",
      description: "Assinatura Pro - Janeiro 2024",
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t("billing.title")}</h1>

      {/* Planos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white dark:bg-black rounded-lg p-6 border ${
              plan.recommended ? "border-gold-600" : "border-gray-200 dark:border-gray-800"
            }`}
          >
            {plan.recommended && (
              <div className="bg-gold-600 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                {t("billing.recommended")}
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              R$ {plan.price}
              <span className="text-sm text-gray-600 dark:text-gray-400">/mês</span>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg
                    className="h-5 w-5 text-gold-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                plan.recommended
                  ? "bg-gold-600 text-white hover:bg-gold-700"
                  : "bg-gray-800 text-gray-100 hover:bg-gray-700"
              }`}
            >
              {t("billing.selectPlan")}
            </button>
          </div>
        ))}
      </div>

      {/* Histórico de Faturas */}
      <div>
        <h2 className="text-xl font-bold text-gray-100 mb-4">{t("billing.invoiceHistory")}</h2>
        <div className="bg-black rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                  {t("billing.invoice.id")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                  {t("billing.invoice.date")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                  {t("billing.invoice.amount")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                  {t("billing.invoice.status")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                  {t("billing.invoice.description")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                  {t("billing.invoice.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="px-6 py-4 text-gray-200">{invoice.id}</td>
                  <td className="px-6 py-4 text-gray-200">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-200">R$ {invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        invoice.status === "paid"
                          ? "bg-green-900 text-green-200"
                          : invoice.status === "pending"
                          ? "bg-yellow-900 text-yellow-200"
                          : "bg-red-900 text-red-200"
                      }`}
                    >
                      {t(`billing.status.${invoice.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-200">{invoice.description}</td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gold-600 transition-colors">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 