import React from 'react';
import { Text } from '@cashfree-intl/coherent';
import PropTypes from 'prop-types';

// Components
import Alert from 'components/Alert';

// Utils
import Env from 'utils/env';

const TestEnvironmentAlert = ({
  className = 'mb-2',
  docUrl = 'https://www.cashfree.com/docs/api-reference/vrs/data-to-test-integration',
  customMessage,
  linkText = 'documentation',
  ...alertProps
}) => {
  // Only render in test environment
  if (!Env.isTest()) {
    return null;
  }

  return (
    <Alert
      className={className}
      type="warning"
      bordered
      rounded
      {...alertProps}
    >
      <Alert.Content size="md">
        <Text strong>Test Environment:</Text>
        <Text>
          {customMessage || (
            <>
              Please use only test credentials available in our{' '}
              <a
                href={docUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-event-name="Link"
              >
                {linkText}
              </a>{' '}
              while using our Test Environment or calling our Sandbox APIs.{' '}
            </>
          )}
        </Text>
      </Alert.Content>
    </Alert>
  );
};

TestEnvironmentAlert.propTypes = {
  className: PropTypes.string,
  docUrl: PropTypes.string,
  customMessage: PropTypes.node,
  linkText: PropTypes.string,
};

export default TestEnvironmentAlert;
