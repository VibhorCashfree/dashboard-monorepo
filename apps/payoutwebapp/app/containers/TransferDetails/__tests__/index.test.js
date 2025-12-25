import React from 'react';
import moment from 'moment';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

// Constants
import { FORMATS } from 'constants/date';

// Services
import * as TransfersService from 'services/transfers';

// Components
import Wrapper from '__tests__/components/Wrapper';
import BlockedReason from '../components/BlockedReason';
import ReviewTransfer from '../components/ReviewTransfer';
import RiskInsights from '../components/RiskInsights';

// Containers
import TransferDetails from '..';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '123',
  }),
  useLocation: () => ({
    pathname: '/',
    state: { fromBatch: true, fileType: 'foo' },
  }),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.mock('services/transfers');

  jest
    .spyOn(TransfersService, 'update')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In TransferDetails Container', () => {
  test('checks render', async () => {
    jest.spyOn(TransfersService, 'getDetails').mockImplementation(() =>
      Promise.resolve({
        transferId: 'test_v12_1',
        referenceId: 728562267,
        beneId: 'amit',
        amount: '2',
        addedOn: '2022-09-22T11:51:57+05:30',
        processedOn: '2022-09-22T12:01:57+05:30',
        mode: 'UPI',
        utr: 'CT603878045',
        status: 'SUCCESS',
        bankAccount: '50100108309480',
        bankStatus: 'SENT_TO_BANK',
        ifsc: 'HDFC0000053',
        phone: '1234567890',
        vpa: 'abc@upi',
        email: 'cashfree@cashfree.com',
        name: 'Amit Kumar Chawla',
        statusDescription: '',
        acknowledged: 'YES',
        remarks: 'working',
        approvals: [],
        rejections: [],
        paymentInstrumentId: 'CREDIT_CARD_102_487d262',
      }),
    );

    render(<TransferDetails />, {
      wrapper: Wrapper,
    });

    expect(TransfersService.getDetails).toHaveBeenCalledWith(123, 'foo', true);

    await waitFor(() => {
      expect(screen.queryByText('working')).toBeInTheDocument();
      expect(screen.queryByText('₹ 2.00')).toBeInTheDocument();
      expect(screen.queryByText('cashfree@cashfree.com')).toBeInTheDocument();
      expect(screen.queryByText('Success')).toBeInTheDocument();
      expect(screen.queryByText('Bank Status')).toBeInTheDocument();
      expect(screen.queryByText('Processed On')).toBeInTheDocument();
      expect(screen.queryByText('CT603878045')).toBeInTheDocument();
      expect(screen.queryByText('50100108309480')).not.toBeInTheDocument();
      expect(screen.queryByText('abc@upi')).toBeInTheDocument();
    });
  });

  test('checks Approvals', async () => {
    jest.spyOn(TransfersService, 'getDetails').mockImplementation(() =>
      Promise.resolve({
        transferId: 'test_v12_1',
        referenceId: 728562267,
        beneId: 'amit',
        amount: '2',
        addedOn: '2022-09-22T11:51:57+05:30',
        processedOn: '2022-09-22T12:01:57+05:30',
        mode: 'IMPS',
        utr: 'CT603878045',
        status: 'REJECTED',
        bankAccount: '50100108309480',
        bankStatus: 'SUCCESS',
        ifsc: 'HDFC0000053',
        phone: '1234567890',
        vpa: 'abc@upi',
        email: 'cashfree@cashfree.com',
        name: 'Amit Kumar Chawla',
        statusDescription: '',
        acknowledged: 'YES',
        remarks: 'working',
        approvals: [{ name: 'John Doe', date: '11-11-2023' }],
        rejections: [{ name: 'Debby', date: '05-12-2023' }],
        paymentInstrumentId: 'CREDIT_CARD_102_487d262',
      }),
    );

    render(<TransferDetails />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(screen.queryByText('working')).toBeInTheDocument();
      expect(screen.queryByText('₹ 2.00')).toBeInTheDocument();
      expect(screen.queryByText('test_v12_1')).toBeInTheDocument();
      expect(screen.queryByText('Rejected')).toBeInTheDocument();
      expect(screen.queryByText('amit')).toBeInTheDocument();
      expect(screen.queryByText('Processed On')).toBeInTheDocument();
      expect(screen.queryByText('1234567890')).toBeInTheDocument();
      expect(screen.queryByText('CT603878045')).not.toBeInTheDocument();
      expect(screen.queryByText('Bank Status')).not.toBeInTheDocument();
      expect(screen.queryByText('HDFC0000053')).toBeInTheDocument();
      expect(screen.queryByText('UPI VPA')).toBeInTheDocument();
      expect(screen.queryByText('IMPS')).toBeInTheDocument();
      expect(screen.queryByText('50100108309480')).toBeInTheDocument();
      expect(screen.queryByText('abc@upi')).toBeInTheDocument();

      expect(screen.queryByText('Approvals')).toBeInTheDocument();
      expect(screen.queryByText('Approver 1')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('11 Nov 2023, 12:00 AM')).toBeInTheDocument();
      expect(screen.queryByText('Approver 1')).toBeInTheDocument();
      expect(screen.queryByText('Debby')).toBeInTheDocument();
      expect(screen.queryByText('12 May 2023, 12:00 AM')).toBeInTheDocument();
    });
  });

  test('<BlockedReason>', async () => {
    const original = {
      selectedCard: 'MANUALLY_REJECTED',
      metadata: 'NA',
    };
    render(
      <BlockedReason
        detailedDescription="foo | bar | zoo"
        original={original}
      />,
      {
        wrapper: Wrapper,
      },
    );

    expect(screen.queryByText(/foo/)).toBeInTheDocument();
    expect(screen.queryByText(/bar/)).toBeInTheDocument();
    expect(screen.queryByText(/zoo/)).toBeInTheDocument();

    // fireEvent.click(screen.queryByText('Edit Configurations'));
    // expect(mockNavigate).toBeCalledWith('/risk-shield/configurations');
  });

  test('<BlockedReason> for Manually Allowed ', async () => {
    const original = {
      selectedCard: 'MANUALLY_ALLOWED',
      metadata: 'test1 | test2 | test3',
    };
    render(
      <BlockedReason
        detailedDescription="foo | bar | zoo"
        original={original}
      />,
      {
        wrapper: Wrapper,
      },
    );

    expect(screen.queryByText(/test1/)).toBeInTheDocument();
    expect(screen.queryByText(/test2/)).toBeInTheDocument();
    expect(screen.queryByText(/test3/)).toBeInTheDocument();
  });

  // test('back button is functional', async () => {
  //   render(<TransferDetails />, { wrapper: Wrapper });

  //   await waitFor(() => {
  //     const backButton = screen.getByText('Back');
  //     expect(backButton).toBeInTheDocument();
  //     fireEvent.click(backButton);
  //   });

  //   expect(mockNavigate).toHaveBeenCalledWith(-1);
  // });
});

