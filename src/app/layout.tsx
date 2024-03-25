import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Navbar } from "./components/navbar.component";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Todos",
  description: "Created for practice async tests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark:bg-slate-800 ${inter.className}`}>
        <Navbar />
        <main className="mx-auto max-w-xl p-4 bg-stone-200 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
