"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1 h-[calc(100vh-64px)] px-4 lg:px-2">
        <Sidebar />
        <main className={`flex-1 p-8 overflow-x-hidden transition-all duration-300 ${
          isCollapsed ? 'lg:pl-8' : 'lg:pl-8'
        } overflow-y-auto`}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
} 