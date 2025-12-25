import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Icon,
} from '@cashfree-intl/coherent';

// Services
import { update2FAMethod } from 'services/developers';

// Styled
import { BtnContainer } from 'styled/common';

const SwitchTwoFactorModal = ({ method, onSwitch, onClose }) => {
  const twoFAMethod = !method ? 'Public Key' : 'IP Whitelist';

  const handleSwitchMethod = async () => {
    const body = {
      property: 'IP_CHECK_DISABLED',
      value: `${+!method}`,
    };

    await update2FAMethod(body);

    onSwitch();
    onClose();
  };

  return (
    <Modal $maxWidth="430" open>
      <ModalHeader>
        Switch Method
        <Cross
          onClick={onClose}
          data-event-name="Form_SwitchMethod_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <div className="text-center">
            <Icon size="large" name="alert-icon" color="yellow" />
            <Text variant="p14" className="mt-2">
              Use {twoFAMethod} as the 2FA method?
            </Text>
          </div>
          <BtnContainer className="mt-4">
            <Button
              as="a"
              link
              onClick={onClose}
              data-event-name="Form_SwitchMethod_SecondaryButton"
            >
              Cancel
            </Button>
            <Button
              primary
              className="ml-4"
              onClick={handleSwitchMethod}
              data-event-name="Form_SwitchMethod_PrimaryButton"
            >
              Yes
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

SwitchTwoFactorModal.propTypes = {
  method: PropTypes.string,
  onSwitch: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

export default SwitchTwoFactorModal;
