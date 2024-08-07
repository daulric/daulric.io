import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "daulric",
  description: "daulric den",

  icons: {
    apple: "/images/logo.png",
    icon: "/images/logo.png"
  },

  manifest: "/manifest.json"
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${inter.className } bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700`}>
        <Navbar>{children}</Navbar>
        </body>
    </html>
  );
}
