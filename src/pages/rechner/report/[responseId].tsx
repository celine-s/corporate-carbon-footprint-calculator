import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Page } from '../../../layouts/page';
import React, { FC, useState } from 'react';
import { getResponseWithId } from '../../../utils/responses-firestore';
import { Heading1 } from '../../../identity/heading-1';
import { HeatingIcon, IconProps, PaperAirplaneIcon, TrainIcon } from '../../../elements/icons';
import { Copy } from '../../../identity/copy';
import { Modal, ModalVariant } from '../../../elements/modal';
import { Heading2 } from '../../../identity/heading-2';
import { InformationCircleIcon } from '@heroicons/react/outline';
import { Button } from '../../../elements/button';
import { LinkElement } from '../../../elements/link';
import { electricityOptions } from '../../../compositions/question-form-4';
import { constructionPeriods } from '../../../compositions/question-form-6';

type Props = {
  impactInTons: { name: string; impact: number; content: string }[];
  answersTravelling: { [key: string]: number | string };
  answersCommuting: { [key: string]: number | string };
  answersEnergy: { [key: string]: number | string };
  year: string;
  fte: number;
  currentId: string | undefined;
  totalImpact: number;
};

export enum CategorieNames {
  Commuting = 'Pendeln',
  Travelling = 'Reisen',
  Energy = 'Energie',
}

export const ICONS: { [key: string]: React.FC<IconProps> } = {
  [CategorieNames.Commuting]: TrainIcon,
  [CategorieNames.Energy]: HeatingIcon,
  [CategorieNames.Travelling]: PaperAirplaneIcon,
};

