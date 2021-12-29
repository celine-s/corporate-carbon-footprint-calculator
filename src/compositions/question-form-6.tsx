import { FC } from 'react';
import { DropDown } from '../elements/dropdown';

const years = ['vor 1980', '1980-1990', '1991-2000', '2001-2010', '2011-heute', 'Weiss nicht'];

type Props = {
  selected: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

export const Question6: FC<Props> = ({ selected, callback }) => (
  <DropDown
    initialValue={{ constructionPeriod: '2011-heute' }}
    selection={years}
    selected={selected}
    callback={callback}
    optionKey="constructionPeriod"
  />
);
