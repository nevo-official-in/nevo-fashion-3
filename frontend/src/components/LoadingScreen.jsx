import React, { useState, useEffect } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [progress, setProgress] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);

  const letters = ['N', 'E', 'V', 'O'];

  useEffect(() => {
    const letterTimer = setInterval(() => {
      setVisibleLetters(prev => {
        if (prev < letters.length) return prev + 1;
        clearInterval(letterTimer);
        return prev;
      });
    }, 250);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) return prev + 4;
        clearInterval(progressTimer);
        return 100;
      });
    }, 20);

    return () => {
      clearInterval(letterTimer);
      clearInterval(progressTimer);
    };
  }, []);

  useEffect(() => {
    if (visibleLetters === letters.length && progress >= 100) {
      setTimeout(() => setAnimateOut(true), 200);
      setTimeout(() => onComplete(), 800);
    }
  }, [visibleLetters, progress]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: animateOut ? 0 : 1,
        transition: animateOut ? 'opacity 0.6s ease-in-out' : 'none',
        pointerEvents: animateOut ? 'none' : 'all',
      }}
    >
      {/* Letters + Line wrapper */}
      <div
        style={{
          transform: animateOut
            ? 'translateY(-46vh) scale(0.22)'
            : 'translateY(0) scale(1)',
          transition: animateOut
            ? 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)'
            : 'none',
          transformOrigin: 'center center',
        }}
      >
        {/* Letters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          {letters.map((letter, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                opacity: idx < visibleLetters ? 1 : 0,
                transform: idx < visibleLetters
                  ? 'translateY(0)'
                  : 'translateY(20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                fontWeight: 300,
                letterSpacing: '0.15em',
                color: 'white',
                display: 'inline-block',
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Progress Line */}
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${progress}%`,
              backgroundColor: 'white',
              transition: 'width 0.05s linear',
            }}
          />
        </div>
      </div>
    </div>
  );
};