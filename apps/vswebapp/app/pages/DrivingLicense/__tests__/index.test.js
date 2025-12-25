import React from 'react';
import renderer from 'react-test-renderer';

// Components
import PanOCR from '..';
import Wrapper from '__tests__/components/Wrapper';

describe('PanOCR Page', () => {
  test('Render & match the snapshot', () => {
    const output = renderer.create(
      <Wrapper>
        <PanOCR />
      </Wrapper>,
    );

    expect(output).toMatchSnapshot();
  });
});
