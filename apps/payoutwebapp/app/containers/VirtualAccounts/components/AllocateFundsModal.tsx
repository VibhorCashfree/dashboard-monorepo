import React, { useState, useEffect } from 'react';
import {
  Form,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Text,
  Label,
  translate,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Components
import AmountLabeledInput from 'components/AmountLabeledInput';

// Providers
import { useEscrowAccount } from 'pages/OneEscrow/providers';

// Utils
import {
  amountValidation,
  referenceIdValidation,
  remarksValidation,
} from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { formatAmount } from 'utils/common';

// Services
import { addBalance, getBalance } from 'services/fundSources';

// Constants
import { REQUIRED_FIELDS, MODAL_TYPE } from '../constants';

// Helpers
import { getFundSourcesOptions } from '../helpers';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { AllocateFundsModalProps } from '../types';

const AllocateFundsModal: React.FC<AllocateFundsModalProps> = ({
  onResponse,
  onClose,
}) => {
  const { details, virtualAccounts } = useEscrowAccount();

  const [fsBalance, setFsBalance] = useState<FsBalance>({
    balance: '0',
    availableBalance: '0',
    fundsOnHold: '0',
    overdraft: '0',
    lastUpdated: '',
  });
  const [formObj, setFormObj] = useState<AnyObject>({});
  const [errorObj, setErrorObj] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      const response = await getBalance(details.paymentInstrumentId);

      if (!('error' in response)) {
        setFsBalance(response);
      }
    })();
  }, [details.paymentInstrumentId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const response = await addBalance(formObj.toPaymentInstrumentId, {
      amount: formObj.amount,
      rechargeId: formObj.referenceId,
      remarks: formObj.remarks,
    });

    setLoading(false);

    if ('error' in response) {
      onResponse({
        type: 'FAILED',
        result: _get(response, 'error.message'),
      });
    } else {
      onResponse({
        type: 'SUCCESS',
        result: formObj,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent,
    { name, value }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      case 'amount':
        if (Number(value) > Number(fsBalance.availableBalance)) {
          error = `${translate('insufficient_escrow_account_balance')}`;
        } else {
          error = amountValidation(value);
        }
        break;

      case 'referenceId':
        error = referenceIdValidation(value, true);
        break;

      case 'remarks':
        error = remarksValidation('Remarks', value, 200, true);
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const disabled =
    !isFormValid(
      formObj,
      errorObj,
      REQUIRED_FIELDS[MODAL_TYPE.ALLOCATE_FUNDS],
    ) || loading;

  return (
    <Modal $maxWidth="500" open>
      <ModalHeader>
        Allocate Funds
        <Cross onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Text strong className="mb-1">
            What does allocate funds do?
          </Text>
          <Text color="bodyLight">
            Use Allocate Funds to seamlessly allocate money from your escrow
            account to your virtual account for efficient fund management. You
            can later transfer these funds to any account on-demand.
          </Text>

          <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Select
              name="toPaymentInstrumentId"
              label="Select Virtual Account"
              placeholder="Select Virtual Account"
              options={getFundSourcesOptions(virtualAccounts)}
              error={errorObj.toPaymentInstrumentId}
              value={formObj.toPaymentInstrumentId}
              onChange={handleChange}
            />

            <Form.Input
              control={AmountLabeledInput}
              width={8}
              data-testid="amount"
              name="amount"
              inputmode="numeric"
              step=".01"
              label="Recharge Amount"
              placeholder="Amount"
              className="m-0"
              error={errorObj.amount}
              value={formObj.amount}
              onChange={handleChange}
            />
            <Text variant="b12" color="bodyLight" className="mt-1 mb-2">
              Escrow A/c Balance: {formatAmount(fsBalance.availableBalance)}
            </Text>

            <Form.Input
              data-testid="reference-id"
              name="referenceId"
              label={
                <Text color="bodyLight" className="mb-1">
                  Create Reference ID <Label size="mini">Optional</Label>
                </Text>
              }
              width={16}
              value={formObj.referenceId}
              error={errorObj.referenceId}
              onChange={handleChange}
            />

            <Form.TextArea
              data-testid="remarks"
              name="remarks"
              label={
                <Text color="bodyLight" className="mb-1">
                  Remarks <Label size="mini">Optional</Label>
                </Text>
              }
              className="mb-0"
              maxLength="200"
              value={formObj.remarks}
              onChange={handleChange}
            />
            <Text variant="b12" color="bodyLight" className="mt-1">
              Maximum 200 characters allowed
            </Text>

            <BtnContainer>
              <Button as="a" link onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                loading={loading}
              >
                Submit
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(AllocateFundsModal);
