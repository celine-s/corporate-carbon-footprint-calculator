import React from 'react';
import { Meta } from '@storybook/react';

import { Footer as FooterComponent } from '../../components/footer';

export default {
  title: 'Components/Footer',
  component: FooterComponent,
} as Meta;

export const Footer = () => () => <FooterComponent>Footer</FooterComponent>;
