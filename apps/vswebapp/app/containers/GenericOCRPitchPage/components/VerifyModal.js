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
  RadioButton,
  Dropdown,
  Conditional,
  InputField,
  Checkbox,
} from '@cashfree-intl/coherent';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';
import _get from 'lodash/get';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Constants
import {
  CHECKLIST,
  FILE_TYPE,
  REQUIRED_FIELDS,
  DOCUMENT_OPTIONS,
  FREE_CREDIT_RATES,
  FILE_UPLOAD_MODE,
} from '../constants';

// Services
import { verify } from 'services/generic-ocr';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

// Utils
import isFormValid from 'utils/isFormValid';
import { formatAmount } from 'utils/common';

const VerifyModal = ({ onClose, onVerify }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [mode, setMode] = useState(FILE_UPLOAD_MODE.FILE);
  const [formObj, setFormObj] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append('document_type', formObj.document_type);
    formData.append(mode, formObj[mode]);
    formData.append('do_verification', checked);

    const response = await verify(formData);

    setLoading(false);

    if (!response.error) {
      onVerify(_get(response, 'status'), response);
    } else {
      onVerify('UNABLE_TO_VALIDATE', {
        message: _get(response, 'error.message'),
      });
    }
  };

  const disabled =
    !isFormValid(_pickBy(formObj, _identity), _pickBy(errorObj, _identity), [
      ...REQUIRED_FIELDS,
      mode,
    ]) || loading;

  return (
    <Modal $maxWidth="460" open>
      <ModalHeader>
        <Space justifyContent="space-between" alignItems="center">
          <Text variant="h20">Verify Smart OCR</Text>
          <Cross
            onClick={onClose}
            data-event-name="Form_VerifyGenericOCR_Icon_Close"
          />
        </Space>
      </ModalHeader>
      <ModalContent>
        <Space direction="column" gap={2}>
          <Space direction="column" gap={1}>
            <Text color="bodyLight">Document Type</Text>
            <Dropdown
              onChange={(e, { value }) =>
                setFormObj(prev => ({
                  ...prev,
                  document_type: value,
                }))
              }
              placeholder="Select Document Type"
              options={DOCUMENT_OPTIONS}
              selection
              icon="chevron down"
            />
          </Space>
          <Space direction="column" gap={1} fullWidth>
            <Text color="bodyLight">Upload</Text>
            <Space gap={3} fullWidth>
              {Object.keys(FILE_UPLOAD_MODE).map(uploadType => (
                <RadioButton
                  key={FILE_UPLOAD_MODE[uploadType]}
                  label={
                    FILE_UPLOAD_MODE[uploadType] === FILE_UPLOAD_MODE.FILE
                      ? 'Document'
                      : 'URL'
                  }
                  name={FILE_UPLOAD_MODE[uploadType]}
                  value={FILE_UPLOAD_MODE[uploadType]}
                  checked={mode === FILE_UPLOAD_MODE[uploadType]}
                  onClick={() => {
                    setMode(FILE_UPLOAD_MODE[uploadType]);
                    setFormObj(prev => ({
                      ...prev,
                      [FILE_UPLOAD_MODE[uploadType]]: '',
                    }));
                  }}
                />
              ))}
            </Space>
            <Conditional if={mode === FILE_UPLOAD_MODE.FILE}>
              <Space direction="column" gap={1}>
                <UploadFile
                  type="secondary"
                  fileLabel="Upload"
                  buttonText="Upload"
                  sizeLimit={5120000}
                  accept={FILE_TYPE}
                  checkList={CHECKLIST}
                  onError={error =>
                    setErrorObj(prev => ({ ...prev, file: error }))
                  }
                  onChange={response =>
                    setFormObj(prev => ({ ...prev, file: response.file }))
                  }
                />
                <Text color="bodyLight">
                  Ensure to upload the side that has the details printed.
                </Text>
              </Space>
            </Conditional>
            <Conditional if={mode === FILE_UPLOAD_MODE.URL}>
              <Space direction="column" gap={1} fullWidth>
                <InputField
                  name={FILE_UPLOAD_MODE.URL}
                  placeholder="Enter URL"
                  value={formObj.file_url}
                  onChange={(e, { value }) =>
                    setFormObj(prev => ({ ...prev, file_url: value }))
                  }
                  fluid
                />
              </Space>
            </Conditional>
          </Space>
          <Conditional if={formObj.document_type === 'PAN'}>
            <Checkbox
              label="Run data extraction followed by verification."
              onClick={() => setChecked(!checked)}
              checked={checked}
            />
          </Conditional>
          <Conditional if={formObj?.document_type}>
            <StyledRateBanner className="p-1">
              <Text color="warning">
                {formatAmount(
                  freeCreditRates[FREE_CREDIT_RATES[(formObj?.document_type)]],
                )}{' '}
                will be deducted from your available balance
              </Text>
            </StyledRateBanner>
          </Conditional>
        </Space>
        <BtnContainer>
          <Button
            as="a"
            link
            onClick={onClose}
            data-event-name="Form_VerifyGenericOCR_SecondaryButton"
          >
            Cancel
          </Button>
          <Button
            primary
            className="ml-4"
            onClick={handleSubmit}
            disabled={disabled}
            loading={loading}
            data-event-name="Form_VerifyGenericOCR_SecondaryButton"
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
