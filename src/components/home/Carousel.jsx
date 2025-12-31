"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const Carousel = ({ slides, autoPlay = true, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState("next");
  
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  const totalSlides = slides.length;

  // Helper function to get the actual image source
  const getImageSrc = (slide) => {
    if (typeof slide === 'string') return slide;
    if (slide?.src) return slide.src;
    if (slide?.default) return slide.default;
    return slide;
  };

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

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    
    const newDirection = index > currentIndex ? "next" : "prev";
    setDirection(newDirection);
    setIsTransitioning(true);
    setPreviousIndex(currentIndex);
    setCurrentIndex(index);
  }, [currentIndex, isTransitioning]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isTransitioning) return;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, autoPlay, autoPlayInterval, nextSlide, isTransitioning]);

  // Handle transition end
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Match transition duration

    return () => clearTimeout(timer);
  }, [isTransitioning]);

  // Preload next and previous images
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % totalSlides;
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    
    const preloadImage = (index) => {
      const img = new Image();
      img.src = getImageSrc(slides[index]);
    };
    
    preloadImage(nextIndex);
    preloadImage(prevIndex);
  }, [currentIndex, slides, totalSlides]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Background color to prevent white flashes */}
      <div className="absolute inset-0 bg-black z-0" />
      
      {/* All slides for cross-fade */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        const wasActive = index === previousIndex;
        const isTransitioningOut = isTransitioning && wasActive;
        const isTransitioningIn = isTransitioning && isActive;

        let opacity = 0;
        let zIndex = 0;
        let scale = 1;

        if (isActive) {
          opacity = isTransitioningIn ? 1 : 1;
          zIndex = 30;
          scale = isTransitioningIn ? 1.05 : 1;
        } else if (isTransitioningOut) {
          opacity = 0;
          zIndex = 20;
          scale = direction === "next" ? 0.95 : 1.05;
        } else {
          opacity = 0;
          zIndex = 10;
        }

        return (
          <div
            key={`slide-${index}`}
            className="absolute inset-0 w-full h-full"
            style={{
              zIndex,
              opacity,
              transform: `scale(${scale})`,
              transition: "opacity 700ms cubic-bezier(0.4, 0, 0.2, 1), transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
              willChange: "opacity, transform"
            }}
          >
            <img
              src={getImageSrc(slide)}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index <= 1 ? "eager" : "lazy"}
              onError={(e) => {
                console.error(`Failed to load image: ${getImageSrc(slide)}`);
                e.target.style.opacity = '0';
              }}
              onLoad={(e) => {
                e.target.style.opacity = '1';
              }}
              style={{
                transition: 'opacity 300ms ease-in-out'
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
          </div>
        );
      })}

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none z-40">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 z-40">
        {slides.map((_, index) => {
          const isActive = index === currentIndex;
          
          return (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`pointer-events-auto h-2 rounded-full transition-all duration-500 ease-out ${
                isActive ? "bg-white w-8" : "bg-white/40 w-2 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;