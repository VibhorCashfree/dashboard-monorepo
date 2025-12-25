import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import MetaTags from '..';

const renderer = new ShallowRenderer();

describe('MetaTags', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(<MetaTags title="Settings – Verification Suite" />);

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
