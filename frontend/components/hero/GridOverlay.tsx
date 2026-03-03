import React from "react";

const GridOverlay: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-5"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="cyan" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
};

export default GridOverlay;
