import React from 'react';
import { motion } from 'framer-motion';

// A more modern, refined page transition with a subtle blur and faster response
const transitionVariants = {
  initial: {
    opacity: 0,
    y: 15, // A smaller, more subtle vertical shift
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    y: -15, // Exit in the opposite direction for a smoother feel
    filter: 'blur(4px)',
  },
};

export const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={transitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // A faster, more responsive cubic-bezier for a modern feel
      transition={{ 
        duration: 0.5, 
        ease: [0.43, 0.13, 0.23, 0.96] // A common modern easing curve
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};