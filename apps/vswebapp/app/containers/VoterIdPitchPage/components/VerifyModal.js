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
  Label,
  Space,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import { nameValidation, voterIdValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { formatAmount } from 'utils/common';

// Services
import { verify } from 'services/voterId';

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

    if (!response.error) {
      onVerify(_get(response, 'status'), response);
    }
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'epic_number':
        error = voterIdValidation(value);
        break;

      case 'name':
        error = nameValidation('Name', value, true, true);
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS) || loading;

  return (
    <Modal $maxWidth="384" open>
      <ModalHeader>
        Verify Voter ID{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_VerifyVoterID_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <TestEnvironmentAlert />
            <Space direction="column" gap={3}>
              <Form.Input
                className="m-0"
                fluid
                name="epic_number"
                label="Voter ID Number"
                placeholder="Ex. XXX0000000"
                error={errorObj.epic_number}
                value={formObj.epic_number}
                onChange={handleChange}
              />

              <Form.Input
                fluid
                name="name"
                label={
                  <Text color="bodyLight" className="mb-1">
                    Name on Voter ID <Label size="mini">Optional</Label>
                  </Text>
                }
                placeholder="Name"
                error={errorObj.name}
                value={formObj.name}
                onChange={handleChange}
                className=""
              />
            </Space>

            <StyledRateBanner className="p-1  mt-2">
              <Text color="warning">
                {formatAmount(freeCreditRates.VOTER_ID)} will be deducted from
                your available balance
              </Text>
            </StyledRateBanner>
            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_VerifyVoterID_SecondaryButton"
              >
                Cancel
              </Button>
              <Button
                primary
                className="ml-4"
                type="submit"
                disabled={disabled}
                loading={loading}
                data-event-name="Form_VerifyVoterID_PrimaryButton"
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
