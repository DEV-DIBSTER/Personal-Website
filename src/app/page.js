import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Globe } from "@/components/ui/globe";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-0 md:py-28">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Hi, I'm <span className="text-primary">DIBSTER</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Full Stack Developer from the United States. Firm believer in user privacy and innovation. Currently residing in Ohio, learning about Cybersecurity and Network Defense. Just living life.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/projects">
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-0 md:py-0 relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center overflow-hidden rounded-lg border-0 bg-transparent px-4 py-24 md:py-32 h-[600px] md:h-[800px] lg:h-[1000px]">
            <Globe className="absolute inset-0 m-auto scale-125 md:scale-150" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          </div>
        </div>
      </section>
    </div>
  );
}