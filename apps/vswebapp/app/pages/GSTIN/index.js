import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import _last from 'lodash/last';
import _remove from 'lodash/remove';

// Containers
import BatchGSTINDetails from 'containers/BatchGSTINDetails';
import GSTINDetails from 'containers/GSTINDetails';
import BatchGSTINSingleDetails from 'containers/BatchGSTINSingleDetails';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Constants

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import Tabs from './components/Tabs';

const GSTIN = () => {
  return (
    <ListProvider>
      <BatchDetailsProvider>
        <PageHeader>GSTIN</PageHeader>
        <MetaTags title="Secure ID – GSTIN" />

        <>
          <Routes>
            <Route
              path="/details/:fileId/:referenceId"
              element={<BatchGSTINSingleDetails />}
            />
            <Route path=":id/details" element={<GSTINDetails />} />
            <Route path="batch/:id/details" element={<BatchGSTINDetails />} />
            <Route path=":tabId" element={<Tabs />} />
            <Route path="*" element={<Navigate to="all" replace />} />
          </Routes>
        </>
      </BatchDetailsProvider>
    </ListProvider>
  );
};

export default GSTIN;
