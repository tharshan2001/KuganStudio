"use client";

import { useEffect, useState } from "react";
import LightRays from "./LightRays";

export default function Intro({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const totalDuration = 5000; // 5s display
    const timer = setTimeout(() => {
      setFadeOut(true); // start fade-out
      setTimeout(() => {
        onFinish();
      }, 1000); // fade-out duration
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: 9999,
        pointerEvents: "none",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1s ease",
        transform: fadeOut ? "scale(1.1)" : "scale(1)",
        transitionProperty: "opacity, transform",
        transitionDuration: "1s",
        backgroundColor: "#000", // black background
      }}
    >
      {/* LightRays background only */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="absolute inset-0"
      />
    </div>
  );
}
