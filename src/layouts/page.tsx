import React, { FC } from 'react';
import { Logo } from '../identity/logo';

export const Page: FC = ({ children }) => {
  return (
    <div className="bg-gray-100 box-content">
      <header className="text-center font-sans font-bold text-xs py-4">
        <a href="https://www.smartive.ch" target="_blank" rel="noreferrer">
          <Logo className="max-h-[1px] py-[4px] mx-auto" />
        </a>
      </header>

      <div id="pageContent" className="lg:container lg:mx-auto px-4 p-8">
        {children}
      </div>
    </div>
  );
};
