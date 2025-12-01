"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollToTop from "@/components/Common/ScrollToTop";
import dynamic from "next/dynamic";
import Analytics from "@/components/Common/Analytics";
const PreLoader = dynamic(() => import("@/components/Common/PreLoader"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        (
        <>
          <Header />
          {children}
          <ScrollToTop />
          <Footer />
          <Analytics />
        </>
        )
      </body>
    </html>
  );
}
