import { NextPage } from 'next';
import { LinkElement } from '../../elements/link';
import { Heading1 } from '../../identity/heading-1';
import { Page } from '../../layouts/page';

const Rechner: NextPage = () => {
  return (
    <Page>
      <Heading1>willkomme zum rechner</Heading1>
      <LinkElement href="/rechner/frage">zur ersten Frage</LinkElement>
    </Page>
  );
};

export default Rechner;
