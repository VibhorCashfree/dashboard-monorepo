import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Space, Text, Button, Popup } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import moment from 'moment';

// Constants
import { FORMATS } from 'constants/date';
import { PATH_BY_MENU, MENU } from 'constants/menuItems';
import { MODAL_TYPE } from './constants';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useAccount } from 'providers/AccountProvider';
import { useDetails } from 'containers/FundSourceDetails/providers';

// Utils
import { formatAmount, emitUserValidation } from 'utils/common';

// Components
import Icon from 'components/Icon';
import CanWrite from 'components/CanWrite';
import StatusLabel from 'components/StatusLabel';
import Modals from './components/Modals';

// Types
import type { LastInternalTransferCardProps } from './types';

const LastInternalTransferCard: React.FC<LastInternalTransferCardProps> = ({
  data,
  status,
}) => {
  const { accountList } = useMerchant();
  const { accountInfo } = useAccount();
  const { details } = useDetails();

  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);

  const nonConnectedAccounts = accountList.filter(
    (account) =>
      account.accountType !== 'CONNECTED_BANK' &&
      account.accountId !== accountInfo.id,
  );

  const amount: number = _get(data, 'amount', 0);

  return (
    <>
      <Paper style={{ width: 327 }}>
        <Space
          justifyContent="space-between"
          alignItems="center"
          className="mb-1"
        >
          <Text color="bodyLight" className="m-0">
            Last Internal Transfer{' '}
            <Popup
              content="Transfer funds within your Cashfree account."
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
          <Link
            className="link"
            to={`/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
              details.fundSourceId
            }/details/statements?status=INTERNAL_TRANSFER_OUT,INTERNAL_TRANSFER_IN`}
          >
            View All
          </Link>
        </Space>
        <Text className="mb-1" variant="h28">
          {formatAmount(amount)}
        </Text>

        {data.status ? (
          <StatusLabel filled>{data.status}</StatusLabel>
        ) : (
          <div className="pt-3" />
        )}

        <Space
          justifyContent="space-between"
          alignItems="center"
          className="mt-2"
        >
          <Text variant="b12" color="bodyLight" className="mt-1">
            {data.addedOn && moment(data.addedOn).format(FORMATS.TIMESTAMP)}
          </Text>
          <CanWrite code={21008}>
            {nonConnectedAccounts.length > 0 && status !== 'DEACTIVATED' && (
              <Button
                data-event-name="Primary_Button"
                primary
                className="m-0"
                onClick={() => {
                  emitUserValidation(() => setModalType(MODAL_TYPE.TRANSFER));
                }}
              >
                Transfer
              </Button>
            )}
          </CanWrite>
        </Space>
      </Paper>

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          nonConnectedAccounts={nonConnectedAccounts}
        />
      )}
    </>
  );
};

export default LastInternalTransferCard;
