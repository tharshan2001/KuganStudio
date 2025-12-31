"use client";

import React, { useEffect, useRef, useState } from "react";

const Carousel = ({ slides, autoPlay = true, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // start at 1 because of clone
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragDiff, setDragDiff] = useState(0);

  const slideRef = useRef(null);
  const timeoutRef = useRef(null);

  const totalSlides = slides.length;
  const extendedSlides = [slides[totalSlides - 1], ...slides, slides[0]]; // clone last & first

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
    setIsTransitioning(true);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    timeoutRef.current = setTimeout(nextSlide, autoPlayInterval);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, autoPlay, autoPlayInterval]);

  // Looping logic
  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalSlides);
    } else if (currentIndex === totalSlides + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  // Drag / Swipe handlers
  const handleDragStart = (e) => {
    setDragStartX(e.type === "touchstart" ? e.touches[0].clientX : e.clientX);
    setIsTransitioning(false);
  };

  const handleDragMove = (e) => {
    if (dragStartX === null) return;
    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    setDragDiff(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (dragDiff > 50) {
      prevSlide();
    } else if (dragDiff < -50) {
      nextSlide();
    } else {
      setIsTransitioning(true);
    }
    setDragStartX(null);
    setDragDiff(0);
  };

  return (
    <div
      className="relative w-full h-[700px] overflow-hidden"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div
        className={`flex ${isTransitioning ? "transition-transform duration-700" : ""}`}
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${dragDiff}px))`,
        }}
        onTransitionEnd={handleTransitionEnd}
        ref={slideRef}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 relative"
            style={{ height: "100vh" }}
          >
            <img
              src={slide}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            {/* Vignette overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.2)_0%,_rgba(0,0,0,0.5)_70%,_rgba(0,0,0,0.7)_100%)]"></div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute inset-y-0 left-0 flex items-center justify-center w-12 text-white hover:bg-black/20 rounded-l-lg z-10"
      >
        <span className="text-2xl">&larr;</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-white hover:bg-black/20 rounded-r-lg z-10"
      >
        <span className="text-2xl">&rarr;</span>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index + 1)}
            className={`w-3 h-3 rounded-full border border-white ${
              currentIndex === index + 1 ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
