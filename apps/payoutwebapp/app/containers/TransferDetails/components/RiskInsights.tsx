import React, { useState, useEffect } from 'react';
import { Space, Text } from '@cashfree-intl/coherent';
import moment from 'moment';

// Constants
import { FORMATS } from 'constants/date';

// Services
import { getRiskInsights } from 'services/transfers';

// Components
import InsightsCard from './InsightsCard';

// Utils
import { formatAmount } from 'utils/common';
import { getMatchedStatusData } from '../utils';

// Types
import type { RiskInsightsProps } from '../types';

const RiskInsights: React.FC<RiskInsightsProps> = ({ transferDetails }) => {
  const [data, setData] = useState<AnyObject>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const body = 'body';
  const footer = 'footer';

  const {
    lifetime_data = { amount: 0, count: 0 },
    first_all_accounts_data = { addedon: null },
    current_month_data = [],
  } = data?.data || {};

  const handleErrorState = (
    value: string,
    childElementPosition: string,
  ): string => {
    if (error) {
      if (childElementPosition === body) {
        return '-';
      } else if (childElementPosition === footer) {
        return '';
      }
    }

    return value;
  };

  useEffect(() => {
    (async function fetchData() {
      if (!transferDetails) {
        setLoading(false);
        return;
      }

      const startDate: string = moment(transferDetails.addedOn)
        .subtract(30, 'days')
        .format(FORMATS.START_DATE_WITH_MINS);
      const endDate: string = moment(transferDetails.addedOn).format(
        FORMATS.START_DATE_WITH_MINS,
      );

      const queryObj = {
        bankAccount: transferDetails.vpa
          ? transferDetails.vpa.split('@')[0]
          : transferDetails.bankAccount,
        ifsc: transferDetails.vpa
          ? transferDetails.vpa.split('@')[1]
          : transferDetails.ifsc,
        startDate,
        endDate,
      };

      const response: any = await getRiskInsights(queryObj);

      if (response.error) {
        setError(response.error);
      } else {
        setData(response);
        setError(false);
      }

      setLoading(false);
    })();
  }, [transferDetails]);

  return (
    <>
      <Space gap={2} className="pt-0 pb-3">
        <InsightsCard
          title="Last 30 days- Payouts to this beneficiary"
          infoDescription="30 days since the transfer was initiated"
          loading={loading}
          childElements={[
            {
              header: <Text color="success">Successful</Text>,
              body: handleErrorState(
                formatAmount(
                  getMatchedStatusData('SUCCESS', current_month_data).amount,
                ),
                body,
              ),
              footer: handleErrorState(
                `${
                  getMatchedStatusData('SUCCESS', current_month_data).count
                } transfers`,
                footer,
              ),
            },
            {
              header: <Text color="warning">Pending for Review</Text>,
              body: handleErrorState(
                formatAmount(
                  getMatchedStatusData('APPROVAL_PENDING', current_month_data)
                    .amount,
                ),
                body,
              ),
              footer: handleErrorState(
                `${
                  getMatchedStatusData('APPROVAL_PENDING', current_month_data)
                    .count
                } transfers`,
                footer,
              ),
            },
            {
              header: <Text color="danger">Blocked</Text>,
              body: handleErrorState(
                formatAmount(
                  getMatchedStatusData('MANUALLY_REJECTED', current_month_data)
                    .amount,
                ),
                body,
              ),
              footer: handleErrorState(
                `${
                  getMatchedStatusData('MANUALLY_REJECTED', current_month_data)
                    .count
                } transfers`,
                footer,
              ),
            },
          ]}
        />
        <InsightsCard
          title="Lifetime- Payouts to this beneficiary"
          infoDescription="Data was last refreshed 6 hours ago"
          loading={loading}
          childElements={[
            {
              header: <Text color="success">Successful</Text>,
              body: handleErrorState(formatAmount(lifetime_data?.amount), body),
              footer: handleErrorState(
                `${lifetime_data?.count || 0} transfers`,
                footer,
              ),
            },
          ]}
        />
        <InsightsCard
          title="History of successful payouts to this beneficiary"
          loading={loading}
          childElements={[
            {
              header: <Text color="bodyLight">First payout</Text>,
              body: first_all_accounts_data.addedon
                ? moment(first_all_accounts_data.addedon).format('DD MMM YYYY')
                : '-',
              footer: first_all_accounts_data.addedon
                ? moment(first_all_accounts_data.addedon).format(FORMATS.TIME)
                : '',
            },
          ]}
        />
      </Space>
    </>
  );
};

export default RiskInsights;
