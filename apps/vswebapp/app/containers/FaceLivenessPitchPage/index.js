import React, { useState } from 'react';

// Constants
import { MODAL_TYPES } from './constants';

// Components
import PitchPage from 'components/PitchPage';
import Modals from './components/Modals';

const FaceLivenessPitchPage = () => {
  const [modalType, setModalType] = useState();

  return (
    <>
      <PitchPage
        productCode="FACE_LIVENESS"
        btnText="Check Face Liveness"
        onBtnClick={() => setModalType(MODAL_TYPES.VERIFY)}
      />

      {modalType && (
        <Modals modalType={modalType} setModalType={setModalType} />
      )}
    </>
  );
};

export default FaceLivenessPitchPage;
