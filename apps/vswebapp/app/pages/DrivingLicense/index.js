import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import BatchDL from 'containers/BatchDL';
import BatchDLDetails from 'containers/BatchDLDetails';
import BatchDLSingleDetails from 'containers/BatchDLSingleDetails';

const DL = () => {
  return (
    <ListProvider>
      <BatchDetailsProvider>
        <PageHeader>Driving License - Batch</PageHeader>
        <MetaTags title="Secure ID – Driving License" />
        <Routes>
          <Route exact path="/" element={<BatchDL />} />
          <Route
            exact
            path="/details/:fileId/:referenceId"
            element={<BatchDLSingleDetails />}
          />
          <Route path="batch/:id/details" element={<BatchDLDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BatchDetailsProvider>
    </ListProvider>
  );
};

export default DL;
