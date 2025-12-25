import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import FaceLivenessPitchPage from 'containers/FaceLivenessPitchPage';

const FaceLiveness = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader>Face Liveness Check</PageHeader>
      <MetaTags title="Secure ID – Face Liveness Check" />

      <FaceLivenessPitchPage />
    </>
  );
};

export default FaceLiveness;
