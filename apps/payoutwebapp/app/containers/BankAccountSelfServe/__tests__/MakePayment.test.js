import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// Utils
import * as ValidationUtil from 'utils/formValidation';

// Services
import * as FundSourcesService from 'services/fundSources';

// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';
import {
  MODAL_TYPE,
  INVOICING_TYPE,
} from 'containers/AllFundSources/constants';

// Mocks
import { mockFundSources } from '__mocks__/common.mock';

// Components
import Wrapper from '__tests__/components/Wrapper';
import MakePayment from '../components/MakePayment';

const mockRequiredValidation = jest.fn();

beforeEach(() => {
  jest.mock('utils/formValidation');

  jest
    .spyOn(ValidationUtil, 'requiredValidation')
    .mockImplementation(mockRequiredValidation);

  jest.mock('services/fundSources');

  jest.spyOn(FundSourcesService, 'connect').mockImplementation(() =>
    Promise.resolve({
      error: {
        status: 'ERROR',
        title: 'This is title',
        message: 'IP_NOT_WHITELISTED',
      },
    }),
  );

  jest
    .spyOn(FundSourcesService, 'getBalance')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'selectInvoicingModel')
    .mockImplementation(() => Promise.resolve({}));

  jest
    .spyOn(FundSourcesService, 'getDetails')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('BankAccountSelfServe', () => {
  test('<MakePayment /> renders correctly', () => {
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const setModalType = jest.fn();

    render(
      <Wrapper>
        <MakePayment
          fundSource={mockFundSources[0]}
          actionType={''}
          formObj={{}}
          setActionType={setActionType}
          setFormObj={setFormObj}
          setErrorObj={setErrorObj}
          setModalType={setModalType}
        />
      </Wrapper>,
    );

    expect(FundSourcesService.getDetails).not.toHaveBeenCalledWith(14576);

    expect(setErrorObj).not.toHaveBeenCalled();

    expect(
      screen.getByText('Setup Preference & Make Payment'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Service charge will be deducted every 7 days.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('From Bank Account (ICICI-124)'),
    ).toBeInTheDocument();
    expect(screen.getAllByText('From Cashfree Wallet').length).toBe(1);
    expect(
      screen.getByText(
        'Service Charges For transfers through ICICI-124 should be withdrawn',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Wallet is disabled for your account.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/You will be able to start making payouts using/),
    ).toBeInTheDocument();
    // expect(screen.getByText('(+18% tax)')).toBeInTheDocument();
  });

  test('<MakePayment /> handleChange()', async () => {
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const setModalType = jest.fn();

    render(
      <Wrapper>
        <MakePayment
          fundSource={mockFundSources[0]}
          actionType={''}
          formObj={{}}
          setActionType={setActionType}
          setFormObj={setFormObj}
          setErrorObj={setErrorObj}
          setModalType={setModalType}
        />
      </Wrapper>,
    );

    const radios = screen.getAllByRole('radio');

    expect(radios).toHaveLength(2);

    expect(radios[0]).toHaveAttribute('value', 'DEBIT_CHARGES_FROM_WALLET');
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toHaveAttribute(
      'value',
      'DEBIT_CHARGES_FROM_BANK_ACCOUNT',
    );
    expect(radios[1]).not.toBeChecked();

    fireEvent.click(radios[1]);

    expect(setFormObj).toHaveBeenCalledTimes(1);
    expect(setErrorObj).toHaveBeenCalledTimes(1);
    expect(mockRequiredValidation).toHaveBeenCalledTimes(1);
  });

  test('<MakePayment /> formObj prop', () => {
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const setModalType = jest.fn();

    render(
      <Wrapper>
        <MakePayment
          fundSource={mockFundSources[0]}
          actionType={''}
          formObj={{
            preference: INVOICING_TYPE.BANK_ACCOUNT,
          }}
          setActionType={setActionType}
          setFormObj={setFormObj}
          setErrorObj={setErrorObj}
          setModalType={setModalType}
        />
      </Wrapper>,
    );

    const radios = screen.getAllByRole('radio');

    expect(radios).toHaveLength(2);

    expect(radios[0]).toHaveAttribute('value', 'DEBIT_CHARGES_FROM_WALLET');
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toHaveAttribute(
      'value',
      'DEBIT_CHARGES_FROM_BANK_ACCOUNT',
    );
    expect(radios[1]).toBeChecked();
  });

  test('<MakePayment /> actionType prop', async () => {
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const setModalType = jest.fn();

    render(
      <Wrapper>
        <MakePayment
          fundSource={mockFundSources[0]}
          actionType={ACTION_TYPE.SUBMIT}
          formObj={{}}
          setActionType={setActionType}
          setFormObj={setFormObj}
          setErrorObj={setErrorObj}
          setModalType={setModalType}
        />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(FundSourcesService.selectInvoicingModel).toHaveBeenCalledWith(
        14576,
        {},
      );
      expect(setModalType).toHaveBeenCalledWith(MODAL_TYPE.SUCCESS);
    });
  });
});
