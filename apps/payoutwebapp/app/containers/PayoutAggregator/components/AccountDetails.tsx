import React, { useEffect } from 'react';
import {
  Form,
  Text,
  Popup,
  Dropdown,
  RadioGroup,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import Icon from 'components/Icon';

// Services
import { create } from 'services/fundSources';

// Providers
import { usePayoutAggregator } from '../providers';

// Constants
import {
  FS_DISPLAY_TYPE,
  AGGREGATOR,
  LABEL_BY_AGGREGATOR,
} from 'constants/fundSources';
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { errorByMessage } from 'containers/AllFundSources/constants';

// Utils
import {
  fundSourceNameValidation,
  accountNumberValidation,
} from 'utils/formValidation';

// Styled
import { Divider } from 'styled/common';

// Types
import type { AccountDetailsProps } from '../types';

const AccountDetails: React.FC<AccountDetailsProps> = ({
  actionType,
  setActionType,
  formObj,
  errorObj,
  setFormObj,
  setErrorObj,
  onDone,
}) => {
  const { setWizardData } = usePayoutAggregator();

  useEffect(() => {
    setTimeout(() => {
      setFormObj((prev: AnyObject) => ({
        ...prev,
        aggregator: AGGREGATOR.RAZORPAY,
      }));
    }, 0);
  }, []);

  useEffect(() => {
    (async function handleActionType() {
      switch (actionType) {
        case ACTION_TYPE.SUBMIT:
          await handleSubmit();
          setActionType(ACTION_TYPE.EMPTY);
          break;
      }
    })();
  }, [actionType]);

  useEffect(() => {
    setWizardData((prev) => ({ ...prev, bankName: formObj.aggregator }));
  }, [formObj.aggregator]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      case 'displayName':
        error = fundSourceNameValidation(value);
        break;

      case 'bankAccount':
        error = accountNumberValidation(value);
        break;
    }

    setErrorObj((prev: AnyObject) => ({ ...prev, [name]: error }));
    setFormObj((prev: AnyObject) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const body = {
      fsDisplayType: FS_DISPLAY_TYPE.BANK_ACCOUNT,
      displayName: formObj.displayName,
      bank: {
        aggregator: formObj.aggregator,
        bankName: formObj.aggregator,
        bankAccount: formObj.bankAccount,
      },
    };

    const response = await create(body);

    const status: string = _get(response, 'error.status', '');

    if (status === 'ERROR') {
      const title: string = _get(response, 'error.title', '');

      if (title === 'REQUEST_INVALID') {
        const message: string = _get(response, 'error.message', '');
        const error = _get(errorByMessage, [message]);

        if (error) {
          setErrorObj((prev: AnyObject) => ({
            ...prev,
            [error.key]: error.text,
          }));
        }
      }
    } else {
      setWizardData((prev) => ({
        ...prev,
        fundSourceId: (response as { fundSourceId: number }).fundSourceId,
      }));

      onDone();
    }
  };

  const accountTypeOptions = [
    {
      label: 'Bank Account (Should have API banking enabled on Razorpay)',
      value: 'RAZORPAY_BANK_ACCOUNT',
    },
    {
      label: 'Razorpay Wallet',
      value: 'RAZORPAY_WALLET',
    },
  ].map((option) => ({
    ...option,
    name: 'accountType',
    checked: formObj.accountType === option.value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e, { name: 'accountType', value: option.value });
    },
  }));

  return (
    <>
      <Text variant="h28">Account Details</Text>
      <Text className="mt-1 mb-3" color="bodyLight">
        Provide account/ wallet details you wish to add as an aggregator.
      </Text>

      <Form className="mt-3">
        <Form.Group>
          <Form.Input
            width={5}
            data-testid="display-name"
            name="displayName"
            label={
              <Text color="bodyLight" className="mb-1">
                Reference Name
                <Popup
                  position="right center"
                  content="Unique name for the fund source."
                  trigger={
                    <span>
                      <Icon
                        name="info"
                        className="pointer ml-1"
                        verticalAlign="top"
                      />
                    </span>
                  }
                />
              </Text>
            }
            error={errorObj.displayName}
            value={formObj.displayName}
            onChange={handleChange}
          />
        </Form.Group>

        <Divider />

        <Text color="bodyLight" className="mb-1">
          Choose a Payout Aggregator you want to route transfers to
        </Text>
        <Dropdown
          style={{ width: 380 }}
          selection
          className="mb-3"
          name="aggregator"
          placeholder="Choose a Payout Aggregator"
          options={[
            {
              text: LABEL_BY_AGGREGATOR[AGGREGATOR.RAZORPAY],
              value: AGGREGATOR.RAZORPAY,
            },
          ]}
          error={errorObj.aggregator}
          value={formObj.aggregator}
          onChange={handleChange}
        />

        <Text color="bodyLight" className="mb-1">
          Type of account you want to add
        </Text>
        <RadioGroup
          fieldLabel={null}
          direction="column"
          radioOptions={accountTypeOptions}
          dataEventName="Radiobox_Account_Type"
        />

        {formObj.accountType ? (
          <Form.Group>
            <Form.Input
              width={5}
              data-testid="bank-account"
              name="bankAccount"
              label={
                formObj.accountType === 'RAZORPAY_BANK_ACCOUNT' ? (
                  <Text color="bodyLight" className="mb-1">
                    Bank Account Number
                    <Popup
                      position="right center"
                      content={
                        <>
                          <Text variant="b12">
                            To find Bank Acc. Number linked to Razorpay, login
                            to your dashboard and follow the steps outlined
                            below:
                          </Text>
                          <br />
                          <Text strong>
                            Accounts & Settings &gt;&gt; Bank Accounts &
                            Settlements &gt;&gt; Bank account details
                          </Text>
                        </>
                      }
                      trigger={
                        <span>
                          <Icon
                            name="info"
                            className="pointer ml-1"
                            verticalAlign="top"
                          />
                        </span>
                      }
                    />
                  </Text>
                ) : (
                  <Text color="bodyLight" className="mb-1">
                    Account Number
                  </Text>
                )
              }
              error={errorObj.bankAccount}
              value={formObj.bankAccount}
              onChange={handleChange}
            />
          </Form.Group>
        ) : null}
      </Form>
    </>
  );
};

export default withErrorBoundary(AccountDetails);
