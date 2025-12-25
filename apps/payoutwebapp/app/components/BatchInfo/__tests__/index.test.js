import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import BatchInfo from '..';

const renderer = new ShallowRenderer();

describe('BatchInfo', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <BatchInfo
        fileName="Input.csv"
        fileId={123}
        uploadedAt="2020-01-30T15:51:44+05:30"
        uploadedBy="John Doe"
        status="Rejected"
        amount="100"
        currency="INR"
      />,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
