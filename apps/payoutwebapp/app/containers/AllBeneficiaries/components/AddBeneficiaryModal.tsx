import React, { useState, useRef, useEffect } from 'react';
import {
  toast,
  Label,
  Text,
  Cross,
  Button,
  Form,
  Modal,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';
import _find from 'lodash/find';
import _keyBy from 'lodash/keyBy';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { create, update } from 'services/beneficiaries';

// Utils
import {
  beneIdValidation,
  nameValidation,
  emailValidation,
  phoneNumberValidation,
  ifscValidation,
  accountNumberValidation,
  vpaValidation,
  ibanValidation,
  panValidation,
  gstInValidation,
  requiredValidation,
} from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { getButtonTxt, getRequiredFields } from '../utils';

// Constants
import { BENE_PURPOSE } from 'constants/common';
import { MODAL_TYPE } from '../constants';

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
import type { AddBeneficiaryModalProps } from '../types';

const AddBeneficiaryModal: React.FC<AddBeneficiaryModalProps> = ({
  type,
  selectedRow,
  onClose,
  onSubmit,
}) => {
  const [formObjOne, setFormObjOne] = useState<AnyObject>({});
  const [errorObjOne, setErrorObjOne] = useState<AnyObject>({});

  const [loading, setLoading] = useState(false);

  const [formObjTwo, setFormObjTwo] = useState<AnyObject>(() => {
    if (type === MODAL_TYPE.UPDATE) {
      return {
        bankAccount: selectedRow.bankAccount,
        ifsc: selectedRow.ifsc,
        vpa: selectedRow.vpa,
        accountIBan: selectedRow.accountIBan,
      };
    }
    return {};
  });
  const [errorObjTwo, setErrorObjTwo] = useState<AnyObject>({});
  const [formObjThree, setFormObjThree] = useState<AnyObject>(() => {
    if (type === MODAL_TYPE.UPDATE) {
      const kycDocByType = _keyBy(
        selectedRow.beneficiaryKycDocData || [],
        'kycDocType',
      );

      return {
        panCard: kycDocByType.PAN?.kycDocNum,
        gstIn: kycDocByType.GST?.kycDocNum,
        cin: kycDocByType.CIN?.kycDocNum,
        din: kycDocByType.DIN?.kycDocNum,
      };
    }
    return {};
  });
  const [errorObjThree, setErrorObjThree] = useState<AnyObject>({});

  const [totalSteps, setTotalSteps] = useState(() => {
    if (type === MODAL_TYPE.UPDATE) {
      return 3;
    }
    return 2;
  });

  const [stepNo, setStepNo] = useState(() => {
    if (type === MODAL_TYPE.UPDATE) {
      const hasVerifiedBank = _find(selectedRow.beneficiaryKycDocData || [], {
        kycDocType: 'BANK',
        status: 'VERIFIED',
      });

      if (hasVerifiedBank) {
        return 3;
      }
      return 2;
    }
    return 1;
  });

  const maxStepNo = useRef(stepNo);

  useEffect(() => {
    maxStepNo.current = Math.max(stepNo, maxStepNo.current);
  }, [stepNo]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (stepNo !== totalSteps) {
      setStepNo((prev) => prev + 1);
      setLoading(false);
      return;
    }

    let response;

    const body = {
      ...formObjOne,
      ...formObjTwo,
      ...formObjThree,
    };

    if (type === MODAL_TYPE.UPDATE) {
      response = await update(selectedRow.id, body);
    } else {
      response = await create(body);
    }

    setLoading(false);

    if (!('error' in response)) {
      toast.success(response.message);
      onClose();

      if (onSubmit) {
        onSubmit(formObjOne.beneId);
      }
    }
  };

  const handleChangeOne = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ): void => {
    let error: string | undefined | null;

    switch (name) {
      case 'beneId':
        error = beneIdValidation(value);
        break;

      case 'benePurpose':
        error = requiredValidation(value);

        if (value === BENE_PURPOSE.CORP_CC) {
          setTotalSteps(3);
        } else {
          setTotalSteps(2);
        }

        setFormObjTwo({});
        setFormObjThree({});
        break;

      case 'name':
        error = nameValidation('Beneficiary Name', value);
        break;

      case 'email':
        error = emailValidation(value);
        break;

      case 'phone':
        error = phoneNumberValidation(value);
        break;

      case 'address1':
        error = requiredValidation(value);
        break;
    }

    setErrorObjOne((prev) => ({ ...prev, [name]: error }));
    setFormObjOne((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeTwo = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ): void => {
    let error: string | undefined | null;

    switch (name) {
      case 'ifsc':
        error = ifscValidation(value, !formObjTwo.bankAccount);
        break;

      case 'bankAccount':
        error = accountNumberValidation(value, true);
        break;

      case 'vpa':
        error = vpaValidation(value, true);
        break;

      case 'accountIBan':
        error = ibanValidation(value);
        break;
    }

    setErrorObjTwo((prev) => ({ ...prev, [name]: error }));
    setFormObjTwo((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeThree = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ): void => {
    let error: string | undefined | null;

    switch (name) {
      case 'panCard':
        error = panValidation(value);
        break;

      case 'gstIn':
        error = gstInValidation(value);
        break;

      case 'cin':
        error = requiredValidation(value);
        break;

      case 'din':
        error = requiredValidation(value);
        break;
    }

    setErrorObjThree((prev) => ({ ...prev, [name]: error }));
    setFormObjThree((prev) => ({ ...prev, [name]: value }));
  };

  let step;

  const benePurpose = selectedRow
    ? selectedRow.benePurpose
    : formObjOne.benePurpose;

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
          benePurpose={benePurpose}
          formObj={formObjTwo}
          errorObj={errorObjTwo}
          onChange={handleChangeTwo}
        />
      );
      break;

    case 3:
      step = (
        <StepThree
          selectedRow={selectedRow}
          formObj={formObjThree}
          errorObj={errorObjThree}
          onChange={handleChangeThree}
        />
      );
      break;
  }

  const REQUIRED_FIELDS = getRequiredFields(type, benePurpose, stepNo);

  const disabled =
    maxStepNo.current > stepNo
      ? false
      : !isFormValid(
          { ...formObjOne, ...formObjTwo, ...formObjThree },
          { ...errorObjOne, ...errorObjTwo, ...errorObjThree },
          REQUIRED_FIELDS,
        );

  return (
    <Modal $maxWidth="500" open>
      <StepModalHeader>
        <header>
          {type === MODAL_TYPE.UPDATE ? 'Update' : 'Add'} Beneficiary{' '}
          <Label size="tiny">
            Step {stepNo}/{totalSteps}
          </Label>
        </header>
        <Cross data-event-name="Close_Icon_Add_Beneficiary" onClick={onClose} />
      </StepModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            {!(stepNo === 1 || type === MODAL_TYPE.UPDATE) && (
              <BackButtonWrapper onClick={() => setStepNo((prev) => prev - 1)}>
                <Icon name="chevron-left" />
                <Text as="a" className="link ml-2">
                  Back
                </Text>
              </BackButtonWrapper>
            )}
            {step}
            <BtnContainer>
              <Button
                data-event-name="Secondary_Button_Add_Beneficiary"
                as="a"
                link
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                data-event-name="Primary_Button_Add_Beneficiary"
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                loading={loading}
              >
                {getButtonTxt(stepNo, totalSteps, type)}
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(AddBeneficiaryModal);
