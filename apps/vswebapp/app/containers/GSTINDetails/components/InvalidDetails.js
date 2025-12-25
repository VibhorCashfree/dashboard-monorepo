import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@cashfree-intl/coherent';

// Styled
import { DetailsRow } from 'styled/common';

const InvalidDetails = ({ cancellationDate, message }) => (
  <DetailsRow>
    <div>
      <Text color="bodyLight">Cancellation Date</Text>
    </div>
    <div className="text-wrap">{cancellationDate || '–'}</div>
    <div>
      <Text color="bodyLight">Message</Text>
    </div>
    <div>{message}</div>
  </DetailsRow>
);

InvalidDetails.propTypes = {
  cancellationDate: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default InvalidDetails;
