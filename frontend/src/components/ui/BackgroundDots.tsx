import React from "react";

const BackgroundDots = ({ color = "#ddd", size = 16 }) => {
  const svgUri = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}" fill="none"><circle fill="${color}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>')`;

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: svgUri,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
};

export default BackgroundDots;
