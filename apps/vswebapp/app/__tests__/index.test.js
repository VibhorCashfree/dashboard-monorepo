import React from 'react';
import { render, screen } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import Wrapper from './components/Wrapper';

const renderer = new ShallowRenderer();

describe('Wrapper', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(<Wrapper />);

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<Wrapper>hello world</Wrapper>);

    await screen.findByText('hello world');
  });
});
