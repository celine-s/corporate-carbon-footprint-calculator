import type { NextPage } from 'next';
import { Button } from '../elements/button';
import { LinkElement } from '../elements/link';
import { Copy } from '../identity/copy';
import { Heading1 } from '../identity/heading-1';
import { Heading2 } from '../identity/heading-2';
import { Page } from '../layouts/page';
import React from 'react';
import { ChevronRightIcon } from '../elements/chevron-right';

const Home: NextPage = () => {
  return (
    <Page>
      <header>
        <Heading1>Howdy</Heading1>
        <Copy>
          Ich hab gehört du interessierst dich für Nachhaltigkeit. schön. du weisst nicht wie du das als Firma angehen
          kannst? Hier findest du einen schnell Check / abschätzung über den Ausstoss deiner Firma. Danach werden dir
          Möglichkeiten zur Verbesserung dieses Fussabrucks geliefert.
        </Copy>
      </header>
      <main>
        <div className="px-4 pt-8 md:mx-auto text-center flex transition-all duration-300 ease-in-out transform hover:scale-105 justify-center">
          <LinkElement href="/rechner/1">
            <Button size="L">
              <div className="flex flex-wrap flex-grow">
                Zum Fussabdruck Quickcheck
                <div className="flex justify-end items-center">
                  <ChevronRightIcon> </ChevronRightIcon>
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
  );
};

export default Home;
