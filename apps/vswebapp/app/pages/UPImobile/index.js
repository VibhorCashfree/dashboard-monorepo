import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Providers
import { AccountContext } from 'providers/AccountProvider';
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';

// Containers
import BatchUPIMobile from 'containers/BatchUPIMobile';
import BatchUpiMobileDetails from 'containers/BatchUpiMobileDetails';
import BatchUPIMobileSingleDetails from 'containers/BatchUPIMobileSingleDetails';

const UPImobile = () => {
  const { preferences } = useContext(AccountContext);
  
  return (
    <ListProvider>
      <BatchDetailsProvider>
        <PageHeader embedKey="UPI_MOBILE">
          UPI Mobile Number Verification
        </PageHeader>
        <MetaTags title="Secure ID – UPI Mobile" />
        <Routes>
          <Route exact path="/" element={<BatchUPIMobile />} />
          <Route
            exact
            path="/details/:fileId/:referenceId"
            element={<BatchUPIMobileSingleDetails />}
          />
          <Route path="batch/:id/details" element={<BatchUpiMobileDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BatchDetailsProvider>
    </ListProvider>
  );
};

export default UPImobile;
