import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import NameMatchPitchPage from 'containers/NameMatchPitchPage';

const NameMatch = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader>Name Match</PageHeader>
      <MetaTags title="Secure ID – Name Match" />

      <NameMatchPitchPage />
    </>
  );
};

export default NameMatch;
