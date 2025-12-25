import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as BeneficiariesService from 'services/beneficiaries';

// Constants
import { MODAL_TYPE } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Containers
import RevalidateBeneficiaries from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/beneficiaries');

  jest.spyOn(BeneficiariesService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 1994555,
          addedOn: '2024-03-12T18:19:06',
          beneId: '9747392524_1710247745',
          name: 'JOHN DOE',
          email: 'john@example.com',
          phone: '9747392524',
          vpa: 'success@upi',
          bankAccount: '00011020001772',
          ifsc: 'HDFC0000001',
          status: 'INVALID',
          benePurpose: 'AMAZON_UPI_BENE',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(BeneficiariesService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest
    .spyOn(BeneficiariesService, 'revalidateBeneficiaries')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In RevalidateBeneficiaries Container', () => {
  test('checks render', async () => {
    render(<RevalidateBeneficiaries />, { wrapper: CustomWrapper });

    expect(BeneficiariesService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        status: ['INVALID'],
        size: 10,
        lastId: '0',
      }),
    );
    expect(BeneficiariesService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        status: ['INVALID'],
        size: 10,
        lastId: '0',
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('AMAZON_UPI_BENE')).toBeInTheDocument();
      expect(screen.queryByText('success@upi')).toBeInTheDocument();
      expect(screen.queryByText('JOHN DOE')).toBeInTheDocument();
      expect(screen.queryByText('john@example.com')).toBeInTheDocument();
      expect(screen.queryByText('Beneficiary Purpose')).toBeInTheDocument();
      expect(screen.queryByText('Status')).toBeInTheDocument();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const handleAction = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.REVALIDATE}
        setModalType={setModalType}
        count="2"
        handleAction={handleAction}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Revalidate Beneficiaries'),
      ).toBeInTheDocument();

      expect(
        screen.queryByText(
          'Are you sure you want to revalidate the selected beneficiaries?',
        ),
      ).toBeInTheDocument();

      expect(screen.queryByText('File Name')).not.toBeInTheDocument();

      expect(screen.queryByText('Count')).toBeInTheDocument();

      expect(screen.queryByText('Amount')).not.toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Revalidate',
      });

      expect(submitButton).toHaveClass('ml-2');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(handleAction).toHaveBeenCalled();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.REVALIDATED_SUCCESS}
        setModalType={setModalType}
        count="2"
        amount="456"
        handleAction={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Beneficiary Revalidated Successfully'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/tab for checking invalid/),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.REVALIDATED_FAILED}
        setModalType={setModalType}
        count="2"
        amount="456"
        handleAction={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Beneficiary Revalidation Failed'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Please try again later.')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });
});
