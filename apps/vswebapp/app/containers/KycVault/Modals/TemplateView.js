import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Space,
  Image,
  Cross,
  Icon as CoherentIcon,
  Text,
  Button,
  Conditional,
  Form,
  ConfirmModal,
  Progress,
} from '@cashfree-intl/coherent';
import { motion } from 'framer-motion';
import _find from 'lodash/find';
import _keys from 'lodash/keys';
import _identity from 'lodash/identity';
import _pickBy from 'lodash/pickBy';
import _pick from 'lodash/pick';
import classNames from 'classnames';
import { ThemeProvider, ThemeContext } from 'styled-components';

// Constants
import { PAGE_TRANSITION, PAGE_VARIANTS, REQUIRED_FIELDS } from '../constants';

// Components
import Icon from 'components/Icon';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import MobilePreview from './MobilePreview';

// Helpers
import { generatePayload, calculateStepProgress } from '../helpers';
import isFormValid from 'utils/isFormValid';

// Styled
import {
  StyledTemplateModal,
  StyledPreviewWrapper,
  StyledPreview,
  StyledHeader,
  StyledLabel,
  StyledFooter,
  StyledDiv,
  StyledProgress,
  StyledChevron,
} from '../styled';
import { BackButtonWrapper } from 'styled/common';

// Services
import { createApp } from 'services/vault';
import { MODAL_TYPES } from '../constants';

// Utils
import { downloadText } from 'utils/common';
import { nameValidation, urlValidation } from 'utils/formValidation';

const TemplateView = ({ onClose, app_details }) => {
  console.log(app_details);
  const themeValues = useContext(ThemeContext);
  const { COLORS } = themeValues;

  let initialTheme = {
    primaryColor: app_details['app_color']?.replace('#', ''),
  };

  const [step, setStep] = useState(1);
  const [formObj, setFormObj] = useState({ app_brand_name: 'Brand Name' });
  const [requiredFields, setRequiredFields] = useState([]);
  const [mandatoryFields, setMandatoryFields] = useState([]);
  const [colorValues, setColorValues] = useState(initialTheme);

  useEffect(() => {
    setRequiredFields(app_details?.scopes.map(scope => scope?.type));
    setMandatoryFields(
      app_details?.scopes
        .filter(scope => scope.config.is_required)
        .map(scope => scope?.type),
    );
  }, [app_details]);

  const handleStep = step => setStep(step);

  return (
    <>
      <StyledTemplateModal open>
        <StyledPreviewWrapper
          justifyContent="center"
          alignItems="center"
          style={{ width: '520px' }}
          fullHeight
        >
          <Space direction="column" gap={3}>
            <Space direction="column" alignItems="center">
              <Text variant="h20">{app_details?.app_name}</Text>
              <Text variant="b14" color="bodyLight">
                This is a view only page
              </Text>
            </Space>
            <Space alignItems="center" gap={3}>
              {step === 2 ? (
                <StyledChevron onClick={() => handleStep(1)}>
                  <CoherentIcon name="chevron-left" />
                </StyledChevron>
              ) : (
                <div style={{ width: '34px', height: '34px' }} />
              )}

              <StyledDiv style={{ height: '620px' }}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={PAGE_VARIANTS}
                  transition={PAGE_TRANSITION}
                >
                  <StyledPreview style={{ height: '470px' }}>
                    <ThemeProvider
                      theme={{
                        ...themeValues,
                        COLORS: {
                          ...themeValues.COLORS,
                          primary: `#${colorValues['primaryColor']}`,
                          '461E96': `#${colorValues['primaryColor']}`,
                          '300D6C': `#${colorValues['primaryColor']}`,
                          F4EFFC: `#${colorValues['primaryColor']}`,
                        },
                      }}
                    >
                      <MobilePreview
                        step={step}
                        app_color={`#${colorValues['primaryColor']}`}
                        app_name={app_details.app_brand_name}
                        app_logo={app_details.app_logo}
                        requiredFields={requiredFields}
                        mandatoryFields={mandatoryFields}
                      />
                    </ThemeProvider>
                  </StyledPreview>
                </motion.div>
              </StyledDiv>
              {step === 1 ? (
                <StyledChevron onClick={() => handleStep(2)}>
                  <CoherentIcon name="chevron-right" />
                </StyledChevron>
              ) : (
                <div style={{ width: '34px', height: '34px' }} />
              )}
            </Space>

            <Space justifyContent="center">
              <Button primary onClick={onClose}>
                Close
              </Button>
            </Space>
          </Space>
        </StyledPreviewWrapper>
        <StyledChevron />
      </StyledTemplateModal>
    </>
  );
};

TemplateView.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TemplateView;
