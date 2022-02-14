import type { NextPage } from 'next';
import Link from 'next/link';
import { LinkElement } from '../elements/link';
import { Heading1 } from '../identity/heading-1';
import { Page } from '../layouts/page';
import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import { Heading2 } from '../identity/heading-2';

const allFeaturesOfThePage = [
  'Kostenlos',
  'Kein Spendenaufruf',
  'Für KMUs (< 250 MA)',
  'Dauert weniger als 10 min',
  'Schritte verständlich erklärt',
  'Zusatzinformationen', //Zusatzinformationen ermöglichen sinnvolle Antworten
];

const Home: NextPage = () => {
  return (
    <div className="">
      <Page>
        <div className="mb-8 text-center">
          <Heading1>
            CO<sub>2</sub>-Fussabdruck-Rechner für Schweizer Dienstleistungs{<span className="sm:hidden">-</span>}
            unternehmen 👣
          </Heading1>
          <div className="bg-white-100 p-8 sm:p-16 md:m-16 md:p-16 rounded-lg lg:mx-36">
            <Heading2>Was erwartet Dich?</Heading2>
            <ul className="text-white-100 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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
                    <div className="flex flex-wrap flex-grow text-base text-white-100">Loslegen</div>
                  </div>
                </LinkElement>
              </div>
            </main>
          </div>
          <div className="bg-white-100 p-8 sm:p-16 md:m-16 md:p-16 rounded-lg lg:mx-36">
            <div className="text-justify">
              <Heading2>Berechne für dich und deine Firma eure Umwelteinwirkung</Heading2>
              <span className="font-sans text-xs md:text-sm">
                Anhand von elf Fragen wird eurer Fussabdruck in den Themen Reisen, Pendeln und Büro abgeschätzt. Du kannst
                den Fragebogen für jedes Betriebsjahr ausfüllen oder auch nur einmal, um einen groben Überblick über euren
                Verbrauch zu erhalten.
                <br />
                Am Ende des Fragebogens, werden anhand deiner Eingaben, die Emissionen berechnet und dargestellt. Über einen
                Infobutton gelangst du zur genauen Berechnung und kannst dir einen Überblick erschaffen, wie ein solcher
                Fussabdruck entsteht. Den Link zum Endresultat kannst du kopieren und somit das Resultat immer wieder
                anschauen. Die Angaben werden anonym gespeichert.
                <br />
                Der Rechner basiert auf dem Greenhousegas Protocol und analysiert ca. einen Viertel der Kategorien aus dem
                Protokoll (= möglist alle relevanten Kategorien für ein Dienstleistungsunternehmen).
                <br />
                Dieser Fussabdruck-Rechner wurde im Rahmen meiner Bachelorarbeit mit technischer Unterstützung von
                <Link href="https://smartive.ch"> smartive™</Link> erstellt.
              </span>
            </div>
          </div>
        </div>
      </Page>
    </div>
  );
};

export default Home;
