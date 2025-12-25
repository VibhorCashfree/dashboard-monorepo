import { formatAmount } from 'utils/common';

export const getBalanceMeta = data => {
  const isNegative = Number(data.balance) < 0;

  return {
    'Account Balance': formatAmount(isNegative ? 0 : data.balance),
    'Funds on Hold': formatAmount(data.fundsOnHold),
    'Overdraft Balance': formatAmount(
      isNegative
        ? Number(data.overdraft) + Number(data.balance)
        : data.overdraft,
    ),
  };
};
