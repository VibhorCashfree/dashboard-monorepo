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
  Form,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

// Utils
import { coordinateValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { formatAmount } from 'utils/common';

// Services
import { verify } from 'services/RGC';

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

    const response = await verify(formObj);

    setLoading(false);

    if (!response.error) {
      onVerify(_get(response, 'status'), response);
    }
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'latitude':
      case 'longitude':
        error = coordinateValidation(value);
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS) || loading;

  return (
    <Modal $maxWidth="380" open>
      <ModalHeader>
        Verify Coordinates{' '}
        <Cross onClick={onClose} data-event-name="Form_VerifyRGC_Icon_Close" />
      </ModalHeader>

      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <TestEnvironmentAlert />
            <Form.Input
              className="mb-1"
              fluid
              name="latitude"
              label="Latitude"
              placeholder="Ex. 12.9274477"
              error={errorObj.latitude}
              value={formObj.latitude}
              onChange={handleChange}
            />

            <Form.Input
              fluid
              className="mt-3"
              name="longitude"
              label="Longitude"
              placeholder="Ex. 77.6326542"
              error={errorObj.longitude}
              value={formObj.longitude}
              onChange={handleChange}
            />

            <StyledRateBanner className="p-1  mt-2">
              <Text color="warning">
                {formatAmount(freeCreditRates.REVERSE_GEOCODING)} will be
                deducted from your available balance
              </Text>
            </StyledRateBanner>

            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_VerifyRGC_SecondaryButton"
              >
                Cancel
              </Button>

              <Button
                primary
                className="ml-4"
                type="submit"
                disabled={disabled}
                loading={loading}
                data-event-name="Form_VerifyRGC_PrimaryButton"
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