describe('Riskshield related logic in transfer details', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
      pathname: '/',
      state: {
        fromBatch: true,
        fileType: 'foo',
        type: 'review-transfer',
        original: {
          status: 'APPROVAL_PENDING',
        },
      },
    }),
    useNavigate: () => mockNavigate,
  }));
  test('<ReviewTransfer> triggers Block Modal', async () => {
    const fetchTransferDetails = jest.fn();
    render(
      <ReviewTransfer
        transactionData={{ amount: 100, status: 'APPROVAL_PENDING' }}
        referenceId={123}
        fetchTransferDetails={fetchTransferDetails}
        original={{ status: 'APPROVAL_PENDING' }}
      />,
      {
        wrapper: Wrapper,
      },
    );

    const blockButton = screen.queryByText('Block');

    expect(blockButton).not.toBeDisabled();
    expect(blockButton).toBeInTheDocument();

    fireEvent.click(blockButton);

    await waitFor(() => {
      expect(screen.queryByText('Block Transfer')).toBeInTheDocument();
      expect(
        screen.queryByText('Are you sure you want to block this transfer?'),
      ).toBeInTheDocument();
      // expect(screen.queryByText('Amount: ₹ 100.00')).toBeInTheDocument();
      const inputElement = screen.getByPlaceholderText(
        'Write a reason for your reference',
      );
      expect(inputElement).toBeInTheDocument();
      fireEvent.change(inputElement, {
        target: { value: 'Testing Reason Input' },
      });
    });

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    fireEvent.click(blockButton);

    {
      const blockButton = screen.queryByText('Yes, Block');

      expect(blockButton).not.toBeDisabled();
      expect(blockButton).toBeInTheDocument();

      fireEvent.click(blockButton);

      expect(TransfersService.update).toBeCalledWith({
        action: 'riskApproval',
        transfers: [
          {
            reason: '',
            referenceId: String(123),
            state: 'riskRejected',
          },
        ],
        modified_by: 'sdfsdf',
        modifier_ip: '0.0.0.0',
      });

      await waitFor(() => {
        expect(fetchTransferDetails).toHaveBeenCalled();
      });
    }
  });

  test('<ReviewTransfer> triggers Approve Modal', async () => {
    const fetchTransferDetails = jest.fn();

    render(
      <ReviewTransfer
        transactionData={{ amount: 100, status: 'APPROVAL_PENDING' }}
        referenceId={123}
        fetchTransferDetails={fetchTransferDetails}
        original={{ status: 'APPROVAL_PENDING' }}
      />,
      {
        wrapper: Wrapper,
      },
    );

    const approveButton = screen.queryByText('Allow');

    expect(approveButton).not.toBeDisabled();
    expect(approveButton).toBeInTheDocument();

    fireEvent.click(approveButton);

    await waitFor(() => {
      expect(screen.queryByText('Approve Transfer')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'Once the transfer is processed, it cannot be reversed.',
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText(/₹ 100.00/)).toBeInTheDocument();
      const inputElement = screen.getByPlaceholderText(
        'Write a reason for your reference',
      );
      expect(inputElement).toBeInTheDocument();
      fireEvent.change(inputElement, {
        target: { value: 'Testing Reason Input' },
      });
    });

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    fireEvent.click(approveButton);

    {
      const approveButton = screen.queryByText('Yes, Approve');

      expect(approveButton).not.toBeDisabled();
      expect(approveButton).toBeInTheDocument();

      fireEvent.click(approveButton);

      expect(TransfersService.update).toBeCalledWith({
        action: 'riskApproval',
        transfers: [
          {
            reason: '',
            referenceId: String(123),
            state: 'riskApproved',
          },
        ],
        modified_by: 'sdfsdf',
        modifier_ip: '0.0.0.0',
      });

      await waitFor(() => {
        expect(fetchTransferDetails).toHaveBeenCalled();
      });
    }
  });

  test('Render <RiskInsights> with No transfer Details', async () => {
    const data = null;
    render(<RiskInsights transferDetails={data} />, {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(
        screen.queryByText('Last 30 days- Payouts to this beneficiary'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('Lifetime- Payouts to this beneficiary'),
      ).toBeInTheDocument();
      expect(
        screen.queryByText('History of successful payouts to this beneficiary'),
      ).toBeInTheDocument();
    });
  });

  test('Render <RiskInsights> with getRiskInsights Api giving successful response', async () => {
    const data = {
      bankAccount: '50100108309480',
      ifsc: 'HDFC0000053',
      vpa: null,
      addedOn: moment(),
    };

    jest.spyOn(TransfersService, 'getRiskInsights').mockImplementation(() =>
      Promise.resolve({
        message: 'Data fetched Successfully!',
        status: 200,
        data: {
          lifetime_data: {
            count: 0,
            amount: 0.0,
          },
          recent_payout_data: {
            addedon: null,
          },
          first_all_accounts_data: {
            addedon: null,
          },
          current_month_data: [
            {
              status: 'SUCCESS',
              total_count: 11,
              total_amount: 10314,
            },
            {
              status: 'APPROVAL_PENDING',
              total_count: 2,
              total_amount: 1100,
            },
            {
              status: 'MANUALLY_REJECTED',
              total_count: 3,
              total_amount: 1200,
            },
          ],
        },
      }),
    );

    render(<RiskInsights transferDetails={data} />, {
      wrapper: Wrapper,
    });

    const endDate = moment(data.addedOn).format(FORMATS.START_DATE_WITH_MINS);
    const startDate = moment(endDate)
      .subtract(30, 'days')
      .format(FORMATS.START_DATE_WITH_MINS);

    expect(TransfersService.getRiskInsights).toBeCalledWith({
      bankAccount: '50100108309480',
      ifsc: 'HDFC0000053',
      startDate: startDate,
      endDate: endDate,
    });

    await waitFor(() => {
      expect(
        screen.queryByText('Last 30 days- Payouts to this beneficiary'),
      ).toBeInTheDocument();
      expect(screen.queryByText('₹ 10,314.00')).toBeInTheDocument();
      expect(screen.queryByText('11 transfers')).toBeInTheDocument();
      expect(screen.queryByText('Pending for Review')).toBeInTheDocument();
      expect(screen.queryByText('₹ 1,100.00')).toBeInTheDocument();
      expect(screen.queryByText('2 transfers')).toBeInTheDocument();
      expect(screen.queryByText('Blocked')).toBeInTheDocument();
      expect(screen.queryByText('₹ 1,200.00')).toBeInTheDocument();
      expect(screen.queryByText('3 transfers')).toBeInTheDocument();
    });
  });

  test('Render <RiskInsights> with getRiskInsights Api giving Error response', async () => {
    const data = {
      vpa: 'success@upi',
      addedOn: moment(),
    };
    const endDate = moment(data.addedOn).format(FORMATS.START_DATE_WITH_MINS);
    const startDate = moment(endDate)
      .subtract(30, 'days')
      .format(FORMATS.START_DATE_WITH_MINS);

    jest.spyOn(TransfersService, 'getRiskInsights').mockImplementation(() =>
      Promise.resolve({
        message: 'Data fetched Successfully!',
        status: 400,
        error: 'testing error scenario',
      }),
    );
    await act(async () => {
      render(<RiskInsights transferDetails={data} />, {
        wrapper: Wrapper,
      });
    });

    expect(TransfersService.getRiskInsights).toBeCalledWith({
      bankAccount: 'success',
      ifsc: 'upi',
      startDate: startDate,
      endDate: endDate,
    });
    const errorInstances = screen.getAllByText('-');
    expect(errorInstances).toHaveLength(5);
  });
});
