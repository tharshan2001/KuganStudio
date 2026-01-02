"use client";

import React from "react";

const FrameCard = ({ 
  heading, 
  subHeading, 
  title, 
  description, 
  image 
}) => {
  return (
    <section className="max-w-7xl mx-auto py-12 sm:px-6 md:px-12">
      {/* SECTION HEADER */}
      <div className="text-center mb-16">
        <h2 className="text-5xl  text-gray-700 tracking-tight">
          {heading}
        </h2>
        <p className="mt-4 text-xl text-gray-500 font-light">
          {subHeading}
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* LEFT TEXT BLOCK */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-5xl font-normal text-gray-600 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            {description}
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="lg:w-1/2 relative h-96 w-full overflow-hidden">
          <img
            src={image.src}
            alt={image.alt || "Frame Image"}
            className="absolute inset-0 h-full w-full object-full"
          />
        </div>
      </div>
    </section>
  );
};

export default FrameCard;
