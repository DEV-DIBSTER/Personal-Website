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
  { label: "GitHub", Icon: SiGithub, color: "#FFFFFF" },
  { label: "Discord", Icon: SiDiscord, color: "#5865F2" },
  { label: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { label: "Shadcn", Icon: SiShadcnui, color: "#FFFFFF" },
  { label: "Lucide React", Icon: SiLucide, color: "#F56565" },
  { label: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { label: "Cloudflare", Icon: SiCloudflare, color: "#F38020" },
  { label: "WSL", Icon: SiLinux, color: "#FCC624" },
  { label: "Linux", Icon: SiLinux, color: "#FCC624" },
  { label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { label: "Rust", Icon: SiRust, color: "#F97316" },
  { label: "Go", Icon: SiGo, color: "#00ADD8" },
  { label: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { label: "Redis", Icon: SiRedis, color: "#DC382D" },
  { label: "Postgres", Icon: SiPostgresql, color: "#4169E1" },
  { label: "NodeJS", Icon: SiNodedotjs, color: "#5FA04E" },
  { label: "Bun", Icon: SiBun, color: "#FBF0DF" },
  { label: "Claude", Icon: SiClaude, color: "#D97757" },
  { label: "Cloudflare Workers", Icon: SiCloudflareworkers, color: "#F38020" },
  { label: "Discord.js", Icon: SiDiscorddotjs, color: "#5865F2" },
  { label: "Python", Icon: SiPython, color: "#3776AB" },
  { label: "Java", Icon: SiOpenjdk, color: "#ED8B00" },
  { label: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { label: "Sentry", Icon: SiSentry, color: "#362D59" },
  { label: "Postman", Icon: SiPostman, color: "#FF6C37" },
  { label: "Obsidian", Icon: SiObsidian, color: "#7C3AED" },
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
                {[...techStack, ...techStack].map(({ label, Icon, color }, index) => (
                  <div
                    key={`${label}-${index}`}
                    className="group flex min-w-[110px] flex-col items-center gap-2 rounded-lg border border-border/90 bg-muted/40 px-4 py-3 shadow-sm transition-colors hover:bg-muted/70"
                  >
                    <Icon
                      aria-hidden
                      className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                      color={color}
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