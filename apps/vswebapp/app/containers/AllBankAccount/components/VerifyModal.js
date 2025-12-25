import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Label,
  Grid,
  Column,
  Form,
  Space,
} from '@cashfree-intl/coherent';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import { digitOnlyKeys, formatAmount } from 'utils/common';
import {
  nameValidation,
  accountNumberValidation,
  ifscValidation,
  phoneNumberValidation,
} from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';

// Services
import { verifyBankAccount } from 'services/bav';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Components
import PhoneLabeledInput from 'components/PhoneLabeledInput';
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

const VerifyModal = ({ onClose, onVerify }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [formObj, setFormObj] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const response = await verifyBankAccount(formObj);

    if (!response.error) {
      onVerify({ ...formObj, ...response });
    } else {
      onVerify({ ...formObj, ...response });
    }

    setLoading(false);
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'name':
        error = nameValidation('Name', value, true, true);
        break;

      case 'bank_account':
        error = accountNumberValidation(value);
        break;

      case 'ifsc':
        error = ifscValidation(value);
        break;

      case 'phone':
        error = phoneNumberValidation(value, true);
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS) || loading;

  return (
    <Modal $maxWidth="500" open>
      <ModalHeader>
        Verify Bank Account{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_VerifyBankAccount_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Space direction="column" gap={3}>
              <TestEnvironmentAlert />
              <Grid columns="equal">
                <Column>
                  <Form.Input
                    fluid
                    name="bank_account"
                    label="Account Number"
                    placeholder="Account Number"
                    error={errorObj.bank_account}
                    value={formObj.bank_account}
                    onChange={handleChange}
                  />
                </Column>
                <Column>
                  <Form.Input
                    fluid
                    name="ifsc"
                    label="IFSC"
                    placeholder="IFSC"
                    error={errorObj.ifsc}
                    value={formObj.ifsc}
                    onChange={handleChange}
                  />
                </Column>
              </Grid>

              <Form.Input
                fluid
                name="name"
                label={
                  <Text color="bodyLight" className="mb-1">
                    Account Holder Name <Label size="mini">Optional</Label>
                  </Text>
                }
                placeholder="Account Holder Name"
                error={errorObj.name}
                value={formObj.name}
                onChange={handleChange}
                className="m-0"
              />

              <Grid columns="equal">
                <Column>
                  <Form.Field
                    control={PhoneLabeledInput}
                    fluid
                    name="phone"
                    type="text"
                    label={
                      <Text color="bodyLight" className="mb-1">
                        Phone Number <Label size="mini">Optional</Label>
                      </Text>
                    }
                    maxLength="10"
                    placeholder="Phone Number"
                    error={errorObj.phone}
                    value={formObj.phone}
                    onChange={handleChange}
                    onKeyDown={digitOnlyKeys}
                  />
                </Column>
                <Column />
              </Grid>
            </Space>
            <StyledRateBanner className="p-1  mt-2">
              <Text color="warning">
                {formatAmount(freeCreditRates.BANKDETAILS_VALIDATION)} will be
                deducted from your available balance
              </Text>
            </StyledRateBanner>
            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_VerifyBankAccount_SecondaryButton"
              >
                Cancel
              </Button>
              <Button
                primary
                className="ml-4"
                type="submit"
                disabled={disabled}
                loading={loading}
                data-event-name="Form_VerifyBankAccount_PrimaryButton"
              >
                Verify
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

VerifyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
};

export default VerifyModal;
