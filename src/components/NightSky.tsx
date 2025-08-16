import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
}

const NightSky: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars: Star[] = [];
    for (let i = 0; i < 100; i++) {
      newStars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0a0a2a] overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default NightSky;
