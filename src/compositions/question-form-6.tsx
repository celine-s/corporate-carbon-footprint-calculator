import { FC, useEffect } from 'react';
import { DropDown } from '../elements/dropdown';

const years = [
  { label: 'vor 1980', value: 'before1980' },
  { label: '1981-1990', value: '1981-90' },
  { label: '1991-2000', value: '1991-00' },
  { label: '2001-2010', value: '2001-10' },
  { label: '2011-heute', value: 'today' },
  { label: 'Weiss nicht', value: 'unavailable' },
];

type Props = {
  answer: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

export const Question6: FC<Props> = ({ answer, callback }) => {
  const initialAnswer = { constructionPeriod: 'today' };
  useEffect(() => {
    callback(initialAnswer);
  }, []);
  return <DropDown options={years} selected={answer || initialAnswer} callback={callback} optionKey="constructionPeriod" />;
};
