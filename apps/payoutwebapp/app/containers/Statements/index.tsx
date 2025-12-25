import React, { useState, useEffect } from 'react';
import { Text, DateFilter } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _get from 'lodash/get';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Builders
import QueryObjBuilder from 'builders/QueryObjBuilder';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import DataTableWithPagination from 'components/DataTableWithPagination';

// Services
import { getStatements, getStatementsCount } from 'services/fundSources';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { DEFAULT_VALUE } from 'constants/date';
import { KNOW_MORE } from 'constants/urls';
import { labelByStatus, filtersConfig, DATE_RANGE_OPTIONS } from './constants';

// Utils
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';
import { extractFiltersFromQuery, formatAmount } from 'utils/common';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { FilterRowContainer } from 'styled/common';

// Types
import type { StatementsProps } from './types';

const Statements: React.FC<StatementsProps> = ({
  details,
  isVirtualAccount,
}) => {
  const queryFilters = extractFiltersFromQuery();
  const initialState: AnyObject = _get(queryFilters, 'statuses', {});

  const [data, setData] = useState<AnyObject | undefined>();
  const [dateValue, setDateValue] = useState(DATE_RANGE_OPTIONS[0]);
  const [filters, setFilters] = useState<AnyObject>(initialState);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [loading, setLoading] = useState(false);

  const previousPage = usePrevious(currentPage);

  useEffect(() => {
    (async function fetchData() {
      let status: string[] = Object.keys(filters);

      if (filters.TRANSFER_REVERSAL) {
        status = status.concat(['PYTM_TRANSFER_REVERSAL']);
      }

      if (filters.PAYOUT_TRANSFER) {
        status = status.concat(['PYTM_PAYOUT_TRANSFER']);
      }

      if (filters.BANKDETAILS_VALIDATION) {
        status = status.concat([
          'BANKDETAILSVALIDATION_SQL',
          'BANKVALIDATION_DEBIT',
          'BANKDETAILSVALIDATION_JAN',
        ]);
      }

      const cursor = getCursor(data as TableData, previousPage, currentPage);

      const queryObj = new QueryObjBuilder()
        .withDateRange(dateValue)
        .withFilters(filters, '', false)
        .withPagination(limit, cursor)
        .withCustom({
          eventType: status,
          paymentInstrumentId: isVirtualAccount
            ? ''
            : details.paymentInstrumentId,
        });

      const isFirstPage: boolean = currentPage === 1;

      setLoading(true);

      const dataPromise = getStatements(queryObj as PaginationQueryObj);
      const countPromise =
        isFirstPage && getStatementsCount(queryObj as PaginationQueryObj);

      const response = await dataPromise;

      setData((prev) => ({
        ...prev,
        ...response,
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
  }, [currentPage, limit, dateValue, filters]);

  const onPageChange = (
    type: COMMON_ACTION_TYPE.PREV | COMMON_ACTION_TYPE.NEXT,
  ) => {
    setCurrentPage((currentPage) => {
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

  const handleFiltersChange = (filters: AnyObject) => {
    setFilters(filters);
    setCurrentPage(1);

    Analytics.track(EVENTS.APPLIED_FILTERS, {
      section: LABEL_BY_MENU[MENU.FUND_SOURCES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.STATEMENTS],
      filters,
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
      sub_section: LABEL_BY_SUBMENU[SUBMENU.STATEMENTS],
      type: 'individual',
    });
  };

  const handleDateChange = (dateValue: DateRangeValue) => {
    setDateValue(dateValue);
    setCurrentPage(1);

    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.FUND_SOURCES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.STATEMENTS],
      date_value: dateValue,
    });
  };

  const availableBalance: number | undefined = _get(
    details,
    'fsBalance.availableBalance',
  );

  return (
    <>
      {isVirtualAccount ? (
        <>
          <Text variant="h16" className="mt-3">
            Account Statement
          </Text>
          <Text variant="b12" color="bodyLight" className="mt-1 mb-2">
            Review all transactions associated with the above virtual account.
          </Text>
        </>
      ) : (
        <>
          <Text className="my-2" color="bodyLight">
            <a
              href={KNOW_MORE.ACCOUNT.SUMMARY}
              target="_blank"
              rel="noopener noreferrer"
              data-event-name="Link"
            >
              Know more
            </a>{' '}
            about account statement. Statement for only 7 days can be viewed
            here. Please download &#34;Account Statement&#34; under Reports to
            get more data.
          </Text>
          <div className="text-right">
            <Text variant="p14" color="bodyLight">
              Available Balance
            </Text>
            <Text variant="h20">
              {availableBalance
                ? formatAmount(availableBalance, details.currency)
                : '–'}
            </Text>
          </div>
        </>
      )}

      <FilterRowContainer>
        <div>
          <DateFilter
            rangeSize={7}
            value={dateValue}
            options={DATE_RANGE_OPTIONS}
            onSelect={handleDateChange}
          />
          <FilterPopover
            config={filtersConfig}
            labelByStatus={labelByStatus}
            value={filters}
            onChange={handleFiltersChange}
          />
          <FilterChips
            chips={getChips({ dateValue, filters }, [], labelByStatus)}
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

export default withReadPermission(Statements, {
  code: 21501,
  description: `access ${LABEL_BY_SUBMENU[SUBMENU.STATEMENTS]}`,
});
