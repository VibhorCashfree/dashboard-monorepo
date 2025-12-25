import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as BAVService from 'services/bav';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Containers
import ApproveBatchBankAccount from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/bav');

  jest.spyOn(BAVService, 'getBatches').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 1459,
          addedOn: '2022-06-16T17:57:27+05:30',
          filename: 'bulk_bav12.csv',
          totalRecords: 1,
          valid: 1,
          invalid: 0,
          status: 'PENDING_APPROVAL',
          uploadedBy: 'Raj Nandans',
          maxApprovals: 2,
          noOfApprovals: 2,
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(BAVService, 'getBatchesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In ApproveBatchBankAccount Container', () => {
  jest
    .spyOn(BAVService, 'downloadBatchReport')
    .mockImplementation(() => Promise.resolve({}));

  test('checks render', async () => {
    render(<ApproveBatchBankAccount />, { wrapper: CustomWrapper });

    expect(BAVService.getBatches).toHaveBeenCalledWith({
      isApprovalBatch: true,
      size: 10,
      lastId: '0',
    });
    expect(BAVService.getBatchesCount).toHaveBeenCalledWith({
      isApprovalBatch: true,
      size: 10,
      lastId: '0',
    });

    await waitFor(() => {
      expect(screen.queryByText('Raj Nandans')).toBeInTheDocument();
      expect(screen.queryByText('bulk_bav12.csv')).toBeInTheDocument();
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

      expect(BAVService.downloadBatchReport).toHaveBeenCalledWith(
        1459,
        'PENDING_APPROVAL',
      );
    });
  });

  test('Test RowClick, OnLimitChange, OnPageChange', async () => {
    jest
      .spyOn(BAVService, 'downloadBatchReport')
      .mockImplementation(() =>
        Promise.resolve({ fileUrl: 'https://s3.file.com/sample.pdf' }),
      );

    render(<ApproveBatchBankAccount />, { wrapper: CustomWrapper });

    expect(BAVService.getBatches).toHaveBeenCalledWith({
      isApprovalBatch: true,
      size: 10,
      lastId: '0',
    });
    expect(BAVService.getBatchesCount).toHaveBeenCalledWith({
      isApprovalBatch: true,
      size: 10,
      lastId: '0',
    });

    await waitFor(() => {
      document.getElementsByClassName('ui inline dropdown')[0].click();
      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();

      const images = document.querySelectorAll('.ui.image');

      fireEvent.click(images[images.length - 1]);

      const downloadIcon = screen.queryByRole('download');

      fireEvent.click(downloadIcon);

      fireEvent.click(downloadIcon);

      expect(BAVService.downloadBatchReport).toHaveBeenCalled();

      document.querySelector('tbody tr').click();
    });
  });
});
