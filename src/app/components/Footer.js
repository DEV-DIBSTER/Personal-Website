import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, MessagesSquare } from "lucide-react";

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
                <MessagesSquare className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"/>
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