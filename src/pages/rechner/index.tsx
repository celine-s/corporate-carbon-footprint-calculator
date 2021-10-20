import { NextPage } from 'next';
import { Heading1 } from '../../identity/heading-1';
import { Page } from '../../layouts/page';

type Props = {
  className?: string;
};

const Rechner: NextPage<Props> = ({ className = '' }) => {
  return (
    <Page>
      <Heading1>willkomme zum rechner</Heading1>
    </Page>
  );
};

export default Rechner;
