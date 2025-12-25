import React, { useState } from 'react';

// Constants
import { MODAL_TYPES } from './constants';

// Components
import PitchPage from 'components/PitchPage';
import Modals from './components/Modals';

const RGCPitchPage = () => {
  const [modalType, setModalType] = useState();

  return (
    <>
      <PitchPage
        productCode="RGC"
        btnText="Convert Coordinates"
        onBtnClick={() => setModalType(MODAL_TYPES.VERIFY)}
      />
      {modalType && (
        <Modals modalType={modalType} setModalType={setModalType} />
      )}
    </>
  );
};

export default RGCPitchPage;
