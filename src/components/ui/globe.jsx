"use client"

import createGlobe from "cobe";
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    // Europe - bombings, politics, and battlegrounds
    { location: [52.5200, 13.4050], size: 0.05 }, // Berlin
    { location: [51.5074, -0.1278], size: 0.05 }, // London
    { location: [48.8566, 2.3522], size: 0.04 }, // Paris
    { location: [50.1109, 8.6821], size: 0.04 }, // Frankfurt
    { location: [41.9028, 12.4964], size: 0.04 }, // Rome
    { location: [55.7558, 37.6173], size: 0.05 }, // Moscow
    { location: [52.2297, 21.0122], size: 0.04 }, // Warsaw
    { location: [47.4979, 19.0402], size: 0.04 }, // Budapest
  
    // North America - military & atomic program
    { location: [40.7128, -74.0060], size: 0.05 }, // New York
    { location: [34.0522, -118.2437], size: 0.04 }, // Los Angeles
    { location: [35.6870, -105.9378], size: 0.03 }, // Los Alamos
    { location: [41.8781, -87.6298], size: 0.04 }, // Chicago
    { location: [36.1627, -86.7816], size: 0.03 }, // Oak Ridge
  
    // Asia - bombings, occupation, resistance
    { location: [35.6895, 139.6917], size: 0.04 }, // Tokyo
    { location: [34.3853, 132.4553], size: 0.03 }, // Hiroshima
    { location: [32.7503, 129.8777], size: 0.03 }, // Nagasaki
    { location: [31.2304, 121.4737], size: 0.04 }, // Shanghai
    { location: [14.5995, 120.9842], size: 0.03 }, // Manila
    { location: [21.0285, 105.8542], size: 0.02 }, // Hanoi
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)

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
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    setTimeout(() => (canvasRef.current.style.opacity = "1"))
    return () => globe.destroy();
  }, [])

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
