import React, { FC, useEffect } from 'react';
import { DropDown } from '../elements/dropdown';

const years = [
  { label: '2018', value: '2018' },
  { label: '2019', value: '2019' },
  { label: '2020', value: '2020' },
  { label: '2021', value: '2021' },
];

type Props = {
  answer: { [key: string]: string };
  callback: (value: { [key: string]: string }) => void;
};

export const Question1: FC<Props> = ({ answer, callback }) => {
  useEffect(() => {
    callback({ year: '2021' });
  }, []);
  return <DropDown options={years} selected={answer} callback={callback} optionKey={'year'} />;
};
