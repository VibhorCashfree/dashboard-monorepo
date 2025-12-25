import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import PhoneLabeledInput from '..';

const renderer = new ShallowRenderer();

describe('PhoneLabeledInput', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <PhoneLabeledInput
        fluid
        width={12}
        name="phone"
        label="Phone number"
        type="text"
        placeholder="Phone number"
        value="98765432"
        onChange={jest.fn()}
      />,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
