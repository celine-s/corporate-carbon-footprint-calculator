import type { NextPage } from 'next';
import { Button } from '../elements/button';
import { LinkElement } from '../elements/link';
import { Copy } from '../identity/copy';
import { Heading1 } from '../identity/heading-1';
import { Page } from '../layouts/page';
import React from 'react';
import { ChevronRightIcon } from '../elements/chevron-right';
import { CheckIcon } from '@heroicons/react/solid';
import { WhatIsHappening } from '../components/info-box';

const allFeaturesOfThePage = [
  'kostenlos',
  'dauert weniger als10min',
  'kein langes Daten sammeln',
  'know each step you take',
  'kein Spendenaufruf',
  'für KMUs (< 250 MA)',
];

const Home: NextPage = () => {
  return (
    <div className="bg-cornflower-500">
      <Page>
        <header>
          <Heading1>Fussabdruck Rechner für Schweizer Dienstleistungsunternehmen</Heading1>
          <Copy>Was erwartet dich?</Copy>
          <ul className="text-white-200 grid grid-cols-3">
            {allFeaturesOfThePage.map((feature) => (
              <li className="text-white-200 flex flex-wrap -mb-8" key={feature}>
                <CheckIcon className="h-8 my-4 lg:my-8 justify-center self-center mr-2" />
                <Copy>{feature}</Copy>
              </li>
            ))}
          </ul>
        </header>
        <main>
          <div className="px-4 pt-8 md:mx-auto text-center flex transition-all duration-300 ease-in-out transform hover:scale-105 justify-center">
            <LinkElement href="/rechner/1">
              <Button size="L" buttonColorGray={true}>
                <div className="flex flex-wrap flex-grow">
                  Zum Fussabdruck Quickcheck
                  <div className="flex justify-end items-center">
                    <ChevronRightIcon />
                  </div>
                </div>
              </Button>
            </LinkElement>
          </div>
        </main>
        <WhatIsHappening title="Berechnungen" content="Erklärung" />
      </Page>
    </div>
  );
};

export default Home;
