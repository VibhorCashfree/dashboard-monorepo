import React, { useState } from 'react';
import { Button } from '@cashfree-intl/coherent';

// Constants
import { MODAL_TYPES } from './constants';

// Components
import Modals from './components/Modals';

const UPImobilePitchPage = () => {
  const [modalType, setModalType] = useState();

  return (
    <>
      <Button secondary onClick={() => setModalType(MODAL_TYPES.VERIFY)}>
        Try UPI Mobile Verification
      </Button>
      {modalType && (
        <Modals modalType={modalType} setModalType={setModalType} />
      )}
    </>
  );
};

export default UPImobilePitchPage;
