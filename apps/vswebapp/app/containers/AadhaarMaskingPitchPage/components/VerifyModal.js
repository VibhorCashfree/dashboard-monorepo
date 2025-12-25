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
  Checkbox,
} from '@cashfree-intl/coherent';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';
import _get from 'lodash/get';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Constants
import { CHECKLIST, FILE_TYPE, REQUIRED_FIELDS } from '../constants';

// Services
import { verifyAadhaarMasking } from 'services/okyc';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

// Components
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

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

    formData.append('aadhaar_image', formObj.aadhaar_image);

    const response = await verifyAadhaarMasking(formData);

    setLoading(false);

    if (!response.error) {
      onVerify(response?.status, response);
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
          <Text variant="h20">Mask Aadhaar</Text>
          <Cross
            onClick={onClose}
            data-event-name="Form_MaskAadhaar_Icon_Close"
          />
        </Space>
      </ModalHeader>
      <ModalContent>
        <TestEnvironmentAlert />
        <Text className="mb-2">Upload Aadhaar to be masked</Text>
        <Space direction="column" gap={3}>
          <UploadFile
            type="secondary"
            fileLabel="Upload"
            buttonText="Upload Aadhaar"
            sizeLimit={10000000}
            accept={FILE_TYPE}
            checkList={CHECKLIST}
            onError={error =>
              setErrorObj(prev => ({ ...prev, aadhaar_image: error }))
            }
            onChange={response =>
              setFormObj(prev => ({ ...prev, aadhaar_image: response.file }))
            }
          />
        </Space>
        <StyledRateBanner className="p-1 mt-2">
          <Text color="warning">
            {formatAmount(freeCreditRates.AADHAAR_MASKING)} will be deducted
            from your available balance
          </Text>
        </StyledRateBanner>
        <BtnContainer>
          <Button
            as="a"
            link
            onClick={onClose}
            data-event-name=" Form_MaskAadhaar_SecondaryButton"
          >
            Cancel
          </Button>
          <Button
            data-event-name=" Form_MaskAadhaar_PrimaryButton"
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
