import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  // act,
  render,
  screen,
  waitFor,
  // fireEvent,
} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { Theme } from '@cashfree-intl/coherent';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Utils
// import Emitter from 'utils/emitter';

// Mocks
import {
  mockAccountProvider,
  mockMerchantProvider,
} from '__mocks__/common.mock';

// Services
import * as OTPService from 'services/otp';
import * as AccountsService from 'services/accounts';

// Components
// import OTPModal from '../components/OTPModal';
import AccountSwitcherModal from '../components/AccountSwitcherModal';

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => (
  <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
    <Theme>
      <MerchantContext.Provider value={mockMerchantProvider}>
        <AccountContext.Provider
          value={{ ...mockAccountProvider, openSwitch: true }}
        >
          {children}
        </AccountContext.Provider>
      </MerchantContext.Provider>
    </Theme>
  </MemoryRouter>
);

beforeEach(() => {
  jest.mock('services/otp');

  jest
    .spyOn(OTPService, 'validate2FA')
    .mockImplementation(() => Promise.resolve({}));

  jest.spyOn(OTPService, 'verify2FA').mockImplementation(() =>
    Promise.resolve({
      error: { status: 'foo' },
    }),
  );

  jest.spyOn(AccountsService, 'get2FASettings').mockImplementation(() =>
    Promise.resolve({
      data: {
        phone: '+91xxxxxx6042',
        countryCode: '+91',
        authType: 'OTP',
        otpChannel: ['SMS'],
      },
      status: 'SUCCESS',
      message: '2FA settings fetched',
    }),
  );

  jest
    .spyOn(OTPService, 'sendOTP')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In App Container', () => {
  test('<AccountSwitcherModal>', async () => {
    render(<AccountSwitcherModal />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('Select Payouts Account')).toBeInTheDocument();
      expect(screen.queryByText('Select Payouts Account')).toHaveClass(
        'header',
      );
      expect(screen.queryByText('Raj Nandan Sharma')).toBeInTheDocument();
    });
  });

  // test('<OTPModal>', async () => {
  //   render(
  //     <OTPModal
  //       authSettings={{
  //         phone: '+91xxxxxx6042',
  //         countryCode: '+91',
  //         authType: 'OTP',
  //         otpChannel: ['SMS'],
  //       }}
  //     />,
  //     { wrapper: Wrapper },
  //   );

  //   await waitFor(
  //     async () => {
  //       const callback = jest.fn();

  //       act(() => {
  //         Emitter.emit('VALIDATE_USER', callback);
  //       });

  //       expect(OTPService.validate2FA).toBeCalledWith();

  //       expect(callback).not.toBeCalled();

  //       expect(await screen.findByText('Resend OTP')).toBeInTheDocument();
  //       // expect(screen.queryByText('Enter OTP')).toBeInTheDocument();
  //       expect(
  //         screen.queryByText(
  //           'This authentication is valid for the current session only.',
  //         ),
  //       ).toBeInTheDocument();
  //       expect(screen.queryByText('(00:30)')).toBeInTheDocument();
  //       expect(
  //         screen.queryByText(/Enter the 6-digit OTP sent to your phone number/),
  //       ).toBeInTheDocument();

  //       const submitButton = screen.queryByRole('button', {
  //         name: 'Confirm',
  //       });

  //       expect(submitButton).toHaveClass('ml-2');
  //       expect(submitButton).toBeDisabled();
  //       expect(submitButton).toBeInTheDocument();

  //       const inputEls = screen
  //         .queryByText('Enter OTP')
  //         .nextSibling.querySelectorAll('input');

  //       await act(async () => {
  //         await userEvent.type(inputEls[0], '1');
  //         await userEvent.type(inputEls[1], '1');
  //         await userEvent.type(inputEls[2], '1');
  //         await userEvent.type(inputEls[3], '1');
  //         await userEvent.type(inputEls[4], '1');
  //         await userEvent.type(inputEls[5], '1');
  //       });

  //       expect(submitButton).not.toBeDisabled();

  //       fireEvent.click(submitButton);

  //       expect(OTPService.verify2FA).toHaveBeenCalledWith('111111');

  //       const cancelButton = screen.queryByText('Cancel');

  //       expect(cancelButton).not.toBeDisabled();
  //       expect(cancelButton).toBeInTheDocument();
  //     },
  //     { timeout: 8000 },
  //   );
  // });
});
