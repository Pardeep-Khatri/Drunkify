
import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-md text-white 
        shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
        disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
        ${className}
      `}
    >
      {children}
    </button>
  );
};
