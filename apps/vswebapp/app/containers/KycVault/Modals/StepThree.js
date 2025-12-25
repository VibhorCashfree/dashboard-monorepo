import React from 'react';
import { Form, Space, Text } from '@cashfree-intl/coherent';

const StepThree = ({ formObj, errorObj, handleChange }) => {
  return (
    <Space direction="column" gap={2}>
      <Space direction="column" gap={0.5}>
        <Text variant="b14" strong>
          Redirect URL
        </Text>
        <Text variant="b12" color="bodyLight">
          Enter the URL where users will be redirected after submitting their
          KYC details.
        </Text>
      </Space>
      <Form.Input
        fluid
        name="redirect_urls"
        label="URL"
        error={errorObj?.redirect_urls}
        value={formObj?.redirect_urls}
        className="m-0"
        onChange={handleChange}
      />
    </Space>
  );
};

export default StepThree;
