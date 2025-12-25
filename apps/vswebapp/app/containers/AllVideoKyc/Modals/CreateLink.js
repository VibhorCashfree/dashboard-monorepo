import React, { useState, useEffect } from 'react';
import {
  Space,
  Text,
  Button,
  Cross,
  Conditional,
} from '@cashfree-intl/coherent';
import _pickBy from 'lodash/pickBy';
import _pick from 'lodash/pick';
import _get from 'lodash/get';
import _identity from 'lodash/identity';
import _startCase from 'lodash/startCase';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Styled
import {
  StyledPreviewModal,
  StyledHeader,
  StyledFooter,
  StyledLabel,
} from '../styled';

// Services
import { createVKYCLink } from 'services/vkyc';

// utils
import {
  nameValidation,
  phoneNumberValidation,
  emailValidation,
} from 'utils/formValidation';
import { saveSecurityQuestions, getSecurityQuestions } from 'utils/vkycDB';
import isFormValid from 'utils/isFormValid';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

const CreateLink = ({ onClose, setModalData, setModalType }) => {
  const [question, setQuestion] = useState([]);
  const [formObj, setFormObj] = useState({
    name: '',
    email: '',
    phone: '',
    notification_types: [],
    user_template: 'vkyc_user_template_v1',
    agent_template: 'vkyc_agent_template_v1',
  });
  const [errorObj, setErrorObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const loadSavedQuestions = async () => {
      try {
        const savedQuestions = await getSecurityQuestions();
        if (savedQuestions && savedQuestions.length > 0) {
          // Add isEditing property required by the UI
          const formattedQuestions = savedQuestions.map(q => ({
            ...q,
            isEditing: false,
          }));
          setQuestion(formattedQuestions);
        }
      } catch (error) {
        console.error('Failed to load saved questions:', error);
      }
    };

    loadSavedQuestions();
  }, []);

  const handleFormSubmit = async () => {
    setLoading(true);

    const newQuestion = [
      ...question.map((item, index) => ({
        ...item,
        id: index,
      })),
    ];

    console.log('Reordering newQuestion:', newQuestion);

    const response = await createVKYCLink({
      ...formObj,
      security_questions: newQuestion.map((item, index) => ({
        question: item.question,
        answer: item.answer,
        order: index + 1,
      })),
    });

    if (!response.error) {
      await saveSecurityQuestions(question);
      setModalData({
        ...response,
        notification_types: formObj.notification_types,
      });
      setModalType('LINK_CREATED');
    }

    setLoading(false);
  };

  const handleClick = () => {
    if (step === 1) {
      setStep(2);
    } else {
      handleFormSubmit();
    }
  };

  const handleInputChange = (name, value) => {
    let error;

    switch (name) {
      case 'name':
        error = nameValidation('Name', value);
        break;

      case 'phone':
        error = phoneNumberValidation(value, true);
        break;

      case 'email':
        error = emailValidation(value);
    }

    setFormObj(prev => ({ ...prev, [name]: value }));
    setErrorObj(prev => ({ ...prev, [name]: error })); // Clear error on input change
  };

  const handleChannelClick = channelKey =>
    setFormObj(formData => {
      let channels = formData.notification_types;
      const exists = formData.notification_types.includes(channelKey);

      if (exists) {
        channels = channels.filter(channel => channel !== channelKey);
      } else {
        channels = [...channels, channelKey];
      }

      return {
        ...formData,
        notification_types: channels,
      };
    });

  const disabled = () => {
    if (step === 1) {
      return !isFormValid(
        _pickBy(formObj, _identity),
        _pickBy(_pick(errorObj, REQUIRED_FIELDS.STEP_ONE), _identity),
        REQUIRED_FIELDS.STEP_ONE,
      );
    } else if (step === 2) {
      return (
        !question.length ||
        question.some(q => !q?.question?.trim() || !q?.answer?.trim())
      );
    }
  };

  console.log('question', question);

  return (
    <StyledPreviewModal open>
      <Space direction="column" fullHeight>
        <StyledHeader direction="column" gap={1.4}>
          <Space
            gap={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ width: '100%' }}
          >
            <Space alignItems="center" gap={1}>
              <Text variant="h20">Generate Verification Link </Text>{' '}
              <StyledLabel>
                <Text variant="b12" color="white">
                  Step {step}/2
                </Text>
              </StyledLabel>
            </Space>
            <Cross onClick={onClose} />
          </Space>
        </StyledHeader>

        <Space
          className="p-4"
          direction="column"
          fullWidth
          fullHeight
          style={{ overflowY: 'auto', marginBottom: '90px' }}
        >
          <Conditional if={step === 1}>
            <StepOne
              formObj={formObj}
              errorObj={errorObj}
              handleInputChange={handleInputChange}
              handleChannelClick={handleChannelClick}
            />
          </Conditional>

          <Conditional if={step === 2}>
            <StepTwo
              question={question}
              setQuestion={setQuestion}
              setStep={setStep}
            />
          </Conditional>
        </Space>

        <StyledFooter justifyContent="flex-end" alignItems="center" fullWidth>
          <Button
            loading={loading}
            disabled={disabled()}
            primary
            onClick={handleClick}
          >
            {step === 1 ? 'Next' : 'Generate Link'}
          </Button>
        </StyledFooter>
      </Space>
    </StyledPreviewModal>
  );
};

export default CreateLink;
