"use client"

import createGlobe from "cobe";
import { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils"

const DARK_MODE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor: [87 / 255, 88 / 255, 87 / 255],
  markers: [
    { location: [39.9625, -83.0032], size: 0.05 }, // Columbus, Ohio
    { location: [43.651070, -79.347015], size: 0.05 }, // Toronto, Canada
    { location: [53.546124, -113.493823], size: 0.05 }, // Edmonton, Canada
    { location: [23.810331, 90.412521], size: 0.05 } // Dhaka, Bangladesh
  ],
}

const LIGHT_MODE_CONFIG = {
  ...DARK_MODE_CONFIG,
  dark: 0,
  baseColor: [1, 1, 1],  // Black dots/blocks
  glowColor: [220 / 255, 220 / 255, 220 / 255],  // Black glow
  markerColor: [1 / 255, 1 / 255, 1 / 255], // Neon blue locations
}

export function Globe({
  className,
  config
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const onRender = useCallback((state) => {
    if (!pointerInteracting.current) phi += 0.005
    state.phi = phi + r
    state.width = width * 2
    state.height = width * 2
  }, [r])

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    if (!mounted) return;
    
    window.addEventListener("resize", onResize)
    onResize()

    const themeConfig = theme === 'light' ? LIGHT_MODE_CONFIG : DARK_MODE_CONFIG;
    const finalConfig = config ? { ...themeConfig, ...config } : themeConfig;

    const globe = createGlobe(canvasRef.current, {
      ...finalConfig,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    setTimeout(() => (canvasRef.current.style.opacity = "1"))
    return () => globe.destroy();
  }, [theme, mounted, config, onRender])

  if (!mounted) return null;

  return (
    <div
      className={cn("absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]", className)}>
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        } />
    </div>
  );
}
