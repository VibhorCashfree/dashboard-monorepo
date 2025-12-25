import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import Loader from '..';

// Styled
// import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

describe('Loader', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(<Loader />);

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
