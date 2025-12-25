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
import { verify } from 'services/face-match';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

// Components
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

// Utils
import isFormValid from 'utils/isFormValid';
import { formatAmount } from 'utils/common';

const VerifyModal = ({ onClose, onVerify }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [formObj, setFormObj] = useState({
    detect_mask_first_image: false,
    detect_mask_second_image: false,
  });
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append('first_image', formObj.first_image);
    formData.append('second_image', formObj.second_image);
    formData.append('detect_mask_first_image', formObj.detect_mask_first_image);
    formData.append(
      'detect_mask_second_image',
      formObj.detect_mask_second_image,
    );

    const response = await verify(formData);

    setLoading(false);

    if (!response.error) {
      onVerify(response);
    }
  };

  const disabled =
    !isFormValid(
      _pickBy(formObj, _identity),
      _pickBy(errorObj, _identity),
      REQUIRED_FIELDS,
    ) || loading;

  return (
    <Modal $maxWidth="500" open>
      <ModalHeader>
        <Space justifyContent="space-between" alignItems="center">
          <Text variant="h20">Verify Selfie</Text>
          <Cross
            onClick={onClose}
            data-event-name="Form_VerifyAadhaarOCR_Icon_Close"
          />
        </Space>
      </ModalHeader>
      <ModalContent>
        <TestEnvironmentAlert />
        <Text className="mb-2">
          Upload Selfie and Government ID which you want to verify
        </Text>
        <Space direction="column" gap={3}>
          <UploadFile
            type="secondary"
            fileLabel="Upload"
            buttonText="Upload Selfie \ Govt ID"
            sizeLimit={10000000}
            accept={FILE_TYPE}
            checkList={CHECKLIST}
            onError={error =>
              setErrorObj(prev => ({ ...prev, first_image: error }))
            }
            onChange={response =>
              setFormObj(prev => ({ ...prev, first_image: response.file }))
            }
          />
          <Checkbox
            label="Detect Mask"
            checked={formObj.detect_mask_first_image}
            onClick={() =>
              setFormObj(prev => ({
                ...prev,
                detect_mask_first_image: !prev.detect_mask_first_image,
              }))
            }
          />
          <UploadFile
            type="secondary"
            fileLabel="Upload"
            buttonText="Upload Selfie \ Govt ID"
            sizeLimit={10000000}
            accept={FILE_TYPE}
            checkList={CHECKLIST}
            onError={error =>
              setErrorObj(prev => ({ ...prev, second_image: error }))
            }
            onChange={response =>
              setFormObj(prev => ({ ...prev, second_image: response.file }))
            }
          />
          <Checkbox
            label="Detect Mask"
            checked={formObj.detect_mask_second_image}
            onClick={() =>
              setFormObj(prev => ({
                ...prev,
                detect_mask_second_image: !prev.detect_mask_second_image,
              }))
            }
          />
        </Space>
        <StyledRateBanner className="p-1 mt-2">
          <Text color="warning">
            {formatAmount(freeCreditRates.FACE_MATCH)} will be deducted from
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
