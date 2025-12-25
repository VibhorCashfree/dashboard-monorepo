import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  Form,
  Space,
  Text,
  Grid,
  Column,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _size from 'lodash/size';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { getCreds, updateCreds } from 'services/fundSources';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { useBankAccountSelfServe } from '../providers';

// Images
import successTickImg from 'images/success-tick.svg';

// Components
import Icon from 'components/Icon';
import FormField from 'components/FormField';
import ModeRequestResponse from './ModeRequestResponse';

// Utils
import { requiredValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { getFieldsByModes } from '../utils';

// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { STATUS } from 'containers/AllFundSources/constants';
import { VERIFICATION_STAGE } from '../constants';

// Styled
import { StyledList } from '../styled';

// Types
import type { VerifyProdCredentialsProps } from '../types';

const VerifyProdCredentials: React.FC<VerifyProdCredentialsProps> = ({
  fundSource,
  actionType,
  setActionType,
  formObj,
  setFormObj,
  errorObj,
  setErrorObj,
  onDone,
}) => {
  const { accountInfo } = useAccount();
  const { wizardData } = useBankAccountSelfServe();

  const supportedModes: string[] = _get(fundSource, 'supportedModes', []);
  const allModes: string[] = supportedModes.includes('upi')
    ? ['IMPS', 'NEFT', 'UPI']
    : ['IMPS', 'NEFT'];

  const [verifiedModes, setVerifiedModes] = useState<string[]>(() =>
    fundSource.status === STATUS.PROD_CREDS_VERIFIED ? allModes : [],
  );

  const [verifiedResponse, setVerifiedResponse] = useState<any>();
  const [loadingType, setLoadingType] = useState<string | undefined>();

  useEffect(() => {
    (async function fetchData() {
      setLoadingType('FETCH_DATA');

      const response = await getCreds(fundSource.fundSourceId, {
        verificationStage: VERIFICATION_STAGE.PROD,
      });

      setLoadingType(undefined);

      if (!('error' in response)) {
        setFormObj((prev) => ({ ...prev, ...response.creds }));
      }
    })();
  }, []);

  useEffect(() => {
    const allModesVerified = verifiedModes.length === allModes.length;

    if (allModesVerified) {
      setFormObj((prev) => ({ ...prev, allModesVerified: true }));
    }
  }, [verifiedModes]);

  useEffect(() => {
    (async function handleActionType() {
      switch (actionType) {
        case ACTION_TYPE.SUBMIT:
          handleSubmit();
          setActionType(ACTION_TYPE.EMPTY);
          break;
      }
    })();
  }, [actionType]);

  const fields = getFieldsByModes(
    _get(wizardData, 'gateway.credentialSchema'),
    supportedModes,
  );

  const handleChange = (
    e: React.ChangeEvent | null,
    { name, type, value }: { name: string; type?: string; value: any },
  ) => {
    let error: string | undefined | null;

    if (type === 'file' && value) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const fileData = event.target?.result?.toString().split(',')[1];

        const field = fields.find((field) => field.property === name);

        const validExtension = _get(field, 'extensions', []).some(
          (extension: string) => value.name.includes(extension),
        );

        if (!validExtension) {
          error = 'Invalid format for the uploaded file.';
        }

        setErrorObj((prev) => ({ ...prev, [name]: error }));
        setFormObj((prev) => ({
          ...prev,
          [name]: fileData,
        }));
      };

      reader.readAsDataURL(value);

      return;
    }

    switch (name) {
      default:
        error = requiredValidation(value);
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onDone();
  };

  const handleVerify = (mode: string) => async () => {
    setLoadingType(`VERIFY_MODE_${mode}`);

    const body = {
      bankAccountCreds: {
        ...formObj,
      },
      transferModes: [mode],
      reportRequired: false,
      finalVerification: _size(verifiedModes) === _size(allModes) - 1,
    };

    const response = await updateCreds(
      fundSource.fundSourceId,
      { verificationStage: VERIFICATION_STAGE.PROD },
      body,
    );

    setLoadingType(undefined);

    if (!('error' in response)) {
      if (response.verificationData!.verified) {
        setVerifiedModes((prev) => prev.concat(mode));
      }

      setVerifiedResponse(response.verificationData);
    }
  };

  const disabled = !isFormValid(formObj, errorObj, []);

  return (
    <Grid columns="equal">
      <Column
        style={verifiedResponse ? { borderRight: '1px solid #E6E5E8' } : null}
      >
        <Text variant="h28">Verify Production Credentials</Text>
        <Text className="mt-1 mb-3" color="bodyLight">
          Credentials are available on {accountInfo.email}
        </Text>

        <Form>
          {fields.map((field) => (
            <FormField
              {...field}
              width={10}
              key={field.property}
              error={errorObj[field.property]}
              value={formObj[field.property] || ''}
              onChange={handleChange}
            />
          ))}

          <Form.Field width={10}>
            <Text className="mb-1" color="bodyLight">
              Verify Payment Modes
            </Text>

            {/* @ts-ignore */}
            <StyledList $showDivider={!!verifiedResponse}>
              {allModes.map((mode) => (
                <div key={mode}>
                  <>
                    <Space justifyContent="space-between">
                      <Text>{mode}</Text>
                      {verifiedModes.includes(mode) ? (
                        <Text color="success" style={{ fontStyle: 'italic' }}>
                          <Image inline src={successTickImg} /> Verified
                        </Text>
                      ) : (
                        <Button
                          data-event-name="Primary_Button_Verify_Production_Credentials"
                          as="a"
                          link
                          icon={
                            <Icon
                              name="circle-tick"
                              className="pointer"
                              verticalAlign="top"
                              fill={disabled && '#A5A6B0'}
                            />
                          }
                          iconPosition="left"
                          loading={loadingType === `VERIFY_MODE_${mode}`}
                          disabled={disabled}
                          onClick={handleVerify(mode)}
                        >
                          Verify
                        </Button>
                      )}
                    </Space>
                    {verifiedResponse &&
                      !verifiedResponse.verified &&
                      verifiedResponse.transferType === mode && (
                        <Text variant="b12" color="danger" className="mt-1">
                          Incorrect credentials. Refer to Comment in logs.
                        </Text>
                      )}
                  </>
                </div>
              ))}
            </StyledList>
          </Form.Field>
        </Form>
      </Column>
      <Column>
        <ModeRequestResponse data={verifiedResponse} />
      </Column>
    </Grid>
  );
};

export default withErrorBoundary(VerifyProdCredentials);
