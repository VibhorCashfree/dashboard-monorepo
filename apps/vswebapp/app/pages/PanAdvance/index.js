import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import BatchPANAdvance from 'containers/BatchPANAdvance';
import BatchPANAdvanceDetails from 'containers/BatchPANAdvanceDetails';
import BatchPANAdvanceSingleDetails from 'containers/BatchPANAdvanceSingleDetails';

const PANAdvance = () => {
  return (
    <ListProvider>
      <BatchDetailsProvider>
        <PageHeader embedKey="PAN 360">PAN 360 - Batch</PageHeader>
        <MetaTags title="Secure ID –PAN 360" />
        <Routes>
          <Route exact path="/" element={<BatchPANAdvance />} />
          <Route
            exact
            path="/details/:fileId/:referenceId"
            element={<BatchPANAdvanceSingleDetails />}
          />
          <Route
            path="batch/:id/details"
            element={<BatchPANAdvanceDetails />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BatchDetailsProvider>
    </ListProvider>
  );
};

export default PANAdvance;
