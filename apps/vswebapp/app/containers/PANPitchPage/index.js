import React, { useState } from 'react';

// Constants
import { MODAL_TYPES } from './constants';

// Components
import PitchPage from 'components/PitchPage';
import Modals from './components/Modals';

const PANPitchPage = () => {
  const [modalType, setModalType] = useState();

  return (
    <>
      <PitchPage
        productCode="PAN_OCR"
        btnText="Try PAN Verification"
        onBtnClick={() => setModalType(MODAL_TYPES.VERIFY)}
      />

      {modalType && (
        <Modals modalType={modalType} setModalType={setModalType} />
      )}
    </>
  );
};

export default PANPitchPage;
