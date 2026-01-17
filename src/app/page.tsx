"use client";

import React from "react";
import Carousel from "../components/home/Carousel";
import Card1 from "../components/home/Card1";
import Card2 from "../components/home/Card2";
import ReachOut from "../components/home/ReachOut";

import FrameCard from "../components/home/FrameCard";

import img1 from "../assets/caro1.jpeg";
import img2 from "../assets/caro2.jpeg";
import img3 from "../assets/caro4.jpeg";
import img4 from "../assets/caro3.jpeg";
import img5 from "../assets/caro5.png";
import fra from "../assets/fra.png";

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
    {
      src: img5.src,
      text: "Cherish the\nUnforgettable Moments",
      subText: "Photography that tells your story",
    },
  ];

  return (
    <>
      <Carousel slides={slides} autoPlay autoPlayInterval={6000} />
      <Card1 />
      <Card2 />
      <FrameCard
        heading="Frames"
        subHeading="Showcase your memories beautifully"
        title="Custom Photo Frames & Wall Frames"
        description="Choose from classic, coloured, designer, and premium wall frames — personalised, professionally printed, and delivered to your doorstep."
        image={fra}
      />
      <ReachOut />
    </>
  );
};

export default Page;
