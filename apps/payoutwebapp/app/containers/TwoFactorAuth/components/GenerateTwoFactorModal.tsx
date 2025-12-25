import React, { useState, useEffect } from 'react';
import {
  Progress,
  Image,
  Text,
  Space,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { generatePublicKey } from 'services/developers';

// Utils
import getAlertIcon from 'utils/getAlertIcon';
import { triggerDownload } from 'utils/common';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { GenerateTwoFactorModalProps } from '../types';

const GenerateTwoFactorModal: React.FC<GenerateTwoFactorModalProps> = ({
  email,
  onClose,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      const response = await generatePublicKey();

      triggerDownload(
        { type: 'DATA', payload: response as string },
        'public-key.zip',
      );
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
          data-event-name="Close_Icon_Generate_Public_Key"
          onClick={handleClose}
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
                size="tiny"
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
                The password to access the Public Key will be sent to your
                registered email ID {email}.
              </Text>
            </div>
          )}
          <BtnContainer className="mt-4">
            <Button
              data-event-name="Secondary_Button_Generate_Two_Factor"
              as="a"
              link
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              data-event-name="Primary_Button_Generate_Two_Factor"
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

export default withErrorBoundary(GenerateTwoFactorModal);
