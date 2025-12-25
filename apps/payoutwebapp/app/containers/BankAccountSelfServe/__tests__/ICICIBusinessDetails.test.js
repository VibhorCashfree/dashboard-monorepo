import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import * as ValidationUtil from 'utils/formValidation';

// Services
import * as FundSourcesService from 'services/fundSources';

// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { MODAL_TYPE, STATUS } from 'containers/AllFundSources/constants';

// Mocks
import { mockFundSources } from '__mocks__/common.mock';

// Components
import Wrapper from '__tests__/components/Wrapper';
import ICICIBusinessDetails from '../components/ICICIBusinessDetails';

const mockRequiredValidation = jest.fn();

beforeEach(() => {
  jest.mock('utils/formValidation');

  jest
    .spyOn(ValidationUtil, 'requiredValidation')
    .mockImplementation(mockRequiredValidation);

  jest.mock('services/fundSources');

  jest.spyOn(FundSourcesService, 'connect').mockImplementation(() =>
    Promise.resolve({
      status: STATUS.AUTHORIZATION_PENDING,
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
  test('<ICICIBusinessDetails /> renders correctly', () => {
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const setModalType = jest.fn();

    render(
      <Wrapper>
        <ICICIBusinessDetails
          fundSource={mockFundSources[0]}
          actionType={''}
          formObj={{}}
          errorObj={{}}
          modalData={null}
          setActionType={setActionType}
          setFormObj={setFormObj}
          setErrorObj={setErrorObj}
          setModalType={setModalType}
        />
      </Wrapper>,
    );

    expect(FundSourcesService.getDetails).toHaveBeenCalledWith(14576);

    expect(setFormObj).not.toHaveBeenCalled();

    expect(screen.getByText('Business & Personal Details')).toBeInTheDocument();

    expect(screen.getByText('ICICI Corporate Banking')).toHaveAttribute(
      'href',
      'https://www.icicibank.com/corporate/safe-online-CIBbanking.page',
    );
    expect(screen.getByText('Corp ID')).toBeInTheDocument();
    expect(screen.getByText('User ID')).toBeInTheDocument();
    expect(screen.getByText('Optional')).toBeInTheDocument();
    expect(screen.getByText('Account Number')).toBeInTheDocument();
  });

  test('<ICICIBusinessDetails /> handleChange()', async () => {
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const setModalType = jest.fn();

    const { getByTestId } = render(
      <Wrapper>
        <ICICIBusinessDetails
          fundSource={mockFundSources[0]}
          actionType={''}
          formObj={{}}
          errorObj={{}}
          modalData={null}
          setActionType={setActionType}
          setFormObj={setFormObj}
          setErrorObj={setErrorObj}
          setModalType={setModalType}
        />
      </Wrapper>,
    );

    const corpIdInput = getByTestId('corp-id').querySelector('input');
    const userIdInput = getByTestId('user-id').querySelector('input');
    const aliasInput = getByTestId('alias').querySelector('input');
    const accountNumberInput = getByTestId('account-number');

    await userEvent.type(corpIdInput, 'foobar');

    expect(setFormObj).toHaveBeenCalledTimes(6);
    expect(setErrorObj).toHaveBeenCalledTimes(6);
    expect(mockRequiredValidation).toHaveBeenCalledTimes(6);

    await userEvent.type(userIdInput, 'john');
    expect(setFormObj).toHaveBeenCalledTimes(4 + 6);
    expect(setErrorObj).toHaveBeenCalledTimes(4 + 6);
    expect(mockRequiredValidation).toHaveBeenCalledTimes(10);

    await userEvent.type(aliasInput, 'yyy');
    expect(setFormObj).toHaveBeenCalledTimes(4 + 6 + 3);
    expect(setErrorObj).toHaveBeenCalledTimes(4 + 6 + 3);
    expect(mockRequiredValidation).toHaveBeenCalledTimes(10);

    expect(accountNumberInput).toBeDisabled();
  });

  test('<ICICIBusinessDetails /> formObj and errorObj prop', () => {
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const setModalType = jest.fn();

    const { getByTestId } = render(
      <Wrapper>
        <ICICIBusinessDetails
          fundSource={mockFundSources[0]}
          actionType={''}
          formObj={{
            corpId: 'Well349',
            alias: 'Yo Yo Singh',
          }}
          errorObj={{
            bankUserId: 'something is wrong with bank user Id',
          }}
          modalData={null}
          setActionType={setActionType}
          setFormObj={setFormObj}
          setErrorObj={setErrorObj}
          setModalType={setModalType}
        />
      </Wrapper>,
    );

    const corpIdInput = getByTestId('corp-id').querySelector('input');
    const aliasInput = getByTestId('alias').querySelector('input');

    expect(corpIdInput.value).toBe('Well349');
    expect(aliasInput.value).toBe('Yo Yo Singh');

    expect(
      screen.getByText('something is wrong with bank user Id'),
    ).toHaveClass('ui pointing above prompt label');
  });

  test('<ICICIBusinessDetails /> actionType prop', async () => {
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const setModalType = jest.fn();

    render(
      <Wrapper>
        <ICICIBusinessDetails
          fundSource={mockFundSources[0]}
          actionType={ACTION_TYPE.SUBMIT}
          formObj={{}}
          errorObj={{}}
          modalData={null}
          setActionType={setActionType}
          setFormObj={setFormObj}
          setErrorObj={setErrorObj}
          setModalType={setModalType}
        />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(FundSourcesService.connect).toHaveBeenCalledWith(14576, {});
      expect(setModalType).toHaveBeenCalledWith(MODAL_TYPE.APPROVE_ICIC);
    });
  });
});
