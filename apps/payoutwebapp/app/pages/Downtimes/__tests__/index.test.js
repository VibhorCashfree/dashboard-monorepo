import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import Downtimes from '..';

const renderer = new ShallowRenderer();

describe('In Downtimes Container', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(<Wrapper />);

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<Downtimes />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('No data found!')).toBeInTheDocument();
      expect(screen.queryByText('Status')).toBeInTheDocument();
      expect(screen.queryByText('Start Time')).toBeInTheDocument();
      expect(screen.queryByText('End Time')).toBeInTheDocument();
      expect(screen.queryByText('Payment Mode')).toBeInTheDocument();
      expect(screen.queryByText('Incident Type')).toBeInTheDocument();
      expect(screen.queryByText('Connected Fund Source')).toBeInTheDocument();
    });
  });
});
