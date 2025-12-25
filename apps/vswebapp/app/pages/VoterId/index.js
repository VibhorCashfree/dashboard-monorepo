import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import VoterIdPitchPage from 'containers/VoterIdPitchPage';

const VoterId = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader>Voter ID</PageHeader>
      <MetaTags title="Secure ID – Voter ID" />

      <VoterIdPitchPage />
    </>
  );
};

export default VoterId;
