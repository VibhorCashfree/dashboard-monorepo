import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Space,
  Text,
  Icon,
  Conditional,
  Button,
  ConfirmModal,
} from '@cashfree-intl/coherent';
import { ThemeContext } from 'styled-components';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';

// Components
import Drawer from 'components/Drawer';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';
import ContentLoader from 'components/ContentLoader';

// Constants
import { initialEdges, initialNodes, REQUIRED_FIELDS } from './constants';

// Helpers
import { validatePublish } from './helpers';

// Styled
import { BackButtonWrapper } from 'styled/common';
import { StyledHeader, VerticalDivider, StyledSaveDropdown } from './styled';
import { StyledLabel } from '../styled';

// Services
import { getFormTheme, publishJourney, getWorkFlowJson } from 'services/forms';

// Utils
import {
  requiredValidation,
  journeyNameValidation,
} from 'utils/formValidation';
import { getThemeValues } from './Steps/StepTwo/utils';
import isFormValid from 'utils/isFormValid';

const CreateJourney = ({ onClose, draftId = {}, action = 'CREATE' }) => {
  const { COLORS } = useContext(ThemeContext);
  const { id = '', status = '', templateName = '' } = draftId;
  const [, setSelected] = useState();
  const [openSave, setOpenSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formObj, setFormObj] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [workflowPayload, setWorkflowPayload] = useState({});
  const [payloadDraftId, setPayloadDraftId] = useState(id);
  const [apiWorkFlowJson, setApiWorkFlowJson] = useState({
    nodes: [],
    edges: [],
  });
  const isPublished = status === 'PUBLISHED';
  const [back, setBack] = useState(false);
  const [publishTemplate, setPublishTemplate] = useState(false);

  let initialTheme = {
    headerColor: COLORS.focused.replace('#', ''),
    primaryColor: COLORS.primary.replace('#', ''),
    textColor: COLORS.white.replace('#', ''),
  };

  const [logoImage, setLogoImage] = useState();
  const [colorValues, setColorValues] = useState(initialTheme);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [step]);

  useEffect(() => {
    if (['VIEW', 'EDIT'].includes(action)) {
      setStep(3);
    }
  }, [action]);

  useEffect(() => {
    (async function fetchTheme() {
      const response = await getFormTheme();

      const {
        logo,
        buttonTextColor,
        color_code,
        backgroundColor,
      } = getThemeValues(response);
      if (logo) {
        setLogoImage(logo);
      }

      if (backgroundColor && color_code && buttonTextColor) {
        initialTheme = {
          headerColor: backgroundColor.replace('#', ''),
          primaryColor: color_code.replace('#', ''),
          textColor: buttonTextColor.replace('#', ''),
        };
        setColorValues({
          ...colorValues,
          ...initialTheme,
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async function fetchData() {
      if (!payloadDraftId) {
        return;
      }

      const response = await getWorkFlowJson(payloadDraftId);

      if (action !== 'CREATE') {
        setApiWorkFlowJson({
          nodes: response?.uiData.nodes,
          edges: response?.uiData.edges,
        });
        setFormObj({
          templateName: response?.templateName,
          description: response?.description,
        });
      }
    })();
  }, [payloadDraftId]);

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'templateName':
        error = journeyNameValidation(value);
        break;

      case 'description':
        error = requiredValidation(value);
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value }));
  };

  const handleStep = step => setStep(step);

  const handleBack = () => {
    switch (step) {
      case 1:
        setPayloadDraftId();
        onClose();
        break;

      case 2:
        handleStep(1);
        break;

      case 3:
        setBack(true);
        break;
    }
  };

  const handlePublishJourney = async () => {
    // setLoading(true);
    const payload = {
      ...formObj,
      ...workflowPayload,
      draftId: payloadDraftId,
    };

    const response = await publishJourney(payload);

    // setLoading(false);

    if (!response.error) {
      onClose();
    }
  };

  const handlePayload = (nodes, edges, pages) => {
    setWorkflowPayload({
      uiData: {
        nodes: nodes,
        edges: edges,
      },
      userAuthentication: false,
      pages,
    });
  };

  const disabled =
    step === 1 &&
    !isFormValid(
      _pickBy(formObj, _identity),
      _pickBy(errorObj, _identity),
      REQUIRED_FIELDS,
    );

  return (
    <>
      <Drawer>
        <StyledHeader
          className="px-3 py-2"
          justifyContent="space-between"
          alignItems="center"
        >
          <Space gap={2} alignItems="center">
            <Conditional if={!isPublished}>
              <BackButtonWrapper className="m-0" onClick={handleBack}>
                <Icon name="chevron-left" />
                <Text as="a" className="link">
                  Back
                </Text>
              </BackButtonWrapper>
              <VerticalDivider />
            </Conditional>
            <Text variant="p14" strong>
              {formObj.templateName
                ? formObj.templateName
                : 'Create KYC Template'}
            </Text>
            <Conditional if={!isPublished}>
              <StyledLabel>
                <Text variant="b12" color="bodyLight" strong>
                  Step {step} /3
                </Text>
              </StyledLabel>
            </Conditional>
          </Space>

          <Space gap={2} alignItems="center">
            <Text
              variant="b12"
              color="danger"
              strong
              className="pointer"
              onClick={onClose}
            >
              Close
            </Text>
            <Conditional if={step === 3 && !isPublished}>
              <VerticalDivider height={24} />
              <Button
                primary
                size="small"
                iconPosition="right"
                variant="primary"
                disabled={
                  workflowPayload?.pages
                    ? validatePublish(workflowPayload.pages)
                    : true
                }
                onClick={() => setPublishTemplate(true)}
              >
                Publish
              </Button>
            </Conditional>
          </Space>
        </StyledHeader>
        <ContentLoader loading={loading} style={{ height: '100%' }}>
          <Conditional if={step === 1}>
            <StepOne
              formObj={formObj}
              errorObj={errorObj}
              onChange={handleChange}
              handleStep={handleStep}
              action={action}
              disabled={disabled}
              isPublished={isPublished}
            />
          </Conditional>
          <Conditional if={step === 2}>
            <StepTwo
              initialTheme={initialTheme}
              colorValues={colorValues}
              logoImage={logoImage}
              handleStep={handleStep}
              setColorValues={setColorValues}
              setLogoImage={setLogoImage}
              action={action}
              isPublished={isPublished}
            />
          </Conditional>
          <Conditional if={step === 3}>
            <StepThree
              apiEdges={apiWorkFlowJson.edges}
              apiNodes={apiWorkFlowJson.nodes}
              formObj={formObj}
              handlePayload={handlePayload}
              colorValues={colorValues}
              logoImage={logoImage}
              payloadDraftId={payloadDraftId}
              setPayloadDraftId={setPayloadDraftId}
              action={action}
              isPublished={isPublished}
              handleStep={handleStep}
            />
          </Conditional>
        </ContentLoader>
      </Drawer>

      {back && (
        <ConfirmModal
          title="Confirmation"
          confirmText="Go Back"
          onClose={() => setBack(false)}
          onConfirm={() => {
            handleStep(2);
            setBack(false);
          }}
        >
          <Text color="warning" className="mb-2">
            If you go back to the previous step, any changes you’ve made to the
            KYC template will be lost, and you’ll need to start over.
          </Text>
          Are you sure you want to proceed?
        </ConfirmModal>
      )}

      {publishTemplate && (
        <ConfirmModal
          title="Publish Template"
          confirmText="Publish"
          onClose={() => setPublishTemplate(false)}
          onConfirm={() => {
            handlePublishJourney();
            setPublishTemplate(false);
          }}
        >
          <Space direction="column" gap={1}>
            <Text variant="h16" strong>
              Are you sure you want to publish this template ?
            </Text>
          </Space>
        </ConfirmModal>
      )}
    </>
  );
};

CreateJourney.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateJourney;
