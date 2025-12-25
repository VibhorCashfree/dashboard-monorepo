import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useHistory, Link } from 'react-router-dom';
import {
  Text,
  Space,
  Button,
  Dropdown,
  Icon as IconComponent,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Component
import JoyrideComponent from 'components/Joyride';

// Providers
import { TwoFactorContext } from 'pages/Developers/providers';
import { useTour } from 'providers/TourProvider';

// Services
import {
  getIPs,
  getPublicKey,
  removeIP,
  removePublicKey,
  get2FAMethod,
  getAPIKeys,
} from 'services/developers';

// Utils
import { emitUserValidation } from 'utils/common';
import Analytics from 'utils/analytics';
import getQuery from 'utils/getQuery';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Constants
import { options, MODAL_TYPES } from './constants';

// Components
import Loader from 'components/Loader';
import CanWrite from 'components/CanWrite';
import Icon from 'components/Icon';
import Modals from './components/Modals';

// Styled
import { BtnContainer } from 'styled/common';
import { StyledMessage } from './styled';
import { render2FATable, renderKnowMore, renderCTA } from './helpers';

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const query = getQuery();

  const { state, dispatch } = useContext(TwoFactorContext);
  const { startTour, setRunTour } = useTour();

  const [data, setData] = useState();
  const [isIP, setIsIP] = useState(state.selected2FA !== 'Public Key');
  const [currentMethod, setCurrentMethod] = useState();
  const [selected, setSelected] = useState();
  const [fetchCounter, setFetchCounter] = useState(0);
  const [modalType, setModalType] = useState();
  const [open, setOpen] = useState(false);
  const [isAPIKeyValid, setIsAPIKeyValid] = useState(false);
  const [tour] = useState(query.get('tour') || false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startTour(
      [
        {
          title: 'Add IP Address',
          content:
            'It allows you to whitelist your IP address or generate a public key. ',
          target: 'button#ip-address',
          disableBeacon: true,
        },
        {
          title: 'Add Product to My Favorites',
          content: 'Add Verification to My favorite and start verifying',
          target: 'redirect',
          disableBeacon: true,
          redirect: '/home?tour=true',
        },
      ],
      tour,
    );

    return () => setRunTour(false);
  }, []);

  useEffect(() => {
    (async function fetchMethod() {
      const [currentMethodResponse, apiKeyResponse] = await Promise.all([
        get2FAMethod(),
        getAPIKeys(),
      ]);

      const activeAPIKeys = _get(apiKeyResponse, 'activeAPIKeys', []);

      setIsAPIKeyValid(activeAPIKeys.length > 0);

      setCurrentMethod(Boolean(+currentMethodResponse.ipCheckDisabled));
      setIsIP(!Boolean(+currentMethodResponse.ipCheckDisabled));
    })();
  }, []);

  useEffect(() => {
    (async function fetchData() {
      setLoading(true);
      let data;

      if (isIP) {
        data = await getIPs();
      } else {
        data = await getPublicKey();
      }

      setData(data);
      setLoading(false);
    })();
  }, [isIP, fetchCounter]);

  const handleDropdownSelect = (e, data) => {
    setIsIP(data.value === options[0].value);

    Analytics.track('Dropdown_2FAType', {
      value: data.value,
    });

    dispatch({
      type: 'SET_DATA',
      payload: data.value,
    });
  };

  const handleIPDelete = ip => () => {
    setSelected(ip);
    setModalType(MODAL_TYPES.DELETE_IP);
  };

  const deleteIPAddress = async () => {
    await removeIP(selected);

    const filteredIPs = data.authIPs.filter(ips => ips.merchantIP !== selected);

    setData({ ...data, authIPs: filteredIPs });
  };

  const deletePublicKey = async () => {
    await removePublicKey();

    const data = await getPublicKey();

    setData(data);
  };

  const handleSwitchMethod = () => {
    setIsIP(() => currentMethod);
    setCurrentMethod(val => !val);
  };

  if (!data) {
    return <Loader />;
  }

  const merchantIPs = _get(data, 'authIPs', []);

  const filtereMerchantIPs = merchantIPs.filter(
    merchantIP => !(!merchantIP.isActive && merchantIP.isApproved),
  );

  const ipDisabled = !isAPIKeyValid || filtereMerchantIPs.length >= 25;
  const publicKeyDisabled = !isAPIKeyValid || data.keyExists !== 'NO';

  const twoFAvalue = isIP ? options[0].value : options[1].value;

  return (
    <>
      <CanWrite code={22002}>
        <div className="text-center">
          {isAPIKeyValid && (
            <StyledMessage compact color="green" className="mt-2">
              <Space justifyContent="center" textAlign="center" gap={1}>
                <IconComponent name="GREEN_TICK" />
                {!currentMethod ? 'IP Whitelist' : 'Public Key'} is set as your
                2FA method.
                <a
                  className="ml-1"
                  onClick={() =>
                    emitUserValidation(() => setModalType(MODAL_TYPES.SWITCH))
                  }
                >
                  Switch Method
                </a>
              </Space>
            </StyledMessage>
          )}
        </div>
      </CanWrite>
      <div style={{ width: '180px' }}>
        <Text color="bodyLight" className="mt-2 mb-1">
          Select 2FA Method
        </Text>
        <Dropdown
          button
          icon={null}
          options={options}
          value={twoFAvalue}
          disabled={!isAPIKeyValid}
          trigger={
            <Space justifyContent="space-between" fullWidth>
              <Text>{twoFAvalue}</Text>
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
        {renderKnowMore(isIP)}

        <CanWrite code={22002}>
          <Space direction="column" gap={1}>
            <BtnContainer className="mt-0">
              <Button
                link
                onClick={() =>
                  navigate(
                    `/developers/${
                      isIP ? 'ip-addresses' : 'public-keys'
                    }/history-log`,
                  )
                }
              >
                View History
              </Button>
              {renderCTA(isIP, ipDisabled, publicKeyDisabled, type =>
                setModalType(type),
              )}
            </BtnContainer>
            {!isAPIKeyValid && (
              <Text variant="b12" color="bodyLight">
                2FA can be enabled/disabled if the{' '}
                <Link
                  to="/developers/api-keys"
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  API Keys
                </Link>{' '}
                have been already generated
              </Text>
            )}
          </Space>
        </CanWrite>
      </Space>

      {isIP && (
        <div className="mb-2 flex">
          <Text color="bodyLight">
            <strong>
              {filtereMerchantIPs.length}/
              {Math.max(filtereMerchantIPs.length, 25)}
            </strong>{' '}
            IP Address Added
          </Text>
        </div>
      )}

      {render2FATable(
        isIP,
        filtereMerchantIPs,
        handleIPDelete,
        data,
        () => setModalType(MODAL_TYPES.DELETE_PUBLIC_KEY),
        loading,
      )}

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

      <JoyrideComponent />
    </>
  );
};

export default withReadPermission(TwoFactorAuth, {
  code: 22001,
  description: 'access Two-factor Authentication',
});
