import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Page } from '../../../layouts/page';
import React, { FC, useState } from 'react';
import { getResponseWithId } from '../../../utils/responses-firestore';
import { Heading1 } from '../../../identity/heading-1';
import { HeatingIcon, IconProps, PaperAirplaneIcon, TrainIcon } from '../../../elements/icons';
import { Copy } from '../../../identity/copy';
import { CalculatorModal } from '../../../elements/modal';
import { Heading2 } from '../../../identity/heading-2';
import { InformationCircleIcon } from '@heroicons/react/outline';

type Props = {
  impactInTons: { name: string; impact: number; content: string }[];
  answersTeam: { [key: string]: number | string };
  answersTravelling: { [key: string]: number | string };
  answersCommuting: { [key: string]: number | string };
  answersEnergy: { [key: string]: number | string };
  year: string;
  fte: number;
  totalImpact: number;
};

export const ICONS: { [key: string]: React.FC<IconProps> } = {
  Pendeln: TrainIcon,
  Energie: HeatingIcon,
  Reisen: PaperAirplaneIcon,
};

const times = (
  <span className="text-cornflower-500">
    {<br />}x{<br />}
  </span>
);
const plus = (
  <span className="text-cornflower-500">
    {<br />}+{<br />}
  </span>
);

const SmallTextInBrackets: FC = ({ children }) => <span className="text-xss">({children})</span>;

