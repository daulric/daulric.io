import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "daulric",
  description: "daulric den",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">

      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>

      <body className={inter.className}>
        <Navbar />
        {children}
        </body>
    </html>

  );
}
