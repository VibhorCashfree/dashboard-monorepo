import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import RPDPitchPage from 'containers/RPDPitchPage';

const BankAccountRPD = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader embedKey="Bank Account using UPI">
        Reverse Penny Drop
      </PageHeader>
      <MetaTags title="Secure ID – Reverse Penny Drop" />

      <RPDPitchPage />
    </>
  );
};

export default BankAccountRPD;
