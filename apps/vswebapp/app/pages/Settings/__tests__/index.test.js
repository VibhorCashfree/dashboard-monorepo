import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Pages
import Settings from '..';

const renderer = new ShallowRenderer();

describe('In Settings page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <Settings />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks Settings', async () => {
    render(<Settings />, { wrapper: Wrapper });

    await waitFor(async () => {
      expect(
        await screen.findByText('Merchant Notifications'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Add Recipient')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Configure the email category that you want to get notified about. Click Add Recipient to add members in your organization to receive the emails.',
        ),
      ).toBeInTheDocument();
    });
  });
});
