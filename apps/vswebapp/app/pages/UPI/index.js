import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import _remove from 'lodash/remove';
import _last from 'lodash/last';

// Providers
import { AccountContext } from 'providers/AccountProvider';
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Containers
import BatchUpiDetails from 'containers/BatchUpiDetails';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import FreeCreditsBanner from 'components/FreeCreditsBanner';
import PitchPage from 'components/PitchPage';
import Tabs from './components/Tabs';

// Constants
import { videoEmbedkeys } from './constants';

// Utils
import PitchPageConfig from 'utils/pitchPage';

const UPI = () => {
  const location = useLocation();

  const { preferences } = useContext(AccountContext);

  const [show, setShow] = useState(true);

  const handleShowDetails = () => {
    setShow(false);
    PitchPageConfig.set(
      _remove(PitchPageConfig.get(), product => product !== 'UPI'),
    );
  };

  const activeTabName = _last(location.pathname.split('/'));

  return (
    <ListProvider>
      <BatchDetailsProvider>
        <PageHeader embedKey={videoEmbedkeys[activeTabName]}>
          UPI VPA
        </PageHeader>
        <MetaTags title="Secure ID – UPI VPA" />

        {PitchPageConfig.get().includes('UPI') && show ? (
          <PitchPage
            productCode="UPI VPA"
            btnText="Try UPI Verification"
            onBtnClick={handleShowDetails}
          />
        ) : (
          <>
            <FreeCreditsBanner productLabel="UPI" />
            <Routes>
              <Route path="batch/:id/details" element={<BatchUpiDetails />} />
              <Route path=":tabId" element={<Tabs />} />
              <Route path="*" element={<Navigate to="all" replace />} />
            </Routes>
          </>
        )}
      </BatchDetailsProvider>
    </ListProvider>
  );
};

export default UPI;
