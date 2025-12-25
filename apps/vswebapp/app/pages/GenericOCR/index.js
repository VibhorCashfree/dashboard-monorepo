import React from 'react';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import GenericOCRPitchPage from 'containers/GenericOCRPitchPage';

const GenericOCR = () => (
  <>
    <PageHeader>Smart OCR</PageHeader>
    <MetaTags title="Secure ID – Smart OCR" />

    <GenericOCRPitchPage />
  </>
);

export default GenericOCR;
