import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import BatchPANLite from 'containers/BatchPANLite';
import BatchPANLiteDetails from 'containers/BatchPANLiteDetails';
import BatchPANLiteSingleDetails from 'containers/BatchPANLiteSingleDetails';

const PANLite = () => {
  return (
    <ListProvider>
      <BatchDetailsProvider>
        <PageHeader embedKey="PAN Lite">PAN Lite - Batch</PageHeader>
        <MetaTags title="Secure ID –PAN Lite" />
        <Routes>
          <Route exact path="/" element={<BatchPANLite />} />
          <Route
            exact
            path="/details/:fileId/:referenceId"
            element={<BatchPANLiteSingleDetails />}
          />
          <Route path="batch/:id/details" element={<BatchPANLiteDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BatchDetailsProvider>
    </ListProvider>
  );
};

export default PANLite;
