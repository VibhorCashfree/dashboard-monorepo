import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Space,
  Checkbox,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Services
import {
  requestVerificationTypes,
  getDigilockerDetails,
} from 'services/digilocker';

// Constants
import { VERIFICATION_TYPES } from '../constants';

// Components
import Icon from 'components/Icon';

// Styled
import { BtnContainer } from 'styled/common';
import { StyledPaper } from '../styled';

const VerifyModal = ({ onClose, onVerify }) => {
  const [verificationTypes, setVerificationTypes] = useState([]);
  const [newTab, setNewTab] = useState();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    const checkTabStatus = async () => {
      if (newTab?.closed) {
        document.getElementsByTagName('body')[0].style.pointerEvents = null;

        const response = await getDigilockerDetails(details.verification_id);

        if (
          _get(response, 'status') === 'AUTHENTICATED' &&
          !!_get(response, 'document_consent', [])
        ) {
          onVerify('ACCESS_ESTABLISHED', response);
        } else {
          onVerify('FAILED_ACCESS');
        }

        clearInterval(intervalId);
      }
    };

    const intervalId = setInterval(checkTabStatus, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [newTab]);

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await requestVerificationTypes({
      document_requested: verificationTypes,
    });

    if (!response.error) {
      setLoading(true);
      const openedTab = window.open(response.url, '_blank');
      setDetails(response);
      setNewTab(openedTab);

      document.getElementsByTagName('body')[0].style.pointerEvents = 'none';
    }
  };

  const handleCheck = type => {
    const checkedProducts = verificationTypes;

    if (verificationTypes.includes(type)) {
      const filteredProducts = checkedProducts.filter(
        product => product !== type,
      );

      setVerificationTypes(filteredProducts);
    } else {
      setVerificationTypes(prev => [...prev, type]);
    }
  };

  const disabled = !verificationTypes.length || loading;

  return (
    <Modal $maxWidth="500" open>
      <ModalHeader>
        <Text variant="h20">Verification Types</Text>
        <Cross onClick={onClose} data-event-name="Form_Digilocker_Icon_Close" />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Text variant="h16">
            Select Verification Types you want to verify through our DigiLocker
            API{' '}
          </Text>
          <Space direction="column" gap={3} className="py-3">
            {VERIFICATION_TYPES.map(type => (
              <StyledPaper onClick={() => handleCheck(type.type)}>
                <Space justifyContent="space-between" alignItems="center">
                  <Space gap={2}>
                    <Icon name={type.icon} />
                    <Text>{type.text}</Text>
                  </Space>
                  <Checkbox
                    checked={verificationTypes.includes(type.type)}
                    data-testid={type.type}
                  />
                </Space>
              </StyledPaper>
            ))}
          </Space>

          <BtnContainer>
            <Button
              as="a"
              link
              onClick={onClose}
              data-event-name="Form_Digilocker_SecondaryButton"
            >
              Cancel
            </Button>
            <Button
              primary
              className="ml-4"
              type="submit"
              disabled={disabled}
              loading={loading}
              data-event-name="Form_Digilocker_PrimaryButton"
              onClick={handleSubmit}
            >
              Verify Now
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

VerifyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onVerify: PropTypes.func,
};

export default VerifyModal;
