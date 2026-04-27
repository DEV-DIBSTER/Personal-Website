"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectImage({ src, alt }) {
  const [errored, setErrored] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setErrored(false);
  }, [src]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth === 0) {
      setErrored(true);
    }
  }, [src]);

  if (!src || errored) {
    return <ProjectImageSkeleton />;
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-muted flex items-center justify-center">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="object-contain h-full w-full p-4"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

function ProjectImageSkeleton() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-muted flex items-center justify-center">
      <Skeleton className="h-full w-full rounded-none" />
      <div className="absolute inset-0 flex items-center justify-center">
        <ImageIcon
          className="h-10 w-10 text-muted-foreground/50"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
