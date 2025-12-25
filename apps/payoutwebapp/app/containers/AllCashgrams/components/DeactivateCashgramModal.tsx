import React, { useState } from 'react';
import {
  Text,
  toast,
  Cross,
  Button,
  Grid,
  Row,
  Column,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { deactivate } from 'services/cashgrams';

// Utils
import { formatAmount } from 'utils/common';

// Constants
import { MODAL_TYPE } from '../constants';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { DeactivateCashgramModalProps } from '../types';

const DeactivateCashgramModal: React.FC<DeactivateCashgramModalProps> = ({
  onClose,
  data,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDeactivate = async () => {
    setLoading(true);

    const response = await deactivate(data.cashgramId);

    setLoading(false);

    if (!('error' in response)) {
      toast.success(response.message);
      onSubmit(MODAL_TYPE.DEACTIVATE_SUCCESS);

      return;
    }

    onSubmit(MODAL_TYPE.DEACTIVATE_FAILED);
  };

  return (
    <Modal $maxWidth="480" open>
      <ModalHeader>
        Deactivate Cashgram{' '}
        <Cross
          data-event-name="Close_Icon_Deactivate_Cashgram"
          onClick={onClose}
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Text color="bodyLight" className="mb-2">
            Are you sure to deactivate the below Cashgram?
          </Text>
          <Grid divided="vertically">
            <Row columns={2}>
              <Column>
                <Text color="bodyLight" className="mb-2">
                  Cashgram ID
                </Text>
                <Text color="bodyLight" className="mb-2">
                  Beneficiary Name
                </Text>
                <Text color="bodyLight" className="mb-2">
                  Beneficiary Phone Number
                </Text>
                <Text color="bodyLight">Amount</Text>
              </Column>
              <Column>
                <Text className="mb-2">{data.cashgramId}</Text>
                <Text className="mb-2">{data.name}</Text>
                <Text className="mb-2">{data.phone}</Text>
                <Text>{formatAmount(data.amount)}</Text>
              </Column>
            </Row>
          </Grid>
          <BtnContainer className="mt-2">
            <Button
              data-event-name="Secondary_Button_Deactivate_Cashgram"
              as="a"
              link
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              data-event-name="Primary_Button_Deactivate_Cashgram"
              primary
              className="ml-4"
              loading={loading}
              onClick={handleDeactivate}
            >
              Deactivate
            </Button>
          </BtnContainer>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(DeactivateCashgramModal);
