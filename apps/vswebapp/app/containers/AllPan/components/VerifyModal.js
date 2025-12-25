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

// Utils
import { nameValidation, panValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { formatAmount } from 'utils/common';

// Services
import { verify } from 'services/PAN';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

// Components
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

const VerifyModal = ({ onClose, onVerify }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [formObj, setFormObj] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const response = await verify(formObj);

    setLoading(false);

    onVerify(response);
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'name':
        error = nameValidation('Pan', value, true, true);
        break;

      case 'pan':
        error = panValidation(value);
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS) || loading;

  return (
    <Modal $maxWidth="460" open>
      <ModalHeader>
        Verify PAN{' '}
        <Cross onClick={onClose} data-event-name="Form_VerifyPAN_Icon_Close" />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <TestEnvironmentAlert />
            <Form.Input
              className=""
              fluid
              name="pan"
              label="PAN"
              placeholder="Ex. ABCP1234A1"
              error={errorObj.pan}
              value={formObj.pan}
              onChange={handleChange}
            />

            <Form.Input
              fluid
              className=""
              name="name"
              label={
                <Text color="bodyLight" className="mb-1">
                  Name <Label size="mini">Optional</Label>
                </Text>
              }
              placeholder="Name"
              error={errorObj.name}
              value={formObj.name}
              onChange={handleChange}
            />
            <StyledRateBanner className="p-1  mt-2">
              <Text color="warning">
                {formatAmount(freeCreditRates.PANDETAILS_VERIFICATION)} will be
                deducted from your available balance
              </Text>
            </StyledRateBanner>
            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_VerifyPAN_SecondaryButton"
              >
                Cancel
              </Button>
              <Button
                primary
                className="ml-4"
                type="submit"
                disabled={disabled}
                loading={loading}
                data-event-name="Form_VerifyPAN_PrimaryButton"
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
