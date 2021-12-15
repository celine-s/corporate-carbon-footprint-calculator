import type { NextPage } from 'next';
import { Button } from '../elements/button';
import { LinkElement } from '../elements/link';
import { Copy } from '../identity/copy';
import { Heading1 } from '../identity/heading-1';
import { Heading2 } from '../identity/heading-2';
import { Page } from '../layouts/page';
import React from 'react';
import { ChevronRightIcon } from '../elements/chevron-right';
import { CheckIcon } from '@heroicons/react/solid';

const allFeaturesOfThePage = [
  'Kostenlose Abschätzung',
  'in weniger als 10min',
  '10 Fragen',
  'Für CH DienstleistungsUN',
  'fully transparent',
  'know each step you take',
];

const Home: NextPage = () => {
  return (
    <div className="bg-cornflower-500">
      <Page>
        <header>
          <Heading1>Howdy</Heading1>
          <Copy>
            Ich hab gehört du interessierst dich für Nachhaltigkeit. schön. du weisst nicht wie du das als Firma angehen
            kannst? Hier findest du einen schnell Check / abschätzung über den Ausstoss deiner Firma. Danach werden dir
            Möglichkeiten zur Verbesserung dieses Fussabrucks geliefert.
          </Copy>
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
          <section className="mt-16 text-left mx-6 ">
            <Heading2>Wie entstand ich?</Heading2>
            <Copy>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi maiores, quos quas et sapiente odio
              consequuntur. Fugit labore voluptates asperiores iusto dicta voluptatibus ad dolore, repudiandae maxime
              reiciendis voluptas repellat!
            </Copy>
          </section>
        </main>
      </Page>
    </div>
  );
};

export default Home;
