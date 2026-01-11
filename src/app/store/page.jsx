"use client";

import React from "react";
import FrameCarousel from "./FramesCarousel";
import ProductHero from "../../components/product/ProductHero";

const page = () => {
  return (
    <div className="fl">

      <ProductHero/>

      <FrameCarousel/>
    </div>
  );
};

export default page;
