import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Space, Text, DateFilter } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _get from 'lodash/get';

// Utils
import Analytics from 'utils/analytics';
import { formatFiltersFromQuery, formatAmount } from 'utils/common';
import { getPaginationInfo, getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';

// Helpers
import { getFormattedData, getQuery } from './helpers';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import PaginatedTable from 'components/PaginatedTable';

// Services
import { getStatements, getStatementsCount } from 'services/accounts';

// Constants
import EVENTS from 'constants/analytics';
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { LAST_7_DAYS } from 'constants/date';
import { KNOW_MORE } from 'constants/urls';
import { filtersConfig, labelByStatus } from './constants';

// Styled
import { FilterRowContainer } from 'styled/common';

const Statements = ({ balance }) => {
  const queryFilters = formatFiltersFromQuery();
  const initialState = _get(queryFilters, 'statuses', {});

  const [data, setData] = useState();
  const [dateValue, setDateValue] = useState(LAST_7_DAYS);
  const [filters, setFilters] = useState(initialState);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);

  const [loading, setLoading] = useState(false);

  const previousPage = usePrevious(currentPage);

  useEffect(() => {
    (async function fetchData() {
      const isFirstPage = currentPage === 1;

      const [cursorKey, cursorValue] = getCursor(
        data,
        previousPage,
        currentPage,
      );

      const queryObj = getQuery(filters, dateValue, limit);

      queryObj[cursorKey] = cursorValue;

      setLoading(true);

      const dataPromise = getStatements(queryObj);
      const countPromise = isFirstPage && getStatementsCount(queryObj);

      const response = await dataPromise;

      setData(prev => ({
        ...prev,
        ...response,
      }));

      setLoading(false);

      const countResponse = await countPromise;

      if (isFirstPage) {
        setData(prev => ({
          ...prev,
          ...countResponse,
        }));
      }
    })();
  }, [currentPage, limit, dateValue, filters]);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

  const FORMATTED_COLUMN_ID = getFormattedData();

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

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleFiltersChange = filters => {
    setFilters(filters);
    setCurrentPage(1);

    Analytics.track(EVENTS.TABLE_FILTERS, {
      section: 'Accounts',
      sub_section: 'Statements',
      filters,
    });
  };

  const handleRemove = key => {
    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: 'Accounts',
      sub_section: 'Statements',
      type: 'individual',
    });

    if (key === 'RANGE') {
      setDateValue(LAST_7_DAYS);
    } else {
      setFilters(_omit(filters, key));
    }

    setCurrentPage(1);
  };

  // const handleDateChange = dateValue => {
  //   Analytics.track(EVENTS.TABLE_DATE_FILTERS, {
  //     section: 'Accounts',
  //     sub_section: 'Statements',
  //     date_value: dateValue,
  //   });

  //   setDateValue(dateValue);
  //   setCurrentPage(1);
  // };

  return (
    <>
      <Space justifyContent="space-between" alignItems="center">
        <Text className="my-2" color="bodyLight">
          <a
            href={KNOW_MORE.ACCOUNT.SUMMARY}
            target="_blank"
            data-event-name="Link"
          >
            Know more
          </a>{' '}
          about account statement. Statement for only 7 days can be viewed here.
          Please download &#34;Account Statement&#34; under Reports to get more
          data.
        </Text>
        <div>
          <Text
            variant="p14"
            color="bodyLight"
            className="text-right mt-2 mb-1"
          >
            Available Balance
          </Text>
          <Text variant="h20" className="text-right">
            {balance ? formatAmount(balance) : '-'}
          </Text>
        </div>
      </Space>
      <FilterRowContainer>
        <div>
          {/* <DateFilter
            rangeSize={31}
            value={dateValue}
            onSelect={handleDateChange}
          /> */}
          <FilterPopover
            config={filtersConfig}
            labelByStatus={labelByStatus}
            value={filters}
            onChange={handleFiltersChange}
          />
          <FilterChips
            chips={getChips({ filters }, null, labelByStatus)}
            onRemove={handleRemove}
          />
        </div>
      </FilterRowContainer>

      <PaginatedTable
        data={rowData}
        limit={limit}
        currentPage={currentPage}
        fetching={loading}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        tableHeading={FORMATTED_COLUMN_ID}
        {...paginationInfo}
      />
    </>
  );
};

Statements.propTypes = {
  balance: PropTypes.string,
};

const mapStateToProps = ({ availableBalance }) => ({
  balance: availableBalance.availableBalance,
});

const withConnect = connect(mapStateToProps);

export default withReadPermission(withConnect(Statements), {
  code: 21501,
  description: 'access Account Statements',
});
