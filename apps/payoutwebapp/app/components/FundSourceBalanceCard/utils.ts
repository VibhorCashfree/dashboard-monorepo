// Constants
import { CURRENCY } from 'constants/common';
import { FS_DISPLAY_TYPE } from 'constants/fundSources';

// Utils
import { formatAmount } from 'utils/common';

export const getBalanceMeta = ({
  fsDisplayType,
  currency,
  isConnected,
  accountHolderName,
  data,
}: {
  fsDisplayType: FS_DISPLAY_TYPE;
  currency: CURRENCY;
  isConnected: boolean;
  accountHolderName: string;
  data: any;
}) => {
  if (!data) {
    return {};
  }

  const isNegative = Number(data.balance) < 0;

  switch (fsDisplayType) {
    case FS_DISPLAY_TYPE.CASHFREE_WALLET:
      return {
        'Account Balance': formatAmount(
          isNegative ? 0 : data.balance,
          currency,
        ),
        'Funds on Hold': formatAmount(data.fundsOnHold, currency),
        'Overdraft Balance': formatAmount(
          isNegative
            ? Number(data.overdraft) + Number(data.balance)
            : data.overdraft,
          currency,
        ),
      };

    case FS_DISPLAY_TYPE.CONNECTED_WALLET:
      return {
        'Account Balance': formatAmount(
          isNegative ? 0 : data.balance,
          currency,
        ),
        'Funds on Hold': formatAmount(data.fundsOnHold, currency),
      };
  }

  if (isConnected) {
    return {
      'Account Name': accountHolderName,
    };
  }

  return {};
};
