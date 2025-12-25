import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import _remove from 'lodash/remove';

// Containers
import VerifyIfsc from 'containers/VerifyIfsc';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import PitchPage from 'components/PitchPage';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import PitchPageConfig from 'utils/pitchPage';

const Ifsc = () => {
  const [show, setShow] = useState(true);
  const { preferences } = useContext(AccountContext);

  const handleShowDetails = () => {
    setShow(false);
    PitchPageConfig.set(
      _remove(PitchPageConfig.get(), product => product !== 'IFSC'),
    );
  };

  return (
    <>
      <PageHeader embedKey="IFSC">IFSC</PageHeader>
      <MetaTags title="Secure ID – IFSC" />

      {PitchPageConfig.get().includes('IFSC') && show ? (
        <PitchPage
          productCode="IFSC"
          btnText="Try IFSC Verification"
          onBtnClick={handleShowDetails}
        />
      ) : (
        <VerifyIfsc />
      )}
    </>
  );
};

export default Ifsc;
