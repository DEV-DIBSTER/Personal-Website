import type { Metadata } from "next";
import { Providers } from "./providers";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Horsering from "./components/Horsering";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ToastProvider } from "@/components/ui/use-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "DIBSTER Portfolio",
  description:
    "Personal portfolio website showcasing my projects and skills as a full-stack developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <ToastProvider>
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
            <Horsering />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
