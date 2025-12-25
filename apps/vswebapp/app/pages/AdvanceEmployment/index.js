import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import AdvEmploymentPitchPage from 'containers/AdvEmploymentPitchPage';

const RC = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader>Employment 360</PageHeader>
      <MetaTags title="Secure ID – Employment 360" />

      <AdvEmploymentPitchPage />
    </>
  );
};

export default RC;
