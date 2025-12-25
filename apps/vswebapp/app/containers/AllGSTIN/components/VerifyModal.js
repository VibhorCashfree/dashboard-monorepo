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
  Label,
  Form,
} from '@cashfree-intl/coherent';

// Services
import { verify } from 'services/GSTIN';

// Utils
import { gstInValidation, nameValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { formatAmount } from 'utils/common';

// Providers
import { AccountContext } from 'providers/AccountProvider';

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

    const response = await verify({ ...formObj, source: 'DASHBOARD' });

    setLoading(false);

    onResponse(response);
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'businessName':
        error = nameValidation('Business Name', value, true, true);
        break;

      case 'gstIn':
        error = gstInValidation(value);
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS) || loading;

  return (
    <Modal $maxWidth="384" open>
      <ModalHeader>
        Verify GSTIN{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_VerifyGSTIN_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <TestEnvironmentAlert />
            <Form.Input
              className="m-0"
              fluid
              name="gstIn"
              label="GSTIN"
              placeholder="Ex. 18AABCU9603R1ZM"
              error={errorObj.gstIn}
              value={formObj.gstIn}
              onChange={handleChange}
            />

            <Form.Input
              fluid
              className="mt-3"
              name="businessName"
              label={
                <Text color="bodyLight" className="mb-1">
                  Name of Business <Label size="mini">Optional</Label>
                </Text>
              }
              placeholder="Name of Business"
              error={errorObj.businessName}
              value={formObj.businessName}
              onChange={handleChange}
            />
            <StyledRateBanner className="p-1  mt-2">
              <Text color="warning">
                {formatAmount(freeCreditRates.GSTIN_VERIFICATION)} will be
                deducted from your available balance
              </Text>
            </StyledRateBanner>
            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_VerifyGSTIN_SecondaryButton"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                loading={loading}
                data-event-name="Form_VerifyGSTIN_PrimaryButton"
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
  onResponse: PropTypes.func.isRequired,
};

export default VerifyModal;
