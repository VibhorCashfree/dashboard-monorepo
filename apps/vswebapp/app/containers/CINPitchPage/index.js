import React, { useState } from 'react';

// Constants
import { MODAL_TYPES } from './constants';

// Components
import PitchPage from 'components/PitchPage';
import Modals from './components/Modals';

const CINPitchPage = () => {
  const [modalType, setModalType] = useState();

  return (
    <>
      <PitchPage
        productCode="CIN"
        btnText="Verify CIN"
        onBtnClick={() => setModalType(MODAL_TYPES.VERIFY)}
      />
      {modalType && (
        <Modals modalType={modalType} setModalType={setModalType} />
      )}
    </>
  );
};

export default CINPitchPage;
