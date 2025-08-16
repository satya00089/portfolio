import React, { useState } from "react";

interface FlipCardProps {
  front: string;
  back: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-64 h-40 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute w-full h-full bg-blue-500 text-white flex items-center justify-center backface-hidden rounded-xl shadow-lg">
          {front}
        </div>
        {/* Back */}
        <div className="absolute w-full h-full bg-gray-800 text-white flex items-center justify-center backface-hidden rounded-xl shadow-lg rotate-y-180">
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
