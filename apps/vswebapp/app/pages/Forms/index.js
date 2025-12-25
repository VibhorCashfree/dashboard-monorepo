import React, { useState } from 'react';
import { WorkFlowProvider } from '@cashfree-intl/workflow';
import { Routes, Route, Navigate } from 'react-router-dom';
import _remove from 'lodash/remove';

// Providers
import { ListProvider } from 'providers/ListProvider';

// Containers
import AllKycLinkDetails from 'containers/AllKycLinkDetails';
import BatchKycLinkDetails from 'containers/BatchKycLinkDetails';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import PitchPage from 'components/PitchPage';
import Tabs from './components/Tabs';

// Utils
import PitchPageConfig from 'utils/pitchPage';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

const Forms = () => {
  const [show, setShow] = useState(true);

  const handleShowDetails = () => {
    setShow(false);
    PitchPageConfig.set(
      _remove(PitchPageConfig.get(), product => product !== 'FORMS'),
    );
  };

  return (
    <ListProvider>
      <BatchDetailsProvider>
        <PageHeader>KYC Studio - Verifications</PageHeader>
        <MetaTags title="KYC Studio" />

        {PitchPageConfig.get().includes('FORMS') && show ? (
          <PitchPage
            productCode="KYC Link"
            btnText="Generate and Send KYC Links"
            onBtnClick={handleShowDetails}
          />
        ) : (
          <WorkFlowProvider>
            <Routes>
              <Route exact path=":id/details" element={<AllKycLinkDetails />} />
              <Route
                path="batch/:id/details"
                element={<BatchKycLinkDetails />}
              />
              <Route path=":tabId" element={<Tabs />} />

              <Route path="*" element={<Navigate to="all" replace />} />
            </Routes>
          </WorkFlowProvider>
        )}
      </BatchDetailsProvider>
    </ListProvider>
  );
};

export default Forms;
