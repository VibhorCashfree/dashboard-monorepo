import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import UPIAdvancePitchPage from 'containers/UPIAdvancePitchPage';

const UPImobile = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader embedKey="UPI_MOBILE">UPI 360</PageHeader>
      <MetaTags title="Secure ID – UPI 360" />

      <UPIAdvancePitchPage />
    </>
  );
};

export default UPImobile;
