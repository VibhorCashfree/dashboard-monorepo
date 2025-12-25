import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Cross,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
  Popup,
  Form,
  Space,
  RadioButton,
  InputWithAction,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _omit from 'lodash/omit';

// Styled
import { BtnContainer, StyledRateBanner } from 'styled/common';

// Components
import Icon from 'components/Icon';
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

// Utils
import { formatAmount } from 'utils/common';
import isFormValid from 'utils/isFormValid';
import {
  phoneNumberValidation,
  requiredValidation,
} from 'utils/formValidation';

// Constants
import { INITIAL_FORM_STATE, REQUIRED_FIELDS } from '../constants';

// Services
import { retrieveData } from 'services/mobile';

// Helpers
import { isAdvanceEnabled } from '../helpers';

// Providers
import { AccountContext } from 'providers/AccountProvider';

const RetriveModal = ({ onClose, onResponse }) => {
  const { freeCreditRates } = useContext(AccountContext);

  const [formObj, setFormObj] = useState(INITIAL_FORM_STATE);
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'retriveType':
        setFormObj(formObj => ({
          ...formObj,
          retriveTypeOptions: formObj.retriveTypeOptions.map(option => ({
            ...option,
            checked: option.value === value,
          })),
        }));

        break;

      case 'phoneNumber':
        error = phoneNumberValidation(value);

        setErrorObj(prev => ({ ...prev, [name]: error }));
        setFormObj(formObj => ({
          ...formObj,
          phoneNumber: value,
        }));

        break;

      case 'name':
        error = requiredValidation(value);

        setErrorObj(prev => ({ ...prev, [name]: error }));
        setFormObj(formObj => ({
          ...formObj,
          name: value,
        }));

        break;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const queryObj = {
      mobile_number: _get(formObj, 'phoneNumber', ''),
      consent_desc: 'Fetching Data for Testing',
      name: _get(formObj, 'name', ''),
      type: _get(formObj, 'retriveTypeOptions', []).find(item => item.checked)
        .value,
    };

    const response = await retrieveData(queryObj);

    setLoading(false);

    onResponse(
      response,
      response?.status,
      _get(formObj, 'phoneNumber', ''),
      isAdvance,
    );
  };

  const isAdvance = isAdvanceEnabled(formObj);

  const freeCreditAmount = isAdvance
    ? freeCreditRates.MOBILE_360_ADVANCE
    : freeCreditRates.MOBILE_360_LITE;

  const disabled =
    !isFormValid(
      _omit(formObj, 'retriveTypeOptions'),
      errorObj,
      isAdvance ? [...REQUIRED_FIELDS, 'name'] : REQUIRED_FIELDS,
    ) || loading;

  return (
    <div>
      <Modal $maxWidth="384" open>
        <ModalHeader>
          Retrieve Information
          <Cross
            onClick={onClose}
            data-event-name="Form_VerifyUPI360_Icon_Close"
          />
        </ModalHeader>

        <ModalContent>
          <ModalDescription>
            <Form onSubmit={handleSubmit}>
              <TestEnvironmentAlert />
              <Space direction="column" gap={3}>
                <div>
                  <Space alignItems="center" gap={1} className="mb-2">
                    <Text variant="b14" color="bodyLight">
                      Choose API Type
                    </Text>

                    <Popup
                      content="Choose whether you want to retrieve information at a surface level (lite) or perform a deep dive (advanced)."
                      position="right center"
                      trigger={
                        <span>
                          <Icon name="info" className="pointer" />
                        </span>
                      }
                    />
                  </Space>

                  <Space gap={7}>
                    {formObj.retriveTypeOptions.map(option => (
                      <RadioButton
                        label={option.label}
                        name={option.name}
                        value={option.value}
                        checked={option.checked}
                        onChange={handleChange}
                      />
                    ))}
                  </Space>
                </div>

                <InputWithAction
                  inputLabel="Phone Number"
                  name="phoneNumber"
                  label="+91"
                  type="number"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={formObj.phoneNumber}
                  errors={errorObj}
                  touched={errorObj}
                  fluid
                />

                {isAdvance && (
                  <Form.Input
                    name="name"
                    value={formObj.name}
                    label="Name"
                    placeholder="Name"
                    onChange={handleChange}
                    error={errorObj.name}
                  />
                )}
              </Space>

              <StyledRateBanner className="p-1 mt-3">
                <Text color="warning" variant="b12">
                  {formatAmount(freeCreditAmount)} will be deducted from your
                  available balance
                </Text>
              </StyledRateBanner>

              <BtnContainer>
                <Button
                  as="a"
                  link
                  onClick={onClose}
                  data-event-name="Form_VerifyUPI360_SecondaryButton"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="ml-4"
                  primary
                  disabled={disabled}
                  loading={loading}
                  data-event-name="Form_VerifyUPI360_PrimaryButton"
                >
                  Retrieve
                </Button>
              </BtnContainer>
            </Form>
          </ModalDescription>
        </ModalContent>
      </Modal>
    </div>
  );
};

RetriveModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onResponse: PropTypes.func,
};

export default RetriveModal;
