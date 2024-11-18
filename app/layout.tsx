import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Favicon from "@/public/favicon.svg";

import { Exo_2 } from "next/font/google";
import Footer from "@/components/Footer";
const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "700"], // Select the weights you want to use
});

export const metadata: Metadata = {
  title: "Free Invoice Generator",
  description: "Generate your invoice for free",
  icons: [{ rel: "icon", url: Favicon.src }],
};

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo2.className} antialiased bg-slate-100`}>
        <Analytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
