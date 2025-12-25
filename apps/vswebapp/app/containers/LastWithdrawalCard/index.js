import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Space, Text, Button } from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Helpers
import { formattedDate } from 'helpers/common';

// Utils
import { formatAmount, emitUserValidation } from 'utils/common';

// Services
import { getSelfWithdrawals } from 'services/accounts';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Constants
import { MODAL_TYPES } from './constants';

// Components
import CanWrite from 'components/CanWrite';
import StatusLabel from 'components/StatusLabel';
import Modals from './components/Modals';

const LastWithdrawalCard = () => {
  const { fundSourceDetails, preferences } = useContext(AccountContext);

  const [modalType, setModalType] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    (async function fetchData() {
      const response = await getSelfWithdrawals(
        _get(fundSourceDetails, 'fundSourceId'),
      );
      setData(response);
    })();
  }, []);

  if (!data) {
    return null;
  }

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
            to="/accounts/statement?status=SELF_WITHDRAWAL"
          >
            View All
          </Link>
        </Space>
        <Text className="mb-1" variant="h28">
          {formatAmount(data.amount)}
        </Text>
        <StatusLabel>{data.status}</StatusLabel>
        <Space
          justifyContent="space-between"
          alignItems="center"
          className="mt-2"
        >
          <div>
            {!data.error && (
              <>
                <Text variant="p14" className="m-0">
                  <Text as="span" color="bodyLight">
                    UTR -{' '}
                  </Text>{' '}
                  {data.utr}
                </Text>
                <Text variant="b12" color="bodyLight" className="mt-1">
                  {data.addedOn && formattedDate(data.addedOn)}
                </Text>
              </>
            )}
          </div>
          <CanWrite code={21504}>
            {preferences?.selfWithdrawal && (
              <Button
                primary
                data-event-name="Primary_Button"
                className="m-0"
                onClick={() =>
                  emitUserValidation(() => setModalType(MODAL_TYPES.WITHDRAW))
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
