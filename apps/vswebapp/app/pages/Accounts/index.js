import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import Tabs from './components/Tabs';

const Accounts = () => {
  const { preferences } = useContext(AccountContext);

  const defaultRoute = preferences?.isConnected ? 'connected' : 'summary';

  return (
    <>
      <PageHeader embedKey="ACCOUNTS">Account</PageHeader>
      <MetaTags title="Account" />
      <Routes>
        <Route path=":tabId" element={<Tabs />} />
        <Route path="*" element={<Navigate to={`${defaultRoute}`} replace />} />
      </Routes>
    </>
  );
};

export default withReadPermission(Accounts, {
  code: 2150,
  description: 'access Accounts',
});
