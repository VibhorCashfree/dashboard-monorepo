import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Pages
import IntegrationChecklist from '..';

const renderer = new ShallowRenderer();

describe('In IntegrationChecklist page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(<Wrapper />);

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<IntegrationChecklist />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('Integration Checklist')).toBeInTheDocument();
      expect(
        screen.queryByText(/Please ensure that you are/),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          /Generate API keys from the merchant dashboard under the/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          /Please note that only one Public Key can be generated at a time/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/generating the x-cf-signature/),
      ).toBeInTheDocument();
      expect(screen.queryByText('Direct transfer API')).toBeInTheDocument();
      expect(screen.queryByText('Troubleshooting')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Share the API request and response details along with x-client-ID only',
        ),
      ).toBeInTheDocument();

      expect(screen.queryAllByText('Two-Factor Authentication').length).toBe(2);
      expect(screen.queryAllByText('care@cashfree.com').length).toBe(2);
    });
  });
});
