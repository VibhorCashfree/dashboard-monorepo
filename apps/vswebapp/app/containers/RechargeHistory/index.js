import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { Text, DateFilter, Alert } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';

// Utils
import { getPaginationInfo, getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Components
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import PaginatedTable from 'components/PaginatedTable';

// Services
import { getRechargeHistory, getRechargeHistoryCount } from 'services/accounts';

// Constants
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { FORMATS, DEFAULT_VALUE } from 'constants/date';
import { KNOW_MORE } from 'constants/urls';
import {
  filtersConfig,
  labelByStatus,
  options,
  DATE_RANGE_OPTIONS,
  FS_DISPLAY_TYPE,
} from './constants';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { FilterRowContainer } from 'styled/common';

const RechargeHistory = () => {
  const { preferences, fundSourceDetails } = useContext(AccountContext);

  const [data, setData] = useState();
  const [dateValue, setDateValue] = useState(DEFAULT_VALUE);
  const [filters, setFilters] = useState({});
  const [searchBy, setSearchBy] = useState();
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [loading, setLoading] = useState(false);

  const previousPage = usePrevious(currentPage);

  useEffect(() => {
    (async function fetchData() {
      const status = Object.keys(filters);

      const queryObj = {
        status: status.filter(v => v !== 'search'),
        size: limit,
        num: currentPage,
      };

      if (filters.search) {
        queryObj[searchBy] = filters.search;
      }

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = moment(startDate).format(
          FORMATS.DATE_WITHOUT_TIME,
        );
        queryObj.endDate = moment(endDate).format(FORMATS.DATE_WITHOUT_TIME);
      }

      const [cursorKey, cursorValue] = getCursor(
        data,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage = currentPage === 1;

      setLoading(true);

      const dataPromise = getRechargeHistory(
        fundSourceDetails.fundSourceId,
        queryObj,
      );

      const countPromise =
        isFirstPage &&
        getRechargeHistoryCount(fundSourceDetails.fundSourceId, queryObj);

      const response = await dataPromise;

      const hasNext = response.cursor
        ? !JSON.parse(atob(response.cursor)).searchAfter.empty
        : false;

      setData(prev => ({
        ...prev,
        ...response,
        hasNext,
      }));

      setLoading(false);

      const countResponse = await countPromise;

      if (isFirstPage) {
        setData(prev => ({
          ...prev,
          count: countResponse.result,
        }));
      }
    })();
  }, [currentPage, limit, dateValue, filters, searchBy]);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

  const FORMATTED_COLUMN_ID = getFormattedRowData(
    rowData,
    fundSourceDetails,
    preferences,
  );

  const onPageChange = type => {
    setCurrentPage(currentPage => {
      switch (type) {
        case 'NEXT':
          return currentPage + 1;
        case 'PREV':
          return currentPage - 1;
        default:
      }
    });
  };

  const onLimitChange = (e, data) => {
    setLimit(+data.value);
    setCurrentPage(1);
  };

  const handleFiltersChange = (filters, searchBy) => {
    setFilters(filters);
    setSearchBy(searchBy);
    setCurrentPage(1);
  };

  const handleRemove = key => {
    if (key === 'RANGE') {
      setDateValue(DEFAULT_VALUE);
    } else {
      setFilters(_omit(filters, key));
    }

    setCurrentPage(1);
  };

  const handleDateChange = dateValue => {
    setDateValue(dateValue);
    setCurrentPage(1);
  };

  return (
    <>
      {fundSourceDetails?.fsDisplayType === FS_DISPLAY_TYPE.CASHFREE_WALLET ? (
        <Alert type="info" bordered className="mt-2">
          We process all the Cashfree Wallet Recharges in an automated manner
          using the information shared by Banks to Cashfree. However, there are
          scenarios when the recharge information has missing UTR and/or missing
          recharge account details like name, account number etc. In these
          scenarios, recharges are manually analyzed by our team to ensure 100%
          accuracy and may take 1-2 days. We request your patience if you see
          the recharges are shown below as they are being worked upon.
        </Alert>
      ) : (
        <Text className="my-2" color="bodyLight">
          <a
            href={KNOW_MORE.ACCOUNT.RECHARGE}
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

      <PaginatedTable
        data={rowData}
        limit={limit}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        tableHeading={FORMATTED_COLUMN_ID}
        fetching={loading}
        {...paginationInfo}
      />
    </>
  );
};

export default RechargeHistory;
