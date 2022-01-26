import { InformationCircleIcon } from '@heroicons/react/solid';
import { FC } from 'react';
import { Heading2 } from '../identity/heading-2';

type InfoBox = {
  title?: string;
  content?: string;
};
export const InfoBox: FC<InfoBox> = ({ title, content }) => (
  <div className="mt-24">
    <div className="font-bold py-2 flex flex-row">
      <InformationCircleIcon className="h-6 w-6 mr-2" />
      Warum brauchen wir diese Information?
    </div>
    <Heading2>{title}</Heading2>
    <div className="text-sm -mt-4 text-justify">{content}</div>
  </div>
);
