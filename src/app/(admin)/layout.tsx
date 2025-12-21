"use client";
import HeaderBar from "@/components/layout/HeaderBar";
import SideBar from "@/components/layout/SideBar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="lg:ml-[320px]">
        <HeaderBar onMenuClick={toggleSidebar} />

        <main className="pt-[60px] min-h-screen overflow-y-auto">
          <div className="px-6 py-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}