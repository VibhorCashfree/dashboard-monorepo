import React, { useState } from 'react';
import {
  toast,
  Label,
  Form,
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
import { addBalance } from 'services/fundSources';

// Utils
import { amountValidation, remarksValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';

// Components
import AmountLabeledInput from 'components/AmountLabeledInput';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { AddBalanceModalProps } from '../types';

const AddBalanceModal: React.FC<AddBalanceModalProps> = ({
  paymentInstrumentId,
  onClose,
}) => {
  const [formObj, setFormObj] = useState<AnyObject>({});
  const [errorObj, setErrorObj] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const response = await addBalance(paymentInstrumentId, {
      amount: +formObj.amount,
      utr: formObj.utr,
      rechargeId: formObj.rechargeId,
      remarks: formObj.remarks,
    });

    if ('error' in response) {
      toast.error((response.error as { message: string }).message);
    } else {
      toast.success(response.message);
      window.location.reload();

      onClose();
    }

    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    { name, value }: { name: string; value: string },
  ): void => {
    let error: string | undefined | null;

    switch (name) {
      case 'amount':
        error = amountValidation(value);
        break;

      case 'remarks':
        error = remarksValidation('Remarks', value, 70, true);
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const disabled =
    !isFormValid(formObj, errorObj, REQUIRED_FIELDS.ADD_BALANCE) || loading;

  return (
    <Modal $maxWidth="480" open>
      <ModalHeader>
        Recharge
        <Cross data-event-name="Close_Icon_Add_Balance" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Form.Field
              width={12}
              control={AmountLabeledInput}
              data-testid="amount"
              name="amount"
              label="Amount"
              inputmode="numeric"
              step=".01"
              error={errorObj.amount}
              value={formObj.amount}
              onChange={handleChange}
            />
            <Form.Input
              data-testid="recharge-id"
              name="rechargeId"
              label={
                <Text color="bodyLight" className="mb-1">
                  Reference ID <Label size="mini">Optional</Label>
                </Text>
              }
              error={errorObj.rechargeId}
              value={formObj.rechargeId}
              onChange={handleChange}
            />
            <Form.Input
              name="utr"
              data-testid="utr"
              label={
                <Text color="bodyLight" className="mb-1">
                  UTR <Label size="mini">Optional</Label>
                </Text>
              }
              error={errorObj.utr}
              value={formObj.utr}
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
              maxLength="70"
              className="m-0"
              value={formObj.remarks}
              error={errorObj.remarks}
              onChange={handleChange}
            />

            <BtnContainer>
              <Button
                data-event-name="Secondary_Button_Add_Balance"
                as="a"
                link
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                data-event-name="Primary_Button_Add_Balance"
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                loading={loading}
              >
                Confirm
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(AddBalanceModal);
