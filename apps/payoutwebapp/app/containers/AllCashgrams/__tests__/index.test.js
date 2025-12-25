import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Services
import * as CashgramsService from 'services/cashgrams';
// import * as MiscService from 'services/misc';

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
// import CreateCashgramModal from '../components/CreateCashgramModal';

// Containers
import AllCashgrams from '..';

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
  jest.mock('services/misc');

  jest.spyOn(CashgramsService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 5873680,
          cashgramId: 'VIMOB4370',
          amount: '1',
          name: 'bzhhs',
          addedOn: '2022-11-16T13:03:33+05:30',
          status: 'REDEEMED',
          phone: '9765556171',
          cashgram: 'https://cg.cashfree.com/wln6qou',
          expiry: '2022-12-17T00:00:00+05:30',
          email: '',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(CashgramsService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest
    .spyOn(CashgramsService, 'create')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(CashgramsService, 'deactivate')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(CashgramsService, 'send')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In AllCashgrams Container', () => {
  test('checks render', async () => {
    render(<AllCashgrams />, { wrapper: CustomWrapper });

    expect(CashgramsService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );
    expect(CashgramsService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
        status: [],
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('VIMOB4370')).toBeInTheDocument();
      expect(screen.queryByText('9765556171')).toBeInTheDocument();
      expect(screen.queryByText('Redeemed')).toBeInTheDocument();
      expect(
        screen.queryByText('All cashgrams including batch are shown here.'),
      ).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<AllCashgrams />, { wrapper: CustomWrapper });

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
        sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
      }),
    );

    expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
    expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const filterOption = document.getElementsByName('REDEEMED')[0];

    fireEvent.click(filterOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.APPLIED_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.CASHGRAMS],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
        filters: { REDEEMED: true },
        search_by: 'cashgramId',
      }),
    );

    expect(screen.queryAllByText(/Redeemed/).length).toBe(1);

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(8);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  // test('<CreateCashgramModal />', async () => {
  //   const onClose = jest.fn();
  //   const onResponse = jest.fn();

  //   render(<CreateCashgramModal onResponse={onResponse} onClose={onClose} />, {
  //     wrapper: CustomWrapper,
  //   });

  //   expect(screen.queryByText('Create Cashgram')).toBeInTheDocument();
  //   expect(screen.queryByText('Step 1/2')).toBeInTheDocument();
  //   expect(screen.queryAllByText('Optional').length).toBe(2);
  //   expect(screen.queryAllByText('Payout Type').length).toBe(2);
  //   expect(screen.queryByText('Reimbursement')).toBeInTheDocument();
  //   expect(screen.queryByText('Rewards')).toBeInTheDocument();

  //   const submitButton = screen.queryByRole('button', {
  //     name: 'Next',
  //   });

  //   expect(submitButton).toHaveClass('ml-4');
  //   expect(submitButton).toBeInTheDocument();
  //   expect(submitButton).toBeDisabled();

  //   const cashgramIdInput = screen.queryByPlaceholderText('Cashgram ID');
  //   await userEvent.type(cashgramIdInput, 'foobar');

  //   const phoneInput = screen.queryByPlaceholderText('10 digit phone number');

  //   fireEvent.focus(phoneInput);
  //   await userEvent.type(phoneInput, '123456');
  //   fireEvent.blur(phoneInput);

  //   expect(MiscService.getUpiByMobile).toHaveBeenCalledWith({
  //     mobile_number: '123456',
  //   });

  //   expect(
  //     screen.queryByText('Phone number should include 10 digits.'),
  //   ).toBeInTheDocument();

  //   const beneNameInput = screen.queryByPlaceholderText('Beneficiary Name');
  //   await userEvent.type(beneNameInput, 'foobar');
  //   expect(beneNameInput.value).toBe('foobar');

  //   await userEvent.clear(beneNameInput);
  //   expect(
  //     screen.queryByText('This field cannot be blank.'),
  //   ).toBeInTheDocument();

  //   const beneEmailInput = screen.queryByPlaceholderText(
  //     'Beneficiary Email ID',
  //   );
  //   await userEvent.type(beneEmailInput, 'foo@bar.com');
  //   expect(beneEmailInput.value).toBe('foo@bar.com');

  //   const cancelButton = screen.queryByText('Cancel');

  //   expect(cancelButton).not.toBeDisabled();
  //   expect(cancelButton).toBeInTheDocument();

  //   fireEvent.click(cancelButton);

  //   expect(onClose).toHaveBeenCalled();
  // });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.DEACTIVATE}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={{ cashgramId: 1234 }}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Deactivate Cashgram')).toBeInTheDocument();
      expect(
        screen.queryByText('Are you sure to deactivate the below Cashgram?'),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Deactivate',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(CashgramsService.deactivate).toHaveBeenCalledWith(1234);

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
        modalType={MODAL_TYPE.SEND}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={{
          id: 123,
          cashgramId: 1234,
          email: 'foo@bar.com',
          phone: '9876543210',
        }}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Send Cashgram')).toBeInTheDocument();
      expect(screen.queryByText(/Email\/SMS/)).toBeInTheDocument();
      expect(screen.queryByText('(foo@bar.com)')).toBeInTheDocument();
      expect(screen.queryByText('(9876543210)')).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Send',
      });

      expect(submitButton).toHaveClass('ml-4');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      // expect(CashgramsService.send).toHaveBeenCalled();

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
        selectedRow={{ id: 123 }}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Cashgram successfully created'),
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
        modalType={MODAL_TYPE.FAILED}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={{ id: 123 }}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Unable to create Cashgram'),
      ).toBeInTheDocument();

      expect(
        screen.queryByText(/Try again after some time or write to/),
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
        modalType={MODAL_TYPE.DEACTIVATE_SUCCESS}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={{ id: 123 }}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Cashgram successfully Deactivated'),
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
        modalType={MODAL_TYPE.DEACTIVATE_FAILED}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={{ id: 123 }}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Cashgram Deactivation failed'),
      ).toBeInTheDocument();

      expect(
        screen.queryByText(/Try again after some time or write to/),
      ).toBeInTheDocument();

      const cancelButton = screen.queryByText('Close');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Row click', async () => {
    render(<AllCashgrams />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.CASHGRAMS]}/5873680/details`,
      {
        state: {
          rowDetails: {
            id: 5873680,
            cashgramId: 'VIMOB4370',
            amount: '1',
            name: 'bzhhs',
            addedOn: '2022-11-16T13:03:33+05:30',
            status: 'REDEEMED',
            phone: '9765556171',
            cashgram: 'https://cg.cashfree.com/wln6qou',
            expiry: '2022-12-17T00:00:00+05:30',
            email: '',
          },
        },
      },
    );
  });

  // test('<StepOne />', async () => {
  //   const setErrorObj = jest.fn();
  //   const setSelection = jest.fn();
  //   const onChange = jest.fn();

  //   render(
  //     <StepOne
  //       formObj={{ cashgramId: 'xyz100', name: 'doe', phone: '789' }}
  //       errorObj={{ name: 'something is wrong with name' }}
  //       setErrorObj={setErrorObj}
  //       setSelection={setSelection}
  //       onChange={onChange}
  //     />,
  //     {
  //       wrapper: CustomWrapper,
  //     },
  //   );

  //   expect(screen.queryByText('Max. 20 characters')).toBeInTheDocument();
  //   expect(screen.queryAllByText('Optional').length).toBe(2);

  //   expect(
  //     screen.queryByText('This field cannot be blank.'),
  //   ).not.toBeInTheDocument();

  //   expect(screen.getByText('something is wrong with name')).toHaveClass(
  //     'ui pointing above prompt label',
  //   );

  //   const cashgramIdInput = screen.queryByPlaceholderText(/Cashgram ID/i);
  //   const payoutTypeInput = screen.queryByPlaceholderText(/Payout Type/i);
  //   const phoneInput = screen.queryByPlaceholderText(/10 digit phone number/i);
  //   const emailInput = screen.queryByPlaceholderText(/Beneficiary Email ID/i);
  //   const amountInput = screen.queryByPlaceholderText(/Amount/i);

  //   await userEvent.type(emailInput, 'foo@cashfree.com');
  //   await userEvent.type(amountInput, '328');

  //   await userEvent.clear(cashgramIdInput);

  //   expect(onChange).toHaveBeenCalledTimes(20);

  //   // expect(screen.getByText(/This field cannot be blank./)).toHaveClass(
  //   //   'ui pointing above prompt label',
  //   // );

  //   // expect(
  //   //   screen.getByText(/Phone number should include 10 digits./),
  //   // ).toHaveClass('ui pointing above prompt label');

  //   expect(payoutTypeInput).toBe(null);

  //   fireEvent.focus(phoneInput);
  //   fireEvent.blur(phoneInput);

  //   expect(MiscService.getUpiByMobile).toHaveBeenCalledWith({
  //     mobile_number: '789',
  //   });

  //   await waitFor(() => {
  //     expect(setSelection).toHaveBeenCalledWith('UPI');
  //   });
  // });

  // test('<StepTwo /> CASHGRAM_LINK', async () => {
  //   const setSelection = jest.fn();
  //   const onChange = jest.fn();

  //   const { getByTestId } = render(
  //     <StepTwo
  //       formObj={{
  //         description: 'This is my tag line',
  //         // linkExpiry: '03/JUN/2023',
  //         sendSMS: true,
  //         isValidation: true,
  //         vpa: { vpa: 'success@upi', nameAtBank: 'John Doe' },
  //       }}
  //       errorObj={{ remarks: 'something is wrong with remarks' }}
  //       selection="CASHGRAM_LINK"
  //       setSelection={setSelection}
  //       onChange={onChange}
  //     />,
  //     {
  //       wrapper: CustomWrapper,
  //     },
  //   );

  //   expect(screen.queryByText('Disbursal Method')).toBeInTheDocument();

  //   expect(screen.getByText('something is wrong with remarks')).toHaveClass(
  //     'ui pointing above prompt label',
  //   );

  //   expect(screen.queryByText('Cashgram Valid Till')).toBeInTheDocument();
  //   expect(screen.queryByText('success@upi')).toBeInTheDocument();
  //   expect(screen.queryByText('John Doe')).toBeInTheDocument();
  //   expect(screen.queryByText('Verified')).toBeInTheDocument();
  //   expect(screen.queryByText('Send Cashgram Link')).toBeInTheDocument();
  //   expect(screen.queryAllByText('Optional').length).toBe(2);

  //   const [dateInput] = screen.getAllByPlaceholderText('Select Date');

  //   {
  //     fireEvent.click(dateInput);

  //     const applyButton = screen.queryByText('Apply');

  //     expect(applyButton).toBeDisabled();
  //     expect(applyButton).toBeInTheDocument();

  //     fireEvent.click(screen.queryByText('9'));

  //     expect(applyButton).not.toBeDisabled();

  //     fireEvent.click(applyButton);

  //     expect(onChange).toHaveBeenCalledWith(
  //       null,
  //       expect.objectContaining({
  //         name: 'linkExpiry',
  //       }),
  //     );
  //   }

  //   const descriptionInput = getByTestId('description').querySelector('input');

  //   expect(descriptionInput).toHaveAttribute('value', 'This is my tag line');

  //   const [
  //     sendEmailCheckbox,
  //     sendSMSCheckbox,
  //     sendWhatsappCheckbox,
  //     isValidationCheckbox,
  //   ] = screen.getAllByRole('checkbox');

  //   expect(sendWhatsappCheckbox).not.toBeChecked();
  //   expect(sendSMSCheckbox).toBeChecked();
  //   expect(sendEmailCheckbox).not.toBeChecked();
  //   expect(isValidationCheckbox).toBeChecked();

  //   fireEvent.click(sendWhatsappCheckbox);

  //   // await waitFor(() => {
  //   //   expect(sendWhatsappCheckbox).toBeChecked();
  //   // });

  //   const radios = screen.getAllByRole('radio');

  //   expect(radios[0]).not.toBeChecked();
  //   expect(radios[1]).toBeChecked();

  //   fireEvent.click(screen.queryByText('success@upi'));
  //   expect(setSelection).toHaveBeenCalledWith('UPI');
  // });

  // test('<StepTwo /> UPI', async () => {
  //   const setSelection = jest.fn();
  //   const onChange = jest.fn();

  //   const { getByTestId } = render(
  //     <StepTwo
  //       formObj={{
  //         description: 'This is my tag line',
  //         // linkExpiry: '11/JUN/2023',
  //         sendSMS: true,
  //         isValidation: true,
  //         vpa: { vpa: 'success@upi', nameAtBank: 'John Doe' },
  //       }}
  //       errorObj={{ remarks: 'something is wrong with remarks' }}
  //       selection="UPI"
  //       setSelection={setSelection}
  //       onChange={onChange}
  //     />,
  //     {
  //       wrapper: CustomWrapper,
  //     },
  //   );

  //   const [dateInput] = screen.getAllByPlaceholderText('Select Date');

  //   {
  //     fireEvent.click(dateInput);

  //     const applyButton = screen.queryByText('Apply');

  //     expect(applyButton).toBeDisabled();
  //     expect(applyButton).toBeInTheDocument();

  //     fireEvent.click(screen.queryByText('9'));

  //     expect(applyButton).not.toBeDisabled();

  //     fireEvent.click(applyButton);

  //     expect(onChange).toHaveBeenCalledWith(
  //       null,
  //       expect.objectContaining({
  //         name: 'linkExpiry',
  //       }),
  //     );
  //   }

  //   const radios = screen.getAllByRole('radio');

  //   expect(radios[0]).toBeChecked();
  //   expect(radios[1]).not.toBeChecked();

  //   const descriptionInput = getByTestId('description').querySelector('input');

  //   expect(descriptionInput).toHaveAttribute('value', 'This is my tag line');

  //   fireEvent.click(
  //     screen.queryByText('Send a Link via WhatsApp, Email or SMS'),
  //   );
  //   expect(setSelection).toHaveBeenCalledWith('CASHGRAM_LINK');
  // });
});
