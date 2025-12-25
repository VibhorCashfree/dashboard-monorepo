import React, { useState } from 'react';
import { Text, Button, Form } from '@cashfree-intl/coherent';
import _size from 'lodash/size';

// Servicecs
import { verifyIFSC } from 'services/bav';

// Utils
import Analytics from 'utils/analytics';
import { ifscValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';

// Constants
import EVENTS from 'constants/analytics';
import { KNOW_MORE } from 'constants/urls';
import { REQUIRED_FIELDS } from './constants';

// Components
import ErrorAlert from './components/ErrorAlert';
import SuccessAlert from './components/SuccessAlert';
import TestEnvironmentAlert from 'components/TestEnvironmentAlert';

// Styled
import { BtnContainer } from 'styled/common';
import { StyledVerifyIfsc } from './styled';

const VerifyIfsc = () => {
  const [data, setData] = useState({});
  const [formObj, setFormObj] = useState({});
  const [errorObj, setErrorObj] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await verifyIFSC(formObj);
    setData(response);
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'ifsc':
        error = ifscValidation(value);
        break;
    }

    if (data) {
      setData({});
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const renderAlerts = () => {
    if (_size(data)) {
      if (data.error) {
        Analytics.track(EVENTS.IFSC.VERIFY_FAILED);

        return <ErrorAlert />;
      }
      Analytics.track(EVENTS.IFSC.VERIFY_SUCCESS);

      return <SuccessAlert data={data} />;
    }
  };

  const disabled = !isFormValid(formObj, errorObj, REQUIRED_FIELDS);

  return (
    <>
      <Text className="my-2" color="bodyLight">
        Verify IFSC{' '}
        <a
          href={KNOW_MORE.BAV.VERIFY_IFSC}
          target="_blank"
          data-event-name="Link"
        >
          Know more
        </a>
      </Text>

      <StyledVerifyIfsc>
        <TestEnvironmentAlert />
        <Form onSubmit={handleSubmit}>
          <Form.Input
            className="m-0"
            fluid
            name="ifsc"
            label="Enter IFSC"
            placeholder="Enter IFSC"
            error={errorObj.ifsc}
            value={formObj.ifsc}
            onChange={handleChange}
          />

          <BtnContainer>
            <Button
              type="submit"
              primary
              disabled={disabled}
              data-event-name="Primary_Button"
            >
              Verify
            </Button>
          </BtnContainer>
        </Form>

        {renderAlerts()}
      </StyledVerifyIfsc>
    </>
  );
};

export default VerifyIfsc;
