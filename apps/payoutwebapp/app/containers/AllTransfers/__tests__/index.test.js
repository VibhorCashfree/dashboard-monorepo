import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import * as ValidationUtil from 'utils/formValidation';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as TransfersService from 'services/transfers';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
  PATH_BY_MENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { MODAL_TYPE } from '../constants';

// Utils
import Analytics from 'utils/analytics';

// Components
import Wrapper from '__tests__/components/Wrapper';
import QuickTransferModal from '../components/QuickTransferModal';
import Modals from '../components/Modals';

// Containers
import AllTransfers from '..';

const mockNavigate = jest.fn();

const mockRequiredValidation = jest.fn();
const mockAmountValidation = jest.fn();
const mockTransferIdValidation = jest.fn();
const mockNameValidation = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('utils/analytics', () => ({
  track: jest.fn(),
}));

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

beforeEach(() => {
  jest.mock('utils/formValidation');

  jest
    .spyOn(ValidationUtil, 'requiredValidation')
    .mockImplementation(mockRequiredValidation);

  jest
    .spyOn(ValidationUtil, 'amountValidation')
    .mockImplementation(mockAmountValidation);

  jest
    .spyOn(ValidationUtil, 'transferIdValidation')
    .mockImplementation(mockTransferIdValidation);

  jest
    .spyOn(ValidationUtil, 'nameValidation')
    .mockImplementation(mockNameValidation);

  jest.mock('services/transfers');

  jest.spyOn(TransfersService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          transferId: 'test_bene123onerupeesad',
          beneficiaryId: 'shubhankar_bank',
          referenceId: 820988003,
          id: 820988003,
          bankAccount: '881016293106',
          amount: '1',
          status: 'SUCCESS',
          ifsc: 'DBSS0IN0811',
          utr: '233515713088',
          mode: 'IMPS',
          vpa: 'N/A',
          beneficiaryName: 'ShubhankarSaha',
          addedOn: '2022-12-01T15:35:40+05:30',
          acknowledged: 'YES',
          paymentInstrumentId: 'CASHFREE_102',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(TransfersService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In AllTransfers Container', () => {
  test('checks render', async () => {
    render(<AllTransfers />, {
      wrapper: CustomWrapper,
    });

    expect(TransfersService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        cfBankIds: [],
        num: 1,
        size: 10,
        status: [],
      }),
    );
    expect(TransfersService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        cfBankIds: [],
        num: 1,
        size: 10,
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('IMPS')).toBeInTheDocument();
      expect(screen.queryByText('shubhankar_bank')).toBeInTheDocument();
      expect(screen.queryByText('Success')).toBeInTheDocument();
      expect(
        screen.queryByText('All transfers including batch are shown here.'),
      ).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<AllTransfers />, { wrapper: CustomWrapper });

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
        section: LABEL_BY_MENU[MENU.TRANSFERS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
      }),
    );

    expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
    expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const filterOption = document.getElementsByName('SUCCESS')[0];

    fireEvent.click(filterOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.APPLIED_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.TRANSFERS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
        filters: { SUCCESS: true },
        search_by: 'transferId',
      }),
    );

    expect(screen.queryAllByText(/Success/).length).toBe(1);

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(9);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.SUCCESS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Transfer Successful')).toBeInTheDocument();

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
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Transfer Rejected')).toBeInTheDocument();

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
        modalType={MODAL_TYPE.PENDING}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Transfer Pending')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setBeneId = jest.fn();
    const switchAddBeneficiary = jest.fn();
    const onResponse = jest.fn();
    const onClose = jest.fn();

    const { getByTestId } = render(
      <QuickTransferModal
        isOneEscrow={true}
        initialPaymentInstrumentId="abcxyz"
        beneId={123}
        setBeneId={setBeneId}
        switchAddBeneficiary={switchAddBeneficiary}
        onResponse={onResponse}
        onClose={onClose}
      />,
      { wrapper: CustomWrapper },
    );

    expect(screen.queryByText('Initiate Payout')).toBeInTheDocument();

    expect(
      screen.queryByText(
        '*Transfer once confirmed, cannot be reversed. Review the details and click Confirm.',
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Remarks will be visible in the a\/c statement/),
    ).toBeInTheDocument();

    expect(screen.queryByText('No beneficiary found')).toBeInTheDocument();
    expect(screen.queryByText('Choose method')).toBeInTheDocument();
    expect(screen.queryByText('Transfer Method')).toBeInTheDocument();

    expect(screen.queryAllByText('Optional').length).toBe(2);
    expect(screen.queryByText('Quick Transfer')).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /Confirm if you want to make another transfer to the same account./,
      ),
    ).not.toBeInTheDocument();

    const confirmButton = screen.queryByRole('button', {
      name: 'Confirm',
    });

    expect(confirmButton).toBeDisabled();
    expect(confirmButton).toBeInTheDocument();

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    const paymentInstrumentIdInput = getByTestId(
      'payment-instrument-id',
    ).querySelector('input');
    const transferIdInput = getByTestId('transfer-id').querySelector('input');
    const amountInput = getByTestId('amount').querySelector('input');
    const remarksInput = getByTestId('remarks');

    await userEvent.type(paymentInstrumentIdInput, '1');
    await userEvent.type(transferIdInput, '1');
    await userEvent.type(amountInput, '1');
    await userEvent.type(remarksInput, '1');

    expect(paymentInstrumentIdInput).toHaveAttribute('value', 'abcxyz');
    expect(paymentInstrumentIdInput).toHaveAttribute('readOnly', '');

    expect(mockRequiredValidation).toHaveBeenCalledTimes(0);
    expect(mockTransferIdValidation).toHaveBeenCalledTimes(1);
    // expect(mockAmountValidation).toHaveBeenCalledTimes(1);

    // fireEvent.click(cancelButton);

    // expect(onClose).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.ADD_BENEFICIARY}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Add Beneficiary')).toBeInTheDocument();
      expect(screen.queryByText('Next')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  // test('checks page title', async () => {
  //   render(<AllTransfers />, {
  //     wrapper: CustomWrapper,
  //   });

  //   await waitFor(() => {
  //     expect(document.title).toBe('All Transfers');
  //   });
  // });

  // test('checks Table navigation and limit', async () => {
  //   render(<AllTransfers />, { wrapper: CustomWrapper });

  //   await waitFor(() => {
  //     const paginationEl = screen.queryByText('1 to 1');

  //     expect(paginationEl).toBeInTheDocument();

  //     expect(screen.queryAllByText('10').length).toBe(2);
  //     expect(screen.queryByText('25')).toBeInTheDocument();
  //     expect(screen.queryByText('50')).toBeInTheDocument();
  //     expect(screen.queryByText('Show')).toBeInTheDocument();
  //   });

  //   const paginationEl = screen.queryByText('1 to 1');

  //   const tableNavigation =
  //     paginationEl.parentElement.parentElement.parentElement;

  //   const [leftIcon, rightIcon, limitIcon] =
  //     tableNavigation.querySelectorAll('svg');

  //   expect(leftIcon.parentElement).toHaveClass('disabled');
  //   expect(rightIcon.parentElement).toHaveClass('disabled');
  //   expect(limitIcon).toBeInTheDocument();

  //   const limitEl = tableNavigation.querySelector('[role=listbox]');

  //   expect(limitEl).toHaveAttribute('data-event-properties', '{"value":10}');
  //   expect(limitEl).toHaveAttribute('aria-expanded', 'false');

  //   fireEvent.click(limitEl);

  //   await waitFor(() => {
  //     expect(limitEl).toHaveAttribute('aria-expanded', 'true');

  //     const limit25 = screen.queryByText('25');
  //     fireEvent.click(limit25);
  //   });

  //   await waitFor(() => {
  //     expect(limitEl).toHaveAttribute('data-event-properties', '{"value":25}');
  //     expect(Analytics.track).toHaveBeenCalledWith(EVENTS.CHANGE_PAGE_LIMIT, {
  //       size: '25',
  //     });
  //   });
  // });

  test('checks Row click', async () => {
    render(<AllTransfers />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.TRANSFERS]}/820988003/details`,
      {
        state: {
          rowDetails: {
            transferId: 'test_bene123onerupeesad',
            beneficiaryId: 'shubhankar_bank',
            referenceId: 820988003,
            id: 820988003,
            bankAccount: '881016293106',
            amount: '1',
            status: 'SUCCESS',
            ifsc: 'DBSS0IN0811',
            utr: '233515713088',
            mode: 'IMPS',
            vpa: 'N/A',
            beneficiaryName: 'ShubhankarSaha',
            addedOn: '2022-12-01T15:35:40+05:30',
            acknowledged: 'YES',
            paymentInstrumentId: 'CASHFREE_102',
          },
        },
      },
    );
  });
});
