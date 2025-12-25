import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import FaceMatchPitchPage from 'containers/FaceMatchPitchPage';

const FaceMatch = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader>Face Match</PageHeader>
      <MetaTags title="Secure ID – Face Match" />

      <FaceMatchPitchPage />
    </>
  );
};

export default FaceMatch;
