import React, { useState, useEffect } from 'react';
import {
  Form,
  Space,
  Text,
  Checkbox,
  Toggle,
  Icon,
  Popup,
  Loader,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';

// Constants
import { SCOPE_LABEL } from '../constants';

// Services
import { getAllScropes } from 'services/vault';

// Styled
import { StyledPrefHeader } from '../styled';

const StepTwo = ({
  mandatoryFields,
  requiredFields,
  setMandatoryFields,
  setRequiredFields,
}) => {
  const [scopes, setScopes] = useState({
    basic_details: [],
    kyc_details: [],
    payment_method: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      setLoading(true);
      const response = await getAllScropes();

      if (!response.error) {
        setScopes({
          basic_details: _get(response, 'detail.basic_details.scopes', []),
          kyc_details: _get(response, 'detail.kyc_details.scopes', []),
          payment_method: _get(response, 'detail.payment_method.scopes', []),
        });

        setRequiredFields([
          ..._get(response, 'detail.basic_details.scopes', []).map(
            scope => scope?.type,
          ),
          ..._get(response, 'detail.kyc_details.scopes', []).map(
            scope => scope?.type,
          ),
          ..._get(response, 'detail.payment_method.scopes', []).map(
            scope => scope?.type,
          ),
        ]);
      }

      setLoading(false);
    })();
  }, []);

  const handleCheckbox = id => {
    const newRequiredFields = requiredFields.includes(id)
      ? requiredFields.filter(prevId => id !== prevId)
      : requiredFields.concat(id);

    if (!newRequiredFields.includes(id)) {
      setMandatoryFields(prevIds => prevIds.filter(prevId => id !== prevId));
    }

    setRequiredFields(newRequiredFields);
  };

  const handleToggle = id => {
    setMandatoryFields(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(prevId => id !== prevId)
        : prevIds.concat(id),
    );
  };

  if (loading) {
    return <Loader active page={false} />;
  }

  return (
    <Space direction="column" gap={2}>
      <Space direction="column" gap={0.5}>
        <Text variant="h16" strong>
          Data Points and Preferences
        </Text>
        <Text variant="b12" color="bodyLight">
          Select the data types and their variants from the list. Mark any
          fields that are mandatory for your template.
        </Text>
      </Space>
      <Space direction="column">
        <StyledPrefHeader
          alignItems="center"
          justifyContent="space-between"
          fullWidth
        >
          <Text variant="b14">BASIC DETAILS</Text>
          <Space gap={1} alignItems="center">
            <Popup
              position="top center"
              content="You can choose to mandate certain fields and we will ask users to input it before signing up."
              trigger={
                <span>
                  <Icon name="info-small" />
                </span>
              }
            />
            <Text variant="b14">Is Mandatory?</Text>
          </Space>
        </StyledPrefHeader>
        <Space direction="column" gap={2} className="mb-3">
          {scopes.basic_details.map(({ type }, index) => (
            <Space
              key={index}
              justifyContent="space-between"
              alignItems="center"
            >
              <Space gap={1}>
                <Checkbox
                  checked={requiredFields.includes(type)}
                  onClick={() => handleCheckbox(type)}
                />
                <Text color="bodyLight">{SCOPE_LABEL[type]}</Text>
              </Space>
              <Toggle
                active={mandatoryFields.includes(type)}
                onToggle={() => handleToggle(type)}
              />
            </Space>
          ))}
        </Space>
        <StyledPrefHeader
          alignItems="center"
          justifyContent="space-between"
          fullWidth
        >
          <Text variant="b14">KYC DETAILS</Text>
        </StyledPrefHeader>
        <Space direction="column" gap={2} className="mb-3">
          {scopes.kyc_details.map(({ type }, index) => (
            <Space
              key={index}
              justifyContent="space-between"
              alignItems="center"
            >
              <Space gap={1}>
                <Checkbox
                  checked={requiredFields.includes(type)}
                  onClick={() => handleCheckbox(type)}
                />
                <Text color="bodyLight">{SCOPE_LABEL[type]}</Text>
              </Space>
              <Toggle
                active={mandatoryFields.includes(type)}
                onToggle={() =>
                  requiredFields.includes(type) && handleToggle(type)
                }
              />
            </Space>
          ))}
        </Space>
        <StyledPrefHeader
          alignItems="center"
          justifyContent="space-between"
          fullWidth
        >
          <Text variant="b14">PAYMENT METHODS</Text>
        </StyledPrefHeader>
        <Space direction="column" gap={2} className="mb-3">
          {scopes.payment_method.map(({ type }, index) => (
            <Space
              key={index}
              justifyContent="space-between"
              alignItems="center"
            >
              <Space gap={1}>
                <Checkbox
                  checked={requiredFields.includes(type)}
                  onClick={() => handleCheckbox(type)}
                />
                <Text color="bodyLight">{SCOPE_LABEL[type]}</Text>
              </Space>
              <Toggle
                active={mandatoryFields.includes(type)}
                onToggle={() =>
                  requiredFields.includes(type) && handleToggle(type)
                }
              />
            </Space>
          ))}
        </Space>
      </Space>
    </Space>
  );
};

export default StepTwo;
