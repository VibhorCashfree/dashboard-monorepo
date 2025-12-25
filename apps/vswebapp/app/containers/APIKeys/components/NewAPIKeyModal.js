import React, { useEffect, useState } from 'react';
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
} from '@cashfree-intl/coherent';

// Utils
import { downloadText } from 'utils/common';
import getAlertIcon from 'utils/getAlertIcon';

// Services
import { addAPIKey } from 'services/developers';

// Components
import Copy from 'components/Copy';

// Styled
import { BtnContainer } from 'styled/common';
import { WarningAlert } from '../styled';

const NewAPIKeyModal = ({ onClose, onSubmit }) => {
  const [data, setData] = useState();

  useEffect(() => {
    (async function fetchData() {
      const response = await addAPIKey();

      if (!response.error) {
        setData(response);
        onSubmit();
      }
    })();
  }, []);

  const handleDownloadAPI = () => {
    const content = `Client ID: ${data.clientId} Client Secret: ${
      data.clientSecret
    }`;

    downloadText('API.txt', content);
    onClose();
  };

  return (
    <Modal $maxWidth="440" open>
      <ModalHeader>
        New API Keys{' '}
        <Cross onClick={onClose} data-event-name="Form_NewAPIKeys_Icon_Close" />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <WarningAlert>
            <Image src={getAlertIcon('warning')} />
            <span>
              Download the API keys and keep it safe. You will not be able to
              see the Client Secret after you close this screen.
            </span>
          </WarningAlert>

          {!!data && (
            <>
              <Text color="bodyLight" className="mt-4 mb-1">
                Client ID
              </Text>
              <Space justifyContent="space-between" alignItems="center">
                <Text variant="h16">{data.clientId}</Text>{' '}
                <Copy value={data.clientId} />
              </Space>
              <Text color="bodyLight" className="mt-4 mb-1">
                Client Secret
              </Text>
              <Space justifyContent="space-between" alignItems="center">
                <Text variant="h16" className="text-wrap">
                  {data.clientSecret}
                </Text>{' '}
                <Copy value={data.clientSecret} />
              </Space>

              <BtnContainer className="mt-4">
                <Button
                  as="a"
                  link
                  onClick={onClose}
                  data-event-name="Form_NewAPIKeys_SecondaryButton"
                >
                  Cancel
                </Button>
                <Button
                  primary
                  className="ml-4"
                  onClick={handleDownloadAPI}
                  data-event-name="Form_NewAPIKeys_PrimaryButton"
                >
                  Download API Keys
                </Button>
              </BtnContainer>
            </>
          )}
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

NewAPIKeyModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewAPIKeyModal;
