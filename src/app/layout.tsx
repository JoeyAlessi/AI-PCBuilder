import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PCBuildProvider } from "@/lib/context/PCBuildContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PC Builder",
  description: "Build your dream PC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Navbar />
        <PCBuildProvider>{children}</PCBuildProvider>
      </body>
    </html>
  );
}
