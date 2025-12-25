import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Form,
  Paper,
  Text,
  Space,
  Toggle,
  Button,
  Dropdown,
  toast,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _find from 'lodash/find';

// Services
import {
  getLowBalanceThreshold,
  setLowBalanceThreshold,
} from 'services/fundSources';

// Utils
import Analytics from 'utils/analytics';
import getQuery from 'utils/getQuery';
import { amountValidation, requiredValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';

// Helpers
import { getFundSourcesOptions } from '../helpers';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
} from 'constants/menuItems';
import { REQUIRED_FIELDS } from '../constants';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';
import withReadPermission from 'hocs/withReadPermission';

// Components
import MetaTags from 'components/MetaTags';
import AmountLabeledInput from 'components/AmountLabeledInput';
import PageHeader from 'components/PageHeader';
import Icon from 'components/Icon';

// Styled
import { BackButtonWrapper, BtnContainer } from 'styled/common';
import { StyledThreshold } from '../styled';

// Types
import type { SetThresholdProps } from '../types';

const SetThreshold: React.FC<SetThresholdProps> = ({ fundSources }) => {
  const [data, setData] = useState<AnyObject>({});
  const [formObj, setFormObj] = useState<AnyObject>({
    fundSourceId: (() => {
      const query = getQuery();
      const fundSourceId = query.get('fundSourceId');
      return fundSourceId ? +fundSourceId : undefined;
    })(),
  });
  const [errorObj, setErrorObj] = useState<AnyObject>({});
  const [isFirst, setIsFirst] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLFormElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async function fetchData() {
      if (!formObj.fundSourceId) {
        return;
      }

      const queryObj = {
        fundSourceId: formObj.fundSourceId,
      };

      const response = await getLowBalanceThreshold(queryObj);

      if ('error' in response) {
        setFormObj((prev) => ({
          fundSourceId: prev.fundSourceId,
          lowBalance: '',
        }));

        inputRef.current?.reset();
        setIsFirst(true);
      } else {
        setData(response);
        setFormObj((prev) => ({
          ...prev,
          lowBalance: response.lowBalance,
          isActive: response.isActive,
        }));
      }

      navigate(location.pathname, { replace: true });
    })();
  }, [formObj.fundSourceId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();

    const body = {
      lowBalance: String(formObj.lowBalance),
      isActive: !!formObj.isActive,
    };

    setLoading(true);

    const response = await setLowBalanceThreshold(
      { fundSourceId: formObj.fundSourceId! },
      body,
    );

    setLoading(false);

    if (response) {
      setData((prev) => ({ ...prev, lowBalance: formObj.lowBalance }));

      toast.success('Low balance threshold set successfully');
    }
  };

  const handleCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFormObj((prev) => ({
      ...prev,
      lowBalance: data.lowBalance,
      isActive: data.isActive,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    switch (name) {
      case 'lowBalance':
        error = amountValidation(value);
        break;

      case 'fundSourceId':
        error = requiredValidation(value);
        Analytics.track('Dropdown_fundSourceId', { value });
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormObj((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const noChange =
    !formObj.lowBalance ||
    (data.lowBalance === formObj.lowBalance &&
      data.isActive === formObj.isActive);

  const disabled =
    !isFormValid(formObj, errorObj, REQUIRED_FIELDS.SET_THRESHOLD) ||
    noChange ||
    (isFirst && !formObj.isActive);

  const fundSource = _find(fundSources, { fundSourceId: formObj.fundSourceId });
  const currency = _get(fundSource, 'currency');

  return (
    <StyledThreshold>
      <PageHeader embedKey="SETTINGS">
        <span>{LABEL_BY_MENU[MENU.SETTINGS]} - </span>{' '}
        {LABEL_BY_SUBMENU[SUBMENU.SET_THRESHOLD]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_MENU[MENU.SETTINGS]} – ${
          LABEL_BY_SUBMENU[SUBMENU.SET_THRESHOLD]
        }`}
      />

      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>

      <Text color="bodyLight" className="mt-1 mb-4">
        Set a minimum balance you want to maintain in your fund source.
      </Text>
      <Paper style={{ width: 327 }} className="p-4">
        <Space
          justifyContent="space-between"
          alignItems="center"
          className="mb-2"
        >
          <Text as="span" variant="h16">
            Notify when the balance <br /> drops below the threshold.
          </Text>
          <Toggle active={formObj.isActive} onToggle={handleToggle} />
        </Space>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Text color="bodyLight" className="mb-1">
              Fund Source
            </Text>
            <Dropdown
              selection
              fluid
              icon="chevron down"
              name="fundSourceId"
              placeholder="Choose Fund Source"
              options={getFundSourcesOptions(fundSources)}
              value={formObj.fundSourceId}
              error={errorObj.fundSourceId}
              onChange={handleChange}
            />
          </Form.Field>
          <Text variant="p14" color="bodyLight" className="mb-1">
            Minimum Balance
          </Text>
          <Form.Field
            fluid
            ref={inputRef}
            control={AmountLabeledInput}
            controlProps={{
              currency: currency,
            }}
            name="lowBalance"
            inputmode="numeric"
            step=".01"
            placeholder="Amount"
            error={errorObj.lowBalance}
            value={formObj.lowBalance}
            onChange={handleChange}
            focus
          />
          <Text variant="b12" color="bodyLight" className="mt-2">
            You can enable email notifications and update the list of recipients
            to receive alerts in the{' '}
            <Link
              to={`/${PATH_BY_MENU[MENU.SETTINGS]}/${
                PATH_BY_SUBMENU[SUBMENU.EMAIL_NOTIFICATIONS]
              }`}
            >
              Email Notifications
            </Link>{' '}
            section.
          </Text>

          <BtnContainer>
            <Button
              data-event-name="Secondary_Button"
              as="a"
              link
              disabled={noChange}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              data-event-name="Primary_Button"
              type="submit"
              className="ml-4"
              primary
              disabled={disabled}
              loading={loading}
            >
              Confirm
            </Button>
          </BtnContainer>
        </Form>
      </Paper>
    </StyledThreshold>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withErrorBoundary(
  withReadPermission(withConnect(SetThreshold), {
    code: 21503,
    description: `access ${LABEL_BY_SUBMENU[SUBMENU.SET_THRESHOLD]}`,
  }),
);
