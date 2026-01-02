"use client";

import { useEffect, useState } from "react";
import Intro from "./Intro";

export default function IntroWrapper({ children }) {
  const [showIntro, setShowIntro] = useState(false);
  const [hydrated, setHydrated] = useState(false); // important

  useEffect(() => {
    setHydrated(true); // ensures code runs client-side
    const seenIntro = localStorage.getItem("seenIntro");
    if (!seenIntro) {
      setShowIntro(true);
    }
  }, []);

  if (!hydrated) return null; // wait for client-side hydration

  return <>{showIntro ? <Intro onFinish={() => setShowIntro(false)} /> : children}</>;
}
