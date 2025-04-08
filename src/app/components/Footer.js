import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4">DIBSTER</h3>
            <p className="text-muted-foreground">
              Full-stack developer passionate about creating elegant solutions to complex problems.
            </p>
          </div>
          
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com/DEV-DIBSTER" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="https://twitter.com/DEV_DIBSTER" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="https://linkedin.com/in/adibsalam" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="mailto:me@dibster.dev" aria-label="Email">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="https://discord.com/users/757296951925538856" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48" 
                  className="h-7 w-7 text-muted-foreground hover:text-foreground transition-colors stroke-current fill-none -mt-[4px] -ml-[2px]"
                  strokeWidth="2.5"
                >
                  <path d="M10.9 30.1c2.65 2 6.64 4.1 13.1 4.1s10.44-2.1 13.1-4.1"/>
                  <path d="M36 16.6c-3.23-1.65-6.43-3.2-12-3.2s-8.75 1.55-12 3.2"/>
                  <path d="m20.5 13.7-1.4-2.76a17.06 17.06 0 0 0-8.18 3.27S6.75 20.25 6 32.18c4.22 4.87 10.64 4.9 10.64 4.9l2.48-3.3"/>
                  <path d="m28.9 33.75 2.49 3.32s6.41-.02 10.64-4.88c-.75-11.93-4.92-18-4.92-18s-3.75-2.94-8.18-3.27l-1.36 2.77"/>
                  <ellipse cx="18.68" cy="25.64" rx="2.87" ry="3.27"/>
                  <ellipse cx="29.32" cy="25.64" rx="2.87" ry="3.27"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2020-{new Date().getFullYear()} DIBSTER. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;