import React, { useState, forwardRef, FC } from 'react';
import {
  Text,
  Label,
  Form,
  Ref,
  Checkbox,
  DateSelect,
  Grid,
  Column,
  Popup,
  Dropdown,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';
import moment from 'moment';
import _size from 'lodash/size';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Components
import Icon from 'components/Icon';
import CalendarIconedInput from 'components/CalendarIconedInput';
import PhoneLabeledInput from 'components/PhoneLabeledInput';
import AmountLabeledInput from 'components/AmountLabeledInput';

// Constants
import { FORMATS } from 'constants/date';
import {
  dateSelectConfig,
  payoutTypeOptions,
  REQUIRED_FIELDS,
} from '../constants';

// Services
import { create, searchCashgram } from 'services/cashgrams';

// Utils
import { digitOnlyKeys } from 'utils/common';
import isFormValid from 'utils/isFormValid';
import {
  payoutTypeValidation,
  lengthValidation,
  cashgramIdValidation,
  nameValidation,
  emailValidation,
  phoneNumberValidation,
  amountValidation,
  remarksValidation,
} from 'utils/formValidation';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { CreateCashgramModalProps } from '../types';

const CreateCashgramModal: FC<CreateCashgramModalProps> = ({
  onClose,
  onResponse,
}) => {
  const { preferences } = useAccount();

  const [options, setOptions] =
    useState<{ text: string; value: string }[]>(payoutTypeOptions);
  const [formObj, setFormObj] = useState<AnyObject>({});
  const [errorObj, setErrorObj] = useState<AnyObject>({});

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const sendEmail = !!formObj.sendEmail;
    const sendSMS = !!formObj.sendSMS;
    const sendWhatsapp = !!formObj.sendWhatsapp;

    const vpa: string | null = formObj.vpa ? formObj.vpa.vpa : null;

    const body = {
      ...formObj,
      sendEmail,
      sendSMS,
      sendWhatsapp,
      isValidation: formObj.isValidation ? 1 : 0,
      source: formObj.isValidation ? 'DASHBOARD_VALIDATION' : 'DASHBOARD',
      linkExpiry: formObj.linkExpiry
        ? moment(formObj.linkExpiry).format(FORMATS.DATE)
        : moment().add(15, 'days').format(FORMATS.DATE),
    };

    const response = await create(body);

    setLoading(false);

    if (!('error' in response)) {
      const toBeSent: boolean = sendEmail || sendSMS || sendWhatsapp;

      if (response.cashgramLink) {
        onResponse('SUCCESS', {
          cashgramLink: response.cashgramLink,
          toBeSent,
        });
      } else {
        onResponse('SUCCESS', {
          referenceId: response.referenceId,
          cashgramId: response.cashgramId,
          amount: formObj.amount,
          vpa,
        });
      }
    } else {
      onResponse('FAILED', {
        message: (response.error as { message: string }).message,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | null,
    {
      name,
      type,
      value: val,
      checked,
    }: { name: string; type?: string; value: any; checked?: boolean },
  ) => {
    let error: string | undefined | null;

    const value: any = type === 'checkbox' ? checked : val;

    switch (name) {
      case 'cashgramId':
        error = cashgramIdValidation(value);
        break;

      case 'name':
        error = nameValidation('Beneficiary Name', value);
        break;

      case 'type':
        error = payoutTypeValidation(value, true);
        break;

      case 'email':
        error = emailValidation(value, true);
        break;

      case 'phone':
        error = phoneNumberValidation(value);
        break;

      case 'amount':
        error = amountValidation(value);
        break;

      case 'description':
        error = remarksValidation('Reason', value, 100, true);
        break;

      case 'remarks':
        error = remarksValidation('Remarks', value, 100, true);
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = async () => {
    if (!formObj.cashgramId) {
      return;
    }

    const response = await searchCashgram(formObj.cashgramId);

    if (!('error' in response)) {
      if (_size(response.cashgrams)) {
        setErrorObj((prev) => ({
          ...prev,
          cashgramId: `Cashgram with id ${formObj.cashgramId} already exists`,
        }));
      }
    }
  };

  const handleAddOption = (
    e: React.MouseEvent,
    { value }: { value: string },
  ) => {
    const error = lengthValidation('Payout Type', value, 20);

    if (error) {
      setErrorObj((prev) => ({ ...prev, type: error }));
    } else {
      setOptions((prev) => [{ text: value, value }, ...prev]);
    }
  };

  const disabled: boolean =
    !isFormValid(formObj, errorObj, REQUIRED_FIELDS) || loading;

  return (
    <Modal $maxWidth="500" open>
      <ModalHeader>
        Create Cashgram
        <Cross data-event-name="Close_Icon_Create_Cashgram" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Form.Field className="m-0">
              <Grid columns="equal">
                <Column>
                  <Form.Input
                    fluid
                    name="cashgramId"
                    label="Cashgram ID"
                    placeholder="Cashgram ID"
                    maxLength="36"
                    error={errorObj.cashgramId}
                    value={formObj.cashgramId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Column>
                <Column>
                  <Text color="bodyLight" className="mb-1">
                    Payout Type <Label size="mini">Optional</Label>{' '}
                    <Popup
                      position="right center"
                      content="Ex. Refund, Reimbursement, Rewards"
                      trigger={
                        <span>
                          <Icon
                            name="info"
                            className="pointer"
                            verticalAlign="top"
                          />
                        </span>
                      }
                    />
                  </Text>
                  <Dropdown
                    search
                    selection
                    fluid
                    name="type"
                    value={formObj.type}
                    placeholder={errorObj.type ? '' : 'Payout Type'}
                    allowAdditions
                    additionLabel={null}
                    options={options}
                    onChange={handleChange}
                    onAddItem={handleAddOption}
                  />
                  <Text variant="b12" color="danger" className="mt-1">
                    {errorObj.type}
                  </Text>
                  <Text variant="b12" color="bodyLight" className="mt-1">
                    Max. 20 characters
                  </Text>
                </Column>
              </Grid>
            </Form.Field>

            <Form.Input
              fluid
              name="name"
              label="Beneficiary Name"
              placeholder="Beneficiary Name"
              error={errorObj.name}
              value={formObj.name}
              onChange={handleChange}
            />

            <Form.Field className="m-0">
              <Grid columns="equal">
                <Column>
                  <Text color="bodyLight" className="mb-1">
                    Beneficiary Phone Number
                  </Text>
                  <Form.Field
                    control={PhoneLabeledInput}
                    fluid
                    name="phone"
                    type="text"
                    maxLength="10"
                    placeholder="10 digit phone number"
                    error={errorObj.phone}
                    value={formObj.phone}
                    onChange={handleChange}
                    onKeyDown={digitOnlyKeys}
                  />
                </Column>
                <Column>
                  <Form.Input
                    fluid
                    name="email"
                    label={
                      <Text color="bodyLight" className="mb-1">
                        Beneficiary Email ID <Label size="mini">Optional</Label>
                      </Text>
                    }
                    placeholder="Beneficiary Email ID"
                    error={errorObj.email}
                    value={formObj.email}
                    onChange={handleChange}
                  />
                </Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid columns="equal">
                <Column>
                  <Text color="bodyLight" className="mb-1">
                    Amount
                  </Text>
                  <Form.Field
                    fluid
                    className="m-0"
                    control={AmountLabeledInput}
                    name="amount"
                    inputmode="numeric"
                    step=".01"
                    placeholder="Amount"
                    error={errorObj.amount}
                    value={formObj.amount}
                    onChange={handleChange}
                  />
                </Column>
                <Column>
                  <Text variant="p14" color="bodyLight" className="mb-1">
                    Cashgram Valid Till
                  </Text>

                  <DateSelect
                    name="linkExpiry"
                    value={formObj.linkExpiry}
                    onSelect={(value: Date) =>
                      handleChange(null, { name: 'linkExpiry', value })
                    }
                    trigger={forwardRef((props, ref) => (
                      <Ref innerRef={ref}>
                        <Form.Field
                          fluid
                          type="text"
                          control={CalendarIconedInput}
                          error={errorObj.linkExpiry}
                          placeholder="Select Date"
                          value={
                            formObj.linkExpiry
                              ? moment(formObj.linkExpiry).format('DD/MMM/YYYY')
                              : ''
                          }
                          {...props}
                        />
                      </Ref>
                    ))}
                    {...dateSelectConfig}
                  />
                </Column>
              </Grid>
            </Form.Field>

            <Form.Input
              data-testid="description"
              name="description"
              className="mt-2"
              label={
                <Text color="bodyLight" className="mb-1">
                  Reason <Label size="mini">Optional</Label>
                </Text>
              }
              maxLength="100"
              error={errorObj.description}
              value={formObj.description}
              onChange={handleChange}
            />

            <Form.TextArea
              className="m-0"
              name="remarks"
              label={
                <Text color="bodyLight" className="mb-1">
                  Remarks <Label size="mini">Optional</Label>
                </Text>
              }
              maxLength="100"
              error={errorObj.remarks}
              value={formObj.remarks}
              onChange={handleChange}
            />
            <Text variant="b12" color="bodyLight" className="mt-1 mb-3">
              Maximum 100 characters are allowed. Remarks will be visible in the
              a/c statement, if the beneficiary bank supports.
            </Text>

            <Text color="bodyLight">
              Send Cashgram via
              <Checkbox
                className="ml-2"
                name="sendEmail"
                label="Email"
                checked={!!formObj.sendEmail}
                onChange={handleChange}
              />
              <Checkbox
                className="ml-2"
                name="sendSMS"
                label="SMS"
                checked={!!formObj.sendSMS}
                onChange={handleChange}
              />
              <Checkbox
                className="ml-2"
                name="sendWhatsapp"
                label="WhatsApp"
                checked={!!formObj.sendWhatsapp}
                onChange={handleChange}
              />
            </Text>
            <Text color="bodyLight" className="mt-3">
              <Checkbox
                label="Enable bank account verification"
                name="isValidation"
                disabled={!preferences.cashgrams.verify}
                checked={!!formObj.isValidation}
                onChange={handleChange}
              />
            </Text>

            <BtnContainer>
              <Button
                data-event-name="Secondary_Button_Create_Cashgram"
                as="a"
                link
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                data-event-name="Primary_Button_Create_Cashgram"
                primary
                type="submit"
                className="ml-4"
                disabled={disabled}
                loading={loading}
              >
                Create
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(CreateCashgramModal);
