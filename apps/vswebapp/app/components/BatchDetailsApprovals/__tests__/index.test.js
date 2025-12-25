import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import BatchDetailsApprovals from '..';

const renderer = new ShallowRenderer();

describe('BatchDetailsApprovals', () => {
  test('shallow render & match the snapshot', () => {
    const data = [
      { name: 'John', date: new Date('02/02/21'), type: 'success' },
    ];

    renderer.render(
      <BatchDetailsApprovals data={data} count="2" totalCount="3" />,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
