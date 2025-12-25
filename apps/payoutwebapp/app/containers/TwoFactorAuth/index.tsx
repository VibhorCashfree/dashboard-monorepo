import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Icon as CFIcon,
  Loader,
  Text,
  Space,
  DataTable,
  Button,
  Dropdown,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { TwoFactorContext } from 'pages/Developers/providers';

// Services
import { getMerchantPreference } from 'services/accounts';
import {
  getIPs,
  getPublicKey,
  removeIP,
  removePublicKey,
  getAPIKeys,
} from 'services/developers';

// Utils
import Analytics from 'utils/analytics';
import { emitUserValidation } from 'utils/common';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Constants
import { KNOW_MORE } from 'constants/urls';
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { options, MAX_IP_COUNT, MODAL_TYPE } from './constants';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import Alert from 'components/Alert';
import CanWrite from 'components/CanWrite';
import Icon from 'components/Icon';
import Modals from './components/Modals';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { IPRow } from './types';

const TwoFactorAuth: React.FC = () => {
  const { preferences } = useAccount();
  const { state, dispatch } = useContext(TwoFactorContext);

  const [data, setData] = useState<any>();
  const [isIP, setIsIP] = useState<boolean>(state.selected2FA !== 'Public Key');
  const [currentMethod, setCurrentMethod] = useState<boolean>();
  const [selected, setSelected] = useState<string>();
  const [fetchCounter, setFetchCounter] = useState(0);
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [open, setOpen] = useState(false);
  const [isAPIKeyValid, setIsAPIKeyValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchMethod() {
      const [currentMethodResponse, apiKeysResponse] = await Promise.all([
        getMerchantPreference(),
        getAPIKeys({}),
      ]);

      const activeAPIKeys = _get(apiKeysResponse, 'activeAPIKeys', []);
      setIsAPIKeyValid(activeAPIKeys.length > 0);

      if (!('error' in currentMethodResponse)) {
        setCurrentMethod(Boolean(+currentMethodResponse.ipCheckDisabled));
      }
    })();
  }, []);

  useEffect(() => {
    setIsIP(!currentMethod);
  }, [currentMethod]);

  useEffect(() => {
    (async function fetchData() {
      let data: any;

      setLoading(true);

      if (isIP) {
        data = await getIPs();
      } else {
        data = await getPublicKey();
      }

      setLoading(false);
      setData(data);
    })();
  }, [isIP, fetchCounter]);

  const handleDropdownSelect = (
    e: React.MouseEvent,
    data: { value: string },
  ) => {
    setIsIP(data.value === options[0].value);

    dispatch({
      type: COMMON_ACTION_TYPE.SET_DATA,
      payload: data.value,
    });

    Analytics.track('Dropdown_Select_2FA_Method', { value: data.value });
  };

  const handleIPDelete = (row: IPRow) => () => {
    emitUserValidation(() => {
      setSelected(row.merchantIP);
      setModalType(MODAL_TYPE.DELETE_IP);
    });
  };

  const handlePublicKeyDelete = () => {
    emitUserValidation(() => setModalType(MODAL_TYPE.DELETE_PUBLIC_KEY));
  };

  const deleteIPAddress = async () => {
    const response = await removeIP(selected as string);

    if (!('error' in response)) {
      const filteredIPs = data.authIPs.filter(
        (ips: IPRow) => ips.merchantIP !== selected,
      );

      setData({ ...data, authIPs: filteredIPs });
    }
  };

  const deletePublicKey = async () => {
    const response = await removePublicKey();

    if (!('error' in response)) {
      const data = await getPublicKey();
      setData(data);
    }
  };

  const handleSwitchMethod = () => {
    setCurrentMethod((val) => !val);
  };

  const goToHistoryLog = () => {
    if (isIP) {
      navigate(
        `/${PATH_BY_MENU[MENU.DEVELOPERS]}/${
          PATH_BY_SUBMENU[SUBMENU.IP_WHITELIST]
        }/${PATH_BY_SUBMENU[SUBMENU.HISTORY_LOG]}`,
      );
    } else {
      navigate(
        `/${PATH_BY_MENU[MENU.DEVELOPERS]}/${
          PATH_BY_SUBMENU[SUBMENU.PUBLIC_KEY]
        }/${PATH_BY_SUBMENU[SUBMENU.HISTORY_LOG]}`,
      );
    }
  };

  if (!data || loading) {
    return <Loader active />;
  }

  const merchantIPs = _get(data, 'authIPs', []);

  const filtereMerchantIPs = merchantIPs.filter(
    (merchantIP: { isActive: boolean; isApproved: boolean }) =>
      merchantIP.isActive || !merchantIP.isApproved,
  );

  const ipDisabled =
    !isAPIKeyValid || filtereMerchantIPs.length >= MAX_IP_COUNT;

  const publicKeyDisabled =
    !isAPIKeyValid || !preferences.enableAPI || data.keyExists !== 'NO';

  const records = isIP
    ? filtereMerchantIPs
    : data.keyExists === 'YES'
    ? [data]
    : [];

  return (
    <>
      <PageHeader embedKey="DEVELOPERS">
        {LABEL_BY_SUBMENU[SUBMENU.TWO_FACTOR_AUTH]}
      </PageHeader>
      <MetaTags title={LABEL_BY_SUBMENU[SUBMENU.TWO_FACTOR_AUTH]} />
      <CanWrite code={22002}>
        {!isAPIKeyValid && (
          <Alert className="mb-1" type="info" bordered rounded>
            <Alert.Content size="md">
              2FA can be enabled/disabled if the{' '}
              <Link
                to={`${PATH_BY_MENU[MENU.DEVELOPERS]}/${
                  PATH_BY_SUBMENU[SUBMENU.API_KEYS]
                }`}
                className="link"
              >
                API keys
              </Link>{' '}
              have been already generated
            </Alert.Content>
          </Alert>
        )}

        <Space justifyContent="center">
          <Alert type="success" compact bordered rounded>
            <Alert.Content size="md">
              {!currentMethod ? 'IP Whitelist' : 'Public Key'} is set as your
              2FA method.
              <Button
                link
                className="p-0 ml-1"
                disabled={!isAPIKeyValid}
                onClick={() =>
                  emitUserValidation(() => setModalType(MODAL_TYPE.SWITCH))
                }
              >
                Switch Method
              </Button>
            </Alert.Content>
          </Alert>
        </Space>
      </CanWrite>
      <div>
        <Text color="bodyLight" className="mt-2 mb-1">
          Select 2FA Method
        </Text>
        <Dropdown
          button
          icon={null}
          options={options}
          value={isIP ? options[0].value : options[1].value}
          trigger={
            <Space justifyContent="space-between">
              <Text>{isIP ? options[0].value : options[1].value}</Text>
              <Icon
                name={open ? 'chevron-up' : 'chevron-down'}
                className="ml-1"
              />
            </Space>
          }
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={handleDropdownSelect}
        />
      </div>
      <Space
        justifyContent="space-between"
        alignItems="center"
        className="my-2"
      >
        <Text className="my-2" color="bodyLight">
          <a
            href={KNOW_MORE.DEVELOPERS['2FA']}
            target="_blank"
            rel="noopener noreferrer"
            data-event-name="Link"
          >
            Know more
          </a>{' '}
          about Public Key
        </Text>
        <CanWrite code={22002}>
          <BtnContainer className="mt-0">
            <Button
              data-event-name="Primary_Button"
              link
              onClick={goToHistoryLog}
            >
              View History
            </Button>
            {isIP ? (
              <Button
                data-event-name="Primary_Button"
                primary
                onClick={() =>
                  emitUserValidation(() => setModalType(MODAL_TYPE.ADD))
                }
                disabled={ipDisabled}
              >
                Add IP Address
              </Button>
            ) : (
              <>
                <Button
                  data-event-name="Primary_Button"
                  primary
                  onClick={() =>
                    emitUserValidation(() => setModalType(MODAL_TYPE.GENERATE))
                  }
                  disabled={publicKeyDisabled}
                >
                  Generate Public Key
                </Button>
                {preferences.enableAPI && (
                  <Text
                    variant="b12"
                    color="placeholder"
                    className="text-right mt-1 mb-3"
                  >
                    Only one Public Key can be generated at a time.
                  </Text>
                )}
              </>
            )}
          </BtnContainer>
        </CanWrite>
      </Space>

      {isIP && (
        <div className="mb-2 flex">
          <Text color="bodyLight">
            <strong>
              {filtereMerchantIPs.length}/
              {Math.max(filtereMerchantIPs.length, MAX_IP_COUNT)}
            </strong>{' '}
            IP Address Added
          </Text>
        </div>
      )}

      <DataTable
        columns={getFormattedRowData(
          isIP,
          handleIPDelete,
          handlePublicKeyDelete,
        )}
        records={records}
        noRecords={{
          text: 'No data found!',
          icon: <CFIcon name="noRecordsTableIcon" />,
        }}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          handleSwitchMethod={handleSwitchMethod}
          deletePublicKey={deletePublicKey}
          deleteIPAddress={deleteIPAddress}
          selected={selected}
          currentMethod={currentMethod}
          data={data}
        />
      )}
    </>
  );
};

export default withReadPermission(TwoFactorAuth, {
  code: 22001,
  description: 'access Two-factor Authentication',
});
