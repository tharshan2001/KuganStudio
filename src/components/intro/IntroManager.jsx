"use client";

import { useEffect, useState } from "react";
import Intro from "./Intro";

export default function IntroManager({ children }) {
  const [showIntro, setShowIntro] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    const lastSeen = localStorage.getItem("seenIntro");
    const now = Date.now();

    // Show intro if never seen or 24 hours have passed
    if (!lastSeen || now - Number(lastSeen) > 24 * 60 * 60 * 1000) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroFinish = () => {
    localStorage.setItem("seenIntro", Date.now().toString());
    setShowIntro(false);
  };

  if (!hydrated) return null;

  return (
    <>
      {/* Intro overlay */}
      {showIntro && <Intro onFinish={handleIntroFinish} />}

      {/* Main page content */}
      {children}
    </>
  );
}
