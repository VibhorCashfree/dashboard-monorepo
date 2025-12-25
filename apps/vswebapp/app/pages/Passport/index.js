import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import BatchPassport from 'containers/BatchPassport';
import BatchPassportDetails from 'containers/BatchPassportDetails';
import BatchPassportSingleDetails from 'containers/BatchPassportSingleDetails';

const Passport = () => {
  return (
    <ListProvider>
      <BatchDetailsProvider>
        <PageHeader>Passport - Batch</PageHeader>
        <MetaTags title="Secure ID – Passport" />
        <Routes>
          <Route exact path="/" element={<BatchPassport />} />
          <Route
            exact
            path="/details/:fileId/:referenceId"
            element={<BatchPassportSingleDetails />}
          />
          <Route path="batch/:id/details" element={<BatchPassportDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BatchDetailsProvider>
    </ListProvider>
  );
};

export default Passport;
