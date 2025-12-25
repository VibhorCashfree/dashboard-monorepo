import React from 'react';
import { AccountSwitcher } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useAccount } from 'providers/AccountProvider';

const AccountSwitcherModal: React.FC = () => {
  const { accountList } = useMerchant();
  const { accountInfo, openSwitch, setOpenSwitch, handleAccountSelect } =
    useAccount();

  const activeAccountId = _get(accountInfo, 'id', '');

  return openSwitch ? (
    <AccountSwitcher
      open
      activeAccountId={activeAccountId}
      accountList={accountList}
      onSelect={handleAccountSelect}
      onClose={() => setOpenSwitch(false)}
    />
  ) : null;
};

export default withErrorBoundary(AccountSwitcherModal);
