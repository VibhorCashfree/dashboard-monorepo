import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Icon,
  Toggle,
  Loader,
  Text,
  Space,
  DataTable,
  Button,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { USER_TYPE } from 'constants/common';
import { KNOW_MORE } from 'constants/urls';
import { MODAL_TYPE } from './constants';

// Services
import { getAPIKeys } from 'services/developers';

// Utils
import Env from 'utils/env';
import { emitUserValidation } from 'utils/common';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useAccount } from 'providers/AccountProvider';

// Components
import Alert from 'components/Alert';
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import CanWrite from 'components/CanWrite';
import Modals from './components/Modals';

// Helpers
import { getFormattedRowData } from './helpers';

const APIKeys: React.FC = () => {
  const { merchantDetails, merchantSettings } = useMerchant();
  const { preferences } = useAccount();

  const [data, setData] = useState<any>();
  const [isMerchantLevel, setIsMerchantLevel] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [fetchCounter, setFetchCounter] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchData() {
      const queryObj: { agent?: string } = isMerchantLevel
        ? { agent: 'MERCHANT' }
        : {};
      const data = await getAPIKeys(queryObj);

      setData(data);
    })();
  }, [isMerchantLevel, fetchCounter]);

  const handleDelete = (clientId: string | undefined) => {
    if (!clientId) {
      return;
    }

    setFetchCounter((count: number) => count + 1);
  };

  const handleAction = (row: AnyObject) => () => {
    emitUserValidation(() => {
      setSelected(row.clientId);
      setModalType(MODAL_TYPE.DELETE);
    });
  };

  const goToHistoryLog = () => {
    navigate(
      `/${PATH_BY_MENU[MENU.DEVELOPERS]}/${PATH_BY_SUBMENU[SUBMENU.API_KEYS]}/${
        PATH_BY_SUBMENU[SUBMENU.HISTORY_LOG]
      }`,
    );
  };

  if (!data) {
    return <Loader active page={false} />;
  }

  const activeAPIKeys: any[] = _get(data, 'activeAPIKeys', []);

  const disabled = !preferences.enableAPI || activeAPIKeys.length >= 10;

  return (
    <>
      <PageHeader embedKey="DEVELOPERS">
        {LABEL_BY_SUBMENU[SUBMENU.API_KEYS]}
      </PageHeader>
      <MetaTags title={LABEL_BY_SUBMENU[SUBMENU.API_KEYS]} />

      {Env.isTest() && (
        <Alert className="mb-2" type="warning" bordered rounded>
          <Alert.Content size="md">
            <Text strong>Test Environment:</Text>
            <Text>
              Please use only test data available in our{' '}
              <a
                href="https://www.cashfree.com/docs/payouts/payouts/integrations/data-to-test"
                target="_blank"
                rel="noopener noreferrer"
                data-event-name="Link"
              >
                documentation
              </a>{' '}
              while using our Test Environment or calling our Sandbox APIs.{' '}
            </Text>
          </Alert.Content>
        </Alert>
      )}

      {merchantSettings.enableMerchantAPIKeyAddition &&
        preferences.transfers.approve &&
        merchantDetails.userType === USER_TYPE.MERCHANT_OWNER && (
          <Space justifyContent="flex-start" className="mb-2">
            <Toggle
              active={isMerchantLevel}
              onToggle={() => setIsMerchantLevel((prev) => !prev)}
            />
            <Text variant="b12" color="bodyLight" className="pl-1">
              Merchant Level
            </Text>
          </Space>
        )}

      {disabled && (
        <Alert className="mb-3" type="info" bordered rounded>
          <Alert.Content size="md">
            {preferences.enableAPI
              ? 'You have reached maximum limit for API Keys.'
              : 'API access is disabled for your account.'}{' '}
            Please reach out to your account manager or mail us at{' '}
            <a href="mailto:care@cashfree.com">care@cashfree.com</a>
          </Alert.Content>
        </Alert>
      )}

      <Space
        justifyContent="space-between"
        alignItems="center"
        className="my-2"
      >
        <Text className="my-2" color="bodyLight">
          <a
            href={KNOW_MORE.DEVELOPERS.API_KEYS}
            target="_blank"
            rel="noopener noreferrer"
            data-event-name="Link"
          >
            Know more
          </a>{' '}
          about API Keys
        </Text>
        <CanWrite code={22004}>
          <div>
            <Button
              data-event-name="Primary_Button"
              link
              onClick={goToHistoryLog}
            >
              View History
            </Button>
            <Button
              data-event-name="Primary_Button"
              primary
              onClick={() =>
                emitUserValidation(() => setModalType(MODAL_TYPE.ADD))
              }
              disabled={disabled}
            >
              Generate API Keys
            </Button>
          </div>
        </CanWrite>
      </Space>
      <div className="mb-2 flex">
        <Text color="bodyLight">
          <strong>{activeAPIKeys.length}/10</strong> API keys generated
        </Text>
      </div>

      <DataTable
        columns={getFormattedRowData(handleAction)}
        records={activeAPIKeys}
        noRecords={{
          text: 'No data found!',
          icon: <Icon name="noRecordsTableIcon" />,
        }}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          isMerchantLevel={isMerchantLevel}
          setFetchCounter={setFetchCounter}
          handleDelete={handleDelete}
          selected={selected}
        />
      )}
    </>
  );
};

export default withReadPermission(APIKeys, {
  code: 22003,
  description: `access ${LABEL_BY_SUBMENU[SUBMENU.API_KEYS]}`,
});
