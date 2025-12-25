import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import MobileAdvancePitchPage from 'containers/MobileAdvancePitchPage';

const MobileAdvance = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader embedKey="UPI_MOBILE">Mobile 360</PageHeader>
      <MetaTags title="Secure ID – Mobile 360" />

      <MobileAdvancePitchPage />
    </>
  );
};

export default MobileAdvance;
