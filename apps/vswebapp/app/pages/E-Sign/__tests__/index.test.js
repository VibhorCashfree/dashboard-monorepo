import React from 'react';
import renderer from 'react-test-renderer';

// Components
import ESign from '..';
import Wrapper from '__tests__/components/Wrapper';

describe('E-Sign Page', () => {
  test('Render & match the snapshot', () => {
    const output = renderer.create(
      <Wrapper>
        <ESign />
      </Wrapper>,
    );

    expect(output).toMatchSnapshot();
  });
});
