import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Loader,
  Label,
  Text,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';
import _keyBy from 'lodash/keyBy';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { internalTransfer, getAccountList } from 'services/accounts';

// Utils
import {
  requiredValidation,
  transferIdValidation,
  amountValidation,
} from 'utils/formValidation';
import { formatAmount } from 'utils/common';
import isFormValid from 'utils/isFormValid';
import { getMainAccountBalance } from 'utils/fundSources';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Components
import AmountLabeledInput from 'components/AmountLabeledInput';
import Option from './Option';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { InternalTransferModalProps } from '../types';

const InternalTransferModal: React.FC<InternalTransferModalProps> = ({
  nonConnectedAccounts,
  balance,
  onResponse,
  onClose,
}) => {
  const { accountInfo } = useAccount();

  const [data, setData] = useState<AnyObject | undefined>(undefined);
  const [formObj, setFormObj] = useState<AnyObject>({});
  const [errorObj, setErrorObj] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      const response = await getAccountList({ withBalance: 1 });
      const accountByAccountId = _keyBy(response, 'accountId');

      setData(accountByAccountId);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const response = await internalTransfer(formObj);

    setLoading(false);

    if (!('error' in response)) {
      onResponse(response.status, formObj.amount);
    } else {
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      case 'toAccount':
        error = requiredValidation(value);
        break;

      case 'transferId':
        error = transferIdValidation(value, true);
        break;

      case 'amount':
        if (Number(value) > Number(balance.availableBalance)) {
          error = 'Amount can not exceed available balance.';
        } else {
          error = amountValidation(value);
        }
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  if (!data) {
    return <Loader active />;
  }

  const options = nonConnectedAccounts.map((account) => ({
    text: (
      <Option
        name={account.accountName}
        amount={data[account.accountId].availableBalance}
      />
    ),
    value: String(account.accountId),
  }));

  const activeAccount: string = accountInfo.name;
  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS);

  return (
    <Modal $maxWidth="400" open>
      <ModalHeader>
        <div>
          <Text variant="h20" className="mb-1">
            Internal Transfer
          </Text>
          <Text as="span" color="bodyLight">
            {activeAccount}
          </Text>
          <Text as="span" variant="h16" className="pl-1">
            {formatAmount(balance.availableBalance)}
          </Text>
        </div>
        <Cross
          data-event-name="Close_Icon_Internal_Transfer"
          onClick={onClose}
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Form.Select
              name="toAccount"
              label="Transfer To"
              placeholder="Select Account"
              options={options}
              error={errorObj.toAccount}
              value={formObj.toAccount}
              onChange={handleChange}
            />
            <Form.Group>
              <Form.Field
                control={AmountLabeledInput}
                fluid
                width={10}
                name="amount"
                inputmode="numeric"
                step=".01"
                label="Amount"
                placeholder="Amount"
                error={errorObj.amount}
                value={formObj.amount}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Input
              name="transferId"
              fluid
              label={
                <Text color="bodyLight" className="mb-1">
                  Transfer ID <Label size="mini">Optional</Label>
                </Text>
              }
              placeholder="Transfer ID"
              value={formObj.transferId}
              error={errorObj.transferId}
              onChange={handleChange}
            />
            <Form.TextArea
              name="remarks"
              label={
                <Text color="bodyLight" className="mb-1">
                  Remarks <Label size="mini">Optional</Label>
                </Text>
              }
              className="mb-0"
              maxLength={200}
              value={formObj.remarks}
              onChange={handleChange}
            />
            <Text variant="b12" color="bodyLight" className="mt-1">
              Maximum 200 characters allowed
            </Text>
            <BtnContainer>
              <Button
                data-event-name="Secondary_Button_Internal_Transfer"
                as="a"
                link
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                data-event-name="Primary_Button_Internal_Transfer"
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                loading={loading}
              >
                Transfer
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  balance: getMainAccountBalance(fundSources),
});

const withConnect = connect(mapStateToProps);

export default withErrorBoundary(withConnect(InternalTransferModal));
