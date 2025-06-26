"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface Project {
  id: string;
  name: string;
  status: "active" | "completed" | "onHold";
  progress: number;
  team: string[];
  deadline: string;
}

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "recent">("all");

  const mockProjects: Project[] = [
    {
      id: "1",
      name: "Website Redesign",
      status: "active",
      progress: 75,
      team: ["John D.", "Sarah M."],
      deadline: "2024-04-15",
    },
    {
      id: "2",
      name: "Mobile App Development",
      status: "onHold",
      progress: 30,
      team: ["Mike R.", "Anna K."],
      deadline: "2024-05-20",
    },
    {
      id: "3",
      name: "E-commerce Integration",
      status: "completed",
      progress: 100,
      team: ["Lisa P.", "Tom B."],
      deadline: "2024-03-10",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t("projects.title")}</h1>
        <button className="bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors">
          {t("projects.createNew")}
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        {(["all", "recent", "active", "completed"] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === filterOption
                ? "bg-gold-600 text-white"
                : "bg-black text-gray-300 hover:bg-gold-500/5"
            }`}
          >
            {t(`projects.filters.${filterOption}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-black rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{project.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  project.status === "active"
                    ? "bg-green-900 text-green-200"
                    : project.status === "completed"
                    ? "bg-blue-900 text-blue-200"
                    : "bg-yellow-900 text-yellow-200"
                }`}
              >
                {t(`projects.status.${project.status}`)}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>{t("projects.progress")}</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gold-600 rounded-full h-2 transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-400">
              <div className="flex -space-x-2">
                {project.team.map((member, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full bg-gold-900 flex items-center justify-center border-2 border-black text-gold-200"
                    title={member}
                  >
                    {member.charAt(0)}
                  </div>
                ))}
              </div>
              <span>
                {t("projects.dueDate")}: {new Date(project.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 