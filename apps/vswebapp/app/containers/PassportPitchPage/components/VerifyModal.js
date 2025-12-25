import React, { useState, useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Label,
  Form,
  DateSelect,
  Ref,
} from '@cashfree-intl/coherent';
import moment from 'moment';
import _get from 'lodash/get';

// Components
import CalendarIconedInput from 'components/CalendarIconedInput';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import { nameValidation, passportValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { formatDate, formatAmount } from 'utils/common';

// Services
import { verify } from 'services/passport';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

const VerifyModal = ({ onClose, onVerify }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [formObj, setFormObj] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const response = await verify(formObj);

    setLoading(false);

    if (!response.error) {
      onVerify(_get(response, 'status'), response);
    }
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'name':
        error = nameValidation('Name', value, true, true);
        break;

      case 'file_number':
        error = passportValidation(value);
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const onSelect = newDateValue => {
    setFormObj(prev => ({
      ...prev,
      dob: formatDate(newDateValue),
    }));
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS) || loading;

  return (
    <Modal $maxWidth="380" open>
      <ModalHeader>
        Verify Passport{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_PassportVerification_Icon_Close"
        />
      </ModalHeader>

      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              name="file_number"
              label="File Number"
              placeholder="Ex. BO1079341954215"
              error={errorObj.file_number}
              value={formObj.file_number}
              onChange={handleChange}
            />

            <Form.Input
              fluid
              name="name"
              label={
                <Text color="bodyLight" className="mb-1">
                  Name <Label size="mini">Optional</Label>
                </Text>
              }
              placeholder="Name"
              error={errorObj.name}
              value={formObj.name}
              onChange={handleChange}
            />

            <Text color="bodyLight" className="mb-1">
              Date of Birth
            </Text>

            <DateSelect
              trigger={forwardRef((props, ref) => (
                <Ref innerRef={ref}>
                  <Form.Field
                    fluid
                    className=""
                    control={CalendarIconedInput}
                    type="text"
                    placeholder="Select Date"
                    data-testid="calendar"
                    value={
                      formObj.dob
                        ? moment(formObj.dob).format('DD/MM/YYYY')
                        : ''
                    }
                    {...props}
                  />
                </Ref>
              ))}
              onSelect={onSelect}
              selectable
              max={new Date()}
            />

            <StyledRateBanner className="p-1  mt-2">
              <Text color="warning">
                {formatAmount(freeCreditRates.PASSPORT)} will be deducted from
                your available balance
              </Text>
            </StyledRateBanner>

            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_PassportVerification_SecondaryButton"
              >
                Cancel
              </Button>

              <Button
                primary
                className="ml-4"
                type="submit"
                disabled={disabled}
                loading={loading}
                data-event-name="Form_PassportVerification_PrimaryButton"
              >
                Verify
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

VerifyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
};

export default VerifyModal;
