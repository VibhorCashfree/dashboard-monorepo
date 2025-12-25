import React, { useState, useEffect } from 'react';
import {
  Loader,
  Text,
  Button,
  toast,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Space,
} from '@cashfree-intl/coherent';
import _find from 'lodash/find';
import _keyBy from 'lodash/keyBy';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useAccount } from 'providers/AccountProvider';

// Services
import {
  getCategories,
  toggleCategory,
  removeRecipient,
} from 'services/settings';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Utils
import Analytics from 'utils/analytics';

// Components
import CanWrite from 'components/CanWrite';
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import Icon from 'components/Icon';
import EmailCategory from './EmailCategory';
import Modals from './Modals';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { MODAL_TYPE } from '../constants';

// Types
import type { Category } from '../types';

const EmailNotifications: React.FC = () => {
  const { accountList } = useMerchant();
  const { accountInfo } = useAccount();

  const [data, setData] = useState<AnyObject | undefined>(undefined);
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [selectedAccountId, setSelectedAccountId] = useState<
    number | undefined
  >(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const newAccountId = _find(accountList, {
      accountName: accountInfo.name,
    })?.accountId;

    if (newAccountId) {
      setSelectedAccountId(newAccountId);
    }
  }, [accountInfo, accountList]);

  useEffect(() => {
    (async function fetchData() {
      if (!selectedAccountId) {
        return;
      }

      const queryObj = { selectedAccountId };

      const response = await getCategories(queryObj);

      const data = _keyBy(response, 'notifSubType');

      setData(data);
    })();
  }, [fetchCounter, selectedAccountId]);

  const handleToggle = async (e: React.MouseEvent, category: any) => {
    e.stopPropagation();

    const queryObj = { selectedAccountId };

    const body = {
      product: 'PAYOUT',
      notifType: category.notifType,
      notifSubType: category.notifSubType,
      enabled: !category.enabled,
    };

    Analytics.track('Toggle_Email_Category', { value: category });

    const response = await toggleCategory(queryObj, body);

    if (!('error' in response)) {
      setData((prev) => ({
        ...prev,
        [category.notifSubType]: { ...category, enabled: !category.enabled },
      }));

      toast.success(response.message);
    }
  };

  const handleRemoveRecipient = async (
    e: React.MouseEvent,
    category: Category,
    email: string,
  ) => {
    e.stopPropagation();

    const queryObj = { selectedAccountId };

    const body = {
      product: 'PAYOUT',
      notifType: category.notifType,
      notifSubType: category.notifSubType,
      recipient: email,
    };

    const response = await removeRecipient(queryObj, body);

    if (!('error' in response)) {
      setData((prev) => ({
        ...prev,
        [category.notifSubType]: {
          ...category,
          recipients: category.recipients.filter(
            (item: string) => item !== email,
          ),
        },
      }));

      toast.success(response.message);
    }
  };

  const handleAccountSelect = (account: any) => {
    setData(undefined);

    const newAccountId = _find(accountList, {
      accountId: account.accountId,
    })?.accountId;

    setSelectedAccountId(newAccountId);

    Analytics.track('Dropdown_Select_Account', { value: account });
  };

  if (!data) {
    return <Loader active />;
  }

  const selectedAccount = _find(accountList, { accountId: selectedAccountId });

  return (
    <>
      <PageHeader embedKey="SETTINGS">
        <span>{LABEL_BY_MENU[MENU.SETTINGS]} - </span>{' '}
        {LABEL_BY_SUBMENU[SUBMENU.EMAIL_NOTIFICATIONS]}
        {accountList.length > 1 && (
          <Dropdown
            button
            icon={null}
            className="ml-2"
            style={{ minWidth: 196 }}
            trigger={
              <Space justifyContent="space-between">
                <Text>{selectedAccount!.accountName}</Text>
                <Icon
                  name={open ? 'chevron-up' : 'chevron-down'}
                  className="ml-1"
                />
              </Space>
            }
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
          >
            <DropdownMenu style={{ minWidth: '100%' }}>
              {accountList.map((account) => (
                <DropdownItem
                  data-testid={`${account.accountId}-dropdownitem`}
                  onClick={() => handleAccountSelect(account)}
                  key={account.accountId}
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

      <MetaTags
        title={`${LABEL_BY_MENU[MENU.SETTINGS]} – ${
          LABEL_BY_SUBMENU[SUBMENU.EMAIL_NOTIFICATIONS]
        }`}
      />

      <Text className="mt-3">Merchant Notifications</Text>
      <CanWrite code={22007} remove>
        <Space
          justifyContent="space-between"
          alignItems="center"
          className="mb-2"
        >
          <Text className="mb-0" color="bodyLight">
            Configure the email category that you want to get notified about.
            Click Add Recipient to add members in your organization to receive
            the emails.
          </Text>
          <Button
            data-event-name="Primary_Button"
            primary
            onClick={() => setModalType(MODAL_TYPE.ADD_RECIPIENT)}
          >
            Add Recipient
          </Button>
        </Space>
      </CanWrite>

      {Object.keys(data).map((key) => (
        <EmailCategory
          key={key}
          category={data[key]}
          onToggle={handleToggle}
          onRemoveRecipient={handleRemoveRecipient}
        />
      ))}

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          selectedAccountId={selectedAccountId}
          data={data}
        />
      )}
    </>
  );
};

export default withErrorBoundary(
  withReadPermission(EmailNotifications, {
    code: 22006,
    description: `access ${LABEL_BY_SUBMENU[SUBMENU.EMAIL_NOTIFICATIONS]}`,
  }),
);