const Report: NextPage<Props> = ({
  impactInTons,
  totalImpact,
  fte,
  year,
  currentId,
  answersCommuting,
  answersTravelling,
  answersEnergy,
}) => {
  const [openEnergy, setOpenEnergy] = useState(false);
  const [openCommuting, setOpenCommuting] = useState(false);
  const [openTravelling, setOpenTravelling] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <Page>
      <div className="mb-32">
        <Heading1>
          Euer CO<sub>2</sub> Fussabdruck im {year}
        </Heading1>
        <div className="grid grid-row md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {impactInTons.map(({ name, impact, content }) => {
            return (
              <div key={name}>
                <div className="rounded-lg">
                  <div className="flex items-center justify-center -mb-8">
                    <div className="text-white-100 rounded-full p-4 bg-cornflower-500">{ICONS[name]({ size: '30' })}</div>
                  </div>

                  <div className="p-8 bg-white-100 rounded-lg text-center">
                    <div className="h-5 md:h-7 flex justify-end -mt-2 -mr-1">
                      <InformationCircleIcon
                        onClick={() => {
                          name === CategorieNames.Energy && setOpenEnergy(true);
                          name === CategorieNames.Commuting && setOpenCommuting(true);
                          name === CategorieNames.Travelling && setOpenTravelling(true);
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
                    <span className="text-xs font-semibold flex justify-center text-center mb-4 h-auto lg:h-24 xl:h-12">
                      {content}
                    </span>
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
          <div className="mt-12 flex gap-4">
            <LinkElement href={'/rechner/1'}>
              <Button>Fragebogen neu starten</Button>
            </LinkElement>
            <Button
              onClick={() => {
                setCopied(true);
                navigator.clipboard.writeText(`https://fussabdruck-rechner.vercel.app/rechner/report/${currentId}`);
              }}
            >
              {copied ? 'Kopiert: Der Link ist in deiner Zwischenablage.' : 'Kopiere den Link zu dieser Seite.'}
            </Button>
          </div>
        </div>
        <div className="bg-white-100 px-4 rounded-lg pb-4 mt-10 pt-4">
          <Heading2> Nicht alle Emissionen werden mit diesem Fussabdruck-Rechner erfasst.</Heading2>
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
      <div>
        {openEnergy && (
          <Modal
            title="Berechnungen Energie Emissionen"
            onClose={setOpenEnergy}
            open={openEnergy}
            icon={<HeatingIcon size="30" />}
            variant={ModalVariant.Custom}
          >
            <CalculationEnergy
              answersEnergy={answersEnergy}
              energyImpact={impactInTons.find(({ name }) => name === CategorieNames.Energy)?.impact}
            />
          </Modal>
        )}
        {openCommuting && (
          <Modal
            title="Berechnungen Pendeln Emissionen"
            onClose={setOpenCommuting}
            open={openCommuting}
            icon={<TrainIcon size="30" />}
            variant={ModalVariant.Custom}
          >
            <CalculationCommuting
              fte={fte}
              answersCommuting={answersCommuting}
              commutingImpact={impactInTons.find(({ name }) => name === CategorieNames.Commuting)?.impact}
            />
          </Modal>
        )}
        {openTravelling && (
          <Modal
            title="Berechnungen Reisen Emissionen"
            onClose={setOpenTravelling}
            open={openTravelling}
            icon={<PaperAirplaneIcon size="30" />}
            variant={ModalVariant.Custom}
          >
            <CalculationTravelling
              fte={fte}
              answersTravelling={answersTravelling}
              travellingImpact={impactInTons.find(({ name }) => name === CategorieNames.Travelling)?.impact}
            />
          </Modal>
        )}
      </div>
    </Page>
  );
};

const EMISSION_NY_AND_BACK = 3;
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
const CAR_EMISSION = 0.21;
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
    { name: CategorieNames.Energy, impact: Math.round((impactHeating + electricity) / 1000), content: 'Heizung und Strom.' },
    {
      name: CategorieNames.Commuting,
      impact: Math.round((homeOfficeImpact + commute) / 1000),
      content: 'Tage im Homeoffice und Arbeitsweg.',
    },
    {
      name: CategorieNames.Travelling,
      impact: Math.round((byCar + byPublicTransport + byPlane) / 1000),
      content: 'Kundenbesuche und Firmenausflüge: Flugstunden, Autokilometer und ÖV.',
    },
  ];
  const totalImpact = impactInTons.reduce((prev, curr) => prev + curr.impact, 0);
  const answersTeam = { fte, year, squaremeter };
  const answersTravelling = {
    byCar: answers?.[9].autokm,
    byPlane: answers?.[8].hours,
    byPublicTransport: answers?.[10].km,
  };
  const answersCommuting = { homeOfficePercentage, carPercentage, publicTransportPercentage, bicyclePercentage };
  const answersEnergy = {
    electricityType,
    constructionPeriod,
    heatingType,
    squaremeter,
    kWh: answers?.[3].kWh,
    electricityEmission: ELECTRICITY_EMISSION?.[electricityType],
  };
  return {
    props: {
      response,
      currentId,
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

const MULTIPLICATION_SIGN = <div className="text-cornflower-500 my-1">x</div>;
const PLUS_SIGN = <div className="text-cornflower-500 my-1">+</div>;

const SmallTextInBrackets: FC = ({ children }) => <span className="text-xss">({children})</span>;
type CalculationTravellingProps = {
  fte: number;
  answersTravelling: { [key: string]: string | number };
  travellingImpact?: number;
};
const SubtitleCalculations: FC = ({ children }) => <p className="text-sm font-bold text-gray-800 pb-1">{children}</p>;

const CalculationTravelling: FC<CalculationTravellingProps> = ({ fte, answersTravelling, travellingImpact }) => (
  <div>
    <div className="grid grid-cols-3 gap-8 mt-8">
      <div>
        <SubtitleCalculations>Flugzeug:</SubtitleCalculations>
        {fte} <SmallTextInBrackets>Mitarbeitenden</SmallTextInBrackets> {MULTIPLICATION_SIGN} {`${MONTHS_PER_YEAR} `}
        <SmallTextInBrackets>Monate im Jahr</SmallTextInBrackets> {MULTIPLICATION_SIGN}
        {`${answersTravelling.byPlane} `}
        <SmallTextInBrackets>Anzahl Flugstunden / Mitarbeiter:in / Monat</SmallTextInBrackets>
        {MULTIPLICATION_SIGN}
        {`${PLANE_EMISSION} `}
        <SmallTextInBrackets>
          Emissionsfaktor pro Flugstunde in kg CO<sub>2</sub>
        </SmallTextInBrackets>
      </div>
      <div>
        <SubtitleCalculations>Auto:</SubtitleCalculations>
        {fte} <SmallTextInBrackets>Mitarbeitenden</SmallTextInBrackets> {MULTIPLICATION_SIGN} {`${WEEKS_PER_YEAR} `}
        <SmallTextInBrackets>Arbeitswochen im Jahr</SmallTextInBrackets> {MULTIPLICATION_SIGN}
        {`${answersTravelling.byCar} `}
        <SmallTextInBrackets>Anzahl Autokilometer / Mitarbeiter:in / Monat</SmallTextInBrackets>
        {MULTIPLICATION_SIGN}
        {`${CAR_EMISSION} `}
        <SmallTextInBrackets>
          Emissionsfaktor pro Autokilometer in kg CO<sub>2</sub>
        </SmallTextInBrackets>
      </div>
      <div>
        <SubtitleCalculations>ÖV:</SubtitleCalculations>
        {fte} <SmallTextInBrackets>Mitarbeitenden</SmallTextInBrackets> {MULTIPLICATION_SIGN} {`${WEEKS_PER_YEAR} `}
        <SmallTextInBrackets>Arbeitswochen im Jahr</SmallTextInBrackets> {MULTIPLICATION_SIGN}
        {`${answersTravelling.byPublicTransport} `}
        <SmallTextInBrackets>Anzahl ÖVKilometer /Mitarbeiter:in / Monat</SmallTextInBrackets>
        {MULTIPLICATION_SIGN}
        {`${PUBLIC_TRANSPORT_EMISSION} `}
        <SmallTextInBrackets>
          Emissionsfaktor pro ÖVKilometer in kg CO<sub>2</sub>
        </SmallTextInBrackets>
      </div>
    </div>
    <div className="mt-12">Die Summe aller drei ergibt:</div>
    <span className="text-base text-bold">
      = {travellingImpact} t CO<sub>2</sub>
    </span>
  </div>
);

type CalculationEnergyProps = {
  answersEnergy: { [key: string]: string | number };
  energyImpact?: number;
};

const CalculationEnergy: FC<CalculationEnergyProps> = ({
  answersEnergy: { kWh, electricityEmission, electricityType, squaremeter, constructionPeriod, heatingType },
  energyImpact,
}) => (
  <div>
    <div className="grid grid-cols-2 gap-8 mt-8">
      <div>
        <SubtitleCalculations>Heizung</SubtitleCalculations>
        {`${squaremeter} `}
        <SmallTextInBrackets>
          m<sup>2</sup>
        </SmallTextInBrackets>
        {MULTIPLICATION_SIGN} {`${USAGE_PER_CONSTRUCTION_YEAR?.[constructionPeriod]} `}
        <SmallTextInBrackets>
          {`Verbrauch in kWh in der Bauperiode ${
            constructionPeriods.find((period) => period.value === constructionPeriod)?.label
          } pro m`}
          <sup>2</sup>
        </SmallTextInBrackets>
        {MULTIPLICATION_SIGN}
        {`${HEATING_TYPE_EMISSION?.[heatingType]} `}
        <SmallTextInBrackets>Emissionsfaktor pro kWh für den Energieträger {heatingType}</SmallTextInBrackets>
      </div>
      <div>
        <SubtitleCalculations>Strom</SubtitleCalculations>
        {kWh} <SmallTextInBrackets>kWh</SmallTextInBrackets> {MULTIPLICATION_SIGN}
        {`${electricityEmission} `}
        <SmallTextInBrackets>
          Emissionsfaktor pro kWh für
          {` ${electricityOptions.find((option) => option.value === electricityType)?.label} `}
          Energietype in kg CO
          <sub>2</sub>
        </SmallTextInBrackets>
      </div>
    </div>
    <div className="mt-12">Die Summe ergibt:</div>
    <span className="text-base text-bold">
      = {energyImpact} t CO<sub>2</sub>
    </span>
  </div>
);

type CalculationCommutingProps = {
  fte: number;
  answersCommuting: { [key: string]: string | number };
  commutingImpact?: number;
};

const CalculationCommuting: FC<CalculationCommutingProps> = ({
  fte,
  answersCommuting: { homeOfficePercentage, carPercentage, publicTransportPercentage, bicyclePercentage },
  commutingImpact,
}) => (
  <div>
    <div className="grid grid-cols-2 gap-8 mt-8">
      <div>
        <SubtitleCalculations>Homeoffice</SubtitleCalculations>
        {fte} <SmallTextInBrackets>Mitarbeitenden</SmallTextInBrackets> {MULTIPLICATION_SIGN} {WORKDAYS_PER_YEAR}
        <SmallTextInBrackets>Arbeitstage im Jahr</SmallTextInBrackets> {MULTIPLICATION_SIGN}
        {` ${homeOfficePercentage} `}
        <SmallTextInBrackets>Homeoffice Prozent</SmallTextInBrackets> {MULTIPLICATION_SIGN} {HOME_OFFICE_EMISSION} kg CO
        <sub>2</sub>
        <SmallTextInBrackets>
          Homeoffice Emissionsfaktor in kg CO<sub>2</sub>
        </SmallTextInBrackets>
        <br />
      </div>
      <div>
        <SubtitleCalculations>Arbeitsweg</SubtitleCalculations>
        {fte} <SmallTextInBrackets>Mitarbeitenden</SmallTextInBrackets> {MULTIPLICATION_SIGN} {`${WORKDAYS_PER_YEAR} `}
        <SmallTextInBrackets>Arbeitstage im Jahr</SmallTextInBrackets> {MULTIPLICATION_SIGN}
        {` 1 - ${homeOfficePercentage} `}
        <SmallTextInBrackets>100% minus Homeoffice Prozent</SmallTextInBrackets> {MULTIPLICATION_SIGN}
        {` ${AVG_COMMUTE_DIST_KM} `}
        <SmallTextInBrackets>Durchschnittlicher Schweizer Arbeitsweg</SmallTextInBrackets>
        {MULTIPLICATION_SIGN}
        <div className="text-gray-600">
          <span className="text-base font-bold">(</span>
          {`${CAR_EMISSION} `}
          <SmallTextInBrackets>
            Auto EF in kg CO<sub>2</sub>
          </SmallTextInBrackets>
          {' x '}
          {`${carPercentage} `}
          <SmallTextInBrackets>% mit dem Auto</SmallTextInBrackets>
          {PLUS_SIGN} {`${PUBLIC_TRANSPORT_EMISSION} `}
          <SmallTextInBrackets>
            ÖV EF in kg CO<sub>2</sub>
          </SmallTextInBrackets>
          {' x '}
          {`${publicTransportPercentage} `}
          <SmallTextInBrackets>% mit dem ÖV</SmallTextInBrackets>
          {PLUS_SIGN} {`${BICYCLE_EMISSION} `}
          <SmallTextInBrackets>
            Fahrrad EF in kg CO<sub>2</sub>
          </SmallTextInBrackets>
          {' x '}
          {`${bicyclePercentage} `}
          <SmallTextInBrackets>% mit dem Fahrrad</SmallTextInBrackets>
          {PLUS_SIGN} {'0 '}
          <SmallTextInBrackets>Zu Fuss.</SmallTextInBrackets>
          <span className="text-base font-bold">{`)`}</span>
        </div>
      </div>
    </div>
    <div className="mt-12">Die Summe ergibt:</div>
    <span className="text-base text-bold">
      = {commutingImpact} t CO<sub>2</sub>
    </span>
  </div>
);
