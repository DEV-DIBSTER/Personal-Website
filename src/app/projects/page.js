import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FolderKanban } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  description: "Explore the projects I've been working on and building.",
};

export default function ProjectsPage() {
  const projects = [
    {
      title: "Desert Storm",
      description: "A unified dashboard for hosting companies to manage Pterodactyl, VirtFusion, Paymenter, Discord, and more.",
      longDescription: "Desert Storm, custom built at DanBot Hosting, now operating at several hosting companies is a unified dashboard that allows you to manage Pterodactyl, VirtFusion, Paymenter, Discord, and more. It is built with Shadcn, Tailwind, Next.js, and Bun for performance and scalability. Paired with Titan Halo, it is a one stop solution for hosting companies to manage their customers and servers.",
      tags: ["Pterodactyl", "VirtFusion", "Paymenter", "Discord", "Titan Halo"],
      category: "web",
      image: "",
      github: "https://github.com/DIBSTER-Management/",
      demo: "",
      urls: [
      ],
      blogs: [
      ],
      otherItems: [
      ],
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          A collection of my work, side projects, and experiments.
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
  const hasVisibleHref = (href) => Boolean(href && href.trim() && href.trim() !== "#");
  const isVisibleItem = (item) => Boolean(item?.label && hasVisibleHref(item?.href));
  const urls = (Array.isArray(project.urls) ? project.urls : []).filter(isVisibleItem);
  const blogs = (Array.isArray(project.blogs) ? project.blogs : []).filter(isVisibleItem);
  const otherItems = (Array.isArray(project.otherItems) ? project.otherItems : []).filter(isVisibleItem);
  const hasGithub = hasVisibleHref(project.github);
  const hasDemo = hasVisibleHref(project.demo);

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video relative">
        {project.image ? (
          <div className="absolute inset-4 rounded-lg bg-muted flex items-center justify-center overflow-hidden border">
            <img
              src={project.image}
              alt={project.title}
              className="object-contain h-full w-full p-4"
            />
          </div>
        ) : (
          <div className="absolute inset-4 rounded-lg bg-muted flex flex-col items-center justify-center text-center p-4 overflow-hidden border">
            <FolderKanban className="h-10 w-10 text-muted-foreground mb-2" aria-hidden="true" />
            <p className="text-sm font-medium text-foreground">{project.title}</p>
          </div>
        )}
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
        {urls.length > 0 && (
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">URLs</p>
            <div className="flex flex-wrap gap-2">
              {urls.map((item, index) => (
                <Button key={`${item.href}-${index}`} variant="outline" size="sm" asChild>
                  <Link href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
        {blogs.length > 0 && (
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Blogs</p>
            <div className="flex flex-wrap gap-2">
              {blogs.map((item, index) => (
                <Button key={`${item.href}-${index}`} variant="outline" size="sm" asChild>
                  <Link href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
        {otherItems.length > 0 && (
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Other</p>
            <div className="flex flex-wrap gap-2">
              {otherItems.map((item, index) => (
                <Button key={`${item.href}-${index}`} variant="outline" size="sm" asChild>
                  <Link href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {hasGithub && (
          <Button variant="outline" size="sm" asChild>
            <Link href={project.github} target="_blank" rel="noopener noreferrer">
              <SiGithub className="mr-2 h-4 w-4" /> GitHub
            </Link>
          </Button>
        )}
        {hasDemo && (
          <Button size="sm" asChild>
            <Link href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}