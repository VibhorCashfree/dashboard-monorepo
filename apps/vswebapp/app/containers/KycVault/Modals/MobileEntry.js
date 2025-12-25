import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalDescription,
  Space,
  Button,
  toast,
  Cross,
  Form,
  Label,
  Text
} from '@cashfree-intl/coherent';

// Utils
import {
  nameValidation,
  phoneNumberValidation,
} from '../../../utils/formValidation';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

const MobileEntry = ({ onClose, onSubmit }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate name using formValidation utility (only if name is provided)
    if (name.trim()) {
      const nameError = nameValidation('Name', name, false);
      if (nameError) {
        toast.error(nameError);
        return;
      }
    }

    // Validate mobile number using formValidation utility
    const phoneError = phoneNumberValidation(mobileNumber);
    if (phoneError) {
      toast.error(phoneError);
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ name: name.trim(), mobileNumber });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = e => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(value);
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  return (
    <Modal $maxWidth="384" open>
      <ModalHeader>
        Try 1-Click Onboarding
        <Cross onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Space direction="column" gap={0.5}>
              <Form.Input
                fluid
                label="Mobile Number"
                placeholder="Enter 10-digit mobile number"
                value={mobileNumber}
                onChange={handleInputChange}
                type="tel"
                maxLength={10}
              />
              <Form.Input
                fluid
                label={
                  <Text color="bodyLight" className="mb-1">
                    Name <Label size="mini">Optional</Label>
                  </Text>
                }
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
                type="text"
              />
              <StyledRateBanner className="p-1">
                <Text color="warning">
                  Provide name for better results.
                </Text>
              </StyledRateBanner>
            </Space>

            <BtnContainer>
              <Button as="a" link onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="ml-4"
                primary
                disabled={!mobileNumber.trim() || loading}
                loading={loading}
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

MobileEntry.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MobileEntry;
