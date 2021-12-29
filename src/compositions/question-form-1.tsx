import React, { FC } from 'react';
import { DropDown } from '../elements/dropdown';

const years = ['2018', '2019', '2020', '2021'];

type Props = {
  answer: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  initialValue?: { [key: string]: string };
};

export const Question1: FC<Props> = ({ answer, callback, initialValue = { year: '2021' } }) => {
  return <DropDown selection={years} selected={answer} callback={callback} initialValue={initialValue} optionKey={'year'} />;
};
