import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalDescription,
  Cross,
  Image,
} from '@cashfree-intl/coherent';

// Components
import PitchPage from 'components/PitchPage';
import RpdGif from '../../../public/ReversePennyDrop.gif';

const RPDPitchPage = () => {
  const [modalType, setModalType] = useState(false);

  return (
    <>
      <PitchPage
        productCode="Bank Account using RPD"
        btnText="View Bank Account Verification using RPD"
        onBtnClick={() => setModalType(true)}
      />

      {modalType && (
        <Modal open style={{ width: '420px' }}>
          <ModalHeader>
            Bank Account Verification - UPI
            <Cross onClick={() => setModalType(false)} />
          </ModalHeader>
          <ModalContent>
            <ModalDescription>
              <Image src={RpdGif} />
            </ModalDescription>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default RPDPitchPage;
