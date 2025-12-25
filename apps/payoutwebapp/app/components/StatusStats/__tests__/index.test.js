import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import StatusStats from '..';

const renderer = new ShallowRenderer();

describe('StatusStats', () => {
  test('shallow render & match the snapshot', () => {
    const data = {
      totalRecords: 10,
      invalid: 2,
      success: 7,
      failed: 1,
    };

    renderer.render(<StatusStats data={data} />);

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
