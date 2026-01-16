"use client";

import Link from "next/link";

export default function FrameCard({ frame }) {
  if (!frame) return null;

  const {
    name,
    slug,
    images = [],
    pricing = {},
    brand,
    availability = {},
  } = frame;

  // Calculate discount percentage
  const discountPercent = 
    pricing.currentPrice && pricing.discountPrice
      ? Math.round(((pricing.currentPrice - pricing.discountPrice) / pricing.currentPrice) * 100)
      : null;

  return (
    <Link
      href={`/frames/${slug}`}
      className="group block w-full bg-white"
    >
      {/* 1. IMAGE SECTION (Overlapping Frames) */}
      <div className="relative aspect-[1.4/1] w-full flex items-center justify-center overflow-hidden">
        {/* Background Frame (Larger) */}
        <div className="relative z-10 w-[55%] h-[70%] transition-transform duration-500 group-hover:scale-105">
          <img
            src={images[0] || "/placeholder-frame.jpg"}
            alt={name}
            className="w-full h-full object-cover shadow-sm border-[5px] border-white"
          />
        </div>
        
        {/* Foreground Frame (Smaller - Overlapping bottom right) */}
        <div className="absolute z-20 bottom-4 right-4 w-[45%] h-[55%] transition-transform duration-500 group-hover:translate-x-1">
          <img
            src={images[1] || images[0] || "/placeholder-frame.jpg"}
            alt={`${name} perspective`}
            className="w-full h-full object-cover shadow-lg border-[4px] border-white"
          />
        </div>
      </div>

      {/* 2. TEXT SECTION (Divider and Pricing) */}
      <div className="mt-2 pt-4 border-t border-gray-200">
        <h3 className="text-[15px] font-medium text-[#222] mb-1 truncate">
          {name}
        </h3>
        
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Label */}
          <span className="text-[13px] text-gray-500">From</span>
          
          {/* Current/Discounted Price */}
          <span className="text-[15px] font-bold text-black">
            Rs. {pricing.discountPrice || pricing.currentPrice}
          </span>
          
          {/* Original Price (Strike-through) */}
          {pricing.discountPrice && (
            <span className="text-[13px] text-gray-400 line-through">
              {pricing.currentPrice}
            </span>
          )}

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <span className="ml-1 text-[12px] bg-[#fff1e0] text-[#f57c00] px-1.5 py-0.5 rounded font-bold">
              {discountPercent}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}