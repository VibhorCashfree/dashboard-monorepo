import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as UPIService from 'services/UPI';
import * as MiscService from 'services/misc';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Containers
import BatchUPI from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/UPI');
  jest.mock('services/misc');

  jest.spyOn(UPIService, 'getBatches').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 2340,
          addedOn: '2023-01-25T07:28:17+05:30',
          filename: 'test12bimal',
          totalRecords: 2,
          valid: 0,
          invalid: 0,
          status: 'PROCESSING',
          uploadedBy: '',
          maxApprovals: 0,
          noOfApprovals: 0,
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(UPIService, 'getBatchesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest
    .spyOn(UPIService, 'createBatch')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(UPIService, 'updateBatch')
    .mockImplementation(() => Promise.resolve({}));

  jest.spyOn(MiscService, 'getSampleFile').mockImplementation(() =>
    Promise.resolve({
      fileUrl:
        'https://cashfreepublic.s3.ap-south-1.amazonaws.com/payoutsample/bulk_vrs_form.csv',
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In BatchUPI Container', () => {
  const mockUploadImplementation = async () => {
    const file = new File([''], 'report.csv', { type: 'text/csv' });

    const fileInput = screen.getByTestId('file-input');

    await userEvent.upload(fileInput, file);

    await waitForElementToBeRemoved(screen.getByText('Uploading ...'));

    expect(screen.getByText(/report.csv/)).toBeInTheDocument();

    fireEvent.click(screen.queryByText('Upload'));
  };

  test('checks Modals render > UPLOAD ', async () => {
    jest
      .spyOn(UPIService, 'createBatch')
      .mockImplementation(() => Promise.resolve({ error: true }));

    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.UPLOAD}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await mockUploadImplementation();

    expect(UPIService.createBatch).toHaveBeenCalled();
  });

  test('checks Modals render > UPLOAD success scenario ', async () => {
    jest
      .spyOn(UPIService, 'createBatch')
      .mockImplementation(() =>
        Promise.resolve({ count: { valid: 20, invalid: 0 } }),
      );

    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.UPLOAD}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await mockUploadImplementation();

    expect(UPIService.createBatch).toHaveBeenCalled();
  });

  test('checks Modals render > FAILED_WITH_VALID ', async () => {
    jest
      .spyOn(UPIService, 'createBatch')
      .mockImplementation(() =>
        Promise.resolve({ count: { valid: 20, invalid: 10 } }),
      );

    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.UPLOAD}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await mockUploadImplementation();

    expect(UPIService.createBatch).toHaveBeenCalled();
  });

  test('checks Modals render > FAILED_WITH_VALID ', async () => {
    jest
      .spyOn(UPIService, 'createBatch')
      .mockImplementation(() =>
        Promise.resolve({ count: { valid: 20, invalid: 10 } }),
      );

    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.UPLOAD}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await mockUploadImplementation();

    expect(UPIService.createBatch).toHaveBeenCalled();
  });

  test('checks Modals render > FAILED_WITH_NO_VALID ', async () => {
    jest
      .spyOn(UPIService, 'createBatch')
      .mockImplementation(() =>
        Promise.resolve({ count: { valid: 0, invalid: 10 } }),
      );

    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.UPLOAD}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await mockUploadImplementation();

    expect(UPIService.createBatch).toHaveBeenCalled();
  });

  test('onLimitPage, onPageChange', async () => {
    jest.spyOn(UPIService, 'downloadBatchReport').mockImplementation(() =>
      Promise.resolve({
        fileUrl:
          'https://cashfreepublic.s3.ap-south-1.amazonaws.com/payoutsample/bulk_vrs_form.csv',
      }),
    );

    render(<BatchUPI />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(screen.queryByText('test12bimal')).toBeInTheDocument();
      expect(screen.queryByText('Processing')).toBeInTheDocument();

      const images = document.querySelectorAll('.ui.image');

      fireEvent.click(images[images.length - 1]);

      document.getElementsByClassName('ui inline dropdown')[0].click();
      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();

      expect(UPIService.getBatches).toHaveBeenCalled();
      expect(UPIService.getBatchesCount).toHaveBeenCalled();

      const downloadIcon = screen.queryByRole('download');

      expect(downloadIcon).not.toBeDisabled();
      expect(downloadIcon).toBeInTheDocument();

      fireEvent.click(downloadIcon);
    });
  });

  test('checks render', async () => {
    jest
      .spyOn(UPIService, 'downloadBatchReport')
      .mockImplementation(() => Promise.resolve({}));

    render(<BatchUPI />, { wrapper: CustomWrapper });

    expect(UPIService.getBatches).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(UPIService.getBatchesCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Upload File/));

      expect(screen.queryByText('test12bimal')).toBeInTheDocument();
      expect(screen.queryByText('Processing')).toBeInTheDocument();

      document.getElementsByClassName('ui dropdown')[0].click();
      document.getElementsByClassName('item py-2')[0].click();

      expect(MiscService.getSampleFile).toHaveBeenCalled();

      const searchFilter = screen.queryByText(/Search & Filter/);

      const dayFilter = screen.queryAllByText('Last 7 days');

      fireEvent.click(dayFilter[0]);
      fireEvent.click(screen.queryByText(/Last Month/));

      expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
      expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

      fireEvent.click(searchFilter);

      expect(screen.queryByText('Apply')).toBeDisabled();

      const rejectedOption = document.getElementsByName('CANCELLED')[0];

      fireEvent.click(rejectedOption);

      expect(screen.queryByText('Apply')).not.toBeDisabled();

      fireEvent.click(screen.queryByText('Apply'));

      expect(screen.queryByText(/Cancelled/)).toBeInTheDocument();

      fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

      fireEvent.click(screen.getByText(/Upload File/));

      document.querySelector('tbody tr').click();

      const downloadIcon = screen.queryByRole('download');

      expect(downloadIcon).not.toBeDisabled();
      expect(downloadIcon).toBeInTheDocument();

      fireEvent.click(downloadIcon);

      expect(UPIService.downloadBatchReport).toHaveBeenCalledWith(
        2340,
        'PROCESSING',
      );
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.UPLOAD}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await act(() => {
      expect(screen.queryByText('Upload Batch File')).toBeInTheDocument();

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
        modalType={MODAL_TYPES.SUCCESS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await act(() => {
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
        modalType={MODAL_TYPES.CANCEL}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await act(() => {
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
        modalType={MODAL_TYPES.FAILED}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await act(() => {
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

    jest.spyOn(UPIService, 'getErrorLog').mockImplementation(() =>
      Promise.resolve({
        fileUrl:
          'https://cashfreepublic.s3.ap-south-1.amazonaws.com/payoutsample/bulk_vrs_form.csv',
      }),
    );

    render(
      <Modals
        modalType={MODAL_TYPES.FAILED_WITH_NO_VALID}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await act(() => {
      expect(screen.queryByText('File Upload Failed')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'No valid records found. Download the error log to correct all the errors and try again.',
        ),
      ).toBeInTheDocument();

      fireEvent.click(screen.getByText(/Download Error Log/));

      expect(UPIService.getErrorLog).toHaveBeenCalled();

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

    jest
      .spyOn(UPIService, 'getErrorLog')
      .mockImplementation(() => Promise.resolve({}));

    render(
      <Modals
        modalType={MODAL_TYPES.FAILED_WITH_VALID}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await act(() => {
      expect(
        screen.queryByText('Errors found in the file'),
      ).toBeInTheDocument();

      fireEvent.click(screen.getByText(/Download Error Log/));

      expect(UPIService.getErrorLog).toHaveBeenCalled();

      const submitButton = screen.queryByText('Proceed Anyway');

      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(UPIService.updateBatch).toHaveBeenCalledWith({
        id: undefined,
        action: 'proceed',
      });

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(UPIService.updateBatch).toHaveBeenCalledWith({
        id: undefined,
        action: 'cancel',
      });
    });
  });
});
