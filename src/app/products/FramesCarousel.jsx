'use client'

import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import f1 from "../../assets/f1.png";
import f2 from "../../assets/f2.png";
import f3 from "../../assets/f3.png";

const FRAME_ITEMS = [
  { id: 1, frameUrl: f1 },
  { id: 2, frameUrl: f2 },
  { id: 3, frameUrl: f3 },
  { id: 4, frameUrl: f1 },
  { id: 5, frameUrl: f2 },
  { id: 6, frameUrl: f3 },
];

const FrameCarousel = () => {
  const [backgroundPhoto, setBackgroundPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [uploadError, setUploadError] = useState('');
  
  const carouselRef = useRef(null);
  const fileInputRef = useRef(null);
  const x = useMotionValue(0);
  const dragX = useSpring(x, { stiffness: 300, damping: 30 });
  
  // Fixed sizes for consistency
  const itemWidth = 200; // Increased for better visibility
  const spacing = 24;
  const frameAspectRatio = '3/4'; // Fixed 3:4 portrait ratio

  const handlePhotoUpload = (e) => {
    setUploadError('');
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size should be less than 10MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setBackgroundPhoto(e.target.result);
      }
    };
    reader.onerror = () => {
      setUploadError('Error reading file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setDragStartX(clientX - x.get());
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const newX = clientX - dragStartX;
    x.set(newX);
    
    const rawIndex = Math.round(-newX / (itemWidth + spacing));
    const index = ((rawIndex % FRAME_ITEMS.length) + FRAME_ITEMS.length) % FRAME_ITEMS.length;
    if (index !== selectedIndex) setSelectedIndex(index);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const currentX = x.get();
    const nearestIndex = Math.round(-currentX / (itemWidth + spacing));
    const clampedIndex = ((nearestIndex % FRAME_ITEMS.length) + FRAME_ITEMS.length) % FRAME_ITEMS.length;
    const targetX = -clampedIndex * (itemWidth + spacing);
    
    animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
    setSelectedIndex(clampedIndex);
  };

  const handleMouseDown = (e) => handleDragStart(e.clientX);
  const handleMouseMove = (e) => handleDragMove(e.clientX);
  const handleMouseUp = () => handleDragEnd();
  
  const handleTouchStart = (e) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e) => handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleDragEnd();

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const extendedFrames = useMemo(() => [...FRAME_ITEMS, ...FRAME_ITEMS, ...FRAME_ITEMS], []);

  const getRotation = (index) => {
    const position = index * (itemWidth + spacing) + x.get();
    const center = (carouselRef.current?.offsetWidth || 0) / 2;
    const distanceFromCenter = (position + itemWidth / 2) - center;
    const maxDistance = (carouselRef.current?.offsetWidth || 800) / 2;
    return (distanceFromCenter / maxDistance) * 10;
  };

  // Handle click on upload button
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Reset uploaded photo
  const handleResetPhoto = () => {
    setBackgroundPhoto(null);
    setUploadError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Frame Carousel</h1>
          <p className="text-gray-600 text-lg">Upload your photo and see it in different portrait frames</p>
        </div>

        {/* Upload Section - ALWAYS VISIBLE */}
        <div className="mb-10 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="flex flex-col items-center justify-center gap-6">
            {!backgroundPhoto ? (
              <>
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-blue-50 rounded-full">
                    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Photo</h2>
                  <p className="text-gray-500">Add your photo to see how it looks in different frames</p>
                </div>
                
                {/* Upload Button */}
                <button
                  onClick={handleUploadClick}
                  className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-xl transition-all duration-200 inline-flex items-center gap-3 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Select Photo from Computer
                </button>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                
                {/* Upload Instructions */}
                <div className="text-center mt-4">
                  <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Supported: JPG, PNG, GIF, WEBP • Max size: 10MB</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Your Uploaded Photo</h2>
                  <div className="flex gap-3">
                    <button
                      onClick={handleUploadClick}
                      className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Change Photo
                    </button>
                    
                    <button
                      onClick={handleResetPhoto}
                      className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
                
                {/* Photo Preview */}
                <div className="relative mx-auto max-w-md">
                  <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={backgroundPhoto}
                      alt="Your uploaded photo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {uploadError && (
              <div className="mt-4 w-full max-w-md p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-600 text-sm">{uploadError}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Preview - 3:4 Portrait Frame */}
        <div className="mb-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Frame Preview</h2>
            <p className="text-gray-600">See how your photo looks in the selected frame</p>
          </div>
          
          <div className="relative w-full max-w-sm mx-auto">
            {backgroundPhoto ? (
              <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-2xl">
                {/* Background Photo - fits inside frame */}
                <div className="absolute inset-10 bg-white rounded-lg overflow-hidden shadow-inner">
                  <img
                    src={backgroundPhoto}
                    alt="Your photo in frame"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Frame Overlay - on top of photo */}
                <img
                  src={FRAME_ITEMS[selectedIndex].frameUrl?.src || FRAME_ITEMS[selectedIndex].frameUrl}
                  alt="Frame"
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))' }}
                />
              </div>
            ) : (
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex flex-col items-center justify-center p-8 shadow-lg">
                <div className="text-center">
                  <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-lg font-medium">No photo uploaded yet</p>
                  <p className="text-gray-400 mt-2">Upload a photo above to see it here</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Selected Frame Info */}
          {backgroundPhoto && (
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="text-sm font-medium">
                  Frame {selectedIndex + 1} of {FRAME_ITEMS.length}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Frame Carousel - All 3:4 Portrait Frames */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse Frames</h2>
            <p className="text-gray-600">Drag or click to select different portrait frames</p>
          </div>
          
          {/* Carousel Container */}
          <div className="relative">
            <div 
              ref={carouselRef}
              className="relative overflow-visible h-56"
            >
              <div
                className="relative cursor-grab active:cursor-grabbing h-full"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: 'none' }}
              >
                <motion.div
                  style={{ x: dragX, display: 'flex', gap: `${spacing}px` }}
                  className="flex items-center h-full px-8"
                >
                  {extendedFrames.map((frame, index) => (
                    <motion.div
                      key={`${frame.id}-${index}`}
                      className="flex-shrink-0 relative"
                      style={{
                        width: itemWidth,
                        rotateY: getRotation(index),
                        perspective: 1000,
                      }}
                      animate={{
                        scale: index === selectedIndex + FRAME_ITEMS.length ? 1.05 : 0.95,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      onClick={() => {
                        const actualIndex = index % FRAME_ITEMS.length;
                        setSelectedIndex(actualIndex);
                        const targetX = -actualIndex * (itemWidth + spacing);
                        animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
                      }}
                    >
                      <div className={`relative rounded-xl overflow-hidden border-4 transition-all duration-200 ${
                        index === selectedIndex + FRAME_ITEMS.length
                          ? 'border-blue-500 shadow-2xl scale-105'
                          : 'border-gray-200 shadow-lg'
                      }`}>
                        {/* Frame preview with fixed 3:4 aspect ratio */}
                        <div className="relative" style={{ aspectRatio: frameAspectRatio }}>
                          <img
                            src={frame.frameUrl?.src || frame.frameUrl}
                            alt={`Frame ${frame.id}`}
                            className="absolute inset-0 w-full h-full object-contain bg-gray-50"
                          />
                        </div>
                      </div>
                      
                      {/* Selection indicator */}
                      {index === selectedIndex + FRAME_ITEMS.length && (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
                            <span className="text-xs font-medium text-blue-600">Selected</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-3">
              {FRAME_ITEMS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedIndex(index);
                    const targetX = -index * (itemWidth + spacing);
                    animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === index
                      ? 'w-8 bg-blue-500'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to frame ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center mt-8 pt-6 border-t border-gray-100">
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
              <span>Drag to browse • Click to select • All frames are 3:4 portrait ratio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameCarousel;