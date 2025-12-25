import React, { useState } from 'react';
import {
  Grid,
  Form,
  Row,
  Column,
  Text,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Dropdown,
  Divider,
  Space,
} from '@cashfree-intl/coherent';
import _size from 'lodash/size';
import _groupBy from 'lodash/groupBy';

// Services
import { markTerminalStatus } from 'services/agreements';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Utils
import Analytics from 'utils/analytics';
import isFormValid from 'utils/isFormValid';
import { formatAmount } from 'utils/common';

// Constants
import {
  statusOptions,
  MODAL_TYPE,
  STATUS,
  REQUIRED_FIELDS,
} from '../constants';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { MarkTerminalStatusModalProps } from '../types';

const MarkTerminalStatusModal: React.FC<MarkTerminalStatusModalProps> = ({
  data,
  onClose,
  onResponse,
}) => {
  const [formObj, setFormObj] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  const { BUYER: buyers = [], SELLER: sellers = [] } = _groupBy(
    data.parties,
    'type',
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const response = await markTerminalStatus({
      agreement_id: data.agreement_id,
      status: formObj.status,
    });

    if (!('error' in response)) {
      onResponse(MODAL_TYPE.UPDATE_SUCCESS, {
        agreement_id: data.agreement_id,
        total_amount: data.total_amount,
        number_of_payouts:
          formObj.status === STATUS.REFUND ? _size(buyers) : _size(sellers),
      });
    } else {
      onResponse(MODAL_TYPE.UPDATE_FAILED, {
        message: (response.error as { message: string }).message,
      });
    }

    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLElement>,
    { name, value }: { name: string; value: string },
  ) => {
    switch (name) {
      case 'status':
        Analytics.track('Dropdown_status', {
          value,
        });
        break;
    }

    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const disabled =
    !isFormValid(formObj, {}, REQUIRED_FIELDS.MARK_TERMINAL_STATUS) || loading;

  return (
    <Modal $maxWidth="480" open>
      <ModalHeader>
        Mark Terminal Status
        <Cross onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Space
              justifyContent="space-between"
              alignItems="center"
              className="mb-1"
            >
              <Text variant="b12" className="mt-1" color="bodyLight">
                Agreement ID
              </Text>
              <Text className="my-1" variant="b12">
                {data.agreement_id}
              </Text>
            </Space>

            <Text as="p" variant="b12" color="bodyLight">
              Update Status
            </Text>
            <Dropdown
              selection
              fluid
              className="mb-3"
              name="status"
              placeholder="Choose Status"
              options={statusOptions}
              value={formObj.status}
              onChange={handleChange}
            />

            {formObj.status && (
              <>
                <Text variant="h16" className="mt-1">
                  Payouts Summary
                </Text>
                <Divider />
              </>
            )}

            {formObj.status === STATUS.REFUND &&
              buyers.map(
                (
                  party: {
                    name: string;
                    type: string;
                    allocated_amount: number;
                  },
                  index: number,
                ) => (
                  <>
                    <Grid divided="vertically" key={index}>
                      <Row columns={2}>
                        <Column>
                          <Text as="p" variant="b12" color="bodyLight">
                            Beneficiary{index + 1}
                          </Text>
                          <Text as="p" variant="b12" color="bodyLight">
                            Party Type
                          </Text>
                          <Text as="p" variant="b12" color="bodyLight">
                            Proportion
                          </Text>
                          <Text as="p" variant="b12" color="bodyLight">
                            Payout Amount
                          </Text>
                        </Column>
                        <Column>
                          <Text as="p" variant="b12" color="black">
                            {party.name}
                          </Text>
                          <Text as="p" variant="b12" color="black">
                            {party.type}
                          </Text>
                          <Text as="p" variant="b12" color="black">
                            {party.allocated_amount / data.total_amount}
                          </Text>
                          <Text as="p" variant="b12" color="black">
                            {formatAmount(party.allocated_amount)}
                          </Text>
                        </Column>
                      </Row>
                    </Grid>
                    <Divider />
                  </>
                ),
              )}

            {formObj.status === STATUS.SUCCESS &&
              sellers.map(
                (
                  party: {
                    name: string;
                    type: string;
                    allocated_amount: number;
                  },
                  index: number,
                ) => (
                  <>
                    <Grid divided="vertically" key={index}>
                      <Row columns={2}>
                        <Column>
                          <Text as="p" variant="b12" color="bodyLight">
                            Beneficiary{index + 1}
                          </Text>
                          <Text as="p" variant="b12" color="bodyLight">
                            Party Type
                          </Text>
                          <Text as="p" variant="b12" color="bodyLight">
                            Proportion
                          </Text>
                          <Text as="p" variant="b12" color="bodyLight">
                            Payout Amount
                          </Text>
                        </Column>
                        <Column>
                          <Text as="p" variant="b12" color="black">
                            {party.name}
                          </Text>
                          <Text as="p" variant="b12" color="black">
                            {party.type}
                          </Text>
                          <Text as="p" variant="b12" color="black">
                            {party.allocated_amount / data.total_amount}
                          </Text>
                          <Text as="p" variant="b12" color="black">
                            {formatAmount(party.allocated_amount)}
                          </Text>
                        </Column>
                      </Row>
                    </Grid>
                    <Divider />
                  </>
                ),
              )}

            <Space
              justifyContent="space-between"
              alignItems="center"
              className="mb-1"
            >
              <Text variant="p14" className="mt-1">
                Total Sum
              </Text>
              <Text className="my-1" variant="h20">
                {formatAmount(data.total_amount)}
              </Text>
            </Space>

            <BtnContainer>
              <Button as="a" link onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                loading={loading}
              >
                Submit
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(MarkTerminalStatusModal);
