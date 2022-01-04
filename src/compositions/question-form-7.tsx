import React, { FC, useEffect } from 'react';
import { Slider } from '../elements/slider';

type Props = {
  callback: (value: { [key: string]: string }) => void;
  answer: { [key: string]: string };
};

export const Question7: FC<Props> = ({ callback, answer = { percentage: '50' } }) => {
  useEffect(() => {
    callback({ percentage: '50' });
  }, []);
  return <Slider callback={callback} answer={answer} />;
};
