
import React from 'react';

const BeerMugIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-yellow-400 drop-shadow-[0_2px_4px_rgba(250,204,21,0.5)]"
  >
    <path d="M14 11c0-2.21-1.79-4-4-4v8c2.21 0 4-1.79 4-4z" />
    <path d="M12 5V3" />
    <path d="M12 17v2" />
    <path d="M18 13.5c0 2.21-1.79 4-4 4h-2V9.5h2c2.21 0 4 1.79 4 4z" />
    <path d="M18 9.5V7a2 2 0 00-2-2h-2" />
  </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center space-x-4 mb-4">
      <BeerMugIcon />
      <h1 className="text-5xl md:text-6xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-blue-400 to-yellow-300">
        Drunkify
      </h1>
    </header>
  );
};
