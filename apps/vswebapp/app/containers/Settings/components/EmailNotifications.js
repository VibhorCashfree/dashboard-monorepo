import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Tab,
  Text,
  Button,
  toast,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Space,
  Popup,
  Icon,
  Conditional,
} from '@cashfree-intl/coherent';
import _find from 'lodash/find';
import _keyBy from 'lodash/keyBy';

// Providers
import { MerchantContext } from 'providers/MerchantProvider';
import { AccountContext } from 'providers/AccountProvider';

// Services
import {
  getCategories,
  getNotificationTypes,
  getNotificationDetails,
  deleteNotificationEmail,
  updateNotificationStatus,
  getNotificationUpdatedData,
  resendApprovalEmail,
  updateNotificationPreferences,
  getNotificationTabGroupsStatus,
} from 'services/settings';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import Loader from 'components/Loader';
import MetaTags from 'components/MetaTags';
import DropdownButton from 'components/DropdownButton';
import PageHeader from 'components/PageHeader';
import Modals from './Modals';
import NavigationBar from 'components/NavigationBar';
import CategoryCard from 'components/CatergoryCard';
import EmailChannelTab from './EmailChannelTab';

// Constants
import {
  NOTIFICATION_TAB_OPTIONS,
  NOTIFICATION_TAB_GROUPS,
  MANAGE_PREFERENCE_DROPDOWN_OPTION,
  MODAL_TYPE,
} from 'constants/notifications';

// Styled
import { BackButtonWrapper } from 'styled/common';
import { AccordionWrapper, StyledDescription, StyledText } from '../styled';
import notification from 'utils/notification';

