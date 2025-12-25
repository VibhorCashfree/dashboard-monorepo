import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Loader,
  Space,
  Text,
  Button,
  DateFilter,
  ShimmerTag,
} from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _keyBy from 'lodash/keyBy';

// Constants
import { KNOW_MORE } from 'constants/urls';
import { MENU, LABEL_BY_MENU, PATH_BY_MENU } from 'constants/menuItems';
import EVENTS from 'constants/events';
import { FORMATS } from 'constants/date';
import { REGION } from 'constants/common';
import { DATE_RANGE_OPTIONS_WITH_TODAY as DATE_RANGE_OPTIONS } from './constants';

// Services
import { getStats } from 'services/summary';

// Utils
import Region from 'utils/region';
import Analytics from 'utils/analytics';
import { getMainAccountBalance } from 'utils/fundSources';
import { getUnit } from './utils';

// Components
import Alert from 'components/Alert';
import ContentLoader from 'components/ContentLoader';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import RegionBasedRenderer from 'components/RegionBasedRenderer';
import FundSourceBalance from './components/FundSourceBalance';
import InfographicBarChart from './components/InfographicBarChart';
import Tabs from './components/Tabs';
import PayoutProtectImpact from './components/PayoutProtectImpact';

// Helpers
import { getFiltersConfig } from 'helpers/fundSources';

// Styled
import { Divider } from 'styled/common';

// Types
import type { SummaryProps } from './types';

const Summary: React.FC<SummaryProps> = ({ balance, fundSources }) => {
  const [data, setData] = useState<AnyObject | undefined>(undefined);
  const [dateValue, setDateValue] = useState(DATE_RANGE_OPTIONS[1]);
  const [alertType, setAlertType] = useState<string | undefined>(undefined);
  const [filters, setFilters] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  const fundSourceByPaymentInstrumentId = _keyBy(
    fundSources,
    'paymentInstrumentId',
  );

  useEffect(() => {
    if (Number(balance.availableBalance) === 0) {
      setAlertType('ZERO_BALANCE');
    } else {
      setAlertType(undefined);
    }
  }, [balance]);

  useEffect(() => {
    (async function fetchData() {
      if (Region.get() !== REGION.IN) {
        setData({});
        return;
      }

      const [startDate, endDate] = dateValue.range;

      const queryObj: {
        startDate: string;
        endDate: string;
        fundSourceIds: number[];
        reportType: string;
      } = {
        startDate: moment(startDate).format(FORMATS.START_DATE_WITH_MINS),
        endDate: moment(endDate).format(FORMATS.END_DATE_WITH_MINS),
        fundSourceIds: Object.keys(filters).map(
          (paymentInstrumentId) =>
            fundSourceByPaymentInstrumentId[paymentInstrumentId].fundSourceId,
        ),
        reportType: 'TRANSFER',
      };

      setLoading(true);

      const response = await getStats(queryObj);

      const data = Object.keys(response).reduce((acc, status) => {
        acc[status] = { ...response[status], status };
        return acc;
      }, {} as AnyObject);

      setData(data);
      setLoading(false);
    })();
  }, [dateValue, filters]);

  const handleFiltersChange = (filters: AnyObject) => {
    setFilters(filters);

    Analytics.track(EVENTS.APPLIED_FILTERS, {
      section: LABEL_BY_MENU[MENU.SUMMARY],
      filters,
    });
  };

  const handleRemove = (key: string) => {
    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.SUMMARY],
      type: 'individual',
    });

    setFilters(_omit(filters, key));
  };

  const chips = Object.keys(filters).map((key) => {
    const text = `Fund Source: ${fundSourceByPaymentInstrumentId[key]?.displayName}`;
    return { key, text };
  });

  if (!data) {
    return <Loader active />;
  }

  return (
    <>
      {alertType === 'ZERO_BALANCE' && Region.get() === REGION.IN && (
        <Alert className="mb-3" type="success" compact bordered rounded>
          <Alert.Content size="md">
            Recharge your Payouts Account to get started.{' '}
          </Alert.Content>
          <Alert.Actions>
            <Link to={`/${PATH_BY_MENU[MENU.FUND_SOURCES]}`}>
              <Button data-event-name="Primary_Button" size="small" primary>
                View A/c Details
              </Button>
            </Link>
          </Alert.Actions>
        </Alert>
      )}

      <FundSourceBalance fundSources={fundSources} />
      <PayoutProtectImpact />
      <RegionBasedRenderer regions={[REGION.IN]}>
        <Text variant="h20" className="mt-4">
          Transfer Efficiency <ShimmerTag>Beta</ShimmerTag>
        </Text>
        <Text variant="b12" color="bodyLight" className="mt-1 mb-4">
          Check the success rate and transfer TAT for different payment modes
          and fund sources here.{' '}
          <a
            href={KNOW_MORE.SUMMARY.TRANSFER_EFFICIENCY}
            target="_blank"
            rel="noopener noreferrer"
            data-event-name="Link"
          >
            Know more
          </a>
        </Text>

        <Tabs />

        <Divider />
        <Space gap={2}>
          <DateFilter
            rangeSize={31}
            value={dateValue}
            options={DATE_RANGE_OPTIONS}
            onSelect={setDateValue}
            min={new Date(2024, 0, 1)}
            alertText="Data available for transfers initiated on or after 1st Jan 2024"
          />
          <FilterPopover
            config={getFiltersConfig(fundSources)}
            labelByStatus={{}}
            value={filters}
            onChange={handleFiltersChange}
            specialCase="SUMMARY"
          />
          <FilterChips chips={chips} onRemove={handleRemove} />
        </Space>

        <Text variant="h20" className="mt-4 mb-3">
          Transfers
        </Text>

        <ContentLoader loading={loading} style={{ minHeight: 404 }}>
          <InfographicBarChart
            type="transfers"
            dataByStatus={data}
            unit={getUnit(dateValue)}
            dateValue={dateValue}
          />
        </ContentLoader>
      </RegionBasedRenderer>
    </>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  balance: getMainAccountBalance(fundSources),
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withConnect(Summary);
