import React from 'react';
import renderer from 'react-test-renderer';

// Components
import BankAccountRPD from '..';
import Wrapper from '__tests__/components/Wrapper';

describe('BankAccountRPD Page', () => {
  test('Render & match the snapshot', () => {
    const output = renderer.create(
      <Wrapper>
        <BankAccountRPD />
      </Wrapper>,
    );

    expect(output).toMatchSnapshot();
  });
});
