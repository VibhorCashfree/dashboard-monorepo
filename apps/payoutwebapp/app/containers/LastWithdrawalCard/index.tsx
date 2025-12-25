import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Paper, Space, Text, Button } from '@cashfree-intl/coherent';

// Utils
import { formatAmount, emitUserValidation } from 'utils/common';

// Services
import { getSelfWithdrawals } from 'services/fundSources';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { useDetails } from 'containers/FundSourceDetails/providers';

// Components
import CanWrite from 'components/CanWrite';
import StatusLabel from 'components/StatusLabel';
import Modals from './components/Modals';

// Constants
import { FORMATS } from 'constants/date';
import { PATH_BY_MENU, MENU } from 'constants/menuItems';
import { MODAL_TYPE } from './constants';

// Types
import type { LastWithdrawalCardProps } from './types';

const LastWithdrawalCard: React.FC<LastWithdrawalCardProps> = ({ status }) => {
  const { preferences } = useAccount();
  const { details } = useDetails();

  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [data, setData] = useState<any | undefined>(undefined);

  useEffect(() => {
    (async function fetchData() {
      const response = await getSelfWithdrawals(details.fundSourceId);
      setData(response);
    })();
  }, [details.fundSourceId]);

  if (!data) {
    return null;
  }

  const utr: string = data.status === 'SUCCESS' ? data.utr : '';

  return (
    <>
      <Paper style={{ width: 327 }}>
        <Space
          justifyContent="space-between"
          alignItems="center"
          className="mb-1"
        >
          <Text color="bodyLight">Last Withdrawal</Text>
          <Link
            className="link"
            to={`/${PATH_BY_MENU[MENU.FUND_SOURCES]}/${
              details.fundSourceId
            }/details/statements?status=SELF_WITHDRAWAL`}
          >
            View All
          </Link>
        </Space>
        <Text className="mb-1" variant="h28">
          {formatAmount(data.amount)}
        </Text>
        <StatusLabel filled>{data.status}</StatusLabel>
        <Space
          justifyContent="space-between"
          alignItems="center"
          className="mt-2"
        >
          <div>
            {!data.error && (
              <>
                {utr && (
                  <Text variant="p14" className="m-0">
                    <Text as="span" color="bodyLight">
                      UTR -{' '}
                    </Text>{' '}
                    {utr}
                  </Text>
                )}
                <Text variant="b12" color="bodyLight" className="mt-1">
                  {data.addedOn &&
                    moment(data.addedOn).format(FORMATS.TIMESTAMP)}
                </Text>
              </>
            )}
          </div>
          <CanWrite code={21504}>
            {preferences.selfWithdrawal && status !== 'DEACTIVATED' && (
              <Button
                data-event-name="Primary_Button"
                primary
                className="m-0"
                onClick={() =>
                  emitUserValidation(() => setModalType(MODAL_TYPE.WITHDRAW))
                }
              >
                Withdraw
              </Button>
            )}
          </CanWrite>
        </Space>
      </Paper>

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          data={data}
          setData={setData}
        />
      )}
    </>
  );
};

export default LastWithdrawalCard;
