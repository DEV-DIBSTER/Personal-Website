"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Moon, Sun, Home, Code, Mail, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/ui/tubelight-navbar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription } from "@/components/ui/sheet";

const Navigation = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Force re-render when pathname changes
  useEffect(() => {
    // This effect will cause a re-render when pathname changes
    // and ensure the active state is correctly set
  }, [pathname]);

  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Projects", url: "/projects", icon: Code },
    { name: "Contact", url: "/contact", icon: Mail },
    { name: "Certifications", url: "/certifications", icon: Code }
  ];

  const isActivePath = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <>
      <div className="relative w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center items-center py-4">
        <NavBar 
          items={navItems.map(item => ({
            ...item,
            active: isActivePath(item.url)
          }))} 
          className="hidden md:block" 
        />
        
        <div className="absolute right-4 md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mt-4 ml-7">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="!w-screen !max-w-none h-screen border-none p-0 bg-background/95 backdrop-blur-lg animate-fadeDownFast transition-none duration-200 [&>button:last-child]:hidden"
            >
              <button
                onClick={() => setSheetOpen(false)}
                aria-label="Close navigation"
                className={`fixed top-2 right-4 z-50 rounded-full p-2 hover:bg-muted transition ${sheetOpen ? "fade-in-down" : ""}`}
                type="button"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex flex-col h-full bg-background/95">
                <div className="px-8 pt-6">
                  <SheetTitle></SheetTitle>
                  <SheetDescription>
                  </SheetDescription>
                </div>
                <div className="flex flex-col px-8 py-6 space-y-8 mt-4">
                  {navItems.map((item, idx) => (
                    <Link
                      key={item.url}
                      href={item.url}
                      style={{
                        animation: `fadeInNav 0.4s ease ${(0.1 + idx * 0.12).toFixed(2)}s both`
                      }}
                      className={`flex items-center gap-3 text-xl font-medium transition-colors hover:text-primary opacity-0 ${
                        isActivePath(item.url)
                          ? "text-foreground"
                          : "text-foreground/60"
                      }`}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />}
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Fixed theme toggle button at bottom right */}
      {isMounted && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 flex items-center justify-center bg-background shadow-lg hover:shadow-xl transition-all border border-border"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      )}
    </>
  );
};

export default Navigation;