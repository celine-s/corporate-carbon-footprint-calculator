import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Page } from '../../../layouts/page';
import { Heading2 } from '../../../identity/heading-2';
import React, { FC } from 'react';
import { getResponses, getResponseWithId } from '../../../utils/responses-firestore';
import { Heading1 } from '../../../identity/heading-1';
import { HeatingIcon } from '../../../elements/icons';

type Props = {
  impactInTons: { name: string; impact: number; content: string }[];
  fte: number;
  year: string;
  totalImpact: number;
};

// const ICONS: { [key: string]: React.FC<IconProps> } = {
//   Pendeln: TrainIcon,
//   Energie: HeatingIcon,
//   Reisen: PaperAirplaneIcon,
// };

const COMPARISONS = [
  {
    content: 'Eure Gesamtemissionen entsprechen dieser Anzahl an Flügen nach New York und zurück für eine Person.',
    emissionFactor: 2,
    unit: 'x 🗽',
    name: 'Nach New York & zurück',
  },
  { content: '', emissionFactor: 0.0016, unit: '🥛', name: 'Liter Schweizer Vollmilch' },
  {
    content: 'wird für schweizer Rindfleisch',
    emissionFactor: 12.5,
    unit: '🐂',
    name: 'Kilogramm schweizer Rindfleisch',
  },
];

const Report: NextPage<Props> = ({ impactInTons, fte, year, totalImpact }) => (
  <Page>
    <div className="pb-16">
      <Heading1>
        Eure Emissionen im {year}: ca. {totalImpact} t CO<sub>2</sub>
      </Heading1>
      <div className="grid grid-row md:grid-cols-3 gap-4 mb-32">
        {impactInTons.map(({ name, impact, content }) => {
          return (
            <div key={name}>
              <div className="rounded-lg">
                <div className="flex flex-col items-center rounded-t-lg p-8 bg-cornflower-500 h-52 justify-center">
                  <div className="text-white-200">
                    <HeatingIcon size="50" />
                    {/* {ICONS.[name]('64')} */}
                  </div>
                  <span className="text-lg">{name}</span>
                  <span className="text-xs font-semibold flex text-center mb-4">{content}</span>
                </div>
                <div className="p-8 bg-white-100 rounded-b-lg text-center">
                  <div className="text-xxl">
                    {impact}
                    <span className="text-sm">
                      {` t CO`}
                      <sub>2</sub>
                    </span>
                  </div>
                  <span className="text-xs">
                    entspricht ca.: {Math.round((impact / fte) * 100) / 100} t CO<sub>2</sub> pro Vollzeitmitarbeiter:in
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Heading1>Das entspricht...</Heading1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 pt-8">
        {COMPARISONS.map(({ name, emissionFactor, unit, content }) => {
          const impact = Math.round((totalImpact / emissionFactor) * 100) / 100;
          return <Comparison key={name} impact={impact} name={name} unit={unit} content={content} />;
        })}
      </div>
    </div>
  </Page>
);

type ComparisonProps = { impact: number; name: string; content: string; unit: string };

const Comparison: FC<ComparisonProps> = ({ unit, impact, name, content }) => (
  <div>
    <div>
      <div className="text-xxl font-bold">{`${impact} ${unit}`}</div>
      <div className="-mb-4">
        <Heading2>{name}</Heading2>
      </div>
      <span className="text-xs">{content}</span>
    </div>
  </div>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const responses = await getResponses();

  return {
    paths: responses.map(({ id }) => ({ params: { responseId: id } })),
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
  solarEnergy: 0,
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

  return {
    props: {
      year,
      response,
      impactInTons,
      totalImpact,
      fte,
    },
  };
};

export default Report;
