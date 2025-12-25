import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, waitFor } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Components
import PageHeader from '..';

const renderer = new ShallowRenderer();

describe('PageHeader', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Theme>
        <PageHeader embedKey="DEVELOPERS">
          <span>Developers - Payouts - </span>
          API Metrics
        </PageHeader>
      </Theme>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(
      <Theme>
        <PageHeader embedKey="DEVELOPERS">
          <span>Developers - Payouts - </span>
          API Metrics
        </PageHeader>
      </Theme>,
    );

    await waitFor(() => {
      expect(screen.queryByText('API Metrics')).toBeInTheDocument();
      expect(screen.queryByText(/Developers - Payouts -/)).toBeInTheDocument();
    });
  });
});
