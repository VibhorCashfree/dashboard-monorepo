import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import AmountLabeledInput from '..';

const renderer = new ShallowRenderer();

describe('AmountLabeledInput', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <AmountLabeledInput
        fluid
        width={12}
        name="amount"
        label="Amount"
        inputmode="numeric"
        step=".01"
        placeholder="Amount"
        value="100"
        onChange={jest.fn()}
      />,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
