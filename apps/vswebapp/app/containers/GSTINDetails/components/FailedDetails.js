import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@cashfree-intl/coherent';

// Styled
import { DetailsRow } from 'styled/common';

const FailedDetails = ({ message }) => (
  <DetailsRow>
    <div>
      <Text color="bodyLight">Message</Text>
    </div>
    <div className="text-wrap">{message}</div>
    <div />
    <div />
  </DetailsRow>
);

FailedDetails.propTypes = {
  message: PropTypes.string.isRequired,
};

export default FailedDetails;
