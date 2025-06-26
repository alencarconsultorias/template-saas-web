"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  status: "active" | "inactive" | "pending";
  avatar: string;
}

export default function TeamPage() {
  const { t } = useLanguage();
  const [members] = useState<TeamMember[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@example.com",
      role: "admin",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@example.com",
      role: "manager",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: "3",
      name: "Pedro Oliveira",
      email: "pedro@example.com",
      role: "member",
      status: "pending",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t("team.title")}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t("team.subtitle")}</p>
        <button className="bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors">
          {t("team.invite")}
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select className="bg-black text-gray-100 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-gold-600">
          <option value="all">{t("team.filters.all")}</option>
          <option value="active">{t("team.filters.active")}</option>
          <option value="inactive">{t("team.filters.inactive")}</option>
          <option value="pending">{t("team.filters.pending")}</option>
        </select>

        <select className="bg-black text-gray-100 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-gold-600">
          <option value="all">{t("team.filters.allRoles")}</option>
          <option value="admin">{t("team.roles.admin")}</option>
          <option value="manager">{t("team.roles.manager")}</option>
          <option value="member">{t("team.roles.member")}</option>
        </select>

        <input
          type="text"
          placeholder={t("team.search")}
          className="bg-black text-gray-100 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-gold-600"
        />
      </div>

      {/* Lista de Membros */}
      <div className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-400">
                {t("team.table.member")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-400">
                {t("team.table.role")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-400">
                {t("team.table.status")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-400">
                {t("team.table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-900/50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-200">{member.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {t(`team.roles.${member.role}`)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      member.status === "active"
                        ? "bg-green-900 text-green-200"
                        : member.status === "inactive"
                        ? "bg-red-900 text-red-200"
                        : "bg-yellow-900 text-yellow-200"
                    }`}
                  >
                    {t(`team.status.${member.status}`)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 