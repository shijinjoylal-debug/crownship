import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Crownship | Premium Trading Tools",
  description: "Advanced tools for the modern trader.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
