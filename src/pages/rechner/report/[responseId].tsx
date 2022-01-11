import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Page } from '../../../layouts/page';
import { Heading2 } from '../../../identity/heading-2';
import React from 'react';
import { getResponses, getResponseWithId } from '../../../utils/responses-firestore';
import { Heading1 } from '../../../identity/heading-1';
import { Copy } from '../../../identity/copy';
import { HeatingIcon, IconProps } from '../../../icons/fire-icon';
import { TrainIcon } from '../../../icons/train-icon';
import { PaperAirplaneIcon } from '../../../icons/paperairplane-icon';

type Props = {
  impactInTons: { name: string; impact: number }[];
  fte: number;
  year: string;
};

const ICONS: { [key: string]: React.FC<IconProps> } = {
  Pendeln: TrainIcon,
  Energie: HeatingIcon,
  Reisen: PaperAirplaneIcon,
};

const Report: NextPage<Props> = ({ impactInTons, fte, year }) => (
  <Page>
    <div className="pb-16">
      <Heading1>Eure Emissionen im {year}:</Heading1>
      <div className="grid grid-row md:grid-cols-3 gap-4">
        {impactInTons.map(({ name, impact }) => {
          return (
            <div key={name} className="bg-white-100 rounded-lg">
              <div className="text-cornflower-500 flex flex-col items-center border-b-2 px-8 pt-8 ">
                <div>{ICONS[name]({ active: true })}</div>
                <Copy>
                  {impact} t CO<sub>2</sub>
                </Copy>
              </div>
              <div className="p-6">
                <span className="text-xxs">
                  Pro Vollzeitmitarbeiter: {Math.round(((impact / fte) * 100) / 100)} t CO<sub>2</sub>
                </span>
                <Heading2>{name}</Heading2>
                <span>Was passiert hier?</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </Page>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const responses = await getResponses();

  return {
    paths: responses.map(({ id }) => ({ params: { responseId: id } })),
    fallback: 'blocking',
  };
};

const WORKDAYS_PER_YEAR = 240;
const CAR_EMISSION = 0.209;
const BICYCLE_EMISSION = 0.008;
const PUBLIC_TRANSPORT_EMISSION = 0.025;
const PLANE_EMISSION = 0.237;
const AVG_COMMUTE_DIST_KM = 29;
const HOME_OFFICE_EMISSION = 0.264;
const ELECTRICITY_EMISSION: { [key: string]: number } = {
  notEcoElectricity: 0.128,
  ecoElectricity: 0.016,
  unavailable: 0.072,
};

const HEATING_TYPE_EMISSION: { [key: string]: { emissionFactor: number; perUnit: string } } = {
  oil: { emissionFactor: 3.1, perUnit: 'l' },
  gas: { emissionFactor: 0.23, perUnit: 'kWh' },
  wood: { emissionFactor: 0.03, perUnit: 'kWh' }, // anpassen
  electricity: { emissionFactor: 0.03, perUnit: 'kWh' }, // anpassen
  heatPump: { emissionFactor: 0.03, perUnit: 'kWh' }, // anpassen
  districtHeat: { emissionFactor: 0.03, perUnit: 'kWh' }, // anpassen
  solarEnergy: { emissionFactor: 0.03, perUnit: 'kWh' }, // anpassen
  unavailable: { emissionFactor: 0.03, perUnit: 'kWh' }, // anpassen
};
const USAGE_PER_CONSTRUCTION_YEAR: { [key: string]: { l: number; kWh: number } } = {
  before1980: { l: 21, kWh: 220 },
  '1981-90': { l: 17, kWh: 168 },
  '1991-00': { l: 13, kWh: 135 },
  '2001-10': { l: 10, kWh: 104 },
  today: { l: 5, kWh: 52 },
  unavailable: { l: 13, kWh: 135 },
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
  const byCar = parseInt(answers?.[9].autokm) * fte * CAR_EMISSION;
  const byPublicTransport = parseInt(answers?.[10].km) * fte * PUBLIC_TRANSPORT_EMISSION;
  const byPlane = parseInt(answers?.[8].hours) * fte * PLANE_EMISSION;

  //energy
  const constructionPeriod = answers?.[5].constructionPeriod;
  const heatingUsage = USAGE_PER_CONSTRUCTION_YEAR?.[constructionPeriod];
  const heatingType = answers?.[4].heatingType;
  const emissionHeating = HEATING_TYPE_EMISSION?.[heatingType];
  const impactHeating =
    emissionHeating.perUnit === 'l'
      ? heatingUsage.l * emissionHeating.emissionFactor * squaremeter
      : heatingUsage.kWh * emissionHeating.emissionFactor * squaremeter;
  const electricityType = answers?.[3].electricityType;
  const electricity = answers?.[3].kWh * ELECTRICITY_EMISSION?.[electricityType];

  const impactInTons = [
    { name: 'Energie', impact: Math.round((impactHeating + electricity) / 1000) },
    { name: 'Pendeln', impact: Math.round((homeOfficeImpact + commute) / 1000) },
    { name: 'Reisen', impact: Math.round((byCar + byPublicTransport + byPlane) / 1000) },
  ];

  return {
    props: {
      year,
      response,
      impactInTons,
      fte,
    },
  };
};

export default Report;
