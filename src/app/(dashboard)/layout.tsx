"use client";

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary-dark">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 lg:pl-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
} 