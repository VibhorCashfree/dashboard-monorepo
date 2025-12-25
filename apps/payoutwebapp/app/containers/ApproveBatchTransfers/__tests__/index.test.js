import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as TransfersService from 'services/transfers';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import ApproveBatchTransfers from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/transfers');

  jest.spyOn(TransfersService, 'getBatches').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          fileName: 'filename.csv',
          id: 1234,
          status: 'PENDING_APPROVAL',
          countTransfers: 3,
          addedOn: '2021-11-24T14:35:56+05:30',
          valid: 3,
          invalid: 0,
          uploadedBy: 'mehul',
          approvalCount: 0,
          totalApprovalCount: 1,
          fileType: 'CFTRANSFER_ACCOUNT',
          totalAmount: '6',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(TransfersService, 'getBatchesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest
    .spyOn(TransfersService, 'downloadBatchReport')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In ApproveBatchTransfers Container', () => {
  test('checks render', async () => {
    render(<ApproveBatchTransfers />, { wrapper: CustomWrapper });

    expect(TransfersService.getBatches).toHaveBeenCalledWith(
      expect.objectContaining({
        approveBatch: true,
        size: 10,
        lastId: '0',
      }),
    );
    expect(TransfersService.getBatchesCount).toHaveBeenCalledWith(
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
          'All batch files and transfers that are pending for approval are shown here.',
        ),
      ).toBeInTheDocument();

      const downloadIcon = screen.queryByRole('download');

      expect(downloadIcon).not.toBeDisabled();
      expect(downloadIcon).toBeInTheDocument();

      fireEvent.click(downloadIcon);

      expect(TransfersService.downloadBatchReport).toHaveBeenCalledWith(1234);
    });
  });
});
