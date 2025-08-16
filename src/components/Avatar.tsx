import React from "react";

const Avatar: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-sky-200 to-sky-500">
      <div className="relative w-40 h-40 bg-yellow-400 rounded-full shadow-lg">
        {/* Ears */}
        <div className="absolute -top-8 left-4 w-6 h-16 bg-yellow-400 rounded-t-full border-t-8 border-black"></div>
        <div className="absolute -top-8 right-4 w-6 h-16 bg-yellow-400 rounded-t-full border-t-8 border-black"></div>

        {/* Eyes */}
        <div className="absolute top-16 left-8 w-6 h-6 bg-black rounded-full"></div>
        <div className="absolute top-16 right-8 w-6 h-6 bg-black rounded-full"></div>

        {/* Cheeks */}
        <div className="absolute bottom-8 left-6 w-8 h-8 bg-red-500 rounded-full opacity-80"></div>
        <div className="absolute bottom-8 right-6 w-8 h-8 bg-red-500 rounded-full opacity-80"></div>

        {/* Mouth */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-4 border-b-4 border-black rounded-b-full"></div>
      </div>
    </div>
  );
};

export default Avatar;
