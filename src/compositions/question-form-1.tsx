import React, { FC } from 'react';
import { DropDown } from '../elements/dropdown';

const years = ['2018', '2019', '2020', '2021'];

type Props = {
  answer: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

export const Question1: FC<Props> = ({ answer, callback }) => {
  return <DropDown selection={years} selected={answer || { year: '2021' }} callback={callback} optionKey={'year'} />;
};
