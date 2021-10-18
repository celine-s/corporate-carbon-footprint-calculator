import { NextPage } from 'next';
import { Page } from '../../layouts/page';

type Props = {
  className?: string;
};

const Rechner: NextPage<Props> = ({ className = '' }) => {
  return (
    <Page>
      <h1 className={`${className}`}>willkomme zum rechner</h1>
    </Page>
  );
};

export default Rechner;
