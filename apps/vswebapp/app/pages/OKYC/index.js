import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import _remove from 'lodash/remove';

// Providers
import { ListProvider } from 'providers/ListProvider';
import { AccountContext } from 'providers/AccountProvider';

// Containers
import OKYCContainer from 'containers/OKYC';
import OKYCDetails from 'containers/OKYCDetails';

// Components
import MetaTags from 'components/MetaTags';
import FreeCreditsBanner from 'components/FreeCreditsBanner';
import PitchPage from 'components/PitchPage';

// Styled
import { PageHeading } from 'styled/common';

// Utils
import PitchPageConfig from 'utils/pitchPage';

const OKYC = () => {
  const [show, setShow] = useState(true);

  const { preferences } = useContext(AccountContext);

  const handleShowDetails = () => {
    setShow(false);
    PitchPageConfig.set(
      _remove(PitchPageConfig.get(), product => product !== 'AADHAAR'),
    );
  };

  return (
    <ListProvider>
      <PageHeading>OKYC</PageHeading>
      <MetaTags title="Secure ID – OKYC" />

      {PitchPageConfig.get().includes('AADHAAR') && show ? (
        <PitchPage
          productCode="AADHAAR"
          btnText="Try Aadhaar Verification"
          onBtnClick={handleShowDetails}
        />
      ) : (
        <>
          <FreeCreditsBanner productLabel="Aadhaar Cards" />
          <Routes>
            <Route exact path=":id/details" element={<OKYCDetails />} />
            <Route path="/" element={<OKYCContainer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </ListProvider>
  );
};

export default OKYC;
