import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, fireEvent } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Components
import PageHeader from '..';

const renderer = new ShallowRenderer();

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockHistoryPush,
}));

describe('PageHeader', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Theme>
        <PageHeader embedKey="DEVELOPERS">
          <span>Developers - Verification Suite - </span>
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
        <PageHeader embedKey="SUMMARY">
          <span>Developers - Verification Suite - </span>
          API Metrics
        </PageHeader>
      </Theme>,
    );

    expect(screen.queryByText('Bank Downtime Status')).toBeInTheDocument();

    fireEvent.click(screen.queryByText('Bank Downtime Status'));
  });
});
