import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Text, DateFilter } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';

// Services
import {
  getHistoryLog,
  getHistoryLogCount,
  getHistoryLogUsers,
} from 'services/developers';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Helpers
import {
  getQuery,
  showLoader,
  isTypeAPIKeys,
  pageChange,
  getFormattedData,
} from './helpers';

// Components
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';

// Constants
import EVENTS from 'constants/analytics';
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { DEFAULT_VALUE } from 'constants/date';
import { HISTORY_LOG, options } from './constants';

// Utils
import Analytics from 'utils/analytics';
import { getChips } from 'utils/chips';
import { getPaginationInfo, getCursor } from 'utils/pagination';
import { getFiltersLabel } from './utils';

// Styled
import { BackButtonWrapper, FilterRowContainer } from 'styled/common';
import PaginatedTable from 'components/PaginatedTable';

const HistoryLog = () => {
  const { type } = useParams();

  const [data, setData] = useState();
  const [users, setUsers] = useState([]);
  const [dateValue, setDateValue] = useState(DEFAULT_VALUE);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [filters, setFilters] = useState({});
  const [searchBy, setSearchBy] = useState();
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const previousPage = usePrevious(currentPage);

  useEffect(() => {
    (async function fetchData() {
      const isFirstPage = currentPage === 1;

      const [cursorKey, cursorValue] = getCursor(
        data,
        previousPage,
        currentPage,
      );

      const queryObj = getQuery(filters, dateValue, type, searchBy, limit);

      queryObj[cursorKey] = cursorValue;

      setLoading(true);

      const dataPromise = getHistoryLog(queryObj);
      const countPromise = isFirstPage && getHistoryLogCount(queryObj);

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

      if (isTypeAPIKeys(type)) {
        const userResponse = await getHistoryLogUsers(queryObj);

        setUsers(userResponse);
      }
    })();
  }, [currentPage, limit, dateValue, filters, searchBy]);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

  const FORMATTED_COLUMN_ID = getFormattedData(type);

  const handleDateChange = dateValue => {
    setDateValue(dateValue);
    setCurrentPage(1);

    Analytics.track(EVENTS.TABLE_DATE_FILTERS, {
      section: 'Developers',
      sub_section: 'History log',
      date_value: dateValue,
    });
  };

  const onPageChange = type => {
    setCurrentPage(currentPage => pageChange(currentPage, type));
  };

  const onLimitChange = (e, data) => {
    setLimit(+data.value);
    setCurrentPage(1);

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleFiltersChange = (filters, searchBy) => {
    setFilters(filters);
    setSearchBy(searchBy);
    setCurrentPage(1);

    Analytics.track(EVENTS.TABLE_FILTERS, {
      section: 'Developers',
      sub_section: 'History log',
      filters,
      search_by: searchBy,
    });
  };

  const handleRemove = key => {
    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: 'Developers',
      sub_section: 'History log',
      type: 'individual',
    });

    if (key === 'RANGE') {
      setDateValue(DEFAULT_VALUE);
    } else {
      setFilters(_omit(filters, key));
    }

    setCurrentPage(1);
  };

  if (showLoader(data, users, type)) {
    return <Loader />;
  }

  const [filtersConfig, labelByStatus] = getFiltersLabel(users);

  return (
    <>
      <PageHeader embedKey="DEVELOPERS">
        <span>Developers - Secure ID - </span>
        {HISTORY_LOG[type].title} History Log
      </PageHeader>
      <MetaTags title="Developers – Secure ID" />

      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>
      <FilterRowContainer>
        <div>
          <DateFilter
            rangeSize={31}
            value={dateValue}
            onSelect={handleDateChange}
          />
          {isTypeAPIKeys(type) && (
            <FilterPopover
              config={filtersConfig}
              labelByStatus={labelByStatus}
              searchOptions={options}
              value={filters}
              onChange={handleFiltersChange}
            />
          )}
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

export default HistoryLog;