const Report: NextPage<Props> = ({ impactInTons, totalImpact, answersCommuting, fte, year }) => {
  const [openEnergy, setOpenEnergy] = useState(false);
  const [openCommuting, setOpenCommuting] = useState(false);
  const [openTravelling, setOpenTravelling] = useState(false);

  //wie chani das nur eimal lade? Useeffect gaht ja nöd...
  const calculationCommuting = (
    <div>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          <p className="text-sm font-bold text-gray-800 pb-1">Homeoffice</p>
          {fte} <SmallTextInBrackets>Mitarbeitenden</SmallTextInBrackets> {times} {WORKDAYS_PER_YEAR}
          <SmallTextInBrackets>Arbeitstage im Jahr</SmallTextInBrackets> {times} {`0.5 `}
          <SmallTextInBrackets>Homeoffice Prozent</SmallTextInBrackets> {times} {HOME_OFFICE_EMISSION} kg CO
          <sub>2</sub>
          <SmallTextInBrackets>
            Homeoffice Emissionsfaktor in kg CO<sub>2</sub>
          </SmallTextInBrackets>
          {<br />}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800 pb-1">Arbeitsweg</p>
          {fte} <SmallTextInBrackets>Mitarbeitenden</SmallTextInBrackets> {times} {WORKDAYS_PER_YEAR}
          <SmallTextInBrackets>Arbeitstage im Jahr</SmallTextInBrackets> {times} {`1 - ${0.5}`}
          <SmallTextInBrackets>100% minus Homeoffice Prozent</SmallTextInBrackets> {times} {`${AVG_COMMUTE_DIST_KM} `}
          <SmallTextInBrackets>Durchschnittlicher Schweizer Arbeitsweg</SmallTextInBrackets>
          {times}
          <div className="text-gray-600">
            <span className="text-base font-bold">(</span>
            {CAR_EMISSION}
            <SmallTextInBrackets>
              Auto EF in kg CO<sub>2</sub>
            </SmallTextInBrackets>
            {'x'}
            {answersCommuting?.carPercentage}
            <SmallTextInBrackets>% mit dem Auto</SmallTextInBrackets>
            {plus} {PUBLIC_TRANSPORT_EMISSION}
            <SmallTextInBrackets>
              ÖV EF in kg CO<sub>2</sub>
            </SmallTextInBrackets>
            {'x'}
            {answersCommuting?.publicTransportPercentage}
            <SmallTextInBrackets>% mit dem ÖV</SmallTextInBrackets>
            {plus} {BICYCLE_EMISSION}
            <SmallTextInBrackets>
              Fahrrad EF in kg CO<sub>2</sub>
            </SmallTextInBrackets>
            {'x'}
            {answersCommuting?.bicyclePercentage}
            <SmallTextInBrackets>% mit dem Fahrrad</SmallTextInBrackets>
            <span className="text-base font-bold">)</span>
            {plus} {'0'}
            <SmallTextInBrackets>
              zu Fuss EF in kg CO<sub>2</sub>
            </SmallTextInBrackets>
            {'x'}
            <SmallTextInBrackets>% zu Fuss</SmallTextInBrackets>
            <span className="text-base font-bold">{`)`}</span>
          </div>
        </div>
      </div>
      <div className="mb-4">+</div>
      <br />
      <span className="text-base text-bold">
        = {impactInTons.find(({ name }) => name === 'Pendeln')?.impact} t CO<sub>2</sub>
      </span>
    </div>
  );
  return (
    <Page>
      <div className="mb-32">
        <div className="grid grid-row md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {impactInTons.map(({ name, impact, content }) => {
            return (
              <div key={name}>
                <div className="rounded-lg">
                  <div className="flex items-center justify-center -mb-8">
                    <div className="text-white-100  rounded-full p-4 bg-cornflower-500">{ICONS[name]({ size: '30' })}</div>
                  </div>

                  <div className="p-8 bg-white-100 rounded-lg text-center">
                    <div className="h-4 flex justify-end -mt-2 -mr-1">
                      <InformationCircleIcon
                        onClick={() => {
                          name === 'Energie' && setOpenEnergy(true);
                          name === 'Pendeln' && setOpenCommuting(true);
                          name === 'Reisen' && setOpenTravelling(true);
                        }}
                      />
                    </div>
                    <div className="text-xxl">
                      {impact}
                      <span className="text-sm">
                        {` t CO`}
                        <sub>2</sub>
                      </span>
                    </div>
                    <span className="text-lg">{name}</span>
                    <span className="text-xs font-semibold flex justify-center text-center mb-4 h-12">{content}</span>
                    <span className="text-xs">
                      entspricht ca.: {Math.round((impact / fte) * 100) / 100} t CO<sub>2</sub> pro Vollzeitmitarbeiter:in
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-white-100 p-8 rounded-lg">
          <Heading1>
            {`Total im ${year} habt ihr ca. `}
            <span className="text-cornflower-500">
              {totalImpact} t CO<sub>2</sub>
            </span>
            {` emittiert.`}
          </Heading1>
          <div className="-mb-8">
            <Copy>
              {`Das ist gleichviel, wie `}
              <span className="bg-white-200 p-1 rounded-md font-bold">
                🗽 {Math.round((totalImpact / EMISSION_NY_AND_BACK) * 100) / 100} mal nach New York hin und zurück zu fliegen
                (economy class)
              </span>
              {` oder `}
              <span className="bg-white-200 p-1 rounded-md font-bold ">
                🥛 {Math.round((totalImpact / EMISSION_PER_LITER_MILK) * 100) / 100} Liter Schweizer Vollmilch
              </span>
              {` oder `}
              <span className="bg-white-200 p-1 rounded-md font-bold">
                🐂 {Math.round((totalImpact / EMISSION_PER_KG_MEAT) * 100) / 100} Kilogramm Schweizer Rindfleisch.
              </span>
            </Copy>
          </div>
        </div>
        <div className="bg-white-100 px-4 rounded-lg pb-4 mt-10 pt-4">
          <Heading2> Nicht alle Emissionen werden mit dem Fussabdruck-Rechner erfasst.</Heading2>
          <div className="text-justify">
            <Copy>
              Die Emissionen für Energie, Pendeln und Reisen werden anhand eurer Antworten ausgerechnet. Emissionen werden
              auch in anderen Bereichen aussgestossen. Beispielsweise gehören Firmenevents, Möbel, Hardware, Entsorgungen,
              etc. ebenfalls in den euren Firmen-Fussabdruck. Um einigermassen aussagekräftige Daten zu erhalten bräuchte es
              zu jeder dieser Kategorie mehrere Fragen. Da dieser Fussabdruck-Rechner darauf zielt innerhalb von weniger
              Zeit, eine grobe Abschätzung des Firmen-Fussabdrucks zu erhalten, wurden diese weiteren Kategorien hier nicht
              erfasst.
              {<br />}
              Bei der Herstellung eines neuen Laptops werden beispielsweise ca. 300 kg CO<sub>2</sub> äquivalent
              ausgestossen. Würden also alle Mitarbeitenden eurer Firma einen neuen Laptop in diesem Jahr kaufen, wären das
              zusätzlich
              <span className="font-bold py-2 bg-white-200 rounded-lg">
                {` ${fte * EMISSION_PER_LAPTOP} Tonnen CO`}
                {<sub>2</sub>}
              </span>
              .
            </Copy>
          </div>
        </div>
      </div>
      {/* Modals to explain the calculations */}
      {openEnergy && (
        <CalculatorModal
          title="Berechnungen Energie Emissionen"
          onClose={setOpenEnergy}
          open={openEnergy}
          icon={ICONS.Energie({ size: '30' })}
        >
          {'comming soon'}
        </CalculatorModal>
      )}
      {openCommuting && (
        <CalculatorModal
          title="Berechnungen Pendeln Emissionen"
          onClose={setOpenCommuting}
          open={openCommuting}
          icon={ICONS.Pendeln({ size: '30' })}
        >
          {calculationCommuting}
        </CalculatorModal>
      )}
      {openTravelling && (
        <CalculatorModal
          title="Berechnungen Reisen Emissionen"
          onClose={setOpenTravelling}
          open={openTravelling}
          icon={ICONS.Reisen({ size: '30' })}
        >
          {'comming soon'}
        </CalculatorModal>
      )}
    </Page>
  );
};

const EMISSION_NY_AND_BACK = 3; //0.190kgCO2/km*900km/h*9h
const EMISSION_PER_LITER_MILK = 0.0016;
const EMISSION_PER_KG_MEAT = 0.0125;
const EMISSION_PER_LAPTOP = 0.3;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

const WORKDAYS_PER_YEAR = 240;
const WEEKS_PER_YEAR = 53;
const MONTHS_PER_YEAR = 12;
const CAR_EMISSION = 0.209;
const BICYCLE_EMISSION = 0.008;
const PUBLIC_TRANSPORT_EMISSION = 0.025;
const PLANE_EMISSION = 0.26;
const AVG_COMMUTE_DIST_KM = 29;
const HOME_OFFICE_EMISSION = 0.264;
const ELECTRICITY_EMISSION: { [key: string]: number } = {
  notEcoElectricity: 0.128,
  ecoElectricity: 0.016,
  unavailable: 0.042,
};

const HEATING_TYPE_EMISSION: { [key: string]: number } = {
  oil: 0.31,
  gas: 0.23,
  wood: 0.025,
  electricity: 0.042,
  heatPump: 0.03, //anpassen
  districtHeat: 0.161,
  solarEnergy: 0.016,
  unavailable: 0.19, //anpassen
};
const USAGE_PER_CONSTRUCTION_YEAR: { [key: string]: number } = {
  before1980: 220,
  '1981-90': 168,
  '1991-00': 135,
  '2001-10': 104,
  today: 52,
  unavailable: 135,
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const currentId = params?.responseId?.toString();

  const response = await getResponseWithId(currentId);
  if (response === null) {
    return { notFound: true };
  }
  const answers = response?.answers;

  //office
  const year = answers?.[0].year;
  const fte = parseInt(answers?.[1].fte);
  const squaremeter = parseInt(answers?.[2].squaremeter);

  //commuting
  const homeOfficePercentage = parseInt(answers?.[6].percentage) / 100;
  const homeOfficeImpact = HOME_OFFICE_EMISSION * WORKDAYS_PER_YEAR * fte * homeOfficePercentage;

  const carPercentage = parseInt(answers?.[7].car) / 100;
  const publicTransportPercentage = parseInt(answers?.[7].publicTransport) / 100;
  const bicyclePercentage = parseInt(answers?.[7].bicycle) / 100;

  const commute =
    AVG_COMMUTE_DIST_KM *
    WORKDAYS_PER_YEAR *
    (1 - homeOfficePercentage) *
    fte *
    (carPercentage * CAR_EMISSION +
      publicTransportPercentage * PUBLIC_TRANSPORT_EMISSION +
      bicyclePercentage * BICYCLE_EMISSION);

  //travelling
  const byCar = parseInt(answers?.[9].autokm) * fte * CAR_EMISSION * WEEKS_PER_YEAR;
  const byPublicTransport = parseInt(answers?.[10].km) * fte * PUBLIC_TRANSPORT_EMISSION * WEEKS_PER_YEAR;
  const byPlane = parseInt(answers?.[8].hours) * fte * PLANE_EMISSION * MONTHS_PER_YEAR;

  //energy
  const constructionPeriod = answers?.[5].constructionPeriod;
  const heatingType = answers?.[4].heatingType;
  const impactHeating =
    USAGE_PER_CONSTRUCTION_YEAR?.[constructionPeriod] * HEATING_TYPE_EMISSION?.[heatingType] * squaremeter;
  const electricityType = answers?.[3].electricityType;
  const electricity = answers?.[3].kWh * ELECTRICITY_EMISSION?.[electricityType];

  const impactInTons = [
    { name: 'Energie', impact: Math.round((impactHeating + electricity) / 1000), content: 'Heizung und Strom.' },
    {
      name: 'Pendeln',
      impact: Math.round((homeOfficeImpact + commute) / 1000),
      content: 'Tage im Homeoffice und Arbeitsweg.',
    },
    {
      name: 'Reisen',
      impact: Math.round((byCar + byPublicTransport + byPlane) / 1000),
      content: 'Kundenbesuche und Firmenausflüge: Flugstunden, Autokilometer und ÖV.',
    },
  ];
  const totalImpact = impactInTons.reduce((prev, curr) => prev + curr.impact, 0);
  const answersTeam = { fte, year, squaremeter };
  const answersTravelling = { byCar, byPlane, byPublicTransport };
  const answersCommuting = { homeOfficePercentage, carPercentage, publicTransportPercentage, bicyclePercentage };
  const answersEnergy = {
    electricity,
    electricityEmission: ELECTRICITY_EMISSION?.[electricityType],
    electricityType,
    constructionPeriod,
    heatingType,
  };
  return {
    props: {
      response,
      impactInTons,
      totalImpact,
      fte,
      year,
      answersTeam,
      answersTravelling,
      answersEnergy,
      answersCommuting,
    },
  };
};

export default Report;
