import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import DetailsApprovals from '..';

const renderer = new ShallowRenderer();

describe('DetailsApprovals', () => {
  test('shallow render & match the snapshot', () => {
    const data = [
      { name: 'John', date: new Date('02/02/21'), type: 'success' },
    ];

    renderer.render(<DetailsApprovals data={data} />);

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
