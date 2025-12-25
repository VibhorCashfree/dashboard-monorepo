import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import ApprovalsModalInfo from '..';

const renderer = new ShallowRenderer();

describe('ApprovalsModalInfo', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <ApprovalsModalInfo fileName="Input.csv" count="12" amount="100" />,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
