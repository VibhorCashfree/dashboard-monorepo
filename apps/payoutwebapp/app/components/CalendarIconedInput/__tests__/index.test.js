import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import CalendarIconedInput from '..';

const renderer = new ShallowRenderer();

describe('CalendarIconedInput', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <CalendarIconedInput
        fluid
        width={12}
        name="date"
        type="text"
        label="Select Date"
        placeholder="Select Date"
        value="12/Jun/2020"
        onChange={jest.fn()}
      />,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
