import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Providers
import { TwoFactorProvider } from 'pages/Developers/providers';

// Services
import * as AccountsService from 'services/accounts';
import * as DevelopersService from 'services/developers';

// Constants
import { MODAL_TYPE } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Containers
import TwoFactorAuth from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <TwoFactorProvider>{children}</TwoFactorProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/developers');
  jest.mock('services/accounts');

  jest.spyOn(AccountsService, 'getMerchantPreference').mockImplementation(() =>
    Promise.resolve({
      ipCheckDisabled: '0',
    }),
  );

  jest
    .spyOn(DevelopersService, 'addIPs')
    .mockImplementation(() => Promise.resolve({}));

  jest.spyOn(DevelopersService, 'getIPs').mockImplementation(() =>
    Promise.resolve({
      authIPs: [
        {
          merchantIP: '149.129.186.108',
          addedOn: '2022-11-28T13:07:20+05:30',
          isActive: 1,
          isApproved: 1,
          generatedBy: 'Logesh',
        },
        {
          merchantIP: '149.129.176.210',
          addedOn: '2022-11-28T10:33:07+05:30',
          isActive: 0,
          isApproved: 1,
          generatedBy: 'Logesh',
        },
      ],
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In TwoFactorAuth Container', () => {
  test('checks render', async () => {
    render(<TwoFactorAuth />, { wrapper: CustomWrapper });

    expect(AccountsService.getMerchantPreference).toHaveBeenCalled();
    expect(DevelopersService.getIPs).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryAllByText('Logesh').length).toBe(1);
      expect(screen.queryByText('149.129.186.108')).toBeInTheDocument();
      expect(screen.queryByText('Add IP Address')).toBeInTheDocument();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.ADD}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        handleSwitchMethod={jest.fn()}
        deletePublicKey={jest.fn()}
        deleteIPAddress={jest.fn()}
        data={{ id: 123 }}
        currentMethod="foobar"
        selected="31.22.4.66"
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(
      async () => {
        expect(screen.queryAllByText('Add IP Address').length).toBe(2);
        expect(
          screen.queryByText('Use comma (,) to add multiple IPs'),
        ).toBeInTheDocument();
        expect(
          screen.queryByPlaceholderText('Ex: 000.000.00.000,111.111.11.111'),
        ).toBeInTheDocument();

        const cancelButton = screen.queryByText('Cancel');

        expect(cancelButton).not.toBeDisabled();
        expect(cancelButton).toBeInTheDocument();

        const submitButton = screen.queryByRole('button', {
          name: 'Add IP Address',
        });

        expect(submitButton).toHaveClass('ml-4');
        expect(submitButton).toBeInTheDocument();

        const input = screen.queryByPlaceholderText(
          'Ex: 000.000.00.000,111.111.11.111',
        );
        await userEvent.type(input, '127.0.0.1');
        expect(input.value).toBe('127.0.0.1');

        expect(
          screen.queryByText('Enter a Public IP address - 127.0.0.1'),
        ).toBeInTheDocument();

        expect(submitButton).toBeDisabled();

        await userEvent.clear(input);

        await userEvent.type(input, '33.3.4');
        expect(input.value).toBe('33.3.4');

        expect(
          screen.queryByText('Enter a valid IP address - 33.3.4'),
        ).toBeInTheDocument();

        expect(submitButton).toBeDisabled();

        await userEvent.clear(input);

        await userEvent.type(input, '22.22.22.22');
        expect(input.value).toBe('22.22.22.22');

        expect(submitButton).not.toBeDisabled();

        fireEvent.click(submitButton);

        expect(DevelopersService.addIPs).toHaveBeenCalledWith(['22.22.22.22']);

        // expect(setFetchCounter).toHaveBeenCalled();
        // expect(setModalType).toHaveBeenCalled();
      },
      { timeout: 7000 },
    );
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.GENERATE}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        handleSwitchMethod={jest.fn()}
        deletePublicKey={jest.fn()}
        deleteIPAddress={jest.fn()}
        data={{ id: 123, merchantEmail: 'yes@no.com' }}
        currentMethod="foobar"
        selected="31.22.4.66"
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Generate Public Key')).toBeInTheDocument();
      expect(
        screen.queryByText('Public Key will be downloaded automatically.'),
      ).toBeInTheDocument();

      expect(screen.queryByText('30%')).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Ok',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setFetchCounter).toHaveBeenCalled();
      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.SWITCH}
        setModalType={setModalType}
        setFetchCounter={jest.fn()}
        handleSwitchMethod={jest.fn()}
        deletePublicKey={jest.fn()}
        deleteIPAddress={jest.fn()}
        data={{ id: 123 }}
        currentMethod="foobar"
        selected="31.22.4.66"
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Switch Method')).toBeInTheDocument();

      expect(
        screen.queryByText('Use IP Whitelist as the 2FA method?'),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Yes',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const deletePublicKey = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.DELETE_PUBLIC_KEY}
        setModalType={setModalType}
        setFetchCounter={jest.fn()}
        handleSwitchMethod={jest.fn()}
        deletePublicKey={deletePublicKey}
        deleteIPAddress={jest.fn()}
        data={{ id: 123 }}
        currentMethod="foobar"
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Delete Public Key')).toBeInTheDocument();

      expect(
        screen.queryByText('Are you sure you want to delete this public key?'),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Delete',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(deletePublicKey).toHaveBeenCalled();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const deleteIPAddress = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.DELETE_IP}
        setModalType={setModalType}
        setFetchCounter={jest.fn()}
        handleSwitchMethod={jest.fn()}
        deletePublicKey={jest.fn()}
        deleteIPAddress={deleteIPAddress}
        data={{ id: 123 }}
        currentMethod="foobar"
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Delete IP Address')).toBeInTheDocument();

      expect(
        screen.queryByText(/Are you sure you want to delete this IP address/),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Delete',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(deleteIPAddress).toHaveBeenCalled();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });
});
