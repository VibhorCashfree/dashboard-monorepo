import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Space,
  Text,
  Form,
  RadioButton,
  Checkbox,
} from '@cashfree-intl/coherent';
import _capitalize from 'lodash/capitalize';

// Constants
import { REQUIRED_FIELDS, CHANNELS } from '../constants';

// Styled
import {
  StyledPreviewModal,
  StyledHeader,
  StyledFooter,
  StyledLabel,
  StyledTextItalic,
} from '../styled';
import { Divider } from 'styled/common';

// Utils
import { getBase64 } from 'utils/common';

const StepOne = ({
  formObj,
  errorObj,
  handleInputChange,
  handleChannelClick,
}) => {
  return (
    <>
      <Text variant="p14" color="bodyLight" className="pb-3">
        Send a verification link for Aadhaar + Video KYC. You’ll need to
        pre-fill the security questions for your customer in step 2.
      </Text>
      <Text variant="h16" className="mb-2" strong>
        Customer Details
      </Text>
      <Form style={{ width: '100%' }}>
        <Space direction="column" gap={2.5}>
          <Form.Input
            label="Full Name"
            value={formObj.name}
            onChange={e => handleInputChange('name', e.target.value)}
            error={errorObj.name}
            className="m-0"
          />
          <Form.Input
            label="Phone Number"
            value={formObj.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
            error={errorObj.phone}
            className="m-0"
          />
          {/* <Form.Input
            label="Email ID"
            value={formObj.email}
            onChange={e => handleInputChange('email', e.target.value)}
            error={errorObj.email}
            className="m-0"
          /> */}

          <Divider contain className="m-0" />

          <Space direction="column" gap={2}>
            <Text variant="h16" strong>
              Verification Steps
            </Text>

            <RadioButton
              label="Aadhaar verification & Video KYC"
              checked
              disabled
            />
            <StyledTextItalic color="info" variant="b12">
              Only security questions are configurable. Aadhaar and Video KYC
              must be completed by the customer.
            </StyledTextItalic>
          </Space>

          <Space direction="column" gap={2}>
            <Text variant="h16" strong>
              Send link to customer via
            </Text>
            <Space gap={2}>
              {CHANNELS.map(channel => (
                <Checkbox
                  label={channel.text}
                  onClick={e => handleChannelClick(channel.key)}
                  checked={formObj.notification_types.includes(channel.key)}
                />
              ))}
            </Space>
          </Space>
        </Space>
      </Form>
    </>
  );
};

StepOne.propTypes = {
  formObj: PropTypes.object.isRequired,
  errorObj: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setErrorObj: PropTypes.func.isRequired,
  colorValues: PropTypes.object.isRequired,
  setColorValues: PropTypes.func.isRequired,
  setFormObj: PropTypes.func.isRequired,
};

export default StepOne;
