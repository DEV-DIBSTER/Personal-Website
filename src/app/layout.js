import { Providers } from "./providers";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ToastProvider } from "@/components/ui/use-toast";
import "./globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata = {
  title: "DIBSTER Portfolio",
  description: "Personal portfolio website showcasing my projects and skills as a full-stack developer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <ToastProvider>
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
