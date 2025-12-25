import React, { useState } from 'react';
import {
  Form,
  Grid,
  Row,
  Column,
  Text,
  Button,
  Cross,
  Checkbox,
  List,
  Modal,
  ModalHeader,
  ModalDescription,
  ModalContent,
} from '@cashfree-intl/coherent';
import _pick from 'lodash/pick';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { addNewRecipient } from 'services/settings';

// Utils
import isFormValid from 'utils/isFormValid';
import { emailValidation } from 'utils/formValidation';

// Constants
import { KNOW_MORE } from 'constants/urls';
import { REQUIRED_FIELDS } from '../constants';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { AddRecipientModalProps } from '../types';

const AddRecipientModal: React.FC<AddRecipientModalProps> = ({
  data,
  selectedAccountId,
  onSubmit,
  onClose,
}) => {
  const [formObj, setFormObj] = useState<AnyObject>({});
  const [errorObj, setErrorObj] = useState<AnyObject>({});
  const [selectedIds, setSelectedIds] = useState<string[]>(Object.keys(data));
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const queryObj = { selectedAccountId };

    const recipients =
      formObj.emails?.split(',').map((email: string) => email.trim()) || [];

    const selectedData = _pick(data, selectedIds);

    const body = {
      product: 'PAYOUT',
      notifType: Object.keys(selectedData).map(
        (id) => selectedData[id].notifType,
      ),
      notifSubType: Object.keys(selectedData).map(
        (id) => selectedData[id].notifSubType,
      ),
      recipients,
    };

    const response = await addNewRecipient(queryObj, body);

    setLoading(false);

    const status =
      'error' in response
        ? (response.error as { status: string }).status
        : response.status;

    onSubmit(status as string);
  };

  const handleToggle = (id: string) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => id !== prevId)
        : prevIds.concat(id),
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      case 'emails':
        {
          const emailArray = value.split(',');

          if (emailArray.length > 10) {
            error = 'Exceeding maximum limit of recipients allowed';
          } else {
            const invalidEmails = emailArray.filter((email) =>
              emailValidation(email),
            );

            if (invalidEmails.length > 1) {
              error = 'Invalid emails';
            } else if (invalidEmails.length === 1) {
              error = 'Invalid email';
            }
          }
        }
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const disabled = !isFormValid(
    formObj,
    errorObj,
    REQUIRED_FIELDS.ADD_RECIPIENT,
  );

  return (
    <Modal $maxWidth="714" open>
      <ModalHeader>
        <span className="modal-header">Add Recipient</span>
        <Cross data-event-name="Close_Icon_Add_Recipient" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              className="m-0"
              data-testid="emails"
              label="Enter Email Address"
              name="emails"
              error={errorObj.emails}
              value={formObj.emails}
              onChange={handleChange}
            />
            <Text color="bodyLight" className="mt-1 mb-4">
              Maximum of 10 recipients are allowed. Multiple email IDs can be
              separated using a comma.
            </Text>

            <Text color="bodyLight" className="mb-1">
              Select Email Categories
            </Text>
            <Text variant="b12" color="bodyLight" className="mb-2">
              <a
                href={KNOW_MORE.EMAIL_NOTIFICATIONS}
                target="_blank"
                rel="noopener noreferrer"
                data-event-name="Link"
              >
                Know more
              </a>{' '}
              about email categories
            </Text>
            <Grid className="px-2">
              <Row columns={3}>
                {Object.keys(data).map((id) => (
                  <Column key={id} className="p-0">
                    <List.Item>
                      <List.Content className="pt-1 pr-1">
                        <Checkbox
                          defaultChecked
                          label={data[id].name}
                          onChange={() => handleToggle(id)}
                        />
                      </List.Content>
                    </List.Item>
                  </Column>
                ))}
              </Row>
            </Grid>

            <BtnContainer className="mt-4">
              <Button
                data-event-name="Secondary_Button_Add_Recipient"
                as="a"
                link
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                data-event-name="Primary_Button_Add_Recipient"
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

export default withErrorBoundary(AddRecipientModal);
