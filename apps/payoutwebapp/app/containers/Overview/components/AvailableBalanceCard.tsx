import React from 'react';
import { Paper, Space, Text, Button } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Styled
import { Divider } from 'styled/common';

// Types
import type { AvailableBalanceCardProps } from '../types';

const AvailableBalanceCard: React.FC<AvailableBalanceCardProps> = ({
  showBalance,
  availableBalance,
  balanceMeta,
  onRecharge,
}) => (
  <Paper style={{ width: 327 }}>
    <Space justifyContent="space-between" alignItems="center" className="mb-1">
      <Text color="bodyLight">Available Balance</Text>

      {onRecharge && (
        <Button
          data-event-name="Primary_Button"
          secondary
          size="small"
          onClick={onRecharge}
        >
          Recharge
        </Button>
      )}
    </Space>

    <Text className="my-1" variant="h28">
      {availableBalance || '–'}
    </Text>
    {showBalance && (
      <Text variant="b12" color="bodyLight">
        (Account Balance - Funds on Hold + Overdraft)
      </Text>
    )}
    <Divider contain />
    <div style={{ minHeight: 100 }}>
      {availableBalance ? (
        Object.keys(balanceMeta).map((key: string) => (
          <Space
            justifyContent="space-between"
            alignItems="flex-start"
            className="mb-2"
            key={key}
          >
            <Text variant="b12" color="bodyLight">
              {key}
            </Text>
            <span>{balanceMeta[key]}</span>
          </Space>
        ))
      ) : (
        <Text color="warning">
          Bank is currently unable to update us the account balance details.
          Please try again after some time.
        </Text>
      )}
    </div>
  </Paper>
);

export default withErrorBoundary(AvailableBalanceCard);
