import React, { FC } from 'react';
import { Logo } from '../identity/logo';
import { Footer } from '../components/footer';
import { LinkElement } from '../elements/link';

export const Page: FC = ({ children }) => (
  <div>
    <header className="font-sans font-bold text-xs py-4 text-center">
      <LinkElement href="https://www.smartive.ch" newTab={true}>
        <Logo />
      </LinkElement>
    </header>
    <main className="lg:container lg:mx-auto px-8 md:px-16 py-16 border-b-2">{children}</main>
    <Footer />
  </div>
);
