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
  Grid,
  Column,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _omitBy from 'lodash/omitBy';
import _isNull from 'lodash/isNull';
import moment from 'moment';

// Components
import CalendarIconedInput from 'components/CalendarIconedInput';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import {
  requiredValidation,
  phoneNumberValidation,
  panValidation,
  nameValidation,
  uanValidation,
} from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { formatAmount, formatDate } from 'utils/common';

// Services
import { verifyAdvancedEmployment } from 'services/advance-employment';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

// Components
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';
import { StyledMsg } from '../styled';

const VerifyModal = ({ onClose, onVerify }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [formObj, setFormObj] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const response = await verifyAdvancedEmployment(formObj);

    setLoading(false);

    if (!response.error) {
      onVerify(_get(response, 'status'), response);
    }
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'phone':
        error = phoneNumberValidation(value, true);
        break;

      case 'pan':
        error = panValidation(value, true);
        break;

      case 'uan':
        error = uanValidation(value);
        break;

      case 'employee_name':
        error = nameValidation('Employee Name', value, false, true);
        break;

      case 'employer_name':
        error = nameValidation('Employer Name', value, false, true);
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

  const disabled = loading || Object.values(_omitBy(errorObj, _isNull)).length;

  return (
    <Modal $maxWidth="560" open>
      <ModalHeader>
        Verify Employment 360{' '}
        <Cross
          onClick={onClose}
          data-event-name="Form_VerifyAdvEmployment_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <TestEnvironmentAlert />
          <StyledMsg className="mb-2">
            <Text color="white">
              Possible Combinations for Advance Employment Verification: <br />
              1. Phone <br />
              2. UAN <br />
              3. Phone, PAN <br />
              4. Phone,Date of Birth, Employee Name <br />
              5. Phone, Employee Name & employerName <br />
              6. Phone, Date of Birth, Employee Name, Employer Name <br />
              7. Phone, PAN, Employee Name, Employer Name <br />
              8. Phone, PAN, Date of Birth, Employee Name, Employer Name <br />
              9. UAN, Employee Name <br />
              10. UAN, Employee Name, Employer Name <br />
              11. Date of Birth, Employee Name <br />
              12. Date of Birth, Employee Name, Employer Name <br />
            </Text>
          </StyledMsg>

          <Form onSubmit={handleSubmit}>
            <Grid columns="equal" className="my-1 ">
              <Column className="py-0">
                <Form.Input
                  fluid
                  name="phone"
                  label="Phone"
                  placeholder="Ex. 7014543520"
                  error={errorObj.phone}
                  value={formObj.phone}
                  onChange={handleChange}
                />
              </Column>
              <Column className="py-0">
                <Form.Input
                  fluid
                  name="pan"
                  label="Pan"
                  placeholder="Ex. BEBPJ5497Q"
                  error={errorObj.pan}
                  value={formObj.pan}
                  onChange={handleChange}
                />
              </Column>
            </Grid>
            <Grid columns="equal" className="mb-1">
              <Column className="py-0">
                <Form.Input
                  fluid
                  name="uan"
                  label="UAN"
                  placeholder="Ex. 101340612345"
                  error={errorObj.uan}
                  value={formObj.uan}
                  onChange={handleChange}
                />
              </Column>
              <Column className="py-0">
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
              </Column>
            </Grid>
            <Grid columns="equal" className="mb-1">
              <Column className="py-0">
                <Form.Input
                  fluid
                  name="employee_name"
                  label="Employee Name"
                  placeholder="Ex. John Doe"
                  error={errorObj.employee_name}
                  value={formObj.employee_name}
                  onChange={handleChange}
                />
              </Column>
              <Column className="py-0">
                <Form.Input
                  fluid
                  name="employer_name"
                  label="Employer Name"
                  placeholder="Ex. Cashfree. Pvt. Ltd."
                  error={errorObj.employer_name}
                  value={formObj.employer_name}
                  onChange={handleChange}
                />
              </Column>
            </Grid>

            <StyledRateBanner className="p-1  mt-2">
              <Text color="warning">
                {formatAmount(freeCreditRates.ADVANCE_EMPLOYMENT)} will be
                deducted from your available balance
              </Text>
            </StyledRateBanner>
            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_VerifyAdvEmployment_SecondaryButton"
              >
                Cancel
              </Button>
              <Button
                primary
                className="ml-4"
                type="submit"
                disabled={disabled}
                loading={loading}
                data-event-name="Form_VerifyAdvEmployment_PrimaryButton"
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
