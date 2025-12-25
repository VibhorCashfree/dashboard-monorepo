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
  Form,
  DateSelect,
  Ref,
} from '@cashfree-intl/coherent';
import moment from 'moment';
import _get from 'lodash/get';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import {
  requiredValidation,
  drivingLicenseValidation,
} from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { formatAmount, formatDate } from 'utils/common';

// Services
import { verify } from 'services/dl';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Components
import CalendarIconedInput from 'components/CalendarIconedInput';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

// Additional Components
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

const VerifyModal = ({ onClose, onVerify }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [formObj, setFormObj] = useState({
    verification_id: '69c507fgg-d95ddda-vrs-bd-ffgkwgtthydt',
  });
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
    const error = drivingLicenseValidation(value);

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
        Verify Driving License{' '}
        <Cross onClick={onClose} data-event-name="Form_VerifyDL_Icon_Close" />
      </ModalHeader>

      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <TestEnvironmentAlert />
            <Form.Input
              fluid
              name="dl_number"
              label="License Number"
              placeholder="Ex. KA5120190909083"
              error={errorObj.dl_number}
              value={formObj.dl_number}
              onChange={handleChange}
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
                {formatAmount(freeCreditRates.DRIVING_LICENSE)} will be deducted
                from your available balance
              </Text>
            </StyledRateBanner>

            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_VerifyDL_SecondaryButton"
              >
                Cancel
              </Button>

              <Button
                primary
                className="ml-4"
                type="submit"
                disabled={disabled}
                loading={loading}
                data-event-name="Form_VerifyDL_PrimaryButton"
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
