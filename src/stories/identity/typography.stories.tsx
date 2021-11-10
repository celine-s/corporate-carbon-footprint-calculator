import React from 'react';
import { Meta } from '@storybook/react';

import { Heading1 } from '../../identity/heading-1';
import { Heading2 } from '../../identity/heading-2';
import { Copy } from '../../identity/copy';

export default {
  title: 'Identity/Typography',
} as Meta;

export const Typography = () => (
  <div>
    <Heading1>Heading 1: Hey!</Heading1>
    <Heading2>Heading 2: Hey!</Heading2>
    <Copy>Copy: Hey!</Copy>
  </div>
);
