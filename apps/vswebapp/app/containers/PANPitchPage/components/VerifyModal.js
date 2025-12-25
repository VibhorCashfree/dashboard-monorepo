import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  UploadFile,
  Space,
  Modal,
  ModalHeader,
  ModalContent,
  Cross,
  Button,
} from '@cashfree-intl/coherent';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';
import _get from 'lodash/get';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Constants
import { CHECKLIST, FILE_TYPE, REQUIRED_FIELDS } from '../constants';

// Services
import { verifyOcr } from 'services/PAN';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

// Utils
import isFormValid from 'utils/isFormValid';
import { formatAmount } from 'utils/common';

const VerifyModal = ({ onClose, onVerify }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [formObj, setFormObj] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append('frontImage', formObj.frontImage);

    const response = await verifyOcr(formData);

    setLoading(false);

    if (!response.error) {
      onVerify(_get(response, 'status'), response);
    }
  };

  const disabled =
    !isFormValid(
      _pickBy(formObj, _identity),
      _pickBy(errorObj, _identity),
      REQUIRED_FIELDS,
    ) || loading;

  return (
    <Modal $maxWidth="460" open>
      <ModalHeader>
        <Space justifyContent="space-between" alignItems="center">
          <Text variant="h20">Verify PAN - OCR</Text>
          <Cross
            onClick={onClose}
            data-event-name="Form_VerifyPANOCR_Icon_Close"
          />
        </Space>
      </ModalHeader>
      <ModalContent>
        <UploadFile
          type="secondary"
          fileLabel="Upload PAN"
          buttonText="Upload PAN"
          sizeLimit={512000}
          accept={FILE_TYPE}
          checkList={CHECKLIST}
          onError={error =>
            setErrorObj(prev => ({ ...prev, frontImage: error }))
          }
          onChange={response =>
            setFormObj(prev => ({ ...prev, frontImage: response.file }))
          }
        />
        <Text color="bodyLight" className="mt-2">
          Ensure to upload the side that has the details printed.
        </Text>
        <StyledRateBanner className="p-1 mt-2">
          <Text color="warning">
            {formatAmount(freeCreditRates.PAN_OCR_V)} will be deducted from your
            available balance
          </Text>
        </StyledRateBanner>
        <BtnContainer>
          <Button
            as="a"
            link
            onClick={onClose}
            data-event-name="Form_VerifyPANOCR_SecondaryButton"
          >
            Cancel
          </Button>
          <Button
            primary
            className="ml-4"
            onClick={handleSubmit}
            disabled={disabled}
            loading={loading}
            data-event-name="Form_VerifyPANOCR_SecondaryButton"
          >
            Verify
          </Button>
        </BtnContainer>
      </ModalContent>
    </Modal>
  );
};

VerifyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
};

export default VerifyModal;
