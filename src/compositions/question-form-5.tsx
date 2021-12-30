import { FC, useEffect } from 'react';
import { DropDown } from '../elements/dropdown';

const heatingTypes = ['Heizöl', 'Erdgas', 'Strom', 'Holz', 'Wärmepumpe', 'Fernwärme', 'Solarenergie', 'Weiss nicht'];

type Props = {
  answer: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

export const Question5: FC<Props> = ({ answer, callback }) => {
  const initialAnswer = { heatingType: 'Heizöl' };
  useEffect(() => {
    callback(initialAnswer);
  }, []);
  return (
    <DropDown selection={heatingTypes} selected={answer || initialAnswer} callback={callback} optionKey={'heatingType'} />
  );
};
