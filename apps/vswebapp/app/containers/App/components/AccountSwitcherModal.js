import React, { useContext } from 'react';
import { AccountSwitcher } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

const AccountSwitcherModal = () => {
  const { accountList } = useContext(MerchantContext);
  const {
    accountInfo,
    openSwitch,
    setOpenSwitch,
    handleAccountSelect,
  } = useContext(AccountContext);

  const activeAccountId = _get(accountInfo, 'id', '');

  return (
    openSwitch && (
      <AccountSwitcher
        open
        activeAccountId={activeAccountId}
        accountList={accountList}
        onSelect={handleAccountSelect}
        onClose={() => setOpenSwitch(false)}
      />
    )
  );
};

export default AccountSwitcherModal;
