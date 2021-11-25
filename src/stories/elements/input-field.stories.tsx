import React from 'react';
import { Story, Meta } from '@storybook/react';
import { InputField, InputFieldProps } from '../../elements/input-field';

export default {
  title: 'Elements/Input',
  element: InputField,
} as Meta;

const InputTemplate: Story<InputFieldProps> = (props) => <InputField {...props}>InputField</InputField>;

export const Input = InputTemplate.bind({});
Input.args = {
  type: 'number',
  id: 'number',
  name: 'answer',
  step: '1',
  placeholder: '0',
  min: '0',
  max: '100',
};

export const InputWithLabel = InputTemplate.bind({});
InputWithLabel.args = {
  type: 'number',
  label: 'Flugstunden',
  id: 'number',
  name: 'answer',
  step: '1',
  placeholder: '0',
  min: '0',
  max: '100',
};

export const InputValidationError = InputTemplate.bind({});
InputValidationError.args = {
  type: 'number',
  label: 'Flugstunden',
  id: 'number',
  name: 'answer',
  placeholder: '0',
  step: '1',
  min: '0',
  max: '100',
};
