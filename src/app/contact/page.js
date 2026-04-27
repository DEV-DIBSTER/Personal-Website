import fs from "node:fs/promises";
import path from "node:path";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, KeyRound } from "lucide-react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import PgpKeyBlock from "./pgp-key-block";

async function loadPgpKeys() {
  const pgpDir = path.join(process.cwd(), "public", "pgp");
  let fileNames = [];
  try {
    fileNames = await fs.readdir(pgpDir);
  } catch {
    return [];
  }

  const ascFiles = fileNames.filter((name) => name.toLowerCase().endsWith(".asc"));

  const entries = await Promise.all(
    ascFiles.map(async (fileName) => {
      const filePath = path.join(pgpDir, fileName);
      const publicKey = (await fs.readFile(filePath, "utf-8")).trim();
      const baseName = fileName.replace(/\.asc$/i, "");
      const looksLikeEmail = /.+@.+\..+/.test(baseName);
      return {
        id: baseName,
        label: looksLikeEmail ? baseName : baseName.replace(/[._-]+/g, " "),
        email: looksLikeEmail ? baseName : null,
        fileName,
        downloadUrl: `/pgp/${encodeURIComponent(fileName)}`,
        publicKey,
      };
    })
  );

  return entries.sort((a, b) => a.id.localeCompare(b.id));
}

export default async function ContactPage() {
  const pgpKeys = await loadPgpKeys();

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <Card className="w-full">
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
                <a
                  href="mailto:me@dibster.dev"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  me@dibster.dev
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <a
                  href="tel:+15551234567"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-sm text-muted-foreground">Middle of Nowhere, Ohio</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-4">Connect with Me:</h3>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/DEV-DIBSTER"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="GitHub"
                >
                  <SiGithub className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com/DEV_DIBSTER"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="Twitter"
                >
                  <SiX className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-muted-foreground" />
              <CardTitle>PGP Keys</CardTitle>
            </div>
            <CardDescription>
              Use these public keys to send me encrypted messages or verify
              signed releases.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {pgpKeys.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No PGP keys published yet.
              </p>
            ) : (
              pgpKeys.map((entry, index) => (
                <div key={entry.id} className="space-y-6">
                  <PgpKeyBlock entry={entry} />
                  {index < pgpKeys.length - 1 ? (
                    <div className="border-t" />
                  ) : null}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
