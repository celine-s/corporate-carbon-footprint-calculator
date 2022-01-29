import React, { FC } from 'react';

export type ButtonProps = {
  size?: 'S' | 'M' | 'L';
  onClick?: () => void;
  buttonColorGray?: boolean;
  ref?: React.LegacyRef<HTMLButtonElement>;
};

export const Button: FC<ButtonProps> = ({ children, size = 'S', onClick, buttonColorGray, ref }) => {
  const fontSize = size === 'L' ? 'text-base' : 'text-xxs lg:text-sm';
  const padding = size === 'S' ? 'md:px-16 px-8 py-3' : size === 'M' ? 'md:px-16 md:px-8 px-4 py-3' : 'px-24 py-4';
  const buttonColor = buttonColorGray
    ? 'bg-gray-400 hover:bg-gray-800 focus:ring-gray-400'
    : 'bg-cornflower-500 hover:bg-cornflower-800 focus:ring-cornflower-500';
  const defaultStyle = `rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonColor} font-sans font-normal ${fontSize} ${padding}`;

  return (
    <button type="button" className={`text-white-200 ${defaultStyle}`} onClick={onClick} ref={ref}>
      {children}
    </button>
  );
};
