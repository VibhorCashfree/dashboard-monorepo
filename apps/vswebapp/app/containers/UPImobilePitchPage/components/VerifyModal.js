import React, { useState, useContext } from 'react';
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
  Grid,
  Column,
  Form,
  Checkbox,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import { digitOnlyKeys, formatAmount } from 'utils/common';
import { nameValidation, phoneNumberValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';

// Services
import { verifyUPIvpa } from 'services/UPI';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Components
import PhoneLabeledInput from 'components/PhoneLabeledInput';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

const VerifyModal = ({ onClose, onVerify }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [formObj, setFormObj] = useState({
    additional_vpas: false,
  });
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const response = await verifyUPIvpa(formObj);

    if (!response.error) {
      onVerify(_get(response, 'account_status'), { ...formObj, ...response });
    }

    setLoading(false);
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'name':
        error = nameValidation('Name', value, true, true);
        break;

      case 'mobile_number':
        error = phoneNumberValidation(value, true);
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS) || loading;

  return (
    <Modal $maxWidth="380" open>
      <ModalHeader>
        <Text variant="h20">
          Verify UPI VPA - <Text as="span"> Mobile Number </Text>
        </Text>
        <Cross
          onClick={onClose}
          data-event-name="Form_VerifyUPIVPAMobileNumber_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Grid columns="equal">
                <Column>
                  <Form.Field
                    control={PhoneLabeledInput}
                    fluid
                    name="mobile_number"
                    type="text"
                    label={
                      <Text color="bodyLight" className="mb-1">
                        Phone Number
                      </Text>
                    }
                    maxLength="10"
                    placeholder="Phone Number"
                    error={errorObj.mobile_number}
                    value={formObj.mobile_number}
                    onChange={handleChange}
                    onKeyDown={digitOnlyKeys}
                  />
                </Column>
              </Grid>
            </Form.Field>
            <Form.Input
              fluid
              name="name"
              label={
                <Text color="bodyLight" className="mb-1">
                  Account Holder Name <Label size="mini">Optional</Label>
                </Text>
              }
              placeholder="Account Holder Name"
              error={errorObj.name}
              value={formObj.name}
              onChange={handleChange}
            />

            <Checkbox
              label="Fetch all VPA's linked to mobile number"
              name="additional_vpas"
              onClick={() =>
                setFormObj(prev => ({
                  ...prev,
                  additional_vpas: !prev.additional_vpas,
                }))
              }
            />

            <StyledRateBanner className="p-1  mt-2">
              <Text color="warning">
                {formatAmount(
                  formObj.additional_vpas
                    ? freeCreditRates.MULTIPLE_VPA
                    : freeCreditRates.UPI_MOBILE_V,
                )}{' '}
                will be deducted from your available balance
              </Text>
            </StyledRateBanner>
            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_VerifyUPIVPAMobileNumber_SecondaryButton"
              >
                Cancel
              </Button>
              <Button
                primary
                className="ml-4"
                type="submit"
                disabled={disabled}
                loading={loading}
                data-event-name="Form_VerifyUPIVPAMobileNumber_PrimaryButton"
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
  onVerify: PropTypes.func,
};

export default VerifyModal;
