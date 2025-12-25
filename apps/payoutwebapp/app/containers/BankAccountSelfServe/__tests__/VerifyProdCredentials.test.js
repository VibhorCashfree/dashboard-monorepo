import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Utils
import * as ValidationUtil from 'utils/formValidation';

// Services
import * as FundSourcesService from 'services/fundSources';

// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { VERIFICATION_STAGE } from '../constants';

// Mocks
import { mockFundSources } from '__mocks__/common.mock';

// Providers
import { BankAccountSelfServeContext } from '../providers';

// Components
import Wrapper from '__tests__/components/Wrapper';
import VerifyProdCredentials from '../components/VerifyProdCredentials';

const mockRequiredValidation = jest.fn();

beforeEach(() => {
  jest.mock('utils/formValidation');

  jest
    .spyOn(ValidationUtil, 'requiredValidation')
    .mockImplementation(mockRequiredValidation);

  jest.mock('services/fundSources');

  jest
    .spyOn(FundSourcesService, 'getCreds')
    .mockImplementation(() => Promise.resolve({}));

  jest.spyOn(FundSourcesService, 'updateCreds').mockImplementation(() =>
    Promise.resolve({
      verificationData: { verified: true },
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('BankAccountSelfServe', () => {
  test('<VerifyProdCredentials /> renders correctly', () => {
    const wizardData = {
      bankName: 'RBL_CONNECTED',
      fundSourceId: 14576,
      gateway: {
        credentialSchema:
          '{"type": "object", "allOf": [{"if": {"properties": {"modes": {"contains": {"const": "upi"}}}}, "then": {"required": ["deviceId", "vpa", "mobile", "profileId", "apiKey", "keyStorePath", "keyStorePassword", "keyStoreSignatureAlias"]}}, {"if": {"properties": {"modes": {"contains": {"const": "imps"}}}}, "then": {"required": ["bcid", "passcode", "debitAccountNo", "apiKey", "crpId", "crpUser", "aggrId", "aggrName", "urn", "userId", "keyStorePath", "keyStorePassword", "workflowReqd"]}}, {"if": {"properties": {"modes": {"contains": {"const": "neft"}}}}, "then": {"required": ["bcid", "passcode", "debitAccountNo", "apiKey", "crpId", "crpUser", "aggrId", "aggrName", "urn", "userId", "keyStorePath", "keyStorePassword", "workflowReqd"]}}], "properties": {"urn": {"type": "string", "minLength": 1}, "vpa": {"type": "string", "minLength": 1}, "bcid": {"type": "string", "minLength": 1}, "crpId": {"type": "string", "minLength": 1}, "modes": {"type": "array", "items": {"enum": ["neft", "upi", "imps"], "type": "string"}}, "aggrId": {"type": "string", "minLength": 1}, "apiKey": {"type": "string", "minLength": 1}, "mobile": {"type": "string", "minLength": 1}, "userId": {"type": "string", "minLength": 1}, "crpUser": {"type": "string", "minLength": 1}, "aggrName": {"type": "string", "minLength": 1}, "deviceId": {"type": "string", "minLength": 1}, "passcode": {"type": "string", "minLength": 1}, "profileId": {"type": "string", "minLength": 1}, "privateKey": {"type": "file", "extensions": [".pem", ".key"]}, "publicCert": {"type": "file", "extensions": [".cert", ".pem"]}, "keyStorePath": {"type": "string", "minLength": 1}, "workflowReqd": {"type": "string", "minLength": 1}, "debitAccountNo": {"type": "string", "minLength": 1}, "keyStorePassword": {"type": "string", "minLength": 1}, "keyStoreSignatureAlias": {"type": "string", "minLength": 1}}, "additionalProperties": false}',
      },
    };

    const setWizardData = jest.fn();
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const onDone = jest.fn();

    const { getAllByTestId } = render(
      <Wrapper>
        <BankAccountSelfServeContext.Provider
          value={{ wizardData, setWizardData }}
        >
          <VerifyProdCredentials
            actionType={''}
            formObj={{}}
            errorObj={{}}
            fundSource={mockFundSources[0]}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    expect(FundSourcesService.getCreds).toHaveBeenCalledWith(14576, {
      verificationStage: VERIFICATION_STAGE.PROD,
    });

    expect(
      screen.getByText('Verify Production Credentials'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/kisley.shirish\+cfmain@cashfree.com/),
    ).toBeInTheDocument();
    expect(screen.getByText('File type: .pem,.key')).toBeInTheDocument();
    expect(screen.getByText('File type: .cert,.pem')).toBeInTheDocument();
    expect(screen.getByText('urn')).toBeInTheDocument();
    expect(screen.getAllByText('Verify').length).toBe(2);
    expect(screen.queryByText('Verified')).not.toBeInTheDocument();
    expect(screen.getByText('publicCert')).toBeInTheDocument();

    expect(getAllByTestId('file-input').length).toBe(2);

    const inputs = screen.queryAllByRole('textbox');

    expect(inputs).toHaveLength(18);

    const names = [
      'urn',
      'vpa',
      'bcid',
      'crpId',
      'aggrId',
      'apiKey',
      'mobile',
      'userId',
      'crpUser',
      'aggrName',
      'deviceId',
      'passcode',
      'profileId',
      'keyStorePath',
      'workflowReqd',
      'debitAccountNo',
      'keyStorePassword',
      'keyStoreSignatureAlias',
    ];

    for (let i = 0; i < names.length; i++) {
      expect(inputs[i]).toHaveAttribute('name', names[i]);
    }
  });

  test('<VerifyProdCredentials /> handleChange()', async () => {
    const wizardData = {
      bankName: 'RBL_CONNECTED',
      fundSourceId: 14576,
      gateway: {
        credentialSchema:
          '{"type": "object", "allOf": [{"if": {"properties": {"modes": {"contains": {"const": "upi"}}}}, "then": {"required": ["deviceId", "vpa", "mobile", "profileId", "apiKey", "keyStorePath", "keyStorePassword", "keyStoreSignatureAlias"]}}, {"if": {"properties": {"modes": {"contains": {"const": "imps"}}}}, "then": {"required": ["bcid", "passcode", "debitAccountNo", "apiKey", "crpId", "crpUser", "aggrId", "aggrName", "urn", "userId", "keyStorePath", "keyStorePassword", "workflowReqd"]}}, {"if": {"properties": {"modes": {"contains": {"const": "neft"}}}}, "then": {"required": ["bcid", "passcode", "debitAccountNo", "apiKey", "crpId", "crpUser", "aggrId", "aggrName", "urn", "userId", "keyStorePath", "keyStorePassword", "workflowReqd"]}}], "properties": {"urn": {"type": "string", "minLength": 1}, "vpa": {"type": "string", "minLength": 1}, "bcid": {"type": "string", "minLength": 1}, "crpId": {"type": "string", "minLength": 1}, "modes": {"type": "array", "items": {"enum": ["neft", "upi", "imps"], "type": "string"}}, "aggrId": {"type": "string", "minLength": 1}, "apiKey": {"type": "string", "minLength": 1}, "mobile": {"type": "string", "minLength": 1}, "userId": {"type": "string", "minLength": 1}, "crpUser": {"type": "string", "minLength": 1}, "aggrName": {"type": "string", "minLength": 1}, "deviceId": {"type": "string", "minLength": 1}, "passcode": {"type": "string", "minLength": 1}, "profileId": {"type": "string", "minLength": 1}, "privateKey": {"type": "file", "extensions": [".pem", ".key"]}, "publicCert": {"type": "file", "extensions": [".cert", ".pem"]}, "keyStorePath": {"type": "string", "minLength": 1}, "workflowReqd": {"type": "string", "minLength": 1}, "debitAccountNo": {"type": "string", "minLength": 1}, "keyStorePassword": {"type": "string", "minLength": 1}, "keyStoreSignatureAlias": {"type": "string", "minLength": 1}}, "additionalProperties": false}',
      },
    };

    const setWizardData = jest.fn();
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const onDone = jest.fn();

    render(
      <Wrapper>
        <BankAccountSelfServeContext.Provider
          value={{ wizardData, setWizardData }}
        >
          <VerifyProdCredentials
            actionType={''}
            formObj={{}}
            errorObj={{}}
            fundSource={mockFundSources[0]}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    const inputs = screen.queryAllByRole('textbox');

    await userEvent.type(inputs[2], 'foobar');

    expect(setFormObj).toHaveBeenCalledTimes(7);
    expect(setErrorObj).toHaveBeenCalledTimes(6);
    expect(mockRequiredValidation).toHaveBeenCalledTimes(6);
  });

  test('<VerifyProdCredentials /> formObj and errorObj prop', () => {
    const wizardData = {
      bankName: 'RBL_CONNECTED',
      fundSourceId: 14576,
      gateway: {
        credentialSchema:
          '{"type": "object", "allOf": [{"if": {"properties": {"modes": {"contains": {"const": "upi"}}}}, "then": {"required": ["deviceId", "vpa", "mobile", "profileId", "apiKey", "keyStorePath", "keyStorePassword", "keyStoreSignatureAlias"]}}, {"if": {"properties": {"modes": {"contains": {"const": "imps"}}}}, "then": {"required": ["bcid", "passcode", "debitAccountNo", "apiKey", "crpId", "crpUser", "aggrId", "aggrName", "urn", "userId", "keyStorePath", "keyStorePassword", "workflowReqd"]}}, {"if": {"properties": {"modes": {"contains": {"const": "neft"}}}}, "then": {"required": ["bcid", "passcode", "debitAccountNo", "apiKey", "crpId", "crpUser", "aggrId", "aggrName", "urn", "userId", "keyStorePath", "keyStorePassword", "workflowReqd"]}}], "properties": {"urn": {"type": "string", "minLength": 1}, "vpa": {"type": "string", "minLength": 1}, "bcid": {"type": "string", "minLength": 1}, "crpId": {"type": "string", "minLength": 1}, "modes": {"type": "array", "items": {"enum": ["neft", "upi", "imps"], "type": "string"}}, "aggrId": {"type": "string", "minLength": 1}, "apiKey": {"type": "string", "minLength": 1}, "mobile": {"type": "string", "minLength": 1}, "userId": {"type": "string", "minLength": 1}, "crpUser": {"type": "string", "minLength": 1}, "aggrName": {"type": "string", "minLength": 1}, "deviceId": {"type": "string", "minLength": 1}, "passcode": {"type": "string", "minLength": 1}, "profileId": {"type": "string", "minLength": 1}, "privateKey": {"type": "file", "extensions": [".pem", ".key"]}, "publicCert": {"type": "file", "extensions": [".cert", ".pem"]}, "keyStorePath": {"type": "string", "minLength": 1}, "workflowReqd": {"type": "string", "minLength": 1}, "debitAccountNo": {"type": "string", "minLength": 1}, "keyStorePassword": {"type": "string", "minLength": 1}, "keyStoreSignatureAlias": {"type": "string", "minLength": 1}}, "additionalProperties": false}',
      },
    };

    const setWizardData = jest.fn();
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const onDone = jest.fn();

    render(
      <Wrapper>
        <BankAccountSelfServeContext.Provider
          value={{ wizardData, setWizardData }}
        >
          <VerifyProdCredentials
            actionType={''}
            formObj={{
              urn: 'Well349',
            }}
            errorObj={{
              deviceId: 'something is wrong with Device ID',
              passcode: 'something is wrong with Passcode',
            }}
            fundSource={mockFundSources[0]}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    const inputs = screen.queryAllByRole('textbox');

    expect(inputs[0].value).toBe('Well349');

    expect(screen.getByText('something is wrong with Device ID')).toHaveClass(
      'ui pointing above prompt label',
    );

    expect(screen.getByText('something is wrong with Passcode')).toHaveClass(
      'ui pointing above prompt label',
    );
  });

  test('<VerifyProdCredentials /> actionType prop', async () => {
    const wizardData = {
      bankName: 'RBL_CONNECTED',
      fundSourceId: 14576,
      gateway: {
        credentialSchema:
          '{"type": "object", "allOf": [{"if": {"properties": {"modes": {"contains": {"const": "upi"}}}}, "then": {"required": ["deviceId", "vpa", "mobile", "profileId", "apiKey", "keyStorePath", "keyStorePassword", "keyStoreSignatureAlias"]}}, {"if": {"properties": {"modes": {"contains": {"const": "imps"}}}}, "then": {"required": ["bcid", "passcode", "debitAccountNo", "apiKey", "crpId", "crpUser", "aggrId", "aggrName", "urn", "userId", "keyStorePath", "keyStorePassword", "workflowReqd"]}}, {"if": {"properties": {"modes": {"contains": {"const": "neft"}}}}, "then": {"required": ["bcid", "passcode", "debitAccountNo", "apiKey", "crpId", "crpUser", "aggrId", "aggrName", "urn", "userId", "keyStorePath", "keyStorePassword", "workflowReqd"]}}], "properties": {"urn": {"type": "string", "minLength": 1}, "vpa": {"type": "string", "minLength": 1}, "bcid": {"type": "string", "minLength": 1}, "crpId": {"type": "string", "minLength": 1}, "modes": {"type": "array", "items": {"enum": ["neft", "upi", "imps"], "type": "string"}}, "aggrId": {"type": "string", "minLength": 1}, "apiKey": {"type": "string", "minLength": 1}, "mobile": {"type": "string", "minLength": 1}, "userId": {"type": "string", "minLength": 1}, "crpUser": {"type": "string", "minLength": 1}, "aggrName": {"type": "string", "minLength": 1}, "deviceId": {"type": "string", "minLength": 1}, "passcode": {"type": "string", "minLength": 1}, "profileId": {"type": "string", "minLength": 1}, "privateKey": {"type": "file", "extensions": [".pem", ".key"]}, "publicCert": {"type": "file", "extensions": [".cert", ".pem"]}, "keyStorePath": {"type": "string", "minLength": 1}, "workflowReqd": {"type": "string", "minLength": 1}, "debitAccountNo": {"type": "string", "minLength": 1}, "keyStorePassword": {"type": "string", "minLength": 1}, "keyStoreSignatureAlias": {"type": "string", "minLength": 1}}, "additionalProperties": false}',
      },
    };

    const setWizardData = jest.fn();
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const onDone = jest.fn();

    render(
      <Wrapper>
        <BankAccountSelfServeContext.Provider
          value={{ wizardData, setWizardData }}
        >
          <VerifyProdCredentials
            actionType={ACTION_TYPE.SUBMIT}
            formObj={{}}
            errorObj={{}}
            fundSource={mockFundSources[0]}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    expect(onDone).toHaveBeenCalledWith();
  });

  test('<VerifyProdCredentials /> verify buttons', async () => {
    const wizardData = {
      bankName: 'RBL_CONNECTED',
      fundSourceId: 14576,
      gateway: {
        credentialSchema:
          '{"type": "object", "allOf": [{"if": {"properties": {"modes": {"contains": {"const": "upi"}}}}, "then": {"required": ["deviceId", "vpa", "mobile", "profileId", "apiKey", "keyStorePath", "keyStorePassword", "keyStoreSignatureAlias"]}}, {"if": {"properties": {"modes": {"contains": {"const": "imps"}}}}, "then": {"required": ["bcid", "passcode", "debitAccountNo", "apiKey", "crpId", "crpUser", "aggrId", "aggrName", "urn", "userId", "keyStorePath", "keyStorePassword", "workflowReqd"]}}, {"if": {"properties": {"modes": {"contains": {"const": "neft"}}}}, "then": {"required": ["bcid", "passcode", "debitAccountNo", "apiKey", "crpId", "crpUser", "aggrId", "aggrName", "urn", "userId", "keyStorePath", "keyStorePassword", "workflowReqd"]}}], "properties": {"urn": {"type": "string", "minLength": 1}, "vpa": {"type": "string", "minLength": 1}, "bcid": {"type": "string", "minLength": 1}, "crpId": {"type": "string", "minLength": 1}, "modes": {"type": "array", "items": {"enum": ["neft", "upi", "imps"], "type": "string"}}, "aggrId": {"type": "string", "minLength": 1}, "apiKey": {"type": "string", "minLength": 1}, "mobile": {"type": "string", "minLength": 1}, "userId": {"type": "string", "minLength": 1}, "crpUser": {"type": "string", "minLength": 1}, "aggrName": {"type": "string", "minLength": 1}, "deviceId": {"type": "string", "minLength": 1}, "passcode": {"type": "string", "minLength": 1}, "profileId": {"type": "string", "minLength": 1}, "privateKey": {"type": "file", "extensions": [".pem", ".key"]}, "publicCert": {"type": "file", "extensions": [".cert", ".pem"]}, "keyStorePath": {"type": "string", "minLength": 1}, "workflowReqd": {"type": "string", "minLength": 1}, "debitAccountNo": {"type": "string", "minLength": 1}, "keyStorePassword": {"type": "string", "minLength": 1}, "keyStoreSignatureAlias": {"type": "string", "minLength": 1}}, "additionalProperties": false}',
      },
    };

    const setWizardData = jest.fn();
    const setActionType = jest.fn();
    const setFormObj = jest.fn();
    const setErrorObj = jest.fn();
    const onDone = jest.fn();

    render(
      <Wrapper>
        <BankAccountSelfServeContext.Provider
          value={{ wizardData, setWizardData }}
        >
          <VerifyProdCredentials
            actionType={ACTION_TYPE.SUBMIT}
            formObj={{}}
            errorObj={{}}
            fundSource={mockFundSources[0]}
            setActionType={setActionType}
            setFormObj={setFormObj}
            setErrorObj={setErrorObj}
            onDone={onDone}
          />
        </BankAccountSelfServeContext.Provider>
      </Wrapper>,
    );

    const [impsVerify, neftVerify] = screen.getAllByText('Verify');

    expect(screen.queryByText('Verified')).not.toBeInTheDocument();

    fireEvent.click(impsVerify);

    await waitFor(() => {
      expect(screen.queryByText('Verified')).toBeInTheDocument();
    });

    expect(FundSourcesService.updateCreds).toHaveBeenCalledWith(
      14576,
      {
        verificationStage: VERIFICATION_STAGE.PROD,
      },
      {
        bankAccountCreds: {},
        finalVerification: false,
        reportRequired: false,
        transferModes: ['IMPS'],
      },
    );

    fireEvent.click(neftVerify);

    await waitFor(() => {
      expect(screen.queryAllByText('Verified').length).toBe(2);
    });

    expect(FundSourcesService.updateCreds).toHaveBeenLastCalledWith(
      14576,
      {
        verificationStage: VERIFICATION_STAGE.PROD,
      },
      {
        bankAccountCreds: {},
        finalVerification: true,
        reportRequired: false,
        transferModes: ['NEFT'],
      },
    );
  });
});
