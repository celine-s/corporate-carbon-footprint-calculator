import React from 'react';
import { Meta, Story } from '@storybook/react';

import { LinkElement, LinkProps } from '../../elements/link';

export default {
  title: 'Elements/Link',
  element: LinkElement,
} as Meta;
const LinkElementTemplate: Story<LinkProps> = (args) => <LinkElement {...args}>Ich bin ein Link</LinkElement>;

export const Link = LinkElementTemplate.bind({});
Link.args = {
  href: '#',
};
