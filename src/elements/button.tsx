import React, { FC } from 'react';

export type ButtonProps = {
  size?: 'S' | 'L';
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({ children, size = 'S', onClick }) => {
  const fontSize = size === 'S' ? 'text-xs lg:text-sm' : 'text-base';
  const textStyles = `font-sans font-bold text-white-100 ${fontSize}`;
  const padding = size === 'S' ? 'px-4 py-3' : 'px-8 py-4';
  const defaultStyle = `rounded-sm bg-apricot-500 hover:bg-apricot-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apricot-500 ${textStyles} ${padding}`;

  return (
    <button type="button" className={`${defaultStyle}`} onClick={onClick}>
      {children}
    </button>
  );
};
