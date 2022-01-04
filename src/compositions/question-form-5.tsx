import { FC, useEffect } from 'react';
import { DropDown } from '../elements/dropdown';

const heatingTypes = [
  { label: 'Heizöl', value: 'oil' },
  { label: 'Erdgas', value: 'gas' },
  { label: 'Strom', value: 'electricity' },
  { label: 'Holz', value: 'wood' },
  { label: 'Wärmepumpe', value: 'heatPump' },
  { label: 'Fernwärme', value: 'districtHeat' },
  { label: 'Solarenergie', value: 'solarEnergie' },
  { label: 'Weiss nicht', value: 'unavailable' },
];
//const label: "deutsche begriff", key: "engl."

type Props = {
  answer: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

export const Question5: FC<Props> = ({ answer, callback }) => {
  const initialAnswer = { heatingType: 'oil' };
  useEffect(() => {
    callback(initialAnswer);
  }, []);
  return (
    <DropDown options={heatingTypes} selected={answer || initialAnswer} callback={callback} optionKey={'heatingType'} />
  );
};
