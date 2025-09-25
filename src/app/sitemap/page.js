"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function Sitemap() {
  const [pages, setPages] = useState([
    { path: "/", name: "Home" },
    { path: "/projects", name: "Projects" },
    { path: "/certifications", name: "Certifications" },
    { path: "/contact", name: "Contact" },
  ]);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Sitemap</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <Link href={page.path} className="text-xl font-medium hover:underline">
              {page.name}
            </Link>
            <p className="text-gray-500 mt-2">{page.path}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}