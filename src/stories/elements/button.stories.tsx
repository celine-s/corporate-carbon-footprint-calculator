import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from '../../elements/button';

export default {
  title: 'Elements/Button',
  element: Button,
} as Meta;

const ButtonTemplate: Story<ButtonProps> = (props) => <Button {...props}>Button</Button>;

export const Small = ButtonTemplate.bind({});
Small.args = {
  size: 'S',
};

export const Large = ButtonTemplate.bind({});
Large.args = {
  size: 'L',
};

export const Gray = ButtonTemplate.bind({});
Large.args = {
  size: 'S',
  buttonColorGray: true,
};
