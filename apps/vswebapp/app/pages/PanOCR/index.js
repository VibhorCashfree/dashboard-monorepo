import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import PANPitchPage from 'containers/PANPitchPage';

const PANOCR = () => {
  const { preferences } = useContext(AccountContext);

  return (
    <>
      <PageHeader>PAN OCR</PageHeader>
      <MetaTags title="Secure ID – PAN OCR" />

      <PANPitchPage />
    </>
  );
};

export default PANOCR;
