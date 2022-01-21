import type { NextPage } from 'next';
import { LinkElement } from '../elements/link';
import { Heading1 } from '../identity/heading-1';
import { Page } from '../layouts/page';
import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import { Heading2 } from '../identity/heading-2';

const allFeaturesOfThePage = [
  'Kostenlos',
  'Dauert weniger als 10 min',
  'Kein langes Daten sammeln',
  'Know each step you take',
  'Kein Spendenaufruf',
  'Für KMUs (< 250 MA)',
];

const Home: NextPage = () => {
  return (
    <div className="bg-cornflower-500">
      <Page>
        <div className="mb-8 text-center">
          <Heading1>
            CO<sub>2</sub> Fussabdruck-Rechner für Schweizer Dienstleistungs-unternehmen
          </Heading1>

          <div className="bg-white-200 p-8 sm:p-16 md:m-16 md:p-16 rounded-lg lg:mx-36">
            <Heading2>Was erwartet Dich?</Heading2>
            <ul className="text-white-200 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {allFeaturesOfThePage.map((feature) => (
                <li className="text-black grid grid-cols-[1fr,3fr]" key={feature}>
                  <div className="flex justify-end">
                    <CheckIcon className="h-8" />
                  </div>
                  <div className="font-sans text-xxs sm:text-base md:text-sm text-left">{feature}</div>
                </li>
              ))}
            </ul>
            <main>
              <div className="pt-8 md:mx-auto flex transition-all duration-300 ease-in-out transform hover:scale-105 justify-center">
                <LinkElement href="/rechner/1">
                  <div className="bg-cornflower-500 hover:bg-cornflower-800 p-4 rounded-lg">
                    <div className="flex flex-wrap flex-grow text-base text-white-200">Loslegen</div>
                  </div>
                </LinkElement>
              </div>
            </main>
          </div>
        </div>
      </Page>
    </div>
  );
};

export default Home;
