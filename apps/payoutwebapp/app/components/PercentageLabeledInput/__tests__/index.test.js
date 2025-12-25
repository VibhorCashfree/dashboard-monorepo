import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import PercentageLabeledInput from '..';

const renderer = new ShallowRenderer();

describe('PercentageLabeledInput', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <PercentageLabeledInput
        fluid
        width={12}
        name="percentage"
        label="Percentage"
        type="text"
        placeholder="Percentage"
        value="70"
        onChange={jest.fn()}
      />,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
