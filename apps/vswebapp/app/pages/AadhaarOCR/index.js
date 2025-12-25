import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import AadhaarPitchPage from 'containers/AadhaarPitchPage';

const AadhaarOCR = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader>Aadhaar OCR</PageHeader>
      <MetaTags title="Secure ID – Aadhaar OCR" />

      <AadhaarPitchPage />
    </>
  );
};

export default AadhaarOCR;
