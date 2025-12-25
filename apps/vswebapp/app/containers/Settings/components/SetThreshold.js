import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Paper,
  Space,
  Text,
  Toggle,
  Button,
  toast,
  Form,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Services
import {
  getLowBalanceThreshold,
  setLowBalanceThreshold,
} from 'services/accounts';

// Utils
import { amountValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Components
import Loader from 'components/Loader';
import MetaTags from 'components/MetaTags';
import AmountLabeledInput from 'components/AmountLabeledInput';
import PageHeader from 'components/PageHeader';
import Icon from 'components/Icon';

// Styled
import { BackButtonWrapper, BtnContainer } from 'styled/common';
import { StyledThreshold } from '../styled';

const SetThreshold = () => {
  const { fundSourceDetails } = useContext(AccountContext);

  const [data, setData] = useState();
  const [formObj, setFormObj] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [isFirst, setIsFirst] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchData() {
      const response = await getLowBalanceThreshold({
        fundSourceId: _get(fundSourceDetails, 'fundSourceId'),
      });

      if (response.error) {
        setFormObj(prev => ({
          fundSourceId: prev.fundSourceId,
          lowBalance: '',
        }));
        setIsFirst(true);
      } else {
        setData(response);
        setFormObj({
          lowBalance: response.lowBalance,
          isActive: response.isActive,
        });
      }
    })();
  }, []);

  const handleSubmit = async e => {
    e.stopPropagation();

    const body = {
      lowBalance: String(formObj.lowBalance),
      isActive: !!formObj.isActive,
    };

    const response = await setLowBalanceThreshold(
      { fundSourceId: _get(fundSourceDetails, 'fundSourceId') },
      body,
    );

    if (!response.error) {
      setData(prev => ({ ...prev, lowBalance: formObj.lowBalance }));
      toast.success('Low balance threshold set successfully');
    }
  };

  const handleCancel = async e => {
    e.stopPropagation();
    setFormObj({ lowBalance: data.lowBalance, isActive: data.isActive });
  };

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'lowBalance':
        error = amountValidation(value, undefined, 2);
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = () =>
    setFormObj(prev => ({ ...prev, isActive: !prev.isActive }));

  let noChange;
  if (data) {
    noChange =
      data.lowBalance === formObj.lowBalance &&
      data.isActive === formObj.isActive;
  }

  const disabled =
    !isFormValid(formObj, errorObj, REQUIRED_FIELDS.SET_THRESHOLD) ||
    noChange ||
    (isFirst && !formObj.isActive);

  return (
    <StyledThreshold>
      <PageHeader embedKey="SETTINGS">
        <span>Settings - </span> Secure ID
      </PageHeader>
      <MetaTags title="Settings – Secure ID" />

      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
        <Text as="span" variant="h16" className="ml-2">
          Set Threshold
        </Text>
      </BackButtonWrapper>

      <Text color="bodyLight" className="mt-1 mb-4">
        Set a minimum balance you want to maintain in your fund source.
      </Text>
      <Paper style={{ width: 327 }} className="my-1 p-4">
        <Space justifyContent="space-between" alignItems="center">
          <Text as="span" variant="h16" strong>
            Notify when the balance drops below the threshold.
          </Text>
          <Toggle active={formObj.isActive} onToggle={handleToggle} />
        </Space>
        <Form onSubmit={handleSubmit}>
          <Text variant="p14" color="bodyLight" className="mt-4 mb-1">
            Minimum Balance
          </Text>
          <Form.Input
            fluid
            control={AmountLabeledInput}
            name="lowBalance"
            type="decimal"
            step=".01"
            placeholder="Amount"
            error={errorObj.lowBalance}
            value={formObj.lowBalance}
            onChange={handleChange}
          />
          <Text variant="b12" color="bodyLight" className="mt-2">
            You can enable email notifications and update the list of recipients
            to receive alerts in the{' '}
            <Link to="email-notifications">Email Notifications</Link> section.
          </Text>
          <BtnContainer>
            <Button
              as="a"
              link
              disabled={noChange}
              onClick={handleCancel}
              data-event-name="Secondary_Button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="ml-4"
              primary
              disabled={disabled}
              data-event-name="Primary_Button"
            >
              Confirm
            </Button>
          </BtnContainer>
        </Form>
      </Paper>
    </StyledThreshold>
  );
};

export default withReadPermission(SetThreshold, {
  code: 21503,
  description: 'access Set Threshold',
});
