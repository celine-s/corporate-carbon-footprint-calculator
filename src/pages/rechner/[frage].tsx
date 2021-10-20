import { NextPage } from 'next';
import { Heading1 } from '../../identity/heading-1';
import { Page } from '../../layouts/page';

type Props = {
  xy?: string;
};

const Frage: NextPage<Props> = () => {
  return (
    <Page>
      <Heading1>Willkomme bide erste Frage</Heading1>
    </Page>
  );
};

export default Frage;
