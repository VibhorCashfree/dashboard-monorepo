import React, { useState, useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Form,
  Space,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Cross,
  Button,
  DateSelect,
  Ref,
} from '@cashfree-intl/coherent';
import moment from 'moment';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';
import _get from 'lodash/get';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Components
import CalendarIconedInput from 'components/CalendarIconedInput';

// Services
import { verifyPanLite } from 'services/pan-lite';

// Styled
import { BtnContainer } from 'styled/common';

// Utils
import isFormValid from 'utils/isFormValid';
import { nameValidation, panValidation } from 'utils/formValidation';
import { formatAmount } from 'utils/common';

const VerifyModal = ({ onClose, onVerify }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [formObj, setFormObj] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'name':
        error = nameValidation('Name', value.trim(), true);
        break;

      case 'pan':
        error = panValidation(value);
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const onSelect = newDateValue => {
    setFormObj(prev => ({
      ...prev,
      dob: moment(newDateValue).format('YYYY-MM-DD'),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const response = await verifyPanLite(formObj);

    setLoading(false);

    if (!response.error) {
      onVerify(_get(response, 'status'), response);
    }
  };

  const disabled =
    !isFormValid(
      _pickBy(formObj, _identity),
      _pickBy(errorObj, _identity),
      REQUIRED_FIELDS,
    ) || loading;

  return (
    <Modal $maxWidth="460" open>
      <ModalHeader>
        <Space justifyContent="space-between" alignItems="center">
          <Text variant="h20">Verify PAN Lite</Text>
          <Cross
            onClick={onClose}
            data-event-name="Form_VerifyPANOCR_Icon_Close"
          />
        </Space>
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              className="mb-1"
              fluid
              name="pan"
              label={
                <Text color="bodyLight" className="mb-1">
                  Pan
                </Text>
              }
              placeholder="Ex. ABCP1234A1"
              error={errorObj.pan}
              value={formObj.pan}
              onChange={handleChange}
            />

            <Form.Input
              fluid
              name="name"
              label={
                <Text color="bodyLight" className="mb-1">
                  Name
                </Text>
              }
              placeholder="Name"
              error={errorObj.name}
              value={formObj.name}
              onChange={handleChange}
              className="mb-1"
            />

            <Text className="mb-1" color="bodyLight">
              Date of Birth
            </Text>
            <DateSelect
              trigger={forwardRef((props, ref) => (
                <Ref innerRef={ref}>
                  <Form.Field
                    fluid
                    control={CalendarIconedInput}
                    type="text"
                    placeholder="Select Date"
                    className="mb-2"
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
            <Text color="warning">
              {formatAmount(freeCreditRates.PAN_LITE)} will be deducted from
              your available balance
            </Text>
            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_VerifyPANOCR_SecondaryButton"
              >
                Cancel
              </Button>
              <Button
                primary
                className="ml-4"
                onClick={handleSubmit}
                disabled={disabled}
                loading={loading}
                data-event-name="Form_VerifyPANOCR_SecondaryButton"
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
