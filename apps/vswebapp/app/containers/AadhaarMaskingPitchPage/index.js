import React, { useState } from 'react';

// Constants
import { MODAL_TYPES } from './constants';

// Components
import PitchPage from 'components/PitchPage';
import Modals from './components/Modals';

const AadhaarMaskingPitchPage = () => {
  const [modalType, setModalType] = useState();

  return (
    <>
      <PitchPage
        productCode="AADHAAR_MASKING"
        btnText="Mask Aadhaar"
        onBtnClick={() => setModalType(MODAL_TYPES.VERIFY)}
      />

      {modalType && (
        <Modals modalType={modalType} setModalType={setModalType} />
      )}
    </>
  );
};

export default AadhaarMaskingPitchPage;
