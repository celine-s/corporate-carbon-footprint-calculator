import React, { FC } from 'react';
import { Slider } from '../elements/slider';

type Props = {
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  answer: { [key: string]: string };
};

export const Question7: FC<Props> = ({ callback, answer }) => <Slider callback={callback} answer={answer} />;
