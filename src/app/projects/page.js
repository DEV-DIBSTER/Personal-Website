import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Projects | DIBSTER",
  description: "Explore my portfolio including BlueFoxHost, BrawlTools, Brawlify CDN, DanBot Hosting, and Pterodactyl Systems projects.",
};

export default function ProjectsPage() {
  const projects = [
    {
      title: "BlueFoxHost",
      description: "A hosting service focused on reliable and affordable solutions",
      longDescription: "BlueFoxHost provides reliable and affordable hosting solutions with efficient customer service. I'm actively involved with this organization, contributing to its technical infrastructure and development.",
      tags: ["Hosting", "Infrastructure", "Customer Service", "Web Services"],
      category: "web",
      image: "/projects/bluefoxhost.png",
      github: "https://github.com/BlueFoxHost",
      demo: "https://bluefoxhost.com",
    },
    {
      title: "BrawlTools",
      description: "Tools and utilities for the Brawl Stars ecosystem",
      longDescription: "BrawlTools is a collection of tools and utilities designed for the Brawl Stars ecosystem, helping players and developers manage and enhance Brawl Stars-related content and gameplay data.",
      tags: ["Brawl Stars", "Game Tools", "Data Management", "API"],
      category: "tools",
      image: "/projects/brawltools.png",
      github: "https://github.com/BrawlTools1",
      demo: "https://brawltools.net",
    },
    {
      title: "Brawlify CDN",
      description: "Content Delivery Network for Brawl Stars assets",
      longDescription: "Brawlify CDN (BrawlCDN) is a Content Delivery Network for Brawl Stars assets, providing resources like in-game files, official fan kit materials, and social media content. Distributed under the Apache-2.0 license and not officially affiliated with Supercell.",
      tags: ["CDN", "Brawl Stars", "Content Delivery", "Apache-2.0"],
      category: "web",
      image: "/projects/brawlify.png",
      github: "https://github.com/Bralify/BrawlCDN",
      demo: "https://cdn.brawlify.com",
    },
    {
      title: "DanBot Hosting",
      description: "Hosting service integrated with Pterodactyl Systems",
      longDescription: "DanBot Hosting is a hosting service that integrates with Pterodactyl Systems, an open-source game server management panel. I contribute to its Discord bot ecosystem and hosting infrastructure, including the DanBotHostingStats bot that integrates with the Pterodactyl API.",
      tags: ["Hosting", "Discord Bot", "Pterodactyl", "Game Servers"],
      category: "web",
      image: "/projects/danbot-hosting-banner.webp",
      github: "https://github.com/DanBot-Hosting",
      demo: "https://danbot.host",
    },
    {
      title: "DanBot Hosting - Pterodactyl Eggs",
      description: "Open-source game server management platform",
      longDescription: "Pterodactyl Systems is the underlying platform used by DanBot Hosting. My involvement includes leveraging and customizing this system for hosting purposes, particularly in connection with the DanBotHostingStats bot and other hosting infrastructure projects.",
      tags: ["Game Servers", "Server Management", "Open Source", "Infrastructure"],
      category: "tools",
      image: "/projects/danbot-hosting-banner.webp",
      github: "https://github.com/DanBot-Hosting/Pterodactyl-Eggs",
      demo: "https://danbot.host",
    },
    {
      title: "DanBotHostingStats",
      description: "Discord bot for Pterodactyl API integration",
      longDescription: "DanBotHostingStats is a Discord bot designed to integrate with the Pterodactyl API. It provides real-time information about server status, uptime, and other metrics, enhancing the user experience on Discord.",
      tags: ["Discord Bot", "Pterodactyl API", "Server Monitoring" , "Infrastructure"],
      category: "web",
      image: "/projects/danbot-hosting-banner.webp",
      github: "https://github.com/DanBot-Hosting/DanBotHostingStats",
      demo: "https://discord.com/users/640161047671603205"
    },
    {
      title: "DanBot Hosting - Discord Bot",
      description: "Next iteration of DanBotHostingStats, built from the ground up.",
      longDescription: "DanBotHostingStats is a Discord bot designed to integrate with the Pterodactyl API. It provides real-time information about server status, uptime, and other metrics, enhancing the user experience on Discord.",
      tags: ["Discord Bot", "Pterodactyl API", "Server Monitoring" , "Infrastructure"],
      category: "web",
      image: "/projects/danbot-hosting-banner.webp",
      github: "https://github.com/DanBot-Hosting/Discord-Bot",
      demo: "https://discord.com/users/640161047671603205"
    },
    {
      title: "FBI Modern Vault Design",
      description: "Modernized design for the FBI Vault Site.",
      longDescription: "This project reimagines the FBI's Vault website with a modern, user-friendly interface. I created this concept to demonstrate how government archives could be more accessible through contemporary design principles. Built with Next.js and Shadcn UI components, the site features improved navigation, responsive layouts, and enhanced readability while maintaining the authoritative feel appropriate for federal resources. The redesign focuses on making declassified documents and historical records more discoverable for researchers, journalists, and the general public.",
      tags: ["Webdesign", "Website", "Shadcn" , "Infrastructure"],
      category: "web",
      image: "/projects/danbot-hosting-banner.webp",
      github: "https://github.com/DEV-DIBSTER",
      demo: "https://concept-modern-fbi-site.vercel.app/"
    }
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          A collection of my work, side projects, and experiments
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mx-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="web">Web</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="web" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.category === "web")
              .map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="mobile" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.category === "mobile")
              .map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="tools" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.category === "tools")
              .map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video relative bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-muted flex items-center justify-center">
          <img 
            src={project.image} 
            alt={project.title} 
            className="object-contain h-full w-full p-4" 
          />
        </div>
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{project.longDescription}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <Badge key={tagIndex} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" /> GitHub
          </Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={project.demo} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}