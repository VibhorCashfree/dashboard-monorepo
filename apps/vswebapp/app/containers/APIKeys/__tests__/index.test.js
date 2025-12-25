import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { TwoFactorProvider } from 'pages/Developers/providers';

// Services
import * as DevelopersService from 'services/developers';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Containers
import APIKeys from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <TwoFactorProvider>{children}</TwoFactorProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/developers');

  jest.spyOn(DevelopersService, 'getAPIKeys').mockImplementation(() =>
    Promise.resolve({
      activeAPIKeys: [
        {
          clientId: 'CF1848CD38KTSDG7OS82GMO3JG',
          clientSecret: 'a2021xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx82b19',
          addedOn: '2022-10-12T15:05:51+05:30',
          generatedBy: 'Logesh',
        },
        {
          clientId: 'CF1848CB79PTHAI9AE1ON2FP60',
          clientSecret: 'cb61fxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx5c560',
          addedOn: '2022-07-13T15:52:46+05:30',
          generatedBy: 'Venkatesh Raju',
        },
        {
          clientId: 'CF1848CB6IK5UALPJ8JG3DNLBG',
          clientSecret: 'dd6acxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx024bb',
          addedOn: '2022-07-12T13:30:23+05:30',
          generatedBy: 'Logesh',
        },
        {
          clientId: 'CF1848C86CKHM2HA3KP9U0GESG',
          clientSecret: '9757bxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxb0249',
          addedOn: '2022-02-16T15:26:22+05:30',
          generatedBy: 'Rahul Mallik',
        },
      ],
    }),
  );

  jest
    .spyOn(DevelopersService, 'removeAPIKey')
    .mockImplementation(() => Promise.resolve({ response: 'SUCCESS' }));

  jest.spyOn(DevelopersService, 'addAPIKey').mockImplementation(() =>
    Promise.resolve({
      clientId: 'CF177CKQCB3UCDRN3V1PB0DQ0',
      clientSecret: '0dd3c00114c173a6e617bb94b9fe494874f48a11',
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In APIKeys Container', () => {
  test('checks render', async () => {
    render(<APIKeys />, { wrapper: CustomWrapper });

    expect(DevelopersService.getAPIKeys).toHaveBeenCalled();

    await waitFor(() => {
      fireEvent.click(screen.queryByText('Generate API Keys'));
      expect(screen.queryByText('Rahul Mallik')).toBeInTheDocument();
      expect(screen.queryAllByText('Logesh').length).toBe(2);
      expect(
        screen.queryByText('CF1848CB6IK5UALPJ8JG3DNLBG'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('CF1848CD38KTSDG7OS82GMO3JG'),
      ).toBeInTheDocument();

      const deleteIcon = screen.getAllByTestId('delete-icon');

      fireEvent.click(deleteIcon[0]);
      fireEvent.click(screen.queryByText(/Delete Immediately/));

      fireEvent.click(screen.queryByText('View History'));
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.ADD}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        handleDelete={jest.fn()}
        selected="foo bar"
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('New API Keys')).toBeInTheDocument();

      expect(
        screen.queryByText(
          'Download the API keys and keep it safe. You will not be able to see the Client Secret after you close this screen.',
        ),
      ).toBeInTheDocument();

      expect(DevelopersService.addAPIKey).toHaveBeenCalledWith();
      expect(setFetchCounter).toHaveBeenCalled();

      const submitButton = screen.queryByRole('button', {
        name: 'Download API Keys',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(setModalType).toHaveBeenCalled();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.DELETE}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        handleDelete={jest.fn()}
        selected="foo bar"
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Delete API Keys')).toBeInTheDocument();

      expect(
        screen.queryByText(
          'You will not be able to perform any action with this API key after you delete it.',
        ),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Delete Immediately',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(DevelopersService.removeAPIKey).toHaveBeenCalledWith('foo bar');

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });
});
