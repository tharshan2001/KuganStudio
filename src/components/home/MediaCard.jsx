"use client";

import React from "react";

const MediaCard = ({
  heading,
  subHeading,
  titleTop,
  labelOne,
  labelTwo,
  titleBottom,
  description,
  images,
}) => {
  return (
    <section className="max-w-6xl mx-auto py-8 md:py-16 px-4 md:px-8">
      {/* HEADER - Left aligned */}
      <div className="mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-medium text-gray-800 max-w-2xl">
          {heading}
        </h2>
        <p className="mt-3 text-base md:text-lg text-gray-500 max-w-xl">
          {subHeading}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 md:gap-10">
        {/* IMAGE GRID - Asymmetrical stack */}
        <div className="w-full lg:w-3/5">
          <div className="grid grid-cols-5 grid-rows-6 gap-3 md:gap-4 h-[500px] md:h-[600px]">
            
            {/* Large left column */}
            <div className="col-span-3 row-span-4 rounded-lg overflow-hidden">
              <img
                src={images[0].src}
                alt={images[0].alt || "image"}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Top right small */}
            <div className="col-span-2 row-span-2 col-start-4 rounded-lg overflow-hidden">
              <video
                src={images[1].src}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>

            {/* Bottom right tall */}
            <div className="col-span-2 row-span-4 col-start-4 row-start-3 rounded-lg overflow-hidden">
              <img
                src={images[3].src}
                alt={images[3].alt || "image"}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Wide bottom */}
            <div className="col-span-3 row-span-2 row-start-5 rounded-lg overflow-hidden">
              <video
                src={images[2].src}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>

          </div>
        </div>

        {/* TEXT CONTENT - Right sidebar */}
        <div className="w-full lg:w-2/5">
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl md:text-5xl text-gray-700 font-light leading-tight">
                {titleTop}
              </h1>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <h2 className="text-xl md:text-2xl text-gray-600">
                  {labelOne}
                </h2>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <h2 className="text-xl md:text-2xl text-gray-600">
                  {labelTwo}
                </h2>
              </div>
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl text-gray-700 font-light">
                {titleBottom}
              </h1>
            </div>

            <div className="pt-1">
              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaCard;