import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import moment from 'moment';
import {
  Space,
  Image,
  Popup,
  Button,
  Paper,
  Text,
} from '@cashfree-intl/coherent';

// Utils
import Banks from 'utils/banks';
import { formatAmount, emitUserValidation } from 'utils/common';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { useEscrowAccount } from 'pages/OneEscrow/providers';

// Services
import { getBalance } from 'services/fundSources';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import Alert from 'components/Alert';
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import Tabs from './components/Tabs';
import Modals from './components/Modals';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import { FORMATS } from 'constants/date';
import { STATUS, MODAL_TYPE } from './constants';

// Styled
import { DetailsRow, BtnContainer } from 'styled/common';

const EscrowAccount: React.FC = () => {
  const { preferences } = useAccount();
  const { details, setFetchCounter } = useEscrowAccount();

  const [fsBalance, setFsBalance] = useState<AnyObject>({});
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);

  useEffect(() => {
    if (!details) {
      return;
    }

    (async function fetchData() {
      const response = await getBalance(details.paymentInstrumentId);
      setFsBalance(response);
    })();
  }, [details]);

  if (!details) {
    return (
      <>
        <MetaTags
          title={`${LABEL_BY_MENU[MENU.ONE_ESCROW]} - ${
            LABEL_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]
          }`}
        />
        <Alert type="info" bordered rounded>
          <Alert.Content size="md">
            No active escrow account found, please contact{' '}
            <a href="mailto:care@cashfree.com">care@cashfree.com</a>
          </Alert.Content>
        </Alert>
      </>
    );
  }

  return (
    <>
      <PageHeader>
        {LABEL_BY_MENU[MENU.ONE_ESCROW]} -{' '}
        {LABEL_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_MENU[MENU.ONE_ESCROW]} - ${
          LABEL_BY_SUBMENU[SUBMENU.ESCROW_ACCOUNT]
        }`}
      />

      {preferences.enableVAOnConnectedFS && (
        <BtnContainer className="mb-3">
          <Button
            data-event-name="Primary_Button"
            primary
            onClick={() =>
              emitUserValidation(() =>
                setModalType(MODAL_TYPE.CREATE_VIRTUAL_ACCOUNT),
              )
            }
          >
            Create Virtual Account
          </Button>

          {details.status === STATUS.DEACTIVATED ||
          Number(fsBalance.availableBalance) === 0 ? null : (
            <Button
              data-event-name="Secondary_Button"
              secondary
              className="ml-4"
              onClick={() =>
                emitUserValidation(() =>
                  setModalType(MODAL_TYPE.INITIATE_PAYOUT),
                )
              }
            >
              Initiate Payout
            </Button>
          )}
        </BtnContainer>
      )}

      <Paper className="mb-2">
        <Space justifyContent="space-between">
          <div style={{ flex: 8 }}>
            <DetailsRow>
              <div>
                <Text color="bodyLight" className="mb-1">
                  Fund Source Name
                </Text>
                <Text variant="h16" className="text-ellipsis">
                  {details.displayName || '–'}
                </Text>
              </div>
              <div>
                <Text color="bodyLight" className="mb-1">
                  Fund Source ID
                  <Popup
                    position="right center"
                    content="Unique identifier for the fund source. You need to use this while making payouts via API and bulk transfers."
                    trigger={
                      <span>
                        <Icon
                          name="info"
                          className="pointer ml-1"
                          verticalAlign="top"
                        />
                      </span>
                    }
                  />
                </Text>
                <Text variant="h16">{details.paymentInstrumentId || '–'}</Text>
              </div>
            </DetailsRow>
            <DetailsRow>
              <div>
                <Text color="bodyLight" className="mb-1">
                  Added At
                </Text>
                <Text className="text-wrap">
                  {moment(details.addedOn).format(FORMATS.TIMESTAMP)}
                </Text>
              </div>
              <div>
                <Text color="bodyLight" className="mb-1">
                  Name of Bank
                </Text>
                <Image inline width="60" src={Banks.getIcon(details.ifsc)} />
              </div>
            </DetailsRow>
            <DetailsRow>
              <div>
                <Text color="bodyLight" className="mb-1">
                  Bank Account Name
                </Text>
                <Text className="text-wrap">{details.accountHolderName}</Text>
              </div>
              <div>
                <Text color="bodyLight" className="mb-1">
                  Status
                </Text>
                <StatusLabel filled>{details.status}</StatusLabel>
              </div>
            </DetailsRow>
            <DetailsRow>
              <div>
                <Text color="bodyLight" className="mb-1">
                  Bank A/c Details
                </Text>
                <Text className="text-wrap">
                  A/c No.: {details.bankAccount} <br /> IFSC: ({details.ifsc})
                </Text>
              </div>
              <div />
            </DetailsRow>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div>
              <Text color="bodyLight" className="mb-1">
                Account Balance
              </Text>
              <Text color="success" className="text-wrap">
                {formatAmount(fsBalance.availableBalance)}
              </Text>
            </div>
          </div>
        </Space>
      </Paper>

      <Routes>
        <Route path=":tabId" element={<Tabs />} />
        <Route
          path="*"
          element={
            <Navigate to={PATH_BY_SUBMENU[SUBMENU.VIRTUAL_ACCOUNTS]} replace />
          }
        />
      </Routes>

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
        />
      )}
    </>
  );
};

export default EscrowAccount;
