import React from 'react';
import { connect } from 'react-redux';
import { Paper, Text } from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Utils
import { formatAmount } from 'utils/common';
import { getMainAccountBalance } from 'utils/fundSources';

// Constants
import { CURRENCY } from 'constants/common';
import { KNOW_MORE } from 'constants/urls';

// Types
import type { OverdraftLimitCardProps } from '../types';

const OverdraftLimitCard: React.FC<OverdraftLimitCardProps> = ({
  balance,
  accountManager,
  currency,
}) => {
  const isNegative: boolean = Number(balance.availableBalance) < 0;

  return (
    <Paper style={{ width: 327 }}>
      <Text color="bodyLight">Overdraft Limit</Text>
      <Text className="my-1" variant="h28">
        {formatAmount(balance.overdraft, currency as CURRENCY)}
      </Text>
      <Text variant="b12" color="bodyLight">
        This amount cannot be withdrawn{' '}
        <a
          href={KNOW_MORE.ACCOUNT.SUMMARY}
          target="_blank"
          rel="noopener noreferrer"
          data-event-name="Link"
        >
          Know more
        </a>
      </Text>

      {isNegative && (
        <>
          <Text color="bodyLight">Used</Text>
          <Text variant="h16" className="mb-4">
            {formatAmount(
              Math.abs(balance.availableBalance),
              currency as CURRENCY,
            )}
          </Text>
        </>
      )}

      {accountManager ? (
        <Text variant="b12" color="bodyLight" className="mt-3">
          To change Overdraft limit contact your <br /> account manager{' '}
          <a href={`mailto:${accountManager.adminEmail}`}>
            {accountManager.adminEmail}
          </a>
        </Text>
      ) : null}
    </Paper>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  balance: getMainAccountBalance(fundSources),
});

const withConnect = connect(mapStateToProps);

export default withErrorBoundary(withConnect(OverdraftLimitCard));
