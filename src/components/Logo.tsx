
import React from 'react';

const Logo = ({ size = 32 }: { size?: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div 
        className="relative flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg"
        style={{ width: size, height: size }}
      >
        <div className="text-white font-bold text-sm">Z</div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Zume
      </span>
    </div>
  );
};

export default Logo;
