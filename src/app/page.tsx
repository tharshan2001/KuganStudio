"use client";

import React from "react";
import Header from "../components/Header";
import Carousel from "../components/home/Carousel";
import Card1 from "../components/home/Card1";
import Card2 from "../components/home/Card2";

import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";

const Page: React.FC = () => {
  const slides: string[] = [img1.src, img2.src, img3.src, img4.src];

  return (
    <div >
      <Header />

      <div className="mt-2">
        <Carousel slides={slides} autoPlay={true} autoPlayInterval={2000} />
      </div>

      <Card1 />
      <Card2 />
    </div>
  );
};

export default Page;
