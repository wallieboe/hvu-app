import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "HVU Penningmeester Portaal",
  description: "Administratie en Transactie Beheer voor Humanistisch Verbond Afdeling Utrecht",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={cn(
          "min-h-screen bg-hvu-cream font-sans antialiased text-gray-900",
          anton.variable,
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
