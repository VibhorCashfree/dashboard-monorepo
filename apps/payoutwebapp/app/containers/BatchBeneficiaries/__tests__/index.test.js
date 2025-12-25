import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as BeneficiariesService from 'services/beneficiaries';

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
import BatchBeneficiaries from '..';

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
  jest.mock('services/beneficiaries');

  jest.spyOn(BeneficiariesService, 'getBatches').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          name: 'filename.csv',
          id: 1234,
          status: 'REJECTED',
          total: 1,
          addedOn: '2022-09-01T14:46:59',
          valid: 0,
          invalid: 1,
          uploadedBy: 'mehul',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(BeneficiariesService, 'getBatchesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest
    .spyOn(BeneficiariesService, 'downloadBatchReport')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(BeneficiariesService, 'createBatch')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(BeneficiariesService, 'updateBatch')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(BeneficiariesService, 'getErrorLog')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In BatchBeneficiaries Container', () => {
  test('checks render', async () => {
    render(<BatchBeneficiaries />, { wrapper: CustomWrapper });

    expect(BeneficiariesService.getBatches).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );
    expect(BeneficiariesService.getBatchesCount).toHaveBeenCalledWith(
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
        screen.queryByText('All Beneficiaries including batch are shown here.'),
      ).toBeInTheDocument();

      const downloadIcon = screen.queryByRole('download');

      expect(downloadIcon).not.toBeDisabled();
      expect(downloadIcon).toBeInTheDocument();

      fireEvent.click(downloadIcon);

      expect(BeneficiariesService.downloadBatchReport).toHaveBeenCalledWith(
        1234,
      );
    });
  });

  test('checks Filters', async () => {
    render(<BatchBeneficiaries />, { wrapper: CustomWrapper });

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
        section: LABEL_BY_MENU[MENU.BENEFICIARIES],
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
        section: LABEL_BY_MENU[MENU.BENEFICIARIES],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
        filters: { REJECTED: true },
        search_by: 'fileId',
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
        screen.queryByText('Upload Batch Beneficiary File'),
      ).toBeInTheDocument();

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
      expect(
        screen.queryByText(
          'No valid records found. Download the error log to correct all the errors and try again.',
        ),
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

      const submitButton = screen.queryByText('Proceed Anyway');

      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(BeneficiariesService.updateBatch).toHaveBeenCalledWith({
        referenceId: undefined,
        action: 'PROCEED',
      });

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(BeneficiariesService.updateBatch).toHaveBeenCalledWith({
        id: undefined,
        action: 'CANCEL',
      });
    });
  });

  test('checks Row click', async () => {
    render(<BatchBeneficiaries />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.BENEFICIARIES]}/batch/1234/details`,
      {
        state: {
          batchRowDetails: {
            name: 'filename.csv',
            id: 1234,
            status: 'REJECTED',
            total: 1,
            addedOn: '2022-09-01T14:46:59',
            valid: 0,
            invalid: 1,
            uploadedBy: 'mehul',
          },
        },
      },
    );
  });
});
