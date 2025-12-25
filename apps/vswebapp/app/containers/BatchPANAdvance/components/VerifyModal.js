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

// Components
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import { pan360NameValidation, panValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { formatAmount } from 'utils/common';

// Services
import { verifyPANAdvance } from 'services/pan-advance';

// Constants
import { REQUIRED_FIELDS } from '../constants';

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

    const response = await verifyPANAdvance(formObj);

    setLoading(false);

    onVerify(response);
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'name':
        error = pan360NameValidation(value, true);
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
    <Modal $maxWidth="380" open>
      <ModalHeader>
        Verify PAN 360{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_VerifyPAN360_Icon_Close"
        />
      </ModalHeader>

      <ModalContent>
        <ModalDescription>
          <TestEnvironmentAlert />
          <Form onSubmit={handleSubmit}>
            <Form.Input
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
              className="mt-3"
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
                {formatAmount(freeCreditRates.PAN_ADVANCE)} will be deducted
                from your available balance
              </Text>
            </StyledRateBanner>

            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_VerifyPAN360_SecondaryButton"
              >
                Cancel
              </Button>

              <Button
                primary
                className="ml-4"
                type="submit"
                disabled={disabled}
                loading={loading}
                data-event-name="Form_VerifyPAN360_PrimaryButton"
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
