import React from 'react';
import renderer from 'react-test-renderer';

// Components
import DigiLocker from '..';
import Wrapper from '__tests__/components/Wrapper';

describe('DigiLocker Page', () => {
  test('Render & match the snapshot', () => {
    const output = renderer.create(
      <Wrapper>
        <DigiLocker />
      </Wrapper>,
    );

    expect(output).toMatchSnapshot();
  });
});
