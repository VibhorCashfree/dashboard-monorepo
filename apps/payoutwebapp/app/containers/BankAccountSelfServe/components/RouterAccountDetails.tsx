import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Text,
  Popup,
  Image,
  Cross,
  Dropdown,
  RadioGroup,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import Icon from 'components/Icon';

// Services
import { create } from 'services/fundSources';

// Images
import questionImg from 'images/question.svg';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { useBankAccountSelfServe } from '../providers';

// Constants
import { FS_DISPLAY_TYPE } from 'constants/fundSources';
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { errorByMessage } from 'containers/AllFundSources/constants';
import { SUB_STAGES_BY_STAGE } from 'containers/Leads/constants';
import {
  CONNECTED_BANK,
  ADD_LEAD_FORM,
  ACCOUNT_PREFERENCE,
} from '../constants';

// Utils
import Analytics from 'utils/analytics';
import {
  fundSourceNameValidation,
  accountNameValidation,
  accountNumberValidation,
  ifscValidation,
  requiredValidation,
} from 'utils/formValidation';
import { getBankAccountOptions } from '../utils';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { RouterAccountDetailsProps } from '../types';

const RouterAccountDetails: React.FC<RouterAccountDetailsProps> = ({
  lead,
  actionType,
  setActionType,
  formObj,
  errorObj,
  setFormObj,
  setErrorObj,
  onDone,
}) => {
  const { yesBusinessType } = useAccount();
  const { setWizardData } = useBankAccountSelfServe();

  const [open, setOpen] = useState(false);

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
    setErrorObj({});
  }, [formObj.accountPreference]);

  useEffect(() => {
    setWizardData((prev) => ({ ...prev, bankName: formObj.bankName }));
  }, [formObj.bankName]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      case 'displayName':
        error = fundSourceNameValidation(value);
        break;

      case 'bankName':
        error = requiredValidation(value);
        Analytics.track('Dropdown_bankName', { value });
        break;

      case 'bankAccount':
        error = accountNumberValidation(value);
        break;

      case 'ifsc':
        error = ifscValidation(value);
        break;

      case 'accountHolderName':
        error = accountNameValidation(value);
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      [ACCOUNT_PREFERENCE.SECOND, ACCOUNT_PREFERENCE.THIRD].includes(
        formObj.accountPreference,
      )
    ) {
      setOpen(true);
      return;
    }

    const body: {
      fsDisplayType: FS_DISPLAY_TYPE;
      displayName: string;
      supportedModes: string[];
      bank: {
        bankName: string;
        accountHolderName: string;
        bankAccount: string;
        ifsc: string;
        lead?: string;
      };
    } = {
      fsDisplayType: FS_DISPLAY_TYPE.BANK_ACCOUNT,
      displayName: formObj.displayName,
      supportedModes:
        formObj.supportedModes === 'WITH_UPI'
          ? ['banktransfer', 'upi']
          : ['banktransfer'],
      bank: {
        bankName: formObj.bankName,
        accountHolderName: formObj.accountHolderName,
        bankAccount: formObj.bankAccount,
        ifsc: formObj.ifsc,
      },
    };

    if (lead) {
      body.bank.lead = String(lead.id);
    }

    const response = await create(body);

    if ('error' in response) {
      const status: string = _get(response, 'error.status', '');

      if (status === 'ERROR') {
        const title: string = _get(response, 'error.title', '');

        if (title === 'REQUEST_INVALID') {
          const message: string = _get(response, 'error.message', '');
          const error = _get(errorByMessage, [message]);

          if (error) {
            setErrorObj((prev) => ({ ...prev, [error.key]: error.text }));
          }
        }
      }
    } else {
      setWizardData((prev) => ({
        ...prev,
        fundSourceId: (response as { fundSourceId: number }).fundSourceId,
      }));

      const leadStatus = _get(lead, 'status', '');

      if (SUB_STAGES_BY_STAGE.PROD_CRED_GENERATION.includes(leadStatus)) {
        onDone(2);
      } else {
        onDone();
      }
    }
  };

  const modeOptions = [
    { label: 'NEFT, IMPS', value: 'WITHOUT_UPI' },
    { label: 'NEFT, IMPS & UPI', value: 'WITH_UPI' },
  ].map((option) => ({
    ...option,
    name: 'supportedModes',
    checked: formObj.supportedModes === option.value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e, { name: 'supportedModes', value: option.value });
    },
  }));

  const accountPreferenceOptions = [
    {
      label: 'I have an API Banking enabled bank account.',
      value: ACCOUNT_PREFERENCE.FIRST,
    },
    {
      label: 'I need API banking set-up on my existing bank account.',
      value: ACCOUNT_PREFERENCE.SECOND,
    },
    {
      label:
        'I need a new bank account with API Banking (We support only Yes and Axis bank for new accounts)',
      value: ACCOUNT_PREFERENCE.THIRD,
    },
  ].map((option) => ({
    ...option,
    name: 'accountPreference',
    checked: formObj.accountPreference === option.value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e, { name: 'accountPreference', value: option.value });
    },
  }));

  return (
    <>
      <Text variant="h28">Account Details</Text>
      <Text className="mt-1 mb-3" color="bodyLight">
        Provide details of your bank account that you want to connect.
      </Text>

      {lead ? null : (
        <>
          <Text color="bodyLight" className="mb-1">
            Account Preference
          </Text>
          <RadioGroup
            fieldLabel={null}
            direction="column"
            radioOptions={accountPreferenceOptions}
            dataEventName="Radiobox_Account_Preference"
          />
        </>
      )}

      {(lead || formObj.accountPreference === ACCOUNT_PREFERENCE.FIRST) && (
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

          <Text color="bodyLight" className="mb-1">
            Bank Name
          </Text>
          <Dropdown
            style={{ width: 250 }}
            selection
            className="mb-3"
            name="bankName"
            placeholder="Choose a bank"
            options={getBankAccountOptions(yesBusinessType.connectAllowed)}
            error={errorObj.bankName}
            value={formObj.bankName}
            onChange={handleChange}
          />

          <Form.Group>
            <Form.Input
              width={5}
              data-testid="bank-account"
              name="bankAccount"
              label="Account Number"
              error={errorObj.bankAccount}
              value={formObj.bankAccount}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              width={5}
              data-testid="ifsc"
              name="ifsc"
              label="IFSC"
              error={errorObj.ifsc}
              value={formObj.ifsc}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              width={5}
              data-testid="account-holder-name"
              name="accountHolderName"
              label="Account Holder Name"
              error={errorObj.accountHolderName}
              value={formObj.accountHolderName}
              onChange={handleChange}
            />
          </Form.Group>

          {formObj.bankName === CONNECTED_BANK.ICICI_COMP_CONNECTED && (
            <>
              <Text color="bodyLight" className="mb-1">
                Choose Payment Modes you need{' '}
                <Popup
                  position="bottom center"
                  content="You need to choose between set of payment modes you need, based on which documents will be collected."
                  trigger={
                    <Image inline src={questionImg} className="ml-1 pointer" />
                  }
                />
              </Text>
              <RadioGroup
                fieldLabel={null}
                direction="column"
                radioOptions={modeOptions}
                dataEventName="Radiobox_Payment_Modes"
              />
            </>
          )}
        </Form>
      )}

      {open && (
        <Modal $maxWidth="480" open>
          <ModalHeader>
            New Bank Account for API Banking
            <Cross
              data-event-name="Close_Icon_Add_Balance"
              onClick={() => setOpen(false)}
            />
          </ModalHeader>
          <ModalContent>
            <ModalDescription>
              <Text color="bodyLight" className="mb-4">
                To open an API-enabled bank account, we need some additional
                details.
                <br />
                <br />
                Click &apos;Proceed&apos; to fill out the Google Form. Our team
                will update you once it&apos;s submitted.
              </Text>

              <BtnContainer className="mt-4">
                <Button
                  data-event-name="Secondary_Button_Update_Details"
                  as="a"
                  link
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  data-event-name="Primary_Button_Connect_Your_Bank_Account"
                  primary
                  className="ml-4"
                  onClick={() => {
                    window.open(ADD_LEAD_FORM, '_blank');
                    window.location.reload();
                  }}
                >
                  Proceed
                </Button>
              </BtnContainer>
            </ModalDescription>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default withErrorBoundary(RouterAccountDetails);
