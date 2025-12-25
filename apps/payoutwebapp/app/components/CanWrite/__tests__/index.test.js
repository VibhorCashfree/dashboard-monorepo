import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import Wrapper from '__tests__/components/Wrapper';
import CanWrite from '..';

const renderer = new ShallowRenderer();

describe('CanWrite', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <CanWrite code={21002}>
          <div>Some content</div>
        </CanWrite>
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
