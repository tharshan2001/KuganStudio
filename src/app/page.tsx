"use client";

import React from "react";
import Header from "../components/Header";
import Carousel from "../components/home/Carousel";
import Card1 from "../components/home/Card1";
import Card2 from "../components/home/Card2";

import img1 from "../assets/caro1.jpeg";
import img2 from "../assets/caro2.jpeg";
import img3 from "../assets/caro4.jpeg";
import img4 from "../assets/caro3.jpeg";

const Page = () => {
const slides = [
  {
    src: img1.src,
    text: "Trust by Many,\nLoved by All",
    subText: "Moments that last forever",
  },
  {
    src: img2.src,
    text: "Grand Celebration\nIntimate Vows",
    subText: "Every memory beautifully captured",
  },
  {
    src: img3.src,
    text: "Joy in Every\nCaptured Frame",
    subText: "Celebrate life through our lens",
  },
  {
    src: img4.src,
    text: "Cherish the\nUnforgettable Moments",
    subText: "Photography that tells your story",
  },
];



  return (
    <div className="top-0">
      <Header />
      <Carousel slides={slides} autoPlay autoPlayInterval={6000} />
      <Card1 />
      <Card2 />
    </div>
  );
};

export default Page;
