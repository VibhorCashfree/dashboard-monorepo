import React, { useState } from 'react';
import {
  Text,
  Cross,
  Button,
  Form,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { addIPs } from 'services/developers';

// Utils
import isFormValid from 'utils/isFormValid';
import { ipsValidation } from 'utils/formValidation';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { AddIPAddressModalProps } from '../types';

const AddIPAddressModal: React.FC<AddIPAddressModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [formObj, setFormObj] = useState<AnyObject>({});
  const [errorObj, setErrorObj] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const ips: string[] = formObj.ips ? formObj.ips.split(',') : [];
    const uniqueIPs: string[] = Array.from(new Set(ips));

    const body: string[] = ips.length ? uniqueIPs : [formObj.ips || ''];

    setLoading(true);

    const response = await addIPs(body);

    setLoading(false);

    if (!('error' in response)) {
      onSubmit();
    }

    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ): void => {
    let error: string | undefined | null;

    switch (name) {
      case 'ips':
        error = ipsValidation(value);
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const disabled = !isFormValid(formObj, errorObj, ['ips']);

  return (
    <Modal $maxWidth="440" open>
      <ModalHeader>
        Add IP Address{' '}
        <Cross data-event-name="Close_Icon_Add_IP_Address" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              name="ips"
              fluid
              autoComplete="off"
              label="IP Address"
              placeholder="Ex: 000.000.00.000,111.111.11.111"
              value={formObj.ips}
              error={errorObj.ips}
              onChange={handleChange}
            />
            <Text variant="b12" color="bodyLight">
              Use comma (&#44;) to add multiple IPs
            </Text>
            <BtnContainer>
              <Button
                data-event-name="Secondary_Button_Add_IP_Address"
                as="a"
                link
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                data-event-name="Primary_Button_Add_IP_Address"
                primary
                className="ml-4"
                disabled={disabled}
                loading={loading}
              >
                Add IP Address
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(AddIPAddressModal);
