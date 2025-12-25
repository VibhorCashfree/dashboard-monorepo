import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import Icon from '..';

const renderer = new ShallowRenderer();

describe('Icon', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Icon name="copy" className="pointer ml-1" onClick={jest.fn()} />,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
