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
import { verify } from 'services/face-liveness';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

// Components
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

// Utils
import isFormValid from 'utils/isFormValid';
import { formatAmount } from 'utils/common';

const VerifyModal = ({ onClose, onVerify }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [formObj, setFormObj] = useState({ strict_check: false });
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append('image', formObj.image);

    const response = await verify(formData);

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
    <Modal $maxWidth="500" open>
      <ModalHeader>
        <Space justifyContent="space-between" alignItems="center">
          <Text variant="h20">Check Face Liveness</Text>
          <Cross
            onClick={onClose}
            data-event-name="Form_Liveliness_Icon_Close"
          />
        </Space>
      </ModalHeader>
      <ModalContent>
        <TestEnvironmentAlert />
        <Space direction="column" gap={3}>
          <UploadFile
            type="secondary"
            fileLabel="Upload"
            buttonText="Upload Image"
            sizeLimit={10000000}
            accept={FILE_TYPE}
            checkList={CHECKLIST}
            onError={error => setErrorObj(prev => ({ ...prev, image: error }))}
            onChange={response =>
              setFormObj(prev => ({ ...prev, image: response.file }))
            }
          />
        </Space>
        <StyledRateBanner className="p-1 mt-2">
          <Text color="warning">
            {formatAmount(freeCreditRates.FACE_LIVENESS)} will be deducted from
            your available balance
          </Text>
        </StyledRateBanner>
        <BtnContainer>
          <Button
            as="a"
            link
            onClick={onClose}
            data-event-name=" Form_Liveliness_SecondaryButton"
          >
            Cancel
          </Button>
          <Button
            data-event-name=" Form_Liveliness_PrimaryButton"
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
