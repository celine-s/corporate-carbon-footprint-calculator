import { NextPage } from 'next';
import { LinkElement } from '../../elements/link';
import { CategoriesNavigation } from '../../compositions/sidebar';

const Rechner: NextPage = () => {
  return (
    <CategoriesNavigation>
      <LinkElement href="/rechner/1" border={true}>
        ersti Frag
      </LinkElement>
    </CategoriesNavigation>
  );
};

export default Rechner;
