import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Code } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Projects | DIBSTER",
  description: "Explore my portfolio of web development and software engineering projects.",
};

export default function ProjectsPage() {
  const projects = [
    {
      title: "Project One",
      description: "A full-stack application built with Next.js and Node.js",
      longDescription: "This project is a comprehensive full-stack application that demonstrates my ability to work with modern web technologies. It features user authentication, real-time data updates, and a responsive design that works across all devices.",
      tags: ["Next.js", "React", "Node.js", "MongoDB"],
      category: "web",
      image: "/project1.jpg",
      github: "https://github.com/DEV-DIBSTER/project-one",
      demo: "https://project-one.example.com",
    },
    {
      title: "Project Two",
      description: "A responsive web application with modern UI/UX principles",
      longDescription: "Project Two showcases my front-end development skills with a focus on creating an intuitive and engaging user experience. It implements modern design principles and animations to create a polished final product.",
      tags: ["React", "Tailwind CSS", "Firebase"],
      category: "web",
      image: "/project2.jpg",
      github: "https://github.com/DEV-DIBSTER/project-two",
      demo: "https://project-two.example.com",
    },
    {
      title: "Mobile App",
      description: "Cross-platform mobile application built with React Native",
      longDescription: "This mobile application was developed to work seamlessly across iOS and Android platforms. It includes features like offline support, push notifications, and integration with device hardware.",
      tags: ["React Native", "Expo", "Firebase"],
      category: "mobile",
      image: "/project3.jpg",
      github: "https://github.com/DEV-DIBSTER/mobile-app",
      demo: "https://expo.dev/@dibster/mobile-app",
    },
    {
      title: "CLI Tool",
      description: "Command-line utility for automating development workflows",
      longDescription: "This command-line tool was created to automate repetitive tasks in my development workflow. It's built with Node.js and is available as an npm package that can be installed globally.",
      tags: ["Node.js", "CLI", "npm"],
      category: "tools",
      image: "/project4.jpg",
      github: "https://github.com/DEV-DIBSTER/cli-tool",
      demo: "https://www.npmjs.com/package/cli-tool",
    },
    {
      title: "E-commerce Platform",
      description: "Full-featured online store with payment processing",
      longDescription: "A complete e-commerce solution that includes product management, shopping cart functionality, user accounts, and secure payment processing with Stripe integration.",
      tags: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
      category: "web",
      image: "/project5.jpg",
      github: "https://github.com/DEV-DIBSTER/ecommerce",
      demo: "https://ecommerce-example.com",
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for visualizing complex datasets",
      longDescription: "This dashboard provides intuitive visualizations for complex data sets. It features interactive charts, filters, and export options to help users gain insights from their data.",
      tags: ["React", "D3.js", "Express", "PostgreSQL"],
      category: "web",
      image: "/project6.jpg",
      github: "https://github.com/DEV-DIBSTER/data-viz",
      demo: "https://data-viz-example.com",
    },
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
        {/* Replace with actual project images */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-muted flex items-center justify-center">
          <Code className="h-10 w-10 text-muted-foreground" />
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