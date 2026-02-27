import React from 'react';

// Base Skeleton with Cinematic Pulse
export const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse bg-zinc-900/50 border border-white/5 ${className}`}
      style={{
        animationDuration: '1.5s'
      }}
      {...props}
    />
  );
};

// Product Card Skeleton - Matching your specific ProductCard layout
export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4">
      {/* Image Area */}
      <Skeleton className="w-full aspect-[3/4]" />
      
      {/* Top Meta (Category + ID) */}
      <div className="flex justify-between">
        <Skeleton className="h-2 w-12" />
        <Skeleton className="h-2 w-8" />
      </div>

      {/* Bottom Info (Name + Price) */}
      <div className="flex justify-between border-t border-white/5 pt-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
};