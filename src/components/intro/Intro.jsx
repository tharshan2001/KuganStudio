"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LightRays from "./LightRays";
import logoW from "../../../public/logoW.png";

export default function Intro({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showText, setShowText] = useState(false);
  const [particleIntensity, setParticleIntensity] = useState(1);
  const containerRef = useRef(null);

  // Intro animation sequence
  useEffect(() => {
    const sequence = [
      { action: () => setShowSubtitle(true), delay: 1500 },
      { action: () => setShowLogo(true), delay: 2000 },
      { action: () => setShowText(true), delay: 2800 },
      { action: () => setParticleIntensity(2), delay: 3000 },
      {
        action: () => {
          setFadeOut(true);
          setParticleIntensity(0.5);

          // Keep logo/text visible while fading, then finish
          setTimeout(() => {
            onFinish(); // call finish after fade completes
          }, 1200); // fade duration
        },
        delay: 5000,
      },
    ];

    const timers = sequence.map(({ action, delay }) =>
      setTimeout(action, delay)
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, [onFinish]);

  // Mouse tracking
  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x =
        ((e.clientX || e.touches?.[0]?.clientX) - rect.left) / rect.width;
      const y =
        ((e.clientY || e.touches?.[0]?.clientY) - rect.top) / rect.height;

      containerRef.current.style.setProperty("--mouse-x", x);
      containerRef.current.style.setProperty("--mouse-y", y);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        "--mouse-x": 0.5,
        "--mouse-y": 0.5,
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {/* Black overlay for fade */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0, 40, 60, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
      />

      {/* Light rays */}
      <LightRays
        raysOrigin={`${
          (1 -
            (Number(containerRef.current?.style.getPropertyValue("--mouse-x")) ||
              0.5)) *
          100
        }% ${(Number(containerRef.current?.style.getPropertyValue("--mouse-y")) || 0.5) * 100}%`}
        raysColor="rgba(255, 255, 255, 0.8)"
        raysSpeed={fadeOut ? 0.5 : 2}
        lightSpread={fadeOut ? 0.3 : 1}
        rayLength={fadeOut ? 0.7 : 1.5}
        followMouse
        mouseInfluence={0.15}
        noiseAmount={0.2}
        className="absolute inset-0 transition-all duration-1000"
      />

      {/* Content */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Subtitle */}
        <AnimatePresence>
          {showSubtitle && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: fadeOut ? 0 : 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-cyan-200/80 text-lg md:text-xl font-light tracking-widest"
            >
              EST. 1949
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logo */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: fadeOut ? 0 : 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <Image
                  src={logoW}
                  alt="Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text */}
        {/* <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: fadeOut ? 0 : 1, y: 0 }}
              transition={{ duration: 1 }}
              className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-white font-bold text-4xl md:text-6xl lg:text-7xl flex gap-4 justify-center flex-wrap"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
                75 years of
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-white">
                Excellence
              </span>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>
    </div>
  );
}
