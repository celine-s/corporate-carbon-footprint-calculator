import React, { FC } from 'react';
import { Footer } from '../components/footer';

export const Page: FC = ({ children }) => (
  <div>
    <main className="lg:container lg:mx-auto px-8 md:px-16 py-16 border-b-2 pt-16">{children}</main>
    <Footer />
  </div>
);
