"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function PgpKeyBlock({ entry }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(entry.publicKey);
      setCopied(true);
      toast({
        title: "Public key copied",
        description: `${entry.label} PGP key copied to clipboard.`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Couldn't copy key",
        description: "Your browser blocked clipboard access.",
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{entry.label}</h3>
          {entry.email ? (
            <Badge variant="secondary" className="font-normal">
              {entry.email}
            </Badge>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCopy}
            aria-label={`Copy ${entry.label} public key`}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button asChild size="sm" variant="outline">
            <a
              href={entry.downloadUrl}
              download={entry.fileName}
              aria-label={`Download ${entry.label} public key`}
            >
              <Download className="h-4 w-4" />
              .asc
            </a>
          </Button>
        </div>
      </div>

      <pre className="rounded-md border bg-muted/40 p-3 text-xs leading-relaxed font-mono whitespace-pre-wrap break-all">
        {entry.publicKey}
      </pre>
    </div>
  );
}
