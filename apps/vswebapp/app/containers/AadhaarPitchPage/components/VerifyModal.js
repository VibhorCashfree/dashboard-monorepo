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
import { verifyOcr } from 'services/okyc';

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
    formData.append('backImage', formObj.backImage);

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
          <Text variant="h20">Verify Aadhaar - OCR</Text>
          <Cross
            onClick={onClose}
            data-event-name="Form_VerifyAadhaarOCR_Icon_Close"
          />
        </Space>
      </ModalHeader>
      <ModalContent>
        <Space direction="column" gap={3}>
          <UploadFile
            type="secondary"
            fileLabel="Upload Aadhaar Frontside"
            buttonText="Upload Frontside"
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
          <UploadFile
            type="secondary"
            fileLabel="Upload Aadhaar Backside"
            buttonText="Upload Backside"
            sizeLimit={512000}
            accept={FILE_TYPE}
            checkList={CHECKLIST}
            onError={error =>
              setErrorObj(prev => ({ ...prev, backImage: error }))
            }
            onChange={response =>
              setFormObj(prev => ({ ...prev, backImage: response.file }))
            }
          />
        </Space>
        <StyledRateBanner className="p-1 mt-2">
          <Text color="warning">
            {formatAmount(freeCreditRates.AADHAAR_OCR_V)} will be deducted from
            your available balance
          </Text>
        </StyledRateBanner>
        <BtnContainer>
          <Button
            as="a"
            link
            onClick={onClose}
            data-event-name=" Form_VerifyAadhaarOCR_SecondaryButton"
          >
            Cancel
          </Button>
          <Button
            data-event-name=" Form_VerifyAadhaarOCR_PrimaryButton"
            primary
            className="ml-4"
            onClick={handleSubmit}
            disabled={disabled}
            loading={loading}
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
