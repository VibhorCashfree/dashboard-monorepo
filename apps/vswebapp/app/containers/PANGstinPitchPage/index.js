import React, { useState } from 'react';

// Constants
import { MODAL_TYPES } from './constants';

// Components
import PitchPage from 'components/PitchPage';
import Modals from './components/Modals';

const PANGstinPitchPage = () => {
  const [modalType, setModalType] = useState();

  return (
    <>
      <PitchPage
        productCode="PAN GSTIN"
        btnText="Fetch GSTIN from PAN"
        onBtnClick={() => setModalType(MODAL_TYPES.VERIFY)}
      />
      {modalType && (
        <Modals modalType={modalType} setModalType={setModalType} />
      )}
    </>
  );
};

export default PANGstinPitchPage;
