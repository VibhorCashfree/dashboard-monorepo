import React, { useState } from 'react';

// Components
import PitchPage from 'components/PitchPage';
import Modals from './components/Modals';

// Constants
import { MODAL_TYPES } from './constants';

const MobileAdvancePitchPage = () => {
  const [modalType, setModalType] = useState('');

  return (
    <>
      <PitchPage
        productCode="MOBILE 360"
        btnText="Retrive Information"
        onBtnClick={() => setModalType(MODAL_TYPES.RETRIEVE)}
      />

      {modalType && (
        <Modals modalType={modalType} setModalType={setModalType} />
      )}
    </>
  );
};

export default MobileAdvancePitchPage;
