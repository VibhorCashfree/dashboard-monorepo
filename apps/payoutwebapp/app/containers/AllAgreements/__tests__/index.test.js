import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Utils
import Analytics from 'utils/analytics';

// Services
import * as AgreementsService from 'services/agreements';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { MODAL_TYPE } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';
import MarkTerminalStatusModal from '../components/MarkTerminalStatusModal';
import Modals from '../components/Modals';

// Containers
import AllAgreements from '..';

const mockReload = jest.fn();

Object.defineProperty(window, 'location', {
  value: {
    reload: mockReload,
  },
});

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
  jest.mock('services/agreements');

  jest.spyOn(AgreementsService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 478,
          agreement_id: 'test123',
          purpose: 'foo bar',
          total_amount: '120',
          start_date: '2023-12-09T00:00:00+05:30',
          expiry_date: '2023-12-30T00:00:00+05:30',
          status: 'REJECTED',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(AgreementsService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest
    .spyOn(AgreementsService, 'markTerminalStatus')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In AllAgreements Container', () => {
  test('checks render', async () => {
    render(<AllAgreements />, {
      wrapper: CustomWrapper,
    });

    expect(AgreementsService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        lastId: '0',
        size: 10,
        status: [],
      }),
    );
    expect(AgreementsService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        lastId: '0',
        size: 10,
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('Agreement ID')).toBeInTheDocument();
      expect(screen.queryByText('test123')).toBeInTheDocument();
      expect(screen.queryByText('foo bar')).toBeInTheDocument();
      expect(screen.queryByText('₹ 120.00')).toBeInTheDocument();
      expect(screen.queryByText('Rejected')).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<AllAgreements />, { wrapper: CustomWrapper });

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
        section: LABEL_BY_SUBMENU[SUBMENU.AGREEMENTS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
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
        section: LABEL_BY_SUBMENU[SUBMENU.AGREEMENTS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
        filters: { REJECTED: true },
        searchBy: 'agreementId',
      }),
    );

    expect(screen.queryAllByText(/Rejected/).length).toBe(1);

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(6);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        data={{
          agreement_id: 'test123',
          number_of_parties: 12,
          total_amount: '136',
          message: 'This is agreement message',
        }}
        modalType={MODAL_TYPE.FAILED}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Agreement Creation Failed'),
      ).toBeInTheDocument();

      const closeButton = screen.queryByText('Close');

      expect(closeButton).not.toBeDisabled();
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        data={{
          agreement_id: 'test123',
          number_of_parties: 12,
          total_amount: '136',
          message: 'This is agreement message',
        }}
        modalType={MODAL_TYPE.SUCCESS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Agreement Created Successfully'),
      ).toBeInTheDocument();
      expect(screen.queryByText(/Agreement ID:/)).toBeInTheDocument();
      expect(screen.queryByText(/No. of Parties:/)).toBeInTheDocument();
      expect(screen.queryByText(/Amount:/)).toBeInTheDocument();

      const closeButton = screen.queryByText('Close');

      expect(closeButton).not.toBeDisabled();
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        data={{
          agreement_id: 'test123',
          number_of_parties: 12,
          total_amount: '136',
          message: 'This is agreement message',
        }}
        modalType={MODAL_TYPE.UPDATE_FAILED}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Unable to mark status as failed'),
      ).toBeInTheDocument();
      const closeButton = screen.queryByText('Close');

      expect(closeButton).not.toBeDisabled();
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        data={{
          agreement_id: 'test123',
          number_of_parties: 12,
          total_amount: '136',
          message: 'This is agreement message',
        }}
        modalType={MODAL_TYPE.UPDATE_SUCCESS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Agreement Status Successfully Updated & Payout Initiated',
        ),
      ).toBeInTheDocument();
      expect(screen.queryByText(/Agreement ID:/)).toBeInTheDocument();
      expect(screen.queryByText(/No. of Payouts:/)).toBeInTheDocument();
      expect(screen.queryByText(/Total Amount:/)).toBeInTheDocument();

      const closeButton = screen.queryByText('Close');

      expect(closeButton).not.toBeDisabled();
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);

      expect(mockReload).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const onClose = jest.fn();
    const onResponse = jest.fn();

    render(
      <MarkTerminalStatusModal
        data={{
          agreement_id: 'test123',
          total_amount: '200',
          message: 'This is agreement message',
          parties: [
            {
              name: 'john',
              type: 'BUYER',
              allocated_amount: 70,
            },
            {
              name: 'harry',
              type: 'BUYER',
              allocated_amount: 30,
            },
            {
              name: 'mathew',
              type: 'SELLER',
              allocated_amount: 100,
            },
          ],
        }}
        onClose={onClose}
        onResponse={onResponse}
      />,
      { wrapper: CustomWrapper },
    );

    expect(screen.queryByText('Mark Terminal Status')).toBeInTheDocument();
    expect(screen.queryByText('Total Sum')).toBeInTheDocument();
    expect(screen.queryByText('test123')).toBeInTheDocument();
    expect(screen.queryByText('Update Status')).toBeInTheDocument();
    expect(screen.queryByText('SUCCESS')).toBeInTheDocument();
    expect(screen.queryByText('₹ 200.00')).toBeInTheDocument();

    expect(screen.queryByText('Payouts Summary')).not.toBeInTheDocument();
    expect(screen.queryByText('Party Type')).not.toBeInTheDocument();
    expect(screen.queryByText('harry')).not.toBeInTheDocument();
    expect(screen.queryByText('mathew')).not.toBeInTheDocument();

    {
      const submitButton = screen.queryByText('Submit');
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();
    }

    fireEvent.click(screen.queryByText('Choose Status'));
    fireEvent.click(screen.queryByText('REFUND'));

    expect(screen.queryByText('Payouts Summary')).toBeInTheDocument();
    expect(screen.queryAllByText('Party Type').length).toBe(2);
    expect(screen.queryByText('harry')).toBeInTheDocument();
    expect(screen.queryByText('mathew')).not.toBeInTheDocument();

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    {
      const submitButton = screen.queryByText('Submit');
      expect(submitButton).not.toBeDisabled();

      fireEvent.click(submitButton);

      expect(AgreementsService.markTerminalStatus).toHaveBeenCalledWith({
        agreement_id: 'test123',
        status: 'REFUND',
      });

      await waitFor(() => {
        expect(onResponse).toHaveBeenCalledWith(MODAL_TYPE.UPDATE_SUCCESS, {
          agreement_id: 'test123',
          total_amount: '200',
          number_of_payouts: 2,
        });
      });
    }
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        data={{
          agreement_id: 'test123',
          number_of_parties: 12,
          total_amount: '136',
          message: 'This is agreement message',
        }}
        modalType={MODAL_TYPE.CREATE}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Expiry Date')).toBeInTheDocument();
      expect(screen.queryByText('Purpose')).toBeInTheDocument();
      expect(screen.queryByText('Create Agreement')).toBeInTheDocument();
      expect(screen.queryByText('Step 1/3')).toBeInTheDocument();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      const submitButton = screen.queryByText('Next');

      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();
    });
  });

  test('checks Row click', async () => {
    render(<AllAgreements />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.ONE_ESCROW]}/${
        PATH_BY_SUBMENU[SUBMENU.AGREEMENTS]
      }/478/details`,
      {
        state: {
          rowDetails: {
            id: 478,
            agreement_id: 'test123',
            purpose: 'foo bar',
            total_amount: '120',
            start_date: '2023-12-09T00:00:00+05:30',
            expiry_date: '2023-12-30T00:00:00+05:30',
            status: 'REJECTED',
          },
        },
      },
    );
  });

  test('<StepOne />', async () => {
    const setErrorObj = jest.fn();
    const setSelection = jest.fn();
    const onChange = jest.fn();

    const { getByTestId } = render(
      <StepOne
        formObj={{ purpose: 'foobar' }}
        errorObj={{ purpose: 'something is wrong with purpose' }}
        setErrorObj={setErrorObj}
        setSelection={setSelection}
        onChange={onChange}
      />,
      {
        wrapper: CustomWrapper,
      },
    );

    expect(screen.queryByText('Start Date')).toBeInTheDocument();
    expect(screen.queryByText('Expiry Date')).toBeInTheDocument();

    const [startDateInput, expiryDateInput] =
      screen.getAllByPlaceholderText('Select Date');

    {
      fireEvent.click(startDateInput);

      const applyButton = screen.queryByText('Apply');

      expect(applyButton).toBeDisabled();
      expect(applyButton).toBeInTheDocument();

      fireEvent.click(screen.queryByText('9'));

      expect(applyButton).not.toBeDisabled();

      fireEvent.click(applyButton);

      expect(onChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          name: 'start_date',
        }),
      );
    }

    {
      fireEvent.click(expiryDateInput);

      const applyButton = screen.queryByText('Apply');

      expect(applyButton).toBeDisabled();
      expect(applyButton).toBeInTheDocument();

      fireEvent.click(screen.queryByText('9'));

      expect(applyButton).not.toBeDisabled();

      fireEvent.click(applyButton);

      expect(onChange).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          name: 'expiry_date',
        }),
      );
    }

    expect(
      screen.queryByText('This field cannot be blank.'),
    ).not.toBeInTheDocument();

    expect(screen.getByText('something is wrong with purpose')).toHaveClass(
      'ui pointing above prompt label',
    );

    const purposeInput = getByTestId('purpose').querySelector('input');
    const amountInput = getByTestId('amount').querySelector('input');

    await userEvent.type(purposeInput, 'baz');
    await userEvent.type(amountInput, '328');

    expect(onChange).toHaveBeenCalledTimes(8);
  });

  test('<StepTwo /> handleEdit()', async () => {
    const setErrorObj = jest.fn();
    const setFormObj = jest.fn();
    const setParties = jest.fn();
    const setWasLastPage = jest.fn();
    const onChange = jest.fn();

    render(
      <StepTwo
        formObj={{}}
        errorObj={{}}
        amount="140"
        wasLastPage={true}
        parties={[
          {
            name: 'john',
            type: 'BUYER',
            allocated_percentage_of_amount: 45,
          },
          {
            name: 'harry',
            type: 'BUYER',
            allocated_percentage_of_amount: 45,
          },
          {
            name: 'mathew',
            type: 'SELLER',
            allocated_percentage_of_amount: 27,
          },
        ]}
        setFormObj={setFormObj}
        setErrorObj={setErrorObj}
        setParties={setParties}
        setWasLastPage={setWasLastPage}
        onChange={onChange}
      />,
      {
        wrapper: CustomWrapper,
      },
    );

    expect(setWasLastPage).toHaveBeenCalledWith(false);

    const anotherPartyButton = screen.queryByText(/Add Another Party/);
    expect(anotherPartyButton).not.toBeDisabled();
    expect(anotherPartyButton).toBeInTheDocument();

    expect(screen.queryAllByText('Proportion').length).toBe(3);
    expect(screen.queryByText('Seller 1')).toBeInTheDocument();
    expect(screen.queryByText('mathew')).toBeInTheDocument();
    expect(screen.queryByText('0.27')).toBeInTheDocument();
    expect(screen.queryByText('Buyer 1')).toBeInTheDocument();
    expect(screen.queryByText('harry')).toBeInTheDocument();

    expect(
      screen.queryByText(
        'At least one buyer and one seller needs to be added.',
      ),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Party Type')).not.toBeInTheDocument();
    expect(screen.queryByText(/Add Party/)).not.toBeInTheDocument();

    fireEvent.click(screen.queryAllByRole('chevron-down')[0].previousSibling);

    await waitFor(() => {
      fireEvent.click(screen.queryByText(/Edit Details/));
    });

    expect(setFormObj).toHaveBeenCalledWith({
      allocated_percentage_of_amount: 45,
      name: 'john',
      type: 'BUYER',
    });
  });

  test('<StepTwo /> handleDelete()', async () => {
    const setErrorObj = jest.fn();
    const setFormObj = jest.fn();
    const setParties = jest.fn();
    const setWasLastPage = jest.fn();
    const onChange = jest.fn();

    render(
      <StepTwo
        formObj={{}}
        errorObj={{}}
        amount="140"
        wasLastPage={true}
        parties={[
          {
            name: 'john',
            type: 'BUYER',
            allocated_percentage_of_amount: 45,
          },
          {
            name: 'harry',
            type: 'BUYER',
            allocated_percentage_of_amount: 45,
          },
          {
            name: 'mathew',
            type: 'SELLER',
            allocated_percentage_of_amount: 27,
          },
        ]}
        setFormObj={setFormObj}
        setErrorObj={setErrorObj}
        setParties={setParties}
        setWasLastPage={setWasLastPage}
        onChange={onChange}
      />,
      {
        wrapper: CustomWrapper,
      },
    );

    fireEvent.click(screen.queryAllByRole('chevron-down')[0].previousSibling);

    await waitFor(() => {
      fireEvent.click(screen.queryByText(/Delete/));
    });

    expect(setParties).toHaveBeenCalledWith([]);
  });

  test('<StepTwo /> form', async () => {
    const setErrorObj = jest.fn();
    const setFormObj = jest.fn();
    const setParties = jest.fn();
    const setWasLastPage = jest.fn();
    const onChange = jest.fn();

    const { getByTestId } = render(
      <StepTwo
        formObj={{
          name: 'foobar',
          type: 'something',
          allocated_percentage_of_amount: 35,
          address: 'koramangala',
          ifsc: 'ICIC',
        }}
        errorObj={{ type: 'something is wrong with type' }}
        amount="140"
        wasLastPage={false}
        parties={[
          {
            name: 'john',
            type: 'BUYER',
            allocated_percentage_of_amount: 45,
          },
          {
            name: 'harry',
            type: 'BUYER',
            allocated_percentage_of_amount: 45,
          },
          {
            name: 'mathew',
            type: 'SELLER',
            allocated_percentage_of_amount: 27,
          },
        ]}
        setFormObj={setFormObj}
        setErrorObj={setErrorObj}
        setParties={setParties}
        setWasLastPage={setWasLastPage}
        onChange={onChange}
      />,
      {
        wrapper: CustomWrapper,
      },
    );

    expect(setWasLastPage).not.toHaveBeenCalled();

    const addPartyButton = screen.queryByText('Add Party');
    expect(addPartyButton).toBeDisabled();
    expect(addPartyButton).toBeInTheDocument();

    expect(screen.queryByText(/Add Another Party/)).not.toBeInTheDocument();

    expect(screen.queryAllByText('Proportion').length).toBe(0);

    expect(
      screen.queryByText('Maximum 150 characters are allowed.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Bank Account Number')).toBeInTheDocument();
    expect(screen.queryByText('PAN Number')).toBeInTheDocument();
    expect(screen.queryByText('Choose Escrow Party Type')).toBeInTheDocument();
    expect(screen.queryByText('Party Type')).toBeInTheDocument();

    const nameInput = getByTestId('name').querySelector('input');
    const percentageAmountInput =
      getByTestId('percentage-amount').querySelector('input');
    const ifscInput = getByTestId('ifsc').querySelector('input');
    const emailInput = getByTestId('email').querySelector('input');
    const phoneInput = getByTestId('phone').querySelector('input');

    await userEvent.type(emailInput, 'foo@bar.com');
    await userEvent.type(phoneInput, '9876');

    expect(nameInput).toHaveAttribute('value', 'foobar');
    expect(percentageAmountInput).toHaveAttribute('value', '35');
    expect(ifscInput).toHaveAttribute('value', 'ICIC');

    expect(onChange).toHaveBeenCalledTimes(15);
  });

  test('<StepThree />', async () => {
    render(
      <StepThree
        formObj={{
          purpose: 'foobar',
          start_date: '12/10/2023',
          expiry_date: '11/12/2023',
          total_amount: 345,
        }}
        parties={[
          {
            name: 'john',
            type: 'BUYER',
            allocated_percentage_of_amount: 45,
          },
          {
            name: 'harry',
            type: 'BUYER',
            allocated_percentage_of_amount: 45,
          },
          {
            name: 'mathew',
            type: 'SELLER',
            allocated_percentage_of_amount: 27,
          },
        ]}
      />,
      {
        wrapper: CustomWrapper,
      },
    );

    expect(screen.queryByText('Basic Details')).toBeInTheDocument();
    expect(screen.queryByText('12 Nov 2023')).toBeInTheDocument();

    expect(screen.queryByText('mathew')).toBeInTheDocument();
    expect(screen.queryByText('Seller 1')).toBeInTheDocument();
    expect(screen.queryByText('harry')).toBeInTheDocument();
    expect(screen.queryByText('Buyer 2')).toBeInTheDocument();
    expect(screen.queryByText('₹ 345.00')).toBeInTheDocument();
    expect(screen.queryByText('Escrow Parties')).toBeInTheDocument();
    expect(screen.queryByText('foobar')).toBeInTheDocument();
  });
});
