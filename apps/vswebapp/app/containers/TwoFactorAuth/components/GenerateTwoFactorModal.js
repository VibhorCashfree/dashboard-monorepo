import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Space,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Image,
  Progress,
  Conditional,
} from '@cashfree-intl/coherent';

// Services
import { generatePublicKey } from 'services/developers';

// Utils
import getAlertIcon from 'utils/getAlertIcon';
import { triggerDownload } from 'utils/common';
import Env from 'utils/env';

// Styled
import { BtnContainer } from 'styled/common';

const GenerateTwoFactorModal = ({ email, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      const response = await generatePublicKey();

      triggerDownload({ type: 'DATA', payload: response }, 'public-key.zip');
    })();
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const handleClose = () => {
    onSubmit();
    onClose();
  };

  return (
    <Modal $maxWidth="440" open>
      <ModalHeader>
        Generate Public Key{' '}
        <Cross
          onClick={handleClose}
          data-event-name="Form_GeneratePublicKey_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          {loading ? (
            <div className="my-5">
              <Space justifyContent="space-between" alignItems="center">
                <span>Generating</span>
                <span>30%</span>
              </Space>
              <Progress
                percent={30}
                className="mt-1 mb-1"
                size="xs"
                color="violet"
              />
              <Text variant="p14" color="bodyLight">
                Public Key will be downloaded automatically.
              </Text>
            </div>
          ) : (
            <div className="mt-1 text-center">
              <Image inline className="mb-3" src={getAlertIcon('info')} />
              <Text variant="p14" color="bodyLight">
                <Conditional if={Env.isTest()}>
                  Your Public Key is ready to access without a password. Please
                  save it securely.
                </Conditional>
                <Conditional if={!Env.isTest()}>
                  The password to access the Public Key will be sent to your
                  registered email ID {email}.
                </Conditional>
              </Text>
            </div>
          )}
          <BtnContainer className="mt-4">
            <Button
              as="a"
              link
              onClick={handleClose}
              data-event-name="Form_GeneratePublicKey_SecondaryButton"
            >
              Cancel
            </Button>
            <Button
              data-event-name="Form_GeneratePublicKey_PrimaryButton"
              primary={!loading}
              className="ml-4"
              disabled={loading}
              onClick={handleClose}
            >
              Ok
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

GenerateTwoFactorModal.propTypes = {
  email: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default GenerateTwoFactorModal;
