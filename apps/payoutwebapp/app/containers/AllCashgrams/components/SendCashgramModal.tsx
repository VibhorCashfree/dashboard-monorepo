import React, { useState } from 'react';
import {
  Text,
  toast,
  Checkbox,
  Cross,
  Button,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';
import _size from 'lodash/size';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { send } from 'services/cashgrams';

// Styled
import { BtnContainer } from 'styled/common';
import { StyledSendCashgramModal } from '../styled';

// Types
import type { SendCashgramModalProps } from '../types';

const SendCashgramModal: React.FC<SendCashgramModalProps> = ({
  onClose,
  data,
}) => {
  const [value, setValue] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, checked }: { name: string; checked: boolean },
  ) => setValue((prev) => ({ ...prev, [name]: checked }));

  const handleSend = async () => {
    const response = await send({
      sendEmail: !!value.sendEmail,
      sendSMS: !!value.sendSMS,
      id: data.id,
    });

    if (!('error' in response)) {
      toast.success(response.message);
    }

    onClose();
  };

  const disabled = _size(_pickBy(value, _identity)) === 0;

  return (
    <StyledSendCashgramModal $maxWidth="480" open>
      <ModalHeader>
        Send Cashgram{' '}
        <Cross data-event-name="Close_Icon_Send_Cashgram" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Text variant="p14" color="bodyLight" className="mb-2">
            Cashgram with the <strong>ID {data.cashgramId}</strong> can be sent
            via Email/SMS to the beneficiary <strong>{data.name}</strong>.
          </Text>
          <div className="mt-3">
            <Checkbox
              name="sendEmail"
              label={
                <label>
                  Email {data.email ? <strong>({data.email})</strong> : null}
                </label>
              }
              disabled={!data.email}
              checked={!!value.sendEmail}
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <Checkbox
              name="sendSMS"
              label={
                <label>
                  SMS {data.phone ? <strong>({data.phone})</strong> : null}
                </label>
              }
              disabled={!data.phone}
              checked={!!value.sendSMS}
              onChange={handleChange}
            />
          </div>
          <BtnContainer>
            <Button
              data-event-name="Secondary_Button_Send_Cashgram"
              as="a"
              link
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              data-event-name="Primary_Button_Send_Cashgram"
              primary
              className="ml-4"
              onClick={handleSend}
              disabled={disabled}
            >
              Send
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </StyledSendCashgramModal>
  );
};

export default withErrorBoundary(SendCashgramModal);
