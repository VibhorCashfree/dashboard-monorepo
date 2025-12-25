import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Utils
import Env from 'utils/env';
import { store } from '__tests__/utils';

// Services
import * as AccountsService from 'services/accounts';

// Components
import Wrapper from '__tests__/components/Wrapper';
import FreeCreditsBanner from '..';

const shallowRenderer = new ShallowRenderer();

beforeEach(() => {
  jest
    .mock('utils/env')
    .spyOn(Env, 'isTest')
    .mockImplementation(() => false);

  jest.mock('services/accounts');

  store.dispatch({
    type: 'FETCH_FREE_CREDITS',
    payload: { valid: false },
  });
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('FreeCreditsBanner', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Wrapper>
        <FreeCreditsBanner />
      </Wrapper>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    const fetchFreeCreditsMock = jest.fn();

    jest
      .spyOn(AccountsService, 'enableFreeTrial')
      .mockImplementation(() =>
        Promise.resolve({ VrsFreeTrialEnabled: false }),
      );

    render(<FreeCreditsBanner fetchFreeCredits={fetchFreeCreditsMock} />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Congratulations! Claim free credits worth ₹ 100.00 and start testing KYC services before it expires.',
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText('Instant KYC')).toBeInTheDocument();
      expect(screen.queryByText('Free Credits')).toBeInTheDocument();
    });

    const claimButton = screen.queryByRole('button', {
      name: 'Claim Free credits',
    });

    expect(claimButton).not.toBeDisabled();
    expect(claimButton).toBeInTheDocument();

    fireEvent.click(claimButton);

    expect(AccountsService.enableFreeTrial).toHaveBeenCalledWith();
    // expect(fetchFreeCreditsMock).toHaveBeenCalled();
  });

  test('checks render without productLabel', async () => {
    const fetchFreeCreditsMock = jest.fn();

    jest
      .spyOn(AccountsService, 'enableFreeTrial')
      .mockImplementation(() => Promise.resolve({ VrsFreeTrialEnabled: true }));

    render(<FreeCreditsBanner fetchFreeCredits={fetchFreeCreditsMock} />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Congratulations! Claim free credits worth ₹ 100.00 and start testing KYC services before it expires.',
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText('Instant KYC')).toBeInTheDocument();
      expect(screen.queryByText('Free Credits')).toBeInTheDocument();
    });

    const claimButton = screen.queryByRole('button', {
      name: 'Claim Free credits',
    });

    expect(claimButton).not.toBeDisabled();
    expect(claimButton).toBeInTheDocument();

    fireEvent.click(claimButton);

    expect(AccountsService.enableFreeTrial).toHaveBeenCalled();
  });

  test('checks render with productLabel', async () => {
    const fetchFreeCreditsMock = jest.fn();

    jest
      .spyOn(AccountsService, 'enableFreeTrial')
      .mockImplementation(() => Promise.resolve({ VrsFreeTrialEnabled: true }));

    render(
      <FreeCreditsBanner
        productLabel="foo"
        fetchFreeCredits={fetchFreeCreditsMock}
      />,
      {
        wrapper: Wrapper,
      },
    );

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Claim your Free credits worth ₹ 100.00 and start verifying foo for free.',
        ),
      ).toBeInTheDocument();
    });

    const claimButton = screen.queryByRole('button', {
      name: 'Claim Free credits',
    });

    expect(claimButton).not.toBeDisabled();
    expect(claimButton).toBeInTheDocument();

    fireEvent.click(claimButton);

    expect(AccountsService.enableFreeTrial).toHaveBeenCalledWith();
  });
});
