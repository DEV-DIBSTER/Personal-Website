"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success toast
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>
              Fill out the form below and I'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Here are the ways you can reach me directly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4">
              <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-sm text-muted-foreground">contact@example.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-sm text-muted-foreground">New York, NY</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-4">Connect with me</h3>
              <div className="flex space-x-4">
                <Link 
                  href="https://github.com/DEV-DIBSTER" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link 
                  href="https://twitter.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link 
                  href="https://linkedin.com/in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}