"use client";

import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const certifications = [
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    link: "https://www.credly.com/badges/e2e1388d-a791-445e-a62b-5a767cee01b9/public_url",
    year: 2025,
  },
  {
    name: "CompTIA Network+",
    issuer: "CompTIA",
    link: "https://www.credly.com/badges/c5eef8c4-ad2c-40a4-bac6-5ef182566194/public_url",
    year: 2025,
  },
  {
    name: "Google Cybersecurity Cert",
    issuer: "Google/Coursera",
    link: "https://www.credly.com/badges/d9546bb9-b54b-4f76-a723-83c574855ea1/public_url",
    year: 2024,
  }
];

export default function CertificationsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 pt-24">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Certifications</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Here are some of my professional certifications.
        </p>
      </div>
      <div className="grid gap-y-6 gap-x-4 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, idx) => (
          <div key={idx} className="flex justify-center">
            <BackgroundGradient className="rounded-[22px] w-[320px] sm:w-[380px] p-4 sm:p-6 bg-white dark:bg-zinc-900">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">
                    <Link href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:no-underline">
                      {cert.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <Badge variant="secondary" className="mt-2">{cert.year}</Badge>
                </div>
                <div className="mt-auto">
                  <Button
                    size="sm"
                    asChild
                    className="bg-black text-white hover:bg-zinc-800"
                  >
                    <Link href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      View Certification
                      <ExternalLink size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            </BackgroundGradient>
          </div>
        ))}
      </div>
    </div>
  );
}