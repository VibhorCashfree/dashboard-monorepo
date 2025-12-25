import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  Space,
  DateFilter,
  Text,
  toast,
  Conditional,
  Icon as CoherentIcon,
  EllipsisPopup,
  Popup,
} from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _startCase from 'lodash/startCase';
import _get from 'lodash/get';

// Components
import Icon from 'components/Icon';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import PaginatedTable from 'components/PaginatedTable';
import CreateJourney from './Modals/CreateJourney';
import PitchPage from 'components/PitchPage';

// Containers
import Modals from './Modals';

// Constants
import EVENTS from 'constants/analytics';
import { DATE_OPTIONS, DEFAULT_VALUE, FORMATS } from 'constants/date';
import {
  filtersConfig,
  labelByStatus,
  options,
  publishedActions,
  draftActions,
  COLUMN_ID,
  MODAL_TYPES,
} from './constants';
import { KNOW_MORE } from 'constants/urls';

// Styled
import { Action, FilterRowContainer } from 'styled/common';

// Providers
import { ListContext } from 'providers/ListProvider';
import { AccountContext } from 'providers/AccountProvider';

// Utils
import Analytics from 'utils/analytics';
import { emitUserValidation } from 'utils/common';
import { getChips } from 'utils/chips';
import { getPaginationInfo, getCursor } from 'utils/pagination';
import Emitter from 'utils/emitter';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Helpers
import { formattedDate } from 'helpers/common';

// Services
import { deleteApp, getApps, sendOTPForOnboarding, verifyOTPForOnboarding } from 'services/vault';

