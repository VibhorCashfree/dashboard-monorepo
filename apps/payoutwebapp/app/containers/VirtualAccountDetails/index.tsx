import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Space, Paper, Text } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Services
import { getBalance, getRechargeBankAccounts } from 'services/fundSources';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import Icon from 'components/Icon';
import Copy from 'components/Copy';
import StatusLabel from 'components/StatusLabel';
import ExtendedDropdown from 'components/ExtendedDropdown';
import Modals from 'containers/VirtualAccounts/components/Modals';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  PATH_BY_SUBMENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { FORMATS } from 'constants/date';
import { MODAL_TYPE, ACTION_TYPE } from 'containers/VirtualAccounts/constants';

// Helpers
import { getActions } from 'containers/VirtualAccounts/helpers';

// Containers
import Statements from 'containers/Statements';

// Utils
import { formatAmount } from 'utils/common';

// Providers
import { useEscrowAccount } from 'pages/OneEscrow/providers';

// Styled
import { BackButtonWrapper } from 'styled/common';

const VirtualAccountDetails: React.FC = () => {
  const { virtualAccounts } = useEscrowAccount();

  const [data, setData] = useState<{
    fsBalance?: FsBalance;
    rechargeAccounts?: {
      accountNumber: string;
      bankName: string;
      ifsc: string;
    }[];
  }>({});
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);

  const navigate = useNavigate();
  const location = useLocation();

  const { rowDetails: details } = location.state as { rowDetails: AnyObject };

  useEffect(() => {
    (async function fetchData() {
      const [balanceResponse, rechargeAccountsResponse] = await Promise.all([
        getBalance(details.paymentInstrumentId),
        getRechargeBankAccounts(details.fundSourceId),
      ]);

      if (
        !('error' in balanceResponse || 'error' in rechargeAccountsResponse)
      ) {
        setData({
          fsBalance: balanceResponse,
          rechargeAccounts: rechargeAccountsResponse,
        });
      }
    })();
  }, [details.paymentInstrumentId, details.fundSourceId]);

  const handleAction = (itemSelected: ACTION_TYPE) => {
    switch (itemSelected) {
      case ACTION_TYPE.INTERNAL_FUND_TRANSFER:
      case ACTION_TYPE.DELETE:
        setModalType(itemSelected as unknown as MODAL_TYPE);
        break;
    }
  };

  const actions = getActions(details, virtualAccounts);

  return (
    <>
      <PageHeader>
        {LABEL_BY_SUBMENU[SUBMENU.VIRTUAL_ACCOUNTS]}{' '}
        {LABEL_BY_SUBMENU[SUBMENU.DETAILS]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_SUBMENU[SUBMENU.VIRTUAL_ACCOUNTS]} ${
          LABEL_BY_SUBMENU[SUBMENU.DETAILS]
        }`}
      />

      <BackButtonWrapper
        onClick={() =>
          navigate(
            `/${PATH_BY_MENU[MENU.ONE_ESCROW]}/${
              PATH_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]
            }`,
          )
        }
      >
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>

      <div className="text-right my-3">
        <ExtendedDropdown actions={actions} onClick={handleAction} />
      </div>

      <Paper>
        <Space justifyContent="space-between">
          <div style={{ display: 'flex', flex: 1 }}>
            <div style={{ flex: 1 }}>
              <Text color="bodyLight" className="mb-1">
                Account Name
              </Text>
              <Text variant="h16">{details.displayName || '–'}</Text>
            </div>
            <div style={{ flex: 1 }}>
              <Text color="bodyLight" className="mb-1">
                Virtual Account Details{' '}
                <Copy
                  value={`${details.virtualAccount} / ${_get(
                    data,
                    'rechargeAccounts.[0].ifsc',
                    '–',
                  )}`}
                />
              </Text>
              <Text variant="h16">
                {details.virtualAccount} <br />
                {_get(data, 'rechargeAccounts.[0].ifsc', '–')}
              </Text>
            </div>
            <div style={{ flex: 1 }}>
              <Text color="bodyLight" className="mb-1">
                Created At
              </Text>
              <Text variant="h16" className="text-ellipsis">
                {moment(details.addedOn).format(FORMATS.TIMESTAMP)}
              </Text>
            </div>
            <div style={{ flex: 1 }}>
              <Text color="bodyLight" className="mb-1">
                Status
              </Text>
              <StatusLabel className="mb-1" filled>
                {details.status}
              </StatusLabel>
            </div>
          </div>
          <div>
            <div>
              <Text color="bodyLight">Account Balance</Text>
            </div>
            <div>
              <Text color="success" className="text-wrap">
                {formatAmount(_get(data, 'fsBalance.availableBalance'))}
              </Text>
            </div>
          </div>
        </Space>
      </Paper>

      <Statements details={details} />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          selectedRow={details}
        />
      )}
    </>
  );
};

export default VirtualAccountDetails;
