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
  StyledPreviewModal,
  StyledPreviewWrapper,
  StyledPreview,
  StyledHeader,
  StyledLabel,
  StyledFooter,
  StyledDiv,
  StyledProgress,
} from '../styled';
import { BackButtonWrapper } from 'styled/common';

// Services
import { createApp } from 'services/vault';
import { MODAL_TYPES } from '../constants';

// Utils
import { downloadText } from 'utils/common';
import { nameValidation, urlValidation } from 'utils/formValidation';

const CreateJourney = ({
  onClose,
  setFetchCounter,
  setModalData,
  setModalType,
  setShowPitchPage,
}) => {
  const themeValues = useContext(ThemeContext);
  const { COLORS } = themeValues;

  let initialTheme = {
    primaryColor: COLORS.primary.replace('#', ''),
  };

  const [step, setStep] = useState(1);
  const [formObj, setFormObj] = useState({ app_brand_name: 'Brand Name' });
  const [errorObj, setErrorObj] = useState({});
  const [requiredFields, setRequiredFields] = useState([]);
  const [mandatoryFields, setMandatoryFields] = useState([]);
  const [colorValues, setColorValues] = useState(initialTheme);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [progress, setProgress] = useState({
    barOne: 0,
    barTwo: 0,
    barThree: 0,
  });

  useEffect(() => {
    if (!requiredFields.length) {
      setProgress(prev => ({
        ...prev,
        barTwo: 0,
      }));
    } else {
      setProgress(prev => ({
        ...prev,
        barTwo: 100,
      }));
    }
  }, [requiredFields]);

  useEffect(() => {
    // Update progress for each step when formObj changes
    const barOne = calculateStepProgress(formObj, REQUIRED_FIELDS.STEP_ONE);
    const barThree = calculateStepProgress(formObj, REQUIRED_FIELDS.STEP_THREE);

    setProgress(prev => ({ ...prev, barOne, barThree }));
  }, [formObj]);

  const handleStep = step => setStep(step);

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'app_name':
        error = nameValidation('Reference Name', value, true, false);
        break;

      case 'app_brand_name':
        error = nameValidation('Brand Name', value, true, false);
        break;

      case 'redirect_urls':
        error = urlValidation(value);
    }

    setFormObj(prev => ({ ...prev, [name]: value }));
    setErrorObj(prev => ({ ...prev, [name]: error }));
  };

  const handleBack = () => {
    switch (step) {
      case 1:
        onClose();
        break;

      case 2:
        handleStep(1);
        break;

      case 3:
        handleStep(2);
        break;
    }
  };

  const handleSubmit = () => {
    switch (step) {
      case 1:
        setProgress(prev => ({
          ...prev,
          barTwo: 100,
        }));
        handleStep(2);
        break;

      case 2:
        handleStep(3);
        break;

      case 3:
        setConfirm(true);
        break;
    }
  };

  const handleSubmitJourney = async () => {
    setLoading(true);
    const payload = generatePayload(
      formObj,
      colorValues,
      requiredFields,
      mandatoryFields,
    );

    const response = await createApp(payload);

    if (!response.error) {
      const content = `Client ID: ${response.client_id} Client Secret: ${
        response.client_secret
      }`;

      downloadText('API Credentials.txt', content);
      setModalType('SUCCESS_JOURNEY');
      setShowPitchPage('JOURNEY_CREATED');
      setModalData(response);
    }

    setLoading(false);
  };

  const disabled = () => {
    if (step === 1) {
      return !isFormValid(
        _pickBy(formObj, _identity),
        _pickBy(_pick(errorObj, REQUIRED_FIELDS.STEP_ONE), _identity),
        REQUIRED_FIELDS.STEP_ONE,
      );
    } else if (step === 2) {
      return !requiredFields.length;
    } else if (step === 3) {
      return !isFormValid(
        _pickBy(formObj, _identity),
        _pickBy(_pick(errorObj, REQUIRED_FIELDS.STEP_THREE), _identity),
        REQUIRED_FIELDS.STEP_THREE,
      );
    }
  };

  return (
    <>
      <StyledPreviewModal open>
        <Space fullHeight>
          <StyledPreviewWrapper justifyContent="center" alignItems="center">
            <Space direction="column" gap={3}>
              <Space direction="column" alignItems="center">
                <Text variant="h20">User View</Text>
                <Text variant="b14" color="bodyLight">
                  {'('}This is how your customer will see it{')'}
                </Text>
              </Space>
              <StyledDiv>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={PAGE_VARIANTS}
                  transition={PAGE_TRANSITION}
                >
                  <StyledPreview>
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
                        app_name={formObj.app_brand_name}
                        app_logo={formObj.app_logo}
                        requiredFields={requiredFields}
                        mandatoryFields={mandatoryFields}
                      />
                    </ThemeProvider>
                  </StyledPreview>
                </motion.div>
              </StyledDiv>
            </Space>
          </StyledPreviewWrapper>
          <Space
            direction="column"
            fullHeight
            style={{ width: '472px', position: 'relative' }}
          >
            <StyledHeader direction="column" gap={1.4}>
              <Space
                gap={2}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                style={{ width: '100%' }}
              >
                <Text variant="h20">Create Template</Text>
                <Cross onClick={() => setModalType()} />
              </Space>
              <Space gap={1.3}>
                <StyledProgress color="success" percent={progress.barOne} />
                <StyledProgress color="success" percent={progress.barTwo} />
                <StyledProgress color="success" percent={progress.barThree} />
              </Space>
            </StyledHeader>

            <Space
              className="p-4"
              direction="column"
              style={
                step === 3
                  ? {
                      height: 'calc(100% - 189px)',
                    }
                  : {
                      overflowY: 'auto',
                      marginBottom: '100px',
                    }
              }
              fullWidth
              fullHeight
            >
              <Form style={{ width: '100%', height: '100%' }}>
                <Conditional if={step === 1}>
                  <StepOne
                    formObj={formObj}
                    errorObj={errorObj}
                    handleChange={handleChange}
                    setErrorObj={setErrorObj}
                    colorValues={colorValues}
                    setColorValues={setColorValues}
                    setFormObj={setFormObj}
                  />
                </Conditional>
                <Conditional if={step === 2}>
                  <StepTwo
                    mandatoryFields={mandatoryFields}
                    requiredFields={requiredFields}
                    setMandatoryFields={setMandatoryFields}
                    setRequiredFields={setRequiredFields}
                  />
                </Conditional>
                <Conditional if={step === 3}>
                  <StepThree
                    formObj={formObj}
                    errorObj={errorObj}
                    handleChange={handleChange}
                  />
                </Conditional>
              </Form>
            </Space>

            <StyledFooter
              justifyContent="space-between"
              alignItems="center"
              fullWidth
            >
              <BackButtonWrapper onClick={handleBack} className="m-0">
                <Icon name="chevron-left" />

                <Text as="a" className="link ml-1">
                  Back
                </Text>
              </BackButtonWrapper>
              <Button
                variant="primary"
                onClick={handleSubmit}
                loading={loading}
                disabled={disabled()}
              >
                {step === 3 ? 'Create' : 'Next'}
              </Button>
            </StyledFooter>
          </Space>
        </Space>
      </StyledPreviewModal>

      {confirm && (
        <ConfirmModal
          title="Confirmation"
          confirmText="Proceed"
          onClose={() => setConfirm(false)}
          onConfirm={handleSubmitJourney}
          style={{ top: '35%' }}
        >
          Are you sure you want to proceed?
        </ConfirmModal>
      )}
    </>
  );
};

CreateJourney.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateJourney;
