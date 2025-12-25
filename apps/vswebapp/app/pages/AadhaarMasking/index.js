import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import AadhaarMaskingPitchPage from 'containers/AadhaarMaskingPitchPage';

const AadhaarMasking = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader>Aadhaar Masking</PageHeader>
      <MetaTags title="Secure ID – Aadhaar Masking" />

      <AadhaarMaskingPitchPage />
    </>
  );
};

export default AadhaarMasking;
