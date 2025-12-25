import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import CINPitchPage from 'containers/CINPitchPage';

const CIN = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader embedKey="CIN">Corporate Identity Verification</PageHeader>
      <MetaTags title="Secure ID – Corporate Identity Verification" />

      <CINPitchPage />
    </>
  );
};

export default CIN;
