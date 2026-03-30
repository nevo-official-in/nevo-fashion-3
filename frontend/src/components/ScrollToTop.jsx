import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAssembled, setIsAssembled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Faster visibility check
    const checkVisibility = () => {
      setIsVisible(window.pageYOffset > 50);
    };
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);

  const handleClick = () => {
    setIsAssembled(true);
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsAssembled(false), 800);
    }, isMobile ? 100 : 0);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsAssembled(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsAssembled(false);
    }
  };

  // FIXED: Stable scattered animation - less movement
  const lineVariants = {
    scattered: {
      pathLength: [0, 1, 0],
      opacity: [0.4, 0.7, 0.4],
      x: [0, 0, 0], // REMOVED random X movement
      y: [0, 0, 0], // REMOVED random Y movement
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      },
    },
    assembled: {
      pathLength: 1,
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          // FIXED: Moved more left (right-16 instead of right-6)
          className="fixed bottom-4 md:bottom-6 right-4 md:right-16 z-50"
          style={{ WebkitTapHighlightColor: 'transparent', cursor: 'pointer' }}
        >
          <div className="relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center">
            {/* ROTATING AURA */}
            <motion.div
              className="absolute inset-0"
              animate={{ 
                rotate: isAssembled ? 0 : 360,
              }}
              transition={{ 
                duration: isAssembled ? 0.25 : 8,
                repeat: isAssembled ? 0 : Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/40 via-red-600/20 to-transparent blur-sm" />
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-red-600/30 via-transparent to-red-600/10 blur-md" />
              <div className="absolute inset-2 rounded-full bg-red-600/20 blur-lg" />
            </motion.div>

            {/* Pulsing Aura */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={isAssembled ? {
                boxShadow: '0 0 35px 10px rgba(220, 38, 38, 0.6)',
                scale: 1.15,
              } : {
                boxShadow: [
                  '0 0 18px 4px rgba(220, 38, 38, 0.3)',
                  '0 0 35px 9px rgba(220, 38, 38, 0.5)',
                  '0 0 18px 4px rgba(220, 38, 38, 0.3)',
                ],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: isAssembled ? 0.25 : 2.5,
                repeat: isAssembled ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main SVG */}
            <svg
              width="44"
              height="44"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 w-11 h-11 md:w-12 md:h-12"
            >
              <defs>
                <pattern id="texture" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                  <rect width="4" height="4" fill="#dc2626" opacity="0.9" />
                  <rect width="2" height="2" fill="#991b1b" opacity="0.5" />
                  <rect x="2" y="2" width="2" height="2" fill="#991b1b" opacity="0.3" />
                </pattern>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g filter="url(#glow)">
                <motion.path variants={lineVariants} animate={isAssembled ? "assembled" : "scattered"} d="M50 12 L50 88" stroke="url(#texture)" strokeWidth="4" strokeLinecap="round" />
                <motion.path variants={lineVariants} animate={isAssembled ? "assembled" : "scattered"} d="M50 8 L46 14 L50 12 L54 14 Z" fill="#dc2626" />
                <motion.path variants={lineVariants} animate={isAssembled ? "assembled" : "scattered"} d="M50 35 L30 50 L50 65" stroke="url(#texture)" strokeWidth="4" strokeLinecap="round" fill="none" />
                <motion.path variants={lineVariants} animate={isAssembled ? "assembled" : "scattered"} d="M50 35 L70 50 L50 65" stroke="url(#texture)" strokeWidth="4" strokeLinecap="round" fill="none" />
                <motion.path variants={lineVariants} animate={isAssembled ? "assembled" : "scattered"} d="M50 65 L30 80 L50 95" stroke="url(#texture)" strokeWidth="4" strokeLinecap="round" fill="none" />
                <motion.path variants={lineVariants} animate={isAssembled ? "assembled" : "scattered"} d="M50 65 L70 80 L50 95" stroke="url(#texture)" strokeWidth="4" strokeLinecap="round" fill="none" />
                <motion.path variants={lineVariants} animate={isAssembled ? "assembled" : "scattered"} d="M30 35 L18 50 L30 65" stroke="url(#texture)" strokeWidth="3" strokeLinecap="round" fill="none" />
                <motion.path variants={lineVariants} animate={isAssembled ? "assembled" : "scattered"} d="M70 35 L82 50 L70 65" stroke="url(#texture)" strokeWidth="3" strokeLinecap="round" fill="none" />
              </g>
            </svg>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;