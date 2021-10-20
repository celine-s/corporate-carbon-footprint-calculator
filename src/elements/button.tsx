import React, { FC } from 'react';

export type ButtonProps = {
  size?: 'S' | 'L';
  className?: string;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({ children, size = 'S' }) => {
  const fontSize = size === 'S' ? 'text-xs lg:text-sm' : 'text-s';
  const textStyles = `font-sans font-bold text-white-100 ${fontSize}`;
  const gap = size === 'S' ? 'gap-2 lg:gap-6' : 'gap-1 lg:gap-2';
  return (
    <button
      type="button"
      className={`px-8 py-4 border border-transparent text-sans text-base rounded-sm bg-apricot-500 hover:bg-apricot-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apricot-500 ${textStyles} ${gap}`}
    >
      {children}
    </button>
  );
};
