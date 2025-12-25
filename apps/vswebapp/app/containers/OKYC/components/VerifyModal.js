import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Text,
  Form,
} from '@cashfree-intl/coherent';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Services
import { sendOTP } from 'services/okyc';

// Utils
import { aadhaarValidation } from 'utils/formValidation';
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

    const response = await sendOTP(formObj);

    setLoading(false);

    if (response.status === 'SUCCESS') {
      onResponse({ ...response, ...formObj, modalType: 'VALID' });
    } else if (response.message === 'Invalid Aadhaar Card') {
      onResponse({ ...response, ...formObj, modalType: 'INVALID' });
    } else if (
      response.message === 'Insufficient balance to process this request.'
    ) {
      onResponse({
        ...response,
        ...formObj,
        modalType: 'INSUFFICIENT_BALANCE',
      });
    }
  };

  const handleChange = (e, { name, value }) => {
    const error = aadhaarValidation(value);

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS) || loading;

  return (
    <Modal $maxWidth="384" open>
      <ModalHeader>
        Verify Aadhaar{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_VerifyAadhaar_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <TestEnvironmentAlert />
            <Form.Input
              fluid
              name="aadhaarNo"
              label="Aadhaar Number"
              placeholder="Ex. XXXXXXXX1234"
              maxLength="12"
              error={errorObj.aadhaarNo}
              value={formObj.aadhaarNo}
              onChange={handleChange}
            />
            <StyledRateBanner className="p-1  mt-2">
              <Text color="warning">
                {formatAmount(freeCreditRates.OFFLINE_AADHAAR_VERIFICATION)}{' '}
                will be deducted from your available balance
              </Text>
            </StyledRateBanner>
            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_VerifyAadhaar_SecondaryButton"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                loading={loading}
                data-event-name="Form_VerifyAadhaar_PrimaryButton"
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
