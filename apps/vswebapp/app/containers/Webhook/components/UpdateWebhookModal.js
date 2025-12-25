import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  toast,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  InputWithAction,
} from '@cashfree-intl/coherent';
import _capitalize from 'lodash/capitalize';

// Services
import { addWebhook, testWebhook } from 'services/developers';

// Utils
import Regex from 'utils/regex';

// Constants
import { ACTION_TYPES } from '../constants';

// Styled
import { BtnContainer } from 'styled/common';
import { CodeWrapper } from '../styled';

const UpdateWebhookModal = ({ actionType, url, onSubmit, onClose }) => {
  const [value, setValue] = useState(() => url && url.replace('https://', ''));
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const response = await testWebhook({
      url: `https://${value}`,
      contentType: 'JSON',
    });

    setData(response);

    setLoading(false);

    if (response.statusCode < 300) {
      const response = await addWebhook({
        webhookurl: `https://${value}`,
        isBavWebhook: true,
      });

      if (!response.error) {
        onSubmit();

        switch (actionType) {
          case ACTION_TYPES.ADD:
            toast.success('Webhook added successfully.');
            break;

          case ACTION_TYPES.EDIT:
            toast.success('Webhook updated successfully.');
            break;

          case ACTION_TYPES.TEST:
            toast.success('Valid URL.');
            break;
        }
      }

      onClose();
    }
  };

  const disabled = !Regex.url(`https://${value}`) || loading;

  return (
    <Modal $maxWidth="665" open>
      <ModalHeader>
        {_capitalize(actionType)} Webhook{' '}
        <Cross
          onClick={onClose}
          data-event-name={`Form_${_capitalize(actionType)}Webhook_Icon_Close`}
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
            disabled={actionType === ACTION_TYPES.TEST}
            onChange={e => setValue(e.target.value)}
          />

          {data.statusCode >= 300 && (
            <>
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
                <pre>{JSON.stringify(JSON.parse(data.data), null, 2)}</pre>
              </CodeWrapper>
            </>
          )}

          <BtnContainer>
            <Button
              as="a"
              link
              onClick={onClose}
              data-event-name={`Form_${_capitalize(
                actionType,
              )}Webhook_SecondaryButton`}
            >
              Cancel
            </Button>
            <Button
              primary
              className="ml-4"
              onClick={handleSubmit}
              loading={loading}
              disabled={disabled}
              data-event-name={`Form_${_capitalize(
                actionType,
              )}Webhook_PrimaryButton`}
            >
              {actionType === ACTION_TYPES.TEST
                ? 'Validate'
                : `Test & ${_capitalize(actionType)}`}{' '}
              URL
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

UpdateWebhookModal.propTypes = {
  url: PropTypes.string,
  actionType: PropTypes.oneOf(Object.values(ACTION_TYPES)).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateWebhookModal;
