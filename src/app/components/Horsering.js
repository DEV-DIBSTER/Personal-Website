import Link from "next/link";
import { Button } from "@/components/ui/button";

const MEMBER = "dibster";

const Horsering = () => {
  return (
    <nav
      aria-label="horsering webring"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-0.5 rounded-md border bg-background/95 p-1 text-foreground shadow-xs backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground" asChild>
        <Link href={`https://horser.ing/prev/${MEMBER}`} aria-label="Previous horsering site">
          ←
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 text-xs font-medium text-muted-foreground hover:text-foreground"
        asChild
      >
        <Link href="https://horser.ing" aria-label="horsering home">
          horsering
        </Link>
      </Button>
      <Button variant="ghost" size="icon" className="size-8" asChild>
        <Link href="https://horser.ing/rand" aria-label="Random horsering site">
          <span aria-hidden="true">🐴</span>
        </Link>
      </Button>
      <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground" asChild>
        <Link href={`https://horser.ing/next/${MEMBER}`} aria-label="Next horsering site">
          →
        </Link>
      </Button>
    </nav>
  );
};

export default Horsering;
