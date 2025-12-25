import React, { useState } from 'react';

// Constants
import { MODAL_TYPES } from './constants';

// Components
import PitchPage from 'components/PitchPage';
import Modals from './components/Modals';

const UPImobilePitchPage = () => {
  const [modalType, setModalType] = useState();

  return (
    <>
      <PitchPage
        productCode="UPI 360"
        btnText="Verify UPI"
        onBtnClick={() => setModalType(MODAL_TYPES.VERIFY)}
      />
      {modalType && (
        <Modals modalType={modalType} setModalType={setModalType} />
      )}
    </>
  );
};

export default UPImobilePitchPage;
