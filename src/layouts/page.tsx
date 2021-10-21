import React, { FC } from 'react';
import { Logo } from '../identity/logo';
import Link from 'next/link';
import { Footer } from '../components/footer';

export const Page: FC = ({ children }) => {
  return (
    <div className="bg-gray-100 ">
      <header className="font-sans font-bold text-xs py-4">
        <div className="text-center">
          <Link href="https://www.smartive.ch">
            <a target="_blank" rel="noreferrer" className="inline-block">
              <Logo />
            </a>
          </Link>
        </div>
      </header>

      <main className="lg:container lg:mx-auto px-8 lg:px-24 py-16 border-b-2">{children}</main>
      <Footer></Footer>
    </div>
  );
};
