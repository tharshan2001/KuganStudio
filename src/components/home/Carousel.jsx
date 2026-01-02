"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { WritingText } from "../../components/home/WritingText";
import { motion } from "framer-motion";

// Helper to convert a string to camelCase
const toPascalCase = (str) => {
  return str
    .split(" ")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
};


const Carousel = ({ slides, autoPlay = true, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState("next");

  const timeoutRef = useRef(null);
  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setDirection("next");
    setIsTransitioning(true);
    setPreviousIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [currentIndex, totalSlides, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setDirection("prev");
    setIsTransitioning(true);
    setPreviousIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [currentIndex, totalSlides, isTransitioning]);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning || index === currentIndex) return;
      setDirection(index > currentIndex ? "next" : "prev");
      setIsTransitioning(true);
      setPreviousIndex(currentIndex);
      setCurrentIndex(index);
    },
    [currentIndex, isTransitioning]
  );

  // Auto play
  useEffect(() => {
    if (!autoPlay || isTransitioning) return;
    timeoutRef.current = setTimeout(nextSlide, autoPlayInterval);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, autoPlay, autoPlayInterval, nextSlide, isTransitioning]);

  // End transition
  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(() => setIsTransitioning(false), 700);
    return () => clearTimeout(timer);
  }, [isTransitioning]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        const wasActive = index === previousIndex;

        let opacity = 0;
        let zIndex = 0;
        let scale = 1;

        if (isActive) {
          opacity = 1;
          zIndex = 30;
          scale = 1.05;
        } else if (wasActive) {
          opacity = 0;
          zIndex = 20;
          scale = direction === "next" ? 0.95 : 1.05;
        }

        return (
          <div
            key={index}
            className="absolute inset-0 w-full h-full transition-all duration-700"
            style={{ opacity, zIndex, transform: `scale(${scale})` }}
          >
            {/* Image */}
            <img
              src={slide.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />

            {/* Text Container */}
            {isActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center top-20 z-40 px-6">
                {/* Main Text slides up */}
                <WritingText
                  text={slide.text}
                  className="text-white text-4xl md:text-5xl text-center tracking-[10px]"
                  spacing={14}
                  transition={{
                    duration: 1.8,
                    delay: 0.6,
                    type: "spring",
                    bounce: 0,
                  }}
                />

                {/* Subtext pops in below main text */}
                {slide.subText && (
                  <motion.span
                    className="text-white/70 text-lg md:text-1xl text-center mt-9 normal-case"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: "spring",
                      duration: 0.8,
                      bounce: 0.01,
                      delay: 0.4,
                    }}
                  >
                    {toPascalCase(slide.subText)}
                  </motion.span>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Navigation */}
      <div className="absolute inset-0 flex items-center justify-between px-6 z-50">
        <button onClick={prevSlide} className="text-white text-3xl">
          ‹
        </button>
        <button onClick={nextSlide} className="text-white text-3xl">
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-50">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-8" : "bg-white/40 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
