import React, { useEffect, useState } from 'react';
import {
  Button,
  Space,
  Form,
  Text,
  Paper,
  Popup,
  Image,
  Dropdown,
  RadioGroup,
  Modal,
  ModalDescription,
} from '@cashfree-intl/coherent';
import _first from 'lodash/first';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import Icon from 'components/Icon';

// Services
import { create, searchLeads } from 'services/fundSources';

// Images
import questionImg from 'images/question.svg';
import crownImg from 'images/crown.svg';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { useBankAccountSelfServe } from '../providers';

// Constants
import { FS_DISPLAY_TYPE } from 'constants/fundSources';
import { ACTION_TYPE } from 'components/FormWizard/constants';
import { errorByMessage } from 'containers/AllFundSources/constants';
import { SUB_STAGES_BY_STAGE } from 'containers/Leads/constants';
import { CONNECTED_BANK } from '../constants';

// Utils
import { formatAmount } from 'utils/common';
import Analytics from 'utils/analytics';
import getAlertIcon from 'utils/getAlertIcon';
import {
  fundSourceNameValidation,
  accountNameValidation,
  accountNumberValidation,
  ifscValidation,
  requiredValidation,
} from 'utils/formValidation';
import { getBankAccountOptions, getLeadBasedFields } from '../utils';

// Styled
import { BtnContainer } from 'styled/common';
import { StyledModalContent, StyledCard } from '../styled';

// Types
import type { AccountDetailsProps } from '../types';

