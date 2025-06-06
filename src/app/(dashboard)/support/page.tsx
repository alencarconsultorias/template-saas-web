"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface Ticket {
  id: string;
  title: string;
  status: "open" | "inProgress" | "resolved";
  priority: "low" | "medium" | "high";
  createdAt: string;
  lastUpdate: string;
  category: string;
}

export default function SupportPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "open" | "inProgress" | "resolved">("all");

  const mockTickets: Ticket[] = [
    {
      id: "T-1234",
      title: "Cannot access dashboard",
      status: "open",
      priority: "high",
      createdAt: "2024-03-15",
      lastUpdate: "2024-03-15",
      category: "Access",
    },
    {
      id: "T-1235",
      title: "Feature request: Dark mode",
      status: "inProgress",
      priority: "medium",
      createdAt: "2024-03-14",
      lastUpdate: "2024-03-15",
      category: "Feature Request",
    },
    {
      id: "T-1236",
      title: "Bug in export functionality",
      status: "resolved",
      priority: "high",
      createdAt: "2024-03-13",
      lastUpdate: "2024-03-14",
      category: "Bug",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100">{t("support.title")}</h1>
        <button className="bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors">
          {t("support.newTicket")}
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        {(["all", "open", "inProgress", "resolved"] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === filterOption
                ? "bg-gold-600 text-white"
                : "bg-black text-gray-300 hover:bg-gold-500/5"
            }`}
          >
            {t(`support.filters.${filterOption}`)}
          </button>
        ))}
      </div>

      <div className="bg-black rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                {t("support.table.ticket")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                {t("support.table.status")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                {t("support.table.priority")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                {t("support.table.category")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                {t("support.table.created")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">
                {t("support.table.lastUpdate")}
              </th>
            </tr>
          </thead>
          <tbody>
            {mockTickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-200">{ticket.title}</div>
                    <div className="text-sm text-gray-400">{ticket.id}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      ticket.status === "open"
                        ? "bg-yellow-900 text-yellow-200"
                        : ticket.status === "inProgress"
                        ? "bg-blue-900 text-blue-200"
                        : "bg-green-900 text-green-200"
                    }`}
                  >
                    {t(`support.status.${ticket.status}`)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      ticket.priority === "high"
                        ? "bg-red-900 text-red-200"
                        : ticket.priority === "medium"
                        ? "bg-yellow-900 text-yellow-200"
                        : "bg-green-900 text-green-200"
                    }`}
                  >
                    {t(`support.priority.${ticket.priority}`)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">{ticket.category}</td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(ticket.lastUpdate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 