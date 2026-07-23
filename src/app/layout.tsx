import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import NotificationProvider from "@/components/notifications";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Game TopUp",
  description: "Fast & Secure Game TopUp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <AuthProvider>
          <Navbar />

          <NotificationProvider />

          <main className="flex-1">
            {children}
          </main>

          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}