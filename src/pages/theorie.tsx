import { NextPage } from 'next';
import { Copy } from '../identity/copy';
import { Heading1 } from '../identity/heading-1';
import { Page } from '../layouts/page';

type Props = {
  xy?: string;
};

const Theorie: NextPage<Props> = () => {
  return (
    <Page>
      <Heading1>Theorie</Heading1>
      <Copy>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vero id neque accusamus! Repudiandae nostrum
        doloremque quidem rerum in maiores, facilis, harum officia perspiciatis dolor pariatur nesciunt amet modi minima.
      </Copy>
    </Page>
  );
};

export default Theorie;
