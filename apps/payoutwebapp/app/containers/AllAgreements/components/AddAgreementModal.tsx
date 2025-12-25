import React, { useState } from 'react';
import {
  Label,
  Form,
  Text,
  Cross,
  Button,
  Modal,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';
import moment from 'moment';

// Services
import { create } from 'services/agreements';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Utils
import {
  nameValidation,
  emailValidation,
  phoneNumberValidation,
  ifscValidation,
  accountNumberValidation,
  lengthValidation,
  panValidation,
  amountValidation,
  requiredValidation,
  proportionValidation,
} from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { isFormTwoValid } from '../utils';

// Constants
import { REQUIRED_FIELDS } from '../constants';

// Components
import Icon from 'components/Icon';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

// Styled
import {
  BackButtonWrapper,
  BtnContainer,
  StepModalHeader,
} from 'styled/common';

// Types
import type { AddAgreementModalProps } from '../types';

const AddAgreementModal: React.FC<AddAgreementModalProps> = ({
  onClose,
  onResponse,
}) => {
  const [formObjOne, setFormObjOne] = useState<AnyObject>({});
  const [errorObjOne, setErrorObjOne] = useState<AnyObject>({});
  const [formObjTwo, setFormObjTwo] = useState<AnyObject>({});
  const [errorObjTwo, setErrorObjTwo] = useState<AnyObject>({});

  const [parties, setParties] = useState<any[]>([]);
  const [stepNo, setStepNo] = useState<number>(1);
  const [wasLastPage, setWasLastPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalSteps = 3;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (stepNo !== totalSteps) {
      setStepNo((prev) => prev + 1);
      setLoading(false);
      return;
    }

    const body = {
      purpose: formObjOne.purpose,
      total_amount: formObjOne.total_amount,
      start_date: moment(formObjOne.start_date).format('YYYY-MM-DD'),
      expiry_date: moment(formObjOne.expiry_date).format('YYYY-MM-DD'),
      parties: parties,
    };

    const response = await create(body);

    setLoading(false);

    if (!('error' in response)) {
      onResponse('SUCCESS', {
        agreement_id: response.agreement_id,
        total_amount: formObjOne.total_amount,
        number_of_parties: parties.length,
      });
    } else {
      onResponse('FAILED', {
        message: (response.error as { message: string }).message,
      });
    }
  };

  const handleChangeOne = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: any },
  ): void => {
    let error: string | undefined | null;

    switch (name) {
      case 'total_amount':
        error = amountValidation(value);
        break;

      case 'purpose':
        error = lengthValidation('Purpose', value, 100);
        break;

      case 'start_date':
      case 'expiry_date':
        error = requiredValidation(value);
        break;
    }

    setErrorObjOne((prev) => ({ ...prev, [name]: error }));
    setFormObjOne((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeTwo = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: any },
  ): void => {
    let error: string | undefined | null;

    switch (name) {
      case 'type':
        error = requiredValidation(value);
        break;

      case 'name':
        error = nameValidation('Name', value);
        break;

      case 'email':
        error = emailValidation(value);
        break;

      case 'phone':
        error = phoneNumberValidation(value);
        break;

      case 'bank_account':
        error = accountNumberValidation(value);
        break;

      case 'ifsc':
        error = ifscValidation(value);
        break;

      case 'address':
        error = lengthValidation('Address', value, 150);
        break;

      case 'pan':
        error = panValidation(value);
        break;

      case 'allocated_percentage_of_amount':
        error = proportionValidation(value);
        break;
    }

    setErrorObjTwo((prev) => ({ ...prev, [name]: error }));
    setFormObjTwo((prev) => ({ ...prev, [name]: value }));
  };

  let step;

  switch (stepNo) {
    case 1:
      step = (
        <StepOne
          formObj={formObjOne}
          errorObj={errorObjOne}
          onChange={handleChangeOne}
        />
      );
      break;

    case 2:
      step = (
        <StepTwo
          formObj={formObjTwo}
          setFormObj={setFormObjTwo}
          errorObj={errorObjTwo}
          parties={parties}
          setParties={setParties}
          onChange={handleChangeTwo}
          amount={formObjOne.total_amount}
          wasLastPage={wasLastPage}
          setWasLastPage={setWasLastPage}
        />
      );
      break;

    case 3:
      step = <StepThree formObj={formObjOne} parties={parties} />;
      break;

    default:
      step = null;
  }

  const disabled = (stepNo: number): boolean => {
    if (stepNo === 1) {
      return !isFormValid(
        { ...formObjOne },
        { ...errorObjOne },
        REQUIRED_FIELDS.STEP_ONE,
      );
    } else if (stepNo === 2) {
      return !isFormTwoValid(parties);
    }
    return false;
  };

  return (
    <Modal $maxWidth="500" open>
      <StepModalHeader>
        <header>
          Create Agreement{' '}
          <Label size="tiny">
            Step {stepNo}/{totalSteps}
          </Label>
        </header>
        <Cross onClick={onClose} />
      </StepModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            {stepNo !== 1 && (
              <BackButtonWrapper
                onClick={() => {
                  if (stepNo === 3) {
                    setWasLastPage(true);
                  }
                  setStepNo((prev) => prev - 1);
                }}
              >
                <Icon name="chevron-left" />
                <Text as="a" className="link ml-2">
                  Back
                </Text>
              </BackButtonWrapper>
            )}
            {step}
            <BtnContainer>
              <Button as="a" link onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="ml-4"
                primary
                loading={loading}
                disabled={disabled(stepNo)}
              >
                {stepNo === 3 ? 'Create Agreement' : 'Next'}
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(AddAgreementModal);
