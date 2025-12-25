import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
import { BENE_PURPOSE } from 'constants/common';
import EVENTS from 'constants/events';
import { MODAL_TYPE } from '../constants';

// Components
import Wrapper from '__tests__/components/Wrapper';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';
import Modals from '../components/Modals';

// Utils
import * as ValidationUtil from 'utils/formValidation';

// Containers
import AllBeneficiaries from '..';

// eslint-disable-next-line react/prop-types
const CustomWrapper = ({ children }) => (
  <Wrapper>
    <ListProvider>
      <BatchDetailsProvider>{children}</BatchDetailsProvider>
    </ListProvider>
  </Wrapper>
);

const mockNavigate = jest.fn();

const mockRequiredValidation = jest.fn();
const mockBeneIdValidation = jest.fn();
const mockNameValidation = jest.fn();
const mockEmailValidation = jest.fn();
const mockPhoneValidation = jest.fn();

const mockAccountNumberValidation = jest.fn();
const mockVpaValidation = jest.fn();
const mockIfscValidation = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('utils/analytics', () => ({
  track: jest.fn(),
}));

beforeEach(() => {
  jest.mock('utils/formValidation');

  jest
    .spyOn(ValidationUtil, 'requiredValidation')
    .mockImplementation(mockRequiredValidation);

  jest
    .spyOn(ValidationUtil, 'beneIdValidation')
    .mockImplementation(mockBeneIdValidation);

  jest
    .spyOn(ValidationUtil, 'emailValidation')
    .mockImplementation(mockEmailValidation);

  jest
    .spyOn(ValidationUtil, 'phoneNumberValidation')
    .mockImplementation(mockPhoneValidation);

  jest
    .spyOn(ValidationUtil, 'nameValidation')
    .mockImplementation(mockNameValidation);

  jest
    .spyOn(ValidationUtil, 'ifscValidation')
    .mockImplementation(mockIfscValidation);

  jest
    .spyOn(ValidationUtil, 'accountNumberValidation')
    .mockImplementation(mockAccountNumberValidation);

  jest
    .spyOn(ValidationUtil, 'vpaValidation')
    .mockImplementation(mockVpaValidation);

  jest.mock('services/beneficiaries');

  jest.spyOn(BeneficiariesService, 'getAll').mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: 1994555,
          addedOn: '2024-03-12T18:19:06',
          beneId: '9747392524_1710247745',
          name: 'JOHN DOE',
          email: 'john@example.com',
          phone: '9747392524',
          vpa: 'success@upi',
          bankAccount: '00011020001772',
          ifsc: 'HDFC0000001',
          status: 'INVALID',
          benePurpose: '',
        },
      ],
      hasNext: false,
    }),
  );

  jest.spyOn(BeneficiariesService, 'getAllCount').mockImplementation(() =>
    Promise.resolve({
      count: 1,
    }),
  );

  jest
    .spyOn(BeneficiariesService, 'remove')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(BeneficiariesService, 'update')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('In AllBeneficiaries Container', () => {
  test('checks render', async () => {
    render(<AllBeneficiaries />, { wrapper: CustomWrapper });

    expect(BeneficiariesService.getAll).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
      }),
    );
    expect(BeneficiariesService.getAllCount).toHaveBeenCalledWith(
      expect.objectContaining({
        size: 10,
        lastId: '0',
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText('9747392524')).toBeInTheDocument();
      expect(screen.queryByText('success@upi')).not.toBeInTheDocument();
      expect(screen.queryByText('JOHN DOE')).toBeInTheDocument();
      expect(screen.queryByText('john@example.com')).toBeInTheDocument();
      expect(screen.queryByText('Beneficiary Purpose')).toBeInTheDocument();
      expect(screen.queryByText('Verification Status')).toBeInTheDocument();
    });
  });

  test('checks Filters', async () => {
    render(<AllBeneficiaries />, { wrapper: CustomWrapper });

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
        sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
      }),
    );

    expect(screen.queryByText(/Last Month/)).toBeInTheDocument();
    expect(screen.queryByText(/Last 7 days/)).not.toBeInTheDocument();

    fireEvent.click(searchFilter);

    expect(screen.queryByText('Apply')).toBeDisabled();

    const filterOption = document.getElementsByName('INVALID')[0];

    fireEvent.click(filterOption);

    expect(screen.queryByText('Apply')).not.toBeDisabled();

    fireEvent.click(screen.queryByText('Apply'));

    expect(Analytics.track).toHaveBeenCalledWith(
      EVENTS.APPLIED_FILTERS,
      expect.objectContaining({
        section: LABEL_BY_MENU[MENU.BENEFICIARIES],
        sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
        filters: { INVALID: true },
        search_by: 'beneId',
      }),
    );

    expect(screen.queryAllByText(/Invalid/).length).toBe(1);

    fireEvent.click(document.getElementsByClassName('cross pointer pl-1')[0]);

    expect(screen.getAllByTestId('table-header-cell').length).toBe(8);
    expect(screen.getAllByTestId('fetching-div').length).toBe(1);
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    const { getByTestId } = render(
      <Modals
        modalType={MODAL_TYPE.ADD}
        selectedRow={{}}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    expect(screen.queryByText('Add Beneficiary')).toBeInTheDocument();
    expect(screen.queryByText('General Details')).toBeInTheDocument();
    expect(screen.queryByText('Step 1/2')).toBeInTheDocument();

    expect(screen.queryByText('Update Beneficiary')).not.toBeInTheDocument();
    expect(screen.queryByText('Step 1/3')).not.toBeInTheDocument();
    expect(screen.queryByText('KYC Details')).not.toBeInTheDocument();
    expect(screen.queryByText('Account Number')).not.toBeInTheDocument();
    expect(screen.queryByText('Back')).not.toBeInTheDocument();

    expect(
      screen.queryByText('Maximum 150 characters are allowed.'),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Amazon Pay transfers will/)).toBeInTheDocument();

    const beneIdInput = getByTestId('bene-id').querySelector('input');
    const nameInput = getByTestId('name').querySelector('input');
    const phoneInput = getByTestId('phone').querySelector('input');
    const emailInput = getByTestId('email').querySelector('input');
    const addressInput = getByTestId('address1');

    // expect(beneIdInput).toHaveAttribute('value', 'bar');
    // expect(nameInput).toHaveAttribute('value', 'foo');
    // expect(phoneInput).toHaveAttribute('value', '9876');
    // expect(emailInput).toHaveAttribute('value', 'example@cashfree.com');

    await userEvent.type(beneIdInput, '1');
    await userEvent.type(nameInput, '1');
    await userEvent.type(phoneInput, '1');
    await userEvent.type(emailInput, '1');
    await userEvent.type(addressInput, '1');

    expect(mockRequiredValidation).toHaveBeenCalledTimes(1);
    expect(mockBeneIdValidation).toHaveBeenCalledTimes(1);
    expect(mockNameValidation).toHaveBeenCalledTimes(1);
    expect(mockEmailValidation).toHaveBeenCalledTimes(1);
    expect(mockPhoneValidation).toHaveBeenCalledTimes(1);

    const nextButton = screen.queryByText('Next');

    expect(nextButton).toBeDisabled();
    expect(nextButton).toBeInTheDocument();

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(setModalType).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    const { getByTestId, queryByTestId } = render(
      <Modals
        modalType={MODAL_TYPE.UPDATE}
        selectedRow={{
          beneficiaryKycDocData: [
            { kycDocType: 'PAN', status: 'VERIFIED' },
            { kycDocType: 'GST', status: 'VERIFIED' },
            { kycDocType: 'CIN', status: 'VERIFIED' },
            { kycDocType: 'DIN', status: 'VERIFIED' },
          ],
        }}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    expect(screen.queryByText('Update Beneficiary')).toBeInTheDocument();
    expect(screen.queryByText('General Details')).not.toBeInTheDocument();
    expect(screen.queryByText('Step 2/3')).toBeInTheDocument();

    expect(screen.queryByText('KYC Details')).not.toBeInTheDocument();
    expect(screen.queryByText('Back')).not.toBeInTheDocument();

    expect(screen.queryByText('Account Number')).toBeInTheDocument();
    expect(screen.queryByText(/Payment Method/)).toBeInTheDocument();
    expect(screen.queryByText('Optional')).toBeInTheDocument();
    expect(screen.queryByText('IBAN must contain:')).not.toBeInTheDocument();

    const vpaInput = getByTestId('vpa').querySelector('input');
    const bankAccountInput = getByTestId('bank-account').querySelector('input');
    const ifscInput = getByTestId('ifsc').querySelector('input');

    expect(queryByTestId('account-iban')).not.toBeInTheDocument();

    await userEvent.type(vpaInput, '1');
    await userEvent.type(bankAccountInput, '1');
    await userEvent.type(ifscInput, '1');

    expect(mockAccountNumberValidation).toHaveBeenCalledTimes(1);
    expect(mockVpaValidation).toHaveBeenCalledTimes(1);
    expect(mockIfscValidation).toHaveBeenCalledTimes(1);

    const nextButton = screen.queryByText('Next');

    expect(nextButton).not.toBeDisabled();
    expect(nextButton).toBeInTheDocument();

    const cancelButton = screen.queryByText('Cancel');

    expect(cancelButton).not.toBeDisabled();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(setModalType).toHaveBeenCalled();
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    const { getByTestId } = render(
      <Modals
        modalType={MODAL_TYPE.UPDATE}
        selectedRow={{
          id: 123,
          beneficiaryKycDocData: [
            { kycDocType: 'BANK', status: 'VERIFIED' },
            { kycDocType: 'PAN', status: 'VERIFIED' },
            { kycDocType: 'GST', status: 'VERIFIED' },
            { kycDocType: 'CIN', status: 'VERIFIED' },
            { kycDocType: 'DIN', status: 'VERIFIED' },
          ],
        }}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
      />,
      { wrapper: CustomWrapper },
    );

    expect(screen.queryAllByText('Update Beneficiary').length).toBe(2);
    expect(screen.queryByText('General Details')).not.toBeInTheDocument();
    expect(screen.queryByText('Step 3/3')).toBeInTheDocument();

    expect(screen.queryByText('KYC Details')).toBeInTheDocument();
    expect(screen.queryByText('Back')).not.toBeInTheDocument();

    const panCardInput = getByTestId('pan-card').querySelector('input');
    const gstInInput = getByTestId('gstin').querySelector('input');
    const cinInput = getByTestId('cin').querySelector('input');
    const dinInput = getByTestId('din').querySelector('input');

    expect(panCardInput).toBeDisabled();
    expect(gstInInput).toBeDisabled();
    expect(cinInput).toBeDisabled();
    expect(dinInput).toBeDisabled();

    // expect(mockRequiredValidation).toHaveBeenCalledTimes(1);

    const nextButton = screen.queryAllByText('Update Beneficiary')[1];

    expect(nextButton).not.toBeDisabled();
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    expect(BeneficiariesService.update).toHaveBeenCalledWith(123, {});

    await waitFor(() => {
      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Modals render', async () => {
    const setModalType = jest.fn();
    const setFetchCounter = jest.fn();

    render(
      <Modals
        modalType={MODAL_TYPE.DELETE}
        setModalType={setModalType}
        setFetchCounter={setFetchCounter}
        selectedRow={{ beneId: '123' }}
      />,
      { wrapper: CustomWrapper },
    );

    await waitFor(() => {
      expect(screen.queryByText('Delete Beneficiary')).toBeInTheDocument();
      expect(
        screen.queryByText(
          'You will not be able to transfer funds to this beneficiary after you delete it.',
        ),
      ).toBeInTheDocument();

      const submitButton = screen.queryByRole('button', {
        name: 'Delete',
      });

      expect(submitButton).toHaveClass('ml-2');
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      expect(BeneficiariesService.remove).toHaveBeenCalledWith('123');
      expect(setModalType).toHaveBeenCalled();

      const cancelButton = screen.queryByText('Cancel');

      expect(cancelButton).not.toBeDisabled();
      expect(cancelButton).toBeInTheDocument();

      fireEvent.click(cancelButton);

      expect(setModalType).toHaveBeenCalled();
    });
  });

  test('checks Row click', async () => {
    render(<AllBeneficiaries />, {
      wrapper: CustomWrapper,
    });

    await waitFor(() => {
      const firstRow = screen.getAllByTestId('table-row')[0];
      fireEvent.click(firstRow);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/${PATH_BY_MENU[MENU.BENEFICIARIES]}/1994555/details`,
      {
        state: {
          rowDetails: {
            id: 1994555,
            addedOn: '2024-03-12T18:19:06',
            beneId: '9747392524_1710247745',
            name: 'JOHN DOE',
            email: 'john@example.com',
            phone: '9747392524',
            vpa: 'success@upi',
            bankAccount: '00011020001772',
            ifsc: 'HDFC0000001',
            status: 'INVALID',
            benePurpose: '',
          },
        },
      },
    );
  });

  test('<StepOne />', async () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <StepOne
        formObj={{
          beneId: 'bar',
          benePurpose: BENE_PURPOSE.AMAZON_UPI_BENE,
          name: 'foo',
          phone: '9876',
          email: 'example@cashfree.com',
          address1: 'koramangala',
        }}
        errorObj={{ phone: 'something is wrong with phone' }}
        onChange={onChange}
      />,
      {
        wrapper: CustomWrapper,
      },
    );

    expect(screen.queryByText('General Details')).toBeInTheDocument();
    expect(
      screen.queryByText('Maximum 150 characters are allowed.'),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Amazon Pay transfers will/)).toBeInTheDocument();

    expect(screen.getByText('something is wrong with phone')).toHaveClass(
      'ui pointing above prompt label',
    );

    const beneIdInput = getByTestId('bene-id').querySelector('input');
    const nameInput = getByTestId('name').querySelector('input');
    const phoneInput = getByTestId('phone').querySelector('input');
    const emailInput = getByTestId('email').querySelector('input');
    const addressInput = getByTestId('address1');

    expect(beneIdInput).toHaveAttribute('value', 'bar');
    expect(nameInput).toHaveAttribute('value', 'foo');
    expect(phoneInput).toHaveAttribute('value', '9876');
    expect(emailInput).toHaveAttribute('value', 'example@cashfree.com');

    await userEvent.type(beneIdInput, '1');
    await userEvent.type(nameInput, '1');
    await userEvent.type(phoneInput, '1');
    await userEvent.type(emailInput, '1');
    await userEvent.type(addressInput, '1');

    expect(onChange).toHaveBeenCalledTimes(5);
  });

  test('<StepTwo />', async () => {
    const onChange = jest.fn();

    const { getByTestId, queryByTestId } = render(
      <StepTwo
        benePurpose={BENE_PURPOSE.CORP_CC}
        formObj={{
          vpa: 'yes',
          bankAccount: 'xyz100',
          ifsc: 'YYYY',
          accountIBan: '86guw3',
        }}
        errorObj={{ vpa: 'something is wrong with vpa' }}
        onChange={onChange}
      />,
      {
        wrapper: CustomWrapper,
      },
    );

    expect(screen.queryByText('Account Number')).toBeInTheDocument();
    expect(screen.queryByText(/Payment Method/)).not.toBeInTheDocument();
    expect(screen.queryByText('Optional')).not.toBeInTheDocument();
    expect(screen.queryByText('IBAN must contain:')).not.toBeInTheDocument();

    expect(screen.getByText('something is wrong with vpa')).toHaveClass(
      'ui pointing above prompt label',
    );

    const vpaInput = getByTestId('vpa').querySelector('input');
    const bankAccountInput = getByTestId('bank-account').querySelector('input');
    const ifscInput = getByTestId('ifsc').querySelector('input');

    expect(queryByTestId('account-iban')).not.toBeInTheDocument();
    expect(bankAccountInput).toHaveAttribute('value', 'xyz100');
    expect(ifscInput).toHaveAttribute('value', 'YYYY');
    expect(vpaInput).toHaveAttribute('value', 'yes');

    await userEvent.type(vpaInput, 'foo@cashfree');
    await userEvent.type(bankAccountInput, '328');
    await userEvent.type(ifscInput, 'DDD');

    expect(onChange).toHaveBeenCalledTimes(18);
  });

  test('<StepThree />', async () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <StepThree
        selectedRow={{}}
        formObj={{
          panCard: 'foo',
          gstIn: 'bar',
          cin: 'baz',
          din: 'zip',
        }}
        errorObj={{ gstIn: 'something is wrong with gstIn' }}
        onChange={onChange}
      />,
      {
        wrapper: CustomWrapper,
      },
    );

    expect(screen.queryByText('KYC Details')).toBeInTheDocument();

    expect(screen.getByText('something is wrong with gstIn')).toHaveClass(
      'ui pointing above prompt label',
    );

    const panCardInput = getByTestId('pan-card').querySelector('input');
    const gstInInput = getByTestId('gstin').querySelector('input');
    const cinInput = getByTestId('cin').querySelector('input');
    const dinInput = getByTestId('din').querySelector('input');

    expect(panCardInput).not.toBeDisabled();
    expect(gstInInput).not.toBeDisabled();
    expect(cinInput).not.toBeDisabled();
    expect(dinInput).not.toBeDisabled();

    expect(panCardInput).toHaveAttribute('value', 'foo');
    expect(gstInInput).toHaveAttribute('value', 'bar');
    expect(cinInput).toHaveAttribute('value', 'baz');
    expect(dinInput).toHaveAttribute('value', 'zip');

    await userEvent.type(panCardInput, 'X');
    await userEvent.type(gstInInput, 'Y');
    await userEvent.type(cinInput, 'ZZ');

    expect(onChange).toHaveBeenCalledTimes(4);
  });

  test('<StepThree /> selectedRow', async () => {
    const onChange = jest.fn();

    const { getByTestId } = render(
      <StepThree
        selectedRow={{
          beneficiaryKycDocData: [
            { kycDocType: 'PAN', status: 'VERIFIED' },
            { kycDocType: 'GST', status: 'VERIFIED' },
            { kycDocType: 'CIN', status: 'VERIFIED' },
            { kycDocType: 'DIN', status: 'VERIFIED' },
          ],
        }}
        formObj={{
          panCard: 'foo',
          gstIn: 'bar',
          cin: 'baz',
          din: 'zip',
        }}
        errorObj={{ gstIn: 'something is wrong with gstIn' }}
        onChange={onChange}
      />,
      {
        wrapper: CustomWrapper,
      },
    );

    const panCardInput = getByTestId('pan-card').querySelector('input');
    const gstInInput = getByTestId('gstin').querySelector('input');
    const cinInput = getByTestId('cin').querySelector('input');
    const dinInput = getByTestId('din').querySelector('input');

    expect(panCardInput).toBeDisabled();
    expect(gstInInput).toBeDisabled();
    expect(cinInput).toBeDisabled();
    expect(dinInput).toBeDisabled();
  });
});
