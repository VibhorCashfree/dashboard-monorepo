import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  Cross,
  Space,
  Text,
  Conditional,
} from '@cashfree-intl/coherent';

// Styles
import { StyledLabel } from 'containers/JourneysKycLink/styled';

// Components
import StepOne from './StepOne';
import StepTwo from './StepTwo';

// Constants
import { SEND_JOURNEY_INITIAL_FORM_STATE } from './constants';

const SendJourney = ({
  onClose,
  onResponse,
  downloadSampleFile,
  handleCreateJourney,
  setFetchCounter,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(SEND_JOURNEY_INITIAL_FORM_STATE);

  return (
    <Modal open $maxWidth="463">
      <ModalHeader>
        <Space gap={2} alignItems="center">
          <Text variant="h20"> Send KYC Link</Text>

          <StyledLabel>
            <Text variant="b12" color="white">
              Step {step}/2
            </Text>
          </StyledLabel>
        </Space>

        <Cross
          data-event-name="Form_UploadBatchForm_Icon_Close"
          onClick={onClose}
        />
      </ModalHeader>

      {/* step 1 */}
      <Conditional if={step === 1}>
        <StepOne
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
          handleCreateJourney={handleCreateJourney}
        />
      </Conditional>

      {/* Step 2 */}
      <Conditional if={step === 2}>
        <StepTwo
          setStep={setStep}
          formData={formData}
          setFormData={setFormData}
          downloadSampleFile={downloadSampleFile}
          onResponse={onResponse}
          onClose={onClose}
          setFetchCounter={setFetchCounter}
        />
      </Conditional>
    </Modal>
  );
};

export default SendJourney;
