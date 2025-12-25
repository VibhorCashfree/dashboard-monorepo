import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as CashgramsService from 'services/cashgrams';

// Utils
import Analytics from 'utils/analytics';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { MODAL_TYPE } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Containers
import BatchCashgrams from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('utils/analytics', () => ({
  track: jest.fn(),
}));

beforeEach(() => {
  jest.mock('services/cashgrams');

  jest.spyOn(CashgramsService, 'getBatches').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          fileName: 'filename.csv',
          id: 1234,
          status: 'REJECTED',
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

  jest.spyOn(CashgramsService, 'getBatchesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest
    .spyOn(CashgramsService, 'downloadBatchReport')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(CashgramsService, 'createBatch')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(CashgramsService, 'updateBatch')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(CashgramsService, 'getErrorLog')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In BatchCashgrams Container', () => {
  test('checks render', async () => {
    render(<BatchCashgrams />, { wrapper: CustomWrapper });

    expect(CashgramsService.getBatches).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );
    expect(CashgramsService.getBatchesCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('mehul')).toBeInTheDocument();
      expect(screen.queryByText('filename.csv')).toBeInTheDocument();
      expect(screen.queryByText('Rejected')).toBeInTheDocument();
      expect(
        screen.queryByText('All batch files are shown here.'),
      ).toBeInTheDocument();

      const downloadIcon = screen.queryByRole('download');

      expect(downloadIcon).not.toBeDisabled();
      expect(downloadIcon).toBeInTheDocument();

      fireEvent.click(downloadIcon);

      expect(CashgramsService.downloadBatchReport).toHaveBeenCalledWith(1234);
    });
  });

  test('checks Filters', async () => {
    render(<BatchCashgrams />, { wrapper: CustomWrapper });

    await waitFor(() => {
      document.getElementsByClassName('ui inline dropdown')[0].click();

      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();
    });

    expect(Analytics.track).toHaveBeenCalledWith(EVENTS.CHANGE_PAGE_LIMIT, {
      size: '25',
    });

    const searchFilter = screen.queryByText(/Search & Filter/);

    fireEvent.click(screen.queryByText(/Last 7 days/));
    fireEvent.click(screen.queryByText(/Last Month/));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.DATE_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.CASHGRAMS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
      }),
    );

    expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
    expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const filterOption = document.getElementsByName('REJECTED')[0];

    fireEvent.click(filterOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.APPLIED_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.CASHGRAMS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
      }),
    );

    expect(screen.queryAllByText(/Rejected/).length).toBe(1);

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(8);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.UPLOAD}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Upload Batch Cashgram File'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Download CSV')).toBeInTheDocument();
      expect(screen.queryByText('Download sample file')).toBeInTheDocument();
      expect(screen.queryByText('Download sample file')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Ensure that the file you are uploading is as per the format in the sample file.',
        ),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalledWith(MODAL_TYPE.EMPTY);
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.SUCCESS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('File Uploaded Successfully'),
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
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.CANCEL}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('File Upload Cancelled')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

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
        modalType={MODAL_TYPE.FAILED}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('File Upload Failed')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

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
        modalType={MODAL_TYPE.FAILED_WITH_NO_VALID}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('File Upload Failed')).toBeInTheDocument();
      expect(screen.queryByText('Total Records')).toBeInTheDocument();
      expect(screen.queryByText('Invalid Records')).toBeInTheDocument();
      expect(screen.queryByText('Download Error Log')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

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
        modalType={MODAL_TYPE.FAILED_WITH_VALID}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Errors found in the file'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Proceed Anyway')).toBeInTheDocument();
      expect(screen.queryByText('Total Records')).toBeInTheDocument();
      expect(
        screen.queryByText(
          "Click 'Proceed Anyway' to continue processing. Click 'Cancel' to stop the file processing.",
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText('Download Error Log')).toBeInTheDocument();

      const submitButton = screen.queryByText('Proceed Anyway');

      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(CashgramsService.updateBatch).toHaveBeenCalledWith({
        referenceId: undefined,
        action: 'proceed',
      });

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(CashgramsService.updateBatch).toHaveBeenCalledWith({
        referenceId: undefined,
        action: 'cancel',
      });
    });
  });

  test('checks Row click', async () => {
    render(<BatchCashgrams />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.CASHGRAMS]}/batch/1234/details`,
      {
        state: {
          batchRowDetails: {
            fileName: 'filename.csv',
            id: 1234,
            status: 'REJECTED',
            countCashgrams: 3,
            addedOn: '2021-11-24T14:35:56+05:30',
            valid: 3,
            invalid: 0,
            uploadedBy: 'mehul',
            approvalCount: 0,
            totalApprovalCount: 1,
            totalAmount: '6',
          },
        },
      },
    );
  });
});
