import React, { useEffect, useState } from 'react';
import {
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

// Types
import type { DataState, NewAPIKeyModalProps } from '../types';

const NewAPIKeyModal: React.FC<NewAPIKeyModalProps> = ({
  isMerchantLevel,
  onSubmit,
  onClose,
}) => {
  const [data, setData] = useState<DataState | undefined>(undefined);

  useEffect(() => {
    (async function fetchData() {
      const body = {
        agent: isMerchantLevel ? 'MERCHANT' : '',
      };

      const response = await addAPIKey(body);

      if (!('error' in response)) {
        setData(response);
        onSubmit();
      }
    })();
  }, []);

  const handleDownloadAPI = (): void => {
    const content = `Client ID: ${data?.clientId} Client Secret: ${data?.clientSecret}`;

    downloadText('API.txt', content);
    onClose();
  };

  return (
    <Modal $maxWidth="440" open>
      <ModalHeader>
        New API Keys{' '}
        <Cross data-event-name="Close_Icon_New_API_Key" onClick={onClose} />
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

          {data ? (
            <>
              <Text color="bodyLight" className="mt-4 mb-1">
                Client ID
              </Text>
              <Space justifyContent="space-between" alignItems="center">
                <Text
                  variant="h16"
                  className="text-wrap"
                  style={{ width: 330 }}
                >
                  {data.clientId}
                </Text>{' '}
                <Copy value={data.clientId} />
              </Space>
              <Text color="bodyLight" className="mt-4 mb-1">
                Client Secret
              </Text>
              <Space justifyContent="space-between" alignItems="center">
                <Text
                  variant="h16"
                  className="text-wrap"
                  style={{ width: 330 }}
                >
                  {data.clientSecret}
                </Text>{' '}
                <Copy value={data.clientSecret} />
              </Space>

              <BtnContainer className="mt-4">
                <Button
                  data-event-name="Secondary_Button_New_API_Key"
                  as="a"
                  link
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  data-event-name="Primary_Button_New_API_Key"
                  primary
                  className="ml-4"
                  onClick={handleDownloadAPI}
                >
                  Download API Keys
                </Button>
              </BtnContainer>
            </>
          ) : null}
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(NewAPIKeyModal);
