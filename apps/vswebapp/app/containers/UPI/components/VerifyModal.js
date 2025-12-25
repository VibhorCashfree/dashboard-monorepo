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
  Form,
} from '@cashfree-intl/coherent';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Services
import { verify } from 'services/UPI';

// Utils
import { nameValidation, vpaValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { formatAmount } from 'utils/common';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

// Components
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

const VerifyModal = ({ onClose, onResponse }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [formObj, setFormObj] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const response = await verify(formObj);

    setLoading(false);

    if (response.error) {
      onResponse({
        message: response.error.message,
      });
    } else {
      onResponse(
        { ...formObj, nameAtBank: response.nameAtBank },
        response.accountExists,
      );
    }
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'name':
        error = nameValidation('Name', value, true, true);
        break;

      case 'vpa':
        error = vpaValidation(value);
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS) || loading;

  return (
    <Modal $maxWidth="384" open>
      <ModalHeader>
        Verify UPI VPA{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_VerifyUPIVPA_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <TestEnvironmentAlert />
            <Form.Input
              fluid
              name="vpa"
              label="VPA"
              placeholder="Ex. johndoe@okhdfcbank"
              error={errorObj.vpa}
              value={formObj.vpa}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              placeholder="Name"
              name="name"
              label={
                <Text color="bodyLight" className="mb-1">
                  Account Holder Name <Label size="mini">Optional</Label>
                </Text>
              }
              error={errorObj.name}
              value={formObj.name}
              onChange={handleChange}
            />
            <StyledRateBanner className="p-1  mt-2">
              <Text color="warning">
                {formatAmount(freeCreditRates.UPIDETAILS_VALIDATION)} will be
                deducted from your available balance
              </Text>
            </StyledRateBanner>
            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_VerifyUPIVPA_SecondaryButton"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                loading={loading}
                data-event-name="Form_VerifyUPIVPA_PrimaryButton"
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
  onResponse: PropTypes.func,
};

export default VerifyModal;
