import { FC } from 'react';
import { DropDown } from '../elements/dropdown';

const heatingTypes = ['Heizöl', 'Erdgas', 'Strom', 'Holz', 'Wärmepumpe', 'Fernwärme', 'Solarenergie', 'Weiss nicht'];

type Props = {
  selected: { [key: string]: string };
  setSelected: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

export const Question5: FC<Props> = ({ selected, setSelected }) => (
  <DropDown
    initialValue={{ heatingType: 'Heizöl' }}
    selection={heatingTypes}
    selected={selected}
    callback={setSelected}
    optionKey={'heatingType'}
  />
);
