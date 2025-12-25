import React, { useState } from 'react';
import {
  Text,
  toast,
  Cross,
  Button,
  Dropdown,
  InputWithAction,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';
import _capitalize from 'lodash/capitalize';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Services
import { setMerchantPreference } from 'services/accounts';
import { addWebhook, testWebhook } from 'services/developers';

// Utils
import Regex from 'utils/regex';

// Constants
import { ACTION_TYPE } from '../constants';

// Styled
import { BtnContainer, CodeWrapper } from 'styled/common';

// Types
import type { UpdateWebhookModalProps } from '../types';

const UpdateWebhookModal: React.FC<UpdateWebhookModalProps> = ({
  actionType,
  url,
  versions,
  onSubmit,
  onClose,
}) => {
  const { preferences } = useAccount();

  const [value, setValue] = useState<string | undefined>(() =>
    url ? url.replace('https://', '') : '',
  );
  const [data, setData] = useState<{ statusCode?: number; data?: string }>({});
  const [webhookVersion, setWebhookVersion] = useState<string>(
    preferences.webhookVersion,
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await testWebhook({
        url: `https://${value}`,
        contentType: 'JSON',
      });

      if (!('error' in response)) {
        setData(response);

        if (response.statusCode && response.statusCode < 300) {
          const response = await addWebhook({
            webhookurl: `https://${value}`,
          });

          if (!('error' in response)) {
            if (actionType === ACTION_TYPE.ADD) {
              await setMerchantPreference({
                property: 'WEBHOOK_VERSION',
                value: webhookVersion,
              });
            }

            onSubmit(webhookVersion);

            switch (actionType) {
              case ACTION_TYPE.ADD:
                toast.success('Webhook added successfully.');
                break;

              case ACTION_TYPE.EDIT:
                toast.success('Webhook updated successfully.');
                break;

              case ACTION_TYPE.TEST:
                toast.success('Valid webhook URL.');
                break;
            }
          }
          onClose();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const disabled = !value || !Regex.url(`https://${value}`) || loading;

  const options = Object.keys(versions).map((releaseDate) => ({
    key: versions[releaseDate].version,
    text: versions[releaseDate].version,
    value: releaseDate,
  }));

  return (
    <Modal $maxWidth="665" open>
      <ModalHeader>
        {_capitalize(actionType)} Webhook{' '}
        <Cross
          data-event-name={`Close_Icon_${_capitalize(actionType)}_Webhook`}
          onClick={onClose}
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Text color="bodyLight" className="mb-1">
            Webhook URL
          </Text>
          <InputWithAction
            fluid
            className="mb-2"
            label="https://"
            placeholder="example.com"
            value={value}
            disabled={actionType === ACTION_TYPE.TEST}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />

          {data.statusCode && data.statusCode >= 300 && (
            <div className="mb-2">
              <Text as="span" color="bodyLight">
                Status Code
              </Text>{' '}
              :
              <Text as="span" color="danger" className="ml-1">
                {data.statusCode}
              </Text>
              <Text className="mt-2 mb-1" strong>
                Request
              </Text>
              <CodeWrapper>
                <pre>
                  {data.data && JSON.stringify(JSON.parse(data.data), null, 2)}
                </pre>
              </CodeWrapper>
            </div>
          )}

          <Text color="bodyLight" className="mb-1">
            Select a webhook version
          </Text>
          <Dropdown
            selection
            icon="chevron down"
            placeholder="Select a webhook version"
            options={options}
            disabled={actionType !== ACTION_TYPE.ADD}
            value={webhookVersion}
            onChange={(e: React.ChangeEvent, { value }: { value: string }) =>
              setWebhookVersion(value)
            }
          />

          <BtnContainer>
            <Button
              data-event-name="Secondary_Button_Update_Webhook"
              as="a"
              link
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              data-event-name="Primary_Button_Update_Webhook"
              primary
              className="ml-4"
              onClick={handleSubmit}
              loading={loading}
              disabled={disabled}
            >
              {actionType === ACTION_TYPE.TEST
                ? _capitalize(actionType)
                : `Test & ${_capitalize(actionType)}`}{' '}
              Webhook
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(UpdateWebhookModal);
