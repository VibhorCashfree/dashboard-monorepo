import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as CashgramsService from 'services/cashgrams';

// Constants
import { MODAL_TYPE } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Containers
import ApproveBatchCashgrams from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/cashgrams');

  jest.spyOn(CashgramsService, 'getBatches').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          fileName: 'filename.csv',
          id: 1234,
          status: 'PENDING_APPROVAL',
          countCashgrams: 3,
          addedOn: '2021-11-24T14:35:56+05:30',
          valid: 3,
          invalid: 0,
          uploadedBy: 'mehul',
          approvalCount: 0,
          totalApprovalCount: 1,
          totalAmount: '6',
        },
      ],
      hasNext: false,
    }),
  );

  jest
    .spyOn(CashgramsService, 'downloadBatchReport')
    .mockImplementation(() => Promise.resolve({}));

  jest.spyOn(CashgramsService, 'getBatchesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In ApproveBatchCashgrams Container', () => {
  test('checks render', async () => {
    render(<ApproveBatchCashgrams />, { wrapper: CustomWrapper });

    expect(CashgramsService.getBatches).toHaveBeenCalledWith(
      expect.objectContaining({
        approveBatch: true,
        size: 10,
        lastId: '0',
      }),
    );
    expect(CashgramsService.getBatchesCount).toHaveBeenCalledWith(
      expect.objectContaining({
        approveBatch: true,
        size: 10,
        lastId: '0',
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('mehul')).toBeInTheDocument();
      expect(screen.queryByText('filename.csv')).toBeInTheDocument();
      expect(screen.queryByText('Pending Approval')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'All batch files that are pending for approval are shown here.',
        ),
      ).toBeInTheDocument();

      const downloadIcon = screen.queryByRole('download');

      expect(downloadIcon).not.toBeDisabled();
      expect(downloadIcon).toBeInTheDocument();

      fireEvent.click(downloadIcon);

      expect(CashgramsService.downloadBatchReport).toHaveBeenCalledWith(1234);
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals modalType={MODAL_TYPE.APPROVED} setModalType={setModalType} />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Cashgrams Approved Successfully'),
      ).toBeInTheDocument();

      expect(
        screen.queryByText('Check the status in the batch files section.'),
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
      <Modals modalType={MODAL_TYPE.REJECTED} setModalType={setModalType} />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Cashgrams Rejected')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });
});
