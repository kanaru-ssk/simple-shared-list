import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { AppHeader } from "@/components/app-header";
import { AuthProvider } from "./auth-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Shared List",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <AuthProvider>
          <AppHeader />
          <div className="max-w-3xl mx-auto p-5">{children}</div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
