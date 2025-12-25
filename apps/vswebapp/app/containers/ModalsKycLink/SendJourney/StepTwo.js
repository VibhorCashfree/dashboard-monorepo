import React, { useState } from 'react';
import {
  Button,
  Space,
  Text,
  UploadFile,
  SampleFileDropdown,
  RadioButton,
  Conditional,
  Form,
  toast,
  Label,
} from '@cashfree-intl/coherent';
import PropTypes from 'prop-types';
import _get from 'lodash/get';

// Styles
import { Divider } from 'styled/common';

// Components
import Icon from 'components/Icon';

// Constants
import { checkList } from './constants';
import { FORMATS } from 'constants/date';

// Helpers
import { getChannels, getExpiryDate, getFormObj } from './helpers';

// Services
import { sendKycForm, sendKycLink } from 'services/forms';

// Utils
import {
  emailValidation,
  phoneNumberValidation,
  nameValidation,
} from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';

const StepTwo = ({
  setStep,
  formData,
  setFormData,
  downloadSampleFile,
  onResponse,
  onClose,
  setFetchCounter,
}) => {
  const [mode, setMode] = useState('batch');
  const [errorObj, setErrorObj] = useState({});

  const handleFileUpload = response => {
    if (response.file) {
      setFormData(formData => ({
        ...formData,
        file: response.file,
      }));
    } else {
      setFormData(formData => ({
        ...formData,
        file: '',
      }));
    }
  };

  const handleSendKycForm = async () => {
    const expiryDateStr = getExpiryDate(formData.dateOptions);
    const channelStatus = getChannels(formData.channels);
    const formObj = getFormObj(formData, expiryDateStr, channelStatus, mode);

    const response =
      mode === 'batch'
        ? await sendKycForm(formObj)
        : await sendKycLink(formObj);

    if (!response.error) {
      if (mode === 'batch') {
        onResponse(response);
      } else {
        toast.success('KYC Link sent successfully');
        onClose();
        setFetchCounter();
      }
    }
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'phone':
        error = phoneNumberValidation(value);
        break;

      case 'email':
        error = emailValidation(value);
        break;

      case 'name':
        error = nameValidation('Name', value, true, true);
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  };

  const isDisabled =
    mode === 'batch'
      ? !formData.file
      : !isFormValid(formData, errorObj, ['phone']);

  return (
    <div>
      <Space direction="column" gap={2} className="p-3 pt-4">
        <div>
          <RadioButton
            key="batch"
            label="Upload Customer File"
            name="batch"
            value="batch"
            checked={mode === 'batch'}
            onClick={() => setMode('batch')}
          />
          <Conditional if={mode === 'batch'}>
            <Space direction="column" gap={1} className="pt-1 px-4">
              <Text variant="b14" color="bodyLight">
                Ensure that the file you are uploading is as per the format in
                the sample file.
              </Text>

              <SampleFileDropdown
                className="mr-2"
                onDownloadClick={downloadSampleFile}
              />

              <UploadFile
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                sizeLimit={512000}
                checkList={checkList}
                onChange={response => handleFileUpload(response)}
              />
            </Space>
          </Conditional>
        </div>

        <div>
          <RadioButton
            key="single"
            label="Verify Single User"
            name="single"
            value="single"
            checked={mode === 'single'}
            onClick={() => setMode('single')}
          />
          <Conditional if={mode === 'single'}>
            <Space direction="column" gap={1} className="pt-1 px-4">
              <Form>
                <Form.Input
                  fluid
                  name="phone"
                  label="Phone"
                  placeholder="Ex. 7014543220"
                  error={errorObj.phone}
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ width: '280px' }}
                />

                <Form.Input
                  fluid
                  name="email"
                  label={
                    <Text color="bodyLight" className="mb-1">
                      Email <Label size="mini">Optional</Label>
                    </Text>
                  }
                  placeholder="Ex. john.doe@example.com"
                  error={errorObj.email}
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: '280px' }}
                />

                <Form.Input
                  fluid
                  name="name"
                  label={
                    <Text color="bodyLight" className="mb-1">
                      Name <Label size="mini">Optional</Label>
                    </Text>
                  }
                  placeholder="John Doe"
                  error={errorObj.name}
                  value={formData.name}
                  onChange={handleChange}
                  style={{ width: '280px' }}
                />
              </Form>
            </Space>
          </Conditional>
        </div>
      </Space>

      <Divider contain />

      <Space
        alignItems="center"
        justifyContent="space-between"
        className="px-4 pb-3"
      >
        <Space className="pointer" onClick={() => setStep(1)}>
          <Icon name="chevron-left" />

          <Text as="a" className="link ml-1">
            Back
          </Text>
        </Space>

        <Button disabled={isDisabled} primary onClick={handleSendKycForm}>
          Send KYC Link
        </Button>
      </Space>
    </div>
  );
};

StepTwo.propTypes = {
  formData: PropTypes.object.isRequired,
  setStep: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  downloadSampleFile: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default StepTwo;
