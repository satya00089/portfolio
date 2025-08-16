import React from "react";

const Galaxy: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Sun */}
      <div className="w-16 h-16 bg-yellow-400 rounded-full shadow-[0_0_60px_20px_rgba(255,200,0,0.7)]"></div>

      {/* Planet Orbits */}
      <div className="absolute w-40 h-40 border border-gray-600 rounded-full animate-spin-slow flex items-center justify-start">
        <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
      </div>

      <div className="absolute w-72 h-72 border border-gray-600 rounded-full animate-spin-slower flex items-center justify-start">
        <div className="w-8 h-8 bg-green-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Galaxy;
