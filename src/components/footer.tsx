import Link from 'next/link';
import { FC } from 'react';
import { LinkElement } from '../elements/link';

export const Footer: FC = () => {
  return (
    <footer className="p-8">
      <nav className="flex flex-col md:flex-row justify-center items-center" aria-label="Footer">
        <div className="p-2">
          <LinkElement
            href="https://drive.google.com/file/d/1RJk4a7xZMVpZUtZ_bM23QiGZJRY5Bmii/view?usp=sharing"
            newTab={true}
          >
            Abschlussarbeit
          </LinkElement>
        </div>
      </nav>
      <p className="mt-8 text-center text-xxs md:text-s text-gray-600">
        &copy; 2022 Bachelorarbeit UZH –<Link href="https://smartive.ch"> smartive™</Link>.
      </p>
    </footer>
  );
};
