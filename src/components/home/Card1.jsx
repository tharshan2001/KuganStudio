"use client";

import React from "react";
import BlogCard from "../home/BlogCard";

import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.jpeg";
import img4 from "../../assets/img4.jpeg";

const Card1 = () => {
  return (
    <BlogCard
      heading="Galleries"
      subHeading="Your Brand Deserves the Best"
      titleTop="Capture the Moment"
      labelOne="SNAP"
      labelTwo="SHOOT"
      titleBottom="Perfect Photography"
      description="Nullam tincidunt felis eget blandit aliquam. Nunc vel mollis lorem. Phasellus pharetra commodo ultricies. Mauris scelerisque elit sed arcu consectetur hendrerit et sit amet ligula."
      images={[
        { src: img1.src, alt: "fresh beets", colSpan: "col-span-3", rounded: "rounded-md" },
        { src: img3.src, alt: "asparagus", colSpan: "col-span-2 sm:col-span-1", rounded: "rounded-sm" },
        { src: img2.src, alt: "red veggies", colSpan: "col-span-4 sm:col-span-4", rounded: "rounded-lg" },
        { src: img4.src, alt: "carrots", colSpan: "col-span-4 sm:col-span-3", rounded: "rounded-md" },
        { src: img4.src, alt: "carrots", colSpan: "col-span-4 sm:col-span-1", rounded: "rounded-md" },
      ]}
    />
  );
};

export default Card1;
