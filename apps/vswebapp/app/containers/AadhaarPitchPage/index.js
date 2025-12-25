import React, { useState } from 'react';

// Constants
import { MODAL_TYPES } from './constants';

// Components
import PitchPage from 'components/PitchPage';
import Modals from './components/Modals';

const AadhaarPitchPage = () => {
  const [modalType, setModalType] = useState();

  return (
    <>
      <PitchPage
        productCode="AADHAAR_OCR"
        btnText="Try Aadhaar Verification"
        onBtnClick={() => setModalType(MODAL_TYPES.VERIFY)}
      />

      {modalType && (
        <Modals modalType={modalType} setModalType={setModalType} />
      )}
    </>
  );
};

export default AadhaarPitchPage;
