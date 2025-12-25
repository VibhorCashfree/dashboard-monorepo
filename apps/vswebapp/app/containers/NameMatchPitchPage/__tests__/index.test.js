import React from 'react';
import renderer from 'react-test-renderer';

// Components
import UPImobilePitchPage from '..';
import Wrapper from '__tests__/components/Wrapper';

describe('UPImobilePitchPage', () => {
  test('Render & match the snapshot', () => {
    const output = renderer.create(
      <Wrapper>
        <UPImobilePitchPage />
      </Wrapper>,
    );

    expect(output).toMatchSnapshot();
  });
});
