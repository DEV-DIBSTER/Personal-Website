"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const certifications = [
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    link: "https://www.credly.com/earner/earned/badge/e2e1388d-a791-445e-a62b-5a767cee01b9",
    year: 2025,
  },
  {
    name: "CompTIA Network+",
    issuer: "CompTIA",
    link: "https://www.credly.com/earner/earned/badge/c5eef8c4-ad2c-40a4-bac6-5ef182566194",
    year: 2025,
  },
  {
    name: "Google Cybersecurity Certification",
    issuer: "Google",
    link: "https://www.credly.com/earner/earned/badge/d9546bb9-b54b-4f76-a723-83c574855ea1",
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
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, idx) => (
          <Card key={idx} className="w-full h-full flex flex-col">
            <CardHeader>
              <CardTitle>
                <Link href={cert.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {cert.name}
                </Link>
              </CardTitle>
              <CardDescription>
                <span className="block">{cert.issuer}</span>
                <Badge variant="secondary" className="mt-2">{cert.year}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={cert.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                View Certification
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}