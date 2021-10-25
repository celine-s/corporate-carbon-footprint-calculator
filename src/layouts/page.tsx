import React, { FC } from 'react';
import { Logo } from '../identity/logo';
import { Footer } from '../components/footer';
import { LinkElement } from '../elements/link';

export const Page: FC = ({ children }) => {
  return (
    <div className="bg-gray-100 ">
      <header className="font-sans font-bold text-xs py-4 text-center">
        <LinkElement href="https://www.smartive.ch" newTab={true}>
          <Logo />
        </LinkElement>
      </header>

      <main className="lg:container lg:mx-auto px-8 lg:px-24 py-16 border-b-2">{children}</main>
      <Footer></Footer>
    </div>
  );
};
