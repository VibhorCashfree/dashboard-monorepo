import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import Copy from '..';
import Wrapper from '__tests__/components/Wrapper';

const renderer = new ShallowRenderer();

describe('Copy', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(<Copy value="skhf92ug64" />);

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<Copy value="skhf92ug64" />, {
      wrapper: Wrapper,
    });

    await waitFor(async () => {
      fireEvent.click(screen.getByTestId('copy-btn'));

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('skhf92ug64');
    });
  });

  test('checks render Null', async () => {
    renderer.render(<Copy value={null} />);

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