const AccountDetails: React.FC<AccountDetailsProps> = ({
  actionType,
  setActionType,
  formObj,
  errorObj,
  setFormObj,
  setErrorObj,
  modalData,
  onDone,
}) => {
  const { yesBusinessType } = useAccount();
  const { setWizardData } = useBankAccountSelfServe();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (modalData) {
      const { leadId, bankAccount, ifsc } = getLeadBasedFields(modalData.lead);
      setTimeout(() => {
        setFormObj({
          leadId,
          bankAccount,
          ifsc,
        });
      }, 0);
    }
  }, [modalData]);

  useEffect(() => {
    (async function handleActionType() {
      switch (actionType) {
        case ACTION_TYPE.SUBMIT:
          await handleSubmit();
          setActionType(ACTION_TYPE.EMPTY);
          break;

        case ACTION_TYPE.HEADER_SETUP_FEE:
          setOpen(true);
          setActionType(ACTION_TYPE.EMPTY);
          break;
      }
    })();
  }, [actionType]);

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
        Analytics.track('Dropdown_bankName', {
          value,
        });
        break;

      case 'leadId':
        error = requiredValidation(value);
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

  const handleBlur = async () => {
    if (!formObj.leadId) {
      return;
    }

    const leadId: number = parseInt(formObj.leadId);

    const response = await searchLeads({
      size: 1,
      previousId: leadId - 1,
    });

    if (
      'error' in response ||
      !response.find((lead: AnyObject) => lead.id === leadId)
    ) {
      setErrorObj((prev) => ({
        ...prev,
        leadId:
          'Invalid lead ID. Please enter the correct lead ID or add a new lead, if not already.',
      }));
    } else {
      const lead = _first(response);

      if (lead!.fundSourceId) {
        setErrorObj((prev) => ({
          ...prev,
          leadId:
            'This lead ID is already associated with an existing fundsource. Please use this lead ID for the corresponding fund source or add a new lead and then connect it to a fund source.',
        }));
      } else {
        const { leadId, bankAccount, ifsc } = getLeadBasedFields(lead!);

        setFormObj((prev) => ({ ...prev, leadId, bankAccount, ifsc }));
      }
    }
  };

  const handleSubmit = async () => {
    const body = {
      fsDisplayType: FS_DISPLAY_TYPE.BANK_ACCOUNT,
      displayName: formObj.displayName,
      supportedModes:
        formObj.supportedModes === 'WITH_UPI'
          ? ['banktransfer', 'upi']
          : ['banktransfer'],
      bank: {
        leadId: String(formObj.leadId),
        bankName: formObj.bankName,
        accountHolderName: formObj.accountHolderName,
        bankAccount: formObj.bankAccount,
        ifsc: formObj.ifsc,
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
          setErrorObj((prev) => ({
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

      const leadStatus: string = _get(modalData, 'lead.status');

      if (SUB_STAGES_BY_STAGE.PROD_CRED_GENERATION.includes(leadStatus)) {
        onDone(2);
      } else {
        onDone();
      }
    }
  };

  const radioOptions = [
    {
      label: 'NEFT, IMPS',
      value: 'WITHOUT_UPI',
    },
    {
      label: 'NEFT, IMPS & UPI',
      value: 'WITH_UPI',
    },
  ].map((option) => ({
    ...option,
    name: 'supportedModes',
    checked: formObj.supportedModes === option.value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e, { name: 'supportedModes', value: option.value });
    },
  }));

  return (
    <>
      <Text variant="h28">Account Details</Text>
      <Text className="mt-1 mb-3" color="bodyLight">
        Provide details of your bank account that you want to connect.
      </Text>

      <Form>
        <Form.Group>
          <Form.Input
            width={5}
            data-testid="display-name"
            name="displayName"
            label={
              <Text color="bodyLight" className="mb-1">
                Fund Source Name
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

        <Form.Group>
          <Form.Input
            width={5}
            data-testid="lead-id"
            name="leadId"
            label="Lead ID"
            error={errorObj.leadId}
            value={formObj.leadId}
            onChange={handleChange}
            onBlur={handleBlur}
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
              radioOptions={radioOptions}
              dataEventName="Radiobox_Payment_Modes"
            />
          </>
        )}
      </Form>

      {open && (
        <Modal $maxWidth="480" open>
          <StyledModalContent>
            <ModalDescription>
              <div>
                <Paper $background="linear-gradient(92.84deg, #0A173F -0.21%, #12255D 41.97%, #162E70 111.84%)">
                  <Text variant="h20" color="white" className="mb-1">
                    Connect your Bank Account{' '}
                    <Image inline src={crownImg} className="ml-1" />
                  </Text>
                  <Text color="white" className="mb-4">
                    Link your bank account with Cashfree and make payouts
                    directly using your account.
                  </Text>
                </Paper>
                <StyledCard>
                  <Space justifyContent="space-between" className="p-2">
                    <div>
                      <Text>One Time Setup Fee</Text>
                      <Text variant="b12" color="bodyLight">
                        Charged per bank account
                      </Text>
                    </div>
                    <div className="text-right">
                      <Text variant="b12" color="bodyLight">
                        Starts from
                      </Text>
                      <Text variant="h20" color="success">
                        {formatAmount(100000)}
                      </Text>
                    </div>
                  </Space>
                  <div
                    className="p-1"
                    style={{
                      textAlign: 'center',
                      backgroundColor: '#EFE5FF',
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                  >
                    <Text>
                      Exact amount will be displayed after choosing bank account
                    </Text>
                  </div>
                </StyledCard>
              </div>
              <div className="px-2">
                <Text>How will it benefit you?</Text>
                <Space className="mt-2 mb-3" direction="column" gap={2}>
                  <Text>
                    <Image
                      inline
                      className="mr-1"
                      src={getAlertIcon('success', 'sm')}
                    />
                    Managing integrations with the bank.
                  </Text>
                  <Text>
                    <Image
                      inline
                      className="mr-1"
                      src={getAlertIcon('success', 'sm')}
                    />
                    Assist in negotiating, coordinating, and obtaining bank
                    credentials.
                  </Text>
                  <Text>
                    <Image
                      inline
                      className="mr-1"
                      src={getAlertIcon('success', 'sm')}
                    />
                    24x7 Customer Support.
                  </Text>
                  <Text>
                    <Image
                      inline
                      className="mr-1"
                      src={getAlertIcon('success', 'sm')}
                    />
                    Seamless and automated reconcilliation.
                  </Text>
                </Space>

                <Text color="warning">
                  *You will only be charged after successful setup and
                  integration.
                </Text>
              </div>
              <BtnContainer className="mt-4">
                <Button
                  data-event-name="Primary_Button_Connect_Your_Bank_Account"
                  primary
                  onClick={() => setOpen(false)}
                >
                  Okay, Got It
                </Button>
              </BtnContainer>
            </ModalDescription>
          </StyledModalContent>
        </Modal>
      )}
    </>
  );
};

export default withErrorBoundary(AccountDetails);
