"use client";

import { useState } from "react";
import { AdminHeader } from "./components/PanelHeader";
import { AdminSidebar } from "./components/PanelSidebar";
import { cn } from "@/lib/utils";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-muted/20">
      <AdminSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />

      <div className={'lg:pl-64'}>
        <AdminHeader
          onMenuClick={() =>
            setSidebarOpen(true)
          }
          user={{
            name: "Pouya",
            username: "pouya",
            email: "pouya@example.com",
          }}
        />

        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}