const KycVault = () => {
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [keyDetails, setKeyDetails] = useState();
  const [mobileNumber, setMobileNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [onboardingDetails, setOnboardingDetails] = useState(null);
  const [showPitchPage, setShowPitchPage] = useState(
    sessionStorage.getItem('VAULT_PITCH_PAGE') ?? 'NOT_SHOWN',
  );

  const { state, dispatch } = useContext(ListContext);

  const { data, key, reset } = state;

  const hasMount = useHasMount();

  useEffect(() => {
    if (hasMount) {
      return;
    }

    dispatch({
      type: 'RESET',
    });
  }, [fetchCounter]);

  useEffect(() => {
    (async function fetchData() {
      if (hasMount && data) {
        return;
      }

      const response = await getApps();

      if (!response.error) {
        dispatch({
          type: 'SET_DATA',
          payload: { data: response.app_details },
        });
      }

      setLoading(false);
    })();
  }, [fetchCounter, key, reset, showPitchPage]);

  useEffect(() => {
    setShowPitchPage(
      _get(data, 'data', []).length > 0 ? 'JOURNEY_CREATED' : 'PITCH_SHOWN',
    );
    sessionStorage.setItem('VAULT_PITCH_PAGE', showPitchPage);
  }, [data]);

  const FORMATTED_COLUMN_ID = [
    ...COLUMN_ID,
    {
      accessorKey: 'action',
      header: ' ',
      cell: row => {
        const onItemClick = (_, itemSelected) => {
          switch (itemSelected) {
            case 'VIEW_API_KEYS':
              setModalType('VIEW_KEYS');
              setKeyDetails(row);
              return;

            case 'VIEW_TEMPLATE':
              setKeyDetails(row);
              setModalType('VIEW_TEMPLATE');
              return;

            case 'DELETE':
              setKeyDetails(row);
              setModalType('DELETE');
              return;
          }
        };

        return (
          <Space justifyContent="flex-end" className="pr-2">
            <EllipsisPopup
              menuItems={[
                {
                  key: 1,
                  text: 'View API Keys',
                  value: 'VIEW_API_KEYS',
                  image: props => <Icon name="APIKey" {...props} />,
                },
                {
                  key: 2,
                  text: 'View Template',
                  value: 'VIEW_TEMPLATE',
                  image: props => <CoherentIcon name="eye" {...props} />,
                },
                {
                  key: 3,
                  text: 'Delete',
                  value: 'DELETE',
                  image: props => <CoherentIcon name="delete" {...props} />,
                  type: 'danger',
                },
              ]}
              onClick={onItemClick}
            />
          </Space>
        );
      },
    },
  ];

  const handleDelete = async () => {
    const response = await deleteApp({ oauth_app_id: keyDetails.oauth_app_id });

    if (!response.error) {
      toast.success(response.message);
      setModalType();
      setFetchCounter(fetchCounter + 1);
      setShowPitchPage('PITCH_SHOWN');
    }
  };

  const handleMobileSubmit = async ({ name, mobileNumber: submittedMobileNumber }) => {
    try {
      // Store the mobile number and name for OTP verification
      setMobileNumber(submittedMobileNumber);
      setUserName(name);

      // Prepare the API payload
      const payload = {
        mobile_number: submittedMobileNumber,
        name: name,
        user_consent: {
          timestamp: new Date().toISOString(),
          purpose: "User consent to fetch onboarding data.",
          obtained: true,
          type: "EXPLICIT"
        },
        notification_modes: ["SMS", "WHATSAPP"]
      };

      // Call the API to send OTP
      const response = await sendOTPForOnboarding(payload);

      if (response.error) {
        throw new Error(response.error.message || 'Failed to send OTP');
      }

      // Store verification ID in state
      setVerificationId(response.verification_id);

      // Transition to OTP modal
      setModalType(MODAL_TYPES.OTP_VERIFICATION);

    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  const handleOTPResend = async () => {
    try {
      // Prepare the API payload using stored mobile number and name
      const payload = {
        mobile_number: mobileNumber,
        name: userName,
        user_consent: {
          timestamp: new Date().toISOString(),
          purpose: "User consent to fetch onboarding data.",
          obtained: true,
          type: "EXPLICIT"
        },
        notification_modes: ["SMS", "WHATSAPP"]
      };

      // Call the API to send OTP again
      const response = await sendOTPForOnboarding(payload);

      if (response.error) {
        throw new Error(response.error.message || 'Failed to resend OTP');
      }

      // Update verification ID with new one
      setVerificationId(response.verification_id);

      return { status: 'SUCCESS' };
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error(error.message || 'Failed to resend OTP. Please try again.');
      throw error;
    }
  };

  const handleOTPVerification = async otp => {
    try {
      const payload = {
        verification_id: verificationId,
        otp: otp
      };

      // Call the API to verify OTP
      const response = await verifyOTPForOnboarding(payload);

      if (response.error) {
        throw new Error(response.error.message || 'Invalid OTP');
      }

      // Check if verification was successful or if no details were found
      if (response.status === 'SUCCESS' || response.status === 'DETAILS_NOT_FOUND') {
        // Store the onboarding details
        setOnboardingDetails(response);

        // Clear verification ID
        setVerificationId(null);

        // Close OTP modal and open onboarding details modal
        setTimeout(() => {
          setModalType(MODAL_TYPES.ONBOARDING_DETAILS);
        }, 100);

        return { status: 'SUCCESS' };
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <Conditional if={showPitchPage === 'NOT_SHOWN'}>
        <PitchPage
          productCode="SECURE_SHARE"
          btnText="Get Started"
          onBtnClick={() => {
            sessionStorage.setItem('VAULT_PITCH_PAGE', 'PITCH_SHOWN');
            setShowPitchPage('PITCH_SHOWN');
            // setModalType(MODAL_TYPES.CREATE_JOURNEY);
          }}
        />
      </Conditional>
      <Conditional if={showPitchPage !== 'NOT_SHOWN'}>
        <div>
          <FilterRowContainer>
            <div />
            <Space gap={2}>
              <Button
                primary
                onClick={() => setModalType(MODAL_TYPES.MOBILE_ENTRY)}
                disabled={false}
              >
                Try 1-Click Onboarding
              </Button>
              {!_get(data, 'data', []).length ? (
                <Button
                  primary
                  data-event-name="Primary_Button"
                  onClick={() => setModalType(MODAL_TYPES.CREATE_JOURNEY)}
                  disabled={false}
                >
                  Create New Template
                </Button>
              ) : (
                <Popup
                  position="top right"
                  content={
                    <Text variant="b12" color="bodyLight">
                      Only 1 template can be created at a time.
                    </Text>
                  }
                  trigger={
                    <span>
                      <Button
                        primary
                        data-event-name="Primary_Button"
                        disabled={true}
                      >
                        Create New Template
                      </Button>
                    </span>
                  }
                />
              )}
            </Space>
          </FilterRowContainer>

          <PaginatedTable
            data={_get(data, 'data', [])}
            fetching={loading}
            tableHeading={FORMATTED_COLUMN_ID}
            isPaginated={false}
            emptyTableComponent={{
              text: 'No template created yet',
              description: 'Start by creating your first template.',
              icon: <CoherentIcon name="noRecordsTableIcon" />,
            }}
          />
        </div>
      </Conditional>

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          keyDetails={keyDetails}
          handleDelete={handleDelete}
          setShowPitchPage={setShowPitchPage}
          onMobileSubmit={handleMobileSubmit}
          onOTPVerification={handleOTPVerification}
          onOTPResend={handleOTPResend}
          mobileNumber={mobileNumber}
          onboardingDetails={onboardingDetails}
        />
      )}
    </>
  );
};

export default KycVault;
