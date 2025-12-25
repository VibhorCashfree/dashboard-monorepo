import React, { useEffect } from 'react';
import { Form, Label, Text } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { connect, getDetails } from 'services/fundSources';

// Utils
import { requiredValidation } from 'utils/formValidation';

// Constants
import { ICICI_LOGIN } from 'constants/urls';
import { ACTION_TYPE } from 'components/FormWizard/constants';
import {
  errorByMessage,
  MODAL_TYPE,
  STATUS,
} from 'containers/AllFundSources/constants';

// Types
import type { ICICIBusinessDetailsProps } from '../types';

const ICICIBusinessDetails: React.FC<ICICIBusinessDetailsProps> = ({
  fundSource,
  actionType,
  setActionType,
  formObj,
  setFormObj,
  errorObj,
  setErrorObj,
  setModalType,
}) => {
  useEffect(() => {
    if (!fundSource.fundSourceId) {
      return;
    }

    (async function fetchData() {
      const response = await getDetails(fundSource.fundSourceId);

      if (response.connectDetails) {
        setFormObj(response.connectDetails);
      }
    })();
  }, [fundSource.fundSourceId, setFormObj]);

  useEffect(() => {
    (async function handleActionType() {
      switch (actionType) {
        case ACTION_TYPE.SUBMIT:
          await handleSubmit();
          setActionType(ACTION_TYPE.EMPTY);
          break;
      }
    })();
  }, [actionType, setActionType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      case 'bankUserId':
      case 'corpId':
        error = requiredValidation(value);
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const response = await connect(fundSource.fundSourceId, formObj);

    if ('error' in response) {
      const status: string = _get(response, 'error.status', '');

      if (status === 'ERROR') {
        const title: string = _get(response, 'error.title', '');

        if (title === 'REQUEST_INVALID') {
          const message: string = _get(response, 'error.message', '');
          const error = _get(errorByMessage, [message]);

          if (error) {
            setErrorObj((prev) => ({
              ...prev,
              [error.key]: error.text,
            }));
          } else {
            // toast.error(message);
          }
        }
      }
    } else if (response.status === STATUS.AUTHORIZATION_PENDING) {
      setModalType(MODAL_TYPE.APPROVE_ICIC);
    }
  };

  return (
    <>
      <Text variant="h28">Business & Personal Details</Text>
      <Text className="mt-2 mb-4" color="bodyLight">
        Provide essential details about yourself and your business to ensure a
        smooth payment experience.
      </Text>

      <Form>
        <Text variant="p14" color="bodyLight" className="mb-3">
          Specify your{' '}
          <a href={ICICI_LOGIN} target="_blank" rel="noopener noreferrer">
            ICICI Corporate Banking
          </a>{' '}
          account details below to proceed further.
        </Text>

        <Form.Group>
          <Form.Input
            width={5}
            data-testid="corp-id"
            name="corpId"
            label="Corp ID"
            error={errorObj.corpId}
            value={formObj.corpId}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            width={5}
            data-testid="user-id"
            name="bankUserId"
            label="User ID"
            error={errorObj.bankUserId}
            value={formObj.bankUserId}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            width={5}
            data-testid="alias"
            name="alias"
            label={
              <Text color="bodyLight" className="mb-1">
                Alias <Label size="mini">Optional</Label>
              </Text>
            }
            error={errorObj.alias}
            value={formObj.alias}
            onChange={handleChange}
          />
        </Form.Group>
        <Text variant="b12" color="bodyLight" className="mt-1 mb-3">
          Mandatory, if already created for your ICICI bank account.
        </Text>

        <Form.Group>
          <Form.Field>
            <label>Account Number</label>
            <input
              data-testid="account-number"
              disabled
              value={fundSource.bankAccount}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  );
};

export default withErrorBoundary(ICICIBusinessDetails);
