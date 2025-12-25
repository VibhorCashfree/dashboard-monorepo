import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import RGCPitchPage from 'containers/RGCPitchPage';

const ReverseGeocoding = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader>Reverse Geocoding</PageHeader>
      <MetaTags title="Secure ID – Reverse Geocoding" />

      <RGCPitchPage />
    </>
  );
};

export default ReverseGeocoding;
