import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import BatchRC from 'containers/BatchRC';
import BatchRCDetails from 'containers/BatchRCDetails';
import BatchRCSingleDetails from 'containers/BatchRCSingleDetails';

const RC = () => {
  return (
    <ListProvider>
      <BatchDetailsProvider>
        <PageHeader embedKey="RC">Vehicle RC - Batch</PageHeader>
        <MetaTags title="Secure ID – RC" />
        <Routes>
          <Route exact path="/" element={<BatchRC />} />
          <Route
            exact
            path="/details/:fileId/:referenceId"
            element={<BatchRCSingleDetails />}
          />
          <Route path="batch/:id/details" element={<BatchRCDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BatchDetailsProvider>
    </ListProvider>
  );
};

export default RC;
