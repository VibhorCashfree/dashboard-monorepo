import React from 'react';
import {
  Text,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { Props } from './types';

const TnCModal = ({ onConfirm }: Props) => (
  <Modal open>
    <ModalHeader>Terms and Conditions</ModalHeader>
    <ModalContent>
      <ModalDescription>
        <Text color="bodyLight">
          You agree that fees for services along with any other due
          payments(including any levies and penalties) shall be charged by way
          of a deduction from the monies/balance lying in the Connected Payout
          Account and/or the wallet, on a daily basis by Cashfree(or on any
          other frequency as agreed).You explicitly authorise Cashfree to send
          debit instructions on your behalf to the Partner with whom the
          Connected Payout Account is maintained by you.You acknowledge that no
          further instructions or consent shall be required by Cashfree on this
          subject matter.You agree that if monies lying the Connected Payout
          Account and/or the wallet(as applicable) are not adequate to provide
          for the fees for the proposed use of the Service, then you will not be
          able to use the Service till such time adequate monies are present in
          the Connected Payout Account and/or the wallet(as applicable).We also
          reserve the right to change the amount of fees including levying of
          charges for any services which was not being charged to you
          previously.
        </Text>

        <BtnContainer>
          <Button primary onClick={onConfirm}>
            I Agree
          </Button>
        </BtnContainer>
      </ModalDescription>
    </ModalContent>
  </Modal>
);

export default withErrorBoundary(TnCModal);
