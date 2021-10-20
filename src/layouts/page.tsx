import React, { FC } from 'react';
import { Logo } from '../identity/logo';
import Link from 'next/link';

export const Page: FC = ({ children }) => {
  return (
    <div className="bg-gray-100 ">
      <header className="font-sans font-bold text-xs py-4">
        <div className="max-h-[1px] py-[4px] mx-auto">
          <Link href="https://www.smartive.ch">
            <a target="_blank" rel="noreferrer">
              <Logo />
            </a>
          </Link>
        </div>
      </header>

      <div className="lg:container lg:mx-auto px-4 p-8">{children}</div>
    </div>
  );
};
