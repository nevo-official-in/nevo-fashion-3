import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Cursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check for touch device once on mount
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);

    if (!hasTouch) {
      // Add class to hide default cursor only on non-touch devices
      document.body.classList.add('no-cursor');

      const moveMouse = (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      const handleHoverStart = (e) => {
        if (e.target.matches('a, button, [data-hover]')) {
          setIsHovered(true);
        }
      };

      const handleHoverEnd = (e) => {
        if (e.target.matches('a, button, [data-hover]')) {
          setIsHovered(false);
        }
      };

      window.addEventListener("mousemove", moveMouse);
      window.addEventListener("mouseover", handleHoverStart);
      window.addEventListener("mouseout", handleHoverEnd);

      return () => {
        // Clean up listeners and class
        window.removeEventListener("mousemove", moveMouse);
        window.removeEventListener("mouseover", handleHoverStart);
        window.removeEventListener("mouseout", handleHoverEnd);
        document.body.classList.remove('no-cursor');
      };
    }
  }, [mouseX, mouseY]);

  // Don't render the custom cursor on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        scale: isHovered ? 4 : 1, // Hover par 4 guna bada
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
};