const EmailNotifications = () => {
  // Context
  const { accountList } = useContext(MerchantContext);
  const { accountInfo, handleAccountSelect } = useContext(AccountContext);

  const [isLoading, setIsLoading] = useState(false);

  // State
  const [state, setState] = useState({
    data: null,
    modalType: null,
    selectedAccountId: null,
    open: false,
    activeNotificationTab: NOTIFICATION_TAB_OPTIONS[0].value,
    notificationTypes: [],
    activeIndex: -1,
    emailLoading: false,
    emailChannelData: [],
    fetchCounter: 0,
    notificationStatus: {},
    uniqueNotificationTypes: [],
  });

  // Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Update state helper
  const updateState = useCallback(updates => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Initialize selected account
  useEffect(() => {
    if (accountInfo?.name && accountList?.length) {
      const account = _find(accountList, { accountName: accountInfo.name });
      if (account) {
        updateState({ selectedAccountId: account.accountId });
      }
    }
  }, [accountInfo, accountList, updateState]);

  // Fetch data effect
  useEffect(() => {
    const fetchData = async () => {
      if (!state.selectedAccountId) return;

      const queryObj = { selectedAccountId: state.selectedAccountId };

      updateState({ data: null });

      setIsLoading(true);

      const notificationTabGroupPayload = {
        notificationTabGroup: state.activeNotificationTab,
      };

      try {
        const [
          categoriesResponse,
          notificationResponse,
          notificationTabGroupsResponse,
        ] = await Promise.all([
          getCategories(queryObj),
          getNotificationTypes(),
          getNotificationTabGroupsStatus(
            notificationTabGroupPayload,
            state.selectedAccountId,
          ),
        ]);

        const notificationTypes =
          notificationResponse?.data?.filter(
            notification =>
              notification.product === 'VRS' &&
              notification.notificationTabGroup === state.activeNotificationTab,
          ) || [];

        const notificationTabGroups = notificationTabGroupsResponse.data || {};

        const categoriesData = _keyBy(categoriesResponse, 'notifSubType');

        const uniqueNotificationTypes = [
          ...new Set(
            notificationResponse?.data?.map(
              notification => notification?.notificationTabGroup,
            ),
          ),
        ];

        updateState({
          data: categoriesData,
          notificationTypes: notificationTypes.map(notification => ({
            ...notification,
            active: notificationTabGroups[notification.category]?.active,
          })),
          notificationStatus: notificationTabGroups || {},
          uniqueNotificationTypes: uniqueNotificationTypes,
        });
      } catch (error) {
        toast.error('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [state.fetchCounter, state.selectedAccountId, updateState]);

  const handleAccountChange = useCallback(
    data => {
      const account = _find(accountList, { accountId: data.accountId });
      if (account) {
        updateState({ selectedAccountId: account.accountId });
        handleAccountSelect(account, { navigate: false });
      }
    },
    [accountList, updateState],
  );

  const handleNavigationClick = (e, { name }) => {
    const activeTabValue =
      NOTIFICATION_TAB_OPTIONS.find(notification => notification.text === name)
        ?.value || '';
    updateState({
      activeNotificationTab: activeTabValue,
      fetchCounter: state.fetchCounter + 1,
      activeIndex: -1,
    });
  };

  const getNotificationEmailDetails = useCallback(
    async notificationId => {
      updateState({ emailLoading: true });

      try {
        const response = await getNotificationDetails(
          notificationId,
          state.selectedAccountId,
        );

        if (response.error) {
          toast.error(response.message || 'Failed to fetch email details');
        } else {
          updateState({ emailChannelData: response.data });
        }
      } catch (error) {
        toast.error('Failed to fetch email details');
      } finally {
        updateState({ emailLoading: false });
      }
    },
    [state.selectedAccountId, updateState],
  );

  const handleClick = useCallback(
    (notification, index) => {
      const newIndex = state.activeIndex === index ? -1 : index;
      updateState({
        activeIndex: newIndex,
        emailChannelData: [],
      });
      if (newIndex !== -1) {
        getNotificationEmailDetails(notification?.id);
      }
    },
    [state.activeIndex, getNotificationEmailDetails, updateState],
  );

  const handleModalActions = {
    onDeleteEmail: useCallback(
      emailDetails => {
        updateState({
          modalType: MODAL_TYPE.DELETE,
          data: emailDetails,
        });
      },
      [updateState, state],
    ),

    onResendApprovalEmail: useCallback(
      async emailDetails => {
        updateState({ emailLoading: true });
        const notificationType = state.notificationTypes.find(
          notification => notification.id === emailDetails?.notificationTypeId,
        );
        const payload = {
          email: emailDetails?.email,
          notificationSubscriptions: [
            {
              product: notificationType?.product,
              category: notificationType?.metadata?.displayName,
              notificationSubscriptionId:
                emailDetails?.notificationSubscriptionId,
            },
          ],
        };

        const response = await resendApprovalEmail(payload);
        updateState({ emailLoading: false });
      },
      [updateState, state],
    ),

    onManageEmailPreference: useCallback(() => {
      // searchParams.set('modalType', MODAL_TYPE.EMAIL);
      updateState({
        modalType: MODAL_TYPE.EMAIL,
        data: state.notificationTypes.filter(
          notification =>
            notification.notificationTabGroup === state.activeNotificationTab,
        ),
      });
      // setSearchParams(searchParams);
    }, [state, searchParams, setSearchParams, updateState]),

    onManageUserPreference: useCallback(() => {
      searchParams.set('modalType', MODAL_TYPE.USER);
      updateState({ modalType: MODAL_TYPE.USER });
      setSearchParams(searchParams);
    }, [searchParams, setSearchParams, updateState]),
  };

  const handleManagePreferenceClick = useCallback(
    value => {
      if (value === 'EMAIL') {
        handleModalActions.onManageEmailPreference();
      } else {
        handleModalActions.onManageUserPreference();
      }
    },
    [handleModalActions],
  );

  // Computed values
  const selectedAccount = _find(accountList, {
    accountId: state.selectedAccountId,
  });

  const handleCategoryStatusToggle = async (notificationTypeIds, isActive) => {
    const payload = {
      isActive,
      notificationTypeIds: [notificationTypeIds],
    };
    setIsLoading(true);
    const response = await updateNotificationStatus(
      payload,
      state.selectedAccountId,
    );
    if ('error' in response) {
      setIsLoading(false);
      toast.error(response.message || 'Failed to update');
      return;
    }

    const notificationResponse = await getNotificationUpdatedData(
      {
        notificationTabGroup: NOTIFICATION_TAB_OPTIONS.find(
          notification => notification.value === state.activeNotificationTab,
        )?.key,
      },
      state.selectedAccountId,
    );

    setIsLoading(false);
    updateState({
      notificationTypes: state.notificationTypes.map(notification => ({
        ...notification,
        active: notificationResponse.data[notification.category]?.active,
      })),
    });
  };

  const handleUserDelete = async emailDetails => {
    updateState({ emailLoading: true });
    try {
      const response = await deleteNotificationEmail(
        emailDetails.notificationTypeId,
        emailDetails.notificationSubscriptionId,
        emailDetails.id,
        {
          channelValueType: 'EMAIL',
          channelValue: emailDetails.email,
        },
        state.selectedAccountId,
      );
      if (response.error) {
        toast.error(response.message || 'Failed to delete email');
        return;
      }
      toast.success('Email deleted successfully');
      updateState({
        modalType: null,
        data: null,
        emailChannelData: state.emailChannelData.filter(
          email => email.id !== emailDetails.id,
        ),
      });
    } catch (error) {
      toast.error('Failed to delete recipient');
      console.error('Delete error:', error);
    } finally {
      updateState({ emailLoading: false });
    }
  };

  const handleUserAdd = async data => {
    const payload = {
      notificationPreferences: data.map(datum => ({
        isActive: datum.isActive,
        notificationTypeId: datum.id,
        channelDetails: [
          {
            channelValue: datum.email,
            channelValueType: datum.channel,
          },
        ],
      })),
    };
    updateState({ emailLoading: true });
    const response = await updateNotificationPreferences(
      payload,
      state.selectedAccountId,
    );
    if (response.error) {
      updateState({ emailLoading: false });
      toast.error(response.message || 'Failed to add recipient');
      return;
    }
    updateState({
      modalType: null,
      emailLoading: false,
      data: null,
      fetchCounter: state.fetchCounter + 1,
    });
    toast.success('Recipient added successfully');
  };

  const handleModalSubmit = (data, modalType) => {
    if (modalType === MODAL_TYPE.DELETE) {
      handleUserDelete(data);
    }
    if (modalType === MODAL_TYPE.EMAIL) {
      handleUserAdd(data);
    }
  };

  return (
    <>
      <Loader active={isLoading} />
      <PageHeader embedKey="SETTINGS">
        <span>Settings - </span>Secure ID
        {accountList.length > 1 && (
          <Dropdown
            button
            icon={null}
            className="ml-2"
            style={{ minWidth: 196 }}
            trigger={
              <Space justifyContent="space-between">
                <Text>{selectedAccount?.accountName}</Text>
                <Icon
                  name={state.open ? 'chevron-up' : 'chevron-down'}
                  className="ml-1"
                />
              </Space>
            }
            onOpen={() => updateState({ open: true })}
            onClose={() => updateState({ open: false })}
          >
            <DropdownMenu style={{ minWidth: '100%' }}>
              {accountList.map(account => (
                <DropdownItem
                  data-testid={`${account.accountId}-dropdownitem`}
                  key={account.accountId}
                  onClick={() => handleAccountChange(account)}
                >
                  <Space gap={0} direction="column">
                    <Text color="primary" style={{ whiteSpace: 'pre-wrap' }}>
                      {account.accountName}
                    </Text>
                    <Text variant="b12" color="bodyLight">
                      {account.rechargeAccount}
                    </Text>
                  </Space>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </PageHeader>

      <MetaTags title="Settings – Secure ID" />

      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
        <Text as="span" variant="h16" className="ml-2">
          Notifications
        </Text>
      </BackButtonWrapper>

      <NavigationBar
        navigationOptions={NOTIFICATION_TAB_OPTIONS.filter(option =>
          state.uniqueNotificationTypes.includes(option.key),
        ).map(({ text }) => text)}
        activeNavigation={
          NOTIFICATION_TAB_OPTIONS.find(
            option => option.value === state.activeNotificationTab,
          )?.text
        }
        handleNavigationClick={handleNavigationClick}
      />

      <Conditional
        if={
          state.activeNotificationTab === NOTIFICATION_TAB_GROUPS.SECURE_ID ||
          state.activeNotificationTab ===
            NOTIFICATION_TAB_GROUPS.UPDATES_AND_ALERTS
        }
      >
        <div className="mt-3">
          <StyledDescription>
            <div className="text-light">
              Configure how you want to receive notifications for each category.
              Click "Manage Notifications" to Create or Edit notification
              preference.
            </div>
            <Space gap={1}>
              <DropdownButton
                options={MANAGE_PREFERENCE_DROPDOWN_OPTION}
                dropdownMinWidth={206}
                onClick={handleManagePreferenceClick}
              >
                {open => (
                  <Button
                    primary
                    iconPosition="right"
                    icon={
                      <Icon
                        name={open ? 'chevron-up' : 'chevron-down'}
                        fill="white"
                        className="ml-1"
                      />
                    }
                  >
                    Manage Notifications
                  </Button>
                )}
              </DropdownButton>
            </Space>
          </StyledDescription>

          <AccordionWrapper>
            {state.notificationTypes?.map((obj, index) => {
              const { id, metadata, active } = obj;
              const { description, displayName } = metadata;

              return (
                <CategoryCard
                  key={id}
                  title={displayName}
                  description={description}
                  open={index === state.activeIndex}
                  active={active}
                  onClick={() => handleClick(obj, index)}
                  onToggleStatus={() => handleCategoryStatusToggle(id, !active)}
                >
                  <Tab
                    activeIndex={0}
                    menu={{ secondary: true, pointing: true }}
                    panes={[{ menuItem: 'EMAIL' }]}
                  />
                  <EmailChannelTab
                    loading={state.emailLoading}
                    data={state.emailChannelData || []}
                    onDeleteEmail={handleModalActions.onDeleteEmail}
                    onResendApprovalEmail={
                      handleModalActions.onResendApprovalEmail
                    }
                  />
                </CategoryCard>
              );
            })}
          </AccordionWrapper>
        </div>
      </Conditional>

      {state.modalType && (
        <Modals
          loading={state.emailLoading}
          modalType={state.modalType}
          activeNotificationTab={state.activeNotificationTab}
          selectedAccountId={state.selectedAccountId}
          setModalType={modalType => updateState({ modalType })}
          data={state.data}
          handleSubmit={handleModalSubmit}
        />
      )}
    </>
  );
};

export default withReadPermission(EmailNotifications, {
  code: 22006,
  description: 'access Email Notifications',
});
