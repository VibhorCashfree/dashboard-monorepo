import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import * as ValidationUtil from 'utils/formValidation';

// Services
import * as FundSourcesService from 'services/fundSources';

// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { MODAL_TYPE } from 'containers/AllFundSources/constants';

// Mocks
import { mockFundSources } from '__mocks__/common.mock';

// Components
import Wrapper from '__tests__/components/Wrapper';
import YesBusinessDetails from '../components/YesBusinessDetails';

const mockDigitsValidation = jest.fn();

beforeEach(() => {
  jest.mock('utils/formValidation');

  jest
    .spyOn(ValidationUtil, 'digitsValidation')
    .mockImplementation(mockDigitsValidation);

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
    .spyOn(FundSourcesService, 'getDetails')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('BankAccountSelfServe', () => {
  test('<YesBusinessDetails /> renders correctly', () => {
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const setModalType = jest.fn();
    const setModalData = jest.fn();
    const onDone = jest.fn();

    render(
      <Wrapper>
        <YesBusinessDetails
          fundSource={mockFundSources[0]}
          actionType={''}
          formObj={{}}
          errorObj={{}}
          modalData={null}
          setActionType={setActionType}
          setFormObj={setFormObj}
          setErrorObj={setErrorObj}
          setModalType={setModalType}
          setModalData={setModalData}
          onDone={onDone}
        />
      </Wrapper>,
    );

    expect(FundSourcesService.getDetails).toHaveBeenCalledWith(14576);

    expect(setFormObj).not.toHaveBeenCalled();

    expect(screen.getByText('Business & Personal Details')).toBeInTheDocument();

    expect(screen.getByText('Customer ID')).toBeInTheDocument();
    expect(
      screen.getByText(/Please verify the Customer ID/),
    ).toBeInTheDocument();
  });

  test('<YesBusinessDetails /> handleChange()', async () => {
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const setModalType = jest.fn();
    const setModalData = jest.fn();
    const onDone = jest.fn();

    const { getByTestId } = render(
      <Wrapper>
        <YesBusinessDetails
          fundSource={mockFundSources[0]}
          actionType={''}
          formObj={{}}
          errorObj={{}}
          modalData={null}
          setActionType={setActionType}
          setFormObj={setFormObj}
          setErrorObj={setErrorObj}
          setModalType={setModalType}
          setModalData={setModalData}
          onDone={onDone}
        />
      </Wrapper>,
    );

    const customerId = getByTestId('customer-id').querySelector('input');
    const accountNumberInput = getByTestId('account-number');

    await userEvent.type(customerId, '123456');

    expect(setFormObj).toHaveBeenCalledTimes(6);
    expect(setErrorObj).toHaveBeenCalledTimes(6);
    expect(mockDigitsValidation).toHaveBeenCalledTimes(6);

    expect(accountNumberInput).toBeDisabled();
  });

  test('<YesBusinessDetails /> formObj and errorObj prop', () => {
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const setModalType = jest.fn();
    const setModalData = jest.fn();
    const onDone = jest.fn();

    const { getByTestId } = render(
      <Wrapper>
        <YesBusinessDetails
          fundSource={mockFundSources[0]}
          actionType={''}
          formObj={{
            customerId: '349',
          }}
          errorObj={{
            customerId: 'something is wrong with customer Id',
          }}
          modalData={null}
          setActionType={setActionType}
          setFormObj={setFormObj}
          setErrorObj={setErrorObj}
          setModalType={setModalType}
          setModalData={setModalData}
          onDone={onDone}
        />
      </Wrapper>,
    );

    const customerIdInput = getByTestId('customer-id').querySelector('input');

    expect(customerIdInput.value).toBe('349');

    expect(screen.getByText('something is wrong with customer Id')).toHaveClass(
      'ui pointing above prompt label',
    );
  });

  test('<YesBusinessDetails /> actionType prop', async () => {
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const setModalType = jest.fn();
    const setModalData = jest.fn();
    const onDone = jest.fn();

    render(
      <Wrapper>
        <YesBusinessDetails
          fundSource={mockFundSources[0]}
          actionType={ACTION_TYPE.SUBMIT}
          formObj={{}}
          errorObj={{}}
          modalData={null}
          setActionType={setActionType}
          setFormObj={setFormObj}
          setErrorObj={setErrorObj}
          setModalType={setModalType}
          setModalData={setModalData}
          onDone={onDone}
        />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(FundSourcesService.connect).toHaveBeenCalledWith(14576, {});
      expect(setModalData).toHaveBeenCalledWith({
        type: 'positive',
        url: undefined,
      });
      expect(setModalType).toHaveBeenCalledWith(MODAL_TYPE.APPROVE_YESB);

      expect(setErrorObj).not.toHaveBeenCalled();
      expect(onDone).not.toHaveBeenCalled();
    });
  });
});
