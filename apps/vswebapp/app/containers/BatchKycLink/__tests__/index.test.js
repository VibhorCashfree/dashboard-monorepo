import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderer from 'react-test-renderer';

// Providers
import { ListProvider } from 'providers/ListProvider';

// Services
import * as FormsService from 'services/forms';
import * as MiscService from 'services/misc';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../../JourneysKycLink/components/Modals';

// Containers
import BatchKycLink from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>{children}</ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('services/forms');
  jest.mock('services/misc');

  jest.spyOn(FormsService, 'getBatches').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 46,
          addedOn: '2023-09-10 00:51:48',
          filename: 'test 999.csv',
          totalRecords: 9997,
          valid: 18,
          invalid: 9979,
          expired: 0,
          unableToValidate: 0,
          status: 'PENDING',
          uploadedBy: '',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(FormsService, 'getBatchesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest.spyOn(MiscService, 'getSampleFile').mockImplementation(() =>
    Promise.resolve({
      fileUril:
        'https://cashfreepublic.s3.ap-south-1.amazonaws.com/payoutsample/bulk_vrs_form.csv',
    }),
  );

  jest.spyOn(FormsService, 'downloadBatchReport').mockImplementation(() =>
    Promise.resolve({
      file: null,
      filename: '',
      fileUrl:
        'https://payoutbankvalidationsvc-reports.s3.ap-south-1.amazonaws.com/rejected%20test%20-%20Sheet1%2851%29-2023-10-14%2021%3A37%3A59.csv?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=AKIASWG7WQ7NZUF26ULR%2F20231014%2Fap-south-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20231014T160759Z\u0026X-Amz-Expires=3600\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=2400af7a5408e32cf9354815c9acf54ac38d9f770f6c6261f63426450546e607',
    }),
  );

  jest
    .spyOn(FormsService, 'updateBatch')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In Forms Container', () => {
  test('checks Forms Snapshot render', () => {
    const output = renderer
      .create(
        <CustomWrapper>
          <BatchKycLink />
        </CustomWrapper>,
      )
      .toJSON();

    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    render(<BatchKycLink />, { wrapper: CustomWrapper });

    expect(FormsService.getBatches).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(FormsService.getBatchesCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('test 999.csv')).toBeInTheDocument();
      expect(screen.queryByText('9979')).toBeInTheDocument();
      expect(
        screen.queryByText('Bulk Files and their statuses are shown here.'),
      ).toBeInTheDocument();

      const searchFilter = screen.queryByText(/Search & Filter/);

      fireEvent.click(screen.queryByText(/Last 7 days/));
      fireEvent.click(screen.queryByText(/Last Month/));

      expect(FormsService.getBatches).toHaveBeenCalled();
      expect(FormsService.getBatchesCount).toHaveBeenCalled();
      expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
      expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

      fireEvent.click(searchFilter);

      expect(screen.queryByText('Apply')).toBeDisabled();

      const rejectedOption = document.getElementsByName('REJECTED')[0];

      fireEvent.click(rejectedOption);

      expect(screen.queryByText('Apply')).not.toBeDisabled();

      fireEvent.click(screen.queryByText('Apply'));

      expect(screen.queryByText(/Rejected/)).toBeInTheDocument();

      fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

      document.getElementsByClassName('ui dropdown')[0].click();
      document.getElementsByClassName('item py-2')[0].click();

      expect(MiscService.getSampleFile).toHaveBeenCalled();

      const uploadBtn = screen.getByTestId('upload-btn');

      fireEvent.click(uploadBtn);

      expect(FormsService.downloadBatchReport).toHaveBeenCalled();
    });
  });

  test('check onLimitChange', async () => {
    render(<BatchKycLink />, { wrapper: CustomWrapper });

    expect(FormsService.getBatches).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    expect(FormsService.getBatchesCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      document.getElementsByClassName('ui inline dropdown')[0].click();
      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();

      const images = document.querySelectorAll('.ui.image');

      fireEvent.click(images[images.length - 1]);

      expect(FormsService.getBatches).toHaveBeenCalled();
      expect(FormsService.getBatchesCount).toHaveBeenCalled();

      fireEvent.click(screen.getByText(/Upload File/));
    });
  });

  const mockUploadImplementation = async () => {
    expect(screen.queryByText('Upload Batch Form File')).toBeInTheDocument();
    expect(screen.queryByText('Select Verification Types')).toBeInTheDocument();
    expect(screen.queryByText('Set Expiry Date')).toBeInTheDocument();
    expect(screen.queryByText('Send Via')).toBeInTheDocument();

    await document.getElementsByClassName('ui fitted checkbox')[0].click();
    await document.getElementsByClassName('ui fitted checkbox')[1].click();
    await document.getElementsByClassName('ui fitted checkbox')[0].click();

    await document
      .getElementsByClassName('ui fluid input')[0]
      .firstChild.click();
    await document
      .getElementsByClassName('item')
      [document.getElementsByClassName('item').length - 1].click();

    await fireEvent.click(screen.queryByText(/Apply/));

    const checkBoxLength = document.getElementsByClassName('ui checkbox')
      .length;

    document
      .getElementsByClassName('ui checkbox')
      [checkBoxLength - 1].firstChild.click();

    expect(screen.getByText(/Next/)).not.toBeDisabled();

    fireEvent.click(screen.queryByText(/Next/));

    expect(
      screen.getByText(
        'Ensure that the file you are uploading is as per the format in the sample file.',
      ),
    ).toBeInTheDocument();

    const file = new File([''], 'report.csv', { type: 'text/csv' });

    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, file);

    await waitForElementToBeRemoved(screen.getByText('Uploading ...'));

    expect(screen.getByText(/report.csv/)).toBeInTheDocument();

    fireEvent.click(screen.queryByText('Upload'));
  };

  test('checks Modals render > UPLOAD', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();
    const downloadSampleFile = jest.fn();

    jest.spyOn(FormsService, 'createBatch').mockImplementation(() =>
      Promise.resolve({
        count: { valid: 50, invalid: 20 },
      }),
    );

    render(
      <Modals
        modalType={MODAL_TYPES.UPLOAD}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        downloadSampleFile={downloadSampleFile}
      />,
      { wrapper: CustomWrapper },
    );

    await mockUploadImplementation();

    expect(FormsService.createBatch).toHaveBeenCalled();
  });

  test('checks Modals render > SUCCESS API Call', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    jest.spyOn(FormsService, 'createBatch').mockImplementation(() =>
      Promise.resolve({
        count: { valid: 50, invalid: 0 },
      }),
    );

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

    expect(FormsService.createBatch).toHaveBeenCalled();
  });

  test('checks Modals render > SUCCESS', async () => {
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

  test('checks Modals render > CANCEL', async () => {
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

    await waitFor(() => {
      expect(screen.queryByText('File Upload Cancelled')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render > FAILED API Call', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    jest.spyOn(FormsService, 'createBatch').mockImplementation(() =>
      Promise.resolve({
        error: true,
      }),
    );

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

    expect(FormsService.createBatch).toHaveBeenCalled();
  });

  test('checks Modals render > FAILED', async () => {
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

    await waitFor(() => {
      expect(screen.queryByText('File Upload Failed')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render > FAILED_WITH_NO_VALID API Call', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    jest.spyOn(FormsService, 'createBatch').mockImplementation(() =>
      Promise.resolve({
        count: { valid: 0, invalid: 50 },
      }),
    );

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

    expect(FormsService.createBatch).toHaveBeenCalled();
  });

  test('checks Modals render > FAILED_WITH_NO_VALID', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    jest
      .spyOn(FormsService, 'getErrorLog')
      .mockImplementation(() => Promise.resolve({}));

    render(
      <Modals
        modalType={MODAL_TYPES.FAILED_WITH_NO_VALID}
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

      fireEvent.click(screen.getByText(/Download Error Log/));

      expect(FormsService.getErrorLog).toHaveBeenCalled();

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
      .spyOn(FormsService, 'getErrorLog')
      .mockImplementation(() =>
        Promise.resolve({ fileUrl: 'https://s3.file.com/sample.pdf' }),
      );

    render(
      <Modals
        modalType={MODAL_TYPES.FAILED_WITH_VALID}
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

      fireEvent.click(screen.getByText(/Download Error Log/));

      expect(FormsService.getErrorLog).toHaveBeenCalled();

      const submitButton = screen.queryByText('Proceed Anyway');

      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(FormsService.updateBatch).toHaveBeenCalledWith({
        id: undefined,
        action: 'proceed',
      });

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(FormsService.updateBatch).toHaveBeenCalledWith({
        id: undefined,
        action: 'cancel',
      });
    });
  });
});
