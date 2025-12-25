import React from 'react';
import {
  Image,
  Text,
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
import { setMerchantPreference } from 'services/accounts';

// Utils
import getAlertIcon from 'utils/getAlertIcon';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { SwitchTwoFactorModalProps } from '../types';

const SwitchTwoFactorModal: React.FC<SwitchTwoFactorModalProps> = ({
  method,
  onSwitch,
  onClose,
}) => {
  const twoFAMethod = method ? 'IP Whitelist' : 'Public Key';

  const handleSwitchMethod = async () => {
    const body = {
      property: 'IP_CHECK_DISABLED',
      value: `${+!method}`,
    };

    await setMerchantPreference(body);

    onSwitch();
    onClose();
  };

  return (
    <Modal $maxWidth="430" open>
      <ModalHeader>
        Switch Method
        <Cross data-event-name="Close_Icon_Switch_Method" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <div className="text-center">
            <Image inline className="mr-1" src={getAlertIcon('warning')} />
            <Text variant="p14" className="mt-2">
              Use {twoFAMethod} as the 2FA method?
            </Text>
          </div>
          <BtnContainer className="mt-4">
            <Button
              data-event-name="Secondary_Button_Switch_Two_Factor"
              as="a"
              link
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              data-event-name="Primary_Button_Switch_Two_Factor"
              primary
              className="ml-4"
              onClick={handleSwitchMethod}
            >
              Yes
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(SwitchTwoFactorModal);
