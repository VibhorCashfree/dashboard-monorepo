import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import _last from 'lodash/last';
import _remove from 'lodash/remove';

// Constants
import { videoEmbedkeys } from './constants';

// Containers
import PanDetails from 'containers/PanDetails';
import BatchPanDetails from 'containers/BatchPanDetails';

// Providers
import { AccountContext } from 'providers/AccountProvider';
import { ListProvider } from 'providers/ListProvider';
import { BatchDetailsProvider } from 'providers/BatchDetailsProvider';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import MetaTags from 'components/MetaTags';
import Tabs from './components/Tabs';
import PageHeader from 'components/PageHeader';
import FreeCreditsBanner from 'components/FreeCreditsBanner';
import PitchPage from 'components/PitchPage';

// Utils
import PitchPageConfig from 'utils/pitchPage';

const Pan = () => {
  const [show, setShow] = useState(true);
  const location = useLocation();

  const { preferences } = useContext(AccountContext);

  const handleShowDetails = () => {
    setShow(false);
    PitchPageConfig.set(
      _remove(PitchPageConfig.get(), product => product !== 'PAN'),
    );
  };

  const activeTabName = _last(location.pathname.split('/'));

  return (
    <ListProvider>
      <BatchDetailsProvider>
        <PageHeader embedKey={videoEmbedkeys[activeTabName]}>PAN</PageHeader>
        <MetaTags title="Secure ID – PAN" />

        {PitchPageConfig.get().includes('PAN') && show ? (
          <PitchPage
            productCode="PAN"
            btnText="Try PAN Verification"
            onBtnClick={handleShowDetails}
          />
        ) : (
          <>
            <FreeCreditsBanner productLabel="Pan Cards" />

            <Routes>
              <Route exact path=":id/details" element={<PanDetails />} />
              <Route path="batch/:id/details" element={<BatchPanDetails />} />
              <Route path=":tabId" element={<Tabs />} />
              <Route path="*" element={<Navigate to="all" replace />} />
            </Routes>
          </>
        )}
      </BatchDetailsProvider>
    </ListProvider>
  );
};

export default withReadPermission(Pan, {
  code: 23001,
  description: 'access PAN verification',
});
