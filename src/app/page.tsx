"use client";

import React from "react";
import Header from "../components/Header";
import Carousel from "../components/home/Carousel";
import Card1 from "../components/home/Card1";
import Card2 from "../components/home/Card2";

import img1 from "../assets/caro1.jpeg";
import img2 from "../assets/caro2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/caro4.jpeg";


const Page: React.FC = () => {
  const slides: string[] = [img1.src, img2.src, img5.src, img4.src];

  return (
    <div className="top-0">
      <Header />

        <Carousel slides={slides} autoPlay={true} autoPlayInterval={3000} />

      <Card1 />
      <Card2 />
    </div>
  );
};

export default Page;
