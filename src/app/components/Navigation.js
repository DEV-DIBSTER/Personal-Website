"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Moon, Sun, Home, Code, Mail, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/ui/tubelight-navbar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription } from "@/components/ui/sheet";

const ThemeToggleButton = memo(() => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);
  
  if (!isMounted) return null;
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 flex items-center justify-center bg-background shadow-lg hover:shadow-xl transition-all border border-border"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
});

ThemeToggleButton.displayName = 'ThemeToggleButton';

const MainNavBar = memo(({ pathname }) => {
  const navItems = useCallback(() => [
    { name: "Home", url: "/", icon: Home },
    { name: "Projects", url: "/projects", icon: Code },
    { name: "Contact", url: "/contact", icon: Mail },
    { name: "Certifications", url: "/certifications", icon: Code },
    { name: "Blog", url: "/blog", icon: Code },
  ], []);

  const isActivePath = useCallback((path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  }, [pathname]);

  const processedNavItems = useCallback(() => 
    navItems().map(item => ({
      ...item,
      active: isActivePath(item.url)
    })), 
  [navItems, isActivePath]);

  return (
    <NavBar 
      items={processedNavItems()} 
      className="hidden md:block" 
    />
  );
});

MainNavBar.displayName = 'MainNavBar';

const MobileNavigation = memo(({ pathname, sheetOpen, setSheetOpen }) => {
  const navItems = useCallback(() => [
    { name: "Home", url: "/", icon: Home },
    { name: "Projects", url: "/projects", icon: Code },
    { name: "Contact", url: "/contact", icon: Mail },
    { name: "Certifications", url: "/certifications", icon: Code },
    { name: "Blog", url: "/blog", icon: Code }
  ], []);

  const isActivePath = useCallback((path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  }, [pathname]);

  return (
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
              {navItems().map((item, idx) => (
                <Link
                  key={item.url}
                  href={item.url}
                  onClick={() => setSheetOpen(false)}
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
  );
});

MobileNavigation.displayName = 'MobileNavigation';

const Navigation = () => {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const navbarRef = useRef(null);
  const lastScrollYRef = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (navbarRef.current) {
        if (currentScrollY > lastScrollYRef.current && currentScrollY > 50) {
          navbarRef.current.classList.add('nav-hidden');
        } else {
          navbarRef.current.classList.remove('nav-hidden');
        }
      }
      
      lastScrollYRef.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div 
        ref={navbarRef}
        className="relative w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center items-center py-4 transition-transform duration-300"
      >
        <MainNavBar pathname={pathname} />
        <MobileNavigation 
          pathname={pathname} 
          sheetOpen={sheetOpen} 
          setSheetOpen={setSheetOpen} 
        />
      </div>

      <ThemeToggleButton />

      <style jsx global>{`
        .nav-hidden {
          transform: translateY(-100%);
        }
      `}</style>
    </>
  );
};

export default Navigation;