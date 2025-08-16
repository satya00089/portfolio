import React, { useState } from "react";

const Galaxy: React.FC = () => {
  const [activePlanet, setActivePlanet] = useState<string | null>(null);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* 🌌 Background Stars (parallax) */}
      {Array.from({ length: 120 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            opacity: Math.random(),
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}

      {/* 🌠 Shooting Stars */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`shooting-${i}`}
          className="absolute w-1 h-10 bg-white rotate-45 opacity-70 animate-shooting"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      {/* 🌞 Sun with radiant glow */}
      <div className="relative w-24 h-24 bg-yellow-400 rounded-full shadow-[0_0_80px_30px_rgba(255,200,50,0.9)] animate-sun-pulse">
        <div className="absolute inset-0 rounded-full bg-yellow-300 opacity-50 blur-3xl"></div>
      </div>

      {/* 🪐 Orbits + Planets */}
      {/* Planet 1 */}
      <div className="absolute w-60 h-60 border border-gray-600/30 rounded-full animate-spin-slow hover:animate-spin-fast">
        <div
          onClick={() => setActivePlanet("Planet 1")}
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-400 rounded-full shadow-lg shadow-blue-500 cursor-pointer hover:scale-125 transition-transform"
        />
      </div>

      {/* Planet 2 */}
      <div className="absolute w-96 h-96 border border-gray-600/20 rounded-full animate-spin-slower hover:animate-spin-fast">
        <div
          onClick={() => setActivePlanet("Planet 2")}
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-green-400 rounded-full shadow-lg shadow-green-500 cursor-pointer hover:scale-125 transition-transform"
        />
      </div>

      {/* Planet 3 */}
      <div className="absolute w-[500px] h-[500px] border border-gray-600/10 rounded-full animate-spin-slowest hover:animate-spin-fast">
        <div
          onClick={() => setActivePlanet("Planet 3")}
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-purple-400 rounded-full shadow-lg shadow-purple-600 cursor-pointer hover:scale-125 transition-transform"
        />
      </div>

      {/* Tooltip Popup */}
      {activePlanet && (
        <div className="absolute bottom-10 bg-gray-900/90 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          🚀 {activePlanet} → Here you can show project info!
        </div>
      )}
    </div>
  );
};

export default Galaxy;
