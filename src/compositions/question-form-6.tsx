import { FC, useEffect } from 'react';
import { DropDown } from '../elements/dropdown';

const years = ['vor 1980', '1981-1990', '1991-2000', '2001-2010', '2011-heute', 'Weiss nicht'];

type Props = {
  answer: { [key: string]: string };
  callback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
};

export const Question6: FC<Props> = ({ answer, callback }) => {
  const initialAnswer = { constructionPeriod: '2011-heute' };
  useEffect(() => {
    callback(initialAnswer);
  }, []);
  return (
    <DropDown selection={years} selected={answer || initialAnswer} callback={callback} optionKey="constructionPeriod" />
  );
};
