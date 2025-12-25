import React, { useState } from 'react';
import {
  Form,
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
import { createVirtualAccount } from 'services/fundSources';

// Utils
import {
  requiredValidation,
  fundSourceNameValidation,
} from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';

// Providers
import { useEscrowAccount } from 'pages/OneEscrow/providers';

// Constants
import { REQUIRED_FIELDS, MODAL_TYPE } from '../constants';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { CreateVirtualAccountModalProps } from '../types';

const CreateVirtualAccountModal: React.FC<CreateVirtualAccountModalProps> = ({
  onResponse,
  onClose,
}) => {
  const { details } = useEscrowAccount();

  const [formObj, setFormObj] = useState<AnyObject>({});
  const [errorObj, setErrorObj] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const response = await createVirtualAccount(formObj);

    setLoading(false);

    onResponse(response, formObj);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      case 'displayName':
        error = fundSourceNameValidation(value);
        break;

      case 'accountPrefix':
        error = requiredValidation(value);
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const disabled =
    !isFormValid(
      formObj,
      errorObj,
      REQUIRED_FIELDS[MODAL_TYPE.CREATE_VIRTUAL_ACCOUNT],
    ) || loading;

  return (
    <Modal $maxWidth="480" open>
      <ModalHeader>
        Create Virtual Account (VA)
        <Cross onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Input
                width={12}
                data-testid="display-name"
                name="displayName"
                label="Display Name"
                error={errorObj.displayName}
                value={formObj.displayName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={12}
                data-testid="account-prefix"
                name="accountPrefix"
                label="Account Prefix"
                error={errorObj.accountPrefix}
                value={formObj.accountPrefix}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Input
              width={12}
              readOnly
              data-testid="bank-account"
              name="bankAccount"
              label="Choose Escrow Account"
              value={`${details.cfBankName} (${details.bankAccount})`}
            />

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

export default withErrorBoundary(CreateVirtualAccountModal);
