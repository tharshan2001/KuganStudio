"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

// Helper to convert a string to camelCase
const toCamelCase = (str) => {
  return str
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
};

const WritingText = React.forwardRef(
  (
    {
      text = "",          // Main text (can be multi-line array)
      subText = "",       // Sub phrase / subtitle
      className = "",
      spacing = 5,

      // Timing controls
      startDelay = 1.5,
      wordDelay = 0.15,
      subDelay = 0.5,     // delay for subText

      transition = {
        type: "spring",
        bounce: 0,
        duration: 1.4,
      },

      inView = false,
      inViewMargin = "0px",
      inViewOnce = true,
      ...props
    },
    ref
  ) => {
    const localRef = React.useRef(null);
    React.useImperativeHandle(ref, () => localRef.current);

    const inViewResult = useInView(localRef, {
      once: inViewOnce,
      margin: inViewMargin,
    });

    const isInView = !inView || inViewResult;

    // Support multi-line: split by "\n"
    const lines = React.useMemo(() => text.toUpperCase().split("\n"), [text]);

    return (
      <div
        ref={localRef}
        className={`uppercase font-elegant ${className} flex flex-col items-center`}
        {...props}
      >
        {/* Main text stays uppercase */}
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block text-center">
            {line.split(" ").map((word, index) => (
              <motion.span
                key={index}
                className="inline-block will-change-transform will-change-opacity"
                style={{ marginRight: spacing }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  ...transition,
                  delay: startDelay + index * wordDelay + lineIndex * 0.2,
                }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </span>
        ))}

        {/* Sub text in camelCase */}
        {subText && (
          <span className="block text-center mt-4 text-lg md:text-2xl opacity-90 normal-case">
            {subText.split(" ").map((word, index) => (
              <motion.span
                key={index}
                className="inline-block will-change-transform will-change-opacity"
                style={{ marginRight: spacing }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  ...transition,
                  delay:
                    startDelay +
                    lines.join(" ").split(" ").length * wordDelay +
                    subDelay +
                    index * wordDelay,
                }}
              >
                {toCamelCase(word)}&nbsp;
              </motion.span>
            ))}
          </span>
        )}
      </div>
    );
  }
);

WritingText.displayName = "WritingText";

export { WritingText };
