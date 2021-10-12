import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from '../../elements/button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const ButtonTemplate: Story<ButtonProps> = (props) => <Button {...props}></Button>;

export const Small = ButtonTemplate.bind({});
Small.args = {
  size: 'S',
  label: 'Button',
};

export const Large = ButtonTemplate.bind({});
Large.args = {
  size: 'L',
  label: 'Button',
};
