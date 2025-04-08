"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Moon, Sun, Home, Code, Mail, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/ui/tubelight-navbar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  // Define navItems with exact paths that will be used in both navigation and footer
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Projects", url: "/projects", icon: Code },
    { name: "Contact", url: "/contact", icon: Mail },
  ];

  // Helper function to check if a path is active (exact match or starts with for nested routes)
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                      isActivePath(item.url)
                        ? "text-foreground"
                        : "text-foreground/60"
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.name}
                  </Link>
                ))}
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