import React from 'react';
import moment from 'moment';
import { Space, Paper, Text, Popup } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { FORMATS } from 'constants/date';

// Providers
import { useDetails } from 'containers/FundSourceDetails/providers';

// Components
import Icon from 'components/Icon';
import Copy from 'components/Copy';
import StatusLabel from 'components/StatusLabel';

const Aggregator: React.FC = () => {
  const { details } = useDetails();

  return (
    <Paper className="mb-3">
      <Space justifyContent="space-between">
        <div>
          <Space gap={6} className="mb-3">
            <div>
              <Text color="bodyLight" className="mb-1">
                Reference Name
              </Text>
              <Text variant="h16" className="text-ellipsis">
                {details.displayName || '–'}
              </Text>
            </div>
            <div>
              <Text color="bodyLight" className="mb-1">
                Reference ID
                <Popup
                  position="right center"
                  content="Unique identifier for the fund source. You need to use this while making payouts via API and bulk transfers."
                  trigger={
                    <span>
                      <Icon
                        name="info"
                        className="pointer ml-1"
                        verticalAlign="top"
                      />
                    </span>
                  }
                />
              </Text>
              <Text variant="h16">
                {details.paymentInstrumentId}
                <Copy value={details.paymentInstrumentId} />
              </Text>
            </div>
            <div>
              <Text color="bodyLight" className="mb-1">
                Type
              </Text>
              <Text variant="h16">Bank Account</Text>
            </div>
            <div>
              <Text color="bodyLight" className="mb-1">
                Added At
              </Text>
              <Text className="text-wrap">
                {moment(details.addedOn).format(FORMATS.TIMESTAMP)}
              </Text>
            </div>
            <div>
              <Text color="bodyLight" className="mb-1">
                Added By
              </Text>
              <Text className="text-wrap">{details.merchantName || '–'}</Text>
            </div>
          </Space>
          <Space gap={6}>
            <div>
              <Text color="bodyLight" className="mb-1">
                A/c No.
              </Text>
              <Text className="text-wrap">{details.bankAccount}</Text>
            </div>
          </Space>
        </div>
        <Space gap={4}>
          <div className="text-right">
            <StatusLabel className="mb-1" filled>
              {details.status}
            </StatusLabel>
          </div>
        </Space>
      </Space>
    </Paper>
  );
};

export default withErrorBoundary(Aggregator);
