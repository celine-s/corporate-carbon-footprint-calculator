import React, { FC } from 'react';

export type ButtonProps = {
  label: string;
  size?: 'S' | 'L';
  className?: string;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({ className = '', size = 'L', label = 'button' }) => {
  const fontSize = size === 'S' ? 'text-xs lg:text-sm' : 'text-xxs';
  const textStyles = `font-sans font-normal text-white-100 ${fontSize}`;
  const gap = size === 'S' ? 'gap-2 lg:gap-6' : 'gap-1 lg:gap-2';
  const color = 'green';
  return (
    <button
      type="button"
      className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-${color}-600 hover:bg-${color}-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 ${textStyles} ${gap} ${className}`}
    >
      {label}
    </button>
  );
};
