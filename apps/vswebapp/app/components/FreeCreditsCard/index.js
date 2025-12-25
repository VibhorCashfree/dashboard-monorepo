import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Text, Space } from '@cashfree-intl/coherent';

// Components
import StatusLabel from 'components/StatusLabel';

// Utils
import Env from 'utils/env';

export const FreeCreditsCard = ({ freeCredits }) => {
  if (Env.isTest() || !freeCredits.valid) {
    return null;
  }

  return (
    <Paper style={{ width: 327 }}>
      <Space direction="column" gap={1}>
        <div>
          <StatusLabel filled>AVAILABLE_FREE_CREDITS</StatusLabel>
        </div>
        <Text variant="h28">
          {freeCredits.amount}
          <Text as="span" variant="b14" className="ml-1">
            credits
          </Text>
        </Text>

        <Text color="bodyLight">
          Use the trial balance to test KYC services.
        </Text>
        <Space gap={2} className="mt-1">
          <Text>BAV</Text>
          <Text>UPI</Text>
          <Text>Aadhaar</Text>
          <Text>PAN</Text>
          <Text>GSTIN</Text>
        </Space>
      </Space>
    </Paper>
  );
};

FreeCreditsCard.propTypes = {
  freeCredits: PropTypes.object.isRequired,
};

const mapStateToProps = ({ freeCredits }) => ({ freeCredits });

const withConnect = connect(mapStateToProps);

export default withConnect(FreeCreditsCard);
