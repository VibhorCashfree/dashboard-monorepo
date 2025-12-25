import React, { useState, FormEvent, ChangeEvent } from 'react';
import {
  Form,
  Label,
  Text,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Services
import { selfWithdrawals } from 'services/fundSources';

// Utils
import { amountValidation } from 'utils/formValidation';
import { formatAmount } from 'utils/common';
import isFormValid from 'utils/isFormValid';

// Components
import AmountLabeledInput from 'components/AmountLabeledInput';
import { useDetails } from 'containers/FundSourceDetails/providers';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { SelfWithdrawalModalProps } from '../types';

export const SelfWithdrawalModal: React.FC<SelfWithdrawalModalProps> = ({
  onResponse,
  onClose,
}) => {
  const { accountInfo } = useAccount();
  const { details } = useDetails();

  const [formObj, setFormObj] = useState<AnyObject>({});
  const [errorObj, setErrorObj] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      ...formObj,
      paymentInstrumentId: details.paymentInstrumentId,
    };

    const response = await selfWithdrawals(body);
    setLoading(false);

    if (!('error' in response)) {
      onResponse(response, formObj.amount || '');
    } else {
      onClose();
    }
  };

  const { availableBalance } = details.fsBalance;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    { name, value }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      case 'amount':
        if (Number(value) > Number(availableBalance)) {
          error = 'Amount can not exceed available balance.';
        } else {
          error = amountValidation(value);
        }
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS);

  return (
    <Modal $maxWidth="400" open>
      <ModalHeader>
        <div>
          <Text variant="h20" className="mb-1">
            Self Withdrawal
          </Text>
          <Text as="span" color="bodyLight">
            {accountInfo.name}
          </Text>
          <Text as="span" variant="h16" className="pl-1">
            {formatAmount(availableBalance)}
          </Text>
        </div>
        <Cross data-event-name="Close_Icon_Self_Withdrawal" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Text variant="b12" color="bodyLight" className="mb-2">
            Amount will be transferred to your bank a/c{' '}
            <strong>{accountInfo.bankAccount}</strong>.
          </Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Field
                control={AmountLabeledInput}
                fluid
                width={12}
                name="amount"
                label="Amount"
                inputmode="numeric"
                step=".01"
                placeholder="Amount"
                error={errorObj.amount}
                value={formObj.amount}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.TextArea
              name="remarks"
              label={
                <Text color="bodyLight" className="mb-1 mt-2">
                  Remarks <Label size="mini">Optional</Label>
                </Text>
              }
              maxLength={200}
              value={formObj.remarks}
              onChange={handleChange}
              className="mb-0"
            />
            <Text variant="b12" color="bodyLight" className="mt-1 mb-4">
              Maximum 200 characters allowed
            </Text>
            <Text variant="b12" color="bodyLight" className="mb-2">
              * It may take from 30 mins to few hours for amount to be credited
              depending on banking hours.
            </Text>
            <Text variant="b12" color="bodyLight" className="mb-2">
              * You can withdraw Cashfree balance to your bank account maximum
              of three times per day.
            </Text>

            <BtnContainer>
              <Button
                data-event-name="Secondary_Button_Self_Withdrawal"
                as="a"
                link
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                data-event-name="Primary_Button_Self_Withdrawal"
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                loading={loading}
              >
                Withdraw
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(SelfWithdrawalModal);
