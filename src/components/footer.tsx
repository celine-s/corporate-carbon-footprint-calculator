import { FC } from 'react';
import { LinkElement } from '../elements/link';

export const Footer: FC = () => {
  return (
    <footer className="p-8">
      <nav className="flex flex-col md:flex-row justify-center items-center" aria-label="Footer">
        <div className="p-2">
          <LinkElement href={'/#'} newTab={false}>
            Abschlussarbeit
          </LinkElement>
        </div>
      </nav>
      {/* <div className="mt-8 flex justify-center space-x-6 text-gray-600">
        Die Angaben werden anonym gespeichert, damit du mit einem Buchstabensalatcode auch später darauf Zugriff hast.
      </div> */}
      <p className="mt-8 text-center text-xxs md:text-s text-gray-600">&copy; 2022 Bachelorarbeit UZH – smartive™.</p>
    </footer>
  );
};
