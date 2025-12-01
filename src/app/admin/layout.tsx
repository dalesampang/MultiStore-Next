"use client";

import "../css/admin-dash.css";
import "remixicon/fonts/remixicon.css";

import SideBar from "@/components/Admin/SideBar";
import { Menu } from "lucide-react";
import { useState } from "react";
import AdminNavbar from "@/components/Admin/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&amp;display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-100 dark:bg-neutral-800 dark:text-white">
        <SideBar open={sidebarOpen} />

        {/* Main content */}
        <main className={`dashboard-main ${sidebarOpen ? "active" : ""}`}>
          <AdminNavbar
            onToggle={() => setSidebarOpen((prev) => !prev)}
            sidebarOpen={sidebarOpen}
          />
          {children}
        </main>
      </body>
    </html>
  );
}
