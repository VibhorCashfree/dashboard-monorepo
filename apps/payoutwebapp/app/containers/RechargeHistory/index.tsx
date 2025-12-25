import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Text, DateFilter } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Utils
import Analytics from 'utils/analytics';
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';

// Providers
import { useDetails } from 'containers/FundSourceDetails/providers';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Components
import DataTableWithPagination from 'components/DataTableWithPagination';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import Alert from 'components/Alert';

// Services
import {
  getRechargeHistory,
  getRechargeHistoryCount,
} from 'services/fundSources';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { FORMATS, DEFAULT_VALUE } from 'constants/date';
import { KNOW_MORE } from 'constants/urls';
import { FS_DISPLAY_TYPE } from 'constants/fundSources';
import {
  filtersConfig,
  labelByStatus,
  options,
  DATE_RANGE_OPTIONS,
} from './constants';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { FilterRowContainer } from 'styled/common';

const RechargeHistory: React.FC = () => {
  const { details } = useDetails();

  const [data, setData] = useState<AnyObject>();
  const [dateValue, setDateValue] = useState<{ range?: [Date, Date] }>(
    DEFAULT_VALUE,
  );
  const [filters, setFilters] = useState<AnyObject>({});
  const [searchBy, setSearchBy] = useState<string | undefined>();
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [loading, setLoading] = useState(false);

  const previousPage = usePrevious(currentPage);

  useEffect(() => {
    (async function fetchData() {
      const status: string[] = Object.keys(filters);

      const queryObj: PaginationQueryObj = {
        status: status.filter((v) => v !== 'search'),
        size: limit,
        num: currentPage,
      };

      if (filters.search && searchBy) {
        queryObj[searchBy as string] = filters.search;
      }

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = moment(startDate).format(FORMATS.DATE);
        queryObj.endDate = moment(endDate).format(FORMATS.DATE);
      }

      const [cursorKey, cursorValue] = getCursor(
        data as TableData,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage: boolean = currentPage === 1;

      setLoading(true);

      const dataPromise = getRechargeHistory(details.fundSourceId, queryObj);
      const countPromise =
        isFirstPage && getRechargeHistoryCount(details.fundSourceId, queryObj);

      const response = await dataPromise;

      let hasNext: boolean;

      if (!response || 'error' in response || !response.cursor) {
        hasNext = false;
      } else {
        hasNext = !JSON.parse(atob(response.cursor)).searchAfter.empty;
      }

      setData((prev) => ({
        ...prev,
        ...response,
        hasNext,
      }));

      setLoading(false);

      const countResponse = await countPromise;

      if (isFirstPage) {
        setData((prev) => ({
          ...prev,
          ...countResponse,
        }));
      }
    })();
  }, [currentPage, limit, dateValue, filters, searchBy]);

  const onPageChange = (
    type: COMMON_ACTION_TYPE.PREV | COMMON_ACTION_TYPE.NEXT,
  ) => {
    setCurrentPage((currentPage: number) => {
      switch (type) {
        case COMMON_ACTION_TYPE.NEXT:
          return currentPage + 1;
        case COMMON_ACTION_TYPE.PREV:
          return currentPage - 1;
        default:
          return currentPage;
      }
    });
  };

  const onLimitChange = (e: React.MouseEvent, data: { value: string }) => {
    setLimit(+data.value);
    setCurrentPage(1);

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleFiltersChange = (
    filters: AnyObject,
    searchBy: string | undefined,
  ) => {
    setFilters(filters);
    setSearchBy(searchBy);
    setCurrentPage(1);

    Analytics.track(EVENTS.APPLIED_FILTERS, {
      section: LABEL_BY_MENU[MENU.FUND_SOURCES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.RECHARGE_HISTORY],
      filters,
      search_by: searchBy,
    });
  };

  const handleRemove = (key: string) => {
    if (key === 'RANGE') {
      setDateValue(DEFAULT_VALUE);
    } else {
      setFilters(_omit(filters, key));
    }

    setCurrentPage(1);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.FUND_SOURCES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.RECHARGE_HISTORY],
      type: 'individual',
    });
  };

  const handleDateChange = (dateValue: { range?: [Date, Date] }) => {
    setDateValue(dateValue);
    setCurrentPage(1);

    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.FUND_SOURCES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.RECHARGE_HISTORY],
      date_value: dateValue,
    });
  };

  return (
    <>
      {details.fsDisplayType === FS_DISPLAY_TYPE.CASHFREE_WALLET ? (
        <Alert className="mt-3" type="info" bordered rounded>
          <Alert.Content size="md">
            We process all the Cashfree Wallet Recharges in an automated manner
            using the information shared by Banks to Cashfree. However, there
            are scenarios when the recharge information has missing UTR and/or
            missing recharge account details like name, account number etc. In
            these scenarios, recharges are manually analyzed by our team to
            ensure 100% accuracy and may take 1-2 days. We request your patience
            if you see the recharges are shown below as they are being worked
            upon.
          </Alert.Content>
        </Alert>
      ) : (
        <Text className="my-2" color="bodyLight">
          <a
            href={KNOW_MORE.ACCOUNT.SUMMARY}
            target="_blank"
            rel="noopener noreferrer"
            data-event-name="Link"
          >
            Know more
          </a>{' '}
          about account recharge history
        </Text>
      )}

      <FilterRowContainer>
        <div>
          <DateFilter
            rangeSize={31}
            value={dateValue}
            options={DATE_RANGE_OPTIONS}
            onSelect={handleDateChange}
          />
          <FilterPopover
            config={filtersConfig}
            labelByStatus={labelByStatus}
            searchOptions={options}
            value={filters}
            onChange={handleFiltersChange}
          />
          <FilterChips
            chips={getChips(
              { dateValue, filters, searchBy },
              options,
              labelByStatus,
            )}
            onRemove={handleRemove}
          />
        </div>
      </FilterRowContainer>

      <DataTableWithPagination
        loading={loading}
        limit={limit}
        currentPage={currentPage}
        data={data}
        columns={getFormattedRowData(details)}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </>
  );
};

export default RechargeHistory;
