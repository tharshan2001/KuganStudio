"use client";

import React from "react";
import MediaCard from "./MediaCard";
import c1 from "../../assets/c1.png";
import c2 from "../../assets/c2.png";
import c3 from "../../assets/c3.png";

const Card2 = () => {
  const mediaItems = [
    {
      src: c1.src,
      type: "image",
      colSpan: "col-span-1",
      rounded: "rounded-lg",
      alt: "Image 1",
    },
    {
      src: "/videos/vd1.mp4",
      type: "video",
      colSpan: "col-span-2",
      rounded: "rounded-lg",
    },
    {
      src: "/videos/vd2.mp4",
      type: "video",
      colSpan: "col-span-3",
      rounded: "rounded-lg",
    },
    {
      src: c2.src,
      type: "image",
      colSpan: "col-span-1",
      rounded: "rounded-lg",
      alt: "Image 2",
    },
  ];

  return (
    <MediaCard
      heading="Media Showcase"
      subHeading="A mix of images and videos in one beautiful grid"
      titleTop="Top Title"
      labelOne="Label One"
      labelTwo="Label Two"
      titleBottom="Bottom Title"
      description="This section displays image
      s and videos using the reusable MediaCard component his section displays images and videos using the reusable MediaCard component his section displays images and videos using the reusable MediaCard 
      component his section displays images and videos using the reusable MediaCard component his section displays images and videos using the reusable MediaCard component."
      images={mediaItems}
    />
  );
};

export default Card2;
