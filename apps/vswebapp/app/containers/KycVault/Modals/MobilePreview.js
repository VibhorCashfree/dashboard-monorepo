import React from 'react';
import {
  Space,
  Cross,
  Text,
  Button,
  Icon as CoherentIcon,
  Checkbox,
  Conditional,
} from '@cashfree-intl/coherent';

// components
import Icon from 'components/Icon';
import LinkedIcon from 'components/LinkedIcon';

// Constants
import { FIELD_MAPPING, FIELD_MAPPING_VALUE } from '../constants';

// Helpers
import { separateBasedOnMapping } from '../helpers';

// Styled
import {
  StyledPurpleBg,
  StyledLinkButton,
  StyledMobileFooter,
  StyledWrapper,
  StyledTerms,
  StyledStatusLabel,
  StyledLink,
  StyledConsent,
  StyledButton,
  StyledFooter,
  StyledPreviewFooter,
  ThirdStepWrapper,
  ThirdStepInnerWrapper,
} from '../styled';
import { Divider, ModalRow } from 'styled/common';

const MobilePreview = ({
  step,
  app_logo,
  app_color,
  app_name,
  requiredFields,
  mandatoryFields,
}) => {
  const {
    KYC_DETAILS,
    BASIC_DETAILS,
    PAYMENT_METHODS,
  } = separateBasedOnMapping(requiredFields);

  switch (step) {
    case 1:
      return (
        <>
          <StyledWrapper>
            <Space direction="column" justifyContent="space-between" fullHeight>
              <Space direction="column" gap={3}>
                <Space>
                  <LinkedIcon appLogo={app_logo} />
                </Space>

                <div>
                  <Text variant="h20" className="mb-1">
                    Secure Sign-Up in 30 Secs
                  </Text>
                  <Text variant="p14" color="bodyLight" className="mb-2">
                    Verify{' '}
                    <Text as="span" color="body" strong>
                      +91 9345274456
                    </Text>{' '}
                    <Text as="span" color="bodyLight" strong>
                      to proceed with compliant and secure onboarding.
                    </Text>
                  </Text>
                </div>
              </Space>
              <Space direction="column" gap={4}>
                <StyledConsent direction="row" gap={1}>
                  <Checkbox checked={true} size="sm" />
                  <>
                    <Text variant="b12" color="bodyLight">
                      I authorise {app_name} in partnership with Cashfree to
                      access my credit information from licensed partners for
                      faster and secure onboarding.{' '}
                      {/* <Text
                        variant="b12"
                        as="span"
                        color="primary"
                        style={{
                          display: 'inline-block',
                          textDecoration: 'underline',
                        }}
                      >
                        View T&C
                      </Text> */}
                    </Text>
                  </>
                </StyledConsent>

                <Space direction="row" gap={2}>
                  <StyledButton secondary fluid>
                    I’ll enter manually
                  </StyledButton>
                  <StyledButton primary fluid>
                    Generate OTP
                  </StyledButton>
                </Space>
              </Space>
            </Space>
          </StyledWrapper>
          <StyledPreviewFooter>
            <Space
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent="center"
            >
              <Text color="bodyLight"> Powered by</Text>
              <Icon name="cashfree-logo" width="54" height="16" />
            </Space>
          </StyledPreviewFooter>
        </>
      );
    case 2:
    case 3:
      return (
        <>
          <ThirdStepWrapper>
            <ThirdStepInnerWrapper>
              <Text variant="h20" className="mb-2">
                Review & share requested items with {app_name}
              </Text>
              <Conditional if={BASIC_DETAILS.length}>
                <Space
                  justifyContent="space-between"
                  alignItems="center"
                  className="mb-2"
                >
                  <Text variant="h16" color="bodyLight">
                    BASIC DETAILS
                  </Text>
                </Space>
                <Space direction="column" gap={1}>
                  {BASIC_DETAILS.map((field, index) => (
                    <ModalRow
                      direction="row"
                      justifyContent="space-between"
                      style={{
                        alignItems: 'flex-start',
                        marginBottom:
                          BASIC_DETAILS.length - 1 === index ? '0px' : '',
                      }}
                    >
                      <Space direction="row" gap={1}>
                        <Checkbox
                          label={`${FIELD_MAPPING[field]} ${
                            mandatoryFields.includes(field) ? '*' : ''
                          }`}
                          checked
                        />
                      </Space>
                      <Text>{FIELD_MAPPING_VALUE[field]}</Text>
                      <CoherentIcon name="edit" />
                    </ModalRow>
                  ))}
                </Space>
              </Conditional>
              <Conditional if={BASIC_DETAILS.length && KYC_DETAILS.length}>
                <Divider contain />
              </Conditional>
              <Conditional if={KYC_DETAILS.length}>
                <Space
                  justifyContent="space-between"
                  alignItems="center"
                  className="mb-2"
                >
                  <Text variant="h16" color="bodyLight">
                    KYC DETAILS
                  </Text>
                </Space>
                <Space direction="column" gap={1}>
                  {KYC_DETAILS.map((field, index) => (
                    <ModalRow
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      style={{
                        alignItems: 'flex-start',
                        marginBottom:
                          KYC_DETAILS.length - 1 === index ? '0px' : '',
                      }}
                    >
                      <Space direction="row" gap={1}>
                        <Checkbox
                          label={`${FIELD_MAPPING[field]} ${
                            mandatoryFields.includes(field) ? '*' : ''
                          }`}
                          checked
                        />
                      </Space>
                      <Text>{FIELD_MAPPING_VALUE[field]}</Text>
                      <CoherentIcon name="edit" />
                    </ModalRow>
                  ))}
                </Space>
              </Conditional>
              <Conditional if={PAYMENT_METHODS.length}>
                <Conditional if={KYC_DETAILS.length}>
                  <Divider contain />
                </Conditional>
                <Space
                  justifyContent="space-between"
                  alignItems="center"
                  className="mb-2"
                >
                  <Text variant="h16" color="bodyLight">
                    PAYMENT METHODS
                  </Text>
                </Space>
                <Space direction="column" gap={1}>
                  {PAYMENT_METHODS.map((field, index) => (
                    <ModalRow
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Space direction="row" gap={1}>
                        <Checkbox
                          label={`${FIELD_MAPPING[field]} ${
                            mandatoryFields.includes(field) ? '*' : ''
                          }`}
                          checked
                        />
                      </Space>
                      <Text>{FIELD_MAPPING_VALUE[field]}</Text>
                      <CoherentIcon name="edit" />
                    </ModalRow>
                  ))}
                </Space>
              </Conditional>
            </ThirdStepInnerWrapper>
          </ThirdStepWrapper>
          <StyledMobileFooter>
            <Space direction="row" gap={2}>
              <StyledButton secondary fluid>
                Cancel
              </StyledButton>
              <StyledButton variant="primary" fluid>
                Submit Details
              </StyledButton>
            </Space>
          </StyledMobileFooter>
        </>
      );
    default:
      return;
  }
};

export default MobilePreview;
