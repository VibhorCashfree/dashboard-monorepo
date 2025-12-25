import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Space,
  Text,
  Loader,
  DateFilter,
  Dropdown,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableFooter,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _uniq from 'lodash/uniq';
import _flatten from 'lodash/flatten';
import _keyBy from 'lodash/keyBy';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { FORMATS } from 'constants/date';
import {
  DATE_RANGE_OPTIONS,
  POLLING_MAX_COUNT,
} from 'containers/Summary/constants';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Services
import { getTransferTAT } from 'services/summary';

// Helpers
import { getFundSourcesOptions } from 'helpers/fundSources';

// Components
import EmptyTableView from 'components/EmptyTableView';

// Utils
import Analytics from 'utils/analytics';
import { getModeOptions } from 'containers/Summary/utils';
import { getTotalByDate } from './utils';

// Types
import type { ModePref } from 'containers/Summary/types';
import type { TransferTATProps } from './types';

const TransferTAT: React.FC<TransferTATProps> = ({ fundSources }) => {
  const { preferences } = useAccount();

  const enabledModes = Object.keys(preferences.modeByName);
  const modeOptions = getModeOptions(enabledModes as ModePref[]);

  const [data, setData] = useState<AnyObject[]>([]);
  const [dateValue, setDateValue] = useState(DATE_RANGE_OPTIONS[0]);
  const [filters, setFilters] = useState<{
    mode: string;
    fsId: number;
  }>({
    mode: _get(modeOptions, '[0].value', ''),
    fsId: -1,
  });
  const [pollingCounter, setPollingCounter] =
    useState<number>(POLLING_MAX_COUNT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      const [startDate, endDate] = dateValue.range;

      const queryObj: {
        startDate: string;
        endDate: string;
        mode: string;
        fsId?: number;
      } = {
        startDate: moment(startDate).format(FORMATS.START_DATE),
        endDate: moment(endDate).format(FORMATS.END_DATE),
        mode: filters.mode,
      };

      setLoading(true);

      if (filters.fsId !== -1) {
        queryObj.fsId = filters.fsId;
      }

      const response = await getTransferTAT(queryObj);

      if (
        !('error' in response) &&
        ['QUEUED', 'RUNNING'].includes(response.status) &&
        pollingCounter
      ) {
        setPollingCounter((prev) => prev - 1);
      } else {
        const data = _get(response, 'data', []);

        setData(data);
        setLoading(false);
      }
    })();
  }, [dateValue, filters, pollingCounter]);

  useEffect(() => {
    setPollingCounter(POLLING_MAX_COUNT);
  }, [dateValue, filters]);

  const handleDateChange = (dateValue: DateRangeValue) => {
    setDateValue(dateValue);

    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.SUMMARY],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.TRANSFER_TAT],
      date_value: dateValue,
    });
  };

  if (loading) {
    return <Loader active page={false} />;
  }

  const statusDateMap: AnyObject = data.reduce((acc, curr) => {
    acc[curr.tat] = _keyBy(curr.dateDetail, 'date');
    return acc;
  }, {});

  const dates: string[] = _uniq(
    _flatten(data.map((d) => d.dateDetail)).map((d) => d.date),
  ).sort((a, b) => moment(b).diff(moment(a)));

  const statuses: string[] = Object.keys(statusDateMap);

  return (
    <>
      <Space
        justifyContent="space-between"
        alignItems="flex-end"
        className="mb-3"
      >
        <Space gap={2}>
          <div>
            <Text color="bodyLight" className="mt-3 mb-1">
              Fund Source
            </Text>
            <Dropdown
              button
              fluid
              icon="chevron down"
              name="fsId"
              placeholder="Choose Fund Source"
              options={[{ text: 'All Fund Sources', value: -1 }].concat(
                getFundSourcesOptions(fundSources, 'fundSourceId'),
              )}
              value={filters.fsId}
              style={{ minWidth: '350px' }}
              onChange={(
                e: React.ChangeEvent,
                { value }: { value: number },
              ) => {
                setFilters((prev) => ({ ...prev, fsId: value }));

                Analytics.track(EVENTS.APPLIED_FILTERS, {
                  section: LABEL_BY_MENU[MENU.SUMMARY],
                  sub_section: LABEL_BY_SUBMENU[SUBMENU.TRANSFER_TAT],
                  filters,
                });
              }}
            />
          </div>
          <div>
            <Text color="bodyLight" className="mt-3 mb-1">
              Payment Mode
            </Text>
            <Dropdown
              button
              fluid
              icon="chevron down"
              name="mode"
              placeholder="Choose Modes"
              options={modeOptions}
              value={filters.mode}
              onChange={(
                e: React.ChangeEvent,
                { value }: { value: string },
              ) => {
                setFilters((prev) => ({ ...prev, mode: value }));
                Analytics.track(EVENTS.APPLIED_FILTERS, {
                  section: LABEL_BY_MENU[MENU.SUMMARY],
                  sub_section: LABEL_BY_SUBMENU[SUBMENU.TRANSFER_TAT],
                  filters,
                });
              }}
            />
          </div>
        </Space>
        <div>
          <DateFilter
            custom={false}
            rangeSize={7}
            value={dateValue}
            options={DATE_RANGE_OPTIONS}
            onSelect={handleDateChange}
          />
        </div>
      </Space>

      {data.length ? (
        <div style={{ overflowX: 'auto' }}>
          <Table
            fixed
            singleLine
            style={{
              width: `${dates.length > 10 ? dates.length * 10 + 40 : 100}%`,
            }}
          >
            <TableHeader>
              <TableRow>
                <TableHeaderCell data-value="tat" $colWidth={0.1}>
                  TAT
                </TableHeaderCell>
                {dates.map((date) => (
                  <TableHeaderCell key={date} $colWidth={0.1}>
                    {moment(date).format('MMM Do')}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {statuses.map((status) => (
                <TableRow key={status}>
                  <TableCell>{status.slice(3).replace('Under', '<')}</TableCell>
                  {dates.map((date) => (
                    <TableCell key={date}>
                      <Text color="bodyLight">
                        {statusDateMap[status][date]
                          ? statusDateMap[status][date].terminalTransfers
                          : '–'}
                      </Text>
                      <Text variant="b12" color="bodyLight">
                        {statusDateMap[status][date]
                          ? `${Number(
                              statusDateMap[status][date].percentage,
                            ).toFixed(2)}%`
                          : '–'}
                      </Text>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableHeaderCell>Total Count</TableHeaderCell>
                {dates.map((date) => (
                  <TableHeaderCell key={date}>
                    {getTotalByDate(statusDateMap, date)}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <EmptyTableView />
      )}
    </>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withConnect(TransferTAT);
