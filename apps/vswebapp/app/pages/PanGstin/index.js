import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import PANGstinPitchPage from 'containers/PANGstinPitchPage';

const PanGstin = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader>PAN to GSTIN</PageHeader>
      <MetaTags title="Secure ID – PAN to GSTIN" />

      <PANGstinPitchPage />
    </>
  );
};

export default PanGstin;
