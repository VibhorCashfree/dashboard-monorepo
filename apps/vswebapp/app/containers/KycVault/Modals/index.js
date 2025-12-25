import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  UploadStats,
  Text,
  AlertModal,
  ConfirmModal,
  Space,
  Icon as CoherentIcon,
  Button,
  Modal,
  ModalContent,
  Animation,
  Cross,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Styled
import {
  StyledPreviewModal,
  StyledCredential,
  StyledNum,
  StyledStatusLabel,
  StyledInfo,
} from '../styled';
import { Divider } from 'styled/common';

// Constants
import { MODAL_TYPES } from '../constants';

// Components
import CreateJourney from './CreateJourney';
import TemplateView from './TemplateView';
import MobileEntry from './MobileEntry';
import OTPVerification from './OTPVerification';
import OnboardingDetailModal from './OnboardingDetailModal';

// Helpers
import { maskClientSecret } from '../helpers';

// Utils
import { downloadText } from 'utils/common';

const Modals = ({
  modalType,
  setModalType,
  setFetchCounter,
  handleDelete,
  keyDetails,
  setShowPitchPage,
  onMobileSubmit,
  onOTPVerification,
  onOTPResend,
  mobileNumber,
  onboardingDetails,
}) => {
  const [modalData, setModalData] = useState({});

  switch (modalType) {
    case MODAL_TYPES.CREATE_JOURNEY:
      return (
        <CreateJourney
          setFetchCounter={setFetchCounter}
          onClose={() => setModalType()}
          setModalData={setModalData}
          setModalType={setModalType}
          setShowPitchPage={setShowPitchPage}
        />
      );

    case MODAL_TYPES.MOBILE_ENTRY:
      return (
        <MobileEntry onClose={() => setModalType()} onSubmit={onMobileSubmit} />
      );

    case MODAL_TYPES.OTP_VERIFICATION:
      return (
        <OTPVerification
          onClose={() => setModalType()}
          onSubmit={onOTPVerification}
          onResend={onOTPResend}
          mobileNumber={mobileNumber}
        />
      );

    case MODAL_TYPES.ONBOARDING_DETAILS:
      console.log('Rendering ONBOARDING_DETAILS modal with data:', onboardingDetails);
      return (
        <OnboardingDetailModal
          modalData={onboardingDetails}
          handleClose={() => setModalType()}
        />
      );

    case MODAL_TYPES.VIEW_TEMPLATE:
      return (
        <TemplateView onClose={() => setModalType()} app_details={keyDetails} />
      );
      break;

    case MODAL_TYPES.VIEW_KEYS:
      return (
        <Modal open $maxWidth="480">
          <ModalContent>
            <Space direction="column" alignItems="center" gap={2}>
              <CoherentIcon name="key" width="32" height="32" />
              <Space direction="column" alignItems="center" gap={0.5}>
                <Text variant="h20">API Keys for {keyDetails?.app_name}</Text>
                <Text variant="b14">
                  These are for integrating your product
                </Text>
              </Space>
              <StyledCredential
                gap={1.5}
                direction="column"
                style={{ minWidth: '398px' }}
                className="p-3"
              >
                <Space gap={2} justifyContent="flex-start" alignItems="center">
                  <Text variant="b14" strong>
                    Client - ID :
                  </Text>
                  <Text variant="p14" color="bodyLight">
                    {keyDetails?.client_id}
                  </Text>
                </Space>
                <Divider contain className="m-0" />
                <Space gap={2} justifyContent="flex-start" alignItems="center">
                  <Text variant="b14" strong>
                    Client - Secret :
                  </Text>
                  <Text variant="p14" color="bodyLight">
                    {keyDetails?.client_secret}
                  </Text>
                </Space>
              </StyledCredential>
              <Space justifyContent="center" fullWidth className="p-1">
                {/* <Button link>View Integration Docs</Button> */}
                <Button primary onClick={() => setModalType()}>
                  Close
                </Button>
              </Space>
            </Space>
          </ModalContent>
        </Modal>
      );

    case MODAL_TYPES.SUCCESS_JOURNEY: {
      return (
        <StyledPreviewModal style={{ width: '472px' }} open>
          <Space justifyContent="flex-end" className="px-4 pt-4">
            <Cross
              onClick={() => {
                setModalType();
                setFetchCounter(prev => prev + 1);
              }}
            />
          </Space>
          <Space direction="column" alignItems="center" justifyContent="center">
            <Space direction="column" alignItems="center" gap={3}>
              <Space direction="column" alignItems="center" gap={1}>
                <Animation name="success" loop className="mb-2" />
                <Text variant="h20">Template Created Successfully</Text>
                <Text
                  variant="b14"
                  color="bodyLight"
                  style={{ textAlign: 'center' }}
                  className="mb-2"
                >
                  Follow 2 steps mentioned below for smooth integration
                </Text>
              </Space>

              <Space direction="row" gap={1.5}>
                <StyledNum>
                  <Text variant="b14" strong>
                    1
                  </Text>
                </StyledNum>
                <Space direction="column">
                  <Space
                    direction="row"
                    gap={1}
                    className="mb-1"
                    alignItems="center"
                  >
                    <Text variant="h16" strong>
                      Save API Keys
                    </Text>
                    <StyledStatusLabel
                      justifyContent="center"
                      alignItems="center"
                      className="m-0"
                    >
                      <Text color="success" strong>
                        IMPORTANT
                      </Text>
                    </StyledStatusLabel>
                  </Space>
                  <Text variant="b14" color="bodyLight" className="mb-2">
                    You’ll need the API Keys below to integrate the created
                    template.
                  </Text>
                  <StyledCredential
                    gap={1.5}
                    direction="column"
                    style={{ width: '386px' }}
                    className="mb-3"
                  >
                    <StyledInfo alignItems="center" justifyContent="center">
                      <Text variant="b12" color="info">
                        A copy of the API Keys has also been downloaded in your
                        system
                      </Text>
                    </StyledInfo>
                    <Space
                      direction="column"
                      style={{ padding: '0px 24px 12px 24px' }}
                    >
                      <Space
                        gap={0.5}
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                      >
                        <Text variant="b14" strong>
                          Client - ID :
                        </Text>
                        <Text variant="p14" color="bodyLight">
                          {modalData?.client_id}
                        </Text>
                      </Space>
                      <Divider contain className="my-1" />
                      <Space
                        gap={0.5}
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                      >
                        <Text variant="b14" strong>
                          Client - Secret :
                        </Text>
                        <Text variant="p14" color="bodyLight">
                          {maskClientSecret(modalData?.client_secret, 4, 6)}
                        </Text>
                      </Space>
                    </Space>
                  </StyledCredential>
                  <div>
                    {' '}
                    <Button
                      secondary
                      icon={<CoherentIcon name="download" />}
                      onClick={() =>
                        downloadText(
                          'API Credentials.txt',
                          `Client ID: ${modalData?.client_id} Client Secret: ${
                            modalData?.client_secret
                          }`,
                        )
                      }
                    >
                      Download API Keys
                    </Button>
                  </div>
                </Space>
              </Space>

              <Space direction="row" gap={1.5}>
                <StyledNum>
                  <Text variant="b14" strong>
                    2
                  </Text>
                </StyledNum>
                <Space direction="column">
                  <Space
                    direction="row"
                    gap={1}
                    className="mb-1"
                    alignItems="center"
                  >
                    <Text variant="h16" strong>
                      Integrate
                    </Text>
                  </Space>
                  <Text
                    variant="b14"
                    color="bodyLight"
                    className="mb-2"
                    style={{ width: '388px' }}
                  >
                    Review and follow the steps outlined in the 1-Click
                    Onboarding integration documents to successfully integrate
                    the created template with your app.
                  </Text>
                  <div>
                    <Button
                      secondary
                      onClick={() =>
                        window.open(
                          'https://www.cashfree.com/docs/api-reference/vrs/v2/secure-share/data-availability',
                          '_blank',
                        )
                      }
                    >
                      View Integration Docs
                    </Button>
                  </div>
                </Space>
              </Space>
            </Space>
          </Space>
        </StyledPreviewModal>
      );
    }

    case MODAL_TYPES.DELETE: {
      return (
        <ConfirmModal
          title="Delete Template"
          confirmText="Delete"
          onClose={() => {
            setModalType();
          }}
          onConfirm={handleDelete}
          danger
        >
          <Text variant="p14" color="bodyLight" className="mb-2">
            Are you sure you want to delete this Template?
          </Text>
          <Text variant="h16" color="warning">
            Ensure the template is unpublished on your app before deleting.
          </Text>
        </ConfirmModal>
      );
    }

    default:
      console.warn('Unknown modal type:', modalType);
      return null;
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
  setFetchCounter: PropTypes.func.isRequired,
  onMobileSubmit: PropTypes.func,
  onOTPVerification: PropTypes.func,
  onOTPResend: PropTypes.func,
  mobileNumber: PropTypes.string,
  onboardingDetails: PropTypes.object,
};

export default Modals;
