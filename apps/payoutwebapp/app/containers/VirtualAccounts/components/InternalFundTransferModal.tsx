import React, { useState } from 'react';
import {
  Form,
  Space,
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

// Services
import { internalFundTransfer } from 'services/fundSources';

// Utils
import { formatAmount } from 'utils/common';
import {
  requiredValidation,
  transferIdValidation,
  amountValidation,
} from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import FundSourcesUtil from 'utils/fundSources';

// Providers
import { useEscrowAccount } from 'pages/OneEscrow/providers';

// Components
import AmountLabeledInput from 'components/AmountLabeledInput';

// Constants
import { REQUIRED_FIELDS, MODAL_TYPE } from '../constants';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { InternalFundTransferModalProps } from '../types';

const InternalFundTransferModal: React.FC<InternalFundTransferModalProps> = ({
  selectedRow,
  onResponse,
  onClose,
}) => {
  const { virtualAccounts } = useEscrowAccount();

  const [formObj, setFormObj] = useState<AnyObject>({
    paymentInstrumentId: selectedRow.paymentInstrumentId,
  });
  const [errorObj, setErrorObj] = useState<AnyObject>({});

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const response = await internalFundTransfer(formObj);

    setLoading(false);

    onResponse(response, formObj);
  };

  const handleChange = (
    e: React.ChangeEvent,
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
        if (Number(value) > Number(selectedRow.fsBalance.availableBalance)) {
          error = 'Amount can not exceed available balance.';
        } else {
          error = amountValidation(value);
        }
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const options = FundSourcesUtil.getActives(virtualAccounts)
    .filter(
      (fundSource) => fundSource.fundSourceId !== selectedRow.fundSourceId,
    )
    .map((fundSource) => ({
      key: fundSource.fundSourceId,
      text: (
        <Space justifyContent="space-between" alignItems="center">
          <span>{fundSource.displayName}</span>
          <span className="pl-1">{fundSource.virtualAccount}</span>
        </Space>
      ),
      value: fundSource.paymentInstrumentId,
    }));

  const disabled = !isFormValid(
    formObj,
    errorObj,
    REQUIRED_FIELDS[MODAL_TYPE.INTERNAL_FUND_TRANSFER],
  );

  return (
    <Modal $maxWidth="400" open>
      <ModalHeader>
        Internal Fund Transfer
        <Cross
          data-event-name="Close_Icon_Internal_Fund_Transfer"
          onClick={onClose}
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Text strong className="mb-1">
            Transferring From
          </Text>
          <Text color="bodyLight">
            {selectedRow.displayName} ({selectedRow.virtualAccount})
          </Text>
          <Text variant="b12" color="bodyLight">
            A/c Balance:{' '}
            <Text as="span" variant="b12" color="success">
              {formatAmount(selectedRow.fsBalance.availableBalance)}
            </Text>
          </Text>

          <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Field
                control={AmountLabeledInput}
                fluid
                width={10}
                data-testid="amount"
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
            <Form.Select
              name="toPaymentInstrumentId"
              label="Beneficiary Account"
              placeholder="Choose a virtual account"
              options={options}
              error={errorObj.toPaymentInstrumentId}
              value={formObj.toPaymentInstrumentId}
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
              <Button
                data-event-name="Secondary_Button_Internal_Fund_Transfer"
                as="a"
                link
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                data-event-name="Primary_Button_Internal_Fund_Transfer"
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

export default withErrorBoundary(InternalFundTransferModal);
