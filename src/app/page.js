import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Globe } from "@/components/ui/globe";
import {
  SiBun,
  SiClaude,
  SiCloudflare,
  SiCloudflareworkers,
  SiDiscord,
  SiDiscorddotjs,
  SiFigma,
  SiGithub,
  SiGo,
  SiJavascript,
  SiLinux,
  SiLucide,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiObsidian,
  SiOpenjdk,
  SiPostman,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiRust,
  SiSentry,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from "@icons-pack/react-simple-icons";

const techStack = [
  { label: "GitHub", Icon: SiGithub, lightColor: "#111827", darkColor: "#FFFFFF" },
  { label: "Discord", Icon: SiDiscord, lightColor: "#5865F2", darkColor: "#7C88FF" },
  { label: "Tailwind", Icon: SiTailwindcss, lightColor: "#06B6D4", darkColor: "#22D3EE" },
  { label: "Shadcn", Icon: SiShadcnui, lightColor: "#111827", darkColor: "#FFFFFF" },
  { label: "Lucide React", Icon: SiLucide, lightColor: "#E11D48", darkColor: "#FB7185" },
  { label: "Next.js", Icon: SiNextdotjs, lightColor: "#111827", darkColor: "#FFFFFF" },
  { label: "Cloudflare", Icon: SiCloudflare, lightColor: "#F38020", darkColor: "#FB923C" },
  { label: "WSL", Icon: SiLinux, lightColor: "#000000", darkColor: "#FACC15" },
  { label: "JavaScript", Icon: SiJavascript, lightColor: "#D4A100", darkColor: "#F7DF1E" },
  { label: "TypeScript", Icon: SiTypescript, lightColor: "#3178C6", darkColor: "#60A5FA" },
  { label: "Rust", Icon: SiRust, lightColor: "#EA580C", darkColor: "#FB923C" },
  { label: "Go", Icon: SiGo, lightColor: "#0891B2", darkColor: "#22D3EE" },
  { label: "Linux", Icon: SiLinux, lightColor: "#000000", darkColor: "#FACC15" },
  { label: "MongoDB", Icon: SiMongodb, lightColor: "#16A34A", darkColor: "#4ADE80" },
  { label: "Redis", Icon: SiRedis, lightColor: "#DC2626", darkColor: "#F87171" },
  { label: "Postgres", Icon: SiPostgresql, lightColor: "#4169E1", darkColor: "#7C93FF" },
  { label: "NodeJS", Icon: SiNodedotjs, lightColor: "#3F8A3A", darkColor: "#86EFAC" },
  { label: "Bun", Icon: SiBun, lightColor: "#4B3F2F", darkColor: "#FBF0DF" },
  { label: "Claude", Icon: SiClaude, lightColor: "#C2410C", darkColor: "#FB923C" },
  { label: "Cloudflare Workers", Icon: SiCloudflareworkers, lightColor: "#F38020", darkColor: "#FB923C" },
  { label: "Discord.js", Icon: SiDiscorddotjs, lightColor: "#4752C4", darkColor: "#7C88FF" },
  { label: "Python", Icon: SiPython, lightColor: "#1D4ED8", darkColor: "#60A5FA" },
  { label: "Java", Icon: SiOpenjdk, lightColor: "#EA580C", darkColor: "#FB923C" },
  { label: "Figma", Icon: SiFigma, lightColor: "#F24E1E", darkColor: "#FB7185" },
  { label: "Sentry", Icon: SiSentry, lightColor: "#312E81", darkColor: "#A78BFA" },
  { label: "Postman", Icon: SiPostman, lightColor: "#EA580C", darkColor: "#FB923C" },
  { label: "Obsidian", Icon: SiObsidian, lightColor: "#6D28D9", darkColor: "#A78BFA" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-20 md:pt-28 pb-0">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Hi, I'm <span className="text-primary">DIBSTER</span>
              </h1>
              <p className="mx-auto max-w-[700px] py-1 text-muted-foreground md:text-xl">
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

      {/* <section className="py-0 md:py-28 relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center overflow-hidden rounded-lg border-0 bg-transparent px-4 py-24 md:py-32 h-[600px] md:h-[800px] lg:h-[1000px]">
            <Globe className="absolute inset-0 m-auto scale-125 md:scale-150" />
          </div>
        </div>
      </section> */}

      <section className="py-8 md:py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-0 bg-transparent shadow-none">
            <div className="space-y-3 px-6 pt-6 text-center">
              <Badge variant="outline" className="tracking-wide">
                Skills
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Tech Stack &amp; Tools</h2>
              <p className="text-sm text-muted-foreground md:text-base">
                The softwares and tools I use to build my projects, websites, tools, and everything in between.
              </p>
            </div>

            <div className="relative mt-6 overflow-hidden py-6">
              <div className="tech-marquee-track">
                {[...techStack, ...techStack].map(({ label, Icon, lightColor, darkColor }, index) => (
                  <div
                    key={`${label}-${index}`}
                    className="group flex min-w-[110px] flex-col items-center gap-2 rounded-lg border border-border/90 bg-muted/40 px-4 py-3 shadow-sm transition-colors hover:bg-muted/70"
                  >
                    <Icon
                      aria-hidden
                      className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 [color:var(--icon-light)] dark:[color:var(--icon-dark)]"
                      style={{ "--icon-light": lightColor, "--icon-dark": darkColor }}
                    />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 md:w-36 bg-gradient-to-r from-background via-background/55 md:via-background/80 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 md:w-36 bg-gradient-to-l from-background via-background/55 md:via-background/80 to-transparent" />
            </div>
          </Card>
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