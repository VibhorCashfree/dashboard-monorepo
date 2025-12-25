import React from 'react';
import {
  Image,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { removeAPIKey } from 'services/developers';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer } from 'styled/common';
import { WarningAlert } from '../styled';

// Types
import type { DeleteAPIKeyModalProps } from '../types';

const DeleteAPIKeyModal: React.FC<DeleteAPIKeyModalProps> = ({
  isMerchantLevel,
  clientId,
  onDelete,
  onClose,
}) => {
  const handleDelete = async () => {
    const queryObj = isMerchantLevel ? { agent: 'MERCHANT' } : {};

    const response = await removeAPIKey(clientId, queryObj);

    if (_get(response, 'response', '') === 'SUCCESS') {
      onDelete(clientId);
    }

    onClose();
  };

  return (
    <Modal $maxWidth="440" open>
      <ModalHeader>
        Delete API Keys{' '}
        <Cross data-event-name="Close_Icon_Delete_API_Key" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <WarningAlert>
            <Image src={getAlertIcon('warning')} />
            <span>
              You will not be able to perform any action with this API key after
              you delete it.
            </span>
          </WarningAlert>
          <BtnContainer className="mt-4">
            <Button
              data-event-name="Secondary_Button_Delete_API_Key"
              as="a"
              link
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              data-event-name="Primary_Button_Delete_API_Key"
              danger
              className="ml-4"
              onClick={handleDelete}
            >
              Delete Immediately
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(DeleteAPIKeyModal);
