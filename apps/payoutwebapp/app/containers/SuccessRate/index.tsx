import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Text,
  DateFilter,
  Dropdown,
  Popup,
  Space,
  Loader,
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
import {
  descByBankStatus,
  labelByBankStatus,
  STATUS_MAP,
  TODAY,
} from './constants';

// Services
import { getSuccessRate } from 'services/summary';

// Helpers
import { getFundSourcesOptions } from 'helpers/fundSources';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Utils
import Analytics from 'utils/analytics';
import { toggleItem } from 'utils/common';
import { getModeOptions } from 'containers/Summary/utils';
import {
  getStatusMaps,
  getTotalByDate,
  getTotalByDateForStatus,
} from './utils';

// Components
import Icon from 'components/Icon';
import StatusLabel from 'components/StatusLabel';
import EmptyTableView from 'components/EmptyTableView';

// Types
import type { ModePref } from 'containers/Summary/types';
import type { DataElement, SuccessRateProps } from './types';

const SuccessRate: React.FC<SuccessRateProps> = ({ fundSources }) => {
  const { preferences } = useAccount();

  const enabledModes = Object.keys(preferences.modeByName);
  const modeOptions = getModeOptions(enabledModes as ModePref[]);

  const [data, setData] = useState<AnyObject[]>([]);
  const [dateValue, setDateValue] = useState(DATE_RANGE_OPTIONS[0]);
  const [filters, setFilters] = useState<{ mode: string; fsId: number }>({
    mode: 'all',
    fsId: -1,
  });
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
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
        mode: filters.mode === 'all' ? '' : filters.mode,
      };

      setLoading(true);

      if (filters.fsId !== -1) {
        queryObj.fsId = filters.fsId;
      }

      const response = await getSuccessRate(queryObj);

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
      sub_section: LABEL_BY_SUBMENU[SUBMENU.SUCCESS_RATE],
      date_value: dateValue,
    });
  };

  if (loading) {
    return <Loader active page={false} />;
  }

  const dates: string[] = _uniq(
    _flatten(data.map((d) => d.dateDetail)).map((d) => d.addedDate),
  ).sort((a, b) => moment(b).diff(moment(a)));

  const { statusDateMap, bankStatusDateMap } = getStatusMaps(
    data as DataElement[],
  );

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
                  sub_section: LABEL_BY_SUBMENU[SUBMENU.SUCCESS_RATE],
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
              options={[{ text: 'All Modes', value: 'all' }].concat(
                modeOptions,
              )}
              value={filters.mode}
              onChange={(
                e: React.ChangeEvent,
                { value }: { value: string },
              ) => {
                setFilters((prev) => ({ ...prev, mode: value }));
                Analytics.track(EVENTS.APPLIED_FILTERS, {
                  section: LABEL_BY_MENU[MENU.SUMMARY],
                  sub_section: LABEL_BY_SUBMENU[SUBMENU.SUCCESS_RATE],
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
                <TableHeaderCell
                  data-value="status"
                  $colWidth={dates.length > 10 ? 0.1 : 0.15}
                >
                  Status
                </TableHeaderCell>
                <TableHeaderCell
                  data-value="bank-status"
                  $colWidth={dates.length > 10 ? 0.1 : 0.15}
                >
                  Bank Status
                </TableHeaderCell>
                {dates.map((date) => (
                  <TableHeaderCell key={date} $colWidth={0.1}>
                    {moment(date).format('MMM Do')}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(STATUS_MAP)
                .filter((status) => statusDateMap[status])
                .map((status) => (
                  <React.Fragment key={status}>
                    <TableRow>
                      <TableCell>
                        <StatusLabel>{status}</StatusLabel>
                        <Icon
                          name={
                            expandedItems.includes(status)
                              ? 'chevron-up'
                              : 'chevron-down'
                          }
                          className="ml-1 pointer"
                          onClick={() =>
                            setExpandedItems((prev) => toggleItem(prev, status))
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Text>Overall</Text>
                        <Text variant="b12" color="bodyLight">
                          S.R.%
                        </Text>
                      </TableCell>
                      {dates.map((date) => {
                        const value = statusDateMap[status][date];

                        return (
                          <TableCell key={date}>
                            <Text>
                              {getTotalByDateForStatus(
                                data as DataElement[],
                                date,
                                status,
                              )}
                            </Text>
                            <Text variant="b12" color="bodyLight">
                              {value ? `${Number(value).toFixed(2)}%` : '–'}
                            </Text>
                          </TableCell>
                        );
                      })}
                    </TableRow>

                    {expandedItems.includes(status) &&
                      STATUS_MAP[status as keyof typeof STATUS_MAP]
                        .filter(
                          (bankStatus) => bankStatusDateMap[status][bankStatus],
                        )
                        .sort((a, b) => {
                          if (
                            Number(bankStatusDateMap[status][a][TODAY]) <
                            Number(bankStatusDateMap[status][b][TODAY])
                          ) {
                            return 1;
                          }
                          if (
                            Number(bankStatusDateMap[status][a][TODAY]) >
                            Number(bankStatusDateMap[status][b][TODAY])
                          ) {
                            return -1;
                          }

                          return 0;
                        })
                        .map((bankStatus) => (
                          <TableRow key={bankStatus}>
                            <TableCell></TableCell>
                            <TableCell>
                              <Popup
                                // @ts-ignore
                                content={descByBankStatus[status][bankStatus]}
                                trigger={
                                  <span>
                                    {/* @ts-ignore   */}
                                    {labelByBankStatus[status][bankStatus]}
                                  </span>
                                }
                              />
                            </TableCell>
                            {dates.map((date) => {
                              const value =
                                bankStatusDateMap[status][bankStatus][date];

                              return (
                                <TableCell key={date}>
                                  <Text color="bodyLight">{value || '–'}</Text>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                  </React.Fragment>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableHeaderCell>Total Count</TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
                {dates.map((date) => (
                  <TableHeaderCell key={date}>
                    {getTotalByDate(bankStatusDateMap, date)}
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

export default withConnect(SuccessRate);
