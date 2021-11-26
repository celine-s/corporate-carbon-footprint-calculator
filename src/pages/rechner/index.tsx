import { NextPage } from 'next';
import { LinkElement } from '../../elements/link';
import { Sidebar } from '../../layouts/sidebar';

const Rechner: NextPage = () => {
  return (
    <Sidebar>
      <LinkElement href="/rechner/1" border={true}>
        ersti Frag
      </LinkElement>
    </Sidebar>
  );
};

export default Rechner;
