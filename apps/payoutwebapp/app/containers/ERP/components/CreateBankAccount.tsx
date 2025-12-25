import React, { useState } from 'react';
import {
  Form,
  Text,
  Image,
  Button,
  Space,
  Cross,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  toast,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Images
import canaraImg from 'images/banks/canara.svg';
import auImg from 'images/banks/au.svg';
import securityImg from 'images/security.svg';

// Services
import { create } from 'services/fundSources';

// Utils
import isFormValid from 'utils/isFormValid';
import {
  accountNameValidation,
  accountNumberValidation,
  ifscValidation,
} from 'utils/formValidation';

// Constants
import { FS_DISPLAY_TYPE } from 'constants/fundSources';
// import { errorByMessage } from 'containers/AllFundSources/constants';
import {
  CONNECTED_BANK,
  labelByBank,
} from 'containers/BankAccountSelfServe/constants';
import { REQUIRED_FIELDS } from '../constants';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { CreateBankAccountProps } from '../types';

const CreateBankAccount: React.FC<CreateBankAccountProps> = ({
  selectedBank,
  onClose,
}) => {
  const [formObj, setFormObj] = useState<AnyObject>({});
  const [errorObj, setErrorObj] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    switch (name) {
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

    setErrorObj((prev: AnyObject) => ({ ...prev, [name]: error }));
    setFormObj((prev: AnyObject) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const body = {
      fsDisplayType: FS_DISPLAY_TYPE.BANK_ACCOUNT,
      displayName: 'Bank_FundSource_' + Date.now(),
      supportedModes: ['banktransfer'],
      bank: {
        bankName: selectedBank,
        accountHolderName: formObj.accountHolderName,
        bankAccount: formObj.bankAccount,
        ifsc: formObj.ifsc,
        attemptConnectionAtBank: true,
      },
    };

    setLoading(true);

    const response = await create(body);

    setLoading(false);

    const status: string = _get(response, 'error.status', '');

    if (status === 'ERROR') {
      // const title: string = _get(response, 'error.title', '');
      // if (title === 'REQUEST_INVALID') {
      //   const message: string = _get(response, 'error.message', '');
      //   const error = _get(errorByMessage, [message]);
      //   if (error) {
      //     setErrorObj((prev: AnyObject) => ({
      //       ...prev,
      //       [error.key]: error.text,
      //     }));
      //   }
      // }
    } else {
      toast.success(
        labelByBank[selectedBank] +
          ' Fund Source has been created successfully!',
      );

      setTimeout(() => {
        const bankRedirectionUrl = _get(response, 'bankRedirectionUrl', '');

        if (bankRedirectionUrl) {
          window.location.href = bankRedirectionUrl;
        }
      }, 1000);
    }
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS);

  return (
    <Modal $maxWidth="500" open>
      <ModalHeader>
        {labelByBank[selectedBank]}
        <Cross onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <div className="mb-4 text-center">
            <Image
              inline
              style={{ height: 50, borderRadius: 8 }}
              src={
                selectedBank === CONNECTED_BANK.CANARA_CONNECTED
                  ? canaraImg
                  : auImg
              }
            />
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Input
              data-testid="bank-account-number"
              name="bankAccount"
              className="mt-2"
              label="Bank Account Number"
              error={errorObj.bankAccount}
              value={formObj.bankAccount}
              onChange={handleChange}
            />
            <Form.Input
              data-testid="ifsc"
              name="ifsc"
              className="mt-2"
              label="IFSC"
              error={errorObj.ifsc}
              value={formObj.ifsc}
              onChange={handleChange}
            />
            <Form.Input
              data-testid="account-holder-name"
              name="accountHolderName"
              className="mt-2"
              label={`Account Holder Name (As per ${labelByBank[selectedBank]} Records)`}
              error={errorObj.accountHolderName}
              value={formObj.accountHolderName}
              onChange={handleChange}
            />

            <Space justifyContent="center" alignItems="center" className="my-1">
              <Image inline className="mr-1" src={securityImg} />{' '}
              <Text variant="b12" color="bodyLight">
                We use advanced security to keep your details safe.
              </Text>
            </Space>

            <BtnContainer textAlign="center" className="mt-4">
              <Button
                type="submit"
                primary
                disabled={disabled}
                loading={loading}
              >
                Authorize on {labelByBank[selectedBank]}
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default CreateBankAccount;
