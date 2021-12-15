import { NextPage } from 'next';
import { Page } from '../../layouts/page';
import { Heading2 } from '../../identity/heading-2';
import { LinkElement } from '../../elements/link';
import { InputField } from '../../elements/input-field';
import React from 'react';

const Report: NextPage = () => {
  return (
    <Page>
      <Heading2>You successfully saved all data.</Heading2>
      <div className="md:flex grid">
        <InputField
          value=""
          onChange={() => console.log('sent email')}
          id="email"
          label="Send me the report"
          placeholder="franz@gmail.com"
        ></InputField>
        <div className="my-4 flex items-center">
          <LinkElement href="/rechner/1" border={true}>
            Back to Calculator
          </LinkElement>
        </div>
      </div>
    </Page>
  );
};

export default Report;
