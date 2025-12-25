import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as BAVService from 'services/bav';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import Modals from '../components/Modals';

// Containers
import BatchBankAccountDetails from '..';

// Utils
import Env from 'utils/env';
import userEvent from '@testing-library/user-event';

const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    state: {
      batchRowDetails: {
        id: 112828,
        addedOn: '2023-01-27T09:32:11+05:30',
        filename: 'fafsafasfa',
        totalRecords: 2,
        valid: 0,
        invalid: 0,
        status: 'PROCESSED',
        uploadedBy: '',
        maxApprovals: 2,
        noOfApprovals: 2,
      },
      toBeApproved: true,
    },
  }),
}));

beforeEach(() => {
  jest
    .mock('utils/env')
    .spyOn(Env, 'isTest')
    .mockImplementation(() => true);

  jest.mock('services/bav');

  jest
    .spyOn(BAVService, 'getBatchApprovalDetails')
    .mockImplementation(() =>
      Promise.resolve({ approvals: [], rejections: [] }),
    );

  jest.spyOn(BAVService, 'getBatchEntries').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 463237698,
          processedOn: '2023-01-27T09:32:12+05:30',
          verificationId: 'BV463237698',
          bankAccount: '50100554670133',
          ifsc: 'HDFC0007632',
          phone: '6261944419',
          nameProvided: 'Ajeet Makvana',
          nameAtBank: 'AJEET MAKVANA',
          accountStatus: 'VALID',
          nameMatchScore: '',
          nameMatchResult: '',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(BAVService, 'getBatchEntriesCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest
    .spyOn(BAVService, 'rejectBatch')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(BAVService, 'approveBatch')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In BatchBankAccountDetails Container', () => {
  test('checks render > PROCESSED State', async () => {
    render(<BatchBankAccountDetails />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(BAVService.getBatchApprovalDetails).toHaveBeenCalledWith(112828);
    });

    expect(BAVService.getBatchEntries).toHaveBeenCalledWith(112828, {
      approveSection: true,
      size: 10,
      lastId: '0',
      status: [],
    });
    expect(BAVService.getBatchEntriesCount).toHaveBeenCalledWith(112828, {
      approveSection: true,
      size: 10,
      lastId: '0',
      status: [],
    });

    expect(screen.queryByText('fafsafasfa')).toBeInTheDocument();
    expect(screen.queryByText('HDFC0007632')).toBeInTheDocument();
    expect(screen.queryByText('Processed')).toBeInTheDocument();
    expect(screen.queryByText('Valid')).toBeInTheDocument();
    expect(screen.queryByText('Search & Filter')).toBeInTheDocument();
    expect(screen.queryByText('IFSC')).toBeInTheDocument();
    expect(screen.queryByText('Account Status')).toBeInTheDocument();
    expect(screen.queryByText('Uploaded At')).toBeInTheDocument();
  });

  test('Test for ', async () => {
    render(<BatchBankAccountDetails />, { wrapper: CustomWrapper });

    await waitFor(() => {
      expect(BAVService.getBatchApprovalDetails).toHaveBeenCalledWith(112828);
    });

    expect(BAVService.getBatchEntries).toHaveBeenCalledWith(112828, {
      approveSection: true,
      size: 10,
      lastId: '0',
      status: [],
    });
    expect(BAVService.getBatchEntriesCount).toHaveBeenCalledWith(112828, {
      approveSection: true,
      size: 10,
      lastId: '0',
      status: [],
    });

    expect(screen.queryByText('fafsafasfa')).toBeInTheDocument();
    expect(screen.queryByText('HDFC0007632')).toBeInTheDocument();
    expect(screen.queryByText('Processed')).toBeInTheDocument();
    expect(screen.queryByText('Valid')).toBeInTheDocument();
    expect(screen.queryByText('Search & Filter')).toBeInTheDocument();
    expect(screen.queryByText('IFSC')).toBeInTheDocument();
    expect(screen.queryByText('Account Status')).toBeInTheDocument();
    expect(screen.queryByText('Uploaded At')).toBeInTheDocument();
  });

  test('Test for ', async () => {
    render(<BatchBankAccountDetails />, { wrapper: CustomWrapper });

    await waitFor(() => {
      document.getElementsByClassName('ui inline dropdown')[0].click();
      document
        .getElementsByClassName('visible menu transition')[0]
        .children[1].click();

      const images = document.querySelectorAll('.ui.image');

      fireEvent.click(images[images.length - 1]);

      document.querySelector('tbody tr').click();
    });

    await fireEvent.click(screen.getByTestId('approve-batch'));

    expect(
      screen.queryByText(
        'Are you sure you want to approve the below .csv file?',
      ),
    ).toBeInTheDocument();

    const approveStr = screen.queryAllByText('Approve');

    await userEvent.click(approveStr[1]);

    expect(BAVService.approveBatch).toHaveBeenCalled();

    await fireEvent.click(screen.getByTestId('reject-batch'));

    expect(
      screen.queryByText(
        'Are you sure you want to reject the below .csv file?',
      ),
    ).toBeInTheDocument();

    const rejectStr = screen.queryAllByText('Reject');

    await userEvent.click(rejectStr[1]);

    expect(BAVService.rejectBatch).toHaveBeenCalled();

    const searchFilter = screen.queryByText(/Search & Filter/);

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const pendingApprovalOption = document.getElementsByName(
      'PENDING_APPROVAL',
    )[0];

    fireEvent.click(pendingApprovalOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(screen.queryByText(/Pending Approval/)).toBeInTheDocument();

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    fireEvent.click(screen.queryByText(/Back/));
  });

  test('checks Modals render', async () => {
    jest
      .spyOn(BAVService, 'approveBatch')
      .mockImplementation(() => Promise.resolve({}));

    const setModalType = jest.fn();
    const handleAction = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.APPROVE}
        setModalType={setModalType}
        batchRowDetails={{
          id: 112828,
          filename: 'fafsafasfa',
          totalRecords: 2,
        }}
        handleAction={handleAction}
      />,
      { wrapper: CustomWrapper },
    );

    expect(screen.queryByText('Approve')).toBeInTheDocument();

    expect(
      screen.queryByText(
        'Are you sure you want to approve the below .csv file?',
      ),
    ).toBeInTheDocument();

    const submitButton = screen.queryByRole('button', {
      name: 'Approve',
    });

    expect(submitButton).toHaveClass('ml-2');
    expect(submitButton).toBeInTheDocument();

    await fireEvent.click(submitButton);

    await expect(handleAction).toHaveBeenCalled();

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(setModalType).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const handleAction = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.REJECT}
        setModalType={setModalType}
        batchRowDetails={{ fileName: 'foo bar' }}
        handleAction={handleAction}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Reject')).toBeInTheDocument();

      expect(
        screen.queryByText(
          'Are you sure you want to reject the below .csv file?',
        ),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Reject',
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
        modalType={MODAL_TYPES.APPROVED}
        setModalType={setModalType}
        batchRowDetails={{ fileName: 'foo bar' }}
        handleAction={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('File Approved Successfully'),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPES.REJECTED}
        setModalType={setModalType}
        batchRowDetails={{ fileName: 'foo bar' }}
        handleAction={jest.fn()}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('File Rejected')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);
    });
  });
});
