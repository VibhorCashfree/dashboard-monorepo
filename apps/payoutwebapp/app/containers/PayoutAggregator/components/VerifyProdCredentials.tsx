import React, { useEffect } from 'react';
import { Image, Button, Space, Form, Text } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { getCreds, updateCreds } from 'services/fundSources';

// Components
import FormField from 'components/FormField';

// Utils
import { requiredValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import getAlertIcon from 'utils/getAlertIcon';
import { getFields } from '../utils';

// Constants
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { MODAL_TYPE } from 'containers/AllFundSources/constants';
import { VERIFICATION_STAGE } from 'containers/BankAccountSelfServe/constants';

// Providers
import { usePayoutAggregator } from '../providers';

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
  setModalType,
}) => {
  const { wizardData } = usePayoutAggregator();

  useEffect(() => {
    (async function fetchData() {
      if (!fundSource.fundSourceId) {
        return;
      }

      const queryObj = {
        verificationStage: VERIFICATION_STAGE.PROD,
      };

      const response = await getCreds(fundSource.fundSourceId, queryObj);

      if (!('error' in response)) {
        setFormObj((prev) => ({ ...prev, ...response.creds }));
      }
    })();
  }, [fundSource]);

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

  const fields = getFields(_get(wizardData, 'gateway.credentialSchema'));

  const handleChange = (
    e: React.ChangeEvent | null,
    { name, value }: { name: string; value: any },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      default:
        error = requiredValidation(value);
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setModalType(MODAL_TYPE.AGGREGATOR_SUCCESS);
  };

  const handleVerify = async () => {
    const body = {
      bankAccountCreds: {
        ...formObj,
      },
      transferModes: ['IMPS'],
      reportRequired: false,
      finalVerification: true,
    };

    const response = await updateCreds(
      fundSource.fundSourceId,
      { verificationStage: VERIFICATION_STAGE.PROD },
      body,
    );

    if (!('error' in response)) {
      setFormObj((prev) => ({ ...prev, allModesVerified: true }));
    }
  };

  const disabled =
    !isFormValid(formObj, errorObj, []) || formObj.allModesVerified;

  return (
    <>
      <Text variant="h28">
        Verify Razorpay&apos;s Production API Credentials
      </Text>
      <Text className="mt-1 mb-3" color="bodyLight">
        Enter production api credentials below.
      </Text>

      <Form>
        {fields.map((field) => (
          <FormField
            {...field}
            width={6}
            key={field.property}
            error={errorObj[field.property]}
            value={
              field.property === 'account_number'
                ? fundSource.bankAccount
                : formObj[field.property] || ''
            }
            readOnly={field.property === 'account_number'}
            onChange={handleChange}
          />
        ))}

        <Space gap={2} alignItems="center">
          <Button primary disabled={disabled} onClick={handleVerify}>
            Verify Credentials
          </Button>

          {formObj.allModesVerified && (
            <Text color="success">
              <Image
                inline
                className="ml-1"
                src={getAlertIcon('success', 'sm')}
              />{' '}
              Credentials Verified Successfully.
            </Text>
          )}
        </Space>
      </Form>
    </>
  );
};

export default withErrorBoundary(VerifyProdCredentials);
