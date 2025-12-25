import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as PANService from 'services/PAN';
import * as MiscService from 'services/misc';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Containers
import BatchPan from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/PAN');
  jest.mock('services/misc');

  jest.spyOn(PANService, 'getBatches').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 1175,
          addedOn: '2023-01-13T09:30:12+05:30',
          filename: '2023Fri13093012461',
          totalRecords: 2,
          valid: 2,
          invalid: 0,
          uploadedBy: '',
          status: 'PROCESSED',
          maxApprovals: 0,
          noOfApprovals: 0,
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(PANService, 'getBatchesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest
    .spyOn(PANService, 'updateBatch')
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

describe('In BatchPan Container', () => {
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
      .spyOn(PANService, 'createBatch')
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

    expect(PANService.createBatch).toHaveBeenCalled();
  });

  test('checks Modals render > UPLOAD success scenario ', async () => {
    jest
      .spyOn(PANService, 'createBatch')
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

    expect(PANService.createBatch).toHaveBeenCalled();
  });

  test('checks Modals render > FAILED_WITH_VALID ', async () => {
    jest
      .spyOn(PANService, 'createBatch')
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

    expect(PANService.createBatch).toHaveBeenCalled();
  });

  test('checks Modals render > FAILED_WITH_VALID ', async () => {
    jest
      .spyOn(PANService, 'createBatch')
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

    expect(PANService.createBatch).toHaveBeenCalled();
  });

  test('checks Modals render > FAILED_WITH_NO_VALID ', async () => {
    jest
      .spyOn(PANService, 'createBatch')
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

    expect(PANService.createBatch).toHaveBeenCalled();
  });

  test('checks render', async () => {
    render(<BatchPan />, { wrapper: CustomWrapper });

    jest
      .spyOn(PANService, 'downloadBatchReport')
      .mockImplementation(() => Promise.resolve({}));

    expect(PANService.getBatches).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(PANService.getBatchesCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('2023Fri13093012461')).toBeInTheDocument();
      expect(screen.queryByText('Processed')).toBeInTheDocument();
      expect(
        screen.queryByText('All batch files are shown here.'),
      ).toBeInTheDocument();

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

      expect(PANService.downloadBatchReport).toHaveBeenCalledWith(1175);

      document.getElementsByClassName('ui dropdown')[0].click();
      document.getElementsByClassName('item py-2')[0].click();

      expect(MiscService.getSampleFile).toHaveBeenCalled();
    });
  });

  test('checks render', async () => {
    render(<BatchPan />, { wrapper: CustomWrapper });

    jest.spyOn(PANService, 'downloadBatchReport').mockImplementation(() =>
      Promise.resolve({
        fileUrl:
          'https://cashfreepublic.s3.ap-south-1.amazonaws.com/payoutsample/bulk_vrs_form.csv',
      }),
    );

    expect(PANService.getBatches).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(PANService.getBatchesCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('2023Fri13093012461')).toBeInTheDocument();
      expect(screen.queryByText('Processed')).toBeInTheDocument();

      const images = document.querySelectorAll('.ui.image');

      fireEvent.click(images[images.length - 1]);

      expect(PANService.getBatches).toHaveBeenCalled();
      expect(PANService.getBatchesCount).toHaveBeenCalled();

      document.getElementsByClassName('ui inline dropdown')[0].click();
      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();

      const downloadIcon = screen.queryByRole('download');

      expect(downloadIcon).not.toBeDisabled();
      expect(downloadIcon).toBeInTheDocument();

      fireEvent.click(downloadIcon);
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

    jest.spyOn(PANService, 'getErrorLog').mockImplementation(() =>
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

      expect(PANService.getErrorLog).toHaveBeenCalled();

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
      .spyOn(PANService, 'getErrorLog')
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

      expect(PANService.getErrorLog).toHaveBeenCalled();

      const submitButton = screen.queryByText('Proceed Anyway');

      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(PANService.updateBatch).toHaveBeenCalledWith({
        id: undefined,
        action: 'proceed',
      });

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(PANService.updateBatch).toHaveBeenCalledWith({
        id: undefined,
        action: 'cancel',
      });
    });
  });
});
