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
import Webhook from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <TwoFactorProvider>{children}</TwoFactorProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/developers');

  jest.spyOn(DevelopersService, 'getWebhook').mockImplementation(() =>
    Promise.resolve({
      webhookUrl: 'https://webhook.site/c3c6c4d4-40a3-4e45-90de-0ec43b44f266',
    }),
  );

  jest
    .spyOn(DevelopersService, 'addWebhook')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(DevelopersService, 'testWebhook')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(DevelopersService, 'removeWebhook')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In Webhook Container', () => {
  test('checks render', async () => {
    render(<Webhook />, { wrapper: CustomWrapper });

    expect(DevelopersService.getWebhook).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText('Add Webhook URL')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'https://webhook.site/c3c6c4d4-40a3-4e45-90de-0ec43b44f266',
        ),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Only one webhook URL can be added at a time.'),
      ).toBeInTheDocument();
    });
  });

  test('checks Modals render', async () => {
    const handleDelete = jest.fn();
    const handleClose = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.DELETE}
        setFetchCounter={jest.fn()}
        handleDelete={handleDelete}
        handleClose={handleClose}
        selected="https://www.website.com"
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Delete Webhook URL')).toBeInTheDocument();

      expect(
        screen.queryByText(
          'You will not be able to receive notifications on this URL after you delete it.',
        ),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Delete',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(handleDelete).toHaveBeenCalled();
      expect(DevelopersService.removeWebhook).toHaveBeenCalled();
      expect(handleClose).toHaveBeenCalled();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(handleClose).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const handleClose = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.ADD}
        setFetchCounter={jest.fn()}
        handleDelete={jest.fn()}
        handleClose={handleClose}
        selected="https://www.website.com"
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      const submitButton = screen.queryByRole('button', {
        name: 'Test & Add Webhook',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(DevelopersService.testWebhook).toHaveBeenCalledWith({
        url: 'https://www.website.com',
        contentType: 'JSON',
      });

      const input = screen.queryByPlaceholderText(/example.com/);
      expect(input.value).toBe('www.website.com');

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(handleClose).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const handleClose = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.EDIT}
        setFetchCounter={jest.fn()}
        handleDelete={jest.fn()}
        handleClose={handleClose}
        selected="https://www.website.com"
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      const submitButton = screen.queryByRole('button', {
        name: 'Test & Edit Webhook',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(DevelopersService.testWebhook).toHaveBeenCalledWith({
        url: 'https://www.website.com',
        contentType: 'JSON',
      });

      const input = screen.queryByPlaceholderText(/example.com/);
      expect(input.value).toBe('www.website.com');

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(handleClose).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const handleClose = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.TEST}
        setFetchCounter={jest.fn()}
        handleDelete={jest.fn()}
        handleClose={handleClose}
        selected="https://www.website.com"
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      const submitButton = screen.queryByRole('button', {
        name: 'Test Webhook',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(DevelopersService.testWebhook).toHaveBeenCalledWith({
        url: 'https://www.website.com',
        contentType: 'JSON',
      });

      const input = screen.queryByPlaceholderText(/example.com/);
      expect(input.value).toBe('www.website.com');

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(handleClose).toHaveBeenCalled();
    });
  });
});
