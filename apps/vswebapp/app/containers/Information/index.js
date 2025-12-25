import React from 'react';
import { Text } from '@cashfree-intl/coherent';

// Components
import RegisteredAccountDetails from './components/RegisteredAccountDetails';
import AccountDetailsCard from './components/AccountDetailsCard';

const Information = () => (
  <>
    <Text variant="h16" className="m-0 mt-3">
      Account Details
    </Text>
    <AccountDetailsCard />
    <Text variant="h16" className="m-0 mt-3">
      Registered Bank Account Details
    </Text>
    <Text variant="b12" color="bodyLight" className="mt-1 mb-3">
      Recharges will be accepted from these accounts only.
    </Text>
    <RegisteredAccountDetails />
    <Text variant="p14" color="bodyLight" className="mt-4">
      Write to <a href="mailto:care@cashfree.com">care@cashfree.com</a> to
      update the account details.
    </Text>
  </>
);

export default Information;
